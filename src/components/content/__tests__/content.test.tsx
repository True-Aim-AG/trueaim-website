import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  ArticleMeta,
  Breadcrumbs,
  Callout,
  ComparisonTable,
  CtaBand,
  FaqBlock,
  FeatureCards,
  KeyFacts,
  LogoStrip,
  RelatedLinks,
  SplitText,
  Summary,
  breadcrumbListSchema,
  faqPageSchema,
  personSchema,
} from "@/components/content";

// next-intl's navigation cannot load under Vitest's Node resolver, so Link becomes a plain anchor.
vi.mock("@/i18n/navigation", async () => {
  const { createElement } = await import("react");
  return {
    Link: ({ href, children, ...rest }: { href: string; children?: React.ReactNode }) =>
      createElement("a", { href, ...rest }, children),
  };
});

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

describe("KeyFacts", () => {
  const items = [
    { label: "Swiss", text: "Built in Zurich." },
    { label: "Auditable", text: "Every step is logged." },
  ];

  it("renders every label and text under the requested heading level", () => {
    const html = renderToStaticMarkup(<KeyFacts heading="Key facts" items={items} />);
    expect(html).toContain("<h2");
    for (const item of items) {
      expect(html).toContain(item.label);
      expect(html).toContain(item.text);
    }
    expect(renderToStaticMarkup(<KeyFacts heading="Key facts" headingLevel="h3" items={items} />)).toContain("<h3");
  });
});

describe("FeatureCards", () => {
  it("renders a link when href is set and a div otherwise", () => {
    const html = renderToStaticMarkup(
      <FeatureCards
        heading="Features"
        items={[
          { title: "Linked", text: "A", href: "/platform/otus", linkLabel: "Read more" },
          { title: "Plain", text: "B" },
        ]}
      />,
    );
    expect(html.match(/<a /g)).toHaveLength(1);
    expect(html).toContain("Read more");
    expect(html).toContain("<h3");
    expect(html).toContain("rounded-[12px]");
  });
});

describe("SplitText", () => {
  it("renders paragraphs, the image with dimensions and children", () => {
    const html = renderToStaticMarkup(
      <SplitText
        heading="Split"
        paragraphs={["First paragraph.", "Second paragraph."]}
        image={{ src: "/x.png", alt: "Alt text", width: 380, height: 300 }}
      >
        <span>Child badge</span>
      </SplitText>,
    );
    expect(html).toContain("First paragraph.");
    expect(html).toContain("Second paragraph.");
    expect(html).toContain('alt="Alt text"');
    expect(html).toContain('width="380"');
    expect(html).toContain('height="300"');
    expect(html).toContain("Child badge");
  });
});

describe("Callout", () => {
  it("renders the text", () => {
    expect(renderToStaticMarkup(<Callout text="A glass box you can audit." />)).toContain("A glass box you can audit.");
  });
});

describe("CtaBand", () => {
  it("renders a dark band with one or two links", () => {
    const one = renderToStaticMarkup(<CtaBand heading="Talk to us" buttons={[{ label: "Book", href: "/contact" }]} />);
    expect(one).toContain('data-theme="dark"');
    expect(one.match(/<a /g)).toHaveLength(1);
    const two = renderToStaticMarkup(
      <CtaBand
        heading="Talk to us"
        lede="Lede"
        buttons={[{ label: "Book", href: "/contact" }, { label: "Read", href: "/platform" }]}
      />,
    );
    expect(two.match(/<a /g)).toHaveLength(2);
  });
});

describe("LogoStrip", () => {
  it("renders each logo with alt, width and height", () => {
    const html = renderToStaticMarkup(
      <LogoStrip
        caption="Trusted"
        logos={[
          { src: "/a.png", alt: "Logo A", width: 200, height: 80, renderHeight: 40 },
          { src: "/b.png", alt: "Logo B", width: 100, height: 100, renderHeight: 48, href: "/partners" },
        ]}
      />,
    );
    expect(html.match(/<img/g)).toHaveLength(2);
    expect(html).toContain('alt="Logo A"');
    expect(html).toContain('alt="Logo B"');
    expect(html).toContain('width="200"');
    expect(html).toContain('height="80"');
    expect(html.match(/<a /g)).toHaveLength(1);
  });
});
