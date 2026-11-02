/**
 * The graph model the scene draws, cut down from the prototype's claim graph
 * (`lib/graph/types.ts`) to the fields the renderer reads. The node types are
 * the Data Extraction page's own; everything else keeps the prototype's
 * shape, so the ported engine in `scene/` runs unchanged.
 */

export type GraphNodeType =
  | "claim"
  | "lossEvent"
  | "exposure"
  | "policy"
  | "policyholder"
  | "broker"
  | "insurer"
  | "adjuster"
  | "agent"
  | "lossAssessment"
  | "scopeOfWork"
  | "decision"
  | "invoice"
  | "document"
  | "photo";

/**
 * The group a node reads in. The scene draws one shape per family
 * (`scene/model.ts`): sphere, cube, octahedron, cylinder, coin, capsule.
 */
export type GraphFamily =
  "loss" | "known" | "decisions" | "work" | "money" | "who";

/** A firm's trade: the identity colour a node of its work is drawn in. */
export type CraftKey =
  | "scaffolding"
  | "roofer"
  | "carpenter"
  | "drying"
  | "finishes"
  | "flooring"
  | "plumber";

/** Which one of its type a node is, where the icon depends on it. */
export type GraphVariant = string;

/** 0 the main claim, 1 the backbone, 2 and 3 the detail. Sizes follow it. */
export type GraphTier = 0 | 1 | 2 | 3;

/** The story slot a node is pulled toward, left to right. */
export type GraphColumn = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

/** Who above, the records on the line, the paper below. */
export type GraphBand = "above" | "main" | "below";

/** The status ring: green, amber, red. */
export type GraphNodeStatus = "ok" | "waiting" | "problem";

/** What the hover card prints first. */
export interface GraphHover {
  /** The one figure worth a glance: an amount, a date. Worded. */
  figure?: string;
  /** Where the value came from, or why it is flagged. */
  status?: string;
}

export interface GraphProperty {
  id: string;
  label: string;
  value: string;
  tone?: "success" | "warning" | "danger";
}

export interface GraphNode {
  id: string;
  type: GraphNodeType;
  family: GraphFamily;
  variant?: GraphVariant;
  /** What the canvas prints beside the shape. */
  label: string;
  /** Which one it is, for the hover card. */
  name?: string;
  tier: GraphTier;
  parentId?: string;
  revealedBy: readonly string[];
  column: GraphColumn;
  band: GraphBand;
  craft?: CraftKey;
  status?: GraphNodeStatus;
  hover: GraphHover;
  properties: readonly GraphProperty[];
  childCount: number;
}

export interface GraphEdge {
  /** Stable: `<kind>:<source>-><target>`. */
  id: string;
  source: string;
  target: string;
  kind: string;
  label: string;
  /** Drawn heavier and tagged. None of the synthetic links set it. */
  emphasis?: true;
}

export interface ClaimGraph {
  nodes: readonly GraphNode[];
  edges: readonly GraphEdge[];
}
