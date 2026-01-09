"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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

const workflowSteps = [
  {
    step: 1,
    title: "Ingestion",
    description: "Key data placed into computable contract from emails, PDFs, photos, scanned notes.",
    icon: FileInput,
  },
  {
    step: 2,
    title: "Comprehension",
    description: "Agentic swarm reads case file: identifies parties, creates timeline, extracts key data.",
    icon: Search,
  },
  {
    step: 3,
    title: "Determination",
    description: "Deterministic logic computes: Covered | Partially Covered | Not Covered | Need More Info.",
    icon: Scale,
  },
  {
    step: 4,
    title: "Action",
    description: "Tasks executed: open claim, set reserves, draft payment, draft communications.",
    icon: Zap,
  },
  {
    step: 5,
    title: "Output",
    description: "Clear, auditable deliverables: internal report, customer letter, audit logs.",
    icon: FileOutput,
  },
];

const capabilities = [
  {
    title: "Coverage Determination",
    description: "Computes the entire policy against claim facts. Identifies applicable perils, exclusions, conditions. Calculates exact cost positions for each risk taker.",
    icon: CheckCircle,
  },
  {
    title: "Multi-Vertical Support",
    description: "Insurance: Health, Pet, Motor, Household. Tax: Withholding claims, Relief at Source. Travel: Flight refunds, train refunds, accommodation.",
    icon: Globe,
  },
  {
    title: "Integration Ready",
    description: "API-first architecture. Compatible with Guidewire, Duck Creek, and standard ERPs. Flexible deployment: cloud or on-premise.",
    icon: Plug,
  },
  {
    title: "Compliance Built-In",
    description: "Every decision linked to legal text. Complete audit logs for regulator review. Aligned with EU AI Act requirements.",
    icon: Shield,
  },
];

const metrics = [
  { value: "89%", label: "Faster than manual review", prefix: "UP TO", icon: Clock },
  { value: "68%", label: "Reduction in handling costs", prefix: "UP TO", icon: DollarSign },
  { value: "2-5%", label: "Leakage reduction from closed file reviews", icon: TrendingDown },
];

export default function MiraPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 via-white to-white" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-[var(--primary)] opacity-5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-[var(--primary)] text-sm font-medium mb-6">
              <Brain className="w-4 h-4" />
              Decisioning Engine
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              MIRA: The Neuro-Symbolic Decisioning Engine
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
              Transform complex policy terms into automated, fully-deterministic claim decisions. Every outcome traceable to the legal text.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#demo"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg"
              >
                See MIRA in Action
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--background-secondary)] transition-colors text-lg"
              >
                Request a Pilot
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-[var(--background-secondary)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              Claims Decisions Are Still Manual, Inconsistent, and Opaque
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Today&apos;s claims handlers spend hours interpreting dense policy language. Decisions vary by handler. Audit preparation consumes weeks. And probabilistic AI tools can&apos;t explain their reasoning.
            </p>
            <p className="text-xl font-semibold text-[var(--primary)] mt-6">
              MIRA changes everything.
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
              Agentic AI Meets Deterministic Logic
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              MIRA is the world&apos;s first neuro-symbolic engine purpose-built for claims. It uses agentic AI for intelligent workflow orchestration—reading documents, extracting data, identifying parties—while relying on deterministic logic for the actual coverage decision.
            </p>
            <p className="text-lg text-[var(--text-primary)] font-medium mt-4">
              The result: decisions that are fast, consistent, and completely explainable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Workflow Steps */}
      <section className="py-20 px-6 bg-[var(--background-secondary)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              How MIRA Works
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Five steps from document to decision
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[var(--primary)] via-[var(--trust)] to-[var(--secondary)]" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl border border-[var(--border)] p-6 h-full text-center hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-lg font-bold mx-auto mb-4 relative z-10">
                      {step.step}
                    </div>

                    <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-7 h-7 text-[var(--primary)]" />
                    </div>

                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
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
              See MIRA in Action
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Interactive demo of MIRA processing travel claims
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl bg-white"
          >
            <div className="aspect-[16/9] w-full">
              <iframe
                src="https://mira-travel-demo.vercel.app/products"
                className="w-full h-full"
                title="MIRA Demo"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 px-6 bg-[var(--background-secondary)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              Capabilities
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-[var(--border)] p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-6">
                  <cap.icon className="w-7 h-7 text-[var(--primary)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                  {cap.title}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
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
              Proven Results
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-[var(--border)]"
              >
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                  <metric.icon className="w-8 h-8 text-[var(--primary)]" />
                </div>
                {metric.prefix && (
                  <p className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                    {metric.prefix}
                  </p>
                )}
                <p className="text-5xl font-bold text-[var(--primary)] mb-2">
                  {metric.value}
                </p>
                <p className="text-[var(--text-secondary)]">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[var(--text-primary)] to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
              See MIRA on Your Claims
            </h2>
            <p className="text-lg text-gray-300 mb-10">
              We&apos;ll process a sample of your closed claims and show you exactly how MIRA would have handled them.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg"
            >
              Request a Pilot
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
