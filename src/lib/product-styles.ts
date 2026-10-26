/** Shared product pill styling — one neutral True Aim Blue tint for every product (products no longer have their own accent colours) */

export const productPillColors: Record<string, string> = {
  mira: "rounded-pill bg-accent-soft text-accent",
  contextbuilder: "rounded-pill bg-accent-soft text-accent",
  claimeval: "rounded-pill bg-accent-soft text-accent",
};

// The case-study data keeps its internal keys; the labels use the current
// product names (MIRA became Automated Coverage Check; ContextBuilder and ClaimEval
// are functions of the platform, not products).
export const productNames: Record<string, string> = {
  mira: "Automated Coverage Check",
  contextbuilder: "Document reading",
  claimeval: "Quality check",
};
