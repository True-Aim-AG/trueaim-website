import Link from "next/link";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";

export default function CookiesPage() {
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      <div className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
          Cookie Policy
        </h1>
        <p className="text-sm text-[var(--text-muted)] mb-8">
          Last updated: 08 February 2026
        </p>

        <div className="glass-panel p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">1. Who we are</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              This website is operated by <strong>True Aim AG</strong>, company registration number <strong>CHE-325.128.066</strong>, with its registered office in Zug, Switzerland. Registered address: c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Switzerland. This Cookie Policy explains how we use cookies and similar technologies on our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">2. What are cookies?</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Cookies are small text files that are placed on your device when you visit a website. They help websites function properly, improve user experience and provide information about how the site is used. Cookies may be set by us (first-party cookies) or by third-party services we use.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">3. How we use cookies</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We use cookies for the following purposes. Essential cookies are required for the website to function properly and cannot be disabled. They support core functionality such as page navigation, form submission and security. Analytics cookies help us understand how visitors use our website, such as which pages are visited most often and how users move through the site. This information is used to improve website performance and usability. Analytics data is aggregated and does not directly identify individual users. Marketing cookies may be used to support communications and outreach, including understanding the effectiveness of campaigns and content. These cookies may be set by third-party platforms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">4. Cookies used on this website</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We may use cookies and similar technologies in connection with website analytics, contact and demo request forms, calendar booking links and consent management tools. The specific cookies used may change over time as we improve our website and services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">5. Managing your cookie preferences</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              When you visit our website, you are given the option to accept or decline non-essential cookies. You can also manage or delete cookies through your browser settings at any time. Please note that disabling essential cookies may affect the functionality of the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">6. Data protection and international access</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Our primary data hosting and security infrastructure is based in Switzerland. Where cookies involve the processing of personal data, such processing is handled in accordance with applicable Swiss data protection law and, where relevant, EU data protection standards. For more information on how we handle personal data, please see our{" "}
              <Link href="/privacy" className="text-[var(--primary)] hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">7. Updates to this Cookie Policy</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in technology, legal requirements or how we operate our website. The latest version will always be available on this page or upon request if a later version exists but has not been published yet.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">8. Contact</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              If you have any questions about our use of cookies, you can contact us at{" "}
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
