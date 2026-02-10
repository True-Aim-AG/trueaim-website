import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { ArrowRight, Building2, TrendingUp, Quote } from "lucide-react";
import { caseStudies } from "@/data/case-studies";

const productColors: Record<string, string> = {
  mira: "bg-indigo-100 text-indigo-700",
  contextbuilder: "bg-teal-100 text-teal-700",
  claimeval: "bg-blue-100 text-blue-700",
};

const productNames: Record<string, string> = {
  mira: "MIRA",
  contextbuilder: "ContextBuilder",
  claimeval: "ClaimEval",
};

export async function SocialProof() {
  const t = await getTranslations("socialProof");

  // Only show published (non-WIP) case studies on the homepage
  const featured = caseStudies.find((cs) => !cs.wip);

  if (!featured) return null;

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            {t("badge")}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </MotionDiv>

        {/* Featured case study - full width */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            href={`/case-studies/${featured.slug}`}
            className="block glass-panel glass-panel-hover p-8 group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Info */}
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[var(--subtle-bg)] flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-[var(--text-muted)]" />
                  </div>
                  <div>
                    <div className="font-medium text-[var(--text-primary)]">
                      {featured.customer.name}
                    </div>
                    <div className="text-sm text-[var(--text-muted)]">
                      {featured.customer.industry}{featured.customer.size && ` · ${featured.customer.size}`}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-4 group-hover:text-[var(--primary)] transition-colors">
                  {featured.title}
                </h3>

                {/* Products */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {featured.products.map((product) => (
                    <span
                      key={product}
                      className={`text-xs px-2 py-1 rounded-full font-medium ${productColors[product]}`}
                    >
                      {productNames[product]}
                    </span>
                  ))}
                </div>

                {/* Quote preview */}
                {featured.quote && (
                  <div className="mb-6">
                    <Quote className="w-6 h-6 text-[var(--primary)] opacity-30 mb-2" />
                    <p className="text-sm text-[var(--text-secondary)] italic line-clamp-2">
                      &ldquo;{featured.quote.text}&rdquo;
                    </p>
                  </div>
                )}

                {/* Link */}
                <div className="flex items-center gap-2 text-[var(--primary)] font-medium group-hover:gap-3 transition-all">
                  {t("readCaseStudy")}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Right: Key Metrics */}
              <div className="grid grid-cols-2 gap-4 content-center">
                {featured.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="glass-panel-light p-4 text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold font-mono-data text-[var(--primary)]">
                      {metric.value}
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">
                      {metric.label}
                    </div>
                    {metric.improvement && (
                      <div className="text-xs text-[var(--secondary)] mt-1">
                        {metric.improvement}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Link>
        </MotionDiv>

        {/* View all link */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--primary-light)] transition-all"
          >
            {t("viewAllCaseStudies")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </MotionDiv>
      </div>
    </section>
  );
}
