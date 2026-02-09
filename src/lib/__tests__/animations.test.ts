import { describe, it, expect } from "vitest";
import {
  getAlternatingSlide,
  staggerFromCenter,
  slideFromLeft,
  slideFromRight,
  fadeUp,
  fadeIn,
  scaleIn,
  staggerContainer,
  defaultTransition,
  defaultViewport,
} from "../animations";

describe("getAlternatingSlide", () => {
  it("returns slideFromLeft for even indices", () => {
    expect(getAlternatingSlide(0)).toEqual(slideFromLeft);
    expect(getAlternatingSlide(2)).toEqual(slideFromLeft);
    expect(getAlternatingSlide(4)).toEqual(slideFromLeft);
  });

  it("returns slideFromRight for odd indices", () => {
    expect(getAlternatingSlide(1)).toEqual(slideFromRight);
    expect(getAlternatingSlide(3)).toEqual(slideFromRight);
    expect(getAlternatingSlide(5)).toEqual(slideFromRight);
  });
});

describe("staggerFromCenter", () => {
  it("returns variants with delay based on distance from center", () => {
    const variants = staggerFromCenter(0, 5);
    expect(variants.initial).toEqual({ opacity: 0, y: 30, scale: 0.95 });

    const animate = variants.animate as Record<string, unknown>;
    expect(animate.opacity).toBe(1);
    expect(animate.y).toBe(0);
    expect(animate.scale).toBe(1);
  });

  it("gives center item the shortest delay", () => {
    const center = staggerFromCenter(2, 5);
    const edge = staggerFromCenter(0, 5);

    const centerDelay = ((center.animate as Record<string, Record<string, number>>).transition).delay;
    const edgeDelay = ((edge.animate as Record<string, Record<string, number>>).transition).delay;

    expect(centerDelay).toBeLessThan(edgeDelay);
  });

  it("gives equal delay to equidistant items", () => {
    const left = staggerFromCenter(0, 5);
    const right = staggerFromCenter(4, 5);

    const leftDelay = ((left.animate as Record<string, Record<string, number>>).transition).delay;
    const rightDelay = ((right.animate as Record<string, Record<string, number>>).transition).delay;

    expect(leftDelay).toBe(rightDelay);
  });
});

describe("animation variant shapes", () => {
  it("fadeUp has correct initial/animate states", () => {
    expect(fadeUp.initial).toEqual({ opacity: 0, y: 20 });
    expect(fadeUp.animate).toEqual({ opacity: 1, y: 0 });
  });

  it("fadeIn has no y movement", () => {
    expect(fadeIn.initial).toEqual({ opacity: 0 });
    expect(fadeIn.animate).toEqual({ opacity: 1 });
  });

  it("scaleIn has scale property", () => {
    expect(scaleIn.initial).toEqual({ opacity: 0, scale: 0.9 });
    expect(scaleIn.animate).toEqual({ opacity: 1, scale: 1 });
  });

  it("staggerContainer has staggerChildren", () => {
    const animate = staggerContainer.animate as Record<string, Record<string, number>>;
    expect(animate.transition.staggerChildren).toBe(0.1);
    expect(animate.transition.delayChildren).toBe(0.2);
  });
});

describe("constants", () => {
  it("defaultTransition has expected shape", () => {
    expect(defaultTransition.duration).toBe(0.5);
    expect(defaultTransition.ease).toBe("easeOut");
  });

  it("defaultViewport has once: true", () => {
    expect(defaultViewport.once).toBe(true);
    expect(defaultViewport.margin).toBe("-100px");
  });
});
