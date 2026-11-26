import { revokeTracking, type ConsentPreferences } from "@/lib/consent";
import { clearFirstTouch } from "@/lib/tracking/first-touch";

type Choice = Pick<ConsentPreferences, "analytics" | "hubspot"> | null;

/**
 * Applies a change of consent from `before` to `after`, in this tab or from
 * another tab: undoes only the categories that were granted and no longer
 * are, keeps every category that is still granted, and clears the first
 * touch only when analytics is withdrawn. `after` null (choice deleted)
 * withdraws both. Returns true when something was withdrawn, so the caller
 * reloads the page and no loaded tag keeps running.
 */
export function withdrawConsent(before: Choice, after: Choice): boolean {
  const keep = { analytics: after?.analytics === true, hubspot: after?.hubspot === true };
  const analyticsWithdrawn = before?.analytics === true && !keep.analytics;
  const hubspotWithdrawn = before?.hubspot === true && !keep.hubspot;
  if (!analyticsWithdrawn && !hubspotWithdrawn) return false;
  revokeTracking(keep);
  if (analyticsWithdrawn) clearFirstTouch();
  return true;
}
