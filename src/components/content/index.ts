// Content components for the page templates (Firon "Components"). They hold
// no copy: every string arrives as a prop from messages/ or content files.
export { ArticleMeta } from "./ArticleMeta";
export { Breadcrumbs } from "./Breadcrumbs";
export { ComparisonTable, type ComparisonRow } from "./ComparisonTable";
export { FaqBlock } from "./FaqBlock";
export { RelatedLinks, type RelatedLink } from "./RelatedLinks";
export { Summary } from "./Summary";
export {
  breadcrumbListSchema,
  faqPageSchema,
  personSchema,
  type Author,
  type BreadcrumbItem,
  type FaqItem,
} from "./schema";
