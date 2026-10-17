"use client";

import { useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Glow } from "@/components/brand/Glow";
import { cn } from "@/lib/utils";

export type OtusPrompt = { id: string; tab: string; prompt: string; answer: string[] };

/** Example questions to Otus with its answer, switched by tabs. */
export function OtusPrompts({
  label,
  youLabel,
  otusLabel,
  prompts,
}: {
  label: string;
  youLabel: string;
  otusLabel: string;
  prompts: OtusPrompt[];
}) {
  const baseId = useId();
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = prompts[selected];

  const move = (to: number) => {
    setSelected(to);
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
    <div className="relative rounded-pill bg-lilac p-6 md:p-8 overflow-hidden">
      <Glow variant="soft" size={360} className="absolute -right-24 -top-24 z-0" />
      <div className="relative z-10">
        <div role="tablist" aria-label={label} className="flex flex-wrap gap-2 mb-6">
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
                onClick={() => setSelected(index)}
                onKeyDown={onKeyDown}
                className={cn(
                  "rounded-pill px-5 py-2.5 text-sm font-medium transition-colors duration-150 ease-brand",
                  isSelected ? "bg-accent text-on-brand" : "bg-card text-body shadow-card",
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
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="text-caption-sm text-subtle mb-1">{youLabel}</p>
          <p className="rounded-pill bg-accent-soft px-6 py-4 text-body">{current.prompt}</p>
          <p className="text-caption-sm text-subtle mb-1 mt-6">{otusLabel}</p>
          <div className="rounded-pill bg-card shadow-card px-6 py-5 space-y-3">
            {current.answer.map((paragraph) => (
              <p key={paragraph} className="text-sm text-body leading-[1.6]">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
