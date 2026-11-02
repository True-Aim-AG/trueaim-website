import {
  Bot,
  Briefcase,
  Building,
  Calculator,
  CloudLightning,
  Construction,
  Fan,
  FileImage,
  FileStack,
  FileText,
  Gavel,
  Grid2x2,
  Hammer,
  Headset,
  type LucideIcon,
  PaintRoller,
  Receipt,
  ScrollText,
  ShieldCheck,
  User,
  Warehouse,
  Wrench,
} from "lucide-react";

import type { CraftKey, GraphNode, GraphNodeType } from "../types";

/**
 * Which glyph a node wears on its shape (the prototype's decision 120): one per
 * node type, from the prototype's own icon set, with a scope of works split
 * by its trade.
 *
 * `iconKeyOf` is pure, so the engine can key its icon atlas without React;
 * `NODE_ICONS` holds the lucide component for each key, which `GraphScene`
 * rasterises.
 */

const TYPE_ICONS = {
  claim: FileStack,
  lossEvent: CloudLightning,
  exposure: ShieldCheck,
  policy: ScrollText,
  policyholder: User,
  broker: Briefcase,
  insurer: Building,
  adjuster: Headset,
  agent: Bot,
  lossAssessment: Calculator,
  scopeOfWork: Hammer,
  decision: Gavel,
  invoice: Receipt,
  document: FileText,
  photo: FileImage,
} as const satisfies Record<GraphNodeType, LucideIcon>;

const CRAFT_ICONS = {
  scaffolding: Construction,
  roofer: Warehouse,
  carpenter: Hammer,
  drying: Fan,
  finishes: PaintRoller,
  flooring: Grid2x2,
  plumber: Wrench,
} as const satisfies Record<CraftKey, LucideIcon>;

export const NODE_ICONS = { ...TYPE_ICONS, ...CRAFT_ICONS };

export type IconKey = keyof typeof NODE_ICONS;

export const ICON_KEYS = Object.keys(NODE_ICONS) as readonly IconKey[];

export function iconKeyOf(node: GraphNode): IconKey {
  return node.type === "scopeOfWork" && node.craft ? node.craft : node.type;
}
