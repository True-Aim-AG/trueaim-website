import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero, SECTION } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Cookie Policy" texture={{ name: "circ", position: "88% 78%" }}>
        <p className="mt-6 text-sm text-muted">Last updated: 24 November 2026</p>
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
              We use three categories of cookies and similar technologies.
            </p>
            <p className="text-body leading-[1.6] mt-3">
              <strong className="text-strong">Essential</strong> covers only the record of your cookie choice. It is always active, because we need it to respect your choice.
            </p>
            <p className="text-body leading-[1.6] mt-3">
              <strong className="text-strong">Analytics</strong> covers Google Analytics 4, loaded through Google Tag Manager. It shows us how visitors use the website, such as which pages are visited most often. We see these statistics in aggregated form, and we use them to improve the website.
            </p>
            <p className="text-body leading-[1.6] mt-3">
              <strong className="text-strong">HubSpot tracking</strong> covers the HubSpot tracker. It recognises your browser when you come back, records your visits and links them to a demo request you send, so that the visits appear on your contact record in our CRM. Once you send a request, this data relates to you as a person, so HubSpot tracking has its own choice in the cookie banner.
            </p>
            <p className="text-body leading-[1.6] mt-3">
              We set no advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">4. Cookies used on this website</h2>
            <p className="text-body leading-[1.6]">
              No cookie is set before you make a choice in the cookie banner. The lifetime is the period after which the item expires. Your browser can delete it sooner.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm leading-[1.5] text-body">
                <thead>
                  <tr className="border-b border-line-strong"><th scope="col" className="py-3 pr-4 font-semibold text-strong">Name</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">Set by</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">Category</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">What it does</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">Lifetime</th></tr>
                </thead>
                <tbody>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>cookie-consent</code> (local storage, not a cookie)</th><td className="py-3 pr-4">True Aim</td><td className="py-3 pr-4">Essential</td><td className="py-3 pr-4">Stores your choice for each category</td><td className="py-3 pr-4">6 months, then the banner asks again</td></tr>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>ta-first-touch</code> (local storage, not a cookie)</th><td className="py-3 pr-4">True Aim</td><td className="py-3 pr-4">Analytics</td><td className="py-3 pr-4">Stores the page you first landed on, the referring site and campaign parameters, sent with a demo request</td><td className="py-3 pr-4">90 days</td></tr>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>_ga</code>, <code>_ga_*</code></th><td className="py-3 pr-4">Google Analytics 4, through Google Tag Manager</td><td className="py-3 pr-4">Analytics</td><td className="py-3 pr-4">Measure page views and interactions</td><td className="py-3 pr-4">400 days</td></tr>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>hubspotutk</code>, <code>__hstc</code></th><td className="py-3 pr-4">HubSpot</td><td className="py-3 pr-4">HubSpot tracking</td><td className="py-3 pr-4">Recognise returning visitors and link contact form submissions to visits</td><td className="py-3 pr-4">180 days</td></tr>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>__hssc</code></th><td className="py-3 pr-4">HubSpot</td><td className="py-3 pr-4">HubSpot tracking</td><td className="py-3 pr-4">Counts the pages of one visit</td><td className="py-3 pr-4">30 minutes</td></tr>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>__hssrc</code></th><td className="py-3 pr-4">HubSpot</td><td className="py-3 pr-4">HubSpot tracking</td><td className="py-3 pr-4">Detects a new browser session</td><td className="py-3 pr-4">Until you close the browser</td></tr>
                  <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong"><code>__cf_bm</code></th><td className="py-3 pr-4">HubSpot (on HubSpot&rsquo;s own domains)</td><td className="py-3 pr-4">HubSpot tracking</td><td className="py-3 pr-4">Protects HubSpot&rsquo;s services against bots</td><td className="py-3 pr-4">30 minutes</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-body leading-[1.6] mt-3">
              Firon Marketing LLC, the agency that works on our website performance, has access to our Google Tag Manager and Google Analytics accounts and sets no cookies of its own. This list is updated when we add or remove a service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">5. Managing your cookie preferences</h2>
            <p className="text-body leading-[1.6]">
              When you first visit, the cookie banner asks for your choice. &ldquo;Accept All&rdquo; allows analytics and HubSpot tracking, &ldquo;Decline&rdquo; allows neither, and &ldquo;Manage Preferences&rdquo; lets you choose each category on its own.
            </p>
            <p className="text-body leading-[1.6] mt-3">
              You can change or withdraw your choice at any time with &ldquo;Cookie Preferences&rdquo; in the footer of every page. When you withdraw a category, we delete its cookies. We keep your choice for 6 months; after that, the banner asks again. You can also delete cookies in your browser settings.
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
