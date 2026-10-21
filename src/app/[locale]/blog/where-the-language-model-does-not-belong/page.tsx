import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  CheckCircle,
  Clock,
  ScrollText,
  User,
} from "lucide-react";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";
import { ButtonLink } from "@/components/brand/Button";
import { FaqBlock, TextureBackdrop } from "@/components/content";
import { operations } from "./operations";
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
  { id: "three-operations", heading: "The three core operations" },
  { id: "computing-belongs-to-rules", heading: "Why computing belongs to rules" },
  { id: "where-a-model-earns-its-place", heading: "Where a model earns its place" },
  { id: "when-you-cannot-separate", heading: "When you cannot separate the two" },
  { id: "one-claim", heading: "The boundary on one claim" },
  { id: "handover-points", heading: "Where rules stop" },
  { id: "how-true-aim-draws-the-line", heading: "How True Aim draws the line" },
  { id: "claim-record", heading: "What a claim record should show" },
];

const topics = [
  "Claims AI",
  "Decision Trees",
  "Language Models",
  "Human Oversight",
  "Auditability",
  "Technical Architecture",
];

type NumberedItem = { title: string; body: string };
type BulletItem = { lead?: string; text: string };

const modelJobs: NumberedItem[] = [
  {
    title: "Document & Evidence Extraction (Reading)",
    body: "Rules cannot read a photograph or a handwritten note. Agents built on language models can. Turning unstructured evidence into structured facts is the work that suits them best. The discipline is to keep each agent narrow. An agent that only extracts is far easier to check than one that reads, extracts, sorts and explains in one pass.",
  },
  {
    title: "Marked Ambiguity Resolution (Judging)",
    body: "When an item is genuinely ambiguous and no rule resolves it, a model can do the matching. What makes that acceptable is the label. The record marks that line as probabilistic rather than deterministic, so a reviewer can see exactly which parts of the decision involved judgement and where to look first.",
  },
];

const claimSteps: NumberedItem[] = [
  {
    title: "Reading",
    body: "An agent extracts the facts the rules need from repair documents: what was repaired and what caused the damage. Each value points back to its source document.",
  },
  {
    title: "Computing",
    body: "The engine applies policy wording and business rules to those facts. The line comes back covered under clause 2.2A. The explanation is rooted in the wording, not composed after the fact. Any excess, limit or cap is then computed, with the calculation shown line by line.",
  },
  {
    title: "Judging",
    body: "Where an invoice line matches no rule cleanly, a model does the matching and that line alone carries a probabilistic label. The lines around it stay deterministic.",
  },
  {
    title: "Human Review",
    body: "The whole audit trail can be exported at any point. A handler reviews the claim. Any change they make requires a reason logged directly in the record.",
  },
];

const summaryPoints: BulletItem[] = [
  {
    lead: "Reading belongs to AI models:",
    text: "Turning unstructured PDFs, photographs, emails and handwritten notes into structured facts.",
  },
  {
    lead: "Computing belongs strictly to rules:",
    text: "Calculating limits, excesses, deductibles and co-insurance splits has exactly one right answer. A model can only offer a likely one.",
  },
  {
    lead: "Judging can use a model, provided it is marked as such:",
    text: "Where wording leaves an item open, the record must show that the line was resolved by a model and not by a rule.",
  },
];

const stepKinds: BulletItem[] = [
  {
    lead: "A deterministic step",
    text: "is one where the same inputs always produce the same output. A rule written as a decision tree behaves this way: given the facts, the outcome is computed, not predicted.",
  },
  {
    lead: "A probabilistic step",
    text: "produces the most likely answer based on what it has seen. Because a language model is probabilistic by construction, the same inputs can produce a different answer on another run or model version.",
  },
];

const handovers: BulletItem[] = [
  {
    lead: "Handover 1: Missing Evidence.",
    text: "If a document is missing or a value cannot be extracted, the correct response is to ask for it. The claim waits for the fact rather than proceeding on an approximation.",
  },
  {
    lead: "Handover 2: Genuine Ambiguity.",
    text: "Where an invoice line matches no catalogue entry cleanly, a model matches the item and the record marks it as probabilistic. The judgement sits beside the arithmetic, clearly labelled.",
  },
  {
    lead: "Handover 3: Insurer-Defined Thresholds.",
    text: "Thresholds on claim value, deviation from expected outcomes or confidence levels are set by the insurer. A claim that crosses a threshold is routed to a handler, who sees the facts, the applied clause and every assumption made. If an assumption does not hold, the handler overrides it and the outcome is recomputed.",
  },
];

const engineParts: BulletItem[] = [
  {
    lead: "Deterministic Decision Trees:",
    text: "Policy wording, catalogues and rulebooks are converted into decision trees. Given the facts, the outcome is computed rather than predicted. Same inputs, same decision, every time.",
  },
  {
    lead: "Task-Specific Agents:",
    text: "Agents read photographs, PDFs, handwriting, emails and free text to extract structured facts. Each agent does one narrow job.",
  },
  {
    lead: "Labelled Model Matching:",
    text: "Where an item is genuinely ambiguous, a model matches it and marks that line as probabilistic on the record.",
  },
  {
    lead: "Human-in-the-Loop Control:",
    text: "Coverage outcomes trace back to the clause behind them. Human review is triggered by thresholds the insurer sets. Every change a person makes carries a reason.",
  },
];

const recordPoints: BulletItem[] = [
  { text: "Each fact carries the document page it was taken from." },
  { text: "Each figure carries the clause or rule that produced it." },
  {
    text: "Each judgement is marked as judgement, so the reviewer knows where to test first.",
  },
];

const takeaways: BulletItem[] = [
  {
    lead: "Tool Separation:",
    text: "Reading, computing and judging are different kinds of steps and need different tools.",
  },
  {
    lead: "Rules for Computation:",
    text: "Computing belongs to rules. A likely answer to arithmetic is a new failure mode with no upside.",
  },
  {
    lead: "Labelled Model Usage:",
    text: "A model earns its place in reading and, marked as probabilistic, in judging.",
  },
  {
    lead: "Defined Handover Boundaries:",
    text: "Rules stop at missing evidence, genuine ambiguity and insurer thresholds. Each is a handover the record shows, not a gap it hides.",
  },
];

/** A numbered list of house cards, one step or item per card. */
function NumberedCards({ items }: { items: NumberedItem[] }) {
  return (
    <ol role="list" className="space-y-4 list-none p-0">
      {items.map((item, index) => (
        <li key={item.title} className="bg-card shadow-card rounded-pill p-8">
          <h3 className="flex items-start gap-3 font-display font-semibold text-strong mb-3">
            <span
              aria-hidden="true"
              className="w-8 h-8 rounded-full bg-accent-soft grid place-items-center flex-shrink-0 text-sm font-display font-semibold text-accent"
            >
              {index + 1}
            </span>
            <span>{item.title}</span>
          </h3>
          <p className="text-sm text-body leading-[1.6]">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}

function BulletList({
  items,
  className = "",
}: {
  items: BulletItem[];
  className?: string;
}) {
  return (
    <ul className={`space-y-3 text-body leading-[1.6] ${className}`}>
      {items.map((item) => (
        <li key={item.text} className="flex items-start gap-3">
          <span aria-hidden="true" className="text-accent mt-1">&bull;</span>
          <span>
            {item.lead && (
              <>
                <strong className="text-strong">{item.lead}</strong>{" "}
              </>
            )}
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default async function LanguageModelBoundaryBlogPost({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-hairline bg-page-tint">
        <TextureBackdrop texture={{ name: "circ", position: "88% 78%" }} />

        <div className="relative max-w-5xl mx-auto px-6 pt-20 md:pt-28 pb-16">
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
              Where the Language Model Does Not Belong
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              Designing Defensible AI in Claims Operations
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <User aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
                <span>
                  <span className="text-body">Reuben John</span>, CEO and
                  Co-Founder of True Aim
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
                7 min read
              </div>
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
              {/* Executive summary */}
              <MotionDiv {...fadeIn}>
                <div className="bg-card shadow-card rounded-pill p-8 mb-8">
                  <h2 className="text-caption-sm text-muted mb-4">
                    Executive Summary
                  </h2>
                  <p className="text-body leading-[1.6] mb-4">
                    A claim decision is not a single step. It is an end-to-end
                    chain of smaller actions categorised into three distinct
                    types: <strong className="text-strong">Reading</strong>,{" "}
                    <strong className="text-strong">Computing</strong> and{" "}
                    <strong className="text-strong">Judging</strong>.
                  </p>
                  <BulletList items={summaryPoints} />
                </div>

                <div className="border-l-2 border-ta-blue pl-6">
                  <p className="text-body-lg text-strong">
                    The design choice that matters is not &quot;rules or
                    models&quot;. It is keeping the boundary between them
                    visible on every step of the record.
                  </p>
                </div>
              </MotionDiv>

              {/* The three core operations */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="three-operations"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  The Three Core Operations Inside a Claim Decision
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  AI in claims is usually framed as a choice between rules and
                  models. But a claim decision is not one single act. It is a
                  chain of steps and each requires the right tool:
                </p>

                <NumberedCards
                  items={operations.map((operation) => ({
                    title: operation.name,
                    body: operation.description,
                  }))}
                />

                <p className="text-body leading-[1.6] mt-8">
                  Most claims contain all three. What matters is whether anyone
                  can see, afterwards, which kind each step was.
                </p>
              </MotionDiv>

              {/* Why computing belongs to rules */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="computing-belongs-to-rules"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Why Computing Belongs to Rules, Without Exception
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Arithmetic on a written limit has one right answer. A
                  co-insurance split of a known amount at a known percentage
                  does not have a likely outcome. It has an outcome.
                </p>

                <BulletList items={stepKinds} className="mb-5" />

                <p className="text-body leading-[1.6] mb-5">
                  That is a strength when reading messy evidence. On a
                  calculation, it is simply a new way to be wrong, with no
                  upside. A model that applies an excess correctly on every
                  test claim has still not become a rule. The next run is not
                  bound by the previous ones.
                </p>

                <p className="text-body leading-[1.6]">
                  Excess, deductibles, thresholds, caps, limits, liability
                  splits, co-insurance and betterment are all computing. None
                  of them needs a model.
                </p>
              </MotionDiv>

              {/* Where a model earns its place */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="where-a-model-earns-its-place"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Where a Model Earns Its Place
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  A model earns its place by solving jobs where fixed rules
                  cannot work:
                </p>

                <NumberedCards items={modelJobs} />
              </MotionDiv>

              {/* When you cannot separate the two */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="when-you-cannot-separate"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  What Happens When You Cannot Separate the Two
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  If extraction, judgement and arithmetic happen inside one
                  single model call, the decision can only be described as a
                  whole. The output is a single answer with nothing inside to
                  inspect.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Any explanation is written afterwards, as a narration of what
                  probably happened. It may sound plausible, but it is not a
                  record.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  What makes a decision hard to defend is rarely that a model
                  was involved. It is that no one can separate the steps where
                  it was involved from the steps where it was not. A decision
                  that is not a black box is one where every step can be opened
                  on its own, with its kind written on it.
                </p>

                <p className="text-body leading-[1.6]">
                  That property must be designed into the system from day one.
                  A record that never stored which steps were computed cannot
                  be split into steps later.
                </p>
              </MotionDiv>

              {/* The boundary on one claim */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="one-claim"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  What the Boundary Looks Like on One Claim
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  Take a glass line on a motor claim:
                </p>

                <NumberedCards items={claimSteps} />
              </MotionDiv>

              {/* Where rules stop */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="handover-points"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Where Rules Stop: The Three Handover Points
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  A decision tree is exactly as complete as the facts it is
                  given and the wording it was built from. A well-designed
                  engine treats rule boundaries as defined handovers, not gaps:
                </p>

                <BulletList items={handovers} />
              </MotionDiv>

              {/* How True Aim draws the line */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="how-true-aim-draws-the-line"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  How True Aim Draws the Line
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  True Aim&apos;s decision engine is a hybrid of two
                  technologies. The boundary between them is the core design
                  choice:
                </p>

                <BulletList items={engineParts} />
              </MotionDiv>

              {/* What a claim record should show */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="claim-record"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  What a Claim Record Should Be Able to Show
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Every closed claim is read again: by the handler before
                  sign-off, by the customer when an outcome is questioned or by
                  an auditor a year later. Each asks the same question: how was
                  this reached?
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  A record that keeps the three kinds of steps apart answers
                  directly:
                </p>

                <BulletList items={recordPoints} className="mb-5" />

                <p className="text-body leading-[1.6]">
                  A record that holds only the final outcome cannot answer at
                  all. It can only offer a description written after the event.
                  A description is not evidence.
                </p>
              </MotionDiv>

              {/* Key takeaways */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="key-takeaways"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Key Takeaways
                </h2>

                <div className="bg-card shadow-card rounded-pill p-8">
                  <ul className="space-y-4">
                    {takeaways.map((takeaway) => (
                      <li key={takeaway.text} className="flex items-start gap-3">
                        <CheckCircle
                          aria-hidden="true"
                          className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                          strokeWidth={1.5}
                        />
                        <span className="text-sm text-body leading-[1.6]">
                          <strong className="text-strong">{takeaway.lead}</strong>{" "}
                          {takeaway.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </MotionDiv>

              {/* FAQ */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="faq"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Frequently Asked Questions
                </h2>

                <FaqBlock faqs={faqs} />
              </MotionDiv>

              {/* Related reading */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="related-reading"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Related Reading
                </h2>

                <div className="space-y-4">
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <Link
                      href="/blog/ai-claims-handling-eu-ai-act-high-risk"
                      className="font-display font-medium text-link hover:underline"
                    >
                      AI Claims Handling Is Not High-Risk Under the EU AI Act
                    </Link>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <Link
                      href="/blog/ai-claims-auditability-scorecard"
                      className="font-display font-medium text-link hover:underline"
                    >
                      The AI Claims Auditability Scorecard
                    </Link>
                  </div>
                </div>
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
                <h2 className="font-display font-semibold text-strong mb-4">
                  On this page
                </h2>
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

                <div className="mt-8 pt-6 border-t border-hairline">
                  <h3 className="text-caption-sm text-muted mb-3">
                    Related Topics
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {topics.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-pill bg-accent-soft text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-hairline">
                  <ButtonLink href="/trust" variant="primary" size="sm" className="w-full">
                    Explore our Trust Centre
                    <ArrowRight aria-hidden="true" className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                  </ButtonLink>
                </div>
              </MotionDiv>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-theme="dark" className="py-20 px-6 bg-page-tint">
        <div className="max-w-4xl mx-auto text-center">
          <MotionDiv {...fadeIn}>
            <ScrollText
              aria-hidden="true"
              className="w-12 h-12 text-muted mx-auto mb-6"
              strokeWidth={1.5}
            />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
              Zero Risk Does Not Exist. Explainable Decisions Do.
            </h2>
            <p className="text-lg text-body mb-10">
              Discuss how this boundary applies to your claims operation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Get in Touch
                <ArrowRight aria-hidden="true" className="w-5 h-5" strokeWidth={1.5} />
              </ButtonLink>
              <ButtonLink href="/impact-estimator" variant="on-dark" size="lg">
                <Calculator aria-hidden="true" className="w-5 h-5" strokeWidth={1.5} />
                Get Impact Estimate
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
