import { describe, it, expect } from "vitest";
import en from "../../../messages/en/metadata.json";
import de from "../../../messages/de/metadata.json";
import fr from "../../../messages/fr/metadata.json";
import it_ from "../../../messages/it/metadata.json";
import { checkSources } from "../../../scripts/check-metadata.mjs";
import { ORGANIZATION_ID } from "@/data/organization";
import { pageMetadata } from "../seo/metadata";
import { breadcrumbTrail, buildPageGraph, WEBSITE_ID, type PageTemplate } from "../seo/schema";

type GraphNode = Record<string, unknown>;
const nodes = (graph: { "@graph": GraphNode[] }) => graph["@graph"];
const types = (graph: { "@graph": GraphNode[] }) => nodes(graph).map((node) => node["@type"]);

/** Every {"@id": x} reference in the graph, outside the node that declares x. */
function references(value: unknown, found: string[] = []): string[] {
  if (Array.isArray(value)) value.forEach((item) => references(item, found));
  else if (value && typeof value === "object") {
    const keys = Object.keys(value);
    if (keys.length === 1 && keys[0] === "@id") found.push((value as { "@id": string })["@id"]);
    else Object.values(value).forEach((item) => references(item, found));
  }
  return found;
}

describe("pageMetadata", () => {
  it("uses the entry's title as is, so the suffix appears once", () => {
    const metadata = pageMetadata("en", "/platform");
    expect(metadata.title).toEqual({ absolute: en.pages["/platform"].title });
    expect(String((metadata.title as { absolute: string }).absolute).match(/\| True Aim/g)).toHaveLength(1);
  });

  it("builds a self-referencing canonical with a trailing slash", () => {
    expect(pageMetadata("en", "/platform/otus").alternates?.canonical).toBe("https://trueaim.ai/en/platform/otus/");
    expect(pageMetadata("en", "/technology").alternates?.canonical).toBe("https://trueaim.ai/en/technology/");
    expect(pageMetadata("en", "/").alternates?.canonical).toBe("https://trueaim.ai/en/");
  });

  it("lists hreflang for the locales the page exists in, plus x-default", () => {
    expect(Object.keys(pageMetadata("en", "/blog").alternates?.languages ?? {})).toEqual(["en", "x-default"]);
    // Every page is English only until the translations land (src/i18n/page-locales.ts).
    expect(Object.keys(pageMetadata("en", "/trust").alternates?.languages ?? {})).toEqual(["en", "x-default"]);
  });

  it("indexes by default and honours noindex", () => {
    expect(pageMetadata("en", "/technology").robots).toEqual({ index: true, follow: true });
    expect(pageMetadata("en", "/privacy-legacy").robots).toEqual({ index: false, follow: true });
    expect(pageMetadata("en", "/blog/integration-playbook").robots).toEqual({ index: false, follow: false });
  });

  it("throws for a page without an entry", () => {
    expect(() => pageMetadata("en", "/no-such-page")).toThrow(/No metadata for \/no-such-page/);
  });
});

describe("breadcrumbTrail", () => {
  it("runs from home through each parent to the page", () => {
    expect(breadcrumbTrail("en", "/blog/why-claims-ai-pilots-stall")).toEqual([
      { name: "Home", url: "https://trueaim.ai/en/" },
      { name: "Blog", url: "https://trueaim.ai/en/blog/" },
      { name: "Why claims AI pilots stall", url: "https://trueaim.ai/en/blog/why-claims-ai-pilots-stall/" },
    ]);
  });
});

describe("buildPageGraph", () => {
  const cases: [PageTemplate, string, string[]][] = [
    ["home", "/", ["WebPage", "WebSite", "Organization"]],
    ["about", "/about", ["AboutPage", "Organization", "BreadcrumbList"]],
    ["platform", "/platform", ["WebPage", "ItemList", "BreadcrumbList"]],
    ["product", "/platform/otus", ["WebPage", "SoftwareApplication", "BreadcrumbList"]],
    ["technology", "/technology", ["WebPage", "BreadcrumbList"]],
    ["trust", "/trust", ["WebPage", "BreadcrumbList"]],
    ["contact", "/contact", ["ContactPage", "BreadcrumbList"]],
    ["news", "/blog/why-claims-ai-pilots-stall", ["WebPage", "NewsArticle", "BreadcrumbList"]],
    ["blogPost", "/blog/why-claims-ai-pilots-stall", ["WebPage", "BlogPosting", "BreadcrumbList"]],
    ["caseStudy", "/case-studies/motor-claims-pilot", ["WebPage", "Article", "BreadcrumbList"]],
    ["collection", "/case-studies", ["CollectionPage", "ItemList", "BreadcrumbList"]],
    ["partner", "/partners/zhaw", ["WebPage", "BreadcrumbList"]],
  ];

  it.each(cases)("%s emits its types", (template, path, expected) => {
    expect(types(buildPageGraph({ locale: "en", path, template }))).toEqual(expected);
  });

  it.each(cases)("%s links nodes by @id that exist in the graph or are site-wide", (template, path) => {
    const graph = buildPageGraph({ locale: "en", path, template });
    const declared = new Set(nodes(graph).map((node) => node["@id"]));
    for (const id of references(nodes(graph))) {
      const crossPage = id === ORGANIZATION_ID || id === WEBSITE_ID || id.endsWith("#software");
      expect(declared.has(id) || crossPage, `${template}: ${id}`).toBe(true);
    }
  });

  it("never emits rating, review or price markup", () => {
    for (const [template, path] of cases) {
      const json = JSON.stringify(buildPageGraph({ locale: "en", path, template }));
      expect(json).not.toMatch(/aggregateRating|"review"|"offers"|"price"/);
    }
  });

  it("gives the product a publisher pointing at the Organization", () => {
    const software = nodes(buildPageGraph({ locale: "en", path: "/platform/otus", template: "product" })).find(
      (node) => node["@type"] === "SoftwareApplication",
    );
    expect(software?.publisher).toEqual({ "@id": ORGANIZATION_ID });
  });

  it("names Otus with its descriptor in the product schema", () => {
    const software = nodes(buildPageGraph({ locale: "en", path: "/platform/otus", template: "product" })).find(
      (node) => node["@type"] === "SoftwareApplication",
    );
    expect(software?.name).toBe("Otus, True Aim's claims specialist");
  });

  it("names each product with the True Aim brand as alternateName", () => {
    const software = nodes(buildPageGraph({ locale: "en", path: "/platform/claims-decisioning", template: "product" })).find(
      (node) => node["@type"] === "SoftwareApplication",
    );
    expect(software?.name).toBe("Claims Decisioning");
    expect(software?.alternateName).toBe("True Aim Claims Decisioning");
  });

  it("builds FAQPage from the same array the page renders", () => {
    const faqs = [{ question: "Q?", answer: "A." }];
    const faq = nodes(buildPageGraph({ locale: "en", path: "/platform/otus", template: "product", faqs })).find(
      (node) => node["@type"] === "FAQPage",
    );
    expect(faq?.mainEntity).toEqual([{ "@type": "Question", name: "Q?", acceptedAnswer: { "@type": "Answer", text: "A." } }]);
  });

  it("lists the four products on the platform page by their @ids", () => {
    const list = nodes(buildPageGraph({ locale: "en", path: "/platform", template: "platform" })).find(
      (node) => node["@type"] === "ItemList",
    ) as { itemListElement: { item: { "@id": string } }[] };
    expect(list.itemListElement.map((element) => element.item["@id"])).toEqual([
      "https://trueaim.ai/en/platform/claims-decisioning/#software",
      "https://trueaim.ai/en/platform/invoice-benchmarking/#software",
      "https://trueaim.ai/en/platform/damage-reporting/#software",
      "https://trueaim.ai/en/platform/otus/#software",
    ]);
  });

  it("leaves noindex pages out of a collection's list", () => {
    const list = nodes(buildPageGraph({ locale: "en", path: "/blog", template: "collection" })).find(
      (node) => node["@type"] === "ItemList",
    ) as { itemListElement: { url: string }[] };
    expect(list.itemListElement.map((element) => element.url)).not.toContain(
      "https://trueaim.ai/en/blog/integration-playbook/",
    );
  });
});

describe("check-metadata sources", () => {
  const files = { en, de, fr, it: it_ };
  const clone = () => JSON.parse(JSON.stringify(files));

  it("passes on the committed metadata", () => {
    expect(checkSources(files)).toEqual([]);
  });

  it("fails on a blank title", () => {
    const broken = clone();
    broken.en.pages["/technology"].title = "";
    expect(checkSources(broken)).toContain("en /technology: title is missing or empty");
  });

  it("fails on a duplicate description", () => {
    const broken = clone();
    broken.en.pages["/trust"].description = broken.en.pages["/technology"].description;
    expect(checkSources(broken)).toContain("en /trust: same description as /technology");
  });
});
