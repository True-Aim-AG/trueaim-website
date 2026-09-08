import { setRequestLocale } from "next-intl/server";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";

const PUBLISH_DATE = "2026-05-21";

export default async function EthicsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      <div className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            Ethics &amp; Confidential Reporting
          </h1>
          <p className="text-sm text-[var(--text-muted)] mb-8">
            <strong>Last updated:</strong> {PUBLISH_DATE}
          </p>

          <div className="glass-panel p-8 md:p-12 space-y-8">
            <p className="text-[var(--text-secondary)] leading-relaxed">
              True Aim AG is committed to operating with integrity and to providing a safe channel for raising concerns about potential misconduct, ethical violations, security or privacy issues, or breaches of law or company policy.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">How to report</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Send an email to{" "}
                <a href="mailto:ethics@trueaim.ai" className="text-[var(--primary)] hover:underline">ethics@trueaim.ai</a>. This mailbox is monitored by the CEO. You may include as much or as little detail as you choose.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Reporting anonymously</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-3">
                If you prefer to report anonymously, you may:
              </p>
              <ul className="list-disc pl-6 text-[var(--text-secondary)] leading-relaxed space-y-2">
                <li>Send your email from an anonymous email provider (for example, a free webmail account that does not identify you).</li>
                <li>Send a written letter to: True Aim AG, c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Switzerland, marked &ldquo;Confidential &mdash; Ethics Report&rdquo;.</li>
              </ul>
              <p className="text-[var(--text-secondary)] leading-relaxed mt-3">
                We will not attempt to identify anonymous reporters. We will, however, ask follow-up questions through the same channel where possible.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">How we handle reports</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Reports are reviewed by the CEO. If a report concerns the CEO, it should be addressed to the Chair of the Board at the same address, marked for the Chair&rsquo;s attention. We acknowledge non-anonymous reports within five business days. Investigations are conducted as confidentially as possible, consistent with our duty to investigate and remediate.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Non-retaliation</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                True Aim prohibits retaliation against anyone who in good faith raises a concern through this channel or who participates in an investigation. Retaliation is itself grounds for disciplinary action up to and including termination.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Related policies</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                This channel is described in our Code of Conduct and Whistleblower Policy, copies of which are available to employees and contractors and to external parties on request to{" "}
                <a href="mailto:ethics@trueaim.ai" className="text-[var(--primary)] hover:underline">ethics@trueaim.ai</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
