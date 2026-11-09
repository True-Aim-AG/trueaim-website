import type { Author } from "@/components/content/schema";

/**
 * The people who sign articles on the blog, one page each under /<locale>/authors/<slug>/.
 * Name, role and bio come from messages/<locale>/company.json (company.team.members.<key>),
 * the same copy as the About page, so the two never drift. The pages carry no navigation
 * entry: they are reached from an article byline.
 */
export const authors = [
  { slug: "reuben-john", key: "reuben", name: "Reuben John", image: "/team/reuben-john.webp", linkedin: "https://www.linkedin.com/in/reubenj/" },
  { slug: "frederic-brunner", key: "frederic", name: "Frédéric Brunner", image: "/team/frederic-brunner.webp", linkedin: "https://www.linkedin.com/in/frdbrunner/" },
  { slug: "arnaud-terville", key: "arnaud", name: "Arnaud Terville", image: "/team/arnaud-terville.webp", linkedin: "https://www.linkedin.com/in/arnaudterville/" },
] as const;

export type AuthorEntry = (typeof authors)[number];

export function findAuthor(slug: string): AuthorEntry | undefined {
  return authors.find((author) => author.slug === slug);
}

/** The Article author node for a post: name, role, the author page and the LinkedIn profile. */
export function articleAuthor(slug: AuthorEntry["slug"], jobTitle?: string): Author {
  const author = findAuthor(slug)!;
  return { name: author.name, ...(jobTitle ? { jobTitle } : {}), url: `/authors/${author.slug}`, sameAs: [author.linkedin] };
}
