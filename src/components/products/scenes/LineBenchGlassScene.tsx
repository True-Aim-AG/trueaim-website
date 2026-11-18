"use client";

import { useCallback, useRef } from "react";

import { SCENE_CARD } from "@/components/content/surface";
import { cn } from "@/lib/utils";

import { clamp01, easeOut, GlassPause, lerp, seg, spring, u, useGlassLoop } from "./glass";
import g from "./glass.module.css";
import styles from "./LineBenchGlassScene.module.css";
import type { LineBenchSceneData } from "./LineBenchScene";

export type LineBenchGlassData = LineBenchSceneData & { pause: string; play: string };

/** The one timing table, in seconds. Each line holds the scene for STEP; the beats below count from the line's start. */
const STEP = 5;
const IN = 0.35;
const PIN_T = 0.5;
const MARKER_T = 1.2;
const FOOT_T = 1.6;
const FOOT_STEP = 0.4;
const OUT = 0.35;

/** The expected range covers the three middle bars of the distribution. */
const BAND = 3;

const LAYOUTS = ["desktop", "phone"] as const;

/** Collects one stage's elements and returns the function that draws one frame. */
function prepareStage(root: HTMLElement, count: number) {
  const all = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
  const rows = all("[data-row]");
  const heads = all("[data-head]");
  const pins = all("[data-pin]").map((el) => ({ el, marker: el.querySelector<HTMLElement>("[data-marker]")! }));
  const feet = all("[data-foot]").map((el) => Array.from(el.querySelectorAll<HTMLElement>("[data-foot-row]")));
  const dur = STEP * count;

  /** One frame of the loop: every style is a function of t alone, so any t can be shown. */
  return (t: number) => {
    root.style.setProperty("--sh", `${(34 + 3.2 * Math.sin((2 * Math.PI * t) / dur)).toFixed(2)}%`);
    for (let i = 0; i < count; i++) {
      // Seconds since this line took the scene; outside its turn everything of it is hidden.
      const local = t - i * STEP;
      const live = local >= 0 && local < STEP;
      const out = live ? 1 - easeOut(seg(local, STEP - OUT, STEP)) : 0;
      const on = live ? easeOut(seg(local, 0, IN)) * out : 0;
      rows[i].style.setProperty("--on", on.toFixed(3));
      heads[i].style.opacity = String(on);
      const drop = spring(seg(local, PIN_T, PIN_T + 0.8), 0.08);
      pins[i].el.style.opacity = String(clamp01(drop * 1.5) * out);
      pins[i].el.style.transform = `translateY(${u(+lerp(-34, 0, drop).toFixed(1))})`;
      pins[i].marker.style.opacity = String(seg(local, MARKER_T, MARKER_T + 0.3) * out);
      feet[i].forEach((row, j) => {
        const k = easeOut(seg(local, FOOT_T + j * FOOT_STEP, FOOT_T + j * FOOT_STEP + 0.4)) * out;
        row.style.opacity = String(k);
        row.style.transform = `translateY(${u(+lerp(8, 0, k).toFixed(1))})`;
      });
    }
  };
}

/**
 * How one invoice line is benchmarked, in the glass look of the platform demo:
 * the scene takes the lines in turn, drops each one's amount onto the
 * distribution of comparable prices for its trade and region, and shows the
 * median, the deviation and, for the line above the expected range, the
 * reissue request drafted for it.
 *
 * Live HTML in world units with a portrait layout below 480px. Under reduced
 * motion it holds the line above the range; the figure itself is the pause
 * control (WCAG 2.2.2).
 */
export function LineBenchGlassScene({ data }: { data: LineBenchGlassData }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const count = data.lines.length;
  const prepare = useCallback(
    (root: HTMLElement) => {
      const draws = LAYOUTS.map((name) => prepareStage(root.querySelector<HTMLElement>(`[data-stage="${name}"]`)!, count));
      return (t: number) => draws.forEach((draw) => draw(t));
    },
    [count],
  );
  // The still frame is the line over the benchmark, with every figure of it in view.
  const high = Math.max(0, data.lines.findIndex((line) => line.kind === "denied"));
  const { playing, toggle } = useGlassLoop(rootRef, STEP * count, high * STEP + 3.6, prepare);

  const bandStart = Math.floor((data.bars.length - BAND) / 2);
  const inBand = (index: number) => index >= bandStart && index < bandStart + BAND;

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
              <div className={cn(g.gloss, styles.lines)}>
                <p className={g.lab}>{data.label}</p>
                {data.lines.map((line) => (
                  <div key={line.description} data-row className={cn(styles.row, g[line.kind])}>
                    <i />
                    <span className={styles.what}>
                      <span className={styles.desc}>{line.description}</span>
                      <span className={styles.status}>{line.status}</span>
                    </span>
                    <span className={g.num}>{line.amount}</span>
                  </div>
                ))}
              </div>

              <div className={cn(g.gloss, styles.detail)}>
                <div className={styles.stack}>
                  {data.lines.map((line) => (
                    <div key={line.description} data-head className={styles.headline}>
                      <p className={styles.title}>{line.description}</p>
                      <p className={styles.sub}>{line.range}</p>
                    </div>
                  ))}
                </div>
                <div className={styles.plot}>
                  <div
                    className={styles.band}
                    style={{ left: `${(bandStart / data.bars.length) * 100}%`, width: `${(BAND / data.bars.length) * 100}%` }}
                  >
                    <span>{data.rangeLabel}</span>
                  </div>
                  <div className={styles.bars}>
                    {data.bars.map((height, index) => (
                      <i key={index} className={inBand(index) ? styles.inband : undefined} style={{ height: `${height}%` }} />
                    ))}
                  </div>
                  {data.lines.map((line) => (
                    <div
                      key={line.description}
                      data-pin
                      className={cn(styles.pin, g[line.kind], line.position > 70 && styles.left)}
                      style={{ left: `${line.position}%` }}
                    >
                      <span data-marker className={styles.marker}>
                        {line.marker}
                      </span>
                    </div>
                  ))}
                  <div className={styles.axis}>
                    <span>{data.axis.low}</span>
                    <span>{data.axis.high}</span>
                  </div>
                </div>
                <div className={styles.stack}>
                  {data.lines.map((line) => (
                    <div key={line.description} data-foot className={styles.foot}>
                      {line.foot.map((row) => (
                        <div key={row.label} data-foot-row className={cn(styles.footrow, row.ok && styles.ok)}>
                          <span>{row.label}</span>
                          <span className={g.num}>{row.value}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
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
