import { RelatedLinks, Summary, type RelatedLink } from "@/components/content";

/**
 * Product page template. Chunk 2 renders the H1, the summary under it and the
 * links to the other products and the overview; the full page sections arrive
 * with the product copy (chunk 7b).
 */
export function ProductTemplate({
  name,
  summary,
  relatedHeading,
  related,
}: {
  name: string;
  summary: string;
  relatedHeading: string;
  related: RelatedLink[];
}) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-strong mb-6">{name}</h1>
          <Summary>{summary}</Summary>
        </div>
        <RelatedLinks heading={relatedHeading} links={related} />
      </div>
    </section>
  );
}
