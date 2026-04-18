"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const TOTAL_FRAMES = 121;
const FRAME_PATH = "/frames/claimpilot/frame_";

// Annotation cards that appear at specific scroll progress points
const annotations = [
  {
    show: 0.05,
    hide: 0.25,
    title: "ClaimPilot",
    description: "AI-powered claims processing in a single, auditable workflow.",
  },
  {
    show: 0.3,
    hide: 0.55,
    title: "Four Pipeline Stages",
    description: "Ingest. Classify. Decide. Audit. Every step deterministic and traceable.",
  },
  {
    show: 0.6,
    hide: 0.85,
    title: "Full Transparency",
    description: "Every decision is explainable, every data flow visible, every outcome auditable.",
  },
];

export function ScrollVideoAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);
  const rafRef = useRef<number>(0);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Draw a frame on the canvas with cover-fit.
  // Falls back to the nearest loaded frame ≤ frameIndex so scrolling
  // works as soon as frame 0 is ready, even if later frames are still
  // streaming in.
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img: HTMLImageElement | undefined;
    for (let i = frameIndex; i >= 0; i--) {
      const candidate = framesRef.current[i];
      if (candidate && candidate.complete && candidate.naturalWidth > 0) {
        img = candidate;
        break;
      }
    }
    if (!img) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;

    // Only resize if needed
    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvas.width / canvas.height;

    // Contain-fit everywhere: guarantees the whole frame is always
    // visible, never clipped. Subject size varies wildly across the
    // animation (tight capsule → exploded pipeline filling the frame),
    // so any cover-fit or crop risks cutting off the dense frames.
    //
    // Anchor: top on landscape (so vertical slack drops to the bottom
    // where the gradient hides it — avoids subject sitting low on
    // screen); centered on portrait (symmetric framing; the bottom
    // slack on a top-anchor would be visually jarring on mobile).
    let destW: number, destH: number;
    if (imgRatio > canvasRatio) {
      destW = canvas.width;
      destH = canvas.width / imgRatio;
    } else {
      destH = canvas.height;
      destW = canvas.height * imgRatio;
    }
    const dx = (canvas.width - destW) / 2;
    const dy = canvasRatio < 1 ? (canvas.height - destH) / 2 : 0;
    ctx.drawImage(
      img,
      0, 0, img.naturalWidth, img.naturalHeight,
      dx, dy, destW, destH
    );
  }, []);

  // Stream frames in. Canvas reveals as soon as frame 0 is ready; the
  // rest continue downloading in the background. drawFrame walks back
  // to the nearest loaded frame, so scrolling works during streaming.
  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const handleFrameReady = (index: number) => {
      if (cancelled) return;
      if (index === 0) setLoaded(true);
      // If this new frame is a better fit for what the user is currently
      // looking at, redraw so it snaps into place.
      if (
        currentFrameRef.current >= 0 &&
        index <= currentFrameRef.current
      ) {
        drawFrame(currentFrameRef.current);
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = String(i + 1).padStart(4, "0");
      img.onload = () => handleFrameReady(i);
      // Failed loads still count toward progress so the indicator completes,
      // and frame 0 always reveals the canvas (avoids a stuck loader).
      img.onerror = () => handleFrameReady(i);
      img.src = `${FRAME_PATH}${num}.jpg`;
      images[i] = img;
    }

    framesRef.current = images;

    return () => {
      cancelled = true;
      for (const img of images) {
        if (!img) continue;
        img.onload = null;
        img.onerror = null;
        // Per HTML spec, clearing src aborts in-flight loads.
        img.src = "";
      }
      framesRef.current = [];
    };
  }, [drawFrame]);

  // Scroll handler — map scroll position to frame index
  useEffect(() => {
    if (!loaded) return;

    // Draw first frame immediately
    drawFrame(0);
    currentFrameRef.current = 0;

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const scrollableHeight = container.offsetHeight - window.innerHeight;
        // Very tall viewports / zoom-out can make the container shorter
        // than the viewport — no scrollable range to map into.
        if (scrollableHeight <= 0) return;

        // Progress: 0 when top of container hits top of viewport,
        // 1 when bottom of container hits bottom of viewport
        const rawProgress = -rect.top / scrollableHeight;
        const clampedProgress = Math.max(0, Math.min(1, rawProgress));

        // Ease-in curve on the scroll→frame mapping: early scroll advances
        // through more frames so the capsule starts opening immediately,
        // instead of sitting closed while the user wonders if it's working.
        // Annotation cards track the same eased value, so they stay synced
        // with the visual frame rather than the raw scroll position.
        const easedProgress = Math.pow(clampedProgress, 0.6);

        setProgress(easedProgress);

        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(easedProgress * (TOTAL_FRAMES - 1))
        );

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial position

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loaded, drawFrame]);

  // Handle resize
  useEffect(() => {
    if (!loaded) return;

    const onResize = () => {
      if (currentFrameRef.current >= 0) {
        drawFrame(currentFrameRef.current);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [loaded, drawFrame]);

  return (
    <section ref={containerRef} className="relative h-[200vh] md:h-[350vh]">
      {/* Sticky canvas fills viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Loading indicator — shown only until frame 0 is ready, so it
            stays briefly and is just an indeterminate hint. */}
        {!loaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[var(--background)]">
            <div className="text-sm text-[var(--text-muted)] font-mono-data animate-pulse">
              Loading animation…
            </div>
          </div>
        )}

        {/* The canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: loaded ? 1 : 0 }}
        />

        {/* Gradient overlays for blending with site background */}
        <div
          className="absolute inset-x-0 top-0 h-[240px] pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to bottom, var(--background) 0%, var(--background) 15%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[240px] pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to top, var(--background) 0%, var(--background) 15%, transparent 100%)",
          }}
        />
        {/* Side overlays blend ultrawide horizontal letterbox into the
            page background. On standard-ratio viewports they act as a
            soft cinematic edge vignette. */}
        <div
          className="absolute inset-y-0 left-0 w-[20vw] pointer-events-none z-10 hidden md:block"
          style={{
            background:
              "linear-gradient(to right, var(--background) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-[20vw] pointer-events-none z-10 hidden md:block"
          style={{
            background:
              "linear-gradient(to left, var(--background) 0%, transparent 100%)",
          }}
        />

        {/* Annotation cards */}
        {loaded &&
          annotations.map((card, i) => {
            const visible = progress >= card.show && progress <= card.hide;
            return (
              <div
                key={i}
                className="absolute z-20 transition-all duration-500 ease-out"
                style={{
                  bottom: "8vh",
                  left: "50%",
                  transform: `translateX(-50%) translateY(${visible ? "0" : "20px"})`,
                  opacity: visible ? 1 : 0,
                  pointerEvents: visible ? "auto" : "none",
                }}
              >
                <div className="glass-panel px-6 py-4 md:px-8 md:py-5 max-w-md text-center">
                  <div className="text-xs font-mono-data text-[var(--primary)] mb-1 tracking-wider uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[var(--text-primary)] mb-1">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] hidden md:block">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}

        {/* Scroll hint at the start */}
        {loaded && progress < 0.05 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 animate-pulse">
            <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest">
              Scroll to explore
            </span>
            <svg
              className="w-4 h-4 text-[var(--primary)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        )}
      </div>
    </section>
  );
}
