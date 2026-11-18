"use client";

import { FileText, HardHat, type LucideIcon, User, UserCheck, Users, Workflow } from "lucide-react";
import { type CSSProperties, useEffect, useId, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { SCENE_CARD } from "@/components/content/surface";
import { cn } from "@/lib/utils";

import g from "./scenes/glass.module.css";
import styles from "./RoutingTabs.module.css";

export type RoutingTabsData = {
  heading: string;
  note: string;
  claimLabel: string;
  rulesLabel: string;
  whenLabel: string;
  receivesLabel: string;
  items: { id: string; tab: string; when: string; receives: string }[];
};

/** Who sits at the end of each route, in the order of the copy. */
const DESK_ICONS: LucideIcon[] = [User, Users, UserCheck, HardHat];
/** How long each route stays open before the next one opens by itself. */
const ROTATE_MS = 7000;

/**
 * Where a claim goes, as a stack of tabs: one route per tab, and for the open
 * one a still picture of the route with when it applies and what the desk
 * receives. The routes open in turn until the visitor picks one; the turn
 * waits while the pointer or the keyboard focus is on the figure, and it does
 * not start under reduced motion.
 */
export function RoutingTabs({ data }: { data: RoutingTabsData }) {
  const baseId = useId();
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState(0);
  const [auto, setAuto] = useState(true);
  const [held, setHeld] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const items = data.items;
  const turning = auto && !held && !reduced && items.length > 1;

  useEffect(() => {
    if (!turning) return;
    const timer = window.setTimeout(() => setSelected((index) => (index + 1) % items.length), ROTATE_MS);
    return () => window.clearTimeout(timer);
  }, [turning, selected, items.length]);

  const pick = (to: number) => {
    setAuto(false);
    setSelected(to);
  };
  const move = (to: number) => {
    pick(to);
    tabRefs.current[to]?.focus();
  };
  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = items.length - 1;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") move(selected === last ? 0 : selected + 1);
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") move(selected === 0 ? last : selected - 1);
    else if (event.key === "Home") move(0);
    else if (event.key === "End") move(last);
    else return;
    event.preventDefault();
  };

  const current = items[selected];
  if (!current) return null;
  const Desk = DESK_ICONS[selected] ?? User;

  return (
    <div
      className={cn(SCENE_CARD, g.stage, styles.frame, "relative rounded-[10px]")}
      style={{ "--u": "1px" } as CSSProperties}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <div className={g.ground} />
      <div className={styles.layout}>
        <div role="tablist" aria-label={data.heading} aria-orientation="vertical" className={styles.tabs}>
          {items.map((item, index) => {
            const isSelected = index === selected;
            const Icon = DESK_ICONS[index] ?? User;
            return (
              <button
                key={item.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${item.id}`}
                aria-selected={isSelected}
                aria-controls={`${baseId}-panel`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => pick(index)}
                onKeyDown={onKeyDown}
                className={cn(styles.tab, isSelected && cn(g.gloss, styles.on))}
              >
                <Icon aria-hidden strokeWidth={1.6} />
                <span>{item.tab}</span>
                {/* The open tab fills while its turn runs, so the move to the next one is expected. */}
                {isSelected && turning && <i key={selected} aria-hidden style={{ animationDuration: `${ROTATE_MS}ms` }} />}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${current.id}`}
          className={cn(g.gloss, styles.panel)}
        >
          <div key={current.id} className={styles.body}>
            <div className={styles.route} aria-hidden>
              <span className={styles.node}>
                <FileText strokeWidth={1.5} />
                {data.claimLabel}
              </span>
              <i />
              <span className={styles.node}>
                <Workflow strokeWidth={1.5} />
                {data.rulesLabel}
              </span>
              <i />
              <span className={cn(styles.node, styles.desk)}>
                <Desk strokeWidth={1.5} />
                {current.tab}
              </span>
            </div>
            <dl className={styles.facts}>
              <div>
                <dt>{data.whenLabel}</dt>
                <dd>{current.when}</dd>
              </div>
              <div>
                <dt>{data.receivesLabel}</dt>
                <dd>{current.receives}</dd>
              </div>
            </dl>
          </div>
          <p className={styles.note}>{data.note}</p>
        </div>
      </div>
    </div>
  );
}
