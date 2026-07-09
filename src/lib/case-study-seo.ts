import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getCaseStudy } from "@/data/case-studies";
import { defaultOgImages, DEFAULT_OG_IMAGE } from "@/lib/og-image";

const SITE = "https://trueaim.ai";

type CaseStudySeo = { title: string; description: string };

/**
 * Per-slug SEO copy for case-study detail pages. Titles and descriptions are
 * unique and keyword-rich (written from each study's verified metrics) so the
 * pages self-canonicalize as distinct proof points instead of being deduped
 * against the /case-studies listing. See SEO audit fix C1.
 */
const CASE_STUDY_SEO: Record<string, CaseStudySeo> = {
  "vehicle-warranty-claims": {
    title: "AI Vehicle Warranty Claims Automation Case Study | True Aim",
    description:
      "A European warranty provider automated multilingual (DE/FR/IT) vehicle warranty claims with True Aim: 98% decision accuracy, with most line items resolved without an LLM.",
  },
  "swiss-travel-insurer": {
    title: "Swiss Travel Insurer Cuts Claims Time 92% | True Aim",
    description:
      "A Swiss travel insurer cut claim decisions from 45 minutes to 2.3 seconds with True Aim MIRA and ContextBuilder: 92% faster, 78% straight-through processing.",
  },
  "european-health-insurer": {
    title: "Health Insurer Cuts Claims Costs 71% | True Aim",
    description:
      "A European health insurer cut claims handling costs 71% with True Aim: 65% touchless processing, 99.2% decision accuracy, and previously hidden leakage detected.",
  },
  "motor-claims-pilot": {
    title: "UK Motor Claims: Backlog to Real-Time | True Aim",
    description:
      "A UK motor insurer cleared its entire claims backlog with True Aim: decision time cut from 2 days to under 5 minutes, 45% fewer appeals, 100% consistency.",
  },
};

function getLocaleUrl(locale: string, path: string): string {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${SITE}${prefix}${path}`;
}

/**
 * Build self-canonical, uniquely-described metadata for a case-study detail
 * page. Used by both the data-driven [slug] route and the bespoke
 * vehicle-warranty-claims page so their metadata stays consistent.
 */
export function buildCaseStudyMetadata(locale: string, slug: string): Metadata {
  const study = getCaseStudy(slug);
  const seo = CASE_STUDY_SEO[slug];

  // Defense in depth: if an unknown slug ever reaches here (e.g. the SEO map
  // and data drift apart), never advertise it as an indexable self-canonical
  // page. Point it at the listing and noindex it.
  if (!study && !seo) {
    return {
      title: "Case Study | True Aim",
      description:
        "See how insurers automate claims decisions with True Aim: auditable, accurate, and fast.",
      alternates: { canonical: getLocaleUrl(locale, "/case-studies") },
      robots: { index: false, follow: true },
    };
  }

  const title =
    seo?.title ??
    (study ? `${study.title} | True Aim` : "Case Study | True Aim");
  const description =
    seo?.description ??
    "See how insurers automate claims decisions with True Aim: auditable, accurate, and fast.";

  const path = `/case-studies/${slug}`;
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = getLocaleUrl(loc, path);
  }
  const url = getLocaleUrl(locale, path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: defaultOgImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
