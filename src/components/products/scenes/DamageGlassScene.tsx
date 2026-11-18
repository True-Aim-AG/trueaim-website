"use client";

import { Check, Image as ImageIcon, Play, User } from "lucide-react";
import { type CSSProperties, useCallback, useRef } from "react";

import { SCENE_CARD, SCENE_CARD_HERO } from "@/components/content/surface";
import { cn } from "@/lib/utils";

import { clamp01, easeInOut, easeOut, GlassPause, lerp, seg, spring, u, useGlassLoop } from "./glass";
import g from "./glass.module.css";
import styles from "./DamageGlassScene.module.css";

export type DamageGlassData = {
  alt: string;
  photosLabel: string;
  /** One photograph or video per report line, in the order of the lines. */
  files: { name: string; size: string; kind?: "video" }[];
  title: string;
  subtitle: string;
  columns: { item: string; quantity: string; amount: string };
  lines: { item: string; finding: string; quantity: string; amount: string }[];
  estimateLabel: string;
  estimate: string;
  adjuster: { label: string; action: string };
  pause: string;
  play: string;
};

/** The one timing table: every beat of the loop, in seconds. */
const DUR = 12;
const FILE_T = 0.8;
const FILE_STEP = 1.3;
const PRICE_T = 6.3;
const PRICE_STEP = 0.3;
const ESTIMATE_T = 7.7;
const ADJUSTER_T = 8.5;
const OUT = [11.0, 11.8];
/** The frame shown under reduced motion: the report written and priced, the adjuster in view. */
const STILL_T = 9.8;

const LINK = "#5151DB";

type Layout = { name: "desktop" | "phone"; ww: number; wh: number; vars: Record<string, number | number[]> };

const LAYOUTS: Layout[] = [
  { name: "desktop", ww: 1300, wh: 1000, vars: { pad: 40, gap: 18, cols: [0, 96, 110], rh: 98, fs: 25, fb: 34, ft: 22, fa: 22, fh: 16, fti: 34 } },
  { name: "phone", ww: 720, wh: 1100, vars: { pad: 30, gap: 14, cols: [0, 104, 110], rh: 96, fs: 27, fb: 34, ft: 24, fa: 24, fh: 17, fti: 36 } },
];

function cssVars(vars: Layout["vars"]): CSSProperties {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(vars)) {
    out[`--${key}`] = Array.isArray(value) ? value.map((v) => (v ? u(v) : "minmax(0,1fr)")).join(" ") : u(value);
  }
  return out as CSSProperties;
}

/** Collects one stage's elements, draws its connectors, and returns the function that draws one frame. */
function prepareStage(root: HTMLElement, layout: Layout) {
  const all = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
  const one = (sel: string) => root.querySelector<HTMLElement>(sel)!;
  const files = all("[data-file]").map((el) => ({ el, done: el.querySelector<HTMLElement>("[data-done]")! }));
  const rows = all("[data-row]").map((el) => ({
    what: el.querySelector<HTMLElement>("[data-what]")!,
    priced: Array.from(el.querySelectorAll<HTMLElement>("[data-priced]")),
  }));
  const estimate = { label: one("[data-estimate]").children[0] as HTMLElement, value: one("[data-estimate]").children[1] as HTMLElement };
  const adjuster = one("[data-adjuster]");
  const pieces = all("[data-piece]");
  const paths = Array.from(root.querySelectorAll<SVGPathElement>("[data-path]"));
  const ends = Array.from(root.querySelectorAll<SVGCircleElement>("[data-end]"));

  // Each connector runs from a photograph to the report line written from it, in world units.
  let lengths: number[] = [];
  const box = root.getBoundingClientRect();
  if (box.width && layout.name === "desktop") {
    const k = box.width / layout.ww;
    const at = (el: Element) => {
      const r = el.getBoundingClientRect();
      return { x: (r.left - box.left) / k, y: (r.top - box.top) / k, w: r.width / k, h: r.height / k };
    };
    const photos = at(one("[data-photos]"));
    const report = at(one("[data-report]"));
    lengths = paths.map((path, i) => {
      const from = at(files[i].el);
      const to = at(rows[i].what);
      const sx = photos.x + photos.w + 10;
      const sy = from.y + from.h / 2;
      const ex = report.x - 10;
      const ey = to.y + to.h / 2;
      const mx = (sx + ex) / 2;
      path.setAttribute("d", `M${sx} ${sy} C ${mx} ${sy}, ${mx} ${ey}, ${ex} ${ey}`);
      ends[i].setAttribute("cx", String(ex));
      ends[i].setAttribute("cy", String(ey));
      const length = path.getTotalLength();
      path.setAttribute("stroke-dasharray", String(length));
      return length;
    });
  }

  /** One frame of the loop: every style is a function of t alone, so any t can be shown. */
  return (t: number) => {
    const keep = 1 - easeInOut(seg(t, OUT[0], OUT[1]));
    const drift = -8 * Math.sin((2 * Math.PI * t) / DUR);
    root.style.setProperty("--sh", `${(34 - drift * 0.4).toFixed(2)}%`);
    pieces.forEach((el, i) => {
      el.style.transform = `translateX(${u(+(drift * (i ? 0.3 : 0.45)).toFixed(2))}) scale(${i ? 0.88 : 0.92})`;
    });

    files.forEach((file, i) => {
      const t0 = FILE_T + i * FILE_STEP;
      // The photograph is lit while it is read, then marked as read.
      const on = easeOut(seg(t, t0, t0 + 0.3)) * (1 - easeOut(seg(t, t0 + 1.0, t0 + 1.3))) * keep;
      const done = easeOut(seg(t, t0 + 0.5, t0 + 0.8)) * keep;
      file.el.style.setProperty("--on", on.toFixed(3));
      file.el.style.opacity = String(0.55 + 0.45 * Math.max(on, done));
      file.done.style.opacity = String(done);
      file.done.style.transform = `scale(${lerp(0.6, 1, spring(seg(t, t0 + 0.5, t0 + 1.1), 0.12)).toFixed(3)})`;

      if (lengths[i]) {
        const d = easeInOut(seg(t, t0 + 0.5, t0 + 1.1));
        paths[i].setAttribute("stroke-dashoffset", String(lengths[i] * (1 - d)));
        paths[i].setAttribute("opacity", String(keep));
        ends[i].setAttribute("opacity", String(clamp01((d - 0.85) * 8) * keep));
      }

      const row = rows[i];
      if (!row) return;
      const w = easeOut(seg(t, t0 + 0.9, t0 + 1.3)) * keep;
      row.what.style.opacity = String(w);
      row.what.style.transform = `translateX(${u(+lerp(-12, 0, w).toFixed(1))})`;
      const p = easeOut(seg(t, PRICE_T + i * PRICE_STEP, PRICE_T + i * PRICE_STEP + 0.4)) * keep;
      row.priced.forEach((el) => {
        el.style.opacity = String(p);
        el.style.transform = `translateX(${u(+lerp(10, 0, p).toFixed(1))})`;
      });
    });

    const e = clamp01(spring(seg(t, ESTIMATE_T, ESTIMATE_T + 0.8), 0.08) * keep * 1.4);
    estimate.label.style.opacity = String(0.3 + 0.7 * e);
    estimate.value.style.opacity = String(e);
    estimate.value.style.transform = `translateY(${u(+lerp(12, 0, e).toFixed(1))})`;

    const a = spring(seg(t, ADJUSTER_T, ADJUSTER_T + 0.8), 0.07) * keep;
    adjuster.style.opacity = String(clamp01(a * 1.5));
    adjuster.style.transform = `translateY(${u(+lerp(18, 0, a).toFixed(1))}) scale(${lerp(0.96, 1, a).toFixed(4)})`;
  };
}

/**
 * The AI Damage Assessment and Reporting hero, in the glass look of the
 * platform demo: the customer's photographs and video are read one after the other,
 * each finding is written into the damage report, the scope of work is
 * priced, and the adjuster reviews the report.
 *
 * Live HTML in world units, as the other glass heroes: translated text, a
 * portrait layout below 480px, a still frame under reduced motion and the
 * figure itself as the pause control (WCAG 2.2.2).
 */
export function DamageGlassScene({ data, still }: {
  data: DamageGlassData;
  /** A picture, not a film: the finished frame of the desktop layout at any width, with no pause control. */
  still?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prepare = useCallback((root: HTMLElement) => {
    const draws = LAYOUTS.map((layout) => prepareStage(root.querySelector<HTMLElement>(`[data-stage="${layout.name}"]`)!, layout));
    return (t: number) => draws.forEach((draw) => draw(t));
  }, []);
  const { playing, toggle } = useGlassLoop(rootRef, DUR, STILL_T, prepare, still);

  return (
    <div ref={rootRef} className={cn(SCENE_CARD, SCENE_CARD_HERO, "@container relative rounded-[10px]")}>
      <div role="img" aria-label={data.alt}>
        {LAYOUTS.map((layout) => (
          <div
            key={layout.name}
            data-stage={layout.name}
            className={cn(
              g.stage,
              g[layout.name],
              styles[layout.name],
              still ? layout.name !== "desktop" && "hidden" : layout.name === "desktop" ? "@max-[480px]:hidden" : "hidden @max-[480px]:block",
            )}
            style={cssVars(layout.vars)}
          >
            <div className={g.ground} />
            <div className={g.floor} />
            <div data-piece className={g.piece} style={{ left: "70%", top: "4%", width: "50%", height: "36%" }}>
              <i style={{ top: u(40), width: "45%", height: u(18) }} />
              <i style={{ top: u(90), width: "80%", height: u(9) }} />
              <i style={{ top: u(124), width: "66%", height: u(9) }} />
            </div>
            <div data-piece className={g.piece} style={{ left: "-22%", top: "62%", width: "50%", height: "38%" }}>
              <i style={{ top: u(40), width: "42%", height: u(18) }} />
              <i style={{ top: u(96), width: "78%", height: u(9) }} />
              <i style={{ top: u(130), width: "66%", height: u(9) }} />
            </div>

            <div className={styles.world}>
              <div className={styles.side}>
                <div data-photos className={cn(g.gloss, styles.photos)}>
                  <p className={g.lab}>{data.photosLabel}</p>
                  {data.files.map((file) => (
                    <div key={file.name} data-file className={styles.file}>
                      <span className={styles.thumb}>
                        {file.kind === "video" ? <Play aria-hidden strokeWidth={1.5} /> : <ImageIcon aria-hidden strokeWidth={1.5} />}
                      </span>
                      <span className={styles.name}>
                        <span>{file.name}</span>
                        <span>{file.size}</span>
                      </span>
                      <span data-done className={styles.done}>
                        <Check aria-hidden strokeWidth={2.6} />
                      </span>
                    </div>
                  ))}
                </div>
                <div data-adjuster className={cn(g.gloss, g.adjuster)}>
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

              <div data-report className={cn(g.gloss, styles.report)}>
                <div className={styles.head}>
                  <p className={styles.title}>{data.title}</p>
                  <p className={g.lab}>{data.subtitle}</p>
                </div>
                <div className={cn(styles.grid, styles.colh)}>
                  <span>{data.columns.item}</span>
                  <span className={g.num}>{data.columns.quantity}</span>
                  <span className={g.num}>{data.columns.amount}</span>
                </div>
                {data.lines.map((line) => (
                  <div key={line.item} data-row className={cn(styles.grid, styles.row)}>
                    <span data-what className={styles.what}>
                      <span>{line.item}</span>
                      <span>{line.finding}</span>
                    </span>
                    <span data-priced className={cn(g.num, styles.qty)}>
                      {line.quantity}
                    </span>
                    <span data-priced className={g.num}>
                      {line.amount}
                    </span>
                  </div>
                ))}
                <div data-estimate className={styles.estimate}>
                  <span>{data.estimateLabel}</span>
                  <span className={g.num}>{data.estimate}</span>
                </div>
              </div>
            </div>

            <svg data-links className={g.links} viewBox={`0 0 ${layout.ww} ${layout.wh}`} aria-hidden>
              {data.files.map((file) => (
                <path key={file.name} data-path fill="none" stroke={LINK} strokeOpacity={0.5} strokeWidth={2} strokeLinecap="round" opacity={0} />
              ))}
              {data.files.map((file) => (
                <circle key={file.name} data-end r={4.5} fill={LINK} opacity={0} />
              ))}
            </svg>
            <div className={g.vignette} />
          </div>
        ))}
      </div>
      {!still && <GlassPause playing={playing} toggle={toggle} pause={data.pause} play={data.play} />}
    </div>
  );
}
