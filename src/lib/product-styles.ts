/** Shared product pill styling — one neutral True Aim Blue tint for every product (products no longer have their own accent colours) */

export const productPillColors: Record<string, string> = {
  mira: "rounded-pill bg-accent-soft text-accent",
  contextbuilder: "rounded-pill bg-accent-soft text-accent",
  claimeval: "rounded-pill bg-accent-soft text-accent",
};

// The case-study data keeps its internal keys (mira, contextbuilder, claimeval);
// the pill labels come from messages/<locale>/caseStudies.json (detail.productNames).
