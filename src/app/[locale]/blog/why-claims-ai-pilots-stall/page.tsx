import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle,
  BarChart3,
  AlertTriangle,
  TrendingUp,
  Target,
  Layers,
} from "lucide-react";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";
import { TextureBackdrop } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";
import { StatusPill } from "@/components/brand/StatusPill";

const ease = [0.4, 0, 0.2, 1] as const;

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease } as const,
};

// Short labels for the "On this page" panel; the H2s carry the full headings.
const sections: { id: string; heading: string }[] = [
  { id: "the-accuracy-illusion", heading: "The Accuracy Illusion" },
  { id: "what-changes-between-demo-and-production", heading: "What Changes Between Demo and Production" },
  { id: "the-three-metrics-that-matter", heading: "The Three Metrics That Matter" },
  { id: "what-moves-a-pilot-forward", heading: "What Moves a Pilot Forward" },
  { id: "operational-takeaway", heading: "Operational Takeaway" },
  { id: "key-takeaways", heading: "Key takeaways" },
];

export default async function WhyClaimsAIPilotsStallBlogPost({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      {/* Hero Section */}
      <section className="relative overflow-hidden lg:flex lg:min-h-[560px] lg:items-center border-b border-hairline bg-page-tint">
        <TextureBackdrop texture={{ name: "circ", position: "50% 50%" }} />

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
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              All Articles
            </Link>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-6 leading-tight">
              Why Claims AI Pilots Stall Before Production Readiness
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              Many claims AI pilots report accuracy in the mid 90s. Yet months
              later they are still not live in production. The root cause is
              measurement discipline and production realism.
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                10 min read
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                Technical Deep Dive
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
              {/* Introduction */}
              <MotionDiv {...fadeIn}>
                <div className="border-l-2 border-ta-blue pl-6 mb-8">
                  <p className="text-body-lg text-strong">
                    This pattern is common across the market. It is rarely caused
                    by lack of budget or executive support. In most cases the root
                    cause is measurement discipline and production realism.
                  </p>
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  In early pilots reported accuracy is often calculated on
                  development data. These are claims the system has already been
                  tuned against during configuration. When evaluated on unseen
                  production data accuracy frequently drops into the 70s. The
                  difference between those two numbers determines whether a
                  system can be safely deployed.
                </p>
              </MotionDiv>

              {/* The Accuracy Illusion */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="the-accuracy-illusion"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  The Accuracy Illusion
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  When someone reports 95 percent accuracy the first question
                  should be simple. Measured on what dataset.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Most pilots rely on curated development sets. These sets are
                  useful for tuning prompts, rules, and extraction pipelines.
                  They are not representative of full production variability.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  Production includes policy variations, unfamiliar invoice
                  formats, language differences, rare edge cases, and
                  inconsistent data quality. A model that performs well on
                  curated data may fail silently on real claims.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  What matters is performance on a holdout set. Claims the
                  system has never seen. Drawn directly from production
                  archives. Stratified across approval and denial, claim value,
                  language, vehicle brand, and document complexity.
                </p>

                {/* Key stat callout */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                      <AlertTriangle className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display font-semibold text-strong">
                      The Gap in Practice
                    </h3>
                  </div>
                  <p className="text-sm text-muted">
                    That gap was not caused by randomness. It exposed missing
                    coverage logic, vocabulary gaps, and structural extraction
                    weaknesses.
                  </p>
                </div>

                <div className="bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm font-medium text-accent">
                    A pilot measured only on development data creates confidence.
                    A pilot measured on a holdout set creates clarity.
                  </p>
                </div>
              </MotionDiv>

              {/* What Changes Between Demo and Production */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="what-changes-between-demo-and-production"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  What Changes Between Demo and Production
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  The transition from demo to production introduces distribution
                  shift. The characteristics of real claims differ in meaningful
                  ways from test data.
                </p>

                <div className="space-y-6">
                  {/* Coverage categories */}
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                        <Layers className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-strong">
                          Coverage Complexity
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-body leading-[1.6]">
                      We initially modelled fewer coverage categories than
                      production required. When additional categories entered the
                      pipeline the system produced confident but incorrect
                      outputs. After expanding coverage logic accuracy improved
                      substantially within a single iteration.
                    </p>
                    <div className="mt-4 p-3 bg-lilac rounded-pill">
                      <p className="text-sm font-medium text-accent">
                        The model was not unstable. The domain model was
                        incomplete.
                      </p>
                    </div>
                  </div>

                  {/* Language */}
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                        <BookOpen className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-strong">
                          Language Complexity
                        </h3>
                        <p className="text-sm text-muted">
                          German and French require separate handling
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-body leading-[1.6]">
                      German and French claims required separate vocabularies and
                      handling logic. German compound words behave differently
                      from French terminology. Without explicit modelling entire
                      classes of valid claims were rejected.
                    </p>
                  </div>

                  {/* Document structure */}
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                        <Target className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-strong">
                          Document Structure
                        </h3>
                        <p className="text-sm text-muted">
                          Layout variations cause extraction errors
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-body leading-[1.6]">
                      Multi-column invoices, page breaks, duplicated line items,
                      and layout differences led to missing or double-counted
                      amounts when extraction logic was not format aware.
                    </p>
                  </div>
                </div>

                <p className="text-body leading-[1.6] mt-6">
                  These are standard operational realities. They are not rare
                  edge cases. If a pilot has not been stress tested against these
                  conditions, reported accuracy is only partially informative.
                </p>
              </MotionDiv>

              {/* The Three Metrics That Matter */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="the-three-metrics-that-matter"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  The Three Metrics That Matter
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  A single accuracy number hides operational trade-offs. Three
                  metrics provide better visibility into production readiness.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="mb-2">
                      <StatusPill tone="denied" emphasis="light" size="sm">False Approve Rate</StatusPill>
                    </div>
                    <p className="text-sm text-body mb-2">
                      This measures financial exposure. A false approval means a
                      claim was paid incorrectly. Even a small percentage can
                      materially affect leakage and audit exposure.
                    </p>
                    <p className="text-xs text-subtle">
                      Reducing the false approve rate to an acceptable level
                      required structured domain expansion,
                      vocabulary refinement, and threshold calibration.
                    </p>
                  </div>

                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="mb-2">
                      <StatusPill tone="referred" emphasis="light" size="sm">False Deny Rate</StatusPill>
                    </div>
                    <p className="text-sm text-body">
                      This measures customer and operational impact. Incorrect
                      denials lead to complaints, rework, escalation, and
                      reputational risk.
                    </p>
                  </div>

                  <div className="bg-card shadow-card rounded-pill p-8">
                    <div className="mb-2">
                      <StatusPill tone="progress" emphasis="light" size="sm">Refer Rate</StatusPill>
                    </div>
                    <p className="text-sm text-body">
                      This measures automation depth. If a large percentage of
                      claims are referred to human reviewers the system has not
                      materially reduced workload.
                    </p>
                  </div>
                </div>

                <div className="bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm text-body leading-[1.6]">
                    Before entering production discussions ask vendors for these
                    three metrics measured on a properly defined holdout set and
                    broken down by claim type and language. If they cannot
                    provide that level of detail the pilot has not yet reached
                    operational maturity.
                  </p>
                </div>
              </MotionDiv>

              {/* What Moves a Pilot Forward */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="what-moves-a-pilot-forward"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  What Moves a Pilot Forward
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Progress did not come from replacing technology. It came from
                  disciplined evaluation cycles.
                </p>

                <p className="text-body leading-[1.6] mb-5">
                  We built a holdout dataset stratified by
                  outcome, value, language, and structural complexity. A senior
                  adjuster labelled each claim. That dataset was quarantined and
                  never used for tuning.
                </p>

                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    The Iteration Loop
                  </h3>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {["Measure", "Diagnose", "Correct", "Retest"].map(
                      (step, i) => (
                        <div key={step} className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-accent-soft grid place-items-center">
                            <span className="text-sm font-display font-semibold text-accent">
                              {i + 1}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-strong">
                            {step}
                          </span>
                          {i < 3 && (
                            <ArrowRight className="w-4 h-4 text-subtle" strokeWidth={1.5} />
                          )}
                        </div>
                      )
                    )}
                  </div>
                  <p className="text-sm text-body leading-[1.6]">
                    Every iteration followed the same loop. A hybrid
                    architecture proved necessary. Deterministic rules handled
                    clear coverage definitions and structured logic. Language
                    models handled ambiguous descriptions and contextual
                    interpretation. Each component was constrained to the role it
                    performs best.
                  </p>
                </div>

                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Confidence Thresholds by Design
                  </h3>
                  <p className="text-sm text-body leading-[1.6]">
                    Confidence thresholds were asymmetric by design. Approvals
                    required higher confidence than denials. Low confidence
                    decisions were routed to human review to protect against
                    financial exposure.
                  </p>
                </div>

                {/* Results callout */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-accent" strokeWidth={1.5} />
                    <h3 className="font-display font-semibold text-strong">
                      Results
                    </h3>
                  </div>
                  <p className="text-sm text-body">
                    The largest single improvement resulted from expanding
                    coverage categories, not from changing models. Domain
                    modelling and measurement discipline were the primary drivers
                    of stability.
                  </p>
                </div>
              </MotionDiv>

              {/* Operational Takeaway */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="operational-takeaway"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Operational Takeaway
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Many claims AI pilots stall because they are measured
                  optimistically and engineered incrementally without structured
                  evaluation. Breaking through the 70 to 80 percent plateau
                  requires:
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    "A properly stratified holdout set derived from real production data",
                    "Clear separation of false approvals, false denials, and referrals",
                    "Explicit domain coverage modelling across all policy categories",
                    "Language-specific vocabulary design",
                    "Confidence thresholds aligned with financial and operational risk",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span className="text-body">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-l-2 border-ta-blue pl-6">
                  <p className="text-body-lg text-strong">
                    Claims automation is viable. It requires honest measurement,
                    clear metrics, and deliberate domain engineering.
                  </p>
                </div>

                <p className="mt-6 text-body leading-[1.6]">
                  If you are evaluating a pilot or preparing for production
                  deployment and want to benchmark your approach against a
                  structured holdout framework, we are available to share how we
                  structure evaluation and iteration.
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
                    {[
                      "Dev set accuracy masks production gaps",
                      "Holdout sets reveal real performance",
                      "Track false approvals, false denials, and refer rate",
                      "Domain modelling drives more improvement than model changes",
                      "Asymmetric confidence thresholds protect against financial risk",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle aria-hidden="true" className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="text-sm text-body leading-[1.6]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
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
            <BarChart3 className="w-12 h-12 text-muted mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
              Ready to Move Beyond the Pilot?
            </h2>
            <p className="text-lg text-body mb-10">
              We can help you structure evaluation frameworks that turn pilots
              into production-ready systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Get in Touch
              </ButtonLink>
              <ButtonLink href="/case-studies/vehicle-warranty-claims" variant="on-dark" size="lg">
                See It in Action
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
