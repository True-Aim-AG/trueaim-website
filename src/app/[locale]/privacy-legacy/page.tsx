import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";
import { PageHero, SECTION } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      <PageHero title="Privacy Policy (Previous Version)" texture={{ name: "glass", position: "72% 18%" }}>
        <p className="mt-6 text-sm text-muted">Last updated: 08 February 2026</p>
      </PageHero>
      <section className={SECTION}>
        <div className="max-w-3xl mx-auto">
          <div className="bg-lilac rounded-[12px] px-8 py-6 mb-8">
            <p className="text-sm text-body leading-[1.6]">
              This is an archived previous version of our privacy policy. The current policy is at{" "}
              <Link href="/privacy" className="text-link hover:underline font-medium">
                trueaim.ai/privacy
              </Link>.
            </p>
          </div>

          <div>
            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">1. Who we are</h2>
              <p className="text-body leading-[1.6]">
                This website is operated by <strong className="text-strong">True Aim AG</strong>, company registration number <strong className="text-strong">CHE-325.128.066</strong>, with its registered office in Zug, Switzerland. Registered address: c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Switzerland. This Privacy Policy explains how we collect, use and protect personal data when you interact with our website.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">2. Scope of this Privacy Policy</h2>
              <p className="text-body leading-[1.6]">
                This Privacy Policy applies to personal data collected through our public website, including contact forms, demo booking forms and meeting scheduling links. It does not govern the processing of data under commercial agreements or customer contracts, which are subject to separate contractual terms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">3. Personal data we collect</h2>
              <p className="text-body leading-[1.6]">
                We collect personal data that you voluntarily provide when you contact us or request a demo. This may include your first and last name, work email address, company name, job title, country and any information you choose to include in free-text fields or which you may submit following a request by us from time to time. If you book a meeting using a calendar link, we may also receive scheduling-related information. We may additionally collect technical data such as IP address, browser type and usage data, amongst others, through cookies and analytics tools.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">4. How we use personal data</h2>
              <p className="text-body leading-[1.6]">
                We use personal data to respond to enquiries, arrange demos or meetings, communicate with prospective customers and partners, improve our website and understand how it is used. Where you have consented, we may also use your details to send relevant communications about True Aim and our services. We do not sell personal data and do not use it for automated decision-making affecting individuals.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">5. Legal basis for processing</h2>
              <p className="text-body leading-[1.6]">
                We process personal data based on your consent, our legitimate interests in operating and improving our website and responding to business enquiries, and where applicable, to comply with legal obligations. You may withdraw consent at any time.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">6. Data hosting and international transfers</h2>
              <p className="text-body leading-[1.6]">
                Our primary data hosting and security infrastructure is based in <strong className="text-strong">Switzerland</strong>. Personal data may be accessed or processed from other jurisdictions where necessary to operate our website or support business activities. Where international transfers occur, we take appropriate steps to ensure adequate data protection in line with Swiss and EU standards.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">7. Data retention</h2>
              <p className="text-body leading-[1.6]">
                We retain personal data only for as long as necessary to fulfil the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law. Information submitted through contact or demo forms is typically retained for business follow-up and record-keeping purposes.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">8. Data security</h2>
              <p className="text-body leading-[1.6]">
                We implement appropriate technical and organisational measures to protect personal data against unauthorised access, loss or misuse. While no system can be guaranteed to be completely secure, we take data protection seriously and aim to have the appropriate safeguards in place.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">9. Your rights</h2>
              <p className="text-body leading-[1.6]">
                Depending on your location and applicable law, you may have the right to request access to your personal data, request correction or deletion, object to or restrict processing or withdraw consent. Requests can be made by contacting us at{" "}
                <a href="mailto:info@trueaim.ai" className="text-link hover:underline font-medium">
                  info@trueaim.ai
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">10. South Africa and POPIA</h2>
              <p className="text-body leading-[1.6]">
                Where personal data is processed in or from South Africa, we take steps to align with the Protection of Personal Information Act (POPIA). Our{" "}
                <Link href="/paia" className="text-link hover:underline">
                  PAIA Manual
                </Link>{" "}
                provides further information on access to information requests under South African law.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">11. Cookies and analytics</h2>
              <p className="text-body leading-[1.6]">
                We use cookies and similar technologies as described in our{" "}
                <Link href="/cookies" className="text-link hover:underline">
                  Cookie Policy
                </Link>. Analytics tools help us understand website usage and improve performance. You can manage cookie preferences at any time.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">12. Changes to this Privacy Policy</h2>
              <p className="text-body leading-[1.6]">
                We may update this Privacy Policy from time to time to reflect changes in legal requirements, technology or our practices. The latest version will always be available on this page or upon request if a later version exists but has not been published yet.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">13. Contact</h2>
              <p className="text-body leading-[1.6]">
                If you have any questions about this Privacy Policy or how we handle personal data, you can contact us at{" "}
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
