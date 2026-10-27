import { setRequestLocale } from "next-intl/server";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";
import { PageHero, SECTION } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";

export default async function AITransparencyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      <PageHero compact title="AI Transparency & Oversight" texture={{ name: "glass", position: "50% 50%" }}>
        <p className="mt-6 text-sm text-muted">Last updated: 22 February 2026</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div>
            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Purpose of this statement</h2>
              <p className="text-body leading-[1.6]">
                This statement describes how True Aim AG approaches the design and use of artificial intelligence within its products. It outlines the role of AI within our systems, the boundaries within which it operates and the oversight mechanisms applied. This statement reflects our approach as at the date of last update above and may be revised from time to time as our architecture, governance practices and regulatory environment evolve. It is provided for transparency purposes only and does not constitute a contractual commitment or formal regulatory classification.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Our design approach</h2>
              <p className="text-body leading-[1.6]">
                True Aim builds AI-assisted decision infrastructure for regulated industries. Our systems are designed to support structured analysis, interpretation and workflow execution within defined control boundaries. AI components are used to assist with document understanding, data extraction, classification and analytical support across different stages of the processing pipeline. Human review and organisational control remain central to production environments. Decisions and outcomes must be capable of structured explanation and review.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Where AI is used</h2>
              <p className="text-body leading-[1.6]">
                Within our products, AI may be used to convert documents into structured text, classify document types, extract structured information and assist in analytical processing. AI may support analysis even where information is complete and unambiguous, as part of workflow acceleration and structured processing. AI components operate within defined stages of the system architecture and are integrated into broader rule-based and workflow controls.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Where AI is not used</h2>
              <p className="text-body leading-[1.6]">
                AI components are not designed to independently assume organisational authority or act outside defined workflow stages. Final responsibility for decisions, actions and outcomes remains with the organisation using the system. If an organisation chooses to automate a subsequent step or operational action following a system output, recommendation or analysis, that decision to proceed and the consequences of doing so remain with that organisation. This applies whether the subsequent step is manual, semi-automated or automated through system configuration.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Oversight and workflow control</h2>
              <p className="text-body leading-[1.6]">
                True Aim systems are designed to support human oversight within production workflows. Users may review system outputs, assess supporting information and apply their own judgement before finalising outcomes. Role-based permissions and workflow controls are applied to restrict access to configuration changes and decision logic adjustments. System outputs are advisory in nature unless otherwise defined in a separate written agreement.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Auditability and traceability</h2>
              <p className="text-body leading-[1.6]">
                True Aim systems are designed to support auditability and post-hoc review. Processing steps may be recorded in a manner that enables traceability from outcomes back to source materials, applied rules and relevant system configurations in effect at the time of processing. This structured logging is intended to support review, quality assurance and compliance analysis within regulated environments.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Data handling principles</h2>
              <p className="text-body leading-[1.6]">
                True Aim does not train foundational AI models on customer data. AI components operate through managed AI services and process data for inference purposes within the defined workflow. Security, encryption and access controls are applied in line with our broader information security practices. Data retention and deletion practices are governed by contractual arrangements and applicable legal requirements.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Risk-based design</h2>
              <p className="text-body leading-[1.6]">
                Our systems are developed with regulated use cases in mind. Architectural measures are applied to support explainability, structured review, access control and operational transparency. We continue to refine our technical and governance practices as regulatory standards and industry expectations develop.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Evolution of systems</h2>
              <p className="text-body leading-[1.6]">
                True Aim operates in a rapidly developing technological environment. System architecture, model providers, processing methods and control mechanisms may evolve over time. This statement describes our general approach at the time of publication and should be read in that context.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Contact</h2>
              <p className="text-body leading-[1.6]">
                If you have any questions about our approach to AI usage or oversight, you can contact us at{" "}
                <a href="mailto:info@trueaim.ai" className="text-link hover:underline font-medium">
                  info@trueaim.ai
                </a>.
              </p>
              <p className="text-body leading-[1.6] mt-2">
                Company: True Aim AG<br />
                Registered office: Zug, Switzerland
              </p>
            </section>

            <div className="pt-4">
              <ButtonLink href="/contact" variant="primary" size="md">
                Contact Us
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
