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
    question:
      "What questions should you ask before adopting AI in claims handling?",
    answer:
      "Twelve, in four groups. Provenance: where each value came from, whether a rule or a model produced it and what the system does when evidence is incomplete. Reconstruction: whether a decision can be rebuilt a year later, whether the versions that produced it are on the record and who can alter the record and for how long it is kept. Human judgement: what the reviewer sees, whether overrides are captured and learned from and whether any decision can be explained to the claimant from the record alone. Continuity: performance on claims the system has never seen, portability of the records at exit and where data processing and accountability sit.",
  },
  {
    question:
      "Does the EU AI Act's December 2027 deferral change anything for claims handling?",
    answer:
      "No. Regulation (EU) 2026/1744 moved the date on which most high-risk obligations begin to apply, to 2 December 2027 for standalone systems listed in Annex III. Claims handling is not listed in Annex III, and the rights of a person subject to a solely automated decision have applied under GDPR since 25 May 2018. The deferral changes the calendar for other systems. It does not change what a claims operation owes the people whose claims it decides.",
  },
  {
    question: "What makes an AI claims decision auditable?",
    answer:
      "Four properties. Every value the decision used traces to its source document and page. The decision can be reconstructed later, because the rules, the policy version and the model that produced it are recorded on the decision itself. A person with the authority to change the outcome reviewed it with the evidence in front of them. And the record is tamper-evident, exportable and retained for as long as the operation's obligations require.",
  },
  {
    question:
      "Is a human sign-off enough to make an automated claims decision defensible?",
    answer:
      "Only if the review is real. The reviewer must see the evidence behind the recommendation and hold the authority and competence to change it. A sign-off that nobody could realistically refuse leaves the decision solely automated in substance, and under GDPR the person affected retains the rights that follow from that.",
  },
  {
    question: "Can AI claims decisions be deterministic?",
    answer:
      "Largely, yes. Where a policy, catalogue or rulebook is converted into a decision tree, the outcome is computed from the facts, and the same inputs always produce the same decision. Models are needed to read unstructured evidence and to resolve genuinely ambiguous items, and a well-designed record marks those lines as probabilistic so the two are never confused.",
  },
  {
    question: "What should a Swiss insurer expect of an AI claims system?",
    answer:
      "FINMA's Guidance 08/2024 of 18 December 2024 sets out what supervision found on AI governance, inventories and risk classification, data quality, testing and ongoing monitoring, documentation, explainability and independent review, and states that FINMA expects supervised institutions using AI to align their governance, risk management and control systems accordingly. Under FINMA Circular 2018/3 an insurer that outsources a function remains accountable to FINMA as if it performed the function itself. A system should therefore be able to evidence each of those points from its own records.",
  },
];
