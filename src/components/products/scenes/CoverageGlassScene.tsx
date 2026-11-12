"use client";

import { Check, Pause, Play, User } from "lucide-react";
import { type CSSProperties, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

import { SCENE_CARD, SCENE_CARD_HERO } from "@/components/content/surface";
import { cn } from "@/lib/utils";

import type { ClaimSceneData } from "./ClaimScene";
import styles from "./CoverageGlassScene.module.css";
import type { Outcome } from "./marks";

export type CoverageGlassData = ClaimSceneData & {
  policyLabel: string;
  /** The word before a clause number, as in "Clause 4.2". */
  clauseWord: string;
  /** One clause per outcome group, in the order of the groups. */
  clauses: { ref: string; text: string }[];
  adjuster: { label: string; action: string };
  pause: string;
  play: string;
};

/** The one timing table: every beat of the loop, in seconds. */
const DUR = 11;
const GROUP_T = [0.8, 3.0, 4.5];
const ROW_STEP = 0.3;
const DEDUCTIBLE_T = 6.2;
const PAYOUT_T = 6.55;
const ADJUSTER_T = 7.3;
const OUT = [10.0, 10.8];
/** The frame shown under reduced motion: everything checked, the adjuster's call in view. */
const STILL_T = 8;

const COLOUR: Record<Outcome, string> = { approved: "#1BB037", denied: "#E94119", referred: "#FFAA36" };

type Layout = {
  name: "desktop" | "phone";
  ww: number;
  wh: number;
  /** x of each group's lane in the left margin; the phone runs its connectors there. */
  lanes?: number[];
  vars: Record<string, number | number[]>;
};

const LAYOUTS: Layout[] = [
  {
    name: "desktop",
    ww: 1200,
    wh: 1000,
    vars: { pad: 40, gap: 18, cols: [26, 0, 124, 124], rh: 82, fs: 25, fb: 38, ft: 24, fa: 22, cg: 30, fh: 16, fti: 34, sumgap: 34, bottom: 44 },
  },
  {
    name: "phone",
    ww: 720,
    wh: 1100,
    lanes: [22, 44, 66],
    vars: { pad: 32, gap: 14, cols: [22, 0, 118, 134], rh: 70, fs: 27, fb: 36, ft: 23, fa: 24, cg: 14, fh: 17, fti: 36, sumgap: 22, bottom: 30 },
  },
];

const u = (n: number) => `calc(${n} * var(--u))`;

function cssVars(vars: Layout["vars"]): CSSProperties {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(vars)) {
    out[`--${key}`] = Array.isArray(value) ? value.map((v) => (v ? u(v) : "minmax(0,1fr)")).join(" ") : u(value);
  }
  return out as CSSProperties;
}

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const lerp = (a: number, b: number, x: number) => a + (b - a) * x;
const easeOut = (x: number) => 1 - Math.pow(1 - clamp01(x), 3);
const easeInOut = (x: number) => {
  x = clamp01(x);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
/** The platform demo's spring: settles by x = 1.4, overshooting by `over`. */
function spring(x: number, over = 0.06) {
  if (x <= 0) return 0;
  if (x >= 1.4) return 1;
  const ln = Math.log(over);
  const z = -ln / Math.sqrt(Math.PI * Math.PI + ln * ln);
  const w = 7 / z;
  const wd = w * Math.sqrt(1 - z * z);
  return 1 - Math.exp(-z * w * x) * (Math.cos(wd * x) + (z / Math.sqrt(1 - z * z)) * Math.sin(wd * x));
}

type Row = { group: number; kind: Outcome; description: string; claimed: string; covered: string };

/** The elements one stage animates, collected once after mount. */
type Stage = {
  layout: Layout;
  root: HTMLElement;
  rows: { el: HTMLElement; dot: HTMLElement; dotDone: HTMLElement; covered: HTMLElement; strike: HTMLElement[] }[];
  clauses: { el: HTMLElement; bar: HTMLElement; chip: HTMLElement | null }[];
  sums: { label: HTMLElement; value: HTMLElement }[];
  adjuster: HTMLElement;
  pieces: HTMLElement[];
  paths: SVGPathElement[];
  ends: SVGCircleElement[];
  lengths: number[];
  measured: boolean;
};

function collect(root: HTMLElement, layout: Layout): Stage {
  const all = (sel: string, el: ParentNode = root) => Array.from(el.querySelectorAll<HTMLElement>(sel));
  return {
    layout,
    root,
    rows: all("[data-row]").map((el) => ({
      el,
      dot: el.querySelector<HTMLElement>("[data-dot]")!,
      dotDone: el.querySelector<HTMLElement>("[data-dot-done]")!,
      covered: el.querySelector<HTMLElement>("[data-covered]")!,
      strike: all("[data-strike]", el),
    })),
    clauses: all("[data-clause]").map((el) => ({
      el,
      bar: el.querySelector<HTMLElement>("[data-bar]")!,
      chip: el.querySelector<HTMLElement>("[data-chip]"),
    })),
    sums: all("[data-sum]").map((el) => ({ label: el.children[0] as HTMLElement, value: el.children[1] as HTMLElement })),
    adjuster: root.querySelector<HTMLElement>("[data-adjuster]")!,
    pieces: all("[data-piece]"),
    paths: Array.from(root.querySelectorAll<SVGPathElement>("[data-path]")),
    ends: Array.from(root.querySelectorAll<SVGCircleElement>("[data-end]")),
    lengths: [],
    measured: false,
  };
}

/** Draws each connector from where its row and its clause actually sit, in world units. */
function measure(stage: Stage, rows: Row[]) {
  const box = stage.root.getBoundingClientRect();
  if (!box.width) return;
  const k = box.width / stage.layout.ww;
  // The phone stage's height follows its text, so the drawing's height does too.
  stage.root.querySelector("svg[data-links]")?.setAttribute("viewBox", `0 0 ${stage.layout.ww} ${box.height / k}`);
  const at = (el: Element) => {
    const r = el.getBoundingClientRect();
    return { x: (r.left - box.left) / k, y: (r.top - box.top) / k, w: r.width / k, h: r.height / k };
  };
  const claim = at(stage.root.querySelector("[data-claim]")!);
  stage.lengths = rows.map((row, i) => {
    const r = at(stage.rows[i].el);
    const c = at(stage.clauses[row.group].el);
    const sy = r.y + r.h / 2;
    let d: string;
    let ex: number;
    let ey: number;
    if (stage.layout.lanes) {
      // Out of the claim to the left, down the group's lane, into the clause.
      const sx = claim.x - 8;
      const lx = stage.layout.lanes[row.group];
      const rr = 10;
      ex = c.x - 8;
      ey = c.y + 16;
      d = `M${sx} ${sy} L${lx + rr} ${sy} Q${lx} ${sy} ${lx} ${sy + rr} L${lx} ${ey - rr} Q${lx} ${ey} ${lx + rr} ${ey} L${ex} ${ey}`;
    } else {
      const sx = claim.x + claim.w + 10;
      const mx = (sx + c.x - 10) / 2;
      ex = c.x - 10;
      ey = c.y + 12;
      d = `M${sx} ${sy} C ${mx} ${sy}, ${mx} ${ey}, ${ex} ${ey}`;
    }
    const path = stage.paths[i];
    path.setAttribute("d", d);
    stage.ends[i].setAttribute("cx", String(ex));
    stage.ends[i].setAttribute("cy", String(ey));
    const length = path.getTotalLength();
    path.setAttribute("stroke-dasharray", String(length));
    return length;
  });
  stage.measured = true;
}

/** One frame of the loop: every style is a function of t alone, so any t can be shown. */
function draw(stage: Stage, rows: Row[], t: number) {
  const keep = 1 - easeInOut(seg(t, OUT[0], OUT[1]));
  const drift = -8 * Math.sin((2 * Math.PI * t) / DUR);
  stage.root.style.setProperty("--sh", `${(34 - drift * 0.4).toFixed(2)}%`);
  stage.pieces.forEach((el, i) => {
    el.style.transform = `translateX(${u(+(drift * (i ? 0.3 : 0.45)).toFixed(2))}) scale(${i ? 0.88 : 0.92})`;
  });

  const first = (g: number) => rows.findIndex((r) => r.group === g);
  rows.forEach((row, i) => {
    const t0 = (GROUP_T[row.group] ?? GROUP_T[GROUP_T.length - 1]) + (i - first(row.group)) * ROW_STEP;
    const k = easeOut(seg(t, t0, t0 + 0.4)) * keep;
    const el = stage.rows[i];
    el.dotDone.style.opacity = String(k);
    el.dot.style.opacity = String(1 - k);
    el.covered.style.opacity = String(k);
    el.covered.style.transform = `translateX(${u(+lerp(10, 0, k).toFixed(1))})`;
    if (row.kind === "denied") el.strike.forEach((s) => s.classList.toggle(styles.strike, k > 0.5));
    const path = stage.paths[i];
    if (stage.measured && path) {
      const d = easeInOut(seg(t, t0 + 0.15, t0 + 0.75));
      path.setAttribute("stroke-dashoffset", String(stage.lengths[i] * (1 - d)));
      path.setAttribute("opacity", String(keep));
      stage.ends[i].setAttribute("opacity", String(clamp01((d - 0.85) * 8) * keep));
    }
  });

  stage.clauses.forEach((clause, g) => {
    const t0 = (GROUP_T[g] ?? 0) + 0.45;
    const k = easeOut(seg(t, t0, t0 + 0.4)) * keep;
    clause.el.style.opacity = String(0.4 + 0.6 * k);
    clause.bar.style.opacity = String(k);
    if (clause.chip) {
      const s = spring(seg(t, t0 + 0.15, t0 + 0.8), 0.1) * keep;
      clause.chip.style.opacity = String(clamp01(s * 1.5));
      clause.chip.style.transform = `scale(${lerp(0.7, 1, s).toFixed(3)})`;
    }
  });

  const deductible = easeOut(seg(t, DEDUCTIBLE_T, DEDUCTIBLE_T + 0.4)) * keep;
  const payout = clamp01(spring(seg(t, PAYOUT_T, PAYOUT_T + 0.8), 0.08) * keep * 1.4);
  [deductible, payout].forEach((k, i) => {
    const sum = stage.sums[i];
    if (!sum) return;
    sum.label.style.opacity = String(0.3 + 0.7 * k);
    sum.value.style.opacity = String(k);
    sum.value.style.transform = `translateY(${u(+lerp(12, 0, k).toFixed(1))})`;
  });

  const a = spring(seg(t, ADJUSTER_T, ADJUSTER_T + 0.8), 0.07) * keep;
  stage.adjuster.style.opacity = String(clamp01(a * 1.5));
  stage.adjuster.style.transform = `translateY(${u(+lerp(18, 0, a).toFixed(1))}) scale(${lerp(0.96, 1, a).toFixed(4)})`;
}

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/**
 * The Automated Coverage Check hero, in the glass look of the platform demo:
 * each line of a claim is checked in turn and linked to the policy clause it
 * rests on, the payout follows, and the adjuster makes the final call.
 *
 * The scene is live HTML, so its text is translated and sharp at any size.
 * It is laid out in world units and scales as one picture; below 480px of
 * width it switches to a portrait layout with the connectors in the left
 * margin. Under reduced motion it shows the finished frame until the visitor
 * presses play, and the toggle pauses it at any time (WCAG 2.2.2).
 */
export function CoverageGlassScene({ data }: { data: CoverageGlassData }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stagesRef = useRef<Stage[]>([]);
  const timeRef = useRef(0);
  const visibleRef = useRef(true);
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);
  // Null until the visitor presses the toggle; until then reduced motion decides.
  const [choice, setChoice] = useState<boolean | null>(null);
  const playing = choice ?? !reduced;

  const rows = useMemo<Row[]>(
    () =>
      data.groups.flatMap((group, g) =>
        group.lines.map((line) => ({ group: g, kind: group.kind, description: line.description, claimed: line.claimed, covered: line.covered })),
      ),
    [data.groups],
  );

  // Collect the stages, measure once the fonts are in, and again whenever the scene is resized.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const stages = LAYOUTS.map((layout) => collect(root.querySelector<HTMLElement>(`[data-stage="${layout.name}"]`)!, layout));
    stagesRef.current = stages;
    const remeasure = () => {
      stages.forEach((stage) => {
        stage.measured = false;
        measure(stage, rows);
        draw(stage, rows, timeRef.current);
      });
    };
    void document.fonts.ready.then(remeasure);
    const resize = new ResizeObserver(remeasure);
    resize.observe(root);
    const seen = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    });
    seen.observe(root);
    return () => {
      resize.disconnect();
      seen.disconnect();
    };
  }, [rows]);

  // Run the clock while playing; hold the frame while paused.
  useEffect(() => {
    const drawAll = (t: number) => {
      stagesRef.current.forEach((stage) => {
        if (!stage.measured) measure(stage, rows);
        draw(stage, rows, t);
      });
    };
    if (!playing) {
      if (choice === null) timeRef.current = STILL_T;
      drawAll(timeRef.current);
      return;
    }
    const start = performance.now() - timeRef.current * 1000;
    let frame = requestAnimationFrame(function tick(now) {
      timeRef.current = ((now - start) / 1000) % DUR;
      if (visibleRef.current) drawAll(timeRef.current);
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [playing, choice, rows]);

  return (
    <div ref={rootRef} className={cn(SCENE_CARD, SCENE_CARD_HERO, "@container relative rounded-[10px]")}>
      <div role="img" aria-label={data.alt}>
        {LAYOUTS.map((layout) => (
          <div
            key={layout.name}
            data-stage={layout.name}
            className={cn(
              styles.stage,
              styles[layout.name],
              layout.name === "desktop" ? "@max-[480px]:hidden" : "hidden @max-[480px]:block",
            )}
            style={cssVars(layout.vars)}
          >
            <div className={styles.ground} />
            <div className={styles.floor} />
            <div data-piece className={styles.piece} style={{ left: "-24%", top: "6%", width: "50%", height: "36%" }}>
              <i style={{ top: u(40), width: "45%", height: u(18) }} />
              <i style={{ top: u(90), width: "80%", height: u(9) }} />
              <i style={{ top: u(124), width: "66%", height: u(9) }} />
            </div>
            <div data-piece className={styles.piece} style={{ left: "72%", top: "60%", width: "50%", height: "38%" }}>
              <i style={{ top: u(40), width: "42%", height: u(18) }} />
              <i style={{ top: u(96), width: "78%", height: u(9) }} />
              <i style={{ top: u(130), width: "66%", height: u(9) }} />
            </div>

            <div className={styles.world}>
              <div data-claim className={cn(styles.gloss, styles.claim)}>
                <div className={styles.head}>
                  <p className={styles.title}>{data.title}</p>
                  <p className={styles.lab}>{data.reference}</p>
                </div>
                <div className={cn(styles.grid, styles.colh)}>
                  <span />
                  <span>{data.columns.description}</span>
                  <span className={styles.num}>{data.columns.claimed}</span>
                  <span className={styles.num}>{data.columns.covered}</span>
                </div>
                {rows.map((row) => (
                  <div key={row.description} data-row className={cn(styles.grid, styles.row, styles[row.kind])}>
                    <span className={styles.mark}>
                      <i data-dot />
                      <i data-dot-done />
                    </span>
                    <span data-strike className={styles.desc}>
                      {row.description}
                    </span>
                    <span data-strike className={cn(styles.num, styles.claimed)}>
                      {row.claimed}
                    </span>
                    <span data-covered className={cn(styles.num, styles.covered)}>
                      {row.covered}
                    </span>
                  </div>
                ))}
                <div className={styles.sums}>
                  {data.deductible && (
                    <div data-sum className={styles.sum}>
                      <span>{data.deductibleLabel}</span>
                      <span className={styles.num}>{data.deductible}</span>
                    </div>
                  )}
                  <div data-sum className={cn(styles.sum, styles.big)}>
                    <span>{data.payoutLabel}</span>
                    <span className={styles.num}>{data.payout}</span>
                  </div>
                </div>
              </div>

              <div className={styles.side}>
                <div className={cn(styles.gloss, styles.policy)}>
                  <p className={styles.lab}>{data.policyLabel}</p>
                  {data.clauses.map((clause, g) => (
                    <div key={clause.ref} data-clause className={cn(styles.clause, styles[data.groups[g].kind])}>
                      <i data-bar />
                      <p className={styles.ref}>
                        {data.clauseWord} {clause.ref}
                      </p>
                      <p className={styles.text}>{clause.text}</p>
                      {layout.name === "desktop" && (
                        <span data-chip className={styles.chip}>
                          {data.groups[g].label}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <div data-adjuster className={cn(styles.gloss, styles.adjuster)}>
                  <span className={styles.who}>
                    <User aria-hidden strokeWidth={1.5} />
                    {data.adjuster.label}
                  </span>
                  <span className={styles.approve}>
                    <Check aria-hidden strokeWidth={2.2} />
                    {data.adjuster.action}
                  </span>
                </div>
              </div>
            </div>

            <svg data-links className={styles.links} viewBox={`0 0 ${layout.ww} ${layout.wh}`} aria-hidden>
              {rows.map((row) => (
                <path
                  key={row.description}
                  data-path
                  fill="none"
                  stroke={COLOUR[row.kind]}
                  strokeOpacity={0.55}
                  strokeWidth={2}
                  strokeLinecap="round"
                  opacity={0}
                />
              ))}
              {rows.map((row) => (
                <circle key={row.description} data-end r={4.5} fill={COLOUR[row.kind]} opacity={0} />
              ))}
            </svg>
            <div className={styles.vignette} />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setChoice(!playing)}
        aria-label={playing ? data.pause : data.play}
        className="absolute bottom-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-pill bg-card/85 text-body shadow-[0_0_0_1px_rgba(44,43,42,.12)] transition-colors duration-150 ease-brand hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
      >
        {playing ? <Pause aria-hidden size={14} /> : <Play aria-hidden size={14} />}
      </button>
    </div>
  );
}
