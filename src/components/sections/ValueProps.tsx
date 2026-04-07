"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Zap, Target, ShieldCheck, Heart } from "lucide-react";

const valuePropsMeta = [
  { key: "speed" as const, icon: Zap, metric: 92, suffix: "%", color: "var(--primary)", hasPrefix: true },
  { key: "cost" as const, icon: Target, metric: 71, suffix: "%", color: "var(--secondary)", hasPrefix: true },
  { key: "audit" as const, icon: ShieldCheck, metric: 100, suffix: "%", color: "var(--success)", hasPrefix: false },
  { key: "cx" as const, icon: Heart, metric: 0, suffix: "", color: "var(--aurora-purple)", hasPrefix: false },
];

function AnimatedCounter({
  value,
  duration = 2
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(value);
  const hasAnimatedRef = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(() => {
      setCount(0);
      animationFrame = requestAnimationFrame(animate);
    });

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export function ValueProps() {
  const t = useTranslations("valueProps");

  const valueProps = valuePropsMeta.map((meta) => ({
    icon: meta.icon,
    metric: meta.metric,
    prefix: meta.hasPrefix ? t("upTo") : "",
    suffix: meta.suffix,
    label: t(`cards.${meta.key}.label`),
    description: t(`cards.${meta.key}.description`),
    color: meta.color,
    proofContext: t(`cards.${meta.key}.proof`),
  }));

  return (
    <section className="py-24 px-6 relative">
      {/* Subtle background shift */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--background-secondary)]/30 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div
                className="h-full p-8 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] card-glow transition-all"
                style={{ '--card-color': prop.color } as React.CSSProperties}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{
                    background: `color-mix(in srgb, ${prop.color} 12%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${prop.color} 20%, transparent)`,
                  }}
                >
                  <prop.icon
                    className="w-6 h-6"
                    style={{ color: `var(--card-color)` }}
                  />
                </div>

                {/* Metric */}
                <div className="mb-4">
                  {prop.prefix && (
                    <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-[0.15em] block mb-1">
                      {prop.prefix}
                    </span>
                  )}
                  {prop.metric > 0 ? (
                    <div
                      className="text-5xl font-bold font-mono-data"
                      style={{ color: `var(--card-color)` }}
                    >
                      <AnimatedCounter value={prop.metric} />
                      {prop.suffix}
                    </div>
                  ) : (
                    <div
                      className="text-5xl font-bold font-mono-data"
                      style={{ color: `var(--card-color)` }}
                    >
                      &lt; 60s
                    </div>
                  )}
                </div>

                {/* Label */}
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-3">
                  {prop.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  {prop.description}
                </p>

                {/* Proof Context */}
                <div
                  className="text-xs font-medium px-3 py-1.5 rounded-full inline-flex items-center gap-1.5"
                  style={{
                    background: `color-mix(in srgb, var(--card-color) 10%, transparent)`,
                    color: `var(--card-color)`,
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
