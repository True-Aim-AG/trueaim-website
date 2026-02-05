"use client";

import { useState } from "react";
import Link from "next/link";
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
  Search,
  Layers,
  ShieldCheck,
  BarChart3,
  AlertTriangle,
  Globe,
  DollarSign,
  Lock,
  Calculator,
  ChevronDown,
} from "lucide-react";
import { caseStudies } from "@/data/case-studies";

const productColors: Record<string, string> = {
  mira: "bg-indigo-100 text-indigo-700 border-indigo-200",
  contextbuilder: "bg-teal-100 text-teal-700 border-teal-200",
  claimeval: "bg-blue-100 text-blue-700 border-blue-200",
};

const productNames: Record<string, string> = {
  mira: "MIRA",
  contextbuilder: "ContextBuilder",
  claimeval: "ClaimEval",
};

const productLinks: Record<string, string> = {
  mira: "/products/mira",
  contextbuilder: "/products/contextbuilder",
  claimeval: "/products/claimeval",
};

const study = caseStudies.find((cs) => cs.slug === "vehicle-warranty-claims")!;

const currentIndex = caseStudies.findIndex(
  (cs) => cs.slug === "vehicle-warranty-claims"
);
const prevStudy = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
const nextStudy =
  currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null;

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

export default function VehicleWarrantyCaseStudy() {
  const [showDetails, setShowDetails] = useState(false);

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
              className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors mb-8"
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
                  {study.customer.name}
                </div>
                <div className="text-[var(--text-muted)]">
                  {study.customer.industry} · {study.customer.size}
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              Automating Vehicle Warranty Claims with AI Document Intelligence
            </h1>
            <p className="text-xl md:text-2xl text-[var(--primary)] font-semibold mb-6">
              From 18% to 98% Decision Accuracy in 7 Days
            </p>

            {/* Products & Timeline */}
            <div className="flex flex-wrap items-center gap-4">
              {study.products.map((product) => (
                <Link
                  key={product}
                  href={productLinks[product]}
                  className={`text-sm px-3 py-1.5 rounded-full font-medium border ${productColors[product]} hover:opacity-80 transition-opacity`}
                >
                  {productNames[product]}
                </Link>
              ))}
              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                <Clock className="w-4 h-4" />
                {study.timeline}
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
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {study.metrics.map((metric) => (
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

      {/* === FULL ARTICLE CONTENT === */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">
              {/* The Problem */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  The Problem
                </h2>
                <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                  <p>
                    A vehicle warranty claim lands on an adjuster&apos;s desk:
                    five documents, three languages, a cost estimate with 30
                    line items, a policy with coverage tiers, mileage-dependent
                    reimbursement rates and component exclusion lists.
                  </p>
                  <p className="font-semibold text-[var(--text-primary)]">
                    Processing takes 15-30 minutes per claim. Multiply that by
                    hundreds of claims per month.
                  </p>
                  <p>
                    76% of denied claims fail for a single reason:{" "}
                    <span className="font-semibold text-[var(--text-primary)]">
                      the part is not covered by the policy
                    </span>{" "}
                    - a deterministic lookup, not a judgment call.
                  </p>
                </div>

                {/* Starting Point Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                  {[
                    { value: "84", label: "Claims analyzed in pilot" },
                    { value: "50/50", label: "Approval-to-denial split" },
                    { value: "CHF 1,450", label: "Avg approved payout" },
                    { value: "23", label: "Vehicle brands represented" },
                    { value: "14", label: "Distinct document types" },
                    { value: "4.9", label: "Avg documents per claim" },
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
              </motion.div>

              {/* Why Existing Approaches Fall Short */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Why Existing Approaches Fall Short
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                  Most document processing tools extract text from PDFs - that
                  gets you 10% of the way. The real challenge is{" "}
                  <span className="font-semibold text-[var(--text-primary)]">
                    cross-document reasoning
                  </span>
                  : a cost estimate means nothing without the policy, a mileage
                  reading means nothing without the coverage cap.
                </p>

                <div className="space-y-3">
                  {[
                    {
                      icon: AlertTriangle,
                      title: "Generic OCR pipelines lack domain depth",
                      desc: "Swiss repair invoices contain line items in German with part numbers, labor codes, carry-forward subtotals across pages. Standard OCR extracts text but not structured data with coverage implications.",
                    },
                    {
                      icon: AlertTriangle,
                      title: "Single-model approaches plateau early",
                      desc: "Sending an entire claim to an LLM produces inconsistent results - hallucinated part names, invented coverage rules, unreliable financial calculations. Baseline LLM-only accuracy: 18%.",
                    },
                    {
                      icon: AlertTriangle,
                      title: "Rule-based systems cannot scale to vocabulary",
                      desc: "Thousands of part names across multiple languages. A \"Wasserpumpe\" in German is a \"pompe \u00e0 eau\" in French. Pure keyword matching breaks on the first synonym it has not seen.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="glass-panel p-5 flex gap-4"
                    >
                      <item.icon className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
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

                <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                  The solution requires a{" "}
                  <span className="font-semibold text-[var(--text-primary)]">
                    hybrid architecture
                  </span>
                  : deterministic rules where they work, keyword matching for
                  known vocabulary and LLM reasoning as a calibrated fallback -
                  each layer with explicit confidence scoring and provenance
                  tracking.
                </p>
              </motion.div>

              {/* The Architecture - Summary + Expandable */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                  The Architecture: A Multi-Stage Pipeline
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  An end-to-end claims processing pipeline moves raw documents
                  through five stages, each with quality gates and audit
                  logging.
                </p>

                {/* Pipeline Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-6">
                  {[
                    { icon: FileText, label: "Ingestion", stage: "1" },
                    { icon: Search, label: "Classification", stage: "2" },
                    { icon: Layers, label: "Extraction", stage: "3" },
                    { icon: ShieldCheck, label: "Screening", stage: "4" },
                    { icon: BarChart3, label: "QA Review", stage: "5" },
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

                {/* Three-Tier Matching - Key Differentiator */}
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                  Coverage Analysis: Three-Tier Matching
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  Each line item goes through a three-tier matching pipeline,
                  from fastest/highest-confidence to slowest/lowest-confidence:
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    {
                      tier: "Tier 1",
                      name: "Rule Engine",
                      confidence: "1.0",
                      color: "text-emerald-400",
                      bg: "bg-emerald-500/10 border-emerald-500/20",
                      desc: "Deterministic matches for fee items, known exclusions, consumables. Zero ambiguity, zero latency.",
                      pct: "40-50%",
                    },
                    {
                      tier: "Tier 2",
                      name: "Keyword Matcher",
                      confidence: "0.70-0.90",
                      color: "text-blue-400",
                      bg: "bg-blue-500/10 border-blue-500/20",
                      desc: "Maps German/French repair terms to 30+ component categories with synonyms and umlaut normalization.",
                      pct: "30-40%",
                    },
                    {
                      tier: "Tier 3",
                      name: "LLM Fallback",
                      confidence: "0.60-0.85",
                      color: "text-amber-400",
                      bg: "bg-amber-500/10 border-amber-500/20",
                      desc: "GPT-4o with structured prompts for genuinely ambiguous items. Concurrency-optimized with 10 parallel calls.",
                      pct: "10-20%",
                    },
                  ].map((tier) => (
                    <div
                      key={tier.tier}
                      className={`p-4 rounded-lg border ${tier.bg}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-bold ${tier.color}`}
                          >
                            {tier.tier}
                          </span>
                          <span className="font-semibold text-sm text-[var(--text-primary)]">
                            {tier.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-[var(--text-muted)]">
                            Confidence:{" "}
                            <span className="font-mono-data">
                              {tier.confidence}
                            </span>
                          </span>
                          <span className={`font-bold ${tier.color}`}>
                            {tier.pct}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {tier.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Expandable Architecture Details */}
                <div className="space-y-3">
                  <ExpandableSection title="Stage details: Ingestion, Classification & Extraction">
                    <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <div>
                        <h4 className="font-semibold text-[var(--text-primary)] mb-1">
                          Stage 1: Document Ingestion
                        </h4>
                        <p>
                          Pluggable ingestion layer with Azure Document
                          Intelligence for production OCR, OpenAI Vision API for
                          image-heavy documents and Tesseract as a local
                          fallback. Each page extracted independently with
                          character-level position tracking for full provenance.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[var(--text-primary)] mb-1">
                          Stage 2: Document Classification
                        </h4>
                        <p>
                          LLM-powered router classifies documents into 14 types
                          with language-specific cues in German, French, and
                          Italian. Near-100% classification accuracy.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[var(--text-primary)] mb-1">
                          Stage 3: Structured Field Extraction
                        </h4>
                        <p>
                          Domain-specific extractors handle 51 fields across 4
                          groups for warranty policies. The cost estimate
                          extractor handles multi-page documents with
                          carry-forward subtotals and total validation within
                          CHF 5 tolerance. Every field carries a confidence
                          score, provenance and quality gate verdict.
                        </p>
                      </div>
                    </div>
                  </ExpandableSection>

                  <ExpandableSection title="Stage details: Screening checks (11 deterministic checks)">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-[var(--border)]">
                            <th className="text-left py-2 pr-3 text-[var(--text-muted)] font-medium">
                              Check
                            </th>
                            <th className="text-left py-2 pr-3 text-[var(--text-muted)] font-medium">
                              Validates
                            </th>
                            <th className="text-left py-2 text-[var(--text-muted)] font-medium">
                              Verdict
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-[var(--text-secondary)]">
                          {[
                            ["Policy Enforcement", "Is the policy in the rejected list?", "Hard fail"],
                            ["Policy Validity", "Is the policy active on the damage date?", "Hard fail"],
                            ["Damage Date", "Is the claim date clear and valid?", "Hard fail"],
                            ["Service Compliance", "Did the vehicle meet service intervals?", "Soft check"],
                            ["Shop Authorization", "Is the repair shop authorized?", "Informational"],
                            ["Mileage", "Does odometer exceed coverage limit?", "Hard fail"],
                            ["Damage Cause", "Does the DTC code match an exclusion?", "Conditional"],
                            ["Component Coverage", "Is the part in the coverage list?", "Hard fail"],
                            ["Labor Follows Parts", "Is labor anchored to a covered part?", "Conditional"],
                            ["Hybrid Exclusion", "Are hybrid-specific parts excluded?", "Hard fail"],
                            ["Damage Cause Exclusion", "Does root cause match excluded pattern?", "Hard fail"],
                          ].map((row) => (
                            <tr
                              key={row[0]}
                              className="border-b border-[var(--border)]/50"
                            >
                              <td className="py-2 pr-3 font-medium text-[var(--text-primary)]">
                                {row[0]}
                              </td>
                              <td className="py-2 pr-3">{row[1]}</td>
                              <td className="py-2">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                    row[2] === "Hard fail"
                                      ? "bg-red-500/20 text-red-400"
                                      : row[2] === "Soft check"
                                        ? "bg-amber-500/20 text-amber-400"
                                        : row[2] === "Conditional"
                                          ? "bg-blue-500/20 text-blue-400"
                                          : "bg-slate-500/20 text-slate-400"
                                  }`}
                                >
                                  {row[2]}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </ExpandableSection>

                  <ExpandableSection title="Payout calculation formula">
                    <ol className="list-decimal list-inside space-y-1 text-sm text-[var(--text-secondary)]">
                      <li>Sum covered items (gross)</li>
                      <li>Apply maximum coverage cap (if policy specifies one)</li>
                      <li>Apply mileage-dependent reimbursement rate (40%-100%)</li>
                      <li>Add VAT (8.1% in Switzerland)</li>
                      <li>Calculate deductible (percentage with minimum floor)</li>
                      <li>Compute final payout</li>
                    </ol>
                    <p className="text-xs text-[var(--text-muted)] mt-3">
                      Standardized deductibles (CHF 150 in 49% of claims),
                      formulaic reimbursement tiers and verifiable parts/labor
                      splits (60% parts, 40% labor on average).
                    </p>
                  </ExpandableSection>
                </div>
              </motion.div>

              {/* The Implementation Journey */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  The Implementation Journey: From 18% to 98%
                </h2>

                <div className="space-y-6">
                  {/* Day 1-3 */}
                  <div className="relative pl-8 border-l-2 border-[var(--border)] pb-6">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-red-500 border-2 border-[var(--background)]" />
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                        Days 1-3
                      </span>
                      <span className="text-2xl font-bold font-mono-data text-red-400">
                        18%
                      </span>
                    </div>
                    <h4 className="font-semibold text-[var(--text-primary)] mb-2">
                      Baseline and Architecture
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      The initial LLM-only approach produced plausible-sounding
                      but unreliable results: hallucinated part names, invented
                      coverage rules, inconsistent calculations.
                    </p>
                    <div className="glass-panel-light p-3 mt-3 text-xs text-[var(--text-secondary)]">
                      <span className="font-medium text-[var(--text-primary)]">
                        Key insight:
                      </span>{" "}
                      LLMs are good at language understanding but bad at
                      deterministic business rules. The architecture had to
                      separate judgment from precision.
                    </div>
                  </div>

                  {/* Day 3-5 */}
                  <div className="relative pl-8 border-l-2 border-[var(--border)] pb-6">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-amber-500 border-2 border-[var(--background)]" />
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                        Days 3-5
                      </span>
                      <span className="text-2xl font-bold font-mono-data text-amber-400">
                        76%
                      </span>
                    </div>
                    <h4 className="font-semibold text-[var(--text-primary)] mb-2">
                      Screening + Coverage Pipeline
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      The 11-check screening pipeline and three-tier coverage
                      matching drove the biggest single improvement.
                      Deterministic checks alone caught most denials correctly.
                    </p>
                  </div>

                  {/* Day 5-8 */}
                  <div className="relative pl-8 border-l-2 border-[var(--border)] pb-6">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[var(--background)]" />
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                        Days 5-8
                      </span>
                      <span className="text-2xl font-bold font-mono-data text-emerald-400">
                        88% &rarr; 94% &rarr; 98%
                      </span>
                    </div>
                    <h4 className="font-semibold text-[var(--text-primary)] mb-2">
                      Iteration and Refinement
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      60+ evaluation iterations solving increasingly subtle
                      problems: substring matching bugs, labor demotion logic,
                      and part-number normalization across OCR outputs.
                    </p>
                  </div>

                  {/* Holdout */}
                  <div className="relative pl-8">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-[var(--background)]" />
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                        Holdout Test
                      </span>
                      <span className="text-2xl font-bold font-mono-data text-blue-400">
                        76.7%
                      </span>
                    </div>
                    <h4 className="font-semibold text-[var(--text-primary)] mb-2">
                      Unseen Data Validation
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      30 previously unseen claims revealed failure modes the
                      development set did not cover: causal exclusion clauses,
                      missing document scenarios and sub-component
                      interpretation gaps.
                    </p>
                    <p className="text-sm font-medium text-[var(--text-primary)] mt-2">
                      The holdout gap (98% vs 77%) is the honest measure of
                      generalization.
                    </p>
                  </div>
                </div>

                {/* Expandable: Iteration details */}
                <div className="mt-6 space-y-3">
                  <ExpandableSection title="Detailed iteration fixes (88% to 98%)">
                    <div className="space-y-3">
                      <div className="glass-panel-light p-3 text-xs text-[var(--text-secondary)]">
                        <span className="font-medium text-[var(--text-primary)]">
                          Cross-category substring matching bug:
                        </span>{" "}
                        An EGR valve synonym (&quot;abgasrueckfuehrung&quot;)
                        contained the substring &quot;asr&quot; (anti-slip
                        regulation). The system declared the EGR valve covered
                        under brakes. Fix: symmetric guard requiring exact match
                        when either term is 3 characters or fewer.
                      </div>
                      <div className="glass-panel-light p-3 text-xs text-[var(--text-secondary)]">
                        <span className="font-medium text-[var(--text-primary)]">
                          Labor demotion over-aggression:
                        </span>{" "}
                        When a part was covered, the associated installation
                        labor should also be covered. Fix: labor promotion logic
                        that inherits coverage from the parent repair.
                      </div>
                      <div className="glass-panel-light p-3 text-xs text-[var(--text-secondary)]">
                        <span className="font-medium text-[var(--text-primary)]">
                          Part-number normalization:
                        </span>{" "}
                        A Mercedes part number{" "}
                        <code className="text-[var(--primary)]">
                          A205 906 41 04
                        </code>{" "}
                        was not matched due to spacing differences in OCR
                        extraction. Fix: normalize all part numbers by stripping
                        spaces and special characters before lookup.
                      </div>
                    </div>
                  </ExpandableSection>

                  <ExpandableSection title="Holdout failure analysis">
                    <div className="space-y-2">
                      {[
                        {
                          title: "Causal exclusion clauses",
                          desc: "A turbocharger is covered, but if the turbo failed because the engine (not covered) failed first, the policy denies coverage. The system does not reason about failure chains.",
                        },
                        {
                          title: "Missing documents",
                          desc: "One claim was denied because the policy premium was not paid. This information lives in the insurer's internal system, not in any processable document.",
                        },
                        {
                          title: "Sub-component interpretation gaps",
                          desc: "A DPF sensor is functionally part of the exhaust system. The policy covers exhausts but only lists specific sub-components. The adjuster approved by interpreting the sensor as an exhaust sub-component.",
                        },
                        {
                          title: "Excluded-component dominance",
                          desc: "A claim for a hose repair (excluded) was approved because a minor bolt (CHF 3.70, covered) was also on the invoice.",
                        },
                      ].map((item) => (
                        <div
                          key={item.title}
                          className="glass-panel-light p-3 text-xs text-[var(--text-secondary)]"
                        >
                          <span className="font-medium text-[var(--text-primary)]">
                            {item.title}:
                          </span>{" "}
                          {item.desc}
                        </div>
                      ))}
                    </div>
                  </ExpandableSection>
                </div>
              </motion.div>

              {/* Show More Details Toggle */}
              <div className="relative py-2">
                <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--border)]" />
                <div className="relative flex justify-center">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--subtle-bg)] border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--primary)]/50 transition-all"
                  >
                    {showDetails ? "Show less" : "Show more details"}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${showDetails ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
              </div>

              {showDetails && (
              <>
              {/* Technical Challenges */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Technical Challenges
                </h2>

                <div className="space-y-3">
                  {[
                    {
                      icon: Globe,
                      title: "Multi-Language Processing",
                      desc: "Language-aware classification and extraction across German, French and Italian. Comparable approval rates (49% vs 54%) with no measurable language bias.",
                    },
                    {
                      icon: Lock,
                      title: "Auditability and Compliance",
                      desc: "Full provenance chain: every extracted field links to its source page and character position. Every coverage decision includes match method, confidence score and explanation.",
                    },
                    {
                      icon: Calculator,
                      title: "Payout Formula Precision",
                      desc: "A single operation-order error caused 27% overpayment on claims with degraded rates. Finding it required walking through calculations claim by claim with the adjuster.",
                    },
                    {
                      icon: DollarSign,
                      title: "Cost Control",
                      desc: "Rule engine and keyword matcher handle 80-90% of items with zero LLM cost. Token usage monitoring with configurable thresholds prevents runaway costs.",
                    },
                  ].map((challenge) => (
                    <div
                      key={challenge.title}
                      className="glass-panel p-5 flex gap-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/20 flex items-center justify-center flex-shrink-0">
                        <challenge.icon className="w-5 h-5 text-[var(--primary)]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[var(--text-primary)] mb-1">
                          {challenge.title}
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          {challenge.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Expandable: Payout formula bug */}
                <div className="mt-4">
                  <ExpandableSection title="Order-of-operations bug detail (40% reimbursement rate)">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-[var(--border)]">
                            <th className="text-left py-2 pr-4 text-[var(--text-muted)] font-medium">
                              Step
                            </th>
                            <th className="text-left py-2 pr-4 text-red-400 font-medium">
                              Wrong
                            </th>
                            <th className="text-left py-2 text-emerald-400 font-medium">
                              Correct
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-[var(--text-secondary)] font-mono-data text-xs">
                          <tr className="border-b border-[var(--border)]/50">
                            <td className="py-2 pr-4 font-sans text-sm">Gross covered</td>
                            <td className="py-2 pr-4">CHF 1,118.60</td>
                            <td className="py-2">CHF 1,118.60</td>
                          </tr>
                          <tr className="border-b border-[var(--border)]/50">
                            <td className="py-2 pr-4 font-sans text-sm">Apply rate</td>
                            <td className="py-2 pr-4 text-[var(--text-muted)]">
                              -
                            </td>
                            <td className="py-2">CHF 447.44</td>
                          </tr>
                          <tr className="border-b border-[var(--border)]/50">
                            <td className="py-2 pr-4 font-sans text-sm">Add VAT (8.1%)</td>
                            <td className="py-2 pr-4">CHF 1,209.21</td>
                            <td className="py-2">CHF 483.69</td>
                          </tr>
                          <tr className="border-b border-[var(--border)]/50">
                            <td className="py-2 pr-4 font-sans text-sm">Deductible</td>
                            <td className="py-2 pr-4">CHF 150.00</td>
                            <td className="py-2">CHF 150.00</td>
                          </tr>
                          <tr className="border-b border-[var(--border)]/50">
                            <td className="py-2 pr-4 font-sans text-sm">Apply rate</td>
                            <td className="py-2 pr-4">CHF 423.68</td>
                            <td className="py-2 text-[var(--text-muted)]">
                              -
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-4 font-sans text-sm font-bold text-[var(--text-primary)]">
                              Final payout
                            </td>
                            <td className="py-2 pr-4 font-bold text-red-400">
                              CHF 423.68
                            </td>
                            <td className="py-2 font-bold text-emerald-400">
                              CHF 333.69
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-3">
                      A 27% overpayment from a single operation-order error
                      affecting 8 of 50 evaluation claims.
                    </p>
                  </ExpandableSection>
                </div>
              </motion.div>

              {/* Results and Metrics */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Results
                </h2>

                <div className="space-y-6">
                  {/* Eval Set */}
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                      Evaluation Set (50 Claims)
                    </h3>
                    <div className="glass-panel overflow-hidden">
                      <table className="w-full text-sm">
                        <tbody>
                          {[
                            ["Decision accuracy", "98% (49/50 correct)", true],
                            ["Approved claims correctly identified", "25/25 (100%)", false],
                            ["Denied claims correctly identified", "24/25 (96%)", false],
                            ["False reject rate", "0%", false],
                            ["False approve rate", "4% (1 claim)", false],
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
                  </div>

                  {/* Holdout Set */}
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                      Holdout Set (30 Unseen Claims)
                    </h3>
                    <div className="glass-panel overflow-hidden">
                      <table className="w-full text-sm">
                        <tbody>
                          {[
                            ["Decision accuracy", "76.7% (23/30 correct)", true],
                            ["Approved claims correctly identified", "11/15", false],
                            ["Denied claims correctly identified", "12/15", false],
                            ["False reject rate", "26.7%", false],
                            ["False approve rate", "20.0%", false],
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
                  </div>

                  {/* Processing Characteristics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: "14", label: "Document types" },
                      { value: "18", label: "Vehicle brands in DB" },
                      { value: "11", label: "Screening checks" },
                      { value: "3", label: "Coverage matching tiers" },
                      { value: "30+", label: "Keyword categories" },
                      { value: "51", label: "Extraction fields" },
                      { value: "3", label: "Languages supported" },
                      { value: "850+", label: "Unit tests" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="glass-panel-light p-3 text-center"
                      >
                        <div className="text-lg font-bold font-mono-data text-[var(--primary)]">
                          {item.value}
                        </div>
                        <div className="text-[10px] text-[var(--text-muted)]">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* What We Learned */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  What We Learned
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      num: "1",
                      title: "Deterministic checks beat LLM judgment for structured rules.",
                      desc: "76% of claim denials are \"part not covered\" - a lookup, not a judgment call. The screening pipeline handles these with 100% confidence and zero LLM cost.",
                    },
                    {
                      num: "2",
                      title: "The accuracy curve has diminishing returns.",
                      desc: "18% to 76% took 3 days. 76% to 98% took 4 more days. The holdout gap (98% vs 77%) confirmed that real-world generalization requires significantly more data.",
                    },
                    {
                      num: "3",
                      title: "The payout formula is harder than the AI.",
                      desc: "Getting the financial calculation to match the insurer's exact formula requires sitting with an adjuster and walking through calculations by hand. No amount of prompt engineering solves a business logic bug.",
                    },
                    {
                      num: "4",
                      title: "Provenance tracking is non-negotiable.",
                      desc: "In a regulated industry, every extracted value and coverage decision must trace back to a source document, page and character position. Fundamental to trust and compliance.",
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
              {study.quote && (
                <motion.div
                  {...fadeIn}
                  className="glass-panel p-8 border-l-4 border-l-[var(--primary)]"
                >
                  <Quote className="w-10 h-10 text-[var(--primary)] mb-4 opacity-50" />
                  <blockquote className="text-lg text-[var(--text-primary)] italic mb-4">
                    &ldquo;{study.quote.text}&rdquo;
                  </blockquote>
                  <div className="text-sm">
                    <div className="font-semibold text-[var(--text-primary)]">
                      {study.quote.author}
                    </div>
                    <div className="text-[var(--text-muted)]">
                      {study.quote.role}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* What's Next */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  What&apos;s Next
                </h2>
                <div className="space-y-3 text-[var(--text-secondary)] leading-relaxed">
                  <ol className="list-decimal list-inside space-y-2 pl-2 text-sm">
                    <li>Expand ground truth dataset beyond 80 claims</li>
                    <li>Integrate with insurer's policy management API for real-time status checks</li>
                    <li>Implement causal exclusion reasoning for cascading-damage denials</li>
                    <li>Deploy production triage: auto-reject high-confidence denials, auto-approve simple approvals, route edge cases for human review</li>
                  </ol>
                  <p className="mt-4 font-medium text-[var(--text-primary)]">
                    The goal is not to replace adjusters but to give them back
                    their time on the 76% of denials that are straightforward
                    lookups, so they can focus their expertise on the 24% that
                    actually require judgment.
                  </p>
                </div>
              </motion.div>
              </>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-panel p-6 sticky top-24"
              >
                <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                  Key Highlights
                </h3>
                <ul className="space-y-3">
                  {study.highlights.map((highlight, index) => (
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
                    Products Used
                  </h4>
                  <div className="space-y-2">
                    {study.products.map((product) => (
                      <Link
                        key={product}
                        href={productLinks[product]}
                        className={`block text-sm px-3 py-2 rounded-lg font-medium border ${productColors[product]} hover:opacity-80 transition-opacity text-center`}
                      >
                        {productNames[product]}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--border)]">
                  <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Python",
                      "FastAPI",
                      "Pydantic",
                      "React 18",
                      "TypeScript",
                      "Tailwind CSS",
                      "GPT-4o",
                      "Azure Doc Intelligence",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] px-2 py-1 rounded bg-[var(--subtle-bg)] text-[var(--text-muted)]"
                      >
                        {tech}
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
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 px-6 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            {prevStudy ? (
              <Link
                href={`/case-studies/${prevStudy.slug}`}
                className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Previous</span>
              </Link>
            ) : (
              <div />
            )}
            {nextStudy ? (
              <Link
                href={`/case-studies/${nextStudy.slug}`}
                className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
              >
                <span className="text-sm">Next</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <div />
            )}
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
              Ready to Achieve Similar Results?
            </h2>
            <p className="text-lg text-gray-300 mb-10">
              Start with a pilot on your closed claims and see the impact for
              yourself.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg"
            >
              Request a Pilot
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
