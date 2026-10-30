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
    title: "The same claims decisions, made in a fraction of the time.",
    customer: {
      name: "NSA Services SA",
      industry: "Motor warranty",
      size: "",
      logo: "/partners/nsa-garantie.webp",
      isAnonymized: false,
    },
    challenge:
      "How NSA transferred the reasoning and decisioning of its claims experts into True Aim software and reduced the work on a complex claim by 86%.",
    solution:
      "NSA’s claims experts set out exactly how they decide a claim. True Aim hard-coded those rules into its decision engine and tested them against real NSA claims. The engine now makes the routine decisions the way the experts would, records the reason for each one and refers anything requiring judgement to a person.",
    products: ["mira", "contextbuilder", "claimeval"],
    metrics: [
      { label: "less expert time on a complex claim", value: "86%" },
      { label: "less expert time on a simple claim", value: "83%" },
      { label: "more claims handled by the same team", value: "118%" },
      { label: "saved on every claim", value: "32 min" },
    ],
    timeline: "",
    quote: {
      text: "I believed in this automation from day one, because it decides nothing we had not already decided ourselves. Our experts wrote the rules, True Aim built them into the system, and every answer shows the document and the clause behind it. Routine claims are settled in minutes, and my team can focus on the cases where their experience really counts. I can only recommend that every insurer take a close look at this.",
      author: "Giuseppe Chiarello",
      role: "CEO, NSA Services SA",
    },
    highlights: [],
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
      "Deployed Automated Coverage Check for coverage determination and the document layer for document processing. Integrated with the existing claims management system via API.",
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
      "Implemented the full True Aim platform: the document layer for medical document processing, Automated Coverage Check for coverage decisions and the quality check for assurance.",
    products: ["mira", "contextbuilder", "claimeval"],
    metrics: [
      { label: "Cost Reduction", value: "71%", improvement: "handling costs" },
      { label: "Touchless Rate", value: "65%", improvement: "fully automated" },
      { label: "Accuracy", value: "99.2%", improvement: "decision accuracy" },
      { label: "Leakage Found", value: "2.3%", improvement: "identified" },
    ],
    timeline: "12 weeks phased rollout",
    quote: {
      text: "The quality check alone paid for the entire implementation by identifying leakage we didn't know existed.",
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
      "Deployed Automated Coverage Check for liability determination with a person in the loop for complex cases. The document layer handles damage assessment documents.",
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
