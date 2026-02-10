import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowRight,
  FileSearch,
  Upload,
  FileType,
  FileText,
  ShieldCheck,
  Users,
  CheckCircle,
  FileCheck,
  Link2,
  MessageSquare,
  ExternalLink
} from "lucide-react";

const pipelineIcons = [Upload, FileType, FileText, ShieldCheck, Users];

const outputFeatureKeys = ["cleanDataset", "qualityStatus", "evidenceLinks", "humanLabels"] as const;
const outputFeatureIcons = [CheckCircle, FileCheck, Link2, MessageSquare];

const metricValues = ["95%", "97%", "96%", "<1%"];
const metricKeys = ["coverage", "accuracy", "evidenceRate", "errorRate"] as const;

export default async function ContextBuilderPage() {
  const t = await getTranslations("contextBuilder");

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--aurora-cyan)]/20 text-[var(--aurora-cyan)] text-sm font-medium mb-6">
              <FileSearch className="w-4 h-4" />
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
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[var(--aurora-cyan)] text-white font-medium hover:bg-[#0891b2] transition-colors text-lg shadow-lg shadow-[var(--aurora-cyan)]/30"
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {t("pipeline.title")}
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              {t("pipeline.subtitle")}
            </p>
          </MotionDiv>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[1, 2, 3, 4, 5].map((step, index) => {
                const Icon = pipelineIcons[index];
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
                      <div className="w-12 h-12 rounded-full bg-[var(--aurora-cyan)] text-white flex items-center justify-center text-lg font-bold mx-auto mb-4 relative z-10">
                        {step}
                      </div>

                      <div className="w-14 h-14 rounded-xl bg-[var(--aurora-cyan)]/20 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-7 h-7 text-[var(--aurora-cyan)]" />
                      </div>

                      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                        {t(`pipeline.steps.${step}.title`)}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
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
            className="mt-12 glass-panel p-6 text-center max-w-3xl mx-auto"
          >
            <p className="text-sm text-[var(--text-secondary)]">
              {t.rich("pipeline.dataSovereigntyNote", {
                trustCenterLink: (chunks) => (
                  <Link href="/trust" className="text-[var(--primary)] underline hover:opacity-80">
                    {chunks}
                  </Link>
                ),
              })}
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Demo / GitHub Section */}
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
            className="relative rounded-2xl overflow-hidden glass-panel p-12 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-[var(--subtle-bg)] flex items-center justify-center mx-auto mb-6">
              <svg viewBox="0 0 24 24" className="w-10 h-10 text-[var(--text-primary)]" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              {t("demo.repoName")}
            </h3>
            <p className="text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
              {t("demo.repoDescription")}
            </p>
            <a
              href="https://github.com/Fr3nn3r/AgenticContextBuilder"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white text-[var(--background)] font-medium hover:bg-white/90 transition-colors text-lg"
            >
              {t("demo.viewOnGitHub")}
              <ExternalLink className="w-5 h-5" />
            </a>
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              {t("output.title")}
            </h2>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {outputFeatureKeys.map((key, index) => {
              const Icon = outputFeatureIcons[index];
              return (
                <MotionDiv
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-panel glass-panel-hover p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--aurora-cyan)]/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[var(--aurora-cyan)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                    {t(`output.features.${key}.title`)}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
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
                className="text-center glass-panel p-8"
              >
                <p className="text-5xl font-bold text-[var(--aurora-cyan)] font-mono-data mb-2">
                  {metricValues[index]}
                </p>
                <p className="text-[var(--text-secondary)] text-sm">
                  {t(`metrics.items.${key}.label`)}
                </p>
                {key === "errorRate" && (
                  <p className="text-xs text-[var(--text-muted)] mt-1 italic">
                    {t(`metrics.items.${key}.footnote`)}
                  </p>
                )}
              </MotionDiv>
            ))}
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
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[var(--aurora-cyan)] text-white font-medium hover:bg-[#0891b2] transition-colors text-lg shadow-lg shadow-[var(--aurora-cyan)]/30"
            >
              {t("cta.button")}
            </Link>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
