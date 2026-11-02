import {
  Box3,
  Color,
  DirectionalLight,
  DynamicDrawUsage,
  Fog,
  Group,
  InstancedBufferAttribute,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  type PerspectiveCamera,
  PlaneGeometry,
  Quaternion,
  RingGeometry,
  type Texture,
  Vector2,
  Vector3,
} from "three";

import type { LineMaterial } from "three/addons/lines/LineMaterial.js";

import type {
  GraphFocusPlace,
  GraphPageReading,
  GraphPlace,
} from "../renderer";
import {
  DEFAULT_GRAPH_CONFIG,
  type GraphConfig,
  type GraphEasing,
  sameArrangement,
} from "../config";
import type { GraphLayoutKind } from "../renderer";
import type { CraftKey } from "../types";
import type {
  GraphEdge,
  GraphNode,
  GraphTier,
} from "../types";

import {
  arrangeFocus,
  type BackgroundMember,
  backgroundScale,
  type FocusArrangement,
  type FocusFrame,
  type FocusMember,
  type LabelSide,
  labelBoost,
  type LayoutParams,
  namedBehind,
  PX_PER_UNIT,
  SPOKE_LABEL_AT,
} from "./focus";
import { type IconKey, iconKeyOf } from "./icons";
import { type LayoutNode, predictSettled, StoryLayout } from "./layout";
import { LineBatch } from "./lines";
import {
  familyOf,
  type LinkClass,
  linkClassOf,
  linkTagOf,
  type NodeShape,
  shapeOf,
} from "./model";
import { arrangeNode, NODE_CENTRE_LABEL, NODE_CENTRE_RADII } from "./node";
import { arrangePage, PAGE_LANE_PX, type PagePlate } from "./page";
import {
  buildPlate,
  buildShapes,
  NODE_SHAPES,
  type PlateMesh,
  type ShapeSpec,
} from "./shapes";

/**
 * Everything the 3D graph draws, updated in place once per frame.
 *
 * Not a React component on purpose. The scene is a few hundred spheres, rings
 * and lines whose positions change every frame while the layout settles, and
 * a React render per frame is exactly the cost the renderer exists to avoid.
 * React tells the engine when the graph, the emphasis or the palette changed;
 * the render loop calls `frame`, which steps the layout, eases every
 * transition a little further, writes the instance buffers and reports
 * whether anything is still moving so the loop can go idle when it is not.
 *
 * A selection (decision 109) takes positions away from the simulation: it
 * pauses, `focus.ts` says where every node goes, and each node eases there on
 * the engine's own clock; letting go eases them back to their story seats
 * and hands them to the simulation again.
 *
 * Draw calls: one instanced mesh per node shape (decision 135), one of status
 * rings, one of icons, a line batch per edge style and depth level, and a
 * text mesh per label. Dimming
 * blends colour toward the background instead of using transparency, so
 * spheres need no sorting and a dimmed sphere still hides what is behind it.
 *
 * Nothing opaque is ever drawn in the background colour (decision 117). A
 * status ring faded to the ground by colour would still be an opaque
 * annulus, and it cut every line and sphere behind it into a pale arc; a
 * name's halo laid over a sphere did the same. So a node behind the focus
 * plane wears no ring at all (its ring shrinks inside its sphere as it goes
 * back), and a name that would cover a sphere it does not belong to fades
 * out rather than printing its halo across it.
 */

export interface Palette {
  background: Color;
  foreground: Color;
  /** Neutral nodes: foreground softened a step, so dots do not outweigh text. */
  ink: Color;
  muted: Color;
  primary: Color;
  success: Color;
  warning: Color;
  destructive: Color;
  craft: (craft: CraftKey) => Color;
  dark: boolean;
  /** The two glyph inks an icon picks between, by contrast with its sphere. */
  glyphLight: Color;
  glyphDark: Color;
}

/** Every node icon in one texture, a square cell per glyph (decision 120). */
export interface IconAtlas {
  texture: Texture;
  cell: ReadonlyMap<IconKey, number>;
  columns: number;
  rows: number;
}

/** The part of a troika text mesh the engine drives. */
export interface TextMesh {
  visible: boolean;
  position: Vector3;
  quaternion: Quaternion;
  scale: Vector3;
  fillOpacity: number;
  outlineOpacity: number;
  color: Color;
  outlineColor: Color;
  textRenderInfo: { blockBounds: readonly number[] } | null;
  material: MeshBasicMaterial | MeshBasicMaterial[];
  renderOrder: number;
  text?: string;
}

export interface Emphasis {
  hoveredId: string | null;
  focusedId: string | null;
  highlightedIds: ReadonlySet<string>;
  hoveredEdgeId: string | null;
}

export type Pick =
  { kind: "node"; id: string } | { kind: "edge"; id: string } | null;

/** Where the camera goes to look at a focus arrangement front-on. */
export interface FocusView {
  position: Vector3;
  target: Vector3;
  /** A focus re-formed exactly as it was left: the camera stays where the reader left it. */
  keepCamera: boolean;
}

/**
 * What a node is to the arrangement in force. `centre` is the selection,
 * `neighbour` a node the Ring or the Node view seated on the plane around it,
 * and `background` anything behind the plane.
 */
type Role = "centre" | "neighbour" | "background";

/** A background node's link distance and what it sits behind, before it is measured. */
type LinkDistance = Omit<
  BackgroundMember,
  "typePx" | "radiusPx" | "labelW" | "labelH"
>;

/**
 * A focus in force: the plane it was laid on (fixed at selection, so an
 * orbit afterwards turns around it instead of dragging it along), where
 * every node is going, and which edges are the centre's own.
 */
interface Focus {
  id: string;
  origin: Vector3;
  right: Vector3;
  up: Vector3;
  normal: Vector3;
  roles: Map<string, Role>;
  /** Link distance of every background node; null where there is no path. */
  hops: Map<string, number | null>;
  /** The canvas width the arrangement was solved for, in CSS pixels. */
  viewWidth: number;
  targets: Map<string, Vector3>;
  labelSides: Map<string, LabelSide>;
  spokes: Set<string>;
  /** How it was framed, so what arrives later can keep that frame. */
  frame: FocusFrame;
  /** The arrangement it was laid out in (decision 131). */
  view: GraphLayoutKind;
  /** The Node view's reading order of the plane, 0 to 1, for the stagger; null on the ring. */
  order: ReadonlyMap<string, number> | null;
  /** Background nodes past the hops shown (decision 132): shrunk away, not arranged. */
  hidden: ReadonlySet<string>;
  /** The page view's trail back to the claim: drawn small, on the plane. */
  trail: ReadonlySet<string>;
  /** Where each lane's caption sits (decision 153); empty in every other view. */
  laneMarks: ReadonlyMap<string, Vector3>;
  /** Each lane's slab (decision 155); empty unless the groups read as plates. */
  lanePlates: ReadonlyMap<string, PagePlate>;
  /** The lane every front node belongs to, so hovering one titles its group. */
  laneOf: ReadonlyMap<string, string>;
  /** The camera's distance from the plane as framed, in world units: what depth is measured against. */
  distance: number;
}

/** How a focus is to be arranged. */
export interface FocusOptions {
  /** Land at once, camera and all: the first paint (decision 115). */
  instant?: boolean;
  /** Keep the frame the focus already has, if it still fits (decision 118). */
  hold?: boolean;
  /** Frame afresh even where the frame could be kept: the field of view changed. */
  reframe?: boolean;
}

/** Nodes on their way somewhere: into a focus or back to the story. */
interface Motion {
  start: number;
  from: Map<string, { at: Vector3; delay: number }>;
}

interface Item {
  node: GraphNode;
  layout: LayoutNode | null;
  pos: Vector3;
  /** Where a leaving node was when it started folding back. */
  from: Vector3;
  leaving: boolean;
  appear: number;
  dim: number;
  hover: number;
  label: number;
  /** The label's opacity before collisions. */
  labelBase: number;
  labelEmphasis: boolean;
  /** Placement order: 0 is never displaced, higher yields to lower. */
  labelPriority: number;
  /** Where the label sits: 0 right, 1 left, 2 below, 3 above. */
  labelSide: number;
  /** The label's box on screen as last drawn, for picking. */
  labelRect: Rect | null;
  /** World units per pixel at this node's depth, this frame. */
  labelPx: number;
  /** Scale as drawn this frame, for picking and label placement. */
  scale: number;
  /** Size relative to its tier: less than 1 in a focus's background. */
  size: number;
  /** How much of a long flight is under way: 0 at rest, 1 mid-journey. */
  flight: number;
  /** 1 while its hidden count shows under its name, fading to 0 when not. */
  countMix: number;
  /** Its name's size relative to its tier: smaller behind a focus plane. */
  nameScale: number;
  /** Its glyph's cell in the icon atlas. */
  icon: IconKey;
  /** 1 while its status ring shows, 0 behind the focus plane. */
  ringMix: number;
  /** When it arrived (decision 118), on the engine's clock; null when settled. */
  arrivedAt: number | null;
  /** Its depth level (decision 136): 0 on the plane, 1 to 3 behind it. */
  level: number;
  /** How far toward the ground the fog takes it this frame, 0 to 1. */
  fog: number;
  /**
   * How far it is masked (`nodes.mask`): 0 drawn solid, 1 at the mask's
   * opacity, eased as the main node moves.
   */
  mask: number;
  /** Its opacity this frame, from `mask`: 1 solid. */
  alpha: number;
}

const NODE_CAPACITY = 1024;
/** The depth levels (decision 136): the plane, then three behind it. */
const LEVELS = [0, 1, 2, 3] as const;
const EDGE_CAPACITY = 2048;
/**
 * How far outside the frame a node still counts as on screen, in normalised
 * device coordinates (1 is the edge): a little slack, so a pivot taken from
 * what is framed does not lurch when one node crosses the border.
 */
const FRAME_MARGIN = 1.15;
/** Above this opacity a masked node is drawn with the solid ones. */
const MASK_SOLID = 0.995;
/** Colour blend toward the background at full dim. */
const DIM_NODE = 0.82;
const DIM_HIGHLIGHT = 0.55;
/**
 * Labels are drawn at a constant size on screen, in CSS pixels, whatever the
 * zoom: a label that shrinks with distance is unreadable before its node is.
 */
const LABEL_PX = { 0: 13, 1: 12, 2: 11, 3: 11 } as const;
const COUNT_PX = 10.5;
const EDGE_LABEL_PX = 10.5;
/** Pixels between a sphere's edge and its label. */
const LABEL_GAP_PX = 6;
/** For each current side, the order to try sides in: stay, then the nearest. */
const LABEL_SIDES: readonly (readonly number[])[] = [
  [0, 1, 2, 3],
  [1, 0, 2, 3],
  [2, 3, 0, 1],
  [3, 2, 0, 1],
];
/** Clear space kept around a placed label. */
const LABEL_PAD_PX = 3;
/** Clear space a label keeps from a sphere that is not its own: its halo's reach. */
const LABEL_SPHERE_PAD_PX = 4;
/** An icon fades in as its sphere grows on screen, between these radii in pixels. */
const ICON_SHOW_PX = [5.5, 8] as const;
/**
 * An arrival (decision 118): the breath starts once the node has nearly
 * landed, lasts this long, swells by this much, and the name stays up for
 * `ARRIVAL_NAME_SECONDS` from arriving.
 */
const ARRIVAL_PULSE = { delay: 0.45, seconds: 0.9, swell: 0.28 } as const;
const ARRIVAL_NAME_SECONDS = 2.5;
/** An arrival the graph never delivers is forgotten after this long. */
const ARRIVAL_PENDING_SECONDS = 4;
const HALO_OPACITY = 0.9;
/** The status ring's outer radius, in sphere radii. */
const RING_OUTER = 1.52;
/** The focus ring's outer radius, in sphere radii. */
const FOCUS_RING_OUTER = 1.84;
/**
 * A deeper node's label fades in as its sphere grows on screen, between these
 * radii in pixels, so the reader zooms toward detail to read it.
 */
const LABEL_SHOW_PX = [4.5, 6.5] as const;
/**
 * How a focus tween is staggered, in seconds at the default stagger (its
 * length is `motion.transitionMs`): the centre sets off first, the ring after
 * it around its angle, the background last, one step later per hop. Letting
 * go staggers by distance instead, up to the same end.
 */
const STAGGER_RING = [0.03, 0.12] as const;
const STAGGER_BACKGROUND = [0.12, 0.2] as const;
/** Labels, counts and rings cross-fade at this rate: gone in about 180ms. */
const FADE_RATE = 17;
/** World units of travel past which a label fully dips mid-flight. */
const FLIGHT_LABEL_FADE = 8;
/** The simulation's warmth when a focus lets the story go again. */
const RELEASE_ALPHA = 0.05;
/** Its warmth when a restored graph has new nodes to seat. */
const RESTORE_ALPHA = 0.12;
/**
 * How far toward the background an edge off the focus fades, graded by the
 * farther of its two ends (decision 111): out to hop 2, hop 3, and beyond or
 * with no path. An edge between two neighbours crosses the ring, so it takes
 * the hop-3 grade. Colours mix in linear light, where the last few percent
 * toward black are most of what the eye sees, so a dark ground needs the mix
 * taken further.
 */
const FOCUS_EDGE_FADE = {
  light: [0.8, 0.87, 0.92],
  dark: [0.9, 0.94, 0.965],
} as const;
/**
 * A background node's colour blend toward the ground in a focus, by hop, as
 * a share of full dim: its craft colour or ink stays legible (decision 111).
 */
const BACKGROUND_DIM = [0.4, 0.52, 0.62] as const;
/** Background names are drawn this much smaller than the plane's. */
const BACKGROUND_LABEL = 0.86;
/** Which edge a node is seated behind when it has several: lower first. */
const EDGE_STRENGTH: Record<LinkClass, number> = { emphasis: 0, plain: 1 };
/**
 * The defaults the drawer's values are read against (decision 132): a value
 * at its default multiplies by exactly one, so the Ring is unchanged.
 */
const DEFAULT_LABEL_PX = DEFAULT_GRAPH_CONFIG.labels.sizePx;
const DEFAULT_STAGGER_MS = DEFAULT_GRAPH_CONFIG.motion.staggerMs;
const DEFAULT_BACKGROUND_DIM = DEFAULT_GRAPH_CONFIG.nodes.backgroundDim;
const DEFAULT_BACKGROUND_SCALE = DEFAULT_GRAPH_CONFIG.nodes.backgroundScale;
const HEAVY_WIDTH = 1.75;
/** The status ring's inner radius, in sphere radii. */
const RING_INNER = 1.34;
/** The least clear space between a shape's outline and its ring, in sphere radii. */
const RING_CLEAR = 0.16;
/**
 * A type caption (decision 135) against its name's size, and the smallest it
 * is drawn, in pixels: below that the capitals stop reading.
 */
const CAPTION_SHARE = 0.6;
const CAPTION_MIN_PX = 7.5;
/** Pixels between a caption's baseline and the top of its name. */
const CAPTION_GAP_PX = 1;
/** The page view with nothing read yet: an empty plane rather than a throw. */
const EMPTY_PAGE: GraphPageReading = {
  trail: [],
  lanes: [],
  states: {},
  behind: [],
  crossLinks: [],
};
const EMPTY_MARKS: ReadonlyMap<string, Vector3> = new Map();
const EMPTY_PLATES: ReadonlyMap<string, PagePlate> = new Map();
const EMPTY_RELATIONS: ReadonlyMap<string, string> = new Map();
/** A trail node's depth level, for the size and the dim it is drawn at. */
const TRAIL_HOP = 2;

// The depth cues (decision 136). A level is 0 on the plane, 1 one link past
// it, 2 two links past, 3 anything further or with no path.
/**
 * Atmospheric fog: the share of the way to the ground a node goes at a depth
 * behind the plane of `t` camera distances is `1 - exp(-FOG_RATE * t)`, at
 * most `FOG_MAX`, so the plane stays crisp and each level steps back.
 */
const FOG_RATE = 2.7;
const FOG_MAX = 0.85;
/**
 * On a dark ground the fog is taken further: colours mix in linear light,
 * where the last stretch toward black is most of what the eye sees.
 */
const FOG_DARK_POWER = 1.8;
/** With fog on, the background dim carries this share of its own fade; fog carries the rest. */
const FOG_DIM_SHARE = 0.45;
/** How much a label's opacity drops with its node's fog. */
const FOG_LABEL_OPACITY = 0.45;
/**
 * Stepped levels at full strength: the size a node is drawn at, how much of
 * its colour it gives up, how far toward the ground it dims (as a share of
 * full dim), and its links' width, per level. At no strength a level draws as
 * it did before the cue.
 */
const STEP_SIZE = [1, 0.74, 0.56, 0.42] as const;
const STEP_DESATURATE = [0, 0.5, 0.8, 0.95] as const;
const STEP_DIM = [0, 0.35, 0.6, 0.8] as const;
const STEP_WIDTH = [1, 0.7, 0.5, 0.36] as const;
/** A name's size per level, against the plane's. */
const STEP_LABEL = [1, 0.82, 0.74, 0.68] as const;
/** Level planes: the frame's strength against the ground, the tint's opacity, the caption's size. */
const PLANE_FRAME = 0.2;
const PLANE_TINT = 0.014;
const PLANE_LABEL_PX = 10.5;
/** Clear space between a level's nodes and its frame, in pixels on screen. */
const PLANE_PAD_PX = 10;
/**
 * A lane plate (decision 155), as a share of the foreground token: the fill
 * over the light ground and over the dark one, and the border either way.
 */
const PLATE_FILL = 0.05;
const PLATE_FILL_DARK = 0.08;
const PLATE_LINE = 0.16;
/**
 * A cross-link (decision 155): how far toward the foreground the line under
 * the pointer is drawn, and the share of that a line kept permanently up
 * takes, so `on` reads as background and `hover` as an answer.
 */
const CROSS_LINK_INK = 0.62;
const CROSS_LINK_QUIET = 0.34;
/** The corners of a slab, in halves of its size. */
const PLATE_CORNERS = [
  [-1, -1],
  [1, -1],
  [1, 1],
  [-1, 1],
] as const;
/** The floor and its drop lines, as strengths against the ground. */
const FLOOR_GRID = 0.1;
const FLOOR_DROP = 0.2;
/** The floor's grid: about this many cells across the graph's width. */
const FLOOR_CELLS = 14;

const matrix = new Matrix4();
const identity = new Quaternion();
const scaleVector = new Vector3();
const right = new Vector3();
const up = new Vector3();
const toCamera = new Vector3();
const forward = new Vector3();
const scratch = new Vector3();
const scratchB = new Vector3();
const scratchC = new Vector3();
const colorA = new Color();
const colorB = new Color();
const colorC = new Color();
const sphereColor = new Color();
const tiltedQuaternion = new Quaternion();
const planeMatrix = new Matrix4();
const fogScratch = new Vector3();
const corner = new Vector3();
const cornerB = new Vector3();

export class SceneEngine {
  readonly root = new Group();
  /** Depth cue: distant nodes soften into the background. Tracks the camera. */
  readonly fog = new Fog(0xffffff, 60, 400);
  private reducedMotion = false;
  private readonly light = new DirectionalLight(0xffffff, 1.6);
  private readonly target = new Vector3();

  private layout = new StoryLayout();
  private readonly items = new Map<string, Item>();
  private edges: readonly GraphEdge[] = [];
  private readonly shapes: Record<NodeShape, ShapeSpec> = buildShapes();
  /** One instanced mesh per shape (decision 135). */
  private readonly shapeMeshes: Record<NodeShape, InstancedMesh>;
  /**
   * The same shapes, see-through (`nodes.mask`): a node outside the main
   * node's neighbourhood is drawn here, with its own opacity per instance
   * (`maskAlpha`), after every solid node and without writing depth, so a
   * solid node behind a masked one still shows through it. Empty while the
   * mask is off.
   */
  private readonly maskedMeshes: Record<NodeShape, InstancedMesh>;
  private readonly maskAlphas: Record<NodeShape, InstancedBufferAttribute>;
  private readonly ringsMesh: InstancedMesh;
  private readonly focusRing: Mesh;
  /** Links by depth level (decision 136), so each level's take their own width. */
  private readonly thin = LEVELS.map(
    () => new LineBatch(EDGE_CAPACITY, { width: 1 }),
  );
  private readonly dashed = new LineBatch(512, { width: 1, dashed: true });
  private readonly heavy = LEVELS.map(
    () => new LineBatch(256, { width: HEAVY_WIDTH }),
  );
  /** The level planes' frames, and the floor with its drop lines (decision 136). */
  private readonly planeLines = new LineBatch(64, { width: 1 });
  private readonly floorLines = new LineBatch(NODE_CAPACITY + 256, {
    width: 1,
  });
  private readonly planeTints: Mesh[];
  /** Each level plane's showing, eased; index 0 is the front plane, never framed. */
  private readonly planeMix = [0, 0, 0, 0];
  private floorMix = 0;
  private readonly slotIds: string[] = [];
  private readonly labels = new Map<string, TextMesh>();
  private readonly counts = new Map<string, TextMesh>();
  private readonly edgeLabels = new Map<string, TextMesh>();
  private readonly captions = new Map<string, TextMesh>();
  private readonly levelLabels = new Map<string, TextMesh>();
  private readonly laneLabels = new Map<string, TextMesh>();
  /** Where each lane's caption is drawn now, eased toward where it belongs. */
  private readonly laneAt = new Map<string, Vector3>();
  /** One slab per lane (decision 155), taken from a pool as lanes come and go. */
  private readonly plates: PlateMesh[] = [];
  /** Each lane's slab as drawn now, eased toward the box the arrangement gave it. */
  private readonly plateAt = new Map<string, PagePlate>();
  /** Each lane's slab on screen, so the pointer over it titles the lane. */
  private readonly plateRects = new Map<string, Rect>();
  /** Each slab's showing, eased, so a lane fades in with its focus. */
  private readonly plateMix = new Map<string, number>();
  /** Each lane title's showing, eased: 1 while its group is read, 0 otherwise. */
  private readonly laneTitleMix = new Map<string, number>();
  /** Each cross-link's showing, eased (decision 155, `page.backgroundLinks`). */
  private readonly crossMix = new Map<string, number>();
  /** Where the pointer last was on the canvas, in CSS pixels; off it, null. */
  private pointer: { x: number; y: number } | null = null;
  private readonly labelMaterial = new MeshBasicMaterial({
    depthTest: false,
    depthWrite: false,
    transparent: true,
  });
  private readonly edgeLabelAlpha = new Map<string, number>();
  private readonly refCache = new Map<
    string,
    (mesh: TextMesh | null) => void
  >();
  private palette: Palette | null = null;
  private readonly iconsMesh: InstancedMesh;
  /** Per icon: its atlas cell's offset (x, y) and its opacity. */
  private readonly iconCells: InstancedBufferAttribute;
  private atlas: IconAtlas | null = null;
  /** Arrivals asked for and not yet on the canvas, with when they were asked for. */
  private readonly pendingArrivals = new Map<string, number>();
  private arrivalKey = "";
  private emphasis: Emphasis = {
    hoveredId: null,
    focusedId: null,
    highlightedIds: new Set(),
    hoveredEdgeId: null,
  };
  private lit: ReadonlySet<string> | null = null;
  private revealed: ReadonlySet<string> = new Set();
  /** World units per CSS pixel at unit depth, for this frame's camera. */
  private worldPerPx = 0.001;
  private edgeEnds: ReadonlySet<string> = new Set();
  private focus: Focus | null = null;
  private motion: Motion | null = null;
  /** Seconds of animation, advanced only by frames that ran. */
  private clock = 0;
  /** 1 while a focus holds, easing to 0 after it lets go. */
  private focusMix = 0;
  /** Seats to open the next fresh graph on; see `restore`. */
  private opening: GraphPlace["positions"] | null = null;
  /** The next frame lands every transition but appearing at once. */
  private snap = false;
  /** The node and edge ids last synced, to tell a change from a re-read. */
  private signature = "";
  /** The focus ring's growth, restarted for every node it moves to. */
  private ringGrowth = 0;
  private ringOn: string | null = null;
  /** Each edge's share of the firmer spoke drawing, eased as focus moves. */
  private readonly spokeMix = new Map<string, number>();
  /** The drawer's values (decision 132) and the arrangement in use (decision 131). */
  private config: GraphConfig = DEFAULT_GRAPH_CONFIG;
  private view: GraphLayoutKind = "ring";
  /** The reading the page view draws (decision 153); null in every other view. */
  private page: GraphPageReading | null = null;
  /** The relation nodes the reading took off the plane, and what each stands behind. */
  private relationOf: ReadonlyMap<string, string> = new Map();
  /** How much of the canvas's left edge something drawn over it covers, in CSS pixels. */
  private insetLeft = 0;

  constructor() {
    const material = new MeshLambertMaterial({ color: 0xffffff });
    const meshes = {} as Record<NodeShape, InstancedMesh>;
    for (const shape of NODE_SHAPES) {
      const mesh = new InstancedMesh(
        this.shapes[shape].geometry,
        material,
        NODE_CAPACITY,
      );
      mesh.instanceMatrix.setUsage(DynamicDrawUsage);
      mesh.setColorAt(0, new Color());
      mesh.count = 0;
      mesh.frustumCulled = false;
      meshes[shape] = mesh;
    }
    this.shapeMeshes = meshes;

    const maskedMaterial = new MeshLambertMaterial({
      color: 0xffffff,
      transparent: true,
      depthWrite: false,
    });
    maskedMaterial.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader
        .replace(
          "#include <common>",
          "#include <common>\nattribute float maskAlpha;\nvarying float vMaskAlpha;",
        )
        .replace(
          "#include <begin_vertex>",
          "#include <begin_vertex>\nvMaskAlpha = maskAlpha;",
        );
      shader.fragmentShader = shader.fragmentShader
        .replace(
          "#include <common>",
          "#include <common>\nvarying float vMaskAlpha;",
        )
        .replace(
          "#include <color_fragment>",
          "#include <color_fragment>\ndiffuseColor.a *= vMaskAlpha;",
        );
    };
    const masked = {} as Record<NodeShape, InstancedMesh>;
    const alphas = {} as Record<NodeShape, InstancedBufferAttribute>;
    for (const shape of NODE_SHAPES) {
      const geometry = this.shapes[shape].geometry.clone();
      const alpha = new InstancedBufferAttribute(
        new Float32Array(NODE_CAPACITY),
        1,
      );
      alpha.setUsage(DynamicDrawUsage);
      geometry.setAttribute("maskAlpha", alpha);
      const mesh = new InstancedMesh(geometry, maskedMaterial, NODE_CAPACITY);
      mesh.instanceMatrix.setUsage(DynamicDrawUsage);
      mesh.setColorAt(0, new Color());
      mesh.count = 0;
      mesh.frustumCulled = false;
      mesh.renderOrder = 1;
      masked[shape] = mesh;
      alphas[shape] = alpha;
    }
    this.maskedMeshes = masked;
    this.maskAlphas = alphas;

    this.planeTints = LEVELS.slice(1).map(() => {
      const tint = new Mesh(
        new PlaneGeometry(1, 1),
        new MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0,
          depthWrite: false,
        }),
      );
      tint.visible = false;
      tint.frustumCulled = false;
      tint.renderOrder = -1;
      return tint;
    });

    this.ringsMesh = new InstancedMesh(
      new RingGeometry(RING_INNER, RING_OUTER, 64),
      new MeshBasicMaterial({ color: 0xffffff }),
      NODE_CAPACITY,
    );
    this.ringsMesh.instanceMatrix.setUsage(DynamicDrawUsage);
    this.ringsMesh.setColorAt(0, new Color());
    this.ringsMesh.count = 0;
    this.ringsMesh.frustumCulled = false;

    this.focusRing = new Mesh(
      new RingGeometry(1.72, FOCUS_RING_OUTER, 72),
      new MeshBasicMaterial({ color: 0xffffff }),
    );
    this.focusRing.visible = false;
    this.focusRing.frustumCulled = false;

    // Icons: one camera-facing quad per node, every glyph from one atlas, in
    // a single draw. The atlas is white; each instance's colour inks it, and
    // a per-instance cell offset and opacity ride in `iconCell`.
    this.iconCells = new InstancedBufferAttribute(
      new Float32Array(NODE_CAPACITY * 3),
      3,
    );
    this.iconCells.setUsage(DynamicDrawUsage);
    const iconGeometry = new PlaneGeometry(1, 1);
    iconGeometry.setAttribute("iconCell", this.iconCells);
    const iconMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      depthWrite: false,
    });
    iconMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.iconCellSize = this.iconCellSize;
      shader.vertexShader = shader.vertexShader
        .replace(
          "#include <common>",
          "#include <common>\nattribute vec3 iconCell;\nuniform vec2 iconCellSize;\nvarying float vIconAlpha;",
        )
        .replace(
          "#include <uv_vertex>",
          "#include <uv_vertex>\n#ifdef USE_MAP\nvMapUv = vMapUv * iconCellSize + iconCell.xy;\n#endif\nvIconAlpha = iconCell.z;",
        );
      shader.fragmentShader = shader.fragmentShader
        .replace(
          "#include <common>",
          "#include <common>\nvarying float vIconAlpha;",
        )
        .replace(
          "#include <map_fragment>",
          "#include <map_fragment>\ndiffuseColor.a *= vIconAlpha;",
        );
    };
    this.iconsMesh = new InstancedMesh(
      iconGeometry,
      iconMaterial,
      NODE_CAPACITY,
    );
    this.iconsMesh.instanceMatrix.setUsage(DynamicDrawUsage);
    this.iconsMesh.setColorAt(0, new Color());
    this.iconsMesh.count = 0;
    this.iconsMesh.frustumCulled = false;
    this.iconsMesh.visible = false;
    this.iconsMesh.renderOrder = 1;

    this.root.add(
      this.light,
      this.light.target,
      ...this.thin.map((batch) => batch.object),
      this.dashed.object,
      ...this.heavy.map((batch) => batch.object),
      this.planeLines.object,
      this.floorLines.object,
      ...this.planeTints,
      ...NODE_SHAPES.map((shape) => this.shapeMeshes[shape]),
      ...NODE_SHAPES.map((shape) => this.maskedMeshes[shape]),
      this.ringsMesh,
      this.focusRing,
      this.iconsMesh,
    );
  }

  private readonly iconCellSize = { value: new Vector2(1, 1) };

  // ------------------------------------------------------------------ inputs

  /**
   * Open the next fresh graph from a stored place (decision 113) instead of
   * from the story's start: nodes the place knows take their seats with the
   * simulation cold, and a node it does not know grows out of its parent's
   * seat and warms the simulation just enough to find its own.
   */
  restore(positions: GraphPlace["positions"]): void {
    this.opening = positions;
  }

  /** Every live node's seat in the story, for `GraphPlace.positions`. */
  seats(): GraphPlace["positions"] {
    const out: Record<string, readonly number[]> = {};
    for (const [id, item] of this.items) {
      if (item.leaving || !item.layout) continue;
      const { x, y, z } = item.layout;
      out[id] = [round2(x), round2(y), round2(z)];
    }
    return out;
  }

  /** The focus in force as drawn, for `GraphPlace.focus3d`. */
  focusPlace(): GraphFocusPlace | null {
    const focus = this.focus;
    if (!focus) return null;
    const seats: Record<string, readonly number[]> = {};
    for (const [id, target] of focus.targets) {
      seats[id] = [round2(target.x), round2(target.y), round2(target.z)];
    }
    return {
      plane: [focus.origin, focus.right, focus.up, focus.normal].flatMap(
        (vector) => vector.toArray(),
      ),
      ring: [...focus.roles]
        .filter(([, role]) => role === "neighbour")
        .map(([id]) => id),
      seats,
      layout: focus.view,
    };
  }

  /**
   * Take the visible graph. Returns `fresh` when nothing on the canvas
   * survived (the first graph, or another claim), which is when the caller
   * frames the camera again, and `restored` when that fresh graph opened
   * from a stored place, when the caller puts the camera back instead.
   * `changed` says whether any node or edge came or went: a re-read that
   * brings the same graph back changes nothing on the canvas. `added` and
   * `removed` say which way nodes went.
   */
  sync(
    nodes: readonly GraphNode[],
    edges: readonly GraphEdge[],
  ): {
    fresh: boolean;
    restored: boolean;
    changed: boolean;
    added: boolean;
    removed: boolean;
  } {
    const signature = `${nodes.map((node) => node.id).join("|")}#${edges
      .map((edge) => `${edge.id}:${edge.source}:${edge.target}`)
      .join("|")}`;
    const same = signature === this.signature;
    this.signature = signature;
    const live = [...this.items.values()].filter((item) => !item.leaving);
    const fresh =
      live.length === 0 || !nodes.some((node) => this.items.has(node.id));
    if (fresh) this.reset();
    const opening = fresh ? this.opening : null;
    this.opening = null;
    let unseated = 0;

    const incoming = new Set(nodes.map((node) => node.id));
    const added = nodes.some(
      (node) => this.items.get(node.id)?.leaving !== false,
    );
    let removed = false;
    for (const [id, item] of this.items) {
      if (incoming.has(id) || item.leaving) continue;
      removed = true;
      item.leaving = true;
      item.layout = null;
      item.from.copy(item.pos);
      if (this.reducedMotion) this.removeItem(id);
    }

    const spawn = new Map<string, Vector3>();
    /** Where a new node is first drawn, when that is not its layout seat. */
    const drawnAt = new Map<string, Vector3>();
    const revealed = new Set<string>();
    const focusCentre = this.focus ? this.items.get(this.focus.id) : undefined;
    for (const node of nodes) {
      const known = this.items.get(node.id);
      if (known) {
        known.node = node;
        known.icon = iconKeyOf(node);
        if (known.leaving) {
          known.leaving = false;
          spawn.set(node.id, seatOf(known));
        }
        continue;
      }
      const seat = opening?.[node.id];
      if (opening && !seat) {
        // New since the place was left: out of its parent's stored seat.
        const from = node.revealedBy
          .map((id) => opening[id])
          .find((parentSeat) => parentSeat != null);
        if (from) {
          spawn.set(node.id, new Vector3(from[0], from[1], from[2]));
          revealed.add(node.id);
        }
        unseated++;
      }
      const parent = fresh
        ? undefined
        : node.revealedBy
            .map((id) => this.items.get(id))
            .find(
              (item) => item && !item.leaving && incoming.has(item.node.id),
            );
      if (parent) {
        // The layout seeds a child at its parent's seat in the story; on
        // screen it grows out of the parent wherever the parent is drawn.
        spawn.set(node.id, seatOf(parent));
        revealed.add(node.id);
      }
      if (focusCentre)
        drawnAt.set(node.id, (parent ?? focusCentre).pos.clone());
      const item: Item = {
        node,
        layout: null,
        pos: new Vector3(),
        from: new Vector3(),
        leaving: false,
        appear:
          (fresh && (!opening || seat != null)) || this.reducedMotion ? 1 : 0,
        dim: 0,
        hover: 0,
        label: node.tier <= 1 ? 1 : 0,
        labelBase: 0,
        labelEmphasis: false,
        labelPriority: 9,
        labelSide: 0,
        labelRect: null,
        labelPx: 0,
        scale: 0,
        size: 1,
        flight: 0,
        countMix: 1,
        nameScale: 1,
        icon: iconKeyOf(node),
        ringMix: 1,
        arrivedAt: null,
        level: 0,
        fog: 0,
        mask: 0,
        alpha: 1,
      };
      this.items.set(node.id, item);
    }

    // What the latest expansion revealed keeps its names on screen until the
    // next change, so a double-click shows what opened rather than dots.
    if (!this.focus && (revealed.size > 0 || fresh)) this.revealed = revealed;
    this.edges = edges;
    const changed = this.layout.sync(
      nodes,
      edges,
      (node) => spawn.get(node.id) ?? null,
      (node) => opening?.[node.id] ?? null,
    );
    for (const node of nodes) {
      const item = this.items.get(node.id);
      const at = this.layout.nodes.get(node.id);
      if (!item || !at) continue;
      if (!item.layout) {
        const drawn = drawnAt.get(node.id);
        if (drawn) item.pos.copy(drawn);
        else item.pos.set(at.x, at.y, at.z);
      }
      item.layout = at;
    }

    if (opening) {
      this.layout.resume(unseated > 0 ? RESTORE_ALPHA : 0);
      if (this.reducedMotion) this.layout.settle();
    } else if (fresh) {
      this.layout.reheat(1);
      if (this.reducedMotion) this.layout.settle();
      else this.layout.tick(24);
    } else if (changed) {
      this.layout.reheat();
      if (this.reducedMotion) this.layout.settle();
    }
    this.updateLit();
    return {
      fresh,
      restored: opening != null,
      changed: !same,
      added: added || (!same && !removed),
      removed,
    };
  }

  setEmphasis(emphasis: Emphasis): void {
    this.emphasis = emphasis;
    this.updateLit();
  }

  setReducedMotion(reduced: boolean): void {
    this.reducedMotion = reduced;
  }

  setPalette(palette: Palette): void {
    this.palette = palette;
    this.fog.color.copy(palette.background);
    (this.focusRing.material as MeshBasicMaterial).color.copy(palette.primary);
    for (const tint of this.planeTints) {
      (tint.material as MeshBasicMaterial).color.copy(palette.foreground);
    }
  }

  setIconAtlas(atlas: IconAtlas | null): void {
    this.atlas = atlas;
    const material = this.iconsMesh.material as MeshBasicMaterial;
    material.map = atlas?.texture ?? null;
    material.needsUpdate = true;
    if (atlas) this.iconCellSize.value.set(1 / atlas.columns, 1 / atlas.rows);
    this.iconsMesh.visible = atlas != null && this.config.nodes.icons;
  }

  /**
   * Take the drawer's values and the view's arrangement. Returns whether the
   * focus must be arranged again: a change to anything that decides where a
   * node sits, or of arrangement. Everything else applies on the next frame.
   */
  setConfig(
    config: GraphConfig,
    view: GraphLayoutKind,
  ): { rearrange: boolean; viewChanged: boolean } {
    const was = this.config;
    const wasView = this.view;
    this.config = config;
    this.view = view;
    const width = config.links.widthPx;
    for (const level of LEVELS) {
      const step = this.levelWidth(level);
      (this.thin[level].object.material as LineMaterial).linewidth =
        width * step;
      (this.heavy[level].object.material as LineMaterial).linewidth =
        HEAVY_WIDTH * width * step;
    }
    (this.dashed.object.material as LineMaterial).linewidth = width;
    this.iconsMesh.visible = this.atlas != null && config.nodes.icons;
    return {
      rearrange: wasView !== view || !sameArrangement(was, config),
      viewChanged: wasView !== view,
    };
  }

  /**
   * Nodes that just arrived (decision 118). Each pulses once and shows its
   * name for a moment when it is on the canvas; one not there yet is kept
   * for when it comes. The same list handed over again changes nothing.
   */
  setArrivals(ids: readonly string[]): void {
    const key = ids.join("|");
    if (key === this.arrivalKey) return;
    this.arrivalKey = key;
    for (const id of ids) this.pendingArrivals.set(id, this.clock);
  }

  /**
   * The reading the page view draws (decision 153): its lanes decide the front
   * plane, its trail which nodes are drawn small at the top left, and its
   * states the one phrase a front node wears under its name.
   */
  /**
   * How much of the canvas's left edge is covered by a panel drawn over it.
   * Only the page arrangement reads it; the Ring and the Node view are
   * unchanged. Returns whether it moved, because a new value is a new
   * arrangement rather than a redraw.
   */
  setInsetLeft(px: number): boolean {
    const next = Math.max(0, px);
    if (next === this.insetLeft) return false;
    this.insetLeft = next;
    return true;
  }

  setPage(page: GraphPageReading | null): void {
    this.page = page;
    const relations = new Map<string, string>();
    for (const each of page?.behind ?? []) {
      if (each.relation) relations.set(each.id, each.parent);
    }
    this.relationOf = relations;
  }

  /** A stable ref callback per label, so React re-renders do not churn refs. */
  labelRef(
    kind: "label" | "count" | "edge" | "caption" | "level" | "lane",
    id: string,
  ): (mesh: TextMesh | null) => void {
    const key = `${kind}:${id}`;
    let ref = this.refCache.get(key);
    if (!ref) {
      const map = {
        label: this.labels,
        count: this.counts,
        edge: this.edgeLabels,
        caption: this.captions,
        level: this.levelLabels,
        lane: this.laneLabels,
      }[kind];
      ref = (mesh) => {
        if (mesh) {
          mesh.visible = false;
          // Labels sit on top of the scene, like type on a drawing: their halo
          // then masks the edges under a name instead of tying with them in
          // depth, and a name is never cut by a line passing at its node.
          mesh.material = this.labelMaterial;
          mesh.renderOrder = 10;
          if (!(mesh.color instanceof Color)) mesh.color = new Color();
          if (!(mesh.outlineColor instanceof Color)) {
            mesh.outlineColor = new Color();
          }
          map.set(id, mesh);
        } else map.delete(id);
      };
      this.refCache.set(key, ref);
    }
    return ref;
  }

  // ------------------------------------------------------------------ camera

  /** The settled story's bounds, labels included, for the opening camera. */
  predictedBounds(
    nodes: readonly GraphNode[],
    edges: readonly GraphEdge[],
  ): Box3 {
    const settled = predictSettled(nodes, edges);
    const box = new Box3();
    for (const node of nodes) {
      const at = settled.get(node.id);
      if (at) this.grow(box, scratch.set(at.x, at.y, at.z), node.tier);
    }
    return box;
  }

  /**
   * The middle of what the camera has on screen: the mean seat of every node
   * inside the frame, or of every node drawn when the frame holds none.
   *
   * This is the turntable's default pivot. It is the centroid of the
   * arrangement while the whole arrangement is framed, and it follows a pan
   * or a zoom, so an orbit started after either still turns about what the
   * reader is looking at rather than about a node they left behind.
   *
   * The camera's matrices are last frame's, which moves the answer by a
   * fraction of a degree on a camera in flight and by nothing at all on one
   * at rest; the pivot is read at the start of a gesture, when it is at rest.
   */
  onScreenCentre(camera: PerspectiveCamera, out: Vector3): Vector3 | null {
    let framed = 0;
    let fx = 0;
    let fy = 0;
    let fz = 0;
    let all = 0;
    let ax = 0;
    let ay = 0;
    let az = 0;
    for (const item of this.items.values()) {
      if (item.leaving) continue;
      all++;
      ax += item.pos.x;
      ay += item.pos.y;
      az += item.pos.z;
      scratch.copy(item.pos).project(camera);
      // Behind the camera, or outside the frame and the margin around it.
      if (
        scratch.z > 1 ||
        Math.abs(scratch.x) > FRAME_MARGIN ||
        Math.abs(scratch.y) > FRAME_MARGIN
      ) {
        continue;
      }
      framed++;
      fx += item.pos.x;
      fy += item.pos.y;
      fz += item.pos.z;
    }
    if (framed > 0) return out.set(fx / framed, fy / framed, fz / framed);
    if (all > 0) return out.set(ax / all, ay / all, az / all);
    return null;
  }

  /**
   * A node and everything it links to on the canvas, as a box to frame: what
   * the reader means by "show me this one" (the F key and its control).
   */
  neighbourhood(id: string): Box3 | null {
    const centre = this.items.get(id);
    if (!centre || centre.leaving) return null;
    const box = new Box3();
    this.grow(box, scratchC.copy(centre.pos), centre.node.tier);
    for (const edge of this.edges) {
      const other =
        edge.source === id
          ? edge.target
          : edge.target === id
            ? edge.source
            : null;
      if (!other) continue;
      const item = this.items.get(other);
      if (!item || item.leaving) continue;
      this.grow(box, scratchC.copy(item.pos), item.node.tier);
    }
    return box;
  }

  /**
   * Every node on the canvas, labels included: the box a picture of the whole
   * claim frames (the intake assembly's graph pane), where the neighbourhood
   * of the centre would leave the outer readings and photographs off the
   * edge.
   */
  extent(): Box3 | null {
    const box = new Box3();
    let any = false;
    for (const item of this.items.values()) {
      if (item.leaving) continue;
      this.grow(box, scratchC.copy(item.pos), item.node.tier);
      any = true;
    }
    return any ? box : null;
  }

  /**
   * How far each shown name reaches left and right of its node, in canvas
   * pixels, as drawn through `camera`. Names are drawn at a constant pixel
   * size, so no world box holds them at every distance: a frame of the whole
   * claim backs off until every node plus its reach is inside the canvas.
   */
  labelSpans(
    camera: PerspectiveCamera,
    width: number,
  ): { at: Vector3; left: number; right: number }[] {
    const spans: { at: Vector3; left: number; right: number }[] = [];
    for (const item of this.items.values()) {
      const rect = item.leaving || item.label < 0.5 ? null : item.labelRect;
      if (!rect) continue;
      scratch.copy(item.pos).project(camera);
      const sx = ((scratch.x + 1) / 2) * width;
      spans.push({
        at: item.pos.clone(),
        left: Math.max(0, sx - rect.x0),
        right: Math.max(0, rect.x1 - sx),
      });
    }
    return spans;
  }

  private grow(box: Box3, at: Vector3, tier: GraphNode["tier"]): void {
    const r = this.radius(tier) * 1.6;
    box.expandByPoint(scratchB.set(at.x - r, at.y - r * 1.4, at.z - r));
    // Labels run to the right of their node.
    box.expandByPoint(scratchB.set(at.x + r + 7, at.y + r, at.z + r));
  }

  // ------------------------------------------------------------------- focus

  get focusId(): string | null {
    return this.focus?.id ?? null;
  }

  /** Where a node is drawn this frame, mid-glide included. */
  positionOf(id: string, out: Vector3): Vector3 | null {
    const item = this.items.get(id);
    return item && !item.leaving ? out.copy(item.pos) : null;
  }

  /**
   * Arrange the graph around `id` (decision 109) and say where the camera
   * should be to see it front-on in a canvas of this size.
   *
   * A first focus lays its plane through the node, facing the camera as it
   * is now. Walking to a neighbour keeps the same point, so the new centre
   * slides into the old one's place, and takes the camera's facing afresh in
   * case the reader has orbited since. Re-arranging the same focus (the graph
   * changed underneath it) keeps the plane exactly as it was.
   */
  focusOn(
    id: string,
    camera: PerspectiveCamera,
    viewWidth: number,
    viewHeight: number,
    /**
     * The focus as it was left (`GraphPlace.focus3d`). It re-forms on the same
     * plane. With the same ring, every node it knows is drawn where it was,
     * at once, and only what is new takes a fresh seat; with a different
     * ring, the arrangement is solved again and everything glides there from
     * where it was left. A place left in the other view is ignored.
     */
    kept?: GraphFocusPlace | null,
    options: FocusOptions = {},
  ): FocusView | null {
    const centre = this.items.get(id);
    if (!centre || centre.leaving) return null;
    const view = this.view;
    const nodeView = view === "node";
    const pageView = view === "page";
    /** Both node arrangements seat the selection large in the left third. */
    const seated = nodeView || pageView;
    const keep =
      kept && kept.plane.length >= 12 && (kept.layout ?? "ring") === view
        ? kept
        : null;
    const plane = keep ? keep.plane : null;
    const previous = plane
      ? {
          id,
          origin: new Vector3().fromArray(plane, 0),
          right: new Vector3().fromArray(plane, 3),
          up: new Vector3().fromArray(plane, 6),
          normal: new Vector3().fromArray(plane, 9),
        }
      : this.focus;
    const same = previous?.id === id;
    const staying = previous != null && same;
    // The Node view seats its selection against the plane's origin, which it
    // takes for the middle of the canvas, and a walk keeps the camera where it
    // is while the zoom still fits. So a walk keeps the origin too: re-laid on
    // the clicked node, which stood in a column right of the middle, the
    // selection landed a third of a canvas left of there and every further
    // click walked it on, off the screen.
    const walking =
      seated && previous != null && !same && this.focus?.view === view;
    const origin =
      (staying || walking) && previous
        ? previous.origin.clone()
        : centre.pos.clone();
    // Both views face the camera as the reader left it: the Node view orbits
    // like the Ring, so a walk after an orbit re-lays its plane square to
    // where the reader is looking from.
    const axisRight =
      staying && previous
        ? previous.right.clone()
        : new Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
    const axisUp =
      staying && previous
        ? previous.up.clone()
        : new Vector3(0, 1, 0).applyQuaternion(camera.quaternion);
    const normal =
      staying && previous
        ? previous.normal.clone()
        : new Vector3(0, 0, 1).applyQuaternion(camera.quaternion);

    // The centre's own edges, and the tag each neighbour's spoke carries (two
    // tagged links to one neighbour share a spoke; the wider wins).
    const tagWidth = new Map<string, number>();
    const spokes = new Set<string>();
    const tags = this.config.links.emphasisTags;
    for (const edge of this.edges) {
      const other =
        edge.source === id
          ? edge.target
          : edge.target === id
            ? edge.source
            : null;
      const item = other ? this.items.get(other) : undefined;
      if (!other || other === id || !item || item.leaving) continue;
      spokes.add(edge.id);
      const tag = tags ? linkTagOf(edge) : null;
      const width =
        tag != null
          ? textWidth(
              this.edgeLabels.get(edge.id) ?? null,
              this.edgeLabelPx(),
              Math.min(tag.length, 40),
            )
          : 0;
      tagWidth.set(other, Math.max(tagWidth.get(other) ?? 0, width));
    }

    const member = (item: Item): FocusMember => {
      const { tier } = item.node;
      const isCentre = item.node.id === id;
      const radius = this.radius(tier) * PX_PER_UNIT;
      const font =
        seated && isCentre
          ? this.labelPx(tier) * NODE_CENTRE_LABEL
          : this.labelPx(tier);
      const width = Math.max(
        textWidth(
          this.labels.get(item.node.id) ?? null,
          font,
          Math.min(item.node.label.length, 32),
        ),
        this.captionWidth(item.node.id, font),
      );
      const count = this.counts.get(item.node.id);
      const decision = tagWidth.get(item.node.id);
      const drawn =
        seated && isCentre ? radius * this.nodeCentreSize(tier) : radius;
      const rings = this.ringScale(item);
      return {
        node: item.node,
        typePx: radius,
        radiusPx:
          drawn *
          (isCentre
            ? FOCUS_RING_OUTER * rings
            : this.ringed(item.node)
              ? RING_OUTER * rings
              : this.shapeReach(item)),
        labelW:
          // The page view's state phrase rides in the hidden count's slot, so
          // a lane's column has to be as wide as the widest of the two.
          (isCentre || pageView || this.config.nodes.detailLine) && count
            ? Math.max(
                width,
                textWidth(count, this.countPx(), underChars(count)),
              )
            : width,
        labelH: font * 1.25 + this.captionHeight(font),
        decisionW: decision ? decision : null,
      };
    };

    // A relation group the reading took off the plane (decision 155) is a
    // direct link of the selection, so without this it would be seated on the
    // plane as one more lane. It stands behind the record instead, at the
    // depth, dim and name of everything else one step back.
    const relations = pageView ? this.relationOf : EMPTY_RELATIONS;
    const neighbours: (FocusMember & { family: string })[] = [];
    const roles = new Map<string, Role>([[id, "centre"]]);
    for (const [otherId, item] of this.items) {
      if (item.leaving || otherId === id) continue;
      if (tagWidth.has(otherId) && !relations.has(otherId)) {
        neighbours.push({ ...member(item), family: familyOf(item.node) });
        roles.set(otherId, "neighbour");
      } else {
        roles.set(otherId, "background");
      }
    }
    const distances = this.linkDistances(id, relations);
    const hops = new Map<string, number | null>(
      distances.map((entry) => [entry.node.id, entry.hop]),
    );
    const { hopsShown } = this.config.layout;
    const hidden = new Set<string>();
    const background = distances
      .filter((entry) => {
        const shown =
          hopsShown >= 4 || (entry.hop != null && entry.hop <= hopsShown);
        if (!shown) hidden.add(entry.node.id);
        return shown;
      })
      .map((entry): BackgroundMember => {
        const { tier } = entry.node;
        const font = this.labelPx(tier) * BACKGROUND_LABEL;
        const item = this.items.get(entry.node.id);
        return {
          ...entry,
          typePx: this.radius(tier) * PX_PER_UNIT,
          radiusPx:
            this.radius(tier) *
            PX_PER_UNIT *
            this.levelSize(entry.hop) *
            (item ? this.shapeReach(item) : 1),
          labelW: Math.max(
            textWidth(
              this.labels.get(entry.node.id) ?? null,
              font,
              Math.min(entry.node.label.length, 32),
            ),
            this.captionWidth(entry.node.id, font),
          ),
          labelH: font * 1.25 + this.captionHeight(font),
        };
      });

    const { layout } = this.config;
    const params: LayoutParams = {
      ringRadius: layout.ringRadius,
      hopSpacing: layout.hopSpacing,
      depthPerHop: layout.depthPerHop,
      spread: layout.spread,
      padPx: layout.labelGapPx,
      backgroundNames: this.config.labels.backgroundNames,
    };
    const current = this.focus;
    // The Node view keeps its zoom from one selection to the next while it
    // fits, so the camera stays put and everything glides from where it is on
    // screen. The Ring keeps a frame only for what arrives (decision 118).
    const hold =
      keep || options.reframe || !current || current.view !== view
        ? null
        : seated
          ? current.frame
          : options.hold && current.id === id
            ? current.frame
            : null;
    const input = {
      centre: member(centre),
      neighbours,
      background,
      origin,
      right: axisRight,
      up: axisUp,
      normal,
      viewWidth,
      viewHeight,
      fov: camera.fov,
      hold,
      params,
    };
    const page = pageView ? (this.page ?? EMPTY_PAGE) : null;
    const arrangement: FocusArrangement & {
      order: ReadonlyMap<string, number> | null;
      laneMarks?: ReadonlyMap<string, Vector3>;
      lanePlates?: ReadonlyMap<string, PagePlate>;
    } = page
      ? arrangePage({
          ...input,
          lanes: page.lanes,
          groups: this.config.page.groups,
          insetLeftPx: this.insetLeft,
          relations: new Set(relations.keys()),
          trail: page.trail,
          stated: new Set(Object.keys(page.states)),
          statePx: this.countPx(),
        })
      : nodeView
        ? arrangeNode(input)
        : { ...arrangeFocus(input), order: null };

    // What is past the hops shown shrinks into the nearest node that shows, or
    // where it stands when nothing it links through does.
    if (hidden.size > 0) {
      const via = new Map(distances.map((entry) => [entry.node.id, entry.via]));
      for (const hiddenId of hidden) {
        let at = via.get(hiddenId) ?? null;
        while (at && hidden.has(at)) at = via.get(at) ?? null;
        const into = at ? arrangement.positions.get(at) : undefined;
        const seat = into ?? this.items.get(hiddenId)?.pos;
        if (seat) arrangement.positions.set(hiddenId, seat.clone());
      }
    }

    this.focus = {
      id,
      origin,
      right: axisRight,
      up: axisUp,
      normal,
      roles,
      hops,
      viewWidth,
      targets: arrangement.positions,
      labelSides: arrangement.labelSides,
      spokes,
      frame: arrangement.frame,
      view,
      order: arrangement.order,
      hidden,
      distance: arrangement.distance,
      trail: new Set(page?.trail ?? []),
      laneMarks: arrangement.laneMarks ?? EMPTY_MARKS,
      lanePlates: arrangement.lanePlates ?? EMPTY_PLATES,
      laneOf: new Map(
        (page?.lanes ?? []).flatMap((lane) =>
          lane.nodeIds.map((nodeId) => [nodeId, lane.key] as const),
        ),
      ),
    };
    let keepCamera = arrangement.held;
    if (options.instant && !keep) {
      // The first paint (decision 115): everything where it belongs, at once.
      for (const [nodeId, target] of arrangement.positions) {
        const item = this.items.get(nodeId);
        if (!item) continue;
        item.pos.copy(target);
        item.appear = hidden.has(nodeId) ? 0 : 1;
      }
      this.snap = true;
      this.motion = null;
    } else if (keep && plane) {
      const ring = neighbours.map((entry) => entry.node.id);
      // Anything without a kept seat arrived while the tab was closed. It
      // must land on screen, so the arrangement is solved afresh and framed
      // for everything rather than squeezed into the old frame.
      const everySeated = [...arrangement.positions.keys()].every(
        (nodeId) => keep.seats[nodeId] != null,
      );
      const sameRing =
        ring.length === keep.ring.length &&
        ring.every((nodeId) => keep.ring.includes(nodeId)) &&
        everySeated;
      for (const [nodeId, target] of arrangement.positions) {
        const seat = keep.seats[nodeId];
        const item = this.items.get(nodeId);
        if (seat && sameRing) target.set(seat[0], seat[1], seat[2]);
        if (!item) continue;
        if (seat) item.pos.set(seat[0], seat[1], seat[2]);
        else item.pos.copy(target);
      }
      this.snap = true;
      keepCamera = sameRing;
      if (sameRing) this.motion = null;
      else this.startMotion(origin);
    } else this.startMotion(origin);

    return {
      target: arrangement.lookAt,
      position: arrangement.lookAt
        .clone()
        .addScaledVector(normal, arrangement.distance),
      keepCamera,
    };
  }

  /**
   * Every live node off the centre's ring, with how many links away it is
   * and the node one link nearer that it is seated behind (decision 111).
   *
   * Breadth first over the visible edges. Where a node is reached from more
   * than one node a hop nearer, it goes behind the one it has the strongest
   * edge to (a decision, then structure, evidence, a dependency), then the
   * more specific one (the deeper tier: a firm behind its craft, not behind
   * the claim), then the one with fewer seated behind it so far, then by id.
   */
  private linkDistances(
    centreId: string,
    /**
     * Nodes to report one step behind whatever the link distance says, and
     * what each stands behind: the reading's relation groups, which link
     * straight to the selection and would otherwise be seated on the plane.
     */
    relations: ReadonlyMap<string, string> = EMPTY_RELATIONS,
  ): LinkDistance[] {
    const links = new Map<string, Map<string, number>>();
    const link = (a: string, b: string, rank: number) => {
      let map = links.get(a);
      if (!map) links.set(a, (map = new Map()));
      map.set(b, Math.min(map.get(b) ?? Infinity, rank));
    };
    for (const edge of this.edges) {
      if (edge.source === edge.target) continue;
      const a = this.items.get(edge.source);
      const b = this.items.get(edge.target);
      if (!a || !b || a.leaving || b.leaving) continue;
      const rank = EDGE_STRENGTH[linkClassOf(edge)];
      link(edge.source, edge.target, rank);
      link(edge.target, edge.source, rank);
    }

    const hop = new Map<string, number>([[centreId, 0]]);
    const via = new Map<string, string>();
    const seated = new Map<string, number>();
    let frontier = [centreId];
    for (let distance = 1; frontier.length > 0; distance++) {
      const reached = new Set<string>();
      for (const from of frontier) {
        for (const to of links.get(from)?.keys() ?? []) {
          if (!hop.has(to)) reached.add(to);
        }
      }
      const next = [...reached].sort(compareIds);
      for (const id of next) {
        hop.set(id, distance);
        if (distance === 1) continue;
        let best: string | null = null;
        for (const [other, rank] of links.get(id) ?? []) {
          if (hop.get(other) !== distance - 1) continue;
          if (best == null) {
            best = other;
            continue;
          }
          const bestRank = links.get(id)?.get(best) ?? Infinity;
          const tierOther = this.items.get(other)?.node.tier ?? 0;
          const tierBest = this.items.get(best)?.node.tier ?? 0;
          const order =
            rank - bestRank ||
            tierBest - tierOther ||
            (seated.get(other) ?? 0) - (seated.get(best) ?? 0) ||
            compareIds(other, best);
          if (order < 0) best = other;
        }
        if (best) {
          via.set(id, best);
          seated.set(best, (seated.get(best) ?? 0) + 1);
        }
      }
      frontier = next;
    }

    const out: LinkDistance[] = [];
    for (const [id, item] of this.items) {
      if (item.leaving) continue;
      const forced = relations.get(id);
      if (forced) {
        out.push({ node: item.node, hop: 2, via: forced });
        continue;
      }
      const distance = hop.get(id);
      if (distance === 0 || distance === 1) continue;
      out.push({
        node: item.node,
        hop: distance ?? null,
        via: via.get(id) ?? null,
      });
    }
    return out;
  }

  /**
   * Where depth of field (decision 136) keeps things sharp: the focus plane's
   * distance along the camera's view, and the depth behind it over which the
   * blur comes in, a share of the camera distance the focus was framed at.
   */
  depthFocus(
    camera: PerspectiveCamera,
    range: number,
  ): { distance: number; range: number } | null {
    const focus = this.focus;
    if (!focus) return null;
    forward.set(0, 0, -1).applyQuaternion(camera.quaternion);
    return {
      distance: scratch.subVectors(focus.origin, camera.position).dot(forward),
      range: focus.distance * range,
    };
  }

  /** Let the focus go: every node eases back to its seat in the story. */
  releaseFocus(): void {
    const focus = this.focus;
    if (!focus) return;
    this.focus = null;
    this.startMotion(focus.origin);
    this.layout.reheat(RELEASE_ALPHA);
    if (this.reducedMotion) this.layout.settle();
  }

  /**
   * Start every live node toward where it is going from where it is drawn,
   * the nearest to `near` first, so the arrangement unfolds from its centre.
   */
  private startMotion(near: Vector3): void {
    if (this.reducedMotion) {
      this.motion = null;
      return;
    }
    const from = new Map<string, { at: Vector3; delay: number }>();
    const focus = this.focus;
    const stagger = this.config.motion.staggerMs / DEFAULT_STAGGER_MS;
    let farthest = 0;
    for (const [id, item] of this.items) {
      if (item.leaving) continue;
      const goal = this.goalOf(id, item, scratch);
      let delay = goal ? goal.distanceTo(near) : 0;
      const role = focus?.roles.get(id);
      if (focus && goal && role === "neighbour") {
        // Around the ring by angle; down the Node view's columns in reading
        // order.
        let turn = focus.order?.get(id);
        if (turn == null) {
          scratchB.subVectors(goal, focus.origin);
          turn =
            (Math.atan2(scratchB.dot(focus.up), scratchB.dot(focus.right)) +
              Math.PI) /
            (Math.PI * 2);
        }
        delay =
          (STAGGER_RING[0] + (STAGGER_RING[1] - STAGGER_RING[0]) * turn) *
          stagger;
      } else if (focus && role === "background") {
        const hop = focus.hops.get(id) ?? null;
        const step = hop == null ? 1 : Math.min(1, (hop - 2) / 2);
        delay =
          (STAGGER_BACKGROUND[0] +
            (STAGGER_BACKGROUND[1] - STAGGER_BACKGROUND[0]) * step) *
          stagger;
      } else if (focus) {
        delay = 0;
      } else {
        farthest = Math.max(farthest, delay);
      }
      from.set(id, { at: item.pos.clone(), delay });
    }
    if (!focus) {
      for (const entry of from.values()) {
        entry.delay =
          farthest > 0
            ? (entry.delay / farthest) * STAGGER_BACKGROUND[1] * stagger
            : 0;
      }
    }
    this.motion = { start: this.clock, from };
  }

  /** Where a node belongs right now: its focus seat, else its story seat. */
  private goalOf(id: string, item: Item, out: Vector3): Vector3 | null {
    const target = this.focus?.targets.get(id);
    if (target) return out.copy(target);
    if (item.layout) {
      return out.set(item.layout.x, item.layout.y, item.layout.z);
    }
    return null;
  }

  // ------------------------------------------------------------------- frame

  /** Advance one frame. Returns whether anything is still in motion. */
  frame(
    camera: PerspectiveCamera,
    controls: { getTarget: (out: Vector3) => Vector3 } | null,
    delta: number,
    width: number,
    height: number,
  ): boolean {
    const palette = this.palette;
    if (!palette) return false;

    controls?.getTarget(this.target);
    const distance = camera.position.distanceTo(this.target);
    // A headlight above and to the left of the camera: the shading stays the
    // same as the reader orbits, so depth reads without a glare that moves.
    this.light.position
      .copy(camera.position)
      .addScaledVector(camera.up, distance * 0.6)
      .add(
        scratch.set(-distance * 0.4, 0, 0).applyQuaternion(camera.quaternion),
      );
    this.light.target.position.copy(this.target);
    // With the atmospheric fog on (decision 136), depth is measured from the
    // plane instead of the camera, and applied per node below; the camera's
    // own fog stands aside.
    const planeFog = this.config.depth.fog;
    this.fog.near = planeFog ? 1e6 : distance * 0.95;
    this.fog.far = planeFog ? 2e6 : distance * 3.4;

    let busy = false;

    // A focus holds the simulation still: the story waits where it was left.
    if (this.layout.active && !this.focus) {
      this.layout.tick(this.items.size > 220 ? 1 : 2);
      busy = true;
    }

    this.clock += Math.min(delta, 1 / 30);
    // Arrivals start when their node is on the canvas.
    for (const [id, asked] of this.pendingArrivals) {
      const item = this.items.get(id);
      if (item && !item.leaving) {
        item.arrivedAt = this.reducedMotion ? null : this.clock;
        this.pendingArrivals.delete(id);
      } else if (this.clock - asked > ARRIVAL_PENDING_SECONDS) {
        this.pendingArrivals.delete(id);
      }
    }
    if (this.pendingArrivals.size > 0) busy = true;
    const motion = this.motion;
    if (motion) {
      const elapsed = this.clock - motion.start;
      const stagger = this.config.motion.staggerMs / DEFAULT_STAGGER_MS;
      if (elapsed >= this.transitionSeconds() + STAGGER_BACKGROUND[1] * stagger)
        this.motion = null;
      busy = true;
    }

    const ease = this.reducedMotion
      ? 1
      : 1 - Math.exp(-Math.min(delta, 0.05) * 9);
    const glide = (from: number, to: number, rate: number) => {
      const next = from + (to - from) * rate;
      if (Math.abs(to - next) < 0.003) return to;
      busy = true;
      return next;
    };
    // A restored focus lands dimmed and sized at once; only what is new
    // since still grows in.
    const snap = this.snap;
    this.snap = false;
    const approach = (from: number, to: number) =>
      glide(from, to, snap ? 1 : ease);
    const fadeRate = this.reducedMotion
      ? 1
      : 1 - Math.exp(-Math.min(delta, 0.05) * FADE_RATE);
    const fade = (from: number, to: number) =>
      glide(from, to, snap ? 1 : fadeRate);

    right.set(1, 0, 0).applyQuaternion(camera.quaternion);
    up.set(0, 1, 0).applyQuaternion(camera.quaternion);
    forward.set(0, 0, -1).applyQuaternion(camera.quaternion);
    this.worldPerPx =
      (2 * Math.tan((camera.fov * Math.PI) / 360)) / Math.max(height, 1);

    const { hoveredId, focusedId, highlightedIds } = this.emphasis;
    const highlighting = highlightedIds.size > 0 || this.edgeEnds.size > 0;
    const lit = this.lit;
    let slot = 0;
    const drawn: Record<NodeShape, number> = {
      sphere: 0,
      cube: 0,
      octahedron: 0,
      cylinder: 0,
      coin: 0,
      capsule: 0,
    };
    const maskedDrawn: Record<NodeShape, number> = {
      sphere: 0,
      cube: 0,
      octahedron: 0,
      cylinder: 0,
      coin: 0,
      capsule: 0,
    };
    // The mask (`nodes.mask`) holds while a main node lights its
    // neighbourhood and nothing else is being pointed out.
    const maskOpacity = clamp01(this.config.nodes.mask / 100);
    const masking = maskOpacity < 1 && lit != null && !highlighting;
    let rings = 0;
    let icons = 0;
    const gone: string[] = [];
    this.slotIds.length = 0;

    const focus = this.focus;
    this.focusMix = approach(this.focusMix, focus ? 1 : 0);

    for (const [id, item] of this.items) {
      const role = focus?.roles.get(id);
      if (!item.leaving) {
        const goal = this.goalOf(id, item, scratchB);
        const start = motion?.from.get(id);
        if (goal && motion && start) {
          const t = clamp01(
            (this.clock - motion.start - start.delay) /
              this.transitionSeconds(),
          );
          // By default out fast and settling in, so the first frame after a
          // click already moves; a click mid-flight sets off from where it is.
          const eased = EASINGS[this.config.motion.easing](t);
          item.pos.lerpVectors(start.at, goal, eased);
          // Names dip while their node is travelling and are back by about
          // two thirds of the tween, when it is nearly there.
          item.flight =
            Math.sin(Math.PI * Math.min(1, eased * 1.08)) *
            clamp01(start.at.distanceTo(goal) / FLIGHT_LABEL_FADE);
        } else {
          if (goal) item.pos.copy(goal);
          item.flight = 0;
        }
      }
      const hidden = focus?.hidden.has(id) ?? false;
      const shy = this.shyRelation(id, hoveredId);
      item.appear = glide(
        item.appear,
        item.leaving || hidden || shy ? 0 : 1,
        ease,
      );
      if (item.leaving) {
        const anchor = item.node.parentId
          ? this.items.get(item.node.parentId)
          : undefined;
        if (anchor) item.pos.lerpVectors(anchor.pos, item.from, item.appear);
        if (item.appear <= 0.01) {
          gone.push(id);
          continue;
        }
      }

      // An arrival breathes once, gently, as it lands, and keeps its name
      // up and its colour full for a moment whatever its depth.
      let breath = 0;
      let arrived = false;
      if (item.arrivedAt != null) {
        const since = this.clock - item.arrivedAt;
        const pulse = this.config.motion.arrivalPulseS / ARRIVAL_NAME_SECONDS;
        const pulseDelay = ARRIVAL_PULSE.delay * pulse;
        const pulseSeconds = ARRIVAL_PULSE.seconds * pulse;
        const nameSeconds = ARRIVAL_NAME_SECONDS * pulse;
        const t = (since - pulseDelay) / pulseSeconds;
        if (t > 0 && t < 1) breath = Math.sin(Math.PI * t) ** 2;
        arrived = since < nameSeconds;
        if (since >= Math.max(nameSeconds, pulseDelay + pulseSeconds)) {
          item.arrivedAt = null;
        }
        busy = true;
      }

      const isLit =
        arrived ||
        highlightedIds.has(id) ||
        this.edgeEnds.has(id) ||
        (lit?.has(id) ?? false) ||
        // A relation standing behind the record under the pointer is what
        // the reader has just asked for: it is lit, not dimmed away with the
        // rest of the background, or it arrives unreadable.
        (this.view === "page" &&
          hoveredId != null &&
          this.relationOf.get(id) === hoveredId);
      const hop = role === "background" ? (focus?.hops.get(id) ?? null) : null;
      item.level = role === "background" ? levelOfHop(hop) : 0;
      item.fog = this.fogAt(item.pos);
      // The page view's trail is chrome above the selection, not part of the
      // plane: it is drawn as small and as quiet as a node one step behind,
      // though it stands on the plane and so keeps its name and its ring.
      const onTrail = focus?.trail.has(id) ?? false;
      // A masked node is see-through rather than blended into the ground:
      // it keeps its colour, and the opacity is what sets it back.
      item.mask = approach(item.mask, masking && !isLit ? 1 : 0);
      item.alpha = 1 - item.mask * (1 - maskOpacity);
      const dimTarget = highlighting
        ? isLit
          ? 0
          : DIM_HIGHLIGHT
        : masking
          ? 0
          : lit
            ? isLit
              ? 0
              : role === "background"
                ? this.backgroundDim(hop)
                : onTrail
                  ? this.backgroundDim(TRAIL_HOP)
                  : 1
            : 0;
      item.dim = approach(item.dim, dimTarget);
      item.hover = approach(item.hover, id === hoveredId ? 1 : 0);
      item.size = approach(
        item.size,
        role === "background"
          ? this.levelSize(hop)
          : onTrail
            ? this.levelSize(TRAIL_HOP)
            : role === "centre" && this.seatedView(focus)
              ? this.nodeCentreSize(item.node.tier)
              : 1,
      );

      const grown = easeOutCubic(item.appear);
      item.scale =
        this.radius(item.node.tier) *
        item.size *
        grown *
        (1 + 0.18 * item.hover) *
        (1 + ARRIVAL_PULSE.swell * breath);

      // Its family's shape (decision 135), held at its tilt against the
      // camera so it reads the same from wherever the reader looks.
      const shape = this.shapeOf(item);
      const spec = this.shapes[shape];
      scaleVector.setScalar(Math.max(item.scale, 1e-4));
      matrix.compose(
        item.pos,
        shape === "sphere"
          ? identity
          : tiltedQuaternion.copy(camera.quaternion).multiply(spec.tilt),
        scaleVector,
      );
      const solid = item.alpha > MASK_SOLID;
      const into = solid ? this.shapeMeshes[shape] : this.maskedMeshes[shape];
      const at = solid ? drawn[shape] : maskedDrawn[shape];
      into.setMatrixAt(at, matrix);
      const sphere = mixToward(
        sphereColor,
        this.baseColor(item.node, palette),
        palette.background,
        item.dim * DIM_NODE,
      );
      // Stepped levels give up colour a step at a time; the fog then takes
      // what is left toward the ground by depth.
      const desaturate = this.levelDesaturation(item.level);
      if (desaturate > 0) {
        const grey = 0.2126 * sphere.r + 0.7152 * sphere.g + 0.0722 * sphere.b;
        sphere.lerp(colorC.setRGB(grey, grey, grey), desaturate);
      }
      if (item.fog > 0) sphere.lerp(palette.background, item.fog);
      into.setColorAt(at, sphere);
      if (solid) drawn[shape]++;
      else {
        this.maskAlphas[shape].setX(at, item.alpha);
        maskedDrawn[shape]++;
      }
      this.slotIds[slot] = id;
      slot++;

      // Status is a plane matter (decision 117): behind the focus plane a
      // node wears no ring. It is shrunk inside its sphere on the way out,
      // never faded to the ground colour, which would still be an opaque
      // annulus cutting whatever lies behind it.
      item.ringMix = approach(item.ringMix, role === "background" ? 0 : 1);
      if (this.ringed(item.node) && item.ringMix > 0.01) {
        scaleVector.setScalar(
          Math.max(
            item.scale * (0.6 + 0.4 * item.ringMix) * this.ringScale(item),
            1e-4,
          ),
        );
        matrix.compose(item.pos, camera.quaternion, scaleVector);
        this.ringsMesh.setMatrixAt(rings, matrix);
        const status =
          item.node.status === "ok"
            ? palette.success
            : item.node.status === "waiting"
              ? palette.warning
              : palette.destructive;
        mixToward(colorA, status, palette.background, item.dim * DIM_NODE);
        if (item.fog > 0) colorA.lerp(palette.background, item.fog);
        if (item.alpha < 1) colorA.lerp(palette.background, 1 - item.alpha);
        this.ringsMesh.setColorAt(rings, colorA);
        rings++;
      }

      toCamera.subVectors(camera.position, item.pos);
      const distance = toCamera.length();
      toCamera.divideScalar(distance || 1);
      const px =
        this.worldPerPx *
        Math.max(-toCamera.dot(forward) * distance, camera.near);

      // The icon, on the sphere's camera-facing side, inked in whichever of
      // the two glyph colours stands out more from the sphere, and softened
      // toward the sphere as the node dims. Too small to read, it fades out.
      const atlas = this.atlas;
      const cell = atlas?.cell.get(item.icon);
      if (
        atlas &&
        this.config.nodes.icons &&
        cell != null &&
        icons < NODE_CAPACITY
      ) {
        const radiusPx = item.scale / px;
        const shown =
          grown *
          clamp01(
            (radiusPx - ICON_SHOW_PX[0]) / (ICON_SHOW_PX[1] - ICON_SHOW_PX[0]),
          );
        if (shown > 0.01) {
          // Along the ray to the camera, far enough that the quad is nearer
          // in view depth than every point of the sphere. Off the view axis,
          // a quad only a radius along the ray sits behind the sphere's
          // front, and the sphere cuts the glyph's outer side away.
          const along =
            (item.scale * spec.bound * 1.06) /
            Math.max(0.5, -toCamera.dot(forward));
          scratch.copy(item.pos).addScaledVector(toCamera, along);
          scaleVector.setScalar(item.scale * this.config.nodes.iconSize);
          matrix.compose(scratch, camera.quaternion, scaleVector);
          this.iconsMesh.setMatrixAt(icons, matrix);
          const ink =
            contrast(palette.glyphLight, sphere) >=
            contrast(palette.glyphDark, sphere)
              ? palette.glyphLight
              : palette.glyphDark;
          mixToward(colorA, ink, sphere, item.dim * 0.3 + item.fog * 0.5);
          this.iconsMesh.setColorAt(icons, colorA);
          const column = cell % atlas.columns;
          const row = Math.floor(cell / atlas.columns);
          this.iconCells.setXYZ(
            icons,
            column / atlas.columns,
            1 - (row + 1) / atlas.rows,
            shown * item.alpha,
          );
          icons++;
        }
      }

      // Labels: the backbone always, deeper tiers as their sphere grows on
      // screen, anything the reader is pointing at or has focused regardless.
      // Collisions are settled afterwards, across every label at once.
      // In a focus the plane's names always show, on the side the
      // arrangement cleared for them. Behind it, the backbone one link
      // further out keeps its name, smaller; anything deeper shows its name
      // when pointed at.
      const pointed = id === hoveredId || id === focusedId;
      const emphasised = pointed || isLit;
      const onPlane = role === "centre" || role === "neighbour";
      item.labelEmphasis = emphasised;
      item.labelPriority =
        pointed || onPlane
          ? 0
          : emphasised
            ? 1
            : item.node.tier <= 1
              ? item.node.tier + 1
              : this.revealed.has(id)
                ? 4
                : item.node.tier + 3;
      item.labelPx = px;
      if (item.leaving || hidden) item.labelBase = 0;
      else if (onPlane) item.labelBase = 1;
      else if (role === "background") {
        // In the page view the tree is already open, so the step behind the
        // plane is named whatever its tier and the step past that is not
        // named at all: three columns of type is what made the old view a
        // hairball.
        item.labelBase =
          emphasised ||
          (focus?.view === "page"
            ? // The trail is named however far back it runs: it is what the
              // reader walked through, and an unnamed dot says nothing.
              hop === 2 || onTrail
            : namedBehind(hop, item.node, this.config.labels.backgroundNames))
            ? 1
            : 0;
      } else if (emphasised || item.node.tier <= 1) item.labelBase = 1;
      else if (lit && !highlighting) item.labelBase = 0;
      else if (this.revealed.has(id)) item.labelBase = 1;
      else {
        const radiusPx = this.radius(item.node.tier) / px;
        item.labelBase = clamp01(
          (radiusPx - LABEL_SHOW_PX[0]) / (LABEL_SHOW_PX[1] - LABEL_SHOW_PX[0]),
        );
      }
    }
    for (const id of gone) this.removeItem(id);

    this.slotIds.length = slot;
    for (const shape of NODE_SHAPES) {
      const mesh = this.shapeMeshes[shape];
      mesh.count = drawn[shape];
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      const masked = this.maskedMeshes[shape];
      masked.count = maskedDrawn[shape];
      if (masked.count === 0) continue;
      masked.instanceMatrix.needsUpdate = true;
      if (masked.instanceColor) masked.instanceColor.needsUpdate = true;
      this.maskAlphas[shape].needsUpdate = true;
    }
    this.ringsMesh.count = rings;
    this.ringsMesh.instanceMatrix.needsUpdate = true;
    if (this.ringsMesh.instanceColor)
      this.ringsMesh.instanceColor.needsUpdate = true;
    this.iconsMesh.count = icons;
    this.iconsMesh.instanceMatrix.needsUpdate = true;
    if (this.iconsMesh.instanceColor)
      this.iconsMesh.instanceColor.needsUpdate = true;
    this.iconCells.needsUpdate = true;

    const focused = focusedId ? this.items.get(focusedId) : undefined;
    if ((focusedId ?? null) !== this.ringOn) {
      this.ringOn = focusedId ?? null;
      this.ringGrowth = 0;
    }
    this.ringGrowth = fade(this.ringGrowth, focused ? 1 : 0);
    this.focusRing.visible = focused != null && this.ringGrowth > 0.01;
    if (focused) {
      scaleVector.setScalar(
        Math.max(
          focused.scale *
            (0.72 + 0.28 * easeOutCubic(this.ringGrowth)) *
            this.ringScale(focused),
          1e-4,
        ),
      );
      this.focusRing.position.copy(focused.pos);
      this.focusRing.quaternion.copy(camera.quaternion);
      this.focusRing.scale.copy(scaleVector);
    }

    this.drawEdges(palette, fade);
    this.drawLevelPlanes(camera, palette, width, height, fade);
    this.drawLanePlates(camera, palette, width, height, approach, fade);
    this.drawLaneCaptions(camera, palette, approach, fade);
    this.drawFloor(palette, fade);
    this.placeLabels(camera, palette, width, height, fade);
    return busy;
  }

  private drawEdges(
    palette: Palette,
    fade: (from: number, to: number) => number,
  ): void {
    const { hoveredEdgeId } = this.emphasis;
    for (const batch of this.thin) batch.begin();
    for (const batch of this.heavy) batch.begin();
    this.dashed.begin();
    const fg = palette.foreground;
    const stepped = this.config.depth.steppedLevels;
    const bg = palette.background;
    const { foregroundOpacity, backgroundOpacity } = this.config.links;

    for (const edge of this.edges) {
      const a = this.items.get(edge.source);
      const b = this.items.get(edge.target);
      if (!a || !b) continue;
      const dim = Math.max(a.dim, b.dim);
      const appear = Math.min(a.appear, b.appear);
      const hovered = edge.id === hoveredEdgeId;
      const kind = linkClassOf(edge);
      const base = kind === "emphasis" ? (hovered ? 0 : 0.52) : 0.7;
      // On a dark ground a line reads brighter than the same mix on white.
      const ground = palette.dark ? Math.min(0.92, base + 0.1) : base;
      let toward = 1 - (1 - ground) * (1 - dim * 0.8) * appear;
      // In a focus the centre's own edges carry the picture, drawn a step
      // firmer than in the story; every other edge is graded by how far out
      // it runs. An edge taking up or giving up the spoke drawing eases into
      // it rather than switching.
      const spoke = fade(
        this.spokeMix.get(edge.id) ?? 0,
        this.focus?.spokes.has(edge.id) ? 1 : 0,
      );
      if (spoke > 0) this.spokeMix.set(edge.id, spoke);
      else this.spokeMix.delete(edge.id);
      if (this.focusMix > 0) {
        const grade = this.focus
          ? edgeGrade(this.hopOf(edge.source), this.hopOf(edge.target))
          : 2;
        const quiet = this.quietEdge(palette.dark, grade);
        let settled = Math.max(toward, quiet);
        if (backgroundOpacity !== 100) {
          settled = 1 - clamp01(((1 - settled) * backgroundOpacity) / 100);
        }
        toward += (settled - toward) * this.focusMix;
      }
      if (spoke > 0) {
        const strength =
          foregroundOpacity === 100
            ? 1 - ground * 0.8
            : Math.min(1, ((1 - ground * 0.8) * foregroundOpacity) / 100);
        toward += (1 - strength * appear - toward) * spoke;
      }
      // A link to a masked node is as see-through as its node. Lines are
      // drawn solid, so on a flat ground the opacity is a blend toward it.
      const see = hovered ? 1 : Math.min(a.alpha, b.alpha);
      if (see < 1) toward = 1 - (1 - toward) * see;
      mixToward(colorA, fg, bg, hovered ? 0 : toward);
      // A link draws at the weight of its farther end's level, and fades
      // along its length with the fog at each end (decision 136). A spoke
      // keeps the plane's weight whatever its far end.
      const level =
        stepped && !hovered && spoke <= 0 ? Math.max(a.level, b.level) : 0;
      const fogA = hovered ? 0 : a.fog;
      const fogB = hovered ? 0 : b.fog;
      mixToward(colorB, colorA, bg, fogA);
      mixToward(colorC, colorA, bg, fogB);
      const batch = kind === "emphasis" ? this.heavy[level] : this.thin[level];
      batch.push(a.pos, b.pos, colorB, colorC);
    }

    this.drawCrossLinks(palette, fade);

    // A folding node keeps a line to where it is going.
    for (const item of this.items.values()) {
      if (!item.leaving || !item.node.parentId) continue;
      const anchor = this.items.get(item.node.parentId);
      if (!anchor) continue;
      mixToward(colorA, fg, bg, 1 - 0.3 * item.appear);
      this.thin[0].push(anchor.pos, item.pos, colorA);
    }

    for (const batch of this.thin) batch.end();
    for (const batch of this.heavy) batch.end();
    this.dashed.end();
  }

  /**
   * The cross-links (decision 155, `page.backgroundLinks`): the stored
   * relations the page view's tree does not draw, because there every node
   * has one parent. `hover` fades in the ones touching the node under the
   * pointer, `on` keeps them all up quietly, `off` never draws them.
   *
   * They go into the heavy batch at the plane's level, which is the emphasis
   * weight an edge touching a decision already takes, so a relation asked for
   * reads as firmly as one the model calls out. They are not hit-tested: they
   * are an answer to "what else does this touch", not a way in.
   */
  private drawCrossLinks(
    palette: Palette,
    fade: (from: number, to: number) => number,
  ): void {
    const mode = this.config.page.backgroundLinks;
    const links = this.page?.crossLinks ?? [];
    const on = this.view === "page" && this.focus != null && mode !== "off";
    if (!on && this.crossMix.size === 0) return;
    const { hoveredId } = this.emphasis;
    const fg = palette.foreground;
    const bg = palette.background;
    for (const link of links) {
      const a = this.items.get(link.source);
      const b = this.items.get(link.target);
      const touched =
        hoveredId != null &&
        (link.source === hoveredId || link.target === hoveredId);
      const target =
        !on || !a || !b
          ? 0
          : touched
            ? 1
            : mode === "on"
              ? CROSS_LINK_QUIET
              : 0;
      const mix = fade(this.crossMix.get(link.id) ?? 0, target);
      if (mix <= 0.01) {
        this.crossMix.delete(link.id);
        continue;
      }
      this.crossMix.set(link.id, mix);
      if (!a || !b) continue;
      const appear = Math.min(a.appear, b.appear);
      mixToward(colorA, fg, bg, 1 - CROSS_LINK_INK * mix * appear);
      this.heavy[0].push(a.pos, b.pos, colorA);
    }
  }

  // ------------------------------------------------------------ depth cues

  /**
   * Level planes (decision 136): at each level behind the focus plane, a
   * hairline frame round its nodes at their depth, square to the plane, a
   * tint of a few percent inside it, and the level's caption at its top-left
   * corner. They follow the nodes as they move.
   */
  private drawLevelPlanes(
    camera: PerspectiveCamera,
    palette: Palette,
    width: number,
    height: number,
    fade: (from: number, to: number) => number,
  ): void {
    this.planeLines.begin();
    const focus = this.focus;
    const on = this.config.depth.levelPlanes && focus != null;
    const fg = palette.foreground;
    const bg = palette.background;
    for (const level of [1, 2, 3] as const) {
      const tint = this.planeTints[level - 1];
      const caption = this.levelLabels.get(String(level));
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      let depth = 0;
      let count = 0;
      if (on && focus) {
        for (const [id, item] of this.items) {
          if (
            item.leaving ||
            item.level !== level ||
            item.appear < 0.3 ||
            focus.hidden.has(id) ||
            focus.roles.get(id) !== "background"
          )
            continue;
          scratch.subVectors(item.pos, focus.origin);
          const x = scratch.dot(focus.right);
          const y = scratch.dot(focus.up);
          const r = item.scale * this.shapeReach(item);
          depth -= scratch.dot(focus.normal);
          count++;
          // The frame takes in the name and caption where they show, in
          // pixels off the node, turned into plane units once the depth is
          // known.
          let [toLeft, toRight, toBelow, toAbove] = [r, r, r, r];
          const rect = item.label > 0.5 ? item.labelRect : null;
          if (rect && item.labelPx > 0) {
            scratch.copy(item.pos).project(camera);
            const sx = ((scratch.x + 1) / 2) * width;
            const sy = ((1 - scratch.y) / 2) * height;
            const unit = item.labelPx;
            toLeft = Math.max(toLeft, (sx - rect.x0) * unit);
            toRight = Math.max(toRight, (rect.x1 - sx) * unit);
            toAbove = Math.max(toAbove, (sy - rect.y0) * unit);
            toBelow = Math.max(toBelow, (rect.y1 - sy) * unit);
          }
          minX = Math.min(minX, x - toLeft);
          maxX = Math.max(maxX, x + toRight);
          minY = Math.min(minY, y - toBelow);
          maxY = Math.max(maxY, y + toAbove);
        }
      }
      const mix = (this.planeMix[level] = fade(
        this.planeMix[level],
        count > 0 ? this.focusMix : 0,
      ));
      if (!focus || count === 0 || mix <= 0.01) {
        tint.visible = false;
        if (caption) caption.visible = false;
        continue;
      }
      depth /= count;
      // Clear space round the nodes, a fixed size on screen at this depth.
      const at = corner
        .copy(focus.origin)
        .addScaledVector(focus.normal, -depth)
        .sub(camera.position)
        .dot(forward);
      const pxHere = this.worldPerPx * Math.max(at, camera.near);
      const pad = PLANE_PAD_PX * pxHere;
      minX -= pad;
      maxX += pad;
      minY -= pad;
      maxY += pad;
      const point = (x: number, y: number, out: Vector3) =>
        out
          .copy(focus.origin)
          .addScaledVector(focus.right, x)
          .addScaledVector(focus.up, y)
          .addScaledVector(focus.normal, -depth);
      const fog = this.fogAt(point(minX, minY, corner)) * 0.5;
      mixToward(colorA, fg, bg, 1 - PLANE_FRAME * mix);
      colorA.lerp(bg, fog);
      const corners = [
        [minX, minY],
        [maxX, minY],
        [maxX, maxY],
        [minX, maxY],
      ] as const;
      corners.forEach(([x, y], i) => {
        const [nx, ny] = corners[(i + 1) % 4];
        this.planeLines.push(
          point(x, y, corner),
          point(nx, ny, cornerB),
          colorA,
        );
      });

      tint.visible = true;
      point((minX + maxX) / 2, (minY + maxY) / 2, tint.position);
      planeMatrix.makeBasis(focus.right, focus.up, focus.normal);
      tint.quaternion.setFromRotationMatrix(planeMatrix);
      tint.scale.set(maxX - minX, maxY - minY, 1);
      (tint.material as MeshBasicMaterial).opacity =
        PLANE_TINT * mix * (1 - fog);

      if (!caption) continue;
      caption.visible = true;
      point(minX, maxY, caption.position).addScaledVector(up, 3 * pxHere);
      caption.quaternion.copy(camera.quaternion);
      caption.scale.setScalar(PLANE_LABEL_PX * pxHere);
      caption.fillOpacity = mix;
      caption.outlineOpacity = mix * HALO_OPACITY;
      caption.outlineColor.copy(bg);
      mixToward(caption.color, palette.muted, bg, fog);
    }
    this.planeLines.end();
  }

  /**
   * The lane captions (decision 153): the reading's group titles, each at the
   * top left of its lane on the front plane, in the quiet ink every caption
   * takes. A walk re-reads the record, so the lanes change; a caption eases to
   * where its new lane starts rather than jumping there.
   */
  private drawLaneCaptions(
    camera: PerspectiveCamera,
    palette: Palette,
    approach: (from: number, to: number) => number,
    fade: (from: number, to: number) => number,
  ): void {
    const marks = this.focus?.laneMarks ?? EMPTY_MARKS;
    for (const [key, mesh] of this.laneLabels) {
      const target = marks.get(key);
      const showing = fade(this.laneTitleMix.get(key) ?? 0, this.laneRead(key));
      this.laneTitleMix.set(key, showing);
      if (!target || this.focusMix <= 0.01 || showing <= 0.01) {
        mesh.visible = false;
        if (!target) {
          this.laneAt.delete(key);
          this.laneTitleMix.delete(key);
        }
        continue;
      }
      let at = this.laneAt.get(key);
      if (!at) {
        at = target.clone();
        this.laneAt.set(key, at);
      } else {
        at.set(
          approach(at.x, target.x),
          approach(at.y, target.y),
          approach(at.z, target.z),
        );
      }
      const px =
        this.worldPerPx *
        Math.max(
          scratch.subVectors(at, camera.position).dot(forward),
          camera.near,
        );
      const opacity = this.focusMix * showing;
      mesh.visible = true;
      mesh.position.copy(at);
      mesh.quaternion.copy(camera.quaternion);
      mesh.scale.setScalar(PAGE_LANE_PX * px);
      mesh.fillOpacity = opacity;
      mesh.outlineOpacity = opacity * HALO_OPACITY;
      mesh.outlineColor.copy(palette.background);
      mesh.color.copy(palette.muted);
    }
  }

  /**
   * Whether a lane's title is up: always where the groups read as text, and
   * otherwise only while the reader is on that group, by pointing at one of
   * its nodes or at its slab (decision 155). A group is a shape first and a
   * word second; the word answers "what is this row of things" on demand.
   */
  private laneRead(key: string): number {
    if (this.view !== "page") return 1;
    if (this.config.page.groups === "text") return 1;
    const { hoveredId } = this.emphasis;
    if (hoveredId && this.focus?.laneOf.get(hoveredId) === key) return 1;
    const rect = this.plateRects.get(key);
    const at = this.pointer;
    if (!rect || !at) return 0;
    const inside =
      at.x >= rect.x0 && at.x <= rect.x1 && at.y >= rect.y0 && at.y <= rect.y1;
    return inside ? 1 : 0;
  }

  /**
   * The lane plates (decision 155): behind each group of the front plane a
   * translucent slab with rounded corners and a faint border, laid a little
   * behind the plane so its nodes stand off it. The slab is what says "these
   * belong together", in place of a caption over every lane; the title comes
   * back under the pointer.
   *
   * A slab eases to its new box as the reader walks, so a lane that grows or
   * shrinks stretches rather than jumping, and its rectangle on the canvas is
   * kept for the pointer test above.
   */
  private drawLanePlates(
    camera: PerspectiveCamera,
    palette: Palette,
    width: number,
    height: number,
    approach: (from: number, to: number) => number,
    fade: (from: number, to: number) => number,
  ): void {
    const focus = this.focus;
    const plates =
      focus && this.view === "page" ? focus.lanePlates : EMPTY_PLATES;
    this.plateRects.clear();
    for (const key of [...this.plateAt.keys()]) {
      if (!plates.has(key)) this.plateAt.delete(key);
    }
    let used = 0;
    if (focus && plates.size > 0) {
      planeMatrix.makeBasis(focus.right, focus.up, focus.normal);
      for (const [key, target] of plates) {
        let at = this.plateAt.get(key);
        if (!at) {
          at = {
            centre: target.centre.clone(),
            width: target.width,
            height: target.height,
          };
          this.plateAt.set(key, at);
        } else {
          at.centre.set(
            approach(at.centre.x, target.centre.x),
            approach(at.centre.y, target.centre.y),
            approach(at.centre.z, target.centre.z),
          );
          at.width = approach(at.width, target.width);
          at.height = approach(at.height, target.height);
        }
        const mix = fade(this.plateMix.get(key) ?? 0, this.focusMix);
        this.plateMix.set(key, mix);
        const mesh = this.plate(used++);
        const { uniforms } = mesh.material;
        mesh.visible = mix > 0.01;
        mesh.position.copy(at.centre);
        mesh.quaternion.setFromRotationMatrix(planeMatrix);
        mesh.scale.set(at.width, at.height, 1);
        uniforms.uSize.value.set(at.width, at.height);
        // The surface and its edge are the foreground token at two low
        // alphas: over the light ground that lands on the muted surface, over
        // the dark one a step lighter than it, with no second token to hold
        // in step with the theme.
        uniforms.uFill.value.copy(palette.foreground);
        uniforms.uLine.value.copy(palette.foreground);
        uniforms.uFillOpacity.value =
          (palette.dark ? PLATE_FILL_DARK : PLATE_FILL) * mix;
        uniforms.uLineOpacity.value = PLATE_LINE * mix;
        // Where it lands on the canvas, for the pointer test that titles it.
        this.plateRects.set(key, screenRect(at, focus, camera, width, height));
      }
    }
    for (let i = used; i < this.plates.length; i++) {
      this.plates[i].visible = false;
    }
  }

  /** The slab at this index, made and added to the scene the first time. */
  private plate(index: number): PlateMesh {
    let mesh = this.plates[index];
    if (!mesh) {
      mesh = buildPlate();
      this.plates[index] = mesh;
      this.root.add(mesh);
    }
    return mesh;
  }

  /**
   * Drop lines to a floor (decision 136): a faint grid under the graph, level
   * with the focus plane's bottom and running back through its depth, and a
   * thin line from every node straight down to it, as a 3D scatter chart
   * draws them.
   */
  private drawFloor(
    palette: Palette,
    fade: (from: number, to: number) => number,
  ): void {
    this.floorLines.begin();
    const focus = this.focus;
    this.floorMix = fade(
      this.floorMix,
      this.config.depth.floorLines && focus ? this.focusMix : 0,
    );
    if (!focus || this.floorMix <= 0.01) {
      this.floorLines.end();
      return;
    }
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    let maxZ = 0;
    const shown: Item[] = [];
    for (const [id, item] of this.items) {
      if (item.leaving || item.appear < 0.3 || focus.hidden.has(id)) continue;
      scratch.subVectors(item.pos, focus.origin);
      const x = scratch.dot(focus.right);
      const y = scratch.dot(focus.up) - item.scale;
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
      maxZ = Math.max(maxZ, -scratch.dot(focus.normal));
      shown.push(item);
    }
    if (shown.length === 0) {
      this.floorLines.end();
      return;
    }
    const fg = palette.foreground;
    const bg = palette.background;
    const floorY = minY - Math.max(1.5, (maxY - minY) * 0.06);
    const cell = niceStep(Math.max(maxX - minX, 1) / FLOOR_CELLS);
    const x0 = Math.floor(minX / cell - 1) * cell;
    const x1 = Math.ceil(maxX / cell + 1) * cell;
    const z0 = -cell;
    const z1 = Math.ceil(maxZ / cell + 1) * cell;
    const point = (x: number, y: number, z: number, out: Vector3) =>
      out
        .copy(focus.origin)
        .addScaledVector(focus.right, x)
        .addScaledVector(focus.up, y)
        .addScaledVector(focus.normal, -z);
    const line = (a: Vector3, b: Vector3, strength: number) => {
      mixToward(colorA, fg, bg, 1 - strength * this.floorMix);
      mixToward(colorB, colorA, bg, this.fogAt(a));
      mixToward(colorC, colorA, bg, this.fogAt(b));
      this.floorLines.push(a, b, colorB, colorC);
    };
    for (let x = x0, n = 0; x <= x1 + 1e-6 && n < 80; x += cell, n++) {
      line(
        point(x, floorY, z0, corner),
        point(x, floorY, z1, cornerB),
        FLOOR_GRID,
      );
    }
    for (let z = z0, n = 0; z <= z1 + 1e-6 && n < 80; z += cell, n++) {
      line(
        point(x0, floorY, z, corner),
        point(x1, floorY, z, cornerB),
        FLOOR_GRID,
      );
    }
    for (const item of shown) {
      scratch.subVectors(item.pos, focus.origin);
      const x = scratch.dot(focus.right);
      const z = -scratch.dot(focus.normal);
      corner.copy(item.pos).addScaledVector(focus.up, -item.scale);
      line(corner, point(x, floorY, z, cornerB), FLOOR_DROP * item.appear);
    }
    this.floorLines.end();
  }

  // ------------------------------------------------------------------ labels

  /**
   * Show the labels that fit. Every candidate is measured in screen pixels
   * and placed in priority order (what the reader is pointing at, the
   * backbone, decisions, then deeper tiers; among equals whatever is already
   * showing, then the nearest), and a label that would overlap one already
   * placed fades out instead of printing over it. Labels only ever fade, so
   * an orbit that changes who wins a spot reads as a soft hand-over.
   */
  private placeLabels(
    camera: PerspectiveCamera,
    palette: Palette,
    width: number,
    height: number,
    approach: (from: number, to: number) => number,
  ): void {
    const candidates: LabelCandidate[] = [];
    const fg = palette.foreground;
    const bg = palette.background;
    const { hoveredEdgeId } = this.emphasis;
    const focus = this.focus;

    // Every sphere on screen, rings included: a name that is not placed by
    // the arrangement keeps its halo off every sphere but its own.
    const discs: Disc[] = [];
    for (const [id, item] of this.items) {
      if (item.appear < 0.3 || item.labelPx <= 0) continue;
      scratch.copy(item.pos).project(camera);
      if (Math.abs(scratch.z) > 1) continue;
      discs.push({
        id,
        x: ((scratch.x + 1) / 2) * width,
        y: ((1 - scratch.y) / 2) * height,
        r: (item.scale * this.ringReach(id, item)) / item.labelPx,
      });
    }

    for (const [id, item] of this.items) {
      const label = this.labels.get(id);
      if (!label) continue;
      const forced = focus?.labelSides.get(id);
      const role = focus?.roles.get(id);
      // On the plane only the centre keeps its hidden count: the ring is
      // for names, and the panel says what a neighbour holds. The page view
      // prints a state phrase in that slot instead, on the selection and on
      // every node of the front plane, because that phrase is what the
      // reading's row said and what a walk would otherwise be needed to learn.
      const countMesh = this.counts.get(id);
      // `nodes.detailLine` puts a detail there on every lit node too.
      const carries =
        focus?.view === "page"
          ? role === "centre" || (role === "neighbour" && !focus.trail.has(id))
          : !(focus && focus.id !== id) ||
            (this.config.nodes.detailLine && (this.lit?.has(id) ?? false));
      item.countMix = approach(item.countMix, countMesh && carries ? 1 : 0);
      const count = countMesh && item.countMix > 0.01 ? countMesh : undefined;
      // A label laid out to sit above its count, printed without one,
      // drops half a line to centre on its node: as the count fades.
      const drop = countMesh ? -0.6 * (1 - item.countMix) : 0;
      if (countMesh && !count) countMesh.visible = false;
      // The type caption (decision 135) rides above the name, whenever the
      // name shows.
      const caption = this.captionsOn() ? this.captions.get(id) : undefined;
      scratch.copy(item.pos).project(camera);
      let base = Math.abs(scratch.z) <= 1 ? item.labelBase : 0;
      if (base <= 0 && item.label <= 0) {
        label.visible = false;
        if (count) count.visible = false;
        if (caption) caption.visible = false;
        continue;
      }
      const sx = ((scratch.x + 1) / 2) * width;
      const sy = ((1 - scratch.y) / 2) * height;
      // Close up, where a sphere is large on screen, its type grows a little
      // with it, up to a limit, so a name does not look lost beside its node.
      const boost = labelBoost(this.radius(item.node.tier) / item.labelPx);
      const behind = role === "background" && !item.labelEmphasis;
      item.nameScale = approach(
        item.nameScale,
        behind
          ? this.levelLabelScale(item.level)
          : this.seatedView(focus) && focus?.id === id
            ? NODE_CENTRE_LABEL
            : focus?.trail.has(id)
              ? this.levelLabelScale(1)
              : 1,
      );
      const fontPx = this.labelPx(item.node.tier) * boost * item.nameScale;
      const labelW = textWidth(label, fontPx, item.node.label.length);
      const countPx = this.countPx();
      const countW = count
        ? textWidth(count, countPx * boost, underChars(count))
        : 0;
      // A name clears whatever ring its node wears, the focus ring included.
      const radiusPx = (item.scale * this.ringReach(id, item)) / item.labelPx;
      const captionPx = this.captionPx(fontPx);
      const captionW = caption
        ? textWidth(caption, captionPx, caption.text?.length ?? 12)
        : 0;
      const captionH = caption ? captionPx * 1.2 + CAPTION_GAP_PX : 0;
      const w = Math.max(labelW, countW, captionW);
      // The label block around its anchor: above it the name, and its
      // caption over that, below it the hidden count when there is one.
      const counted = count != null && item.countMix > 0.5;
      const top = (counted ? fontPx * 1.15 : fontPx * 0.6) + captionH;
      const bottom = counted ? countPx * boost * 1.2 : fontPx * 0.6;
      // Anchor offsets from the node's centre in pixels (y up), by side.
      const offsets: readonly [number, number][] = [
        [radiusPx + LABEL_GAP_PX, 0],
        [-(radiusPx + LABEL_GAP_PX + w), 0],
        [-w / 2, -(radiusPx + 2 + top)],
        [-w / 2, radiusPx + 2 + bottom],
      ];
      const rects = offsets.map(([dx, dy]): Rect => ({
        x0: sx + dx,
        x1: sx + dx + w,
        y0: sy - dy - top,
        y1: sy - dy + bottom,
      }));
      // A name behind the plane, while hidden or dipped mid-flight, takes the
      // side facing away from the centre, where the fan it sits in has room,
      // unless that side runs off the canvas.
      if (behind && (item.label <= 0.02 || item.flight > 0.5) && focus) {
        const centre = this.items.get(focus.id);
        if (centre) {
          scratchB.copy(centre.pos).project(camera);
          const outward = scratch.x >= scratchB.x ? 0 : 1;
          // The canvas as the focus measured it: the renderer hears about
          // the side panel that opened with the focus a few frames late.
          const fits =
            rects[outward].x0 >= 0 &&
            rects[outward].x1 <= Math.min(width, focus.viewWidth);
          item.labelSide = fits ? outward : 1 - outward;
        }
      }
      const order = LABEL_SIDES[item.labelSide];
      if (forced != null && base > 0) {
        // A name the ring wants on its other side fades out where it is
        // first, then fades back in there: it never jumps across its node.
        if (item.labelSide !== forced && item.label > 0.05) base = 0;
        else item.labelSide = forced;
      }
      candidates.push({
        base,
        priority: item.labelPriority,
        showing: item.label > 0.5,
        depth: scratch.z,
        owners: [id],
        // A visible label keeps its side and fades if that side is taken; it
        // may come back somewhere else once it has faded, never jump.
        rects:
          item.label > 0.3 || (forced != null && base > 0)
            ? [rects[item.labelSide]]
            : order.map((i) => rects[i]),
        apply: (target, rect) => {
          if (rect) item.labelSide = rects.indexOf(rect);
          item.labelRect = rects[item.labelSide];
          item.label = approach(item.label, target);
          // A name in flight dips rather than streaking across others.
          // A name behind the plane goes back with its node's fog, a little
          // less than the node, unless the reader is pointing at it.
          const fog = item.labelEmphasis ? 0 : item.fog;
          const opacity =
            item.label *
            easeOutCubic(item.appear) *
            (1 - 0.85 * item.flight) *
            (1 - FOG_LABEL_OPACITY * fog) *
            (item.labelEmphasis ? 1 : item.alpha);
          const dim = item.labelEmphasis ? 0 : item.dim;
          const px = item.labelPx;
          label.visible = opacity > 0.02;
          if (count) count.visible = label.visible;
          if (caption) caption.visible = label.visible;
          if (!label.visible) return;
          const [dx, dy] = offsets[item.labelSide];
          const nameY = dy + (count ? item.countMix : 0) + drop * fontPx;
          label.position
            .copy(item.pos)
            .addScaledVector(right, dx * px)
            .addScaledVector(up, nameY * px);
          label.quaternion.copy(camera.quaternion);
          label.scale.setScalar(fontPx * px);
          label.fillOpacity = opacity;
          label.outlineOpacity = opacity * HALO_OPACITY;
          label.outlineColor.copy(bg);
          mixToward(
            label.color,
            // The Node view's selection reads in full ink, whatever its tier.
            item.node.tier >= 3 && !(this.seatedView(focus) && focus?.id === id)
              ? palette.muted
              : fg,
            bg,
            dim * DIM_NODE,
          );
          if (fog > 0) label.color.lerp(bg, fog * 0.7);
          if (caption) {
            // Over the name's top edge, as troika laid the name out.
            const nameTop =
              nameY +
              (label.textRenderInfo?.blockBounds[3] ??
                (countMesh ? 1.2 : 0.6)) *
                fontPx;
            caption.position
              .copy(item.pos)
              .addScaledVector(right, dx * px)
              .addScaledVector(up, (nameTop + CAPTION_GAP_PX) * px);
            caption.quaternion.copy(camera.quaternion);
            caption.scale.setScalar(captionPx * px);
            caption.fillOpacity = opacity;
            caption.outlineOpacity = opacity * HALO_OPACITY;
            caption.outlineColor.copy(bg);
            mixToward(caption.color, palette.muted, bg, dim * DIM_NODE);
            if (fog > 0) caption.color.lerp(bg, fog * 0.7);
          }
          if (!count) return;
          count.position
            .copy(item.pos)
            .addScaledVector(right, dx * px)
            .addScaledVector(up, (dy - 1) * px);
          count.quaternion.copy(camera.quaternion);
          count.scale.setScalar(countPx * px * boost);
          count.fillOpacity = opacity * item.countMix;
          count.outlineOpacity = opacity * item.countMix * HALO_OPACITY;
          count.outlineColor.copy(bg);
          // A hidden count is quiet; a state phrase reads in its own tone,
          // which is the one coloured signal a front node carries.
          mixToward(
            count.color,
            this.stateColor(id, palette),
            bg,
            dim * DIM_NODE,
          );
        },
      });
    }

    for (const edge of this.edges) {
      const label = this.edgeLabels.get(edge.id);
      if (!label) continue;
      const a = this.items.get(edge.source);
      const b = this.items.get(edge.target);
      const alpha = this.edgeLabelAlpha.get(edge.id) ?? 0;
      if (!a || !b) {
        label.visible = false;
        continue;
      }
      const hovered = edge.id === hoveredEdgeId;
      const spoke = focus?.spokes.has(edge.id) ?? false;
      const appear = Math.min(a.appear, b.appear);
      const dim = hovered || spoke ? 0 : Math.max(a.dim, b.dim);
      const edgePx = this.edgeLabelPx();
      const w = textWidth(label, edgePx, linkTagOf(edge)?.length ?? 10);
      const nodeSpoke = spoke && focus?.view === "node";
      // A spoke's label sits past its middle, clear of the centre's name,
      // where the focus arrangement kept room for it. In the Node view it
      // sits just before the node it leads to, where the spokes have fanned
      // apart.
      let mid: Vector3;
      if (nodeSpoke && focus) {
        const [from, to] = edge.source === focus.id ? [a, b] : [b, a];
        scratch.copy(from.pos).project(camera);
        scratchB.copy(to.pos).project(camera);
        const length = Math.hypot(
          ((scratchB.x - scratch.x) / 2) * width,
          ((scratchB.y - scratch.y) / 2) * height,
        );
        const reach =
          (to.scale * this.ringReach(to.node.id, to)) /
          Math.max(to.labelPx, 1e-6);
        const along = clamp01(1 - (reach + 10 + w / 2) / Math.max(length, 1));
        mid = new Vector3().lerpVectors(from.pos, to.pos, along);
      } else {
        mid =
          spoke && focus
            ? edge.source === focus.id
              ? new Vector3().lerpVectors(a.pos, b.pos, SPOKE_LABEL_AT)
              : new Vector3().lerpVectors(b.pos, a.pos, SPOKE_LABEL_AT)
            : new Vector3().addVectors(a.pos, b.pos).multiplyScalar(0.5);
      }
      scratch.copy(mid).project(camera);
      const onScreen = Math.abs(scratch.z) <= 1;
      const shown = !this.config.links.emphasisTags
        ? hovered
        : focus
          ? hovered || spoke
          : hovered || dim < 0.5;
      const base = onScreen && shown ? appear : 0;
      if (base <= 0 && alpha <= 0) {
        label.visible = false;
        continue;
      }
      const sx = ((scratch.x + 1) / 2) * width;
      const sy = ((1 - scratch.y) / 2) * height;
      const depth = scratch.z;
      const px =
        this.worldPerPx *
        Math.max(
          scratchB.subVectors(mid, camera.position).dot(forward),
          camera.near,
        );
      const lit = hovered || (a.labelEmphasis && b.labelEmphasis && dim < 0.5);
      candidates.push({
        base,
        // In the Node view a tag gives way to the names in the columns.
        priority: hovered || (spoke && !nodeSpoke) ? 0 : spoke || lit ? 1 : 3,
        showing: alpha > 0.5,
        depth,
        owners: [edge.source, edge.target],
        rects: [
          {
            x0: sx - w / 2,
            x1: sx + w / 2,
            y0: sy - 3 - edgePx * 1.2,
            y1: sy - 3,
          },
        ],
        apply: (target) => {
          const next = approach(alpha, target);
          this.edgeLabelAlpha.set(edge.id, next);
          label.visible = next > 0.02;
          if (!label.visible) return;
          label.position.copy(mid).addScaledVector(up, 3 * px);
          label.quaternion.copy(camera.quaternion);
          label.scale.setScalar(edgePx * px);
          const shown = next * (1 - 0.85 * Math.max(a.flight, b.flight));
          label.fillOpacity = shown;
          label.outlineOpacity = shown * HALO_OPACITY;
          label.outlineColor.copy(bg);
          mixToward(
            label.color,
            hovered ? fg : palette.muted,
            bg,
            dim * DIM_NODE,
          );
        },
      });
    }

    candidates.sort(
      (x, y) =>
        x.priority - y.priority ||
        Number(y.showing) - Number(x.showing) ||
        x.depth - y.depth,
    );
    const placed: Rect[] = [];
    const free = (rect: Rect, owners: readonly string[]) =>
      !placed.some(
        (other) =>
          rect.x0 < other.x1 + LABEL_PAD_PX &&
          rect.x1 + LABEL_PAD_PX > other.x0 &&
          rect.y0 < other.y1 + LABEL_PAD_PX &&
          rect.y1 + LABEL_PAD_PX > other.y0,
      ) &&
      !discs.some((disc) => {
        if (owners.includes(disc.id)) return false;
        const dx = disc.x - Math.min(Math.max(disc.x, rect.x0), rect.x1);
        const dy = disc.y - Math.min(Math.max(disc.y, rect.y0), rect.y1);
        const reach = disc.r + LABEL_SPHERE_PAD_PX;
        return dx * dx + dy * dy < reach * reach;
      });
    for (const candidate of candidates) {
      if (candidate.base <= 0) {
        candidate.apply(0, null);
        continue;
      }
      const rect =
        candidate.priority === 0
          ? candidate.rects[0]
          : candidate.rects.find((option) => free(option, candidate.owners));
      if (rect) placed.push(rect);
      candidate.apply(rect ? candidate.base : 0, rect ?? null);
    }
  }

  // ----------------------------------------------------------------- picking

  /**
   * What is under a point on the canvas, in canvas pixels. Spheres are hit
   * by their projected disc (and their label), nearest to the camera first;
   * decision edges by distance to their projected segment. Done in screen
   * space rather than by raycasting: a ray against an instanced mesh tests
   * every triangle of every instance on every pointer move.
   */
  pick(
    x: number,
    y: number,
    width: number,
    height: number,
    camera: PerspectiveCamera,
  ): Pick {
    // Every pointer move comes through here, so this is where the engine
    // learns where the pointer is: a lane's slab is not a node and has no
    // hit test of its own, and titling it on hover needs nothing more than
    // the point. The canvas reports a pointer that left it as (-1, -1),
    // which is inside no slab.
    this.pointer = x < 0 || y < 0 ? null : { x, y };
    const tanHalf = Math.tan((camera.fov * Math.PI) / 360);
    let best: string | null = null;
    let bestDepth = Infinity;
    for (let slot = 0; slot < this.slotIds.length; slot++) {
      const id = this.slotIds[slot];
      const item = this.items.get(id);
      if (!item || item.leaving || item.appear < 0.5) continue;
      const depth = scratch
        .copy(item.pos)
        .sub(camera.position)
        .dot(scratchB.set(0, 0, -1).applyQuaternion(camera.quaternion));
      if (depth <= camera.near) continue;
      scratch.copy(item.pos).project(camera);
      const sx = ((scratch.x + 1) / 2) * width;
      const sy = ((1 - scratch.y) / 2) * height;
      const pxPerUnit = height / 2 / (depth * tanHalf);
      const radius = item.scale * this.ringReach(id, item) * pxPerUnit;
      let hit = Math.hypot(sx - x, sy - y) <= Math.max(radius + 3, 8);
      // A name is as good a target as its dot.
      const rect = item.label > 0.5 ? item.labelRect : null;
      if (!hit && rect) {
        hit = x >= rect.x0 && x <= rect.x1 && y >= rect.y0 && y <= rect.y1;
      }
      if (hit && depth < bestDepth) {
        best = id;
        bestDepth = depth;
      }
    }
    if (best) return { kind: "node", id: best };

    let edgeId: string | null = null;
    let edgeDistance = 7;
    for (const edge of this.edges) {
      if (linkClassOf(edge) !== "emphasis") continue;
      if (this.focus && !this.focus.spokes.has(edge.id)) continue;
      const a = this.items.get(edge.source);
      const b = this.items.get(edge.target);
      if (!a || !b) continue;
      scratch.copy(a.pos).project(camera);
      scratchB.copy(b.pos).project(camera);
      if (Math.abs(scratch.z) > 1 || Math.abs(scratchB.z) > 1) continue;
      const d = segmentDistance(
        x,
        y,
        ((scratch.x + 1) / 2) * width,
        ((1 - scratch.y) / 2) * height,
        ((scratchB.x + 1) / 2) * width,
        ((1 - scratchB.y) / 2) * height,
      );
      if (d < edgeDistance) {
        edgeDistance = d;
        edgeId = edge.id;
      }
    }
    return edgeId ? { kind: "edge", id: edgeId } : null;
  }

  // --------------------------------------------------------------- internals

  /** How far a node's drawing reaches, in sphere radii: its ring, if it wears one. */
  private ringReach(id: string, item: Item): number {
    const rings = this.ringScale(item);
    if (id === this.emphasis.focusedId) return FOCUS_RING_OUTER * rings;
    const reach = this.shapeReach(item);
    if (!this.ringed(item.node)) return reach;
    return reach + (RING_OUTER * rings - reach) * item.ringMix;
  }

  /** The shape a node is drawn in: its family's, or a sphere with shapes off. */
  private shapeOf(item: Item): NodeShape {
    return this.config.nodes.shapes ? shapeOf(item.node) : "sphere";
  }

  /** How far a node's shape reaches on screen, in sphere radii. */
  private shapeReach(item: Item): number {
    return this.shapes[this.shapeOf(item)].reach;
  }

  /**
   * How much larger than a sphere's its rings are drawn, so they clear a
   * shape that reaches further than the sphere does. 1 for a sphere.
   */
  private ringScale(item: Item): number {
    return Math.max(1, (this.shapeReach(item) + RING_CLEAR) / RING_INNER);
  }

  /** Whether the arrangement seats its selection in the left third. */
  private seatedView(focus: Focus | null): boolean {
    return focus?.view === "node" || focus?.view === "page";
  }

  /**
   * The ink a node's phrase under its name reads in: its tone in the page
   * view (decision 153), and the quiet muted ink of a hidden count elsewhere.
   */
  /**
   * Whether a relation node is waiting for the pointer (decision 155,
   * `page.relations: "hover"`): it stands behind the record it belongs to and
   * is drawn only while that record, itself, or one of its siblings there is
   * hovered. The siblings count so that moving along the group does not make
   * it fade under the pointer.
   */
  private shyRelation(id: string, hoveredId: string | null): boolean {
    if (this.view !== "page" || this.config.page.relations !== "hover") {
      return false;
    }
    const parent = this.relationOf.get(id);
    if (!parent) return false;
    if (!hoveredId) return true;
    return (
      hoveredId !== id &&
      hoveredId !== parent &&
      this.relationOf.get(hoveredId) !== parent
    );
  }

  private stateColor(id: string, palette: Palette): Color {
    const tone = this.page?.states[id]?.tone;
    if (tone === "success") return palette.success;
    if (tone === "warning") return palette.warning;
    if (tone === "danger") return palette.destructive;
    return palette.muted;
  }

  /** A caption's size for a name of this size, in pixels. */
  private captionPx(fontPx: number): number {
    return Math.max(CAPTION_MIN_PX, fontPx * CAPTION_SHARE);
  }

  /**
   * Whether a node wears its type in small capitals over its name. The page
   * view has its own answer (decision 155, `page.label`): the name alone, the
   * type alone, or both lines, and it overrides `nodes.typeCaptions` there.
   * Historical and Node read that switch as before.
   */
  private captionsOn(): boolean {
    return this.view === "page"
      ? this.config.page.label === "both"
      : this.config.nodes.typeCaptions;
  }

  /** The room a caption takes above a name of this size, in pixels; none with captions off. */
  private captionHeight(fontPx: number): number {
    return this.captionsOn()
      ? this.captionPx(fontPx) * 1.2 + CAPTION_GAP_PX
      : 0;
  }

  private captionWidth(id: string, fontPx: number): number {
    if (!this.captionsOn()) return 0;
    const caption = this.captions.get(id) ?? null;
    return textWidth(
      caption,
      this.captionPx(fontPx),
      caption?.text?.length ?? 12,
    );
  }

  /** The stepped levels' strength, 0 with the cue off (decision 136). */
  private stepStrength(): number {
    const { steppedLevels, stepStrength } = this.config.depth;
    return steppedLevels ? stepStrength / 100 : 0;
  }

  /** A background node's size against its tier, by link distance. */
  private levelSize(hop: number | null): number {
    const scale = this.config.nodes.backgroundScale / DEFAULT_BACKGROUND_SCALE;
    const smooth = backgroundScale(hop, scale);
    const step = STEP_SIZE[levelOfHop(hop)] * scale;
    return Math.max(0.15, smooth + (step - smooth) * this.stepStrength());
  }

  /** The drawer's dim, against its default: what `nodes.backgroundDim` scales. */
  private dimScale(): number {
    return this.config.nodes.backgroundDim / DEFAULT_BACKGROUND_DIM;
  }

  /** A background node's dim, as a share of full dim, by link distance. */
  private backgroundDim(hop: number | null): number {
    const smooth = BACKGROUND_DIM[gradeOf(hop)];
    const step = STEP_DIM[levelOfHop(hop)];
    let dim = smooth + (step - smooth) * this.stepStrength();
    const { fog, fogIntensity } = this.config.depth;
    if (fog) dim *= 1 - (1 - FOG_DIM_SHARE) * Math.min(1, fogIntensity / 100);
    const scale = this.config.nodes.backgroundDim / DEFAULT_BACKGROUND_DIM;
    return clamp01(dim * scale);
  }

  /** A name's size behind the plane, against its tier's, by level. */
  private levelLabelScale(level: number): number {
    return (
      BACKGROUND_LABEL +
      (STEP_LABEL[level] - BACKGROUND_LABEL) * this.stepStrength()
    );
  }

  /** How much of its colour a level gives up. */
  private levelDesaturation(level: number): number {
    return clamp01(STEP_DESATURATE[level] * this.stepStrength());
  }

  /** A level's link width, against the plane's. */
  private levelWidth(level: number): number {
    const step = STEP_WIDTH[level];
    return Math.max(0.2, 1 + (step - 1) * this.stepStrength());
  }

  /**
   * How far toward the ground the fog takes a point: by its depth behind the
   * focus plane, in the camera distances the focus was framed at, so the
   * plane itself stays crisp whatever the zoom (decision 136).
   */
  private fogAt(position: Vector3): number {
    const focus = this.focus;
    const { fog, fogIntensity } = this.config.depth;
    if (!fog || !focus || this.focusMix <= 0) return 0;
    const behind =
      fogScratch.subVectors(focus.origin, position).dot(focus.normal) /
      Math.max(focus.distance, 1e-3);
    if (behind <= 0) return 0;
    const amount = clamp01(
      Math.min(FOG_MAX, 1 - Math.exp(-FOG_RATE * behind)) *
        (fogIntensity / 100) *
        this.focusMix,
    );
    return this.palette?.dark
      ? 1 - Math.pow(1 - amount, FOG_DARK_POWER)
      : amount;
  }

  /** Whether a node wears its status ring. */
  private ringed(node: GraphNode): boolean {
    return node.status != null && this.config.nodes.statusRings;
  }

  /** A tier's sphere radius, in world units. */
  private radius(tier: GraphTier): number {
    const { nodes } = this.config;
    if (tier === 0) return nodes.tier0;
    if (tier === 1) return nodes.tier1;
    if (tier === 2) return nodes.tier2;
    return nodes.tier3;
  }

  /** The Node view's selection, against its tier's size. */
  private nodeCentreSize(tier: GraphTier): number {
    return (NODE_CENTRE_RADII * this.radius(0)) / this.radius(tier);
  }

  /** A tier's name size, in CSS pixels. */
  private labelPx(tier: GraphTier): number {
    return LABEL_PX[tier] * (this.config.labels.sizePx / DEFAULT_LABEL_PX);
  }

  private countPx(): number {
    return COUNT_PX * (this.config.labels.sizePx / DEFAULT_LABEL_PX);
  }

  private edgeLabelPx(): number {
    return EDGE_LABEL_PX * (this.config.labels.sizePx / DEFAULT_LABEL_PX);
  }

  /** How long a transition takes, in seconds; never zero, which would divide by it. */
  private transitionSeconds(): number {
    return Math.max(0.001, this.config.motion.transitionMs / 1000);
  }

  /**
   * How far toward the ground a link off the centre settles, by grade
   * (`edgeGrade`), with the drawer's fade per hop applied to the steps
   * between grades.
   */
  private quietEdge(dark: boolean, grade: 0 | 1 | 2): number {
    const fades = FOCUS_EDGE_FADE[dark ? "dark" : "light"];
    const { fadePerHop } = this.config.links;
    if (fadePerHop === 100) return fades[grade];
    const first = 1 - fades[0];
    const here = 1 - fades[grade];
    return 1 - clamp01(first - ((first - here) * fadePerHop) / 100);
  }

  private baseColor(node: GraphNode, palette: Palette): Color {
    if (node.craft) return palette.craft(node.craft);
    return node.tier <= 1 ? palette.ink : palette.muted;
  }

  private updateLit(): void {
    const { focusedId, hoveredEdgeId } = this.emphasis;
    if (focusedId && this.items.has(focusedId)) {
      const lit = new Set([focusedId]);
      for (const edge of this.edges) {
        if (edge.source === focusedId) lit.add(edge.target);
        if (edge.target === focusedId) lit.add(edge.source);
      }
      this.lit = lit;
    } else this.lit = null;
    const edge = hoveredEdgeId
      ? this.edges.find((candidate) => candidate.id === hoveredEdgeId)
      : undefined;
    this.edgeEnds = edge ? new Set([edge.source, edge.target]) : new Set();
  }

  /** A node's link distance in the focus: 0 the centre, 1 its ring. */
  private hopOf(id: string): number | null {
    const role = this.focus?.roles.get(id);
    if (role === "centre") return 0;
    if (role === "neighbour") return 1;
    return this.focus?.hops.get(id) ?? null;
  }

  private removeItem(id: string): void {
    this.items.delete(id);
  }

  private reset(): void {
    for (const id of [...this.items.keys()]) this.removeItem(id);
    this.layout = new StoryLayout();
    this.focus = null;
    this.motion = null;
    this.focusMix = 0;
    this.laneAt.clear();
  }

  dispose(): void {
    this.reset();
    for (const shape of NODE_SHAPES) {
      this.shapeMeshes[shape].geometry.dispose();
      this.shapeMeshes[shape].dispose();
    }
    (this.shapeMeshes.sphere.material as MeshLambertMaterial).dispose();
    for (const shape of NODE_SHAPES) {
      this.maskedMeshes[shape].geometry.dispose();
      this.maskedMeshes[shape].dispose();
    }
    (this.maskedMeshes.sphere.material as MeshLambertMaterial).dispose();
    for (const tint of this.planeTints) {
      tint.geometry.dispose();
      (tint.material as MeshBasicMaterial).dispose();
    }
    this.planeLines.dispose();
    this.floorLines.dispose();
    this.ringsMesh.geometry.dispose();
    (this.ringsMesh.material as MeshBasicMaterial).dispose();
    this.ringsMesh.dispose();
    this.labelMaterial.dispose();
    this.focusRing.geometry.dispose();
    (this.focusRing.material as MeshBasicMaterial).dispose();
    this.iconsMesh.geometry.dispose();
    (this.iconsMesh.material as MeshBasicMaterial).dispose();
    this.iconsMesh.dispose();
    for (const batch of [...this.thin, ...this.heavy]) batch.dispose();
    this.dashed.dispose();
  }
}

interface Rect {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

/** A sphere on screen, its ring included, in canvas pixels. */
interface Disc {
  id: string;
  x: number;
  y: number;
  r: number;
}

interface LabelCandidate {
  base: number;
  priority: number;
  showing: boolean;
  depth: number;
  /** The nodes the label belongs to, whose spheres it may touch. */
  owners: readonly string[];
  /** Where the label may go, in order of preference. */
  rects: Rect[];
  apply: (target: number, rect: Rect | null) => void;
}

/** A label's width in pixels: measured once troika has laid it out. */
/** A slab's bounding rectangle on the canvas, in CSS pixels. */
function screenRect(
  plate: PagePlate,
  focus: { right: Vector3; up: Vector3 },
  camera: PerspectiveCamera,
  width: number,
  height: number,
): Rect {
  let x0 = Infinity;
  let x1 = -Infinity;
  let y0 = Infinity;
  let y1 = -Infinity;
  for (const [sx, sy] of PLATE_CORNERS) {
    scratch
      .copy(plate.centre)
      .addScaledVector(focus.right, (sx * plate.width) / 2)
      .addScaledVector(focus.up, (sy * plate.height) / 2)
      .project(camera);
    const px = ((scratch.x + 1) / 2) * width;
    const py = ((1 - scratch.y) / 2) * height;
    x0 = Math.min(x0, px);
    x1 = Math.max(x1, px);
    y0 = Math.min(y0, py);
    y1 = Math.max(y1, py);
  }
  return { x0, x1, y0, y1 };
}

/**
 * How wide the slot under a name is taken to be before its text mesh has been
 * laid out and can be measured. A hidden count is short; the page view's
 * state phrase runs to about forty characters, and a lane measured off the
 * shorter guess seats a column too tight for the phrase to sit in.
 */
function underChars(mesh: TextMesh | null): number {
  return Math.max(6, Math.min(mesh?.text?.length ?? 8, 44));
}

function textWidth(
  mesh: TextMesh | null,
  fontPx: number,
  characters: number,
): number {
  const bounds = mesh?.textRenderInfo?.blockBounds;
  if (bounds) return (bounds[2] - bounds[0]) * fontPx;
  return characters * fontPx * 0.55;
}

/** The grade a background node draws at: 0 at hop 2, 1 at hop 3, 2 beyond or with no path. */
function gradeOf(hop: number | null): 0 | 1 | 2 {
  if (hop == null || hop > 3) return 2;
  return hop === 3 ? 1 : 0;
}

/** A background node's depth level (decision 136): 1 at hop 2, 2 at hop 3, 3 beyond or with no path. */
function levelOfHop(hop: number | null): 1 | 2 | 3 {
  if (hop == null || hop > 3) return 3;
  return hop === 3 ? 2 : 1;
}

/** A round grid step near `raw`: 1, 2 or 5 times a power of ten. */
function niceStep(raw: number): number {
  const power = Math.pow(10, Math.floor(Math.log10(raw)));
  const unit = raw / power;
  return (unit < 1.5 ? 1 : unit < 3.5 ? 2 : unit < 7.5 ? 5 : 10) * power;
}

/**
 * The grade an edge off the centre draws at: that of its farther end, so a
 * neighbour's line to its hop-2 node is the firmest; between two neighbours,
 * where it would cross the ring, the hop-3 grade.
 */
function edgeGrade(a: number | null, b: number | null): 0 | 1 | 2 {
  if (a == null || b == null) return 2;
  const far = Math.max(a, b);
  return far <= 1 ? 1 : gradeOf(far);
}

/** A stored coordinate: a hundredth of a world unit is plenty. */
function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function compareIds(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - t, 5);
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** A damped spring that overshoots a touch and lands exactly at 1. */
function spring(t: number): number {
  if (t >= 1) return 1;
  return 1 - Math.exp(-6.5 * t) * Math.cos(9 * t);
}

const EASINGS: Record<GraphEasing, (t: number) => number> = {
  inOutCubic: easeInOutCubic,
  outQuint: easeOutQuint,
  spring,
};

function seatOf(item: Item): Vector3 {
  return item.layout
    ? new Vector3(item.layout.x, item.layout.y, item.layout.z)
    : item.pos.clone();
}

/** WCAG contrast between two colours; three.js holds them linear already. */
function contrast(a: Color, b: Color): number {
  const la = 0.2126 * a.r + 0.7152 * a.g + 0.0722 * a.b;
  const lb = 0.2126 * b.r + 0.7152 * b.g + 0.0722 * b.b;
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

function mixToward(out: Color, from: Color, to: Color, t: number): Color {
  return out.copy(from).lerp(to, Math.min(Math.max(t, 0), 1));
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

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
    length === 0 ? 0 : clamp01(((px - ax) * dx + (py - ay) * dy) / length);
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}
