import Link from "next/link";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle,
  FileText,
  Shield,
  Users,
  AlertTriangle,
  Database,
  RefreshCw,
} from "lucide-react";
import { EnglishOnlyBanner } from "@/components/layout/EnglishOnlyBanner";

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6 } as const,
};

export default function AuditabilityBlogPost() {
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-[var(--background)] to-slate-900">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[var(--primary)] opacity-10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              All Articles
            </Link>

            {/* Category Tag */}
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-sm font-medium">
                <Shield className="w-4 h-4" />
                Compliance & Governance
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-6 leading-tight">
              Auditability in Claims AI: Building Evidence Chains That Auditors
              Actually Accept
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
              Everyone says their AI is explainable. Few can prove it to an
              auditor. Here&apos;s the architecture that makes it possible.
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                February 2025
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                12 min read
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Technical Deep Dive
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
              {/* Introduction */}
              <MotionDiv {...fadeIn}>
                <div className="glass-panel p-6 border-l-4 border-l-[var(--primary)] mb-8">
                  <p className="text-lg text-[var(--text-primary)] leading-relaxed">
                    When regulators ask &ldquo;why did your system approve this
                    claim?&rdquo;, they don&apos;t want to hear about attention
                    weights or SHAP values. They want to click on a field and
                    see exactly where it came from. They want to re-run a
                    decision from six months ago and get the same answer. They
                    want to know when a human intervened and why.
                  </p>
                </div>

                <p className="text-[var(--text-secondary)] leading-relaxed">
                  We learned this the hard way. Our claims automation system
                  went through 47 evaluation iterations, improving from 18% to
                  98% accuracy. Every decision has a complete audit trail.
                  Here&apos;s the architecture that makes it possible, and the
                  regulatory requirements it satisfies.
                </p>
              </MotionDiv>

              {/* What Regulators Actually Want */}
              <MotionDiv {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  What Regulators Actually Want
                </h2>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  Let&apos;s translate regulatory language into technical
                  specifications.
                </p>

                {/* FINMA */}
                <div className="glass-panel p-6 mb-6">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[var(--primary)]" />
                    FINMA Guidance 08/2024 (Switzerland)
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                    Switzerland has no AI-specific law. Instead, FINMA applies
                    technology-neutral governance requirements to AI systems,
                    framing AI risks as{" "}
                    <span className="font-semibold text-[var(--text-primary)]">
                      operational risks
                    </span>
                    :
                  </p>
                  <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--primary)]">•</span>
                      <span>
                        <strong className="text-[var(--text-primary)]">
                          Model risks:
                        </strong>{" "}
                        robustness, correctness, bias, explainability
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--primary)]">•</span>
                      <span>
                        <strong className="text-[var(--text-primary)]">
                          IT/cyber risks:
                        </strong>{" "}
                        security, availability, integrity
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--primary)]">•</span>
                      <span>
                        <strong className="text-[var(--text-primary)]">
                          Third-party dependency risks:
                        </strong>{" "}
                        vendor lock-in, concentration
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-[var(--text-muted)] mt-4 italic">
                    FINMA explicitly notes that AI &ldquo;results often cannot
                    be understood, explained, or reproduced.&rdquo; This is the
                    problem you must solve.
                  </p>
                </div>

                {/* EU AI Act */}
                <div className="glass-panel p-6 mb-6">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[var(--primary)]" />
                    EU AI Act
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    The EU AI Act classifies life and health insurance risk
                    assessment and pricing as{" "}
                    <span className="font-semibold text-[var(--text-primary)]">
                      high-risk
                    </span>
                    . Claims automation isn&apos;t explicitly listed as
                    high-risk, but transparency obligations apply. EIOPA
                    emphasizes governance and risk management aligned with
                    existing insurance regulation.
                  </p>
                </div>

                {/* What This Means */}
                <div className="glass-panel-light p-6">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                    What This Means in Practice
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Every decision must have a traceable evidence chain",
                      "Human overrides must be captured with justification",
                      "You must be able to reproduce a decision from 6 months ago",
                      '"The model said so" is not an acceptable explanation',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[var(--text-secondary)]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 p-4 bg-[var(--primary)]/10 rounded-lg border border-[var(--primary)]/20">
                  <p className="text-sm font-medium text-[var(--primary)]">
                    Key insight: Regulators don&apos;t care about your model
                    architecture. They care about your evidence trail.
                  </p>
                </div>
              </MotionDiv>

              {/* The Evidence Chain Architecture */}
              <MotionDiv {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  The Evidence Chain Architecture
                </h2>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                  We use three layers of traceability. Each layer answers a
                  different audit question.
                </p>

                {/* Layer 1 */}
                <div className="glass-panel p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)]">
                        Layer 1: Field-to-Source Provenance
                      </h3>
                      <p className="text-sm text-[var(--text-muted)]">
                        &ldquo;Where did this number come from?&rdquo;
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    Every extracted field must link to: source document, page
                    number, location (coordinates), and extraction confidence.
                  </p>
                  <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto">
                    <pre>{`Field: [extracted_field_name]
Value: [extracted_value]
Source: [document.pdf], Page X
Location: [bounding box coordinates]
Confidence: [high/medium/low]`}</pre>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-3">
                    When an auditor asks &ldquo;where did this value come
                    from?&rdquo;, you click and show them the exact location in
                    the source document. No guessing, no searching.
                  </p>
                </div>

                {/* Layer 2 */}
                <div className="glass-panel p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Database className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)]">
                        Layer 2: Decision Audit Trail
                      </h3>
                      <p className="text-sm text-[var(--text-muted)]">
                        &ldquo;Why was this claim approved?&rdquo;
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    Every decision must record: input hash, model version,
                    confidence score, timestamp, and decision tier.
                  </p>
                  <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto">
                    <pre>{`Decision: [APPROVED/DENIED/REVIEW]
Input hash: [reproducibility hash]
Model version: [version identifier]
Confidence: [score]
Decision method: [deterministic/AI/hybrid]
Timestamp: [ISO timestamp]`}</pre>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-3">
                    Our system uses a multi-tier decision cascade, starting with
                    deterministic rules and falling back to AI only when needed.
                    Each tier is logged, so you know exactly which method made
                    the decision.
                  </p>
                </div>

                {/* Layer 3 */}
                <div className="glass-panel p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)]">
                        Layer 3: Override Capture
                      </h3>
                      <p className="text-sm text-[var(--text-muted)]">
                        &ldquo;Why did a human change this decision?&rdquo;
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    Every human override must capture: original AI decision,
                    human decision, override reason (required field), reviewer
                    identity, and timestamp.
                  </p>
                  <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto">
                    <pre>{`Original decision: [AI decision with confidence]
Override decision: [human decision]
Reason: [required justification text]
Reviewer: [authenticated user ID]
Timestamp: [ISO timestamp]`}</pre>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-3">
                    This creates a feedback loop: override patterns reveal
                    system gaps. If adjusters consistently override denials for
                    the same reason, that&apos;s a signal to improve the system.
                  </p>
                </div>
              </MotionDiv>

              {/* Quality Gates */}
              <MotionDiv {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Quality Gates: The Audit Checkpoint
                </h2>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  We use a three-state quality gate that determines when
                  automation proceeds and when humans must intervene.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    {
                      state: "PASS",
                      color: "emerald",
                      bg: "bg-emerald-500/10 border-emerald-500/20",
                      textColor: "text-emerald-400",
                      desc: "All required fields present, confidence above threshold.",
                      action:
                        "Proceed automatically. Log decision with full evidence chain. No human review required.",
                    },
                    {
                      state: "WARN",
                      color: "amber",
                      bg: "bg-amber-500/10 border-amber-500/20",
                      textColor: "text-amber-400",
                      desc: "Confidence below threshold OR non-critical field missing.",
                      action:
                        "Proceed with flag. Route to sampling queue. Human may review or skip.",
                    },
                    {
                      state: "FAIL",
                      color: "red",
                      bg: "bg-red-500/10 border-red-500/20",
                      textColor: "text-red-400",
                      desc: "Critical field missing OR confidence very low OR rule violation.",
                      action:
                        "Block automation. Route to human adjuster. Require explicit human decision.",
                    },
                  ].map((gate) => (
                    <div
                      key={gate.state}
                      className={`p-4 rounded-lg border ${gate.bg}`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`font-bold ${gate.textColor}`}>
                          {gate.state}
                        </span>
                        <span className="text-sm text-[var(--text-secondary)]">
                          {gate.desc}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)]">
                        {gate.action}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Confidence Asymmetry */}
                <div className="glass-panel-light p-6">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                    Confidence Asymmetry
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    We use asymmetric thresholds:
                  </p>
                  <ul className="space-y-2 text-sm text-[var(--text-secondary)] mb-4">
                    <li>
                      <strong className="text-emerald-400">
                        For approvals:
                      </strong>{" "}
                      higher confidence threshold required
                    </li>
                    <li>
                      <strong className="text-amber-400">
                        For denials:
                      </strong>{" "}
                      lower confidence threshold acceptable
                    </li>
                    <li>
                      <strong className="text-[var(--text-muted)]">
                        Below thresholds:
                      </strong>{" "}
                      routed to human review
                    </li>
                  </ul>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Why asymmetric? False approvals cost more: financial loss
                    plus regulatory risk. False denials can be appealed by the
                    customer. This isn&apos;t bias; it&apos;s risk management.
                  </p>
                  <div className="mt-4 p-3 bg-[var(--primary)]/10 rounded-lg">
                    <p className="text-sm font-medium text-[var(--primary)]">
                      Result: We reduced our REFER_TO_HUMAN rate from 60% to
                      less than 5%.
                    </p>
                  </div>
                </div>
              </MotionDiv>

              {/* Failure Modes */}
              <MotionDiv {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Failure Modes That Break Audit Trails
                </h2>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  From our 47 evaluation iterations, here are failures that
                  regulators will catch:
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    {
                      title: "Extraction Errors Without Provenance",
                      symptom:
                        "A value was extracted incorrectly, but there's no link back to the source",
                      impact:
                        "Without provenance, you can't explain the error",
                      fix: "Every extracted value links to source location",
                    },
                    {
                      title: "Decisions Based on Unavailable Data",
                      symptom:
                        "System made a decision, but key information wasn't in the document set",
                      impact:
                        "System was correct given available data, but auditor doesn't know that",
                      fix: "Document what information was available at decision time",
                    },
                    {
                      title: "Approve-by-Default Logic",
                      symptom: "High accuracy overall, but wrong for wrong reasons",
                      impact:
                        'Can\'t explain why approved, just "no failures found"',
                      fix: "Require explicit coverage confirmation, not absence of rejection",
                    },
                  ].map((fm, idx) => (
                    <div key={idx} className="glass-panel p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <AlertTriangle className="w-5 h-5 text-amber-400" />
                        <span className="font-semibold text-[var(--text-primary)]">
                          {fm.title}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-[var(--text-muted)] block mb-1">
                            Symptom
                          </span>
                          <span className="text-[var(--text-secondary)]">
                            {fm.symptom}
                          </span>
                        </div>
                        <div>
                          <span className="text-[var(--text-muted)] block mb-1">
                            Audit Impact
                          </span>
                          <span className="text-[var(--text-secondary)]">
                            {fm.impact}
                          </span>
                        </div>
                        <div>
                          <span className="text-[var(--text-muted)] block mb-1">
                            Fix
                          </span>
                          <span className="text-emerald-400">{fm.fix}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* What Doesn't Work */}
                <div className="glass-panel-light p-6">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                    What Doesn&apos;t Work for Explainability
                  </h3>
                  <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                    <li>
                      <strong className="text-red-400">SHAP/LIME values:</strong>{" "}
                      Technically interesting, meaningless to adjusters.
                      &ldquo;Feature X contributed 0.3 to the decision&rdquo; is
                      not an explanation.
                    </li>
                    <li>
                      <strong className="text-red-400">Attention weights:</strong>{" "}
                      &ldquo;The model focused on these words&rdquo; doesn&apos;t
                      explain WHY the decision was made.
                    </li>
                    <li>
                      <strong className="text-red-400">
                        Confidence scores alone:
                      </strong>{" "}
                      &ldquo;87% confident&rdquo; isn&apos;t an explanation. You
                      need: &ldquo;87% confident BECAUSE [evidence].&rdquo;
                    </li>
                    <li>
                      <strong className="text-red-400">
                        Post-hoc rationales:
                      </strong>{" "}
                      Generating explanations after the decision risks mismatch
                      between explanation and actual logic. Auditors will test
                      this.
                    </li>
                  </ul>
                </div>

                <div className="mt-6 p-4 bg-[var(--primary)]/10 rounded-lg border border-[var(--primary)]/20">
                  <p className="text-sm font-medium text-[var(--primary)]">
                    Key insight: Explainability means showing your work, not
                    describing your feelings about the answer.
                  </p>
                </div>
              </MotionDiv>

              {/* Regulatory Mapping */}
              <MotionDiv {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Regulatory Mapping Quick Reference
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)]">
                        <th className="text-left py-3 pr-4 text-[var(--text-muted)] font-medium">
                          Requirement
                        </th>
                        <th className="text-left py-3 pr-4 text-[var(--text-muted)] font-medium">
                          FINMA 08/2024
                        </th>
                        <th className="text-left py-3 pr-4 text-[var(--text-muted)] font-medium">
                          EU AI Act
                        </th>
                        <th className="text-left py-3 text-[var(--text-muted)] font-medium">
                          How to Address
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-[var(--text-secondary)]">
                      {[
                        [
                          "Documentation",
                          "Material applications",
                          "Transparency obligations",
                          "Model cards, decision logs, version control",
                        ],
                        [
                          "Traceability",
                          "Results must be explainable",
                          "Record-keeping for high-impact",
                          "Field-to-source provenance",
                        ],
                        [
                          "Reproducibility",
                          '"Often cannot be reproduced" (the problem)',
                          "Implied",
                          "Input hashing, model versioning",
                        ],
                        [
                          "Human oversight",
                          "Required for material decisions",
                          "Required for high-risk",
                          "Quality gates, override capture",
                        ],
                        [
                          "Fallback mechanisms",
                          "Explicitly required",
                          "Expected",
                          "Tier cascade, human queue",
                        ],
                        [
                          "Risk classification",
                          "Centralized inventory expected",
                          "High-risk for life/health pricing",
                          "Use-case registry with risk tags",
                        ],
                      ].map((row, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-[var(--border)]/50"
                        >
                          <td className="py-3 pr-4 font-medium text-[var(--text-primary)]">
                            {row[0]}
                          </td>
                          <td className="py-3 pr-4">{row[1]}</td>
                          <td className="py-3 pr-4">{row[2]}</td>
                          <td className="py-3 text-emerald-400">{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </MotionDiv>

              {/* Core Principles */}
              <MotionDiv {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Core Principles for Auditable AI
                </h2>

                <div className="glass-panel-light p-6">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    Building audit-ready AI systems requires commitment to four foundational principles.
                    The specific implementation will vary by organization, but these principles remain constant.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                          Complete Provenance
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)]">
                          Every extracted value must be traceable to its source document and location.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Database className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                          Decision Reproducibility
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)]">
                          Given the same inputs and model version, you must be able to reproduce any historical decision.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                          Human Accountability
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)]">
                          Every human override must be captured with required justification and reviewer identity.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <RefreshCw className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                          Continuous Validation
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)]">
                          Regular testing of historical decisions to verify your audit trail remains intact.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionDiv>

              {/* Next Steps */}
              <MotionDiv {...fadeIn}>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                  Next Steps
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      num: "1",
                      title: "Audit your current evidence chain",
                      desc: "Can you trace any field to its source?",
                    },
                    {
                      num: "2",
                      title: "Test reproducibility",
                      desc: "Re-run a 3-month-old decision. Same output?",
                    },
                    {
                      num: "3",
                      title: "Document your quality gate criteria",
                      desc: "What triggers human review?",
                    },
                    {
                      num: "4",
                      title: "Map your architecture to FINMA/EU AI Act",
                      desc: "Use the table above as a starting point.",
                    },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-[var(--primary)]/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-[var(--primary)]">
                          {step.num}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[var(--text-primary)]">
                          {step.title}
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)]">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 glass-panel p-6 border-l-4 border-l-[var(--primary)]">
                  <p className="text-[var(--text-primary)] leading-relaxed">
                    The goal isn&apos;t perfect AI. It&apos;s defensible AI:
                    systems where every decision can be explained, every field
                    can be traced, and every human intervention is documented.
                    That&apos;s what regulators want. That&apos;s what auditors
                    accept.
                  </p>
                </div>

                <p className="mt-6 text-sm text-[var(--text-muted)] italic">
                  Based on internal research from 47 evaluation iterations (18%
                  → 98% accuracy) and regulatory analysis of FINMA Guidance
                  08/2024, EU AI Act, and EIOPA governance frameworks.
                </p>
              </MotionDiv>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <MotionDiv
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-panel p-6"
              >
                <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                  Key Takeaways
                </h3>
                <ul className="space-y-3">
                  {[
                    "Three-layer evidence chain architecture",
                    "Field-to-source provenance tracking",
                    "Decision audit trail with input hashing",
                    "Human override capture with required justification",
                    "Quality gates that satisfy auditors",
                    "FINMA & EU AI Act compliance mapping",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[var(--text-secondary)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-[var(--border)]">
                  <h4 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
                    Related Topics
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Auditability",
                      "FINMA",
                      "EU AI Act",
                      "Claims AI",
                      "Compliance",
                      "Evidence Chains",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-1 rounded bg-[var(--subtle-bg)] text-[var(--text-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--border)]">
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors"
                  >
                    Talk to Us
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </MotionDiv>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 to-[var(--background)]">
        <div className="max-w-4xl mx-auto text-center">
          <MotionDiv {...fadeIn}>
            <Shield className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              Building Auditable AI?
            </h2>
            <p className="text-lg text-gray-300 mb-10">
              We can help you design evidence chain architectures that satisfy
              regulators and auditors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/case-studies/vehicle-warranty-claims"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--primary-light)] transition-colors text-lg"
              >
                See It in Action
              </Link>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
