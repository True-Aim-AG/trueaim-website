import type { GraphFamily } from "../types";
import type { GraphEdge, GraphNode } from "../types";

/**
 * Everything the 3D renderer reads off the graph model's vocabulary, in one
 * place. The rest of the renderer is generic over node `type` and edge
 * `kind`: it asks these functions, so a change of model is a change here.
 */

/**
 * How a link is drawn: `emphasis` is the heavier, tagged line (a link that
 * touches a decision, decision 129); `plain` is a hairline.
 */
export type LinkClass = "emphasis" | "plain";

export function linkClassOf(edge: GraphEdge): LinkClass {
  return edge.emphasis ? "emphasis" : "plain";
}

/** The words an emphasised link carries on the canvas, if any. */
export function linkTagOf(edge: GraphEdge): string | null {
  return edge.emphasis ? edge.label : null;
}

/**
 * Which column family a node joins in the Node view: the family it reads in,
 * so the work stands with the work and the paper with the paper, rather than
 * a column per raw type. The model states it (`GraphNode.family`), which is
 * the same answer the legend and the shapes read.
 */
export function familyOf(node: GraphNode): string {
  return node.family;
}

/**
 * The drawn shape of a node (decision 135): one per family, so a type reads
 * at a glance and colour stays free for craft and status.
 */
export type NodeShape =
  "sphere" | "cube" | "octahedron" | "cylinder" | "coin" | "capsule";

/** The shape each family is drawn in, which the legend shows too. */
export const FAMILY_SHAPE: Record<GraphFamily, NodeShape> = {
  loss: "sphere",
  known: "cube",
  decisions: "octahedron",
  work: "cylinder",
  money: "coin",
  who: "capsule",
};

/** A node's shape by its family. */
export function shapeOf(node: GraphNode): NodeShape {
  return FAMILY_SHAPE[node.family];
}
