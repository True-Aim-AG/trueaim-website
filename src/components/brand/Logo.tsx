import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * True Aim logo lock-ups (supplied brand SVGs in /public/brand/logo).
 * Horizontal is the default. Use the `-light` variants on dark bands and on True Aim Blue.
 * Never pair the wordmark with a blue symbol. Clear space = symbol height.
 */
export type LogoVariant =
  | "horizontal-dark"
  | "horizontal-light"
  | "vertical-dark"
  | "vertical-light"
  | "wordmark-dark"
  | "wordmark-light"
  | "symbol-blue"
  | "symbol-dark"
  | "symbol-light"
  | "symbol-lightblue"
  | "symbol-lilac";

/* Intrinsic width/height ratios of the supplied SVGs (viewBox based). */
const RATIO: Record<LogoVariant, number> = {
  "horizontal-dark": 563.29 / 123.47,
  "horizontal-light": 563.29 / 123.47,
  "vertical-dark": 415.72 / 272.43,
  "vertical-light": 415.72 / 272.43,
  "wordmark-dark": 415.72 / 84.07,
  "wordmark-light": 415.72 / 84.07,
  "symbol-blue": 142.96 / 144.17,
  "symbol-dark": 142.96 / 144.17,
  "symbol-light": 142.96 / 144.17,
  "symbol-lightblue": 142.96 / 144.17,
  "symbol-lilac": 142.96 / 144.17,
};

const FILE: Record<LogoVariant, string> = {
  "horizontal-dark": "logo-horizontal-dark.svg",
  "horizontal-light": "logo-horizontal-light.svg",
  "vertical-dark": "logo-vertical-dark.svg",
  "vertical-light": "logo-vertical-light.svg",
  "wordmark-dark": "wordmark-dark.svg",
  "wordmark-light": "wordmark-light.svg",
  "symbol-blue": "symbol-blue.svg",
  "symbol-dark": "symbol-dark.svg",
  "symbol-light": "symbol-light.svg",
  "symbol-lightblue": "symbol-lightblue.svg",
  "symbol-lilac": "symbol-lilac.svg",
};

interface LogoProps {
  variant?: LogoVariant;
  /** Rendered height in px. Minimums: horizontal 26px (120px wide), vertical 60px, symbol 24px. */
  height?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
}

export function Logo({ variant = "horizontal-dark", height = 40, className, priority, alt = "True Aim" }: LogoProps) {
  const width = Math.round(height * RATIO[variant]);
  return (
    <Image
      src={`/brand/logo/${FILE[variant]}`}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      unoptimized
      className={cn("block w-auto select-none", className)}
      style={{ height, width: "auto" }}
    />
  );
}

/** Theme-aware lock-up: light (white) logo on the dark site default, dark logo inside data-theme="light" contexts. */
export function ThemedLogo({
  kind = "horizontal",
  height = 40,
  className,
  priority,
}: {
  kind?: "horizontal" | "vertical" | "wordmark" | "symbol";
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  const dark: LogoVariant = kind === "symbol" ? "symbol-dark" : (`${kind}-dark` as LogoVariant);
  const light: LogoVariant = kind === "symbol" ? "symbol-light" : (`${kind}-light` as LogoVariant);
  return (
    <>
      <Logo variant={dark} height={height} className={cn("light-only", className)} priority={priority} />
      <Logo variant={light} height={height} className={cn("dark-only", className)} priority={priority} />
    </>
  );
}
