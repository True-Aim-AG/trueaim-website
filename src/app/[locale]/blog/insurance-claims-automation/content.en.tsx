import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { ArrowLeft, ArrowRight, Clock, User } from "lucide-react";
import { FaqBlock, TextureBackdrop } from "@/components/content";
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
  { id: "start-with-the-documents", heading: "Start with the documents" },
  { id: "first-decision", heading: "The first decision to automate" },
  { id: "the-order", heading: "The order most insurers follow" },
  { id: "what-an-insurer-provides", heading: "What an insurer provides" },
  { id: "three-measures", heading: "Three measures that show it is working" },
  { id: "cycle-time", heading: "A measure to use with care" },
  { id: "your-experts", heading: "Your experts already know" },
  { id: "faq", heading: "Frequently asked questions" },
];

const insurerProvides: string[] = [
  "An NDA and a data processing agreement, before any data moves.",
  "The policy wordings, decision rules and business rules: how the experts decide exclusions, deductibles, limits and referrals.",
  "A batch of closed claim files with known outcomes, approvals and declines both.",
  "A business owner, one or two senior claims experts and an IT contact.",
  "An approved route to the data. Email forwarding is enough to start, and API access follows for the integration.",
];

const h2 = "font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24";
const h3 = "font-display text-xl font-semibold text-strong mt-8 mb-3";
const p = "text-body leading-[1.6] mb-5";
const inlineLink = "text-link underline hover:text-accent";

export default async function InsuranceClaimsAutomationBlogPost({
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
              Insurance claims automation: what to automate first and how to measure it
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <User aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
                <span>
                  By{" "}
                  <Link href="/authors/reuben-john" rel="author" className="text-body underline hover:text-accent">
                    Reuben John
                  </Link>
                  , Co-founder and CEO, True Aim
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
                8 min read
              </div>
              <Link href="/authors/reuben-john" className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline">
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
                    Most of what a claims decision depends on arrives as documents: the policy, the estimate, the
                    invoice, the photographs and the correspondence. Until those documents are read properly, very
                    little in a claim can be automated with confidence.
                  </p>
                </div>

                <p className={p}>
                  That is why insurance claims automation at True Aim starts with the data rather than the decision.
                  Once every document is read and put in context, the first decision worth automating is the coverage
                  check. This article sets out that order, what an insurer needs to provide and the three measures that
                  show whether it is working.
                </p>
              </MotionDiv>

              {/* Start with the documents */}
              <MotionDiv {...fadeIn}>
                <h2 id="start-with-the-documents" className={h2}>
                  Start with the documents, not the decision
                </h2>

                <p className={p}>
                  Most claims data sits in PDFs, scans and legacy systems that no AI can search well. If that layer is
                  weak, every decision built on top of it is weak too.
                </p>

                <p className={p}>
                  So the work begins by reading every document in a claim and extracting every field and line item.
                  Then each value is put in context: which part belongs to which repair, which clause applies to which
                  line and what is missing.{" "}
                  <Link href="/platform/data-extraction" className={inlineLink}>
                    Data Extraction
                  </Link>{" "}
                  does this reading and stores the result as structured, searchable data.
                </p>

                <blockquote className="border-l-2 border-ta-blue pl-6 mb-5">
                  <p className="text-body-lg text-strong">
                    &ldquo;Every insurer wants to talk about AI decisions. Almost none want to talk about their
                    documents. But a decision is only as good as what was read to make it, so that is where we
                    start,&rdquo; says Reuben John, Co-founder and CEO of True Aim.
                  </p>
                </blockquote>

                <p className="text-body leading-[1.6]">
                  The reading is also where the hours go. At NSA Services SA, a warranty provider, the claims experts
                  spent more time filing, labelling and re-keying documents than deciding claims. Fix the data and the
                  decision gets faster almost by default.
                </p>
              </MotionDiv>

              {/* The first decision */}
              <MotionDiv {...fadeIn}>
                <h2 id="first-decision" className={h2}>
                  The first decision to automate is the coverage check
                </h2>

                <p className={p}>
                  In a coverage check, the answer already sits in the facts of the claim and the wording of the policy.
                  Experts still lose hours checking it line by line.
                </p>

                <p className={p}>
                  <Link href="/platform/automated-coverage-check" className={inlineLink}>
                    Automated Coverage Check
                  </Link>{" "}
                  checks each claim line against the policy wording and calculates the amount, with the reason written
                  down for the adjuster to confirm. It starts on one line of business, so the team can see the results
                  on claims they know well before it goes further.
                </p>

                <blockquote className="border-l-2 border-ta-blue pl-6">
                  <p className="text-body-lg text-strong">
                    &ldquo;Most of the decisions in a claim are already written down in the policy. If the answer
                    follows from the facts and the wording, it should be calculated, not predicted. The judgement calls
                    stay with your experts,&rdquo; says Reuben John.
                  </p>
                </blockquote>
              </MotionDiv>

              {/* The order */}
              <MotionDiv {...fadeIn}>
                <h2 id="the-order" className={h2}>
                  The order most insurers follow after that
                </h2>

                <p className={p}>
                  Each step takes on a new type of decision inside the same account. Most clients add them in this
                  order:
                </p>

                <ol className="list-decimal pl-6 space-y-3 text-body leading-[1.6] mb-5">
                  <li>Data Extraction, so every document is read and every line item captured and put in context.</li>
                  <li>Automated Coverage Check on one line of business.</li>
                  <li>
                    More claim categories, document types and lines, then multi-part claims where each line has to be
                    tested against the policy.
                  </li>
                  <li>
                    <Link href="/platform/invoice-benchmarking" className={inlineLink}>
                      Invoice Benchmarking
                    </Link>
                    , to check what was charged against what the work should cost, and{" "}
                    <Link href="/platform/ai-damage-assessment-and-reporting" className={inlineLink}>
                      AI Damage Assessment &amp; Reporting
                    </Link>
                    , to prepare the damage report at first notification.
                  </li>
                  <li>
                    Inconsistency and fraud detection. Once the data is clean and in context, the patterns that do not
                    add up become visible. True Aim flags them for review, and the claims team decides what is fraud.
                  </li>
                </ol>

                <p className="text-body leading-[1.6]">
                  True Aim does not replace the claims system. It sits alongside the system of record, and the claims
                  team keeps the final say on every outcome.
                </p>
              </MotionDiv>

              {/* What an insurer provides */}
              <MotionDiv {...fadeIn}>
                <h2 id="what-an-insurer-provides" className={h2}>
                  What an insurer provides, and how long it takes
                </h2>

                <p className={p}>An insurer provides five things, in roughly this order:</p>

                <ul className="space-y-3 text-body leading-[1.6] mb-5">
                  {insurerProvides.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span aria-hidden="true" className="text-accent mt-1">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className={p}>
                  The closed files serve two purposes. Most are used to build accurate extraction and context. The rest
                  are held back, and the system is tested on them only once it is built. Accuracy measured on claims the
                  system was tuned against tells you very little.
                </p>

                <p className={p}>
                  A working prototype is typically in the client&apos;s hands within 10 to 14 days. The client then
                  tests it on its own claims in a proof of value, measured against success criteria agreed at the
                  start. When it converts, the aim is to be integrated within 8 to 12 weeks of first receiving approved
                  access to the data and systems. NSA Services SA went from the first test on its own claim files to a
                  working system in seven days, though that timeline was NSA&apos;s alone.
                </p>

                <p className="text-body leading-[1.6]">
                  Claims keep arriving the way they arrive today: by email, through Microsoft 365 or through online
                  forms. True Aim connects to the core claims and policy systems through an API, reading policy and
                  claim data first and writing decisions back once the insurer is ready. Where no API exists, it works
                  from file exports. For why many pilots stop short of production, see{" "}
                  <Link href="/blog/why-claims-ai-pilots-stall" className={inlineLink}>
                    why claims AI pilots stall
                  </Link>
                  .
                </p>
              </MotionDiv>

              {/* Three measures */}
              <MotionDiv {...fadeIn}>
                <h2 id="three-measures" className={h2}>
                  Three measures that show whether it is working
                </h2>

                <h3 className={h3}>Data extraction accuracy, field by field</h3>

                <p className={p}>
                  Extraction accuracy is the measure most teams skip, and it decides everything downstream. If a part
                  is misread or a line is missed, the coverage decision is wrong before it starts.
                </p>

                <p className={p}>
                  True Aim tests it on documents the system has not seen. The engine is frozen before scoring, it is not
                  tuned on the documents being scored and the reference values are set independently. On real repair
                  estimates in German and French, it captures 99% of line items, and 99% of those carry the correct
                  amount. On craftsman invoices, header fields such as invoice number, date and total are 98% accurate.
                  Each extracted value links back to its page in the source document, so a reviewer can check any
                  figure against the original.
                </p>

                <p className={p}>
                  For comparison, a 2025 benchmark by researchers at Fraunhofer IAIS and the Lamarr Institute tested
                  eight large language models on 350 scanned invoices. The best model extracted 92.7% of fields
                  correctly (Source:{" "}
                  <a href="https://arxiv.org/abs/2509.04469" className={inlineLink} rel="noopener noreferrer" target="_blank">
                    Berghaus et al., Multi-Modal Vision vs. Text-Based Parsing: Benchmarking LLM Strategies for Invoice
                    Processing, 2025
                  </a>
                  ).
                </p>

                <p className={p}>
                  Report extraction per field, not only as an average. An overall score of 97% can hide a single field
                  far below it. An IBAN has no tolerance: one misread character makes the whole value wrong. The same
                  benchmark found the IBAN field markedly harder to extract than the others in one of its datasets. If
                  that field drives a payment, the average is the wrong number to watch.
                </p>

                <h3 className={h3}>Expert time per claim, split by complexity</h3>

                <p className={p}>
                  One average hides where the value sits. At NSA Services SA, expert time on a simple claim fell from
                  29 minutes to 5, which is 83% less. On a complex claim it fell from 63 minutes to 9, which is 86%
                  less. Weighted on NSA&apos;s claim mix of 73% simple and 27% complex claims, the average fell from 38
                  minutes to 6, which is 84% less, and the same team can now assess 118% more claims (Source:{" "}
                  <Link href="/case-studies/vehicle-warranty-claims" className={inlineLink}>
                    True Aim, NSA Services SA case study
                  </Link>
                  ).
                </p>

                <h3 className={h3}>Wrongly paid claims, read next to the referral rate</h3>

                <p className="text-body leading-[1.6]">
                  Leakage shows what an insurer is losing. The referral rate shows how much work has really left the
                  desk. Neither means much on its own, so read them together.
                </p>
              </MotionDiv>

              {/* Cycle time */}
              <MotionDiv {...fadeIn}>
                <h2 id="cycle-time" className={h2}>
                  A measure to use with care: end-to-end cycle time
                </h2>

                <p className={p}>
                  Cycle time is the obvious headline, and it can mislead. At NSA Services SA, expert handling time fell
                  84%, while the time to answer a claim from start to finish fell 54%, from 59 minutes to 27.
                </p>

                <p className="text-body leading-[1.6]">
                  That is not a weak result. The rest of the time is follow-ups and handovers that the technology did
                  not touch. Judge the project on cycle time alone and you undervalue it, then look for the problem in
                  the wrong place. Measure the step you changed.
                </p>
              </MotionDiv>

              {/* Your experts */}
              <MotionDiv {...fadeIn}>
                <h2 id="your-experts" className={h2}>
                  Your experts already know how to decide a claim
                </h2>

                <p className={p}>
                  &ldquo;Our job is to take what they know and apply it the same way to every claim, at any hour, with
                  the reasoning written down,&rdquo; says Reuben John. The hours that come back go to the borderline
                  claim, the call to the customer and the rules that make the next decision better.
                </p>

                <div className="bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm font-medium text-accent">
                    If you measured one step of your own claims process next month, which one would tell you most about
                    where your experts&apos; hours go?
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
                  <li>
                    Berghaus, D., Berger, A., Hillebrand, L., Cvejoski, K. and Sifa, R., Multi-Modal Vision vs.
                    Text-Based Parsing: Benchmarking LLM Strategies for Invoice Processing, Fraunhofer IAIS and Lamarr
                    Institute, 2025:{" "}
                    <a href="https://arxiv.org/abs/2509.04469" className={inlineLink} rel="noopener noreferrer" target="_blank">
                      arxiv.org/abs/2509.04469
                    </a>
                  </li>
                  <li>True Aim extraction tests and integration approach: Reuben John, article inputs, 9 November 2026</li>
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
