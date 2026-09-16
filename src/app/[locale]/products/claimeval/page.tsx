import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { ProductHero } from "@/components/products/ProductHero";
import { ButtonLink } from "@/components/brand/Button";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { Glow } from "@/components/brand/Glow";
import { ArrowRight, Car, Home, Heart, Wrench } from "lucide-react";

const featureKeys = ["riskScoring", "inspectionCatalogues", "reviewerWorkflow"] as const;
const featureIcons: BrandIconName[] = ["rule-applied", "quality", "human-review"];

export default async function ClaimEvalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("claimEval");

  const motorZones = [1, 2, 3, 4, 5, 6, 7] as const;
  const homeZones = [1, 2, 3, 4, 5] as const;
  const lifeZones = [1, 2, 3, 4, 5] as const;
  const warrantyZones = [1, 2, 3, 4, 5] as const;

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
            <BrandIcon name="quality" size={220} className="absolute left-[50px] top-[50px]" />
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
            <p className="text-base text-body mt-4 leading-relaxed">
              {t("solution.note")}
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
              {t("coverageAreas.title")}
            </h2>
            <p className="text-lg text-body">
              {t("coverageAreas.subtitle")}
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
                  {t("coverageAreas.motor.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {motorZones.map((zone) => (
                  <li key={zone} className="flex items-center gap-3 text-body">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    {t(`coverageAreas.motor.zones.${zone}`)}
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
                  {t("coverageAreas.home.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {homeZones.map((zone) => (
                  <li key={zone} className="flex items-center gap-3 text-body">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    {t(`coverageAreas.home.zones.${zone}`)}
                  </li>
                ))}
              </ul>
            </MotionDiv>

            {/* Life */}
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card shadow-card rounded-pill p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-pill bg-lilac grid place-items-center">
                  <Heart className="w-7 h-7 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-semibold text-strong">
                  {t("coverageAreas.life.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {lifeZones.map((zone) => (
                  <li key={zone} className="flex items-center gap-3 text-body">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    {t(`coverageAreas.life.zones.${zone}`)}
                  </li>
                ))}
              </ul>
            </MotionDiv>

            {/* Warranty */}
            <MotionDiv
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card shadow-card rounded-pill p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-pill bg-lilac grid place-items-center">
                  <Wrench className="w-7 h-7 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-semibold text-strong">
                  {t("coverageAreas.warranty.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {warrantyZones.map((zone) => (
                  <li key={zone} className="flex items-center gap-3 text-body">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    {t(`coverageAreas.warranty.zones.${zone}`)}
                  </li>
                ))}
              </ul>
              <Link
                href="/case-studies/vehicle-warranty-claims"
                className="inline-flex items-center gap-2 mt-4 text-sm text-link font-medium hover:underline"
              >
                {t("coverageAreas.warranty.caseStudyLink")}
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
            </MotionDiv>
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
