import { blogPosts } from "@/lib/blog-posts";
import { SITE_URL, localeUrl } from "@/lib/site-url";

// Static content — regenerates only at build time, not per-request.
// Keeps the feed fast at the edge and lets Vercel's CDN cache it fully.
export const dynamic = "force-static";

const FEED_TITLE = "True Aim — Blog";
const FEED_DESCRIPTION =
  "Insights on auditable AI, claims automation, and the future of insurance technology.";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const latestPost = blogPosts[0];
  const lastBuildDate = latestPost
    ? new Date(latestPost.publishedIso).toUTCString()
    : new Date(0).toUTCString();
  const pubDate = lastBuildDate;

  const items = blogPosts
    .map((post) => {
      const url = localeUrl("en", `/blog/${post.slug}`);
      const categories = post.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("");
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.publishedIso).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      ${categories}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${localeUrl("en", "/blog")}</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <pubDate>${pubDate}</pubDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
