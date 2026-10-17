"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Clock,
  CheckCircle,
  Quote,
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
import { productPillColors, productNames } from "@/lib/product-styles";
import { ButtonLink } from "@/components/brand/Button";
import { StatusPill } from "@/components/brand/StatusPill";
import { CARD, CtaBand, PageHero, SECTION, SECTION_LILAC } from "@/components/content";
import { cn } from "@/lib/utils";

const ease = [0.4, 0, 0.2, 1] as const;

const productLinks: Record<string, string> = {
  mira: "/platform/claims-decisioning",
  contextbuilder: "/platform",
  claimeval: "/platform",
};

const study = caseStudies.find((cs) => cs.slug === "vehicle-warranty-claims")!;

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease } as const,
};

const processingStats: { check?: boolean; value?: string; label: string }[] = [
  { check: true, label: "Multiple document types" },
  { check: true, label: "Multi-brand support" },
  { check: true, label: "Deterministic screening" },
  { check: true, label: "Multi-tier matching" },
  { check: true, label: "Comprehensive keywords" },
  { check: true, label: "Full field extraction" },
  { value: "3", label: "Languages supported" },
  { check: true, label: "Extensive test coverage" },
];

/**
 * Collapsible detail panel. Native <details>, so the collapsed content stays
 * in the served HTML for crawlers and readers without JavaScript.
 */
function ExpandableSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className={cn(CARD, "group overflow-hidden")}>
      <summary className="w-full flex cursor-pointer list-none items-center justify-between p-5 text-left hover:bg-surface-muted transition-colors [&::-webkit-details-marker]:hidden">
        <span className="font-semibold text-sm text-strong">
          {title}
        </span>
        <ChevronDown
          aria-hidden="true"
          strokeWidth={1.5}
          className="w-4 h-4 text-muted transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <div className="px-5 pb-5 pt-0">{children}</div>
    </details>
  );
}

export default function VehicleWarrantyCaseStudy() {
  const t = useTranslations("caseStudies");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Automating Vehicle Warranty Claims with AI Document Intelligence"
        summary="Multilingual, Auditable Warranty Adjudication"
        texture={{ name: "glass", position: "100% 100%" }}
      >
        <div className="mt-8 space-y-6">
          {/* Breadcrumb */}
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 py-2 text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            {t("detail.allCaseStudies")}
          </Link>

          {/* Customer Info */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-[12px] bg-lilac grid place-items-center text-accent">
              <Building2 className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-lg font-medium text-strong">
                {study.customer.name}
              </div>
              <div className="text-muted">
                {study.customer.industry} · {study.customer.size}
              </div>
            </div>
          </div>

          {/* Products & Timeline */}
          <div className="flex flex-wrap items-center gap-4">
            {study.products.map((product) => (
              <Link
                key={product}
                href={productLinks[product]}
                className={`text-sm px-3 py-1.5 font-medium ${productPillColors[product]}`}
              >
                {productNames[product]}
              </Link>
            ))}
            {study.timeline && (
              <div className="flex items-center gap-2 text-muted">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                {study.timeline}
              </div>
            )}
          </div>
        </div>
      </PageHero>

      {/* Metrics Grid */}
      <section className={SECTION}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
          >
            {study.metrics.map((metric) => (
              <div key={metric.label} className={cn(CARD, "px-[29px] py-[27px] text-center")}>
                <div className="text-kpi text-accent mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-muted">
                  {metric.label}
                </div>
                {metric.improvement && (
                  <div className="text-xs text-subtle mt-1">
                    {metric.improvement}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* === FULL ARTICLE CONTENT === */}
      <section className={SECTION_LILAC}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-8">
            {/* Main Content */}
            <article className="space-y-16 max-w-3xl">
              {/* 1. Executive Summary */}
              <motion.div {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mb-4">
                  Executive Summary
                </h2>
                <div className="space-y-5 text-body leading-[1.6]">
                  <p>
                    A European vehicle warranty provider needed to automate the adjudication of
                    multilingual warranty claims. Each claim involved up to five documents in three
                    languages (German, French, Italian), with processing taking more than 30 minutes
                    on average per claim due to manual cross-referencing of cost estimates, coverage
                    tiers, mileage caps and component exclusion lists.
                  </p>
                  <p>
                    True Aim deployed the full platform: the document layer for document ingestion
                    and structured extraction, Claims Decisioning for hybrid deterministic and AI coverage
                    matching, and the quality check with full provenance tracking. A multi-tier
                    matching architecture routes 80%-90% of line items through deterministic rules
                    and keyword matching with zero LLM cost, reserving AI reasoning for genuinely
                    ambiguous cases. Within seven days and through multiple evaluation iterations,
                    decision accuracy reached 98% on the development set of holdout data.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {[
                      "98% decision accuracy in 7 days across multiple evaluation iterations",
                      "80-90% of line items resolved without LLM involvement",
                      "Three languages (DE/FR/IT) with no measurable language bias",
                      "Full provenance chain from every decision back to source document and page",
                    ].map((point) => (
                      <div key={point} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="text-sm text-body">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* 2. Operational Context */}
              <motion.div {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  Operational Context
                </h2>
                <div className="space-y-5 text-body leading-[1.6]">
                  <p>
                    A vehicle warranty claim lands on an adjuster&apos;s desk:
                    five documents, three languages, a cost estimate with 30
                    line items, a policy with coverage tiers, mileage-dependent
                    reimbursement rates and component exclusion lists.
                  </p>
                  <p className="font-semibold text-strong">
                    Standard processing takes 30+ minutes per claim. Multiply that by
                    thousands of claims per month.
                  </p>
                  <p>
                    76% of denied claims fail for a single reason:{" "}
                    <span className="font-semibold text-strong">
                      the part is not covered by the policy
                    </span>{" "}
                    - a deterministic lookup, not a judgment call.
                  </p>
                </div>

                {/* Starting Point Stats */}
                <div className="mt-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { value: "50/50", label: "Approval-to-denial split" },
                      { value: "CHF 1,450", label: "Avg approved payout" },
                      { value: "23", label: "Vehicle brands represented" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-surface-muted rounded-[12px] p-4 text-center"
                      >
                        <div className="text-lg font-display font-bold tabular-nums text-accent">
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-3 sm:max-w-[66.666%] sm:mx-auto">
                    {[
                      { value: "14", label: "Distinct document types" },
                      { value: "4.9", label: "Avg documents per claim" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-surface-muted rounded-[12px] p-4 text-center"
                      >
                        <div className="text-lg font-display font-bold tabular-nums text-accent">
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* 3. Architectural Approach */}
              <motion.div {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  Architectural Approach
                </h2>

                {/* Part A: Why existing approaches fall short */}
                <p className="text-body leading-[1.6] mb-5">
                  Most document processing tools extract text from PDFs - that
                  gets you 10% of the way. The real challenge is{" "}
                  <span className="font-semibold text-strong">
                    cross-document reasoning
                  </span>
                  : a cost estimate means nothing without the policy, a mileage
                  reading means nothing without the coverage cap.
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    {
                      icon: AlertTriangle,
                      title: "Generic OCR pipelines lack domain depth",
                      desc: "Swiss repair invoices contain line items in German with part numbers, labor codes, carry-forward subtotals across pages. Standard OCR extracts text but not structured data with coverage implications.",
                    },
                    {
                      icon: AlertTriangle,
                      title: "Single-model approaches plateau early",
                      desc: "Sending an entire claim to an LLM produces inconsistent results - hallucinated part names, invented coverage rules, unreliable financial calculations.",
                    },
                    {
                      icon: AlertTriangle,
                      title: "Rule-based systems cannot scale to vocabulary",
                      desc: "Thousands of part names across multiple languages. A \"Wasserpumpe\" in German is a \"pompe à eau\" in French. Pure keyword matching breaks on the first synonym it has not seen.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className={cn(CARD, "p-6 flex gap-4")}
                    >
                      <item.icon className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <h3 className="font-semibold text-strong mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-body leading-[1.6]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-body leading-[1.6] mb-8">
                  The solution requires a{" "}
                  <span className="font-semibold text-strong">
                    hybrid architecture
                  </span>
                  : deterministic rules where they work, keyword matching for
                  known vocabulary and LLM reasoning as a calibrated fallback -
                  each layer with explicit confidence scoring and provenance
                  tracking.
                </p>

                {/* Part B: The multi-stage pipeline */}
                <h3 className="font-display font-semibold text-xl mt-10 mb-3">
                  Multi-Stage Pipeline
                </h3>
                <p className="text-body leading-[1.6] mb-6">
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
                      className="bg-surface-muted rounded-[12px] p-3 text-center"
                    >
                      <s.icon className="w-5 h-5 text-accent mx-auto mb-1" strokeWidth={1.5} />
                      <div className="text-[10px] text-subtle uppercase tracking-wider">
                        Stage {s.stage}
                      </div>
                      <div className="text-xs font-medium text-strong">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Multi-Tier Matching */}
                <h3 className="font-display font-semibold text-xl mt-10 mb-3">
                  Coverage Analysis: Multi-Tier Matching
                </h3>
                <p className="text-sm text-body leading-[1.6] mb-4">
                  Each line item goes through a multi-tier matching pipeline,
                  prioritizing deterministic approaches before falling back to AI:
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    {
                      name: "Deterministic Rules",
                      tone: "approved" as const,
                      confidence: "Highest confidence",
                      desc: "Exact matches for known items, exclusions, and consumables. Zero ambiguity, instant resolution.",
                    },
                    {
                      name: "Keyword Matching",
                      tone: "progress" as const,
                      confidence: "High confidence",
                      desc: "Maps multilingual repair terms to component categories with synonym normalization.",
                    },
                    {
                      name: "AI Fallback",
                      tone: "referred" as const,
                      confidence: "Moderate confidence",
                      desc: "LLM with structured prompts for genuinely ambiguous items that require contextual reasoning.",
                    },
                  ].map((tier) => (
                    <div
                      key={tier.name}
                      className={cn(CARD, "p-6")}
                    >
                      <div className="flex items-center justify-between mb-2 gap-3">
                        <span className="font-semibold text-sm text-strong">
                          {tier.name}
                        </span>
                        <StatusPill tone={tier.tone} emphasis="light" dot={false} size="sm">
                          {tier.confidence}
                        </StatusPill>
                      </div>
                      <p className="text-xs text-body leading-[1.6]">
                        {tier.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Expandable Architecture Details */}
                <div className="space-y-3">
                  <ExpandableSection title="Stage details: Ingestion, Classification & Extraction">
                    <div className="space-y-4 text-sm text-body leading-[1.6]">
                      <div>
                        <h4 className="font-semibold text-strong mb-1">
                          Stage 1: Document Ingestion
                        </h4>
                        <p>
                          Pluggable ingestion layer supporting multiple OCR
                          providers for production workloads. Each page extracted
                          independently with position tracking for full provenance.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-strong mb-1">
                          Stage 2: Document Classification
                        </h4>
                        <p>
                          AI-powered router classifies documents by type
                          with language-specific cues across German, French, and
                          Italian. Near-100% classification accuracy.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-strong mb-1">
                          Stage 3: Structured Field Extraction
                        </h4>
                        <p>
                          Domain-specific extractors handle comprehensive field
                          sets for warranty policies. Cost estimate
                          extractors handle multi-page documents with
                          carry-forward subtotals and total validation. Every
                          field carries a confidence score, provenance and
                          quality gate verdict.
                        </p>
                      </div>
                    </div>
                  </ExpandableSection>

                  <ExpandableSection title="Stage details: Deterministic screening checks">
                    <div className="text-sm text-body leading-[1.6]">
                      <p className="mb-4">
                        The screening pipeline runs multiple deterministic checks
                        covering policy validity, coverage eligibility, and
                        compliance requirements. Each check produces one of three
                        verdicts:
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <StatusPill tone="denied" emphasis="light" dot={false} size="sm">
                            Hard fail
                          </StatusPill>
                          <span className="text-xs">Blocks automation, requires human review</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusPill tone="referred" emphasis="light" dot={false} size="sm">
                            Soft check
                          </StatusPill>
                          <span className="text-xs">Flags for attention but doesn&apos;t block</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusPill tone="progress" emphasis="light" dot={false} size="sm">
                            Conditional
                          </StatusPill>
                          <span className="text-xs">Outcome depends on additional context</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted">
                        Checks cover areas like policy status, coverage dates,
                        mileage limits, component eligibility, and exclusion patterns.
                      </p>
                    </div>
                  </ExpandableSection>

                  <ExpandableSection title="Payout calculation approach">
                    <p className="text-sm text-body leading-[1.6] mb-3">
                      The payout calculation follows insurer-specific business rules,
                      typically including:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-body">
                      <li>Summing covered items</li>
                      <li>Applying coverage caps and reimbursement rates</li>
                      <li>Adding applicable taxes</li>
                      <li>Calculating deductibles</li>
                      <li>Computing final payout</li>
                    </ul>
                    <p className="text-sm text-body mt-3">
                      Each insurer has specific rules for deductibles,
                      reimbursement tiers, and parts/labor splits that must be
                      matched exactly.
                    </p>
                  </ExpandableSection>
                </div>
              </motion.div>

              {/* 4. Deployment and Iteration */}
              <motion.div {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  Deployment and Iteration
                </h2>

                <div className="space-y-6">
                  {/* Day 1-3 */}
                  <div className="relative pl-8 border-l-2 border-hairline pb-6">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-denied-base border-2 border-page" />
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium text-subtle uppercase tracking-wider">
                        Days 1-3
                      </span>
                    </div>
                    <h3 className="font-semibold text-strong mb-2">
                      Baseline and Architecture
                    </h3>
                    <p className="text-sm text-body leading-[1.6]">
                      The initial LLM-only approach produced plausible-sounding
                      but unreliable results: hallucinated part names, invented
                      coverage rules, inconsistent calculations.
                    </p>
                    <div className="bg-surface-muted rounded-[12px] p-3 mt-3 text-xs text-body">
                      <span className="font-medium text-strong">
                        Key insight:
                      </span>{" "}
                      LLMs are good at language understanding but bad at
                      deterministic business rules. The architecture had to
                      separate judgment from precision.
                    </div>
                  </div>

                  {/* Day 3-5 */}
                  <div className="relative pl-8 border-l-2 border-hairline pb-6">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-referred-base border-2 border-page" />
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium text-subtle uppercase tracking-wider">
                        Days 3-5
                      </span>
                      <span className="text-2xl font-display font-bold tabular-nums text-referred-dark">
                        76%
                      </span>
                    </div>
                    <h3 className="font-semibold text-strong mb-2">
                      Screening + Coverage Pipeline
                    </h3>
                    <p className="text-sm text-body leading-[1.6]">
                      The deterministic screening pipeline and multi-tier coverage
                      matching drove the biggest single improvement.
                      Rule-based checks alone caught most denials correctly.
                    </p>
                  </div>

                  {/* Day 5-8 */}
                  <div className="relative pl-8 border-l-2 border-hairline pb-6">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-approved-base border-2 border-page" />
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium text-subtle uppercase tracking-wider">
                        Days 5-8
                      </span>
                      <span className="text-2xl font-display font-bold tabular-nums text-approved-dark">
                        88% &rarr; 94% &rarr; 98%
                      </span>
                    </div>
                    <h3 className="font-semibold text-strong mb-2">
                      Iteration and Refinement
                    </h3>
                    <p className="text-sm text-body leading-[1.6]">
                      60+ evaluation iterations solving increasingly subtle
                      problems: substring matching bugs, labor demotion logic,
                      and part-number normalization across OCR outputs.
                    </p>
                  </div>

                  {/* Holdout */}
                  <div className="relative pl-8">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-progress-base border-2 border-page" />
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium text-subtle uppercase tracking-wider">
                        Holdout Test
                      </span>
                      <span className="text-2xl font-display font-bold tabular-nums text-progress-dark">
                        77%
                      </span>
                    </div>
                    <h3 className="font-semibold text-strong mb-2">
                      Unseen Data Validation
                    </h3>
                    <p className="text-sm text-body leading-[1.6]">
                      30 previously unseen claims revealed failure modes the
                      development set did not cover: causal exclusion clauses,
                      missing document scenarios and sub-component
                      interpretation gaps.
                    </p>
                    <p className="text-sm font-medium text-strong mt-2">
                      The holdout gap (98% vs 77%) is the honest measure of
                      generalization.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 5. Measured Outcomes */}
              <motion.div {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  Measured Outcomes
                </h2>

                <div className="space-y-6">
                  {/* Eval Set */}
                  <div>
                    <h3 className="font-display font-semibold text-xl mt-10 mb-3">
                      Initial Evaluation Set
                    </h3>
                    <div className={cn(CARD, "overflow-hidden overflow-x-auto")}>
                      <table className="w-full text-sm min-w-[400px]">
                        <tbody>
                          {[
                            ["Decision accuracy", "98%", true],
                            ["Approved claims correctly identified", "100%", false],
                            ["Denied claims correctly identified", "96%", false],
                            ["False reject rate", "0%", false],
                            ["False approve rate", "4%", false],
                          ].map((row) => (
                            <tr
                              key={row[0] as string}
                              className={`border-b border-hairline ${row[2] ? "bg-accent-soft" : ""}`}
                            >
                              <td
                                className={`py-3 px-4 ${row[2] ? "font-semibold text-strong" : "text-body"}`}
                              >
                                {row[0] as string}
                              </td>
                              <td
                                className={`py-3 px-4 text-right font-display tabular-nums ${row[2] ? "font-bold text-accent" : "text-strong"}`}
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
                    <h3 className="font-display font-semibold text-xl mt-10 mb-3">
                      Holdout Set
                    </h3>
                    <div className={cn(CARD, "overflow-hidden overflow-x-auto")}>
                      <table className="w-full text-sm min-w-[400px]">
                        <tbody>
                          {[
                            ["Decision accuracy", "77%", true],
                            ["Approved claims correctly identified", "73%", false],
                            ["Denied claims correctly identified", "80%", false],
                            ["False reject rate", "26.7%", false],
                            ["False approve rate", "20.0%", false],
                          ].map((row) => (
                            <tr
                              key={row[0] as string}
                              className={`border-b border-hairline ${row[2] ? "bg-accent-soft" : ""}`}
                            >
                              <td
                                className={`py-3 px-4 ${row[2] ? "font-semibold text-strong" : "text-body"}`}
                              >
                                {row[0] as string}
                              </td>
                              <td
                                className={`py-3 px-4 text-right font-display tabular-nums ${row[2] ? "font-bold text-accent" : "text-strong"}`}
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
                    {processingStats.map((item) => (
                      <div
                        key={item.label}
                        className="bg-surface-muted rounded-[12px] p-3 text-center"
                      >
                        {item.check ? (
                          <CheckCircle className="w-5 h-5 mx-auto text-accent" strokeWidth={1.5} />
                        ) : (
                          <div className="text-lg font-display font-bold tabular-nums text-accent">
                            {item.value}
                          </div>
                        )}
                        <div className="text-[10px] text-muted mt-1">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* 6. Edge Cases and Operational Insights */}
              <motion.div {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  Edge Cases and Operational Insights
                </h2>

                {/* Holdout failure analysis */}
                <h3 className="font-display font-semibold text-xl mt-10 mb-3">
                  Holdout Failure Analysis
                </h3>
                <div className="space-y-2 mb-8">
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
                      className="bg-surface-muted rounded-[12px] p-3 text-xs text-body"
                    >
                      <span className="font-medium text-strong">
                        {item.title}:
                      </span>{" "}
                      {item.desc}
                    </div>
                  ))}
                </div>

                {/* What We Learned */}
                <h3 className="font-display font-semibold text-xl mt-10 mb-4">
                  Key Lessons
                </h3>
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
                      desc: "76% accuracy took 3 days. 76% to 98% took 4 more days. The holdout gap (98% vs 77%) confirmed that real-world generalization requires significantly more data.",
                    },
                    {
                      num: "3",
                      title: "The payout formula is harder than the AI.",
                      desc: "Getting the financial calculation to match the insurer's exact formula requires sitting with an adjuster and walking through calculations by hand. No amount of prompt engineering solves a business logic bug.",
                    },
                    {
                      num: "4",
                      title: "Provenance tracking is non-negotiable.",
                      desc: "In a regulated industry, every extracted value and coverage decision must trace back to a source document. Fundamental to trust and compliance.",
                    },
                  ].map((lesson) => (
                    <div key={lesson.num} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-accent-soft flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-display font-semibold text-accent">
                          {lesson.num}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-strong mb-1">
                          {lesson.title}
                        </h4>
                        <p className="text-sm text-body leading-[1.6]">
                          {lesson.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* 7. Production Readiness */}
              <motion.div {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  Production Readiness
                </h2>

                {/* Next Steps Taken */}
                <div className="space-y-3 text-body leading-[1.6] mb-8">
                  <ol className="list-decimal list-inside space-y-2 pl-2 text-sm">
                    <li>Expanded on ground truth dataset</li>
                    <li>Integrated with insurer&apos;s policy management API for real-time status checks</li>
                    <li>Implemented causal exclusion reasoning for cascading-damage denials</li>
                    <li>Deployed production triage: auto-reject high-confidence denials, auto-approve simple approvals, route edge cases for human review</li>
                  </ol>
                  <p className="mt-4 font-medium text-strong">
                    The goal is not to replace adjusters but to give them back
                    their time on the 76% of denials that are straightforward
                    lookups, so they can focus their expertise on the 24% that
                    actually require judgment.
                  </p>
                </div>

                {/* Technical Considerations */}
                <h3 className="font-display font-semibold text-xl mt-10 mb-4">
                  Technical Considerations
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      icon: Globe,
                      title: "Multi-Language Processing",
                      desc: "Language-aware classification and extraction across German, French and Italian. Comparable approval rates with no measurable language bias.",
                    },
                    {
                      icon: Lock,
                      title: "Auditability and Compliance",
                      desc: "Full provenance chain: every extracted field links to its source document and page. Every coverage decision includes match method, confidence score and explanation.",
                    },
                    {
                      icon: Calculator,
                      title: "Payout Formula Precision",
                      desc: "Order-of-operations errors in financial calculations can cause significant overpayment. Finding them requires walking through calculations claim by claim with adjusters.",
                    },
                    {
                      icon: DollarSign,
                      title: "Cost Control",
                      desc: "Deterministic rules and keyword matching handle the majority of items with zero LLM cost. Token usage monitoring with configurable thresholds prevents runaway costs.",
                    },
                  ].map((challenge) => (
                    <div
                      key={challenge.title}
                      className={cn(CARD, "p-6 flex gap-4")}
                    >
                      <div className="w-10 h-10 rounded-[12px] bg-lilac grid place-items-center text-accent flex-shrink-0">
                        <challenge.icon className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-strong mb-1">
                          {challenge.title}
                        </h4>
                        <p className="text-sm text-body leading-[1.6]">
                          {challenge.desc}
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
                  className="border-l-2 border-ta-blue pl-6"
                >
                  <Quote className="w-10 h-10 text-accent mb-4 opacity-40" strokeWidth={1.5} />
                  <blockquote className="text-body-lg text-strong italic mb-4">
                    &ldquo;{study.quote.text}&rdquo;
                  </blockquote>
                  <div className="text-sm">
                    <div className="font-semibold text-strong">
                      {study.quote.author}
                    </div>
                    <div className="text-muted">
                      {study.quote.role}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Bottom Accordions: Deep Detail */}
              <motion.div {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  Deep Detail
                </h2>
                <div className="space-y-3">
                  <ExpandableSection title="Detailed iteration fixes (88% to 98%)">
                    <div className="space-y-3">
                      <div className="bg-surface-muted rounded-[12px] p-3 text-xs text-body">
                        <span className="font-medium text-strong">
                          Cross-category substring matching bug:
                        </span>{" "}
                        An EGR valve synonym (&quot;abgasrueckfuehrung&quot;)
                        contained the substring &quot;asr&quot; (anti-slip
                        regulation). The system declared the EGR valve covered
                        under brakes. Fix: symmetric guard requiring exact match
                        when either term is 3 characters or fewer.
                      </div>
                      <div className="bg-surface-muted rounded-[12px] p-3 text-xs text-body">
                        <span className="font-medium text-strong">
                          Labor demotion over-aggression:
                        </span>{" "}
                        When a part was covered, the associated installation
                        labor should also be covered. Fix: labor promotion logic
                        that inherits coverage from the parent repair.
                      </div>
                      <div className="bg-surface-muted rounded-[12px] p-3 text-xs text-body">
                        <span className="font-medium text-strong">
                          Part-number normalization:
                        </span>{" "}
                        A Mercedes part number{" "}
                        <code className="bg-surface-muted rounded-pill px-2 py-0.5 text-strong">
                          A205 906 41 04
                        </code>{" "}
                        was not matched due to spacing differences in OCR
                        extraction. Fix: normalize all part numbers by stripping
                        spaces and special characters before lookup.
                      </div>
                    </div>
                  </ExpandableSection>

                  <ExpandableSection title="Order-of-operations lesson">
                    <div className="text-sm text-body leading-[1.6]">
                      <p className="mb-3">
                        When applying degraded reimbursement rates, the order of operations matters:
                      </p>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-start gap-2">
                          <span className="text-denied-dark font-medium">Wrong:</span>
                          <span>Apply rate after VAT and deductible calculations</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-approved-dark font-medium">Correct:</span>
                          <span>Apply rate to covered amount first, then add VAT and subtract deductible</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted">
                        A single operation-order error can cause significant overpayment.
                        Finding these bugs requires walking through calculations with adjusters.
                      </p>
                    </div>
                  </ExpandableSection>
                </div>
              </motion.div>
            </article>

            {/* Sidebar */}
            <aside aria-label="Key highlights">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className={cn(CARD, "p-8")}
              >
                <h3 className="font-display font-semibold text-strong mb-4">
                  {t("detail.keyHighlights")}
                </h3>
                <ul className="space-y-3">
                  {study.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span className="text-sm text-body">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-hairline">
                  <h4 className="text-caption-sm text-subtle mb-3">
                    {t("vehicleWarranty.sidebar.productsUsed")}
                  </h4>
                  <div className="space-y-2">
                    {study.products.map((product) => (
                      <Link
                        key={product}
                        href={productLinks[product]}
                        className={`block text-sm px-3 py-2 font-medium ${productPillColors[product]} text-center`}
                      >
                        {productNames[product]}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-hairline">
                  <h4 className="text-caption-sm text-subtle mb-3">
                    {t("vehicleWarranty.sidebar.capabilities")}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Document Processing",
                      "Hybrid AI",
                      "Multilingual",
                      "Full Provenance",
                      "Audit Ready",
                    ].map((capability) => (
                      <span
                        key={capability}
                        className="text-xs px-3 py-1 rounded-pill bg-accent-soft text-accent"
                      >
                        {capability}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-hairline">
                  <ButtonLink href="/contact" variant="primary" className="w-full">
                    {t("vehicleWarranty.sidebar.getSimilarResults")}
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </ButtonLink>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBand
        heading={t("detail.ctaHeading")}
        lede={t("detail.ctaDescription")}
        buttons={[{ label: t("detail.requestPilot"), href: "/contact" }]}
      />
    </div>
  );
}
