"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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

const features = [
  {
    title: "Risk Scoring",
    description: "Every claim scored based on configurable rules. Flag counts highlight potential issues. Sort by risk to prioritize review.",
    icon: BarChart3,
  },
  {
    title: "Inspection Catalogues",
    description: "Pre-built checks designed for a range of insurance use cases. Configurable inspection definitions. Each check provides clear findings, context and next steps.",
    icon: ListChecks,
  },
  {
    title: "Reviewer Workflow",
    description: "Filter by line of business, status, risk score etc. Track reviewed vs. not reviewed. Assess document reviewer findings.",
    icon: Users,
  },
];

const motorZones = [
  "Claim Setup & File Integrity",
  "Liability & Decision Coherence",
  "Customer Communication",
  "Repair & Supplier Handling",
  "Total Loss & Valuation",
  "Credit Hire / AMC",
  "Financial Hygiene & Recoveries",
];

const homeZones = [
  "Coverage & Causation",
  "Investigation & Evidence Adequacy",
  "Repairs & Supplier Oversight",
  "Cash Settlements & Vulnerability",
  "Alternative Accommodation",
];

const lifeZones = [
  "Policy Validity & Beneficiary Checks",
  "Cause of Death & Exclusion Review",
  "Medical Evidence Adequacy",
  "Payout Calculation",
  "Contestability Period Compliance",
];

const warrantyZones = [
  "Coverage Scope & Component Eligibility",
  "Repair vs Replacement Logic",
  "Supplier & Parts Verification",
  "Cost Position & Excess",
  "Policy Term & Mileage Compliance",
];

export default function ClaimEvalPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <ClipboardCheck className="w-4 h-4" />
              Quality Assurance
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              ClaimEval: Scale Quality Assurance Beyond Sampling
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
              Move from manual, sample-based QA to consistent inspections across your entire claims portfolio. Surface exceptions. Prioritize human effort.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#demo"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors text-lg shadow-lg shadow-emerald-500/30"
              >
                See ClaimEval In Action
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--primary-light)] transition-colors text-lg"
              >
                Book a Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center glass-panel p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              The Sampling Problem
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Traditional QA relies on random sampling, checking a small percentage of claims. Patterns slip through. Leakage compounds. Training gaps persist.
            </p>
            <p className="text-xl font-semibold text-emerald-400 mt-6">
              What if you could QA every claim?
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              100% Coverage, Intelligent Prioritization
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              ClaimEval runs defined inspection checks across all closed claims. It scores risk, flags issues and surfaces the claims that need human attention.
            </p>
            <p className="text-base text-[var(--text-secondary)] mt-4 leading-relaxed">
              ClaimEval is a quality assurance layer. It augments your claims handlers, it does not replace them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              Key Features
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel glass-panel-hover p-8"
              >
                <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              See ClaimEval in Action
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Interactive demo of claims inspection and review
            </p>
          </motion.div>

          <motion.div
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
                title="ClaimEval Demo"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Inspection Zones Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              Coverage Areas
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Pre-built check catalogues for Motor, Home, Life, Warranty and more
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Motor */}
            <motion.div
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
                  Motor
                </h3>
              </div>
              <ul className="space-y-3">
                {motorZones.map((zone) => (
                  <li key={zone} className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    {zone}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Home */}
            <motion.div
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
                  Home
                </h3>
              </div>
              <ul className="space-y-3">
                {homeZones.map((zone) => (
                  <li key={zone} className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    {zone}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Life */}
            <motion.div
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
                  Life
                </h3>
              </div>
              <ul className="space-y-3">
                {lifeZones.map((zone) => (
                  <li key={zone} className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    {zone}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Warranty */}
            <motion.div
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
                  Warranty
                </h3>
              </div>
              <ul className="space-y-3">
                {warrantyZones.map((zone) => (
                  <li key={zone} className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    {zone}
                  </li>
                ))}
              </ul>
              <Link
                href="/case-studies/vehicle-warranty-claims"
                className="inline-flex items-center gap-2 mt-4 text-sm text-[var(--primary)] font-medium hover:underline"
              >
                See Warranty Provider case study
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Example Inspection Check */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 glass-panel p-8 max-w-3xl mx-auto"
          >
            <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-4">Example Inspection Check</div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="font-semibold text-[var(--text-primary)] mb-2">Reserve Adequacy Check</h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                  Compares initial reserve against final settlement amount across all closed claims. Flags cases where the reserve was more than 30% below the final payout, indicating potential under-reserving patterns.
                </p>
                <div className="flex items-center gap-4 text-xs">
                  <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 font-medium">Pass: within tolerance</span>
                  <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-400 font-medium">Warn: 15-30% deviation</span>
                  <span className="px-2 py-1 rounded bg-red-500/20 text-red-400 font-medium">Fail: &gt;30% deviation</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              Run ClaimEval on Your Closed Claims
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10">
              We&apos;ll analyze a batch of your historical claims and show you the inspection results, risk distribution and priority findings.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors text-lg shadow-lg shadow-emerald-500/30"
            >
              Book a Demo
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
