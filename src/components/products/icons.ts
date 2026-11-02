import type { BrandIconName } from "@/components/brand/BrandIcon";
import type { Product } from "@/data/products";

/** The brand icon that stands for each product wherever the products are listed as cards. */
export const productIcons: Record<Product["key"], BrandIconName> = {
  dataExtraction: "extraction",
  claimsDecisioning: "decision",
  invoiceBenchmarking: "match",
  damageReporting: "document",
  otus: "human-review",
};
