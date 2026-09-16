import { cn } from "@/lib/utils";

/** Atmospheric violet glow discs from the Graphics / Patterns pages (exact radial stops from the source). */
export function Glow({
  size = 213,
  width,
  height,
  variant = "core",
  opacity = 1,
  className,
  style,
}: {
  size?: number;
  width?: number;
  height?: number;
  variant?: "core" | "soft" | "rim";
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const w = width ?? size;
  const h = height ?? size;
  const bg = variant === "rim" ? "var(--ta-rim-glow)" : variant === "soft" ? "var(--ta-glow-soft)" : "var(--ta-glow)";
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none rounded-full", className)}
      style={{ width: w, height: h, background: bg, opacity, mixBlendMode: variant === "rim" ? "screen" : "normal", ...style }}
    />
  );
}

/** Horizontal blue sweep from the Decision Focus / Texture frames. */
export function Sweep({
  width = 449,
  height = 449,
  direction = "right",
  round = false,
  opacity = 0.8,
  className,
  style,
}: {
  width?: number | string;
  height?: number | string;
  direction?: "left" | "right";
  round?: boolean;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none", className)}
      style={{ width, height, opacity, borderRadius: round ? "50%" : 0, background: "var(--ta-sweep)", transform: direction === "left" ? "scaleX(-1)" : "none", ...style }}
    />
  );
}
