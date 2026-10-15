import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  ArticleMeta,
  Breadcrumbs,
  ComparisonTable,
  FaqBlock,
  RelatedLinks,
  Summary,
  breadcrumbListSchema,
  faqPageSchema,
  personSchema,
} from "@/components/content";

const faqs = [
  { question: "How does the Decision Dossier record each decision?", answer: "Every step is logged with its clause." },
  { question: "Who is True Aim for?", answer: "Insurers, brokers and TPAs." },
];

describe("FaqBlock", () => {
  it("renders every answer in the HTML inside native details", () => {
    const html = renderToStaticMarkup(<FaqBlock faqs={faqs} />);
    expect(html.match(/<details/g)).toHaveLength(2);
    expect(html).toContain("<summary");
    for (const faq of faqs) expect(html).toContain(faq.answer);
    expect(html).not.toContain("<details open");
  });

  it("uses the requested heading level for questions", () => {
    expect(renderToStaticMarkup(<FaqBlock faqs={faqs} />)).toContain("<h3");
    const html = renderToStaticMarkup(<FaqBlock faqs={faqs} headingLevel="h2" />);
    expect(html).toContain("<h2");
    expect(html).not.toContain("<h3");
  });

  it("feeds FAQPage schema from the same data", () => {
    const schema = faqPageSchema(faqs, { id: "https://trueaim.ai/en/x/#faq", inLanguage: "en" });
    expect(schema).toEqual({
      "@type": "FAQPage",
      "@id": "https://trueaim.ai/en/x/#faq",
      inLanguage: "en",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
    expect(JSON.parse(JSON.stringify(schema))).toEqual(schema);
  });
});

describe("Breadcrumbs", () => {
  const items = [
    { name: "Home", url: "https://trueaim.ai/en/" },
    { name: "Blog", url: "https://trueaim.ai/en/blog/" },
    { name: "Post", url: "https://trueaim.ai/en/blog/post/" },
  ];

  it("renders a labelled ordered list of links and a current page", () => {
    const html = renderToStaticMarkup(<Breadcrumbs items={items} label="Breadcrumb" />);
    expect(html).toContain('<nav aria-label="Breadcrumb"');
    expect(html).toContain("<ol");
    expect(html).toContain('href="/en/"');
    expect(html).toContain('href="/en/blog/"');
    expect(html).not.toContain('href="/en/blog/post/"');
    expect(html).toContain('aria-current="page"');
  });

  it("builds BreadcrumbList from the same items", () => {
    expect(breadcrumbListSchema(items).itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: "https://trueaim.ai/en/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://trueaim.ai/en/blog/" },
      { "@type": "ListItem", position: 3, name: "Post", item: "https://trueaim.ai/en/blog/post/" },
    ]);
  });
});

describe("ComparisonTable", () => {
  it("renders a real table with a caption and scoped headers", () => {
    const html = renderToStaticMarkup(
      <ComparisonTable
        caption="Claims decisioning approaches"
        columns={["Capability", "True Aim", "Rules engine"]}
        rows={[{ label: "Decision traceability", cells: ["Per clause", "Partial"] }]}
      />,
    );
    expect(html).toContain("<table");
    expect(html).toContain("<caption");
    expect(html.match(/scope="col"/g)).toHaveLength(3);
    expect(html).toContain('<th scope="row"');
    expect(html).toContain("<td");
  });
});

describe("Summary, RelatedLinks and ArticleMeta", () => {
  it("renders the summary as a paragraph, not a heading", () => {
    const html = renderToStaticMarkup(<Summary>True Aim decides claims.</Summary>);
    expect(html.startsWith("<p")).toBe(true);
  });

  it("renders related links as anchors under a heading", () => {
    const html = renderToStaticMarkup(
      <RelatedLinks heading="Related" links={[{ title: "Technology", href: "/en/technology/" }]} />,
    );
    expect(html).toContain("<h2");
    expect(html).toContain('href="/en/technology/"');
  });

  it("renders dates as time elements and an updated date only when it differs", () => {
    const props = {
      author: { name: "Kai Praschma", jobTitle: "Co-founder" },
      locale: "en",
      labels: { by: "By", published: "Published", updated: "Updated" },
    };
    const same = renderToStaticMarkup(<ArticleMeta {...props} published="2026-10-14" updated="2026-10-14" />);
    expect(same).toContain('<time dateTime="2026-10-14">14 October 2026</time>');
    expect(same).not.toContain("Updated");
    const changed = renderToStaticMarkup(<ArticleMeta {...props} published="2026-10-01" updated="2026-10-14" />);
    expect(changed).toContain('<time dateTime="2026-10-14">');
  });

  it("builds the author Person node", () => {
    expect(personSchema({ name: "A", jobTitle: "B", sameAs: ["https://www.linkedin.com/in/a"] })).toEqual({
      "@type": "Person",
      name: "A",
      jobTitle: "B",
      sameAs: ["https://www.linkedin.com/in/a"],
    });
  });
});
