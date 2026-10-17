"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { SCENE_CARD } from "@/components/content/surface";
import { cn } from "@/lib/utils";
import { HexCheck } from "./marks";

export type RecordActor = "agent" | "engine" | "human";

export type RecordSceneData = {
  alt: string;
  title: string;
  subtitle: string;
  tabs: { timeline: string; forensic: string };
  phases: string[];
  rows: { time: string; actor: RecordActor; who: string; text: string; hash: string }[];
  groups: Record<RecordActor, string>;
  actions: { one: string; many: string };
  verified: string;
  exportLabel: string;
};

const WHO: Record<RecordActor, string> = {
  agent: "text-ta-blue-700",
  engine: "text-strong",
  human: "text-approved-dark",
};

const GROUP_EDGE: Record<RecordActor, string> = {
  agent: "border-accent",
  engine: "border-ta-dark",
  human: "border-approved-base",
};

const ORDER: RecordActor[] = ["agent", "engine", "human"];

/** The claim record: every action in order with its actor and its hash, and a forensic view grouped by actor. */
export function RecordScene({ data }: { data: RecordSceneData }) {
  const [view, setView] = useState<"time" | "actor">("time");
  return (
    <div role="group" aria-label={data.alt} className={SCENE_CARD}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline bg-surface-muted px-3.5 py-3">
        <div>
          <p className="font-display text-[15px] font-semibold leading-[1.2] text-strong">{data.title}</p>
          <p className="mt-1 text-[11.5px] text-subtle">{data.subtitle}</p>
        </div>
        <div className="inline-flex rounded-pill bg-white p-[3px] shadow-[inset_0_0_0_1px_var(--border-hairline)]">
          {(["time", "actor"] as const).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={view === key}
              onClick={() => setView(key)}
              className={cn(
                "rounded-pill px-3 py-[7px] text-[12px] font-medium leading-none transition-colors duration-150 ease-brand focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus",
                view === key ? "bg-accent text-on-brand" : "text-muted hover:text-strong",
              )}
            >
              {key === "time" ? data.tabs.timeline : data.tabs.forensic}
            </button>
          ))}
        </div>
      </div>
      <ol className="flex border-b border-black/5 px-3.5 pb-1.5 pt-3.5">
        {data.phases.map((phase) => (
          <li
            key={phase}
            className="relative flex-1 pt-[18px] text-center text-[8.5px] font-medium uppercase tracking-[.06em] text-subtle before:absolute before:left-0 before:right-0 before:top-1 before:h-[1.5px] before:bg-ta-blue-100 before:content-[''] first:before:left-1/2 last:before:right-1/2 sm:text-[10px]"
          >
            <i aria-hidden className="absolute left-1/2 top-0 h-2.5 w-2.5 -ml-[5px] rounded-full bg-accent shadow-[0_0_0_3px_var(--ta-blue-100)]" />
            {phase}
          </li>
        ))}
      </ol>
      {view === "time" ? (
        <ol className="py-1">
          {data.rows.map((row) => (
            <li
              key={row.hash}
              className="grid grid-cols-[52px_minmax(0,1fr)] items-center gap-2.5 border-b border-black/5 px-3.5 py-[9px] text-[12.5px] sm:grid-cols-[58px_84px_minmax(0,1fr)_44px]"
            >
              <span className="tabular-nums text-subtle">{row.time}</span>
              <span className={cn("text-[11.5px] font-medium leading-[1.2]", WHO[row.actor])}>{row.who}</span>
              <span className="col-start-2 leading-[1.35] text-strong sm:col-start-auto">{row.text}</span>
              <span className="hidden text-right text-[11px] text-subtle sm:block">#{row.hash}</span>
            </li>
          ))}
        </ol>
      ) : (
        <div className="py-1">
          {ORDER.map((actor) => {
            const rows = data.rows.filter((row) => row.actor === actor);
            if (rows.length === 0) return null;
            return (
              <div key={actor}>
                <p
                  className={cn(
                    "mt-1.5 flex justify-between border-l-[3px] bg-surface-muted px-3.5 py-2 text-[12px] font-semibold leading-none text-strong",
                    GROUP_EDGE[actor],
                  )}
                >
                  <span>{data.groups[actor]}</span>
                  <span className="font-normal text-muted">
                    {rows.length} {rows.length === 1 ? data.actions.one : data.actions.many}
                  </span>
                </p>
                <ol>
                  {rows.map((row) => (
                    <li
                      key={row.hash}
                      className="grid grid-cols-[52px_minmax(0,1fr)] items-center gap-2.5 border-b border-black/5 px-3.5 py-[9px] text-[12.5px] sm:grid-cols-[58px_minmax(0,1fr)_44px]"
                    >
                      <span className="tabular-nums text-subtle">{row.time}</span>
                      <span className="leading-[1.35] text-strong">{row.text}</span>
                      <span className="hidden text-right text-[11px] text-subtle sm:block">#{row.hash}</span>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
      )}
      <p className="flex items-center gap-2 px-3.5 py-2.5 text-[12px] text-approved-dark">
        <HexCheck className="h-[18px] w-[18px]" />
        <span>{data.verified}</span>
      </p>
      <div className="flex items-center justify-end border-t border-hairline bg-page px-3.5 py-3">
        <span className="inline-flex items-center gap-2 rounded-pill bg-white px-3 py-1.5 text-[12px] font-medium text-ta-blue-700 shadow-[inset_0_0_0_1px_var(--ta-blue-200)]">
          <Download className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
          {data.exportLabel}
        </span>
      </div>
    </div>
  );
}
