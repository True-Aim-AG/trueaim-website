import Link from "next/link";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";

const PUBLISH_DATE = "2026-05-21";

export default function SupportPage() {
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      <div className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            Customer Support
          </h1>
          <p className="text-sm text-[var(--text-muted)] mb-8">
            <strong>Last updated:</strong> {PUBLISH_DATE}
          </p>

          <div className="glass-panel p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">How to reach us</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                For product support, email{" "}
                <a href="mailto:support@trueaim.ai" className="text-[var(--primary)] hover:underline">support@trueaim.ai</a>. Please include your tenant name, the affected user, a description of the issue, and any screenshots or error messages.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Hours and response times</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-3">
                Business hours are Monday to Friday, 09:00 to 18:00 Central European Time, excluding Swiss public holidays. Our target initial response times are:
              </p>
              <ul className="list-disc pl-6 text-[var(--text-secondary)] leading-relaxed space-y-2">
                <li><strong>Severity 1 (production outage or data loss):</strong> within 4 business hours.</li>
                <li><strong>Severity 2 (major feature unavailable):</strong> within 1 business day.</li>
                <li><strong>Severity 3 / 4 (questions, minor issues):</strong> within 3 business days.</li>
              </ul>
              <p className="text-[var(--text-secondary)] leading-relaxed mt-3">
                Specific service levels for paying customers are governed by the applicable contract.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Other contact channels</h2>
              <ul className="list-disc pl-6 text-[var(--text-secondary)] leading-relaxed space-y-2">
                <li>Sales and partnerships:{" "}
                  <a href="mailto:hello@trueaim.ai" className="text-[var(--primary)] hover:underline">hello@trueaim.ai</a>
                </li>
                <li>Privacy and data protection:{" "}
                  <a href="mailto:privacy@trueaim.ai" className="text-[var(--primary)] hover:underline">privacy@trueaim.ai</a>{" "}
                  (see{" "}
                  <Link href="/privacy" className="text-[var(--primary)] hover:underline">Privacy Policy</Link>)
                </li>
                <li>Security reports:{" "}
                  <a href="mailto:security@trueaim.ai" className="text-[var(--primary)] hover:underline">security@trueaim.ai</a>{" "}
                  (see{" "}
                  <Link href="/security" className="text-[var(--primary)] hover:underline">Security</Link>)
                </li>
                <li>Ethics and confidential reports:{" "}
                  <a href="mailto:ethics@trueaim.ai" className="text-[var(--primary)] hover:underline">ethics@trueaim.ai</a>{" "}
                  (see{" "}
                  <Link href="/ethics" className="text-[var(--primary)] hover:underline">Ethics &amp; Reporting</Link>)
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
