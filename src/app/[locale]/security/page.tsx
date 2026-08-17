import Link from "next/link";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";

const PUBLISH_DATE = "2026-05-21";

export default function SecurityPage() {
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      <div className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            Security at True Aim
          </h1>
          <p className="text-sm text-[var(--text-muted)] mb-8">
            <strong>Last updated:</strong> {PUBLISH_DATE}
          </p>

          <div className="glass-panel p-6 md:p-8 mb-8 border-l-4 border-[var(--primary)]">
            <p className="text-[var(--text-secondary)] leading-relaxed">
              <strong>Report a vulnerability:</strong>{" "}
              <a href="mailto:security@trueaim.ai" className="text-[var(--primary)] hover:underline font-medium">
                security@trueaim.ai
              </a>
              . We acknowledge reports within 5 business days. See{" "}
              <a href="#responsible-disclosure" className="text-[var(--primary)] hover:underline">
                Responsible disclosure
              </a>.
            </p>
          </div>

          <div className="glass-panel p-8 md:p-12 space-y-8">
            <p className="text-[var(--text-secondary)] leading-relaxed">
              True Aim AG operates a claims-processing platform for insurers, brokers, and any entity in the insurance value chain handling or processing claims. Security is a core requirement of our Service, and our customers entrust us with personal data of their policyholders. This page describes our security program at a high level. For full audit-grade evidence (SOC 2 Type II report when issued, ISO 27001 certificate when issued, sub-processor list, Data Processing Agreement), contact{" "}
              <a href="mailto:security@trueaim.ai" className="text-[var(--primary)] hover:underline">security@trueaim.ai</a>. These are available under NDA.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Compliance frameworks</h2>
              <ul className="list-disc pl-6 text-[var(--text-secondary)] leading-relaxed space-y-2">
                <li><strong>ISO 27001:2022</strong>: readiness assessment complete, certification audit in progress.</li>
                <li><strong>SOC 2 Type II</strong>: control implementation complete, observation period in progress.</li>
                <li><strong>Swiss FADP</strong> and <strong>GDPR</strong>: aligned as data processor for customer data, pending formal certification as part of our SOC 2 and ISO 27001 audits.</li>
                <li><strong>EU AI Act</strong>: AI Technical File maintained for the ClaimPilot platform; current readiness is documented and tracked.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Where data is processed</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                All customer data is stored and processed on Microsoft Azure in the Switzerland North region. We do not transfer customer data outside Switzerland for routine processing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Sub-processors</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                We use a limited set of Microsoft Azure services for hosting, AI inference, and operational telemetry, plus Google Workspace (for business email) and Slack (for internal team communication). See our{" "}
                <Link href="/sub-processors" className="text-[var(--primary)] hover:underline">List of Sub-Processors</Link>{" "}
                for the current list. We notify customers in advance of changes. Internal-only tools (source control, CI/CD, CRM) that do not process Tenant production data are not customer sub-processors and are not listed.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Encryption</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                All data is encrypted in transit (TLS 1.2 or above) and at rest (AES-256 via Azure platform encryption). Application secrets are stored in Azure Key Vault with soft-delete and purge protection enabled.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Access control</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Access to customer data is restricted to authorised True Aim personnel on a least-privilege, need-to-know basis, enforced through role-based access controls and Azure Managed Identities. Multi-factor authentication is enforced for all employee accounts.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Monitoring and incident response</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                We operate continuous logging, alerting, and monitoring on the production environment via Microsoft Defender for Cloud and Azure Monitor. We maintain a documented incident response procedure. Customers will be notified of confirmed security incidents affecting their data without undue delay and in accordance with our Data Processing Agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Vulnerability management</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                We monitor our software dependencies and infrastructure for known vulnerabilities through automated scanning and Microsoft Defender. Findings are triaged against documented severity SLAs. We engage third-party penetration testers on a recurring basis.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Personnel security</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                All personnel undergo background screening, accept confidentiality obligations, and complete security and privacy awareness training.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Business continuity</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Customer data is backed up on a regular schedule, with documented restore procedures. We test our disaster recovery procedures periodically.
              </p>
            </section>

            <section id="responsible-disclosure" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Responsible disclosure</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                If you believe you have found a security vulnerability in our Service or in this website, please report it to{" "}
                <a href="mailto:security@trueaim.ai" className="text-[var(--primary)] hover:underline">security@trueaim.ai</a>. We commit to acknowledging your report within 5 business days and to working with you in good faith to investigate and remediate verified issues. We will not pursue legal action against researchers who follow this disclosure process, act in good faith, and do not access, modify, or delete data beyond what is necessary to demonstrate a vulnerability. See also our{" "}
                <Link href="/ethics" className="text-[var(--primary)] hover:underline">Ethics &amp; Reporting</Link>{" "}
                channel for non-security misconduct.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Contact</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                For security-related questions:{" "}
                <a href="mailto:security@trueaim.ai" className="text-[var(--primary)] hover:underline">security@trueaim.ai</a>. For privacy and data-protection enquiries:{" "}
                <a href="mailto:privacy@trueaim.ai" className="text-[var(--primary)] hover:underline">privacy@trueaim.ai</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
