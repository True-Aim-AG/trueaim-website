import { hasAnalyticsConsent } from "@/lib/consent";

export function trackOutboundClick(url: string, label: string): void {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;
  const hsq = (window as unknown as { _hsq?: unknown[][] })._hsq;
  hsq?.push([
    "trackCustomBehavioralEvent",
    { name: "pe_outbound_click", properties: { url, label } },
  ]);
}
