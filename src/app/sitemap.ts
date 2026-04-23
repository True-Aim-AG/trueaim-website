import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-posts";

const baseUrl = "https://trueaim.ai";
const locales = ["en", "de", "fr", "it"] as const;

/**
 * Build hreflang alternates for a given path.
 * EN (default locale) has no prefix; other locales get /{locale}/ prefix.
 */
function buildAlternates(path: string) {
  return {
    languages: Object.fromEntries(
      locales.map((locale) => [
        locale,
        locale === "en"
          ? `${baseUrl}${path}`
          : `${baseUrl}/${locale}${path}`,
      ])
    ),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  // --- Translated pages (all 4 locales) ---

  const translatedPages: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "", changeFrequency: "monthly", priority: 1 },
    { path: "/products/mira", changeFrequency: "monthly", priority: 0.9 },
    {
      path: "/products/contextbuilder",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      path: "/products/claimeval",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    { path: "/technology", changeFrequency: "monthly", priority: 0.8 },
    { path: "/company", changeFrequency: "monthly", priority: 0.7 },
    { path: "/trust", changeFrequency: "monthly", priority: 0.7 },
    { path: "/case-studies", changeFrequency: "monthly", priority: 0.7 },
    {
      path: "/impact-estimator",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
    { path: "/partners", changeFrequency: "monthly", priority: 0.6 },
    { path: "/partners/yarowa", changeFrequency: "monthly", priority: 0.5 },
    {
      path: "/partners/innosuisse",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    { path: "/partners/zhaw", changeFrequency: "monthly", priority: 0.5 },
    { path: "/partners/swissinsurtechhub", changeFrequency: "monthly", priority: 0.5 },
  ];

  const translatedEntries: MetadataRoute.Sitemap = translatedPages.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: buildAlternates(path),
    })
  );

  // --- English-only pages (no alternates) ---

  const englishOnlyPages: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "/blog", changeFrequency: "weekly", priority: 0.6 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
    { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
    { path: "/paia", changeFrequency: "yearly", priority: 0.3 },
  ];

  const englishOnlyEntries: MetadataRoute.Sitemap = englishOnlyPages.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })
  );

  const blogPostEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedIso),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...translatedEntries, ...englishOnlyEntries, ...blogPostEntries];
}
