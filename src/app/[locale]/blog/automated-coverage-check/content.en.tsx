import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { ArrowLeft, ArrowRight, Clock, User } from "lucide-react";
import { ComparisonTable, FaqBlock, TextureBackdrop, type ComparisonRow } from "@/components/content";
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
  { id: "what-happens", heading: "What happens in a coverage check" },
  { id: "wording-to-rules", heading: "Turning wording into rules" },
  { id: "how-long", heading: "How long it takes" },
  { id: "what-the-adjuster-sees", heading: "What the adjuster sees" },
  { id: "referrals", heading: "Which claims go to a person" },
  { id: "multi-part", heading: "Multi-part claims" },
  { id: "what-it-does-not-do", heading: "What it does not do" },
  { id: "faq", heading: "Frequently asked questions" },
];

const steps: string[] = [
  "The claim documents are read and the facts are extracted, line by line.",
  "Fixed rules in code apply the clauses that need no judgement.",
  "A language model tests each remaining line against the wording and cites the clause it used.",
  "Code calculates the amount owed, with the deductible, VAT and caps.",
  "Code decides which claims go to a person. On every claim, the adjuster reviews the result and finalises it.",
];

const whoDoesWhat: ComparisonRow[] = [
  { label: "Reading the documents and extracting the facts", cells: ["AI"] },
  { label: "Clauses that need no judgement", cells: ["Fixed rules in code"] },
  { label: "Remaining lines tested against the wording, with the clause cited", cells: ["Language model"] },
  { label: "Amount owed, with deductible, VAT and caps", cells: ["Code"] },
  { label: "Which claims go to a person", cells: ["Code"] },
  { label: "The decision on the claim", cells: ["The adjuster"] },
];

const referralReasons: string[] = [
  "the documents are ambiguous",
  "a clause cannot be resolved",
  "the damaged part cannot be identified",
  "the case is unusual",
  "the amount in doubt passes a threshold agreed with the insurer.",
];

const h2 = "font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24";
const p = "text-body leading-[1.6] mb-5";
const inlineLink = "text-link underline hover:text-accent";

export default async function AutomatedCoverageCheckBlogPost({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

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
              How an automated coverage check is completed in minutes
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
                5 min read
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
                <div className="border-l-2 border-ta-blue pl-6">
                  <p className="text-body-lg text-strong">
                    An automated coverage check tests each line of a claim against the policy wording and calculates
                    what is owed. True Aim&apos;s Automated Coverage Check does this in minutes for P&amp;C and
                    short-term insurers. Fixed rules apply the clear clauses, a language model tests the rest and cites
                    its clause, and the adjuster decides.
                  </p>
                </div>
              </MotionDiv>

              {/* What happens */}
              <MotionDiv {...fadeIn}>
                <h2 id="what-happens" className={h2}>
                  What happens in an automated coverage check?
                </h2>

                <p className={p}>
                  True Aim&apos;s{" "}
                  <Link href="/platform/automated-coverage-check" className={inlineLink}>
                    Automated Coverage Check
                  </Link>{" "}
                  runs the same five steps on every claim.
                </p>

                <ol className="list-decimal pl-6 space-y-3 text-body leading-[1.6] mb-8">
                  {steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>

                <div className="bg-card shadow-card rounded-pill p-6 md:p-8 mb-8">
                  <ComparisonTable caption="Who does each step in an automated coverage check" columns={["Step", "Done by"]} rows={whoDoesWhat} />
                </div>

                <blockquote className="border-l-2 border-ta-blue pl-6 mb-5">
                  <p className="text-body-lg text-strong">
                    &ldquo;A model can help read the wording, but the amount owed must come from a calculation that
                    anyone can repeat,&rdquo; says Frédéric Brunner, Co-founder and CTO of True Aim.
                  </p>
                </blockquote>

                <p className="text-body leading-[1.6]">
                  The same principle runs through True Aim&apos;s blog post on{" "}
                  <Link href="/blog/where-the-language-model-does-not-belong" className={inlineLink}>
                    where the language model does not belong
                  </Link>
                  .
                </p>
              </MotionDiv>

              {/* Wording to rules */}
              <MotionDiv {...fadeIn}>
                <h2 id="wording-to-rules" className={h2}>
                  How is a policy wording turned into rules?
                </h2>

                <p className={p}>
                  True Aim works through the policy wording clause by clause with the insurer&apos;s claims lead. The
                  clauses that need no judgement become fixed rules, and the result is versioned. A new version of the
                  wording means a new version of the rules.
                </p>

                <p className="text-body leading-[1.6]">
                  This is set-up work, done before the first claim is checked. The claims lead&apos;s knowledge of the
                  wording is what the check then applies the same way to every claim.
                </p>
              </MotionDiv>

              {/* How long */}
              <MotionDiv {...fadeIn}>
                <h2 id="how-long" className={h2}>
                  How long does an automated coverage check take?
                </h2>

                <p className={p}>
                  At NSA Services SA, a warranty provider, coverage analysis and policy checking fell from 6 minutes to 2
                  on a simple claim and from 27 minutes to 4 on a complex one. Total handling time per claim fell from 29
                  minutes to 5 on simple claims and from 63 minutes to 9 on complex ones (Source:{" "}
                  <Link href="/case-studies/vehicle-warranty-claims" className={inlineLink}>
                    True Aim, NSA Services SA case study
                  </Link>
                  ).
                </p>

                <p className="text-body leading-[1.6]">
                  The time saved comes from the split in the table above. Reading, testing and calculating are done by
                  code and the language model, and the adjuster reviews the result.
                </p>
              </MotionDiv>

              {/* What the adjuster sees */}
              <MotionDiv {...fadeIn}>
                <h2 id="what-the-adjuster-sees" className={h2}>
                  What does the adjuster see for each line?
                </h2>

                <p className="text-body leading-[1.6]">
                  Each line of the claim shows whether it is covered, excluded, partly covered or referred, with the
                  clause it rests on and the amount. The adjuster reviews the result and can override any line, giving a
                  reason. The adjuster then finalises the claim: approve, partly cover, refer or deny.
                </p>
              </MotionDiv>

              {/* Referrals */}
              <MotionDiv {...fadeIn}>
                <h2 id="referrals" className={h2}>
                  Which claims go to a person?
                </h2>

                <p className={p}>
                  Automated Coverage Check sends a claim to a person when the answer cannot be calculated with
                  confidence. That happens when:
                </p>

                <ul className="space-y-3 text-body leading-[1.6] mb-5">
                  {referralReasons.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span aria-hidden="true" className="text-accent mt-1">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-body leading-[1.6]">The threshold is agreed with each insurer.</p>
              </MotionDiv>

              {/* Multi-part */}
              <MotionDiv {...fadeIn}>
                <h2 id="multi-part" className={h2}>
                  How are multi-part claims handled?
                </h2>

                <p className="text-body leading-[1.6]">
                  In a multi-part claim, Automated Coverage Check tests each line on its own, against the clauses that
                  apply to that line. Each line carries its own result and its own clause. A covered repair and an
                  excluded part in the same claim keep separate results, and the claim result follows from its lines.
                </p>
              </MotionDiv>

              {/* What it does not do */}
              <MotionDiv {...fadeIn}>
                <h2 id="what-it-does-not-do" className={h2}>
                  What an automated coverage check does not do
                </h2>

                <p className={p}>
                  Automated Coverage Check does not decide the claim. It prepares the decision, and the adjuster makes
                  it. Insurers and their supervisors want a person accountable for each decision, and the check is built
                  around that.
                </p>

                <p className="text-body leading-[1.6]">
                  It also cannot start from a wording nobody has worked through. The wording has to be turned into rules
                  with the insurer&apos;s claims lead first.
                </p>
              </MotionDiv>

              {/* Close */}
              <MotionDiv {...fadeIn}>
                <h2 id="calculated-not-predicted" className={h2}>
                  Calculated, not predicted.
                </h2>

                <p className={p}>
                  When the amount owed comes from a calculation anyone can repeat, the adjuster&apos;s time goes on the
                  lines that need judgement.
                </p>

                <div className="bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm font-medium text-accent">
                    If you took one closed claim from last month and checked each line against the wording, how many
                    lines would have needed a person?
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
                    True Aim, NSA Services SA case study:{" "}
                    <Link href="/case-studies/vehicle-warranty-claims" className={inlineLink}>
                      trueaim.ai/en/case-studies/vehicle-warranty-claims/
                    </Link>
                  </li>
                  <li>How the check works, referrals and multi-part claims: Frédéric Brunner, article inputs, 18 November 2026</li>
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
