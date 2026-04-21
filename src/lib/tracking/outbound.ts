const STORAGE_KEY = "cookie-consent";

function hasAnalyticsConsent(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return false;
    const prefs = JSON.parse(stored) as { analytics?: boolean };
    return prefs.analytics === true;
  } catch {
    return false;
  }
}

export function trackOutboundClick(url: string, label: string): void {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;
  const hsq = (window as unknown as { _hsq?: unknown[][] })._hsq;
  hsq?.push([
    "trackCustomBehavioralEvent",
    { name: "pe_outbound_click", properties: { url, label } },
  ]);
}
