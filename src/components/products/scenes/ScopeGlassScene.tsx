"use client";

import { Check, User } from "lucide-react";
import { useCallback, useRef } from "react";

import { SCENE_CARD } from "@/components/content/surface";
import { cn } from "@/lib/utils";

import { clamp01, easeInOut, easeOut, GlassPause, lerp, seg, spring, u, useGlassLoop } from "./glass";
import g from "./glass.module.css";
import styles from "./ScopeGlassScene.module.css";

export type ScopeGlassData = {
  alt: string;
  title: string;
  dayLabel: string;
  /** Working days the schedule spans. */
  days: number;
  /** In the order the work runs. `start` is the first working day, counted from 1. */
  trades: { name: string; task: string; start: number; length: number; amount: string }[];
  durationLabel: string;
  duration: string;
  totalLabel: string;
  total: string;
  adjuster: { label: string; action: string };
  pause: string;
  play: string;
};

/** The one timing table, in seconds. The schedule draws at constant speed: DAY seconds per working day. */
const DUR = 9.5;
const START_T = 0.8;
const DAY = 0.28;
const SUMS_GAP = 0.4;
const ADJUSTER_GAP = 1.1;
const OUT = [8.5, 9.3];
/** The frame shown under reduced motion: the whole schedule, the total and the adjuster. */
const STILL_T = 7;

const LAYOUTS = ["desktop", "phone"] as const;

type Trade = ScopeGlassData["trades"][number];

/** Collects one stage's elements and returns the function that draws one frame. */
function prepareStage(root: HTMLElement, trades: Trade[], days: number) {
  const all = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
  const rows = all("[data-row]").map((el) => ({
    what: el.querySelector<HTMLElement>("[data-what]")!,
    bar: el.querySelector<HTMLElement>("[data-bar]")!,
    amount: el.querySelector<HTMLElement>("[data-amount]")!,
  }));
  const sums = all("[data-sum]");
  const adjuster = root.querySelector<HTMLElement>("[data-adjuster]")!;
  const end = START_T + days * DAY;

  /** One frame of the loop: every style is a function of t alone, so any t can be shown. */
  return (t: number) => {
    const keep = 1 - easeInOut(seg(t, OUT[0], OUT[1]));
    root.style.setProperty("--sh", `${(34 + 3.2 * Math.sin((2 * Math.PI * t) / DUR)).toFixed(2)}%`);

    rows.forEach((row, i) => {
      const trade = trades[i];
      const t0 = START_T + (trade.start - 1) * DAY;
      const t1 = t0 + trade.length * DAY;
      // Constant speed, no easing: the bar is as long as the days worked so far.
      const drawn = seg(t, t0, t1);
      row.bar.style.transform = `scaleX(${drawn.toFixed(4)})`;
      row.bar.style.opacity = String(drawn > 0 ? keep : 0);
      row.what.style.opacity = String(0.45 + 0.55 * easeOut(seg(t, t0, t0 + 0.3)) * keep);
      const a = easeOut(seg(t, t1, t1 + 0.4)) * keep;
      row.amount.style.opacity = String(a);
      row.amount.style.transform = `translateX(${u(+lerp(10, 0, a).toFixed(1))})`;
    });

    sums.forEach((sum, i) => {
      const t0 = end + SUMS_GAP + i * 0.3;
      const k = clamp01(spring(seg(t, t0, t0 + 0.8), 0.08) * keep * 1.4);
      sum.style.opacity = String(k);
      sum.style.transform = `translateY(${u(+lerp(12, 0, k).toFixed(1))})`;
    });

    const a = spring(seg(t, end + ADJUSTER_GAP, end + ADJUSTER_GAP + 0.8), 0.07) * keep;
    adjuster.style.opacity = String(clamp01(a * 1.5));
    adjuster.style.transform = `translateY(${u(+lerp(18, 0, a).toFixed(1))}) scale(${lerp(0.96, 1, a).toFixed(4)})`;
  };
}

/**
 * The scope of work as a schedule, in the glass look of the platform demo:
 * each trade's bar draws across its working days at constant speed, one
 * starting when the one before it ends, with the amount per trade, the total
 * and the adjuster who releases the scope to the trades.
 *
 * Live HTML in world units with a portrait layout below 480px, a still frame
 * under reduced motion and the figure itself as the pause control (WCAG 2.2.2).
 */
export function ScopeGlassScene({ data }: { data: ScopeGlassData }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { trades, days } = data;
  const prepare = useCallback(
    (root: HTMLElement) => {
      const draws = LAYOUTS.map((name) => prepareStage(root.querySelector<HTMLElement>(`[data-stage="${name}"]`)!, trades, days));
      return (t: number) => draws.forEach((draw) => draw(t));
    },
    [trades, days],
  );
  const { playing, toggle } = useGlassLoop(rootRef, DUR, STILL_T, prepare);
  const dayNumbers = Array.from({ length: days }, (_, i) => i + 1);

  return (
    <div ref={rootRef} className={cn(SCENE_CARD, "@container relative rounded-[10px]")}>
      <div role="img" aria-label={data.alt}>
        {LAYOUTS.map((name) => (
          <div
            key={name}
            data-stage={name}
            className={cn(g.stage, g[name], styles[name], name === "desktop" ? "@max-[480px]:hidden" : "hidden @max-[480px]:block")}
          >
            <div className={g.ground} />
            <div className={g.floor} />
            <div className={styles.world}>
              <div className={cn(g.gloss, styles.panel)}>
                <div className={cn(styles.grid, styles.headrow)}>
                  <p className={styles.title}>{data.title}</p>
                  <div className={styles.track}>
                    <p className={g.lab}>{data.dayLabel}</p>
                    <div className={styles.days}>
                      {dayNumbers.map((day) => (
                        <span key={day}>{day}</span>
                      ))}
                    </div>
                  </div>
                  <span />
                </div>
                {trades.map((trade) => (
                  <div key={trade.name} data-row className={cn(styles.grid, styles.row)}>
                    <span data-what className={styles.what}>
                      <span>{trade.name}</span>
                      <span>{trade.task}</span>
                    </span>
                    <span className={cn(styles.track, styles.lane)} style={{ backgroundSize: `${100 / days}% 100%` }}>
                      <i
                        data-bar
                        style={{ left: `${((trade.start - 1) / days) * 100}%`, width: `${(trade.length / days) * 100}%` }}
                      />
                    </span>
                    <span data-amount className={cn(g.num, styles.amount)}>
                      {trade.amount}
                    </span>
                  </div>
                ))}
                <div className={styles.sums}>
                  <div data-sum className={styles.sum}>
                    <span>{data.durationLabel}</span>
                    <span>{data.duration}</span>
                  </div>
                  <div data-sum className={cn(styles.sum, styles.big)}>
                    <span>{data.totalLabel}</span>
                    <span className={g.num}>{data.total}</span>
                  </div>
                </div>
              </div>
              <div data-adjuster className={cn(g.gloss, g.adjuster, styles.adjuster)}>
                <span className={g.who}>
                  <User aria-hidden strokeWidth={1.5} />
                  {data.adjuster.label}
                </span>
                <span className={g.approve}>
                  <Check aria-hidden strokeWidth={2.2} />
                  {data.adjuster.action}
                </span>
              </div>
            </div>
            <div className={g.vignette} />
          </div>
        ))}
      </div>
      <GlassPause playing={playing} toggle={toggle} pause={data.pause} play={data.play} />
    </div>
  );
}
