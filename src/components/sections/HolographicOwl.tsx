"use client";

import { useEffect, useRef } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  LineSegments,
  BufferGeometry,
  Float32BufferAttribute,
  LineBasicMaterial,
  Group,
  ACESFilmicToneMapping,
  Vector2,
  WebGLRenderTarget,
  HalfFloatType,
} from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { useTheme } from "@/components/theme/ThemeProvider";

// Promotes per-pixel luminance to alpha so bloom halos stay visible
// against a transparent canvas background.
const LuminanceAlphaShader = {
  uniforms: {
    tDiffuse: { value: null },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    varying vec2 vUv;
    void main() {
      vec4 texel = texture2D(tDiffuse, vUv);
      float lum = max(max(texel.r, texel.g), texel.b);
      gl_FragColor = vec4(texel.rgb, max(texel.a, lum));
    }
  `,
};

type OwlParams = {
  lineLength: number;
  lengthVar: number;
  thickness: number;
  density: number;
  step: number;
  worldScale: number;
  axisX: number;
  axisY: number;
  axisZ: number;
  opacity: number;
  lineColor: string;
  exposure: number;
  rotSpeed: number;
  bloomStrength: number;
  bloomRadius: number;
  bloomThreshold: number;
};

const DARK_PARAMS: OwlParams = {
  lineLength: 0.028,
  lengthVar: 0.47,
  thickness: 0.22,
  density: 1,
  step: 1,
  worldScale: 3.2,
  axisX: 0,
  axisY: 0,
  axisZ: 1,
  opacity: 0.85,
  lineColor: "#f7f7f7",
  exposure: 1.0,
  rotSpeed: 0.21,
  bloomStrength: 0.1,
  bloomRadius: 0.29,
  bloomThreshold: 0,
};

const LIGHT_PARAMS: OwlParams = {
  lineLength: 0.03,
  lengthVar: 0.4,
  thickness: 0.13,
  density: 1,
  step: 1,
  worldScale: 3.2,
  axisX: 0,
  axisY: 0,
  axisZ: 1,
  opacity: 0.96,
  lineColor: "#4338CA",
  exposure: 1.0,
  rotSpeed: 0.21,
  bloomStrength: 0,
  bloomRadius: 0.29,
  bloomThreshold: 0,
};

interface OwlState {
  renderer: WebGLRenderer | null;
  composer: EffectComposer | null;
  scene: Scene | null;
  camera: PerspectiveCamera | null;
  owlGroup: Group | null;
  animationFrame: number;
  autoRotAngleY: number;
  autoRotAngleX: number;
  lastTime: number;
  isVisible: boolean;
  reducedMotion: boolean;
  isDragging: boolean;
  dragStartX: number;
  dragStartY: number;
  dragAngleStartY: number;
  dragAngleStartX: number;
  dragVelocityY: number;
  dragVelocityX: number;
}

function buildGeometry(
  pixels: Uint8ClampedArray,
  sw: number,
  sh: number,
  density: number,
  params: OwlParams,
): { positions: Float32Array; count: number } {
  const samplePositions: number[] = [];
  const { step, worldScale, thickness } = params;
  const refDim = Math.max(sw, sh);

  for (let y = 0; y < sh; y += step) {
    for (let x = 0; x < sw; x += step) {
      const i = (y * sw + x) * 4;
      const r = pixels[i],
        g = pixels[i + 1],
        b = pixels[i + 2],
        a = pixels[i + 3];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      if (a < 128 || lum > 220) continue;

      const wx = ((x - sw / 2) / refDim) * worldScale;
      const wy = -((y - sh / 2) / refDim) * worldScale;

      for (let p = 0; p < density; p++) {
        samplePositions.push(
          wx + (Math.random() - 0.5) * 0.02,
          wy + (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * thickness,
        );
      }
    }
  }

  const pointCount = samplePositions.length / 3;
  const lineVerts = new Float32Array(pointCount * 6);

  let ax = params.axisX,
    ay = params.axisY,
    az = params.axisZ;
  const alen = Math.sqrt(ax * ax + ay * ay + az * az) || 1;
  ax /= alen;
  ay /= alen;
  az /= alen;

  const minHalf = params.lineLength * (1 - params.lengthVar);
  const varRange = params.lineLength * params.lengthVar;

  for (let i = 0; i < pointCount; i++) {
    const cx = samplePositions[i * 3];
    const cy = samplePositions[i * 3 + 1];
    const cz = samplePositions[i * 3 + 2];
    const halfLen = minHalf + Math.random() * varRange;

    const j = i * 6;
    lineVerts[j] = cx - ax * halfLen;
    lineVerts[j + 1] = cy - ay * halfLen;
    lineVerts[j + 2] = cz - az * halfLen;
    lineVerts[j + 3] = cx + ax * halfLen;
    lineVerts[j + 4] = cy + ay * halfLen;
    lineVerts[j + 5] = cz + az * halfLen;
  }

  return { positions: lineVerts, count: pointCount };
}

export function HolographicOwl() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const params: OwlParams = theme === "light" ? LIGHT_PARAMS : DARK_PARAMS;

    // Create canvas programmatically so React StrictMode double-invoke
    // gets a fresh canvas each time (forceContextLoss kills the old one)
    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.setAttribute("aria-hidden", "true");
    container.appendChild(canvas);

    const s: OwlState = {
      renderer: null,
      composer: null,
      scene: null,
      camera: null,
      owlGroup: null,
      animationFrame: 0,
      autoRotAngleY: 0,
      autoRotAngleX: 0,
      lastTime: 0,
      isVisible: true,
      reducedMotion: false,
      isDragging: false,
      dragStartX: 0,
      dragStartY: 0,
      dragAngleStartY: 0,
      dragAngleStartX: 0,
      dragVelocityY: 0,
      dragVelocityX: 0,
    };

    // Check reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    s.reducedMotion = motionQuery.matches;
    const motionHandler = (e: MediaQueryListEvent) => {
      s.reducedMotion = e.matches;
    };
    motionQuery.addEventListener("change", motionHandler);

    // Mobile density reduction (floor at 1 so low-density presets aren't
    // accidentally amplified on mobile).
    const density =
      window.innerWidth < 768
        ? Math.max(1, Math.floor(params.density / 2))
        : params.density;

    // Scene setup
    const scene = new Scene();
    const camera = new PerspectiveCamera(65, 1, 0.1, 100);
    camera.position.z = 4.4;

    const renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = params.exposure;

    // Note: no scene lights needed — LineBasicMaterial is unlit.
    // Owl color/opacity come entirely from the material + bloom pass.

    // Post-processing: bloom pass + luminance→alpha to keep bg transparent
    const renderTarget = new WebGLRenderTarget(1, 1, {
      type: HalfFloatType,
    });
    const composer = new EffectComposer(renderer, renderTarget);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new Vector2(1, 1),
      params.bloomStrength,
      params.bloomRadius,
      params.bloomThreshold,
    );
    composer.addPass(bloomPass);
    const alphaPass = new ShaderPass(LuminanceAlphaShader);
    composer.addPass(alphaPass);

    s.scene = scene;
    s.camera = camera;
    s.renderer = renderer;
    s.composer = composer;
    s.lastTime = performance.now() * 0.001;

    // Handle resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio, 2);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(dpr);
      composer.setSize(width, height);
      composer.setPixelRatio(dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Load image and build geometry
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/images/owl-logo.png";

    img.onload = () => {
      const maxDim = 200;
      const aspect = img.width / img.height;
      const sw = aspect >= 1 ? maxDim : Math.round(maxDim * aspect);
      const sh = aspect >= 1 ? Math.round(maxDim / aspect) : maxDim;

      const cvs = document.createElement("canvas");
      cvs.width = sw;
      cvs.height = sh;
      const ctx = cvs.getContext("2d")!;
      ctx.drawImage(img, 0, 0, sw, sh);
      const pixels = ctx.getImageData(0, 0, sw, sh).data;

      const { positions } = buildGeometry(pixels, sw, sh, density, params);

      const lineGeo = new BufferGeometry();
      lineGeo.setAttribute("position", new Float32BufferAttribute(positions, 3));

      const lineMat = new LineBasicMaterial({
        color: params.lineColor,
        transparent: true,
        opacity: params.opacity,
      });

      const lines = new LineSegments(lineGeo, lineMat);
      const owlGroup = new Group();
      owlGroup.add(lines);
      scene.add(owlGroup);
      s.owlGroup = owlGroup;

      // If reduced motion, render one static frame
      if (s.reducedMotion) {
        composer.render();
        return;
      }

      // Start animation loop
      startAnimation();
    };

    function startAnimation() {
      function animate() {
        s.animationFrame = requestAnimationFrame(animate);

        if (!s.isVisible) return;

        const t = performance.now() * 0.001;
        const dt = t - s.lastTime;
        s.lastTime = t;

        if (s.owlGroup) {
          if (!s.isDragging) {
            // Blend Y velocity back toward auto-rotation speed
            s.dragVelocityY += (params.rotSpeed - s.dragVelocityY) * 0.05;
            s.autoRotAngleY += s.dragVelocityY * dt;
            // Blend X back toward 0 (level)
            s.dragVelocityX *= 0.95;
            s.autoRotAngleX += s.dragVelocityX * dt;
            s.autoRotAngleX *= 0.97; // decay tilt back to center
          }
          s.owlGroup.rotation.y = s.autoRotAngleY;
          s.owlGroup.rotation.x = s.autoRotAngleX;
        }

        composer.render();
      }

      s.lastTime = performance.now() * 0.001;
      animate();
    }

    // ─── Mouse / Touch drag interaction (whole window) ───────────────
    const DRAG_SENSITIVITY = 0.01;
    const INTERACTIVE_TAGS = new Set(["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA", "LABEL"]);

    function isInteractive(el: EventTarget | null): boolean {
      if (!el || !(el instanceof HTMLElement)) return false;
      if (INTERACTIVE_TAGS.has(el.tagName)) return true;
      // Walk up a few levels for wrapped links/buttons
      let node: HTMLElement | null = el;
      for (let i = 0; i < 4 && node; i++) {
        if (INTERACTIVE_TAGS.has(node.tagName)) return true;
        if (node.getAttribute("role") === "button") return true;
        if (node.closest("a, button, [role=button]")) return true;
        node = node.parentElement;
      }
      return false;
    }

    function onPointerDown(e: PointerEvent) {
      if (e.button !== 0) return;
      if (isInteractive(e.target)) return;
      s.isDragging = true;
      s.dragStartX = e.clientX;
      s.dragStartY = e.clientY;
      s.dragAngleStartY = s.autoRotAngleY;
      s.dragAngleStartX = s.autoRotAngleX;
      s.dragVelocityY = 0;
      s.dragVelocityX = 0;
    }

    function onPointerMove(e: PointerEvent) {
      if (!s.isDragging) return;
      const dx = e.clientX - s.dragStartX;
      const dy = e.clientY - s.dragStartY;
      s.autoRotAngleY = s.dragAngleStartY + dx * DRAG_SENSITIVITY;
      s.autoRotAngleX = s.dragAngleStartX + dy * DRAG_SENSITIVITY;
      // Clamp vertical tilt to avoid flipping
      s.autoRotAngleX = Math.max(-1.2, Math.min(1.2, s.autoRotAngleX));
    }

    function onPointerUp() {
      s.isDragging = false;
    }

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    // Intersection Observer — pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        s.isVisible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(container);

    // Cleanup
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("resize", handleResize);
      motionQuery.removeEventListener("change", motionHandler);
      observer.disconnect();

      if (s.animationFrame) cancelAnimationFrame(s.animationFrame);

      if (s.owlGroup) {
        s.owlGroup.children.forEach((child) => {
          if ("geometry" in child) {
            (child as LineSegments).geometry.dispose();
          }
          if ("material" in child) {
            const mat = (child as LineSegments).material;
            if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
            else mat.dispose();
          }
        });
      }

      composer.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      container.removeChild(canvas);
    };
  }, [theme]);

  const filter =
    theme === "light"
      ? "none"
      : "drop-shadow(0 0 12px rgba(240,240,245,0.3)) drop-shadow(0 0 40px rgba(59,130,246,0.15))";

  return <div ref={containerRef} className="w-full h-full" style={{ filter }} />;
}
