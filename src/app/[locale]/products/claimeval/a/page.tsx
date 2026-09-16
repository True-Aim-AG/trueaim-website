import { getTranslations, setRequestLocale } from "next-intl/server";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { ButtonLink, buttonClasses } from "@/components/brand/Button";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { ArrowRight, Car, Home } from "lucide-react";

const featureKeys = ["riskScoring", "inspectionCatalogues", "reviewerWorkflow"] as const;
const featureIcons: BrandIconName[] = ["rule-applied", "quality", "human-review"];

export default async function ClaimEvalPageA({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("claimEvalA");

  const motorZones = [1, 2, 3, 4, 5, 6, 7] as const;
  const homeZones = [1, 2, 3, 4, 5] as const;

  return (
    <div className="min-h-screen">
      {/* Version indicator */}
      <div className="fixed top-20 right-4 z-50 px-3 py-1.5 rounded-pill bg-accent-soft text-accent text-xs font-medium">
        {t("versionIndicator")}
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[640px]"
          >
            <Eyebrow>{t("hero.badge")}</Eyebrow>

            <h1 className="mt-4 font-display text-[40px] font-bold leading-[1.05] text-strong sm:text-[48px] lg:text-[54px]">
              {t("hero.title")}
            </h1>

            <p className="mt-[26px] text-lede text-body">
              {t("hero.subtitle")}
            </p>
            <p className="mt-4 text-body">
              {t("hero.description")}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3.5">
              <a href="#demo" className={buttonClasses("primary", "lg")}>
                {t("hero.ctaPrimary")}
              </a>
              <ButtonLink href="/contact" variant="secondary" size="lg">
                {t("hero.ctaSecondary")}
                <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>

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
          </MotionDiv>
        </div>
      </section>

      {/* Features Section */}
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
              {t("features.title")}
            </h2>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureKeys.map((key, index) => {
              const icon = featureIcons[index];
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
                    <BrandIcon name={icon} size={28} />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-strong mb-3">
                    {t(`features.items.${key}.title`)}
                  </h3>
                  <p className="text-body leading-relaxed">
                    {t(`features.items.${key}.description`)}
                  </p>
                </MotionDiv>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl font-bold leading-[1.15] text-strong md:text-[48px] mb-4">
              {t("demo.title")}
            </h2>
            <p className="text-lg text-body">
              {t("demo.subtitle")}
            </p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden shadow-card"
          >
            <div className="aspect-[16/9] w-full">
              <iframe
                src="https://claimeval.vercel.app/claims"
                className="w-full h-full"
                title={t("demo.iframeTitle")}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Inspection Zones Section */}
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
              {t("inspectionZones.title")}
            </h2>
            <p className="text-lg text-body">
              {t("inspectionZones.subtitle")}
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Motor */}
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card shadow-card rounded-pill p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-pill bg-lilac grid place-items-center">
                  <Car className="w-7 h-7 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-semibold text-strong">
                  {t("inspectionZones.motor.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {motorZones.map((zone) => (
                  <li key={zone} className="flex items-center gap-3 text-body">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    {t(`inspectionZones.motor.zones.${zone}`)}
                  </li>
                ))}
              </ul>
            </MotionDiv>

            {/* Home */}
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card shadow-card rounded-pill p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-pill bg-lilac grid place-items-center">
                  <Home className="w-7 h-7 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-semibold text-strong">
                  {t("inspectionZones.home.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {homeZones.map((zone) => (
                  <li key={zone} className="flex items-center gap-3 text-body">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    {t(`inspectionZones.home.zones.${zone}`)}
                  </li>
                ))}
              </ul>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card shadow-card rounded-pill p-12 text-center"
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
