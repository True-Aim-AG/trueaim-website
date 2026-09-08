import { app } from "@azure/functions";
import { scriptUrl as configuredScriptUrl } from "../generated-config.js";

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

async function contact(request, context) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  if (contactRateLimiter.isRateLimited(ip)) {
    return json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // The deploy workflow writes generated-config.js from the environment's
  // GitHub secret; an application setting, if ever set, takes precedence.
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL || configuredScriptUrl;

  if (!scriptUrl) {
    context.error("GOOGLE_SCRIPT_URL environment variable is not set");
    return json(
      { error: "Form submission is not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      redirect: "follow",
    });

    // Google Apps Script returns a redirect, then the final response
    const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch {
      // If we can't parse the response but got a 200, treat as success
      // Google Apps Script sometimes returns HTML on redirect
      if (response.ok) {
        result = { result: "success" };
      } else {
        throw new Error("Unexpected response from form handler");
      }
    }

    if (result.result === "success") {
      return json({ success: true });
    }

    return json(
      { error: result.message || "Submission failed" },
      { status: 500 }
    );
  } catch (error) {
    context.error("Contact form submission error:", error);
    return json(
      { error: "Failed to submit form. Please try again." },
      { status: 500 }
    );
  }
}

app.http("contact", {
  route: "contact",
  methods: ["POST"],
  authLevel: "anonymous",
  handler: contact,
});
