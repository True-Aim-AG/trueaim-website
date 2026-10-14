import { app } from "@azure/functions";
import * as generated from "../generated-config.js";

const log = new Map();
const contactRateLimiter = {
  isRateLimited(key, now = Date.now()) {
    const recent = (log.get(key) || []).filter((t) => now - t < 60_000);
    log.set(key, recent);
    if (recent.length >= 5) return true;
    recent.push(now);
    return false;
  },
};

// Global headers from staticwebapp.config.json do not apply to API responses,
// so the function sets the same security headers itself.
const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Cache-Control": "no-store",
};

function json(jsonBody, { status = 200 } = {}) {
  return { status, jsonBody, headers: securityHeaders };
}

const GENERIC_ERROR = "Failed to submit form. Please try again.";

// The HubSpot portal is EU-hosted (its tracking script is js-eu1), so forms
// are submitted to the EU host of the unauthenticated Forms API v3.
const HUBSPOT_SUBMIT_URL = "https://api-eu1.hsforms.com/submissions/v3/integration/submit";

// HubSpot contact property (internal name) <- form payload key. Every
// property must exist in the portal and be a field (hidden is fine) on the
// HubSpot form, or HubSpot rejects the submission.
const HUBSPOT_FIELDS = [
  ["firstname", "firstName"],
  ["lastname", "lastName"],
  ["email", "email"],
  ["company", "company"],
  ["jobtitle", "jobTitle"],
  ["country", "country"],
  ["message", "message"],
  ["interest", "interest"],
  ["claims_volume", "claimsVolume"],
  ["heard_about", "heard_about"],
  ["landing_page", "landing_page"],
  ["first_referrer", "referrer"],
  ["utm_source", "utm_source"],
  ["utm_medium", "utm_medium"],
  ["utm_campaign", "utm_campaign"],
  ["utm_term", "utm_term"],
  ["utm_content", "utm_content"],
];

function text(value, max = 2000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function hubspotPayload(body) {
  const fields = HUBSPOT_FIELDS.map(([name, key]) => ({ objectTypeId: "0-1", name, value: text(body[key]) })).filter(
    (field) => field.value !== "",
  );
  const context = {};
  if (/^[a-f0-9]{32}$/i.test(text(body.hutk))) context.hutk = text(body.hutk);
  if (text(body.page_uri)) context.pageUri = text(body.page_uri);
  if (text(body.page_name)) context.pageName = text(body.page_name);
  return { fields, context };
}

async function submitToHubSpot(body, { portalId, formGuid }) {
  const url = `${HUBSPOT_SUBMIT_URL}/${encodeURIComponent(portalId)}/${encodeURIComponent(formGuid)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(hubspotPayload(body)),
  });
  if (response.ok) return { ok: true };
  // Log the error types only; HubSpot's messages can echo submitted values.
  const result = await response.json().catch(() => null);
  const types = (result?.errors || []).map((error) => error.errorType).filter(Boolean);
  return { ok: false, reason: `HubSpot ${response.status}${types.length ? ` ${types.join(",")}` : ""}` };
}

async function submitToSheet(body, scriptUrl) {
  // The sheet keeps its old lead_source column filled.
  const response = await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, lead_source: body.heard_about }),
    redirect: "follow",
  });

  // Google Apps Script returns a redirect, then the final response
  const responseText = await response.text();
  let result;
  try {
    result = JSON.parse(responseText);
  } catch {
    // If we can't parse the response but got a 200, treat as success
    // Google Apps Script sometimes returns HTML on redirect
    if (response.ok) return { ok: true };
    return { ok: false, reason: `Sheet ${response.status}` };
  }
  if (result.result === "success") return { ok: true };
  return { ok: false, reason: "Sheet rejected", message: result.message || "Submission failed" };
}

/**
 * Sends a lead to HubSpot (Forms API) and to the Google Apps Script sheet,
 * which also emails the team. Both run while HubSpot is being proven; the
 * lead counts as received when at least one accepts it, so a HubSpot
 * mapping error in launch week costs a fix, not a lead. Either sink is
 * skipped while its configuration is empty.
 */
async function contact(request, context) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  if (contactRateLimiter.isRateLimited(ip)) {
    return json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // The deploy workflow writes generated-config.js from GitHub repository
  // variables; an application setting, if ever set, takes precedence.
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL || generated.scriptUrl || "";
  const hubspot = {
    portalId: process.env.HUBSPOT_PORTAL_ID || generated.hubspotPortalId || "",
    formGuid: process.env.HUBSPOT_FORM_GUID || generated.hubspotFormGuid || "",
  };
  const hubspotConfigured = Boolean(hubspot.portalId && hubspot.formGuid);

  if (!scriptUrl && !hubspotConfigured) {
    context.error("Neither GOOGLE_SCRIPT_URL nor the HubSpot portal and form are configured");
    return json(
      { error: "Form submission is not configured" },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: GENERIC_ERROR }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return json({ error: GENERIC_ERROR }, { status: 400 });
  }

  const sinks = [];
  if (hubspotConfigured) sinks.push(["HubSpot", submitToHubSpot(body, hubspot)]);
  if (scriptUrl) sinks.push(["Sheet", submitToSheet(body, scriptUrl)]);
  const results = await Promise.all(
    sinks.map(([name, pending]) => pending.catch((error) => ({ ok: false, reason: `${name} ${error?.message || "error"}` }))),
  );

  for (const result of results) {
    if (!result.ok) context.error(`Contact form sink failed: ${result.reason}`);
  }
  if (results.some((result) => result.ok)) {
    return json({ success: true });
  }
  const rejected = results.find((result) => result.message);
  return json({ error: rejected?.message || GENERIC_ERROR }, { status: 500 });
}

app.http("contact", {
  route: "contact",
  methods: ["POST"],
  authLevel: "anonymous",
  handler: contact,
});
