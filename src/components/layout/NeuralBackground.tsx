"use client";

import { useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulseSpeed: number;
  pulseOffset: number;
}

const PARTICLE_COUNT = 120;
const CONNECTION_DISTANCE = 150;
const BASE_SPEED = 0.15;
const SCROLL_MULTIPLIER = 0.8;

function createParticles(width: number, height: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * BASE_SPEED * 2,
      vy: Math.random() * BASE_SPEED + 0.05,
      radius: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulseOffset: Math.random() * Math.PI * 2,
    });
  }
  return particles;
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    particles: [] as Particle[],
    scrollVelocity: 0,
    width: 0,
    height: 0,
    reducedMotion: false,
    time: 0,
    animationFrame: 0,
    prevScrollY: 0,
  });

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const s = stateRef.current;
    const velocity = Math.abs(latest - s.prevScrollY);
    s.scrollVelocity = Math.min(velocity * 0.1, 5);
    s.prevScrollY = latest;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const s = stateRef.current;

    // Check reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    s.reducedMotion = motionQuery.matches;
    const motionHandler = (e: MediaQueryListEvent) => {
      s.reducedMotion = e.matches;
    };
    motionQuery.addEventListener("change", motionHandler);

    // Handle resize
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);

      s.width = width;
      s.height = height;

      if (s.particles.length === 0) {
        s.particles = createParticles(width, height);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Animation loop
    function draw() {
      const ctx = canvas!.getContext("2d");
      if (!ctx) return;

      const { width, height, particles, reducedMotion } = s;

      ctx.clearRect(0, 0, width, height);
      s.time += 1;

      // Decay scroll velocity
      s.scrollVelocity *= 0.95;

      if (reducedMotion) {
        // Static render for reduced motion
        for (const p of particles) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity * 0.5})`;
          ctx.fill();
        }
        s.animationFrame = requestAnimationFrame(draw);
        return;
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particles with scroll velocity boost
        p.x += p.vx;
        p.y += p.vy + s.scrollVelocity * SCROLL_MULTIPLIER;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y > height) {
          p.y = 0;
          p.x = Math.random() * width;
        }
        if (p.y < 0) p.y = height;

        // Pulsing opacity
        const pulse = Math.sin(s.time * p.pulseSpeed + p.pulseOffset);
        const currentOpacity = p.opacity * (0.7 + pulse * 0.3);

        // Draw glow
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.radius * 4
        );
        gradient.addColorStop(0, `rgba(59, 130, 246, ${currentOpacity})`);
        gradient.addColorStop(0.5, `rgba(0, 163, 255, ${currentOpacity * 0.3})`);
        gradient.addColorStop(1, `rgba(0, 163, 255, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${currentOpacity})`;
        ctx.fill();
      }

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.stroke();
          }
        }
      }

      s.animationFrame = requestAnimationFrame(draw);
    }

    s.animationFrame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", handleResize);
      motionQuery.removeEventListener("change", motionHandler);
      if (s.animationFrame) {
        cancelAnimationFrame(s.animationFrame);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{ opacity: 0.6 }}
    />
  );
}
