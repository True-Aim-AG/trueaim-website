"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  BarChart3,
  Coins,
  Bell,
  Plug,
  ArrowRight,
  Quote,
} from "lucide-react";
import {
  fadeUp,
  staggerContainer,
  defaultTransition,
} from "@/lib/animations";
import { Button, ButtonLink, buttonClasses } from "@/components/brand/Button";
import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Glow } from "@/components/brand/Glow";
import { GridPattern } from "@/components/brand/GridPattern";
import { StatusPill } from "@/components/brand/StatusPill";

// ============================================================================
// Section 1: Hero
// ============================================================================
function HeroSection({ t }: { t: ReturnType<typeof useTranslations<"claimEvalB">> }) {
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden">
      <GridPattern className="absolute right-0 top-0 hidden h-[600px] w-[746px] lg:block" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Copy (5 cols) */}
          <motion.div
            className="lg:col-span-5"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="mb-6">
              <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-display text-[40px] font-bold leading-[1.05] text-strong sm:text-[48px] lg:text-[54px] mb-6"
            >
              {t("hero.title")}
              <span className="text-accent">{t("hero.titleHighlight")}</span>
              {t("hero.titleEnd")}
            </motion.h1>

            {/* Subhead */}
            <motion.p variants={fadeUp} className="text-lede text-body mb-8">
              {t("hero.subtitle")}
            </motion.p>

            {/* Primary CTA */}
            <motion.div variants={fadeUp} className="mb-6">
              <a href="#impact-calculator" className={buttonClasses("primary", "lg")}>
                {t("hero.ctaPrimary")}
                <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 text-sm text-muted">
              <span className="flex items-center gap-2">
                <BrandIcon name="control" size={18} />
                {t("hero.trustBadge")}
              </span>
              <span className="text-line">|</span>
              <span>{t("hero.trustTimeline")}</span>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual (7 cols) */}
          <motion.div
            className="lg:col-span-7 relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Glow variant="soft" size={480} className="absolute -right-20 -top-24 -z-10" />

            {/* Claim document card */}
            <div className="relative rounded-pill bg-card shadow-card p-6">
              {/* Card header */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-hairline">
                <BrandIcon name="claim" size={20} />
                <span className="text-sm text-muted">{t("dashboard.claimNumber")}</span>
              </div>

              {/* Claim file content */}
              <div className="divide-hairline">
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-muted">{t("dashboard.policyHolder")}</span>
                  <span className="text-sm font-medium text-strong">{t("dashboard.policyHolderValue")}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-muted">{t("dashboard.lob")}</span>
                  <span className="text-sm font-medium text-strong">{t("dashboard.lobValue")}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-muted">{t("dashboard.reserve")}</span>
                  <span className="text-sm font-medium text-strong">{t("dashboard.reserveValue")}</span>
                </div>
              </div>

              {/* Police report section */}
              <div className="mt-6 p-4 rounded-pill bg-surface-muted">
                <p className="text-xs text-subtle mb-2">
                  {t("dashboard.policeReportLabel")}
                </p>
                <p className="text-sm text-body leading-relaxed">
                  &quot;{t("dashboard.policeReportText")}
                  <span className="bg-referred-light text-referred-dark px-1">
                    {t("dashboard.policeReportHighlight")}
                  </span>
                  &quot;
                </p>
              </div>

              {/* Flag */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <StatusPill tone="referred">{t("dashboard.alertTitle")}</StatusPill>
                <span className="text-sm font-semibold text-strong">{t("dashboard.alertValue")}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Section 2: Problem (The Iceberg)
// ============================================================================
function ProblemSection({ t }: { t: ReturnType<typeof useTranslations<"claimEvalB">> }) {
  const leakKeys = ["blindSpot", "skillGap", "buriedRecovery"] as const;
  const leakIcons = [Eye, BarChart3, Coins];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={defaultTransition}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="font-display text-4xl font-bold leading-[1.15] text-strong md:text-[48px] mb-6">
            {t("problem.title")}
          </h2>
          <p className="text-lede text-body">
            {t("problem.description")}
          </p>
        </motion.div>

        {/* Content - Iceberg + Leaks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Leaks List */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeUp}
              className="text-xl font-semibold text-strong mb-8"
            >
              {t("problem.subtitle")}
            </motion.p>

            <div className="space-y-6">
              {leakKeys.map((key, index) => {
                const Icon = leakIcons[index];
                return (
                  <motion.div
                    key={key}
                    variants={fadeUp}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-pill bg-lilac grid place-items-center">
                      <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-strong mb-1">
                        {t(`problem.leaks.${key}.title`)}
                      </h3>
                      <p className="text-body">{t(`problem.leaks.${key}.description`)}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right - Digital Iceberg */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <svg
              viewBox="0 0 400 500"
              className="w-full max-w-md"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Water line */}
              <line
                x1="0"
                y1="150"
                x2="400"
                y2="150"
                stroke="#5151DB"
                strokeWidth="2"
                strokeDasharray="8 4"
                opacity="0.5"
              />

              {/* Iceberg tip (above water) */}
              <motion.polygon
                points="200,20 240,150 160,150"
                fill="#F3EEFE"
                stroke="#2C2B2A"
                strokeWidth="1"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              />

              {/* Iceberg mass (below water) - wireframe style */}
              <motion.polygon
                points="200,150 280,250 320,400 260,480 140,480 80,400 120,250"
                fill="#EFEFF0"
                stroke="#CFCFD2"
                strokeWidth="2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />

              {/* Wireframe lines inside underwater mass */}
              <motion.g
                stroke="#CFCFD2"
                strokeWidth="1"
                opacity="0.6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <line x1="200" y1="150" x2="200" y2="480" />
                <line x1="200" y1="200" x2="280" y2="250" />
                <line x1="200" y1="200" x2="120" y2="250" />
                <line x1="200" y1="300" x2="320" y2="400" />
                <line x1="200" y1="300" x2="80" y2="400" />
                <line x1="120" y1="250" x2="80" y2="400" />
                <line x1="280" y1="250" x2="320" y2="400" />
              </motion.g>

              {/* Labels */}
              <motion.g
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {/* Tip label */}
                <rect x="250" y="70" width="100" height="30" rx="15" fill="#F3EEFE" />
                <text x="300" y="90" textAnchor="middle" fill="#2C2B2A" fontSize="12" fontWeight="600">
                  {t("problem.icebergTipLabel")}
                </text>

                {/* Mass label */}
                <rect x="250" y="320" width="140" height="30" rx="15" fill="#E2EAFD" />
                <text x="320" y="340" textAnchor="middle" fill="#5151DB" fontSize="12" fontWeight="600">
                  {t("problem.icebergMassLabel")}
                </text>
              </motion.g>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Section 3: Solution (Process Flow)
// ============================================================================
function SolutionSection({ t }: { t: ReturnType<typeof useTranslations<"claimEvalB">> }) {
  const stepKeys = ["ingest", "analyze", "alert"] as const;
  const stepIcons: (BrandIconName | null)[] = ["ingestion", "processing", null];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={defaultTransition}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="font-display text-4xl font-bold leading-[1.15] text-strong md:text-[48px] mb-4">
            {t("solution.title")}
          </h2>
          <p className="text-lg text-body">
            {t("solution.subtitle")}
          </p>
        </motion.div>

        {/* Process Flow Cards */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {stepKeys.map((key, index) => {
              const icon = stepIcons[index];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Connecting line (hidden on mobile, shown on md+) */}
                  {index < stepKeys.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 z-20">
                      <motion.div
                        className="h-full"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(90deg, #5151DB 0px, #5151DB 4px, transparent 4px, transparent 8px)",
                        }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
                      />
                    </div>
                  )}

                  {/* Card */}
                  <div className="h-full p-8 bg-card shadow-card rounded-pill transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch">
                    <div className="w-14 h-14 rounded-pill bg-lilac grid place-items-center mb-6">
                      {icon ? (
                        <BrandIcon name={icon} size={28} />
                      ) : (
                        <Bell className="w-7 h-7 text-accent" strokeWidth={1.5} />
                      )}
                    </div>
                    <p className="text-caption-sm text-accent mb-2">
                      {t(`solution.steps.${key}.label`)}
                    </p>
                    <h3 className="font-display font-semibold text-xl text-strong mb-3">
                      {t(`solution.steps.${key}.title`)}
                    </h3>
                    <p className="text-body leading-relaxed">{t(`solution.steps.${key}.description`)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Smart Nudge Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 max-w-lg mx-auto"
        >
          <div className="p-4 bg-card shadow-card rounded-pill">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-4 h-4 text-accent" strokeWidth={1.5} />
              <span className="text-sm font-semibold text-strong">
                {t("solution.smartNudgeTitle")}
              </span>
            </div>
            <p className="text-sm text-body">
              {t("solution.smartNudgeMessage")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// Section 4: Micro-Demo (Interactive)
// ============================================================================
function MicroDemoSection({ t }: { t: ReturnType<typeof useTranslations<"claimEvalB">> }) {
  const [demoState, setDemoState] = useState<"idle" | "scanning" | "complete">(
    "idle"
  );

  const handleScan = () => {
    if (demoState !== "idle") return;
    setDemoState("scanning");
    setTimeout(() => setDemoState("complete"), 2500);
  };

  const resetDemo = () => {
    setDemoState("idle");
  };

  return (
    <section data-theme="dark" className="bg-page-tint py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={defaultTransition}
          >
            <h2 className="font-display text-4xl font-bold leading-[1.15] text-strong md:text-[48px] mb-4">
              {t("microDemo.title")}
            </h2>
            <p className="text-lg text-body mb-8">
              {t("microDemo.subtitle")}
            </p>
            <ButtonLink href="/contact" variant="on-dark" size="md">
              {t("microDemo.ctaLink")}
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </ButtonLink>
          </motion.div>

          {/* Right Column - Interactive Module */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-pill p-6 bg-card shadow-card relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-hairline">
                <BrandIcon name="claim" size={18} />
                <span className="text-sm text-muted">
                  {t("microDemo.claimHeader")}
                </span>
              </div>

              {/* Content with scan effect */}
              <div className="relative min-h-[200px]">
                {/* Scanning beam */}
                <AnimatePresence>
                  {demoState === "scanning" && (
                    <motion.div
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent z-10"
                      initial={{ top: 0 }}
                      animate={{ top: "100%" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2, ease: "linear" }}
                    />
                  )}
                </AnimatePresence>

                {/* Text content */}
                <p className="text-sm text-body leading-relaxed">
                  {t("microDemo.claimText")}
                  <span
                    className={`transition-all duration-300 px-1 ${
                      demoState === "complete" ? "bg-referred-light text-referred-dark" : ""
                    }`}
                  >
                    {t("microDemo.claimHighlight")}
                  </span>
                  {t("microDemo.claimTextEnd")}
                </p>

                {/* Popup Alert */}
                <AnimatePresence>
                  {demoState === "complete" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-4 right-4 max-w-[220px] p-4 bg-card shadow-swatch rounded-pill"
                    >
                      <StatusPill tone="approved" emphasis="solid" size="sm" className="mb-2">
                        {t("microDemo.alertTitle")}
                      </StatusPill>
                      <p className="text-xs text-body">
                        {t("microDemo.alertAction")}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Scan Button */}
              <div className="mt-6 flex gap-3">
                <Button
                  onClick={handleScan}
                  disabled={demoState !== "idle"}
                  variant="primary"
                  size="md"
                >
                  {demoState === "idle" && t("microDemo.scanButton")}
                  {demoState === "scanning" && t("microDemo.scanningButton")}
                  {demoState === "complete" && t("microDemo.scanCompleteButton")}
                </Button>
                {demoState === "complete" && (
                  <Button onClick={resetDemo} variant="on-dark" size="md">
                    {t("microDemo.resetButton")}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Section 5: Differentiation (2x2 Grid)
// ============================================================================
function DifferentiationSection({ t }: { t: ReturnType<typeof useTranslations<"claimEvalB">> }) {
  const featureKeys = ["noBlackBox", "guardrails", "auditTrail", "noRipReplace"] as const;
  const featureIcons: (BrandIconName | null)[] = ["document", "control", "traceability", null];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={defaultTransition}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="font-display text-4xl font-bold leading-[1.15] text-strong md:text-[48px]">
            {t("differentiation.title")}
          </h2>
        </motion.div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featureKeys.map((key, index) => {
            const icon = featureIcons[index];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-card shadow-card rounded-pill"
              >
                <div className="w-14 h-14 rounded-pill bg-lilac grid place-items-center mb-6">
                  {icon ? (
                    <BrandIcon name={icon} size={28} />
                  ) : (
                    <Plug className="w-7 h-7 text-accent" strokeWidth={1.5} />
                  )}
                </div>
                <h3 className="font-display font-semibold text-xl text-strong mb-3">
                  {t(`differentiation.features.${key}.title`)}
                </h3>
                <p className="text-body leading-relaxed">
                  {t(`differentiation.features.${key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Section 6: Social Proof
// ============================================================================
function SocialProofSection({ t }: { t: ReturnType<typeof useTranslations<"claimEvalB">> }) {
  const badgeKeys = ["soc2", "iso", "api", "gdpr"] as const;

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-12"
        >
          <Quote className="absolute -top-8 -left-4 w-16 h-16 text-accent-soft" strokeWidth={1.5} />
          <blockquote className="text-xl md:text-2xl text-strong italic leading-relaxed">
            &quot;{t("socialProof.quote")}
            <span className="text-accent font-semibold not-italic">
              {t("socialProof.quoteHighlight")}
            </span>
            {t("socialProof.quoteEnd")}&quot;
          </blockquote>
          <p className="mt-6 text-muted">
            &ndash; {t("socialProof.attribution")}
          </p>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6"
        >
          {badgeKeys.map((key) => (
            <span
              key={key}
              className="px-4 py-2 rounded-pill text-sm text-muted border border-line"
            >
              {t(`socialProof.badges.${key}`)}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// Section 7: ROI Calculator
// ============================================================================
function ROICalculatorSection({ t }: { t: ReturnType<typeof useTranslations<"claimEvalB">> }) {
  const [dwp, setDwp] = useState(500_000_000);
  const [lossRatio, setLossRatio] = useState(65);

  const savings = useMemo(() => {
    return dwp * (lossRatio / 100) * 0.01;
  }, [dwp, lossRatio]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section id="impact-calculator" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-12 bg-card shadow-card rounded-pill"
        >
          <h2 className="font-display text-3xl font-bold text-strong text-center mb-8 md:text-4xl">
            {t("roiCalculator.title")}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Inputs */}
            <div className="space-y-6">
              {/* Annual DWP */}
              <div>
                <label className="block text-sm text-muted mb-2">
                  {t("roiCalculator.dwpLabel")}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-subtle">
                    $
                  </span>
                  <input
                    type="text"
                    value={dwp.toLocaleString()}
                    onChange={(e) => {
                      const val = parseInt(e.target.value.replace(/,/g, "")) || 0;
                      setDwp(val);
                    }}
                    className="w-full pl-8 pr-4 py-3"
                  />
                </div>
              </div>

              {/* Loss Ratio */}
              <div>
                <label className="block text-sm text-muted mb-2">
                  {t("roiCalculator.lossRatioLabel")}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={lossRatio}
                    onChange={(e) =>
                      setLossRatio(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))
                    }
                    className="w-full pr-8 pl-4 py-3"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-subtle">
                    %
                  </span>
                </div>
              </div>
            </div>

            {/* Output */}
            <div className="text-center lg:text-left">
              <p className="text-muted mb-2">{t("roiCalculator.resultPrefix")}</p>
              <motion.p
                key={savings}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-kpi-lg text-accent mb-2"
              >
                {formatCurrency(savings)}
              </motion.p>
              <p className="text-muted mb-8">{t("roiCalculator.resultSuffix")}</p>

              <ButtonLink href="/contact" variant="primary" size="lg">
                {t("roiCalculator.ctaButton")}
                <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
              </ButtonLink>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// Section 8: FAQ
// ============================================================================
function FAQSection({ t }: { t: ReturnType<typeof useTranslations<"claimEvalB">> }) {
  const faqKeys = ["replaceAdjusters", "dataSecurity", "timeToResults"] as const;

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl font-bold text-strong text-center mb-12 md:text-4xl"
        >
          {t("faq.title")}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqKeys.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-card shadow-card rounded-pill"
            >
              <h3 className="font-display font-semibold text-lg text-strong mb-3">
                {t(`faq.items.${key}.question`)}
              </h3>
              <p className="text-body">{t(`faq.items.${key}.answer`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Section 9: Final CTA
// ============================================================================
function FinalCTASection({ t }: { t: ReturnType<typeof useTranslations<"claimEvalB">> }) {
  const [lob, setLob] = useState("");
  const [volume, setVolume] = useState("");
  const [email, setEmail] = useState("");

  return (
    <section data-theme="dark" className="relative overflow-hidden bg-page-tint py-24 px-6">
      <Glow variant="soft" size={560} className="absolute inset-x-0 -bottom-40 mx-auto" />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl font-bold text-strong mb-4 md:text-4xl">
            {t("finalCta.title")}
          </h2>
          <p className="text-lg text-body mb-12">
            {t("finalCta.subtitle")}
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 justify-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <select
            value={lob}
            onChange={(e) => setLob(e.target.value)}
            className="px-4 py-3 md:w-auto"
          >
            <option value="">{t("finalCta.lobPlaceholder")}</option>
            <option value="auto">{t("finalCta.lobAuto")}</option>
            <option value="property">{t("finalCta.lobProperty")}</option>
            <option value="wc">{t("finalCta.lobWC")}</option>
          </select>

          <select
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="px-4 py-3 md:w-auto"
          >
            <option value="">{t("finalCta.volumePlaceholder")}</option>
            <option value="lt10k">{t("finalCta.volumeLt10k")}</option>
            <option value="gt10k">{t("finalCta.volumeGt10k")}</option>
          </select>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("finalCta.emailPlaceholder")}
            className="px-4 py-3 flex-grow md:flex-grow-0 md:w-64"
          />

          <Button type="submit" variant="primary" size="md">
            {t("finalCta.submitButton")}
            <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
          </Button>
        </motion.form>
      </div>
    </section>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================
export default function ClaimEvalPageB() {
  const t = useTranslations("claimEvalB");

  return (
    <div className="min-h-screen">
      {/* Version indicator */}
      <div className="fixed top-20 right-4 z-50 px-3 py-1.5 rounded-pill bg-accent-soft text-accent text-xs font-medium">
        {t("versionIndicator")}
      </div>

      <HeroSection t={t} />
      <ProblemSection t={t} />
      <SolutionSection t={t} />
      <MicroDemoSection t={t} />
      <DifferentiationSection t={t} />
      <SocialProofSection t={t} />
      <ROICalculatorSection t={t} />
      <FAQSection t={t} />
      <FinalCTASection t={t} />
    </div>
  );
}
