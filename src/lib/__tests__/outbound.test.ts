// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { trackOutboundClick } from "../tracking/outbound";

describe("trackOutboundClick", () => {
  beforeEach(() => {
    localStorage.clear();
    (window as unknown as { _hsq?: unknown[] })._hsq = [];
  });

  afterEach(() => {
    delete (window as unknown as { _hsq?: unknown[] })._hsq;
  });

  it("is a no-op when no consent is stored", () => {
    trackOutboundClick("https://example.com", "example");
    const hsq = (window as unknown as { _hsq: unknown[] })._hsq;
    expect(hsq).toEqual([]);
  });

  it("is a no-op when analytics consent is false", () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ analytics: false }));
    trackOutboundClick("https://example.com", "example");
    const hsq = (window as unknown as { _hsq: unknown[] })._hsq;
    expect(hsq).toEqual([]);
  });

  it("pushes a HubSpot custom event when analytics consent is true", () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ analytics: true }));
    trackOutboundClick("https://example.com", "example");
    const hsq = (window as unknown as { _hsq: unknown[][] })._hsq;
    expect(hsq).toHaveLength(1);
    expect(hsq[0]).toEqual([
      "trackCustomBehavioralEvent",
      { name: "pe_outbound_click", properties: { url: "https://example.com", label: "example" } },
    ]);
  });

  it("is a no-op when localStorage contains invalid JSON", () => {
    localStorage.setItem("cookie-consent", "not json");
    trackOutboundClick("https://example.com", "example");
    const hsq = (window as unknown as { _hsq: unknown[] })._hsq;
    expect(hsq).toEqual([]);
  });
});
