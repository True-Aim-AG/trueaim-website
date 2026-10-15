import { getTranslations, setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { Calculator, ArrowRight, CheckCircle } from "lucide-react";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { ButtonLink } from "@/components/brand/Button";
import { GridPattern } from "@/components/brand/GridPattern";

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
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <GridPattern className="absolute right-0 top-0 hidden h-[600px] w-[746px] lg:block" />
        <div className="relative max-w-7xl mx-auto px-6 pt-20 md:pt-28 pb-16">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-12"
          >
            <Eyebrow className="inline-flex items-center gap-2 mb-6">
              <Calculator strokeWidth={1.5} className="w-4 h-4" />
              {t("hero.badge")}
            </Eyebrow>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-strong mb-6">
              {t("hero.titleLine1")}
              <br />
              <span className="text-accent">{t("hero.titleLine2")}</span>
            </h1>

            <p className="text-lede text-body max-w-3xl mx-auto mb-8">
              {t("hero.description")}
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              {benefitKeys.map((key) => (
                <div key={key} className="flex items-center gap-2 text-sm text-muted">
                  <CheckCircle strokeWidth={1.5} className="w-4 h-4 text-accent" />
                  {t(`hero.benefits.${key}`)}
                </div>
              ))}
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 px-6 -mt-12">
        <div className="max-w-6xl mx-auto">
          <ROICalculator />
        </div>
      </section>

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
            <p className="text-lede text-body mb-10 max-w-2xl mx-auto">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                {t("cta.bookDemo")}
                <ArrowRight strokeWidth={1.5} className="w-5 h-5" />
              </ButtonLink>
              <ButtonLink href="/platform/claims-decisioning" variant="on-dark" size="lg">
                {t("cta.seeMira")}
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
