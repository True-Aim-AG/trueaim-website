import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Building2, Clock } from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import { ButtonLink } from "@/components/brand/Button";
import { GridPattern } from "@/components/brand/GridPattern";
import { Summary } from "@/components/content";
import type { Metadata } from "next";
import { PageSeo } from "@/components/seo/PageSeo";
import { pageMetadata } from "@/lib/seo/metadata";

// Only finished case studies are listed. The three studies still marked as
// work in progress keep their URLs but are not shown here (Reuben, 5 Oct 2026).
const published = caseStudies.filter((cs) => !cs.wip);

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/case-studies");
}

export default async function CaseStudiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("caseStudies");
  return (
    <div className="min-h-screen">
      <PageSeo locale={locale} path="/case-studies" template="collection" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <GridPattern className="absolute right-0 top-0 hidden h-[600px] w-[746px] lg:block" />
        <div className="relative max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-12">
          <h1 className="font-display text-[40px] font-bold leading-[1.05] text-strong sm:text-[48px] lg:text-[54px] mb-6">
            {t("hero.title")}
          </h1>
          <Summary>{t("hero.summary")}</Summary>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {published.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="block bg-card shadow-card rounded-pill p-8 md:p-10 group transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="icon-plate w-14 h-14">
                      <Building2 className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="font-medium text-strong text-lg">{study.customer.name}</div>
                      <div className="text-sm text-muted">{study.customer.industry}</div>
                    </div>
                  </div>

                  <h2 className="font-display text-2xl md:text-3xl font-bold text-strong mb-4">{study.title}</h2>

                  <p className="text-body leading-[1.6] mb-6">{study.challenge}</p>

                  <div className="flex items-center gap-2 text-sm text-muted mb-6">
                    <Clock className="w-4 h-4" strokeWidth={1.5} />
                    {study.timeline}
                  </div>

                  <span className="inline-flex items-center gap-2 text-link font-semibold text-lg">
                    {t("featured.readFullStudy")}
                    <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
                  </span>
                </div>

                <div className="flex flex-col justify-center">
                  <dl className="grid grid-cols-2 gap-4">
                    {study.metrics.map((metric) => (
                      <div key={metric.label} className="bg-surface-muted rounded-pill px-[29px] py-[27px] text-center">
                        <dd className="text-kpi text-accent mb-1">{metric.value}</dd>
                        <dt className="text-xs text-muted">{metric.label}</dt>
                        {metric.improvement && <dd className="text-[10px] text-subtle mt-1">{metric.improvement}</dd>}
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section data-theme="dark" className="py-20 px-6 bg-page-tint">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-[1.15] text-strong mb-6">
            {t("cta.heading")}
          </h2>
          <p className="text-lede text-body mb-10 max-w-2xl mx-auto">{t("cta.description")}</p>
          <ButtonLink href="/contact" variant="primary" size="lg">
            {t("cta.bookDemo")}
            <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
