import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";
import { Eyebrow } from "@/components/brand/Eyebrow";

const LAST_UPDATED = "2026-05-20";

type Group = "Features" | "Fixes" | "Improvements" | "Security";

type Release = {
  version: string;
  date: string;
  intro?: string;
  groups: Partial<Record<Group, string[]>>;
};

const RELEASES: Release[] = [
  {
    version: "v0.8.0",
    date: "2026-05-20",
    groups: {
      Features: [
        "Session lifetimes now roll continuously over a 24-hour idle / 7-day hard cap window, and users are signed out automatically on authentication-failure errors for tighter session hygiene.",
      ],
      Fixes: [
        "Content Security Policy: relaxed the image source policy to allow any HTTPS origin, restoring image rendering for customer-supplied assets served from external CDNs.",
      ],
    },
  },
  {
    version: "v0.7.0",
    date: "2026-05-16",
    groups: {
      Features: [
        "Stale-claim watchdog auto-fails runs stalled for more than 20 minutes, so stuck claims surface to operators instead of hanging indefinitely.",
        "Structured worker logging and pre-pipeline lifecycle stage events provide end-to-end traceability of every claim.",
        "Workbench now surfaces stalled claims explicitly (replacing the previous “Unknown” state) and the dashboard live-reloads while runs are in flight.",
        "Super-admins can now delete claims directly from the dashboard.",
      ],
      Improvements: [
        "Stepper derives state once and reflects success and in-progress states correctly.",
        "In-progress view renders immediately after claim creation (no perceived blank state).",
        "Restored vision extraction on Document Intelligence cache-hit reruns.",
        "Production: unbuffered stdout, single worker, and predictable AI inference throughput.",
        "Frontend: `.mjs` is now served with the correct JavaScript MIME type so the PDF.js worker loads cleanly.",
      ],
    },
  },
  {
    version: "v0.6.0",
    date: "2026-05-15",
    groups: {
      Features: [
        "Release automation: `release-please` now owns version bumps and GitHub Release creation, giving the platform a fully automated, auditable release pipeline.",
      ],
      Fixes: [
        "Workbench claim table now reflects the override verdict and payout immediately after a claim is finalized.",
        "Frontend CSP allows SAS blob origins so customer document previews render reliably.",
        "Hardened the release-please configuration for deterministic version computation.",
      ],
    },
  },
  {
    version: "v0.5.0",
    date: "2026-05-15",
    intro: "This release consolidates work that spanned v0.3.0 and v0.4.0 (administrative tag-only releases) plus the v0.5.0 cycle.",
    groups: {
      Features: [
        "Workbench: migrated the legacy extraction-review and side-by-side compare workbench into the new platform.",
        "Processing dashboard: upgraded with KPI tiles, pipeline funnel, and volume chart.",
        "Vehicle endpoint: new read endpoint exposing vehicle details for downstream consumers.",
        "Admin: Platform Status page for at-a-glance system health.",
        "Theming & i18n: three new themes, plus chrome cleanup across customer tenants.",
        "AI PR reviewer: automated pull-request reviewer with manual command triggers, a CI queue, and chunked review support for diffs over the 200 KB single-call budget.",
      ],
      Security: [
        "Session hardening: tightened session timeouts to SOC 2-compliant defaults.",
        "Transport security: pinned TLS 1.2 and added a security-headers middleware.",
        "Cloud monitoring: enabled Microsoft Defender for Cloud Standard tiers across all relevant resource types.",
        "Audit logging & alerting: added Activity Log, diagnostic Log, and Storage alerts for production environments.",
        "Capacity & operations: published an Azure Workbook covering capacity planning and operational dashboards.",
        "Network telemetry: enabled VNet flow logs on production and demo environments.",
        "Application security: added GitHub CodeQL static-analysis workflow.",
        "Vulnerability management: closed P1 backlog of Azure container image findings; pinned key Python dependencies to clear HIGH findings.",
        "Dependency management: added Dependabot configuration for routine security updates.",
        "Branch protection: configured require-last-push-approval and dismiss-stale-reviews rulesets.",
        "Documentation: published Stage 2 SOC 2 policies and runbooks, code-review policy, and Vanta evidence summary.",
      ],
      Fixes: [
        "Aligned screening brand keys with renamed canonical slugs; bridged workbench to legacy parity and wired the new vehicle endpoint; matched async AI client retry budget to the sync client.",
        "Frontend: switched the production base image to a slim nginx-alpine variant to clear a CVE; resolved type-export issues; corrected pnpm install path.",
        "Backend: production builds now use a slimmer dependency install for smaller images.",
        "Infrastructure: corrected shared-storage resource scope; suppressed CodeQL false positives.",
      ],
    },
  },
];

const GROUP_ORDER: Group[] = ["Features", "Improvements", "Fixes", "Security"];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      <div className="pt-20 md:pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] text-strong mb-4">
            Changelog
          </h1>
          <p className="text-sm text-muted mb-8">
            <strong className="text-strong">Last updated:</strong> {LAST_UPDATED}
          </p>

          <div>
            <p className="text-body leading-[1.6]">
              Public release history of the True Aim Platform. Each entry summarizes user-visible features, reliability improvements, fixes, and security or compliance work shipped in that release.
            </p>

            {RELEASES.map((release, index) => (
              <article
                key={release.version}
                className={index === 0 ? "mt-14" : "mt-14 pt-14 border-t border-hairline"}
              >
                <header>
                  <Eyebrow>{release.date}</Eyebrow>
                  <h2 className="font-display text-2xl font-bold text-strong mt-1">
                    True Aim Platform {release.version}
                  </h2>
                </header>
                {release.intro && (
                  <p className="text-body leading-[1.6] italic mt-4">
                    {release.intro}
                  </p>
                )}
                <div className="mt-6 space-y-6">
                  {GROUP_ORDER.filter((g) => release.groups[g]).map((group) => (
                    <div key={group}>
                      <span className="inline-flex items-center rounded-pill bg-accent-soft text-accent px-3 py-1 text-xs font-medium mb-3">
                        {group}
                      </span>
                      <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-1">
                        {release.groups[group]!.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
