import { hasAnalyticsConsent } from "@/lib/consent";

/**
 * First-visit attribution sent with every form as hidden fields: the
 * landing page, the external referrer and the UTM parameters of the first
 * page view. Together with "How did you hear about us?" this is the record
 * the Firon revenue share is measured on.
 *
 * Nothing is stored before consent. The values are captured into memory on
 * the first page view, which survives client-side navigation, and written
 * to localStorage only once the visitor accepts analytics cookies, so a
 * consenting visitor keeps their first touch across visits for 90 days.
 * Only origin and path are kept from URLs: query strings and fragments can
 * carry personal data.
 */

export const FIRST_TOUCH_STORAGE_KEY = "ta-first-touch";
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export type FirstTouch = {
  landing_page: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
};

type StoredFirstTouch = FirstTouch & { captured_at: number };

let current: StoredFirstTouch | null = null;

function originAndPath(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.origin + parsed.pathname;
  } catch {
    return "";
  }
}

// www.trueaim.ai and trueaim.ai are one site. The server now answers www
// with a 301, which keeps the original referrer, but a visitor whose cached
// page still ran the old in-browser redirect arrives with the www page as
// document.referrer; that must not count as an external source.
function siteHost(host: string): string {
  return host.replace(/^www\./, "");
}

function fromLocation(): StoredFirstTouch {
  const params = new URLSearchParams(window.location.search);
  let referrer = "";
  try {
    const from = new URL(document.referrer);
    if (siteHost(from.host) !== siteHost(window.location.host)) referrer = originAndPath(document.referrer);
  } catch {
    // No referrer, or not a URL.
  }
  const touch = {
    landing_page: window.location.origin + window.location.pathname,
    referrer,
    captured_at: Date.now(),
  } as StoredFirstTouch;
  for (const key of UTM_KEYS) touch[key] = (params.get(key) ?? "").slice(0, 200);
  return touch;
}

function readStored(): StoredFirstTouch | null {
  try {
    const raw = localStorage.getItem(FIRST_TOUCH_STORAGE_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as StoredFirstTouch;
    if (typeof stored.captured_at !== "number" || Date.now() - stored.captured_at > MAX_AGE_MS) return null;
    return stored;
  } catch {
    return null;
  }
}

/** Persists the captured first touch, only with analytics consent and never over an earlier one. */
export function persistFirstTouch(): void {
  if (!current || !hasAnalyticsConsent() || readStored()) return;
  try {
    localStorage.setItem(FIRST_TOUCH_STORAGE_KEY, JSON.stringify(current));
  } catch {
    // Storage blocked: memory still covers this visit.
  }
}

/** Call once per page load; later calls in the same visit are no-ops. */
export function captureFirstTouch(): void {
  if (current) return;
  current = readStored() ?? fromLocation();
  persistFirstTouch();
}

/** The hidden form fields. Falls back to the current page if nothing was captured. */
export function getFirstTouch(): FirstTouch {
  const touch = current ?? readStored() ?? fromLocation();
  return {
    landing_page: touch.landing_page,
    referrer: touch.referrer,
    utm_source: touch.utm_source,
    utm_medium: touch.utm_medium,
    utm_campaign: touch.utm_campaign,
    utm_term: touch.utm_term,
    utm_content: touch.utm_content,
  };
}

/** Removes the stored first touch, for consent withdrawal. */
export function clearFirstTouch(): void {
  try {
    localStorage.removeItem(FIRST_TOUCH_STORAGE_KEY);
  } catch {
    // Nothing stored.
  }
}

/** For tests: forget the in-memory capture. */
export function resetFirstTouchForTests(): void {
  current = null;
}
