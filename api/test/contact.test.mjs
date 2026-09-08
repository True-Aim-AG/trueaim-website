import assert from "node:assert/strict";
import { test } from "node:test";
import { app } from "@azure/functions";

let registration;
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
    body: JSON.stringify({ name: "Test" }),
  });
  const submit = (ip) => registration.handler(request(ip), context);

  delete process.env.GOOGLE_SCRIPT_URL;
  assert.deepEqual(await submit("missing-config"), {
    status: 500, jsonBody: { error: "Form submission is not configured" },
  });
  process.env.GOOGLE_SCRIPT_URL = "https://example.invalid/test";
  globalThis.fetch = async (url, options) => {
    assert.equal(url, process.env.GOOGLE_SCRIPT_URL);
    assert.equal(options.method, "POST");
    assert.equal(options.redirect, "follow");
    assert.deepEqual(JSON.parse(options.body), { name: "Test" });
    return new Response('{"result":"success"}');
  };
  assert.deepEqual(await submit("success"), { status: 200, jsonBody: { success: true } });
  globalThis.fetch = async () => new Response("<html>Success</html>");
  assert.deepEqual(await submit("html"), { status: 200, jsonBody: { success: true } });
  globalThis.fetch = async () => new Response('{"message":"Rejected"}');
  assert.deepEqual(await submit("rejected"), { status: 500, jsonBody: { error: "Rejected" } });
  globalThis.fetch = async () => new Response("Bad gateway", { status: 502 });
  assert.deepEqual(await submit("bad-response"), {
    status: 500, jsonBody: { error: "Failed to submit form. Please try again." },
  });
  globalThis.fetch = async () => new Response('{"result":"success"}');
  for (let i = 0; i < 5; i++) assert.equal((await submit("limited, proxy-" + i)).status, 200);
  assert.deepEqual(await submit("limited, another-proxy"), {
    status: 429, jsonBody: { error: "Too many requests. Please try again later." },
  });
  assert.equal((await submit("different-client")).status, 200);
});
