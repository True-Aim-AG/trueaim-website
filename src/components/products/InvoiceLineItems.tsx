"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { StatusPill } from "@/components/brand/StatusPill";

export type LineItem = {
  description: string;
  quantity: string;
  amount: string;
  status: "approved" | "referred" | "denied";
  deviation: string;
  saving: string;
  note: string;
};

/** Invoice lines with a status each. One line is open at a time; the first starts open. */
export function InvoiceLineItems({
  heading,
  headingLevel = "h2",
  intro,
  labels,
  items,
  total,
}: {
  heading: string;
  headingLevel?: "h2" | "h3";
  intro?: string;
  labels: {
    quantity: string;
    amount: string;
    deviation: string;
    saving: string;
    status: Record<"approved" | "referred" | "denied", string>;
  };
  items: LineItem[];
  total: { label: string; value: string };
}) {
  const Heading = headingLevel;
  const baseId = useId();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Heading className="text-center font-display text-3xl md:text-4xl font-bold text-strong">
          {heading}
        </Heading>
        {intro && (
          <p className="mt-4 text-lg text-body max-w-2xl mx-auto text-center">{intro}</p>
        )}
        <div className="mt-12 bg-card shadow-card rounded-pill p-6 md:p-8">
          <ul>
            {items.map((item, index) => {
              const panelId = `${baseId}-panel-${index}`;
              const isOpen = open === index;
              return (
                <li key={item.description}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={isOpen ? panelId : undefined}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="w-full text-left flex items-center justify-between gap-4 py-4 border-b border-hairline"
                  >
                    <span className="flex-1 text-strong">{item.description}</span>
                    <span className="text-muted text-sm">
                      <span className="sr-only">{labels.quantity}: </span>
                      {item.quantity}
                    </span>
                    <span className="font-display font-semibold tabular-nums text-strong">
                      <span className="sr-only">{labels.amount}: </span>
                      {item.amount}
                    </span>
                    <StatusPill tone={item.status}>{labels.status[item.status]}</StatusPill>
                  </button>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      className="py-4 grid gap-2 text-sm"
                      initial={reduced ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <p className="flex justify-between gap-4">
                        <span className="text-muted">{labels.deviation}</span>
                        <span className="text-strong">{item.deviation}</span>
                      </p>
                      <p className="flex justify-between gap-4">
                        <span className="text-muted">{labels.saving}</span>
                        <span className="text-approved-dark font-semibold tabular-nums">
                          {item.saving}
                        </span>
                      </p>
                      <p className="text-body">{item.note}</p>
                    </motion.div>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="flex items-center justify-between gap-4 pt-4">
            <span className="text-strong">{total.label}</span>
            <span className="font-display font-semibold tabular-nums text-strong">
              {total.value}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
