import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { ArrowLeft, ArrowRight, Clock, User } from "lucide-react";
import { FaqBlock, TextureBackdrop } from "@/components/content";
import { ClaimScene, type ClaimSceneData } from "@/components/products";
import { faqs } from "./faqs";

const ease = [0.4, 0, 0.2, 1] as const;

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease } as const,
};

// Short labels for the "On this page" panel; the H2s carry the full headings.
const sections: { id: string; heading: string }[] = [
  { id: "what-the-record-contains", heading: "What the record contains" },
  { id: "which-rules-applied", heading: "Which rules applied" },
  { id: "reopened-or-changed", heading: "When a claim is reopened" },
  { id: "kept-and-exported", heading: "How long it is kept" },
  { id: "prove", heading: "How Prove shows the record" },
  { id: "supervisors", heading: "What supervisors expect" },
  { id: "example", heading: "An example" },
  { id: "what-it-does-not-do", heading: "What the record does not do" },
  { id: "faq", heading: "Frequently asked questions" },
];

const recordHolds: string[] = [
  "The documents received, and the data extracted from each one, with a link from each value back to its page in the source document.",
  "The policy wording and the clauses applied.",
  "The price list or benchmark used.",
  "The calculation for each line and the result of each check.",
  "The claims handler's decision and its reasons.",
];

const h2 = "font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24";
const h3 = "font-display text-xl font-semibold text-strong mt-8 mb-3";
const p = "text-body leading-[1.6] mb-5";
const inlineLink = "text-link underline hover:text-accent";

const FINMA_URL = "https://www.finma.ch/en/news/2024/12/20241218-mm-finma-am-08-24/";
const EIOPA_URL = "https://www.eiopa.europa.eu/publications/opinion-artificial-intelligence-governance-and-risk-management_en";
const NAIC_URL = "https://content.naic.org/sites/default/files/2023-12-4%20Model%20Bulletin_Adopted_0.pdf";

export default async function CompleteClaimsRecordBlogPost({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  // The claim drawing from the top of the Automated Coverage Check page, shown as an illustration.
  const productPages = await getTranslations({ locale: "en", namespace: "productPages" });
  const claimDrawing = productPages.raw("claimsDecisioning.hero.scene") as ClaimSceneData;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden lg:flex lg:min-h-[560px] lg:items-center border-b border-hairline bg-page-tint">
        <TextureBackdrop texture={{ name: "circ", position: "88% 78%" }} />

        <div className="relative w-full max-w-5xl mx-auto px-6 pt-20 md:pt-28 pb-16">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {/* Breadcrumb */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
              All Articles
            </Link>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-6 leading-tight">
              What a complete claims record contains
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <User aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
                <span>
                  By{" "}
                  <Link href="/authors/frederic-brunner" rel="author" className="text-body underline hover:text-accent">
                    Frédéric Brunner
                  </Link>
                  , Co-founder and CTO, True Aim
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
                6 min read
              </div>
              <Link href="/authors/frederic-brunner" className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline">
                About the author
                <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-12">
            {/* Main Content */}
            <article className="min-w-0 max-w-3xl space-y-12">
              {/* Introduction */}
              <MotionDiv {...fadeIn}>
                <div className="border-l-2 border-ta-blue pl-6 mb-8">
                  <p className="text-body-lg text-strong">
                    A claims decision can be questioned long after the file is closed: by an internal auditor, by a
                    supervisor or by an ombudsman working through a complaint. The question is rarely whether the
                    outcome was right. It is whether anyone can show how it was reached.
                  </p>
                </div>

                <p className={p}>
                  That depends on the record. A complete claims record lets a reviewer follow the decision from the
                  documents that arrived to the person who signed it off, without asking anyone to remember. This
                  article sets out what that record contains, how it handles change and what supervisors in
                  Switzerland, Europe and the US expect to see.
                </p>
              </MotionDiv>

              {/* What the record contains */}
              <MotionDiv {...fadeIn}>
                <h2 id="what-the-record-contains" className={h2}>
                  What the record contains
                </h2>

                <p className={p}>For a claim handled with True Aim, the record holds five things:</p>

                <ul className="space-y-3 text-body leading-[1.6] mb-5">
                  {recordHolds.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span aria-hidden="true" className="text-accent mt-1">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className={p}>
                  The link from each value to its source page matters most to a reviewer. An amount in the decision can
                  be traced to the line on the invoice it came from, so a disputed figure is checked against the
                  original rather than argued about.
                </p>

                <p className="text-body leading-[1.6]">
                  Each decision names the person who made it. Where a handler overrides what the checks suggested, they
                  can record a reason for the override, and that reason stays in the record beside the decision:
                  approve, partly cover, refer or deny.
                </p>
              </MotionDiv>

              {/* Which rules applied */}
              <MotionDiv {...fadeIn}>
                <h2 id="which-rules-applied" className={h2}>
                  Which rules applied
                </h2>

                <p className="text-body leading-[1.6]">
                  Rules change over time, and a decision has to be read against the rules in force when it was made.
                  The record shows the rule version that applied, so a reviewer looking at a claim from last year sees
                  the rules the handler was working with then, not the ones in use today.
                </p>
              </MotionDiv>

              {/* Reopened or changed */}
              <MotionDiv {...fadeIn}>
                <h2 id="reopened-or-changed" className={h2}>
                  When a claim is reopened or changed
                </h2>

                <p className={p}>
                  Claims are reopened: new evidence arrives, a customer disputes the amount or a reviewer finds an
                  error. A record that only shows the latest decision leaves a reviewer unable to tell what changed.
                </p>

                <p className="text-body leading-[1.6]">
                  That is why a reopen needs a reason, and the earlier decision is kept. Every change is kept, with who
                  made it and when. A reviewer can read the claim as it stood before the reopen and as it stands now,
                  and see the reason that connects them.
                </p>
              </MotionDiv>

              {/* Kept and exported */}
              <MotionDiv {...fadeIn}>
                <h2 id="kept-and-exported" className={h2}>
                  How long the record is kept and how it leaves
                </h2>

                <p className="text-body leading-[1.6]">
                  Retention periods differ by insurer, by line and by country. The record is kept for the period agreed
                  with the insurer. When an auditor, a supervisor or an ombudsman asks for a claim, the insurer can
                  export a PDF of the claim review.
                </p>
              </MotionDiv>

              {/* Prove */}
              <MotionDiv {...fadeIn}>
                <h2 id="prove" className={h2}>
                  How Prove shows the record
                </h2>

                <p className={p}>
                  <Link href="/platform" className={inlineLink}>
                    Prove
                  </Link>{" "}
                  presents each claim in two views. The timeline shows the claim as a sequence of actions, in the order
                  they happened. The forensic view groups the same actions by who acted, so a reviewer can see
                  everything one handler, one reviewer or one rule did on the claim.
                </p>

                <figure className="mb-5">
                  <ClaimScene data={claimDrawing} />
                  <figcaption className="mt-3 text-sm text-muted">Illustration</figcaption>
                </figure>

                <p className="text-body leading-[1.6]">
                  The two views answer the two questions reviewers ask most: what happened, and who did it. For a fuller
                  checklist of what to look for in an auditable AI system, see our{" "}
                  <Link href="/blog/ai-claims-auditability-scorecard" className={inlineLink}>
                    AI claims auditability scorecard
                  </Link>
                  .
                </p>
              </MotionDiv>

              {/* Supervisors */}
              <MotionDiv {...fadeIn}>
                <h2 id="supervisors" className={h2}>
                  What supervisors expect
                </h2>

                <p className={p}>
                  None of the three publications below prescribes the format of a claims record. Each one sets out what
                  an insurer using AI should be able to show, and a complete record is how a claims team shows it.
                </p>

                <h3 className={h3}>Switzerland</h3>

                <p className={p}>
                  FINMA Guidance 08/2024, FINMA guidance on governance and risk management when using artificial
                  intelligence, sets out supervisory observations for supervised institutions that use AI. Its
                  observations cover documentation, explainability and independent review of AI applications (Source:{" "}
                  <a href={FINMA_URL} className={inlineLink} rel="noopener noreferrer" target="_blank">
                    FINMA, Guidance 08/2024, FINMA guidance on governance and risk management when using artificial
                    intelligence, 18 December 2024
                  </a>
                  ).
                </p>

                <h3 className={h3}>Europe</h3>

                <p className={p}>
                  EIOPA&apos;s Opinion on AI governance and risk management is addressed to national supervisors. It
                  sets high-level supervisory expectations for insurers&apos; governance and risk management of AI
                  systems, across insurance uses of AI. It does not create new requirements; it explains how existing
                  insurance legislation applies (Source:{" "}
                  <a href={EIOPA_URL} className={inlineLink} rel="noopener noreferrer" target="_blank">
                    EIOPA, Opinion on AI governance and risk management, EIOPA-BoS-25-360, 6 August 2025
                  </a>
                  ).
                </p>

                <h3 className={h3}>United States</h3>

                <p className="text-body leading-[1.6]">
                  The NAIC Model Bulletin of 4 December 2023 is a model bulletin, which applies once a state adopts its
                  own version. It reminds insurers that decisions affecting consumers that are made or supported by AI
                  systems must comply with existing insurance law, and sets out the kind of information and
                  documentation a state insurance department may request (Source:{" "}
                  <a href={NAIC_URL} className={inlineLink} rel="noopener noreferrer" target="_blank">
                    NAIC, Model Bulletin on the Use of Artificial Intelligence Systems by Insurers, 4 December 2023
                  </a>
                  ).
                </p>
              </MotionDiv>

              {/* Example */}
              <MotionDiv {...fadeIn}>
                <h2 id="example" className={h2}>
                  An example
                </h2>

                <p className={p}>
                  <em>This example is invented to show how the record is used. It does not describe a real claim.</em>
                </p>

                <p className={p}>
                  A household claim for water damage is partly covered, because the policy wording limits cover for one
                  item. Eight months later the customer complains to the ombudsman. The insurer&apos;s complaints team
                  opens the record: the invoice line in question, the clause applied, the rule version in force at the
                  time, the calculation and the handler&apos;s decision with its reason. The ombudsman receives a PDF of
                  the claim review the same day. Nobody has to reconstruct what happened from email.
                </p>

                <blockquote className="border-l-2 border-ta-blue pl-6">
                  <p className="text-body-lg text-strong">
                    &ldquo;A claims decision is only as good as your ability to explain it years later. A complete
                    record turns an audit from an investigation into a lookup,&rdquo; says Frédéric Brunner, Co-founder
                    and CTO of True Aim.
                  </p>
                </blockquote>
              </MotionDiv>

              {/* What it does not do */}
              <MotionDiv {...fadeIn}>
                <h2 id="what-it-does-not-do" className={h2}>
                  What the record does not do
                </h2>

                <p className={p}>
                  The record does not decide anything, and it does not make an insurer compliant. It gives the claims
                  team and its reviewers the evidence. Whether a decision meets the rules that apply to the insurer is
                  for the insurer to judge, with the record in front of them.
                </p>

                <p className="text-body leading-[1.6]">
                  The record also sits inside True Aim&apos;s own security controls. True Aim is certified to ISO/IEC
                  27001:2022 and holds a SOC 2 Type II report (Security), available under NDA. Details are in the{" "}
                  <Link href="/trust" className={inlineLink}>
                    Trust Centre
                  </Link>
                  .
                </p>
              </MotionDiv>

              {/* Close */}
              <MotionDiv {...fadeIn}>
                <h2 id="decided-in-minutes" className={h2}>
                  Decided in minutes. Defended for years.
                </h2>

                <p className={p}>
                  A decision that can be read back, line by line, frees the compliance team to test the rules rather
                  than chase the files. For the order in which most insurers automate, see{" "}
                  <Link href="/blog/insurance-claims-automation" className={inlineLink}>
                    insurance claims automation: what to automate first and how to measure it
                  </Link>
                  .
                </p>

                <div className="bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm font-medium text-accent">
                    If an auditor asked tomorrow for one claim your team decided last year, how long would it take to
                    show them how the decision was reached?
                  </p>
                </div>
              </MotionDiv>

              {/* FAQ */}
              <MotionDiv {...fadeIn}>
                <h2 id="faq" className={h2}>
                  Frequently asked questions
                </h2>

                <FaqBlock faqs={faqs} />
              </MotionDiv>

              {/* Sources */}
              <MotionDiv {...fadeIn}>
                <h2 id="sources" className={h2}>
                  Sources
                </h2>

                <ul className="space-y-3 text-sm text-body leading-[1.6]">
                  <li>
                    FINMA, Guidance 08/2024, FINMA guidance on governance and risk management when using artificial
                    intelligence, 18 December 2024:{" "}
                    <a href={FINMA_URL} className={inlineLink} rel="noopener noreferrer" target="_blank">
                      finma.ch
                    </a>
                  </li>
                  <li>
                    EIOPA, Opinion on AI governance and risk management, EIOPA-BoS-25-360, 6 August 2025:{" "}
                    <a href={EIOPA_URL} className={inlineLink} rel="noopener noreferrer" target="_blank">
                      eiopa.europa.eu
                    </a>
                  </li>
                  <li>
                    NAIC, Model Bulletin on the Use of Artificial Intelligence Systems by Insurers, 4 December 2023:{" "}
                    <a href={NAIC_URL} className={inlineLink} rel="noopener noreferrer" target="_blank">
                      naic.org
                    </a>
                  </li>
                  <li>True Aim record contents, Prove and certifications: Frédéric Brunner, article inputs, 12 November 2026</li>
                </ul>
              </MotionDiv>
            </article>

            {/* Sidebar */}
            <aside aria-label="Article navigation">
              <MotionDiv
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="bg-card shadow-card rounded-pill p-8"
              >
                <h2 className="font-display font-semibold text-strong mb-4">On this page</h2>
                <nav aria-label="On this page">
                  <ol role="list" className="space-y-2.5 list-none p-0">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="block text-sm leading-snug text-body hover:text-accent transition-colors"
                        >
                          {section.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </MotionDiv>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
