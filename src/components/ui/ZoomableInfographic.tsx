"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

interface ZoomableInfographicProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export function ZoomableInfographic({
  src,
  alt,
  width,
  height,
  caption,
}: ZoomableInfographicProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read browser-only state after hydration, preserving the server render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <figure className="mb-8">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative block w-full group bg-card shadow-card overflow-hidden rounded-none cursor-zoom-in focus:outline-none focus-visible:ring-[3px] focus-visible:ring-focus"
          aria-label={`Zoom in on ${alt}`}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="w-full h-auto"
            sizes="(max-width: 768px) 100vw, 768px"
          />
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-pill bg-dark px-3 py-2 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
            <ZoomIn className="w-4 h-4 text-on-dark" strokeWidth={1.5} />
            <span className="text-xs text-on-dark font-medium">Click to zoom</span>
          </div>
        </button>
        {caption && (
          <figcaption className="text-xs text-muted text-center mt-3">
            {caption}
          </figcaption>
        )}
      </figure>

      {mounted && isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "var(--overlay-scrim)" }}
            onClick={() => setIsOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 rounded-pill bg-dark p-2.5 transition-colors hover:bg-dark-2"
              aria-label="Close zoom view"
            >
              <X className="w-6 h-6 text-on-dark" strokeWidth={1.5} />
            </button>
            <div
              className="relative max-w-[95vw] max-h-[95vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="max-w-[95vw] max-h-[95vh] w-auto h-auto object-contain"
                sizes="95vw"
                priority
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
