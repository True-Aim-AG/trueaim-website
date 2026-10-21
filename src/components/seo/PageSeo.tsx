import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { siteText } from "@/lib/seo/pages";
import { breadcrumbTrail, buildPageGraph, type PageGraphInput } from "@/lib/seo/schema";

/**
 * The page's JSON-LD graph and, below home, its visible breadcrumb trail.
 * Both come from the same data, so the BreadcrumbList always matches what is
 * shown. One per page, placed in the page's leaf layout or page file.
 */
export function PageSeo(props: PageGraphInput) {
  const { locale, path } = props;
  const trail = breadcrumbTrail(locale, path);
  // "<" escaped so text in the graph can never close the script element.
  const json = JSON.stringify(buildPageGraph(props)).replace(/</g, "\\u003c");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      {/* The trail stays in the HTML for crawlers and screen readers; the V5 design shows no breadcrumb. */}
      {trail.length > 1 && (
        <div className="sr-only">
          <Breadcrumbs items={trail} label={siteText(locale).breadcrumbLabel} />
        </div>
      )}
    </>
  );
}
