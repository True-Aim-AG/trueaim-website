"use client";

import {
  AppWindow,
  Briefcase,
  Check,
  FileText,
  Headset,
  Image as Photo,
  type LucideIcon,
  Mail,
  MessageCircle,
  Mic,
  Pause,
  Play,
  User,
  Video,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

import type { FlowSceneData } from "./FlowScene";
import styles from "./FlowGlassScene.module.css";

export type FlowGlassData = FlowSceneData & { pause: string; play: string };

/** Channel and party icons, in the order of the channels and parties in the messages. */
const CHANNEL_ICONS: LucideIcon[] = [MessageCircle, Mail, AppWindow, Wrench];
const PARTY_ICONS: LucideIcon[] = [User, Briefcase, Wrench, Headset];

/**
 * The one timing table. One item at a time is routed: it pops out of a
 * channel, enters the record, waits there while it is filed, and leaves for
 * its party at the exact moment the next item enters. Every item moves at the
 * same constant speed, so travel times follow the length of each line.
 */
const STEP = 1.6;
/** [channel, icon, record field it fills, party it is routed to] */
const ARRIVALS: [number, LucideIcon, number, number][] = [
  [0, Photo, 2, 0],
  [1, FileText, 1, 1],
  [3, FileText, 3, 2],
  [2, FileText, 3, 3],
  [0, Mic, 0, 0],
  [1, Photo, 2, 1],
  [3, Video, 2, 2],
  [2, Photo, 3, 3],
];
const DUR = STEP * ARRIVALS.length;
const POP = 0.3;
const FADE = 0.14;
const GLOW = 0.8;
const PULSE = 0.5;
/** The frame shown under reduced motion: an update on its way to the broker while the next item comes in. */
const STILL_T = 3.5;
const DOT = 14;

type Layout = { name: "desktop" | "phone"; ww: number; speed: number };
const LAYOUTS: Layout[] = [
  { name: "desktop", ww: 1240, speed: 340 },
  { name: "phone", ww: 720, speed: 300 },
];

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const u = (n: number) => `calc(${n.toFixed(2)} * var(--u))`;
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

type Stage = {
  layout: Layout;
  grid: HTMLElement;
  svg: SVGSVGElement;
  hub: HTMLElement;
  ring: HTMLElement;
  fields: HTMLElement[];
  glows: HTMLElement[];
  ticks: HTMLElement[];
  items: HTMLElement[];
  blobs: HTMLElement[];
  inbound: SVGPathElement[];
  outbound: SVGPathElement[];
  tin: number[];
  tout: number[];
  measured: boolean;
};

function collect(root: HTMLElement, layout: Layout): Stage {
  const all = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
  return {
    layout,
    grid: root.querySelector<HTMLElement>("[data-grid]")!,
    svg: root.querySelector<SVGSVGElement>("svg[data-links]")!,
    hub: root.querySelector<HTMLElement>("[data-hub]")!,
    ring: root.querySelector<HTMLElement>("[data-ring]")!,
    fields: all("[data-field]"),
    glows: all("[data-glow]"),
    ticks: all("[data-tick]"),
    items: all("[data-item]"),
    blobs: all("[data-blob]"),
    inbound: [],
    outbound: [],
    tin: [],
    tout: [],
    measured: false,
  };
}

/** Draws the lines from where the channels, the record and the parties actually sit, in world units. */
function measure(stage: Stage) {
  const box = stage.grid.getBoundingClientRect();
  if (!box.width) return;
  const k = box.width / stage.layout.ww;
  const at = (el: Element) => {
    const r = el.getBoundingClientRect();
    return { x: (r.left - box.left) / k, y: (r.top - box.top) / k, w: r.width / k, h: r.height / k };
  };
  const phone = stage.layout.name === "phone";
  const svg = stage.svg;
  svg.setAttribute("viewBox", `0 0 ${stage.layout.ww} ${box.height / k}`);
  svg.replaceChildren();
  const line = (d: string) => {
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", d);
    p.setAttribute("fill", "none");
    p.setAttribute("stroke", "rgba(81,81,219,.42)");
    p.setAttribute("stroke-width", "2.2");
    p.setAttribute("stroke-linecap", "round");
    p.setAttribute("stroke-dasharray", `0 ${DOT}`);
    svg.append(p);
    return p;
  };
  const root = stage.grid;
  const hub = at(stage.hub);
  const rec = at(root.querySelector("[data-record]")!);
  // Four entry and exit heights down the record's edges, so the lines never knot.
  const lane = (i: number) => rec.y + rec.h * (0.34 + 0.1 * i);
  stage.inbound = Array.from(root.querySelectorAll("[data-channel]")).map((el, i) => {
    const c = at(el);
    if (phone) {
      const sx = c.x + c.w / 2;
      const sy = c.y + c.h + 8;
      const ex = hub.x + hub.w / 2;
      const ey = hub.y - 8;
      const my = (sy + ey) / 2;
      return line(`M${sx} ${sy} C ${sx} ${my}, ${ex} ${my}, ${ex} ${ey}`);
    }
    const sx = c.x + c.w + 8;
    const sy = c.y + c.h / 2;
    const ex = rec.x - 8;
    const ey = lane(i);
    const mx = (sx + ex) / 2;
    return line(`M${sx} ${sy} C ${mx} ${sy}, ${mx} ${ey}, ${ex} ${ey}`);
  });
  stage.outbound = Array.from(root.querySelectorAll("[data-party]")).map((el, i) => {
    const a = at(el);
    const ey = a.y + a.h / 2;
    if (phone) {
      // Down a lane in the left margin, then in to each party.
      const lx = 34;
      const sy = rec.y + rec.h + 8;
      const sx = rec.x + 40;
      const r = 12;
      return line(`M${sx} ${sy} Q${lx} ${sy} ${lx} ${sy + 24} L${lx} ${ey - r} Q${lx} ${ey} ${lx + r} ${ey} L${a.x - 8} ${ey}`);
    }
    const sx = rec.x + rec.w + 8;
    const sy = lane(i);
    const ex = a.x - 8;
    const mx = (sx + ex) / 2;
    return line(`M${sx} ${sy} C ${mx} ${sy}, ${mx} ${ey}, ${ex} ${ey}`);
  });
  stage.tin = stage.inbound.map((p) => p.getTotalLength() / stage.layout.speed);
  stage.tout = stage.outbound.map((p) => p.getTotalLength() / stage.layout.speed);
  stage.measured = true;
}

function place(el: HTMLElement, path: SVGPathElement, x: number) {
  const pt = path.getPointAtLength(path.getTotalLength() * clamp01(x));
  el.style.left = u(pt.x);
  el.style.top = u(pt.y);
}

/** One frame of the loop: every style is a function of t alone. */
function draw(stage: Stage, t: number) {
  if (!stage.measured) return;
  // The light behind the glass drifts slowly, once round per loop.
  const turn = (2 * Math.PI * t) / DUR;
  stage.blobs.forEach((el, i) => {
    el.style.transform = `translate(${u(28 * Math.sin(turn + i * 2.1))}, ${u(18 * Math.cos(turn + i * 1.7))})`;
  });
  // The dotted lines flow at the items' speed, a whole number of dots per loop so the loop is seamless.
  const dash = DOT * Math.round((stage.layout.speed * DUR) / DOT);
  for (const p of [...stage.inbound, ...stage.outbound]) p.setAttribute("stroke-dashoffset", (-dash * (t / DUR)).toFixed(2));
  let pulse = 0;
  const fieldK = [0, 0, 0, 0];
  const partyK = [0, 0, 0, 0];
  ARRIVALS.forEach(([channel, , field, party], k) => {
    const tin = stage.tin[channel];
    const tout = stage.tout[party];
    const enter = k * STEP;
    // Seconds since this item popped up, wrapping with the loop.
    const p = ((((t - (enter - tin - POP)) % DUR) + DUR) % DUR);
    const inEnd = POP + tin;
    const outStart = inEnd + STEP;
    const outEnd = outStart + tout;
    const item = stage.items[k];
    let opacity = 0;
    let scale = 1;
    if (p < POP) {
      place(item, stage.inbound[channel], 0);
      const s = spring((p / POP) * 1.1, 0.12);
      opacity = clamp01(s * 1.6);
      scale = Math.max(0.01, s);
    } else if (p < inEnd) {
      place(item, stage.inbound[channel], (p - POP) / tin);
      const f = seg(p, inEnd - FADE, inEnd);
      opacity = 1 - f;
      scale = 1 - 0.4 * f;
    } else if (p >= outStart && p < outEnd) {
      place(item, stage.outbound[party], (p - outStart) / tout);
      const a = seg(p, outStart, outStart + FADE);
      const b = seg(p, outEnd - FADE, outEnd);
      opacity = a * (1 - b);
      scale = (0.6 + 0.4 * a) * (1 - 0.4 * b);
    }
    item.style.opacity = opacity.toFixed(3);
    item.style.transform = `scale(${scale.toFixed(3)})`;
    pulse = Math.max(pulse, Math.sin(Math.PI * seg(p, inEnd, inEnd + PULSE)));
    if (p >= inEnd && p < outStart) fieldK[field] = Math.max(fieldK[field], Math.sin(Math.PI * seg(p, inEnd, outStart)));
    partyK[party] = Math.max(partyK[party], Math.sin(Math.PI * seg(p, outEnd, outEnd + GLOW)));
  });
  stage.hub.style.transform = `scale(${(1 + 0.05 * pulse).toFixed(4)})`;
  stage.ring.style.opacity = pulse.toFixed(3);
  stage.ring.style.transform = `scale(${(1 + 0.18 * pulse).toFixed(3)})`;
  stage.fields.forEach((el, i) => (el.style.opacity = fieldK[i].toFixed(3)));
  stage.glows.forEach((el, i) => (el.style.opacity = partyK[i].toFixed(3)));
  stage.ticks.forEach((el, i) => (el.style.transform = `scale(${(1 + 0.25 * partyK[i]).toFixed(3)})`));
}

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/**
 * Claims arrive on any channel, True Aim files them into one claim record,
 * and every update is routed to the party it concerns. Drawn straight on the
 * section: the glass is on each component, not on a box around them.
 *
 * Live HTML, so the copy stays translated. It scales as one picture and
 * stacks below 900px of width. Under reduced motion it holds one frame until
 * the visitor presses play, and the toggle pauses it at any time (WCAG 2.2.2).
 */
export function FlowGlassScene({ data }: { data: FlowGlassData }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stagesRef = useRef<Stage[]>([]);
  const timeRef = useRef(0);
  const visibleRef = useRef(true);
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);
  // Null until the visitor presses the toggle; until then reduced motion decides.
  const [choice, setChoice] = useState<boolean | null>(null);
  const playing = choice ?? !reduced;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const stages = LAYOUTS.map((layout) => collect(root.querySelector<HTMLElement>(`[data-stage="${layout.name}"]`)!, layout));
    stagesRef.current = stages;
    const remeasure = () => {
      stages.forEach((stage) => {
        stage.measured = false;
        measure(stage);
        draw(stage, timeRef.current);
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
  }, []);

  useEffect(() => {
    const drawAll = (t: number) => {
      stagesRef.current.forEach((stage) => {
        if (!stage.measured) measure(stage);
        draw(stage, t);
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
  }, [playing, choice]);

  return (
    <div ref={rootRef} className="@container relative">
      <div role="img" aria-label={data.alt}>
        {LAYOUTS.map((layout) => (
          <div
            key={layout.name}
            data-stage={layout.name}
            className={cn(
              styles.scene,
              styles[layout.name],
              // Below 900px of width the figure stacks: channels, then the record, then the parties.
              layout.name === "desktop" ? "@max-[900px]:hidden" : "hidden @max-[900px]:block",
            )}
          >
            <div data-grid className={styles.grid}>
              <div className={styles.atmo} aria-hidden>
                <i data-blob className={styles.blob} />
                <i data-blob className={styles.blob} />
                <i data-blob className={styles.blob} />
              </div>
              <div className={styles.chans}>
                <p className={styles.lab}>{data.channelsLabel}</p>
                {data.channels.map((channel, i) => {
                  const Icon = CHANNEL_ICONS[i % CHANNEL_ICONS.length];
                  return (
                    <div key={channel} data-channel className={cn(styles.gl, styles.chan)}>
                      <span className={cn(styles.gl, styles.disc)}>
                        <Icon aria-hidden strokeWidth={1.6} className={styles.icon} />
                      </span>
                      <span>{channel}</span>
                    </div>
                  );
                })}
              </div>

              <div className={styles.core}>
                <div data-hub className={cn(styles.gl, styles.hub)}>
                  <Image src="/brand/logo/symbol-blue.svg" alt="" width={143} height={144} unoptimized className={styles.mark} />
                  <i data-ring className={styles.ring} />
                </div>
                <div data-record className={cn(styles.gl, styles.record)}>
                  <p className={styles.title}>{data.record.title}</p>
                  {data.record.fields.map((field) => (
                    <p key={field.label} className={styles.field}>
                      <i data-field />
                      <span>{field.label}</span>
                      <span>{field.value}</span>
                    </p>
                  ))}
                </div>
              </div>

              <div className={styles.parts}>
                <p className={styles.lab}>{data.partiesLabel}</p>
                {data.parties.map((party, i) => {
                  const Icon = PARTY_ICONS[i % PARTY_ICONS.length];
                  return (
                    <div key={party.name} data-party className={cn(styles.gl, styles.party)}>
                      <i data-glow className={styles.glow} />
                      <span className={cn(styles.gl, styles.disc)}>
                        <Icon aria-hidden strokeWidth={1.6} className={styles.icon} />
                      </span>
                      <div>
                        <p className={styles.name}>{party.name}</p>
                        <p className={styles.text}>{party.text}</p>
                      </div>
                      <span data-tick className={styles.tick}>
                        <Check aria-hidden strokeWidth={2.4} />
                      </span>
                    </div>
                  );
                })}
              </div>

              <svg data-links className={styles.links} aria-hidden />
              {ARRIVALS.map(([, Icon], k) => (
                <span key={k} data-item className={cn(styles.gl, styles.item)}>
                  <Icon aria-hidden strokeWidth={1.6} />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* The whole figure is the pause control (WCAG 2.2.2): click, tap, Enter or Space. Its icon shows on hover, on keyboard focus and while paused. */}
      <button
        type="button"
        onClick={() => setChoice(!playing)}
        aria-label={playing ? data.pause : data.play}
        className="group absolute inset-0 z-10 cursor-pointer rounded-[24px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus"
      >
        <span aria-hidden className={cn("pointer-events-none absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-pill bg-card/85 text-body shadow-[0_0_0_1px_rgba(44,43,42,.12)] transition-opacity duration-150 ease-brand group-hover:opacity-100 group-focus-visible:opacity-100", playing ? "opacity-0" : "opacity-100")}>
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </span>
      </button>
    </div>
  );
}
