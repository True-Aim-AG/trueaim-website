/**
 * The FAQ, in one place. `content.en.tsx` renders `answer` and `layout.tsx`
 * publishes it as FAQPage JSON-LD, so the visible answers and the
 * machine-readable ones are the same text.
 */
export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "Who makes the final decision in an automated coverage check?",
    answer:
      "The adjuster. True Aim's Automated Coverage Check prepares a result for each line of the claim, with the clause and the amount, and decides which claims go to a person. The adjuster reviews the result, can override any line with a reason and then finalises the claim. The check prepares the decision; the adjuster makes it.",
  },
  {
    question: "Where does the language model fit in a coverage check?",
    answer:
      "In testing the lines that need judgement against the wording. Fixed rules in code apply the clauses that need no judgement, and code calculates the amount, including the deductible, VAT and caps. The language model tests each remaining line against the policy wording and cites the clause it used, so every result can be checked against the wording.",
  },
  {
    question: "What does an insurer need to provide for an automated coverage check?",
    answer:
      "The policy wording and time from its claims lead. True Aim works through the wording clause by clause with the claims lead, turns the clauses that need no judgement into fixed rules and versions the result. The insurer also agrees the threshold above which the amount in doubt sends a claim to a person.",
  },
  {
    question: "Can the adjuster change the result of an automated coverage check?",
    answer:
      "Yes. The adjuster can override the result on any line of the claim, and gives a reason when doing so. Each line shows whether it is covered, excluded, partly covered or referred, with the clause and the amount, so the adjuster can see exactly what to change before finalising the claim.",
  },
];
