import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { MotionDiv } from "@/components/ui/MotionDiv";
import { ProductHero } from "@/components/products/ProductHero";
import {
  FileSearch,
  Upload,
  FileType,
  FileText,
  ShieldCheck,
  Users,
  CheckCircle,
  FileCheck,
  Link2,
  MessageSquare
} from "lucide-react";

const pipelineIcons = [Upload, FileType, FileText, ShieldCheck, Users];

const outputFeatureKeys = ["cleanDataset", "qualityStatus", "evidenceLinks", "humanLabels"] as const;
const outputFeatureIcons = [CheckCircle, FileCheck, Link2, MessageSquare];

const metricValues = ["95%", "99%", "96%", "<1%"];
const metricKeys = ["coverage", "accuracy", "evidenceRate", "errorRate"] as const;

export default async function ContextBuilderPage() {
  const t = await getTranslations("contextBuilder");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ProductHero
        badge={t("hero.badge")}
        badgeIcon={<FileSearch className="w-4 h-4" />}
        headline={t("hero.title")}
        description={t("hero.subtitle")}
        primaryCTA={{ label: t("hero.ctaPrimary"), href: "/contact" }}
        secondaryCTA={{ label: t("hero.ctaSecondary"), href: "/contact" }}
        badgeClassName="bg-[var(--aurora-cyan)]/20 text-[var(--aurora-cyan)]"
        primaryCTAClassName="bg-[var(--aurora-cyan)] text-white hover:bg-[#0891b2] shadow-lg shadow-[var(--aurora-cyan)]/30"
      />

      {/* Pipeline Animation Video */}
      <section className="pb-10 px-6">
        <div className="max-w-5xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl shadow-[var(--aurora-cyan)]/5"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
              poster=""
            >
              <source src="/videos/contextbuilder-pipeline.mp4" type="video/mp4" />
            </video>
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
