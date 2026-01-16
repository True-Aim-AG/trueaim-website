"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, FileText, Cpu, CheckCircle, Zap, Shield } from "lucide-react";
import { fadeIn, scaleIn, springTransition } from "@/lib/animations";

const pipelineSteps = [
  { icon: FileText, label: "Ingest", color: "var(--trust)" },
  { icon: Cpu, label: "Process", color: "var(--secondary)" },
  { icon: CheckCircle, label: "Decide", color: "var(--primary)" },
  { icon: Zap, label: "Act", color: "var(--aurora-cyan)" },
  { icon: Shield, label: "Audit", color: "var(--secondary)" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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
            Neuro-Symbolic AI for
            <br />
            <span className="text-[var(--primary)]">Auditable Claims Decisions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Combine the adaptability of agentic AI with the precision of deterministic logic.
            Deliver compliant, explainable decisions at scale. Every outcome traceable to the source.
          </motion.p>

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
                  href="/roi-calculator"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--primary-light)] transition-all text-lg backdrop-blur-sm"
                >
                  Get ROI Estimate
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
            {/* Tertiary links */}
            <div className="flex flex-wrap gap-6 justify-center text-sm">
              <Link
                href="/technology"
                className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors underline underline-offset-4"
              >
                See How It Works
              </Link>
              <Link
                href="/trust"
                className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors underline underline-offset-4"
              >
                Security & Compliance
              </Link>
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
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
              {pipelineSteps.map((step, index) => (
                <div key={step.label} className="flex items-center">
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
                    className="flex flex-col items-center"
                  >
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
                    <span className="text-sm font-medium text-[var(--text-primary)]">
                      {step.label}
                    </span>
                  </motion.div>

                  {/* Connector arrow (not after last item) */}
                  {index < pipelineSteps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.15 }}
                      className="hidden md:flex items-center mx-4"
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

            {/* Animated data flow indicator */}
            <div className="hidden md:block absolute left-[15%] right-[15%] h-1 overflow-hidden rounded-full" style={{ top: "60%" }}>
              <motion.div
                className="h-full w-1/4 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-50"
                animate={{ x: ["-100%", "500%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1
                }}
              />
            </div>
          </div>

          {/* Floating badges - Glass Panels */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute -left-4 top-1/4 hidden lg:block"
          >
            <div className="glass-panel px-4 py-3">
              <p className="text-xs text-[var(--text-muted)]">Processing time</p>
              <p className="text-lg font-bold font-mono-data text-[var(--secondary)]">&lt;2 seconds</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="absolute -right-4 top-1/3 hidden lg:block"
          >
            <div className="glass-panel px-4 py-3">
              <p className="text-xs text-[var(--text-muted)]">Audit trail</p>
              <p className="text-lg font-bold font-mono-data text-[var(--primary)]">100% traceable</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
