import { Link } from "@/i18n/navigation";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      <div className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
          Terms of Use
        </h1>
        <p className="text-sm text-[var(--text-muted)] mb-8">
          Last updated: 08 February 2026
        </p>

        <div className="glass-panel p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">1. Who we are</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              This website is operated by <strong>True Aim AG</strong>, company registration number <strong>CHE-325.128.066</strong>, with its registered office in Zug, Switzerland. Registered address: c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Switzerland. These Terms of Use govern your access to and use of this website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">2. Acceptance of these Terms</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              By accessing or using this website, you agree to these Terms of Use. If you do not agree, you should not use the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">3. Purpose of the website</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              This website is provided for general information, business enquiries and demonstration purposes only. It is intended for <strong>business users</strong>, including customers, prospective customers, investors, prospective investors, partners etc. No products or services are sold through the website and no contracts are formed through website use.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">4. No professional or binding advice</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Any information made available on this website, including descriptions of capabilities, examples, blog content, case studies and tools such as the Impact Estimator, is provided for <strong>illustrative and informational purposes only</strong>. Outputs and examples do not constitute professional advice, binding determinations or contractual commitments, and must not be relied upon as such. Any use of True Aim&apos;s technology in production environments is subject to separate contractual agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">5. Decision-support disclaimer</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Where the website references automation, assessments, estimations or outcomes, these are intended to describe <strong>decision-support capabilities only</strong>, unless explicitly agreed otherwise in a written contract. Final responsibility for decisions, actions and outcomes remains with the relevant organisation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">6. Intellectual property</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              All content on this website, including text, graphics, logos, diagrams, and other materials, is owned by or licensed to True Aim AG and is protected by applicable intellectual property laws. You may view and download content for internal, non-commercial use only. You may not copy, reproduce, modify, distribute or create derivative works without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">7. Permitted use</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              You may use this website only for lawful purposes and in a manner that does not infringe the rights of others or restrict or inhibit their use of the website. You must not attempt to interfere with the operation or security of the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">8. Third-party links</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              This website may contain links to third-party websites or services, including scheduling tools. True Aim AG is not responsible for the content, availability or practices of third-party sites and does not endorse them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">9. Availability and changes</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We may modify, suspend or discontinue the website or any part of it at any time without notice. We do not guarantee that the website will be available without interruption or error.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">10. Limitation of liability</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              To the fullest extent permitted by law, True Aim AG excludes liability for any loss or damage arising from or in connection with your use of, or inability to use, this website or reliance on its content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">11. Governing law and jurisdiction</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              These Terms of Use are governed by the laws of <strong>Switzerland</strong>. Any disputes arising in connection with these Terms of Use shall be subject to the exclusive jurisdiction of the competent courts of Switzerland.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">12. Changes to these Terms</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We may update these Terms of Use from time to time. The latest version will always be available on this page or upon request if a later version exists but has not been published yet.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">13. Contact</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              If you have any questions about these Terms of Use, you can contact us at{" "}
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
