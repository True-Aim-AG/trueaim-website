"use client";

import { useState, useMemo } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Eye,
  BarChart3,
  Coins,
  Database,
  Brain,
  Bell,
  Package,
  Shield,
  ClipboardList,
  Plug,
  ArrowRight,
  Quote,
  CheckCircle,
} from "lucide-react";
import {
  fadeUp,
  float,
  staggerContainer,
  defaultTransition,
} from "@/lib/animations";

// ============================================================================
// Section 1: Hero
// ============================================================================
function HeroSection({ t }: { t: ReturnType<typeof useTranslations<"claimEvalB">> }) {
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden">
      {/* Radial cyan glow behind visual */}
      <div
        className="absolute top-1/2 right-0 w-[800px] h-[800px] -translate-y-1/2 translate-x-1/4 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)",
        }}
      />

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
            <motion.p
              variants={fadeUp}
              className="text-xs uppercase tracking-widest text-sky-400 font-medium mb-6"
            >
              {t("hero.eyebrow")}
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight"
            >
              {t("hero.title")}
              <span className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
                {t("hero.titleHighlight")}
              </span>
              {t("hero.titleEnd")}
            </motion.h1>

            {/* Subhead */}
            <motion.p
              variants={fadeUp}
              className="text-lg text-slate-400 mb-8 leading-relaxed"
            >
              {t("hero.subtitle")}
            </motion.p>

            {/* Primary CTA */}
            <motion.div variants={fadeUp} className="mb-6">
              <Link
                href="#impact-calculator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all text-lg shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 group"
              >
                {t("hero.ctaPrimary")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-4 text-sm text-slate-500"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                {t("hero.trustBadge")}
              </span>
              <span className="text-slate-700">|</span>
              <span>{t("hero.trustTimeline")}</span>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual (7 cols) */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Floating Dashboard */}
            <div
              className="relative rounded-2xl p-6 backdrop-blur-xl border border-white/10"
              style={{ background: "rgba(30, 41, 59, 0.4)" }}
            >
              {/* Dashboard header */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-sm text-slate-400">
                  {t("dashboard.claimNumber")}
                </span>
              </div>

              {/* Claim file content */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">{t("dashboard.policyHolder")}</span>
                  <span className="text-sm text-white">{t("dashboard.policyHolderValue")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">{t("dashboard.lob")}</span>
                  <span className="text-sm text-white">{t("dashboard.lobValue")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">{t("dashboard.reserve")}</span>
                  <span className="text-sm text-white">{t("dashboard.reserveValue")}</span>
                </div>

                {/* Police report section */}
                <div className="mt-6 p-4 rounded-lg bg-slate-900/50 relative">
                  <p className="text-xs text-slate-500 mb-2">
                    {t("dashboard.policeReportLabel")}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    &quot;{t("dashboard.policeReportText")}
                    <motion.span
                      className="bg-orange-500/30 text-orange-300 px-1 rounded relative"
                      animate={{
                        boxShadow: [
                          "0 0 10px rgba(249, 115, 22, 0.3)",
                          "0 0 20px rgba(249, 115, 22, 0.6)",
                          "0 0 10px rgba(249, 115, 22, 0.3)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {t("dashboard.policeReportHighlight")}
                    </motion.span>
                    &quot;
                  </p>

                  {/* Floating tooltip */}
                  <motion.div
                    variants={float}
                    initial="initial"
                    animate="animate"
                    className="absolute -right-4 -top-4 p-3 rounded-lg bg-slate-800 border border-orange-500/50 shadow-lg shadow-orange-500/20"
                  >
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      <div>
                        <p className="text-xs text-orange-400 font-medium">
                          {t("dashboard.alertTitle")}
                        </p>
                        <p className="text-sm text-white font-bold">{t("dashboard.alertValue")}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
            {t("problem.title")}
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
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
              className="text-xl font-semibold text-white mb-8"
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
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-sky-500/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-sky-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {t(`problem.leaks.${key}.title`)}
                      </h3>
                      <p className="text-slate-400">{t(`problem.leaks.${key}.description`)}</p>
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
                stroke="#38BDF8"
                strokeWidth="2"
                strokeDasharray="8 4"
                opacity="0.5"
              />

              {/* Iceberg tip (above water) */}
              <motion.polygon
                points="200,20 240,150 160,150"
                fill="rgba(255,255,255,0.1)"
                stroke="#FFFFFF"
                strokeWidth="1"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              />

              {/* Iceberg mass (below water) - wireframe style */}
              <motion.polygon
                points="200,150 280,250 320,400 260,480 140,480 80,400 120,250"
                fill="rgba(30, 41, 59, 0.5)"
                stroke="#1E293B"
                strokeWidth="2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />

              {/* Wireframe lines inside underwater mass */}
              <motion.g
                stroke="#334155"
                strokeWidth="1"
                opacity="0.5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.5 }}
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
                <rect x="250" y="70" width="100" height="30" rx="4" fill="#1E293B" />
                <text x="300" y="90" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="600">
                  {t("problem.icebergTipLabel")}
                </text>

                {/* Mass label */}
                <rect x="250" y="320" width="140" height="30" rx="4" fill="#1E293B" />
                <text x="320" y="340" textAnchor="middle" fill="#38BDF8" fontSize="12" fontWeight="600">
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
  const stepIcons = [Database, Brain, Bell];

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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            {t("solution.title")}
          </h2>
          <p className="text-lg text-slate-400">
            {t("solution.subtitle")}
          </p>
        </motion.div>

        {/* Process Flow Cards */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {stepKeys.map((key, index) => {
              const Icon = stepIcons[index];
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
                            "repeating-linear-gradient(90deg, #38BDF8 0px, #38BDF8 4px, transparent 4px, transparent 8px)",
                        }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
                      />
                    </div>
                  )}

                  {/* Card */}
                  <div
                    className="h-full p-8 rounded-2xl backdrop-blur-xl border border-white/10 hover:border-sky-500/30 transition-colors"
                    style={{ background: "rgba(30, 41, 59, 0.15)" }}
                  >
                    <div className="w-14 h-14 rounded-xl bg-sky-500/20 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-sky-400" />
                    </div>
                    <p className="text-xs uppercase tracking-widest text-sky-400 font-medium mb-2">
                      {t(`solution.steps.${key}.label`)}
                    </p>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {t(`solution.steps.${key}.title`)}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">{t(`solution.steps.${key}.description`)}</p>
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
          <div
            className="p-4 rounded-xl backdrop-blur-xl border border-white/10"
            style={{ background: "rgba(30, 41, 59, 0.3)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-4 h-4 text-sky-400" />
              <span className="text-sm font-semibold text-white">
                {t("solution.smartNudgeTitle")}
              </span>
            </div>
            <p className="text-sm text-slate-300">
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
    <section className="py-24 px-6" style={{ background: "#0B1120" }}>
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              {t("microDemo.title")}
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              {t("microDemo.subtitle")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-sky-500 text-sky-400 font-medium hover:bg-sky-500/10 transition-colors"
            >
              {t("microDemo.ctaLink")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right Column - Interactive Module */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="rounded-2xl p-6 backdrop-blur-xl border border-white/10 relative overflow-hidden"
              style={{ background: "rgba(30, 41, 59, 0.3)" }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-sm text-slate-400">
                  {t("microDemo.claimHeader")}
                </span>
              </div>

              {/* Content with scan effect */}
              <div className="relative min-h-[200px]">
                {/* Scanning beam */}
                <AnimatePresence>
                  {demoState === "scanning" && (
                    <motion.div
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent z-10"
                      initial={{ top: 0 }}
                      animate={{ top: "100%" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2, ease: "linear" }}
                    />
                  )}
                </AnimatePresence>

                {/* Text content */}
                <p className="text-sm text-slate-300 leading-relaxed">
                  {t("microDemo.claimText")}
                  <span
                    className={`transition-all duration-500 px-1 rounded ${
                      demoState === "complete"
                        ? "bg-purple-500/40 text-purple-200"
                        : ""
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
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-4 right-4 p-4 rounded-lg bg-emerald-900/90 border border-emerald-500/50 shadow-lg"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                        <span className="text-sm font-semibold text-emerald-300">
                          {t("microDemo.alertTitle")}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-200">
                        {t("microDemo.alertAction")}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Scan Button */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleScan}
                  disabled={demoState !== "idle"}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    demoState === "idle"
                      ? "bg-sky-500 text-white hover:bg-sky-400"
                      : "bg-slate-700 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {demoState === "idle" && t("microDemo.scanButton")}
                  {demoState === "scanning" && t("microDemo.scanningButton")}
                  {demoState === "complete" && t("microDemo.scanCompleteButton")}
                </button>
                {demoState === "complete" && (
                  <button
                    onClick={resetDemo}
                    className="px-6 py-3 rounded-lg font-medium border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors"
                  >
                    {t("microDemo.resetButton")}
                  </button>
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
  const featureIcons = [Package, Shield, ClipboardList, Plug];

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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            {t("differentiation.title")}
          </h2>
        </motion.div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featureKeys.map((key, index) => {
            const Icon = featureIcons[index];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl backdrop-blur-xl border border-white/10"
                style={{ background: "rgba(30, 41, 59, 0.15)" }}
              >
                <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {t(`differentiation.features.${key}.title`)}
                </h3>
                <p className="text-slate-400 leading-relaxed">
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
          <Quote className="absolute -top-8 -left-4 w-16 h-16 text-sky-500/20" />
          <blockquote className="text-xl md:text-2xl text-white italic leading-relaxed">
            &quot;{t("socialProof.quote")}
            <span className="text-sky-400 font-semibold">
              {t("socialProof.quoteHighlight")}
            </span>
            {t("socialProof.quoteEnd")}&quot;
          </blockquote>
          <p className="mt-6 text-slate-500">
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
              className="px-4 py-2 rounded-full text-sm text-slate-500 border border-slate-700"
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
          className="p-8 md:p-12 rounded-2xl backdrop-blur-xl border border-white/10"
          style={{ background: "rgba(30, 41, 59, 0.3)" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            {t("roiCalculator.title")}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Inputs */}
            <div className="space-y-6">
              {/* Annual DWP */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  {t("roiCalculator.dwpLabel")}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    $
                  </span>
                  <input
                    type="text"
                    value={dwp.toLocaleString()}
                    onChange={(e) => {
                      const val = parseInt(e.target.value.replace(/,/g, "")) || 0;
                      setDwp(val);
                    }}
                    className="w-full pl-8 pr-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
              </div>

              {/* Loss Ratio */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  {t("roiCalculator.lossRatioLabel")}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={lossRatio}
                    onChange={(e) =>
                      setLossRatio(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))
                    }
                    className="w-full pr-8 pl-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white focus:outline-none focus:border-sky-500 transition-colors"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                    %
                  </span>
                </div>
              </div>
            </div>

            {/* Output */}
            <div className="text-center lg:text-left">
              <p className="text-slate-400 mb-2">{t("roiCalculator.resultPrefix")}</p>
              <motion.p
                key={savings}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2"
              >
                {formatCurrency(savings)}
              </motion.p>
              <p className="text-slate-400 mb-8">{t("roiCalculator.resultSuffix")}</p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30"
              >
                {t("roiCalculator.ctaButton")}
                <ArrowRight className="w-5 h-5" />
              </Link>
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
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
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
              className="p-6 rounded-xl border border-slate-800"
            >
              <h3 className="text-lg font-semibold text-white mb-3">
                {t(`faq.items.${key}.question`)}
              </h3>
              <p className="text-slate-400">{t(`faq.items.${key}.answer`)}</p>
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
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Blue burst gradient from bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom center, rgba(37, 99, 235, 0.3) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("finalCta.title")}
          </h2>
          <p className="text-lg text-slate-400 mb-12">
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
            className="px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white focus:outline-none focus:border-sky-500 transition-colors md:w-auto"
          >
            <option value="">{t("finalCta.lobPlaceholder")}</option>
            <option value="auto">{t("finalCta.lobAuto")}</option>
            <option value="property">{t("finalCta.lobProperty")}</option>
            <option value="wc">{t("finalCta.lobWC")}</option>
          </select>

          <select
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white focus:outline-none focus:border-sky-500 transition-colors md:w-auto"
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
            className="px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-colors flex-grow md:flex-grow-0 md:w-64"
          />

          <button
            type="submit"
            className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
          >
            {t("finalCta.submitButton")}
            <ArrowRight className="w-5 h-5" />
          </button>
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
    <div className="min-h-screen" style={{ background: "#050810" }}>
      {/* Version indicator */}
      <div className="fixed top-20 right-4 z-50 px-3 py-1.5 rounded-full bg-sky-500/20 text-sky-400 text-xs font-medium border border-sky-500/30">
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
