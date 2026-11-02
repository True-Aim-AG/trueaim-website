"use client";

import dynamic from "next/dynamic";
import {
  Component,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { SCENE_CARD, SCENE_CARD_HERO } from "@/components/content/surface";
import { cn } from "@/lib/utils";

import { CLAIM_VIEW_CONFIG, PHONE_VIEW_CONFIG } from "./config";
import { HoverCard } from "./HoverCard";
import type { ScreenPoint } from "./renderer";
import { buildGraph, FLAGGED, HUBS, VIEWS, type ViewId } from "./sample-data";
import { craftColor, GRAPH_THEME } from "./theme";
import type { GraphNode, GraphNodeType } from "./types";

export type DataGraphData = {
  alt: string;
  viewsLabel: string;
  views: Record<ViewId, string>;
  types: Record<GraphNodeType, string>;
  /** "Read from {document}, page {page}" */
  source: string;
  /** "Flagged for review: same amount and date as {other}" */
  mismatch: string;
};

/**
 * The scene (three.js, the engine, the text renderer) is a separate chunk,
 * fetched once the page has loaded and gone idle, and never rendered on the
 * server. Until it arrives the box below holds the graph's exact size, so
 * nothing shifts.
 */
const GraphScene = dynamic(() => import("./scene/GraphScene"), {
  ssr: false,
  loading: () => null,
});

/** How often the two flagged invoices breathe, and how long each breath keeps them lit. */
const PULSE_EVERY_MS = 6000;
const PULSE_FOR_MS = 3000;
const PULSE_FIRST_MS = 2500;

const NO_IDS: readonly string[] = [];
const NO_HIGHLIGHTS: ReadonlySet<string> = new Set();

/**
 * The Data Extraction hero: the prototype's claim graph (its Claim view),
 * drawn from synthetic data. The buttons re-centre the ring on a claim, a
 * supplier, a policy or a document; clicking a node centres it. All copy
 * arrives as props from messages/; the data is in `sample-data.ts`.
 */
export function DataGraph({ data, hero }: { data: DataGraphData; hero?: boolean }) {
  const [view, setView] = useState<ViewId>("claim");
  const [centreId, setCentreId] = useState<string>(HUBS.claim);
  const [loaded, setLoaded] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [hover, setHover] = useState<{ id: string; point: ScreenPoint; box: DOMRect } | null>(null);
  const [arrived, setArrived] = useState<readonly string[]>(NO_IDS);
  const webgl = useSyncExternalStore(noSubscription, hasWebGL, () => false);
  const phone = useSyncExternalStore(subscribePhone, isPhone, () => false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => false);
  const boxRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const { types, source, mismatch } = data;
  const graph = useMemo(() => buildGraph({ types, source, mismatch }, phone), [types, source, mismatch, phone]);
  const expanded = useMemo(() => new Set(graph.nodes.map((node) => node.id)), [graph]);
  const byId = useMemo(() => new Map(graph.nodes.map((node) => [node.id, node])), [graph]);
  const typeText = useCallback((node: GraphNode) => types[node.type], [types]);

  // The two flagged invoices breathe once every few seconds, with the
  // prototype's arrival pulse: a gentle swell of the shape and its amber
  // ring, the name held up while it lasts. Never under reduced motion.
  useEffect(() => {
    if (!webgl || reducedMotion) return;
    let off: ReturnType<typeof setTimeout> | undefined;
    const pulse = () => {
      setArrived(FLAGGED);
      off = setTimeout(() => setArrived(NO_IDS), PULSE_FOR_MS);
    };
    const first = setTimeout(pulse, PULSE_FIRST_MS);
    const every = setInterval(pulse, PULSE_EVERY_MS);
    return () => {
      clearTimeout(first);
      clearInterval(every);
      if (off) clearTimeout(off);
    };
  }, [webgl, reducedMotion]);

  // The scene's chunk is not fetched until the page has loaded and gone idle.
  useEffect(() => {
    let cancelled = false;
    let cancel = () => undefined as void;
    const run = () => {
      if (cancelled) return;
      if (typeof window.requestIdleCallback === "function") {
        const handle = window.requestIdleCallback(() => setLoaded(true));
        cancel = () => window.cancelIdleCallback(handle);
      } else {
        const handle = setTimeout(() => setLoaded(true), 200);
        cancel = () => clearTimeout(handle);
      }
    };
    if (document.readyState === "complete") run();
    else window.addEventListener("load", run, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", run);
      cancel();
    };
  }, []);

  // The scene is unmounted while the hero is off screen, so it draws nothing
  // and holds no frame loop then.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const arrange = (next: ViewId) => {
    setView(next);
    setCentreId(HUBS[next]);
  };

  const onHover = useCallback(
    (id: string | null, point: ScreenPoint | null) => {
      const box = boxRef.current?.getBoundingClientRect();
      setHover(id && point && box && !phone ? { id, point, box } : null);
    },
    [phone],
  );

  const hovered = hover ? byId.get(hover.id) : undefined;

  return (
    <div
      ref={cardRef}
      className={cn(SCENE_CARD, hero && SCENE_CARD_HERO, "relative rounded-[10px] bg-white/70 backdrop-blur-md")}
    >
      <div
        role="group"
        aria-label={data.viewsLabel}
        className="absolute left-3 top-3 z-10 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-1.5"
      >
        {VIEWS.map((id) => (
          <button
            key={id}
            type="button"
            aria-pressed={view === id}
            onClick={() => arrange(id)}
            className={cn(
              "rounded-pill px-3 py-1.5 text-[12px] font-medium leading-none transition-colors duration-150 ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
              view === id
                ? "bg-accent text-on-brand"
                : "bg-card text-body shadow-[0_0_0_1px_rgba(44,43,42,.12)] hover:bg-accent-soft",
            )}
          >
            {data.views[id]}
          </button>
        ))}
      </div>
      <div
        ref={boxRef}
        role="img"
        aria-label={data.alt}
        className="relative aspect-square overflow-hidden sm:aspect-[6/5] lg:aspect-auto lg:h-[600px]"
      >
        {webgl && loaded && onScreen && (
          <SceneBoundary>
            <GraphScene
              nodes={graph.nodes}
              edges={graph.edges}
              expanded={expanded}
              hoveredId={hovered?.id ?? null}
              focusedId={centreId}
              highlightedIds={NO_HIGHLIGHTS}
              onHover={onHover}
              onClick={setCentreId}
              onDoubleClick={noop}
              onEdgeHover={noop}
              craftColor={craftColor}
              theme={GRAPH_THEME}
              arrivedIds={arrived}
              config={phone ? PHONE_VIEW_CONFIG : CLAIM_VIEW_CONFIG}
              view="ring"
              typeText={typeText}
              interactive={!phone}
              lowPower={phone}
            />
          </SceneBoundary>
        )}
        {hovered && hover && (
          <HoverCard node={hovered} kicker={types[hovered.type]} point={hover.point} box={hover.box} />
        )}
      </div>
    </div>
  );
}

const noop = () => undefined;
const noSubscription = () => () => undefined;

let webglSupported: boolean | undefined;

/** Whether the browser can start WebGL at all; the context is handed back at once. */
function hasWebGL(): boolean {
  if (webglSupported === undefined) {
    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
      webglSupported = context != null;
      context?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      webglSupported = false;
    }
  }
  return webglSupported;
}

/** Below the `md` breakpoint: the lighter graph, tap only. */
const PHONE_QUERY = "(max-width: 767.98px)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribePhone(onChange: () => void) {
  const query = window.matchMedia(PHONE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const isPhone = () => window.matchMedia(PHONE_QUERY).matches;

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const prefersReducedMotion = () => window.matchMedia(REDUCED_QUERY).matches;

/** A context that fails to start after the check passed leaves the quiet empty box. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
