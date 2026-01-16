"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Zap, Target, ShieldCheck } from "lucide-react";

const valueProps = [
  {
    icon: Zap,
    metric: 89,
    prefix: "UP TO",
    suffix: "%",
    label: "Faster claim determinations",
    description: "Process claims in seconds, not days. Our agentic workflow handles document ingestion, comprehension, and decision—automatically.",
    color: "var(--primary)",
    proofContext: "Pilot results: avg 2.3s decision time",
  },
  {
    icon: Target,
    metric: 68,
    prefix: "UP TO",
    suffix: "%",
    label: "Reduction in handling costs",
    description: "Eliminate re-keying errors and inconsistent interpretations. Same input, same output—every time.",
    color: "var(--aurora-cyan)",
    proofContext: "Based on closed file review analysis",
  },
  {
    icon: ShieldCheck,
    metric: 100,
    prefix: "",
    suffix: "%",
    label: "Auditable decisions",
    description: "Every decision links directly to policy clauses and source documents. Built for EU AI Act compliance.",
    color: "var(--secondary)",
    proofContext: "Complete decision traceability guaranteed",
  },
];

function AnimatedCounter({
  value,
  duration = 2
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export function ValueProps() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            Claims Automation That Regulators Trust
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Measurable results from day one
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative group"
            >
              <div className="glass-panel glass-panel-hover p-8 h-full">
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${prop.color} 25%, transparent)`,
                  }}
                >
                  <prop.icon
                    className="w-7 h-7"
                    style={{ color: prop.color }}
                  />
                </div>

                {/* Metric */}
                <div className="mb-4">
                  {prop.prefix && (
                    <span className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                      {prop.prefix}
                    </span>
                  )}
                  <div
                    className="text-5xl md:text-6xl font-bold font-mono-data"
                    style={{ color: prop.color }}
                  >
                    <AnimatedCounter value={prop.metric} />
                    {prop.suffix}
                  </div>
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                  {prop.label}
                </h3>

                {/* Description */}
                <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                  {prop.description}
                </p>

                {/* Proof Context */}
                <div
                  className="text-xs font-medium px-3 py-1.5 rounded-full inline-flex items-center gap-1.5"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${prop.color} 20%, transparent)`,
                    color: prop.color,
                  }}
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {prop.proofContext}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
