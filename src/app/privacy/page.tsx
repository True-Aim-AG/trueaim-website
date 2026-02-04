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

        <div className="glass-panel p-8 md:p-12 space-y-6">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            We are currently finalizing our Privacy Policy to ensure it fully reflects our data handling practices and complies with applicable regulations including GDPR and Swiss data protection law.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            TrueAim.ai is committed to protecting your personal data. If you have any questions about how we handle your information, please contact us directly.
          </p>
          <div className="pt-4 border-t border-[var(--border)]">
            <p className="text-sm text-[var(--text-muted)] mb-1">Contact us at:</p>
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
