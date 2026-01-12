"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Cpu,
  FileSearch,
  Workflow,
  Shield,
  Lock,
  Key,
  FileCheck,
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

const securityFeatures = [
  {
    title: "Data Protection",
    items: ["Swiss-based hosting available", "GDPR compliant architecture", "Encryption at rest and in transit"],
    icon: Lock,
  },
  {
    title: "Access Control",
    items: ["Role-based permissions", "SSO integration support", "Full audit logging"],
    icon: Key,
  },
  {
    title: "Regulatory Alignment",
    items: ["EU AI Act transparency requirements", "FINMA guidelines for automated decisions", "ISO 27001 roadmap (2026)"],
    icon: FileCheck,
  },
];

const controlFeatures = [
  {
    icon: RefreshCw,
    title: "Replay Logs",
    description: "Re-run any decision with the same inputs and get identical outputs. Every execution is deterministic and reproducible.",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: GitBranch,
    title: "Rule Traceability",
    description: "Every coverage decision is mapped to specific policy clause IDs. See exactly which rules fired and why.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  {
    icon: UserCheck,
    title: "Approval Gates",
    description: "Configure thresholds for human review escalation. High-value or edge cases automatically route to experts.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    icon: AlertTriangle,
    title: "Exception Routing",
    description: "Automatic routing based on claim complexity score. Unusual patterns flagged for manual inspection.",
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    icon: Gauge,
    title: "Confidence Scoring",
    description: "Field-level certainty indicators show where the system is confident and where human review adds value.",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

export default function TechnologyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-[var(--primary)] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--trust)] opacity-5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-6">
              <Cpu className="w-4 h-4" />
              Our Technology
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              Neuro-Symbolic AI: The Architecture
              <br />
              <span className="text-[var(--primary)]">Regulators Trust</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
              Not probabilistic. Not a black box. Our hybrid approach combines agentic AI execution with deterministic decision-making—purpose-built for regulated industries.
            </p>
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
              The Problem with Probabilistic AI
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Large language models are powerful, but they&apos;re probabilistic. Given the same input twice, they might produce different outputs. They can&apos;t explain their reasoning in terms regulators understand.
            </p>
            <p className="text-xl font-semibold text-[var(--primary)] mt-6">
              For claims decisions, this is unacceptable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Architecture Section */}
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
              Separation of Concerns
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Two layers, each optimized for what it does best
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Agentic AI Layer */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-[var(--border)] p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[var(--trust)] flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                    Agentic AI Layer
                  </h3>
                  <p className="text-[var(--trust)] font-medium">Flexible and adaptive</p>
                </div>
              </div>

              <ul className="space-y-4">
                {agenticCapabilities.map((cap) => (
                  <li key={cap} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <FileSearch className="w-4 h-4 text-[var(--trust)]" />
                    </div>
                    <span className="text-[var(--text-primary)] font-medium">{cap}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 bg-blue-100/50 rounded-xl">
                <p className="text-sm text-[var(--text-secondary)]">
                  Uses machine learning to handle unstructured data, understand context, and orchestrate complex workflows.
                </p>
              </div>
            </motion.div>

            {/* Deterministic Logic Layer */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl border border-[var(--border)] p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[var(--primary)] flex items-center justify-center">
                  <Scale className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                    Deterministic Logic Engine
                  </h3>
                  <p className="text-[var(--primary)] font-medium">Precise and auditable</p>
                </div>
              </div>

              <ul className="space-y-4">
                {deterministicCapabilities.map((cap) => (
                  <li key={cap} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Workflow className="w-4 h-4 text-[var(--primary)]" />
                    </div>
                    <span className="text-[var(--text-primary)] font-medium">{cap}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 bg-indigo-100/50 rounded-xl">
                <p className="text-sm text-[var(--text-secondary)]">
                  Applies encoded business rules to produce consistent, explainable decisions every time.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Audit Trail */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 bg-gradient-to-r from-[var(--secondary)] to-emerald-600 rounded-2xl p-8 text-white text-center"
          >
            <Shield className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-2">Complete Audit Trail</h3>
            <p className="text-white/80 max-w-2xl mx-auto">
              Every field traces to source documents. Every decision traces to policy terms. Full transparency for regulators and auditors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Decision Dossier Section */}
      <DecisionDossier variant="full" />

      {/* Control Layer Section */}
      <section className="py-20 px-6 bg-[var(--background-secondary)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              Enterprise Control
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              The Control Layer
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
              Automation with oversight. Every feature designed to keep humans in control where it matters.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {controlFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl border border-[var(--border)] p-6 hover:shadow-lg hover:border-emerald-200 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Control philosophy callout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-8 text-center"
          >
            <p className="text-lg text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">Our philosophy:</strong> AI should handle the heavy lifting, but humans must always be able to understand, verify, and override. Every control exists because regulated industries demand it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-6 bg-[var(--background-secondary)]">
        <div className="max-w-5xl mx-auto">
          <motion.div
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
              See how TrueAim.ai compares to traditional AI approaches
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left p-6 text-[var(--text-primary)] font-semibold">Capability</th>
                  <th className="text-center p-6 text-[var(--text-muted)] font-semibold">Traditional AI</th>
                  <th className="text-center p-6 text-[var(--primary)] font-semibold">TrueAim.ai</th>
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
          </motion.div>
        </div>
      </section>

      {/* Security Section */}
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
              Security & Compliance
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              Enterprise-grade security built for regulated industries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-[var(--border)] p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-[var(--text-primary)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  {feature.title}
                </h3>
                <ul className="space-y-3">
                  {feature.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[var(--text-secondary)]">
                      <CheckCircle className="w-5 h-5 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Partnership */}
      <section className="py-20 px-6 bg-[var(--background-secondary)]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl border border-[var(--border)] p-8 md:p-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-8 h-8 text-[var(--trust)]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              Research Partnership
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Our technology was developed in collaboration with <strong>ZHAW</strong>—Zurich University of Applied Sciences. The original developer, Dr. Dandolo Flumini, leads ongoing R&D through a <strong>CHF 300,000 Innosuisse-funded</strong> research program.
            </p>
          </motion.div>
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
              See the Technology in Action
            </h2>
            <p className="text-lg text-gray-300 mb-10">
              Book a technical deep-dive to understand how our neuro-symbolic architecture can work for your claims operations.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg"
            >
              Request Technical Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
