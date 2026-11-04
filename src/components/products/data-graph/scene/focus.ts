import { Vector3 } from "three";

import type {
  GraphBackgroundNames,
  GraphSpread,
} from "../config";
import type { GraphBand, GraphNode } from "../types";

/**
 * The focus arrangement (decisions 109, 111 and 116): a centre node, what it
 * links to on a ring around it in a plane facing the camera, and everything
 * else behind that plane, one step further out and one step deeper per link.
 *
 * Pure, and solved in screen pixels, because labels are drawn a fixed size on
 * screen and are what must not collide. World positions follow from a
 * nominal scale (`PX_PER_UNIT`) and the zoom the framing picks.
 *
 * ## The balancing rule (decision 116)
 *
 * A radial tree layout with wedge allocation (Eades 1992; the same wedges a
 * sunburst draws):
 *
 * 1. **Order.** The ring keeps the story as order around the circle, not as
 *    fixed angles: what comes before the centre on the left, what comes after
 *    on the right, people above, paper and messages below.
 * 2. **Room, by family size.** What is left of the circle once the minimums
 *    below are met is shared out, half of it in proportion to
 *    `1 + sqrt(descendants)`, where descendants are the nodes seated behind a
 *    neighbour at any depth. The square root damps a big family and the one
 *    keeps a lone node in the picture. Only half, because a circle spent to
 *    the last radian can be seated only one way, and rule 4 needs room to
 *    move.
 * 3. **Minimum gap.** Between any two neighbours lies at least the room their
 *    spheres and names need against each other, measured along the ring at the
 *    ring's radius, and at least what either one's own family needs one step
 *    out. When the minimums do not fit, the ring grows.
 * 4. **Angles.** Every neighbour is then seated as near as those gaps allow
 *    to the angle its column and its band ask for, by least squares in ring
 *    order (`seatByStory`). The story decides where a neighbour sits; its
 *    family size decides only how much room it has there.
 * 5. **Hop 2 and beyond.** A node's children split its sector again by the
 *    same weight and sit on an arc one step further out, across the whole
 *    width of the sector. A family too dense for one arc staggers across two
 *    or three. Each family's arc starts clear of everything nearer the centre.
 * 6. **Aspect.** The rings are ellipses as wide as the canvas is wide, so a
 *    wide canvas is used left and right of the centre instead of above it.
 * 7. **Collisions.** A short relaxation in screen space over every sphere,
 *    name and decision label pushes apart whatever still overlaps, moving the
 *    deeper node more. It visits pairs in a fixed order and runs a fixed
 *    number of passes, so it lands the same way every time.
 * 8. **Framing.** The camera comes as close as lets everything, names
 *    included, fit the canvas with a margin, and looks at the middle of it.
 */

/** Pixels per world unit on the focus plane at a zoom of 1. */
export const PX_PER_UNIT = 15;

/**
 * The settings drawer's layout values (decision 132), as the arrangements
 * read them. `DEFAULT_LAYOUT` is what the constants were before the drawer,
 * and reproduces the Ring exactly.
 */
export interface LayoutParams {
  ringRadius: number;
  hopSpacing: number;
  depthPerHop: number;
  spread: GraphSpread;
  /** Clear space between any two shapes, in pixels. */
  padPx: number;
  backgroundNames: GraphBackgroundNames;
}

export const DEFAULT_LAYOUT: LayoutParams = {
  ringRadius: 1,
  hopSpacing: 1,
  depthPerHop: 1,
  spread: "sqrt",
  padPx: 6,
  backgroundNames: "backbone",
};

/**
 * The values of the arrangement being solved. Set once at the top of
 * `arrangeFocus` and read by the helpers below, which would otherwise each
 * take one more argument; the solve is synchronous, so nothing else sees it.
 */
let P: LayoutParams = DEFAULT_LAYOUT;

/**
 * How much smaller than its tier a background node is drawn, by link distance
 * (null: no path), with `scale` the two-link size as a share of 0.85, the
 * default. Perspective shrinks the deeper ones further.
 */
export function backgroundScale(hop: number | null, scale = 1): number {
  if (hop === 2) return 0.85 * scale;
  if (hop === 3) return 0.74 * scale;
  return 0.64 * scale;
}

/** How far behind the plane a hop sits, in camera distances; null is the rim. */
export function depthOfHop(hop: number | null, perHop: number): number {
  if (hop == null) return DEPTH_RIM * perHop;
  return Math.min(DEPTH_MAX, DEPTH_FIRST + DEPTH_STEP * (hop - 2)) * perHop;
}

/** A family's weight from how many sit behind it (decision 116, rule 2). */
export function spreadWeight(descendants: number, spread: GraphSpread): number {
  if (spread === "none") return 1;
  if (spread === "size") return 1 + descendants;
  return 1 + Math.sqrt(descendants);
}

/**
 * How far along a spoke, from the centre, its decision label sits. Past the
 * middle, because the centre's own sphere and name take more room than a
 * neighbour's sphere does.
 */
export const SPOKE_LABEL_AT = 0.6;

/**
 * Whether a background node keeps its name on screen: by default the
 * backbone one link past the ring (decision 111), deeper names on hover; the
 * drawer can name none or all of them.
 */
export function namedBehind(
  hop: number | null,
  node: GraphNode,
  names: GraphBackgroundNames = "backbone",
): boolean {
  if (names === "all") return true;
  if (names === "none") return false;
  return hop === 2 && node.tier <= 1;
}

/**
 * Close up, where a sphere is large on screen, its type grows a little with
 * it, up to a limit, so a name does not look lost beside its node. Labels are
 * measured at no boost and grown by it wherever the zoom is known.
 */
export function labelBoost(radiusPx: number): number {
  return Math.min(1.35, Math.max(1, 1 + (radiusPx - 14) / 80));
}

/** The closest and farthest the camera may frame, against the nominal scale. */
const MIN_ZOOM = 0.62;
const MAX_ZOOM = 1.6;
/** The farthest the camera goes out, and only when nothing closer fits. */
const FLOOR_ZOOM = 0.2;
/** How far a small arrangement may be spread out to fill a large canvas. */
const MAX_SPREAD_OUT = 1.45;
/** Kept clear around the arrangement when the camera frames it. */
const FRAME_MARGIN_PX = 36;
/** Between a sphere's edge and its label: the engine's value. */
const LABEL_GAP_PX = 6;
/** The smallest ring, measured on its short axis. */
const MIN_RING_PX = 110;
const RING_GROWTH = 1.08;
const MAX_RING_PX = 1400;
/** Share of the circle the minimum sectors may claim before the ring grows. */
const RING_SLACK = 0.92;
/** How much of the room left over the ring spends on the biggest families. */
const SPREAD_SHARE = 0.5;
/** The most arcs one family staggers across. */
const MAX_ARCS = 3;
/**
 * The widest a family spreads, however wide its sector: a ring neighbour's
 * family may wrap well round a centre with few neighbours; deeper families
 * keep closer behind their parent.
 */
const MAX_SPREAD = { ring: 320 * (Math.PI / 180), deep: 150 * (Math.PI / 180) };
/** Between one ring and the next one out, beyond what the shapes need. */
const HOP_GAP_PX = 18;
/** What a node one ring out keeps clear of every shape nearer the centre. */
const CLEAR_PX = 12;
/** The widest and narrowest the rings may be against their height. */
const ASPECT = [0.7, 2.6] as const;
/** Behind the plane, in camera distances: one step per hop, the rim last. */
const DEPTH_FIRST = 0.16;
const DEPTH_STEP = 0.15;
const DEPTH_MAX = 0.52;
const DEPTH_RIM = 0.68;
/** Relaxation passes, and the movement below which it stops early. */
const RELAX_PASSES = 90;
const RELAX_REST_PX = 0.25;
/** How readily each hop gives way in a collision: the centre never does. */
const MOBILITY = [0, 0.3, 1, 1] as const;
/** Height of a decision label on a spoke, in pixels. */
const DECISION_H_PX = 16;

export interface FocusMember {
  node: GraphNode;
  /** Its tier's sphere radius at the nominal scale: what its type size follows. */
  typePx: number;
  /** Sphere radius on screen at the nominal scale, status ring included. */
  radiusPx: number;
  /** Label size on screen. */
  labelW: number;
  labelH: number;
  /** Width of the decision label on the edge to the centre, if there is one. */
  decisionW: number | null;
}

/**
 * A node off the plane, with its link distance from the centre (`hop`, 2 or
 * more; null with no path in the visible graph) and the node one hop nearer
 * that it sits behind (`via`: a neighbour for hop 2, a hop-2 node for hop 3).
 */
export interface BackgroundMember {
  node: GraphNode;
  hop: number | null;
  via: string | null;
  /** Its tier's sphere radius at the nominal scale: what its type size follows. */
  typePx: number;
  /** Sphere radius at the nominal scale, its background size included. */
  radiusPx: number;
  /** Its name's size on screen, as drawn behind the plane. */
  labelW: number;
  labelH: number;
}

/** Where a focus was framed: the zoom, and where the camera looks on the plane in world units. */
export interface FocusFrame {
  zoom: number;
  x: number;
  y: number;
}

export interface FocusInput {
  centre: FocusMember;
  neighbours: readonly FocusMember[];
  background: readonly BackgroundMember[];
  /** Where the centre sits, and the plane's axes (normal toward the camera). */
  origin: Vector3;
  right: Vector3;
  up: Vector3;
  normal: Vector3;
  /** The canvas the arrangement is framed in, in CSS pixels. */
  viewWidth: number;
  viewHeight: number;
  /** The camera's vertical field of view, in degrees. */
  fov: number;
  /**
   * Keep this framing instead of choosing one (decision 118: what arrives
   * does not move the camera), unless the arrangement no longer fits it.
   */
  hold?: FocusFrame | null;
  /** The drawer's layout values; the defaults when absent. */
  params?: LayoutParams;
}

/** 0 right, 1 left, 2 below: the engine's label sides. */
export type LabelSide = 0 | 1 | 2;

export interface FocusArrangement {
  positions: Map<string, Vector3>;
  labelSides: Map<string, LabelSide>;
  /** Where the camera looks: the middle of the arrangement as it will show. */
  lookAt: Vector3;
  /** How far in front of the plane the camera stands. */
  distance: number;
  /** The framing chosen, to hold it later. */
  frame: FocusFrame;
  /** Whether `hold` was kept. */
  held: boolean;
}

interface Rect {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

/** One node while it is being placed. Pixels, y up, relative to the centre. */
interface Body {
  id: string;
  node: GraphNode;
  /** 0 the centre, 1 the ring, 2 and on behind it; -1 on the rim. */
  hop: number;
  parent: Body | null;
  children: Body[];
  weight: number;
  r: number;
  typePx: number;
  labelW: number;
  labelH: number;
  /** Whether its name is drawn while the focus rests. */
  named: boolean;
  side: LabelSide;
  decisionW: number | null;
  /** Behind the plane, in camera distances. */
  depth: number;
  angle: number;
  lo: number;
  hi: number;
  /** Its ellipse radius. */
  R: number;
  x: number;
  y: number;
}

const BAND_RANK: Record<GraphBand, number> = { above: 1, main: 0, below: -1 };
const DEG = Math.PI / 180;
const TAU = Math.PI * 2;

export function arrangeFocus(input: FocusInput): FocusArrangement {
  P = input.params ?? DEFAULT_LAYOUT;
  const { origin, right, up, normal } = input;
  const availW = Math.max(160, input.viewWidth - FRAME_MARGIN_PX * 2);
  const availH = Math.max(160, input.viewHeight - FRAME_MARGIN_PX * 2);
  // The rings take the canvas's shape. An arrangement that still comes out
  // the wrong shape for it (one neighbour with everything behind it runs
  // tall) is solved once more with the ellipse corrected by what it missed.
  const canvasAspect = availW / availH;
  let aspect = clamp(canvasAspect * 1.1, ASPECT[0], ASPECT[1]);
  let all = solve(input, aspect);
  const solved = bounds(all, 1);
  const shape = (solved.x1 - solved.x0) / Math.max(solved.y1 - solved.y0, 1);
  const corrected = clamp(
    aspect * Math.sqrt(canvasAspect / shape),
    ASPECT[0],
    ASPECT[1],
  );
  if (Math.abs(corrected / aspect - 1) > 0.15) {
    aspect = corrected;
    all = solve(input, aspect);
  }

  // A frame to hold is kept only if everything, once relaxed at its zoom,
  // is still inside the canvas it frames. Otherwise the camera has to move.
  const hold = input.hold;
  let held = false;
  let zoom = MIN_ZOOM;
  if (hold) {
    relax(all, hold.zoom);
    const box = bounds(all, hold.zoom);
    const cx = hold.x * PX_PER_UNIT * hold.zoom;
    const cy = hold.y * PX_PER_UNIT * hold.zoom;
    held =
      box.x0 >= cx - availW / 2 &&
      box.x1 <= cx + availW / 2 &&
      box.y0 >= cy - availH / 2 &&
      box.y1 <= cy + availH / 2;
    if (held) zoom = hold.zoom;
  }

  // Frame, relax at that zoom, and frame again if pushing apart overflowed.
  const fits = (at: number) => {
    const box = bounds(all, at);
    return box.x1 - box.x0 <= availW && box.y1 - box.y0 <= availH;
  };
  if (!held) {
    if (fits(MAX_ZOOM)) {
      zoom = MAX_ZOOM;
      // Room to spare at the closest zoom: spread the arrangement into it
      // rather than leave the canvas empty around a small picture. Spheres
      // and names keep their size; only the distances between them grow.
      let low = 1;
      let high = MAX_SPREAD_OUT;
      for (let i = 0; i < 12; i++) {
        const mid = (low + high) / 2;
        scaleAll(all, mid);
        if (fits(MAX_ZOOM)) low = mid;
        else high = mid;
        scaleAll(all, 1 / mid);
      }
      scaleAll(all, low);
    } else if (fits(MIN_ZOOM)) {
      let low = MIN_ZOOM;
      let high = MAX_ZOOM;
      for (let i = 0; i < 14; i++) {
        const mid = (low + high) / 2;
        if (fits(mid)) low = mid;
        else high = mid;
      }
      zoom = low;
    } else {
      // Too much for the closest framing we like (a claim with every
      // request out: new quotes land three links from the claim). Nothing
      // may be cut off at the canvas edge, so the camera goes further out,
      // to the zoom that fits.
      let low = FLOOR_ZOOM;
      let high = MIN_ZOOM;
      for (let i = 0; i < 12; i++) {
        const mid = (low + high) / 2;
        if (fits(mid)) low = mid;
        else high = mid;
      }
      zoom = low;
    }
    // Relaxing can push past the frame: step out and relax again. Down to
    // the usual closest framing this is three rounds, as it always was;
    // past it, which only an arrangement that would otherwise be cut off
    // reaches, it goes on toward the floor until everything is on screen.
    const overAt = (at: number) => {
      const box = bounds(all, at);
      return Math.max((box.x1 - box.x0) / availW, (box.y1 - box.y0) / availH);
    };
    for (let round = 0; round < 8; round++) {
      relax(all, zoom);
      const over = overAt(zoom);
      if (over <= 1.02) break;
      if (zoom <= MIN_ZOOM) {
        if (zoom <= FLOOR_ZOOM) break;
        zoom = Math.max(FLOOR_ZOOM, zoom / over);
        continue;
      }
      zoom = Math.max(MIN_ZOOM, zoom / over);
      if (round >= 2 && overAt(zoom) <= 1.02) break;
    }
  }

  const scale = PX_PER_UNIT * zoom;
  const box = bounds(all, zoom);
  const frame: FocusFrame =
    held && hold
      ? hold
      : {
          zoom,
          x: (box.x0 + box.x1) / 2 / scale,
          y: (box.y0 + box.y1) / 2 / scale,
        };
  const lookAt = origin
    .clone()
    .addScaledVector(right, frame.x)
    .addScaledVector(up, frame.y);
  const distance =
    input.viewHeight / (2 * Math.tan((input.fov * DEG) / 2) * scale);
  const eye = lookAt.clone().addScaledVector(normal, distance);

  const positions = new Map<string, Vector3>();
  const labelSides = new Map<string, LabelSide>();
  const plane: PlaneFrame = {
    origin,
    right,
    up,
    normal,
    eye,
    distance,
    scale,
    depthScale: depthScaleFor(input.fov),
  };
  for (const body of all) {
    positions.set(
      body.id,
      seatOnPlane(plane, body.x * zoom, body.y * zoom, body.depth),
    );
    if (body.hop === 0 || body.hop === 1 || body.named) {
      labelSides.set(body.id, body.side);
    }
  }
  return { positions, labelSides, lookAt, distance, frame, held };
}

/** A focus plane as framed: its axes, the eye, and pixels per world unit on it. */
export interface PlaneFrame {
  origin: Vector3;
  right: Vector3;
  up: Vector3;
  normal: Vector3;
  eye: Vector3;
  distance: number;
  scale: number;
  /**
   * Depths are camera distances at the default field of view, so a wider
   * field of view, which brings the camera closer, deepens the perspective
   * behind the plane instead of being framed away. 1 at the default.
   */
  depthScale?: number;
}

/** The field of view depths are measured against (`PlaneFrame.depthScale`). */
const REFERENCE_FOV = 32;

/** `PlaneFrame.depthScale` for a field of view, in degrees. */
export function depthScaleFor(fov: number): number {
  return Math.tan((fov * DEG) / 2) / Math.tan((REFERENCE_FOV * DEG) / 2);
}

/**
 * A world position for a point seated at (sx, sy) pixels from the plane's
 * origin, `depth` camera distances behind it. Off the plane it is pushed back
 * along the ray from the eye, so it shows exactly where it was seated and the
 * depth says how far it is from the centre.
 */
export function seatOnPlane(
  {
    origin,
    right,
    up,
    normal,
    eye,
    distance,
    scale,
    depthScale = 1,
  }: PlaneFrame,
  sx: number,
  sy: number,
  depth: number,
): Vector3 {
  if (depth === 0) {
    return origin
      .clone()
      .addScaledVector(right, sx / scale)
      .addScaledVector(up, sy / scale);
  }
  const behind = distance * depth * depthScale;
  const stretch = (distance + behind) / distance / scale;
  return origin
    .clone()
    .addScaledVector(normal, -behind)
    .addScaledVector(right, sx * stretch)
    .addScaledVector(up, sy * stretch)
    .add(
      new Vector3()
        .subVectors(origin, eye)
        .addScaledVector(normal, distance)
        .multiplyScalar(behind / distance),
    );
}

/** Seat every node on ellipses of this aspect, before collisions. */
function solve(input: FocusInput, aspect: number): Body[] {
  const ellipse: Ellipse = { ex: Math.sqrt(aspect), ey: 1 / Math.sqrt(aspect) };
  const { centre, ring, deep, rim, all } = buildTree(input);
  placeRing(centre, ring, ellipse);
  const layers = [...new Set(deep.map((body) => body.hop))].sort(
    (a, b) => a - b,
  );
  const placed: Body[] = [centre, ...ring];
  for (const hop of layers) {
    const families = new Map<Body, Body[]>();
    for (const body of deep) {
      if (body.hop !== hop || !body.parent) continue;
      const list = families.get(body.parent) ?? [];
      list.push(body);
      families.set(body.parent, list);
    }
    const inner = placed.map((b) => shapesOf(b, 1, b.x, b.y));
    for (const [parent, family] of [...families.entries()].sort((a, b) =>
      compare(a[0].id, b[0].id),
    )) {
      placeFamily(parent, family, ellipse, inner);
      placed.push(...family);
    }
  }
  placeRim(rim, placed, ellipse);
  return all;
}

// ------------------------------------------------------------------- tree

function buildTree(input: FocusInput): {
  centre: Body;
  ring: Body[];
  deep: Body[];
  rim: Body[];
  all: Body[];
} {
  const body = (
    member: FocusMember | BackgroundMember,
    hop: number,
    depth: number,
  ): Body => ({
    id: member.node.id,
    node: member.node,
    hop,
    parent: null,
    children: [],
    weight: 1,
    r: member.radiusPx,
    typePx: member.typePx,
    labelW: member.labelW,
    labelH: member.labelH,
    named: hop <= 1,
    side: hop === 0 ? 2 : 0,
    decisionW: "decisionW" in member ? member.decisionW : null,
    depth,
    angle: 0,
    lo: -Math.PI,
    hi: Math.PI,
    R: 0,
    x: 0,
    y: 0,
  });
  const centre = body(input.centre, 0, 0);
  const byId = new Map<string, Body>([[centre.id, centre]]);
  const ring = input.neighbours.map((member) => {
    const b = body(member, 1, 0);
    b.parent = centre;
    centre.children.push(b);
    byId.set(b.id, b);
    return b;
  });

  const deep: Body[] = [];
  const rim: Body[] = [];
  const ordered = [...input.background].sort(
    (a, b) =>
      (a.hop ?? Infinity) - (b.hop ?? Infinity) ||
      compare(a.node.id, b.node.id),
  );
  for (const member of ordered) {
    const parent = member.via ? byId.get(member.via) : undefined;
    const hop = member.hop;
    if (hop == null || !parent || parent.hop !== hop - 1) {
      const b = body(member, -1, depthOfHop(null, P.depthPerHop));
      b.named = namedBehind(null, member.node, P.backgroundNames);
      rim.push(b);
      continue;
    }
    const b = body(member, hop, depthOfHop(hop, P.depthPerHop));
    b.named = namedBehind(hop, member.node, P.backgroundNames);
    b.parent = parent;
    parent.children.push(b);
    byId.set(b.id, b);
    deep.push(b);
  }

  const descendants = (b: Body): number =>
    b.children.reduce((sum, child) => sum + 1 + descendants(child), 0);
  for (const b of byId.values()) {
    b.weight = spreadWeight(descendants(b), P.spread);
  }
  for (const b of rim) b.weight = 1;
  return { centre, ring, deep, rim, all: [centre, ...ring, ...deep, ...rim] };
}

// ------------------------------------------------------------------- ring

interface Ellipse {
  ex: number;
  ey: number;
}

function pointAt(e: Ellipse, R: number, angle: number): [number, number] {
  return [R * e.ex * Math.cos(angle), R * e.ey * Math.sin(angle)];
}

/** Pixels along the ellipse per radian at this radius and angle. */
function arcSpeed(e: Ellipse, R: number, angle: number): number {
  const s = Math.sin(angle);
  const c = Math.cos(angle);
  return R * Math.sqrt(e.ex * e.ex * s * s + e.ey * e.ey * c * c);
}

/** The unit tangent, counter-clockwise. */
function tangent(e: Ellipse, angle: number): [number, number] {
  const tx = -e.ex * Math.sin(angle);
  const ty = e.ey * Math.cos(angle);
  const length = Math.hypot(tx, ty) || 1;
  return [tx / length, ty / length];
}

/**
 * Seat the ring: every neighbour as near the angle its story asks for as the
 * room between them allows.
 *
 * What is hard here is that the ring must fill the circle. Laying each
 * neighbour's sector end to end and turning the lot as a whole, which is what
 * this replaced, makes the seating rigid: one large family buys a wide arc and
 * carries every node after it round the ring, and a single rotation cannot put
 * them back. On PT-01 the loss assessment has 25 records behind it, and the
 * arc that bought them seated the assessment itself below and to the left of a
 * claim whose column is to the right; PT-03's settlement went the same way.
 *
 * So the weight no longer decides where a neighbour sits, only how much of the
 * spare room it gets there (`share`). The angles are wishes, the gaps between
 * neighbours are hard minimums from their shapes and their families, and
 * `seatByStory` fits the wishes inside the minimums.
 */
function placeRing(centre: Body, ring: Body[], e: Ellipse): void {
  const k = ring.length;
  if (k === 0) return;
  const wanted = storyAngles(centre.node, ring);
  const order = [...ring].sort(
    (a, b) =>
      positiveAngle(wanted.get(a.id) ?? 0) -
        positiveAngle(wanted.get(b.id) ?? 0) || compare(a.id, b.id),
  );
  for (const b of order) {
    b.angle = wanted.get(b.id) ?? 0;
    b.side = Math.cos(b.angle) >= -1e-6 ? 0 : 1;
  }

  // The ring starts clear of the centre's sphere and name.
  const centreBox = shapesOf(centre, 1, 0, 0);
  // A neighbour's near side is its sphere: names point away from the centre.
  const widest = Math.max(...order.map((b) => b.r));
  let R = Math.max(
    MIN_RING_PX / e.ey,
    (Math.abs(centreBox.box.y0) + widest + P.padPx) / e.ey,
    (centreBox.box.x1 + widest + P.padPx) / e.ex,
  );

  if (k === 1) {
    order[0].lo = -Math.PI;
    order[0].hi = Math.PI;
  } else {
    for (let attempt = 0; attempt < 60; attempt++) {
      let fitted = false;
      for (let pass = 0; pass < 3; pass++) {
        // What each neighbour needs to itself, as an angle at this radius.
        const mins = order.map((b, i) =>
          Math.max(
            pairAngle(order[(i - 1 + k) % k], b, R, e),
            pairAngle(b, order[(i + 1) % k], R, e),
            familyAngle(b, R, e),
          ),
        );
        // Half of each side's need is what must lie between two neighbours.
        const gaps = mins.map((min, i) => (min + mins[(i + 1) % k]) / 2);
        const needed = gaps.reduce((sum, gap) => sum + gap, 0);
        if (needed > TAU * RING_SLACK) {
          fitted = false;
          break;
        }
        share(gaps, order, TAU - needed);
        seatByStory(order, gaps, wanted);
        fitted = true;
      }
      if (fitted || R * RING_GROWTH > MAX_RING_PX) {
        // Nothing fits at any radius we will draw: even gaps, still in story
        // order, and the relaxation pass takes it from there.
        if (!fitted) {
          seatByStory(
            order,
            order.map(() => TAU / k),
            wanted,
          );
        }
        break;
      }
      R *= RING_GROWTH;
    }
  }

  R *= P.ringRadius;
  for (const b of order) {
    b.R = R;
    [b.x, b.y] = pointAt(e, R, b.angle);
    // A name points away from the centre; straight up or down it takes the
    // side its story put it on.
    b.side = Math.abs(b.x) < 1 ? b.side : b.x > 0 ? 0 : 1;
  }
}

/**
 * Spend part of the room left over on the neighbours with the most behind
 * them (rule 2), so a big family still opens out where it sits. Only part:
 * the rest is what lets `seatByStory` honour the story's angles, and a circle
 * spent to the last radian can only be seated one way.
 */
function share(gaps: number[], order: readonly Body[], slack: number): void {
  if (slack <= 0) return;
  const k = order.length;
  const weights = gaps.map(
    (_, i) => order[i].weight + order[(i + 1) % k].weight,
  );
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  if (total <= 0) return;
  const spend = slack * SPREAD_SHARE;
  for (let i = 0; i < k; i++) gaps[i] += (spend * weights[i]) / total;
}

/**
 * Seat the ring at the angles the story asks for, keeping `gaps[i]` between
 * neighbour `i` and the next one round (rule 4).
 *
 * With the gaps taken out of the way the problem is one-dimensional: write
 * each seat as its wish minus the gaps that must lie before it, and the only
 * thing left to ask of the seats is that they do not run backwards. That is
 * isotonic regression, which `isotonic` solves exactly, so no neighbour ends
 * further from its wish than the room strictly requires. What comes back is
 * then squeezed toward its own middle where the last gap, the one that closes
 * the circle, no longer fits.
 */
function seatByStory(
  order: Body[],
  gaps: readonly number[],
  wanted: ReadonlyMap<string, number>,
): void {
  const k = order.length;
  const angleOf = (b: Body) => wanted.get(b.id) ?? 0;
  // The wishes as one increasing run, in ring order.
  const wish = [positiveAngle(angleOf(order[0]))];
  for (let i = 1; i < k; i++) {
    wish.push(
      wish[i - 1] + positiveAngle(angleOf(order[i]) - angleOf(order[i - 1])),
    );
  }
  const before = [0];
  for (let i = 1; i < k; i++) before.push(before[i - 1] + gaps[i - 1]);
  const seats = isotonic(wish.map((at, i) => at - before[i]));

  const slack = TAU - gaps.reduce((sum, gap) => sum + gap, 0);
  const span = seats[k - 1] - seats[0];
  if (span > slack && span > 0) {
    const mid = (seats[0] + seats[k - 1]) / 2;
    const squeeze = slack / span;
    for (let i = 0; i < k; i++) seats[i] = mid + (seats[i] - mid) * squeeze;
  }
  for (let i = 0; i < k; i++) order[i].angle = seats[i] + before[i];
  // A neighbour's sector is half the gap to each side: the weight decided how
  // wide those gaps are, so the family behind it still gets its room.
  for (let i = 0; i < k; i++) {
    const back = i === 0 ? order[k - 1].angle - TAU : order[i - 1].angle;
    const forward = i === k - 1 ? order[0].angle + TAU : order[i + 1].angle;
    order[i].lo = -(order[i].angle - back) / 2;
    order[i].hi = (forward - order[i].angle) / 2;
  }
}

/**
 * The nearest sequence to `values` that never decreases, in the least-squares
 * sense: pool adjacent violators, which merges any pair running backwards
 * into their mean and repeats until none does.
 */
function isotonic(values: readonly number[]): number[] {
  const mean: number[] = [];
  const size: number[] = [];
  for (const value of values) {
    mean.push(value);
    size.push(1);
    while (mean.length > 1 && mean[mean.length - 2] > mean[mean.length - 1]) {
      const n = mean.length;
      const pooled =
        (mean[n - 2] * size[n - 2] + mean[n - 1] * size[n - 1]) /
        (size[n - 2] + size[n - 1]);
      const count = size[n - 2] + size[n - 1];
      mean.length = n - 1;
      size.length = n - 1;
      mean[n - 2] = pooled;
      size[n - 2] = count;
    }
  }
  const out: number[] = [];
  mean.forEach((value, i) => {
    for (let j = 0; j < size[i]; j++) out.push(value);
  });
  return out;
}

/** The angle two neighbours on the ring need between them at radius R. */
function pairAngle(a: Body, b: Body, R: number, e: Ellipse): number {
  if (a === b) return 0;
  const mid = a.angle + angleBetween(b.angle, a.angle) / 2;
  const [tx, ty] = tangent(e, mid);
  const [ax] = pointAt(e, R, a.angle);
  const [bx] = pointAt(e, R, b.angle);
  // Counter-clockwise from a to b, the labels on the sides they will fall on.
  const need =
    extent({ ...a, side: sideAt(a, ax) }, tx, ty) +
    extent({ ...b, side: sideAt(b, bx) }, -tx, -ty) +
    P.padPx;
  return need / Math.max(arcSpeed(e, R, mid), 1);
}

function sideAt(b: Body, x: number): LabelSide {
  return Math.abs(x) < 1 ? b.side : x > 0 ? 0 : 1;
}

/** The angle a neighbour's family needs one ring out, across up to two arcs. */
function familyAngle(b: Body, R: number, e: Ellipse): number {
  if (b.children.length === 0) return 0;
  const [tx, ty] = tangent(e, b.angle);
  const R2 = R + (2 * b.r + b.labelH + HOP_GAP_PX) / Math.min(e.ex, e.ey);
  let need = 0;
  for (const child of b.children) {
    need += extent(child, tx, ty) + extent(child, -tx, -ty) + P.padPx;
  }
  return Math.min(
    MAX_SPREAD.ring,
    need / Math.min(2, b.children.length) / arcSpeed(e, R2, b.angle),
  );
}

/**
 * The angle each neighbour would like, by the story: the left and right sides
 * around the horizontal, the top and bottom split down the middle in story
 * order left to right, with an odd one out going to the emptier half.
 */
function storyAngles(
  centre: GraphNode,
  ring: readonly Body[],
): Map<string, number> {
  type Sector = "right" | "top" | "left" | "bottom";
  const sides: Record<Sector, Body[]> = {
    right: [],
    top: [],
    left: [],
    bottom: [],
  };
  for (const b of ring) sides[sectorOf(centre, b.node)].push(b);
  for (const list of Object.values(sides)) {
    list.sort((a, b) => byStory(a.node, b.node));
  }
  const split = (list: Body[], rightSoFar: number, leftSoFar: number) => {
    const half = Math.floor(list.length / 2);
    const odd = list.length % 2 === 1;
    const cut = odd && rightSoFar <= leftSoFar ? half : list.length - half;
    return { left: list.slice(0, cut), right: list.slice(cut) };
  };
  const top = split(sides.top, sides.right.length, sides.left.length);
  const bottom = split(
    sides.bottom,
    sides.right.length + top.right.length,
    sides.left.length + top.left.length,
  );
  const step = 12 * DEG;
  const out = new Map<string, number>();
  top.right.forEach((b, j) => out.set(b.id, 90 * DEG - (j + 0.5) * step));
  sides.right.forEach((b, i, list) =>
    out.set(b.id, ((list.length - 1) / 2 - i) * step),
  );
  bottom.right.forEach((b, j, list) =>
    out.set(b.id, -90 * DEG + (list.length - j - 0.5) * step),
  );
  top.left.forEach((b, j, list) =>
    out.set(b.id, 90 * DEG + (list.length - j - 0.5) * step),
  );
  sides.left.forEach((b, i, list) =>
    out.set(b.id, 180 * DEG + (i - (list.length - 1) / 2) * step),
  );
  bottom.left.forEach((b, j) => out.set(b.id, 270 * DEG - (j + 0.5) * step));
  return out;
}

/** Where a neighbour belongs around the centre, by the story. */
function sectorOf(
  centre: GraphNode,
  node: GraphNode,
): "right" | "top" | "left" | "bottom" {
  if (node.band === "above" && centre.band !== "above") return "top";
  if (node.band === "below" && centre.band !== "below") return "bottom";
  if (node.column < centre.column) return "left";
  if (node.column > centre.column) return "right";
  const band = BAND_RANK[node.band] - BAND_RANK[centre.band];
  if (band > 0) return "top";
  if (band < 0) return "bottom";
  // Same place in the story: what the centre opens onto reads after it.
  return node.tier < centre.tier ? "left" : "right";
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

// ------------------------------------------------------------- background

/**
 * Seat one family behind its parent: the parent's sector split by weight, in
 * story order along it (top to bottom on a side, left to right above or
 * below), on an arc clear of everything nearer the centre, staggered across
 * more arcs where one is too dense.
 */
function placeFamily(
  parent: Body,
  family: Body[],
  e: Ellipse,
  inner: readonly Placed[],
): void {
  const px = Math.cos(parent.angle) * e.ex;
  const py = Math.sin(parent.angle) * e.ey;
  const sideways = Math.abs(px) >= Math.abs(py);
  family.sort((a, b) =>
    sideways
      ? BAND_RANK[b.node.band] - BAND_RANK[a.node.band] ||
        byStory(a.node, b.node)
      : byStory(a.node, b.node),
  );
  const descending = sideways ? px > 0 : py > 0;
  const width = Math.min(
    parent.hi - parent.lo,
    parent.hop === 1 ? MAX_SPREAD.ring : MAX_SPREAD.deep,
  );
  const mid = (parent.lo + parent.hi) / 2;
  const weight = family.reduce((sum, b) => sum + b.weight, 0);
  let at = descending ? mid + width / 2 : mid - width / 2;
  for (const b of family) {
    const share = (width * b.weight) / weight;
    const centre = descending ? at - share / 2 : at + share / 2;
    at = descending ? at - share : at + share;
    b.angle = parent.angle + centre;
    b.lo = -share / 2;
    b.hi = share / 2;
    b.side = Math.cos(b.angle) >= 0 ? 0 : 1;
  }

  // One arc for the family, clear of the parent and of every nearer shape.
  let R = parent.R;
  for (const b of family) R = Math.max(R, clearRadius(b, parent.R, e, inner));
  // Guarded: a + (b - a) is not always b in floating point, and the default
  // must reproduce the Ring exactly.
  if (P.hopSpacing !== 1) R = parent.R + (R - parent.R) * P.hopSpacing;

  // Stagger where neighbours on the arc would touch.
  let arcs = 1;
  for (let i = 1; i < family.length; i++) {
    const a = family[i - 1];
    const b = family[i];
    const turn = angleBetween(b.angle, a.angle);
    const [tx, ty] = tangent(e, a.angle + turn / 2);
    // The tangent runs counter-clockwise; b lies along it or against it.
    const toward = turn >= 0 ? 1 : -1;
    const need =
      extent(a, tx * toward, ty * toward) +
      extent(b, -tx * toward, -ty * toward) +
      P.padPx;
    const have = Math.abs(turn) * arcSpeed(e, R, a.angle + turn / 2);
    arcs = Math.max(
      arcs,
      Math.min(MAX_ARCS, Math.ceil(need / Math.max(have, 1))),
    );
  }
  const thickest = Math.max(
    ...family.map((b) => extent(b, 0, 1) + extent(b, 0, -1)),
  );
  const step = (thickest + P.padPx) / Math.min(e.ex, e.ey);
  family.forEach((b, i) => {
    b.R = R + (i % arcs) * step;
    [b.x, b.y] = pointAt(e, b.R, b.angle);
    b.side = b.x >= 0 ? 0 : 1;
  });
}

/** The smallest radius at this angle where a node touches nothing nearer the centre. */
function clearRadius(
  b: Body,
  from: number,
  e: Ellipse,
  inner: readonly Placed[],
): number {
  const step = 5 / Math.min(e.ex, e.ey);
  let R = from + HOP_GAP_PX / Math.max(e.ex, e.ey);
  for (let i = 0; i < 300; i++) {
    const [x, y] = pointAt(e, R, b.angle);
    const mine = shapesOf({ ...b, side: x >= 0 ? 0 : 1 }, 1, x, y);
    const blocked = inner.some(
      (other) =>
        overlapsBox(mine.box, other.box, CLEAR_PX) &&
        mine.shapes.some((s) =>
          other.shapes.some((o) => push(o, s, CLEAR_PX) != null),
        ),
    );
    if (!blocked) return R;
    R += step;
  }
  return R;
}

/** No path in the visible graph: an arc beyond everything, spread evenly. */
function placeRim(rim: Body[], placed: readonly Body[], e: Ellipse): void {
  if (rim.length === 0) return;
  rim.sort((a, b) => byStory(a.node, b.node));
  const outer = placed.reduce((most, b) => Math.max(most, b.R), 0);
  const R = outer + (60 * P.hopSpacing) / Math.min(e.ex, e.ey);
  rim.forEach((b, i) => {
    b.angle = -Math.PI / 2 + ((i + 0.5) / rim.length - 0.5) * Math.PI * 1.6;
    b.R = R;
    [b.x, b.y] = pointAt(e, R, b.angle);
    b.side = b.x >= 0 ? 0 : 1;
  });
}

// ----------------------------------------------------------------- shapes

type Placed = { shapes: Shape[]; box: Rect };

type Shape =
  | { kind: "circle"; x: number; y: number; r: number; lever: number }
  | { kind: "rect"; rect: Rect; lever: number };

/**
 * A node's shapes on screen at `zoom`, around (x, y): its sphere and, while
 * its name shows, the name on its side; a ring neighbour's decision label
 * where the engine draws it, along the spoke. `lever` is how far a shape
 * moves when its node does.
 */
function shapesOf(
  b: Body,
  zoom: number,
  x: number,
  y: number,
  withDecision = true,
): { shapes: Shape[]; box: Rect } {
  const r = (b.r * zoom) / (1 + b.depth);
  const boost = labelBoost((b.typePx * zoom) / (1 + b.depth));
  const labelW = b.labelW * boost;
  const labelH = b.labelH * boost;
  const shapes: Shape[] = [{ kind: "circle", x, y, r, lever: 1 }];
  if (b.named) {
    if (b.side === 2) {
      const w = Math.max(labelW, r * 2);
      shapes.push({
        kind: "rect",
        rect: {
          x0: x - w / 2,
          x1: x + w / 2,
          y0: y - r - 2 - labelH * 2,
          y1: y - r,
        },
        lever: 1,
      });
    } else {
      const h = labelH / 2;
      const near = r + LABEL_GAP_PX;
      const far = near + labelW;
      shapes.push({
        kind: "rect",
        rect:
          b.side === 0
            ? { x0: x + near, x1: x + far, y0: y - h, y1: y + h }
            : { x0: x - far, x1: x - near, y0: y - h, y1: y + h },
        lever: 1,
      });
    }
  }
  if (withDecision && b.hop === 1 && b.decisionW) {
    const mx = x * SPOKE_LABEL_AT;
    const my = y * SPOKE_LABEL_AT;
    shapes.push({
      kind: "rect",
      rect: {
        x0: mx - b.decisionW / 2,
        x1: mx + b.decisionW / 2,
        y0: my + 3,
        y1: my + 3 + DECISION_H_PX,
      },
      lever: SPOKE_LABEL_AT,
    });
  }
  const box = { x0: Infinity, x1: -Infinity, y0: Infinity, y1: -Infinity };
  for (const shape of shapes) {
    const rect =
      shape.kind === "rect"
        ? shape.rect
        : {
            x0: shape.x - shape.r,
            x1: shape.x + shape.r,
            y0: shape.y - shape.r,
            y1: shape.y + shape.r,
          };
    box.x0 = Math.min(box.x0, rect.x0);
    box.x1 = Math.max(box.x1, rect.x1);
    box.y0 = Math.min(box.y0, rect.y0);
    box.y1 = Math.max(box.y1, rect.y1);
  }
  return { shapes, box };
}

/**
 * How far a node's sphere and name reach from its centre toward (ux, uy), at
 * the nominal scale.
 */
function extent(b: Body, ux: number, uy: number): number {
  const { shapes } = shapesOf(b, 1, 0, 0, false);
  let most = 0;
  for (const shape of shapes) {
    if (shape.kind === "circle") {
      most = Math.max(most, shape.r);
      continue;
    }
    const { x0, x1, y0, y1 } = shape.rect;
    most = Math.max(most, (ux >= 0 ? x1 : x0) * ux + (uy >= 0 ? y1 : y0) * uy);
  }
  return most;
}

/**
 * The push that separates `b` from `a` by `pad`, as a vector to add to b's
 * position, or null when they are clear.
 */
function push(a: Shape, b: Shape, pad: number): [number, number] | null {
  if (a.kind === "circle" && b.kind === "circle") {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const d = Math.hypot(dx, dy);
    const pen = a.r + b.r + pad - d;
    if (pen <= 0) return null;
    // Two spheres on one point part vertically, the second upward.
    if (d < 1e-6) return [0, pen];
    return [(dx / d) * pen, (dy / d) * pen];
  }
  if (a.kind === "rect" && b.kind === "rect") {
    const ox =
      Math.min(a.rect.x1, b.rect.x1) - Math.max(a.rect.x0, b.rect.x0) + pad;
    const oy =
      Math.min(a.rect.y1, b.rect.y1) - Math.max(a.rect.y0, b.rect.y0) + pad;
    if (ox <= 0 || oy <= 0) return null;
    const acx = (a.rect.x0 + a.rect.x1) / 2;
    const bcx = (b.rect.x0 + b.rect.x1) / 2;
    const acy = (a.rect.y0 + a.rect.y1) / 2;
    const bcy = (b.rect.y0 + b.rect.y1) / 2;
    return ox < oy ? [bcx >= acx ? ox : -ox, 0] : [0, bcy >= acy ? oy : -oy];
  }
  const circle = (a.kind === "circle" ? a : b) as Extract<
    Shape,
    { kind: "circle" }
  >;
  const box = (a.kind === "rect" ? a : b) as Extract<Shape, { kind: "rect" }>;
  const { x0, x1, y0, y1 } = box.rect;
  const qx = clamp(circle.x, x0, x1);
  const qy = clamp(circle.y, y0, y1);
  const dx = circle.x - qx;
  const dy = circle.y - qy;
  const d = Math.hypot(dx, dy);
  let vx: number;
  let vy: number;
  if (d > 1e-6) {
    const pen = circle.r + pad - d;
    if (pen <= 0) return null;
    vx = (dx / d) * pen;
    vy = (dy / d) * pen;
  } else {
    // The circle's centre is inside the box: out the nearest side.
    const exits = [
      [circle.x - x0 + circle.r + pad, -1, 0],
      [x1 - circle.x + circle.r + pad, 1, 0],
      [circle.y - y0 + circle.r + pad, 0, -1],
      [y1 - circle.y + circle.r + pad, 0, 1],
    ] as const;
    const [pen, sx, sy] = [...exits].sort((m, n) => m[0] - n[0])[0];
    vx = sx * pen;
    vy = sy * pen;
  }
  // (vx, vy) moves the circle away from the box.
  return a.kind === "circle" ? [-vx, -vy] : [vx, vy];
}

function overlapsBox(a: Rect, b: Rect, pad: number): boolean {
  return (
    a.x0 < b.x1 + pad &&
    b.x0 < a.x1 + pad &&
    a.y0 < b.y1 + pad &&
    b.y0 < a.y1 + pad
  );
}

/** Everything's extent on screen at `zoom`, relative to the centre. */
function bounds(all: readonly Body[], zoom: number): Rect {
  const out = { x0: Infinity, x1: -Infinity, y0: Infinity, y1: -Infinity };
  for (const b of all) {
    const { box } = shapesOf(b, zoom, b.x * zoom, b.y * zoom);
    out.x0 = Math.min(out.x0, box.x0);
    out.x1 = Math.max(out.x1, box.x1);
    out.y0 = Math.min(out.y0, box.y0);
    out.y1 = Math.max(out.y1, box.y1);
  }
  return out;
}

/**
 * Push apart whatever still overlaps, in screen pixels at `zoom`. Pairs are
 * visited in a fixed order and each push is shared by how readily each node
 * gives way, so the result is the same every time.
 */
function relax(all: readonly Body[], zoom: number): void {
  const n = all.length;
  const xs = all.map((b) => b.x * zoom);
  const ys = all.map((b) => b.y * zoom);
  const mobility = all.map((b) =>
    b.hop < 0 ? 1 : MOBILITY[Math.min(b.hop, MOBILITY.length - 1)],
  );
  for (let pass = 0; pass < RELAX_PASSES; pass++) {
    const current = all.map((b, i) => shapesOf(b, zoom, xs[i], ys[i]));
    let moved = 0;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (mobility[i] === 0 && mobility[j] === 0) continue;
        const a = current[i];
        const b = current[j];
        if (!overlapsBox(a.box, b.box, P.padPx)) continue;
        let pushed = false;
        for (const sa of a.shapes) {
          for (const sb of b.shapes) {
            const v = push(sa, sb, P.padPx);
            if (!v) continue;
            // A shape on a lever (a decision label along its spoke) moves
            // less than its node, so the node moves further to clear it.
            const total = mobility[i] * sa.lever + mobility[j] * sb.lever;
            if (total <= 0) continue;
            const [vx, vy] = v;
            xs[i] -= (vx * mobility[i]) / total;
            ys[i] -= (vy * mobility[i]) / total;
            xs[j] += (vx * mobility[j]) / total;
            ys[j] += (vy * mobility[j]) / total;
            moved = Math.max(moved, Math.hypot(vx, vy));
            pushed = true;
          }
        }
        // Refresh the two just moved, so the next pair sees where they are.
        if (pushed) {
          current[i] = shapesOf(all[i], zoom, xs[i], ys[i]);
          current[j] = shapesOf(all[j], zoom, xs[j], ys[j]);
        }
      }
    }
    // A decision label rides its own spoke, so no pair above parts it from
    // its own sphere: slide the node out along the spoke until it clears.
    for (let i = 0; i < n; i++) {
      const b = all[i];
      if (b.hop !== 1 || !b.decisionW) continue;
      const { shapes } = shapesOf(b, zoom, xs[i], ys[i]);
      const decision = shapes.find((shape) => shape.lever < 1);
      if (!decision) continue;
      const v = push(shapes[0], decision, P.padPx);
      if (!v) continue;
      const d = Math.hypot(xs[i], ys[i]) || 1;
      // The label moves 0.6 of the node's step, so the gap opens at 0.4.
      const step = Math.hypot(v[0], v[1]) / (1 - SPOKE_LABEL_AT);
      xs[i] += (xs[i] / d) * step;
      ys[i] += (ys[i] / d) * step;
      moved = Math.max(moved, step);
    }
    if (moved < RELAX_REST_PX) break;
  }
  all.forEach((b, i) => {
    b.x = xs[i] / zoom;
    b.y = ys[i] / zoom;
  });
}

// ------------------------------------------------------------------ maths

function scaleAll(all: readonly Body[], factor: number): void {
  for (const b of all) {
    b.x *= factor;
    b.y *= factor;
  }
}

function compare(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

function clamp(value: number, low: number, high: number): number {
  return Math.min(high, Math.max(low, value));
}

/** The signed turn from angle `b` to angle `a`, in (-π, π]. */
function angleBetween(a: number, b: number): number {
  let d = (a - b) % TAU;
  if (d > Math.PI) d -= TAU;
  if (d <= -Math.PI) d += TAU;
  return d;
}

/** An angle in [0, 2π). */
function positiveAngle(a: number): number {
  const d = a % TAU;
  return d < 0 ? d + TAU : d;
}
