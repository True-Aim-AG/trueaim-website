import { setRequestLocale } from "next-intl/server";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";
import { PageHero, SECTION } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";

export default async function PAIAPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      <PageHero title="PAIA Manual" texture={{ name: "circ", position: "50% 50%" }}>
        <p className="mt-6 text-sm text-muted">Last updated: 08 February 2026</p>
      </PageHero>
      <section className={SECTION}>
        <div className="max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div>
            <p className="text-sm text-muted italic">
              Prepared in accordance with the Promotion of Access to Information Act, 2 of 2000
            </p>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">1. Introduction</h2>
              <p className="text-body leading-[1.6]">
                This PAIA Manual has been prepared in accordance with section 51 of the Promotion of Access to Information Act, 2000 (&ldquo;PAIA&rdquo;) and incorporates the relevant requirements of the Protection of Personal Information Act, 2013 (&ldquo;POPIA&rdquo;). The purpose of this Manual is to set out the procedures for requesting access to records held by <strong className="text-strong">True Aim AG</strong> and to provide information required by PAIA and POPIA.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">2. Company details</h2>
              <div className="space-y-2 text-body leading-[1.6]">
                <p><span className="font-medium text-strong">Company name:</span> True Aim AG</p>
                <p><span className="font-medium text-strong">Registration number:</span> CHE-325.128.066</p>
                <p><span className="font-medium text-strong">Registered office:</span> Zug, Switzerland</p>
                <p><span className="font-medium text-strong">Registered address:</span> c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Switzerland</p>
                <p><span className="font-medium text-strong">Contact email:</span>{" "}
                  <a href="mailto:info@trueaim.ai" className="text-link hover:underline">info@trueaim.ai</a>
                </p>
              </div>
              <p className="text-body leading-[1.6] mt-4">
                True Aim AG is a Swiss-based company operating globally, including certain data processing activities relating to South Africa.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">3. Information Officer</h2>
              <p className="text-body leading-[1.6]">
                The Information Officer of True Aim AG is the <strong className="text-strong">Chief Executive Officer (CEO) of True Aim AG</strong>. No Deputy Information Officer has been appointed.
              </p>
              <p className="text-body leading-[1.6] mt-2">
                All PAIA and POPIA-related requests must be submitted by email to:{" "}
                <a href="mailto:info@trueaim.ai" className="text-link hover:underline font-medium">info@trueaim.ai</a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">4. Guide on how to use PAIA</h2>
              <p className="text-body leading-[1.6]">
                The South African Human Rights Commission has compiled a guide explaining how to use PAIA, including how to submit access requests. This guide is available from the Commission&apos;s website or offices.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">5. Records available without a PAIA request</h2>
              <p className="text-body leading-[1.6] mb-4">
                The following records are available without submitting a formal PAIA request:
              </p>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li>Information published on the True Aim website</li>
                <li>Public marketing materials</li>
                <li>Published blog articles and case studies</li>
                <li>Public corporate or regulatory disclosures</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">6. Categories of records held</h2>
              <p className="text-body leading-[1.6]">
                True Aim AG may hold records relating to its corporate administration, commercial operations, financial affairs, personnel, information systems, business relationships and compliance obligations, including personal information as defined under POPIA. Access to such records is subject to the limitations and grounds for refusal set out in PAIA and other applicable laws.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">7. Records relating to personal information (POPIA)</h2>
              <p className="text-body leading-[1.6] mb-4">
                True Aim AG processes personal information for legitimate business purposes, including:
              </p>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li>Contact and enquiry handling</li>
                <li>Demo requests and meeting scheduling</li>
                <li>Business communications</li>
                <li>Operational and administrative purposes</li>
                <li>Legal or regulatory compliance</li>
              </ul>
              <p className="text-body leading-[1.6] mt-4">
                Personal information is processed primarily in <strong className="text-strong">Switzerland</strong>, with appropriate technical and organisational safeguards in place. Where personal information relates to South African data subjects, processing is conducted in a manner aligned with POPIA principles.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">8. Request procedure</h2>
              <p className="text-body leading-[1.6]">
                Requests for access to records must be submitted in writing by email to the Information Officer at{" "}
                <a href="mailto:info@trueaim.ai" className="text-link hover:underline font-medium">info@trueaim.ai</a>. The requester must provide sufficient detail to identify the record requested and indicate the form of access required. Proof of identity is required before a request is processed.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">9. Fees</h2>
              <p className="text-body leading-[1.6]">
                Where applicable, a request fee may be charged in accordance with PAIA. Any applicable fees will be communicated before the request is processed.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">10. Grounds for refusal</h2>
              <p className="text-body leading-[1.6]">
                Access to records may be refused on grounds set out in PAIA, including but not limited to the protection of personal information, confidential commercial information, intellectual property and trade secrets, legal privilege and security or safety considerations.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">11. Availability of this Manual</h2>
              <p className="text-body leading-[1.6]">
                The latest version of the PAIA Manual will always be available on this page or upon request if a later version exists but has not been published yet. You may request it via email at{" "}
                <a href="mailto:info@trueaim.ai" className="text-link hover:underline font-medium">info@trueaim.ai</a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">12. Updates</h2>
              <p className="text-body leading-[1.6]">
                This Manual may be updated from time to time to reflect changes in legislation or business practices.
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
