"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { BrandIcon, type BrandIconName } from "@/components/brand/BrandIcon";
import { SectionHead } from "@/components/content/SectionHead";
import { section, type Tone } from "@/components/content/surface";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import g from "./scenes/glass.module.css";
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

export type ProductRailLabels = { previous: string; next: string; pause: string; play: string };

/** How long a tile stays open before the row moves on by itself. */
const TURN_MS = 5500;
/** A drag this far along the row, in pixels, moves it one tile. */
const SWIPE = 40;

/**
 * The products as one row of tiles: the open tile is large and shows a still
 * of its product's scene, with the benefit and the link under it; the others
 * are small glass tiles with the product's icon and name. The row moves on by
 * itself, one tile at a time, and the arrows, a tile, the arrow keys or a
 * swipe move it by hand. The turn waits while the pointer or the keyboard
 * focus is on the row, the pause button stops it, and it does not start under
 * reduced motion (WCAG 2.2.2).
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
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false);
  const dragFrom = useRef<number | null>(null);
  const count = items.length;
  const turning = !paused && !held && !reduced && count > 1;

  useEffect(() => {
    if (!turning) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % count), TURN_MS);
    return () => window.clearTimeout(timer);
  }, [turning, index, count]);

  const go = (to: number) => setIndex((to + count) % count);

  return (
    <section className={cn(section(tone), styles.section)}>
      <div className="mx-auto max-w-7xl">
        <SectionHead heading={heading} center />
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label={heading}
          onPointerEnter={(event) => event.pointerType === "mouse" && setHeld(true)}
          onPointerLeave={() => setHeld(false)}
          onFocus={() => setHeld(true)}
          onBlur={() => setHeld(false)}
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
                  {i === index && <i key={`${index}-${turning}`} className={turning ? styles.filling : styles.full} style={{ animationDuration: `${TURN_MS}ms` }} />}
                </span>
              ))}
            </div>
            <div className={styles.right}>
              {!reduced && (
                <button type="button" className={styles.round} aria-label={paused ? labels.play : labels.pause} onClick={() => setPaused(!paused)}>
                  {paused ? <Play aria-hidden strokeWidth={1.6} /> : <Pause aria-hidden strokeWidth={1.6} />}
                </button>
              )}
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
            }}
          >
            <ul className={styles.track} style={{ "--i": index } as CSSProperties}>
              {items.map((item, i) => {
                const open = i === index;
                return (
                  <li key={item.key} className={cn(styles.item, open && styles.open)}>
                    <div className={styles.tile}>
                      <button
                        type="button"
                        className={cn(g.gloss, styles.face)}
                        style={{ "--u": "1px" } as CSSProperties}
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
