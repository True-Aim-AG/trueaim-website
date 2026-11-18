"use client";

import { Check, Mail, User } from "lucide-react";
import { type CSSProperties, useCallback, useRef } from "react";

import { SCENE_CARD, SCENE_CARD_HERO } from "@/components/content/surface";
import { cn } from "@/lib/utils";

import { clamp01, easeInOut, easeOut, GlassPause, lerp, seg, spring, u, useGlassLoop } from "./glass";
import g from "./glass.module.css";
import styles from "./InvoiceGlassScene.module.css";
import type { Outcome } from "./marks";

export type InvoiceGlassData = {
  alt: string;
  title: string;
  supplier: string;
  columns: { line: string; benchmark: string; amount: string };
  /** `position` is where the amount sits against comparable prices, as a percentage from the left of the track. */
  lines: { kind: Outcome; description: string; amount: string; position: number }[];
  totalLabel: string;
  total: string;
  summaryLabel: string;
  /** One row per outcome; the count is taken from the lines. */
  tally: { kind: Outcome; label: string }[];
  reissue: {
    title: string;
    line: string;
    invoicedLabel: string;
    invoiced: string;
    expectedLabel: string;
    expected: string;
    saveLabel: string;
    save: string;
  };
  adjuster: { label: string; action: string };
  pause: string;
  play: string;
};

/** The one timing table: every beat of the loop, in seconds. */
const DUR = 11;
const ROW_T = 0.9;
const ROW_STEP = 0.7;
const HOT_T = 4.7;
const REISSUE_T = 5.3;
const SAVING_T = 6.0;
const ADJUSTER_T = 7.2;
const OUT = [10.0, 10.8];
/** The frame shown under reduced motion: every line checked, the request drafted, the adjuster in view. */
const STILL_T = 8.5;

/** The expected range on each line's track, as percentages of its width. */
const BAND = [32, 68];
const COLOUR: Record<Outcome, string> = { approved: "#1BB037", denied: "#E94119", referred: "#FFAA36" };

type Layout = { name: "desktop" | "phone"; ww: number; wh: number; vars: Record<string, number | number[]> };

const LAYOUTS: Layout[] = [
  {
    name: "desktop",
    ww: 1200,
    wh: 1000,
    vars: { pad: 40, gap: 18, cols: [26, 0, 130, 124], rh: 82, fs: 25, fb: 34, ft: 23, fa: 22, fh: 16, fti: 34 },
  },
  {
    name: "phone",
    ww: 720,
    wh: 1100,
    vars: { pad: 30, gap: 14, cols: [22, 0, 120, 132], rh: 74, fs: 27, fb: 34, ft: 25, fa: 24, fh: 17, fti: 36 },
  },
];

function cssVars(vars: Layout["vars"]): CSSProperties {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(vars)) {
    out[`--${key}`] = Array.isArray(value) ? value.map((v) => (v ? u(v) : "minmax(0,1fr)")).join(" ") : u(value);
  }
  return out as CSSProperties;
}

type Line = InvoiceGlassData["lines"][number];

/** Collects one stage's elements, draws its connector, and returns the function that draws one frame. */
function prepareStage(root: HTMLElement, layout: Layout, lines: Line[], tally: InvoiceGlassData["tally"]) {
  const all = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
  const one = (sel: string) => root.querySelector<HTMLElement>(sel)!;
  const rows = all("[data-row]").map((el) => ({
    el,
    dot: el.querySelector<HTMLElement>("[data-dot]")!,
    done: el.querySelector<HTMLElement>("[data-dot-done]")!,
    track: el.querySelector<HTMLElement>("[data-track]")!,
    pin: el.querySelector<HTMLElement>("[data-pin]")!,
  }));
  const counts = all("[data-count]");
  const reissue = one("[data-reissue]");
  const saving = one("[data-saving]");
  const adjuster = one("[data-adjuster]");
  const pieces = all("[data-piece]");
  const path = root.querySelector<SVGPathElement>("[data-path]")!;
  const end = root.querySelector<SVGCircleElement>("[data-end]")!;
  const hot = lines.findIndex((line) => line.kind === "denied");

  // The connector runs from the line over the benchmark to the request drafted for it, in world units.
  let length = 0;
  const box = root.getBoundingClientRect();
  if (box.width && layout.name === "desktop" && hot >= 0) {
    const k = box.width / layout.ww;
    const at = (el: Element) => {
      const r = el.getBoundingClientRect();
      return { x: (r.left - box.left) / k, y: (r.top - box.top) / k, w: r.width / k, h: r.height / k };
    };
    const invoice = at(one("[data-invoice]"));
    const row = at(rows[hot].el);
    const card = at(one("[data-bench]"));
    const target = at(reissue);
    const sx = invoice.x + invoice.w + 10;
    const sy = row.y + row.h / 2;
    const ex = card.x - 10;
    const ey = target.y + 40;
    const mx = (sx + ex) / 2;
    path.setAttribute("d", `M${sx} ${sy} C ${mx} ${sy}, ${mx} ${ey}, ${ex} ${ey}`);
    end.setAttribute("cx", String(ex));
    end.setAttribute("cy", String(ey));
    length = path.getTotalLength();
    path.setAttribute("stroke-dasharray", String(length));
  }

  /** One frame of the loop: every style is a function of t alone, so any t can be shown. */
  return (t: number) => {
    const keep = 1 - easeInOut(seg(t, OUT[0], OUT[1]));
    const drift = -8 * Math.sin((2 * Math.PI * t) / DUR);
    root.style.setProperty("--sh", `${(34 - drift * 0.4).toFixed(2)}%`);
    pieces.forEach((el, i) => {
      el.style.transform = `translateX(${u(+(drift * (i ? 0.3 : 0.45)).toFixed(2))}) scale(${i ? 0.88 : 0.92})`;
    });

    const checked: Record<string, number> = {};
    rows.forEach((row, i) => {
      const line = lines[i];
      const t0 = ROW_T + i * ROW_STEP;
      const k = easeOut(seg(t, t0, t0 + 0.4)) * keep;
      row.done.style.opacity = String(k);
      row.dot.style.opacity = String(1 - k);
      row.track.style.opacity = String(0.4 + 0.6 * k);
      row.pin.style.opacity = String(k);
      // The mark starts at the middle of the range and settles where the amount really sits.
      row.pin.style.left = `${lerp(50, line.position, easeOut(seg(t, t0, t0 + 0.7))).toFixed(2)}%`;
      if (k > 0.5) checked[line.kind] = (checked[line.kind] ?? 0) + 1;
      if (i === hot) row.el.style.setProperty("--hot", String(easeOut(seg(t, HOT_T, HOT_T + 0.4)) * keep));
    });
    counts.forEach((el, i) => {
      const text = String(checked[tally[i].kind] ?? 0);
      if (el.textContent !== text) el.textContent = text;
    });

    if (length) {
      const d = easeInOut(seg(t, HOT_T + 0.2, HOT_T + 0.9));
      path.setAttribute("stroke-dashoffset", String(length * (1 - d)));
      path.setAttribute("opacity", String(keep));
      end.setAttribute("opacity", String(clamp01((d - 0.85) * 8) * keep));
    }

    const r = spring(seg(t, REISSUE_T, REISSUE_T + 0.8), 0.07) * keep;
    reissue.style.opacity = String(clamp01(r * 1.5));
    reissue.style.transform = `translateY(${u(+lerp(16, 0, r).toFixed(1))})`;
    const s = spring(seg(t, SAVING_T, SAVING_T + 0.8), 0.08) * keep;
    saving.style.opacity = String(clamp01(s * 1.4));
    saving.style.transform = `translateY(${u(+lerp(12, 0, s).toFixed(1))})`;

    const a = spring(seg(t, ADJUSTER_T, ADJUSTER_T + 0.8), 0.07) * keep;
    adjuster.style.opacity = String(clamp01(a * 1.5));
    adjuster.style.transform = `translateY(${u(+lerp(18, 0, a).toFixed(1))}) scale(${lerp(0.96, 1, a).toFixed(4)})`;
  };
}

/**
 * The Invoice Benchmarking hero, in the glass look of the platform demo: each
 * line of an invoice is checked against the benchmark in turn, the line above
 * the expected range is linked to the reissue request drafted for it, and the
 * adjuster sends the request.
 *
 * Live HTML in world units, as the Coverage Check hero: translated text, a
 * portrait layout below 480px, a still frame under reduced motion and the
 * figure itself as the pause control (WCAG 2.2.2).
 */
export function InvoiceGlassScene({ data }: { data: InvoiceGlassData }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { lines, tally } = data;
  const prepare = useCallback(
    (root: HTMLElement) => {
      const draws = LAYOUTS.map((layout) =>
        prepareStage(root.querySelector<HTMLElement>(`[data-stage="${layout.name}"]`)!, layout, lines, tally),
      );
      return (t: number) => draws.forEach((draw) => draw(t));
    },
    [lines, tally],
  );
  const { playing, toggle } = useGlassLoop(rootRef, DUR, STILL_T, prepare);
  const hot = lines.find((line) => line.kind === "denied");

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
              layout.name === "desktop" ? "@max-[480px]:hidden" : "hidden @max-[480px]:block",
            )}
            style={cssVars(layout.vars)}
          >
            <div className={g.ground} />
            <div className={g.floor} />
            <div data-piece className={g.piece} style={{ left: "-24%", top: "6%", width: "50%", height: "36%" }}>
              <i style={{ top: u(40), width: "45%", height: u(18) }} />
              <i style={{ top: u(90), width: "80%", height: u(9) }} />
              <i style={{ top: u(124), width: "66%", height: u(9) }} />
            </div>
            <div data-piece className={g.piece} style={{ left: "72%", top: "60%", width: "50%", height: "38%" }}>
              <i style={{ top: u(40), width: "42%", height: u(18) }} />
              <i style={{ top: u(96), width: "78%", height: u(9) }} />
              <i style={{ top: u(130), width: "66%", height: u(9) }} />
            </div>

            <div className={styles.world}>
              <div data-invoice className={cn(g.gloss, styles.invoice)}>
                <div className={styles.head}>
                  <p className={styles.title}>{data.title}</p>
                  <p className={g.lab}>{data.supplier}</p>
                </div>
                <div className={cn(styles.grid, styles.colh)}>
                  <span />
                  <span>{data.columns.line}</span>
                  <span>{data.columns.benchmark}</span>
                  <span className={g.num}>{data.columns.amount}</span>
                </div>
                {lines.map((line) => (
                  <div key={line.description} data-row className={cn(styles.grid, styles.row, g[line.kind])}>
                    <span className={styles.mark}>
                      <i data-dot />
                      <i data-dot-done />
                    </span>
                    <span className={styles.desc}>{line.description}</span>
                    <span data-track className={styles.track}>
                      <i className={styles.band} style={{ left: `${BAND[0]}%`, width: `${BAND[1] - BAND[0]}%` }} />
                      <i data-pin className={styles.pin} style={{ left: `${line.position}%` }} />
                    </span>
                    <span className={g.num}>{line.amount}</span>
                  </div>
                ))}
                <div className={styles.total}>
                  <span>{data.totalLabel}</span>
                  <span className={g.num}>{data.total}</span>
                </div>
              </div>

              <div className={styles.side}>
                <div data-bench className={cn(g.gloss, styles.bench)}>
                  <p className={g.lab}>{data.summaryLabel}</p>
                  {tally.map((row) => (
                    <div key={row.kind} className={cn(styles.tally, g[row.kind])}>
                      <i />
                      <span>{row.label}</span>
                      <span data-count className={g.num}>
                        {lines.filter((line) => line.kind === row.kind).length}
                      </span>
                    </div>
                  ))}
                  <div data-reissue className={cn(styles.reissue, hot && g[hot.kind])}>
                    <p className={styles.rtitle}>
                      <Mail aria-hidden strokeWidth={1.6} />
                      {data.reissue.title}
                    </p>
                    <p className={styles.rline}>{data.reissue.line}</p>
                    <div className={styles.pair}>
                      <span>{data.reissue.invoicedLabel}</span>
                      <span className={g.num}>{data.reissue.invoiced}</span>
                    </div>
                    <div className={styles.pair}>
                      <span>{data.reissue.expectedLabel}</span>
                      <span className={g.num}>{data.reissue.expected}</span>
                    </div>
                    <div data-saving className={styles.saving}>
                      <span>{data.reissue.saveLabel}</span>
                      <span className={g.num}>{data.reissue.save}</span>
                    </div>
                  </div>
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
            </div>

            <svg data-links className={g.links} viewBox={`0 0 ${layout.ww} ${layout.wh}`} aria-hidden>
              <path data-path fill="none" stroke={COLOUR.denied} strokeOpacity={0.55} strokeWidth={2} strokeLinecap="round" opacity={0} />
              <circle data-end r={4.5} fill={COLOUR.denied} opacity={0} />
            </svg>
            <div className={g.vignette} />
          </div>
        ))}
      </div>
      <GlassPause playing={playing} toggle={toggle} pause={data.pause} play={data.play} />
    </div>
  );
}
