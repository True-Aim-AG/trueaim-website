import assert from "node:assert/strict";
import { test } from "node:test";
import { app } from "@azure/functions";

let registration;
const stripHeaders = (response) => { const { headers, ...rest } = response; return rest; };
const originalHttp = app.http;
app.http = (name, options) => { registration = { name, ...options }; };
await import("../src/functions/contact.js");
app.http = originalHttp;

test("contact preserves the original proxy and rate-limit contract", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalUrl = process.env.GOOGLE_SCRIPT_URL;
  t.after(() => {
    globalThis.fetch = originalFetch;
    if (originalUrl === undefined) delete process.env.GOOGLE_SCRIPT_URL;
    else process.env.GOOGLE_SCRIPT_URL = originalUrl;
  });
  assert.equal(registration.route, "contact");
  assert.deepEqual(registration.methods, ["POST"]);
  assert.equal(registration.authLevel, "anonymous");
  const context = { error() {} };
  const request = (ip) => new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify({ name: "Test", website: "", elapsed_ms: 5000 }),
  });
  const submit = (ip) => registration.handler(request(ip), context);

  delete process.env.GOOGLE_SCRIPT_URL;
  assert.deepEqual(stripHeaders(await submit("missing-config")), {
    status: 500, jsonBody: { error: "Form submission is not configured" },
  });
  process.env.GOOGLE_SCRIPT_URL = "https://example.invalid/test";
  globalThis.fetch = async (url, options) => {
    assert.equal(url, process.env.GOOGLE_SCRIPT_URL);
    assert.equal(options.method, "POST");
    assert.equal(options.redirect, "follow");
    assert.deepEqual(JSON.parse(options.body), { name: "Test" }, "spam checks stay out of the sheet");
    return new Response('{"result":"success"}');
  };
  assert.deepEqual(stripHeaders(await submit("success")), { status: 200, jsonBody: { success: true } });
  globalThis.fetch = async () => new Response("<html>Success</html>");
  assert.deepEqual(stripHeaders(await submit("html")), { status: 200, jsonBody: { success: true } });
  globalThis.fetch = async () => new Response('{"message":"Rejected"}');
  assert.deepEqual(stripHeaders(await submit("rejected")), { status: 500, jsonBody: { error: "Rejected" } });
  globalThis.fetch = async () => new Response("Bad gateway", { status: 502 });
  assert.deepEqual(stripHeaders(await submit("bad-response")), {
    status: 500, jsonBody: { error: "Failed to submit form. Please try again." },
  });
  globalThis.fetch = async () => new Response('{"result":"success"}');
  for (let i = 0; i < 5; i++) assert.equal((await submit("limited, proxy-" + i)).status, 200);
  assert.deepEqual(stripHeaders(await submit("limited, another-proxy")), {
    status: 429, jsonBody: { error: "Too many requests. Please try again later." },
  });
  assert.equal((await submit("different-client")).status, 200);
});

test("contact sends leads to HubSpot and the sheet and succeeds when either accepts", async (t) => {
  const originalFetch = globalThis.fetch;
  const saved = { ...process.env };
  t.after(() => {
    globalThis.fetch = originalFetch;
    for (const key of ["GOOGLE_SCRIPT_URL", "HUBSPOT_PORTAL_ID", "HUBSPOT_FORM_GUID"]) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
  });
  const errors = [];
  const context = { error: (message) => errors.push(String(message)) };
  const lead = {
    firstName: "Ada", lastName: "Lovelace", email: "ada@example.com", company: "Insurer AG",
    jobTitle: "Head of Claims", country: "Switzerland", interest: "claimeval", message: "",
    heard_about: "ai_assistant", landing_page: "https://trueaim.ai/en/technology/", referrer: "https://chatgpt.com/",
    utm_source: "linkedin", utm_medium: "", utm_campaign: "", utm_term: "", utm_content: "",
    page_locale: "en", page_uri: "https://trueaim.ai/en/contact/", page_name: "Contact | True Aim",
    hutk: "0123456789abcdef0123456789abcdef", consent: true, website: "", elapsed_ms: 12_000,
  };
  const submit = (ip, body = lead) => registration.handler(new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  }), context);

  process.env.GOOGLE_SCRIPT_URL = "https://sheet.invalid/exec";
  process.env.HUBSPOT_PORTAL_ID = "123";
  process.env.HUBSPOT_FORM_GUID = "form-guid";
  const calls = {};
  const route = (handlers) => async (url, options) => {
    const target = String(url).startsWith("https://api-eu1.hsforms.com/") ? "hubspot" : "sheet";
    calls[target] = { url: String(url), body: JSON.parse(options.body) };
    return handlers[target]();
  };

  globalThis.fetch = route({
    hubspot: () => new Response('{"inlineMessage":"Thanks"}'),
    sheet: () => new Response('{"result":"success"}'),
  });
  assert.deepEqual(stripHeaders(await submit("both-ok")), { status: 200, jsonBody: { success: true } });
  assert.equal(calls.hubspot.url, "https://api-eu1.hsforms.com/submissions/v3/integration/submit/123/form-guid");
  const fields = Object.fromEntries(calls.hubspot.body.fields.map((field) => [field.name, field.value]));
  assert.equal(fields.email, "ada@example.com");
  assert.equal(fields.jobtitle, "Head of Claims");
  assert.equal(fields.heard_about, "ai_assistant");
  assert.equal(fields.first_referrer, "https://chatgpt.com/");
  assert.equal(fields.utm_source, "linkedin");
  assert.equal("message" in fields, false, "empty values are left out");
  assert.equal("utm_medium" in fields, false);
  assert.ok(calls.hubspot.body.fields.every((field) => field.objectTypeId === "0-1"));
  assert.deepEqual(calls.hubspot.body.context, {
    hutk: "0123456789abcdef0123456789abcdef", pageUri: "https://trueaim.ai/en/contact/", pageName: "Contact | True Aim",
  });
  assert.equal(calls.sheet.body.lead_source, "ai_assistant");
  assert.equal(calls.sheet.body.email, "ada@example.com");

  globalThis.fetch = route({
    hubspot: () => new Response('{"status":"error","errors":[{"errorType":"FIELD_NOT_IN_FORM_DEFINITION","message":"ada@example.com"}]}', { status: 400 }),
    sheet: () => new Response('{"result":"success"}'),
  });
  assert.equal((await submit("hubspot-down")).status, 200);
  assert.ok(errors.some((message) => message.includes("HubSpot 400 FIELD_NOT_IN_FORM_DEFINITION")));
  assert.ok(errors.every((message) => !message.includes("ada@example.com")), "no personal data in logs");

  globalThis.fetch = route({
    hubspot: () => new Response('{"inlineMessage":"Thanks"}'),
    sheet: () => { throw new Error("network"); },
  });
  assert.equal((await submit("sheet-down")).status, 200);

  globalThis.fetch = route({
    hubspot: () => new Response("{}", { status: 500 }),
    sheet: () => new Response("Bad gateway", { status: 502 }),
  });
  assert.deepEqual(stripHeaders(await submit("all-down")), {
    status: 500, jsonBody: { error: "Failed to submit form. Please try again." },
  });

  const bad = { ...lead, hutk: "not-a-token" };
  globalThis.fetch = route({ hubspot: () => new Response("{}"), sheet: () => new Response('{"result":"success"}') });
  await submit("bad-hutk", bad);
  assert.equal("hutk" in calls.hubspot.body.context, false);

  delete process.env.GOOGLE_SCRIPT_URL;
  calls.sheet = undefined;
  assert.equal((await submit("hubspot-only")).status, 200);
  assert.equal(calls.sheet, undefined);

  assert.equal((await submit("bad-json", "{not json")).status, 400);
});

test("contact bounds each destination and sends the whole message to HubSpot", async (t) => {
  const originalFetch = globalThis.fetch;
  const saved = { ...process.env };
  t.after(() => {
    globalThis.fetch = originalFetch;
    for (const key of ["GOOGLE_SCRIPT_URL", "HUBSPOT_PORTAL_ID", "HUBSPOT_FORM_GUID"]) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
  });
  process.env.GOOGLE_SCRIPT_URL = "https://sheet.invalid/exec";
  process.env.HUBSPOT_PORTAL_ID = "123";
  process.env.HUBSPOT_FORM_GUID = "form-guid";
  const errors = [];
  const context = { error: (message) => errors.push(String(message)) };
  const message = "x".repeat(5000);
  const submit = (ip) => registration.handler(new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify({ email: "a@example.com", heard_about: "other", message, website: "", elapsed_ms: 5000 }),
  }), context);

  const signals = [];
  let hubspotBody;
  globalThis.fetch = async (url, options) => {
    signals.push(options.signal);
    if (String(url).includes("hsforms")) {
      hubspotBody = JSON.parse(options.body);
      // A stalled HubSpot call ends when its timeout signal aborts it.
      throw new DOMException("The operation was aborted due to timeout", "TimeoutError");
    }
    return new Response('{"result":"success"}');
  };
  assert.deepEqual(stripHeaders(await submit("timeout")), { status: 200, jsonBody: { success: true } });
  assert.equal(signals.length, 2);
  assert.ok(signals.every((signal) => signal instanceof AbortSignal), "every destination has a timeout signal");
  assert.ok(errors.some((line) => line.includes("HubSpot") && line.includes("timeout")));
  const sentMessage = hubspotBody.fields.find((field) => field.name === "message").value;
  assert.equal(sentMessage.length, 5000);
});

test("contact drops bot submissions silently and sends them nowhere", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalUrl = process.env.GOOGLE_SCRIPT_URL;
  t.after(() => {
    globalThis.fetch = originalFetch;
    if (originalUrl === undefined) delete process.env.GOOGLE_SCRIPT_URL;
    else process.env.GOOGLE_SCRIPT_URL = originalUrl;
  });
  process.env.GOOGLE_SCRIPT_URL = "https://sheet.invalid/exec";
  let sent = 0;
  globalThis.fetch = async () => { sent++; return new Response('{"result":"success"}'); };
  const logs = [];
  const context = { error() {}, log: (message) => logs.push(String(message)) };
  const submit = (ip, extra) => registration.handler(new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify({ email: "bot@example.com", ...extra }),
  }), context);

  for (const [ip, extra] of [
    ["honeypot", { website: "https://spam.example", elapsed_ms: 9000 }],
    ["too-fast", { website: "", elapsed_ms: 400 }],
    ["no-timer", { website: "" }],
    ["no-honeypot", { elapsed_ms: 9000 }],
    ["text-timer", { website: "", elapsed_ms: "9000" }],
  ]) {
    assert.deepEqual(stripHeaders(await submit("spam-" + ip, extra)), { status: 200, jsonBody: { success: true } }, ip);
  }
  assert.equal(sent, 0, "no bot submission reaches a destination");
  assert.equal(logs.length, 5);
  assert.ok(logs.every((line) => !line.includes("bot@example.com")), "no personal data in logs");

  assert.equal((await submit("human", { website: "", elapsed_ms: 3000 })).status, 200);
  assert.equal(sent, 1);
});
