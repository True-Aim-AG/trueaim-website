import { getTranslations, setRequestLocale } from "next-intl/server";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { ProductHero } from "@/components/products/ProductHero";
import { ButtonLink } from "@/components/brand/Button";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { Glow } from "@/components/brand/Glow";
import { Globe, Plug, Clock, DollarSign, TrendingDown } from "lucide-react";

const workflowIcons: BrandIconName[] = ["ingestion", "extraction", "decision", "workflow", "traceability"];

const capabilityKeys = ["coverageDetermination", "multiVertical", "integration", "compliance"] as const;

const metricKeys = ["speed", "cost", "leakage"] as const;
const metricValues = ["92%", "71%", "2-5%"];
const metricIcons = [Clock, DollarSign, TrendingDown];

export default async function MiraPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("mira");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ProductHero
        badge={t("hero.badge")}
        headline={t("hero.title")}
        description={t("hero.subtitle")}
        supportingText={t("hero.description")}
        primaryCTA={{ label: t("hero.ctaPrimary"), href: "/contact" }}
        secondaryCTA={{ label: t("hero.ctaSecondary"), href: "/contact" }}
        graphic={
          <>
            <Glow size={320} opacity={0.6} className="absolute left-0 top-0" />
            <BrandIcon name="mira" size={220} className="absolute left-[50px] top-[50px]" />
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
              {t("problem.paragraph1")}
              <br /><br />
              {t("problem.paragraph2")}
              <br /><br />
              {t("problem.paragraph3")}
            </p>
            <p className="text-xl font-semibold text-accent mt-6">
              {t("problem.cta")}
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

      {/* Workflow Steps */}
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
              {t("workflow.title")}
            </h2>
            <p className="text-lg text-body">
              {t("workflow.subtitle")}
            </p>
          </MotionDiv>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[1, 2, 3, 4, 5].map((step, index) => {
                const icon = workflowIcons[index];
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
                        {t(`workflow.steps.${step}.title`)}
                      </h3>
                      <p className="text-sm text-muted">
                        {t(`workflow.steps.${step}.description`)}
                      </p>
                    </div>
                  </MotionDiv>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
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
              {t("capabilities.title")}
            </h2>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilityKeys.map((key, index) => {
              const icon =
                key === "coverageDetermination" ? (
                  <BrandIcon name="rules" size={28} />
                ) : key === "compliance" ? (
                  <BrandIcon name="control" size={28} />
                ) : key === "multiVertical" ? (
                  <Globe className="w-7 h-7 text-accent" strokeWidth={1.5} />
                ) : (
                  <Plug className="w-7 h-7 text-accent" strokeWidth={1.5} />
                );
              return (
                <MotionDiv
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card shadow-card rounded-pill p-8 transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch"
                >
                  <div className="w-14 h-14 rounded-pill bg-lilac grid place-items-center mb-6">
                    {icon}
                  </div>
                  <h3 className="font-display font-semibold text-xl text-strong mb-3">
                    {t(`capabilities.items.${key}.title`)}
                  </h3>
                  <p className="text-body leading-relaxed whitespace-pre-line">
                    {t(`capabilities.items.${key}.description`)}
                  </p>
                </MotionDiv>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Section */}
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
              {t("results.title")}
            </h2>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metricKeys.map((key, index) => {
              const Icon = metricIcons[index];
              const value = metricValues[index];
              const hasPrefix = key !== "leakage";
              return (
                <MotionDiv
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center bg-card shadow-card rounded-pill p-8"
                >
                  <div className="w-16 h-16 rounded-pill bg-lilac grid place-items-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-accent" strokeWidth={1.5} />
                  </div>
                  <p className="text-caption-sm text-subtle mb-1" style={{ visibility: hasPrefix ? 'visible' : 'hidden' }}>
                    {hasPrefix ? t(`results.metrics.${key}.prefix`) : ' '}
                  </p>
                  <p className="text-kpi-lg text-accent mb-2">
                    {value}
                  </p>
                  <p className="text-body">
                    {t(`results.metrics.${key}.label`)}
                  </p>
                </MotionDiv>
              );
            })}
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
