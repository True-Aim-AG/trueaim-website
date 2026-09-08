import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowRight,
  Building2,
  Clock,
  TrendingUp,
  Quote,
  Construction,
} from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import { productPillColors, productNames } from "@/lib/product-styles";

const featured = caseStudies.find((cs) => !cs.wip);
const wipStudies = caseStudies.filter((cs) => cs.wip);

export default async function CaseStudiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("caseStudies");
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[var(--background)] to-slate-900">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[var(--primary)] opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--secondary)] opacity-10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              {t("hero.badge")}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              {t("hero.titleLine1")}
              <br />
              <span className="text-[var(--primary)]">{t("hero.titleLine2")}</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              {t("hero.description")}
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Featured Case Study */}
      {featured && (
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href={`/case-studies/${featured.slug}`}
                className="block glass-panel glass-panel-hover p-8 md:p-10 group relative overflow-hidden"
              >
                {/* Featured badge */}
                <div className="absolute top-6 right-6">
                  <span className="px-3 py-1.5 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-xs font-semibold uppercase tracking-wider">
                    {t("featured.badge")}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left: Info */}
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-14 h-14 rounded-xl bg-[var(--subtle-bg)] flex items-center justify-center">
                        <Building2 className="w-7 h-7 text-[var(--text-muted)]" />
                      </div>
                      <div>
                        <div className="font-medium text-[var(--text-primary)] text-lg">
                          {featured.customer.name}
                        </div>
                        <div className="text-sm text-[var(--text-muted)]">
                          {featured.customer.industry} ·{" "}
                          {featured.customer.size}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4 group-hover:text-[var(--primary)] transition-colors">
                      {featured.title}
                    </h2>

                    {/* Challenge excerpt */}
                    <p className="text-[var(--text-secondary)] leading-relaxed mb-6 line-clamp-3">
                      {featured.challenge}
                    </p>

                    {/* Products */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featured.products.map((product) => (
                        <span
                          key={product}
                          className={`text-xs px-2.5 py-1 rounded-full font-medium ${productPillColors[product]} transition-colors`}
                        >
                          {productNames[product]}
                        </span>
                      ))}
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
                      <Clock className="w-4 h-4" />
                      {featured.timeline}
                    </div>

                    {/* Quote */}
                    {featured.quote && (
                      <div className="mb-6">
                        <Quote className="w-6 h-6 text-[var(--primary)] opacity-30 mb-2" />
                        <p className="text-sm text-[var(--text-secondary)] italic line-clamp-2">
                          &ldquo;{featured.quote.text}&rdquo;
                        </p>
                      </div>
                    )}

                    {/* Link */}
                    <div className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold group-hover:gap-3 transition-all text-lg">
                      {t("featured.readFullStudy")}
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Right: Metrics */}
                  <div className="flex flex-col justify-center">
                    <div className="grid grid-cols-2 gap-4">
                      {featured.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="glass-panel-light p-5 text-center"
                        >
                          <div className="text-3xl md:text-4xl font-bold font-mono-data text-[var(--primary)] mb-1">
                            {metric.value}
                          </div>
                          <div className="text-xs text-[var(--text-muted)]">
                            {metric.label}
                          </div>
                          {metric.improvement && (
                            <div className="text-[10px] text-[var(--secondary)] mt-1">
                              {metric.improvement}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </MotionDiv>
          </div>
        </section>
      )}

      {/* WIP Case Studies */}
      {wipStudies.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3">
                <Construction className="w-5 h-5 text-[var(--text-muted)]" />
                <h2 className="text-xl font-semibold text-[var(--text-muted)]">
                  {t("wip.heading")}
                </h2>
              </div>
              <p className="text-sm text-[var(--text-muted)] mt-2 ml-8">
                {t("wip.description")}
              </p>
            </MotionDiv>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {wipStudies.map((study, index) => (
                <MotionDiv
                  key={study.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass-panel p-6 opacity-60 relative overflow-hidden"
                >
                  {/* WIP overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/40 to-transparent pointer-events-none" />

                  <div className="relative">
                    {/* WIP badge */}
                    <div className="mb-4">
                      <span className="px-2 py-1 rounded text-[10px] font-medium uppercase tracking-wider bg-[var(--subtle-bg)] text-[var(--text-muted)]">
                        {t("wip.badge")}
                      </span>
                    </div>

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[var(--subtle-bg)] flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-[var(--text-muted)]" />
                      </div>
                      <div>
                        <div className="font-medium text-[var(--text-primary)] text-sm">
                          {study.customer.name}
                        </div>
                        <div className="text-xs text-[var(--text-muted)]">
                          {study.customer.industry}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                      {study.title}
                    </h3>

                    {/* Two key metrics */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {study.metrics.slice(0, 2).map((metric) => (
                        <div
                          key={metric.label}
                          className="glass-panel-light p-2 text-center"
                        >
                          <div className="text-lg font-bold font-mono-data text-[var(--text-muted)]">
                            {metric.value}
                          </div>
                          <div className="text-[10px] text-[var(--text-muted)]">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Products */}
                    <div className="flex flex-wrap gap-1.5">
                      {study.products.map((product) => (
                        <span
                          key={product}
                          className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-[var(--subtle-bg)] text-[var(--text-muted)]"
                        >
                          {productNames[product]}
                        </span>
                      ))}
                    </div>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 to-[var(--background)]">
        <div className="max-w-4xl mx-auto text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              {t("cta.heading")}
            </h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg"
              >
                {t("cta.bookDemo")}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/impact-estimator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--primary-light)] transition-colors text-lg"
              >
                {t("cta.getEstimate")}
              </Link>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
