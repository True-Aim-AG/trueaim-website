import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { ProductHero } from "@/components/products/ProductHero";
import { ButtonLink } from "@/components/brand/Button";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { Glow } from "@/components/brand/Glow";

const pipelineIcons: BrandIconName[] = ["ingestion", "classification", "extraction", "quality", "human-review"];

const outputFeatureKeys = ["cleanDataset", "qualityStatus", "evidenceLinks", "humanLabels"] as const;
const outputFeatureIcons: BrandIconName[] = ["structured-data", "quality", "traceability", "human-review"];

const metricValues = ["95%", "99%", "96%", "<1%"];
const metricKeys = ["coverage", "accuracy", "evidenceRate", "errorRate"] as const;

export default async function ContextBuilderPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contextBuilder");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ProductHero
        badge={t("hero.badge")}
        headline={t("hero.title")}
        description={t("hero.subtitle")}
        primaryCTA={{ label: t("hero.ctaPrimary"), href: "/contact" }}
        secondaryCTA={{ label: t("hero.ctaSecondary"), href: "/contact" }}
        graphic={
          <>
            <Glow size={320} opacity={0.6} className="absolute left-0 top-0" />
            <BrandIcon name="extraction" size={220} className="absolute left-[50px] top-[50px]" />
          </>
        }
      />

      {/* Problem Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center bg-card shadow-card rounded-pill p-8 md:p-12"
          >
            <h2 className="font-display text-4xl font-bold leading-[1.15] text-strong md:text-[48px] mb-6">
              {t("problem.title")}
            </h2>
            <p className="text-lede text-body">
              {t("problem.description")}
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold leading-[1.15] text-strong md:text-[48px] mb-6">
              {t("solution.title")}
            </h2>
            <p className="text-lede text-body">
              {t("solution.description")}
            </p>
            <p className="text-lg text-strong font-medium mt-4">
              {t("solution.result")}
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Pipeline Steps */}
      <section className="pt-10 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold leading-[1.15] text-strong md:text-[48px] mb-4">
              {t("pipeline.title")}
            </h2>
            <p className="text-lg text-body">
              {t("pipeline.subtitle")}
            </p>
          </MotionDiv>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[1, 2, 3, 4, 5].map((step, index) => {
                const icon = pipelineIcons[index];
                return (
                  <MotionDiv
                    key={step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="bg-card shadow-card rounded-pill p-6 h-full text-center transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch">
                      <div className="w-12 h-12 rounded-full bg-accent text-on-brand flex items-center justify-center text-lg font-bold mx-auto mb-4 relative z-10">
                        {step}
                      </div>

                      <div className="w-14 h-14 rounded-pill bg-lilac grid place-items-center mx-auto mb-4">
                        <BrandIcon name={icon} size={28} />
                      </div>

                      <h3 className="font-display font-semibold text-lg text-strong mb-2">
                        {t(`pipeline.steps.${step}.title`)}
                      </h3>
                      <p className="text-sm text-muted">
                        {t(`pipeline.steps.${step}.description`)}
                      </p>
                    </div>
                  </MotionDiv>
                );
              })}
            </div>
          </div>

          {/* Data Sovereignty Note */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 bg-card shadow-card rounded-pill p-6 text-center max-w-3xl mx-auto"
          >
            <p className="text-sm text-body">
              {t.rich("pipeline.dataSovereigntyNote", {
                trustCenterLink: (chunks) => (
                  <Link href="/trust" className="text-link hover:underline">
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Output Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold leading-[1.15] text-strong md:text-[48px] mb-4">
              {t("output.title")}
            </h2>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {outputFeatureKeys.map((key, index) => {
              const icon = outputFeatureIcons[index];
              return (
                <MotionDiv
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card shadow-card rounded-pill p-6 transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch"
                >
                  <div className="w-12 h-12 rounded-pill bg-lilac grid place-items-center mb-4">
                    <BrandIcon name={icon} size={24} />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-strong mb-2">
                    {t(`output.features.${key}.title`)}
                  </h3>
                  <p className="text-sm text-body">
                    {t(`output.features.${key}.description`)}
                  </p>
                </MotionDiv>
              );
            })}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold leading-[1.15] text-strong md:text-[48px] mb-4">
              {t("metrics.title")}
            </h2>
          </MotionDiv>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metricKeys.map((key, index) => (
              <MotionDiv
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center bg-card shadow-card rounded-pill p-8"
              >
                <p className="text-kpi-lg text-accent mb-2">
                  {metricValues[index]}
                </p>
                <p className="text-body text-sm">
                  {t(`metrics.items.${key}.label`)}
                </p>
                {key === "errorRate" && (
                  <p className="text-xs text-muted mt-1 italic">
                    {t(`metrics.items.${key}.footnote`)}
                  </p>
                )}
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-theme="dark" className="relative overflow-hidden bg-page-tint py-20 px-6">
        <Glow variant="soft" size={480} className="absolute -right-40 -top-40" />
        <div className="relative max-w-4xl mx-auto text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl font-bold leading-[1.15] text-strong md:text-[48px] mb-6">
              {t("cta.title")}
            </h2>
            <p className="text-lg text-body mb-10">
              {t("cta.description")}
            </p>
            <ButtonLink href="/contact" variant="primary" size="lg">
              {t("cta.button")}
            </ButtonLink>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
