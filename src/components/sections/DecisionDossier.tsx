"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Link2,
  History,
  CheckCircle,
  ArrowRight,
  Scale,
  FileSearch,
  Shield,
  RefreshCw,
  BookOpen,
} from "lucide-react";

const dossierContents = [
  {
    icon: FileText,
    title: "Input Summary",
    description: "Complete claim data as received—documents, parties, timeline, facts",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: Scale,
    title: "Policy Match",
    description: "Specific policy clauses applied, with clause IDs and exact text references",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  {
    icon: FileSearch,
    title: "Logic Trace",
    description: "Step-by-step decision path: conditions checked, rules applied, branches taken",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: Link2,
    title: "Evidence Links",
    description: "Every field linked back to source documents with page and location",
    color: "text-teal-600",
    bgColor: "bg-teal-100",
  },
  {
    icon: Shield,
    title: "Confidence Score",
    description: "Automation certainty level with flagged areas requiring human review",
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    icon: RefreshCw,
    title: "Replay Capability",
    description: "Re-run with identical inputs, get identical outputs—every time",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
];

interface DecisionDossierProps {
  variant?: "full" | "teaser";
}

export function DecisionDossier({ variant = "full" }: DecisionDossierProps) {
  if (variant === "teaser") {
    return (
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 rounded-2xl border border-indigo-100 p-8 md:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
                  <BookOpen className="w-4 h-4" />
                  Unique to TrueAim
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
                  The Decision Dossier
                </h2>
                <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                  Every claim decision produces a complete, replayable audit record. Unlike black-box AI, every TrueAim decision can be <strong>replayed, explained, and defended</strong> in audit or dispute.
                </p>
                <Link
                  href="/technology#decision-dossier"
                  className="inline-flex items-center gap-2 text-[var(--primary)] font-medium hover:underline"
                >
                  See how it works
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Mini dossier preview */}
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 transform rotate-1">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-lg bg-[var(--primary)] flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--text-primary)]">Decision Dossier</div>
                      <div className="text-xs text-[var(--text-muted)]">Claim #2024-TR-4521</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-[var(--text-muted)]">Decision: <strong className="text-emerald-600">Covered</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-[var(--text-muted)]">Policy: Art. 5.2.1, 5.2.3</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-[var(--text-muted)]">Evidence: 4 documents linked</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-[var(--text-muted)]">Confidence: 98.5%</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-xl shadow-lg border border-slate-200 p-3 transform -rotate-3">
                  <History className="w-5 h-5 text-[var(--primary)]" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Full variant for technology page
  return (
    <section id="decision-dossier" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Unique Differentiator
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            The Decision Dossier
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
            Every claim decision produces a complete, replayable audit record—your defense in any audit or dispute.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Dossier contents list */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              {dossierContents.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1">{item.title}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual dossier mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="sticky top-24"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[var(--primary-dark)] to-slate-800 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Decision Dossier</div>
                    <div className="text-xs text-white/60">Generated: Jan 12, 2026 14:32:05 UTC</div>
                  </div>
                  <div className="ml-auto px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-medium">
                    Covered
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Claim Info */}
                <div>
                  <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">Claim Reference</div>
                  <div className="font-mono text-sm bg-slate-50 rounded-lg p-3">
                    <span className="text-[var(--text-primary)]">TRV-2024-4521</span>
                    <span className="text-[var(--text-muted)]"> | Travel Insurance | Medical Expenses</span>
                  </div>
                </div>

                {/* Policy Match */}
                <div>
                  <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">Policy Clauses Applied</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <code className="text-[var(--primary)] bg-blue-50 px-2 py-0.5 rounded">Art. 5.2.1</code>
                      <span className="text-[var(--text-muted)]">Medical emergency coverage</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <code className="text-[var(--primary)] bg-blue-50 px-2 py-0.5 rounded">Art. 5.2.3</code>
                      <span className="text-[var(--text-muted)]">Repatriation benefits</span>
                    </div>
                  </div>
                </div>

                {/* Evidence */}
                <div>
                  <div className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">Evidence Trail</div>
                  <div className="bg-slate-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <Link2 className="w-3 h-3 text-[var(--primary)]" />
                      <span className="text-[var(--text-muted)]">medical_report.pdf</span>
                      <span className="text-[var(--text-muted)]">→ pg. 2, para 3</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Link2 className="w-3 h-3 text-[var(--primary)]" />
                      <span className="text-[var(--text-muted)]">hospital_invoice.pdf</span>
                      <span className="text-[var(--text-muted)]">→ line items 1-4</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Link2 className="w-3 h-3 text-[var(--primary)]" />
                      <span className="text-[var(--text-muted)]">policy_certificate.pdf</span>
                      <span className="text-[var(--text-muted)]">→ coverage schedule</span>
                    </div>
                  </div>
                </div>

                {/* Confidence & Replay */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-[var(--text-muted)]">Confidence:</span>
                    <span className="text-sm font-semibold text-emerald-600">98.5%</span>
                  </div>
                  <button className="flex items-center gap-1 text-xs text-[var(--primary)] font-medium hover:underline">
                    <RefreshCw className="w-3 h-3" />
                    Replay Decision
                  </button>
                </div>
              </div>
            </div>

            {/* Differentiator callout */}
            <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100">
              <p className="text-sm text-[var(--text-secondary)] text-center">
                <strong className="text-[var(--text-primary)]">Unlike black-box AI:</strong> Every TrueAim decision can be replayed, explained, and defended.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
