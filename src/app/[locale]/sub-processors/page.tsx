import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";

export const metadata: Metadata = {
  title: "List of Sub-Processors | True Aim AG",
  description:
    "Schedule 2 to the True Aim AG Data Processing Agreement: the operative list of sub-processors engaged in the processing of personal data, with service, data categories and processing location.",
  alternates: { canonical: "https://trueaim.ai/en/sub-processors/" },
  robots: { index: true, follow: true },
};

// Set both to the day this version goes live. Clause 9.2 of the DPA requires the
// list updated before a new sub-processor begins processing, with written notice.
const VERSION = "1.2";
const EFFECTIVE_DATE = "2026-10-14";
const LAST_UPDATED = "2026-10-14";

type SubProcessor = {
  id: string;
  name: string;
  entity: string;
  service: ReactNode;
  data: ReactNode;
  location: ReactNode;
};

const SUB_PROCESSORS: SubProcessor[] = [
  {
    id: "microsoft",
    name: "Microsoft Ireland Operations Ltd",
    entity:
      "Microsoft Ireland Operations Ltd, One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, Ireland",
    service:
      "Cloud infrastructure and hosting (Microsoft Azure), deployed in the Company’s Azure tenant. This covers compute, database, storage, AI model inference, document processing, key management, monitoring and networking.",
    data:
      "All categories of Personal Data listed in clause 4: identification data, policy and claim references, claim-related data (including Sensitive Personal Data where the claim requires it) and financial data. Also platform telemetry (request metadata) and authorised-user account data.",
    location:
      "All data at rest is stored in Switzerland North (Zurich), and document processing runs there too. AI model inference runs inside the Microsoft EU Data Boundary (the EU and EFTA states, including Switzerland) and stores no data outside Switzerland North.",
  },
  {
    id: "google",
    name: "Google Ireland Limited",
    entity: "Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland",
    service:
      "Business email, document storage and calendar (Google Workspace), used for client communications and operational coordination. For clients who submit claims by email, it also receives claim correspondence and attachments in a dedicated mailbox, and the Platform collects them from there automatically.",
    data:
      "Identification data. Claim-related Personal Data, including identity documents and other attachments, in claim correspondence that clients send by email. Any claim-related Personal Data that clients or Data Subjects include in other correspondence or shared documents.",
    location:
      "European Union (Google Workspace data region set to Europe). Governed by the Google Cloud / Workspace Data Processing Addendum and the EU Standard Contractual Clauses.",
  },
  {
    id: "sentry",
    name: "Functional Software, Inc. d/b/a Sentry",
    entity:
      "Functional Software, Inc. d/b/a Sentry, 45 Fremont Street, 8th Floor, San Francisco, CA 94105, United States",
    service: "Error and performance monitoring for the Platform.",
    data:
      "Technical error data from the Platform: stack traces, internal user identifiers and request metadata. Sentry’s server-side data scrubbing is on, and IP addresses are not stored. Claim-related Personal Data can still reach an error report despite filtering.",
    location:
      "Error data is stored in the European Union (Frankfurt, Germany). Account and configuration metadata is stored in the United States. Sentry staff access data remotely for support and operations from the United States, Austria, Canada and the Netherlands. Transfers to the United States rely on the EU-U.S. Data Privacy Framework and the Swiss-U.S. Data Privacy Framework, backed by the Standard Contractual Clauses with the Swiss FADP amendments.",
  },
  {
    id: "slack",
    name: "Slack Technologies Limited",
    entity:
      "Slack Technologies Limited, 4th Floor, One Park Place, Hatch Street Upper, Dublin 2, D02 W085, Ireland",
    service:
      "Internal team communication, used by Company staff to coordinate operations and troubleshoot. Claim-related Personal Data may be referenced there.",
    data:
      "Identification data, and any claim-related Personal Data that staff reference in messages, threads or shared files.",
    location:
      "European Union (Slack EU data residency for messages and shared files at rest). Governed by the Slack Customer Terms of Service Data Processing Addendum.",
  },
];

const VERSION_HISTORY = [
  {
    version: "1.2",
    date: EFFECTIVE_DATE,
    summary:
      "Corrected the Sentry entry: account metadata stored in the United States, remote access locations, and the personal data affected.",
  },
  {
    version: "1.1",
    date: "2026-09-24",
    summary:
      "Added Sentry. Widened the Google Workspace entry to cover claims submitted by email. Clarified where Microsoft Azure runs AI inference.",
  },
  {
    version: "1.0",
    date: "2026-08-17",
    summary:
      "First published as Schedule 2 to the Data Processing Agreement dated 2026-08-16.",
  },
];

const TOC = [
  ...SUB_PROCESSORS.map(({ id, name }) => ({ id, label: name })),
  { id: "version-history", label: "Version History" },
];

const FIELDS: { key: "entity" | "service" | "data" | "location"; label: string }[] = [
  { key: "entity", label: "Entity" },
  { key: "service", label: "Service" },
  { key: "data", label: "Personal Data Affected" },
  { key: "location", label: "Location" },
];

export default async function SubProcessorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      <div className="pt-20 md:pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-muted">Schedule 2 to Data Processing Agreement</p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] text-strong mb-6">
            List of Sub-Processors
          </h1>

          <dl className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-sm mb-8">
            <dt className="text-muted">Version</dt>
            <dd className="text-strong font-medium">{VERSION}</dd>
            <dt className="text-muted">Effective date</dt>
            <dd className="text-strong font-medium">{EFFECTIVE_DATE}</dd>
            <dt className="text-muted">Last updated</dt>
            <dd className="text-strong font-medium">{LAST_UPDATED}</dd>
            <dt className="text-muted">Legal basis</dt>
            <dd className="text-strong font-medium">Swiss FADP Art. 9; GDPR Art. 28</dd>
          </dl>

          <div className="bg-card shadow-card rounded-pill p-6 md:p-8 mb-8">
            <h2 className="font-display text-lg font-semibold text-strong mb-4">Contents</h2>
            <ol className="space-y-1 list-none pl-0">
              {TOC.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-sm text-link hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <p className="text-body leading-[1.6]">
            This list is Schedule 2 to the True Aim AG Data Processing Agreement. As updated under
            the DPA, it is the operative list for the purposes of the DPA.
          </p>

          {SUB_PROCESSORS.map((sp) => (
            <section key={sp.id} id={sp.id} className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">{sp.name}</h2>
              <dl className="divide-hairline">
                {FIELDS.map((field) => (
                  <div key={field.key} className="py-3">
                    <dt className="font-display text-sm font-semibold text-strong">{field.label}</dt>
                    <dd className="mt-1 text-body leading-[1.6]">{sp[field.key]}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}

          <section id="version-history" className="scroll-mt-24">
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Version History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-hairline">
                    <th className="text-left py-3 pr-4 font-display font-medium text-strong align-top">Version</th>
                    <th className="text-left py-3 pr-4 font-display font-medium text-strong align-top">Effective Date</th>
                    <th className="text-left py-3 font-display font-medium text-strong align-top">Summary of Changes</th>
                  </tr>
                </thead>
                <tbody>
                  {VERSION_HISTORY.map((row) => (
                    <tr key={row.version} className="border-b border-hairline">
                      <td className="py-3 pr-4 text-body align-top">{row.version}</td>
                      <td className="py-3 pr-4 text-body align-top whitespace-nowrap">{row.date}</td>
                      <td className="py-3 text-body align-top leading-[1.6]">{row.summary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <p className="text-body leading-[1.6] mt-14">
            Questions about this list? Contact{" "}
            <a href="mailto:info@trueaim.ai" className="text-link hover:underline">
              info@trueaim.ai
            </a>
            .
          </p>
          <p className="text-sm text-muted mt-3">
            True Aim AG · Metallstrasse 9, 6300 Zug, Switzerland · CHE-325.128.066
          </p>
        </div>
      </div>
    </div>
  );
}
