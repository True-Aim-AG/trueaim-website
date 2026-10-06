/**
 * The FAQ, in one place. `page.tsx` renders `answer` and `layout.tsx`
 * publishes it as FAQPage JSON-LD, so the visible answers and the
 * machine-readable ones are the same text.
 */
export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "Should a language model calculate a claim payout?",
    answer:
      "No. Excess, limits and liability splits have one correct answer once facts are fixed. They belong to deterministic rules.",
  },
  {
    question: 'What does "probabilistic" mean on a claim record?',
    answer:
      "That the step was resolved by a model's most likely answer rather than by a fixed rule, so it may not repeat exactly. Marking it shows a reviewer where judgement was involved.",
  },
  {
    question: "Can rules handle every claim?",
    answer:
      "Not alone. They are not designed to. Where evidence is missing, the system asks for it. Where wording is ambiguous, a model matches the item under a probabilistic label. Where a claim crosses a threshold, a handler reviews it with all facts, clauses and assumptions in view.",
  },
  {
    question: "How do you check whether a system keeps the boundary?",
    answer:
      "Take one closed claim and ask the system to show, per step, whether it was read, computed or judged. If it cannot, the boundary is not in the record.",
  },
];
