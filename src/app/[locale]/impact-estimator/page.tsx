import { getTranslations, setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import { ArrowRight, CheckCircle } from "lucide-react";
import { ButtonLink, buttonClasses } from "@/components/brand/Button";
import { GridPattern } from "@/components/brand/GridPattern";
import { Summary } from "@/components/content";

const ROICalculator = dynamic(
  () => import("@/components/calculator/ROICalculator").then((m) => m.ROICalculator)
);

const benefitKeys = ["conservative", "pilotData", "instant"] as const;

export default async function ImpactEstimatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("impact");
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <GridPattern className="absolute right-0 top-0 hidden h-[600px] w-[746px] lg:block" />
        <div className="relative max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-12">
          <h1 className="font-display text-[40px] font-bold leading-[1.05] text-strong sm:text-[48px] lg:text-[54px] mb-6">
            {t("hero.title")}
          </h1>
          <Summary>{t("hero.summary")}</Summary>
          <div className="mt-8">
            <a href="#estimator" className={buttonClasses("primary", "lg")}>
              {t("hero.button")}
              <ArrowRight strokeWidth={1.5} className="w-5 h-5" />
            </a>
          </div>
          <ul className="flex flex-wrap gap-4 mt-8">
            {benefitKeys.map((key) => (
              <li key={key} className="flex items-center gap-2 text-sm text-muted">
                <CheckCircle strokeWidth={1.5} className="w-4 h-4 text-accent" />
                {t(`hero.benefits.${key}`)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Estimator */}
      <section id="estimator" className="py-12 px-6 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <ROICalculator />
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
            <ArrowRight strokeWidth={1.5} className="w-5 h-5" />
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
