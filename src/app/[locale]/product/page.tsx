import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";

const PUBLISH_DATE = "2026-05-21";

export default async function ProductPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      <div className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl font-bold text-strong mb-4">
            The True Aim Platform &mdash; Product Overview
          </h1>
          <p className="text-sm text-muted mb-8">
            <strong>Last updated:</strong> {PUBLISH_DATE}
          </p>

          <div className="bg-card shadow-card rounded-pill p-8 md:p-12 space-y-8">
            <section>
              <h2 className="font-display text-xl font-semibold text-strong mb-3">What the Platform is</h2>
              <p className="text-body leading-relaxed">
                The True Aim Platform is our multi-tenant, AI-assisted platform for claims and case processing. It ingests documents, extracts and classifies their content, runs configurable decisioning workflows, and presents the results to operators for review and final adjudication. Every step is captured in an audit trail.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-strong mb-3">Who it&rsquo;s for</h2>
              <p className="text-body leading-relaxed mb-3">
                The Platform is built for insurers, brokers, and any entity in the insurance value chain handling or processing claims. Typical user roles include:
              </p>
              <ul className="list-disc pl-6 text-body leading-relaxed space-y-2">
                <li><strong>Claims operators</strong>: review extracted data, override AI recommendations, finalize claims.</li>
                <li><strong>Claims managers</strong>: monitor workload, quality, and turnaround through dashboards.</li>
                <li><strong>Platform administrators</strong>: configure workflows, manage users and roles, manage tenants.</li>
                <li><strong>Compliance &amp; audit</strong>: review the audit trail, replay decisions, export evidence.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-strong mb-3">Capabilities</h2>
              <ul className="list-disc pl-6 text-body leading-relaxed space-y-2">
                <li><strong>Document ingestion</strong>: upload PDFs and images of claim documents, policies, and supporting evidence.</li>
                <li><strong>Classification and extraction</strong>: AI-driven classification of document types and extraction of structured fields with confidence scores.</li>
                <li><strong>Claim lifecycle workflows</strong>: configurable workflows that move a claim from intake through extraction, review, decisioning, and finalization.</li>
                <li><strong>Human-in-the-loop review</strong>: side-by-side comparison of source documents and extracted data so operators can verify and override.</li>
                <li><strong>Decisioning engine</strong>: rule-based and AI-assisted recommendations on claim outcomes; final decisions sit with authorized operators.</li>
                <li><strong>Audit trail and decision replay</strong>: every input, recommendation, override, and final decision is recorded and replayable.</li>
                <li><strong>RBAC and SSO</strong>: role-based access control with single sign-on and multi-factor authentication.</li>
                <li><strong>Multi-tenancy</strong>: data isolation between insurer tenants with per-tenant configuration.</li>
                <li><strong>Dashboards and reporting</strong>: KPI tiles, pipeline funnel, and operational dashboards for managers.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-strong mb-3">How it fits</h2>
              <p className="text-body leading-relaxed">
                The Platform sits between an organisation&rsquo;s intake channels (broker portals, customer apps, email) and its core policy administration or claims systems. Documents and structured intake data flow in; verified, structured claim outcomes flow out via APIs or exports. Customers retain control of underwriting, pricing, and final adjudication; the Platform accelerates and standardizes the operator workflow in between.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-strong mb-3">Where data lives</h2>
              <p className="text-body leading-relaxed">
                All customer data is hosted on Microsoft Azure in the Switzerland North region. Details on encryption, access control, and sub-processors are on the{" "}
                <Link href="/security" className="text-link hover:underline">Security page</Link>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-strong mb-3">How to learn more</h2>
              <ul className="list-disc pl-6 text-body leading-relaxed space-y-2">
                <li><Link href="/security" className="text-link hover:underline">Security program</Link> &mdash; compliance frameworks, encryption, monitoring, responsible disclosure.</li>
                <li><Link href="/privacy" className="text-link hover:underline">Privacy Policy</Link> &mdash; how we handle personal data as processor and controller.</li>
                <li><Link href="/support" className="text-link hover:underline">Customer support</Link> &mdash; how to reach us and response-time commitments.</li>
                <li><Link href="/changelog" className="text-link hover:underline">Changelog</Link> &mdash; recent platform releases.</li>
                <li>Contact sales:{" "}
                  <a href="mailto:hello@trueaim.ai" className="text-link hover:underline">hello@trueaim.ai</a>{" "}
                  or visit the{" "}
                  <Link href="/contact" className="text-link hover:underline">contact page</Link>.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
