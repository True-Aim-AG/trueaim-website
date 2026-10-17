import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Guards for the launch copy of the home, platform and product pages (chunk C):
 * no retired product name, no dash used for rhythm, "adjuster" not "handler",
 * a summary of 40 to 60 words under every H1, and FAQ rows that can feed FAQPage.
 */
const LOCALES = ["en", "de", "fr", "it"];
const NAMESPACES = ["home", "platform", "products"];
const RETIRED = /mira|contextbuilder|claimeval|claimpilot/i;
const DASHES = /[–—]| - /;

function read(locale: string, namespace: string): string {
  return readFileSync(join(process.cwd(), "messages", locale, `${namespace}.json`), "utf8");
}

function strings(value: unknown, found: string[] = []): string[] {
  if (typeof value === "string") found.push(value);
  else if (Array.isArray(value)) value.forEach((item) => strings(item, found));
  else if (value && typeof value === "object") Object.values(value).forEach((item) => strings(item, found));
  return found;
}

function find(value: unknown, key: string, found: unknown[] = []): unknown[] {
  if (Array.isArray(value)) value.forEach((item) => find(item, key, found));
  else if (value && typeof value === "object") {
    for (const [name, item] of Object.entries(value)) {
      if (name === key) found.push(item);
      find(item, key, found);
    }
  }
  return found;
}

const words = (text: string) => text.trim().split(/\s+/).length;

describe("launch copy", () => {
  for (const locale of LOCALES) {
    for (const namespace of NAMESPACES) {
      it(`${locale}/${namespace}.json names no retired product and uses no dash for rhythm`, () => {
        const text = read(locale, namespace);
        expect(text).not.toMatch(RETIRED);
        expect(text).not.toMatch(DASHES);
      });
    }
  }

  it("says adjuster, not handler, in the English copy", () => {
    for (const namespace of NAMESPACES) {
      expect(read("en", namespace)).not.toMatch(/\bhandlers?\b/i);
    }
  });

  it("puts a summary of 40 to 60 words under every H1", () => {
    for (const namespace of NAMESPACES) {
      const summaries = find(JSON.parse(read("en", namespace)), "summary") as string[];
      expect(summaries.length).toBeGreaterThan(0);
      for (const summary of summaries) {
        expect(words(summary), summary).toBeGreaterThanOrEqual(40);
        expect(words(summary), summary).toBeLessThanOrEqual(60);
        expect(summary).toContain("True Aim");
      }
    }
  });

  it("gives every FAQ row a question and an answer", () => {
    const rows = [
      ...(find(JSON.parse(read("en", "home")), "items").flat() as unknown[]),
      ...(find(JSON.parse(read("en", "platform")), "items").flat() as unknown[]),
      ...(find(JSON.parse(read("en", "products")), "faq").flat() as unknown[]),
    ].filter((row): row is { question: string; answer: string } => !!row && typeof row === "object" && "question" in row);
    expect(rows.length).toBeGreaterThanOrEqual(20);
    for (const row of rows) {
      expect(row.question.trim().endsWith("?")).toBe(true);
      expect(row.answer.trim().length).toBeGreaterThan(20);
    }
  });

  it("keeps every English string free of exclamation marks and emoji", () => {
    for (const namespace of NAMESPACES) {
      for (const text of strings(JSON.parse(read("en", namespace)))) {
        expect(text, text).not.toMatch(/!/);
        expect(text, text).not.toMatch(/[\u{1F300}-\u{1FAFF}]/u);
      }
    }
  });
});
