/**
 * The seam between the hero and the scene, ported from the prototype's
 * `renderer.ts`: the place types the engine reports, the page reading the
 * engine's `page` layout accepts (unused here, always null), the theme, and
 * the arrangement kinds.
 */

/** How the centre is arranged. The hero uses `ring`, the prototype's Claim view. */
export type GraphLayoutKind = "ring" | "node" | "page";

/** A point in viewport coordinates. */
export interface ScreenPoint {
  x: number;
  y: number;
}

/** Colours as CSS strings; the scene converts them (`scene/color.ts`). */
export interface GraphTheme {
  mode: "light" | "dark";
  background: string;
  card: string;
  foreground: string;
  mutedForeground: string;
  border: string;
  primary: string;
  success: string;
  warning: string;
  destructive: string;
}

type Tone = "success" | "warning" | "danger" | "neutral";

export interface PageTreeBehind {
  id: string;
  parent: string;
  depth: 1 | 2;
  relation?: boolean;
}

export interface PageTreeLane {
  key: string;
  title: string;
  kind: "tree" | "relation";
  nodeIds: readonly string[];
}

export interface PageTreeLink {
  id: string;
  source: string;
  target: string;
}

/** What the engine's `page` layout draws. The hero never sets it. */
export interface GraphPageReading {
  trail: readonly string[];
  lanes: readonly PageTreeLane[];
  states: Readonly<Record<string, { text: string; tone: Tone }>>;
  behind: readonly PageTreeBehind[];
  crossLinks: readonly PageTreeLink[];
}

/** The engine's account of where things are, in its own world units. */
export interface GraphPlace {
  positions: Record<string, readonly number[]>;
  camera: readonly number[];
  cameraBeforeFocus: readonly number[] | null;
  focusId: string | null;
  focus3d?: GraphFocusPlace | null;
}

/** A focus as it was left. */
export interface GraphFocusPlace {
  plane: readonly number[];
  ring: readonly string[];
  seats: Record<string, readonly number[]>;
  layout?: GraphLayoutKind;
}
