import type { ScreenPoint } from "./renderer";
import type { GraphNode } from "./types";

/**
 * The hover card, ported from the prototype's `GraphHoverCard` (its `full`
 * node card): what the node is, which one, its figure, and where the value
 * was read from or why it is flagged. The prototype's decision, scope, edge
 * and picture variants have nothing to show here and are left out.
 *
 * Placed inside the graph's box rather than fixed to the window, so a
 * transformed ancestor on the page cannot throw it off; it flips left near
 * the right edge and above the pointer in the lower half, as the prototype's
 * does against the window.
 */

const OFFSET = 14;
const WIDTH = 300;
const EDGE = 8;

export function HoverCard({
  node,
  kicker,
  point,
  box,
}: {
  node: GraphNode;
  /** The node's type, worded. */
  kicker: string;
  /** The pointer, in viewport coordinates. */
  point: ScreenPoint;
  /** The graph's box, in viewport coordinates. */
  box: DOMRect;
}) {
  const width = Math.min(WIDTH, box.width - 2 * EDGE);
  const x = point.x - box.left;
  const y = point.y - box.top;
  const flip = x + OFFSET + width > box.width - EDGE;
  const above = y > box.height / 2;
  const left = Math.max(EDGE, flip ? x - OFFSET - width : x + OFFSET);
  const { hover } = node;
  const title = node.name ?? node.label;
  return (
    <div
      role="tooltip"
      className="pointer-events-none absolute isolate z-10 flex flex-col gap-1.5 overflow-hidden rounded-lg px-3 py-2.5 backdrop-blur-sm"
      style={{
        left,
        width,
        ...(above ? { bottom: box.height - y + OFFSET } : { top: y + OFFSET }),
      }}
    >
      {/* The card's surface, border and shadow at 85%, so the graph shows
          through; the text above it stays at full strength. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-lg border border-[#E4E4E6] bg-white opacity-85 shadow-md"
      />
      <span className="text-xs font-medium text-[#696A71]">{kicker}</span>
      <p className="truncate text-sm font-medium text-[#2C2B2A]" title={title}>
        {title}
      </p>
      {hover.figure && (
        <p className="text-base font-semibold tabular-nums text-[#2C2B2A]">
          {hover.figure}
        </p>
      )}
      {hover.status && (
        <p className="line-clamp-3 text-xs font-normal text-[#696A71]">
          {hover.status}
        </p>
      )}
    </div>
  );
}
