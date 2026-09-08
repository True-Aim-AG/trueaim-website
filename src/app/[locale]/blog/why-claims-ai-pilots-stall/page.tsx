import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle,
  BarChart3,
  AlertTriangle,
  TrendingUp,
  Target,
  Layers,
} from "lucide-react";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6 } as const,
};

export default async function WhyClaimsAIPilotsStallBlogPost({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[var(--background)] to-slate-900">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[var(--primary)] opacity-10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              All Articles
            </Link>

            {/* Category Tag */}
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-sm font-medium">
                <BarChart3 className="w-4 h-4" />
                Production Readiness
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-6 leading-tight">
              Why Claims AI Pilots Stall Before Production Readiness
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
              Many claims AI pilots report accuracy in the mid 90s. Yet months
              later they are still not live in production. The root cause is
              measurement discipline and production realism.
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                February 2026
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                10 min read
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Technical Deep Dive
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
            <div className="lg:col-span-3 space-y-12">
              {/* Introduction */}
              <MotionDiv {...fadeIn}>
                <div className="glass-panel p-6 border-l-4 border-l-[var(--primary)] mb-8">
                  <p className="text-lg text-[var(--text-primary)] leading-relaxed">
                    This pattern is common across the market. It is rarely caused
                    by lack of budget or executive support. In most cases the root
                    cause is measurement discipline and production realism.
                  </p>
                </div>

                <p className="text-[var(--text-secondary)] leading-relaxed">
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
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  The Accuracy Illusion
                </h2>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  When someone reports 95 percent accuracy the first question
                  should be simple. Measured on what dataset.
                </p>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  Most pilots rely on curated development sets. These sets are
                  useful for tuning prompts, rules, and extraction pipelines.
                  They are not representative of full production variability.
                </p>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  Production includes policy variations, unfamiliar invoice
                  formats, language differences, rare edge cases, and
                  inconsistent data quality. A model that performs well on
                  curated data may fail silently on real claims.
                </p>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  What matters is performance on a holdout set. Claims the
                  system has never seen. Drawn directly from production
                  archives. Stratified across approval and denial, claim value,
                  language, vehicle brand, and document complexity.
                </p>

                {/* Key stat callout */}
                <div className="glass-panel p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="font-semibold text-[var(--text-primary)]">
                      The Gap in Practice
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                      <div className="text-3xl font-bold text-emerald-400 mb-1">
                        98%
                      </div>
                      <div className="text-sm text-[var(--text-muted)]">
                        Development set accuracy
                      </div>
                    </div>
                    <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                      <div className="text-3xl font-bold text-red-400 mb-1">
                        76.7%
                      </div>
                      <div className="text-sm text-[var(--text-muted)]">
                        Holdout set accuracy
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] mt-4">
                    That gap was not caused by randomness. It exposed missing
                    coverage logic, vocabulary gaps, and structural extraction
                    weaknesses.
                  </p>
                </div>

                <div className="p-4 bg-[var(--primary)]/10 rounded-lg border border-[var(--primary)]/20">
                  <p className="text-sm font-medium text-[var(--primary)]">
                    A pilot measured only on development data creates confidence.
                    A pilot measured on a holdout set creates clarity.
                  </p>
                </div>
              </MotionDiv>

              {/* What Changes Between Demo and Production */}
              <MotionDiv {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  What Changes Between Demo and Production
                </h2>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                  The transition from demo to production introduces distribution
                  shift. The characteristics of real claims differ in meaningful
                  ways from test data.
                </p>

                <div className="space-y-6">
                  {/* Coverage categories */}
                  <div className="glass-panel p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Layers className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[var(--text-primary)]">
                          Coverage Complexity
                        </h3>
                        <p className="text-sm text-[var(--text-muted)]">
                          5 modelled categories vs 13 required in production
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      We initially modelled 5 coverage categories. Production
                      required 13. When additional categories entered the
                      pipeline the system produced confident but incorrect
                      outputs. After expanding coverage logic accuracy improved
                      by 34 percentage points in a single iteration.
                    </p>
                    <div className="mt-4 p-3 bg-emerald-500/10 rounded-lg">
                      <p className="text-sm font-medium text-emerald-400">
                        The model was not unstable. The domain model was
                        incomplete.
                      </p>
                    </div>
                  </div>

                  {/* Language */}
                  <div className="glass-panel p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[var(--text-primary)]">
                          Language Complexity
                        </h3>
                        <p className="text-sm text-[var(--text-muted)]">
                          German and French require separate handling
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      German and French claims required separate vocabularies and
                      handling logic. German compound words behave differently
                      from French terminology. Without explicit modelling entire
                      classes of valid claims were rejected.
                    </p>
                  </div>

                  {/* Document structure */}
                  <div className="glass-panel p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <Target className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[var(--text-primary)]">
                          Document Structure
                        </h3>
                        <p className="text-sm text-[var(--text-muted)]">
                          Layout variations cause extraction errors
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      Multi-column invoices, page breaks, duplicated line items,
                      and layout differences led to missing or double-counted
                      amounts when extraction logic was not format aware.
                    </p>
                  </div>
                </div>

                <p className="text-[var(--text-secondary)] leading-relaxed mt-6">
                  These are standard operational realities. They are not rare
                  edge cases. If a pilot has not been stress tested against these
                  conditions, reported accuracy is only partially informative.
                </p>
              </MotionDiv>

              {/* The Three Metrics That Matter */}
              <MotionDiv {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  The Three Metrics That Matter
                </h2>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                  A single accuracy number hides operational trade-offs. Three
                  metrics provide better visibility into production readiness.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="p-5 rounded-lg border bg-red-500/10 border-red-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-red-400">
                        False Approve Rate
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mb-2">
                      This measures financial exposure. A false approval means a
                      claim was paid incorrectly. Even a small percentage can
                      materially affect leakage and audit exposure.
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      In early iterations our false approve rate was 44%.
                      Reducing it below 5% required structured domain expansion,
                      vocabulary refinement, and threshold calibration.
                    </p>
                  </div>

                  <div className="p-5 rounded-lg border bg-amber-500/10 border-amber-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-amber-400">
                        False Deny Rate
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">
                      This measures customer and operational impact. Incorrect
                      denials lead to complaints, rework, escalation, and
                      reputational risk.
                    </p>
                  </div>

                  <div className="p-5 rounded-lg border bg-blue-500/10 border-blue-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-blue-400">
                        Refer Rate
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">
                      This measures automation depth. If a large percentage of
                      claims are referred to human reviewers the system has not
                      materially reduced workload.
                    </p>
                  </div>
                </div>

                <div className="glass-panel-light p-6">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
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
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  What Moves a Pilot Forward
                </h2>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  Progress did not come from replacing technology. It came from
                  disciplined evaluation cycles.
                </p>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                  We constructed a 50-claim holdout dataset stratified by
                  outcome, value, language, and structural complexity. A senior
                  adjuster labelled each claim. That dataset was quarantined and
                  never used for tuning.
                </p>

                <div className="glass-panel p-6 mb-6">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                    The Iteration Loop
                  </h3>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {["Measure", "Diagnose", "Correct", "Retest"].map(
                      (step, i) => (
                        <div key={step} className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                            <span className="text-sm font-bold text-[var(--primary)]">
                              {i + 1}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-[var(--text-primary)]">
                            {step}
                          </span>
                          {i < 3 && (
                            <ArrowRight className="w-4 h-4 text-[var(--text-muted)]" />
                          )}
                        </div>
                      )
                    )}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Every iteration followed the same loop. A hybrid
                    architecture proved necessary. Deterministic rules handled
                    clear coverage definitions and structured logic. Language
                    models handled ambiguous descriptions and contextual
                    interpretation. Each component was constrained to the role it
                    performs best.
                  </p>
                </div>

                <div className="glass-panel p-6 mb-6">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                    Confidence Thresholds by Design
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Confidence thresholds were asymmetric by design. Approvals
                    required higher confidence than denials. Low confidence
                    decisions were routed to human review to protect against
                    financial exposure.
                  </p>
                </div>

                {/* Results callout */}
                <div className="glass-panel p-6 border-l-4 border-l-emerald-500">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                    <h3 className="font-semibold text-[var(--text-primary)]">
                      Results
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-[var(--subtle-bg)] rounded-lg">
                      <div className="text-2xl font-bold text-[var(--primary)]">
                        47
                      </div>
                      <div className="text-xs text-[var(--text-muted)]">
                        Iterations
                      </div>
                    </div>
                    <div className="text-center p-3 bg-[var(--subtle-bg)] rounded-lg">
                      <div className="text-2xl font-bold text-red-400">18%</div>
                      <div className="text-xs text-[var(--text-muted)]">
                        Starting accuracy
                      </div>
                    </div>
                    <div className="text-center p-3 bg-[var(--subtle-bg)] rounded-lg">
                      <div className="text-2xl font-bold text-emerald-400">
                        98%
                      </div>
                      <div className="text-xs text-[var(--text-muted)]">
                        Final accuracy
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">
                    The largest single improvement resulted from expanding
                    coverage categories, not from changing models. Domain
                    modelling and measurement discipline were the primary drivers
                    of stability.
                  </p>
                </div>
              </MotionDiv>

              {/* Operational Takeaway */}
              <MotionDiv {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Operational Takeaway
                </h2>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
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
                      <CheckCircle className="w-5 h-5 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--text-secondary)]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="glass-panel p-6 border-l-4 border-l-[var(--primary)]">
                  <p className="text-[var(--text-primary)] leading-relaxed">
                    Claims automation is viable. It requires honest measurement,
                    clear metrics, and deliberate domain engineering.
                  </p>
                </div>

                <p className="mt-6 text-[var(--text-secondary)] leading-relaxed">
                  If you are evaluating a pilot or preparing for production
                  deployment and want to benchmark your approach against a
                  structured holdout framework, we are available to share how we
                  structure evaluation and iteration.
                </p>
              </MotionDiv>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <MotionDiv
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-panel p-6"
              >
                <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                  Key Takeaways
                </h3>
                <ul className="space-y-3">
                  {[
                    "Dev set accuracy masks production gaps",
                    "Holdout sets reveal real performance",
                    "Track false approvals, false denials, and refer rate",
                    "Domain modelling drives more improvement than model changes",
                    "Asymmetric confidence thresholds protect against financial risk",
                    "47 iterations: 18% to 98% on holdout set",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[var(--text-secondary)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-[var(--border)]">
                  <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
                    Related Topics
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Claims AI",
                      "Production Readiness",
                      "Evaluation",
                      "Accuracy",
                      "Holdout Sets",
                      "Domain Modelling",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-1 rounded bg-[var(--subtle-bg)] text-[var(--text-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--border)]">
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors"
                  >
                    Talk to Us
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </MotionDiv>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 to-[var(--background)]">
        <div className="max-w-4xl mx-auto text-center">
          <MotionDiv {...fadeIn}>
            <BarChart3 className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              Ready to Move Beyond the Pilot?
            </h2>
            <p className="text-lg text-gray-300 mb-10">
              We can help you structure evaluation frameworks that turn pilots
              into production-ready systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/case-studies/vehicle-warranty-claims"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--primary-light)] transition-colors text-lg"
              >
                See It in Action
              </Link>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
