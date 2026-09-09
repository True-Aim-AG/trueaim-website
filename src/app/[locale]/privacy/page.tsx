import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
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

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      <div className="pt-20 md:pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] text-strong mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted mb-2">
            <strong className="text-strong">Effective date:</strong> {PUBLISH_DATE} &nbsp;|&nbsp; <strong className="text-strong">Last updated:</strong> {PUBLISH_DATE}
          </p>
          <p className="text-sm text-muted mb-8">
            Previous versions:{" "}
            <Link href="/privacy-legacy" className="text-link hover:underline">
              v1 (Feb 2026)
            </Link>
          </p>

          <div className="bg-card shadow-card rounded-pill p-6 md:p-8 mb-8">
            <h2 className="font-display text-lg font-semibold text-strong mb-4">Contents</h2>
            <ol className="space-y-1 list-none pl-0">
              {TOC.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-link hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className="text-body leading-[1.6]">
              True Aim AG (&ldquo;True Aim&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) provides a multi-tenant claims-processing platform (&ldquo;Service&rdquo;). This Privacy Policy describes how we collect, use, disclose, and protect personal data when our customers (&ldquo;Tenants&rdquo;) and their end users (collectively, &ldquo;you&rdquo;) interact with our Service or with this website.
            </p>

            <section id="roles" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">1. Roles</h2>
              <p className="text-body leading-[1.6]">
                For personal data submitted by a Tenant about its end users in connection with the Service, the Tenant is the data controller and True Aim acts as a data processor under a data processing agreement. For personal data we collect directly, including account information of Tenant administrators and marketing-site visitor data, True Aim acts as a data controller.
              </p>
            </section>

            <section id="categories" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">2. Categories of personal data we process</h2>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li><strong className="text-strong">Account data:</strong> name, email, organisation, role, authentication metadata.</li>
                <li><strong className="text-strong">Claims data submitted by Tenants:</strong> claim narratives, claimant identifiers, dates of loss, policy numbers, uploaded documents.</li>
                <li><strong className="text-strong">Derived data:</strong> structured data extracted from uploaded documents by our document intelligence and language model components.</li>
                <li><strong className="text-strong">Usage and telemetry:</strong> application logs, audit trail entries, request metadata, operational metrics.</li>
                <li><strong className="text-strong">Website data:</strong> IP address, browser metadata, pages visited (collected via standard server logs and, where applicable, cookies as described in our Cookie Notice).</li>
              </ul>
            </section>

            <section id="lawful-bases" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">3. Lawful bases for processing (GDPR / Swiss FADP)</h2>
              <p className="text-body leading-[1.6]">
                Contract performance, legitimate interest in operating and securing the Service, consent where required, and legal obligation.
              </p>
            </section>

            <section id="use" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">4. How we use personal data</h2>
              <p className="text-body leading-[1.6]">
                To provide and operate the Service; authenticate users; detect, investigate, and prevent security incidents; comply with legal obligations; and improve the Service in aggregated, non-identifying form. We do not sell personal data and we do not use Tenant data to train foundation models.
              </p>
            </section>

            <section id="sub-processors" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">5. Sub-processors and disclosures</h2>
              <p className="text-body leading-[1.6]">
                We host the Service on Microsoft Azure in Switzerland North. The operative list of our active sub-processors, including the service each provides, the categories of personal data affected and the processing location, is published at{" "}
                <Link href="/sub-processors" className="text-link hover:underline">
                  trueaim.ai/sub-processors
                </Link>{" "}
                and is maintained as Schedule 2 to our customer Data Processing Agreement.
              </p>
              <p className="text-body leading-[1.6] mt-3">
                Tools used internally (source control, CI/CD, CRM) that do not process Tenant production data are not customer sub-processors and are not listed there. We do not disclose personal data to other third parties except as required by law or with explicit Tenant instruction.
              </p>
            </section>

            <section id="transfers" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">6. International transfers</h2>
              <p className="text-body leading-[1.6]">
                Personal data is stored in Switzerland. Where processing occurs outside Switzerland or the EU/EEA, we rely on Standard Contractual Clauses and equivalent safeguards.
              </p>
            </section>

            <section id="security" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">7. Security</h2>
              <p className="text-body leading-[1.6]">
                We protect personal data using administrative, technical, and physical controls including encryption in transit and at rest, network segregation, least-privilege access, multi-factor authentication, and continuous monitoring. Our security posture is described in further detail at{" "}
                <Link href="/security" className="text-link hover:underline">
                  trueaim.ai/security
                </Link>{" "}
                and in our SOC 2 report (available under NDA).
              </p>
            </section>

            <section id="retention" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">8. Retention</h2>
              <p className="text-body leading-[1.6]">
                We retain personal data only as long as necessary to deliver the Service and meet our legal obligations. Tenant data is retained for the duration of the Tenant&rsquo;s subscription plus the contractually agreed return/deletion period. Specific retention periods are documented in our internal data retention schedule and reflected in the Data Processing Agreement concluded with each Tenant.
              </p>
            </section>

            <section id="rights" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">9. Your rights</h2>
              <p className="text-body leading-[1.6]">
                Subject to applicable law (including GDPR and Swiss FADP), you have rights of access, rectification, erasure, restriction, portability, and objection. If you are an end user of a Tenant, please contact the Tenant first; we will support the Tenant in fulfilling your request. To contact us directly, email{" "}
                <a href="mailto:privacy@trueaim.ai" className="text-link hover:underline">privacy@trueaim.ai</a>. You also have the right to lodge a complaint with a supervisory authority. In Switzerland, the Federal Data Protection and Information Commissioner (FDPIC); in the EU, your local data protection authority.
              </p>
            </section>

            <section id="automated" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">10. Automated decision-making</h2>
              <p className="text-body leading-[1.6]">
                The Service supports human-in-the-loop claims processing. Outputs of our document intelligence and language models are recommendations to Tenant operators; final decisions are made by the Tenant&rsquo;s authorised personnel. No solely-automated decisions producing legal or similarly significant effects are taken by True Aim against end users.
              </p>
            </section>

            <section id="changes" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">11. Changes to this policy</h2>
              <p className="text-body leading-[1.6]">
                We will update this policy as our practices evolve. The &ldquo;Last updated&rdquo; date at the top of this page reflects the most recent revision. Material changes will be communicated to active Tenants.
              </p>
            </section>

            <section id="contact" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">12. Contact</h2>
              <p className="text-body leading-[1.6]">
                True Aim AG, c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Switzerland.<br />
                Email:{" "}
                <a href="mailto:privacy@trueaim.ai" className="text-link hover:underline">privacy@trueaim.ai</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
