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
  Eye,
  Database,
  KeyRound,
  UserCheck,
  AlertTriangle,
  Search,
} from "lucide-react";
import { ZoomableInfographic } from "@/components/ui/ZoomableInfographic";

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

export default function ComplianceAuditabilityCaseStudy() {
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
                  European Pet Insurance Provider
                </div>
                <div className="text-[var(--text-muted)]">
                  Pet Insurance (P&amp;C)
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              Bringing auditability and regulatory alignment to an AI-assisted
              claims process
            </h1>
            <p className="text-xl md:text-2xl text-[var(--primary)] font-semibold mb-6">
              Full decision reconstruction, regulator-ready decisioning,
              compliance embedded into every pipeline run
            </p>

            {/* Product & Timeline */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm px-3 py-1.5 rounded-full font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                ClaimPilot
              </span>
              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                <Clock className="w-4 h-4" />
                April 2026
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
                value: "50+",
                label: "Governance documents",
                improvement: "across 7 domains",
              },
              {
                value: "160+",
                label: "Fields classified",
                improvement: "PII categorization",
              },
              {
                value: "12",
                label: "Deterministic checks",
                improvement: "no LLM involvement",
              },
              {
                value: "5",
                label: "Access roles",
                improvement: "enforced at every endpoint",
              },
              {
                value: "1",
                label: "API call to verify",
                improvement: "full ledger integrity",
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
                    When a European insurer introduces AI into claims processing,
                    the operational benefits arrive quickly. Faster triage. Fewer
                    manual lookups. Better consistency across adjusters. What
                    arrives less quickly is the answer to a regulator&apos;s
                    question: &ldquo;Why did the system make this decision and can
                    you prove it?&rdquo;
                  </p>
                  <p>
                    Most AI-assisted claims platforms solve for speed. They
                    optimize processing time, automate document reading and
                    generate coverage verdicts. The audit question gets treated as
                    a reporting problem. Something to solve after the fact,
                    usually by exporting logs into a spreadsheet and hoping the
                    data is still there.
                  </p>
                  <p>
                    For a regulated insurer processing thousands of claims per
                    month across multiple jurisdictions, that approach breaks down
                    in predictable ways:
                  </p>
                </div>

                {/* Breakdown points */}
                <div className="mt-4 space-y-3">
                  {[
                    {
                      icon: AlertTriangle,
                      desc: 'If the model version changes between when a decision was made and when an auditor asks about it, the decision cannot be reconstructed. The insurer is left explaining what a different model might have done.',
                    },
                    {
                      icon: Search,
                      desc: 'An extracted field says "covered." But where did that come from? Which page of which document? What exact text did the model see when it reached that conclusion? Without this, the audit trail is a verdict with no supporting evidence.',
                    },
                    {
                      icon: Eye,
                      desc: "When everything runs through an LLM, there is no way to tell the regulator which decisions were governed by fixed rules and which involved statistical inference. The entire system becomes a black box.",
                    },
                    {
                      icon: Lock,
                      desc: "Claim documents contain policyholder names, veterinary records, pet identification details and financial information. In most pipeline architectures, this data passes through LLM prompts unredacted and lands in log files in plaintext.",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="glass-panel p-5 flex gap-4"
                    >
                      <item.icon className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {item.desc}
                      </p>
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
                      "We need every automated decision traceable to source evidence. Not summaries. The actual document region.",
                      "We need to reconstruct any decision exactly as it was made, even if the system has changed since then.",
                      "We need compliance with EU AI Act transparency requirements and alignment with Swiss data protection law.",
                      "We need separation between what the machine decided deterministically and what it inferred.",
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
                        icon: Globe,
                        title: "Regulatory",
                        desc: "EU AI Act classifies insurance claims processing as high-risk AI. Annex VIII requires decision logging, model versioning and explainability. GDPR Article 22 requires transparency for automated decisions affecting individuals. Swiss FADP adds cross-border data transfer requirements.",
                      },
                      {
                        icon: Cog,
                        title: "Architectural",
                        desc: "Compliance cannot be a bolt-on reporting layer. If audit data is generated after the fact by querying production databases, it is reconstructed, not recorded. The audit trail must be a byproduct of normal processing.",
                      },
                      {
                        icon: Users,
                        title: "Operational",
                        desc: "Adjusters, auditors, compliance officers and administrators all interact with the system. Each role needs different access. An auditor should see decision logs and LLM call records but should never modify claim data.",
                      },
                      {
                        icon: Lock,
                        title: "Data protection",
                        desc: "Claim documents contain policyholder personal data including financial details, identification documents and pet medical histories. This data must be protected at rest, redacted in logs and deletable on demand.",
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
                  {/* Design Block 1: Tamper-evident ledger */}
                  <div className="glass-panel p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Constraint
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          Every automated decision must be traceable. But tracing
                          decisions after the fact means trusting that logs were
                          not modified, deleted or corrupted between when the
                          decision was made and when the auditor arrives.
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
                          Build a tamper-evident decision ledger. Every decision
                          record (classification, extraction, coverage, screening,
                          assessment, human override) is appended to a JSONL
                          ledger where each record&apos;s hash includes the hash
                          of the previous record. The chain starts from a known
                          genesis marker. Any modification, deletion or insertion
                          breaks the chain at the exact point of tampering.
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
                          The integrity of the entire decision history can be
                          verified with a single API call. If the hash chain
                          breaks, the system identifies the exact record where it
                          happened. This runs continuously, not as a periodic
                          audit.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Design Block 2: Version bundles */}
                  <div className="glass-panel p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <Database className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Constraint
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          Model versions, prompt templates, extraction
                          specifications and configuration change over time. When
                          a regulator asks &ldquo;why did you decide X on this
                          claim three months ago?&rdquo; the insurer needs to
                          reproduce the exact environment, not explain what the
                          current version would do differently.
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
                          Every pipeline run automatically captures a version
                          bundle: the exact git commit SHA, application version,
                          LLM model name, SHA-256 hash of all prompt templates,
                          SHA-256 hash of extraction specifications and the full
                          scope configuration at runtime. Version bundles are
                          immutable and linked to their pipeline run.
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
                          Any historical decision can be traced to the exact code,
                          model, prompts and configuration that produced it. The
                          version bundle is a complete snapshot of every variable
                          that influenced the decision.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Design Block 3: LLM audit trail */}
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
                          LLMs are non-deterministic. They produce different
                          outputs given the same input. When an LLM contributes to
                          a coverage decision or document classification, the
                          audit trail must capture not just the output but the
                          complete input context: what the model saw, what it was
                          asked, how it responded.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Design
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          Every LLM call passes through an audited client wrapper
                          that captures: full system and user prompts, model
                          parameters (temperature, max tokens), complete response
                          content, token usage, latency and the exact text
                          injected from source documents. Each LLM call record
                          links to its corresponding decision record via a shared
                          identifier.
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
                          An auditor can reconstruct the exact input-output pair
                          for any LLM-assisted decision. They see not just
                          &ldquo;the model classified this as a veterinary
                          invoice&rdquo; but &ldquo;the model was shown these
                          2,400 characters from pages 1-3 of this document, with
                          these classification cues highlighted and responded with
                          this classification at this confidence level in 1.2
                          seconds using GPT-4o.&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Design Block 4: PII vault */}
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
                          Claim documents contain policyholder names, ID numbers,
                          veterinary records, pet identification details and bank
                          details. The insurer needs personal data protected at
                          rest, redacted in audit logs and permanently deletable
                          when a data subject exercises their right to erasure.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <KeyRound className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Design
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          A per-claim encrypted PII vault using AES-256-GCM
                          envelope encryption. Each vault has its own Key
                          Encryption Key (KEK). Sensitive fields extracted from
                          documents are tokenized before they reach decision logs
                          or LLM prompts. Tokens look like{" "}
                          <code className="text-[var(--primary)]">
                            [PII:vault_C001:entry_42]
                          </code>
                          . The original values exist only inside the encrypted
                          vault. Deleting the KEK makes the vault permanently
                          unreadable. This is crypto-shredding: a mathematical
                          guarantee of erasure, not a file deletion that might
                          leave fragments on disk.
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
                          Decision logs, LLM call records and audit exports never
                          contain raw PII. A GDPR Article 17 (right to erasure)
                          request is fulfilled by destroying a single encryption
                          key. No scanning of log files. No risk of incomplete
                          deletion.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Design Block 5: Role-based access */}
                  <div className="glass-panel p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Constraint
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          Compliance is not one role&apos;s concern. Adjusters
                          need to see claim decisions. Auditors need to review
                          decision logs and LLM call records. Administrators
                          manage configuration and users. Compliance officers need
                          system-wide health metrics. But an auditor should never
                          modify claim data and an adjuster should never access
                          raw LLM prompt logs.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <UserCheck className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-1">
                          Design
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          Five roles with distinct capability sets enforced at
                          every API endpoint: admin, auditor, reviewer, operator,
                          adjuster. Each role maps to specific capabilities (e.g.,{" "}
                          <code className="text-[var(--primary)]">
                            compliance.read
                          </code>
                          ,{" "}
                          <code className="text-[var(--primary)]">
                            claims.write
                          </code>
                          ,{" "}
                          <code className="text-[var(--primary)]">
                            admin.manage
                          </code>
                          ). Authentication uses bcrypt-hashed passwords with
                          12-character minimum complexity requirements, 90-day
                          expiration and history checks preventing reuse of the
                          last five passwords. Sessions use HttpOnly cookies with
                          SameSite=Strict and 8-hour expiry. Brute-force
                          protection locks accounts after five consecutive
                          failures for 30 minutes. IP-level rate limiting caps
                          attempts at 10 per 60-second window.
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
                          Every action in the system is performed by an
                          authenticated, authorized user. The auditor role is a
                          first-class concept. Compliance data is accessible
                          without exposing operational controls. Operational users
                          cannot tamper with audit records.
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
                  The compliance infrastructure is woven into every stage of the
                  processing pipeline. Each stage produces compliance artifacts
                  as a natural byproduct of processing, not as a separate export
                  step.
                </p>

                {/* Architecture infographic */}
                <ZoomableInfographic
                  src="/images/case-studies/claimpilot-compliance-auditability-architecture.png"
                  alt="ClaimPilot compliance and auditability architecture diagram"
                  width={2754}
                  height={1536}
                />

                {/* Architecture Detail Sections */}
                <div className="space-y-3">
                  <ExpandableSection
                    title="1. Decision ledger (tamper-evident audit chain)"
                    defaultOpen
                  >
                    <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <p>
                        Every autonomous decision generates a{" "}
                        <code className="text-[var(--primary)]">
                          DecisionRecord
                        </code>{" "}
                        written to an append-only JSONL ledger:
                      </p>
                      <ul className="space-y-2">
                        {[
                          "decision_id (unique identifier)",
                          "decision_type (classification, extraction, quality gate, reconciliation, screening, coverage, assessment, fraud label)",
                          "Timestamp (UTC, ISO 8601)",
                          "claim_id and doc_id (linking decision to source)",
                          "actor_type (system or human) and actor_id (model name or username)",
                          "rationale with summary and confidence score",
                          "outcome (the decision itself)",
                          "record_hash (SHA-256 of current record including previous_hash)",
                        ].map((field) => (
                          <li key={field} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                            <span>
                              <code className="text-[var(--primary)]">
                                {field.split(" (")[0]}
                              </code>
                              {field.includes(" (") &&
                                ` (${field.split(" (").slice(1).join(" (")}` }
                            </span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3">
                        Human overrides are logged as separate decision records
                        with{" "}
                        <code className="text-[var(--primary)]">
                          actor_type: human
                        </code>
                        , preserving the original automated decision. The chain
                        never branches or rewrites.
                      </p>
                      <div className="glass-panel-light p-3 mt-3 text-xs">
                        <span className="font-medium text-[var(--text-primary)]">
                          Verification endpoint:
                        </span>{" "}
                        <code className="text-[var(--primary)]">
                          GET /api/compliance/ledger/verify
                        </code>{" "}
                        returns chain validity, record count and (if broken) the
                        exact break point.
                      </div>
                    </div>
                  </ExpandableSection>

                  <ExpandableSection title="2. LLM call audit trail">
                    <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <p>
                        Every LLM interaction is captured through the{" "}
                        <code className="text-[var(--primary)]">
                          AuditedOpenAIClient
                        </code>{" "}
                        wrapper:
                      </p>
                      <ul className="space-y-2">
                        {[
                          "Full prompt messages (system + user)",
                          "Model parameters (temperature, max tokens, response format)",
                          "Complete response content",
                          "Token usage (prompt, completion, total)",
                          "Latency in milliseconds",
                          "injected_context: the exact document text shown to the model, with page numbers, character offsets and selection criteria",
                          "Error tracking with retry chain (previous_call_id)",
                          "Link to corresponding DecisionRecord via decision_id",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3">
                        Each LLM call record specifies not just what the model
                        said but what it saw. The{" "}
                        <code className="text-[var(--primary)]">
                          injected_context
                        </code>{" "}
                        object records the selection strategy (full document,
                        optimized excerpt, retry with full context), total source
                        characters available and exactly which portions were
                        selected and why.
                      </p>
                    </div>
                  </ExpandableSection>

                  <ExpandableSection title="3. Extraction provenance">
                    <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <p>
                        Every extracted field carries provenance metadata:
                      </p>
                      <ul className="space-y-2">
                        {[
                          "text_quote: the exact text from the source document",
                          "page_number: which page",
                          "char_start and char_end: character offsets for highlighting",
                          "selection_criteria: why this source region was chosen",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3">
                        Quality reports per extraction include evidence coverage
                        (fraction of fields with provenance), validation check
                        results and per-field confidence scores. Provenance is
                        produced during extraction, not attached afterward.
                      </p>
                    </div>
                  </ExpandableSection>

                  <ExpandableSection title="4. Version bundles (pipeline reproducibility)">
                    <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <p>
                        Captured automatically at the start of every pipeline
                        run:
                      </p>
                      <ul className="space-y-2">
                        {[
                          "git_commit (exact SHA)",
                          "git_dirty (whether uncommitted changes existed)",
                          "contextbuilder_version (application version)",
                          "model_name (LLM used)",
                          "prompt_template_hash (SHA-256)",
                          "extraction_spec_hash (SHA-256)",
                          "scope_snapshot (full configuration at runtime)",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                            <span>
                              <code className="text-[var(--primary)]">
                                {item.split(" (")[0]}
                              </code>
                              {item.includes(" (") &&
                                ` (${item.split(" (").slice(1).join(" (")}` }
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ExpandableSection>

                  <ExpandableSection title="5. Model governance">
                    <div className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      <p>
                        A formal model registry defines approved models with
                        lifecycle states:{" "}
                        <code className="text-[var(--primary)]">approved</code>,{" "}
                        <code className="text-[var(--primary)]">deprecated</code>
                        ,{" "}
                        <code className="text-[var(--primary)]">blocked</code>,{" "}
                        <code className="text-[var(--primary)]">
                          development
                        </code>
                        . In deployed environments, allowlist enforcement prevents
                        any non-approved model from being used. Drift alerting
                        fires when a non-default model is detected. Accuracy
                        regression alerting fires when extraction accuracy drops
                        below threshold.
                      </p>
                    </div>
                  </ExpandableSection>

                  <ExpandableSection title="6. Data protection layer">
                    <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      <ul className="space-y-2">
                        {[
                          "PII vault: per-claim AES-256-GCM envelope encryption with crypto-shredding capability",
                          "26 PII field categories covering 160+ extraction fields classified as direct PII, indirect PII or non-personal",
                          "Tokenization in decision logs and LLM prompts when vault is enabled",
                          "Encrypted storage backends for decision records and LLM logs at rest",
                          "Document access logging: every view, download or processing action recorded with user, timestamp, action, IP and correlation ID",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ExpandableSection>

                  <ExpandableSection title="7. Security event monitoring">
                    <div className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      <p className="mb-3">
                        Dedicated security event log capturing failed and
                        successful login attempts, account lockouts, rate-limit
                        triggers, IP addresses and timestamps for forensic
                        investigation.
                      </p>
                      <p>
                        The alert system monitors for compliance-relevant
                        anomalies: hash chain integrity failures, LLM failure
                        bursts, login failure spikes, accuracy regressions, model
                        drift.
                      </p>
                    </div>
                  </ExpandableSection>

                  <ExpandableSection title="8. Compliance health dashboard">
                    <div className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      <p className="mb-3">
                        Single endpoint (
                        <code className="text-[var(--primary)]">
                          GET /api/compliance/audit-console/summary
                        </code>
                        ) aggregating ledger integrity status, decision metrics by
                        type and time window, version bundle metrics,
                        configuration change history, user security metrics, auth
                        protection metrics, session security profile and PII
                        protection status.
                      </p>
                      <p>
                        A circuit breaker monitors ledger integrity continuously.
                        If the hash chain fails repeated verification, the system
                        degrades gracefully rather than silently accepting
                        corrupted audit data.
                      </p>
                    </div>
                  </ExpandableSection>
                </div>
              </motion.div>

              {/* 4. Deterministic vs AI boundary */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                  Deterministic vs AI boundary
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  This is the architectural decision that matters most for
                  compliance. It determines which decisions a regulator can
                  verify independently and which require trusting a statistical
                  model.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Deterministic */}
                  <div className="glass-panel p-5">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Deterministic (no LLM involvement)
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Twelve screening checks: policy enforcement, validity, treatment date, treatment compliance, veterinary provider authorization, annual benefit limits, pre-existing condition exclusions, treatment type coverage, procedure linkage, breed-specific exclusions, condition cause, policyholder type",
                        "Financial calculations: payout computation, VAT, deductible and benefit-tier reimbursement limits",
                        "Coverage lookups: Tier 1 (known items at confidence 1.0) and Tier 2 (keyword matching with umlaut normalization and compound-word decomposition)",
                        "Denial clause evaluation: pass/fail against the insurer's actual policy terms",
                        "Hash chain verification, version bundle capture, all audit logging",
                      ].map((item) => (
                        <li
                          key={item}
                          className="text-sm text-[var(--text-secondary)] flex items-start gap-2"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* AI-assisted */}
                  <div className="glass-panel p-5 border-l-2 border-l-[var(--primary)]">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[var(--primary)]" />
                      AI-assisted (LLM with full audit trail)
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Document classification (with language-aware routing and classification cues)",
                        "Tier 3 coverage matching (ambiguous items that escape rules and keywords)",
                        "Human-readable verdict explanations (with deterministic template fallback)",
                      ].map((item) => (
                        <li
                          key={item}
                          className="text-sm text-[var(--text-secondary)] flex items-start gap-2"
                        >
                          <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="glass-panel-light p-4">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Every decision record marks whether it was deterministic or
                    model-assisted. A regulator can filter the audit trail to see
                    only LLM-influenced decisions and inspect the full
                    input-output pair for each one.
                  </p>
                </div>
              </motion.div>

              {/* 5. Governance framework */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                  Governance framework
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  The compliance infrastructure is backed by 50+ policy and
                  evidence documents organized across seven domains:
                </p>

                <div className="space-y-3">
                  {[
                    {
                      title: "Governance",
                      desc: "ISMS scope, information security policy, document control register, configuration governance, roles and responsibilities, security objectives and KPIs, management review evidence.",
                    },
                    {
                      title: "Risk management",
                      desc: "Risk assessment methodology, risk register, AI-specific risk register, risk treatment plan, statement of applicability (ISO 27001 controls).",
                    },
                    {
                      title: "Privacy and data protection",
                      desc: "Regulatory positioning memo (GDPR, Swiss FADP, EU AI Act), Data Protection Impact Assessment (DPIA), cross-border transfer register, subprocessor register, sensitive data handling policy, Records of Processing Activities (ROPA), Data Processor Agreement template, data subject request procedures, breach response procedure, data retention schedule.",
                    },
                    {
                      title: "People and access",
                      desc: "Access control policy, MFA policy, joiner/mover/leaver procedures, privileged access approvals, access review records, training records, secure development policy.",
                    },
                    {
                      title: "Security operations",
                      desc: "Security tooling inventory, vulnerability management, patch management, logging and monitoring standard, incident register, change management records, business continuity plan, disaster recovery plan with tested RTO/RPO targets.",
                    },
                    {
                      title: "Product evidence",
                      desc: "EU AI Act technical file (Article 11), RBAC matrix, tenant isolation design, model cards, audit trail samples, claim lifecycle trace examples, production access evidence.",
                    },
                    {
                      title: "Audit",
                      desc: "Internal audit plan, audit report, corrective action register, management review minutes.",
                    },
                  ].map((domain, idx) => (
                    <div
                      key={domain.title}
                      className="glass-panel-light p-4 flex gap-4"
                    >
                      <div className="w-8 h-8 rounded-full bg-[var(--primary)]/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-[var(--primary)]">
                          {idx + 1}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[var(--text-primary)] mb-1">
                          {domain.title}
                        </h4>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                          {domain.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* 6. Integration */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                  Integration into existing ecosystem
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  The compliance layer operates alongside the claims processing
                  pipeline.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* What the insurer retains */}
                  <div className="glass-panel p-5">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[var(--text-muted)]" />
                      What the insurer retains
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Their own regulatory reporting processes",
                        "Internal compliance team and audit schedule",
                        "Data governance policies and retention rules",
                        "Customer-facing communication and dispute resolution",
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

                  {/* What ClaimPilot provides */}
                  <div className="glass-panel p-5 border-l-2 border-l-[var(--primary)]">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[var(--primary)]" />
                      What ClaimPilot provides
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Decision-level audit trail with cryptographic integrity guarantees",
                        "LLM call records with full prompt/response capture and provenance",
                        "Version bundles enabling exact decision reconstruction",
                        "PII vault with crypto-shredding for data subject requests",
                        "Role-based access with a dedicated auditor role",
                        "Compliance health monitoring and alerting",
                        "Exportable evidence artifacts for external audits",
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

                <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                  <p>
                    Processing happens as normal. Documents are ingested,
                    classified, extracted. Claims are reconciled, screened,
                    assessed. At every stage, compliance artifacts (decision
                    records, LLM call logs, version snapshots, provenance
                    metadata) are written automatically. No separate data
                    collection, additional API calls or manual export steps.
                  </p>
                  <p>
                    When an auditor queries the system, they access the same data
                    that was written during processing. There is no
                    reconstruction step, no aggregation from multiple sources, no
                    delay between &ldquo;decision made&rdquo; and &ldquo;decision
                    auditable.&rdquo;
                  </p>
                </div>
              </motion.div>

              {/* 7. Regulatory alignment */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Regulatory alignment
                </h2>

                <div className="glass-panel overflow-hidden overflow-x-auto">
                  <table className="w-full text-sm min-w-[600px]">
                    <thead>
                      <tr className="border-b border-[var(--border)]">
                        <th className="py-3 px-4 text-left font-semibold text-[var(--text-primary)]">
                          Regulation
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-[var(--text-primary)]">
                          Requirement
                        </th>
                        <th className="py-3 px-4 text-left font-semibold text-[var(--text-primary)]">
                          How ClaimPilot addresses it
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [
                          "EU AI Act (Annex VIII)",
                          "Decision logging for high-risk AI",
                          "Hash-chained decision ledger, LLM call audit trail, version bundles",
                        ],
                        [
                          "EU AI Act (Art. 11)",
                          "Technical documentation",
                          "AI technical file, model cards, risk register",
                        ],
                        [
                          "EU AI Act (Art. 26)",
                          "Model governance",
                          "Model registry, allowlist enforcement, lifecycle management, change approval workflow",
                        ],
                        [
                          "GDPR (Art. 22)",
                          "Transparency for automated decisions",
                          "Decision rationale with confidence, deterministic vs AI boundary, full provenance",
                        ],
                        [
                          "GDPR (Art. 32)",
                          "Security of processing",
                          "RBAC, session security, brute-force protection, encrypted storage, access logging",
                        ],
                        [
                          "GDPR (Art. 35)",
                          "Data Protection Impact Assessment",
                          "DPIA completed covering all data categories, AI components, risk mitigations",
                        ],
                        [
                          "GDPR (Art. 9)",
                          "Special category data (where applicable)",
                          "PII vault, sensitive document handling, field-level classification",
                        ],
                        [
                          "GDPR (Art. 17)",
                          "Right to erasure",
                          "Crypto-shredding via KEK destruction",
                        ],
                        [
                          "GDPR (Art. 44-49)",
                          "Cross-border transfers",
                          "Transfer register, Azure Switzerland North for processing and OCR, DPA in place",
                        ],
                        [
                          "Swiss FADP (Art. 22)",
                          "Automated individual decisions",
                          "Decision traceability, human override capability, REFER mechanism for uncertain claims",
                        ],
                        [
                          "Swiss FADP (Art. 16-17)",
                          "Cross-border transfers",
                          "Data processing within Switzerland North, adequacy assessment documented",
                        ],
                        [
                          "ISO 27001",
                          "Information security management",
                          "Access control, encryption, backup/recovery, vulnerability management, incident response",
                        ],
                        [
                          "NIST AI RMF",
                          "AI risk management",
                          "AI risk register, model governance, performance monitoring, drift alerting",
                        ],
                      ].map((row, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-[var(--border)]/50"
                        >
                          <td className="py-3 px-4 font-medium text-[var(--text-primary)] whitespace-nowrap">
                            {row[0]}
                          </td>
                          <td className="py-3 px-4 text-[var(--text-secondary)]">
                            {row[1]}
                          </td>
                          <td className="py-3 px-4 text-[var(--text-secondary)]">
                            {row[2]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* 8. Outcome */}
              <motion.div {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Outcome
                </h2>
                <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                  <p>
                    Pick a claim from six months ago. The version bundle tells
                    you the exact code, model, prompts and configuration that
                    were running when it was processed. The decision ledger shows
                    every step of the decision chain. The LLM call records show
                    exactly what the model saw and said. The extraction
                    provenance shows which page and character range produced each
                    field. All of it cryptographically chained so you can verify
                    nothing was altered after the fact.
                  </p>
                  <p>
                    The hash-chained ledger can be verified in a single API call.
                    If any record was modified, inserted or deleted, the system
                    identifies the exact break point. This is a stronger
                    guarantee than database-level access logging because it does
                    not depend on the database itself being trustworthy.
                  </p>
                  <p>
                    PII is tokenized before it reaches logs or LLM prompts.
                    Erasure means destroying an encryption key, not scanning log
                    files. Sensitive data is classified and handled under specific
                    access controls. A data subject request does not require a
                    forensic exercise.
                  </p>
                  <p>
                    The compliance health dashboard shows system posture in real
                    time: ledger integrity, version bundle currency, user
                    security status, PII vault status, alert history. The insurer
                    does not prepare for audits. The system is always
                    audit-ready.
                  </p>
                  <p>
                    A regulator can see which decisions were made by fixed rules
                    (reproducible with certainty) and which involved model
                    inference (reproducible with full input-output evidence). This
                    distinction is surfaced in the decision ledger, the UI and
                    the audit exports.
                  </p>
                </div>
              </motion.div>

              {/* Closing statement */}
              <motion.div {...fadeIn}>
                <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                  <p>
                    This case study focuses on something fundamental: delivering
                    an AI-assisted claims system where compliance is embedded
                    into the core architecture rather than treated as a reporting
                    layer added after the fact.
                  </p>
                  <p>
                    In ClaimPilot, auditability is not an output. It is the
                    system itself. The hash-chained decision ledger, version
                    bundles, LLM call provenance, PII vault and deterministic
                    boundary form the processing pipeline. Every claim processed
                    automatically generates a complete, cryptographically
                    verifiable audit trail.
                  </p>
                  <p>
                    Regulatory scrutiny of AI in insurance is increasing
                    globally. Frameworks such as the EU AI Act and GDPR are
                    setting a clear direction around transparency,
                    accountability and control over automated decision-making.
                  </p>
                  <p>
                    In South Africa, POPIA already includes provisions relating
                    to automated decision-making, particularly where decisions
                    are made solely by automated means and have a legal or
                    similarly significant effect on individuals. While the
                    regulatory environment is less prescriptive than in Europe,
                    the underlying principles of accountability, fairness and
                    transparency are firmly established.
                  </p>
                  <p>
                    Having developed its approach within the Swiss regulatory
                    environment, ClaimPilot has built a strong foundation in
                    auditability, traceability and governance. These principles
                    align closely with the requirements emerging across multiple
                    jurisdictions, including South Africa, where insurers are
                    beginning to assess how AI-driven decisioning can be deployed
                    responsibly.
                  </p>
                  <p>
                    As regulatory expectations continue to mature, insurers that
                    adopt audit-ready systems early will be better positioned to
                    manage compliance risk and demonstrate responsible AI usage.
                    This creates an opportunity to differentiate through
                    transparency, governance and operational trust in the South
                    African market.
                  </p>
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
                    "Tamper-evident hash-chained decision ledger",
                    "Full LLM call audit trail with input/output capture",
                    "Version bundles for exact decision reconstruction",
                    "PII vault with crypto-shredding (GDPR Art. 17)",
                    "Five-role RBAC with dedicated auditor role",
                    "50+ governance documents across 7 domains",
                    "12 deterministic screening checks (no LLM)",
                    "EU AI Act, GDPR, Swiss FADP, ISO 27001, NIST AI RMF alignment",
                    "Single API call ledger verification",
                    "Always audit-ready (no preparation needed)",
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
                      "Decision Ledger",
                      "LLM Audit Trail",
                      "Version Bundles",
                      "PII Vault",
                      "Crypto-shredding",
                      "RBAC",
                      "Model Governance",
                      "Compliance Dashboard",
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
