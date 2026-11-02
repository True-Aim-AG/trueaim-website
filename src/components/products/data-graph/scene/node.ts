import { Vector3 } from "three";

import type { GraphBand, GraphNode } from "../types";

import {
  type BackgroundMember,
  DEFAULT_LAYOUT,
  depthOfHop,
  depthScaleFor,
  type FocusArrangement,
  type FocusFrame,
  type FocusMember,
  type LabelSide,
  labelBoost,
  type LayoutParams,
  namedBehind,
  PX_PER_UNIT,
  seatOnPlane,
} from "./focus";

/**
 * The Node view's arrangement (decision 131): the selection large in the left
 * third of the canvas, what it links to in columns on a plane beside it, and
 * everything further out greyed and smaller behind, to the right, by the link
 * it comes through.
 *
 * Pure, and solved in screen pixels like the Ring (`focus.ts`), because the
 * labels are drawn a fixed size on screen and are what must not collide.
 *
 * ## The rules
 *
 * 1. **The selection.** Its sphere is drawn at 1.7 times the claim's radius, in
 *    the middle of the left third, vertically centred, its name below it.
 * 2. **Families.** The direct links group by family (`familyOf`, the node's
 *    type), families ordered by where they sit in the story and then by name,
 *    members by the story too. Nothing depends on the order the graph arrived
 *    in, so the same selection always lays out the same way.
 * 3. **Columns.** Families fill columns top to bottom, half a row apart, each
 *    column at most `MAX_ROWS` rows; a family that would not fit what is left
 *    of a column starts the next, and one larger than a column takes two or
 *    three of its own. A column is as wide as its widest sphere and name, so
 *    names never overlap.
 * 4. **Behind.** Each hop further out is a quieter column to the right of the
 *    plane, one step deeper, each node as near the height of the node it comes
 *    through as spacing allows (an isotonic fit, so the order holds and nobody
 *    moves further than they must). Nodes with no path sit last.
 * 5. **Framing.** The camera is square to the plane and looks at the canvas's
 *    middle; the plane faces the camera as the reader left it, orbited or not. The
 *    zoom is the largest that fits; walking to another node keeps the zoom it
 *    has while the new arrangement still fits, so the camera stays put and
 *    everything glides from where it is on screen.
 */

/** The selection's sphere, in claim radii. */
export const NODE_CENTRE_RADII = 1.7;
/** The selection's name, against its tier's size. */
export const NODE_CENTRE_LABEL = 1.35;
/** A family larger than this takes more than one column. */
const MAX_ROWS = 12;
const FRAME_MARGIN_PX = 36;
/** Between a sphere's edge and its label: the engine's value. */
const LABEL_GAP_PX = 6;
/** Between the selection's sphere and the first column, where link tags sit. */
const TAG_ROOM_PX = 120;
const COLUMN_GAP_PX = 36;
const LAYER_GAP_PX = 40;
/** The widest share of the canvas the layers behind may claim. */
const LAYER_SHARE = 0.26;
const MAX_ZOOM = 1.2;
const MIN_ZOOM = 0.5;
const ZOOM_STEP = 0.92;
/** A further column's slides to try, in quarter rows, nearest first. */
const SHIFTS = [0, 1, -1, 2, -2, 3, -3, 4, -4] as const;
/** How far a spoke keeps from a sphere it passes. */
const SPOKE_CLEAR_PX = 4;

export interface NodeNeighbour extends FocusMember {
  family: string;
}

export interface NodeInput {
  centre: FocusMember;
  neighbours: readonly NodeNeighbour[];
  background: readonly BackgroundMember[];
  /** A point on the plane: the canvas's middle. */
  origin: Vector3;
  right: Vector3;
  up: Vector3;
  normal: Vector3;
  viewWidth: number;
  viewHeight: number;
  fov: number;
  /** The zoom to keep while it still fits. */
  hold?: FocusFrame | null;
  params?: LayoutParams;
}

interface Seat {
  x: number;
  y: number;
  side: LabelSide;
  depth: number;
}

interface Column {
  members: NodeNeighbour[];
  /** Row offsets, in rows, family gaps included. */
  rows: number[];
  height: number;
}

const BAND_RANK: Record<GraphBand, number> = { above: 1, main: 0, below: -1 };

export function arrangeNode(
  input: NodeInput,
): FocusArrangement & { order: Map<string, number> } {
  const params = input.params ?? DEFAULT_LAYOUT;
  const W = input.viewWidth;
  const H = input.viewHeight;
  const availH = Math.max(160, H - FRAME_MARGIN_PX * 2);
  const right = W / 2 - FRAME_MARGIN_PX;

  const families = groupFamilies(input.neighbours);
  const layers = layerOf(input.background);

  const plan = (zoom: number) => {
    const rowH = Math.max(
      ...input.neighbours.map(
        (n) =>
          Math.max(2 * n.radiusPx * zoom, n.labelH * boostOf(n, zoom)) +
          params.padPx,
      ),
      18,
    );
    const gap = COLUMN_GAP_PX * params.ringRadius;
    const shapes = layers.map((layer) =>
      layerShape(layer, zoom, availH, params),
    );
    const layerWidths = shapes.map((shape) => shape.width);
    const layerGap = LAYER_GAP_PX * params.hopSpacing;
    const reserve = Math.min(
      W * LAYER_SHARE,
      layerWidths.reduce((sum, w) => sum + w + layerGap, 0),
    );
    const centreX = -W / 2 + W / 6;
    const centreR = input.centre.radiusPx * zoom;
    const start = Math.max(
      -W / 2 + W / 3 + gap / 2,
      centreX + centreR + TAG_ROOM_PX * params.ringRadius,
    );
    // Columns of `MAX_ROWS`, taller where that many columns would run off
    // the canvas's width and its height has room.
    const pack = (rows: number) => {
      const columns = packColumns(families, rows);
      // Spheres share a column's axis, so its width is its widest sphere
      // plus its widest name.
      const widths = columns.map(
        (column) =>
          2 * Math.max(...column.members.map((n) => n.radiusPx * zoom)) +
          LABEL_GAP_PX +
          Math.max(...column.members.map((n) => n.labelW * boostOf(n, zoom))),
      );
      const planeW =
        widths.reduce((sum, w) => sum + w, 0) +
        gap * Math.max(0, columns.length - 1);
      return { columns, widths, planeW };
    };
    const tallestRows = Math.max(MAX_ROWS, Math.floor(availH / rowH));
    let packed = pack(MAX_ROWS);
    for (
      let rows = MAX_ROWS + 1;
      start + packed.planeW > right - reserve && rows <= tallestRows;
      rows++
    ) {
      packed = pack(rows);
    }
    const { columns, widths, planeW } = packed;
    const tallest = Math.max(0, ...columns.map((c) => c.height * rowH));
    const tall = tallest <= availH;
    const fits = tall && start + planeW <= right - reserve;
    return {
      zoom,
      rowH,
      columns,
      widths,
      gap,
      planeW,
      shapes,
      layerWidths,
      layerGap,
      reserve,
      centreX,
      centreR,
      start,
      tall,
      fits,
    };
  };

  // The largest zoom that fits. Names do not shrink with the zoom, so a plane
  // too wide at one zoom is too wide at all of them: then the largest zoom
  // whose columns fit the height, and the layers behind give up their room.
  let fitting: ReturnType<typeof plan> | null = null;
  let tall: ReturnType<typeof plan> | null = null;
  for (let zoom = MAX_ZOOM; !fitting && zoom >= MIN_ZOOM; zoom *= ZOOM_STEP) {
    const tried = plan(zoom);
    if (tried.fits) fitting = tried;
    else if (tried.tall) tall ??= tried;
  }
  // A zoom to hold is kept while it fits as well as the best would.
  const kept = input.hold ? plan(input.hold.zoom) : null;
  const held = kept != null && (kept.fits || (!fitting && kept.tall));
  const at = held && kept ? kept : (fitting ?? tall ?? plan(MIN_ZOOM));
  const { zoom, rowH, columns, widths, gap, planeW, centreX } = at;

  const seats = new Map<string, Seat>();
  const order = new Map<string, number>();
  seats.set(input.centre.node.id, { x: centreX, y: 0, side: 2, depth: 0 });

  // The plane, pulled left into the middle third if it runs over.
  const start = Math.max(
    Math.min(at.start, right - at.reserve - planeW),
    centreX + at.centreR + 24,
  );
  let left = start;
  let index = 0;
  const count = Math.max(1, input.neighbours.length - 1);
  /** Spheres already on the plane, which a later column's spokes must miss. */
  const discs: { x: number; y: number; r: number }[] = [];
  columns.forEach((column, j) => {
    const top = (column.height * rowH) / 2 - rowH / 2;
    const radius = Math.max(...column.members.map((n) => n.radiusPx * zoom));
    const x = left + radius;
    // A column further out slides up or down by a fraction of a row so its
    // spokes pass between the spheres nearer the selection, not through them.
    let shift = 0;
    if (j > 0) {
      let fewest = Infinity;
      for (const k of SHIFTS) {
        const offset = (k * rowH) / 4;
        const reach = Math.abs(top) + Math.abs(offset) + radius;
        if (k !== 0 && reach > availH / 2) continue;
        const hits = column.members.reduce((sum, _, i) => {
          const y = top - column.rows[i] * rowH + offset;
          return (
            sum +
            discs.filter(
              (d) =>
                segmentDistance(d.x, d.y, centreX, 0, x, y) <
                d.r + SPOKE_CLEAR_PX,
            ).length
          );
        }, 0);
        if (hits < fewest) {
          fewest = hits;
          shift = offset;
        }
        if (hits === 0) break;
      }
    }
    column.members.forEach((n, i) => {
      const y = top - column.rows[i] * rowH + shift;
      seats.set(n.node.id, { x, y, side: 0, depth: 0 });
      order.set(n.node.id, index++ / count);
    });
    column.members.forEach((n, i) =>
      discs.push({
        x,
        y: top - column.rows[i] * rowH + shift,
        r: n.radiusPx * zoom,
      }),
    );
    left += widths[j] + gap;
  });

  // Behind: a column per hop, each node level with what it comes through.
  let layerLeft = start + planeW + at.layerGap;
  const layerRoom = right - layerLeft;
  const layerNeed = at.layerWidths.reduce(
    (sum, w, i) => sum + w + (i > 0 ? at.layerGap : 0),
    0,
  );
  const squeeze = layerNeed > layerRoom && layerNeed > 0;
  if (squeeze) layerLeft = Math.max(start, right - layerNeed);
  layers.forEach((layer, l) => {
    const { radius, spacing, columns: across, step } = at.shapes[l];
    const depth = depthOfHop(layer.hop, params.depthPerHop);
    const desired = layer.members.map((b) => {
      const via = b.via ? seats.get(b.via) : undefined;
      return { b, want: via ? -via.y : 0 };
    });
    desired.sort((p, q) => p.want - q.want || byStory(p.b.node, q.b.node));
    // Dealt across the layer's columns in height order, so each column still
    // reads top to bottom in the order of what the nodes come through.
    for (let c = 0; c < across; c++) {
      const mine = desired.filter((_, i) => i % across === c);
      const tops = fitSpaced(
        mine.map((d) => d.want),
        spacing,
        availH,
      );
      const x = layerLeft + radius + c * step;
      mine.forEach(({ b }, i) => {
        const side: LabelSide =
          x + radius + LABEL_GAP_PX + b.labelW > W / 2 ? 1 : 0;
        seats.set(b.node.id, { x, y: -tops[i], side, depth });
      });
    }
    layerLeft += at.layerWidths[l] + at.layerGap;
  });

  const scale = PX_PER_UNIT * zoom;
  const distance =
    input.viewHeight / (2 * Math.tan((input.fov * Math.PI) / 360) * scale);
  const lookAt = input.origin.clone();
  const frame: FocusFrame = { zoom, x: 0, y: 0 };
  const eye = lookAt.clone().addScaledVector(input.normal, distance);
  const plane = {
    origin: input.origin,
    right: input.right,
    up: input.up,
    normal: input.normal,
    eye,
    distance,
    scale,
    depthScale: depthScaleFor(input.fov),
  };
  const positions = new Map<string, Vector3>();
  const labelSides = new Map<string, LabelSide>();
  const backgroundHop = new Map(
    input.background.map((b) => [b.node.id, b.hop]),
  );
  for (const [id, seat] of seats) {
    positions.set(id, seatOnPlane(plane, seat.x, seat.y, seat.depth));
    const behind = backgroundHop.has(id);
    const node = behind
      ? input.background.find((b) => b.node.id === id)?.node
      : undefined;
    if (
      !behind ||
      (node &&
        namedBehind(
          backgroundHop.get(id) ?? null,
          node,
          params.backgroundNames,
        ))
    ) {
      labelSides.set(id, seat.side);
    }
  }
  return {
    positions,
    labelSides,
    lookAt,
    distance,
    frame: held && input.hold ? input.hold : frame,
    held,
    order,
  };
}

function boostOf(member: FocusMember, zoom: number): number {
  return labelBoost(member.typePx * zoom);
}

/** Families in story order, each sorted by the story. */
function groupFamilies(
  neighbours: readonly NodeNeighbour[],
): NodeNeighbour[][] {
  const byFamily = new Map<string, NodeNeighbour[]>();
  for (const n of neighbours) {
    const list = byFamily.get(n.family) ?? [];
    list.push(n);
    byFamily.set(n.family, list);
  }
  const families = [...byFamily.entries()].map(([family, members]) => {
    members.sort((a, b) => byStory(a.node, b.node));
    return { family, members };
  });
  families.sort(
    (a, b) =>
      byStory(a.members[0].node, b.members[0].node) ||
      compare(a.family, b.family),
  );
  return families.map((f) => f.members);
}

/** Families into columns of at most `MAX_ROWS`, half a row between families. */
function packColumns(
  families: readonly NodeNeighbour[][],
  maxRows: number,
): Column[] {
  const columns: Column[] = [];
  let current: Column | null = null;
  const open = () => {
    const column: Column = { members: [], rows: [], height: 0 };
    columns.push(column);
    return column;
  };
  for (const family of families) {
    if (family.length > maxRows) {
      for (let i = 0; i < family.length; i += maxRows) {
        const column = open();
        family.slice(i, i + maxRows).forEach((member, row) => {
          column.members.push(member);
          column.rows.push(row);
        });
        column.height = column.members.length;
        // The last, shorter column takes the next family if it fits.
        current = column;
      }
      continue;
    }
    if (current && current.height + 0.5 + family.length > maxRows) {
      current = null;
    }
    const column: Column = current ?? open();
    const base = column.members.length > 0 ? column.height + 0.5 : 0;
    family.forEach((member, row) => {
      column.members.push(member);
      column.rows.push(base + row);
    });
    column.height = base + family.length;
    current = column;
  }
  return columns;
}

/**
 * A layer's footprint at a zoom: its spheres as they show behind the plane
 * (perspective shrinks them by the depth), the spacing a node needs, and how
 * many columns it takes to keep that spacing inside the canvas's height.
 */
function layerShape(
  layer: Layer,
  zoom: number,
  availH: number,
  params: LayoutParams,
): {
  radius: number;
  spacing: number;
  columns: number;
  step: number;
  width: number;
} {
  const depth = depthOfHop(layer.hop, params.depthPerHop);
  const radius = Math.max(
    0,
    ...layer.members.map((b) => (b.radiusPx * zoom) / (1 + depth)),
  );
  const named = layer.members.filter((b) =>
    namedBehind(layer.hop, b.node, params.backgroundNames),
  );
  const spacing = Math.max(
    2 * radius + params.padPx / 2,
    named.length > 0 ? Math.max(...named.map((b) => b.labelH)) + 2 : 0,
  );
  const perColumn = Math.max(1, Math.floor(availH / spacing));
  const columns = Math.max(1, Math.ceil(layer.members.length / perColumn));
  const step = 2 * radius + params.padPx / 2;
  const names =
    named.length > 0
      ? LABEL_GAP_PX + Math.max(...named.map((b) => b.labelW))
      : 0;
  return {
    radius,
    spacing,
    columns,
    step,
    width: 2 * radius + (columns - 1) * step + names,
  };
}

interface Layer {
  /** 2 and on; null for the nodes with no path. */
  hop: number | null;
  members: BackgroundMember[];
}

function layerOf(background: readonly BackgroundMember[]): Layer[] {
  const byHop = new Map<number | null, BackgroundMember[]>();
  for (const b of background) {
    const list = byHop.get(b.hop) ?? [];
    list.push(b);
    byHop.set(b.hop, list);
  }
  return [...byHop.entries()]
    .sort((a, b) => (a[0] ?? Infinity) - (b[0] ?? Infinity))
    .map(([hop, members]) => ({ hop, members }));
}

/**
 * Positions as near `wanted` as they can be, in the same order, at least
 * `spacing` apart, inside a band `height` tall centred on zero: the
 * pool-adjacent-violators fit of `wanted - i * spacing`.
 */
export function fitSpaced(
  wanted: readonly number[],
  spacing: number,
  height: number,
): number[] {
  const n = wanted.length;
  if (n === 0) return [];
  const blocks: { sum: number; count: number }[] = [];
  for (let i = 0; i < n; i++) {
    blocks.push({ sum: wanted[i] - i * spacing, count: 1 });
    while (blocks.length > 1) {
      const last = blocks[blocks.length - 1];
      const before = blocks[blocks.length - 2];
      if (before.sum / before.count <= last.sum / last.count) break;
      before.sum += last.sum;
      before.count += last.count;
      blocks.pop();
    }
  }
  const out: number[] = [];
  for (const block of blocks) {
    const value = block.sum / block.count;
    for (let k = 0; k < block.count; k++)
      out.push(value + out.length * spacing);
  }
  const lo = out[0];
  const hi = out[n - 1];
  const shift =
    hi - lo <= height
      ? Math.max(-height / 2 - lo, Math.min(0, height / 2 - hi))
      : -(lo + hi) / 2;
  return out.map((value) => value + shift);
}

/** From (px, py) to the segment (ax, ay) to (bx, by), in pixels. */
function segmentDistance(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number,
): number {
  const dx = bx - ax;
  const dy = by - ay;
  const length = dx * dx + dy * dy;
  const t =
    length === 0
      ? 0
      : Math.min(1, Math.max(0, ((px - ax) * dx + (py - ay) * dy) / length));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

function byStory(a: GraphNode, b: GraphNode): number {
  return (
    a.column - b.column ||
    BAND_RANK[b.band] - BAND_RANK[a.band] ||
    a.tier - b.tier ||
    compare(a.type, b.type) ||
    compare(a.label, b.label) ||
    compare(a.id, b.id)
  );
}

function compare(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
