/**
 * Cookie consent state, shared by the banner and every tracker. Strict
 * (basic) Consent Mode: nothing is loaded from Google or HubSpot until the
 * visitor accepts the matching category. The choice lives in localStorage
 * under "cookie-consent" as { essential, analytics, hubspot, savedAt }.
 *
 * Two optional categories, each with its own consent:
 * - analytics: Google Tag Manager and Google Analytics 4, aggregated statistics.
 * - hubspot: the HubSpot tracker, which recognises a returning visitor and
 *   links their visits to a demo request in our CRM. That is tracking of one
 *   person, so it is never filed under analytics.
 *
 * A stored choice stays valid until the visitor changes it. A choice without
 * savedAt was stored when HubSpot still sat under analytics: it counts as
 * outdated, so every visitor is asked once for the separate HubSpot choice.
 */

export const CONSENT_STORAGE_KEY = "cookie-consent";
/** Fired on window after the visitor saves a choice. */
export const CONSENT_UPDATED_EVENT = "cookie-consent-update";
/** Fire on window to reopen the banner so the visitor can change the choice. */
export const OPEN_COOKIE_SETTINGS_EVENT = "open-cookie-settings";

export type ConsentPreferences = {
  essential: true;
  analytics: boolean;
  hubspot: boolean;
};

type StoredConsent = ConsentPreferences & { savedAt: number };

function parseStored(raw: string | null): ConsentPreferences | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { analytics?: unknown; hubspot?: unknown; savedAt?: unknown };
    if (typeof parsed.savedAt !== "number" || !Number.isFinite(parsed.savedAt)) return null;
    return { essential: true, analytics: parsed.analytics === true, hubspot: parsed.hubspot === true };
  } catch {
    return null;
  }
}

/** The stored choice, or null when the visitor has not chosen yet or the choice is outdated. */
export function readConsent(): ConsentPreferences | null {
  try {
    return parseStored(localStorage.getItem(CONSENT_STORAGE_KEY));
  } catch {
    return null;
  }
}

/**
 * True when a choice is stored but no longer valid (saved before HubSpot had
 * its own category). The banner then deletes it and the tracking cookies.
 */
export function hasOutdatedConsent(): boolean {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    return raw !== null && parseStored(raw) === null;
  } catch {
    return false;
  }
}

/** Deletes the stored choice, so the banner asks again. */
export function clearConsent(): void {
  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // Nothing stored.
  }
}

export function hasAnalyticsConsent(): boolean {
  return readConsent()?.analytics === true;
}

export function hasHubSpotConsent(): boolean {
  return readConsent()?.hubspot === true;
}

/**
 * What a `storage` event from another tab means for this tab: "withdrawn"
 * (a category was granted and no longer is), "granted" (a category is newly
 * granted and none was withdrawn), or "decided" (a choice was stored with no
 * change to any category). null when the event is not about consent.
 * localStorage.clear() has a null key.
 */
export function consentChangeFromStorage(event: {
  key: string | null;
  oldValue: string | null;
  newValue: string | null;
}): "withdrawn" | "granted" | "decided" | null {
  if (event.key !== null && event.key !== CONSENT_STORAGE_KEY) return null;
  const before = parseStored(event.oldValue);
  const after = parseStored(event.newValue);
  const categories = ["analytics", "hubspot"] as const;
  if (categories.some((c) => before?.[c] && !after?.[c])) return "withdrawn";
  if (categories.some((c) => !before?.[c] && after?.[c])) return "granted";
  return event.newValue !== null ? "decided" : null;
}

export function saveConsent(preferences: ConsentPreferences): void {
  const stored: StoredConsent = { ...preferences, savedAt: Date.now() };
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Storage blocked: the choice holds for this page view only.
  }
  // Tells a GTM trigger which categories are granted, so a tag in the
  // container can follow the HubSpot choice too. No personal data.
  pushDataLayer({
    event: "cookie_consent_update",
    consent_analytics: preferences.analytics ? "granted" : "denied",
    consent_hubspot: preferences.hubspot ? "granted" : "denied",
  });
  window.dispatchEvent(new Event(CONSENT_UPDATED_EVENT));
}

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
export const analyticsConfigured = Boolean(GTM_ID || GA_MEASUREMENT_ID);

/**
 * Inline <head> script, first on the page: defines gtag and sets all four
 * Consent Mode v2 signals to denied before any tag can exist.
 */
export const consentDefaultScript = [
  "window.dataLayer=window.dataLayer||[];",
  "function gtag(){dataLayer.push(arguments);}",
  "gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});",
].join("");

type Gtag = (...args: unknown[]) => void;

export function gtag(...args: unknown[]): void {
  const fn = (window as unknown as { gtag?: Gtag }).gtag;
  if (fn) fn(...args);
}

/** Pushes a plain event object to the GTM data layer. Never pass personal data. */
export function pushDataLayer(event: Record<string, string | number>): void {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(event);
}

const ANALYTICS_COOKIE = /^(_ga|_gid|_gat)/;
const HUBSPOT_COOKIE = /^(hubspotutk|__hs|messagesUtk)/;

/**
 * Undoes each category the visitor no longer accepts: for analytics, denies
 * analytics storage and deletes the GA cookies; for HubSpot, tells HubSpot to
 * drop its cookies and deletes them. Cookies are deleted on this host and its
 * parent domain. With no argument, both categories are undone. The caller
 * reloads the page afterwards so no loaded tag keeps running.
 */
export function revokeTracking(keep: { analytics: boolean; hubspot: boolean } = { analytics: false, hubspot: false }): void {
  if (!keep.analytics) gtag("consent", "update", { analytics_storage: "denied" });
  if (!keep.hubspot) {
    const w = window as unknown as { _hsq?: unknown[] };
    w._hsq = w._hsq || [];
    w._hsq.push(["revokeCookieConsent"]);
  }
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    const drop = (!keep.analytics && ANALYTICS_COOKIE.test(name)) || (!keep.hubspot && HUBSPOT_COOKIE.test(name));
    if (!drop) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}
