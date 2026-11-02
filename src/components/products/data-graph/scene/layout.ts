import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  forceZ,
  type SimNode,
  type Simulation,
} from "d3-force-3d";

import type {
  GraphBand,
  GraphEdge,
  GraphNode,
  GraphTier,
} from "../types";

/**
 * The 3D graph's layout: a force simulation with the story as gravity
 * (decision 105), stepped by the render loop and never by a timer.
 *
 * Every node is pulled toward its story column on x and its band on y, and
 * held near z = 0 so the story still reads left to right from the default
 * camera; depth is what the simulation uses to untangle, not a second axis of
 * meaning. The simulation is deterministic: `d3-force-3d` seeds its own
 * generator per simulation, the starting positions are a pure function of the
 * node ids, and one call to `tick` is one step whatever the frame rate, so the
 * graph opens into the same shape every time.
 *
 * Positions live on the simulation nodes, keyed by graph id, and survive a new
 * `nodes` array: an expansion adds children at their parent and reheats, a
 * live re-read of the graph moves nothing that did not change. Once the first
 * settle is over the backbone is pinned where it came to rest, so opening a
 * craft rearranges that craft's children and not the story around them.
 */

/** World units between two story columns. */
const COLUMN_GAP = 21;
const BAND_Y: Record<GraphBand, number> = { above: 32, main: 0, below: -32 };

/** Sphere radius per tier (decision 106). */
export const TIER_RADIUS: Record<GraphTier, number> = {
  0: 1.35,
  1: 0.95,
  2: 0.6,
  3: 0.42,
};

const ALPHA_MIN = 0.004;
/** About 200 steps from a cold start to rest. */
const ALPHA_DECAY = 1 - Math.pow(ALPHA_MIN, 1 / 200);
const REHEAT = 0.32;

export interface LayoutNode extends SimNode {
  id: string;
  tier: GraphTier;
  column: number;
  band: GraphBand;
  x: number;
  y: number;
  z: number;
}

interface LayoutLink {
  source: string | LayoutNode;
  target: string | LayoutNode;
  /** A decision's edge (`GraphEdge.emphasis`). */
  emphasis: boolean;
  child: boolean;
  /** An edge between neighbouring columns: a craft and its appointed firm. */
  near: boolean;
}

const storyX = (column: number) => (column - 2.5) * COLUMN_GAP;

/** A stable number in [0, 1) from a string, so starting jitter is repeatable. */
function hash01(text: string, salt: number): number {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 100000) / 100000;
}

export class StoryLayout {
  private readonly sim: Simulation<LayoutNode>;
  private readonly byId = new Map<string, LayoutNode>();
  private pinned = false;

  constructor() {
    this.sim = createSimulation();
    // The story reads along a row: the appointed firm sits level with its
    // craft rather than wherever the charge happens to push it, which is what
    // keeps the craft-to-firm lines from crossing each other.
    this.sim.force("follow", (alpha: number) => {
      for (const [leader, follower] of this.followers) {
        follower.vy =
          (follower.vy ?? 0) + (leader.y - follower.y) * 0.35 * alpha;
        follower.vz =
          (follower.vz ?? 0) + (leader.z - follower.z) * 0.35 * alpha;
      }
    });
  }

  get nodes(): ReadonlyMap<string, LayoutNode> {
    return this.byId;
  }

  get active(): boolean {
    return this.sim.alpha() > ALPHA_MIN;
  }

  /**
   * Bring the simulation in line with what is on the canvas. New nodes start
   * at `seatAt` exactly when it knows them (a restored place), else at
   * `spawnAt` (their parent) nudged along a fixed direction; nodes no longer
   * given are dropped. Returns whether anything changed.
   */
  sync(
    nodes: readonly GraphNode[],
    edges: readonly GraphEdge[],
    spawnAt: (node: GraphNode) => { x: number; y: number; z: number } | null,
    seatAt: (node: GraphNode) => readonly number[] | null = () => null,
  ): boolean {
    const keep = new Set(nodes.map((node) => node.id));
    let changed = false;
    for (const id of [...this.byId.keys()]) {
      if (!keep.has(id)) {
        this.byId.delete(id);
        changed = true;
      }
    }
    for (const node of nodes) {
      const known = this.byId.get(node.id);
      if (known) {
        known.tier = node.tier;
        known.column = node.column;
        known.band = node.band;
        continue;
      }
      changed = true;
      const seat = seatAt(node);
      if (seat) {
        this.byId.set(node.id, {
          id: node.id,
          tier: node.tier,
          column: node.column,
          band: node.band,
          x: seat[0] ?? 0,
          y: seat[1] ?? 0,
          z: seat[2] ?? 0,
        });
        continue;
      }
      const from = spawnAt(node);
      const a = hash01(node.id, 1) * Math.PI * 2;
      const b = hash01(node.id, 2) * 2 - 1;
      const spread = from ? 1.2 : 3;
      const base = from ?? {
        x: storyX(node.column),
        y: BAND_Y[node.band],
        z: 0,
      };
      this.byId.set(node.id, {
        id: node.id,
        tier: node.tier,
        column: node.column,
        band: node.band,
        x: base.x + Math.cos(a) * spread,
        y: base.y + Math.sin(a) * spread,
        z: base.z + b * spread,
      });
    }
    if (!changed && edges === this.edges) return false;
    this.edges = edges;

    const list = nodes
      .map((node) => this.byId.get(node.id))
      .filter((node): node is LayoutNode => node != null);
    // The link force re-indexes against whichever nodes it last saw, so it is
    // emptied before the node list changes and refilled after, or an edge to a
    // node that just arrived throws "node not found".
    const linkForce = this.sim.force("link") as ReturnType<
      typeof forceLink<LayoutNode, LayoutLink>
    >;
    linkForce.links([]);
    this.sim.nodes(list);
    const tiers = new Map(nodes.map((node) => [node.id, node.tier]));
    const columns = new Map(nodes.map((node) => [node.id, node.column]));
    const links: LayoutLink[] = edges.map((edge) => ({
      source: edge.source,
      target: edge.target,
      emphasis: edge.emphasis === true,
      child:
        !edge.emphasis &&
        Math.max(tiers.get(edge.source) ?? 0, tiers.get(edge.target) ?? 0) >= 2,
      near:
        Math.abs(
          (columns.get(edge.source) ?? 0) - (columns.get(edge.target) ?? 0),
        ) <= 1,
    }));
    linkForce.links(links);
    // The link force has swapped ids for node objects by now.
    this.followers = links
      .filter((link) => link.near)
      .map((link) => [link.source, link.target] as [LayoutNode, LayoutNode])
      .filter(
        ([a, b]) => Math.abs(a.column - b.column) === 1 && a.band === b.band,
      )
      .map(([a, b]) => (a.column < b.column ? [a, b] : [b, a]));
    return true;
  }

  private edges: readonly GraphEdge[] | null = null;
  /** [leader, follower] pairs: a firm follows its craft's height and depth. */
  private followers: [LayoutNode, LayoutNode][] = [];

  /** Warm the simulation after a change. */
  reheat(alpha = REHEAT): void {
    this.sim.alpha(Math.max(this.sim.alpha(), alpha));
  }

  tick(steps: number): void {
    if (!this.active) return;
    this.sim.tick(steps);
    if (!this.active) this.pinBackbone();
  }

  /**
   * A restored layout was at rest when it was left: hold it there, backbone
   * pinned, warm only enough to seat what is new since.
   */
  resume(warmth: number): void {
    this.sim.alpha(warmth);
    this.pinned = false;
    this.pinBackbone();
  }

  /** Run to rest in one go: reduced motion, and the camera's first framing. */
  settle(): void {
    while (this.active) this.sim.tick(1);
    this.pinBackbone();
  }

  private pinBackbone(): void {
    if (this.pinned) return;
    this.pinned = true;
    for (const node of this.byId.values()) {
      if (node.tier > 1) continue;
      node.fx = node.x;
      node.fy = node.y;
      node.fz = node.z;
    }
  }
}

/**
 * Where a set of nodes will come to rest, without touching the live layout:
 * the same simulation from the same start, run to the end. Used once, to
 * frame the opening camera on the settled story rather than on the jumble it
 * starts from.
 */
export function predictSettled(
  nodes: readonly GraphNode[],
  edges: readonly GraphEdge[],
): ReadonlyMap<string, LayoutNode> {
  const layout = new StoryLayout();
  layout.sync(nodes, edges, () => null);
  layout.reheat(1);
  layout.settle();
  return layout.nodes;
}

function createSimulation(): Simulation<LayoutNode> {
  const backbone = (node: LayoutNode) => node.tier <= 1;
  return forceSimulation<LayoutNode>([], 3)
    .stop()
    .alpha(1)
    .alphaMin(ALPHA_MIN)
    .alphaDecay(ALPHA_DECAY)
    .velocityDecay(0.5)
    .force(
      "link",
      forceLink<LayoutNode, LayoutLink>([])
        .id((node) => node.id)
        .distance((link) => (link.child ? 3.6 : link.near ? COLUMN_GAP : 12))
        .strength((link) => {
          if (link.child) return 0.55;
          if (link.near) return 0.45;
          return link.emphasis ? 0.02 : 0.05;
        }),
    )
    .force(
      "charge",
      forceManyBody<LayoutNode>()
        .strength((node) => -14 * CHARGE[node.tier])
        .distanceMax(36),
    )
    .force(
      "collide",
      forceCollide<LayoutNode>()
        .radius((node) => (node.tier <= 1 ? 3.4 : TIER_RADIUS[node.tier] + 1.1))
        .strength(0.8),
    )
    .force(
      "x",
      forceX<LayoutNode>((node) => storyX(node.column)).strength((node) =>
        backbone(node) ? 0.45 : 0.1,
      ),
    )
    .force(
      "y",
      forceY<LayoutNode>((node) => BAND_Y[node.band]).strength((node) =>
        backbone(node) ? 0.1 : 0.04,
      ),
    )
    .force(
      "z",
      forceZ<LayoutNode>(0).strength((node) => (backbone(node) ? 0.9 : 0.25)),
    );
}

const CHARGE: Record<GraphTier, number> = { 0: 3, 1: 1.6, 2: 0.7, 3: 0.45 };
