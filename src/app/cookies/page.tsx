import Link from "next/link";

export default function CookiesPage() {
  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
          Cookie Policy
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
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">1. What Are Cookies</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences and improve your browsing experience. Cookies may be set by the website you are visiting (first-party cookies) or by third-party services operating on that website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">2. Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-medium text-[var(--text-primary)] mb-1">Essential Cookies</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Required for the website to function properly. These cannot be disabled. They include cookies for theme preferences and cookie consent choices.
                </p>
              </div>
              <div>
                <h3 className="text-base font-medium text-[var(--text-primary)] mb-1">Functional Cookies</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Enable enhanced functionality such as remembering your preferences and settings across visits.
                </p>
              </div>
              <div>
                <h3 className="text-base font-medium text-[var(--text-primary)] mb-1">Analytics Cookies</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Help us understand how visitors interact with our website by collecting anonymised usage data. We use Google Analytics 4 for this purpose, which is only activated with your consent.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">3. Managing Cookies</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              You can manage your cookie preferences through our cookie consent banner, which appears on your first visit. You can also control cookies through your browser settings. Note that disabling certain cookies may affect website functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">4. Third-Party Cookies</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Some cookies are placed by third-party services that appear on our pages. We do not control these cookies. Third-party services we use include Google Analytics for website usage analysis. These are only activated when you provide consent.
            </p>
          </section>

          <div className="pt-6 border-t border-[var(--border)]">
            <p className="text-sm text-[var(--text-muted)] mb-1">Cookie inquiries:</p>
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
