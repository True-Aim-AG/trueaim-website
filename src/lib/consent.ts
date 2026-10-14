/**
 * Cookie consent state, shared by the banner and every tracker. Strict
 * (basic) Consent Mode: nothing is loaded from Google or HubSpot until the
 * visitor accepts analytics cookies. The choice lives in localStorage
 * under "cookie-consent" as { essential: true, analytics: boolean }.
 */

export const CONSENT_STORAGE_KEY = "cookie-consent";
/** Fired on window after the visitor saves a choice. */
export const CONSENT_UPDATED_EVENT = "cookie-consent-update";
/** Fire on window to reopen the banner so the visitor can change the choice. */
export const OPEN_COOKIE_SETTINGS_EVENT = "open-cookie-settings";

export type ConsentPreferences = {
  essential: true;
  analytics: boolean;
};

/** The stored choice, or null when the visitor has not chosen yet. */
export function readConsent(): ConsentPreferences | null {
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as { analytics?: unknown };
    return { essential: true, analytics: parsed.analytics === true };
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent(): boolean {
  return readConsent()?.analytics === true;
}

export function saveConsent(preferences: ConsentPreferences): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // Storage blocked: the choice holds for this page view only.
  }
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
