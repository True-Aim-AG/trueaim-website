import { test, expect } from "@playwright/test";

test.describe("Agent discoverability endpoints", () => {
  test("robots.txt is served with per-bot rules", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("text/plain");
    const body = await res.text();
    expect(body).toContain("User-agent: GPTBot");
    expect(body).toContain("User-agent: ClaudeBot");
    expect(body).toContain("User-agent: PerplexityBot");
    expect(body).toContain("User-agent: Google-Extended");
    expect(body).toContain("Disallow: /api/");
    expect(body).toContain("Sitemap: https://trueaim.ai/sitemap.xml");
  });

  test("security.txt is served at /.well-known/security.txt", async ({ request }) => {
    const res = await request.get("/.well-known/security.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/Contact:\s*mailto:security@trueaim\.ai/);
    expect(body).toMatch(/Expires:\s*\d{4}-\d{2}-\d{2}T/);
    expect(body).toContain("Canonical: https://trueaim.ai/.well-known/security.txt");
  });

  test("sitemap.xml includes all blog posts", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain(
      "https://trueaim.ai/blog/ai-claims-auditability-scorecard",
    );
    expect(body).toContain("https://trueaim.ai/blog/why-claims-ai-pilots-stall");
    expect(body).toContain("https://trueaim.ai/blog/build-vs-buy-idp-vendors");
    expect(body).toContain("https://trueaim.ai/blog/auditability-evidence-chains");
  });

  test("feed.xml is valid RSS with blog posts", async ({ request }) => {
    const res = await request.get("/feed.xml");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("application/rss+xml");
    const body = await res.text();
    expect(body).toContain('<?xml version="1.0"');
    expect(body).toContain('<rss version="2.0"');
    expect(body).toContain("<channel>");
    expect(body).toContain(
      "https://trueaim.ai/blog/ai-claims-auditability-scorecard",
    );
    expect(body).toContain("https://trueaim.ai/blog/why-claims-ai-pilots-stall");
    expect(body).toContain("https://trueaim.ai/blog/build-vs-buy-idp-vendors");
    expect(body).toContain("https://trueaim.ai/blog/auditability-evidence-chains");
  });

  test("llms.txt and llms-full.txt are still served", async ({ request }) => {
    const llms = await request.get("/llms.txt");
    expect(llms.status()).toBe(200);
    expect(await llms.text()).toContain("https://trueaim.ai/blog");
    const full = await request.get("/llms-full.txt");
    expect(full.status()).toBe(200);
    expect(await full.text()).toContain(
      "https://trueaim.ai/blog/ai-claims-auditability-scorecard",
    );
  });

  test("blog index exposes RSS alternate link", async ({ page }) => {
    await page.goto("/blog");
    const rssLink = page.locator('link[rel="alternate"][type="application/rss+xml"]');
    await expect(rssLink).toHaveAttribute("href", "https://trueaim.ai/feed.xml");
  });

  test("blog post pages include BlogPosting JSON-LD", async ({ page }) => {
    const slugs = [
      "ai-claims-auditability-scorecard",
      "why-claims-ai-pilots-stall",
      "build-vs-buy-idp-vendors",
      "auditability-evidence-chains",
    ];
    for (const slug of slugs) {
      await page.goto(`/blog/${slug}`);
      const scripts = await page
        .locator('script[type="application/ld+json"]')
        .allTextContents();
      const hasBlogPosting = scripts.some((s) => s.includes('"@type":"BlogPosting"'));
      const hasBreadcrumb = scripts.some((s) =>
        s.includes('"@type":"BreadcrumbList"'),
      );
      expect(hasBlogPosting, `BlogPosting missing on ${slug}`).toBe(true);
      expect(hasBreadcrumb, `Breadcrumb missing on ${slug}`).toBe(true);
    }
  });

  test("the scorecard post publishes its checklist and FAQ as structured data", async ({
    page,
  }) => {
    await page.goto("/blog/ai-claims-auditability-scorecard");
    const scripts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const itemList = scripts
      .map((s) => JSON.parse(s))
      .find((d) => d["@id"]?.endsWith("#scorecard"));
    expect(itemList, "ItemList of the twelve questions missing").toBeTruthy();
    expect(itemList.itemListElement).toHaveLength(12);
    expect(scripts.some((s) => s.includes('"@type":"FAQPage"'))).toBe(true);
  });
});
