import { cn } from "@/lib/utils";

/** Structured grid: 1px line lattice (48px pitch) behind hero content. `isometric` mirrors the rotated grid. */
export function GridPattern({
  step = 48,
  color = "var(--grid-line)",
  isometric = false,
  fade = true,
  className,
  style,
}: {
  step?: number;
  color?: string;
  isometric?: boolean;
  fade?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const lines = isometric
    ? `repeating-linear-gradient(60deg,${color} 0 1px,transparent 1px ${step}px),repeating-linear-gradient(-60deg,${color} 0 1px,transparent 1px ${step}px)`
    : `repeating-linear-gradient(0deg,${color} 0 1px,transparent 1px ${step}px),repeating-linear-gradient(90deg,${color} 0 1px,transparent 1px ${step}px)`;
  const mask = fade ? "radial-gradient(ellipse at center,#000 40%,transparent 100%)" : undefined;
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none", className)}
      style={{ background: lines, WebkitMaskImage: mask, maskImage: mask, ...style }}
    />
  );
}
