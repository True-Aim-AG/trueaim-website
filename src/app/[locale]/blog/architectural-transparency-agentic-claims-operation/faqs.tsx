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
    question: "Why hasn't claims automation removed delays between companies?",
    answer:
      "Traditional automation operates inside your own walls. It accelerates the internal desk, but friction simply migrates to the hand-offs between organisations. A carrier can parse a First Notice of Loss in four seconds, yet handlers still lose forty-eight hours chasing a PDF quote from an external repairer. Until you eliminate that cross-company navigation tax, the chain remains slow.",
  },
  {
    question: "Does a shared record mean every party sees everything?",
    answer:
      "No. Each participant operates strictly within their defined entitlement. The insurer configures access rules once, and ethical walls enforce them across the network. Policyholders track document verification, intermediaries monitor binder limits and contractors receive line-item approvals. Every party works from the same underlying truth without exposing proprietary data.",
  },
  {
    question: 'What does "line-level provenance" mean in practice?',
    answer:
      "It means defensibility by design. For every decision, the system writes four primitives to the record: the source facts and documents, the policy wording in force, the plain-language reasoning and the actor responsible (human or AI). If a handler overrides a recommendation, the rationale is preserved. Not a black box, but a glass box.",
  },
  {
    question: "Do carriers have to replace their core claims systems?",
    answer:
      "No. Multi-year platform replacements are too slow and carry unacceptable delivery risk. An agentic operating system orchestrates above your existing systems of record via standard APIs. You can start with a single high-friction module, such as repair price benchmarking or coverage verification, and expand as the record proves its value.",
  },
  {
    question: "Is the goal to reduce claims headcount?",
    answer:
      "The design principle is human elevation, not labour reduction. Removing low-yield administration (the reading, re-keying and phone chasing) returns hours to your specialists. Handlers reclaim their time for high-stakes calls: resolving complex edge cases, counselling distressed policyholders and refining underwriting rules.",
  },
  {
    question: "What is the most practical starting point?",
    answer:
      "A bounded pilot. Place one partner network and one line of business on a shared record. Over ninety days, measure the real signals: fewer status enquiries, faster invoice turnaround and a measurable drop in contested settlements.",
  },
];
