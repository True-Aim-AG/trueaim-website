import { cn } from "@/lib/utils";

/** Status pill: semantic triads applied to labels (light = bg, base = dot, dark = text). Pill radius 40. */
export type StatusTone = "neutral" | "progress" | "approved" | "referred" | "denied" | "help";

const TONES: Record<StatusTone, [string, string, string]> = {
  neutral: ["--ta-neutral-status-light", "--ta-neutral-status-base", "--ta-neutral-status-dark"],
  progress: ["--ta-progress-light", "--ta-progress-base", "--ta-progress-dark"],
  approved: ["--ta-approved-light", "--ta-approved-base", "--ta-approved-dark"],
  referred: ["--ta-referred-light", "--ta-referred-base", "--ta-referred-dark"],
  denied: ["--ta-denied-light", "--ta-denied-base", "--ta-denied-dark"],
  help: ["--ta-help-light", "--ta-help-base", "--ta-help-dark"],
};

const LABELS: Record<StatusTone, string> = {
  neutral: "Disabled",
  progress: "In progress",
  approved: "Approved",
  referred: "Referred",
  denied: "Denied",
  help: "Help",
};

interface StatusPillProps {
  tone?: StatusTone;
  emphasis?: "light" | "solid" | "dark";
  dot?: boolean;
  size?: "sm" | "md";
  className?: string;
  children?: React.ReactNode;
}

export function StatusPill({ tone = "neutral", emphasis = "light", dot = true, size = "md", className, children }: StatusPillProps) {
  const [l, b, d] = TONES[tone];
  const bg = emphasis === "solid" ? `var(${b})` : emphasis === "dark" ? `var(${d})` : `var(${l})`;
  const fg = emphasis === "light" ? `var(${d})` : "#FFFFFF";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 whitespace-nowrap rounded-pill font-body font-medium leading-[1.1]",
        size === "sm" ? "px-2.5 py-[3px] text-xs" : "px-3.5 py-1.5 text-sm",
        className,
      )}
      style={{ background: bg, color: fg }}
    >
      {dot && <span className="h-2 w-2 rounded-full" style={{ background: emphasis === "light" ? `var(${b})` : "rgba(255,255,255,.85)" }} />}
      {children ?? LABELS[tone]}
    </span>
  );
}
