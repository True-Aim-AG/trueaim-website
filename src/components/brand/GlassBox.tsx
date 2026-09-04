import { cn } from "@/lib/utils";

/**
 * Glass Box: the core brand graphic. Dimensional isometric cube of translucent faces with the violet glow,
 * transcribed from the design system (components/brand/GlassBox). `state` mirrors the Lottie loops.
 */
function faces(s: number) {
  const h = s * 0.866;
  const c = s / 2;
  return {
    top: `${c},0 ${s},${h * 0.25} ${c},${h * 0.5} 0,${h * 0.25}`,
    left: `0,${h * 0.25} ${c},${h * 0.5} ${c},${h} 0,${h * 0.75}`,
    right: `${c},${h * 0.5} ${s},${h * 0.25} ${s},${h * 0.75} ${c},${h}`,
    w: s,
    h,
  };
}

interface GlassBoxProps {
  size?: number;
  state?: "complete" | "emerging" | "open";
  glow?: boolean;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export function GlassBox({ size = 300, state = "complete", glow = true, className, style, id = "gb" }: GlassBoxProps) {
  const s = size;
  const f = faces(s);
  const emerging = state === "emerging";
  const open = state === "open";
  return (
    <div aria-hidden className={cn("relative", className)} style={{ width: s, height: f.h, ...style }}>
      {glow && (
        <div
          className="absolute rounded-full"
          style={{ left: "50%", top: "55%", width: s * 0.71, height: s * 0.71, transform: "translate(-50%,-50%)", background: "var(--ta-glow)" }}
        />
      )}
      {glow && (
        <div
          className="absolute rounded-full"
          style={{ left: "50%", top: "45%", width: s * 0.46, height: s * 0.63, transform: "translate(-50%,-50%)", background: "var(--ta-rim-glow)", mixBlendMode: "screen" }}
        />
      )}
      <svg width={s} height={f.h} viewBox={`0 0 ${s} ${f.h}`} className="absolute inset-0 overflow-visible">
        <defs>
          <linearGradient id={`${id}-top`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FBFCFD" stopOpacity=".9" />
            <stop offset="1" stopColor="#5151DB" stopOpacity=".55" />
          </linearGradient>
          <linearGradient id={`${id}-left`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5151DB" stopOpacity=".55" />
            <stop offset="1" stopColor="#F3EEFE" stopOpacity=".25" />
          </linearGradient>
          <linearGradient id={`${id}-right`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5151DB" stopOpacity=".7" />
            <stop offset="1" stopColor="#F3EEFE" stopOpacity=".2" />
          </linearGradient>
        </defs>
        <g opacity={0.82} stroke="rgba(255,255,255,.5)" strokeWidth="1">
          <polygon points={f.left} fill={emerging ? "none" : `url(#${id}-left)`} />
          <polygon points={f.right} fill={emerging ? "none" : `url(#${id}-right)`} />
          <polygon
            points={f.top}
            fill={open ? "none" : `url(#${id}-top)`}
            style={{ transform: open ? `translate(0,-${s * 0.08}px)` : "none", transition: "transform var(--dur-slow) var(--ease-brand)" }}
          />
        </g>
      </svg>
    </div>
  );
}

/** Structural graphic: flat True Aim Blue hexagon (the Glass Box silhouette). */
export function HexMark({ width = 92.565, color = "var(--ta-blue)", className, style }: { width?: number; color?: string; className?: string; style?: React.CSSProperties }) {
  const h = width * 1.1556;
  return (
    <svg aria-hidden className={className} width={width} height={h} viewBox="0 0 92.565 106.964" style={style}>
      <path d="M 92.565 80.224 L 92.565 26.74 L 46.282 0 L 0 26.74 L 0 80.224 L 46.282 106.964 L 92.565 80.224 Z" fill={color} />
    </svg>
  );
}

/** Structural outline hexagon (2px monochrome line, optional blue focal fill). */
export function HexOutline({ width = 92.565, stroke = "var(--text-strong)", strokeWidth = 2, className, style }: { width?: number; stroke?: string; strokeWidth?: number; className?: string; style?: React.CSSProperties }) {
  const h = width * 1.1556;
  return (
    <svg aria-hidden className={className} width={width} height={h} viewBox="-2 -2 96.565 110.964" style={style}>
      <path d="M 92.565 80.224 L 92.565 26.74 L 46.282 0 L 0 26.74 L 0 80.224 L 46.282 106.964 L 92.565 80.224 Z" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  );
}
