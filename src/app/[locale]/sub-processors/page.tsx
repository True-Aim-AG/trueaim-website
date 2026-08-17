import type { Metadata } from "next";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";

export const metadata: Metadata = {
  title: "List of Sub-Processors | True Aim AG",
  description:
    "Schedule 2 to the True Aim AG Data Processing Agreement: the operative list of sub-processors engaged in the processing of personal data, with service, data categories and processing location.",
  alternates: { canonical: "https://trueaim.ai/sub-processors" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "2026-08-17";
const VERSION = "1.0";
const EFFECTIVE_DATE = "2026-08-17";

type TocItem = { id: string; label: string };

const TOC: TocItem[] = [
  { id: "microsoft", label: "Microsoft Ireland Operations Ltd" },
  { id: "google", label: "Google Ireland Limited" },
  { id: "slack", label: "Slack Technologies Limited" },
  { id: "version-history", label: "Version History" },
];

export default function SubProcessorsPage() {
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />

      {/* Print-friendly + document panel styles */}
      <style>{`
        .doc-panel {
          background: #fafafa;
          color: #1a1a1a;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 12px;
          box-shadow: 0 8px 32px -4px rgba(0, 0, 0, 0.5);
        }
        .doc-panel h1,
        .doc-panel h2,
        .doc-panel h3 {
          color: #0f172a;
          font-weight: 700;
          letter-spacing: -0.01em;
        }
        .doc-panel h2 {
          font-size: 1.5rem;
          line-height: 2rem;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          scroll-margin-top: 7rem;
        }
        .doc-panel section[id] {
          scroll-margin-top: 7rem;
        }
        .doc-panel h3 {
          font-size: 1.125rem;
          line-height: 1.75rem;
          margin-top: 1.75rem;
          margin-bottom: 0.5rem;
        }
        .doc-panel p,
        .doc-panel li {
          color: #1f2937;
          line-height: 1.75;
          font-size: 1rem;
        }
        .doc-panel a.anchor-link {
          color: #1d4ed8;
          text-decoration: none;
          opacity: 0;
          margin-left: 0.5rem;
          font-weight: 400;
          font-size: 0.875rem;
        }
        .doc-panel h2:hover a.anchor-link,
        .doc-panel h3:hover a.anchor-link {
          opacity: 0.6;
        }
        .doc-panel .meta-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 0.75rem;
        }
        .doc-panel .meta-table th,
        .doc-panel .meta-table td {
          text-align: left;
          padding: 0.625rem 0.75rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          font-size: 0.95rem;
          color: #1f2937;
        }
        .doc-panel .meta-table th {
          background: rgba(0, 0, 0, 0.03);
          font-weight: 600;
          color: #0f172a;
        }
        .doc-panel .subproc {
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 8px;
          padding: 1rem 1.25rem;
          margin-top: 1rem;
          background: #ffffff;
        }
        .doc-panel .subproc dt {
          font-weight: 600;
          color: #0f172a;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-top: 0.5rem;
        }
        .doc-panel .subproc dd {
          margin-left: 0;
          margin-bottom: 0.25rem;
          color: #1f2937;
        }
        .toc-sticky a.active {
          color: var(--primary);
          font-weight: 600;
        }

        @media print {
          :root,
          [data-theme="dark"] {
            --background: #ffffff;
            --text-primary: #000;
          }
          body { background: #fff !important; color: #000 !important; }
          nav, header, footer, .no-print { display: none !important; }
          .toc-sticky { display: none !important; }
          .doc-panel {
            background: #fff !important;
            color: #000 !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            padding: 0 !important;
          }
          .doc-panel h2 { page-break-after: avoid; }
          .doc-panel p, .doc-panel li { page-break-inside: avoid; }
          a { color: #000 !important; text-decoration: none !important; }
          .doc-panel a.anchor-link { display: none !important; }
        }
      `}</style>

      <div className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8">
          {/* Sticky Table of Contents */}
          <aside className="toc-sticky no-print">
            <div className="lg:sticky lg:top-24">
              <p className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-3">
                Contents
              </p>
              <nav aria-label="Table of contents">
                <ul className="space-y-2 text-sm">
                  {TOC.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors leading-snug"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Document panel */}
          <main>
            <div className="mb-6 no-print">
              <p className="text-xs uppercase tracking-wider text-[var(--text-muted)]">
                Legal document
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] mt-1">
                List of Sub-Processors
              </h1>
              <p className="text-sm text-[var(--text-muted)] mt-2">
                Version {VERSION} · Last updated {LAST_UPDATED}
              </p>
            </div>

            <article
              className="doc-panel p-6 sm:p-10 lg:p-14"
              style={{ maxWidth: "78ch", marginLeft: "auto", marginRight: "auto" }}
            >
              {/* Document header (always visible, including print) */}
              <header className="border-b border-black/10 pb-6 mb-6">
                <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">
                  Schedule 2 to Data Processing Agreement
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  List of Sub-Processors
                </h1>
                <dl className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-y-2 text-sm">
                  <dt className="text-slate-500">Version</dt>
                  <dd className="text-slate-900 font-medium sm:col-span-2">{VERSION}</dd>
                  <dt className="text-slate-500">Effective date</dt>
                  <dd className="text-slate-900 font-medium sm:col-span-2">{EFFECTIVE_DATE}</dd>
                  <dt className="text-slate-500">Last updated</dt>
                  <dd className="text-slate-900 font-medium sm:col-span-2">{LAST_UPDATED}</dd>
                  <dt className="text-slate-500">Legal basis</dt>
                  <dd className="text-slate-900 font-medium sm:col-span-2">
                    Swiss FADP Art. 9; GDPR Art. 28
                  </dd>
                </dl>
              </header>

              <p className="text-slate-800">
                This list is, as updated in accordance with the Data Processing Agreement
                (DPA), the operative list for the purposes of the DPA.
              </p>

              {/* Microsoft */}
              <section id="microsoft">
                <h2>
                  Microsoft Ireland Operations Ltd
                  <a href="#microsoft" className="anchor-link" aria-label="Link to section">#</a>
                </h2>
                <dl className="subproc">
                  <dt>Entity</dt>
                  <dd>
                    Microsoft Ireland Operations Ltd, One Microsoft Place, South County
                    Business Park, Leopardstown, Dublin 18, Ireland
                  </dd>
                  <dt>Service</dt>
                  <dd>
                    Cloud infrastructure and hosting (Microsoft Azure), including compute,
                    database, storage, AI model inference, document processing, key
                    management, monitoring and networking services deployed within the
                    Company&apos;s Azure tenant.
                  </dd>
                  <dt>Personal Data Affected</dt>
                  <dd>
                    All categories of Personal Data listed in clause 4 (identification,
                    policy and claim reference, claim-related data including Sensitive
                    Personal Data where the claim requires it, and financial data), together
                    with platform telemetry (request metadata, error traces) and
                    authorised-user account data.
                  </dd>
                  <dt>Location</dt>
                  <dd>
                    Switzerland North (Zurich) for all data at rest and primary processing.
                    No ancillary Azure service processes Personal Data outside Switzerland
                    or the EEA.
                  </dd>
                </dl>
              </section>

              {/* Google */}
              <section id="google">
                <h2>
                  Google Ireland Limited
                  <a href="#google" className="anchor-link" aria-label="Link to section">#</a>
                </h2>
                <dl className="subproc">
                  <dt>Entity</dt>
                  <dd>
                    Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland
                  </dd>
                  <dt>Service</dt>
                  <dd>
                    Business productivity and communications suite (Google Workspace),
                    including email, document storage and calendar services used for client
                    communications and operational coordination, including correspondence
                    that may contain claim-related Personal Data submitted by the Client
                    outside the Platform.
                  </dd>
                  <dt>Personal Data Affected</dt>
                  <dd>
                    Identification data and any claim-related Personal Data voluntarily
                    included by the Client or Data Subjects in email correspondence or
                    shared documents.
                  </dd>
                  <dt>Location</dt>
                  <dd>
                    European Union (Google Workspace data region configured for Europe).
                    Governed by the Google Cloud / Workspace Data Processing Addendum and EU
                    Standard Contractual Clauses.
                  </dd>
                </dl>
              </section>

              {/* Slack */}
              <section id="slack">
                <h2>
                  Slack Technologies Limited
                  <a href="#slack" className="anchor-link" aria-label="Link to section">#</a>
                </h2>
                <dl className="subproc">
                  <dt>Entity</dt>
                  <dd>
                    Slack Technologies Limited, 4th Floor, One Park Place, Hatch Street
                    Upper, Dublin 2, D02 W085, Ireland
                  </dd>
                  <dt>Service</dt>
                  <dd>
                    Internal team-communication platform used by Company personnel for
                    operational coordination and troubleshooting, in which claim-related
                    Personal Data may be referenced.
                  </dd>
                  <dt>Personal Data Affected</dt>
                  <dd>
                    Identification data and any claim-related Personal Data voluntarily
                    referenced by personnel in messages, threads or shared files.
                  </dd>
                  <dt>Location</dt>
                  <dd>
                    European Union (Slack EU data residency configured for messages and
                    shared files at rest). Governed by the Slack Customer Terms of Service
                    Data Processing Addendum.
                  </dd>
                </dl>

                <p className="text-sm text-slate-500 italic mt-6">
                  Date of last update: {LAST_UPDATED}
                </p>
              </section>

              {/* Version History */}
              <section id="version-history">
                <h2>
                  Version History
                  <a href="#version-history" className="anchor-link" aria-label="Link to section">#</a>
                </h2>
                <table className="meta-table">
                  <thead>
                    <tr>
                      <th>Version</th>
                      <th>Effective Date</th>
                      <th>Summary of Changes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1.0</td>
                      <td>2026-08-17</td>
                      <td>
                        Initial publication as Schedule 2 to the Data Processing Agreement
                        dated 2026-08-16.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <footer className="mt-12 pt-6 border-t border-black/10 text-sm text-slate-600">
                <p>
                  Questions about this list? Contact{" "}
                  <a
                    href="mailto:info@trueaim.ai"
                    className="text-blue-700 underline font-medium"
                  >
                    info@trueaim.ai
                  </a>
                  .
                </p>
                <p className="mt-2">
                  True Aim AG · Metallstrasse 9, 6300 Zug, Switzerland · CHE-325.128.066
                </p>
              </footer>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
