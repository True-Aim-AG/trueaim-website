import { setRequestLocale } from "next-intl/server";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";
import { PageHero, SECTION } from "@/components/content";

const PUBLISH_DATE = "2026-05-21";

export default async function EthicsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      <PageHero title="Ethics & Confidential Reporting" texture={{ name: "circ", position: "88% 78%" }}>
        <p className="mt-6 text-sm text-muted"><strong className="text-strong">Last updated:</strong> {PUBLISH_DATE}</p>
      </PageHero>
      <section className={SECTION}>
        <div className="max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div>
            <p className="text-body leading-[1.6]">
              True Aim AG is committed to operating with integrity and to providing a safe channel for raising concerns about potential misconduct, ethical violations, security or privacy issues, or breaches of law or company policy.
            </p>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">How to report</h2>
              <p className="text-body leading-[1.6]">
                Send an email to{" "}
                <a href="mailto:ethics@trueaim.ai" className="text-link hover:underline">ethics@trueaim.ai</a>. This mailbox is monitored by the CEO. You may include as much or as little detail as you choose.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Reporting anonymously</h2>
              <p className="text-body leading-[1.6] mb-3">
                If you prefer to report anonymously, you may:
              </p>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li>Send your email from an anonymous email provider (for example, a free webmail account that does not identify you).</li>
                <li>Send a written letter to: True Aim AG, c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Switzerland, marked &ldquo;Confidential &mdash; Ethics Report&rdquo;.</li>
              </ul>
              <p className="text-body leading-[1.6] mt-3">
                We will not attempt to identify anonymous reporters. We will, however, ask follow-up questions through the same channel where possible.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">How we handle reports</h2>
              <p className="text-body leading-[1.6]">
                Reports are reviewed by the CEO. If a report concerns the CEO, it should be addressed to the Chair of the Board at the same address, marked for the Chair&rsquo;s attention. We acknowledge non-anonymous reports within five business days. Investigations are conducted as confidentially as possible, consistent with our duty to investigate and remediate.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Non-retaliation</h2>
              <p className="text-body leading-[1.6]">
                True Aim prohibits retaliation against anyone who in good faith raises a concern through this channel or who participates in an investigation. Retaliation is itself grounds for disciplinary action up to and including termination.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Related policies</h2>
              <p className="text-body leading-[1.6]">
                This channel is described in our Code of Conduct and Whistleblower Policy, copies of which are available to employees and contractors and to external parties on request to{" "}
                <a href="mailto:ethics@trueaim.ai" className="text-link hover:underline">ethics@trueaim.ai</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
