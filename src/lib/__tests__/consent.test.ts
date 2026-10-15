// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  CONSENT_STORAGE_KEY,
  CONSENT_UPDATED_EVENT,
  consentChangeFromStorage,
  consentDefaultScript,
  hasAnalyticsConsent,
  readConsent,
  revokeTracking,
  saveConsent,
} from "../consent";

afterEach(() => {
  localStorage.clear();
  delete (window as unknown as { gtag?: unknown }).gtag;
  delete (window as unknown as { _hsq?: unknown })._hsq;
});

describe("consent state", () => {
  it("is null before the visitor chooses and tolerates bad storage", () => {
    expect(readConsent()).toBeNull();
    localStorage.setItem(CONSENT_STORAGE_KEY, "not json");
    expect(readConsent()).toBeNull();
    expect(hasAnalyticsConsent()).toBe(false);
  });

  it("saves the choice and announces it", () => {
    const listener = vi.fn();
    window.addEventListener(CONSENT_UPDATED_EVENT, listener);
    saveConsent({ essential: true, analytics: true });
    window.removeEventListener(CONSENT_UPDATED_EVENT, listener);
    expect(listener).toHaveBeenCalledOnce();
    expect(readConsent()).toEqual({ essential: true, analytics: true });
    expect(hasAnalyticsConsent()).toBe(true);
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
  it("denies analytics, revokes HubSpot and deletes tracking cookies only", () => {
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
  });
});

describe("consentChangeFromStorage", () => {
  const granted = JSON.stringify({ essential: true, analytics: true });
  const denied = JSON.stringify({ essential: true, analytics: false });
  const change = (oldValue: string | null, newValue: string | null, key: string | null = CONSENT_STORAGE_KEY) =>
    consentChangeFromStorage({ key, oldValue, newValue });

  it("reads another tab's withdrawal, grant and plain choice", () => {
    expect(change(granted, denied)).toBe("withdrawn");
    expect(change(granted, null)).toBe("withdrawn");
    expect(change(granted, null, null)).toBe("withdrawn");
    expect(change(null, granted)).toBe("granted");
    expect(change(denied, granted)).toBe("granted");
    expect(change(null, denied)).toBe("decided");
  });

  it("ignores other keys and non-changes", () => {
    expect(change(granted, denied, "ta-first-touch")).toBeNull();
    expect(change(null, null)).toBeNull();
  });
});
