import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHero, SECTION } from "@/components/content";

const PUBLISH_DATE = "2026-05-21";
const LAST_UPDATED = "2026-11-26";

type TocItem = { id: string; label: string };

const TOC: TocItem[] = [
  { id: "roles", label: "1. Roles" },
  { id: "categories", label: "2. Categories of personal data we process" },
  { id: "lawful-bases", label: "3. Lawful bases for processing" },
  { id: "use", label: "4. How we use personal data" },
  { id: "sub-processors", label: "5. Sub-processors and disclosures" },
  { id: "transfers", label: "6. International transfers" },
  { id: "security", label: "7. Security" },
  { id: "retention", label: "8. Retention" },
  { id: "rights", label: "9. Your rights" },
  { id: "automated", label: "10. Automated decision-making" },
  { id: "changes", label: "11. Changes to this policy" },
  { id: "contact", label: "12. Contact" },
];

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <PageHero compact title="Privacy Policy" texture={{ name: "circ", position: "72% 18%" }}>
        <p className="mt-6 text-sm text-muted">
          <strong className="text-strong">Effective date:</strong> {PUBLISH_DATE} &nbsp;|&nbsp; <strong className="text-strong">Last updated:</strong> {LAST_UPDATED}
        </p>
        <p className="mt-2 text-sm text-muted">
          Previous versions:{" "}
          <Link href="/privacy-legacy" className="text-link hover:underline">
            v1 (Feb 2026)
          </Link>
        </p>
      </PageHero>
      <section className={SECTION}>
        <div className="mx-auto max-w-[1232px] [&>*]:max-w-3xl [&>div>section:first-child>h2]:mt-0">

          <div className="mb-8">
            <h2 className="font-display text-lg font-semibold text-strong mb-4">Contents</h2>
            <ol className="space-y-1 list-none pl-0">
              {TOC.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-link hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className="text-body leading-[1.6]">
              True Aim AG (&ldquo;True Aim&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) provides a multi-tenant claims-processing platform (&ldquo;Service&rdquo;). This Privacy Policy describes how we collect, use, disclose, and protect personal data when our customers (&ldquo;Tenants&rdquo;) and their end users (collectively, &ldquo;you&rdquo;) interact with our Service or with this website.
            </p>

            <section id="roles" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">1. Roles</h2>
              <p className="text-body leading-[1.6]">
                For personal data submitted by a Tenant about its end users in connection with the Service, the Tenant is the data controller and True Aim acts as a data processor under a data processing agreement. For personal data we collect directly, including account information of Tenant administrators and marketing-site visitor data, True Aim acts as a data controller.
              </p>
            </section>

            <section id="categories" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">2. Categories of personal data we process</h2>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2">
                <li><strong className="text-strong">Account data:</strong> name, email, organisation, role, authentication metadata.</li>
                <li><strong className="text-strong">Claims data submitted by Tenants:</strong> claim narratives, claimant identifiers, dates of loss, policy numbers, uploaded documents.</li>
                <li><strong className="text-strong">Derived data:</strong> structured data extracted from uploaded documents by our document intelligence and language model components.</li>
                <li><strong className="text-strong">Usage and telemetry:</strong> application logs, audit trail entries, request metadata, operational metrics.</li>
                <li><strong className="text-strong">Website data:</strong> IP address, browser metadata and pages visited, collected through standard server logs. Only after you accept analytics cookies, Google Tag Manager and Google Analytics 4 also collect this data. Only after you accept HubSpot tracking, the HubSpot tracker recognises your browser on later visits and links your visits to a demo request you send. Our <Link href="/cookies" className="text-link hover:underline">Cookie Policy</Link> lists each cookie and its lifetime.</li>
                <li><strong className="text-strong">Contact form data:</strong> the details you enter in the form, together with attribution fields the website records with your submission: the page you first landed on, the referring site and campaign parameters (UTM), and your answer to &ldquo;how did you hear about us&rdquo; if you give one. This data is sent to HubSpot, our CRM, and a copy is written to a spreadsheet in our Google Workspace, which notifies our team by email (see section 5). First name, last name, work email, company, job title, country and area of interest are required: we need them to know who is asking, for which company and market, and which product to show you. Without them we cannot answer your request. How you heard about us, your claims volume and your message are optional.</li>
              </ul>
            </section>

            <section id="lawful-bases" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">3. Lawful bases for processing (GDPR / Swiss FADP)</h2>
              <p className="text-body leading-[1.6]">
                This table links each purpose to the data we use and to its legal basis under the GDPR. Where the Swiss FADP requires a justification, we rely on the same ground.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left text-sm leading-[1.5] text-body">
                  <thead>
                    <tr className="border-b border-line-strong"><th scope="col" className="py-3 pr-4 font-semibold text-strong">Purpose</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">Data</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">Legal basis</th><th scope="col" className="py-3 pr-4 font-semibold text-strong">Our legitimate interest</th></tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Answer your demo or contact request</th><td className="py-3 pr-4">Contact form data</td><td className="py-3 pr-4">Steps taken at your request before a contract (art. 6(1)(b))</td><td className="py-3 pr-4">None needed</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Record how you found us</th><td className="py-3 pr-4">Attribution fields: landing page, referring site, UTM parameters, how you heard about us</td><td className="py-3 pr-4">Legitimate interest (art. 6(1)(f))</td><td className="py-3 pr-4">Knowing which channels bring requests, so that we spend our marketing budget well</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Follow up with you as a business prospect</th><td className="py-3 pr-4">Contact form data in our CRM</td><td className="py-3 pr-4">Legitimate interest (art. 6(1)(f))</td><td className="py-3 pr-4">Selling our Service to insurers and their staff. You can object at any time.</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Run and secure this website</th><td className="py-3 pr-4">Website data from server logs</td><td className="py-3 pr-4">Legitimate interest (art. 6(1)(f))</td><td className="py-3 pr-4">Keeping the website available and secure</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Website statistics</th><td className="py-3 pr-4">Google Analytics 4 data</td><td className="py-3 pr-4">Your consent (art. 6(1)(a))</td><td className="py-3 pr-4">None needed</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Link your visits to your demo request</th><td className="py-3 pr-4">HubSpot tracking data</td><td className="py-3 pr-4">Your consent (art. 6(1)(a))</td><td className="py-3 pr-4">None needed</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Keep a record of your cookie choice</th><td className="py-3 pr-4">Your consent choice</td><td className="py-3 pr-4">Legal obligation to show consent (art. 6(1)(c) and art. 7(1))</td><td className="py-3 pr-4">None needed</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Provide the Service to Tenants</th><td className="py-3 pr-4">Claims data and derived data</td><td className="py-3 pr-4">We process this data for the Tenant, on its instructions and under the Data Processing Agreement. The Tenant sets the legal basis.</td><td className="py-3 pr-4">Not applicable</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Manage Tenant user accounts and access</th><td className="py-3 pr-4">Account data</td><td className="py-3 pr-4">Legitimate interest (art. 6(1)(f))</td><td className="py-3 pr-4">Providing the Service that your organisation ordered</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Detect and prevent security incidents</th><td className="py-3 pr-4">Usage and telemetry data, audit trail</td><td className="py-3 pr-4">Legitimate interest (art. 6(1)(f))</td><td className="py-3 pr-4">Protecting the Service and Tenant data</td></tr>
                    <tr className="border-b border-line align-top"><th scope="row" className="py-3 pr-4 font-medium text-strong">Meet our legal obligations, such as bookkeeping</th><td className="py-3 pr-4">The data the law requires</td><td className="py-3 pr-4">Legal obligation (art. 6(1)(c))</td><td className="py-3 pr-4">None needed</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="use" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">4. How we use personal data</h2>
              <p className="text-body leading-[1.6]">
                To provide and operate the Service; authenticate users; detect, investigate, and prevent security incidents; comply with legal obligations; and improve the Service in aggregated, non-identifying form. We do not sell personal data and we do not use Tenant data to train foundation models.
              </p>
            </section>

            <section id="sub-processors" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">5. Sub-processors and disclosures</h2>
              <p className="text-body leading-[1.6]">
                We host the Service on Microsoft Azure in Switzerland North. The operative list of our active sub-processors, including the service each provides, the categories of personal data affected and the processing location, is published as Schedule 2 to our customer Data Processing Agreement, which is available on request.
              </p>
              <p className="text-body leading-[1.6] mt-3">
                Tools used internally (source control, CI/CD, CRM) that do not process Tenant production data are not customer sub-processors and are not listed in it. We do not disclose personal data to other third parties except as required by law or with explicit Tenant instruction.
              </p>
              <p className="text-body leading-[1.6] mt-3">
                This website uses the following services. None of them receives Tenant or claims data through this website.
              </p>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2 mt-3">
                <li><strong className="text-strong">Google Tag Manager and Google Analytics 4</strong> (Google Ireland Limited): loaded only after you accept analytics cookies; measure page views and interactions; GA4 does not log or store IP addresses; no personal data is placed in the data layer.</li>
                <li><strong className="text-strong">HubSpot</strong> (HubSpot Ireland Limited, hosted in HubSpot&rsquo;s EU data centre in Germany): receives contact form submissions, including the attribution fields listed in section 2. Only after you accept HubSpot tracking, it also records your visits to this website and links them to your submission. HubSpot tracking has its own choice in the cookie banner, separate from analytics.</li>
                <li><strong className="text-strong">Google Workspace</strong> (Google Ireland Limited): a spreadsheet in our Google Workspace receives a copy of each contact form submission and sends an email notification to our team.</li>
                <li><strong className="text-strong">Firon Marketing LLC</strong> (United States): the agency that works on our website performance, with access to Google Tag Manager, Google Analytics and Google Search Console; it has no access to customer or Tenant data.</li>
              </ul>
            </section>

            <section id="transfers" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">6. International transfers</h2>
              <p className="text-body leading-[1.6]">
                Personal data processed in the Service is stored in Switzerland. Contact form data is stored in the European Union, in HubSpot&rsquo;s EU data centre and in our Google Workspace. Firon Marketing LLC, our website agency, is based in the United States and has access to Google Tag Manager and Google Analytics. Where processing occurs outside Switzerland, the EU or the EEA, including transfers to the United States, we rely on the EU-U.S. and Swiss-U.S. Data Privacy Frameworks or on Standard Contractual Clauses. Our sub-processor list states the location and transfer basis for each provider.
              </p>
            </section>

            <section id="security" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">7. Security</h2>
              <p className="text-body leading-[1.6]">
                We protect personal data using administrative, technical, and physical controls including encryption in transit and at rest, network segregation, least-privilege access, multi-factor authentication, and continuous monitoring. Our security posture is described in further detail at{" "}
                <Link href="/security" className="text-link hover:underline">
                  trueaim.ai/security
                </Link>
                .
              </p>
            </section>

            <section id="retention" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">8. Retention</h2>
              <p className="text-body leading-[1.6]">
                We keep personal data only as long as we need it for the purposes in section 3, or as long as the law requires. These periods apply:
              </p>
              <ul className="list-disc pl-6 marker:text-accent text-body leading-[1.6] space-y-2 mt-3">
                <li><strong className="text-strong">Contact form data and prospect records:</strong> in HubSpot and in our Google Workspace: kept while the business contact is active, and deleted when we no longer need it.</li>
                <li><strong className="text-strong">Google Analytics 4:</strong> event data 2 months, user data 14 months.</li>
                <li><strong className="text-strong">Website server logs:</strong> we keep no server logs of our own. Microsoft Azure, our host, processes access data to deliver the website and keeps it under its own rules.</li>
                <li><strong className="text-strong">Cookies and your consent choice:</strong> as listed in our <Link href="/cookies" className="text-link hover:underline">Cookie Policy</Link>.</li>
                <li><strong className="text-strong">Tenant data in the Service:</strong> deleted or returned up to 90 days after the Tenant&rsquo;s contract ends. Claim documents: 7 years after claim closure, or at contract end if earlier. Personal data in the audit trail: deleted or anonymised at contract end at the latest. The process record without personal data: 7 years, as set in the client agreement.</li>
                <li><strong className="text-strong">Account data:</strong> user invitations 30 days after acceptance or expiry; user and membership records 90 days after deletion.</li>
                <li><strong className="text-strong">Security logs of the Service:</strong> 365 days. Entries that identify Tenant users: 365 days, or contract end if earlier.</li>
                <li><strong className="text-strong">Accounting records:</strong> 10 years, as Swiss law requires (art. 958f CO).</li>
              </ul>
              <p className="text-body leading-[1.6] mt-3">
                The Data Processing Agreement with each Tenant sets the binding periods for Tenant data.
              </p>
            </section>

            <section id="rights" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">9. Your rights</h2>
              <p className="text-body leading-[1.6]">
                Subject to applicable law (including GDPR and Swiss FADP), you have rights of access, rectification, erasure, restriction, portability, and objection. If you are an end user of a Tenant, please contact the Tenant first; we will support the Tenant in fulfilling your request. To contact us directly, email{" "}
                <a href="mailto:privacy@trueaim.ai" className="text-link hover:underline">privacy@trueaim.ai</a>. You also have the right to lodge a complaint with a supervisory authority. In Switzerland, the Federal Data Protection and Information Commissioner (FDPIC); in the EU, your local data protection authority.
              </p>
              <p className="text-body leading-[1.6] mt-3">
                You can object at any time to processing based on our legitimate interest. Where we rely on your consent (analytics cookies and HubSpot tracking), you can withdraw it at any time, as easily as you gave it: open &ldquo;Cookie Preferences&rdquo; in the footer of any page. Withdrawal does not affect processing that took place before it.
              </p>
            </section>

            <section id="automated" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">10. Automated decision-making</h2>
              <p className="text-body leading-[1.6]">
                The Service supports human-in-the-loop claims processing. Outputs of our document intelligence and language models are recommendations to Tenant operators; final decisions are made by the Tenant&rsquo;s authorised personnel. No solely-automated decisions producing legal or similarly significant effects are taken by True Aim against end users.
              </p>
            </section>

            <section id="changes" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">11. Changes to this policy</h2>
              <p className="text-body leading-[1.6]">
                We will update this policy as our practices evolve. The &ldquo;Last updated&rdquo; date at the top of this page reflects the most recent revision. Material changes will be communicated to active Tenants.
              </p>
            </section>

            <section id="contact" className="scroll-mt-24">
              <h2 className="font-display text-[28px] font-bold text-strong mt-14 mb-4">12. Contact</h2>
              <p className="text-body leading-[1.6]">
                True Aim AG, c/o Yarowa AG, Metallstrasse 9, 6300 Zug, Switzerland.<br />
                Email:{" "}
                <a href="mailto:privacy@trueaim.ai" className="text-link hover:underline">privacy@trueaim.ai</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
