"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Clock,
  CheckCircle,
  Quote,
  TrendingUp,
  FileText,
  Layers,
  ShieldCheck,
  Globe,
  Lock,
  Cog,
  Users,
  ChevronDown,
  Zap,
  Target,
  Database,
  Eye,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6 } as const,
};

function ExpandableSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="glass-panel overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[var(--subtle-bg)]/50 transition-colors"
      >
        <span className="font-semibold text-sm text-[var(--text-primary)]">
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="px-5 pb-5 pt-0">{children}</div>}
    </div>
  );
}

export default function ClaimPilotMotorWarrantyCaseStudy() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[var(--background)] to-slate-900">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[var(--primary)] opacity-10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 py-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              All Case Studies
            </Link>

            {/* Customer Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-[var(--subtle-bg)] flex items-center justify-center">
                <Building2 className="w-8 h-8 text-[var(--text-muted)]" />
              </div>
              <div>
                <div className="text-lg font-medium text-[var(--text-primary)]">
                  European Motor Warranty Insurer
                </div>
                <div className="text-[var(--text-muted)]">
                  Motor Warranty Insurance (P&amp;C) · 3,000 claims/month · 79+
                  garages
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              Complex motor warranty claims reduced from 55 minutes to under 10
              with AI-assisted decisioning
            </h1>
            <p className="text-xl md:text-2xl text-[var(--primary)] font-semibold mb-6">
              Multilingual, multi-document claims automation with 52%
              straight-through processing
            </p>

            {/* Product & Timeline */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm px-3 py-1.5 rounded-full font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                ClaimPilot
              </span>
              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                <Clock className="w-4 h-4" />
                POC to production in weeks
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
          >
            {[
              {
                value: "52%",
                label: "Straight-through processing",
                improvement: "targeting 65%+",
              },
              {
                value: "40+",
                label: "Minutes saved per reviewed claim",
                improvement: "per claim",
              },
              {
                value: "97%+",
                label: "Verdict accuracy",
                improvement: "automated claims",
              },
              {
                value: "87%",
                label: "Payout accuracy",
                improvement: "exact match",
              },
              {
                value: "Weeks",
                label: "POC to production",
                improvement: "rapid deployment",
              },
            ].map((metric) => (
              <div key={metric.label} className="glass-panel p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold font-mono-data text-[var(--primary)] mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-[var(--text-muted)]">
                  {metric.label}
                </div>
                {metric.improvement && (
                  <div className="text-xs text-[var(--secondary)] mt-1">
                    {metric.improvement}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === MAIN CONTENT + SIDEBAR === */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-8">
            {/* Main Content */}
            <article className="space-y-16">
              {/* 1. Problem */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Problem
                </h2>
                <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                  <p>
                    A European motor warranty insurer processes 3,000 claims per
                    month from a network of 79 independent garages across
                    Switzerland. Each claim arrives as a stack of PDFs: a
                    multi-page repair cost estimate with 50 to 100 line items, a
                    warranty certificate, possibly a service history, sometimes a
                    diagnostic report. Written in German, French or Italian.
                    Mixing OEM part numbers, labor codes, hourly rates and
                    multi-page VAT calculations.
                  </p>
                  <p>
                    The adjuster reads every line. Cross-references each item
                    against the warranty policy. Calculates the payout. Checks
                    the arithmetic. Keys the result into the claims system. That
                    takes an average of 55 minutes per claim. At 3,000 claims per
                    month, nine full-time adjusters do nothing but clear the
                    queue.
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { value: "3,000", label: "Claims per month" },
                    { value: "55 min", label: "Avg handling time" },
                    { value: "79+", label: "Garages" },
                    { value: "3", label: "Languages (DE/FR/IT)" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="glass-panel-light p-4 text-center"
                    >
                      <div className="text-lg font-bold font-mono-data text-[var(--primary)]">
                        {stat.value}
                      </div>
                      <div className="text-xs text-[var(--text-muted)]">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Requirements */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                    Defined outcomes
                  </h3>
                  <div className="space-y-2">
                    {[
                      "We need to process the majority of claims without increasing headcount",
                      "We need high confidence on rejections first. A wrong rejection is less costly than a wrong approval",
                      'We need three clear buckets: rejected, needs review, fully approved. With an estimated cost and flagging of non-covered parts',
                      "We need full auditability. Every decision must be explainable to the regulator",
                    ].map((req) => (
                      <div
                        key={req}
                        className="glass-panel-light p-3 text-sm text-[var(--text-secondary)] flex items-start gap-3"
                      >
                        <Quote className="w-4 h-4 text-[var(--primary)] flex-shrink-0 mt-0.5 opacity-50" />
                        <span>&ldquo;{req}&rdquo;</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Constraints */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                    Key constraints
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        icon: Cog,
                        title: "System constraint",
                        desc: "The insurer's internal IT team handles intake, upload, policy lookups and storage. ClaimPilot must operate via API integration, not replace the core system.",
                      },
                      {
                        icon: ShieldCheck,
                        title: "Regulatory constraint",
                        desc: "Swiss insurance regulation requires every automated decision to be traceable to source evidence. No black-box outputs.",
                      },
                      {
                        icon: Globe,
                        title: "Operational constraint",
                        desc: "79 garages with no standardized invoice format across three languages. The system must handle vocabulary it has never seen before without failing silently.",
                      },
                      {
                        icon: Users,
                        title: "Volume constraint",
                        desc: "3,000 claims per month with seasonal peaks. Nine full-time adjusters dedicated to clearing the queue.",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="glass-panel p-5 flex gap-4"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/20 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-[var(--primary)]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[var(--text-primary)] mb-1">
                            {item.title}
                          </h4>
                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* 2. First-Principles Design */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  First-principles design
                </h2>

                <div className="space-y-8">
                  {/* Design Block 1: Deterministic vs LLM */}
                  <div className="glass-panel p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <Target className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Constraint
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          76% of claim denials are coverage lookups. A
                          deterministic check, not a judgment call. Sending a full
                          claim to an LLM and asking &ldquo;should this be
                          approved?&rdquo; produced 18% accuracy on the first
                          attempt. LLMs hallucinate part names, invent coverage
                          rules and fail at multi-step financial calculations.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <Cog className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Design
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          Separate what requires judgment from what requires
                          precision. Deterministic checks run first for everything
                          that has a known right answer: policy validity, mileage
                          limits, known exclusions. The LLM only handles genuinely
                          ambiguous items where language understanding matters.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Outcome
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          Deterministic checks handle roughly 60% of line items
                          at perfect confidence with zero LLM cost. The LLM sees
                          only the 10-20% that genuinely require interpretation.
                          Cost stays low. Accuracy stays high where it matters
                          most.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Design Block 2: Multilingual Vocabulary */}
                  <div className="glass-panel p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Constraint
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          Every garage formats invoices differently. A
                          &ldquo;Dichtring f. Flanschwelle&rdquo; (seal for flange
                          shaft) on one invoice is &ldquo;Joint d&apos;arbre de
                          bride&rdquo; on another. German compound words, French
                          abbreviations and Swiss number formatting (space as
                          thousands separator, comma as decimal) make pure keyword
                          matching fragile. It breaks on the first synonym it
                          hasn&apos;t seen.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <Layers className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Design
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          Three-tier coverage matching. Tier 1: deterministic
                          rules at confidence 1.0 for known items (fees,
                          consumables, known exclusions). Tier 2: keyword matching
                          with umlaut normalization and compound-word
                          decomposition across German and French. Tier 3: LLM
                          classification as a calibrated fallback with explicit
                          confidence scoring. Items below 0.50 confidence route to
                          human review rather than being forced into a decision.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Outcome
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          Rules resolve 40-50% of items instantly. Keywords catch
                          another 30-40%. The LLM handles only the genuinely
                          ambiguous remainder. New vocabulary enters the system
                          through a knowledge graph that learns from confirmed
                          adjuster decisions, improving Tier 2 coverage over time
                          without code changes.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Design Block 3: Confidence and Assumptions */}
                  <div className="glass-panel p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <Eye className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Constraint
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          The insurer&apos;s head of claims was explicit: a wrong
                          approval is worse than a wrong rejection. But a system
                          that silently rejects everything above a confidence
                          threshold creates adjuster workload and customer
                          complaints. The system must know what it does not know.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <Database className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Design
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          Every coverage decision, every screening check and
                          every clause evaluation records whether it was
                          deterministic or assumption-based. When ClaimPilot must
                          assume something to reach a verdict, it records the
                          assumption, flags the claim as REFER, preserves its lean
                          (approve or deny) and generates targeted questions for
                          the adjuster. Each question points to the specific
                          assumption that needs confirmation.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Outcome
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          The adjuster does not start from a blank screen. They
                          see a pre-classified claim with specific questions
                          targeting only the gaps in evidence. 55 minutes of
                          manual review compressed into a focused confirmation
                          step.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Design Block 4: Regulatory Auditability */}
                  <div className="glass-panel p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <Lock className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Constraint
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          Swiss regulation requires that any automated decision
                          can be reconstructed exactly as it was made. If a model
                          version changes, prompts change, or rules change between
                          claim submission and audit, the insurer must still be
                          able to reproduce the original decision environment.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Design
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          Every pipeline run captures a version bundle: the exact
                          code commit, model versions, prompt template hashes and
                          extraction spec hashes. Every decision is written to a
                          hash-chained ledger where each record links to the
                          previous via cryptographic hash, making tampering or
                          deletion detectable. Every extracted value traces to a
                          specific page, character range and extraction method in
                          the source document.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Outcome
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          If a regulator asks why claim X was decided in a
                          specific way, the insurer reconstructs the exact
                          processing environment. This goes beyond reporting. It
                          is how every decision is stored.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 3. Architecture */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Architecture
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  ClaimPilot runs a two-level pipeline. The first level processes
                  individual documents in parallel. The second level aggregates
                  results across all documents in a claim and produces a
                  decision.
                </p>

                {/* Pipeline Visualization */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-8">
                  {[
                    {
                      icon: FileText,
                      label: "Document Ingestion",
                      stage: "1",
                    },
                    {
                      icon: Layers,
                      label: "Claim Reconciliation",
                      stage: "2",
                    },
                    { icon: ShieldCheck, label: "Decision Engine", stage: "3" },
                    { icon: Users, label: "Adjuster Workflow", stage: "4" },
                  ].map((s) => (
                    <div
                      key={s.stage}
                      className="glass-panel-light p-3 text-center"
                    >
                      <s.icon className="w-5 h-5 text-[var(--primary)] mx-auto mb-1" />
                      <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                        Stage {s.stage}
                      </div>
                      <div className="text-xs font-medium text-[var(--text-primary)]">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Architecture Detail Sections */}
                <div className="space-y-3">
                  <ExpandableSection
                    title="1. Document ingestion and extraction"
                    defaultOpen
                  >
                    <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            OCR with word-level coordinate preservation. Every
                            extracted field links to a page and character range
                            for downstream audit.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Classification into 14 document types using
                            language-aware routing. German, French and Italian
                            classification cues are defined per document type.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Page-by-page extraction for multi-page cost
                            estimates. Header information from page one. Line
                            items extracted per page, with carry-forward subtotals
                            handled across page boundaries. Financial summary
                            from the last page.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Financial cross-check: when the system locates a
                            labeled subtotal, VAT amount and grand total and the
                            arithmetic checks out within tolerance, the
                            extraction is marked triple-verified at confidence
                            1.0.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Six document-level fraud inspectors run in parallel:
                            PDF signature validation, metadata analysis, source
                            consistency (DPI variance, mixed color spaces),
                            error-level analysis targeting financial field
                            regions, copy-move detection and synthetic document
                            detection. Each produces structured signals with
                            severity, confidence and evidence pointing to specific
                            document regions.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </ExpandableSection>

                  <ExpandableSection title="2. Claim reconciliation and screening">
                    <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Reconciliation aggregates facts across all documents
                            in a claim. When the same fact appears in multiple
                            documents, the highest-confidence version is selected.
                            Conflicts are logged.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Twelve deterministic screening checks run without any
                            LLM involvement: policy enforcement, policy validity,
                            damage date validation, service compliance
                            (manufacturer-specific intervals across 18 vehicle
                            brands covering petrol, diesel, hybrid and electric
                            variants), shop authorization, mileage limits,
                            DTC-based exclusions, component coverage, labor
                            linkage to covered parts, hybrid-specific exclusions,
                            damage cause exclusions and policyholder type checks.
                            Hard failures trigger automatic rejection.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Coverage analysis applies the three-tier matching
                            pipeline described above. Post-processing hooks
                            handle labor linkage (covered part means its
                            installation labor is also covered), orphan labor
                            demotion, diagnostic labor protection and
                            cross-validation of LLM decisions against
                            deterministic rules.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </ExpandableSection>

                  <ExpandableSection title="3. Decision engine">
                    <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            A registry of denial clauses maps to the
                            insurer&apos;s actual policy terms. Each clause is
                            tagged by evaluability tier: deterministic (can be
                            checked automatically), inferrable (requires
                            interpretation) or not automatable (requires human
                            judgment).
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            For every clause, ClaimPilot records pass/fail, the
                            evidence used and whether an assumption was made.
                            Assumptions default to the benefit of the claimant.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Fraud scoring aggregates document-level signals with
                            nine claim-level inspectors: VIN validation,
                            arithmetic consistency, date consistency, mileage
                            progression (persistent per-vehicle history),
                            near-duplicate detection, template matching, pricing
                            anomaly detection against garage-specific baselines,
                            garage profiling and entity network analysis.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            If all hard checks pass but the system had to assume
                            something along the way, the verdict becomes REFER.
                            The original verdict is preserved as the system&apos;s
                            lean. Auto-generated questions target the specific
                            assumptions that need confirmation.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </ExpandableSection>

                  <ExpandableSection title="4. Interface and adjuster workflow">
                    <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Three-bucket triage: Rejected, Needs Review,
                            Approved.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Pre-classified line items sorted by coverage status,
                            with match method and confidence visible per item.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Financial summary computed: covered amount,
                            deductible, VAT, mileage-dependent reimbursement
                            tiers.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Fraud signals flagged with severity and evidence.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            Provenance highlighting: click any extracted field to
                            see exactly where it came from in the source document.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>
                            For referred claims: targeted questions displayed
                            alongside the system&apos;s lean, allowing the
                            adjuster to confirm or override each assumption
                            individually.
                          </span>
                        </li>
                      </ul>
                      <div className="glass-panel-light p-3 mt-3 text-xs text-[var(--text-secondary)]">
                        <span className="font-medium text-[var(--text-primary)]">
                          The deterministic boundary is explicit.
                        </span>{" "}
                        Screening checks (all twelve), financial calculations,
                        known coverage lookups, payout computation and denial
                        clause evaluation run without LLM involvement. ClaimPilot
                        uses the LLM for three things only: document
                        classification, ambiguous coverage items that escape rules
                        and keywords (Tier 3) and generating human-readable
                        verdict explanations (with a deterministic template
                        fallback if the LLM is unavailable). This boundary is a
                        design choice, not a side effect.
                      </div>
                    </div>
                  </ExpandableSection>
                </div>
              </motion.div>

              {/* 4. Integration */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                  Integration into existing ecosystem
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  ClaimPilot does not replace the insurer&apos;s core
                  infrastructure. It is the reasoning layer between document
                  intake and adjuster decision.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* What stays */}
                  <div className="glass-panel p-5">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[var(--text-muted)]" />
                      What stays in the insurer&apos;s systems
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Claim intake and document storage",
                        "Policy lookups and payment status",
                        "User management and authentication",
                        "Formal cover checks (dates, policy validity)",
                        "Final payment processing and customer communication",
                      ].map((item) => (
                        <li
                          key={item}
                          className="text-sm text-[var(--text-secondary)] flex items-start gap-2"
                        >
                          <span className="text-[var(--text-muted)]">
                            &bull;
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What ClaimPilot handles */}
                  <div className="glass-panel p-5 border-l-2 border-l-[var(--primary)]">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[var(--primary)]" />
                      What ClaimPilot handles
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Document reading (OCR, classification, structured extraction)",
                        "Material coverage analysis (the three-tier matching pipeline)",
                        "Fraud signal generation (document and claim-level)",
                        "Decision recommendation with per-item confidence scoring",
                        "Audit trail and compliance artifacts",
                      ].map((item) => (
                        <li
                          key={item}
                          className="text-sm text-[var(--text-secondary)] flex items-start gap-2"
                        >
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Data Flow */}
                <div className="glass-panel-light p-4">
                  <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    Data flow
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Policy data arrives as structured JSON via the insurer&apos;s
                    API. Claim documents are uploaded or pushed via an integration
                    endpoint. ClaimPilot returns a structured decision package:
                    per-line-item coverage verdicts, financial summary, fraud
                    signals, overall confidence score and (for referred claims)
                    targeted adjuster questions. The insurer&apos;s system
                    consumes this package and presents it to the adjuster within
                    their existing workflow. Adjuster confirmations and overrides
                    flow back into the knowledge graph, improving coverage
                    matching accuracy over time.
                  </p>
                </div>
              </motion.div>

              {/* 5. Results */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Results
                </h2>

                <div className="glass-panel overflow-hidden overflow-x-auto mb-6">
                  <table className="w-full text-sm min-w-[400px]">
                    <tbody>
                      {[
                        [
                          "Straight-through processing rate",
                          "52% (targeting 65%+)",
                          true,
                        ],
                        [
                          "Time saved per reviewed claim",
                          "40+ minutes",
                          false,
                        ],
                        [
                          "Verdict accuracy on automated claims",
                          "97%+",
                          true,
                        ],
                        ["Payout accuracy", "87% exact match", false],
                        ["POC to production", "Weeks", false],
                      ].map((row) => (
                        <tr
                          key={row[0] as string}
                          className={`border-b border-[var(--border)]/50 ${row[2] ? "bg-[var(--primary)]/5" : ""}`}
                        >
                          <td
                            className={`py-3 px-4 ${row[2] ? "font-semibold text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}
                          >
                            {row[0] as string}
                          </td>
                          <td
                            className={`py-3 px-4 text-right font-mono-data ${row[2] ? "font-bold text-[var(--primary)]" : "text-[var(--text-primary)]"}`}
                          >
                            {row[1] as string}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                  <p>
                    The 48% of claims that still require human review arrive
                    pre-classified: line items are already sorted by coverage
                    status, financial summaries are pre-computed, fraud signals
                    are flagged and targeted questions are generated. The adjuster
                    is no longer starting from a blank screen but instead
                    confirming and refining a structured output.
                  </p>
                  <p>
                    At approximately 1,440 reviewed claims per month and over 40
                    minutes saved per claim, this equates to more than 950
                    person-hours recovered monthly. This creates immediate
                    capacity to absorb volume growth without increasing headcount.
                  </p>
                  <p>
                    The 52% straight-through processing rate reflects a
                    controlled deployment with a deliberate confidence threshold.
                    As the system learns from confirmed decisions and
                    garage-level pricing baselines mature, this rate is expected
                    to increase toward 65% and beyond without requiring changes
                    to the underlying system.
                  </p>
                  <p>
                    The remaining payout variance is not an error margin but a
                    function of disciplined uncertainty handling. Where confidence
                    is insufficient, ClaimPilot routes the claim for human review
                    rather than forcing a potentially incorrect outcome. The
                    system is designed to prioritize correctness over forced
                    automation, ensuring that automation scales without
                    compromising decision quality.
                  </p>
                </div>
              </motion.div>

              {/* 6. Strategic Impact */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Strategic impact
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  Beyond operational efficiency:
                </p>

                <div className="space-y-6">
                  {[
                    {
                      num: "1",
                      title: "Compliance as competitive advantage.",
                      desc: "Full decision traceability (version bundles, hash-chained ledger, source-to-decision provenance chains) meets Swiss regulatory requirements today. Most peers still run manual audit processes. ClaimPilot builds compliance into every decision by default, not as a bolt-on.",
                    },
                    {
                      num: "2",
                      title: "Underwriting intelligence.",
                      desc: "The system generates data that did not exist before: component-level payout concentration by brand and model, garage pricing baselines, denial pattern analysis across the portfolio. This feeds product refinement and reserve modelling.",
                    },
                    {
                      num: "3",
                      title: "Configuration-driven scalability.",
                      desc: "The core pipeline does not change between customers. Extraction specs, screening rules, coverage configuration and denial clause registries are injected through configuration. New products or geographies are onboarded by adding a workspace with the relevant business rules, not by writing code.",
                    },
                  ].map((lesson) => (
                    <div key={lesson.num} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-[var(--primary)]/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-[var(--primary)]">
                          {lesson.num}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[var(--text-primary)] mb-1">
                          {lesson.title}
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          {lesson.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quote */}
              <motion.div
                {...fadeIn}
                className="glass-panel p-8 border-l-4 border-l-[var(--primary)]"
              >
                <Quote className="w-10 h-10 text-[var(--primary)] mb-4 opacity-50" />
                <blockquote className="text-lg text-[var(--text-primary)] italic mb-4">
                  ClaimPilot is developed by True Aim AG, a Swiss insurtech
                  company headquartered in Zug, Switzerland. For technical
                  discussions or pilot scoping, contact us at hello@trueaim.ai.
                </blockquote>
                <div className="text-sm">
                  <div className="font-semibold text-[var(--text-primary)]">
                    True Aim AG
                  </div>
                  <div className="text-[var(--text-muted)]">
                    Zug, Switzerland
                  </div>
                </div>
              </motion.div>
            </article>

            {/* Sidebar */}
            <aside aria-label="Key highlights">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-panel p-6"
              >
                <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                  Key Highlights
                </h3>
                <ul className="space-y-3">
                  {[
                    "52% straight-through processing rate",
                    "40+ minutes saved per reviewed claim",
                    "97%+ verdict accuracy on automated claims",
                    "87% payout accuracy (exact match)",
                    "950+ person-hours recovered monthly",
                    "Multilingual: DE/FR/IT",
                    "Full regulatory auditability",
                    "POC to production in weeks",
                  ].map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[var(--text-secondary)]">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-[var(--border)]">
                  <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
                    Product
                  </h4>
                  <div className="space-y-2">
                    <span className="block text-sm px-3 py-2 rounded-lg font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center">
                      ClaimPilot
                    </span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--border)]">
                  <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
                    Capabilities
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Document Processing",
                      "Claim Reconciliation",
                      "Decision Engine",
                      "Fraud Detection",
                      "Multilingual",
                      "Full Provenance",
                      "Audit Ready",
                      "API Integration",
                    ].map((capability) => (
                      <span
                        key={capability}
                        className="text-[10px] px-2 py-1 rounded bg-[var(--subtle-bg)] text-[var(--text-muted)]"
                      >
                        {capability}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--border)]">
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors"
                  >
                    Get Similar Results
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 to-[var(--background)]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TrendingUp className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              Ready to achieve similar results?
            </h2>
            <p className="text-lg text-gray-300 mb-10">
              Start with a pilot on your closed claims and see the impact for
              yourself.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg"
            >
              Book a Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
