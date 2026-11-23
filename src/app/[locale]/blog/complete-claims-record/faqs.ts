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
    question: "What is an AI audit trail in claims?",
    answer:
      "It is the record of how a claim was decided: the documents received, the data extracted from each one with a link to its source page, the policy clauses applied, the benchmark used, the calculation for each line, the result of each check and the claims handler's decision with its reasons. A reviewer can follow the decision without asking anyone to remember it.",
  },
  {
    question: "Does the record show which rules applied to a decision?",
    answer:
      "Yes. The record shows the rule version that applied when the decision was made. A reviewer looking at a claim decided last year sees the rules the handler was working with at the time, not the rules in use today, so the decision is read against the standard that actually applied to it.",
  },
  {
    question: "What happens to the record when a claim is reopened?",
    answer:
      "A reopen needs a reason, and the earlier decision is kept. Every change is kept, with who made it and when. A reviewer can read the claim as it stood before the reopen and as it stands now, with the reason for the change between them.",
  },
  {
    question: "Can an insurer export the record for an auditor or ombudsman?",
    answer:
      "Yes. The insurer can export a PDF of the claim review and send it to an auditor, a supervisor or an ombudsman. The record itself is kept for the period agreed with the insurer, so the retention period follows the insurer's own policy rather than a fixed number of years.",
  },
];
