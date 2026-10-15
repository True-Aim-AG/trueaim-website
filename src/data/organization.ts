import { SITE_URL } from "@/lib/site-url";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

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
