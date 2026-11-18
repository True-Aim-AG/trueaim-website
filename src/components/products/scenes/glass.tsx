"use client";

import { Pause, Play } from "lucide-react";
import { type RefObject, useEffect, useRef, useState, useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

/** Shared by the glass scenes: the motion maths, the loop clock and the pause control. */

export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
export const lerp = (a: number, b: number, x: number) => a + (b - a) * x;
export const easeOut = (x: number) => 1 - Math.pow(1 - clamp01(x), 3);
export const easeInOut = (x: number) => {
  x = clamp01(x);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
/** The platform demo's spring: settles by x = 1.4, overshooting by `over`. */
export function spring(x: number, over = 0.06) {
  if (x <= 0) return 0;
  if (x >= 1.4) return 1;
  const ln = Math.log(over);
  const z = -ln / Math.sqrt(Math.PI * Math.PI + ln * ln);
  const w = 7 / z;
  const wd = w * Math.sqrt(1 - z * z);
  return 1 - Math.exp(-z * w * x) * (Math.cos(wd * x) + (z / Math.sqrt(1 - z * z)) * Math.sin(wd * x));
}
/** n world units as a CSS length. */
export const u = (n: number) => `calc(${n} * var(--u))`;

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/**
 * The loop clock of a glass scene. `prepare` collects and measures the scene's
 * elements and returns the function that draws one frame at time t; it runs
 * again when the fonts arrive and whenever the scene is resized. Under reduced
 * motion the scene holds the `still` frame until the visitor presses play.
 * `frozen` holds that frame for good: the scene is then a picture, as in the
 * home page's product row.
 */
export function useGlassLoop(
  rootRef: RefObject<HTMLElement | null>,
  dur: number,
  still: number,
  prepare: (root: HTMLElement) => (t: number) => void,
  frozen = false,
) {
  const drawRef = useRef<(t: number) => void>(() => {});
  const timeRef = useRef(0);
  const visibleRef = useRef(true);
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);
  // Null until the visitor presses the toggle; until then reduced motion decides.
  const [choice, setChoice] = useState<boolean | null>(null);
  const playing = frozen ? false : (choice ?? !reduced);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const rebuild = () => {
      drawRef.current = prepare(root);
      drawRef.current(timeRef.current);
    };
    rebuild();
    void document.fonts.ready.then(rebuild);
    const resize = new ResizeObserver(rebuild);
    resize.observe(root);
    const seen = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    });
    seen.observe(root);
    return () => {
      resize.disconnect();
      seen.disconnect();
    };
  }, [rootRef, prepare]);

  // Run the clock while playing; hold the frame while paused.
  useEffect(() => {
    if (!playing) {
      if (choice === null) timeRef.current = still;
      drawRef.current(timeRef.current);
      return;
    }
    const start = performance.now() - timeRef.current * 1000;
    let frame = requestAnimationFrame(function tick(now) {
      // The first frame can be stamped a moment before the clock was started.
      timeRef.current = (Math.max(0, now - start) / 1000) % dur;
      if (visibleRef.current) drawRef.current(timeRef.current);
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [playing, choice, dur, still]);

  return { playing, toggle: () => setChoice(!playing) };
}

/** The whole figure is the pause control (WCAG 2.2.2): click, tap, Enter or Space. Its icon is kept very small and shows only on keyboard focus and while paused. */
export function GlassPause({
  playing,
  toggle,
  pause,
  play,
  side = "right",
}: {
  playing: boolean;
  toggle: () => void;
  pause: string;
  play: string;
  /** The corner the icon sits in; left where an action sits in the bottom right corner. */
  side?: "left" | "right";
}) {
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? pause : play}
      className="group absolute inset-0 z-10 cursor-pointer rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus"
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute bottom-2 flex h-4 w-4 items-center justify-center rounded-pill bg-card/70 text-muted transition-opacity duration-150 ease-brand group-focus-visible:opacity-80",
          side === "left" ? "left-2" : "right-2",
          playing ? "opacity-0" : "opacity-50",
        )}
      >
        {playing ? <Pause size={8} /> : <Play size={8} />}
      </span>
    </button>
  );
}
