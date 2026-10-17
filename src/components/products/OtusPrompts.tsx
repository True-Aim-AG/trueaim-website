"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SCENE_CARD, SCENE_CARD_HERO } from "@/components/content/surface";
import { cn } from "@/lib/utils";
import { HexDot } from "./scenes/marks";

export type OtusPrompt = { id: string; tab: string; prompt: string; answer: string[]; actions?: string[] };

const ROTATE_MS = 4000;

/**
 * Otus as the prototype draws it: a product card with Otus's name, three
 * scenarios as tabs, the question and the answer as a short exchange with
 * the actions Otus offers, and the line on decision rights at the foot. The
 * scenarios rotate on their own until the visitor picks one.
 */
export function OtusPrompts({
  label,
  footer,
  youLabel,
  otusLabel,
  prompts,
  hero,
}: {
  label: string;
  footer?: string;
  youLabel: string;
  otusLabel: string;
  prompts: OtusPrompt[];
  hero?: boolean;
}) {
  const baseId = useId();
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState(0);
  const [auto, setAuto] = useState(true);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = prompts[selected];

  useEffect(() => {
    if (!auto || reduced || prompts.length < 2) return;
    const timer = window.setInterval(() => setSelected((index) => (index + 1) % prompts.length), ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [auto, reduced, prompts.length]);

  const pick = (to: number) => {
    setAuto(false);
    setSelected(to);
  };

  const move = (to: number) => {
    pick(to);
    tabRefs.current[to]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = prompts.length - 1;
    if (event.key === "ArrowRight") move(selected === last ? 0 : selected + 1);
    else if (event.key === "ArrowLeft") move(selected === 0 ? last : selected - 1);
    else if (event.key === "Home") move(0);
    else if (event.key === "End") move(last);
    else return;
    event.preventDefault();
  };

  if (!current) return null;

  return (
    <div role="group" aria-label={label} className={cn(SCENE_CARD, hero && SCENE_CARD_HERO)}>
      <div className="flex items-center gap-3 border-b border-hairline px-3.5 py-3.5">
        <HexDot className="h-[18px] w-[18px]" />
        <p className="font-display text-[15px] font-semibold leading-[1.2] text-strong">{otusLabel}</p>
      </div>
      <div role="tablist" aria-label={label} className="flex flex-wrap gap-2 px-3.5 pt-3">
        {prompts.map((prompt, index) => {
          const isSelected = index === selected;
          return (
            <button
              key={prompt.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${prompt.id}`}
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel-${prompt.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => pick(index)}
              onKeyDown={onKeyDown}
              className={cn(
                "rounded-pill px-3.5 py-[9px] text-[12.5px] font-medium leading-none transition-colors duration-300 ease-brand focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus",
                isSelected ? "bg-accent text-on-brand" : "bg-ta-blue-50 text-ta-blue-700 hover:bg-ta-blue-100",
              )}
            >
              {prompt.tab}
            </button>
          );
        })}
      </div>
      <motion.div
        key={current.id}
        role="tabpanel"
        id={`${baseId}-panel-${current.id}`}
        aria-labelledby={`${baseId}-tab-${current.id}`}
        tabIndex={0}
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="flex min-h-[236px] flex-col gap-2.5 px-3.5 py-3.5"
      >
        <p className="sr-only">{youLabel}</p>
        <p className="max-w-[78%] self-end rounded-[18px_18px_4px_18px] bg-accent px-3.5 py-2.5 text-[13px] leading-[1.5] text-on-brand">
          {current.prompt}
        </p>
        <p className="sr-only">{otusLabel}</p>
        <div className="max-w-[88%] self-start rounded-[18px_18px_18px_4px] bg-page px-3.5 py-3 shadow-[0_0_0_1px_rgba(44,43,42,.06)]">
          {current.answer.map((paragraph) => (
            <p key={paragraph} className="text-[13px] leading-[1.5] text-body [&+&]:mt-2">
              {paragraph}
            </p>
          ))}
          {current.actions && current.actions.length > 0 && (
            <ul className="mt-2.5 flex flex-wrap gap-1.5">
              {current.actions.map((action) => (
                <li
                  key={action}
                  className="rounded-pill bg-white px-2.5 py-1.5 text-[11.5px] font-medium leading-none text-ta-blue-700 shadow-[inset_0_0_0_1px_var(--ta-blue-200)]"
                >
                  {action}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
      {footer && <p className="border-t border-hairline bg-page px-3.5 py-3 text-[12px] text-muted">{footer}</p>}
    </div>
  );
}
