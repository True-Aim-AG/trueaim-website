"use client";

import { Pause, Play } from "lucide-react";
import { type CSSProperties, useEffect, useRef, useState, useSyncExternalStore } from "react";

import { SCENE_CARD, SCENE_CARD_HERO } from "@/components/content/surface";
import { cn } from "@/lib/utils";

export type HeroLoopData = {
  alt: string;
  pause: string;
  play: string;
};

export type HeroLoopFiles = {
  /** Path without extension: `.webm` and `.mp4` are both served from it. */
  src: string;
  poster: string;
  width: number;
  height: number;
};

/** Phones (below the `md` breakpoint, 768px) get their own, smaller film. */
const DESKTOP_QUERY = "(min-width: 768px)";
const noSubscription = () => () => undefined;
const matchesDesktop = () => window.matchMedia(DESKTOP_QUERY).matches;

/**
 * The Data Extraction hero: a silent, looping film of the claims graph being
 * arranged by claim, supplier, policy and document type. It autoplays on
 * landing; under reduced motion it stays on the poster until the visitor
 * presses play. The toggle lets anyone pause it (WCAG 2.2.2).
 *
 * There are two films, one for phones and one for larger screens. The server
 * renders the matching poster through a media-switched `<picture>` in a box of
 * the right shape for each; once mounted, the client picks the film with
 * `matchMedia` and only then gives the video its sources, so a visitor
 * downloads one film, never both.
 */
export function HeroLoop({
  data,
  desktop,
  phone,
}: {
  data: HeroLoopData;
  desktop: HeroLoopFiles;
  phone: HeroLoopFiles;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  // Chosen once, on the client; `null` on the server and while hydrating.
  const isDesktop = useSyncExternalStore(noSubscription, matchesDesktop, () => null);
  const files = isDesktop === null ? null : isDesktop ? desktop : phone;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) video.pause();
    // The film may have started before React attached the play handlers.
    const sync = () => setPlaying(!video.paused);
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    const frame = requestAnimationFrame(sync);
    return () => {
      video.removeEventListener("play", sync);
      video.removeEventListener("pause", sync);
      cancelAnimationFrame(frame);
    };
  }, [files]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => undefined);
    else video.pause();
  };

  return (
    <div className={cn(SCENE_CARD, SCENE_CARD_HERO, "relative rounded-[10px]")}>
      <div
        role="img"
        aria-label={data.alt}
        className="aspect-(--ratio-phone) md:aspect-(--ratio-desktop)"
        style={
          {
            "--ratio-phone": `${phone.width} / ${phone.height}`,
            "--ratio-desktop": `${desktop.width} / ${desktop.height}`,
          } as CSSProperties
        }
      >
        {files ? (
          <video
            key={files.src}
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={files.poster}
            width={files.width}
            height={files.height}
            className="block h-auto w-full"
          >
            <source src={`${files.src}.webm`} type="video/webm" />
            <source src={`${files.src}.mp4`} type="video/mp4" />
          </video>
        ) : (
          <picture>
            <source media={DESKTOP_QUERY} srcSet={desktop.poster} width={desktop.width} height={desktop.height} />
            <img
              src={phone.poster}
              alt=""
              width={phone.width}
              height={phone.height}
              className="block h-auto w-full"
            />
          </picture>
        )}
      </div>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? data.pause : data.play}
        className="absolute bottom-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-pill bg-card/85 text-body shadow-[0_0_0_1px_rgba(44,43,42,.12)] transition-colors duration-150 ease-brand hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
      >
        {playing ? <Pause aria-hidden size={14} /> : <Play aria-hidden size={14} />}
      </button>
    </div>
  );
}
