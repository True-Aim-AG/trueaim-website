import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";
import { PageHero, SECTION } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      <PageHero title="Cookie Policy" texture={{ name: "circ", position: "88% 78%" }}>
        <p className="mt-6 text-sm text-muted">Last updated: 19 October 2026</p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

        <div>
          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">1. Who we are</h2>
            <p className="text-body leading-[1.6]">
              This website is operated by <strong className="text-strong">True Aim AG</strong>, company registration number <strong className="text-strong">CHE-325.128.066</strong>, with its registered office in Zug, Switzerland. Registered address: c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Switzerland. This Cookie Policy explains how we use cookies and similar technologies on our website.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">2. What are cookies?</h2>
            <p className="text-body leading-[1.6]">
              Cookies are small text files that are placed on your device when you visit a website. They help websites function properly, improve user experience and provide information about how the site is used. Cookies may be set by us (first-party cookies) or by third-party services we use.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">3. How we use cookies</h2>
            <p className="text-body leading-[1.6]">
              We use cookies for the following purposes. Essential cookies are required for the website to function properly and cannot be disabled. They support core functionality such as page navigation, form submission and security. Analytics cookies help us understand how visitors use our website, such as which pages are visited most often and how users move through the site. This information is used to improve website performance and usability. Analytics data is aggregated and does not directly identify individual users. We set no marketing or advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">4. Cookies used on this website</h2>
            <p className="text-body leading-[1.6]">
              No cookie is set before you make a choice in the cookie banner. The cookies and similar technologies on this website are:
            </p>
            <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2 mt-3">
              <li><strong className="text-strong">Consent choice</strong> (set by this website in your browser&rsquo;s local storage, not a cookie): remembers whether you accepted or declined analytics cookies.</li>
              <li><strong className="text-strong">Google Analytics 4, loaded through Google Tag Manager</strong> (<code>_ga</code>, <code>_ga_*</code>): set only after you accept analytics cookies; measure page views and interactions.</li>
              <li><strong className="text-strong">HubSpot</strong> (<code>hubspotutk</code>, <code>__hstc</code>, <code>__hssc</code>, <code>__hssrc</code>): set only after you accept analytics cookies; recognise returning visitors and link contact form submissions to visits.</li>
            </ul>
            <p className="text-body leading-[1.6] mt-3">
              Firon Marketing LLC, the agency that works on our website performance, has access to our Google Tag Manager and Google Analytics accounts and sets no cookies of its own. This list is updated when we add or remove a service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">5. Managing your cookie preferences</h2>
            <p className="text-body leading-[1.6]">
              When you visit our website, you are given the option to accept or decline non-essential cookies. You can also manage or delete cookies through your browser settings at any time. Please note that disabling essential cookies may affect the functionality of the website.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">6. Data protection and international access</h2>
            <p className="text-body leading-[1.6]">
              Cookie data is processed by Google Ireland Limited and HubSpot Ireland Limited (EU data centre in Germany). Where processing occurs outside the EU, it relies on Standard Contractual Clauses. For more information on how we handle personal data, please see our{" "}
              <Link href="/privacy" className="text-link hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">7. Updates to this Cookie Policy</h2>
            <p className="text-body leading-[1.6]">
              We may update this Cookie Policy from time to time to reflect changes in technology, legal requirements or how we operate our website. The latest version will always be available on this page or upon request if a later version exists but has not been published yet.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">8. Contact</h2>
            <p className="text-body leading-[1.6]">
              If you have any questions about our use of cookies, you can contact us at{" "}
              <a href="mailto:info@trueaim.ai" className="text-link hover:underline font-medium">
                info@trueaim.ai
              </a>.
            </p>
            <p className="text-body leading-[1.6] mt-2">
              Company: True Aim AG<br />
              Registered office: Zug, Switzerland
            </p>
          </section>

          <div className="pt-4">
            <ButtonLink href="/contact" variant="primary" size="md">
              Contact Us
            </ButtonLink>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}
