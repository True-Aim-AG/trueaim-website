/**
 * Shared primitives for structural blog/technical diagrams.
 * Graphics grammar: simple geometry, 2px monochrome outlines, hexagon accent on the
 * single True Aim Blue focal node per diagram, visible line connections, no gradients,
 * no shadows, no blur. Text uses the site fonts via CSS variables so it themes with
 * the page (dark by default, light opt-in via data-theme="light").
 */

interface TextBlock {
  lines: string[];
  size: number;
  lineHeight: number;
  fontFamily: "display" | "body";
  weight?: number;
  fill: string;
  opacity?: number;
  uppercase?: boolean;
  letterSpacing?: string;
}

/** Vertically centers one or more text blocks (each its own font/size/lines) around (cx, cy). */
export function CenteredText({
  cx,
  cy,
  blocks,
  gap = 6,
}: {
  cx: number;
  cy: number;
  blocks: TextBlock[];
  gap?: number;
}) {
  const totalHeight =
    blocks.reduce((sum, b) => sum + b.lines.length * b.lineHeight, 0) +
    gap * Math.max(0, blocks.length - 1);
  let runningY = cy - totalHeight / 2;
  const elements: React.ReactNode[] = [];
  blocks.forEach((b, bi) => {
    b.lines.forEach((line, li) => {
      const lineCenterY = runningY + b.lineHeight / 2;
      elements.push(
        <text
          key={`${bi}-${li}`}
          x={cx}
          y={lineCenterY}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily={b.fontFamily === "display" ? "var(--font-display)" : "var(--font-body)"}
          fontSize={b.size}
          fontWeight={b.weight ?? (b.fontFamily === "display" ? 600 : 400)}
          fill={b.fill}
          opacity={b.opacity}
          style={
            b.uppercase
              ? { textTransform: "uppercase", letterSpacing: b.letterSpacing ?? "0.08em" }
              : b.letterSpacing
                ? { letterSpacing: b.letterSpacing }
                : undefined
          }
        >
          {line}
        </text>
      );
      runningY += b.lineHeight;
    });
    if (bi < blocks.length - 1) runningY += gap;
  });
  return <>{elements}</>;
}

/** A process/system node: rectangle + centered title (and optional sub-label). */
export function NodeBox({
  x,
  y,
  w,
  h,
  title,
  sub,
  focal = false,
  titleSize = 21,
  subSize = 16,
  rx = 4,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string[];
  sub?: string[];
  focal?: boolean;
  titleSize?: number;
  subSize?: number;
  rx?: number;
}) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const blocks: TextBlock[] = [
    {
      lines: title,
      size: titleSize,
      lineHeight: titleSize * 1.22,
      fontFamily: "display",
      weight: 600,
      fill: focal ? "var(--text-on-brand)" : "var(--text-strong)",
    },
  ];
  if (sub && sub.length) {
    blocks.push({
      lines: sub,
      size: subSize,
      lineHeight: subSize * 1.28,
      fontFamily: "body",
      weight: 400,
      fill: focal ? "rgba(255,255,255,0.85)" : "var(--text-muted)",
    });
  }
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={rx}
        fill={focal ? "var(--accent)" : "var(--surface-elevated)"}
        stroke={focal ? "none" : "var(--border-default)"}
        strokeWidth={focal ? 0 : 1.5}
      />
      <CenteredText cx={cx} cy={cy} blocks={blocks} gap={sub ? 6 : 0} />
    </g>
  );
}

/** A group container frame: 2px monochrome outline, caption-style title top-left, optional note line. */
export function GroupFrame({
  x,
  y,
  w,
  h,
  label,
  note,
  labelSize = 13,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string[];
  note?: string[];
  labelSize?: number;
}) {
  const labelLineHeight = labelSize * 1.5;
  const noteLineHeight = 13 * 1.35;
  const labelStartY = y + 30;
  const noteStartY = labelStartY + label.length * labelLineHeight + 4;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        fill="var(--surface-card)"
        stroke="var(--text-strong)"
        strokeWidth={2}
      />
      {label.map((line, i) => (
        <text
          key={`l${i}`}
          x={x + 24}
          y={labelStartY + i * labelLineHeight}
          textAnchor="start"
          fontFamily="var(--font-body)"
          fontWeight={500}
          fontSize={labelSize}
          fill="var(--text-subtle)"
          style={{ textTransform: "uppercase", letterSpacing: "0.16em" }}
        >
          {line}
        </text>
      ))}
      {note?.map((line, i) => (
        <text
          key={`n${i}`}
          x={x + 24}
          y={noteStartY + i * noteLineHeight}
          textAnchor="start"
          fontFamily="var(--font-body)"
          fontWeight={400}
          fontSize={13}
          fill="var(--text-subtle)"
          opacity={0.85}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

/** Straight solid flow arrow between two points. */
export function Arrow({
  x1,
  y1,
  x2,
  y2,
  markerId,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  markerId: string;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="var(--text-muted)"
      strokeWidth={2}
      markerEnd={`url(#${markerId})`}
    />
  );
}

/** Curved solid flow connector (for converging/diverging lines). */
export function CurvedArrow({ d, markerId }: { d: string; markerId: string }) {
  return <path d={d} fill="none" stroke="var(--text-muted)" strokeWidth={1.75} markerEnd={`url(#${markerId})`} />;
}

/** Dotted connector for narrow/optional or conditional paths. */
export function DottedPath({ d, markerId }: { d: string; markerId: string }) {
  return (
    <path
      d={d}
      fill="none"
      stroke="var(--text-subtle)"
      strokeWidth={1.5}
      strokeDasharray="4 6"
      markerEnd={`url(#${markerId})`}
    />
  );
}

/** Small caption label placed alongside an arrow, one or more lines. */
export function ArrowLabel({
  x,
  y,
  lines,
  size = 14,
  anchor = "middle",
}: {
  x: number;
  y: number;
  lines: string[];
  size?: number;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <g>
      {lines.map((line, i) => (
        <text
          key={i}
          x={x}
          y={y + i * size * 1.3}
          textAnchor={anchor}
          fontFamily="var(--font-body)"
          fontSize={size}
          fill="var(--text-subtle)"
        >
          {line}
        </text>
      ))}
    </g>
  );
}

/** Arrowhead marker defs, scoped by id prefix so multiple diagrams can share a page. */
export function ArrowMarkerDefs({ prefix }: { prefix: string }) {
  return (
    <defs>
      <marker id={`${prefix}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0,0 L10,5 L0,10 Z" fill="var(--text-muted)" />
      </marker>
      <marker id={`${prefix}-arrow-subtle`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 Z" fill="var(--text-subtle)" />
      </marker>
    </defs>
  );
}

const HEX_PATH =
  "M 92.565 80.224 L 92.565 26.74 L 46.282 0 L 0 26.74 L 0 80.224 L 46.282 106.964 L 92.565 80.224 Z";

/** Small hexagon accent (the Glass Box silhouette) marking the single blue focal node. */
export function HexBullet({
  x,
  y,
  size = 14,
  color = "var(--text-on-brand)",
  opacity = 0.3,
}: {
  x: number;
  y: number;
  size?: number;
  color?: string;
  opacity?: number;
}) {
  const h = size * 1.1556;
  return (
    <svg x={x - size / 2} y={y - h / 2} width={size} height={h} viewBox="0 0 92.565 106.964" aria-hidden>
      <path d={HEX_PATH} fill={color} opacity={opacity} />
    </svg>
  );
}
