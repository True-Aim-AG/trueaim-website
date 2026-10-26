import {
  breadcrumbListSchema,
  faqPageSchema,
  personSchema,
  type Author,
  type BreadcrumbItem,
  type FaqItem,
} from "@/components/content/schema";
import { ORGANIZATION_ID, organization } from "@/data/organization";
import { products } from "@/data/products";
import { DEFAULT_OG_IMAGE } from "@/lib/og-image";
import { SITE_URL, localeUrl } from "@/lib/site-url";
import { childPages, findPageEntry, pageEntry, pageKey, siteText } from "./pages";

/**
 * Page types and the schema.org types they emit (Firon's table, plus Kai's
 * mapping of 15 Oct 2026 for the page types the table does not cover):
 * home WebSite + Organization + WebPage; about AboutPage + Organization;
 * platform WebPage + ItemList of the products; product WebPage +
 * SoftwareApplication; contact ContactPage; news NewsArticle; blogPost
 * BlogPosting; caseStudy Article; collection CollectionPage + ItemList of the
 * pages below it; partner WebPage about the partner; technology, trust and
 * page WebPage. Every page below home adds a BreadcrumbList, and FAQPage when
 * it renders an FAQ. No rating, review or price markup anywhere.
 */
export type PageTemplate =
  | "home"
  | "about"
  | "platform"
  | "product"
  | "technology"
  | "trust"
  | "contact"
  | "news"
  | "blogPost"
  | "caseStudy"
  | "collection"
  | "partner"
  | "page";

export type ArticleData = {
  /** ISO date; omitted for articles without a publication date. */
  datePublished?: string;
  /** A named author; the Organization when absent. */
  author?: Author;
  section?: string;
  keywords?: string[];
  wordCount?: number;
  /** Laws the article is about. */
  legislation?: { name: string; sameAs?: string }[];
  citations?: { name: string; url?: string }[];
};

/** A list rendered on the page, published as an ItemList with the same text. */
export type ListData = {
  /** Fragment for the node's @id, unique on the page. */
  id: string;
  name: string;
  description?: string;
  items: { name: string; description?: string }[];
};

export type PageGraphInput = {
  locale: string;
  path: string;
  template: PageTemplate;
  /** The FAQ the page renders; the same array feeds FAQPage. */
  faqs?: FaqItem[];
  article?: ArticleData;
  lists?: ListData[];
  /** The partner a partner page is about. */
  partner?: { name: string; url?: string };
};

type Node = Record<string, unknown>;

export const WEBSITE_ID = `${SITE_URL}/#website`;

const ref = (id: string) => ({ "@id": id });

/** Home, then each page above this one that exists, then the page itself. */
export function breadcrumbTrail(locale: string, path: string): BreadcrumbItem[] {
  const segments = pageKey(path).split("/").filter(Boolean);
  const trail: BreadcrumbItem[] = [{ name: pageEntry(locale, "/").breadcrumb, url: localeUrl(locale) }];
  for (let i = 1; i <= segments.length; i++) {
    const ancestor = `/${segments.slice(0, i).join("/")}`;
    const entry = i === segments.length ? pageEntry(locale, ancestor) : findPageEntry(locale, ancestor);
    if (entry) trail.push({ name: entry.breadcrumb, url: localeUrl(locale, ancestor) });
  }
  return trail;
}

function itemList(id: string, name: string | undefined, description: string | undefined, elements: Node[]): Node {
  return {
    "@type": "ItemList",
    "@id": id,
    ...(name ? { name } : {}),
    ...(description ? { description } : {}),
    numberOfItems: elements.length,
    itemListElement: elements.map((element, index) => ({ "@type": "ListItem", position: index + 1, ...element })),
  };
}

/** One JSON-LD graph for the page; nodes link to each other by @id. */
export function buildPageGraph(input: PageGraphInput) {
  const { locale, path, template, faqs, article, lists, partner } = input;
  const page = pageEntry(locale, path);
  const url = localeUrl(locale, path);
  const isHome = pageKey(path) === "/";
  const ids = {
    page: `${url}#webpage`,
    breadcrumb: `${url}#breadcrumb`,
    faq: `${url}#faq`,
    software: `${url}#software`,
    article: `${url}#article`,
    list: `${url}#list`,
  };
  const graph: Node[] = [];

  const pageType =
    template === "about" ? "AboutPage" : template === "contact" ? "ContactPage" : template === "collection" ? "CollectionPage" : "WebPage";
  const webPage: Node = {
    "@type": pageType,
    "@id": ids.page,
    url,
    name: page.h1,
    description: page.description,
    inLanguage: locale,
    isPartOf: ref(WEBSITE_ID),
    dateModified: page.updated,
    ...(isHome ? {} : { breadcrumb: ref(ids.breadcrumb) }),
  };
  graph.push(webPage);

  switch (template) {
    case "home":
      webPage.about = ref(ORGANIZATION_ID);
      graph.push(
        {
          "@type": "WebSite",
          "@id": WEBSITE_ID,
          url: `${SITE_URL}/`,
          name: siteText(locale).name,
          publisher: ref(ORGANIZATION_ID),
          inLanguage: locale,
        },
        organization,
      );
      break;
    case "about":
      webPage.mainEntity = ref(ORGANIZATION_ID);
      graph.push(organization);
      break;
    case "contact":
      webPage.about = ref(ORGANIZATION_ID);
      break;
    case "platform":
      webPage.mainEntity = ref(ids.list);
      graph.push(
        itemList(
          ids.list,
          undefined,
          undefined,
          products.map((product) => {
            const productPath = `/platform/${product.slug}`;
            const productUrl = localeUrl(locale, productPath);
            return { name: pageEntry(locale, productPath).breadcrumb, url: productUrl, item: ref(`${productUrl}#software`) };
          }),
        ),
      );
      break;
    case "product":
      webPage.mainEntity = ref(ids.software);
      graph.push({
        "@type": "SoftwareApplication",
        "@id": ids.software,
        name: page.schemaName ?? page.breadcrumb,
        alternateName: `True Aim ${page.breadcrumb}`,
        description: page.description,
        url,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        publisher: ref(ORGANIZATION_ID),
      });
      break;
    case "news":
    case "blogPost":
    case "caseStudy": {
      webPage.mainEntity = ref(ids.article);
      graph.push({
        "@type": template === "news" ? "NewsArticle" : template === "blogPost" ? "BlogPosting" : "Article",
        "@id": ids.article,
        headline: page.h1,
        description: page.description,
        url,
        image: page.ogImage ?? DEFAULT_OG_IMAGE,
        inLanguage: locale,
        mainEntityOfPage: ref(ids.page),
        ...(article?.datePublished ? { datePublished: article.datePublished } : {}),
        dateModified: page.updated,
        author: article?.author ? { ...personSchema(article.author), worksFor: ref(ORGANIZATION_ID) } : ref(ORGANIZATION_ID),
        publisher: ref(ORGANIZATION_ID),
        ...(article?.section ? { articleSection: article.section } : {}),
        ...(article?.keywords?.length ? { keywords: article.keywords.join(", ") } : {}),
        ...(article?.wordCount ? { wordCount: article.wordCount } : {}),
        ...(article?.legislation?.length
          ? { about: article.legislation.map((law) => ({ "@type": "Legislation", ...law })) }
          : {}),
        ...(article?.citations?.length
          ? { citation: article.citations.map((work) => ({ "@type": "CreativeWork", ...work })) }
          : {}),
      });
      break;
    }
    case "collection": {
      const children = childPages(locale, path).filter((child) => !findPageEntry(locale, child)?.robots?.startsWith("noindex"));
      if (children.length) {
        webPage.mainEntity = ref(ids.list);
        graph.push(
          itemList(
            ids.list,
            undefined,
            undefined,
            children.map((child) => ({ name: pageEntry(locale, child).h1, url: localeUrl(locale, child) })),
          ),
        );
      }
      break;
    }
    case "partner":
      if (partner) webPage.about = { "@type": "Organization", name: partner.name, ...(partner.url ? { url: partner.url } : {}) };
      break;
  }

  for (const list of lists ?? []) {
    graph.push(
      itemList(
        `${url}#${list.id}`,
        list.name,
        list.description,
        list.items.map((item) => ({ name: item.name, ...(item.description ? { description: item.description } : {}) })),
      ),
    );
  }
  if (faqs?.length) graph.push(faqPageSchema(faqs, { id: ids.faq, inLanguage: locale }));
  if (!isHome) graph.push(breadcrumbListSchema(breadcrumbTrail(locale, path), { id: ids.breadcrumb }));

  return { "@context": "https://schema.org", "@graph": graph };
}
