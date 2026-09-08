import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { ProductHero } from "@/components/products/ProductHero";
import {
  ArrowRight,
  ClipboardCheck,
  ListChecks,
  Car,
  Home,
  Heart,
  Wrench,
  BarChart3,
  Users
} from "lucide-react";

const featureKeys = ["riskScoring", "inspectionCatalogues", "reviewerWorkflow"] as const;
const featureIcons = [BarChart3, ListChecks, Users];

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
        badgeIcon={<ClipboardCheck className="w-4 h-4" />}
        headline={t("hero.title")}
        description={t("hero.subtitle")}
        primaryCTA={{ label: t("hero.ctaPrimary"), href: "/contact" }}
        secondaryCTA={{ label: t("hero.ctaSecondary"), href: "/contact" }}
        badgeClassName="bg-emerald-500/20 text-emerald-400"
        primaryCTAClassName="bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/30"
      />

      {/* Problem Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center glass-panel p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              {t("problem.title")}
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              {t("problem.description")}
            </p>
            <p className="text-xl font-semibold text-emerald-400 mt-6">
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              {t("solution.title")}
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              {t("solution.description")}
            </p>
            <p className="text-base text-[var(--text-secondary)] mt-4 leading-relaxed">
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {t("features.title")}
            </h2>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureKeys.map((key, index) => {
              const Icon = featureIcons[index];
              return (
                <MotionDiv
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-panel glass-panel-hover p-8"
                >
                  <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                    {t(`features.items.${key}.title`)}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {t("coverageAreas.title")}
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
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
              className="glass-panel p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Car className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
                  {t("coverageAreas.motor.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {motorZones.map((zone) => (
                  <li key={zone} className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
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
              className="glass-panel p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Home className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
                  {t("coverageAreas.home.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {homeZones.map((zone) => (
                  <li key={zone} className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
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
              className="glass-panel p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Heart className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
                  {t("coverageAreas.life.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {lifeZones.map((zone) => (
                  <li key={zone} className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
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
              className="glass-panel p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Wrench className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
                  {t("coverageAreas.warranty.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {warrantyZones.map((zone) => (
                  <li key={zone} className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    {t(`coverageAreas.warranty.zones.${zone}`)}
                  </li>
                ))}
              </ul>
              <Link
                href="/case-studies/vehicle-warranty-claims"
                className="inline-flex items-center gap-2 mt-4 text-sm text-[var(--primary)] font-medium hover:underline"
              >
                {t("coverageAreas.warranty.caseStudyLink")}
                <ArrowRight className="w-4 h-4" />
              </Link>
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
            className="glass-panel p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              {t("cta.title")}
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10">
              {t("cta.description")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors text-lg shadow-lg shadow-emerald-500/30"
            >
              {t("cta.button")}
            </Link>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
