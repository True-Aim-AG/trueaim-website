"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const screenshots = [
  {
    id: "document-review",
    src: "/screenshots/document-review.png",
    title: "Document Review",
    description: "QA console with document list, PDF preview, and intelligent field extraction panel",
    highlight: "Human-in-the-loop review",
  },
  {
    id: "extraction",
    src: "/screenshots/extraction-dashboard.png",
    title: "Extraction Dashboard",
    description: "Real-time pipeline metrics: Ingestion, Classification, Extraction, and Quality Gates",
    highlight: "Full pipeline visibility",
  },
  {
    id: "benchmark",
    src: "/screenshots/benchmark-view.png",
    title: "Benchmark & Analytics",
    description: "Performance tracking with accuracy metrics, error analysis, and evidence rates",
    highlight: "97.3% extraction accuracy",
  },
];

export function ScreenshotShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Staggered card animations with 3D perspective
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const isEven = index % 2 === 0;

        // Initial state - cards start from different positions
        gsap.set(card, {
          opacity: 0,
          y: 100,
          rotateX: 15,
          rotateY: isEven ? -8 : 8,
          scale: 0.9,
          transformPerspective: 1200,
        });

        // Scroll-triggered reveal
        gsap.to(card, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 40%",
            toggleActions: "play none none reverse",
          },
        });

        // Parallax effect on scroll
        gsap.to(card, {
          y: -30 * (index + 1),
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        // Image inside card - subtle float
        const image = card.querySelector(".screenshot-image");
        if (image) {
          gsap.to(image, {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          });
        }

        // Glow effect on scroll into view
        const glow = card.querySelector(".card-glow");
        if (glow) {
          gsap.fromTo(
            glow,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.8,
              delay: 0.3,
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[var(--aurora-cyan)]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--primary)]/5 rounded-full blur-[100px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--aurora-cyan) 1px, transparent 1px),
                           linear-gradient(90deg, var(--aurora-cyan) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--aurora-cyan)]/10 border border-[var(--aurora-cyan)]/20 text-[var(--aurora-cyan)] text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--aurora-cyan)] animate-pulse" />
            See It In Action
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
            The Interface That Powers
            <br />
            <span className="text-[var(--aurora-cyan)]">Intelligent Document Processing</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            From ingestion to extraction, every step is visible, measurable, and auditable.
            Built for claims professionals who demand precision.
          </p>
        </div>

        {/* Screenshot Cards - Stacked Layout */}
        <div className="space-y-16 md:space-y-24">
          {screenshots.map((screenshot, index) => (
            <div
              key={screenshot.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`relative group ${
                index % 2 === 0 ? "md:ml-0 md:mr-auto" : "md:mr-0 md:ml-auto"
              }`}
              style={{
                maxWidth: "900px",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Glow effect */}
              <div className="card-glow absolute -inset-4 bg-gradient-to-r from-[var(--aurora-cyan)]/20 via-transparent to-[var(--primary)]/20 rounded-3xl blur-xl opacity-0" />

              {/* Card container */}
              <div className="relative rounded-2xl overflow-hidden bg-[var(--card-bg)] border border-[var(--border)] shadow-2xl shadow-black/20">
                {/* Top bar - mimics app chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[var(--subtle-bg)] border-b border-[var(--border)]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-1 rounded-md bg-[var(--background)] text-xs text-[var(--text-muted)] font-mono">
                      contextbuilder.trueaim.ai/{screenshot.id}
                    </div>
                  </div>
                </div>

                {/* Screenshot image */}
                <div className="relative overflow-hidden">
                  <div className="screenshot-image">
                    <Image
                      src={screenshot.src}
                      alt={screenshot.title}
                      width={1200}
                      height={800}
                      className="w-full h-auto"
                      quality={95}
                    />
                  </div>

                  {/* Gradient overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--card-bg)] to-transparent" />
                </div>

                {/* Info panel */}
                <div className="relative px-6 pb-6 -mt-20 z-10">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--aurora-cyan)]/20 text-[var(--aurora-cyan)] text-xs font-medium mb-3">
                        {screenshot.highlight}
                      </div>
                      <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                        {screenshot.title}
                      </h3>
                      <p className="text-[var(--text-secondary)] max-w-md">
                        {screenshot.description}
                      </p>
                    </div>

                    {/* Feature number indicator */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[var(--aurora-cyan)]/10 border border-[var(--aurora-cyan)]/30 flex items-center justify-center">
                        <span className="text-xl font-bold text-[var(--aurora-cyan)] font-mono">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative lines */}
              <div
                className={`hidden md:block absolute top-1/2 ${
                  index % 2 === 0 ? "-right-8" : "-left-8"
                } w-8 h-px bg-gradient-to-r from-[var(--aurora-cyan)]/50 to-transparent`}
              />
            </div>
          ))}
        </div>

        {/* Bottom connector line */}
        <div className="flex justify-center mt-16">
          <div className="flex flex-col items-center gap-3">
            <div className="w-px h-16 bg-gradient-to-b from-[var(--aurora-cyan)]/50 to-transparent" />
            <div className="px-4 py-2 rounded-full bg-[var(--subtle-bg)] border border-[var(--border)] text-sm text-[var(--text-secondary)]">
              Ready to see more?
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
