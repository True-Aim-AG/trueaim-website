import type { Metadata } from "next";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";
import { Eyebrow } from "@/components/brand/Eyebrow";

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

      {/* Print: hide site chrome and flatten the document panel */}
      <style>{`
        @media print {
          nav, header, footer { display: none !important; }
          .no-print { display: none !important; }
          .doc-panel { box-shadow: none !important; }
          a { text-decoration: none !important; }
          .doc-panel .anchor-link { display: none !important; }
        }
      `}</style>

      <div className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8">
          {/* Sticky Table of Contents */}
          <aside className="no-print">
            <div className="lg:sticky lg:top-24">
              <Eyebrow className="mb-3">Contents</Eyebrow>
              <nav aria-label="Table of contents">
                <ul className="space-y-2 text-sm">
                  {TOC.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block text-body hover:text-accent transition-colors leading-snug"
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
              <Eyebrow>Legal document</Eyebrow>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-strong mt-1">
                List of Sub-Processors
              </h1>
              <p className="text-sm text-muted mt-2">
                Version {VERSION} · Last updated {LAST_UPDATED}
              </p>
            </div>

            <article
              className="doc-panel bg-card shadow-card rounded-pill p-6 sm:p-10 lg:p-14"
              style={{ maxWidth: "78ch", marginLeft: "auto", marginRight: "auto" }}
            >
              {/* Document header (always visible, including print) */}
              <header className="border-b border-hairline pb-6 mb-6">
                <p className="text-caption-sm text-subtle mb-2">
                  Schedule 2 to Data Processing Agreement
                </p>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-strong">
                  List of Sub-Processors
                </h1>
                <dl className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-y-2 text-sm">
                  <dt className="text-subtle">Version</dt>
                  <dd className="text-strong font-medium sm:col-span-2">{VERSION}</dd>
                  <dt className="text-subtle">Effective date</dt>
                  <dd className="text-strong font-medium sm:col-span-2">{EFFECTIVE_DATE}</dd>
                  <dt className="text-subtle">Last updated</dt>
                  <dd className="text-strong font-medium sm:col-span-2">{LAST_UPDATED}</dd>
                  <dt className="text-subtle">Legal basis</dt>
                  <dd className="text-strong font-medium sm:col-span-2">
                    Swiss FADP Art. 9; GDPR Art. 28
                  </dd>
                </dl>
              </header>

              <p className="text-body leading-[1.6]">
                This list is, as updated in accordance with the Data Processing Agreement
                (DPA), the operative list for the purposes of the DPA.
              </p>

              {/* Microsoft */}
              <section id="microsoft" className="scroll-mt-28">
                <h2 className="group font-display text-[28px] font-bold text-strong mt-14 mb-4">
                  Microsoft Ireland Operations Ltd
                  <a
                    href="#microsoft"
                    className="anchor-link ml-2 text-sm font-normal text-accent no-underline opacity-0 transition-opacity duration-150 ease-brand group-hover:opacity-60"
                    aria-label="Link to section"
                  >
                    #
                  </a>
                </h2>
                <dl className="mt-4 rounded-pill bg-surface-muted px-6 py-6">
                  <dt className="text-caption-sm text-subtle">Entity</dt>
                  <dd className="mb-1 text-body leading-[1.6]">
                    Microsoft Ireland Operations Ltd, One Microsoft Place, South County
                    Business Park, Leopardstown, Dublin 18, Ireland
                  </dd>
                  <dt className="mt-3 text-caption-sm text-subtle">Service</dt>
                  <dd className="mb-1 text-body leading-[1.6]">
                    Cloud infrastructure and hosting (Microsoft Azure), including compute,
                    database, storage, AI model inference, document processing, key
                    management, monitoring and networking services deployed within the
                    Company&apos;s Azure tenant.
                  </dd>
                  <dt className="mt-3 text-caption-sm text-subtle">Personal Data Affected</dt>
                  <dd className="mb-1 text-body leading-[1.6]">
                    All categories of Personal Data listed in clause 4 (identification,
                    policy and claim reference, claim-related data including Sensitive
                    Personal Data where the claim requires it, and financial data), together
                    with platform telemetry (request metadata, error traces) and
                    authorised-user account data.
                  </dd>
                  <dt className="mt-3 text-caption-sm text-subtle">Location</dt>
                  <dd className="mb-1 text-body leading-[1.6]">
                    Switzerland North (Zurich) for all data at rest and primary processing.
                    No ancillary Azure service processes Personal Data outside Switzerland
                    or the EEA.
                  </dd>
                </dl>
              </section>

              {/* Google */}
              <section id="google" className="scroll-mt-28">
                <h2 className="group font-display text-[28px] font-bold text-strong mt-14 mb-4">
                  Google Ireland Limited
                  <a
                    href="#google"
                    className="anchor-link ml-2 text-sm font-normal text-accent no-underline opacity-0 transition-opacity duration-150 ease-brand group-hover:opacity-60"
                    aria-label="Link to section"
                  >
                    #
                  </a>
                </h2>
                <dl className="mt-4 rounded-pill bg-surface-muted px-6 py-6">
                  <dt className="text-caption-sm text-subtle">Entity</dt>
                  <dd className="mb-1 text-body leading-[1.6]">
                    Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland
                  </dd>
                  <dt className="mt-3 text-caption-sm text-subtle">Service</dt>
                  <dd className="mb-1 text-body leading-[1.6]">
                    Business productivity and communications suite (Google Workspace),
                    including email, document storage and calendar services used for client
                    communications and operational coordination, including correspondence
                    that may contain claim-related Personal Data submitted by the Client
                    outside the Platform.
                  </dd>
                  <dt className="mt-3 text-caption-sm text-subtle">Personal Data Affected</dt>
                  <dd className="mb-1 text-body leading-[1.6]">
                    Identification data and any claim-related Personal Data voluntarily
                    included by the Client or Data Subjects in email correspondence or
                    shared documents.
                  </dd>
                  <dt className="mt-3 text-caption-sm text-subtle">Location</dt>
                  <dd className="mb-1 text-body leading-[1.6]">
                    European Union (Google Workspace data region configured for Europe).
                    Governed by the Google Cloud / Workspace Data Processing Addendum and EU
                    Standard Contractual Clauses.
                  </dd>
                </dl>
              </section>

              {/* Slack */}
              <section id="slack" className="scroll-mt-28">
                <h2 className="group font-display text-[28px] font-bold text-strong mt-14 mb-4">
                  Slack Technologies Limited
                  <a
                    href="#slack"
                    className="anchor-link ml-2 text-sm font-normal text-accent no-underline opacity-0 transition-opacity duration-150 ease-brand group-hover:opacity-60"
                    aria-label="Link to section"
                  >
                    #
                  </a>
                </h2>
                <dl className="mt-4 rounded-pill bg-surface-muted px-6 py-6">
                  <dt className="text-caption-sm text-subtle">Entity</dt>
                  <dd className="mb-1 text-body leading-[1.6]">
                    Slack Technologies Limited, 4th Floor, One Park Place, Hatch Street
                    Upper, Dublin 2, D02 W085, Ireland
                  </dd>
                  <dt className="mt-3 text-caption-sm text-subtle">Service</dt>
                  <dd className="mb-1 text-body leading-[1.6]">
                    Internal team-communication platform used by Company personnel for
                    operational coordination and troubleshooting, in which claim-related
                    Personal Data may be referenced.
                  </dd>
                  <dt className="mt-3 text-caption-sm text-subtle">Personal Data Affected</dt>
                  <dd className="mb-1 text-body leading-[1.6]">
                    Identification data and any claim-related Personal Data voluntarily
                    referenced by personnel in messages, threads or shared files.
                  </dd>
                  <dt className="mt-3 text-caption-sm text-subtle">Location</dt>
                  <dd className="mb-1 text-body leading-[1.6]">
                    European Union (Slack EU data residency configured for messages and
                    shared files at rest). Governed by the Slack Customer Terms of Service
                    Data Processing Addendum.
                  </dd>
                </dl>

                <p className="text-sm text-subtle italic mt-6">
                  Date of last update: {LAST_UPDATED}
                </p>
              </section>

              {/* Version History */}
              <section id="version-history" className="scroll-mt-28">
                <h2 className="group font-display text-[28px] font-bold text-strong mt-14 mb-4">
                  Version History
                  <a
                    href="#version-history"
                    className="anchor-link ml-2 text-sm font-normal text-accent no-underline opacity-0 transition-opacity duration-150 ease-brand group-hover:opacity-60"
                    aria-label="Link to section"
                  >
                    #
                  </a>
                </h2>
                <table className="meta-table mt-3 w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      <th className="border-b border-hairline bg-surface-muted px-3 py-2.5 text-left text-caption-sm text-subtle font-medium">Version</th>
                      <th className="border-b border-hairline bg-surface-muted px-3 py-2.5 text-left text-caption-sm text-subtle font-medium">Effective Date</th>
                      <th className="border-b border-hairline bg-surface-muted px-3 py-2.5 text-left text-caption-sm text-subtle font-medium">Summary of Changes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-b border-hairline px-3 py-2.5 align-top text-body">1.0</td>
                      <td className="border-b border-hairline px-3 py-2.5 align-top text-body">2026-08-17</td>
                      <td className="border-b border-hairline px-3 py-2.5 align-top text-body">
                        Initial publication as Schedule 2 to the Data Processing Agreement
                        dated 2026-08-16.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <footer className="mt-12 pt-6 border-t border-hairline text-sm text-muted">
                <p>
                  Questions about this list? Contact{" "}
                  <a
                    href="mailto:info@trueaim.ai"
                    className="text-link underline font-medium"
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
