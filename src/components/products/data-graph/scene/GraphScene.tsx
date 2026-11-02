"use client";

import { Canvas } from "@react-three/fiber";
import {
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { CanvasTexture, type Color, SRGBColorSpace } from "three";

import type { GraphConfig } from "../config";
import type { GraphLayoutKind, GraphTheme, ScreenPoint } from "../renderer";
import type { CraftKey, GraphEdge, GraphNode } from "../types";

import { cssColor } from "./color";
import type { IconAtlas, Palette } from "./engine";
import { ICON_KEYS, type IconKey, NODE_ICONS } from "./icons";
import { type Picker, World } from "./World";

/**
 * The 3D renderer's canvas, ported from the prototype. Loaded on demand by
 * `DataGraph`, so nothing here, and none of three.js, is in the page's first
 * bundle.
 *
 * This component owns the DOM side: pointer gestures, the cursor, the hidden
 * node icons the icon atlas is rasterised from, the theme turned into
 * three.js colours, and reduced motion. Hit-testing is the engine's,
 * through `pickRef`, and every result goes straight to the tab's callbacks.
 * The pointer is reported only when what it is over changes, so moving across
 * a node does not re-render the tab on every event.
 */

const FONTS = {
  regular: new URL(
    "@fontsource/inter/files/inter-latin-400-normal.woff",
    import.meta.url,
  ).href,
  medium: new URL(
    "@fontsource/inter/files/inter-latin-500-normal.woff",
    import.meta.url,
  ).href,
};

/** Below this many pixels of travel a press is a click, not an orbit. */
const CLICK_SLOP = 5;

/** Atlas cells, in CSS pixels; a glyph is drawn inset so mipmaps do not bleed. */
const ATLAS_CELL = 128;
const ATLAS_GLYPH = 104;
const ATLAS_COLUMNS = 8;
/** A touch heavier than lucide's 2, because the glyphs are read small. */
const ICON_STROKE = 2.25;

/**
 * The prototype's `GraphRendererProps`, cut to what the hero passes: no
 * stored place, page reading or detail panel.
 */
export interface GraphSceneProps {
  nodes: readonly GraphNode[];
  edges: readonly GraphEdge[];
  expanded: ReadonlySet<string>;
  hoveredId: string | null;
  focusedId: string | null;
  highlightedIds: ReadonlySet<string>;
  onHover: (id: string | null, point: ScreenPoint | null) => void;
  onClick: (id: string) => void;
  onDoubleClick: (id: string) => void;
  onEdgeHover: (edgeId: string | null, point: ScreenPoint | null) => void;
  craftColor: (craft: CraftKey) => string;
  theme: GraphTheme;
  arrivedIds?: readonly string[];
  config: GraphConfig;
  view: GraphLayoutKind;
  frameRequest?: number;
  frameScope?: "neighbourhood" | "all";
  frameAngle?: "reader" | "front";
  frameNodeId?: string | null;
  frameOnOpen?: boolean;
  /** The type caption over a node's name, already worded. */
  typeText: (node: GraphNode) => string;
  /** Off on a phone: no turntable, so a drag scrolls the page. */
  interactive?: boolean;
  /** A phone: a lower pixel ratio and no antialiasing. */
  lowPower?: boolean;
}

export default function GraphScene({
  nodes,
  edges,
  expanded,
  hoveredId,
  focusedId,
  highlightedIds,
  onHover,
  onClick,
  onDoubleClick,
  onEdgeHover,
  craftColor,
  theme,
  arrivedIds = NO_ARRIVALS,
  config,
  view,
  frameRequest,
  frameScope = "neighbourhood",
  frameAngle,
  frameNodeId,
  frameOnOpen = false,
  typeText,
  interactive = true,
  lowPower = false,
}: GraphSceneProps) {
  const reducedMotion = usePrefersReducedMotion();
  const palette = usePalette(theme, craftColor);
  const iconRef = useRef<HTMLDivElement>(null);
  const iconAtlas = useIconAtlas(iconRef);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pickRef = useRef<Picker | null>(null);
  const [hoveredEdgeId, setHoveredEdgeId] = useState<string | null>(null);
  const pointer = useRef<{ node: string | null; edge: string | null }>({
    node: null,
    edge: null,
  });
  const press = useRef<{ x: number; y: number } | null>(null);
  /** The node the last press was released on, when it was a click. */
  const released = useRef<string | null>(null);
  /** The node the first click of a possible double click landed on. */
  const clicked = useRef<string | null>(null);

  // Every node is drawn open, so no node prints a hidden count, and the
  // level planes are off: neither string is ever shown.
  const hiddenText = useCallback(() => "", []);
  // A type caption in capitals (decision 135).
  const captionText = useCallback(
    (node: GraphNode) => typeText(node).toLocaleUpperCase("en"),
    [typeText],
  );
  const levelText = useCallback(() => "", []);

  const pickAt = (event: { clientX: number; clientY: number }) => {
    const wrapper = wrapperRef.current;
    const pick = pickRef.current;
    if (!wrapper || !pick) return null;
    const rect = wrapper.getBoundingClientRect();
    return pick(event.clientX - rect.left, event.clientY - rect.top);
  };

  const setPointer = (
    node: string | null,
    edge: string | null,
    event: { clientX: number; clientY: number } | null,
  ) => {
    const point = event ? { x: event.clientX, y: event.clientY } : null;
    if (node !== pointer.current.node) {
      pointer.current.node = node;
      onHover(node, node ? point : null);
    }
    if (edge !== pointer.current.edge) {
      pointer.current.edge = edge;
      setHoveredEdgeId(edge);
      onEdgeHover(edge, edge ? point : null);
    }
    if (wrapperRef.current) {
      wrapperRef.current.style.cursor = node || edge ? "pointer" : "";
    }
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    // While orbiting, nothing is hovered: the card would chase the camera.
    if (event.buttons !== 0) {
      if (press.current) {
        const moved = Math.hypot(
          event.clientX - press.current.x,
          event.clientY - press.current.y,
        );
        if (moved > CLICK_SLOP) setPointer(null, null, null);
      }
      return;
    }
    const hit = pickAt(event);
    setPointer(
      hit?.kind === "node" ? hit.id : null,
      hit?.kind === "edge" ? hit.id : null,
      event,
    );
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = press.current;
    press.current = null;
    released.current = null;
    if (!start || event.button !== 0) return;
    if (
      Math.hypot(event.clientX - start.x, event.clientY - start.y) > CLICK_SLOP
    )
      return;
    const hit = pickAt(event);
    released.current = hit?.kind === "node" ? hit.id : null;
  };

  // A click reports the node its press was released on. Only the first click
  // of a double click counts: the second belongs to the double click, which
  // opens the node that first click landed on. By then the node has set off
  // for the centre and the camera with it, so whatever is under the pointer
  // now is not what the reader aimed at.
  const onCanvasClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    const id = released.current;
    released.current = null;
    if (event.detail > 1) return;
    clicked.current = id;
    if (id) onClick(id);
  };

  const onCanvasDoubleClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    const hit = pickAt(event);
    const id = clicked.current ?? (hit?.kind === "node" ? hit.id : null);
    clicked.current = null;
    if (id) onDoubleClick(id);
  };

  // The tokens are read off the page after the first paint; until they are,
  // there is nothing to draw in.
  const ready = theme.background !== "";

  return (
    <div
      ref={wrapperRef}
      className={`relative h-full w-full select-none ${interactive ? "touch-none" : "touch-pan-y"}`}
      onPointerMove={onPointerMove}
      onPointerDown={(event) => {
        press.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerUp={onPointerUp}
      onClick={onCanvasClick}
      onPointerLeave={() => {
        // A pointer off the canvas is inside nothing: the engine reads this
        // as "no pointer", which is what closes a lane's title again.
        pickRef.current?.(-1, -1);
        setPointer(null, null, null);
      }}
      onDoubleClick={onCanvasDoubleClick}
    >
      <div ref={iconRef} hidden>
        {ICON_SOURCES}
      </div>
      {ready && (
        <div className="absolute inset-0">
          <Canvas
            frameloop="demand"
            dpr={lowPower ? [1, 1.5] : [1, 2]}
            flat
            gl={{
              antialias: !lowPower,
              alpha: true,
              powerPreference: "high-performance",
            }}
            camera={{
              fov: config.camera.fov,
              near: 0.5,
              far: 3000,
              position: [0, 0, 120],
            }}
            onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
          >
            <World
              nodes={nodes}
              edges={edges}
              expanded={expanded}
              hoveredId={hoveredId}
              focusedId={focusedId}
              highlightedIds={highlightedIds}
              hoveredEdgeId={hoveredEdgeId}
              palette={palette}
              iconAtlas={iconAtlas}
              arrivedIds={arrivedIds}
              reducedMotion={reducedMotion}
              hiddenText={hiddenText}
              pickRef={pickRef}
              fonts={FONTS}
              config={config}
              view={view}
              captionText={captionText}
              levelText={levelText}
              frameRequest={frameRequest}
              frameScope={frameScope}
              frameAngle={frameAngle}
              frameNodeId={frameNodeId}
              frameOnOpen={frameOnOpen}
              interactive={interactive}
            />
          </Canvas>
        </div>
      )}
    </div>
  );
}

const NO_ARRIVALS: readonly string[] = [];

/**
 * The hidden icons the atlas is drawn from, made once: a settings drag
 * re-renders this component many times a second, and re-rendering every SVG
 * each time was most of what a frame cost.
 */
const ICON_SOURCES = ICON_KEYS.map((key) => {
  const Icon = NODE_ICONS[key];
  return (
    <Icon key={key} data-icon={key} strokeWidth={ICON_STROKE} aria-hidden />
  );
});

/** The theme as three.js colours, with the craft colours resolved lazily. */
function usePalette(
  theme: GraphTheme,
  craftColor: (craft: CraftKey) => string,
): Palette {
  return useMemo(() => {
    const crafts = new Map<CraftKey, Color>();
    const dark = theme.mode === "dark";
    const background = cssColor(theme.background);
    const foreground = cssColor(theme.foreground);
    // The glyph inks: the lighter and the darker of the page's two poles.
    const [glyphDark, glyphLight] = dark
      ? [background, foreground]
      : [foreground, background];
    return {
      dark,
      background,
      foreground,
      ink: foreground.clone().lerp(background, 0.16),
      muted: cssColor(theme.mutedForeground),
      primary: cssColor(theme.primary),
      success: cssColor(theme.success),
      warning: cssColor(theme.warning),
      destructive: cssColor(theme.destructive),
      craft: (craft) => {
        let color = crafts.get(craft);
        if (!color) {
          color = cssColor(craftColor(craft));
          crafts.set(craft, color);
        }
        return color;
      },
      glyphLight: glyphLight.clone(),
      glyphDark: glyphDark.clone(),
    };
  }, [theme, craftColor]);
}

/**
 * Every node icon in one texture (decision 120): the lucide components
 * rendered hidden, serialised, stroked white and drawn into a grid of cells.
 * White, so the engine inks each glyph per node with a colour that stands out
 * from its sphere. Drawn once; the colour is the engine's, not the atlas's.
 */
function useIconAtlas(ref: RefObject<HTMLDivElement | null>): IconAtlas | null {
  const [atlas, setAtlas] = useState<IconAtlas | null>(null);
  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const rows = Math.ceil(ICON_KEYS.length / ATLAS_COLUMNS);
    const canvas = document.createElement("canvas");
    canvas.width = ATLAS_COLUMNS * ATLAS_CELL;
    canvas.height = rows * ATLAS_CELL;
    const context = canvas.getContext("2d");
    if (!context) return;
    let cancelled = false;
    const cell = new Map<IconKey, number>();
    const inset = (ATLAS_CELL - ATLAS_GLYPH) / 2;
    const loads = ICON_KEYS.map((key, index) => {
      const svg = host.querySelector(`svg[data-icon="${key}"]`);
      if (!svg) return Promise.resolve();
      const clone = svg.cloneNode(true) as SVGSVGElement;
      clone.setAttribute("width", String(ATLAS_GLYPH));
      clone.setAttribute("height", String(ATLAS_GLYPH));
      clone.removeAttribute("class");
      const markup = new XMLSerializer()
        .serializeToString(clone)
        .replaceAll("currentColor", "#ffffff");
      return new Promise<void>((resolve) => {
        const image = new Image();
        image.onload = () => {
          const column = index % ATLAS_COLUMNS;
          const row = Math.floor(index / ATLAS_COLUMNS);
          context.drawImage(
            image,
            column * ATLAS_CELL + inset,
            row * ATLAS_CELL + inset,
            ATLAS_GLYPH,
            ATLAS_GLYPH,
          );
          cell.set(key, index);
          resolve();
        };
        image.onerror = () => resolve();
        image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`;
      });
    });
    void Promise.all(loads).then(() => {
      if (cancelled) return;
      const texture = new CanvasTexture(canvas);
      texture.colorSpace = SRGBColorSpace;
      texture.anisotropy = 4;
      setAtlas((previous) => {
        previous?.texture.dispose();
        return { texture, cell, columns: ATLAS_COLUMNS, rows };
      });
    });
    return () => {
      cancelled = true;
    };
  }, [ref]);
  return atlas;
}

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}
