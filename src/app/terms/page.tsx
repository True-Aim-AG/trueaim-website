import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
          Terms of Service
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
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">1. Acceptance of Terms</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              By accessing or using the True Aim website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">2. Services</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              True Aim provides AI-powered claims decisioning software, including MIRA, ContextBuilder, and ClaimEval. Access to these services is subject to separate commercial agreements. This website provides general information about our products and company.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">3. Intellectual Property</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              All content, trademarks, and intellectual property on this website are owned by True Aim AG or its licensors. You may not reproduce, distribute, or create derivative works from any content without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">4. Acceptable Use</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              You agree to use our website and services only for lawful purposes. You may not attempt to gain unauthorised access to our systems, interfere with website functionality, or use automated tools to scrape or collect data without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">5. Limitation of Liability</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              True Aim AG provides this website and its content on an &ldquo;as is&rdquo; basis. We make no warranties regarding the accuracy, completeness, or suitability of information provided. To the maximum extent permitted by law, True Aim AG shall not be liable for any indirect, incidental, or consequential damages arising from use of our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">6. Governing Law</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              These terms are governed by and construed in accordance with the laws of Switzerland. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Zurich, Switzerland.
            </p>
          </section>

          <div className="pt-6 border-t border-[var(--border)]">
            <p className="text-sm text-[var(--text-muted)] mb-1">Legal inquiries:</p>
            <a
              href="mailto:legal@trueaim.ai"
              className="text-[var(--primary)] font-medium hover:underline"
            >
              legal@trueaim.ai
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
