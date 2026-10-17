"use client";

import { useId, useState } from "react";
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
  /** Where the line sits on the distribution, as a percentage from the left. */
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

const MARK: Record<Outcome, string> = {
  approved: "bg-ta-blue-700 text-ta-blue-700 shadow-[0_0_0_4px_rgba(81,81,219,.18)]",
  referred: "bg-referred-base text-referred-dark shadow-[0_0_0_4px_rgba(255,170,54,.2)]",
  denied: "bg-denied-base text-denied-base shadow-[0_0_0_4px_rgba(233,65,25,.18)]",
};

/** Invoice lines on the left; pick one to see how far it sits from the expected range and what that saves. */
export function LineBenchScene({ data }: { data: LineBenchSceneData }) {
  const baseId = useId();
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState(() => Math.max(0, data.lines.findIndex((line) => line.kind !== "approved")));
  const line = data.lines[selected];
  if (!line) return null;
  const inBand = (index: number) => index >= 3 && index <= data.bars.length - 4;
  return (
    <div role="group" aria-label={data.alt} className={cn(SCENE_CARD, "grid sm:grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)]")}>
      <div className="border-b border-hairline bg-page px-3.5 py-3.5 sm:border-b-0 sm:border-r">
        <p className="mb-2.5 text-[10.5px] font-medium uppercase tracking-[.12em] text-subtle">{data.label}</p>
        <ul>
          {data.lines.map((item, index) => {
            const on = index === selected;
            return (
              <li key={item.description}>
                <button
                  type="button"
                  aria-pressed={on}
                  aria-controls={`${baseId}-detail`}
                  onClick={() => setSelected(index)}
                  className={cn(
                    "my-1 grid w-full grid-cols-[6px_minmax(0,1fr)_auto] items-center gap-2.5 rounded-[8px] p-2.5 text-left transition-[background-color,box-shadow] duration-150 ease-brand focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus",
                    on ? cn("bg-white", RING[item.kind]) : "hover:bg-white",
                  )}
                >
                  <span aria-hidden className={cn("h-6 w-1.5 rounded-[3px]", BAR[item.kind])} />
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-strong">{item.description}</span>
                    <span className="block text-[11px] text-subtle">{item.status}</span>
                  </span>
                  <span className="whitespace-nowrap text-right font-medium tabular-nums text-strong">{item.amount}</span>
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
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="px-3.5 py-3.5"
      >
        <p className="font-display text-[14px] font-semibold leading-[1.2] text-strong">{line.description}</p>
        <p className="mt-1 text-[11.5px] text-subtle">{line.range}</p>
        <div className="relative mb-1 mt-[22px] h-[150px]">
          <div className="absolute bottom-[30px] left-[23%] right-[23%] top-0 bg-lilac opacity-75">
            <span className="absolute -bottom-6 left-0 right-0 hidden whitespace-nowrap text-center text-[10px] font-medium uppercase tracking-[.12em] text-accent sm:block">
              {data.rangeLabel}
            </span>
          </div>
          <div className="absolute bottom-[30px] left-0 right-0 top-0 flex items-end gap-[5px] px-[2%]">
            {data.bars.map((height, index) => (
              <i
                key={index}
                aria-hidden
                className={cn("flex-1", inBand(index) ? "bg-ta-blue-200" : "bg-ta-neutral-200")}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="absolute -top-2 bottom-[30px] w-0" style={{ left: `${line.position}%` }}>
            <span aria-hidden className={cn("absolute -left-px bottom-0 top-0 w-[2px]", MARK[line.kind].split(" ")[0])} />
            <span aria-hidden className={cn("absolute -left-2 -top-1.5 h-4 w-4 rounded-full", MARK[line.kind])} />
            <span className={cn("absolute -top-1.5 left-4 whitespace-nowrap text-[12px] font-medium leading-4", MARK[line.kind].split(" ")[1])}>
              {line.marker}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex justify-between border-t border-hairline pt-2 text-[11px] text-subtle">
            <span>{data.axis.low}</span>
            <span>{data.axis.high}</span>
          </div>
        </div>
        <dl className="mt-[30px] grid grid-cols-[auto_1fr] items-baseline gap-x-3 gap-y-1.5 border-t border-hairline pt-3 text-[12.5px]">
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
