// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  CONSENT_MAX_AGE_MS,
  CONSENT_STORAGE_KEY,
  CONSENT_UPDATED_EVENT,
  clearConsent,
  consentChangeFromStorage,
  consentDefaultScript,
  hasAnalyticsConsent,
  hasExpiredConsent,
  hasHubSpotConsent,
  readConsent,
  revokeTracking,
  saveConsent,
} from "../consent";

afterEach(() => {
  localStorage.clear();
  vi.useRealTimers();
  delete (window as unknown as { gtag?: unknown }).gtag;
  delete (window as unknown as { _hsq?: unknown })._hsq;
  delete (window as unknown as { dataLayer?: unknown }).dataLayer;
});

const stored = (value: object) => JSON.stringify(value);

describe("consent state", () => {
  it("is null before the visitor chooses and tolerates bad storage", () => {
    expect(readConsent()).toBeNull();
    localStorage.setItem(CONSENT_STORAGE_KEY, "not json");
    expect(readConsent()).toBeNull();
    expect(hasAnalyticsConsent()).toBe(false);
    expect(hasHubSpotConsent()).toBe(false);
  });

  it("saves the choice with a timestamp and announces it", () => {
    const listener = vi.fn();
    window.addEventListener(CONSENT_UPDATED_EVENT, listener);
    saveConsent({ essential: true, analytics: true, hubspot: false });
    window.removeEventListener(CONSENT_UPDATED_EVENT, listener);
    expect(listener).toHaveBeenCalledOnce();
    expect(readConsent()).toEqual({ essential: true, analytics: true, hubspot: false });
    expect(typeof JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY)!).savedAt).toBe("number");
  });

  it("keeps HubSpot separate from analytics", () => {
    saveConsent({ essential: true, analytics: true, hubspot: false });
    expect(hasAnalyticsConsent()).toBe(true);
    expect(hasHubSpotConsent()).toBe(false);
    saveConsent({ essential: true, analytics: false, hubspot: true });
    expect(hasAnalyticsConsent()).toBe(false);
    expect(hasHubSpotConsent()).toBe(true);
  });

  it("tells GTM which categories are granted, without personal data", () => {
    saveConsent({ essential: true, analytics: true, hubspot: false });
    const layer = (window as unknown as { dataLayer: unknown[] }).dataLayer;
    expect(layer).toContainEqual({
      event: "cookie_consent_update",
      consent_analytics: "granted",
      consent_hubspot: "denied",
    });
  });
});

describe("consent expiry", () => {
  it("expires the choice after six months", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    saveConsent({ essential: true, analytics: true, hubspot: true });
    vi.setSystemTime(Date.now() + CONSENT_MAX_AGE_MS - 1000);
    expect(hasAnalyticsConsent()).toBe(true);
    expect(hasExpiredConsent()).toBe(false);
    vi.setSystemTime(Date.now() + 2000);
    expect(readConsent()).toBeNull();
    expect(hasAnalyticsConsent()).toBe(false);
    expect(hasHubSpotConsent()).toBe(false);
    expect(hasExpiredConsent()).toBe(true);
  });

  it("treats a choice saved before expiry existed as expired", () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, stored({ essential: true, analytics: true }));
    expect(readConsent()).toBeNull();
    expect(hasExpiredConsent()).toBe(true);
    clearConsent();
    expect(hasExpiredConsent()).toBe(false);
    expect(localStorage.getItem(CONSENT_STORAGE_KEY)).toBeNull();
  });
});

describe("consent defaults", () => {
  it("denies all four Consent Mode v2 signals", () => {
    for (const signal of ["analytics_storage", "ad_storage", "ad_user_data", "ad_personalization"]) {
      expect(consentDefaultScript).toContain(`${signal}:'denied'`);
    }
    expect(consentDefaultScript).not.toContain("granted");
  });
});

describe("revokeTracking", () => {
  it("with no argument, denies analytics, revokes HubSpot and deletes tracking cookies only", () => {
    const gtag = vi.fn();
    (window as unknown as { gtag: unknown }).gtag = gtag;
    document.cookie = "_ga=GA1.1.1; path=/";
    document.cookie = "hubspotutk=abc; path=/";
    document.cookie = "keep=1; path=/";
    revokeTracking();
    expect(gtag).toHaveBeenCalledWith("consent", "update", { analytics_storage: "denied" });
    expect((window as unknown as { _hsq: unknown[] })._hsq).toContainEqual(["revokeCookieConsent"]);
    expect(document.cookie).not.toContain("_ga=");
    expect(document.cookie).not.toContain("hubspotutk=");
    expect(document.cookie).toContain("keep=1");
    document.cookie = "keep=; Max-Age=0; path=/";
  });

  it("undoes only HubSpot when analytics stays granted", () => {
    const gtag = vi.fn();
    (window as unknown as { gtag: unknown }).gtag = gtag;
    document.cookie = "_ga=GA1.1.1; path=/";
    document.cookie = "__hstc=abc; path=/";
    revokeTracking({ analytics: true, hubspot: false });
    expect(gtag).not.toHaveBeenCalled();
    expect((window as unknown as { _hsq: unknown[] })._hsq).toContainEqual(["revokeCookieConsent"]);
    expect(document.cookie).toContain("_ga=");
    expect(document.cookie).not.toContain("__hstc=");
    document.cookie = "_ga=; Max-Age=0; path=/";
  });
});

describe("consentChangeFromStorage", () => {
  const now = Date.now();
  const all = stored({ essential: true, analytics: true, hubspot: true, savedAt: now });
  const analyticsOnly = stored({ essential: true, analytics: true, hubspot: false, savedAt: now });
  const none = stored({ essential: true, analytics: false, hubspot: false, savedAt: now });
  const change = (oldValue: string | null, newValue: string | null, key: string | null = CONSENT_STORAGE_KEY) =>
    consentChangeFromStorage({ key, oldValue, newValue });

  it("reads another tab's withdrawal, grant and plain choice", () => {
    expect(change(all, none)).toBe("withdrawn");
    expect(change(all, analyticsOnly)).toBe("withdrawn");
    expect(change(all, null)).toBe("withdrawn");
    expect(change(all, null, null)).toBe("withdrawn");
    expect(change(null, all)).toBe("granted");
    expect(change(analyticsOnly, all)).toBe("granted");
    expect(change(null, none)).toBe("decided");
  });

  it("ignores other keys and non-changes", () => {
    expect(change(all, none, "ta-first-touch")).toBeNull();
    expect(change(null, null)).toBeNull();
  });
});
