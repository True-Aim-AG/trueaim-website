/**
 * The graph's tunable values (decision 132): one typed object the renderer
 * reads wherever it used to read a literal.
 *
 * Every value in the first six groups was a constant in `renderers/3d` before
 * the settings drawer existed, and at its default reproduces that output. The
 * shapes and captions (decision 135) and the depth cues (decision 136) came
 * after; with all of them switched off the graph draws as it did before them.
 *
 * Ported verbatim from the prototype's `settings/config.ts` without the
 * settings drawer's control list. The hero draws `CLAIM_VIEW_CONFIG`: these
 * defaults with the prototype's Claim view preset (`presets.ts`) laid over.
 *
 * Pure and client-safe: no React, no three.js.
 */

export type GraphEasing = "inOutCubic" | "outQuint" | "spring";
export type GraphSpread = "none" | "sqrt" | "size";
export type GraphBackgroundNames = "none" | "backbone" | "all";
/**
 * What the orbit turns about: the middle of what is framed, or the node under
 * the pointer when a drag starts on one (`free`, every view before the Claim
 * view), or the main node wherever it is (`centre`, the Claim view).
 */
export type GraphPivot = "free" | "centre";

/**
 * The page view's own choices (decisions 155 to 158, Node v3). Each is a
 * design question with two or three answers built, so the reader chooses on
 * screen; Historical and Node have no lanes, cards or panel for them to act
 * on and ignore the group.
 */
/** How a lane of the front plane reads as one group: its title as today, a translucent plate behind it titled on hover, or a wider gap alone. */
export type PageGroups = "text" | "plate" | "spacing";
/** Where the non-tree groups ("Relied on by", "Readings about it") stand: on the plane as today, one step behind the record they relate to, or only while it is hovered. */
export type PageRelations = "aside" | "behind" | "hover";
/** What a node wears on the canvas: its name, its type, or both lines. */
export type PageLabel = "name" | "type" | "both";
/** The hovered node's stored relations drawn as lines beyond the tree: never, while hovered, or always. */
export type PageBackgroundLinks = "off" | "hover" | "on";
/** The hover card: five data points, the same with a photograph or figure bar, or the full card. */
export type PageCard = "compact" | "visual" | "full";
/** The detail panel that follows the selection: absent, a handle on the left edge, or open. */
export type PagePanel = "off" | "handle" | "open";

export interface GraphConfig {
  motion: {
    /** How long a node takes to reach its new seat, in milliseconds. */
    transitionMs: number;
    easing: GraphEasing;
    /** When the last node on the plane sets off after the first, in milliseconds. */
    staggerMs: number;
    /** How long the camera takes to settle on a new frame, in seconds. */
    cameraFlyS: number;
    /** How long an arrival keeps its name up, its pulse scaled with it, in seconds. */
    arrivalPulseS: number;
  };
  layout: {
    /** The ring's radius, or the gap to the Node view's columns, as a multiple. */
    ringRadius: number;
    /** The distance from one hop to the next one out, as a multiple. */
    hopSpacing: number;
    /** How far behind the plane each hop sits, as a multiple. */
    depthPerHop: number;
    /** Link distances drawn, 1 to 4; 4 draws everything, the unlinked included. */
    hopsShown: number;
    /** How a neighbour's sector grows with what sits behind it. */
    spread: GraphSpread;
    /** Clear space kept between any two shapes, in pixels. */
    labelGapPx: number;
  };
  nodes: {
    /** Sphere radius per tier, in world units. */
    tier0: number;
    tier1: number;
    tier2: number;
    tier3: number;
    /** A background node's blend toward the ground two links out, in percent. */
    backgroundDim: number;
    /** A background node's size two links out, in percent of its tier. */
    backgroundScale: number;
    icons: boolean;
    /** An icon's width, in sphere radii. */
    iconSize: number;
    statusRings: boolean;
    /** A shape per node family (decision 135): sphere, cube, octahedron, cylinder, coin, capsule. */
    shapes: boolean;
    /** The node's type, in the ontology's word, over its name (decision 135). */
    typeCaptions: boolean;
    /**
     * How opaque a node outside the main node's neighbourhood is drawn, its
     * name and links with it, in percent. 100 is off: the colour blend toward
     * the ground (`backgroundDim`) is all the masking there is.
     */
    mask: number;
    /** A lit node prints one detail under its name: its figure, else which one it is, else its first property. */
    detailLine: boolean;
  };
  labels: {
    /** The claim's name, in pixels; every other label scales with it. */
    sizePx: number;
    /** Which nodes behind the plane keep their name. */
    backgroundNames: GraphBackgroundNames;
  };
  links: {
    /** The centre's own links, in percent of their default strength. */
    foregroundOpacity: number;
    /** Every other link, in percent of its default strength. */
    backgroundOpacity: number;
    /** How much fainter each hop further out draws, in percent of the default step. */
    fadePerHop: number;
    /** The worded tag on an emphasised link (a decision). */
    emphasisTags: boolean;
    /** Line width, in pixels, for an ordinary link. */
    widthPx: number;
  };
  /**
   * The depth cues (decision 136): what tells the plane from the levels behind
   * it with the camera still.
   */
  depth: {
    /** Nodes and links fade toward the ground by how far behind the plane they sit. */
    fog: boolean;
    /** The fog's strength, in percent of the tuned default. */
    fogIntensity: number;
    /** Each level behind the plane one clear step smaller, greyer and thinner-linked. */
    steppedLevels: boolean;
    /** How big each step is, in percent of the tuned default. */
    stepStrength: number;
    /** The camera drifts a few degrees back and forth once the reader is idle. */
    sway: boolean;
    /** How far the drift turns each way, in degrees. */
    swayAmplitude: number;
    /** One drift back and forth, in seconds. */
    swayPeriodS: number;
    /** A faint frame at each level's depth, captioned. */
    levelPlanes: boolean;
    /** A floor grid under the graph, and a line from every node down to it. */
    floorLines: boolean;
    /** The levels behind the plane softly blurred. */
    depthOfField: boolean;
    /** The blur's strength, in percent of the tuned default. */
    dofIntensity: number;
  };
  camera: {
    /** Vertical field of view, in degrees. */
    fov: number;
    /** How long a drag takes to settle, in seconds. */
    damping: number;
    orbit: boolean;
    /** How far 100 pixels of drag turn the turntable, in degrees. */
    orbitSensitivity: number;
    /** How near the poles the camera may rise or fall, in degrees. */
    verticalClamp: number;
    pivot: GraphPivot;
  };
  /** Node v3 only (decision 155). */
  page: {
    groups: PageGroups;
    relations: PageRelations;
    label: PageLabel;
    backgroundLinks: PageBackgroundLinks;
    card: PageCard;
    panel: PagePanel;
  };
}

export type GraphConfigGroup = keyof GraphConfig;

/** A preset's or the reader's changes: any subset of any group. */
export type GraphConfigOverrides = {
  [G in GraphConfigGroup]?: Partial<GraphConfig[G]>;
};

export const DEFAULT_GRAPH_CONFIG: GraphConfig = {
  motion: {
    transitionMs: 700,
    easing: "outQuint",
    staggerMs: 120,
    cameraFlyS: 0.35,
    arrivalPulseS: 2.5,
  },
  layout: {
    ringRadius: 1,
    hopSpacing: 1,
    depthPerHop: 1,
    hopsShown: 4,
    spread: "sqrt",
    labelGapPx: 6,
  },
  nodes: {
    tier0: 1.35,
    tier1: 0.95,
    tier2: 0.6,
    tier3: 0.42,
    backgroundDim: 40,
    backgroundScale: 85,
    icons: true,
    iconSize: 1.2,
    statusRings: true,
    shapes: true,
    typeCaptions: true,
    mask: 100,
    detailLine: false,
  },
  labels: {
    sizePx: 13,
    backgroundNames: "backbone",
  },
  links: {
    foregroundOpacity: 100,
    backgroundOpacity: 100,
    fadePerHop: 100,
    emphasisTags: true,
    widthPx: 1,
  },
  depth: {
    fog: true,
    fogIntensity: 100,
    steppedLevels: true,
    stepStrength: 100,
    sway: true,
    swayAmplitude: 3,
    swayPeriodS: 16,
    levelPlanes: false,
    floorLines: false,
    depthOfField: false,
    dofIntensity: 100,
  },
  camera: {
    fov: 32,
    damping: 0.12,
    orbit: true,
    orbitSensitivity: 25,
    verticalClamp: 5,
    pivot: "free",
  },
  page: {
    groups: "plate",
    relations: "behind",
    label: "name",
    backgroundLinks: "hover",
    card: "visual",
    panel: "handle",
  },
};

/** `base` with `overrides` laid over it, group by group. Unknown keys are dropped. */
export function withOverrides(
  base: GraphConfig,
  ...layers: readonly (GraphConfigOverrides | null | undefined)[]
): GraphConfig {
  const out = {} as Record<GraphConfigGroup, Record<string, unknown>>;
  for (const group of Object.keys(base) as GraphConfigGroup[]) {
    const merged: Record<string, unknown> = { ...base[group] };
    for (const layer of layers) {
      const values = layer?.[group] as Record<string, unknown> | undefined;
      if (!values) continue;
      for (const [key, value] of Object.entries(values)) {
        if (key in merged && typeof value === typeof merged[key]) {
          merged[key] = value;
        }
      }
    }
    out[group] = merged;
  }
  return out as unknown as GraphConfig;
}

/** Whether two configs lay out the same, so a change of the other values needs no new arrangement. */
export function sameArrangement(a: GraphConfig, b: GraphConfig): boolean {
  return (
    shallowEqual(a.layout, b.layout) &&
    a.nodes.tier0 === b.nodes.tier0 &&
    a.nodes.tier1 === b.nodes.tier1 &&
    a.nodes.tier2 === b.nodes.tier2 &&
    a.nodes.tier3 === b.nodes.tier3 &&
    a.nodes.backgroundScale === b.nodes.backgroundScale &&
    a.nodes.statusRings === b.nodes.statusRings &&
    a.nodes.shapes === b.nodes.shapes &&
    a.nodes.typeCaptions === b.nodes.typeCaptions &&
    a.nodes.detailLine === b.nodes.detailLine &&
    a.depth.steppedLevels === b.depth.steppedLevels &&
    a.depth.stepStrength === b.depth.stepStrength &&
    a.labels.sizePx === b.labels.sizePx &&
    a.labels.backgroundNames === b.labels.backgroundNames &&
    a.links.emphasisTags === b.links.emphasisTags &&
    a.camera.fov === b.camera.fov &&
    a.page.groups === b.page.groups &&
    a.page.relations === b.page.relations &&
    a.page.label === b.page.label
  );
}

function shallowEqual(a: object, b: object): boolean {
  const x = a as Record<string, unknown>;
  const y = b as Record<string, unknown>;
  return Object.keys(x).every((key) => x[key] === y[key]);
}

/**
 * The prototype's default view, Claim (`presets.ts`): the records outside the
 * main node's neighbourhood drawn see-through, one detail under each lit
 * name, and the orbit turning about the main node wherever it is.
 */
export const CLAIM_VIEW_OVERRIDES: GraphConfigOverrides = {
  // Two links out: the ring stays a tight picture of the claim, without a
  // scatter of faint records around it.
  layout: { hopsShown: 2 },
  nodes: { mask: 60, detailLine: true },
  depth: { fogIntensity: 60 },
  camera: { pivot: "centre" },
};

export const CLAIM_VIEW_CONFIG: GraphConfig = withOverrides(
  DEFAULT_GRAPH_CONFIG,
  CLAIM_VIEW_OVERRIDES,
);

/** Below the `md` breakpoint: smaller names, no detail line, one link out. */
export const PHONE_VIEW_CONFIG: GraphConfig = withOverrides(
  DEFAULT_GRAPH_CONFIG,
  CLAIM_VIEW_OVERRIDES,
  { labels: { sizePx: 11 }, nodes: { detailLine: false }, layout: { hopsShown: 1 } },
);

/**
 * The prototype's Node view (`presets.ts`): the selection large in the left
 * third, its links in columns beside it, moving a little slower.
 */
export const NODE_VIEW_OVERRIDES: GraphConfigOverrides = {
  motion: { transitionMs: 900, easing: "inOutCubic", staggerMs: 160 },
  // Two links out, so the column behind keeps clear of the names on the
  // plane in a hero-sized canvas.
  layout: { hopsShown: 2 },
};

export const NODE_VIEW_CONFIG: GraphConfig = withOverrides(
  DEFAULT_GRAPH_CONFIG,
  NODE_VIEW_OVERRIDES,
);

/**
 * The Node view below the `md` breakpoint: the phone's smaller names, and
 * only the selection's own links, since a column behind them has no room.
 */
export const PHONE_NODE_VIEW_CONFIG: GraphConfig = withOverrides(
  DEFAULT_GRAPH_CONFIG,
  NODE_VIEW_OVERRIDES,
  { labels: { sizePx: 11 }, layout: { hopsShown: 1 } },
);
