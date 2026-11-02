import {
  Building2,
  FileImage,
  FileStack,
  FileText,
  Layers,
  ListChecks,
  type LucideIcon,
  Receipt,
  ScrollText,
  User,
} from "lucide-react";

import type { GraphNode, GraphNodeType } from "../types";

/**
 * Which glyph a node wears on its shape (the prototype's decision 120): one per
 * node type, from the prototype's own icon set where it has the type (claim,
 * policy, party, firm, paper, photo, quote), and the fact glyph for an
 * extracted invoice line.
 *
 * `iconKeyOf` is pure, so the engine can key its icon atlas without React;
 * `NODE_ICONS` holds the lucide component for each key, which `GraphScene`
 * rasterises.
 */

export const NODE_ICONS = {
  claim: FileStack,
  policy: ScrollText,
  party: User,
  supplier: Building2,
  document: FileText,
  invoice: Receipt,
  invoiceLine: ListChecks,
  photo: FileImage,
  group: Layers,
} as const satisfies Record<GraphNodeType, LucideIcon>;

export type IconKey = keyof typeof NODE_ICONS;

export const ICON_KEYS = Object.keys(NODE_ICONS) as readonly IconKey[];

export function iconKeyOf(node: GraphNode): IconKey {
  return node.type;
}
