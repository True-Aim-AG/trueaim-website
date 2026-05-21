import { Link } from "@/i18n/navigation";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      <div className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            Privacy Policy (Previous Version)
          </h1>
          <p className="text-sm text-[var(--text-muted)] mb-2">
            Last updated: 08 February 2026
          </p>
          <div className="glass-panel p-4 mb-8 border-l-4 border-[var(--primary)]">
            <p className="text-sm text-[var(--text-secondary)]">
              This is an archived previous version of our privacy policy. The current policy is at{" "}
              <Link href="/privacy" className="text-[var(--primary)] hover:underline font-medium">
                trueaim.ai/privacy
              </Link>.
            </p>
          </div>

          <div className="glass-panel p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">1. Who we are</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                This website is operated by <strong>True Aim AG</strong>, company registration number <strong>CHE-325.128.066</strong>, with its registered office in Zug, Switzerland. Registered address: c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Switzerland. This Privacy Policy explains how we collect, use and protect personal data when you interact with our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">2. Scope of this Privacy Policy</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                This Privacy Policy applies to personal data collected through our public website, including contact forms, demo booking forms and meeting scheduling links. It does not govern the processing of data under commercial agreements or customer contracts, which are subject to separate contractual terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">3. Personal data we collect</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                We collect personal data that you voluntarily provide when you contact us or request a demo. This may include your first and last name, work email address, company name, job title, country and any information you choose to include in free-text fields or which you may submit following a request by us from time to time. If you book a meeting using a calendar link, we may also receive scheduling-related information. We may additionally collect technical data such as IP address, browser type and usage data, amongst others, through cookies and analytics tools.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">4. How we use personal data</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                We use personal data to respond to enquiries, arrange demos or meetings, communicate with prospective customers and partners, improve our website and understand how it is used. Where you have consented, we may also use your details to send relevant communications about True Aim and our services. We do not sell personal data and do not use it for automated decision-making affecting individuals.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">5. Legal basis for processing</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                We process personal data based on your consent, our legitimate interests in operating and improving our website and responding to business enquiries, and where applicable, to comply with legal obligations. You may withdraw consent at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">6. Data hosting and international transfers</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Our primary data hosting and security infrastructure is based in <strong>Switzerland</strong>. Personal data may be accessed or processed from other jurisdictions where necessary to operate our website or support business activities. Where international transfers occur, we take appropriate steps to ensure adequate data protection in line with Swiss and EU standards.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">7. Data retention</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                We retain personal data only for as long as necessary to fulfil the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law. Information submitted through contact or demo forms is typically retained for business follow-up and record-keeping purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">8. Data security</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                We implement appropriate technical and organisational measures to protect personal data against unauthorised access, loss or misuse. While no system can be guaranteed to be completely secure, we take data protection seriously and aim to have the appropriate safeguards in place.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">9. Your rights</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Depending on your location and applicable law, you may have the right to request access to your personal data, request correction or deletion, object to or restrict processing or withdraw consent. Requests can be made by contacting us at{" "}
                <a href="mailto:info@trueaim.ai" className="text-[var(--primary)] hover:underline font-medium">
                  info@trueaim.ai
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">10. South Africa and POPIA</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Where personal data is processed in or from South Africa, we take steps to align with the Protection of Personal Information Act (POPIA). Our{" "}
                <Link href="/paia" className="text-[var(--primary)] hover:underline">
                  PAIA Manual
                </Link>{" "}
                provides further information on access to information requests under South African law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">11. Cookies and analytics</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                We use cookies and similar technologies as described in our{" "}
                <Link href="/cookies" className="text-[var(--primary)] hover:underline">
                  Cookie Policy
                </Link>. Analytics tools help us understand website usage and improve performance. You can manage cookie preferences at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">12. Changes to this Privacy Policy</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in legal requirements, technology or our practices. The latest version will always be available on this page or upon request if a later version exists but has not been published yet.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">13. Contact</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                If you have any questions about this Privacy Policy or how we handle personal data, you can contact us at{" "}
                <a href="mailto:info@trueaim.ai" className="text-[var(--primary)] hover:underline font-medium">
                  info@trueaim.ai
                </a>.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mt-2">
                Company: True Aim AG<br />
                Registered office: Zug, Switzerland
              </p>
            </section>

            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
