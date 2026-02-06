"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, FileText, Search, Scale, Send, ClipboardCheck, Zap, UserCheck, CheckCircle } from "lucide-react";
import { fadeIn, scaleIn, springTransition } from "@/lib/animations";

const pipelineSteps = [
  {
    icon: FileText,
    label: "Ingest",
    color: "var(--trust)",
    shortDescription: "Capture & validate inputs",
    description: "Documents received via email, portal or system export",
    automatedTime: "< 10 sec",
    businessValue: "Eliminate manual sorting and routing",
    automationDetail: "ContextBuilder auto-ingests and classifies documents",
    hitlOptional: false,
  },
  {
    icon: Search,
    label: "Process",
    color: "var(--secondary)",
    shortDescription: "Apply policy logic & checks",
    description: "Key data pulled from claims documents",
    automatedTime: "15 – 45 sec",
    businessValue: "Reduce re-keying errors and data entry cost",
    automationDetail: "AI extracts fields with evidence linking",
    hitlOptional: true,
  },
  {
    icon: Scale,
    label: "Assess",
    color: "var(--primary)",
    shortDescription: "Confirm outcome & handling",
    description: "Coverage determination against policy",
    automatedTime: "< 5 sec",
    businessValue: "Consistent, defensible decisions on every claim",
    automationDetail: "MIRA applies deterministic policy logic",
    hitlOptional: false,
  },
  {
    icon: Send,
    label: "Execute",
    color: "var(--aurora-cyan)",
    shortDescription: "Trigger next steps",
    description: "Set reserves, draft payment, send comms",
    automatedTime: "< 10 sec",
    businessValue: "Faster settlement cycles, improved CX",
    automationDetail: "Automated task execution based on decision",
    hitlOptional: true,
  },
  {
    icon: ClipboardCheck,
    label: "Audit",
    color: "var(--secondary)",
    shortDescription: "Full traceability",
    description: "Complete decision trail logged",
    automatedTime: "Instant",
    businessValue: "Regulator-ready audit trails without manual prep",
    automationDetail: "Decision Dossier generated automatically",
    hitlOptional: false,
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Scroll-linked parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Transform values for parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={sectionRef} className="relative py-24 px-6 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        {/* Main content with parallax */}
        <motion.div
          style={prefersReducedMotion ? {} : { y, opacity }}
          className="text-center mb-16"
        >
          <motion.h1
            variants={fadeIn}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-6"
          >
            Automate Insurance Claim Decisions.
            <br />
            <span className="text-[var(--primary)]">Auditable by Design.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-4 leading-relaxed"
          >
            <>
              Apply policy terms clearly and consistently.
              <br />
              Built for regulated insurance.
              <br />
              No black boxes.
            </>
          </motion.p>
          <div className="mb-10" />

          <motion.div
            variants={scaleIn}
            initial="initial"
            animate="animate"
            transition={{ ...springTransition, delay: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-all text-lg shadow-lg shadow-[var(--primary)]/30 hover:shadow-[var(--primary)]/50"
                >
                  Book a Demo
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/impact-estimator"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--primary-light)] transition-all text-lg backdrop-blur-sm"
                >
                  Get Impact Estimate
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Animated Pipeline Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          {/* Pipeline container - Glass Panel */}
          <div className="glass-panel p-8 md:p-12">
            <div className="text-center mb-8">
              <p className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider">
                From Documents to Decisions in One Flow
              </p>
            </div>

            {/* Pipeline steps */}
            <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-0">
              {pipelineSteps.map((step, index) => (
                <div key={step.label} className="flex items-start w-full md:w-auto">
                  {/* Step */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.6 + index * 0.15,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="flex flex-col items-center cursor-pointer w-full md:w-auto"
                    onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                  >
                    <div className="relative">
                      <div
                        className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-3 transition-transform hover:scale-110"
                        style={{
                          backgroundColor: `color-mix(in srgb, ${step.color} 25%, transparent)`,
                        }}
                      >
                        <step.icon
                          className="w-8 h-8 md:w-10 md:h-10"
                          style={{ color: step.color }}
                        />
                      </div>
                      {/* Automation badge */}
                      <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${
                        step.hitlOptional ? 'bg-amber-100 dark:bg-amber-900/50' : 'bg-emerald-100 dark:bg-emerald-900/50'
                      }`}>
                        {step.hitlOptional ? (
                          <UserCheck className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                        ) : (
                          <Zap className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        )}
                      </div>
                    </div>
                    <span className="text-base font-semibold text-[var(--text-primary)]">
                      {step.label}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] mt-0.5">
                      {step.shortDescription}
                    </span>
                    <span className="text-xs text-[var(--secondary)] font-medium mt-0.5">
                      {step.automatedTime}
                    </span>

                    {/* Expanded detail card */}
                    <AnimatePresence>
                      {expandedStep === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden w-full max-w-[180px]"
                        >
                          <div className="mt-3 p-3 rounded-lg bg-[var(--subtle-bg)] border border-[var(--border)] text-left">
                            <p className="text-xs text-[var(--text-muted)] mb-2">{step.description}</p>
                            <div className="flex items-start gap-1.5 mb-2">
                              <CheckCircle className="w-3 h-3 text-[var(--secondary)] flex-shrink-0 mt-0.5" />
                              <span className="text-xs text-[var(--text-muted)]">{step.automationDetail}</span>
                            </div>
                            <p className="text-xs text-[var(--primary)] font-medium">{step.businessValue}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Connector arrow (not after last item) */}
                  {index < pipelineSteps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.15 }}
                      className="hidden md:flex items-center mx-4 mt-8"
                    >
                      <div className="w-12 lg:w-20 h-0.5 bg-gradient-to-r from-[var(--border)] to-[var(--primary)]" />
                      <div
                        className="w-0 h-0 border-t-4 border-b-4 border-l-[6px] border-transparent border-l-[var(--primary)]"
                      />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                  <Zap className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-[var(--text-muted)]">Fully Automated</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                  <UserCheck className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-[var(--text-muted)]">Human in the Loop</span>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </section>
  );
}
