import { Vector3 } from "three";

import type { PageGroups } from "../config";

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
  type PlaneFrame,
  PX_PER_UNIT,
  seatOnPlane,
} from "./focus";
import { fitSpaced } from "./node";

/**
 * The page arrangement (decision 153, Node v3): Node v2's reading of one
 * record, drawn in space.
 *
 * The Node view (`node.ts`) put the selection's links in columns by family and
 * everything further out behind by link distance, so depth said "how many
 * stored relations away" and every relation was an equal line. Read that way a
 * claim is a grey hairball. Here depth says exactly one thing, **what is
 * behind this record**, and only tree links are drawn: every node has one
 * parent.
 *
 * ## The rules
 *
 * 1. **The selection** sits in the middle of the left third, vertically
 *    centred, drawn large, exactly where the Node view puts it. The engine
 *    holds the plane's origin across a walk, so it never drifts left.
 * 2. **The front plane** is the reading itself: the groups become lanes, top
 *    to bottom in the reading's order, each lane one column of nodes on a
 *    fixed row pitch (so two names can never collide), a gap between lanes and
 *    the lane's title as a quiet caption at its top left. The zoom is the
 *    largest whose lanes fit the canvas's height; a set too long for one
 *    column takes two or three. What tells one lane from the next is the
 *    reader's (decision 155, `page.groups`): the title, a slab behind the
 *    lane with the title on hover, or a wider gap alone.
 * 3. **Behind** each front node stands what a walk into it would find: one
 *    depth step back, a column to the right of the plane, siblings fanned
 *    about their parent's height on a tighter pitch (an isotonic fit, so the
 *    order holds and nobody moves further than they must), smaller and dimmer.
 *    What is behind those goes one step further again.
 * 4. **The trail** back to the claim is a row of small nodes at the top left,
 *    the claim first, above the selection.
 * 5. **Framing** is the Node view's: the camera is square to the plane and
 *    looks at the canvas's middle, and a walk keeps the zoom it has while the
 *    new arrangement still fits, so everything glides from where it is.
 *
 * Pure, and solved in screen pixels like `node.ts`, because the names are
 * drawn a fixed size on screen and are what must not collide.
 */

/** A lane caption's size on the canvas, in CSS pixels. */
export const PAGE_LANE_PX = 10;

const FRAME_MARGIN_PX = 36;
/** Between a sphere's edge and its label: the engine's value. */
const LABEL_GAP_PX = 6;
/** Between the selection's sphere and the front plane. */
const PLANE_ROOM_PX = 96;
const COLUMN_GAP_PX = 40;
/** Between the front plane and the first layer behind it, and between layers. */
const BEHIND_GAP_PX = 44;
/** Between one lane and the next, beyond the lane's caption. */
const LANE_GAP_PX = 16;
/** The room a lane's caption takes over its first row. */
const LANE_CAPTION_ROOM_PX = PAGE_LANE_PX * 1.2 + 5;
/**
 * The plate (decision 155): the clear space its slab keeps around its lane,
 * the extra room over the first row where the title fades in on hover, and
 * how far behind the plane the slab is laid, in pixels.
 */
const PLATE_PAD_PX = 9;
const PLATE_TITLE_ROOM_PX = 4;
const PLATE_BEHIND_PX = 26;
/** How much a node grows under the pointer: the engine's value. */
const HOVER_SWELL = 1.3;
/** How much wider the gap between lanes runs with neither caption nor plate. */
const SPACING_GAP = 2;
/** Between one node on the trail and the next. */
const TRAIL_GAP_PX = 20;
const MAX_ZOOM = 1.15;
const MIN_ZOOM = 0.45;
const ZOOM_STEP = 0.94;
/** The most columns the front plane is allowed to take. */
const MAX_COLUMNS = 3;

/** One group of the reading, as a lane of the front plane. */
export interface PageLane {
  key: string;
  title: string;
  nodeIds: readonly string[];
}

export interface PageInput {
  centre: FocusMember;
  neighbours: readonly FocusMember[];
  background: readonly BackgroundMember[];
  /** The reading's groups, top to bottom. */
  lanes: readonly PageLane[];
  /** How a lane reads as one group (decision 155). */
  groups: PageGroups;
  /**
   * Background nodes the reading took off the plane because they are
   * relations rather than content: seated behind the record they belong to
   * instead of in the depth layers.
   */
  relations: ReadonlySet<string>;
  /** Back to the claim, the claim first; empty on the claim itself. */
  trail: readonly string[];
  /** Nodes wearing a state phrase under their name, and how tall one is. */
  stated: ReadonlySet<string>;
  statePx: number;
  /** A point on the plane: the canvas's middle. */
  origin: Vector3;
  right: Vector3;
  up: Vector3;
  normal: Vector3;
  viewWidth: number;
  viewHeight: number;
  fov: number;
  /**
   * How much of the canvas's left edge is covered by something drawn over it
   * (the detail panel): the arrangement solves in the width to the right of
   * it, so the picture glides clear rather than hiding under it.
   */
  insetLeftPx?: number;
  /** The zoom to keep while it still fits. */
  hold?: FocusFrame | null;
  params?: LayoutParams;
}

/** A lane's slab: where its middle sits and how big it is, in world units. */
export interface PagePlate {
  centre: Vector3;
  width: number;
  height: number;
}

export interface PageArrangement extends FocusArrangement {
  /** The plane's reading order, 0 to 1, for the tween's stagger. */
  order: Map<string, number>;
  /** Where each lane's caption sits, in world units. */
  laneMarks: Map<string, Vector3>;
  /** Each lane's slab (decision 155); empty unless `groups` is `plate`. */
  lanePlates: Map<string, PagePlate>;
}

interface Seat {
  x: number;
  y: number;
  side: LabelSide;
  depth: number;
}

interface Lane {
  key: string;
  members: FocusMember[];
}

interface Bucket {
  lanes: Lane[];
  width: number;
  height: number;
}

export function arrangePage(input: PageInput): PageArrangement {
  const params = input.params ?? DEFAULT_LAYOUT;
  // How a group is told apart from the next one (decision 155): its title
  // over it, a slab behind it, or a wider gap and nothing else. The title and
  // the slab each keep room over the lane's first row; the gap carries the
  // spacing mode on its own.
  const plated = input.groups === "plate";
  const captionRoom =
    input.groups === "text"
      ? LANE_CAPTION_ROOM_PX
      : plated
        ? PLATE_TITLE_ROOM_PX
        : 0;
  const laneGap =
    input.groups === "spacing"
      ? LANE_GAP_PX * SPACING_GAP
      : plated
        ? LANE_GAP_PX + PLATE_PAD_PX
        : LANE_GAP_PX;
  const W = input.viewWidth;
  const H = input.viewHeight;
  // The canvas keeps its size while the detail panel is open, so the panel
  // covers the left edge instead of taking it. Everything below is solved in
  // the width that is left, from its left edge rather than the canvas's.
  const inset = Math.max(0, Math.min(input.insetLeftPx ?? 0, W * 0.5));
  const clearW = W - inset;
  const availH = Math.max(160, H - FRAME_MARGIN_PX * 2);
  const rightEdge = W / 2 - FRAME_MARGIN_PX;
  const leftEdge = -W / 2 + inset + FRAME_MARGIN_PX;

  const trailIds = new Set(input.trail);
  const front = new Map<string, FocusMember>();
  for (const member of input.neighbours) {
    if (!trailIds.has(member.node.id)) front.set(member.node.id, member);
  }
  const onTrail: (FocusMember | BackgroundMember)[] = [];
  for (const id of input.trail) {
    const member =
      input.neighbours.find((each) => each.node.id === id) ??
      input.background.find((each) => each.node.id === id);
    if (member) onTrail.push(member);
  }

  // The lanes, in the reading's order, over what is actually on the canvas.
  const lanes: Lane[] = [];
  const laned = new Set<string>();
  for (const lane of input.lanes) {
    const members = lane.nodeIds
      .map((id) => front.get(id))
      .filter((member): member is FocusMember => member != null);
    for (const member of members) laned.add(member.node.id);
    if (members.length > 0) lanes.push({ key: lane.key, members });
  }
  // A neighbour the reading did not name still has to be somewhere.
  const rest = [...front.values()].filter(
    (member) => !laned.has(member.node.id),
  );
  if (rest.length > 0) lanes.push({ key: "rest", members: rest });

  const stateRoom = (member: FocusMember) =>
    input.stated.has(member.node.id) ? input.statePx * 1.2 : 0;
  const boostOf = (member: FocusMember, zoom: number) =>
    labelBoost(member.typePx * zoom);

  const rowHeight = (zoom: number) =>
    Math.max(
      20,
      ...lanes.flatMap((lane) =>
        lane.members.map(
          (member) =>
            Math.max(
              2 * member.radiusPx * zoom,
              member.labelH * boostOf(member, zoom) + stateRoom(member),
            ) + params.padPx,
        ),
      ),
    );

  /** Lanes into `columns` contiguous buckets, as evenly as lanes allow. */
  const packLanes = (columns: number): Lane[][] => {
    if (columns <= 1 || lanes.length <= 1) return [lanes];
    const total = lanes.reduce((sum, lane) => sum + lane.members.length, 0);
    const target = Math.ceil(total / columns);
    const buckets: Lane[][] = [];
    let current: Lane[] = [];
    let rows = 0;
    for (const lane of lanes) {
      if (
        current.length > 0 &&
        buckets.length < columns - 1 &&
        rows + lane.members.length > target
      ) {
        buckets.push(current);
        current = [];
        rows = 0;
      }
      current.push(lane);
      rows += lane.members.length;
    }
    if (current.length > 0) buckets.push(current);
    return buckets;
  };

  const plan = (zoom: number, columns: number) => {
    const rowH = rowHeight(zoom);
    const buckets: Bucket[] = packLanes(columns).map((group) => {
      const members = group.flatMap((lane) => lane.members);
      const radius = Math.max(
        1,
        ...members.map((member) => member.radiusPx * zoom),
      );
      const names = Math.max(
        0,
        ...members.map((member) => member.labelW * boostOf(member, zoom)),
      );
      const height =
        group.reduce(
          (sum, lane) => sum + captionRoom + lane.members.length * rowH,
          0,
        ) +
        Math.max(0, group.length - 1) * laneGap;
      return {
        lanes: group,
        width: 2 * radius + LABEL_GAP_PX + names,
        height,
      };
    });
    const planeW =
      buckets.reduce((sum, bucket) => sum + bucket.width, 0) +
      Math.max(0, buckets.length - 1) * COLUMN_GAP_PX;
    const tallest = Math.max(0, ...buckets.map((bucket) => bucket.height));
    return {
      zoom,
      columns,
      rowH,
      buckets,
      planeW,
      fits: tallest <= availH,
    };
  };

  let at: ReturnType<typeof plan> | null = null;
  for (let columns = 1; columns <= MAX_COLUMNS && !at; columns++) {
    for (let zoom = MAX_ZOOM; zoom >= MIN_ZOOM * 0.999; zoom *= ZOOM_STEP) {
      const tried = plan(zoom, columns);
      if (tried.fits) {
        at = tried;
        break;
      }
    }
  }
  at ??= plan(MIN_ZOOM, MAX_COLUMNS);
  // A zoom to hold is kept while its lanes still fit the canvas.
  const kept = input.hold ? plan(input.hold.zoom, at.columns) : null;
  const held = kept != null && kept.fits;
  if (held && kept) at = kept;
  const { zoom, rowH, buckets } = at;

  const seats = new Map<string, Seat>();
  const order = new Map<string, number>();
  const laneSeats = new Map<string, { x: number; y: number }>();
  /** Each lane's box on the plane, in pixels, for its slab. */
  const laneBoxes = new Map<
    string,
    { x0: number; x1: number; y0: number; y1: number }
  >();

  const centreX = -W / 2 + inset + clearW / 6;
  const centreR = input.centre.radiusPx * zoom;
  seats.set(input.centre.node.id, { x: centreX, y: 0, side: 2, depth: 0 });

  // The front plane, pulled left into the middle third if it runs over.
  const behindRoom = Math.min(clearW * 0.3, rightEdge - centreX);
  const start = Math.max(
    centreX + centreR + 24,
    Math.min(
      centreX + centreR + PLANE_ROOM_PX * params.ringRadius,
      rightEdge - behindRoom - at.planeW,
    ),
  );
  let left = start;
  let index = 0;
  const count = Math.max(1, [...front.keys()].length - 1);
  for (const bucket of buckets) {
    const radius = Math.max(
      1,
      ...bucket.lanes.flatMap((lane) =>
        lane.members.map((member) => member.radiusPx * zoom),
      ),
    );
    const x = left + radius;
    let top = bucket.height / 2;
    for (const lane of bucket.lanes) {
      const laneTop = top;
      // The title sits on the lane's first row as a caption, and clear above
      // the slab's top edge where there is one.
      laneSeats.set(lane.key, {
        x: x - radius,
        y: plated ? laneTop + PLATE_PAD_PX + 2 : laneTop,
      });
      top -= captionRoom;
      lane.members.forEach((member, row) => {
        seats.set(member.node.id, {
          x,
          y: top - (row + 0.5) * rowH,
          side: 0,
          depth: 0,
        });
        order.set(member.node.id, index++ / count);
      });
      top -= lane.members.length * rowH;
      laneBoxes.set(lane.key, {
        x0: left - PLATE_PAD_PX,
        x1: left + bucket.width + PLATE_PAD_PX,
        y0: top - PLATE_PAD_PX,
        y1: laneTop + PLATE_PAD_PX,
      });
      top -= laneGap;
    }
    left += bucket.width + COLUMN_GAP_PX;
  }
  const planeRight = start + at.planeW;

  // Behind: one layer per depth step, each node level with its parent.
  const layers = [2, 3] as const;
  let layerLeft = planeRight + BEHIND_GAP_PX * params.hopSpacing;
  for (const hop of layers) {
    const members = input.background.filter(
      (member) =>
        member.hop === hop &&
        !trailIds.has(member.node.id) &&
        !input.relations.has(member.node.id),
    );
    if (members.length === 0) continue;
    const depth = depthOfHop(hop, params.depthPerHop);
    const radius = Math.max(
      1,
      ...members.map((member) => (member.radiusPx * zoom) / (1 + depth)),
    );
    const named = hop === 2;
    const names = named
      ? Math.max(0, ...members.map((member) => member.labelW))
      : 0;
    const spacing = Math.max(
      2 * radius + params.padPx / 2,
      named ? Math.max(0, ...members.map((member) => member.labelH)) + 2 : 0,
    );
    const wanted = members.map((member) => {
      const via = member.via ? seats.get(member.via) : undefined;
      return { member, want: via ? -via.y : 0 };
    });
    wanted.sort((a, b) => a.want - b.want || compare(a.member, b.member));
    const tops = fitSpaced(
      wanted.map((each) => each.want),
      spacing,
      availH,
    );
    const x = layerLeft + radius;
    wanted.forEach(({ member }, i) => {
      const side: LabelSide =
        x + radius + LABEL_GAP_PX + member.labelW > rightEdge ? 1 : 0;
      seats.set(member.node.id, { x, y: -tops[i], side, depth });
    });
    layerLeft = x + radius + (named ? LABEL_GAP_PX + names : 0) + BEHIND_GAP_PX;
  }

  // The trail: small, in a row at the top left, the claim first.
  if (onTrail.length > 0) {
    const trailR = Math.max(
      1,
      ...onTrail.map((member) => member.radiusPx * zoom),
    );
    const trailH = Math.max(
      ...onTrail.map((member) => member.labelH),
      2 * trailR,
    );
    const y = availH / 2 - trailH / 2;
    let x = leftEdge;
    for (const member of onTrail) {
      const radius = member.radiusPx * zoom;
      x += radius;
      seats.set(member.node.id, { x, y, side: 0, depth: 0 });
      x += radius + LABEL_GAP_PX + member.labelW + TRAIL_GAP_PX;
    }
  }

  // The relation groups, where the reader has asked for them behind (decision
  // 155): one depth step back from the record they are named against, which
  // is the selection, fanned above and below it and clear of its silhouette,
  // so head-on they stand around it and an orbit shows them behind it. Their
  // names go to the left, where nothing else is drawn.
  if (input.relations.size > 0) {
    const byParent = new Map<string, BackgroundMember[]>();
    for (const member of input.background) {
      if (!input.relations.has(member.node.id)) continue;
      const parent = member.via ?? input.centre.node.id;
      byParent.set(parent, [...(byParent.get(parent) ?? []), member]);
    }
    for (const [parent, members] of byParent) {
      const anchor = seats.get(parent);
      if (!anchor) continue;
      const depth = depthOfHop(2, params.depthPerHop);
      const radius = Math.max(
        1,
        ...members.map((member) => (member.radiusPx * zoom) / (1 + depth)),
      );
      const pitch = Math.max(
        2 * radius + params.padPx / 2,
        Math.max(0, ...members.map((member) => member.labelH)) + 2,
      );
      const anchorR =
        parent === input.centre.node.id
          ? centreR
          : (front.get(parent)?.radiusPx ?? radius) * zoom;
      // Clear of the record even while it swells under the pointer: a name
      // that overlapped it there was dropped by the label solver on hover,
      // which is exactly when the reader is looking for it.
      const inner = anchorR * HOVER_SWELL + pitch;
      const rows = Math.ceil(members.length / 2);
      const room = Math.max(
        pitch / 2,
        (availH / 2 - inner) / Math.max(1, rows),
      );
      const step = Math.min(pitch, room);
      members.sort(compare);
      // The selection wears its own name under it, so the fan's lower half
      // starts below that rather than through it.
      const under =
        parent === input.centre.node.id ? input.centre.labelH * 1.2 : 0;
      members.forEach((member, i) => {
        const away = inner + Math.floor(i / 2) * step;
        const y = anchor.y + (i % 2 === 0 ? away : -(away + under));
        const side: LabelSide =
          anchor.x - radius - LABEL_GAP_PX - member.labelW < leftEdge ? 0 : 1;
        seats.set(member.node.id, { x: anchor.x, y, side, depth });
      });
    }
  }

  // Anything the reading did not place stays with what it hangs off, rather
  // than flying back to its seat in the story.
  for (const member of input.background) {
    if (seats.has(member.node.id)) continue;
    const via = member.via ? seats.get(member.via) : undefined;
    seats.set(member.node.id, {
      x: via?.x ?? centreX,
      y: via?.y ?? 0,
      side: 0,
      depth: via?.depth ?? depthOfHop(member.hop, params.depthPerHop),
    });
  }

  const scale = PX_PER_UNIT * zoom;
  const distance =
    input.viewHeight / (2 * Math.tan((input.fov * Math.PI) / 360) * scale);
  const lookAt = input.origin.clone();
  const eye = lookAt.clone().addScaledVector(input.normal, distance);
  const plane: PlaneFrame = {
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
  // Depth 2 is drawn without names until the reader points at one: the tree
  // is already open, and three columns of type is what made the old view a
  // hairball.
  const unnamed = new Set(
    input.background
      .filter((member) => member.hop !== 2 && !trailIds.has(member.node.id))
      .map((member) => member.node.id),
  );
  for (const [id, seat] of seats) {
    positions.set(id, seatOnPlane(plane, seat.x, seat.y, seat.depth));
    if (!unnamed.has(id)) labelSides.set(id, seat.side);
  }
  const laneMarks = new Map<string, Vector3>();
  for (const [key, mark] of laneSeats) {
    laneMarks.set(key, seatOnPlane(plane, mark.x, mark.y, 0));
  }
  // The slabs, in world units: the lane's box on the plane, laid a little
  // behind it so the nodes stand off it and an orbit shows the gap.
  const lanePlates = new Map<string, PagePlate>();
  if (plated) {
    for (const [key, box] of laneBoxes) {
      lanePlates.set(key, {
        centre: seatOnPlane(
          plane,
          (box.x0 + box.x1) / 2,
          (box.y0 + box.y1) / 2,
          0,
        ).addScaledVector(input.normal, -PLATE_BEHIND_PX / scale),
        width: (box.x1 - box.x0) / scale,
        height: (box.y1 - box.y0) / scale,
      });
    }
  }

  return {
    positions,
    labelSides,
    lookAt,
    distance,
    frame: held && input.hold ? input.hold : { zoom, x: 0, y: 0 },
    held,
    order,
    laneMarks,
    lanePlates,
  };
}

function compare(a: BackgroundMember, b: BackgroundMember): number {
  return a.node.id < b.node.id ? -1 : a.node.id > b.node.id ? 1 : 0;
}
