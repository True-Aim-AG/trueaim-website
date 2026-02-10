import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowRight,
  Brain,
  FileInput,
  Search,
  Scale,
  Zap,
  FileOutput,
  CheckCircle,
  Shield,
  Globe,
  Plug,
  Clock,
  DollarSign,
  TrendingDown
} from "lucide-react";

const workflowIcons = [FileInput, Search, Scale, Zap, FileOutput];

const capabilityKeys = ["coverageDetermination", "multiVertical", "integration", "compliance"] as const;
const capabilityIcons = [CheckCircle, Globe, Plug, Shield];

const metricKeys = ["speed", "cost", "leakage"] as const;
const metricValues = ["92%", "71%", "2-5%"];
const metricIcons = [Clock, DollarSign, TrendingDown];

export default async function MiraPage() {
  const t = await getTranslations("mira");

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
              <Brain className="w-4 h-4" />
              {t("hero.badge")}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              {t("hero.title")}
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-4 leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <p className="text-base text-[var(--text-muted)] mb-8 leading-relaxed">
              {t("hero.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#demo"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg shadow-lg shadow-[var(--primary)]/30"
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
              {t("problem.paragraph1")}
              <br /><br />
              {t("problem.paragraph2")}
              <br /><br />
              {t("problem.paragraph3")}
            </p>
            <p className="text-xl font-semibold text-[var(--primary)] mt-6">
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
            <p className="text-lg text-[var(--text-primary)] font-medium mt-4">
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {t("workflow.title")}
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              {t("workflow.subtitle")}
            </p>
          </MotionDiv>

          <div className="relative">
            {/* Connector line removed per V3-MIRA-012 */}

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[1, 2, 3, 4, 5].map((step, index) => {
                const Icon = workflowIcons[index];
                return (
                  <MotionDiv
                    key={step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="glass-panel glass-panel-hover p-6 h-full text-center">
                      <div className="w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-lg font-bold mx-auto mb-4 relative z-10">
                        {step}
                      </div>

                      <div className="w-14 h-14 rounded-xl bg-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-7 h-7 text-indigo-400" />
                      </div>

                      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                        {t(`workflow.steps.${step}.title`)}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
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
                src="https://mira-travel-demo.vercel.app/products"
                className="w-full h-full"
                title={t("demo.iframeTitle")}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </MotionDiv>
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {t("capabilities.title")}
            </h2>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilityKeys.map((key, index) => {
              const Icon = capabilityIcons[index];
              return (
                <MotionDiv
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-panel glass-panel-hover p-8"
                >
                  <div className="w-14 h-14 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                    {t(`capabilities.items.${key}.title`)}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
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
                  className="text-center glass-panel p-8"
                >
                  <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-indigo-400" />
                  </div>
                  {hasPrefix && (
                    <p className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                      {t(`results.metrics.${key}.prefix`)}
                    </p>
                  )}
                  <p className="text-5xl font-bold text-[var(--primary)] font-mono-data mb-2">
                    {value}
                  </p>
                  <p className="text-[var(--text-secondary)]">
                    {t(`results.metrics.${key}.label`)}
                  </p>
                </MotionDiv>
              );
            })}
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
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg shadow-lg shadow-[var(--primary)]/30"
            >
              {t("cta.button")}
            </Link>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
