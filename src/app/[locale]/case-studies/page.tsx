import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
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
import { Eyebrow } from "@/components/brand/Eyebrow";
import { StatusPill } from "@/components/brand/StatusPill";
import { ButtonLink } from "@/components/brand/Button";
import { GridPattern } from "@/components/brand/GridPattern";

const featured = caseStudies.find((cs) => !cs.wip);
const wipStudies = caseStudies.filter((cs) => cs.wip);

export default async function CaseStudiesPage() {
  const t = await getTranslations("caseStudies");
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <GridPattern className="absolute right-0 top-0 hidden h-[600px] w-[746px] lg:block" />

        <div className="relative max-w-7xl mx-auto text-center px-6 pt-20 md:pt-28 pb-16">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <Eyebrow className="inline-flex items-center gap-2 mb-6">
              <TrendingUp className="w-4 h-4" strokeWidth={1.5} />
              {t("hero.badge")}
            </Eyebrow>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-strong mb-6">
              {t("hero.titleLine1")}
              <br />
              <span className="text-accent">{t("hero.titleLine2")}</span>
            </h1>

            <p className="text-lede text-body max-w-3xl mx-auto">
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
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <Link
                href={`/case-studies/${featured.slug}`}
                className="block bg-card shadow-card rounded-pill p-8 md:p-10 group relative transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch"
              >
                {/* Featured badge */}
                <div className="absolute top-6 right-6">
                  <span className="rounded-pill bg-accent-soft text-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                    {t("featured.badge")}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left: Info */}
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="icon-plate w-14 h-14">
                        <Building2 className="w-7 h-7" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="font-medium text-strong text-lg">
                          {featured.customer.name}
                        </div>
                        <div className="text-sm text-muted">
                          {featured.customer.industry} ·{" "}
                          {featured.customer.size}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-strong mb-4">
                      {featured.title}
                    </h2>

                    {/* Challenge excerpt */}
                    <p className="text-body leading-relaxed mb-6 line-clamp-3">
                      {featured.challenge}
                    </p>

                    {/* Products */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featured.products.map((product) => (
                        <span
                          key={product}
                          className={`text-xs px-3 py-1 font-medium ${productPillColors[product]}`}
                        >
                          {productNames[product]}
                        </span>
                      ))}
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center gap-2 text-sm text-muted mb-6">
                      <Clock className="w-4 h-4" strokeWidth={1.5} />
                      {featured.timeline}
                    </div>

                    {/* Quote */}
                    {featured.quote && (
                      <div className="mb-6">
                        <Quote className="w-6 h-6 text-accent opacity-40 mb-2" strokeWidth={1.5} />
                        <p className="text-sm text-body italic line-clamp-2">
                          &ldquo;{featured.quote.text}&rdquo;
                        </p>
                      </div>
                    )}

                    {/* Link */}
                    <div className="inline-flex items-center gap-2 text-link font-semibold text-lg">
                      {t("featured.readFullStudy")}
                      <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Right: Metrics */}
                  <div className="flex flex-col justify-center">
                    <div className="grid grid-cols-2 gap-4">
                      {featured.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="bg-surface-muted rounded-pill px-[29px] py-[27px] text-center"
                        >
                          <div className="text-kpi text-accent mb-1">
                            {metric.value}
                          </div>
                          <div className="text-xs text-muted">
                            {metric.label}
                          </div>
                          {metric.improvement && (
                            <div className="text-[10px] text-subtle mt-1">
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
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="mb-8"
            >
              <div className="flex items-center gap-3">
                <Construction className="w-5 h-5 text-muted" strokeWidth={1.5} />
                <h2 className="text-xl font-semibold text-muted">
                  {t("wip.heading")}
                </h2>
              </div>
              <p className="text-sm text-muted mt-2 ml-8">
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
                  transition={{ duration: 0.4, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                  className="bg-card shadow-card rounded-pill p-6 opacity-70"
                >
                  {/* WIP badge */}
                  <div className="mb-4">
                    <StatusPill tone="progress" size="sm">{t("wip.badge")}</StatusPill>
                  </div>

                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="icon-plate w-10 h-10">
                      <Building2 className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="font-medium text-strong text-sm">
                        {study.customer.name}
                      </div>
                      <div className="text-xs text-muted">
                        {study.customer.industry}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-sm font-semibold text-strong mb-3">
                    {study.title}
                  </h3>

                  {/* Two key metrics */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {study.metrics.slice(0, 2).map((metric) => (
                      <div
                        key={metric.label}
                        className="bg-surface-muted rounded-pill p-2 text-center"
                      >
                        <div className="text-lg font-display font-semibold tabular-nums text-muted">
                          {metric.value}
                        </div>
                        <div className="text-[10px] text-muted">
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
                        className="text-[10px] px-2 py-0.5 rounded-pill font-medium bg-surface-muted text-muted"
                      >
                        {productNames[product]}
                      </span>
                    ))}
                  </div>
                </MotionDiv>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section data-theme="dark" className="py-20 px-6 bg-page-tint">
        <div className="max-w-4xl mx-auto text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
              {t("cta.heading")}
            </h2>
            <p className="text-lg text-body mb-10 max-w-2xl mx-auto">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                {t("cta.bookDemo")}
                <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
              </ButtonLink>
              <ButtonLink href="/impact-estimator" variant="on-dark" size="lg">
                {t("cta.getEstimate")}
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
