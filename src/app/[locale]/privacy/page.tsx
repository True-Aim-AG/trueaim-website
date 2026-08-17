import Link from "next/link";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";

const PUBLISH_DATE = "2026-05-21";

type TocItem = { id: string; label: string };

const TOC: TocItem[] = [
  { id: "roles", label: "1. Roles" },
  { id: "categories", label: "2. Categories of personal data we process" },
  { id: "lawful-bases", label: "3. Lawful bases for processing" },
  { id: "use", label: "4. How we use personal data" },
  { id: "sub-processors", label: "5. Sub-processors and disclosures" },
  { id: "transfers", label: "6. International transfers" },
  { id: "security", label: "7. Security" },
  { id: "retention", label: "8. Retention" },
  { id: "rights", label: "9. Your rights" },
  { id: "automated", label: "10. Automated decision-making" },
  { id: "changes", label: "11. Changes to this policy" },
  { id: "contact", label: "12. Contact" },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      <div className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--text-muted)] mb-2">
            <strong>Effective date:</strong> {PUBLISH_DATE} &nbsp;|&nbsp; <strong>Last updated:</strong> {PUBLISH_DATE}
          </p>
          <p className="text-sm text-[var(--text-muted)] mb-8">
            Previous versions:{" "}
            <Link href="/privacy-legacy" className="text-[var(--primary)] hover:underline">
              v1 (Feb 2026)
            </Link>
          </p>

          <div className="glass-panel p-6 md:p-8 mb-8">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Contents</h2>
            <ol className="space-y-1 list-none pl-0">
              {TOC.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-[var(--primary)] hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <div className="glass-panel p-8 md:p-12 space-y-8">
            <p className="text-[var(--text-secondary)] leading-relaxed">
              True Aim AG (&ldquo;True Aim&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) provides a multi-tenant claims-processing platform (&ldquo;Service&rdquo;). This Privacy Policy describes how we collect, use, disclose, and protect personal data when our customers (&ldquo;Tenants&rdquo;) and their end users (collectively, &ldquo;you&rdquo;) interact with our Service or with this website.
            </p>

            <section id="roles" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">1. Roles</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                For personal data submitted by a Tenant about its end users in connection with the Service, the Tenant is the data controller and True Aim acts as a data processor under a data processing agreement. For personal data we collect directly, including account information of Tenant administrators and marketing-site visitor data, True Aim acts as a data controller.
              </p>
            </section>

            <section id="categories" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">2. Categories of personal data we process</h2>
              <ul className="list-disc pl-6 text-[var(--text-secondary)] leading-relaxed space-y-2">
                <li><strong>Account data:</strong> name, email, organisation, role, authentication metadata.</li>
                <li><strong>Claims data submitted by Tenants:</strong> claim narratives, claimant identifiers, dates of loss, policy numbers, uploaded documents.</li>
                <li><strong>Derived data:</strong> structured data extracted from uploaded documents by our document intelligence and language model components.</li>
                <li><strong>Usage and telemetry:</strong> application logs, audit trail entries, request metadata, operational metrics.</li>
                <li><strong>Website data:</strong> IP address, browser metadata, pages visited (collected via standard server logs and, where applicable, cookies as described in our Cookie Notice).</li>
              </ul>
            </section>

            <section id="lawful-bases" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">3. Lawful bases for processing (GDPR / Swiss FADP)</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Contract performance, legitimate interest in operating and securing the Service, consent where required, and legal obligation.
              </p>
            </section>

            <section id="use" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">4. How we use personal data</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                To provide and operate the Service; authenticate users; detect, investigate, and prevent security incidents; comply with legal obligations; and improve the Service in aggregated, non-identifying form. We do not sell personal data and we do not use Tenant data to train foundation models.
              </p>
            </section>

            <section id="sub-processors" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">5. Sub-processors and disclosures</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                We host the Service on Microsoft Azure in Switzerland North. The operative list of our active sub-processors, including the service each provides, the categories of personal data affected and the processing location, is published at{" "}
                <Link href="/sub-processors" className="text-[var(--primary)] hover:underline">
                  trueaim.ai/sub-processors
                </Link>{" "}
                and is maintained as Schedule 2 to our customer Data Processing Agreement.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mt-3">
                Tools used internally (source control, CI/CD, CRM) that do not process Tenant production data are not customer sub-processors and are not listed there. We do not disclose personal data to other third parties except as required by law or with explicit Tenant instruction.
              </p>
            </section>

            <section id="transfers" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">6. International transfers</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Personal data is stored in Switzerland. Where processing occurs outside Switzerland or the EU/EEA, we rely on Standard Contractual Clauses and equivalent safeguards.
              </p>
            </section>

            <section id="security" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">7. Security</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                We protect personal data using administrative, technical, and physical controls including encryption in transit and at rest, network segregation, least-privilege access, multi-factor authentication, and continuous monitoring. Our security posture is described in further detail at{" "}
                <Link href="/security" className="text-[var(--primary)] hover:underline">
                  trueaim.ai/security
                </Link>{" "}
                and in our SOC 2 report (available under NDA).
              </p>
            </section>

            <section id="retention" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">8. Retention</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                We retain personal data only as long as necessary to deliver the Service and meet our legal obligations. Tenant data is retained for the duration of the Tenant&rsquo;s subscription plus the contractually agreed return/deletion period. Specific retention periods are documented in our internal data retention schedule and reflected in the Data Processing Agreement concluded with each Tenant.
              </p>
            </section>

            <section id="rights" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">9. Your rights</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Subject to applicable law (including GDPR and Swiss FADP), you have rights of access, rectification, erasure, restriction, portability, and objection. If you are an end user of a Tenant, please contact the Tenant first; we will support the Tenant in fulfilling your request. To contact us directly, email{" "}
                <a href="mailto:privacy@trueaim.ai" className="text-[var(--primary)] hover:underline">privacy@trueaim.ai</a>. You also have the right to lodge a complaint with a supervisory authority. In Switzerland, the Federal Data Protection and Information Commissioner (FDPIC); in the EU, your local data protection authority.
              </p>
            </section>

            <section id="automated" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">10. Automated decision-making</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                The Service supports human-in-the-loop claims processing. Outputs of our document intelligence and language models are recommendations to Tenant operators; final decisions are made by the Tenant&rsquo;s authorised personnel. No solely-automated decisions producing legal or similarly significant effects are taken by True Aim against end users.
              </p>
            </section>

            <section id="changes" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">11. Changes to this policy</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                We will update this policy as our practices evolve. The &ldquo;Last updated&rdquo; date at the top of this page reflects the most recent revision. Material changes will be communicated to active Tenants.
              </p>
            </section>

            <section id="contact" className="scroll-mt-24">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">12. Contact</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                True Aim AG, c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Switzerland.<br />
                Email:{" "}
                <a href="mailto:privacy@trueaim.ai" className="text-[var(--primary)] hover:underline">privacy@trueaim.ai</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
