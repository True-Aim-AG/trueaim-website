"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { BrandIcon } from "@/components/brand/BrandIcon";

const ease = [0.4, 0, 0.2, 1] as const;

// ─── Animated Illustration: Document Ingestion ──────────────────────────────
function DocumentIngestionAnim({ active }: { active: boolean }) {
  const inputDocs = [
    { name: "claim_form.pdf", icon: "PDF", delay: 0, lines: [100, 80, 60, 90, 45] },
    { name: "medical_report.pdf", icon: "PDF", delay: 0.2, lines: [85, 100, 70, 55, 80] },
    { name: "invoice.pdf", icon: "XLS", delay: 0.4, lines: [70, 90, 100, 65, 50] },
  ];

  const outputFields = [
    { label: "Claimant", value: "Maria Fischer", delay: 1.0 },
    { label: "Diagnosis", value: "ICD-10: S52.5", delay: 1.2 },
    { label: "Amount", value: "CHF 4,280.00", delay: 1.4 },
    { label: "Policy", value: "TRV-2024-4521", delay: 1.6 },
  ];

  return (
    <div className="relative w-full h-[240px] flex items-center justify-center overflow-hidden">
      {/* Left side: incoming unstructured documents */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-2.5">
        {inputDocs.map((doc) => (
          <motion.div
            key={doc.name}
            initial={{ x: -80, opacity: 0 }}
            animate={active ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: doc.delay, ease }}
            className="flex items-center gap-2"
          >
            <div className="w-[56px] h-[42px] rounded-pill bg-elevated shadow-swatch p-1.5 flex-shrink-0">
              <div className="flex items-center gap-1 mb-1">
                <div className="text-[6px] font-bold text-accent bg-accent-soft px-1 rounded-pill">{doc.icon}</div>
              </div>
              <div className="space-y-[2px]">
                {doc.lines.slice(0, 3).map((w, j) => (
                  <div key={j} className="h-[2px] rounded-full bg-ta-neutral-300" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
            <span className="text-[7px] text-muted max-w-[70px] truncate">{doc.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Center: processing zone */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={active ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.5, ease }}
        className="relative z-10 w-[68px] h-[90px] flex flex-col items-center justify-center"
      >
        {/* Processing box */}
        <div className="w-[52px] h-[52px] rounded-pill bg-accent-soft flex items-center justify-center relative overflow-hidden">
          {/* Scanning sweep */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={active ? { y: ["100%", "-100%"] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.7 }}
            className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-ta-blue-200 to-transparent"
          />
          {/* Extraction icon */}
          <BrandIcon name="extraction" size={22} className="relative z-10" />
        </div>
        <span className="text-[7px] font-semibold text-accent mt-1.5 uppercase tracking-wider">Extract</span>
      </motion.div>

      {/* Animated flow arrows: left → center */}
      {active && (
        <div className="absolute left-[130px] top-1/2 -translate-y-1/2 w-[40px] h-[60px]">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`arrow-l-${i}`}
              animate={{ x: [0, 36], opacity: [0.8, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.8 + i * 0.25, repeatDelay: 0.6 }}
              className="absolute w-1 h-1 rounded-full bg-light-blue"
              style={{ top: `${20 + i * 25}%` }}
            />
          ))}
        </div>
      )}

      {/* Animated flow arrows: center → right */}
      {active && (
        <div className="absolute right-[140px] top-1/2 -translate-y-1/2 w-[40px] h-[60px]">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={`arrow-r-${i}`}
              animate={{ x: [0, 36], opacity: [0.8, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 1.2 + i * 0.2, repeatDelay: 0.6 }}
              className="absolute w-1 h-1 rounded-full bg-approved-base"
              style={{ top: `${12 + i * 22}%` }}
            />
          ))}
        </div>
      )}

      {/* Right side: structured output fields */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={active ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.4, ease }}
          className="w-[130px] rounded-pill bg-elevated shadow-swatch overflow-hidden"
        >
          {/* Mini header */}
          <div className="px-2.5 py-1.5 border-b border-hairline flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-approved-base" />
            <span className="text-[7px] font-semibold text-strong uppercase tracking-wider">Structured</span>
          </div>
          {/* Fields */}
          <div className="p-2 space-y-1.5">
            {outputFields.map((field) => (
              <motion.div
                key={field.label}
                initial={{ opacity: 0, x: 10 }}
                animate={active ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: field.delay }}
                className="flex items-center justify-between"
              >
                <span className="text-[7px] text-muted">{field.label}</span>
                <span className="text-[7px] font-display font-semibold tabular-nums text-strong">{field.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Animated Illustration: Policy Logic (MIRA) ────────────────────────────
function PolicyLogicAnim({ active }: { active: boolean }) {
  const nodes = [
    { x: "50%", y: "10%", label: "Claim", delay: 0, root: true },
    { x: "25%", y: "40%", label: "Art 5.2", delay: 0.3 },
    { x: "75%", y: "40%", label: "Art 7.1", delay: 0.4 },
    { x: "12%", y: "72%", label: "Covered", delay: 0.6, result: true },
    { x: "38%", y: "72%", label: "Excess", delay: 0.7 },
    { x: "62%", y: "72%", label: "Covered", delay: 0.8, result: true },
    { x: "88%", y: "72%", label: "Excluded", delay: 0.9, excluded: true },
  ];

  const edges = [
    { from: 0, to: 1, delay: 0.2 },
    { from: 0, to: 2, delay: 0.3 },
    { from: 1, to: 3, delay: 0.5 },
    { from: 1, to: 4, delay: 0.55 },
    { from: 2, to: 5, delay: 0.65 },
    { from: 2, to: 6, delay: 0.7 },
  ];

  return (
    <div className="relative w-full h-[220px]">
      {/* Connecting edges */}
      <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
        {edges.map((edge, i) => {
          const from = nodes[edge.from];
          const to = nodes[edge.to];
          return (
            <motion.line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="var(--ta-neutral-300)"
              strokeWidth={1.5}
              strokeOpacity={0.6}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={active ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: edge.delay }}
            />
          );
        })}
      </svg>

      {/* Decision nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={active ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: node.delay, duration: 0.35, ease }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: node.x, top: node.y }}
        >
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-[10px] font-semibold whitespace-nowrap ${
              node.root
                ? "bg-accent-soft text-accent"
                : node.result || node.excluded
                  ? "bg-elevated shadow-swatch text-strong"
                  : "bg-card shadow-swatch text-body"
            }`}
          >
            {(node.result || node.excluded) && (
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${node.result ? "bg-approved-base" : "bg-denied-base"}`} />
            )}
            {node.label}
          </div>
          {/* One-shot settle ping on result nodes */}
          {node.result && active && (
            <motion.div
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 1, delay: node.delay + 0.8, ease }}
              className="absolute inset-0 rounded-pill border border-approved-base"
            />
          )}
        </motion.div>
      ))}

      {/* Processing indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 1.1 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
      >
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-pill bg-accent-soft">
          <motion.div
            animate={active ? { rotate: 360 } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-2.5 h-2.5 border border-accent border-t-transparent rounded-full"
          />
          <span className="text-[9px] text-accent font-medium uppercase tracking-wider">Deterministic</span>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Animated Illustration: Decision Dossier ────────────────────────────────
function DecisionDossierAnim({ active }: { active: boolean }) {
  const sources = [
    { label: "Documents", detail: "3 files linked", icon: "extraction" as const, delay: 0.1 },
    { label: "Policy Clauses", detail: "Art 5.2, 7.1", icon: "mira" as const, delay: 0.3 },
    { label: "Logic Path", detail: "4 rules applied", icon: "rules" as const, delay: 0.5 },
  ];

  const dossierRows = [
    { label: "Input Summary", ref: "3 documents", delay: 0.7 },
    { label: "Policy Match", ref: "Art 5.2.1, 7.1.3", delay: 0.9 },
    { label: "Logic Trace", ref: "4 steps, 2 branches", delay: 1.1 },
    { label: "Evidence Links", ref: "pg.2 ¶3, items 1-4", delay: 1.3 },
  ];

  return (
    <div className="relative w-full h-[260px] flex items-center justify-center overflow-hidden">

      {/* Left: source inputs */}
      <div className="absolute left-1 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
        {sources.map((src) => (
          <motion.div
            key={src.label}
            initial={{ x: -60, opacity: 0 }}
            animate={active ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: src.delay, ease }}
            className="w-[110px] rounded-pill bg-elevated shadow-swatch p-2"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <BrandIcon name={src.icon} size={14} className="flex-shrink-0" />
              <span className="text-[8px] font-semibold text-strong">{src.label}</span>
            </div>
            <span className="text-[7px] text-muted">{src.detail}</span>
          </motion.div>
        ))}
      </div>

      {/* Center: animated connection lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 350 260" preserveAspectRatio="none">
        {sources.map((src, i) => {
          const startY = (30 + i * 38) / 100 * 260;
          const endY = (22 + i * 25) / 100 * 260;
          return (
            <motion.path
              key={src.label}
              d={`M 120 ${startY} C 160 ${startY}, 180 ${endY}, 220 ${endY}`}
              fill="none"
              stroke="var(--ta-light-blue)"
              strokeWidth={1.5}
              strokeDasharray="4 3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={active ? { pathLength: 1, opacity: 0.6 } : {}}
              transition={{ duration: 0.6, delay: src.delay + 0.3 }}
            />
          );
        })}
      </svg>

      {/* Flowing dots along connection paths */}
      {active && sources.map((src, i) => (
        <motion.div
          key={`dot-${src.label}`}
          animate={{
            x: [120, 145, 175, 210],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: 1.5 + i * 0.3,
            repeatDelay: 1.5,
            ease: "easeInOut",
          }}
          className="absolute w-1.5 h-1.5 rounded-full bg-light-blue z-10"
          style={{ top: `${30 + i * 27}%` }}
        />
      ))}

      {/* Right: assembling dossier */}
      <div className="absolute right-1 top-1/2 -translate-y-1/2 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={active ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.4, ease }}
          className="w-[150px] rounded-pill bg-card shadow-card overflow-hidden"
        >
          {/* Dossier header */}
          <div className="px-3 py-2 bg-accent-soft border-b border-hairline flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <BrandIcon name="traceability" size={14} />
              <span className="text-[8px] font-bold text-strong">Dossier</span>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.8, ease }}
              className="flex items-center gap-1 rounded-pill bg-elevated px-1.5 py-0.5"
            >
              <span className="w-1 h-1 rounded-full bg-approved-base" />
              <span className="text-[6px] font-bold text-strong">SEALED</span>
            </motion.div>
          </div>

          {/* Dossier rows assembling */}
          <div className="p-2 space-y-1">
            {dossierRows.map((row) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: 15 }}
                animate={active ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.35, delay: row.delay }}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-pill bg-surface-muted"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-[7px] font-semibold text-strong leading-none">{row.label}</div>
                  <div className="text-[6px] text-muted leading-tight mt-0.5 truncate">{row.ref}</div>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={active ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: row.delay + 0.3 }}
                >
                  <svg className="w-2.5 h-2.5 text-approved-base flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Confidence bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
            className="px-3 py-2 border-t border-hairline"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[7px] text-muted">Confidence</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={active ? { opacity: 1 } : {}}
                transition={{ delay: 1.8 }}
                className="text-[9px] font-display font-semibold tabular-nums text-approved-dark"
              >
                98.5%
              </motion.span>
            </div>
            <div className="h-1 rounded-pill bg-surface-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={active ? { width: "98.5%" } : {}}
                transition={{ duration: 1, delay: 1.5, ease }}
                className="h-full rounded-pill bg-accent"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Animated Illustration: Audit Trail ─────────────────────────────────────
function AuditTrailAnim({ active }: { active: boolean }) {
  const blocks = [
    { label: "Claim Received", time: "14:32:01", delay: 0.1 },
    { label: "Documents Parsed", time: "14:32:04", delay: 0.3 },
    { label: "Policy Applied", time: "14:32:19", delay: 0.5 },
    { label: "Decision: Covered", time: "14:32:21", delay: 0.7, highlight: true },
  ];

  return (
    <div className="relative w-full h-[220px] flex items-center justify-center">
      <div className="relative w-[220px]">
        {blocks.map((block, i) => (
          <motion.div
            key={block.label}
            initial={{ opacity: 0, y: 15, x: -10 }}
            animate={active ? { opacity: 1, y: 0, x: 0 } : {}}
            transition={{ duration: 0.4, delay: block.delay, ease }}
            className="relative"
          >
            <div className="flex items-start gap-3 mb-1">
              {/* Timeline dot + line */}
              <div className="flex flex-col items-center pt-1">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={active ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: block.delay + 0.1 }}
                  className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
                    block.highlight
                      ? "bg-approved-base border-approved-base"
                      : "bg-elevated border-ta-neutral-300"
                  }`}
                />
                {i < blocks.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={active ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.3, delay: block.delay + 0.2 }}
                    className="w-px h-6 bg-line origin-top"
                  />
                )}
              </div>

              {/* Block content */}
              <div
                className={`flex-1 px-3 py-2 rounded-pill text-[10px] ${
                  block.highlight
                    ? "bg-elevated shadow-swatch"
                    : "bg-card shadow-swatch"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-semibold ${block.highlight ? "text-strong" : "text-strong"}`}>
                    {block.label}
                  </span>
                  <span className="font-display font-medium tabular-nums text-muted text-[8px]">{block.time}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Sealed indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ delay: 1.1, duration: 0.4, ease }}
          className="flex items-center justify-center mt-2"
        >
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-pill bg-elevated shadow-swatch">
            <span className="w-1.5 h-1.5 rounded-full bg-approved-base" />
            <BrandIcon name="traceability" size={12} />
            <span className="text-[9px] text-strong font-medium uppercase tracking-wider">Immutable Record</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Step wrapper ────────────────────────────────────────────────────────────
function StepSection({
  index,
  time,
  labelKey,
  onMount,
  children,
}: {
  index: number;
  time: string;
  labelKey: string;
  onMount: (index: number, el: HTMLDivElement | null) => void;
  children: React.ReactNode;
}) {
  const t = useTranslations("processFlow");
  const elRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(elRef, { once: true, margin: "-15%" });

  useEffect(() => {
    onMount(index, elRef.current);
  }, [onMount, index]);

  return (
    <div ref={elRef} className="relative">
      {/* Desktop: text left, illustration right */}
      <div className="hidden md:grid md:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[320px]">
        {/* Text content — always left, right-aligned */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="text-right"
          >
            {/* Step number + time badge — right-aligned */}
            <div className="flex items-center gap-3 mb-4 justify-end">
              <div className="px-3 py-1 rounded-pill text-xs font-semibold font-display tabular-nums bg-accent-soft text-accent">
                {time}
              </div>
              <div className="w-10 h-10 rounded-pill bg-accent-soft text-accent flex items-center justify-center text-sm font-bold">
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>

            <h3 className="font-display text-2xl lg:text-3xl font-bold text-strong mb-3">
              {t(`steps.${labelKey}.label`)}
            </h3>
            <p className="text-base text-body leading-relaxed ml-auto max-w-md">
              {t(`steps.${labelKey}.description`)}
            </p>
          </motion.div>
        </div>

        {/* Illustration — always right */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="rounded-pill bg-card shadow-card p-6"
          >
            {children}
          </motion.div>
        </div>
      </div>

      {/* Mobile: stacked layout */}
      <div className="md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="mb-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-pill bg-accent-soft text-accent flex items-center justify-center text-xs font-bold">
              {String(index + 1).padStart(2, "0")}
            </div>
            <h3 className="font-display text-lg font-bold text-strong">
              {t(`steps.${labelKey}.label`)}
            </h3>
            <span className="px-2 py-0.5 rounded-pill text-[10px] font-semibold font-display tabular-nums ml-auto bg-accent-soft text-accent">
              {time}
            </span>
          </div>
          <p className="text-sm text-muted leading-relaxed mb-4">
            {t(`steps.${labelKey}.description`)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease }}
          className="rounded-pill bg-card shadow-card p-4"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Main ProcessFlow Component ─────────────────────────────────────────────
const stepsConfig = [
  { time: "~10s", labelKey: "ingest" as const },
  { time: "15-45s", labelKey: "mira" as const },
  { time: "45-90s", labelKey: "dossier" as const },
  { time: "Instant", labelKey: "audit" as const },
];

const animComponents = [DocumentIngestionAnim, PolicyLogicAnim, DecisionDossierAnim, AuditTrailAnim];

export function ProcessFlow() {
  const t = useTranslations("processFlow");
  const sectionRef = useRef<HTMLElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const stepElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [dotOffsets, setDotOffsets] = useState<number[]>([]);

  const measure = useCallback(() => {
    const container = stepsContainerRef.current;
    if (!container) return;
    const containerTop = container.getBoundingClientRect().top;
    const offsets = stepElsRef.current.map((el) => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      return rect.top + rect.height / 2 - containerTop;
    });
    setDotOffsets(offsets);
  }, []);

  // Measure on mount, resize, and after layout settles
  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    const timer = setTimeout(measure, 500);
    return () => { window.removeEventListener("resize", measure); clearTimeout(timer); };
  }, [measure]);

  const handleStepMount = useCallback((index: number, el: HTMLDivElement | null) => {
    stepElsRef.current[index] = el;
    // Re-measure after each step mounts
    requestAnimationFrame(() => measure());
  }, [measure]);

  // Scroll progress scoped to the steps area for the vertical progress line
  const { scrollYProgress } = useScroll({
    target: stepsContainerRef,
    offset: ["start 0.7", "end 0.5"],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
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

        {/* Steps with vertical progress line */}
        <div ref={stepsContainerRef} className="relative">

          {/* Vertical progress track — centred between the two columns (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px">
            {/* Background track */}
            <div className="absolute inset-0 bg-line" />
            {/* Scroll-filled track */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-accent"
              style={{ height: progressHeight }}
            />
            {/* Step dots — positioned at measured vertical centres */}
            {dotOffsets.length > 0 && stepsConfig.map((step, i) => (
              <div key={step.labelKey}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-ta-blue bg-page z-10"
                style={{ top: `${dotOffsets[i]}px` }}
              />
            ))}
          </div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-24">
            {stepsConfig.map((step, index) => {
              const AnimComponent = animComponents[index];
              return (
                <StepSection
                  key={step.labelKey}
                  index={index}
                  time={step.time}
                  labelKey={step.labelKey}
                  onMount={handleStepMount}
                >
                  <AnimComponentWrapper Component={AnimComponent} />
                </StepSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Wrapper to connect InView state to animated component
function AnimComponentWrapper({ Component }: { Component: React.ComponentType<{ active: boolean }> }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref}>
      <Component active={isInView} />
    </div>
  );
}
