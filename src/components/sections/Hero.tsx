"use client";

import { useRef, useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, FileText, Search, Scale, Send, ClipboardCheck, Zap, UserCheck } from "lucide-react";
import { fadeIn, scaleIn, springTransition } from "@/lib/animations";

const pipelineStepsMeta = [
  { key: "ingest" as const, icon: FileText, color: "var(--trust)", hitlOptional: false },
  { key: "process" as const, icon: Search, color: "var(--secondary)", hitlOptional: false },
  { key: "decide" as const, icon: Scale, color: "var(--primary)", hitlOptional: true },
  { key: "execute" as const, icon: Send, color: "var(--aurora-cyan)", hitlOptional: true },
  { key: "audit" as const, icon: ClipboardCheck, color: "var(--secondary)", hitlOptional: false },
];

export function Hero() {
  const t = useTranslations("hero");

  const pipelineSteps = pipelineStepsMeta.map((meta) => ({
    icon: meta.icon,
    color: meta.color,
    hitlOptional: meta.hitlOptional,
    label: t(`steps.${meta.key}.label`),
    shortDescription: t(`steps.${meta.key}.shortDesc`),
    description: t(`steps.${meta.key}.description`),
    automatedTime: t(`steps.${meta.key}.time`),
    businessValue: t(`steps.${meta.key}.value`),
    automationDetail: t(`steps.${meta.key}.automation`),
  }));

  const sectionRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Scroll-linked parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Transform values for parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        {/* Main content with parallax */}
        <motion.div
          style={prefersReducedMotion ? {} : { y, opacity }}
          className="text-center mb-16"
        >
          <motion.h1
            variants={fadeIn}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6"
          >
            {t("title")}
            <br />
            <span className="text-[var(--primary)]">{t("titleHighlight")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-4 leading-relaxed"
          >
            <>
              {t("subtitle1")}
              <br />
              {t("subtitle2")}
              <br />
              {t("subtitle3")}
            </>
          </motion.p>
        </motion.div>

        {/* Animated Pipeline Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          {/* Pipeline container - Glass Panel */}
          <div className="glass-panel p-8 md:p-12">
            <div className="text-center mb-8">
              <p className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider">
                {t("pipelineTitle")}
              </p>
            </div>

            {/* Pipeline steps */}
            <div className="relative flex flex-col md:flex-row items-start justify-between gap-4 md:gap-0">

              {pipelineSteps.map((step, index) => (
                <div key={step.label} className="flex items-start w-full md:w-auto">
                  {/* Step */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.6 + index * 0.15,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="flex flex-col items-center w-full md:w-auto"
                  >
                    <div className="relative">
                      <div
                        className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-3 transition-transform hover:scale-110"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${step.color} 25%, transparent)`,
                        }}
                      >
                        <step.icon
                          className="w-8 h-8 md:w-10 md:h-10"
                          style={{ color: step.color }}
                        />
                      </div>
                      {/* Automation badges */}
                      {step.hitlOptional ? (
                        <>
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/50">
                            <Zap className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div className="absolute -top-1 -right-7 w-5 h-5 rounded-full flex items-center justify-center bg-amber-100 dark:bg-amber-900/50">
                            <UserCheck className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                          </div>
                        </>
                      ) : (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/50">
                          <Zap className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        </div>
                      )}
                    </div>
                    <span className="text-base font-semibold text-[var(--text-primary)]">
                      {step.label}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] mt-0.5">
                      {step.shortDescription}
                    </span>
                    <span className="text-xs text-[var(--secondary)] font-medium mt-0.5">
                      {step.automatedTime}
                    </span>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                  <Zap className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-[var(--text-muted)]">{t("legendFully")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                  <UserCheck className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-[var(--text-muted)]">{t("legendHuman")}</span>
              </div>
            </div>

          </div>

        </motion.div>

        {/* CTA Buttons - below workflow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-10"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-all text-lg shadow-lg shadow-[var(--primary)]/30 hover:shadow-[var(--primary)]/50"
              >
                {t("ctaDemo")}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/impact-estimator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--primary-light)] transition-all text-lg backdrop-blur-sm"
              >
                {t("ctaImpact")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
