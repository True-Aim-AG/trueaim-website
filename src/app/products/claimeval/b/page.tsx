"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
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
function HeroSection() {
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
              For P&C Carriers with &gt;$50M DWP
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight"
            >
              You&apos;re Losing{" "}
              <span className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
                $3.2M a Year
              </span>{" "}
              to Claims You Never Audited.
            </motion.h1>

            {/* Subhead */}
            <motion.p
              variants={fadeUp}
              className="text-lg text-slate-400 mb-8 leading-relaxed"
            >
              ClaimEval audits 100% of your claims in real-time. Not 2%. All of
              them. Cut indemnity spend 8%. Recover missed subrogation. No new
              hires required.
            </motion.p>

            {/* Primary CTA */}
            <motion.div variants={fadeUp} className="mb-6">
              <Link
                href="#impact-calculator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all text-lg shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 group"
              >
                Show Me My Leakage
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
                SOC2 Type II Certified
              </span>
              <span className="text-slate-700">|</span>
              <span>Live on your claims system in 3 weeks</span>
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
                  Claim #2024-AUT-7832
                </span>
              </div>

              {/* Claim file content */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Policy Holder</span>
                  <span className="text-sm text-white">Sarah Mitchell</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">LOB</span>
                  <span className="text-sm text-white">Auto - Collision</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Reserve</span>
                  <span className="text-sm text-white">$18,500</span>
                </div>

                {/* Police report section */}
                <div className="mt-6 p-4 rounded-lg bg-slate-900/50 relative">
                  <p className="text-xs text-slate-500 mb-2">
                    Police Report Excerpt:
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    &quot;The claimant stated they were proceeding through the
                    intersection when the other vehicle failed to yield.{" "}
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
                      Driver admitted to texting while turning.
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
                          Missed Subrogation Detected
                        </p>
                        <p className="text-sm text-white font-bold">$15,000</p>
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
function ProblemSection() {
  const leaks = [
    {
      icon: Eye,
      title: "The Blind Spot",
      description:
        "98% of claims close without a second look. Every one is a liability you never saw.",
    },
    {
      icon: BarChart3,
      title: "The Skill Gap",
      description:
        "New adjusters miss what veterans catch. Inconsistency compounds into millions.",
    },
    {
      icon: Coins,
      title: "The Buried Recovery",
      description:
        "Subrogation signals buried in adjuster notes. Money you earned. Money you'll never collect.",
    },
  ];

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
            Your QA Process Is a Coin Flip. Your Loss Ratio Pays the Price.
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            Repair costs up 20% since 2020. Nuclear verdicts hitting $10M+.
            Junior adjusters handling files that used to go to your best people.
            And your defense? A manual audit that sees 2% of closed files.
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
              You&apos;re not managing risk. You&apos;re hoping.
            </motion.p>

            <div className="space-y-6">
              {leaks.map((leak, index) => (
                <motion.div
                  key={leak.title}
                  variants={fadeUp}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-sky-500/20 flex items-center justify-center">
                    <leak.icon className="w-6 h-6 text-sky-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {leak.title}
                    </h3>
                    <p className="text-slate-400">{leak.description}</p>
                  </div>
                </motion.div>
              ))}
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
                  2% Audited
                </text>

                {/* Mass label */}
                <rect x="250" y="320" width="140" height="30" rx="4" fill="#1E293B" />
                <text x="320" y="340" textAnchor="middle" fill="#38BDF8" fontSize="12" fontWeight="600">
                  98% Unexamined Risk
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
function SolutionSection() {
  const steps = [
    {
      icon: Database,
      title: "Ingest",
      headline: "We Read What Humans Skip.",
      body: "Structured data. Unstructured notes. Police reports. Medical bills. Adjuster shorthand. Our models were trained by claims experts with 20+ years in the field.",
    },
    {
      icon: Brain,
      title: "Analyze",
      headline: "Every File. Every Time. No Exceptions.",
      body: "Each claim runs against your best practices and 500+ leakage scenarios. We catch the $12,000 miss at 4:47 PM on a Friday.",
    },
    {
      icon: Bell,
      title: "Alert",
      headline: "Flags, Not Overrides.",
      body: "Your adjuster gets a real-time nudge inside their workflow. The AI shows the evidence. The human makes the call. Full control.",
    },
  ];

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
            Stop Auditing Claims. Start Defending Your Loss Ratio.
          </h2>
          <p className="text-lg text-slate-400">
            ClaimEval doesn&apos;t replace your adjusters. It makes every one of
            them your best one.
          </p>
        </motion.div>

        {/* Process Flow Cards */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Connecting line (hidden on mobile, shown on md+) */}
                {index < steps.length - 1 && (
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
                    <step.icon className="w-7 h-7 text-sky-400" />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-sky-400 font-medium mb-2">
                    {step.title}
                  </p>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {step.headline}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            ))}
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
                Smart Nudge
              </span>
            </div>
            <p className="text-sm text-slate-300">
              ⚠️ Coverage limit exceeded by $500. Verify policy limits before
              payment.
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
function MicroDemoSection() {
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
              Find a Leak in 30 Seconds.
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              Watch ClaimEval spot a missed recovery in a standard auto claim.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-sky-500 text-sky-400 font-medium hover:bg-sky-500/10 transition-colors"
            >
              See a Live Demo
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
                  Police Report - Claim #2024-7291
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
                  On 03/15/2024 at approximately 2:34 PM, a two-vehicle collision
                  occurred at the intersection of Main St. and Oak Ave. The
                  insured vehicle, a 2021 Honda Accord, was traveling
                  westbound.{" "}
                  <span
                    className={`transition-all duration-500 px-1 rounded ${
                      demoState === "complete"
                        ? "bg-purple-500/40 text-purple-200"
                        : ""
                    }`}
                  >
                    &quot;I was stopped at the red light when hit,&quot;
                  </span>{" "}
                  the claimant stated. The other driver was cited for failure to
                  stop. Damage assessment indicates rear-end impact consistent
                  with claimant&apos;s account.
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
                          0% Liability Detected
                        </span>
                      </div>
                      <p className="text-xs text-emerald-200">
                        Action: Open Subrogation File
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
                  {demoState === "idle" && "Scan Claim"}
                  {demoState === "scanning" && "Scanning..."}
                  {demoState === "complete" && "Scan Complete"}
                </button>
                {demoState === "complete" && (
                  <button
                    onClick={resetDemo}
                    className="px-6 py-3 rounded-lg font-medium border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors"
                  >
                    Reset
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
function DifferentiationSection() {
  const features = [
    {
      icon: Package,
      title: "No Black Box",
      description:
        "Every flag cites the policy language or data point. Your auditors can verify in seconds.",
    },
    {
      icon: Shield,
      title: "Built-In Guardrails",
      description:
        "Junior adjusters get real-time guidance. Consistency without micromanagement.",
    },
    {
      icon: ClipboardList,
      title: "Audit-Ready Trail",
      description:
        "Every decision logged. Every reason documented. Regulators ask? You're ready.",
    },
    {
      icon: Plug,
      title: "No Rip-and-Replace",
      description:
        "Layers on your existing claims platform. Live in weeks. Not years.",
    },
  ];

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
            AI That Explains Itself. Built by People Who&apos;ve Closed Claims.
          </h2>
        </motion.div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl backdrop-blur-xl border border-white/10"
              style={{ background: "rgba(30, 41, 59, 0.15)" }}
            >
              <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Section 6: Social Proof
// ============================================================================
function SocialProofSection() {
  const badges = ["SOC2 Type II", "ISO 27001", "API-First", "GDPR"];

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
            &quot;We thought AI couldn&apos;t handle complex BI files. Within 90
            days, ClaimEval surfaced{" "}
            <span className="text-sky-400 font-semibold">
              $1.2M in missed subrogation
            </span>
            . It paid for itself in Q1.&quot;
          </blockquote>
          <p className="mt-6 text-slate-500">
            – VP of Claims, Regional Auto Carrier
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
          {badges.map((badge) => (
            <span
              key={badge}
              className="px-4 py-2 rounded-full text-sm text-slate-500 border border-slate-700"
            >
              {badge}
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
function ROICalculatorSection() {
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
            Calculate What You&apos;re Losing Right Now
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Inputs */}
            <div className="space-y-6">
              {/* Annual DWP */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Annual DWP
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
                  Current Loss Ratio
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
              <p className="text-slate-400 mb-2">A 1% leakage reduction =</p>
              <motion.p
                key={savings}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2"
              >
                {formatCurrency(savings)}
              </motion.p>
              <p className="text-slate-400 mb-8">back in your reserves.</p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30"
              >
                Get My Custom Leakage Report
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
function FAQSection() {
  const faqs = [
    {
      question: "Will this replace my adjusters?",
      answer:
        "No. ClaimEval handles the audit burden. Your team handles judgment, negotiation, and customer care.",
    },
    {
      question: "How secure is my data?",
      answer:
        "SOC2 Type II. ISO 27001. Encrypted at rest. We never train on your data without consent.",
    },
    {
      question: "How long until we see results?",
      answer:
        "Most carriers are live in 3–4 weeks. Measurable impact by month 3.",
    },
  ];

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
          FAQ
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl border border-slate-800"
            >
              <h3 className="text-lg font-semibold text-white mb-3">
                {faq.question}
              </h3>
              <p className="text-slate-400">{faq.answer}</p>
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
function FinalCTASection() {
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
            Your Claims Data Has Answers. Let&apos;s Find Them.
          </h2>
          <p className="text-lg text-slate-400 mb-12">
            30-minute strategy session. Live leakage analysis on your book of
            business. No pitch deck. Just data.
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
            <option value="">Primary Line of Business</option>
            <option value="auto">Auto</option>
            <option value="property">Property</option>
            <option value="wc">Workers&apos; Comp</option>
          </select>

          <select
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white focus:outline-none focus:border-sky-500 transition-colors md:w-auto"
          >
            <option value="">Claims Volume</option>
            <option value="lt10k">&lt;10k</option>
            <option value="gt10k">10k+</option>
          </select>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Work Email"
            className="px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-colors flex-grow md:flex-grow-0 md:w-64"
          />

          <button
            type="submit"
            className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
          >
            Analyze My Leakage
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
  return (
    <div className="min-h-screen" style={{ background: "#050810" }}>
      {/* Version indicator */}
      <div className="fixed top-20 right-4 z-50 px-3 py-1.5 rounded-full bg-sky-500/20 text-sky-400 text-xs font-medium border border-sky-500/30">
        Version B
      </div>

      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <MicroDemoSection />
      <DifferentiationSection />
      <SocialProofSection />
      <ROICalculatorSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}
