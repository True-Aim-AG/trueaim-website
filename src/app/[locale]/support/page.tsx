import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";

const PUBLISH_DATE = "2026-05-21";

export default async function SupportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      <div className="pt-20 md:pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="mt-3 font-display text-4xl font-bold leading-[1.05] text-strong mb-4">
            Customer Support
          </h1>
          <p className="text-sm text-muted mb-8">
            <strong className="text-strong">Last updated:</strong> {PUBLISH_DATE}
          </p>

          <div>
            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">How to reach us</h2>
              <p className="text-body leading-[1.6]">
                For product support, email{" "}
                <a href="mailto:support@trueaim.ai" className="text-link hover:underline">support@trueaim.ai</a>. Please include your tenant name, the affected user, a description of the issue, and any screenshots or error messages.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Hours and response times</h2>
              <p className="text-body leading-[1.6] mb-3">
                Business hours are Monday to Friday, 09:00 to 18:00 Central European Time, excluding Swiss public holidays. Our target initial response times are:
              </p>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li><strong className="text-strong">Severity 1 (production outage or data loss):</strong> within 4 business hours.</li>
                <li><strong className="text-strong">Severity 2 (major feature unavailable):</strong> within 1 business day.</li>
                <li><strong className="text-strong">Severity 3 / 4 (questions, minor issues):</strong> within 3 business days.</li>
              </ul>
              <p className="text-body leading-[1.6] mt-3">
                Specific service levels for paying customers are governed by the applicable contract.
              </p>
            </section>

            <section>
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">Other contact channels</h2>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li>Sales and partnerships:{" "}
                  <a href="mailto:hello@trueaim.ai" className="text-link hover:underline">hello@trueaim.ai</a>
                </li>
                <li>Privacy and data protection:{" "}
                  <a href="mailto:privacy@trueaim.ai" className="text-link hover:underline">privacy@trueaim.ai</a>{" "}
                  (see{" "}
                  <Link href="/privacy" className="text-link hover:underline">Privacy Policy</Link>)
                </li>
                <li>Security reports:{" "}
                  <a href="mailto:security@trueaim.ai" className="text-link hover:underline">security@trueaim.ai</a>{" "}
                  (see{" "}
                  <Link href="/security" className="text-link hover:underline">Security</Link>)
                </li>
                <li>Ethics and confidential reports:{" "}
                  <a href="mailto:ethics@trueaim.ai" className="text-link hover:underline">ethics@trueaim.ai</a>{" "}
                  (see{" "}
                  <Link href="/ethics" className="text-link hover:underline">Ethics &amp; Reporting</Link>)
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
