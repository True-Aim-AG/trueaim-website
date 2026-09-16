import { cn } from "@/lib/utils";
import { BRAND_ICON_PATHS } from "./icon-paths";

/**
 * The 25 True Aim process icons (40px grid, 1.5px stroke, one accent element), rendered inline so
 * they follow the theme: line = Deep Charcoal / Primary Light, accent = True Aim Blue / Light Blue.
 * Pass `color` to flatten the icon to one colour (e.g. on a brand-blue plate).
 */
export const BRAND_ICON_NAMES = [
  "claim", "classification", "conditions", "control", "data", "decision", "document", "extraction",
  "human-review", "ingestion", "learning-loop", "logic", "mira", "match", "policy", "process", "processing",
  "quality", "rule-applied", "rules", "structure", "structured-data", "traceability", "upload", "workflow",
] as const;

export type BrandIconName = (typeof BRAND_ICON_NAMES)[number];

interface BrandIconProps {
  name: BrandIconName;
  size?: number;
  /** Flatten to one colour (any CSS colour, e.g. "var(--text-on-brand)"). */
  color?: string;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function BrandIcon({ name, size = 40, color, title, className, style }: BrandIconProps) {
  const vars = color
    ? ({ "--icon-line": color, "--icon-accent": color } as React.CSSProperties)
    : undefined;
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      fill="none"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn("brand-icon inline-block shrink-0 select-none", className)}
      style={{ width: size, height: size, ...vars, ...style }}
      dangerouslySetInnerHTML={{ __html: BRAND_ICON_PATHS[name] }}
    />
  );
}
