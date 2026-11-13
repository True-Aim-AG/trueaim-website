import { authors } from "@/data/authors";
import { SITE_URL, localeUrl } from "@/lib/site-url";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/** Founders, as named in True Aim's profile guide (7 Nov 2026). Each points at the
 * Person node on that founder's English author page, so the two are one entity. */
const FOUNDER_SLUGS = ["reuben-john", "frederic-brunner"] as const;

const founders = FOUNDER_SLUGS.map((slug) => {
  const author = authors.find((entry) => entry.slug === slug)!;
  const url = localeUrl("en", `/authors/${slug}`);
  return { "@type": "Person", "@id": `${url}#person`, name: author.name, url, sameAs: [author.linkedin] };
});

/**
 * The one Organization node. It appears in full on the home and about pages;
 * every other node refers to it by ORGANIZATION_ID.
 */
export const organization = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "True Aim AG",
  legalName: "True Aim AG",
  alternateName: "True Aim",
  foundingDate: "2026-01",
  founder: founders,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/android-chrome-512x512.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Metallstrasse 9",
    postalCode: "6300",
    addressLocality: "Zug",
    addressCountry: "CH",
  },
  sameAs: ["https://www.linkedin.com/company/true-aim-ag"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: `${SITE_URL}/en/contact/`,
  },
};
