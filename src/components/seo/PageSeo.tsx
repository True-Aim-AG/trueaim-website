import { buildPageGraph, type PageGraphInput } from "@/lib/seo/schema";

/**
 * The page's JSON-LD graph, including the BreadcrumbList for the page's
 * position in the site. The trail is not drawn on the page. One per page,
 * placed in the page's leaf layout or page file.
 */
export function PageSeo(props: PageGraphInput) {
  // "<" escaped so text in the graph can never close the script element.
  const json = JSON.stringify(buildPageGraph(props)).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
