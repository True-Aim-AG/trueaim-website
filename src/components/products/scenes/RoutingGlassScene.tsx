"use client";

import { FileText, HardHat, type LucideIcon, User, UserCheck, Users, Workflow } from "lucide-react";
import { useCallback, useRef } from "react";

import { cn } from "@/lib/utils";

import { clamp01, easeOut, GlassPause, seg, u, useGlassLoop } from "./glass";
import g from "./glass.module.css";
import styles from "./RoutingGlassScene.module.css";

export type RoutingGlassData = {
  alt: string;
  claimLabel: string;
  rulesLabel: string;
  /** One route per desk, in the order a claim is offered to them. `when` is the rule that sends a claim there. */
  items: { id: string; desk: string; when: string }[];
  pause: string;
  play: string;
};

/** Who sits at the end of each route, in the order of the copy. */
const DESK_ICONS: LucideIcon[] = [User, Users, UserCheck, HardHat];

/** The one timing table. Each claim holds the scene for CYCLE seconds and travels at constant speed. */
const CYCLE = 3.4;
const FADE = 0.25;
/** The frame shown under reduced motion: the first claim arrived at the adjuster's desk. */
const STILL_T = 2.7;

type Layout = { name: "desktop" | "phone"; ww: number; wh: number; speed: number; lane?: number };
const LAYOUTS: Layout[] = [
  { name: "desktop", ww: 1500, wh: 620, speed: 400 },
  { name: "phone", ww: 720, wh: 900, speed: 300, lane: 22 },
];

/** Collects one stage's elements, draws its routes, and returns the function that draws one frame. */
function prepareStage(root: HTMLElement, layout: Layout, count: number) {
  const all = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
  const one = (sel: string) => root.querySelector<HTMLElement>(sel)!;
  const rules = one("[data-rules]");
  const desks = all("[data-desk]");
  const reasons = all("[data-reason]");
  const dot = one("[data-dot]");
  const inPath = root.querySelector<SVGPathElement>("[data-in]")!;
  const routes = Array.from(root.querySelectorAll<SVGPathElement>("[data-route]"));

  // The routes are drawn from where the tiles actually sit, in world units.
  const box = root.getBoundingClientRect();
  let ready = false;
  let inLength = 0;
  let across = 0;
  let lengths: number[] = [];
  if (box.width) {
    const k = box.width / layout.ww;
    root.querySelector("svg[data-links]")?.setAttribute("viewBox", `0 0 ${layout.ww} ${box.height / k}`);
    const at = (el: Element) => {
      const r = el.getBoundingClientRect();
      return { x: (r.left - box.left) / k, y: (r.top - box.top) / k, w: r.width / k, h: r.height / k };
    };
    const c = at(one("[data-claim]"));
    const r = at(rules);
    if (layout.lane) {
      // Portrait: down from the claim into the rules, then down a lane in the left margin and into each desk.
      const lx = layout.lane;
      const rr = 14;
      inPath.setAttribute("d", `M${c.x + c.w / 2} ${c.y + c.h + 8} L${c.x + c.w / 2} ${r.y - 8}`);
      const sy = r.y + r.h / 2;
      routes.forEach((path, i) => {
        const d = at(desks[i]);
        const ey = d.y + d.h / 2;
        path.setAttribute("d", `M${r.x - 8} ${sy} L${lx + rr} ${sy} Q${lx} ${sy} ${lx} ${sy + rr} L${lx} ${ey - rr} Q${lx} ${ey} ${lx + rr} ${ey} L${d.x - 8} ${ey}`);
      });
      across = 120;
    } else {
      const y = r.y + r.h / 2;
      inPath.setAttribute("d", `M${c.x + c.w + 10} ${y} L${r.x - 10} ${y}`);
      routes.forEach((path, i) => {
        const d = at(desks[i]);
        const sx = r.x + r.w + 10;
        const ex = d.x - 10;
        const ey = d.y + d.h / 2;
        const mx = (sx + ex) / 2;
        path.setAttribute("d", `M${sx} ${y} C ${mx} ${y}, ${mx} ${ey}, ${ex} ${ey}`);
      });
      across = r.w + 20;
    }
    inLength = inPath.getTotalLength();
    lengths = routes.map((path) => path.getTotalLength());
    ready = true;
  }

  const place = (path: SVGPathElement, length: number) => {
    const pt = path.getPointAtLength(length);
    dot.style.left = u(+pt.x.toFixed(2));
    dot.style.top = u(+pt.y.toFixed(2));
  };

  /** One frame of the loop: every style is a function of t alone, so any t can be shown. */
  return (t: number) => {
    if (!ready) return;
    root.style.setProperty("--sh", `${(34 + 3.2 * Math.sin((2 * Math.PI * t) / (CYCLE * count))).toFixed(2)}%`);
    const cycle = Math.min(count - 1, Math.floor(t / CYCLE));
    const local = t - cycle * CYCLE;
    const leave = 1 - seg(local, CYCLE - FADE, CYCLE);
    // Constant speed, no easing: the claim has travelled `gone` world units since it entered.
    const gone = local * layout.speed;
    const atRules = inLength / layout.speed;
    const arrive = (inLength + across + lengths[cycle]) / layout.speed;
    const routed = seg(local, atRules, atRules + FADE) * leave;
    const arrived = easeOut(seg(local, arrive, arrive + FADE)) * leave;

    if (gone < inLength) place(inPath, gone);
    else place(routes[cycle], Math.min(lengths[cycle], Math.max(0, gone - inLength - across)));
    // The claim is out of sight while it is inside the rules, and gone once it is on the desk.
    const inside = gone >= inLength && gone < inLength + across;
    dot.style.opacity = String(inside ? 0 : clamp01(local / 0.2) * (1 - seg(local, arrive, arrive + 0.2)));

    rules.style.setProperty("--on", (seg(local, atRules - 0.1, atRules + 0.15) * (1 - seg(local, arrive, arrive + FADE))).toFixed(3));
    routes.forEach((path, i) => path.setAttribute("opacity", String(i === cycle ? 0.22 + 0.78 * routed : 0.22)));
    reasons.forEach((el, i) => {
      el.style.opacity = String(i === cycle ? routed : 0);
    });
    desks.forEach((el, i) => {
      el.style.setProperty("--on", (i === cycle ? arrived : 0).toFixed(3));
      // While a claim goes to the next available adjuster, the first desk reads as at capacity.
      el.style.opacity = String(i === 0 && cycle === 1 ? 1 - 0.55 * routed : 1);
    });
  };
}

/**
 * Where a claim goes, in the glass look of the platform demo: one claim after
 * another passes through the insurer's routing rules at constant speed and
 * takes its route, to the adjuster's desk, to the next available adjuster, to
 * a senior adjuster or to an assessor on site, with the rule that sent it
 * there shown while it travels. The picture is about the routing; the desks
 * are where the routes end.
 *
 * Live HTML in world units with a portrait layout below 480px, a still frame
 * under reduced motion and the figure itself as the pause control (WCAG 2.2.2).
 */
export function RoutingGlassScene({ data }: { data: RoutingGlassData }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const count = data.items.length;
  const prepare = useCallback(
    (root: HTMLElement) => {
      const draws = LAYOUTS.map((layout) => prepareStage(root.querySelector<HTMLElement>(`[data-stage="${layout.name}"]`)!, layout, count));
      return (t: number) => draws.forEach((draw) => draw(t));
    },
    [count],
  );
  const { playing, toggle } = useGlassLoop(rootRef, CYCLE * count, STILL_T, prepare);

  return (
    <div ref={rootRef} className="@container relative">
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
          >
            <div className={styles.world}>
              <div data-claim className={cn(g.gloss, styles.tile, styles.claim)}>
                <FileText aria-hidden strokeWidth={1.5} />
                <span>{data.claimLabel}</span>
              </div>
              <div className={styles.middle}>
                <div data-rules className={cn(g.gloss, styles.tile, styles.rules)}>
                  <Workflow aria-hidden strokeWidth={1.5} />
                  <span>{data.rulesLabel}</span>
                </div>
                <div className={styles.reasons}>
                  {data.items.map((item) => (
                    <p key={item.id} data-reason>
                      {item.when}
                    </p>
                  ))}
                </div>
              </div>
              <div className={styles.desks}>
                {data.items.map((item, index) => {
                  const Icon = DESK_ICONS[index] ?? User;
                  return (
                    <div key={item.id} data-desk className={cn(g.gloss, styles.tile, styles.desk)}>
                      <Icon aria-hidden strokeWidth={1.5} />
                      <span>{item.desk}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <svg data-links className={g.links} viewBox={`0 0 ${layout.ww} ${layout.wh}`} aria-hidden>
              <path data-in fill="none" stroke="#5151DB" strokeOpacity={0.5} strokeWidth={2} strokeLinecap="round" />
              {data.items.map((item) => (
                <path key={item.id} data-route fill="none" stroke="#5151DB" strokeWidth={2.5} strokeLinecap="round" opacity={0.22} />
              ))}
            </svg>
            <span data-dot className={styles.dot}>
              <FileText aria-hidden strokeWidth={1.8} />
            </span>
          </div>
        ))}
      </div>
      <GlassPause playing={playing} toggle={toggle} pause={data.pause} play={data.play} />
    </div>
  );
}
