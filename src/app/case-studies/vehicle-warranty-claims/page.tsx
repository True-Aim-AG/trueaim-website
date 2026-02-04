"use client";

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
  Zap,
  Globe,
  DollarSign,
  Lock,
  Calculator,
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

export default function VehicleWarrantyCaseStudy() {
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
                  The Problem Nobody Talks About
                </h2>
                <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                  <p>
                    A vehicle warranty claim lands on an adjuster&apos;s desk.
                  </p>
                  <p>
                    Five documents. Three languages. A cost estimate with 30 line
                    items. A policy with coverage tiers, mileage-dependent
                    reimbursement rates, and component exclusion lists buried on
                    page two.
                  </p>
                  <p>
                    The adjuster opens each document. Cross-references part names
                    against the coverage list. Checks the service history.
                    Validates the policy dates. Calculates the payout using a
                    formula involving deductibles, VAT, coverage caps, and
                    reimbursement percentages.
                  </p>
                  <p className="font-semibold text-[var(--text-primary)]">
                    This takes 15-30 minutes per claim. Multiply that by
                    hundreds of claims per month.
                  </p>
                  <p>
                    76% of denied claims fail for a single reason:{" "}
                    <span className="font-semibold text-[var(--text-primary)]">
                      the part is not covered by the policy.
                    </span>{" "}
                    A deterministic, lookup-based check. No judgment call
                    required.
                  </p>
                  <p>
                    The industry knows this is automatable. The hard part is
                    building a system that actually works on real documents, in
                    production, with real accuracy.
                  </p>
                </div>
              </motion.div>

              {/* The Starting Point */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  The Starting Point: Manual Processing at Scale
                </h2>
                <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                  <p>
                    Our client is a{" "}
                    <span className="font-semibold text-[var(--text-primary)]">
                      European vehicle warranty insurance provider
                    </span>{" "}
                    operating in a multilingual market (German, French, Italian).
                    They process motor guarantee claims from a network of 79+
                    independent garages and authorized dealers across the
                    country.
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                  {[
                    { value: "84", label: "Claims analyzed in pilot" },
                    { value: "50/50", label: "Approval-to-denial split" },
                    {
                      value: "CHF 1,450",
                      label: "Avg approved payout",
                    },
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

                <div className="mt-6 space-y-3 text-[var(--text-secondary)] leading-relaxed">
                  <p>Every claim required a human adjuster to:</p>
                  <ol className="list-decimal list-inside space-y-2 pl-2">
                    <li>Read and cross-reference multiple documents</li>
                    <li>Verify policy validity and coverage terms</li>
                    <li>Match claimed parts against coverage lists</li>
                    <li>
                      Calculate payouts with mileage-dependent reimbursement
                      tiers
                    </li>
                    <li>Write a decision with supporting rationale</li>
                  </ol>
                  <p>
                    The company needed an intelligent document processing
                    solution that could handle the full lifecycle: ingestion,
                    classification, extraction, screening, coverage analysis, and
                    payout calculation. Not a proof of concept. A working system
                    with measurable accuracy on real claims.
                  </p>
                </div>
              </motion.div>

              {/* Why Existing Approaches Fall Short */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Why Existing Approaches Fall Short
                </h2>
                <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                  <p>
                    Most document processing tools solve one problem: they
                    extract text from PDFs. That gets you 10% of the way.
                  </p>
                  <p>
                    The real challenge in insurance claims automation is{" "}
                    <span className="font-semibold text-[var(--text-primary)]">
                      cross-document reasoning.
                    </span>{" "}
                    A cost estimate means nothing without the policy. A service
                    history means nothing without the manufacturer&apos;s
                    maintenance intervals. A mileage reading means nothing
                    without the coverage cap.
                  </p>
                </div>

                <div className="space-y-4 mt-6">
                  {[
                    {
                      icon: AlertTriangle,
                      title:
                        "Generic OCR pipelines can't handle domain complexity",
                      desc: "A cost estimate from a Swiss repair garage contains line items in German with part numbers, labor codes, hourly rates, carry-forward subtotals across pages, and VAT calculations. Standard OCR tools extract text. They don't extract structured line items with part-category associations and coverage implications.",
                    },
                    {
                      icon: AlertTriangle,
                      title: "Single-model approaches plateau early",
                      desc: "Sending an entire claim to an LLM and asking \"should this be approved?\" produces inconsistent results. LLMs hallucinate part names, invent coverage rules, and can't reliably perform multi-step financial calculations. Baseline accuracy with an LLM-only approach: 18%.",
                    },
                    {
                      icon: AlertTriangle,
                      title:
                        "Rule-based systems can't scale to vocabulary",
                      desc: "Insurance claims use thousands of part names across multiple languages. A \"Wasserpumpe\" in German is a \"pompe \u00e0 eau\" in French. An \"EGR valve\" might be called \"Abgasruckfuhrung\" on one invoice and \"vanne EGR\" on another. Pure keyword matching breaks on the first synonym it hasn't seen.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="glass-panel p-5 flex gap-4"
                    >
                      <item.icon className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-[var(--text-primary)] mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-[var(--text-secondary)] leading-relaxed">
                  The solution requires a{" "}
                  <span className="font-semibold text-[var(--text-primary)]">
                    hybrid architecture
                  </span>
                  : deterministic rules where they work, keyword matching for
                  known vocabulary, and LLM reasoning as a calibrated fallback.
                  Each layer with explicit confidence scoring and provenance
                  tracking.
                </p>
              </motion.div>

              {/* The Architecture */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  The Architecture: A Multi-Stage Pipeline
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                  We built an end-to-end claims document processing pipeline
                  that processes raw documents through five stages, each with
                  quality gates and audit logging.
                </p>

                {/* Stage 1 */}
                <div className="space-y-10">
                  <div className="glass-panel p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/20 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[var(--primary)]" />
                      </div>
                      <div>
                        <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                          Stage 1
                        </div>
                        <h3 className="font-bold text-[var(--text-primary)]">
                          Document Ingestion
                        </h3>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <p>
                        Raw PDFs and images enter through a pluggable ingestion
                        layer with three supported providers:
                      </p>
                      <ul className="space-y-1 pl-4">
                        <li className="flex items-start gap-2">
                          <span className="text-[var(--primary)] mt-1">
                            &bull;
                          </span>
                          <span>
                            <span className="font-medium text-[var(--text-primary)]">
                              Azure Document Intelligence
                            </span>{" "}
                            for production-grade OCR with table extraction
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[var(--primary)] mt-1">
                            &bull;
                          </span>
                          <span>
                            <span className="font-medium text-[var(--text-primary)]">
                              OpenAI Vision API
                            </span>{" "}
                            for image-heavy documents
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[var(--primary)] mt-1">
                            &bull;
                          </span>
                          <span>
                            <span className="font-medium text-[var(--text-primary)]">
                              Tesseract OCR
                            </span>{" "}
                            as a local fallback
                          </span>
                        </li>
                      </ul>
                      <p>
                        Each page is extracted independently with character-level
                        position tracking. This enables provenance: every
                        extracted field links back to a specific page, character
                        range, and cell reference.
                      </p>
                    </div>
                  </div>

                  {/* Stage 2 */}
                  <div className="glass-panel p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/20 flex items-center justify-center">
                        <Search className="w-5 h-5 text-[var(--primary)]" />
                      </div>
                      <div>
                        <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                          Stage 2
                        </div>
                        <h3 className="font-bold text-[var(--text-primary)]">
                          Document Classification
                        </h3>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <p>
                        Each document is classified into one of 14 types using an
                        LLM-powered router guided by a document type catalog
                        defined in YAML. Supported types include:
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {[
                          "Warranty policies",
                          "Repair cost estimates",
                          "Service maintenance records",
                          "Vehicle registration certificates",
                          "Diagnostic reports (OBD)",
                          "Claim decision letters",
                          "Customer communications",
                          "Damage evidence photos",
                          "Invoices & delivery notes",
                        ].map((type) => (
                          <div
                            key={type}
                            className="flex items-center gap-2 text-[var(--text-muted)]"
                          >
                            <CheckCircle className="w-3 h-3 text-[var(--secondary)] flex-shrink-0" />
                            {type}
                          </div>
                        ))}
                      </div>
                      <p>
                        Classification includes{" "}
                        <span className="font-medium text-[var(--text-primary)]">
                          language-specific cues
                        </span>{" "}
                        in German, French, and Italian. A
                        &quot;Fahrzeugausweis&quot; (DE), &quot;Permis de
                        circulation&quot; (FR), and &quot;Licenza di
                        circolazione&quot; (IT) all map to the same type.
                        Classification runs at near-100% accuracy.
                      </p>
                    </div>
                  </div>

                  {/* Stage 3 */}
                  <div className="glass-panel p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/20 flex items-center justify-center">
                        <Layers className="w-5 h-5 text-[var(--primary)]" />
                      </div>
                      <div>
                        <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                          Stage 3
                        </div>
                        <h3 className="font-bold text-[var(--text-primary)]">
                          Structured Field Extraction
                        </h3>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <p>
                        Domain-specific extractors do the heavy lifting. Each
                        document type has a dedicated extraction spec defining
                        required fields, optional fields, and field groups.
                      </p>

                      <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mt-4 mb-2">
                        Warranty policy extraction: 51 fields across 4 groups
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b border-[var(--border)]">
                              <th className="text-left py-2 pr-4 text-[var(--text-muted)] font-medium">
                                Group
                              </th>
                              <th className="text-left py-2 pr-4 text-[var(--text-muted)] font-medium">
                                Fields
                              </th>
                              <th className="text-left py-2 text-[var(--text-muted)] font-medium">
                                Examples
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-[var(--text-secondary)]">
                            <tr className="border-b border-[var(--border)]/50">
                              <td className="py-2 pr-4">
                                Policy & Policyholder
                              </td>
                              <td className="py-2 pr-4 font-mono-data">13</td>
                              <td className="py-2">
                                Policy number, guarantee type, start/end dates
                              </td>
                            </tr>
                            <tr className="border-b border-[var(--border)]/50">
                              <td className="py-2 pr-4">Vehicle Details</td>
                              <td className="py-2 pr-4 font-mono-data">11</td>
                              <td className="py-2">
                                VIN, make, model, fuel type, current km
                              </td>
                            </tr>
                            <tr className="border-b border-[var(--border)]/50">
                              <td className="py-2 pr-4">Coverage Options</td>
                              <td className="py-2 pr-4 font-mono-data">15</td>
                              <td className="py-2">
                                Max coverage, excess, km limit, turbo/hybrid
                                flags
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 pr-4">
                                Assistance & Mobility
                              </td>
                              <td className="py-2 pr-4 font-mono-data">4</td>
                              <td className="py-2">
                                Towing amount, rental per day, rental max
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <p className="mt-4">
                        The cost estimate extractor handles multi-page documents:
                        header extraction from page 1, line-item extraction from
                        all pages, carry-forward subtotals
                        (&quot;\u00dcbertrag&quot;) across pages, and total
                        validation within CHF 5 tolerance.
                      </p>
                      <p>
                        Each extracted field carries a{" "}
                        <span className="font-medium text-[var(--text-primary)]">
                          confidence score
                        </span>{" "}
                        (0.0-1.0),{" "}
                        <span className="font-medium text-[var(--text-primary)]">
                          provenance
                        </span>{" "}
                        (page, character range, method), and a{" "}
                        <span className="font-medium text-[var(--text-primary)]">
                          quality gate verdict
                        </span>{" "}
                        (pass/warn/fail). Fields that fail are routed for human
                        review.
                      </p>
                    </div>
                  </div>

                  {/* Stage 4 */}
                  <div className="glass-panel p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/20 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-[var(--primary)]" />
                      </div>
                      <div>
                        <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                          Stage 4
                        </div>
                        <h3 className="font-bold text-[var(--text-primary)]">
                          Screening & Coverage Analysis
                        </h3>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <p>
                        The core innovation. A deterministic screening pipeline
                        runs{" "}
                        <span className="font-semibold text-[var(--text-primary)]">
                          11 checks
                        </span>{" "}
                        before any LLM-based assessment:
                      </p>

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
                              [
                                "Policy Enforcement",
                                "Is the policy in the rejected list?",
                                "Hard fail",
                              ],
                              [
                                "Policy Validity",
                                "Is the policy active on the damage date?",
                                "Hard fail",
                              ],
                              [
                                "Damage Date",
                                "Is the claim date clear and valid?",
                                "Hard fail",
                              ],
                              [
                                "Service Compliance",
                                "Did the vehicle meet service intervals?",
                                "Soft check",
                              ],
                              [
                                "Shop Authorization",
                                "Is the repair shop authorized?",
                                "Informational",
                              ],
                              [
                                "Mileage",
                                "Does odometer exceed coverage limit?",
                                "Hard fail",
                              ],
                              [
                                "Damage Cause",
                                "Does the DTC code match an exclusion?",
                                "Conditional",
                              ],
                              [
                                "Component Coverage",
                                "Is the part in the coverage list?",
                                "Hard fail",
                              ],
                              [
                                "Labor Follows Parts",
                                "Is labor anchored to a covered part?",
                                "Conditional",
                              ],
                              [
                                "Hybrid Exclusion",
                                "Are hybrid-specific parts excluded?",
                                "Hard fail",
                              ],
                              [
                                "Damage Cause Exclusion",
                                "Does root cause match excluded pattern?",
                                "Hard fail",
                              ],
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

                      <p className="mt-4">
                        Service compliance alone required building a database of
                        manufacturer-specific service intervals for{" "}
                        <span className="font-medium text-[var(--text-primary)]">
                          18 vehicle brands
                        </span>
                        , covering petrol, diesel, hybrid, and electric variants:
                      </p>
                      <ul className="space-y-1 pl-4 text-xs">
                        <li className="flex items-start gap-2">
                          <span className="text-[var(--primary)] mt-1">
                            &bull;
                          </span>
                          <span>
                            <span className="font-medium text-[var(--text-primary)]">
                              VW Group:
                            </span>{" "}
                            Dual system (fixed + LongLife), conservative fixed
                            interval used
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[var(--primary)] mt-1">
                            &bull;
                          </span>
                          <span>
                            <span className="font-medium text-[var(--text-primary)]">
                              Mercedes:
                            </span>{" "}
                            Service A / Service B rotation
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[var(--primary)] mt-1">
                            &bull;
                          </span>
                          <span>
                            <span className="font-medium text-[var(--text-primary)]">
                              Ford:
                            </span>{" "}
                            EcoBoost-specific petrol intervals
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[var(--primary)] mt-1">
                            &bull;
                          </span>
                          <span>
                            <span className="font-medium text-[var(--text-primary)]">
                              Electric vehicles:
                            </span>{" "}
                            30,000 km / 24 months (inspection only)
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Three-Tier Matching */}
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">
                      Coverage Analysis: Three-Tier Matching
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                      For component coverage, each line item from the cost
                      estimate goes through a three-tier matching pipeline,
                      ordered from fastest/highest-confidence to
                      slowest/lowest-confidence:
                    </p>
                    <div className="space-y-3">
                      {[
                        {
                          tier: "Tier 1",
                          name: "Rule Engine",
                          confidence: "1.0",
                          color: "text-emerald-400",
                          bg: "bg-emerald-500/10 border-emerald-500/20",
                          desc: "Deterministic matches for fee items, known exclusions, consumables, fasteners. Handles patterns like disposal fees, fluids, engine oil. Zero ambiguity, zero latency.",
                          pct: "40-50%",
                        },
                        {
                          tier: "Tier 2",
                          name: "Keyword Matcher",
                          confidence: "0.70-0.90",
                          color: "text-blue-400",
                          bg: "bg-blue-500/10 border-blue-500/20",
                          desc: "Maps German/French repair terms to 30+ component categories with synonyms. Umlaut normalization for robust matching. Cross-references against the policy\u2019s covered/excluded component list.",
                          pct: "30-40%",
                        },
                        {
                          tier: "Tier 3",
                          name: "LLM Fallback",
                          confidence: "0.60-0.85",
                          color: "text-amber-400",
                          bg: "bg-amber-500/10 border-amber-500/20",
                          desc: "GPT-4o with structured prompts for genuinely ambiguous items. Concurrency-optimized with 10 parallel calls. Maximum 35 items per claim. Every call audited with token count, cost, and reasoning.",
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
                  </div>

                  {/* Payout Calculation */}
                  <div className="glass-panel-light p-6">
                    <h4 className="font-bold text-[var(--text-primary)] mb-3">
                      Payout Calculation
                    </h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-[var(--text-secondary)]">
                      <li>Sum covered items (gross)</li>
                      <li>
                        Apply maximum coverage cap (if policy specifies one)
                      </li>
                      <li>
                        Apply mileage-dependent reimbursement rate (40%-100%)
                      </li>
                      <li>Add VAT (8.1% in Switzerland)</li>
                      <li>
                        Calculate deductible (percentage with minimum floor)
                      </li>
                      <li>Compute final payout</li>
                    </ol>
                    <p className="text-xs text-[var(--text-muted)] mt-3">
                      Standardized deductibles (CHF 150 in 49% of claims),
                      formulaic reimbursement tiers, and verifiable parts/labor
                      splits (60% parts, 40% labor on average).
                    </p>
                  </div>

                  {/* Stage 5 */}
                  <div className="glass-panel p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/20 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-[var(--primary)]" />
                      </div>
                      <div>
                        <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                          Stage 5
                        </div>
                        <h3 className="font-bold text-[var(--text-primary)]">
                          QA Console & Human-in-the-Loop Review
                        </h3>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm text-[var(--text-secondary)]">
                      {[
                        "Dashboard with claim-level KPIs, decision distribution, and payout summaries",
                        "Document review with split-view: extracted fields on the left, source document on the right",
                        "Provenance highlighting: click any extracted field to see exactly where it came from",
                        "Three-bucket triage: Rejected / Needs Review / Approved",
                        "Labeling interface with keyboard shortcuts for rapid QA",
                        "Coverage reasoning view: per-line-item decision with match method, confidence, and explanation",
                        "Assessment comparison: side-by-side system decision vs. ground truth",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-2 py-1"
                        >
                          <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* The Implementation Journey */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  The Implementation Journey: From 18% to 98%
                </h2>

                {/* Accuracy Timeline */}
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
                      The initial approach sent claim documents to GPT-4o and
                      asked for a decision. The LLM produced plausible-sounding
                      but unreliable results: hallucinated part names, invented
                      coverage rules, and inconsistent financial calculations.
                    </p>
                    <div className="glass-panel-light p-3 mt-3 text-xs text-[var(--text-secondary)]">
                      <span className="font-medium text-[var(--text-primary)]">
                        Key insight:
                      </span>{" "}
                      LLMs are good at language understanding but bad at
                      deterministic business rules. The architecture had to
                      separate what requires judgment from what requires
                      precision.
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
                      Implementing the 11-check screening pipeline and
                      three-tier coverage matching drove the biggest single
                      improvement. The deterministic checks alone caught most
                      denials correctly, and the keyword matcher handled the
                      majority of coverage lookups.
                    </p>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-2">
                      German repair terminology uses compound words. A
                      &quot;Abgasruckfuhrungsventil&quot; (exhaust gas
                      recirculation valve) is one word. The keyword matcher
                      needed umlaut normalization, compound word decomposition,
                      and synonym mapping across German and French.
                    </p>
                  </div>

                  {/* Day 5-7 */}
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
                    <div className="text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
                      <p>
                        60+ evaluation iterations, each tracking decision
                        accuracy, false reject/approve rates, amount accuracy,
                        and top error categories. The progression from 88% to
                        98% required solving increasingly subtle problems:
                      </p>
                      <div className="space-y-3">
                        <div className="glass-panel-light p-3 text-xs">
                          <span className="font-medium text-[var(--text-primary)]">
                            Cross-category substring matching bug:
                          </span>{" "}
                          An EGR valve synonym
                          (&quot;abgasrueckfuehrung&quot;) contained the
                          substring &quot;asr&quot; (anti-slip regulation, a
                          brake component). The system found &quot;asr&quot;
                          inside &quot;abgasrueckfuehrung&quot; and declared the
                          EGR valve covered under brakes. Fix: symmetric guard
                          requiring exact match when either term is 3 characters
                          or fewer.
                        </div>
                        <div className="glass-panel-light p-3 text-xs">
                          <span className="font-medium text-[var(--text-primary)]">
                            Labor demotion over-aggression:
                          </span>{" "}
                          When a part was covered, the associated installation
                          labor should also be covered. The system was excluding
                          labor items that couldn&apos;t be linked to a specific
                          covered part number. Fix: labor promotion logic that
                          inherits coverage from the parent repair.
                        </div>
                        <div className="glass-panel-light p-3 text-xs">
                          <span className="font-medium text-[var(--text-primary)]">
                            Part-number normalization:
                          </span>{" "}
                          A Mercedes roof motor part number{" "}
                          <code className="text-[var(--primary)]">
                            A205 906 41 04
                          </code>{" "}
                          existed in the parts database but wasn&apos;t matched
                          due to spacing differences in OCR extraction. Fix:
                          normalize all part numbers by stripping spaces and
                          special characters before lookup.
                        </div>
                      </div>
                    </div>
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
                    <div className="text-sm text-[var(--text-secondary)] leading-relaxed space-y-3">
                      <p>
                        After reaching 98% on the development set (50 claims),
                        we ran a holdout evaluation on 30 previously unseen
                        claims. The holdout revealed failure modes the
                        development set didn&apos;t cover:
                      </p>
                      <div className="space-y-2">
                        {[
                          {
                            title: "Causal exclusion clauses",
                            desc: "A turbocharger is covered, but if the turbo failed because the engine (not covered) failed first, the policy denies coverage. The system doesn\u2019t reason about failure chains.",
                          },
                          {
                            title: "Missing documents",
                            desc: "One claim was denied because the policy premium wasn\u2019t paid. This information lives in the insurer\u2019s internal system, not in any processable document.",
                          },
                          {
                            title: "Sub-component interpretation gaps",
                            desc: "A DPF sensor is functionally part of the exhaust system. The policy covers exhausts but only lists \"catalytic converter\" and \"oxygen sensor.\" The adjuster approved by interpreting the sensor as an exhaust sub-component.",
                          },
                          {
                            title: "Excluded-component dominance",
                            desc: "A claim for a hose repair (excluded) was approved because a minor bolt (CHF 3.70, covered) was also on the invoice. The system selected the bolt as the \"primary covered repair.\"",
                          },
                        ].map((item) => (
                          <div
                            key={item.title}
                            className="glass-panel-light p-3 text-xs"
                          >
                            <span className="font-medium text-[var(--text-primary)]">
                              {item.title}:
                            </span>{" "}
                            {item.desc}
                          </div>
                        ))}
                      </div>
                      <p className="font-medium text-[var(--text-primary)]">
                        The holdout gap (98% vs 77%) is the honest measure of
                        generalization. Each holdout error was analyzed and
                        documented with root cause, fix complexity, and priority.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Technical Challenges */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Technical Challenges and Solutions
                </h2>

                <div className="space-y-6">
                  {[
                    {
                      icon: Layers,
                      title:
                        "Customer-Agnostic Core vs. Domain-Specific Configuration",
                      solution: "Workspace-based multi-tenant architecture",
                      desc: "The core product contains generic pipeline stages, schemas, and interfaces. All customer-specific logic lives in workspace configuration loaded at runtime: extraction specs, keyword mappings, screening rules, and part number databases. Adding a new customer means adding a new workspace directory with configuration files. No code changes to the core product.",
                    },
                    {
                      icon: Globe,
                      title: "Multi-Language Document Processing",
                      solution: "Language-aware classification and extraction",
                      desc: "The document type catalog includes cues in German, French, and Italian. Keyword mappings contain synonyms for every repair term category in each language. Date and number parsing handles Swiss conventions. Impact: German and French claims show comparable approval rates (49% vs 54%) with nearly identical average payouts. No measurable language bias.",
                    },
                    {
                      icon: DollarSign,
                      title: "Cost Estimation at Scale",
                      solution: "Tiered matching with cost controls",
                      desc: "Rule engine and keyword matcher handle 80-90% of items with zero LLM cost. LLM calls are capped at 35 items per claim with 10 parallel calls. Every call is logged with token count, model, and cost. Token usage monitoring with configurable thresholds (warn at 40K, fail at 60K tokens per claim) prevents runaway costs.",
                    },
                    {
                      icon: Lock,
                      title: "Auditability and Compliance",
                      solution: "Full provenance chain and audit logging",
                      desc: "Every extracted field links to its source (page, character position, method). Every coverage decision includes match method, confidence score, and explanation. Every screening check records verdict, evidence, and data sources. All LLM calls logged to an audit trail. The QA console allows adjusters to trace any decision back to the source document.",
                    },
                    {
                      icon: Calculator,
                      title: "Payout Formula Precision",
                      solution:
                        "Line-by-line financial reconciliation",
                      desc: "The system was applying the mileage-dependent reimbursement rate after the deductible, while the insurer applies it before. This single formula error caused 27% overpayment on claims with degraded rates. A 5-line code fix, but finding it required walking through calculations claim by claim with the adjuster.",
                    },
                  ].map((challenge) => (
                    <div key={challenge.title} className="glass-panel p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/20 flex items-center justify-center flex-shrink-0">
                          <challenge.icon className="w-5 h-5 text-[var(--primary)]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[var(--text-primary)] mb-1">
                            {challenge.title}
                          </h4>
                          <div className="text-xs text-[var(--secondary)] font-medium mb-2">
                            Solution: {challenge.solution}
                          </div>
                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                            {challenge.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Payout formula example */}
                <div className="mt-6 glass-panel p-6">
                  <h4 className="font-semibold text-[var(--text-primary)] mb-3">
                    The order-of-operations bug (40% reimbursement rate)
                  </h4>
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
                          <td className="py-2 pr-4 font-sans text-sm">
                            Gross covered
                          </td>
                          <td className="py-2 pr-4">CHF 1,118.60</td>
                          <td className="py-2">CHF 1,118.60</td>
                        </tr>
                        <tr className="border-b border-[var(--border)]/50">
                          <td className="py-2 pr-4 font-sans text-sm">
                            Apply rate
                          </td>
                          <td className="py-2 pr-4 text-[var(--text-muted)]">
                            &mdash;
                          </td>
                          <td className="py-2">CHF 447.44</td>
                        </tr>
                        <tr className="border-b border-[var(--border)]/50">
                          <td className="py-2 pr-4 font-sans text-sm">
                            Add VAT (8.1%)
                          </td>
                          <td className="py-2 pr-4">CHF 1,209.21</td>
                          <td className="py-2">CHF 483.69</td>
                        </tr>
                        <tr className="border-b border-[var(--border)]/50">
                          <td className="py-2 pr-4 font-sans text-sm">
                            Deductible
                          </td>
                          <td className="py-2 pr-4">CHF 150.00</td>
                          <td className="py-2">CHF 150.00</td>
                        </tr>
                        <tr className="border-b border-[var(--border)]/50">
                          <td className="py-2 pr-4 font-sans text-sm">
                            Apply rate
                          </td>
                          <td className="py-2 pr-4">CHF 423.68</td>
                          <td className="py-2 text-[var(--text-muted)]">
                            &mdash;
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
                    A 27% overpayment from a single operation-order error,
                    affecting 8 of 50 evaluation claims.
                  </p>
                </div>
              </motion.div>

              {/* Results and Metrics */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Results and Metrics
                </h2>

                {/* Eval Set */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                      Evaluation Set (50 Claims)
                    </h3>
                    <div className="glass-panel overflow-hidden">
                      <table className="w-full text-sm">
                        <tbody>
                          {[
                            ["Decision accuracy", "98% (49/50 correct)", true],
                            [
                              "Approved claims correctly identified",
                              "25/25 (100%)",
                              false,
                            ],
                            [
                              "Denied claims correctly identified",
                              "24/25 (96%)",
                              false,
                            ],
                            ["False reject rate", "0%", false],
                            ["False approve rate", "4% (1 claim)", false],
                            [
                              "Payout within 5% of ground truth",
                              "28% (7/25 approved)",
                              false,
                            ],
                            [
                              "Denial reason match",
                              "72% (18/25 denied)",
                              false,
                            ],
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
                            [
                              "Decision accuracy",
                              "76.7% (23/30 correct)",
                              true,
                            ],
                            [
                              "Approved claims correctly identified",
                              "11/15",
                              false,
                            ],
                            [
                              "Denied claims correctly identified",
                              "12/15",
                              false,
                            ],
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

                  {/* Error Distribution */}
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                      Error Distribution
                    </h3>
                    <div className="glass-panel overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-[var(--border)]">
                            <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">
                              Error Type
                            </th>
                            <th className="text-right py-3 px-4 text-[var(--text-muted)] font-medium">
                              Eval
                            </th>
                            <th className="text-right py-3 px-4 text-[var(--text-muted)] font-medium">
                              Holdout
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-[var(--text-secondary)]">
                          {[
                            ["False approve", "1", "2"],
                            ["False reject", "0", "3"],
                            ["Referral errors", "0", "2"],
                            ["Amount mismatch", "18", "8"],
                          ].map((row) => (
                            <tr
                              key={row[0]}
                              className="border-b border-[var(--border)]/50"
                            >
                              <td className="py-3 px-4">{row[0]}</td>
                              <td className="py-3 px-4 text-right font-mono-data">
                                {row[1]}
                              </td>
                              <td className="py-3 px-4 text-right font-mono-data">
                                {row[2]}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Processing Characteristics */}
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                      Processing Characteristics
                    </h3>
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
                      title:
                        "Deterministic checks beat LLM judgment for structured rules.",
                      desc: "76% of claim denials are \"part not covered.\" This is a lookup, not a judgment call. The screening pipeline handles these with 100% confidence and zero LLM cost. Reserve the LLM for genuinely ambiguous cases.",
                    },
                    {
                      num: "2",
                      title:
                        "The accuracy curve has diminishing returns.",
                      desc: "Going from 18% to 76% took 3 days. Going from 76% to 98% took 4 more days. Each subsequent percentage point required deeper investigation, subtler fixes, and more edge case handling. The holdout gap (98% vs 77%) confirmed that real-world generalization requires significantly more data and iteration.",
                    },
                    {
                      num: "3",
                      title:
                        "The payout formula is harder than the AI.",
                      desc: "Getting the LLM to classify parts correctly is table stakes. Getting the financial calculation to match the insurer\u2019s exact formula requires sitting with an adjuster and walking through calculations by hand. No amount of prompt engineering solves an order-of-operations bug in business logic.",
                    },
                    {
                      num: "4",
                      title: "Provenance tracking is non-negotiable.",
                      desc: "In a regulated industry, \"the AI said so\" is not an acceptable audit trail. Every extracted value, every coverage decision, and every screening verdict must trace back to a source document, page, and character position. This adds engineering complexity but is fundamental to trust and compliance.",
                    },
                    {
                      num: "5",
                      title:
                        "Customer-agnostic architecture pays for itself immediately.",
                      desc: "Separating the core product from customer-specific configuration meant that adding document types, keyword mappings, and screening rules required zero code changes to the product. The entire customer integration was done through YAML configuration files and custom extractor plugins.",
                    },
                    {
                      num: "6",
                      title:
                        "Ground truth is the foundation of everything.",
                      desc: "Without 50 manually verified claim decisions (with itemized payouts, coverage notes, and denial reasons), there would be no way to measure progress, identify bugs, or validate fixes. Building the ground truth dataset was the single highest-ROI investment in the project.",
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

              {/* Next Steps */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  What&apos;s Next
                </h2>
                <div className="space-y-3 text-[var(--text-secondary)] leading-relaxed">
                  <p>
                    The system is in active development with a clear path
                    forward:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 pl-2 text-sm">
                    <li>
                      Expand the ground truth dataset beyond 80 claims to
                      improve generalization
                    </li>
                    <li>
                      Integrate with the insurer&apos;s policy management API
                      for real-time policy status checks
                    </li>
                    <li>
                      Implement causal exclusion reasoning for
                      cascading-damage denial patterns
                    </li>
                    <li>
                      Build a self-service configuration portal for adjusters
                      to update keyword mappings and coverage rules
                    </li>
                    <li>
                      Deploy production triage workflow: auto-reject
                      high-confidence denials, auto-approve simple approvals,
                      route edge cases for human review
                    </li>
                  </ol>
                  <p className="mt-4 font-medium text-[var(--text-primary)]">
                    The goal is not to replace adjusters. The goal is to give
                    them back their time on the 76% of denials that are
                    straightforward lookups, so they can focus their expertise on
                    the 24% that actually require judgment.
                  </p>
                </div>
              </motion.div>
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
