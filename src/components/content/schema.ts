/**
 * JSON-LD builders for the content components. Each one takes the same data
 * the component renders, so the markup can only describe what is on the
 * page. They return plain objects; the page's schema graph (chunk 3) adds
 * @context and links them by @id.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export type BreadcrumbItem = {
  name: string;
  /** Absolute URL, for example https://trueaim.ai/en/blog/. */
  url: string;
};

export type Author = {
  name: string;
  jobTitle?: string;
  /** Profiles the person controls, for example a LinkedIn URL. */
  sameAs?: string[];
};

export function faqPageSchema(faqs: FaqItem[], options: { id?: string; inLanguage?: string } = {}) {
  return {
    "@type": "FAQPage",
    ...(options.id ? { "@id": options.id } : {}),
    ...(options.inLanguage ? { inLanguage: options.inLanguage } : {}),
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbListSchema(items: BreadcrumbItem[], options: { id?: string } = {}) {
  return {
    "@type": "BreadcrumbList",
    ...(options.id ? { "@id": options.id } : {}),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function personSchema(author: Author) {
  return {
    "@type": "Person",
    name: author.name,
    ...(author.jobTitle ? { jobTitle: author.jobTitle } : {}),
    ...(author.sameAs?.length ? { sameAs: author.sameAs } : {}),
  };
}
