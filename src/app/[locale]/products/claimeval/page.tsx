import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowRight,
  ClipboardCheck,
  ListChecks,
  Car,
  Home,
  Heart,
  Wrench,
  BarChart3,
  Users,
  AlertTriangle
} from "lucide-react";

const featureKeys = ["riskScoring", "inspectionCatalogues", "reviewerWorkflow"] as const;
const featureIcons = [BarChart3, ListChecks, Users];

export default async function ClaimEvalPage() {
  const t = await getTranslations("claimEval");

  const motorZones = [1, 2, 3, 4, 5, 6, 7] as const;
  const homeZones = [1, 2, 3, 4, 5] as const;
  const lifeZones = [1, 2, 3, 4, 5] as const;
  const warrantyZones = [1, 2, 3, 4, 5] as const;

  return (
    <div className="min-h-screen">
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

            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
              {t("hero.subtitle")}
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

          {/* Example Inspection Check */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 glass-panel p-8 max-w-3xl mx-auto"
          >
            <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-4">{t("coverageAreas.exampleCheck.label")}</div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="font-semibold text-[var(--text-primary)] mb-2">{t("coverageAreas.exampleCheck.title")}</h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                  {t("coverageAreas.exampleCheck.description")}
                </p>
                <div className="flex items-center gap-4 text-xs">
                  <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 font-medium">{t("coverageAreas.exampleCheck.passLabel")}</span>
                  <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-400 font-medium">{t("coverageAreas.exampleCheck.warnLabel")}</span>
                  <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 font-medium">{t("coverageAreas.exampleCheck.failLabel")}</span>
                </div>
              </div>
            </div>
          </MotionDiv>
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
