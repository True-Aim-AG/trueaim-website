import { Color, PerspectiveCamera } from "three";
import { describe, expect, it } from "vitest";

import en from "../../../../../messages/en/products.json";
import { CLAIM_VIEW_CONFIG, NODE_VIEW_CONFIG } from "../config";
import { buildGraph, FLAGGED, MAIN_CLAIM } from "../sample-data";
import { SceneEngine } from "../scene/engine";

const scene = en.productPages.dataExtraction.hero.scene;
const words = { types: scene.types, source: scene.source, mismatch: scene.mismatch };

describe("data graph sample data", () => {
  const graph = buildGraph(words, false);
  const ids = new Set(graph.nodes.map((node) => node.id));

  it("has 25 to 40 nodes of every type, with one main claim", () => {
    expect(graph.nodes.length).toBeGreaterThanOrEqual(25);
    expect(graph.nodes.length).toBeLessThanOrEqual(40);
    expect(new Set(graph.nodes.map((node) => node.type))).toEqual(new Set(Object.keys(scene.types)));
    expect(graph.nodes.filter((node) => node.tier === 0)).toHaveLength(1);
  });

  it("links only nodes it has, with unique ids", () => {
    for (const edge of graph.edges) {
      expect(ids.has(edge.source) && ids.has(edge.target)).toBe(true);
    }
    expect(new Set(graph.edges.map((edge) => edge.id)).size).toBe(graph.edges.length);
    expect(ids.size).toBe(graph.nodes.length);
  });

  it("flags two invoices with the same amount and date", () => {
    const [a, b] = FLAGGED.map((id) => graph.nodes.find((node) => node.id === id));
    expect(a?.hover.figure).toBeDefined();
    expect(a?.hover.figure).toBe(b?.hover.figure);
    expect(a?.status).toBe("waiting");
    expect(a?.hover.status).toContain(b?.label);
    expect(a?.hover.status).not.toMatch(/[{}]/);
  });

  it("words every extracted value with its source", () => {
    const invoice = graph.nodes.find((node) => node.type === "invoice" && !FLAGGED.includes(node.id));
    expect(invoice?.hover.status).toMatch(/^Read from .+\.pdf, page \d$/);
  });

  it("keeps the claim, the flagged pair and every type in the lighter phone graph", () => {
    const phone = buildGraph(words, true);
    const phoneIds = new Set(phone.nodes.map((node) => node.id));
    expect(phone.nodes.length).toBeLessThan(graph.nodes.length);
    for (const id of [MAIN_CLAIM, ...FLAGGED]) expect(phoneIds.has(id)).toBe(true);
    expect(new Set(phone.nodes.map((node) => node.type)).size).toBe(Object.keys(scene.types).length);
  });

  it("is arranged by the ported engine, ring and Node view, with finite seats", () => {
    const engine = new SceneEngine();
    const white = new Color(1, 1, 1);
    engine.setPalette({
      dark: false,
      background: white,
      foreground: new Color(0, 0, 0),
      ink: new Color(0.1, 0.1, 0.1),
      muted: new Color(0.4, 0.4, 0.4),
      primary: new Color(0.3, 0.3, 0.9),
      success: new Color(0, 0.5, 0),
      warning: new Color(1, 0.7, 0.2),
      destructive: new Color(0.7, 0.1, 0),
      craft: () => new Color(0.5, 0.2, 0.2),
      glyphLight: white,
      glyphDark: new Color(0, 0, 0),
    });
    engine.sync(graph.nodes, graph.edges);
    const camera = new PerspectiveCamera(32, 1.2, 0.5, 3000);
    camera.position.set(0, 0, 120);
    const steps = [
      [CLAIM_VIEW_CONFIG, "ring", MAIN_CLAIM],
      [NODE_VIEW_CONFIG, "node", MAIN_CLAIM],
      [NODE_VIEW_CONFIG, "node", "party:bergwald"],
      [NODE_VIEW_CONFIG, "node", "exposure:building"],
    ] as const;
    for (const [config, layout, id] of steps) {
      engine.setConfig(config, layout);
      const framed = engine.focusOn(id, camera, 600, 500, null, { instant: true });
      expect(framed).not.toBeNull();
      for (let i = 0; i < 5; i++) engine.frame(camera, null, 1 / 60, 600, 500);
      const seats = engine.focusPlace()?.seats ?? {};
      expect(Object.keys(seats).length).toBe(graph.nodes.length);
      for (const seat of Object.values(seats)) {
        for (const value of seat) expect(Number.isFinite(value)).toBe(true);
      }
    }
    engine.dispose();
  });
});
