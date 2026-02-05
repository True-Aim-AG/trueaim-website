export interface CaseStudy {
  slug: string;
  title: string;
  customer: {
    name: string;
    industry: string;
    size: string;
    logo?: string;
    isAnonymized: boolean;
  };
  challenge: string;
  solution: string;
  products: ("mira" | "contextbuilder" | "claimeval")[];
  metrics: {
    label: string;
    value: string;
    improvement?: string;
  }[];
  timeline: string;
  quote?: {
    text: string;
    author: string;
    role: string;
  };
  videoUrl?: string;
  highlights: string[];
  /** When true, the case study is shown as a Work In Progress preview */
  wip?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "vehicle-warranty-claims",
    title: "Vehicle Warranty Insurer Goes from 18% to 98% Decision Accuracy in 7 Days",
    customer: {
      name: "European Warranty Insurer",
      industry: "Vehicle Warranty Insurance",
      size: "84 claims in pilot",
      isAnonymized: true,
    },
    challenge:
      "Each warranty claim required 15-30 minutes of manual cross-referencing across 5 documents in 3 languages, with 14 distinct document types per workflow. An LLM-only approach achieved just 18% accuracy due to hallucinated part names, invented coverage rules and unreliable financial calculations.",
    solution:
      "Deployed ContextBuilder for multilingual document ingestion, classification and structured extraction across 14 document types. MIRA\u2019s hybrid decisioning pipeline runs 11 deterministic screening checks and a three-tier coverage matching system (rules, keywords, LLM fallback). ClaimEval provides a QA console with full provenance highlighting and three-bucket triage.",
    products: ["mira", "contextbuilder", "claimeval"],
    metrics: [
      { label: "Decision Accuracy", value: "98%", improvement: "from 18% baseline" },
      { label: "Time to Results", value: "7 days", improvement: "full pipeline live" },
      { label: "No-LLM Resolution", value: "80-90%", improvement: "of line items" },
      { label: "Languages", value: "3", improvement: "DE / FR / IT" },
    ],
    timeline: "7 days from baseline to 98% accuracy",
    quote: {
      text: "The business logic is harder than the AI. Getting the payout formula to match the insurer\u2019s internal calculation requires working with the actual adjuster, walking through calculations claim by claim.",
      author: "Lead Engineer",
      role: "True Aim",
    },
    highlights: [
      "14 document types classified at near-100% accuracy",
      "51 fields extracted per warranty policy with confidence scoring",
      "Full provenance chain from decision back to source page and character position",
      "Three-tier coverage matching: deterministic rules, keyword synonyms, LLM fallback",
      "Multilingual keyword matching across German, French and Italian",
      "850+ unit tests covering the full pipeline",
    ],
  },
  {
    slug: "swiss-travel-insurer",
    title: "Swiss Travel Insurer Achieves 92% Faster Claims Processing",
    wip: true,
    customer: {
      name: "Swiss Travel Insurer",
      industry: "Travel Insurance",
      size: "50,000+ claims/year",
      isAnonymized: true,
    },
    challenge:
      "Manual claims processing was taking an average of 45 minutes per claim, with inconsistent decisions across handlers and lengthy audit preparation times.",
    solution:
      "Deployed MIRA for coverage determination and ContextBuilder for document processing. Integrated with existing claims management system via API.",
    products: ["mira", "contextbuilder"],
    metrics: [
      { label: "Processing Speed", value: "92%", improvement: "faster" },
      { label: "Avg Decision Time", value: "2.3s", improvement: "from 45 min" },
      { label: "STP Rate", value: "78%", improvement: "straight-through" },
      { label: "Audit Prep Time", value: "95%", improvement: "reduction" },
    ],
    timeline: "8 weeks to production",
    quote: {
      text: "The consistency and speed improvements exceeded our expectations. More importantly, we can now trace every decision back to the policy text.",
      author: "Claims Operations Director",
      role: "Swiss Travel Insurer",
    },
    highlights: [
      "3,500 claims processed during pilot",
      "Zero compliance issues post-deployment",
      "Full audit trail for every decision",
      "Seamless integration with legacy systems",
    ],
  },
  {
    slug: "european-health-insurer",
    title: "European Health Insurer Reduces Handling Costs by 71%",
    wip: true,
    customer: {
      name: "European Health Insurer",
      industry: "Health Insurance",
      size: "200,000+ claims/year",
      isAnonymized: true,
    },
    challenge:
      "High volume of routine claims requiring manual review, leading to significant handling costs and delayed customer payouts.",
    solution:
      "Implemented full True Aim stack: ContextBuilder for medical document processing, MIRA for coverage decisions and ClaimEval for quality assurance.",
    products: ["mira", "contextbuilder", "claimeval"],
    metrics: [
      { label: "Cost Reduction", value: "71%", improvement: "handling costs" },
      { label: "Touchless Rate", value: "65%", improvement: "fully automated" },
      { label: "Accuracy", value: "99.2%", improvement: "decision accuracy" },
      { label: "Leakage Found", value: "2.3%", improvement: "identified" },
    ],
    timeline: "12 weeks phased rollout",
    quote: {
      text: "ClaimEval alone paid for the entire implementation by identifying leakage we didn't know existed.",
      author: "CFO",
      role: "European Health Insurer",
    },
    highlights: [
      "Deployed across 3 countries",
      "Multi-language document support",
      "100% QA coverage vs 5% sampling",
      "Significant fraud detection improvement",
    ],
  },
  {
    slug: "motor-claims-pilot",
    title: "Motor Claims Pilot: From Backlog to Real-Time Processing",
    wip: true,
    customer: {
      name: "UK Motor Insurer",
      industry: "Motor Insurance",
      size: "100,000+ claims/year",
      isAnonymized: true,
    },
    challenge:
      "Growing claims backlog during peak periods, with inconsistent liability decisions leading to customer complaints and regulatory concerns.",
    solution:
      "Deployed MIRA for liability determination with human-in-the-loop for complex cases. ContextBuilder handles damage assessment documents.",
    products: ["mira", "contextbuilder"],
    metrics: [
      { label: "Backlog Cleared", value: "100%", improvement: "eliminated" },
      { label: "Decision Time", value: "< 5 min", improvement: "from 2 days" },
      { label: "Consistency", value: "100%", improvement: "deterministic" },
      { label: "Appeals Reduced", value: "45%", improvement: "fewer disputes" },
    ],
    timeline: "6 weeks pilot, 4 weeks production",
    highlights: [
      "Peak season handling without overtime",
      "Improved customer satisfaction scores",
      "Reduced regulatory queries",
      "Training time for new handlers cut in half",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((cs) => cs.slug);
}
