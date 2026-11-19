"use client";

import { Download } from "lucide-react";
import { useCallback, useRef } from "react";

import { cn } from "@/lib/utils";

import { clamp01, easeInOut, easeOut, GlassPause, lerp, seg, spring, u, useGlassLoop } from "./glass";
import g from "./glass.module.css";
import { HexCheck } from "./marks";
import styles from "./RecordGlassScene.module.css";
import type { RecordActor, RecordSceneData } from "./RecordScene";

export type RecordGlassData = RecordSceneData & { pause: string; play: string };

/** The one timing table, in seconds. */
const DUR = 13.2;
/** The timeline: one action lands every ROW seconds. */
const START_T = 0.6;
const ROW = 0.7;
/** The forensic view: one action leaves for its actor's group every MOVE seconds and takes TRAVEL to arrive. */
const MOVE_T = 5.2;
const MOVE = 0.65;
const TRAVEL = 0.55;
const VERIFIED_GAP = 0.5;
const EXPORT_GAP = 1;
const OUT = [12, 12.8];
/** The frame shown under reduced motion: both views complete, the check line and the export. */
const STILL_T = 11;

const LAYOUTS = ["desktop", "phone"] as const;
const ORDER: RecordActor[] = ["agent", "engine", "human"];

type Row = RecordSceneData["rows"][number];

/** Collects and measures one stage's elements and returns the function that draws one frame. */
function prepareStage(root: HTMLElement, rows: Row[], actions: RecordSceneData["actions"]) {
  const all = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
  const landed = all("[data-row]");
  const phases = all("[data-phase]");
  const progress = root.querySelector<HTMLElement>("[data-progress]")!;
  const slots = all("[data-slot]");
  const dots = all("[data-dot]");
  const counts = all("[data-count]");
  const verified = root.querySelector<HTMLElement>("[data-verified]");
  const exported = root.querySelector<HTMLElement>("[data-export]")!;
  const count = rows.length;

  // Each action travels from its line in the timeline to its line in the forensic view.
  const base = root.getBoundingClientRect();
  const paths = rows.map((row, i) => {
    const from = landed[i]?.querySelector<HTMLElement>("[data-hash]")?.getBoundingClientRect();
    const to = slots.find((slot) => slot.dataset.slot === String(i))?.getBoundingClientRect();
    if (!from || !to || from.width === 0) return null;
    return {
      sx: from.left + from.width / 2 - base.left,
      sy: from.top + from.height / 2 - base.top,
      ex: to.left - base.left,
      ey: to.top + to.height / 2 - base.top,
    };
  });
  const moved = MOVE_T + (count - 1) * MOVE + TRAVEL;

  /** One frame of the loop: every style is a function of t alone, so any t can be shown. */
  return (t: number) => {
    const keep = 1 - easeInOut(seg(t, OUT[0], OUT[1]));
    root.style.setProperty("--sh", `${(34 + 3.2 * Math.sin((2 * Math.PI * t) / DUR)).toFixed(2)}%`);

    landed.forEach((el, i) => {
      const t0 = START_T + i * ROW;
      const a = easeOut(seg(t, t0, t0 + 0.45)) * keep;
      el.style.opacity = String(a);
      el.style.transform = `translateY(${u(+lerp(10, 0, a).toFixed(1))})`;
    });
    phases.forEach((el, i) => {
      const t0 = START_T + ((count - 1) * ROW * i) / Math.max(1, phases.length - 1);
      el.style.setProperty("--on", (easeOut(seg(t, t0, t0 + 0.3)) * keep).toFixed(3));
    });
    progress.style.transform = `scaleX(${(seg(t, START_T, START_T + (count - 1) * ROW) * keep).toFixed(4)})`;

    const arrived: Record<string, number> = {};
    slots.forEach((el) => {
      const i = Number(el.dataset.slot);
      const leave = MOVE_T + i * MOVE;
      const a = easeOut(seg(t, leave + TRAVEL - 0.1, leave + TRAVEL + 0.35)) * keep;
      el.style.opacity = String(a);
      el.style.transform = `translateX(${u(+lerp(-14, 0, a).toFixed(1))})`;
      if (t >= leave + TRAVEL && keep > 0.5) arrived[rows[i].actor] = (arrived[rows[i].actor] ?? 0) + 1;
    });
    counts.forEach((el) => {
      const n = arrived[el.dataset.count!] ?? 0;
      const text = `${n} ${n === 1 ? actions.one : actions.many}`;
      if (el.textContent !== text) el.textContent = text;
      el.style.opacity = String(n > 0 ? 1 : 0);
    });
    dots.forEach((el) => {
      const i = Number(el.dataset.dot);
      const path = paths[i];
      const leave = MOVE_T + i * MOVE;
      const k = seg(t, leave, leave + TRAVEL);
      if (!path || k <= 0 || k >= 1) {
        el.style.opacity = "0";
        return;
      }
      const e = easeInOut(k);
      el.style.opacity = String(Math.sin(Math.PI * k) * keep);
      el.style.transform = `translate(${lerp(path.sx, path.ex, e).toFixed(1)}px, ${lerp(path.sy, path.ey, e).toFixed(1)}px)`;
    });

    if (verified) {
      const a = clamp01(spring(seg(t, moved + VERIFIED_GAP, moved + VERIFIED_GAP + 0.8), 0.08) * keep * 1.4);
      verified.style.opacity = String(a);
      verified.style.transform = `translateY(${u(+lerp(12, 0, a).toFixed(1))})`;
    }
    const a = spring(seg(t, moved + EXPORT_GAP, moved + EXPORT_GAP + 0.8), 0.07) * keep;
    exported.style.opacity = String(clamp01(a * 1.5));
    exported.style.transform = `translateY(${u(+lerp(14, 0, a).toFixed(1))}) scale(${lerp(0.96, 1, a).toFixed(4)})`;
  };
}

/**
 * The claim record in the glass look of the platform demo, as two views of the
 * same actions: the timeline, where every action lands in order with its time,
 * its author and its hash, and the forensic view, where each action then joins
 * the group of the actor who made it and the group's count goes up.
 *
 * Live HTML in world units with a portrait layout below 480px, a still frame
 * under reduced motion and the figure itself as the pause control (WCAG 2.2.2).
 */
export function RecordGlassScene({ data }: { data: RecordGlassData }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { rows, actions } = data;
  const prepare = useCallback(
    (root: HTMLElement) => {
      const draws = LAYOUTS.map((name) => prepareStage(root.querySelector<HTMLElement>(`[data-stage="${name}"]`)!, rows, actions));
      return (t: number) => draws.forEach((draw) => draw(t));
    },
    [rows, actions],
  );
  const { playing, toggle } = useGlassLoop(rootRef, DUR, STILL_T, prepare);

  return (
    <div ref={rootRef} className="@container relative">
      <div role="img" aria-label={data.alt}>
        {LAYOUTS.map((name) => (
          <div
            key={name}
            data-stage={name}
            className={cn(g.stage, g[name], styles[name], name === "desktop" ? "@max-[480px]:hidden" : "hidden @max-[480px]:block")}
          >
            <div className={styles.world}>
              <div className={cn(g.gloss, styles.panel)}>
                <p className={g.lab}>{data.tabs.timeline}</p>
                <p className={styles.title}>{data.title}</p>
                <p className={styles.sub}>{data.subtitle}</p>
                <div className={styles.phases}>
                  <i data-progress className={styles.progress} />
                  {data.phases.map((phase) => (
                    <span key={phase} data-phase className={styles.phase}>
                      <i />
                      {phase}
                    </span>
                  ))}
                </div>
                {rows.map((row) => (
                  <div key={row.hash} data-row className={cn(styles.row, styles[row.actor])}>
                    <span className={styles.what}>
                      <span className={styles.meta}>
                        <span className={styles.who}>{row.who}</span>
                        <span className={g.num}>{row.time}</span>
                      </span>
                      <span>{row.text}</span>
                    </span>
                    <span data-hash className={cn(g.num, styles.hash)}>
                      #{row.hash}
                    </span>
                  </div>
                ))}
                {data.verified && (
                  <p data-verified className={styles.verified}>
                    <HexCheck className={styles.check} />
                    <span>{data.verified}</span>
                  </p>
                )}
              </div>

              <div className={cn(g.gloss, styles.panel)}>
                <p className={g.lab}>{data.tabs.forensic}</p>
                {ORDER.map((actor) => {
                  const own = rows.map((row, i) => ({ row, i })).filter(({ row }) => row.actor === actor);
                  if (own.length === 0) return null;
                  return (
                    <div key={actor} className={cn(styles.group, styles[actor])}>
                      <p className={styles.grouphead}>
                        <span>{data.groups[actor]}</span>
                        <span data-count={actor} className={g.num}>
                          {own.length} {own.length === 1 ? actions.one : actions.many}
                        </span>
                      </p>
                      {own.map(({ row, i }) => (
                        <div key={row.hash} data-slot={i} className={styles.row}>
                          <span className={styles.what}>
                            <span className={styles.meta}>
                              <span className={g.num}>{row.time}</span>
                            </span>
                            <span>{row.text}</span>
                          </span>
                          <span className={cn(g.num, styles.hash)}>#{row.hash}</span>
                        </div>
                      ))}
                    </div>
                  );
                })}
                <div className={styles.foot}>
                  <span data-export className={cn(g.gloss, styles.export)}>
                    <Download aria-hidden strokeWidth={1.6} />
                    {data.exportLabel}
                  </span>
                </div>
              </div>
            </div>
            {rows.map((row, i) => (
              <i key={row.hash} data-dot={i} className={cn(styles.dot, styles[row.actor])} />
            ))}
          </div>
        ))}
      </div>
      <GlassPause playing={playing} toggle={toggle} pause={data.pause} play={data.play} side="left" />
    </div>
  );
}
