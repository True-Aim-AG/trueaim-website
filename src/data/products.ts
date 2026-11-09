/**
 * The launch products, one page each under /<locale>/platform/<slug>/, in the
 * order they appear on the site (Data Extraction first, then Automated Coverage Check,
 * Invoice Benchmarking, AI Damage Assessment & Reporting and Otus).
 * Slugs are frozen after the page inventory (chunk 2); a rename needs a redirect row.
 * `key` names the copy in messages/en/products.json (productPages) and metadata.json.
 */
export const products = [
  { slug: "data-extraction", key: "dataExtraction" },
  { slug: "automated-coverage-check", key: "claimsDecisioning" },
  { slug: "invoice-benchmarking", key: "invoiceBenchmarking" },
  { slug: "ai-damage-assessment-and-reporting", key: "damageReporting" },
  { slug: "otus", key: "otus" },
] as const;

export type Product = (typeof products)[number];

export function findProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
