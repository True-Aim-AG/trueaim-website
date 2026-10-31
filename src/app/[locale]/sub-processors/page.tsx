import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";
import { CARD, PageHero, SECTION } from "@/components/content";
import { cn } from "@/lib/utils";
import { englishOnlyStaticParams } from "@/i18n/page-locales";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";

// English only until the translation lands; see src/i18n/page-locales.ts.
export const generateStaticParams = englishOnlyStaticParams;

// Set both to the day this version goes live. Clause 9.2 of the DPA requires the
// list updated before a new sub-processor begins processing, with written notice.
const VERSION = "1.5";
const EFFECTIVE_DATE = "2026-10-31";
const LAST_UPDATED = "2026-10-31";

type SubProcessor = {
  id: string;
  name: string;
  entity: string;
  service: ReactNode;
  data: ReactNode;
  location: ReactNode;
  access: ReactNode;
  transfers: ReactNode;
  exception?: { title: string; body: ReactNode };
};

type SubProcessorGroup = {
  id: string;
  title: string;
  intro: string;
  members: SubProcessor[];
};

const MS_ABUSE_MONITORING =
  "https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/abuse-monitoring";
const MS_DATA_PRIVACY =
  "https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-ai/openai/data-privacy";

const GOOGLE_CLOUD_SUBPROCESSORS = "https://cloud.google.com/terms/subprocessors";
const GOOGLE_ABUSE_MONITORING =
  "https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/abuse-monitoring";

const MICROSOFT: SubProcessor = {
  id: "microsoft",
  name: "Microsoft Ireland Operations Ltd",
  entity:
    "Microsoft Ireland Operations Ltd, One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, Ireland",
  service:
    "Cloud infrastructure and hosting (Microsoft Azure), deployed in the Company’s Azure tenant. This covers compute, database, storage, AI model inference (Azure OpenAI), document processing, key management, monitoring and networking.",
  data:
    "All categories of Personal Data listed in clause 4: identification data, policy and claim references, claim-related data (including Sensitive Personal Data where the claim requires it) and financial data. Also platform telemetry (request metadata) and authorised-user account data.",
  location:
    "All data at rest is stored in Switzerland North (Zurich), with backups in Switzerland West (Geneva). Document processing runs in Switzerland North. AI model inference runs in Switzerland and the European Union. It runs through the Company’s Azure OpenAI resource in Switzerland North and stores no data outside Switzerland North. Azure OpenAI abuse monitoring is an exception for who can access data; see below.",
  access:
    "Authorised Company staff, through the Company’s Azure tenant. Microsoft personnel can access data only as the Microsoft Products and Services Data Protection Addendum (Microsoft DPA) permits, for example to provide support.",
  transfers:
    "For any transfer out of the EU, the EEA, the UK or Switzerland, the Microsoft DPA of 22 May 2026 incorporates the 2021 EU Standard Contractual Clauses, processor-to-processor module, between Microsoft Ireland Operations Limited and Microsoft Corporation. Microsoft commits to follow Swiss data protection law for Personal Data from Switzerland. Microsoft is also certified under the EU-U.S. Data Privacy Framework and the Swiss-U.S. Data Privacy Framework.",
  exception: {
    title: "Exception: Azure OpenAI abuse monitoring",
    body: (
      <>
        <p>
          Microsoft runs abuse monitoring on Azure OpenAI, and it is on for the Company’s resource.
          Microsoft can keep prompts and outputs that its systems flag for review. It stores them in
          Switzerland North, the Azure region of the resource. Microsoft publishes no retention
          period for this data.
        </p>
        <p className="mt-3">
          Review is automated by default. Authorised Microsoft employees review flagged content
          only when the automated review is not confident. Microsoft commits to
          reviewers located in the EEA for deployments in the EEA only. It makes no such commitment
          for Switzerland, so these reviewers can be located outside Switzerland, the EEA and the
          UK. This is the exception to the Company’s commitment that hosting and inference stay in
          Switzerland, the EEA or the UK.
        </p>
        <p className="mt-3">
          Microsoft does not use this data to train models. Sources:{" "}
          <a href={MS_ABUSE_MONITORING} className="text-link hover:underline">
            Azure OpenAI abuse monitoring
          </a>{" "}
          and{" "}
          <a href={MS_DATA_PRIVACY} className="text-link hover:underline">
            Data, privacy and security for Azure OpenAI
          </a>{" "}
          (Microsoft Learn, May 2026).
        </p>
      </>
    ),
  },
};

const GOOGLE_CLOUD: SubProcessor = {
  id: "google-cloud",
  name: "Google Cloud EMEA Limited",
  entity: "Google Cloud EMEA Limited, 70 Sir John Rogerson’s Quay, Dublin 2, Ireland",
  service:
    "AI inference with Google’s Gemini models on Google Cloud (Vertex AI), as an alternative model provider next to Azure OpenAI.",
  data: "The same claim documents and claim data that the Platform sends to Azure OpenAI.",
  location: "European Union. Google stores and processes the data in the EU.",
  access: (
    <>
      Google staff can access the data for maintenance and support from the countries listed at{" "}
      <a href={GOOGLE_CLOUD_SUBPROCESSORS} className="text-link hover:underline">
        cloud.google.com/terms/subprocessors
      </a>
      . External support companies see data only if True Aim shares it in a support case. Vertex AI
      abuse monitoring is an exception for who can access data; see below.
    </>
  ),
  transfers:
    "Google Cloud Data Processing Addendum of 8 June 2026, which covers the Swiss FADP, with the EU Standard Contractual Clauses. Google LLC is also certified under the EU-US and Swiss-US Data Privacy Frameworks.",
  exception: {
    title: "Exception: Vertex AI abuse monitoring",
    body: (
      <>
        <p>
          Google runs abuse monitoring on Gemini models in Vertex AI, and it is on for the Company’s
          Google Cloud project. Google stores a prompt only when its automated safety classifiers
          flag possible abuse. It keeps the prompt for up to 90 days, in the region selected for the
          project, which is in the European Union.
        </p>
        <p className="mt-3">
          Authorised Google employees may review flagged prompts. Google does not state where these
          reviewers are located, so they can be located outside Switzerland, the EEA and the UK.
          This is the exception to the Company’s commitment that hosting and inference stay in
          Switzerland, the EEA or the UK.
        </p>
        <p className="mt-3">
          Google does not use this data to train or fine-tune models. Source:{" "}
          <a href={GOOGLE_ABUSE_MONITORING} className="text-link hover:underline">
            Vertex AI abuse monitoring
          </a>{" "}
          (Google Cloud documentation, October 2026).
        </p>
      </>
    ),
  },
};

const GOOGLE: SubProcessor = {
  id: "google",
  name: "Google Ireland Limited",
  entity: "Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland",
  service:
    "Business email, document storage and calendar (Google Workspace), used for client communications and operational coordination. For clients who submit claims by email, it also receives claim correspondence and attachments in a dedicated mailbox, and the Platform collects them from there automatically.",
  data:
    "Identification data. Claim-related Personal Data, including identity documents and other attachments, in claim correspondence that clients send by email. Any claim-related Personal Data that clients or Data Subjects include in other correspondence or shared documents.",
  location:
    "European Union (Google Workspace data region set to Europe) for data at rest that the data region covers.",
  access:
    "Authorised Company staff with Google Workspace accounts. Google personnel can access data only as the Google Cloud / Workspace Data Processing Addendum permits, for example to provide support.",
  transfers:
    "Data outside the scope of the data region, and access by Google personnel for support, can involve processing outside the EU. The Google Cloud / Workspace Data Processing Addendum incorporates the EU Standard Contractual Clauses for these transfers.",
};

const SLACK: SubProcessor = {
  id: "slack",
  name: "Slack Technologies Limited",
  entity:
    "Slack Technologies Limited, 4th Floor, One Park Place, Hatch Street Upper, Dublin 2, D02 W085, Ireland",
  service:
    "Internal team communication, used by Company staff to coordinate operations and troubleshoot. Claim-related Personal Data may be referenced there.",
  data:
    "Identification data, and any claim-related Personal Data that staff reference in messages, threads or shared files.",
  location: "European Union (Slack EU data residency for messages and shared files at rest).",
  access:
    "Authorised Company staff in the Company’s Slack workspace. Slack personnel can access data only as the Slack Data Processing Addendum permits, for example to provide support.",
  transfers:
    "Data outside the scope of Slack data residency, and access by Slack personnel for support, can involve processing outside the EU. The Slack Data Processing Addendum incorporates the EU Standard Contractual Clauses for these transfers.",
};

const SENTRY: SubProcessor = {
  id: "sentry",
  name: "Functional Software, Inc. d/b/a Sentry",
  entity:
    "Functional Software, Inc. d/b/a Sentry, 45 Fremont Street, 8th Floor, San Francisco, CA 94105, United States",
  service: "Error and performance monitoring for the Platform.",
  data:
    "The Platform removes client data from each error report before the report leaves the Platform. Sentry receives only error types, page routes and technical IDs, including an internal user number with no name or email. As a second layer, Sentry also removes sensitive fields by name on its side when it receives an event.",
  location:
    "Error reports are stored in the European Union (Frankfurt, Germany). Account data in the United States covers only True Aim staff logins.",
  access:
    "Authorised Company staff with Sentry accounts. Sentry staff access data remotely for support and operations from the United States, Austria, Canada and the Netherlands.",
  transfers:
    "Transfers to the United States rely on the EU-U.S. Data Privacy Framework, its UK Extension and the Swiss-U.S. Data Privacy Framework, with the Standard Contractual Clauses as fallback.",
};

const GROUPS: SubProcessorGroup[] = [
  {
    id: "group-a",
    title: "Group A: Processes client Personal Data",
    intro: "These sub-processors process client Personal Data to deliver the Platform and the services.",
    members: [MICROSOFT, GOOGLE_CLOUD, GOOGLE, SLACK],
  },
  {
    id: "group-b",
    title: "Group B: Receives technical error reports only",
    intro:
      "This sub-processor receives technical error reports only, from which the Platform removes client data.",
    members: [SENTRY],
  },
];

const VERSION_HISTORY = [
  {
    version: "1.5",
    date: EFFECTIVE_DATE,
    summary:
      "Stated that Microsoft Azure runs AI model inference in Switzerland and the European Union, with no end date. Added the Vertex AI abuse monitoring exception to the Google Cloud EMEA Limited entry.",
  },
  {
    version: "1.4",
    date: "2026-10-23",
    summary:
      "Added Google Cloud EMEA Limited (Gemini models on Google Cloud) to Group A as an alternative AI inference provider.",
  },
  {
    version: "1.3",
    date: "2026-10-20",
    summary:
      "Split the list into two groups. Added access and transfer basis for every sub-processor. Stated where Azure keeps backups and runs AI inference, and the Azure OpenAI abuse monitoring exception. Named the Microsoft transfer module. Corrected the Sentry entry: the Platform removes client data from each error report before it leaves the Platform.",
  },
  {
    version: "1.2",
    date: "2026-10-14",
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
  ...GROUPS.flatMap((group) => [
    { id: group.id, label: group.title, nested: false },
    ...group.members.map(({ id, name }) => ({ id, label: name, nested: true })),
  ]),
  { id: "version-history", label: "Version History", nested: false },
];

type FieldKey = "entity" | "service" | "data" | "location" | "access" | "transfers";

const FIELDS: { key: FieldKey; label: string }[] = [
  { key: "entity", label: "Entity" },
  { key: "service", label: "Service" },
  { key: "data", label: "Personal Data Affected" },
  { key: "location", label: "Location" },
  { key: "access", label: "Access" },
  { key: "transfers", label: "Transfer Basis" },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/sub-processors");
}

export default async function SubProcessorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      <PageSeo locale={locale} path="/sub-processors" template="page" />
      <PageHero compact
        eyebrow="Schedule 2 to Data Processing Agreement"
        title="List of Sub-Processors"
        texture={{ name: "circ", position: "72% 18%" }}
      >
        <dl className="mt-6 grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-sm">
          <dt className="text-muted">Version</dt>
          <dd className="text-strong font-medium">{VERSION}</dd>
          <dt className="text-muted">Effective date</dt>
          <dd className="text-strong font-medium">{EFFECTIVE_DATE}</dd>
          <dt className="text-muted">Last updated</dt>
          <dd className="text-strong font-medium">{LAST_UPDATED}</dd>
          <dt className="text-muted">Legal basis</dt>
          <dd className="text-strong font-medium">Swiss FADP Art. 9; GDPR Art. 28</dd>
        </dl>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">
          <div className={cn(CARD, "p-6 md:p-8 mb-8")}>
            <h2 className="font-display text-lg font-semibold text-strong mb-4">Contents</h2>
            <ol className="space-y-1 list-none pl-0">
              {TOC.map((item) => (
                <li key={item.id} className={item.nested ? "pl-4" : undefined}>
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

          <p className="text-body leading-[1.6] mt-4">
            True Aim keeps hosting and AI inference in Switzerland, the EEA or the UK. Any exception
            is stated on this page under the sub-processor it concerns. Group A sub-processors
            process client Personal Data. The Group B sub-processor receives technical error reports only.
          </p>

          {GROUPS.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">{group.title}</h2>
              <p className="text-body leading-[1.6]">{group.intro}</p>
              {group.members.map((sp) => (
                <section key={sp.id} id={sp.id} className="scroll-mt-24">
                  <h3 className="font-display text-xl font-bold text-strong mt-10 mb-4">{sp.name}</h3>
                  <dl className="divide-hairline">
                    {FIELDS.map((field) => (
                      <div key={field.key} className="py-3">
                        <dt className="font-display text-sm font-semibold text-strong">{field.label}</dt>
                        <dd className="mt-1 text-body leading-[1.6]">{sp[field.key]}</dd>
                      </div>
                    ))}
                  </dl>
                  {sp.exception && (
                    <div className="bg-card shadow-card p-6 md:p-8 mt-6">
                      <h4 className="font-display text-base font-semibold text-strong mb-3">
                        {sp.exception.title}
                      </h4>
                      <div className="text-body leading-[1.6]">{sp.exception.body}</div>
                    </div>
                  )}
                </section>
              ))}
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
      </section>
    </div>
  );
}
