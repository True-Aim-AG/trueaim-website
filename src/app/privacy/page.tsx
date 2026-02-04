import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-[var(--text-muted)] mb-8">
          Last updated: February 2026
        </p>

        <div className="glass-panel p-8 md:p-12 space-y-8">
          <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <p className="text-sm text-amber-400">
              This policy is being refined. Contact us for the most current version.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">1. Data Collection</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We collect personal data that you provide directly to us, including your name, email address, company name, job title, and any information you submit through our contact forms. We also collect technical data such as IP addresses, browser type, and device information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">2. Data Processing</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We process your data to respond to inquiries, provide our services, improve our website, and comply with legal obligations. Data processing is carried out in accordance with the Swiss Federal Act on Data Protection (FADP) and the EU General Data Protection Regulation (GDPR).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">3. Legal Basis</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We process personal data based on your consent, the performance of a contract or pre-contractual measures, compliance with legal obligations, and our legitimate interests in operating and improving our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">4. Data Sharing</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We do not sell your personal data. We may share data with trusted service providers who assist in operating our website and services, subject to appropriate data processing agreements. Data may be transferred outside Switzerland and the EEA only with adequate safeguards in place.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">5. Data Retention</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We retain personal data only as long as necessary for the purposes described in this policy or as required by law. Contact form submissions are retained for the duration of any business relationship and for a reasonable period thereafter.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">6. Your Rights</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              You have the right to access, correct, delete, or port your personal data. You may also object to or restrict certain processing activities. To exercise these rights, contact us at the address below. We will respond to your request within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">7. Security</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These measures are regularly reviewed and updated.
            </p>
          </section>

          <div className="pt-6 border-t border-[var(--border)]">
            <p className="text-sm text-[var(--text-muted)] mb-1">Privacy inquiries:</p>
            <a
              href="mailto:privacy@trueaim.ai"
              className="text-[var(--primary)] font-medium hover:underline"
            >
              privacy@trueaim.ai
            </a>
          </div>
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
  );
}
