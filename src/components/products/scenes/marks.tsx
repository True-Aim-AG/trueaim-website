import { cn } from "@/lib/utils";

/** The flat blue hexagon the prototype uses as a marker inside its product scenes. */
export function HexDot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("shrink-0 text-accent", className)}>
      <polygon points="12,1.5 21.1,6.75 21.1,17.25 12,22.5 2.9,17.25 2.9,6.75" fill="currentColor" />
    </svg>
  );
}

/** A hexagon with a tick: the "done" mark inside the product scenes. */
export function HexCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("shrink-0", className)}>
      <polygon
        points="12,1.5 21.1,6.75 21.1,17.25 12,22.5 2.9,17.25 2.9,6.75"
        fill="#EFF4FE"
        stroke="#5151DB"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M7.6 12.2l3 3 5.8-6.4" fill="none" stroke="#5151DB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export type Outcome = "approved" | "referred" | "denied";

/** Semantic colour per outcome, as small indicators only (bars, dots, borders, emphasis text). */
export const BAR: Record<Outcome, string> = {
  approved: "bg-approved-base",
  referred: "bg-referred-base",
  denied: "bg-denied-base",
};

export const EDGE: Record<Outcome, string> = {
  approved: "border-approved-base",
  referred: "border-referred-base",
  denied: "border-denied-base",
};

export const INK: Record<Outcome, string> = {
  approved: "text-approved-dark",
  referred: "text-referred-dark",
  denied: "text-denied-dark",
};
