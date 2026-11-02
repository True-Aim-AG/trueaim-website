"use client";

import { CameraControls, CameraControlsImpl, Text } from "@react-three/drei";
import { createPortal, useFrame, useThree } from "@react-three/fiber";
import {
  type RefObject,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Box3, PerspectiveCamera, Scene, Vector3 } from "three";

import type {
  GraphFocusPlace,
  GraphPageReading,
  GraphPlace,
} from "../renderer";
import type { GraphConfig } from "../config";
import type { GraphLayoutKind } from "../renderer";
import type { GraphEdge, GraphNode } from "../types";

import {
  DEFAULT_AZIMUTH,
  DEFAULT_POLAR,
  endPose,
  frameBox,
  lookAt,
  lookPoint,
  pivotOn,
  polarLimits,
  rotateSpeed,
} from "./camera";
import {
  type FocusOptions,
  type IconAtlas,
  type Palette,
  type Pick,
  SceneEngine,
} from "./engine";
import { linkTagOf } from "./model";

/**
 * The scene inside the canvas: the engine, the labels, the lights and the
 * camera. React renders here only when the graph, the emphasis or the palette
 * changes; motion is the engine's, in `useFrame`.
 */

/**
 * A soft halo in the background colour behind every label, so an edge that
 * runs under a name is masked there instead of striking it through.
 */
const HALO = "18%";

export type Picker = (x: number, y: number) => Pick;

export interface WorldProps {
  nodes: readonly GraphNode[];
  edges: readonly GraphEdge[];
  expanded: ReadonlySet<string>;
  hoveredId: string | null;
  focusedId: string | null;
  highlightedIds: ReadonlySet<string>;
  hoveredEdgeId: string | null;
  palette: Palette;
  iconAtlas: IconAtlas | null;
  /** Nodes that just arrived (decision 118). */
  arrivedIds: readonly string[];
  reducedMotion: boolean;
  hiddenText: (count: number) => string;
  pickRef: RefObject<Picker | null>;
  /** Labels are loaded from here; see `GraphScene`. */
  fonts: { regular: string; medium: string };
  /** Where the graph was left; read once, on mount (decision 113). */
  initialPlace?: GraphPlace | null;
  onPlace?: (place: GraphPlace) => void;
  config: GraphConfig;
  view: GraphLayoutKind;
  /** How much of the canvas's left edge the detail panel covers, in CSS pixels. */
  insetLeftPx?: number;
  /** The reading the page view draws (decision 153); null in every other view. */
  page?: GraphPageReading | null;
  /** A node's type in the ontology's word, as its caption prints it (decision 135). */
  captionText: (node: GraphNode) => string;
  /** A level plane's caption (decision 136). */
  levelText: (level: 1 | 2 | 3) => string;
  /**
   * Bumped to fly the camera onto the selection and its links (the F key and
   * the canvas's frame control). A counter rather than a callback, because
   * two presses in a row must each be a flight.
   */
  frameRequest?: number;
  /** See `GraphRendererProps.frameScope`. */
  frameScope?: "neighbourhood" | "all";
  /** See `GraphRendererProps.frameAngle`. */
  frameAngle?: "reader" | "front";
  /** See `GraphRendererProps.frameNodeId`. */
  frameNodeId?: string | null;
  /** See `GraphRendererProps.frameOnOpen`. */
  frameOnOpen?: boolean;
  /**
   * Whether the reader can turn the camera. Off on a phone, where a drag on
   * the hero must scroll the page; a tap still centres a node.
   */
  interactive?: boolean;
}

const { ACTION } = CameraControlsImpl;

/**
 * Idle sway (decision 136): how long the reader must leave the graph alone
 * before the camera starts to drift, and how long the drift takes to reach
 * its full swing, in milliseconds.
 */
const SWAY_IDLE_MS = 2000;
const SWAY_EASE_IN_MS = 2500;
/** The vertical drift, against the horizontal one, and its period against the horizontal's. */
const SWAY_POLAR = 0.3;
const SWAY_POLAR_PERIOD = 1.7;
const DEG = Math.PI / 180;
/** A camera that moved less than this far, squared, since the last frame is at rest. */
const REST_EPSILON = 1e-6;
/**
 * How long the picture takes to follow a change of canvas width: about the
 * camera's own settling time, so the two compose into one move instead of a
 * sideways swing and back.
 */
const RESIZE_SECONDS = 0.55;
/**
 * The least time between two arrangements while a setting is dragged. Each
 * one eases on from wherever the last left things, so a drag reads as one
 * movement; solving on every input event would drop frames.
 */
const ARRANGE_THROTTLE_MS = 90;
/**
 * How long a whole-claim frame may keep following a layout that has not come
 * to rest, and how often it re-aims meanwhile, in milliseconds.
 */
const FOLLOW_MS = 4000;
const FOLLOW_EVERY_MS = 350;
/** Room kept between a name and the canvas's edge, in pixels, with the idle sway's few degrees in it. */
const NAME_EDGE_PX = 16;
/** Room left around the selection when F frames it, as a multiple. */
const FRAME_PADDING = 1.3;
/**
 * The longest a released drag keeps its pivot while the camera settles. The
 * damping is a fraction of this; the deadline is there because the idle sway
 * turns the camera every frame, so "come to rest" alone would never arrive.
 */
const RELEASE_MS = 1500;
const scratchTarget = new Vector3();
const scratchNode = new Vector3();
const scratchPivot = new Vector3();

/**
 * A node's neighbourhood mirrored about the node, so a box framed from it has
 * the node in the middle and every link still in the picture.
 */
function centredNeighbourhood(engine: SceneEngine, id: string): Box3 | null {
  const box = engine.neighbourhood(id);
  const at = engine.positionOf(id, scratchNode);
  if (!box || !at) return null;
  const reach = new Vector3()
    .subVectors(box.max, at)
    .max(new Vector3().subVectors(at, box.min));
  return new Box3(at.clone().sub(reach), at.clone().add(reach));
}

/**
 * Back a framed view off along its own line of sight until every name is
 * inside the canvas as well as every node: the least distance that fits,
 * found by halving, never closer than the view already is.
 */
const probe = new PerspectiveCamera();
const probed = new Vector3();
function fitNames(
  view: { position: Vector3; target: Vector3 },
  spans: readonly { at: Vector3; left: number; right: number }[],
  camera: PerspectiveCamera,
  width: number,
  height: number,
): void {
  if (spans.length === 0 || width <= 0 || height <= 0) return;
  const direction = view.position.clone().sub(view.target);
  const start = direction.length();
  direction.normalize();
  probe.fov = camera.fov;
  probe.near = camera.near;
  probe.far = camera.far;
  probe.aspect = width / height;
  probe.clearViewOffset();
  probe.updateProjectionMatrix();
  const fits = (distance: number) => {
    probe.position.copy(view.target).addScaledVector(direction, distance);
    probe.lookAt(view.target);
    probe.updateMatrixWorld();
    return spans.every(({ at, left, right }) => {
      probed.copy(at).project(probe);
      const x = ((probed.x + 1) / 2) * width;
      return (
        probed.z < 1 &&
        x - left >= NAME_EDGE_PX &&
        x + right <= width - NAME_EDGE_PX
      );
    });
  };
  if (fits(start)) return;
  let low = start;
  let high = start * 4;
  if (fits(high)) {
    for (let i = 0; i < 18; i++) {
      const middle = (low + high) / 2;
      if (fits(middle)) high = middle;
      else low = middle;
    }
  }
  view.position.copy(view.target).addScaledVector(direction, high);
}

/** The orbit angles that look square onto the arrangement's plane. */
function frontAngles(
  engine: SceneEngine,
): { azimuth: number; polar: number } | null {
  const plane = engine.focusPlace()?.plane;
  if (!plane || plane.length < 12) return null;
  const [x, y, z] = [plane[9], plane[10], plane[11]];
  const length = Math.hypot(x, y, z);
  if (length === 0) return null;
  return {
    azimuth: Math.atan2(x, z),
    polar: Math.acos(Math.min(1, Math.max(-1, y / length))),
  };
}

export function World({
  nodes,
  edges,
  expanded,
  hoveredId,
  focusedId,
  highlightedIds,
  hoveredEdgeId,
  palette,
  iconAtlas,
  arrivedIds,
  reducedMotion,
  hiddenText,
  pickRef,
  fonts,
  initialPlace,
  onPlace,
  config,
  view,
  insetLeftPx = 0,
  page = null,
  captionText,
  levelText,
  frameRequest = 0,
  frameScope = "neighbourhood",
  frameAngle = "reader",
  frameNodeId = null,
  frameOnOpen = false,
  interactive = true,
}: WorldProps) {
  const invalidate = useThree((state) => state.invalidate);
  const get = useThree((state) => state.get);
  const [engine] = useState(() => new SceneEngine());
  const gl = useThree((state) => state.gl);
  const controls = useRef<CameraControlsImpl>(null);
  /** The node a `frameNodeId` flight centred, which the turntable then turns about. */
  const anchorRef = useRef<string | null>(null);
  /** A whole-claim frame still following the layout as it settles (see the frame effect). */
  const following = useRef<{ until: number; last: number } | null>(null);
  const frameRef = useRef<() => void>(() => undefined);
  // The centre is never empty (decision 115): with no focus handed down, it
  // is the claim, the one tier-0 node.
  const centreId =
    focusedId ?? nodes.find((node) => node.tier === 0)?.id ?? null;
  const centreRef = useRef(centreId);
  const viewRef = useRef(view);
  const motionRef = useRef(reducedMotion);
  /** The stored place, until the first graph and focus have opened from it. */
  const opening = useRef(initialPlace ?? null);
  const onPlaceRef = useRef(onPlace);
  /** The canvas width being eased toward, and the virtual width drawn now. */
  const resizing = useRef({ width: 0, full: 0, from: 0, t: 1 });
  /** The camera as of the last frame, and whether it moved since the last report. */
  const lastPose = useRef({
    position: new Vector3(),
    target: new Vector3(),
    unreported: false,
  });
  /**
   * The pivot the drag under way turns about (the turntable, below): a node
   * id when the press landed on one, a fixed world point otherwise, and
   * neither between drags, when the pivot is the middle of what is framed.
   */
  const gesture = useRef<{
    nodeId: string | null;
    point: Vector3 | null;
    /** The button is up; the pivot is held until the damping runs out. */
    releasing: boolean;
    /** When it went up, so a camera that never rests still lets go. */
    releasedAt: number;
  }>({ nodeId: null, point: null, releasing: false, releasedAt: 0 });

  /**
   * Idle sway (decision 136). `last` is the last input or movement; while
   * `active` the camera turns about where it was when the drift began
   * (`azimuth`, `polar`, `position`, `target`). An input stops it where it
   * is, and `residual` says the camera is still off that pose by the drift,
   * so the next arrangement faces the pose rather than the drift.
   */
  const sway = useRef({
    last: 0,
    active: false,
    start: 0,
    azimuth: 0,
    polar: 0,
    residual: false,
    position: new Vector3(),
    target: new Vector3(),
    timer: null as ReturnType<typeof setTimeout> | null,
  });
  const [poseCamera] = useState(() => new PerspectiveCamera());
  /** The scene the labels are drawn in, over everything else; see the render below. */
  const [overlay] = useState(() => {
    const scene = new Scene();
    scene.fog = engine.fog;
    return scene;
  });
  const configRef = useRef(config);

  useLayoutEffect(() => {
    centreRef.current = centreId;
    viewRef.current = view;
    motionRef.current = reducedMotion;
    onPlaceRef.current = onPlace;
    configRef.current = config;
  });

  // Any input stops the drift where it is and restarts the wait for idle.
  const poke = useCallback(() => {
    const state = sway.current;
    state.last = performance.now();
    if (state.active) {
      state.active = false;
      state.residual = true;
    }
  }, []);
  useEffect(() => {
    const element = gl.domElement;
    const control = controls.current;
    const state = sway.current;
    const onVisibility = () => {
      poke();
      invalidate();
    };
    // A drag of the reader's own replaces the pose the drift was about.
    const onControl = () => {
      poke();
      state.residual = false;
      following.current = null;
    };
    element.addEventListener("pointerdown", poke);
    element.addEventListener("pointermove", poke);
    element.addEventListener("wheel", poke, { passive: true });
    window.addEventListener("keydown", poke);
    document.addEventListener("visibilitychange", onVisibility);
    control?.addEventListener("controlstart", onControl);
    return () => {
      element.removeEventListener("pointerdown", poke);
      element.removeEventListener("pointermove", poke);
      element.removeEventListener("wheel", poke);
      window.removeEventListener("keydown", poke);
      document.removeEventListener("visibilitychange", onVisibility);
      control?.removeEventListener("controlstart", onControl);
      if (state.timer) clearTimeout(state.timer);
      state.timer = null;
    };
  }, [gl, poke, invalidate]);

  /**
   * Where the graph is now, for the tab to keep: the camera as drawn, or,
   * given one, the pose it is flying to.
   */
  const report = useCallback(
    (to?: { position: Vector3; target: Vector3 }) => {
      const pose = to ?? lastPose.current;
      onPlaceRef.current?.({
        positions: engine.seats(),
        camera: [...pose.position.toArray(), ...pose.target.toArray()],
        // No free layout to return to any more: the centre is always set.
        cameraBeforeFocus: null,
        focusId: engine.focusId,
        focus3d: engine.focusPlace(),
      });
    },
    [engine],
  );

  /**
   * Arrange around a node and fly the camera to face the arrangement. The
   * canvas is measured off the page rather than read from the store, because
   * the side panel that opens with a focus has narrowed it already and the
   * store hears about that a few frames late.
   */
  const arrange = useCallback(
    (id: string, kept?: GraphFocusPlace | null, options: FocusOptions = {}) => {
      const control = controls.current;
      if (!control) return;
      const box = gl.domElement.parentElement?.getBoundingClientRect();
      const { camera, size } = get();
      // A drift that was stopped left the camera a few degrees off the pose
      // the reader chose; the arrangement faces that pose, so drifts never
      // add up from one walk to the next.
      let facing = camera as PerspectiveCamera;
      const drift = sway.current;
      if (drift.residual) {
        poseCamera.copy(facing);
        poseCamera.position.copy(drift.position);
        poseCamera.lookAt(drift.target);
        facing = poseCamera;
        drift.residual = false;
      }
      const view = engine.focusOn(
        id,
        facing,
        box?.width || size.width,
        box?.height || size.height,
        kept,
        options,
      );
      if (!view) return;
      // A focus re-formed as it was left keeps the camera the reader left it
      // with; one whose ring has changed since is framed afresh.
      if (!view.keepCamera) {
        lookAt(control, view, !motionRef.current && !options.instant);
      }
      // Kept now, where it is going, not only once it comes to rest: a
      // reader who leaves mid-flight, or whose camera never quite settles,
      // would otherwise come back to the centre before last (decision 113).
      report(endPose(control));
      invalidate();
    },
    [engine, get, gl, invalidate, poseCamera, report],
  );

  useEffect(
    () => () => {
      report();
      engine.dispose();
    },
    [engine, report],
  );

  useLayoutEffect(() => {
    engine.setReducedMotion(reducedMotion);
  }, [engine, reducedMotion]);

  // The drawer's values and the view (decisions 131 and 132), before the
  // graph so the first arrangement already reads them. A new view arranges
  // at once; a setting that moves nodes arranges at most every
  // `ARRANGE_THROTTLE_MS`, trailing, so the last value of a drag lands.
  const throttle = useRef<{
    at: number;
    timer: ReturnType<typeof setTimeout> | null;
    reframe: boolean;
  }>({ at: -Infinity, timer: null, reframe: false });
  useEffect(
    () => () => {
      const pending = throttle.current.timer;
      if (pending) clearTimeout(pending);
    },
    [],
  );
  useLayoutEffect(() => {
    const camera = get().camera as PerspectiveCamera;
    const reframe = camera.fov !== config.camera.fov;
    if (reframe) {
      camera.fov = config.camera.fov;
      camera.updateProjectionMatrix();
    }
    const { rearrange, viewChanged } = engine.setConfig(config, view);
    invalidate();
    const centre = centreRef.current;
    if (!rearrange || !centre || engine.focusId == null) return;
    const pending = throttle.current;
    if (viewChanged) {
      if (pending.timer) clearTimeout(pending.timer);
      pending.timer = null;
      pending.reframe = false;
      pending.at = performance.now();
      arrange(centre);
      return;
    }
    pending.reframe ||= reframe;
    const run = () => {
      pending.timer = null;
      pending.at = performance.now();
      const now = centreRef.current;
      const again = pending.reframe;
      pending.reframe = false;
      if (now && engine.focusId != null) arrange(now, null, { reframe: again });
    };
    if (pending.timer) return;
    const wait = ARRANGE_THROTTLE_MS - (performance.now() - pending.at);
    if (wait <= 0) run();
    else pending.timer = setTimeout(run, wait);
  }, [engine, config, view, get, invalidate, arrange]);

  // The detail panel is drawn over the canvas rather than resizing it, so
  // the page arrangement is told how much of the left edge it covers and
  // solves in the rest. A change of that is a change of arrangement, like a
  // setting that moves nodes: the picture glides clear of the panel through
  // the same tween, and back when it closes.
  useLayoutEffect(() => {
    if (!engine.setInsetLeft(insetLeftPx)) return;
    invalidate();
    const centre = centreRef.current;
    if (centre && engine.focusId != null) arrange(centre);
  }, [engine, insetLeftPx, invalidate, arrange]);

  useLayoutEffect(() => {
    engine.setPalette(palette);
    invalidate();
  }, [engine, palette, invalidate]);

  useLayoutEffect(() => {
    engine.setIconAtlas(iconAtlas);
    invalidate();
  }, [engine, iconAtlas, invalidate]);

  // Before the graph, so a node that arrives with this render is known to
  // have arrived when it is seated.
  useLayoutEffect(() => {
    engine.setArrivals(arrivedIds);
    invalidate();
  }, [engine, arrivedIds, invalidate]);

  // The page view's reading (decision 153), before the graph too: the first
  // arrangement after a walk must already know its lanes.
  useLayoutEffect(() => {
    engine.setPage(page);
    invalidate();
  }, [engine, page, invalidate]);

  // The graph. A fresh one (first open, another claim) opens straight into
  // the arrangement around its centre (decision 115): no story to settle and
  // no flight from it. A stored place puts the camera back instead, and the
  // centre effect below re-forms the focus it was left in.
  useLayoutEffect(() => {
    const place = opening.current;
    if (place) engine.restore(place.positions);
    const { fresh, restored, changed, added, removed } = engine.sync(
      nodes,
      edges,
    );
    const control = controls.current;
    const centre = centreRef.current;
    if (restored && control && place) {
      const [px = 0, py = 0, pz = 120, tx = 0, ty = 0, tz = 0] = place.camera;
      lookAt(
        control,
        {
          position: new Vector3(px, py, pz),
          target: new Vector3(tx, ty, tz),
        },
        false,
      );
    }
    const reforms =
      restored &&
      place?.focusId === centre &&
      place.focus3d != null &&
      (place.focus3d.layout ?? "ring") === viewRef.current;
    if (fresh && centre && !reforms) {
      arrange(centre, null, { instant: true });
    } else if (fresh && control && !restored) {
      const { camera, size } = get();
      const view = frameBox(
        engine.predictedBounds(nodes, edges),
        DEFAULT_AZIMUTH,
        DEFAULT_POLAR,
        (camera as PerspectiveCamera).fov,
        size.width / Math.max(size.height, 1),
      );
      lookAt(control, view, false);
    }
    // The graph moved under the centre (something opened, or arrived): the
    // same centre re-arranges on the same plane to take it in. What only
    // adds keeps the camera where it is while it still fits (decision 118).
    if (!fresh && changed && centre && engine.focusId === centre) {
      arrange(centre, null, { hold: added && !removed });
    }
    invalidate();
  }, [engine, nodes, edges, get, invalidate, arrange]);

  useLayoutEffect(() => {
    engine.setEmphasis({
      hoveredId,
      focusedId: centreId,
      highlightedIds,
      hoveredEdgeId,
    });
    invalidate();
  }, [engine, hoveredId, centreId, highlightedIds, hoveredEdgeId, invalidate]);

  // The centre (decisions 109 and 115): it sits in the middle, its
  // neighbours on a plane facing the camera, the rest behind, and the camera
  // front-on to it. Choosing a neighbour walks there; going back to the claim
  // walks back. Only a graph with no claim at all has no centre, and lets the
  // story go.
  useLayoutEffect(() => {
    const control = controls.current;
    if (!control) return;
    const place = opening.current;
    opening.current = null;
    if (
      centreId &&
      place?.focusId === centreId &&
      place.focus3d &&
      (place.focus3d.layout ?? "ring") === viewRef.current
    ) {
      arrange(centreId, place.focus3d);
      return;
    }
    if (centreId) {
      // The graph effect arranged it already when the graph opened on it.
      if (engine.focusId !== centreId) arrange(centreId);
      return;
    }
    engine.releaseFocus();
    invalidate();
  }, [engine, centreId, arrange, invalidate]);

  useLayoutEffect(() => {
    pickRef.current = (x, y) => {
      const { camera, size } = get();
      return engine.pick(
        x,
        y,
        size.width,
        size.height,
        camera as PerspectiveCamera,
      );
    };
    return () => {
      pickRef.current = null;
    };
  }, [engine, get, pickRef]);

  /**
   * Fly the camera onto the selection and everything it links to, and leave
   * the pivot there: with only the neighbourhood framed, the middle of what
   * is on screen is the middle of it.
   *
   * The angle is the reader's own. A framing that snapped to an axis would
   * answer "show me this one" with a quarter turn of the whole claim. A
   * canvas that offers "back to where it started" asks for `front` instead:
   * square to the arrangement's plane, the angle it opened at.
   *
   * With `frameNodeId` set the flight puts that node in the middle of the
   * canvas at the reader's angle, no further out than the camera already
   * is and only as close as keeps its links in the frame, and the turntable
   * then turns about it: the camera moves, the layout does not. A node no
   * longer drawn falls back to the scope's own box.
   */
  const frameSelection = useCallback(() => {
    const control = controls.current;
    const centre = centreRef.current;
    if (!control || !centre) return;
    const nodeBox = frameNodeId
      ? centredNeighbourhood(engine, frameNodeId)
      : null;
    anchorRef.current = nodeBox ? frameNodeId : null;
    const box =
      nodeBox ??
      (frameScope === "all" ? engine.extent() : engine.neighbourhood(centre));
    if (!box || box.isEmpty()) return;
    const { camera, size } = get();
    const front = frameAngle === "front" ? frontAngles(engine) : null;
    // A flight replaces whatever pose the idle drift was swinging about.
    poke();
    sway.current.residual = false;
    const view = frameBox(
      box,
      front?.azimuth ?? control.azimuthAngle,
      front?.polar ?? control.polarAngle,
      (camera as PerspectiveCamera).fov,
      size.width / Math.max(size.height, 1),
      FRAME_PADDING,
    );
    // The whole claim keeps its outermost names inside the canvas too.
    if (!nodeBox && frameScope === "all") {
      fitNames(
        view,
        engine.labelSpans(camera as PerspectiveCamera, size.width),
        camera as PerspectiveCamera,
        size.width,
        size.height,
      );
    }
    if (nodeBox) {
      // Centred on the node, never pulled back: a click is a step in.
      const now = endPose(control);
      const reach = Math.min(
        view.position.distanceTo(view.target),
        now.position.distanceTo(now.target),
      );
      view.position.sub(view.target).setLength(reach).add(view.target);
    }
    lookAt(control, view, !motionRef.current);
    gesture.current = {
      nodeId: null,
      point: null,
      releasing: false,
      releasedAt: 0,
    };
    report(endPose(control));
    invalidate();
  }, [
    engine,
    frameScope,
    frameAngle,
    frameNodeId,
    get,
    invalidate,
    poke,
    report,
  ]);

  const framed = useRef(frameRequest);
  useEffect(() => {
    if (frameRequest === framed.current) return;
    framed.current = frameRequest;
    frameSelection();
    // A picture of the whole claim is asked for while records are still
    // springing out of their parents, so the box measured now is smaller
    // than the one they settle into. Follow the growth until it rests.
    if (frameScope === "all") {
      const now = performance.now();
      following.current = { until: now + FOLLOW_MS, last: now };
    }
  }, [frameRequest, frameScope, frameSelection]);
  useLayoutEffect(() => {
    frameRef.current = frameSelection;
  });

  // A view that opens on the whole claim (`frameOnOpen`) frames it once the
  // first graph is seated, unless a stored place put the camera back, and
  // follows the layout as it settles so the names end up inside the canvas.
  const openWhole = useRef(frameOnOpen && !initialPlace);
  useEffect(() => {
    if (!openWhole.current || nodes.length === 0) return;
    openWhole.current = false;
    frameRef.current();
    const now = performance.now();
    following.current = { until: now + FOLLOW_MS, last: now };
  }, [nodes]);

  /**
   * The turntable's buttons. Left turns the scene, right and middle pan, and
   * shift with the left button pans too: `camera-controls` reads the button
   * map at pointerdown and knows nothing about modifiers, so shift is a swap
   * of what the left button does while the key is held. Orbit off in the
   * drawer leaves the left button panning throughout.
   *
   * Imperative rather than the `mouseButtons` prop, because a render would
   * put the prop's object back and undo the swap mid-gesture.
   */
  const orbit = config.camera.orbit;
  useEffect(() => {
    const control = controls.current;
    if (!control) return;
    control.mouseButtons.middle = ACTION.TRUCK;
    control.mouseButtons.right = ACTION.TRUCK;
    // The website's one change to the turntable: the wheel scrolls the page
    // rather than zooming the hero, which sits in a scrolling page.
    control.mouseButtons.wheel = ACTION.NONE;
    const setLeft = (shift: boolean) => {
      control.mouseButtons.left =
        orbit && !shift ? ACTION.ROTATE : ACTION.TRUCK;
    };
    const onKey = (event: KeyboardEvent) => setLeft(event.shiftKey);
    const onBlur = () => setLeft(false);
    setLeft(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
      window.removeEventListener("blur", onBlur);
    };
  }, [orbit]);

  /**
   * Which point the gesture about to start turns about (supersedes decision
   * 133's "orbit pivots on the selection"):
   *
   * - A press that lands on a node makes that node the pivot, for that drag
   *   only. Orbit about the cursor is what every reader expects of a 3D
   *   viewer, and it is the one gesture that answers "how does this sit
   *   behind that one" without losing the node being asked about.
   * - A press on empty canvas turns the whole arrangement about the middle
   *   of what is framed, like a model on a table. The selection has nothing
   *   to do with it, so choosing another node never moves the camera.
   *
   * Either way the pivot is taken once, at pointerdown, and held: a pivot
   * recomputed mid-drag drifts under the reader's hand.
   */
  useEffect(() => {
    const element = gl.domElement;
    const onDown = (event: PointerEvent) => {
      // `camera.pivot: "centre"` (the Claim view): every gesture turns about
      // the main node, wherever the press lands.
      const pinned =
        configRef.current.camera.pivot === "centre" ? centreRef.current : null;
      if (pinned) {
        gesture.current = {
          nodeId: pinned,
          point: null,
          releasing: false,
          releasedAt: 0,
        };
        return;
      }
      const rect = element.getBoundingClientRect();
      const { camera, size } = get();
      const turning =
        event.button === 0 && !event.shiftKey && configRef.current.camera.orbit;
      const hit = turning
        ? engine.pick(
            event.clientX - rect.left,
            event.clientY - rect.top,
            size.width,
            size.height,
            camera as PerspectiveCamera,
          )
        : null;
      const anchor = anchorRef.current;
      gesture.current =
        hit?.kind === "node"
          ? { nodeId: hit.id, point: null, releasing: false, releasedAt: 0 }
          : {
              nodeId: null,
              point:
                (anchor ? engine.positionOf(anchor, new Vector3()) : null) ??
                engine.onScreenCentre(
                  camera as PerspectiveCamera,
                  new Vector3(),
                ),
              releasing: false,
              releasedAt: 0,
            };
    };
    // The button going up does not end the gesture: the damping carries the
    // turn on for another half-second, and a pivot that jumped back to the
    // middle of the picture there would slide the node out from under the
    // pointer after the reader had let go.
    const onUp = () => {
      gesture.current.releasing = true;
      gesture.current.releasedAt = performance.now();
    };
    element.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      element.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [engine, gl, get]);

  // The pivot, and how far a drag turns (see `pivotOn` and `rotateSpeed`),
  // set before the controls update (drei's runs at -1) so a drag this frame
  // already turns about the right point at the right speed. Between drags
  // the pivot follows what is framed, so an orbit started after a pan or a
  // zoom still turns about what the reader is looking at.
  useFrame(() => {
    const control = controls.current;
    if (!control) return;
    const { camera, size } = get();
    const speed = rotateSpeed(
      configRef.current.camera.orbitSensitivity,
      size.height,
    );
    control.azimuthRotateSpeed = speed;
    control.polarRotateSpeed = speed;
    const held = gesture.current;
    if (
      held.releasing &&
      (!control.active || performance.now() - held.releasedAt > RELEASE_MS)
    ) {
      gesture.current = {
        nodeId: null,
        point: null,
        releasing: false,
        releasedAt: 0,
      };
    }
    // Locked on the main node (`camera.pivot: "centre"`): read afresh every
    // frame, so the turn follows the node while it glides to a new seat, and
    // a pan moves the view without moving what the next drag turns about.
    const pinned =
      configRef.current.camera.pivot === "centre" ? centreRef.current : null;
    if (pinned && engine.positionOf(pinned, scratchPivot)) {
      pivotOn(control, scratchPivot);
      return;
    }
    const { nodeId, point } = gesture.current;
    const pivotNode = nodeId ?? (point ? null : anchorRef.current);
    if (pivotNode) {
      pivotOn(control, engine.positionOf(pivotNode, scratchPivot));
      return;
    }
    pivotOn(
      control,
      point ?? engine.onScreenCentre(camera as PerspectiveCamera, scratchPivot),
    );
  }, -2);

  /** The engine lights and fogs from where the camera looks, not the pivot. */
  const looking = useMemo(
    () => ({
      getTarget: (out: Vector3) =>
        controls.current ? lookPoint(controls.current, out) : out,
    }),
    [],
  );

  useFrame((state, delta) => {
    // The canvas changes width in one step when the side panel opens or
    // closes. Drawn straight away at the new width, the whole picture would
    // jump sideways by half the panel. Instead the frame keeps its left edge
    // where it was and eases across to the new width, through a view offset
    // on the camera: the picture slides with the panel rather than jumping.
    const camera = state.camera as PerspectiveCamera;
    const { width, height } = state.size;
    const resize = resizing.current;
    if (resize.width !== width) {
      if (resize.width > 0 && !motionRef.current) {
        resize.from = resize.full;
        resize.t = 0;
      } else {
        resize.t = 1;
      }
      resize.width = width;
    }
    if (resize.t < 1) {
      resize.t = Math.min(1, resize.t + delta / RESIZE_SECONDS);
      const eased = 1 - Math.pow(1 - resize.t, 3);
      resize.full = resize.from + (width - resize.from) * eased;
      camera.aspect = resize.full / Math.max(height, 1);
      camera.setViewOffset(resize.full, height, 0, 0, width, height);
      if (resize.t >= 1) {
        camera.clearViewOffset();
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
      }
      invalidate();
    } else {
      resize.full = width;
    }

    const busy = engine.frame(
      camera,
      controls.current ? looking : null,
      delta,
      state.size.width,
      state.size.height,
    );
    if (busy) invalidate();

    // A whole-claim frame follows the layout while it settles: re-aimed a
    // few times a second while anything moves, once more when it rests.
    const follow = following.current;
    if (follow) {
      const now = performance.now();
      if (!busy || now > follow.until) {
        following.current = null;
        frameRef.current();
      } else if (now - follow.last > FOLLOW_EVERY_MS) {
        follow.last = now;
        frameRef.current();
      }
    }

    // Report the place once the view has come to rest: nothing in motion,
    // and the camera where it was last frame. One frame more is asked for
    // after any movement so that resting frame happens at all.
    const pose = lastPose.current;
    const target = controls.current
      ? lookPoint(controls.current, scratchTarget)
      : undefined;
    // The camera's damping creeps for seconds by amounts nobody can see;
    // under a thousandth of a unit a frame is at rest.
    const moved =
      pose.position.distanceToSquared(state.camera.position) > REST_EPSILON ||
      (target != null && pose.target.distanceToSquared(target) > REST_EPSILON);
    pose.position.copy(state.camera.position);
    if (target) pose.target.copy(target);
    if (busy || moved) {
      pose.unreported = true;
      if (!busy) invalidate();
    } else if (pose.unreported) {
      pose.unreported = false;
      report();
    }

    // Idle sway (decision 136): once nothing has moved and nobody has
    // touched the graph for a while, the camera drifts a few degrees back
    // and forth about where it is. Never under reduced motion, and never in
    // a hidden tab, where it would keep the frame loop running for no one.
    const drift = sway.current;
    const control = controls.current;
    const { depth } = configRef.current;
    const now = performance.now();
    const allowed =
      depth.sway &&
      depth.swayAmplitude > 0 &&
      !motionRef.current &&
      !document.hidden &&
      control != null;
    if (drift.active) {
      if (!allowed || busy || !control) {
        drift.active = false;
        drift.residual = true;
        drift.last = now;
      } else {
        const t = now - drift.start;
        const swing =
          depth.swayAmplitude * DEG * smoothstep(t / SWAY_EASE_IN_MS);
        const phase = (2 * Math.PI * t) / (depth.swayPeriodS * 1000);
        void control.rotateTo(
          drift.azimuth + swing * Math.sin(phase),
          drift.polar +
            swing * SWAY_POLAR * Math.sin(phase / SWAY_POLAR_PERIOD),
          false,
        );
        invalidate();
      }
    } else if (busy || moved) {
      drift.last = now;
    } else if (allowed && control) {
      const waited = now - drift.last;
      if (waited >= SWAY_IDLE_MS) {
        drift.active = true;
        drift.start = now;
        drift.azimuth = control.azimuthAngle;
        drift.polar = control.polarAngle;
        drift.position.copy(camera.position);
        lookPoint(control, drift.target);
        drift.residual = false;
        invalidate();
      } else if (!drift.timer) {
        // The loop is idle between frames: wake it when the wait is over.
        drift.timer = setTimeout(
          () => {
            drift.timer = null;
            invalidate();
          },
          SWAY_IDLE_MS - waited + 16,
        );
      }
    }
  });

  // The scene, then the labels over it. The labels live in a scene of their
  // own so depth of field, when it is on, blurs what is behind the plane and
  // never the names drawn over the empty ground beside it.
  useFrame(({ gl: renderer, scene, camera }) => {
    renderer.render(scene, camera);
    const autoClear = renderer.autoClear;
    renderer.autoClear = false;
    renderer.render(overlay, camera);
    renderer.autoClear = autoClear;
  }, 2);

  // The labels change with the graph, not with a setting or the emphasis, so
  // a settings drag does not reconcile a text mesh per node on every step.
  // Captions and level names are made only while their switch is on.
  // What a node wears on the canvas. The page view answers for itself
  // (decision 155, `page.label`): its name, its type, or both lines, which is
  // what `nodes.typeCaptions` alone decides in the Historical and Node
  // readings.
  const pageLabel = view === "page" ? config.page.label : null;
  const captions =
    pageLabel != null ? pageLabel === "both" : config.nodes.typeCaptions;
  const planes = config.depth.levelPlanes;
  const detailLine = config.nodes.detailLine;
  const polar = polarLimits(config.camera.verticalClamp);
  const labels = useMemo(() => {
    // The slot under a name carries a hidden count, or, in the page view, the
    // one state phrase the reading gave the record (decision 153).
    // `nodes.detailLine` fills it on an open node with one detail of the
    // record's own (`detailOf`); the engine shows it on the lit ones.
    const states = page?.states ?? null;
    const under = nodes.flatMap((node) => {
      const text = states
        ? states[node.id]?.text
        : node.childCount > 0 && !expanded.has(node.id)
          ? hiddenText(node.childCount)
          : detailLine
            ? detailOf(node)
            : undefined;
      return text ? [{ node, text }] : [];
    });
    const stated = new Set(under.map((each) => each.node.id));
    return (
      <Suspense fallback={null}>
        {nodes.map((node) => (
          <Text
            key={node.id}
            ref={engine.labelRef("label", node.id)}
            font={node.tier <= 1 ? fonts.medium : fonts.regular}
            fontSize={1}
            anchorX="left"
            outlineWidth={HALO}
            outlineBlur={HALO}
            anchorY={stated.has(node.id) ? "bottom" : "middle"}
          >
            {pageLabel === "type"
              ? truncate(captionText(node), NAME_CHARS)
              : truncate(node.label, NAME_CHARS)}
          </Text>
        ))}
        {(page?.lanes ?? []).map((lane) => (
          <Text
            key={lane.key}
            ref={engine.labelRef("lane", lane.key)}
            font={fonts.regular}
            fontSize={1}
            anchorX="left"
            anchorY="bottom"
            outlineWidth={HALO}
            outlineBlur={HALO}
          >
            {truncate(lane.title, 28)}
          </Text>
        ))}
        {captions &&
          nodes.map((node) => (
            <Text
              key={node.id}
              ref={engine.labelRef("caption", node.id)}
              font={fonts.medium}
              fontSize={1}
              letterSpacing={0.06}
              anchorX="left"
              anchorY="bottom"
              outlineWidth={HALO}
              outlineBlur={HALO}
            >
              {captionText(node)}
            </Text>
          ))}
        {planes &&
          LEVEL_KEYS.map((level) => (
            <Text
              key={level}
              ref={engine.labelRef("level", String(level))}
              font={fonts.regular}
              fontSize={1}
              anchorX="left"
              anchorY="bottom"
              outlineWidth={HALO}
              outlineBlur={HALO}
            >
              {levelText(level)}
            </Text>
          ))}
        {under.map(({ node, text }) => (
          <Text
            key={node.id}
            ref={engine.labelRef("count", node.id)}
            font={fonts.regular}
            fontSize={1}
            anchorX="left"
            anchorY="top"
            outlineWidth={HALO}
            outlineBlur={HALO}
          >
            {truncate(text, page ? STATE_CHARS : COUNT_CHARS)}
          </Text>
        ))}
        {edges
          .filter((edge) => linkTagOf(edge))
          .map((edge) => (
            <Text
              key={edge.id}
              ref={engine.labelRef("edge", edge.id)}
              font={fonts.regular}
              fontSize={1}
              anchorX="center"
              anchorY="bottom"
              outlineWidth={HALO}
              outlineBlur={HALO}
            >
              {truncate(linkTagOf(edge) ?? "", 40)}
            </Text>
          ))}
      </Suspense>
    );
  }, [
    nodes,
    edges,
    expanded,
    fonts,
    hiddenText,
    engine,
    captions,
    captionText,
    pageLabel,
    planes,
    levelText,
    page,
    detailLine,
  ]);

  return (
    <>
      <CameraControls
        ref={controls}
        makeDefault
        enabled={interactive}
        smoothTime={reducedMotion ? 0 : config.motion.cameraFlyS}
        draggingSmoothTime={reducedMotion ? 0 : config.camera.damping}
        minDistance={6}
        maxDistance={420}
        // A turntable: the scene turns about the world's vertical axis, the
        // camera rises and falls a few degrees short of either pole, and
        // nothing rolls. The azimuth is free, so the reader can walk right
        // round the claim; the horizon stays level wherever they stop.
        minPolarAngle={polar[0]}
        maxPolarAngle={polar[1]}
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
        dollyToCursor
      />
      <hemisphereLight args={[0xffffff, 0xd8dade, 1.9]} />
      <primitive attach="fog" object={engine.fog} />
      <primitive object={engine.root} />
      {createPortal(labels, overlay)}
    </>
  );
}

const LEVEL_KEYS = [1, 2, 3] as const;

/**
 * How long a drawn string may run before it is cut with an ellipsis: a name,
 * a hidden count, and the page view's state phrase. The phrase is the row's
 * own finding ("waiting on the carpenter since 12 March"), which 32
 * characters cut inside the date; the lane's column is measured off the text
 * that lands here, so a longer one widens its lane rather than colliding.
 */
const NAME_CHARS = 32;
const COUNT_CHARS = 28;

/**
 * The one detail a lit node prints under its name (`nodes.detailLine`): its
 * figure (a limit, a total, a date), else which one it is (the claim number,
 * the person, the file), else its first property. Never the label again.
 */
function detailOf(node: GraphNode): string | undefined {
  const candidates = [node.hover.figure, node.name, node.properties[0]?.value];
  return candidates.find(
    (text): text is string =>
      text != null && text.trim() !== "" && text !== node.label,
  );
}
const STATE_CHARS = 44;

function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function smoothstep(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}
