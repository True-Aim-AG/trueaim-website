"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Search,
  Scale,
  Send,
  ClipboardCheck,
  ArrowRight,
  CheckCircle,
  UserCheck,
  Zap,
  Info,
} from "lucide-react";

const workflowSteps = [
  {
    id: "intake",
    icon: FileText,
    label: "Intake",
    description: "Documents received via email, portal, or system export",
    businessValue: "Eliminate manual sorting and routing of incoming documents",
    automated: true,
    automationDetail: "ContextBuilder auto-ingests and classifies documents",
    manualTime: "15-30 min",
    automatedTime: "< 5 sec",
    product: "ContextBuilder",
  },
  {
    id: "extract",
    icon: Search,
    label: "Extract",
    description: "Key data pulled from claims documents",
    businessValue: "Reduce re-keying errors and data entry cost",
    automated: true,
    automationDetail: "AI extracts fields with evidence linking",
    hitlOptional: true,
    manualTime: "20-45 min",
    automatedTime: "10-30 sec",
    product: "ContextBuilder",
  },
  {
    id: "decide",
    icon: Scale,
    label: "Decide",
    description: "Coverage determination against policy",
    businessValue: "Consistent, defensible decisions on every claim",
    automated: true,
    automationDetail: "MIRA applies deterministic policy logic",
    manualTime: "30-60 min",
    automatedTime: "< 3 sec",
    product: "MIRA",
  },
  {
    id: "action",
    icon: Send,
    label: "Action",
    description: "Set reserves, draft payment, send comms",
    businessValue: "Faster settlement cycles, improved customer experience",
    automated: true,
    automationDetail: "Automated task execution based on decision",
    hitlOptional: true,
    manualTime: "10-20 min",
    automatedTime: "< 5 sec",
    product: "MIRA",
  },
  {
    id: "audit",
    icon: ClipboardCheck,
    label: "Audit",
    description: "Complete decision trail logged",
    businessValue: "Regulator-ready audit trails without manual prep",
    automated: true,
    automationDetail: "Decision Dossier generated automatically",
    manualTime: "Variable",
    automatedTime: "Instant",
    product: "All",
  },
];

interface ClaimsWorkflowMapProps {
  variant?: "full" | "compact";
}

export function ClaimsWorkflowMap({ variant = "full" }: ClaimsWorkflowMapProps) {
  const [showBefore, setShowBefore] = useState(false);
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  if (variant === "compact") {
    return (
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
              End-to-End Claims Automation
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              From document intake to auditable decision in seconds
            </p>
          </motion.div>

          {/* Compact workflow visualization */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[var(--primary-light)] flex items-center justify-center mb-2">
                    <step.icon className="w-8 h-8 text-[var(--primary)]" />
                  </div>
                  <span className="text-sm font-medium text-[var(--text-primary)]">{step.label}</span>
                  <span className="text-xs text-[var(--secondary)] font-medium">{step.automatedTime}</span>
                </motion.div>
                {index < workflowSteps.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-slate-300 mx-4 hidden md:block" />
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[var(--secondary)]" />
              <span className="text-[var(--text-muted)]">Fully Automated</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="text-[var(--text-muted)]">Human in the Loop</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Full variant
  return (
    <section className="py-20 px-6 bg-[var(--background-secondary)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            Claims Workflow Automation
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-6">
            See how TrueAim.ai transforms each step of the claims lifecycle
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-2 p-1 bg-white rounded-lg border border-[var(--border)]">
            <button
              onClick={() => setShowBefore(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                !showBefore
                  ? 'bg-[var(--primary)] text-white'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              With TrueAim
            </button>
            <button
              onClick={() => setShowBefore(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                showBefore
                  ? 'bg-slate-700 text-white'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              Without
            </button>
          </div>
        </motion.div>

        {/* Workflow Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredStep(step.id)}
              onMouseLeave={() => setHoveredStep(null)}
              className="relative"
            >
              <div className={`bg-white rounded-xl border p-6 h-full transition-all ${
                hoveredStep === step.id
                  ? 'border-[var(--primary)] shadow-lg'
                  : 'border-[var(--border)]'
              }`}>
                {/* Status indicator */}
                <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center ${
                  showBefore
                    ? 'bg-slate-200'
                    : step.hitlOptional
                      ? 'bg-amber-100'
                      : 'bg-emerald-100'
                }`}>
                  {showBefore ? (
                    <UserCheck className="w-3 h-3 text-slate-500" />
                  ) : step.hitlOptional ? (
                    <UserCheck className="w-3 h-3 text-amber-600" />
                  ) : (
                    <Zap className="w-3 h-3 text-emerald-600" />
                  )}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                  showBefore ? 'bg-slate-100' : 'bg-[var(--primary-light)]'
                }`}>
                  <step.icon className={`w-7 h-7 ${
                    showBefore ? 'text-slate-500' : 'text-[var(--primary)]'
                  }`} />
                </div>

                {/* Label */}
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{step.label}</h3>
                <p className="text-sm text-[var(--text-muted)] mb-4">{step.description}</p>

                {/* Time indicator */}
                <div className={`text-sm font-medium ${
                  showBefore ? 'text-slate-500' : 'text-[var(--secondary)]'
                }`}>
                  {showBefore ? step.manualTime : step.automatedTime}
                </div>

                {/* Business value line */}
                {step.businessValue && (
                  <p className="text-xs text-[var(--primary)] mt-2">{step.businessValue}</p>
                )}

                {/* Automation detail (on hover or always in full mode) */}
                {!showBefore && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-[var(--text-muted)]">{step.automationDetail}</span>
                    </div>
                  </div>
                )}

                {/* Product badge */}
                {!showBefore && (
                  <div className="mt-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-[var(--text-muted)]">
                      {step.product}
                    </span>
                  </div>
                )}
              </div>

              {/* Connector arrow */}
              {index < workflowSteps.length - 1 && (
                <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-white rounded-xl border border-[var(--border)] p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-[var(--primary)]">
                {showBefore ? '75-150 min' : '< 1 min'}
              </div>
              <div className="text-sm text-[var(--text-muted)]">Total processing time</div>
              {!showBefore && (
                <div className="text-xs text-[var(--text-muted)] mt-1">You control thresholds, exceptions, and approval gates.</div>
              )}
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--secondary)]">
                {showBefore ? 'Variable' : '100%'}
              </div>
              <div className="text-sm text-[var(--text-muted)]">Decision traceability</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">
                {showBefore ? 'Sample-based' : '100%'}
              </div>
              <div className="text-sm text-[var(--text-muted)]">QA coverage</div>
            </div>
          </div>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <Zap className="w-3 h-3 text-emerald-600" />
            </div>
            <span className="text-[var(--text-muted)]">Fully Automated</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
              <UserCheck className="w-3 h-3 text-amber-600" />
            </div>
            <span className="text-[var(--text-muted)]">Human in the Loop</span>
          </div>
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[var(--text-muted)]" />
            <span className="text-[var(--text-muted)]">Hover for details</span>
          </div>
        </div>
      </div>
    </section>
  );
}
