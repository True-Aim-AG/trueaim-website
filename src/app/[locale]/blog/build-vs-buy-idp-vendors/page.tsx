import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";
import { TextureBackdrop } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle,
  AlertTriangle,
  Building,
  Wrench,
  ShoppingCart,
  Scale,
  ClipboardList,
  Target,
} from "lucide-react";

const ease = [0.4, 0, 0.2, 1] as const;

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease } as const,
};

export default async function BuildVsBuyBlogPost({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-hairline bg-page-tint">
        <TextureBackdrop texture={{ name: "circ", position: "12% 88%" }} />

        <div className="relative max-w-4xl mx-auto px-6 pt-20 md:pt-28 pb-16">
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
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              All Articles
            </Link>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-6 leading-tight">
              Build vs Buy: What to Demand from IDP Vendors
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              A practical evaluation framework for insurance teams evaluating
              claims automation solutions
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-subtle">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                15 min read
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                Strategic Guide
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3 max-w-3xl space-y-12">
              {/* The Wrong Question */}
              <MotionDiv {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  The Wrong Question
                </h2>

                <div className="border-l-2 border-ta-blue pl-6 mb-8">
                  <p className="text-body-lg text-strong">
                    &ldquo;Should we build or buy our claims AI?&rdquo;
                  </p>
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  This is the wrong question. Vendors will show you polished
                  demos. Your developers will promise they can &ldquo;just use
                  GPT-4.&rdquo; Neither perspective captures reality.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  The right question:{" "}
                  <strong className="text-strong">
                    What do you need to be true for this to work in production,
                    and who can actually make it true?
                  </strong>
                </p>

                <p className="text-body leading-[1.6]">
                  In our deployment with NSA Services SA, True Aim moved from
                  first test to a working system in seven days and reduced
                  expert time on complex claims by 86%. The framework below
                  sets out how to assess claims AI vendors on evidence rather
                  than demonstrations.
                </p>
              </MotionDiv>

              {/* When to Build */}
              <MotionDiv {...fadeIn}>
                <div className="flex items-center gap-3 mt-14 mb-6">
                  <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                    <Wrench className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong">
                    When to Build
                  </h2>
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  Build is a capability investment, not a cost savings. Choose
                  it for strategic reasons, not fear of vendors.
                </p>

                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Build Makes Sense When:
                  </h3>
                  <ul className="space-y-3">
                    {[
                      {
                        title: "Your policy logic is genuinely unique",
                        desc: "If your coverage rules can't be configured in a vendor product, you'll fight their system forever.",
                      },
                      {
                        title:
                          "You have ML engineering capacity, and retention",
                        desc: "One departing engineer shouldn't cripple your system.",
                      },
                      {
                        title: "Claims processing is your competitive advantage",
                        desc: "Some insurers differentiate on claims speed. Most don't.",
                      },
                      {
                        title: "Regulatory requirements demand full control",
                        desc: "Swiss and EU data residency, audit trails, explainability: some regulators want everything in-house.",
                      },
                      {
                        title:
                          "You're prepared for 12-18 months before production",
                        desc: "This is a realistic timeline for an in-house build.",
                      },
                    ].map((item) => (
                      <li key={item.title} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <div>
                          <span className="font-medium text-strong">
                            {item.title}.
                          </span>{" "}
                          <span className="text-body">
                            {item.desc}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Build Traps */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Build Traps to Avoid:
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-referred-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <span className="font-medium text-strong">
                          &ldquo;We&apos;ll just use GPT-4.&rdquo;
                        </span>
                        <p className="text-sm text-body mt-1">
                          You&apos;ll hit the same accuracy ceiling everyone
                          else does. A general-purpose language model will not
                          apply your policy terms reliably without a defined
                          rule set.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-referred-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <span className="font-medium text-strong">
                          &ldquo;Our developers can figure it out.&rdquo;
                        </span>
                        <p className="text-sm text-body mt-1">
                          Claims domain is deep. German compound words like{" "}
                          <em>Abgasrückführungsventil</em> (exhaust gas
                          recirculation valve) require automotive vocabulary
                          that doesn&apos;t come from Stack Overflow.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-referred-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <span className="font-medium text-strong">
                          &ldquo;We don&apos;t want vendor lock-in.&rdquo;
                        </span>
                        <p className="text-sm text-body mt-1">
                          You&apos;ll trade it for internal lock-in: dependency
                          on engineers who understand your bespoke system.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real Cost of Build */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <h4 className="font-display font-semibold text-strong mb-2">
                    The Real Cost of Build:
                  </h4>
                  <ul className="text-sm text-body space-y-1">
                    <li>• 2-4 ML engineers for 12+ months</li>
                    <li>
                      • Domain expert time for labeling and validation (~20
                      person-hours for 50-claim ground truth)
                    </li>
                    <li>
                      • Ongoing maintenance: models drift, document formats
                      change
                    </li>
                    <li>• Opportunity cost of not shipping sooner</li>
                  </ul>
                </div>
              </MotionDiv>

              {/* When to Buy */}
              <MotionDiv {...fadeIn}>
                <div className="flex items-center gap-3 mt-14 mb-6">
                  <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                    <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong">
                    When to Buy
                  </h2>
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  Buy is a speed-to-market trade-off. Choose it because you
                  value time, not because you think it&apos;s
                  &ldquo;easier.&rdquo;
                </p>

                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Buy Makes Sense When:
                  </h3>
                  <ul className="space-y-3">
                    {[
                      {
                        title: "You need production results in 3-6 months",
                        desc: "Vendors have solved problems you haven't encountered yet.",
                      },
                      {
                        title:
                          "You don't have (or want to build) ML capacity",
                        desc: "Hiring and retaining ML engineers is hard.",
                      },
                      {
                        title: "Your claim types are relatively standard",
                        desc: "Motor, property, health: vendors have seen these before.",
                      },
                      {
                        title:
                          "You want IT focused on integration, not model building",
                        desc: "Your competitive advantage is probably not in AI research.",
                      },
                    ].map((item) => (
                      <li key={item.title} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <div>
                          <span className="font-medium text-strong">
                            {item.title}.
                          </span>{" "}
                          <span className="text-body">
                            {item.desc}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buy Traps */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Buy Traps to Avoid:
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-referred-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <span className="font-medium text-strong">
                          &ldquo;They showed a great demo.&rdquo;
                        </span>
                        <p className="text-sm text-body mt-1">
                          Demo data is curated. Our system looked great on
                          German documents until we ran French claims. All 25
                          approved claims were wrongly rejected.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-referred-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <span className="font-medium text-strong">
                          &ldquo;They said 99% accuracy.&rdquo;
                        </span>
                        <p className="text-sm text-body mt-1">
                          Ask: accuracy on what? Their test set or your
                          documents? Decision accuracy ≠ business accuracy.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-referred-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <span className="font-medium text-strong">
                          &ldquo;It&apos;s plug and play.&rdquo;
                        </span>
                        <p className="text-sm text-body mt-1">
                          Integration is always harder than promised. Document
                          formats vary. Field names differ. Your policy
                          structure has quirks.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real Cost of Buy */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <h4 className="font-display font-semibold text-strong mb-2">
                    The Real Cost of Buy:
                  </h4>
                  <ul className="text-sm text-body space-y-1">
                    <li>
                      • Licence fees (per claim, per document, or platform)
                    </li>
                    <li>
                      • Integration effort (typically 3-6 months, not 3-6 weeks)
                    </li>
                    <li>• Ongoing optimisation (you&apos;ll still need to tune)</li>
                    <li>
                      • Vendor dependency (what if they pivot, fail, or get
                      acquired?)
                    </li>
                  </ul>
                </div>
              </MotionDiv>

              {/* Vendor Evaluation Framework */}
              <MotionDiv {...fadeIn}>
                <div className="flex items-center gap-3 mt-14 mb-6">
                  <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                    <ClipboardList className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong">
                    The Vendor Evaluation Framework
                  </h2>
                </div>

                <p className="text-body leading-[1.6] mb-6">
                  A systematic approach to comparing vendors. Weight categories
                  based on your priorities.
                </p>

                {/* Category 1: Accuracy */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-strong">
                      Category 1: Accuracy & Evaluation
                    </h3>
                    <span className="text-sm font-medium text-accent bg-accent-soft px-3 py-1 rounded-pill">
                      30% Weight
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-hairline">
                          <th className="text-left py-2 pr-4 font-display text-strong">
                            Question
                          </th>
                          <th className="text-left py-2 font-display text-strong">
                            What You&apos;re Looking For
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-body">
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            What&apos;s your holdout accuracy?
                          </td>
                          <td className="py-2">
                            Specific %, methodology explained
                          </td>
                        </tr>
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            What&apos;s your false approve rate?
                          </td>
                          <td className="py-2">Tracked separately, &lt;5%</td>
                        </tr>
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Can you show error categories?
                          </td>
                          <td className="py-2">
                            Taxonomy exists, improvement tracked
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4">
                            How many iterations to reach current accuracy?
                          </td>
                          <td className="py-2">Shows discipline, not luck</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-muted mt-4">
                    <strong className="text-denied-dark">Red flags:</strong>{" "}
                    &ldquo;Our accuracy is 99%&rdquo; without explaining holdout
                    methodology. We tracked 14 distinct failure modes across
                    matching, extraction, coverage logic, and calculation.
                  </p>
                </div>

                {/* Category 2: Auditability */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-strong">
                      Category 2: Auditability
                    </h3>
                    <span className="text-sm font-medium text-accent bg-accent-soft px-3 py-1 rounded-pill">
                      25% Weight
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-hairline">
                          <th className="text-left py-2 pr-4 font-display text-strong">
                            Question
                          </th>
                          <th className="text-left py-2 font-display text-strong">
                            What You&apos;re Looking For
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-body">
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Can I trace any field to its source document?
                          </td>
                          <td className="py-2">Page and character level</td>
                        </tr>
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Do you log model version and confidence?
                          </td>
                          <td className="py-2">Complete audit trail</td>
                        </tr>
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            Can you reproduce a 6-month-old decision?
                          </td>
                          <td className="py-2">Full reproducibility</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4">
                            How do you capture human overrides?
                          </td>
                          <td className="py-2">With justification required</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-muted mt-4">
                    For Swiss and EU regulated workflows, auditability isn&apos;t
                    negotiable.
                  </p>
                </div>

                {/* Category 3: Architecture */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-strong">
                      Category 3: Architecture
                    </h3>
                    <span className="text-sm font-medium text-accent bg-accent-soft px-3 py-1 rounded-pill">
                      20% Weight
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-hairline">
                          <th className="text-left py-2 pr-4 font-display text-strong">
                            Question
                          </th>
                          <th className="text-left py-2 font-display text-strong">
                            What You&apos;re Looking For
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-body">
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            What % is deterministic vs ML?
                          </td>
                          <td className="py-2">
                            Higher deterministic = lower risk
                          </td>
                        </tr>
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            What are your confidence thresholds?
                          </td>
                          <td className="py-2">Asymmetric, configurable</td>
                        </tr>
                        <tr className="border-b border-hairline">
                          <td className="py-2 pr-4">
                            How do you detect distribution shift?
                          </td>
                          <td className="py-2">Monitoring in place</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4">
                            What&apos;s your human-in-loop workflow?
                          </td>
                          <td className="py-2">Full QA console</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-muted mt-4">
                    Our architecture: 57% of items handled by deterministic
                    rules (zero LLM cost). Higher deterministic percentage =
                    lower cost and higher explainability.
                  </p>
                </div>

                {/* Categories 4 & 5 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-display font-semibold text-strong text-sm">
                        Cost & Operations
                      </h4>
                      <span className="text-xs font-medium text-accent bg-accent-soft px-3 py-0.5 rounded-pill">
                        15%
                      </span>
                    </div>
                    <ul className="text-xs text-body space-y-1">
                      <li>• Cost per claim breakdown</li>
                      <li>• Token limits, circuit breakers</li>
                      <li>• P50, P95, P99 latencies</li>
                      <li>• Native language handling</li>
                    </ul>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-display font-semibold text-strong text-sm">
                        Risk & Safety
                      </h4>
                      <span className="text-xs font-medium text-accent bg-accent-soft px-3 py-0.5 rounded-pill">
                        10%
                      </span>
                    </div>
                    <ul className="text-xs text-body space-y-1">
                      <li>• Documented failure modes</li>
                      <li>• Automated regression testing</li>
                      <li>• Graceful degradation to human</li>
                      <li>• EU/Swiss data residency</li>
                    </ul>
                  </div>
                </div>
              </MotionDiv>

              {/* Demo Checklist */}
              <MotionDiv {...fadeIn}>
                <div className="flex items-center gap-3 mt-14 mb-6">
                  <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                    <Target className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong">
                    The Demo Checklist
                  </h2>
                </div>

                <p className="text-body leading-[1.6] mb-6">
                  What to demand when vendors present.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <h3 className="font-display font-semibold text-strong mb-3">
                      Before the Demo
                    </h3>
                    <ul className="text-sm text-body space-y-2">
                      <li>• Send 10-20 of YOUR claims</li>
                      <li>• Include edge cases: multilingual, poor scan quality</li>
                      <li>• Define success criteria upfront</li>
                    </ul>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <h3 className="font-display font-semibold text-strong mb-3">
                      During the Demo
                    </h3>
                    <ul className="text-sm text-body space-y-2">
                      <li>• Run on YOUR documents</li>
                      <li>• Ask to see a failure</li>
                      <li>• Click through to field provenance</li>
                      <li>• Request confidence scores</li>
                    </ul>
                  </div>
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <h3 className="font-display font-semibold text-strong mb-3">
                      After the Demo
                    </h3>
                    <ul className="text-sm text-body space-y-2">
                      <li>• Compare claimed vs actual accuracy</li>
                      <li>• Count &ldquo;we&apos;ll tune that&rdquo; responses</li>
                      <li>• Evaluate: could your team use this daily?</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-card shadow-card rounded-pill p-8">
                  <h3 className="font-display font-semibold text-strong mb-3">
                    The 5-Minute Stress Test
                  </h3>
                  <p className="text-sm text-body">
                    Pick your weirdest claim. A German compound word like{" "}
                    <em>Zylinderkopfdichtung</em> (cylinder head gasket) with a
                    French invoice format and a borderline coverage decision. If
                    they can&apos;t process it live, their &ldquo;99%
                    accuracy&rdquo; doesn&apos;t apply to your reality.
                  </p>
                </div>
              </MotionDiv>

              {/* The Hybrid Path */}
              <MotionDiv {...fadeIn}>
                <div className="flex items-center gap-3 mt-14 mb-6">
                  <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                    <Building className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong">
                    The Hybrid Path
                  </h2>
                </div>

                <p className="text-body leading-[1.6] mb-6">
                  Consider the middle ground. Build some, buy some.
                </p>

                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-display font-semibold text-strong mb-2">
                        Buy
                      </h3>
                      <p className="text-sm text-body">
                        Document extraction, OCR, classification: vendors are
                        good at generic document understanding
                      </p>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-strong mb-2">
                        Build
                      </h3>
                      <p className="text-sm text-body">
                        Policy-specific business rules, coverage logic: you&apos;re
                        better at your specific domain
                      </p>
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-strong mb-2">
                        Own
                      </h3>
                      <p className="text-sm text-body">
                        Evaluation framework, ground truth, quality
                        monitoring. Maintain control of the decision layer
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm text-body leading-[1.6]">
                    <strong className="text-strong">Why this works:</strong>{" "}
                    Vendors handle commodity parts. You handle differentiated
                    parts. You can swap vendors without rewriting rules. You
                    maintain audit control over final decisions.
                  </p>
                </div>
              </MotionDiv>

              {/* Next Steps */}
              <MotionDiv {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  Next Steps
                </h2>

                <div className="space-y-4 mb-8">
                  {[
                    {
                      num: "1",
                      title: "Define must-haves vs nice-to-haves",
                      desc: "Auditability is non-negotiable. Automatic optimisation is not.",
                    },
                    {
                      num: "2",
                      title: "Prepare your demo claim set",
                      desc: "Twenty claims, including your edge cases and multilingual documents.",
                    },
                    {
                      num: "3",
                      title: "Build your scorecard before the first vendor call",
                      desc: "Don't let demos anchor your evaluation criteria.",
                    },
                    {
                      num: "4",
                      title: "Decide: what do you want to own long-term?",
                      desc: "The decision layer? The extraction layer? The whole stack?",
                    },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-accent-soft grid place-items-center flex-shrink-0">
                        <span className="text-sm font-display font-semibold text-accent">
                          {step.num}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-strong">
                          {step.title}
                        </h3>
                        <p className="text-sm text-body">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-l-2 border-ta-blue pl-6">
                  <p className="text-body-lg text-strong">
                    The goal isn&apos;t to avoid vendors or avoid building. It&apos;s
                    to make an informed decision based on your specific
                    situation, timeline, and capabilities.
                  </p>
                </div>

                <p className="mt-6 text-sm text-subtle italic">
                  True Aim AG builds auditable AI systems for Swiss and EU
                  regulated markets. This framework reflects our deployment
                  experience.
                </p>
              </MotionDiv>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <MotionDiv
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="bg-card shadow-card rounded-pill p-8"
              >
                <h3 className="font-display font-semibold text-strong mb-4">
                  Key Takeaways
                </h3>
                <ul className="space-y-3">
                  {[
                    "Build for strategic capability, not cost savings",
                    "Buy for speed-to-market, not simplicity",
                    "5-category vendor evaluation framework",
                    "Demo checklist: before, during, after",
                    "The hybrid path: buy commodity, build differentiation",
                    "Auditability is non-negotiable",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span className="text-sm text-body">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-hairline">
                  <h4 className="text-caption-sm text-subtle mb-3">
                    Related Topics
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Vendor Evaluation",
                      "Build vs Buy",
                      "IDP",
                      "Claims AI",
                      "Insurance",
                      "Due Diligence",
                    ].map((tag) => (
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
                  <ButtonLink href="/contact" variant="primary" className="w-full">
                    Talk to Us
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </ButtonLink>
                </div>
              </MotionDiv>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-theme="dark" className="py-20 px-6 bg-page-tint">
        <div className="max-w-4xl mx-auto text-center">
          <MotionDiv {...fadeIn}>
            <Scale className="w-12 h-12 text-muted mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
              Evaluating Claims AI Vendors?
            </h2>
            <p className="text-lg text-body mb-10">
              We can help you build an evaluation framework tailored to your
              requirements and run objective vendor comparisons.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Get in Touch
                <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
              </ButtonLink>
              <ButtonLink href="/blog/auditability-evidence-chains" variant="on-dark" size="lg">
                Read: Auditability in Claims AI
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
