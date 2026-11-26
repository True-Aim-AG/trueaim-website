// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { CONSENT_STORAGE_KEY, consentChangeFromStorage, parseStored } from "../consent";
import { FIRST_TOUCH_STORAGE_KEY } from "../tracking/first-touch";
import { withdrawConsent } from "../tracking/withdraw-consent";

const now = Date.now();
const value = (analytics: boolean, hubspot: boolean) =>
  JSON.stringify({ essential: true, analytics, hubspot, savedAt: now });

let gtag: ReturnType<typeof vi.fn>;

function setUp() {
  gtag = vi.fn();
  (window as unknown as { gtag: unknown }).gtag = gtag;
  document.cookie = "_ga=GA1.1.1; path=/";
  document.cookie = "hubspotutk=abc; path=/";
  localStorage.setItem(FIRST_TOUCH_STORAGE_KEY, "{}");
}

const hsq = () => (window as unknown as { _hsq?: unknown[] })._hsq ?? [];

/** What this tab does when another tab stores `newValue` over `oldValue`. */
function otherTabStores(oldValue: string | null, newValue: string | null): boolean {
  const event = { key: CONSENT_STORAGE_KEY, oldValue, newValue };
  expect(consentChangeFromStorage(event)).toBe("withdrawn");
  return withdrawConsent(parseStored(event.oldValue), parseStored(event.newValue));
}

afterEach(() => {
  localStorage.clear();
  for (const name of ["_ga", "hubspotutk"]) document.cookie = `${name}=; Max-Age=0; path=/`;
  delete (window as unknown as { gtag?: unknown }).gtag;
  delete (window as unknown as { _hsq?: unknown })._hsq;
});

describe("withdrawal from another tab", () => {
  it("withdrawing analytics keeps HubSpot", () => {
    setUp();
    expect(otherTabStores(value(true, true), value(false, true))).toBe(true);
    expect(gtag).toHaveBeenCalledWith("consent", "update", { analytics_storage: "denied" });
    expect(document.cookie).not.toContain("_ga=");
    expect(localStorage.getItem(FIRST_TOUCH_STORAGE_KEY)).toBeNull();
    expect(hsq()).not.toContainEqual(["revokeCookieConsent"]);
    expect(document.cookie).toContain("hubspotutk=");
  });

  it("withdrawing HubSpot keeps analytics and the first touch", () => {
    setUp();
    expect(otherTabStores(value(true, true), value(true, false))).toBe(true);
    expect(hsq()).toContainEqual(["revokeCookieConsent"]);
    expect(document.cookie).not.toContain("hubspotutk=");
    expect(gtag).not.toHaveBeenCalled();
    expect(document.cookie).toContain("_ga=");
    expect(localStorage.getItem(FIRST_TOUCH_STORAGE_KEY)).toBe("{}");
  });

  it("a deleted choice withdraws both", () => {
    setUp();
    expect(otherTabStores(value(true, true), null)).toBe(true);
    expect(gtag).toHaveBeenCalledWith("consent", "update", { analytics_storage: "denied" });
    expect(hsq()).toContainEqual(["revokeCookieConsent"]);
    expect(document.cookie).not.toContain("_ga=");
    expect(document.cookie).not.toContain("hubspotutk=");
    expect(localStorage.getItem(FIRST_TOUCH_STORAGE_KEY)).toBeNull();
  });
});

describe("withdrawConsent", () => {
  it("does nothing when no category is withdrawn", () => {
    setUp();
    expect(withdrawConsent({ analytics: false, hubspot: true }, { analytics: true, hubspot: true })).toBe(false);
    expect(withdrawConsent(null, { analytics: false, hubspot: false })).toBe(false);
    expect(gtag).not.toHaveBeenCalled();
    expect(hsq()).toEqual([]);
    expect(document.cookie).toContain("_ga=");
    expect(document.cookie).toContain("hubspotutk=");
  });
});
