import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowRight,
  ClipboardCheck,
  ListChecks,
  Car,
  Home,
  BarChart3,
  Users
} from "lucide-react";

const featureKeys = ["riskScoring", "inspectionCatalogues", "reviewerWorkflow"] as const;
const featureIcons = [BarChart3, ListChecks, Users];

export default async function ClaimEvalPageA() {
  const t = await getTranslations("claimEvalA");

  const motorZones = [1, 2, 3, 4, 5, 6, 7] as const;
  const homeZones = [1, 2, 3, 4, 5] as const;

  return (
    <div className="min-h-screen">
      {/* Version indicator */}
      <div className="fixed top-20 right-4 z-50 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium border border-emerald-500/30">
        {t("versionIndicator")}
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <ClipboardCheck className="w-4 h-4" />
              {t("hero.badge")}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              {t("hero.title")}
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-4 leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
              {t("hero.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#demo"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors text-lg shadow-lg shadow-emerald-500/30"
              >
                {t("hero.ctaPrimary")}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--primary-light)] transition-colors text-lg"
              >
                {t("hero.ctaSecondary")}
                <ArrowRight className="w-5 h-5" />
              </Link>
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {t("demo.title")}
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              {t("demo.subtitle")}
            </p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden glass-panel"
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {t("inspectionZones.title")}
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
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
              className="glass-panel p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Car className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
                  {t("inspectionZones.motor.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {motorZones.map((zone) => (
                  <li key={zone} className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
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
              className="glass-panel p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Home className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-semibold text-[var(--text-primary)]">
                  {t("inspectionZones.home.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {homeZones.map((zone) => (
                  <li key={zone} className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
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
