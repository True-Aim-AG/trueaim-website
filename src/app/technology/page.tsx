import Link from "next/link";
import { MotionDiv } from "@/components/ui/MotionDiv";

import {
  ArrowRight,
  Brain,
  Cpu,
  FileSearch,
  Workflow,
  Shield,
  Scale,
  GraduationCap,
  CheckCircle,
  RefreshCw,
  GitBranch,
  UserCheck,
  AlertTriangle,
  Gauge,
} from "lucide-react";
import { DecisionDossier } from "@/components/sections/DecisionDossier";

const agenticCapabilities = [
  "Document reading",
  "Data extraction",
  "Classification",
  "Orchestration",
];

const deterministicCapabilities = [
  "Coverage rules",
  "Policy logic",
  "Cost calculation",
  "Decision output",
];

const comparisonData = [
  { capability: "Decision consistency", traditional: "Variable", trueaim: "Deterministic" },
  { capability: "Audit trail", traditional: "Partial", trueaim: "Complete" },
  { capability: "Explainability", traditional: '"Model said so"', trueaim: "Traceable to clause" },
  { capability: "EU AI Act ready", traditional: "Unclear", trueaim: "Yes" },
];


const controlFeatures = [
  {
    icon: RefreshCw,
    title: "Replay Logs",
    description: "Re-run any decision with the same inputs and get identical outputs. Every execution is deterministic and reproducible.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
  },
  {
    icon: GitBranch,
    title: "Rule Traceability",
    description: "Every coverage decision is mapped to specific policy clause IDs. See exactly which rules fired and why.",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/20",
  },
  {
    icon: UserCheck,
    title: "Approval Gates",
    description: "Configure thresholds for human review escalation. High-value or edge cases automatically route to experts.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/20",
  },
  {
    icon: AlertTriangle,
    title: "Exception Routing",
    description: "Automatic routing based on claim complexity score. Unusual patterns flagged for manual inspection.",
    color: "text-amber-400",
    bgColor: "bg-amber-500/20",
  },
  {
    icon: Gauge,
    title: "Confidence Scoring",
    description: "Field-level certainty indicators show where the system is confident and where human review adds value.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
  },
];

export default function TechnologyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="relative max-w-7xl mx-auto text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--subtle-bg)] text-[var(--text-secondary)] text-sm font-medium mb-6">
              <Cpu className="w-4 h-4" />
              Our Technology
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              Neuro-Symbolic AI: The Architecture
              <br />
              <span className="text-[var(--primary)]">Regulators Trust</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              Not probabilistic. Not a black box. Our hybrid approach combines agentic AI execution with deterministic decision-making, purpose-built for regulated industries.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              The Problem with Probabilistic AI
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Large language models are powerful, but they&apos;re probabilistic. Given the same input twice, they might produce different outputs. They can&apos;t explain their reasoning in terms regulators understand.
            </p>
            <p className="text-xl font-semibold text-[var(--primary)] mt-6">
              For claims decisions, this is unacceptable.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              Separation of Concerns
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Two layers, each optimized for what it does best
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Agentic AI Layer */}
            <MotionDiv
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[var(--aurora-cyan)]/30 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-[var(--aurora-cyan)]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                    Agentic AI
                  </h3>
                  <p className="text-[var(--aurora-cyan)] font-medium">Flexible and adaptive</p>
                </div>
              </div>

              <ul className="space-y-4">
                {agenticCapabilities.map((cap) => (
                  <li key={cap} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--aurora-cyan)]/20 flex items-center justify-center flex-shrink-0">
                      <FileSearch className="w-4 h-4 text-[var(--aurora-cyan)]" />
                    </div>
                    <span className="text-[var(--text-primary)] font-medium">{cap}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 glass-panel-light">
                <p className="text-sm text-[var(--text-secondary)]">
                  Uses machine learning to handle unstructured data, understand context and orchestrate complex workflows.
                </p>
              </div>
            </MotionDiv>

            {/* Deterministic Logic Layer */}
            <MotionDiv
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/30 flex items-center justify-center">
                  <Scale className="w-8 h-8 text-[var(--primary)]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                    Deterministic Decision Engine
                  </h3>
                  <p className="text-[var(--primary)] font-medium">Precise and auditable</p>
                </div>
              </div>

              <ul className="space-y-4">
                {deterministicCapabilities.map((cap) => (
                  <li key={cap} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/20 flex items-center justify-center flex-shrink-0">
                      <Workflow className="w-4 h-4 text-[var(--primary)]" />
                    </div>
                    <span className="text-[var(--text-primary)] font-medium">{cap}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 glass-panel-light">
                <p className="text-sm text-[var(--text-secondary)]">
                  Applies encoded rules to produce consistent, explainable decisions every time.
                </p>
              </div>
            </MotionDiv>
          </div>

          {/* Audit Trail */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 glass-panel border border-emerald-500/20 bg-emerald-500/10 rounded-2xl p-8 text-center"
          >
            <Shield className="w-12 h-12 mx-auto mb-4 text-emerald-400 opacity-90" />
            <h3 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">Complete Audit Trail</h3>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Every field traces to source documents. Every decision traces to policy terms. Full transparency for regulators and auditors.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Decision Dossier Section */}
      <DecisionDossier variant="full" />

      {/* Control Layer Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              Enterprise Control
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              The Control Layer
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
              Automation with oversight. Every feature designed to keep humans in control where it matters.
            </p>
          </MotionDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {controlFeatures.map((feature, index) => (
              <MotionDiv
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel glass-panel-hover p-6"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{feature.description}</p>
              </MotionDiv>
            ))}
          </div>

          {/* Control philosophy callout */}
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 glass-panel p-8 text-center"
          >
            <p className="text-lg text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">Our philosophy:</strong> AI should handle the heavy lifting, but humans must always be able to understand, verify and override. Every control exists because regulated industries demand it.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              Not Another Black Box
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              See how True Aim compares to traditional AI approaches
            </p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel overflow-hidden"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left p-6 text-[var(--text-primary)] font-semibold">Capability</th>
                  <th className="text-center p-6 text-[var(--text-muted)] font-semibold">Traditional AI</th>
                  <th className="text-center p-6 text-[var(--primary)] font-semibold">True Aim</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={row.capability} className={index < comparisonData.length - 1 ? "border-b border-[var(--border)]" : ""}>
                    <td className="p-6 text-[var(--text-primary)] font-medium">{row.capability}</td>
                    <td className="p-6 text-center text-[var(--text-muted)]">{row.traditional}</td>
                    <td className="p-6 text-center">
                      <span className="inline-flex items-center gap-2 text-[var(--secondary)] font-medium">
                        <CheckCircle className="w-5 h-5" />
                        {row.trueaim}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </MotionDiv>
        </div>
      </section>

      {/* Research Partnership */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-8 md:p-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[var(--aurora-cyan)]/20 flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-8 h-8 text-[var(--aurora-cyan)]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              Research Partnership
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Parts of our technology are being developed in collaboration with <Link href="/partners/zhaw" className="text-[var(--primary)] underline hover:text-[var(--primary-hover)]">ZHAW</Link> (Zurich University of Applied Sciences) and advanced through an <Link href="/partners/innosuisse" className="text-[var(--primary)] underline hover:text-[var(--primary-hover)]">Innosuisse</Link>-funded research programme, recognised through Switzerland&apos;s national innovation framework.
            </p>
          </MotionDiv>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-dark)]/50 to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              See our Technology in Action
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10">
              Book a demo to understand how our neuro-symbolic architecture can work for your claims operations.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-all text-lg shadow-lg shadow-[var(--primary)]/30 hover:shadow-[var(--primary)]/50"
            >
              Book a demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
