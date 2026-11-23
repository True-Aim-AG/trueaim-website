"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { SectionHead } from "@/components/content/SectionHead";
import { section, type Tone } from "@/components/content/surface";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import styles from "./ProductRail.module.css";

export type ProductRailItem = {
  key: string;
  /** The short name on the closed tile. */
  name: string;
  icon: BrandIconName;
  /** The picture the open tile shows: a still of the product's scene. */
  still: ReactNode;
  title: string;
  text: string;
  href: string;
  linkLabel: string;
};

export type ProductRailLabels = { previous: string; next: string };

/** How long a tile stays open before the row moves on by itself. */
const TURN_MS = 5500;
/** The turn waits only once the pointer has rested on the row this long; a pointer passing over does not stop it. */
const REST_MS = 1500;
/** A drag this far along the row, in pixels, moves it one tile. */
const SWIPE = 40;

/** Where a tile sits from the open one: 0 is open, negative to its left, positive to its right; the row is a ring. */
const offset = (i: number, open: number, count: number) => {
  const d = (((i - open) % count) + count) % count;
  return d > count / 2 ? d - count : d;
};

/** The left edge of a tile at that place, measured from the middle of the row. */
const place = (d: number) =>
  d === 0
    ? "calc(var(--ow) / -2)"
    : d > 0
      ? `calc(var(--ow) / 2 + var(--gap) + ${d - 1} * (var(--cw) + var(--gap)))`
      : `calc(var(--ow) / -2 - ${-d} * (var(--cw) + var(--gap)))`;

/**
 * The products as one row of tiles: the open tile is large and shows a still
 * of its product's scene, with the benefit and the link under it; the others
 * are small glass tiles with the product's icon and name. The open tile is
 * always in the middle with tiles on both sides: the row is a ring, it opens
 * on the middle product, and a tile that leaves one end fades in at the other.
 * The row moves on by
 * itself, one tile at a time, and the arrows, a tile, the arrow keys or a
 * swipe move it by hand. The turn waits while the pointer rests on the row
 * (a pointer only passing over does not stop it) and while the keyboard focus
 * is on it; a tap on the picture stops and restarts it on a touch screen, and
 * it does not start under reduced motion (WCAG 2.2.2). The three holds are
 * kept apart, so a click that moves the focus does not release the pointer's
 * hold.
 */
export function ProductRail({
  heading,
  items,
  labels,
  tone = "white",
}: {
  heading: string;
  items: ProductRailItem[];
  labels: ProductRailLabels;
  tone?: Tone;
}) {
  const reduced = useReducedMotion();
  /** The open tile, the step that opened it (to see which tile went round the ring) and the count of moves. */
  const [ring, setRing] = useState({ index: Math.floor(items.length / 2), step: 0, moves: 0 });
  const index = ring.index;
  /** The pointer rests on the row. */
  const [resting, setResting] = useState(false);
  /** The keyboard focus is in the row. */
  const [focused, setFocused] = useState(false);
  /** A tap on the picture stopped the turn (touch screens). */
  const [tapped, setTapped] = useState(false);
  const held = resting || focused || tapped;
  const groupRef = useRef<HTMLDivElement>(null);
  const dragFrom = useRef<number | null>(null);
  const rest = useRef<number | undefined>(undefined);
  /** How much of the open tile's turn is still to run; a wait stops the clock and does not start it again. */
  const left = useRef(TURN_MS);
  /** Set when the turn was held at its very end: the clock's cleanup then gives the tile a full turn again. */
  const renew = useRef(false);
  /** The last pointer on the row was a mouse, and when it last moved (ms). Touch screens keep :hover after a tap. */
  const mouse = useRef({ on: false, moved: 0 });
  const count = items.length;
  const turning = !held && !reduced && count > 1;

  // A new tile gets a full turn. Declared before the clock below, so it runs first when the tile changes.
  useEffect(() => {
    left.current = TURN_MS;
  }, [index]);

  useEffect(() => {
    if (!turning) return;
    const started = performance.now();
    const timer = window.setTimeout(() => {
      // A mouse the page scrolled onto the row has sent no event yet; if it rests there, the row still holds.
      // A pointer only passing over is still moving, and the rest timer decides for it.
      const still = performance.now() - mouse.current.moved > REST_MS;
      if (mouse.current.on && still && window.matchMedia("(hover: hover)").matches && groupRef.current?.matches(":hover")) {
        renew.current = true;
        setResting(true);
        return;
      }
      setRing((r) => ({ index: (r.index + 1) % count, step: 1, moves: r.moves + 1 }));
    }, left.current);
    return () => {
      window.clearTimeout(timer);
      left.current = renew.current ? TURN_MS : Math.max(0, left.current - (performance.now() - started));
      renew.current = false;
    };
  }, [turning, index, count]);

  useEffect(() => () => window.clearTimeout(rest.current), []);

  const go = (to: number) =>
    setRing((r) => {
      const next = (to + count) % count;
      return next === r.index ? r : { index: next, step: offset(next, r.index, count), moves: r.moves + 1 };
    });
  const before = (index - ring.step + count) % count;

  return (
    <section className={cn(section(tone), styles.section, "md:pt-20")}>
      <div className="mx-auto max-w-7xl">
        <SectionHead heading={heading} center className="mb-10" />
        <div
          ref={groupRef}
          role="group"
          aria-roledescription="carousel"
          aria-label={heading}
          onPointerMove={(event) => {
            mouse.current = { on: event.pointerType === "mouse", moved: performance.now() };
            // The wait starts once the pointer is on the row; moving on the row keeps it, leaving ends it.
            if (event.pointerType !== "mouse" || resting || rest.current !== undefined) return;
            rest.current = window.setTimeout(() => setResting(true), REST_MS);
          }}
          onPointerLeave={(event) => {
            mouse.current.on = false;
            if (event.pointerType !== "mouse") return;
            window.clearTimeout(rest.current);
            rest.current = undefined;
            setResting(false);
          }}
          onFocus={(event) => event.target.matches(":focus-visible") && setFocused(true)}
          onBlur={(event) => {
            // Only the keyboard's hold ends here, and only when the focus leaves the row.
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") go(index + 1);
            else if (event.key === "ArrowLeft") go(index - 1);
          }}
        >
          <div className={styles.controls}>
            <button type="button" className={styles.round} aria-label={labels.previous} onClick={() => go(index - 1)}>
              <ArrowLeft aria-hidden strokeWidth={1.6} />
            </button>
            <div className={styles.progress} aria-hidden>
              {items.map((item, i) => (
                <span key={item.key} className={cn(i < index && styles.done)}>
                  {/* The open tile's mark fills while its turn runs, so the move to the next one is expected. */}
                  {i === index && (
                    <i
                      key={index}
                      className={reduced ? styles.full : styles.filling}
                      style={{ animationDuration: `${TURN_MS}ms`, animationPlayState: turning ? "running" : "paused" }}
                    />
                  )}
                </span>
              ))}
            </div>
            <div className={styles.right}>
              <button type="button" className={styles.round} aria-label={labels.next} onClick={() => go(index + 1)}>
                <ArrowRight aria-hidden strokeWidth={1.6} />
              </button>
            </div>
          </div>

          <div
            className={styles.viewport}
            onPointerDown={(event) => {
              dragFrom.current = event.clientX;
            }}
            onPointerUp={(event) => {
              const from = dragFrom.current;
              dragFrom.current = null;
              if (from === null || event.pointerType === "mouse") return;
              const moved = event.clientX - from;
              if (moved < -SWIPE) go(index + 1);
              else if (moved > SWIPE) go(index - 1);
              // A tap on the picture, not on a tile or a link, stops the turn and starts it again.
              else if (Math.abs(moved) < 8 && !(event.target as HTMLElement).closest("button, a")) setTapped((value) => !value);
            }}
          >
            <ul className={styles.track}>
              {items.map((item, i) => {
                const open = i === index;
                const d = offset(i, index, count);
                // A tile that went round the ring jumps to the other end and fades in there; it does not cross the row.
                const wrapped = ring.step !== 0 && d !== offset(i, before, count) - ring.step;
                return (
                  <li
                    key={item.key}
                    className={cn(styles.item, open && styles.open, wrapped && (ring.moves % 2 ? styles.enterA : styles.enterB))}
                    style={{ "--x": place(d) } as CSSProperties}
                  >
                    <div className={styles.tile}>
                      <button
                        type="button"
                        className={styles.face}
                        aria-current={open ? "true" : undefined}
                        tabIndex={open ? -1 : 0}
                        onClick={() => go(i)}
                      >
                        <BrandIcon name={item.icon} size={44} />
                        <span>{item.name}</span>
                      </button>
                      {/* The still keeps the open tile's width, so the row's move never lays it out again. */}
                      <div className={styles.still} inert={!open}>
                        {item.still}
                      </div>
                    </div>
                    <div className={styles.copy} inert={!open}>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                      <Link href={item.href} className={styles.link}>
                        {item.linkLabel}
                        <ArrowUpRight aria-hidden strokeWidth={1.8} />
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
