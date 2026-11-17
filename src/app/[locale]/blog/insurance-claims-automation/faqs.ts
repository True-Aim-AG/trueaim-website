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
    question: "What should an insurer automate first in claims?",
    answer:
      "Start with the documents. Before any decision is automated, every document in the claim has to be read, with each field and line item extracted and put in context. Once that data is reliable, the first decision to automate is usually the coverage check, because the answer already sits in the facts of the claim and the policy wording. True Aim starts it on one line of business.",
  },
  {
    question: "How long does it take to get a working system?",
    answer:
      "True Aim typically puts a working prototype in a client's hands within 10 to 14 days. The client tests it on its own claims against success criteria agreed at the start. If it converts, the aim is to be integrated within 8 to 12 weeks of first receiving approved access to the data and systems.",
  },
  {
    question: "Why is end-to-end cycle time a poor headline measure?",
    answer:
      "Cycle time includes follow-ups and handovers that automation does not touch. At NSA Services SA, expert handling time fell 84% while start-to-finish time fell 54%. Judged on cycle time alone, the project looks weaker than it is. Measure the step you changed: expert time per claim, split by simple and complex claims.",
  },
  {
    question: "Does True Aim replace the claims system?",
    answer:
      "No. True Aim sits alongside the insurer's system of record. It connects to the core claims and policy systems through an API, reading data first and writing decisions back once the insurer is ready. Where no API exists, it works from file exports or an MCP. Claims keep arriving by email, Microsoft 365 or online forms, as they do today.",
  },
];
