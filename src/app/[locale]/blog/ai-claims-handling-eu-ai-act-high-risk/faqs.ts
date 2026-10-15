import type { FaqItem } from "@/components/content/schema";

/**
 * The FAQ as plain text, published as FAQPage JSON-LD. page.tsx renders its own
 * copy of these answers with links; both move into one source with the content
 * layer (chunk 9).
 */
export const faqs: FaqItem[] = [
  {
    question: "Is AI claims handling high-risk under the EU AI Act?",
    answer:
      "No. Annex III does not list claims handling. Point 5(c) covers risk assessment and pricing for life and health insurance only. The Commission's draft classification guidelines of 19 May 2026 give claims management as an example of a system falling outside that point, even for health insurance products. A motor, property, warranty or commercial-lines claims operation falls outside the high-risk regime, though it remains subject to data protection law and to sectoral insurance law.",
  },
  {
    question: "Is AI claims handling high-risk in health insurance?",
    answer:
      "No. Health insurance is the sharpest test of the rule, because underwriting in that line is high-risk. The Commission's draft guidelines still place claims management outside point 5(c) there, on the basis that verifying a claim against policy terms or determining the amount payable is distinct from risk assessment or pricing.",
  },
  {
    question: "Does the December 2027 deferral apply to claims handling?",
    answer:
      "It has no effect on it. The Digital Omnibus deferred the date on which high-risk obligations begin to apply. It did not change which systems are high-risk. Claims handling was not among them before the deferral or after it.",
  },
  {
    question: "What did Regulation (EU) 2026/1744 change?",
    answer:
      "It deferred the AI Act's high-risk obligations. Standalone Annex III systems move from 2 August 2026 to 2 December 2027. AI embedded in regulated products moves from 2 August 2027 to 2 August 2028. It was published on 24 July 2026 and entered into force on 27 July 2026.",
  },
  {
    question: "Does GDPR Article 22 apply to an automated claims decision?",
    answer:
      "Yes, where the GDPR is the applicable regime. Article 22 restricts decisions based solely on automated processing that produce legal effects or similarly significant effects. A declined or reduced claim meets that threshold. It has applied since 25 May 2018 and was unaffected by the AI Act deferral. Operations outside the EU answer to the equivalent provision in their own regime, such as Switzerland's revised Federal Act on Data Protection.",
  },
  {
    question: "What counts as meaningful human involvement?",
    answer:
      "Under Article 29 Working Party guidance (WP251rev.01), review must be carried out by someone with the authority and competence to change the decision. Employees rubber-stamping automatically generated outputs do not take a controller outside Article 22.",
  },
  {
    question: "What must you disclose about the logic of an automated decision?",
    answer:
      "In Dun & Bradstreet Austria (C-203/22) the CJEU required the procedure and principles actually applied, communicated concisely and intelligibly, including how the outcome would differ had the data been different. Supplying the algorithm itself does not discharge the duty. A trade secret does not permit a blanket refusal.",
  },
];
