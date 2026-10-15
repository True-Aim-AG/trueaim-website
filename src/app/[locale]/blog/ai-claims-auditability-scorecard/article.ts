import type { ArticleData, ListData } from "@/lib/seo/schema";
import { scorecardQuestions } from "./questions";

/**
 * Schema data for this post, read by the page's JSON-LD graph (src/lib/seo/schema.ts).
 * Dates, author and sources describe what the article shows.
 */
export const article: ArticleData = {
  datePublished: "2026-09-10T00:00:00.000Z",
  author: { name: "Reuben John", jobTitle: "Chief Executive Officer" },
  section: "Best Practice",
  keywords: [
    "AI claims auditability",
    "auditable AI claims decisions",
    "claims AI best practice",
    "decision provenance",
    "GDPR Article 22",
    "EU AI Act",
    "FINMA Guidance 08/2024",
    "human oversight",
  ],
  wordCount: 3418,
  legislation: [
    {
      name: "Regulation (EU) 2024/1689 (Artificial Intelligence Act)",
      sameAs:
        "https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202401689",
    },
    {
      name: "Regulation (EU) 2026/1744 (Digital Omnibus on AI)",
      sameAs:
        "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202601744",
    },
    {
      name: "Regulation (EU) 2016/679 (General Data Protection Regulation), Articles 15(1)(h) and 22",
      sameAs:
        "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32016R0679",
    },
  ],
  citations: [
    {
      name: "Regulation (EU) 2026/1744 (Digital Omnibus on AI), Official Journal, 24 July 2026",
      url: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202601744",
    },
    {
      name: "Regulation (EU) 2024/1689 (AI Act), Annex III and Article 113",
      url: "https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202401689",
    },
    {
      name: "Regulation (EU) 2016/679 (GDPR), Articles 15(1)(h) and 22",
      url: "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32016R0679",
    },
    {
      name: "FINMA, Guidance 08/2024: Governance and risk management when using artificial intelligence, 18 December 2024",
      url: "https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/4dokumentation/finma-aufsichtsmitteilungen/20241218-finma-aufsichtsmitteilung-08-2024.pdf?sc_lang=en",
    },
    {
      name: "FINMA, Circular 2018/3: Outsourcing \u2013 banks, insurance companies and selected financial institutions under FinIA, last amended 4 November 2020, in force 1 January 2021, margin no. 24",
      url: "https://www.finma.ch/en/~/media/finma/dokumente/dokumentencenter/myfinma/rundschreiben/finma-rs-2018-03-01012021_de.pdf?sc_lang=en",
    },
    {
      name: "Grant Thornton, 2026 AI Impact Survey Report, insurance findings",
      url: "https://www.grantthornton.com/insights/survey-reports/insurance/2026/insurance-insights-2026-ai-impact-survey-report",
    },
  ],
};

export const list: ListData = {
  id: "scorecard",
  name: "The AI claims auditability scorecard: twelve questions",
  description: "Twelve questions every claims leader should be able to answer about AI operating in their name, in four groups: provenance, reconstruction, human judgement and continuity.",
  items: scorecardQuestions.map((question) => ({ name: question.question, description: question.plainAnswer })),
};
