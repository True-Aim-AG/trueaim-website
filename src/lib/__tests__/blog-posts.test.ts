import { describe, it, expect } from "vitest";
import { blogPosts } from "../blog-posts";

describe("blogPosts", () => {
  it("includes all known blog slugs", () => {
    const slugs = blogPosts.map((p) => p.slug).sort();
    expect(slugs).toEqual([
      "ai-claims-auditability-scorecard",
      "ai-claims-handling-eu-ai-act-high-risk",
      "auditability-evidence-chains",
      "build-vs-buy-idp-vendors",
      "why-claims-ai-pilots-stall",
    ].sort());
  });

  it("every post has required fields for RSS and JSON-LD", () => {
    for (const post of blogPosts) {
      expect(post.slug).toMatch(/^[a-z0-9-]+$/);
      expect(post.title).toBeTruthy();
      expect(post.excerpt).toBeTruthy();
      expect(post.publishedIso).toMatch(/^\d{4}-\d{2}-\d{2}T/);
      expect(Array.isArray(post.tags)).toBe(true);
      expect(post.tags.length).toBeGreaterThan(0);
    }
  });

  it("exactly one post holds the featured slot", () => {
    const featured = blogPosts.filter((p) => p.featured);
    expect(featured).toHaveLength(1);
  });

  it("posts are ordered newest-first by publishedIso", () => {
    const dates = blogPosts.map((p) => Date.parse(p.publishedIso));
    const sorted = [...dates].sort((a, b) => b - a);
    expect(dates).toEqual(sorted);
  });
});
