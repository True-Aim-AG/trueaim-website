import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
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
import { TextureBackdrop } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";
import { StatusPill } from "@/components/brand/StatusPill";

const ease = [0.4, 0, 0.2, 1] as const;

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease } as const,
};

export default async function AuditabilityBlogPost({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      <EnglishOnlyBanner />
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-hairline bg-page-tint">
        <TextureBackdrop texture={{ name: "circ", position: "50% 50%" }} />

        <div className="relative max-w-4xl mx-auto px-6 pt-20 md:pt-28 pb-16">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {/* Breadcrumb */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              All Articles
            </Link>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-6 leading-tight">
              Auditability in Claims AI: Building Evidence Chains That Auditors
              Actually Accept
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              Everyone says their AI is explainable. Few can prove it to an
              auditor. Here&apos;s the architecture that makes it possible.
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-subtle">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                12 min read
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" strokeWidth={1.5} />
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
            <div className="lg:col-span-3 max-w-3xl space-y-12">
              {/* Introduction */}
              <MotionDiv {...fadeIn}>
                <div className="border-l-2 border-ta-blue pl-6 mb-8">
                  <p className="text-body-lg text-strong">
                    When regulators ask &ldquo;why did your system approve this
                    claim?&rdquo;, they don&apos;t want to hear about attention
                    weights or SHAP values. They want to click on a field and
                    see exactly where it came from. They want to re-run a
                    decision from six months ago and get the same answer. They
                    want to know when a human intervened and why.
                  </p>
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  We learned this the hard way. Our claims automation system
                  went through 47 evaluation iterations, improving from 18% to
                  98% accuracy. Every decision has a complete audit trail.
                  Here&apos;s the architecture that makes it possible, and the
                  regulatory requirements it satisfies.
                </p>
              </MotionDiv>

              {/* What Regulators Actually Want */}
              <MotionDiv {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  What Regulators Actually Want
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Let&apos;s translate regulatory language into technical
                  specifications.
                </p>

                {/* FINMA */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-accent" strokeWidth={1.5} />
                    FINMA Guidance 08/2024 (Switzerland)
                  </h3>
                  <p className="text-body leading-[1.6] mb-4">
                    Switzerland has no AI-specific law. Instead, FINMA applies
                    technology-neutral governance requirements to AI systems,
                    framing AI risks as{" "}
                    <span className="font-semibold text-strong">
                      operational risks
                    </span>
                    :
                  </p>
                  <ul className="space-y-2 text-sm text-body">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>
                        <strong className="text-strong">
                          Model risks:
                        </strong>{" "}
                        robustness, correctness, bias, explainability
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>
                        <strong className="text-strong">
                          IT/cyber risks:
                        </strong>{" "}
                        security, availability, integrity
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>
                        <strong className="text-strong">
                          Third-party dependency risks:
                        </strong>{" "}
                        vendor lock-in, concentration
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted mt-4 italic">
                    FINMA explicitly notes that AI &ldquo;results often cannot
                    be understood, explained, or reproduced.&rdquo; This is the
                    problem you must solve.
                  </p>
                </div>

                {/* EU AI Act */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-accent" strokeWidth={1.5} />
                    EU AI Act
                  </h3>
                  <p className="text-body leading-[1.6]">
                    The EU AI Act classifies life and health insurance risk
                    assessment and pricing as{" "}
                    <span className="font-semibold text-strong">
                      high-risk
                    </span>
                    . Claims automation isn&apos;t explicitly listed as
                    high-risk, but transparency obligations apply. EIOPA
                    emphasises governance and risk management aligned with
                    existing insurance regulation.
                  </p>
                </div>

                {/* What This Means */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <h3 className="font-display font-semibold text-strong mb-4">
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
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="text-sm text-body">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm font-medium text-accent">
                    Key insight: Regulators don&apos;t care about your model
                    architecture. They care about your evidence trail.
                  </p>
                </div>
              </MotionDiv>

              {/* The Evidence Chain Architecture */}
              <MotionDiv {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  The Evidence Chain Architecture
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  We use three layers of traceability. Each layer answers a
                  different audit question.
                </p>

                {/* Layer 1 */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                      <FileText className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-strong">
                        Layer 1: Field-to-Source Provenance
                      </h3>
                      <p className="text-sm text-muted">
                        &ldquo;Where did this number come from?&rdquo;
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-body leading-[1.6] mb-4">
                    Every extracted field must link to: source document, page
                    number, location (coordinates), and extraction confidence.
                  </p>
                  <div className="bg-surface-muted rounded-pill p-4 text-xs text-body overflow-x-auto">
                    <pre>{`Field: [extracted_field_name]
Value: [extracted_value]
Source: [document.pdf], Page X
Location: [bounding box coordinates]
Confidence: [high/medium/low]`}</pre>
                  </div>
                  <p className="text-xs text-muted mt-3">
                    When an auditor asks &ldquo;where did this value come
                    from?&rdquo;, you click and show them the exact location in
                    the source document. No guessing, no searching.
                  </p>
                </div>

                {/* Layer 2 */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                      <Database className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-strong">
                        Layer 2: Decision Audit Trail
                      </h3>
                      <p className="text-sm text-muted">
                        &ldquo;Why was this claim approved?&rdquo;
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-body leading-[1.6] mb-4">
                    Every decision must record: input hash, model version,
                    confidence score, timestamp, and decision tier.
                  </p>
                  <div className="bg-surface-muted rounded-pill p-4 text-xs text-body overflow-x-auto">
                    <pre>{`Decision: [APPROVED/DENIED/REVIEW]
Input hash: [reproducibility hash]
Model version: [version identifier]
Confidence: [score]
Decision method: [deterministic/AI/hybrid]
Timestamp: [ISO timestamp]`}</pre>
                  </div>
                  <p className="text-xs text-muted mt-3">
                    Our system uses a multi-tier decision cascade, starting with
                    deterministic rules and falling back to AI only when needed.
                    Each tier is logged, so you know exactly which method made
                    the decision.
                  </p>
                </div>

                {/* Layer 3 */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                      <Users className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-strong">
                        Layer 3: Override Capture
                      </h3>
                      <p className="text-sm text-muted">
                        &ldquo;Why did a human change this decision?&rdquo;
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-body leading-[1.6] mb-4">
                    Every human override must capture: original AI decision,
                    human decision, override reason (required field), reviewer
                    identity, and timestamp.
                  </p>
                  <div className="bg-surface-muted rounded-pill p-4 text-xs text-body overflow-x-auto">
                    <pre>{`Original decision: [AI decision with confidence]
Override decision: [human decision]
Reason: [required justification text]
Reviewer: [authenticated user ID]
Timestamp: [ISO timestamp]`}</pre>
                  </div>
                  <p className="text-xs text-muted mt-3">
                    This creates a feedback loop: override patterns reveal
                    system gaps. If adjusters consistently override denials for
                    the same reason, that&apos;s a signal to improve the system.
                  </p>
                </div>
              </MotionDiv>

              {/* Quality Gates */}
              <MotionDiv {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  Quality Gates: The Audit Checkpoint
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  We use a three-state quality gate that determines when
                  automation proceeds and when humans must intervene.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    {
                      state: "PASS",
                      tone: "approved" as const,
                      desc: "All required fields present, confidence above threshold.",
                      action:
                        "Proceed automatically. Log decision with full evidence chain. No human review required.",
                    },
                    {
                      state: "WARN",
                      tone: "referred" as const,
                      desc: "Confidence below threshold OR non-critical field missing.",
                      action:
                        "Proceed with flag. Route to sampling queue. Human may review or skip.",
                    },
                    {
                      state: "FAIL",
                      tone: "denied" as const,
                      desc: "Critical field missing OR confidence very low OR rule violation.",
                      action:
                        "Block automation. Route to human adjuster. Require explicit human decision.",
                    },
                  ].map((gate) => (
                    <div
                      key={gate.state}
                      className="bg-card shadow-card rounded-pill p-8"
                    >
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <StatusPill tone={gate.tone} emphasis="light" size="sm">
                          {gate.state}
                        </StatusPill>
                        <span className="text-sm text-body">
                          {gate.desc}
                        </span>
                      </div>
                      <p className="text-xs text-muted">
                        {gate.action}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Confidence Asymmetry */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Confidence Asymmetry
                  </h3>
                  <p className="text-sm text-body leading-[1.6] mb-4">
                    We use asymmetric thresholds:
                  </p>
                  <ul className="space-y-2 text-sm text-body mb-4">
                    <li>
                      <strong className="text-approved-dark">
                        For approvals:
                      </strong>{" "}
                      higher confidence threshold required
                    </li>
                    <li>
                      <strong className="text-referred-dark">
                        For denials:
                      </strong>{" "}
                      lower confidence threshold acceptable
                    </li>
                    <li>
                      <strong className="text-muted">
                        Below thresholds:
                      </strong>{" "}
                      routed to human review
                    </li>
                  </ul>
                  <p className="text-sm text-body">
                    Why asymmetric? False approvals cost more: financial loss
                    plus regulatory risk. False denials can be appealed by the
                    customer. This isn&apos;t bias; it&apos;s risk management.
                  </p>
                  <div className="mt-4 p-3 bg-lilac rounded-pill">
                    <p className="text-sm font-medium text-accent">
                      Result: We reduced our REFER_TO_HUMAN rate from 60% to
                      less than 5%.
                    </p>
                  </div>
                </div>
              </MotionDiv>

              {/* Failure Modes */}
              <MotionDiv {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  Failure Modes That Break Audit Trails
                </h2>

                <p className="text-body leading-[1.6] mb-5">
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
                    <div key={idx} className="bg-card shadow-card rounded-pill p-8">
                      <div className="flex items-center gap-3 mb-3">
                        <AlertTriangle className="w-5 h-5 text-referred-dark" strokeWidth={1.5} />
                        <span className="font-display font-semibold text-strong">
                          {fm.title}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted block mb-1">
                            Symptom
                          </span>
                          <span className="text-body">
                            {fm.symptom}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted block mb-1">
                            Audit Impact
                          </span>
                          <span className="text-body">
                            {fm.impact}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted block mb-1">
                            Fix
                          </span>
                          <span className="text-approved-dark">{fm.fix}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* What Doesn't Work */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    What Doesn&apos;t Work for Explainability
                  </h3>
                  <ul className="space-y-3 text-sm text-body">
                    <li>
                      <strong className="text-denied-dark">SHAP/LIME values:</strong>{" "}
                      Technically interesting, meaningless to adjusters.
                      &ldquo;Feature X contributed 0.3 to the decision&rdquo; is
                      not an explanation.
                    </li>
                    <li>
                      <strong className="text-denied-dark">Attention weights:</strong>{" "}
                      &ldquo;The model focused on these words&rdquo; doesn&apos;t
                      explain WHY the decision was made.
                    </li>
                    <li>
                      <strong className="text-denied-dark">
                        Confidence scores alone:
                      </strong>{" "}
                      &ldquo;87% confident&rdquo; isn&apos;t an explanation. You
                      need: &ldquo;87% confident BECAUSE [evidence].&rdquo;
                    </li>
                    <li>
                      <strong className="text-denied-dark">
                        Post-hoc rationales:
                      </strong>{" "}
                      Generating explanations after the decision risks mismatch
                      between explanation and actual logic. Auditors will test
                      this.
                    </li>
                  </ul>
                </div>

                <div className="mt-6 bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm font-medium text-accent">
                    Key insight: Explainability means showing your work, not
                    describing your feelings about the answer.
                  </p>
                </div>
              </MotionDiv>

              {/* Regulatory Mapping */}
              <MotionDiv {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  Regulatory Mapping Quick Reference
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-hairline">
                        <th className="text-left py-3 pr-4 font-display text-strong font-medium">
                          Requirement
                        </th>
                        <th className="text-left py-3 pr-4 font-display text-strong font-medium">
                          FINMA 08/2024
                        </th>
                        <th className="text-left py-3 pr-4 font-display text-strong font-medium">
                          EU AI Act
                        </th>
                        <th className="text-left py-3 font-display text-strong font-medium">
                          How to Address
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-body">
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
                          className="border-b border-hairline"
                        >
                          <td className="py-3 pr-4 font-display text-strong font-medium">
                            {row[0]}
                          </td>
                          <td className="py-3 pr-4">{row[1]}</td>
                          <td className="py-3 pr-4">{row[2]}</td>
                          <td className="py-3">{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </MotionDiv>

              {/* Core Principles */}
              <MotionDiv {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
                  Core Principles for Auditable AI
                </h2>

                <div className="bg-card shadow-card rounded-pill p-8">
                  <p className="text-sm text-body leading-[1.6] mb-6">
                    Building audit-ready AI systems requires commitment to four foundational principles.
                    The specific implementation will vary by organisation, but these principles remain constant.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <h3 className="font-display font-semibold text-strong mb-1">
                          Complete Provenance
                        </h3>
                        <p className="text-sm text-body">
                          Every extracted value must be traceable to its source document and location.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Database className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <h3 className="font-display font-semibold text-strong mb-1">
                          Decision Reproducibility
                        </h3>
                        <p className="text-sm text-body">
                          Given the same inputs and model version, you must be able to reproduce any historical decision.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <h3 className="font-display font-semibold text-strong mb-1">
                          Human Accountability
                        </h3>
                        <p className="text-sm text-body">
                          Every human override must be captured with required justification and reviewer identity.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <RefreshCw className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <h3 className="font-display font-semibold text-strong mb-1">
                          Continuous Validation
                        </h3>
                        <p className="text-sm text-body">
                          Regular testing of historical decisions to verify your audit trail remains intact.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionDiv>

              {/* Next Steps */}
              <MotionDiv {...fadeIn}>
                <h2 className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4">
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
                      <div className="w-8 h-8 rounded-full bg-accent-soft grid place-items-center flex-shrink-0">
                        <span className="text-sm font-display font-semibold text-accent">
                          {step.num}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-strong">
                          {step.title}
                        </h3>
                        <p className="text-sm text-body">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-l-2 border-ta-blue pl-6">
                  <p className="text-body-lg text-strong">
                    The goal isn&apos;t perfect AI. It&apos;s defensible AI:
                    systems where every decision can be explained, every field
                    can be traced, and every human intervention is documented.
                    That&apos;s what regulators want. That&apos;s what auditors
                    accept.
                  </p>
                </div>

                <p className="mt-6 text-sm text-subtle italic">
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
                transition={{ duration: 0.6, ease }}
                className="bg-card shadow-card rounded-pill p-8"
              >
                <h3 className="font-display font-semibold text-strong mb-4">
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
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span className="text-sm text-body">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-hairline">
                  <h4 className="text-caption-sm text-subtle mb-3">
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
                        className="text-xs px-3 py-1 rounded-pill bg-accent-soft text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-hairline">
                  <ButtonLink href="/contact" variant="primary" className="w-full">
                    Talk to Us
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </ButtonLink>
                </div>
              </MotionDiv>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-theme="dark" className="py-20 px-6 bg-page-tint">
        <div className="max-w-4xl mx-auto text-center">
          <MotionDiv {...fadeIn}>
            <Shield className="w-12 h-12 text-muted mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
              Building Auditable AI?
            </h2>
            <p className="text-lg text-body mb-10">
              We can help you design evidence chain architectures that satisfy
              regulators and auditors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Get in Touch
                <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
              </ButtonLink>
              <ButtonLink href="/case-studies/vehicle-warranty-claims" variant="on-dark" size="lg">
                See It in Action
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
