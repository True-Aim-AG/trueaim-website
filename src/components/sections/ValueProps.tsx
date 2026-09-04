"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Zap, Target, ShieldCheck, Heart, Check } from "lucide-react";

const ease = [0.4, 0, 0.2, 1] as const;

const valuePropsMeta = [
  { key: "speed" as const, icon: Zap, metric: 92, suffix: "%", hasPrefix: true },
  { key: "cost" as const, icon: Target, metric: 71, suffix: "%", hasPrefix: true },
  { key: "audit" as const, icon: ShieldCheck, metric: 100, suffix: "%", hasPrefix: false },
  { key: "cx" as const, icon: Heart, metric: 0, suffix: "", hasPrefix: false },
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
    proofContext: t(`cards.${meta.key}.proof`),
  }));

  return (
    <section className="py-24 px-6 relative">
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-body max-w-2xl mx-auto">
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
              transition={{ duration: 0.5, delay: index * 0.1, ease }}
            >
              <div className="h-full p-8 rounded-pill bg-card shadow-card transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-swatch">
                {/* Icon */}
                <div className="icon-plate mb-6">
                  <prop.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>

                {/* Metric */}
                <div className="mb-4">
                  {prop.prefix && (
                    <span className="text-caption-sm text-subtle block mb-1">
                      {prop.prefix}
                    </span>
                  )}
                  {prop.metric > 0 ? (
                    <div className="text-kpi-lg text-accent">
                      <AnimatedCounter value={prop.metric} />
                      {prop.suffix}
                    </div>
                  ) : (
                    <div className="text-kpi-lg text-accent">
                      &lt; 60s
                    </div>
                  )}
                </div>

                {/* Label */}
                <h3 className="text-base font-semibold text-strong mb-3">
                  {prop.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-body leading-relaxed mb-4">
                  {prop.description}
                </p>

                {/* Proof Context */}
                <div className="text-xs font-medium px-3 py-1.5 rounded-pill bg-lilac text-accent inline-flex items-center gap-1.5">
                  <Check className="w-3 h-3" strokeWidth={1.5} />
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
