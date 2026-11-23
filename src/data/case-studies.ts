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
];

/** The translatable fields of a case study, as stored under caseStudies.studies.<slug> in messages/<locale>/caseStudies.json. */
export interface CaseStudyCopy {
  title?: string;
  customer?: { name?: string; industry?: string; size?: string };
  challenge?: string;
  solution?: string;
  metrics?: { label?: string; value?: string; improvement?: string }[];
  timeline?: string;
  quote?: { text?: string; author?: string; role?: string };
  highlights?: string[];
}

/** Overlays the locale's copy on a case study; fields the copy leaves out keep the English from this file. */
export function localizeCaseStudy(study: CaseStudy, copy: CaseStudyCopy | undefined): CaseStudy {
  if (!copy) return study;
  return {
    ...study,
    title: copy.title ?? study.title,
    customer: { ...study.customer, ...(copy.customer ?? {}) },
    challenge: copy.challenge ?? study.challenge,
    solution: copy.solution ?? study.solution,
    metrics: study.metrics.map((metric, i) => ({ ...metric, ...(copy.metrics?.[i] ?? {}) })),
    timeline: copy.timeline ?? study.timeline,
    quote: study.quote ? { ...study.quote, ...(copy.quote ?? {}) } : study.quote,
    highlights: copy.highlights ?? study.highlights,
  };
}
