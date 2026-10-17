"use client";

import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SCENE_CARD } from "@/components/content/surface";
import { cn } from "@/lib/utils";
import { BAR, type Outcome } from "./marks";

export type BenchLine = {
  kind: Outcome;
  description: string;
  status: string;
  amount: string;
  range: string;
  /** Where the line lands on the distribution, as a percentage from the left. */
  position: number;
  marker: string;
  foot: { label: string; value: string; ok?: boolean }[];
};

export type LineBenchSceneData = {
  alt: string;
  label: string;
  rangeLabel: string;
  axis: { low: string; high: string };
  bars: number[];
  lines: BenchLine[];
};

const RING: Record<Outcome, string> = {
  approved: "shadow-[0_0_0_1.5px_var(--accent)]",
  referred: "shadow-[0_0_0_1.5px_var(--ta-referred-base)]",
  denied: "shadow-[0_0_0_1.5px_var(--ta-denied-base)]",
};

const PIN: Record<Outcome, { line: string; dot: string; text: string }> = {
  approved: { line: "bg-ta-blue-700", dot: "bg-ta-blue-700 shadow-[0_0_0_4px_rgba(81,81,219,.18)]", text: "text-ta-blue-700" },
  referred: { line: "bg-referred-base", dot: "bg-referred-base shadow-[0_0_0_4px_rgba(255,170,54,.2)]", text: "text-referred-dark" },
  denied: { line: "bg-denied-base", dot: "bg-denied-base shadow-[0_0_0_4px_rgba(233,65,25,.18)]", text: "text-denied-base" },
};

/** The expected range covers the three middle bars of the distribution. */
const BAND = 3;
const CYCLE_MS = 5000;
const EASE = [0.4, 0, 0.2, 1] as const;

/**
 * Invoice lines on the left; the detail on the right shows how far the chosen
 * line sits from the expected range and what bringing it in line saves. The
 * scene plays through the lines on its own until the visitor picks one; the
 * pin arrives off the mark, hovers, then slides and settles on the line's
 * actual deviation.
 */
export function LineBenchScene({ data }: { data: LineBenchSceneData }) {
  const baseId = useId();
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState(() => Math.max(0, data.lines.findIndex((line) => line.kind !== "approved")));
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || reduced || data.lines.length < 2) return;
    const timer = window.setInterval(() => setSelected((index) => (index + 1) % data.lines.length), CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [auto, reduced, data.lines.length]);

  const line = data.lines[selected];
  if (!line) return null;
  const pin = PIN[line.kind];
  const bandStart = Math.floor((data.bars.length - BAND) / 2);
  const inBand = (index: number) => index >= bandStart && index < bandStart + BAND;
  const bandLeft = (bandStart / data.bars.length) * 100;
  const bandWidth = (BAND / data.bars.length) * 100;
  // The pin appears away from its mark, holds, then settles where the line really sits.
  const start = Math.min(92, line.position + 18);

  return (
    <div
      role="group"
      aria-label={data.alt}
      className={cn(SCENE_CARD, "grid sm:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]")}
    >
      <div className="border-b border-hairline bg-page px-4 py-4 sm:border-b-0 sm:border-r md:px-5 md:py-5">
        <p className="mb-3 text-[10.5px] font-medium uppercase tracking-[.12em] text-subtle">{data.label}</p>
        <ul>
          {data.lines.map((item, index) => {
            const on = index === selected;
            return (
              <li key={item.description}>
                <button
                  type="button"
                  aria-pressed={on}
                  aria-controls={`${baseId}-detail`}
                  onClick={() => {
                    setAuto(false);
                    setSelected(index);
                  }}
                  className={cn(
                    "my-1 grid w-full grid-cols-[6px_minmax(0,1fr)_auto] items-center gap-3 rounded-[8px] p-3 text-left transition-[background-color,box-shadow] duration-300 ease-brand focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus",
                    on ? cn("bg-white", RING[item.kind]) : "hover:bg-white",
                  )}
                >
                  <span aria-hidden className={cn("h-7 w-1.5 rounded-[3px]", BAR[item.kind])} />
                  <span className="min-w-0">
                    <span className="block truncate text-[13.5px] font-medium text-strong">{item.description}</span>
                    <span className="block text-[11.5px] text-subtle">{item.status}</span>
                  </span>
                  <span className="whitespace-nowrap text-right text-[13.5px] font-medium tabular-nums text-strong">{item.amount}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <motion.div
        key={line.description}
        id={`${baseId}-detail`}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="px-4 py-4 md:px-6 md:py-5"
      >
        <p className="font-display text-[16px] font-semibold leading-[1.2] text-strong">{line.description}</p>
        <p className="mt-1 text-[12px] text-subtle">{line.range}</p>
        <div className="relative mb-1 mt-7 h-[200px] sm:h-[260px]">
          <div
            className="absolute bottom-[30px] top-0 bg-lilac opacity-75"
            style={{ left: `${bandLeft}%`, width: `${bandWidth}%` }}
          >
            <span className="absolute -bottom-6 left-0 right-0 whitespace-nowrap text-center text-[10px] font-medium uppercase tracking-[.12em] text-accent">
              {data.rangeLabel}
            </span>
          </div>
          <div className="absolute bottom-[30px] left-0 right-0 top-0 flex items-end gap-[5px] px-[2%]">
            {data.bars.map((height, index) => (
              <motion.i
                key={index}
                aria-hidden
                className={cn("block flex-1 origin-bottom", inBand(index) ? "bg-ta-blue-200" : "bg-ta-neutral-200")}
                style={{ height: `${height}%` }}
                initial={reduced ? false : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.045, ease: EASE }}
              />
            ))}
          </div>
          <motion.div
            key={`${line.description}-pin`}
            className="absolute -top-2 bottom-[30px] w-0"
            initial={reduced ? { left: `${line.position}%`, opacity: 1 } : { left: `${start}%`, opacity: 0, y: -14 }}
            animate={
              reduced
                ? { left: `${line.position}%`, opacity: 1 }
                : { left: [`${start}%`, `${start}%`, `${line.position}%`], opacity: [0, 1, 1], y: [-14, 0, 0] }
            }
            transition={reduced ? { duration: 0 } : { duration: 2.4, times: [0, 0.3, 1], ease: EASE }}
          >
            <span aria-hidden className={cn("absolute -left-px bottom-0 top-0 w-[2px]", pin.line)} />
            <span aria-hidden className={cn("absolute -left-2 -top-1.5 h-4 w-4 rounded-full", pin.dot)} />
            <motion.span
              className={cn("absolute -top-1.5 left-4 whitespace-nowrap text-[12.5px] font-medium leading-4", pin.text)}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: reduced ? 0 : 2.3 }}
            >
              {line.marker}
            </motion.span>
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 flex justify-between border-t border-hairline pt-2 text-[11px] text-subtle">
            <span>{data.axis.low}</span>
            <span>{data.axis.high}</span>
          </div>
        </div>
        <dl className="mt-[34px] grid grid-cols-[auto_1fr] items-baseline gap-x-3 gap-y-2 border-t border-hairline pt-3 text-[13px]">
          {line.foot.map((row) => (
            <div key={row.label} className="contents">
              <dt className="text-muted">{row.label}</dt>
              <dd className={cn("text-right font-semibold tabular-nums", row.ok ? "text-approved-dark" : "text-strong")}>{row.value}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </div>
  );
}
