"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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

const pipelineSteps = [
  {
    step: 1,
    title: "Ingest",
    description: "Transforms documents into machine-readable text/layout using Azure DI, vision models, OCR.",
    icon: Upload,
  },
  {
    step: 2,
    title: "Classify",
    description: "Identifies document type and language to route correctly: loss notice, police report, invoice, etc.",
    icon: FileType,
  },
  {
    step: 3,
    title: "Extract",
    description: "Pulls structured fields based on document type. Normalizes so same concept looks the same everywhere.",
    icon: FileText,
  },
  {
    step: 4,
    title: "Quality Gates",
    description: "Automated checks validate completeness and consistency. Pass / Warn / Fail scoring.",
    icon: ShieldCheck,
  },
  {
    step: 5,
    title: "QA Console",
    description: "Human-in-the-loop review workspace. Quickly confirm, correct, and label documents.",
    icon: Users,
  },
];

const outputFeatures = [
  {
    title: "Clean structured dataset",
    description: "Key fields extracted and normalized",
    icon: CheckCircle,
  },
  {
    title: "Quality status",
    description: "Pass/Warn/Fail per document and run",
    icon: FileCheck,
  },
  {
    title: "Evidence links",
    description: "From each field back to originating document text",
    icon: Link2,
  },
  {
    title: "Human labels",
    description: "Optional notes where review was performed",
    icon: MessageSquare,
  },
];

const metrics = [
  { value: "97%", label: "Document Coverage" },
  { value: "97.3%", label: "Accuracy" },
  { value: "96.5%", label: "Evidence Rate" },
  { value: "0", label: "Doc Type Wrong" },
];

export default function ContextBuilderPage() {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--aurora-cyan)]/20 text-[var(--aurora-cyan)] text-sm font-medium mb-6">
              <FileSearch className="w-4 h-4" />
              Document Pipeline
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              ContextBuilder: From Messy Documents to Trusted Data
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
              A claims document pipeline that turns PDFs, scans, and images into structured, quality-checked claim data—with human review where it matters.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#demo"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[var(--aurora-cyan)] text-white font-medium hover:bg-[#0891b2] transition-colors text-lg shadow-lg shadow-[var(--aurora-cyan)]/30"
              >
                Explore ContextBuilder
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--primary-light)] transition-colors text-lg"
              >
                Start Free Trial
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
              The Document Chaos Problem
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Claims arrive as chaotic document bundles: blurry photos, multi-page PDFs, scanned forms. Extracting accurate data is slow, error-prone, and expensive.
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
              Purpose-Built Pipeline for Claims
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              ContextBuilder is a purpose-built pipeline for claims documents. It automatically ingests, classifies, and extracts data—then applies quality gates to surface exceptions for human review.
            </p>
            <p className="text-lg text-[var(--text-primary)] font-medium mt-4">
              The result: claim-ready &quot;context packs&quot; that downstream systems can trust.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pipeline Steps */}
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
              5-Step Pipeline
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              From raw documents to structured data
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[var(--aurora-cyan)] via-[var(--primary)] to-emerald-500" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {pipelineSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="glass-panel glass-panel-hover p-6 h-full text-center">
                    <div className="w-12 h-12 rounded-full bg-[var(--aurora-cyan)] text-white flex items-center justify-center text-lg font-bold mx-auto mb-4 relative z-10">
                      {step.step}
                    </div>

                    <div className="w-14 h-14 rounded-xl bg-[var(--aurora-cyan)]/20 flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-7 h-7 text-[var(--aurora-cyan)]" />
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

      {/* Demo / GitHub Section */}
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
              Explore the Code
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              ContextBuilder is built with transparency in mind
            </p>
          </motion.div>

          <motion.div
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
              AgenticContextBuilder
            </h3>
            <p className="text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
              Explore our open-source document processing pipeline on GitHub. See how we transform unstructured claims documents into structured, trusted data.
            </p>
            <a
              href="https://github.com/Fr3nn3r/AgenticContextBuilder"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white text-[var(--background)] font-medium hover:bg-white/90 transition-colors text-lg"
            >
              View on GitHub
              <ExternalLink className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Output Section */}
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
              What You Get: A Claim-Ready Context Pack
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {outputFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel glass-panel-hover p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--aurora-cyan)]/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[var(--aurora-cyan)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
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
              Performance Metrics
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center glass-panel p-8"
              >
                <p className="text-5xl font-bold text-[var(--aurora-cyan)] font-mono-data mb-2">
                  {metric.value}
                </p>
                <p className="text-[var(--text-secondary)] text-sm">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>
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
              Process a Sample of Your Documents
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10">
              Send us 50 claim documents. We&apos;ll run them through ContextBuilder and show you the extraction quality, error analysis, and time savings.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[var(--aurora-cyan)] text-white font-medium hover:bg-[#0891b2] transition-colors text-lg shadow-lg shadow-[var(--aurora-cyan)]/30"
            >
              Start Free Trial
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
