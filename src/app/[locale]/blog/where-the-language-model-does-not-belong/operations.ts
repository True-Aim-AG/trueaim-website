/**
 * The three kinds of step inside a claim decision, in one place. `page.tsx`
 * renders them and `layout.tsx` publishes them as an ItemList in JSON-LD, so
 * the visible list and the machine-readable one are the same text.
 */
export type Operation = {
  name: string;
  description: string;
};

export const operations: Operation[] = [
  {
    name: "Reading (Evidence to Facts)",
    description:
      "Turning raw evidence into structured facts. Claims arrive as photographs, PDFs, handwriting, emails and free text. Reading pulls out what they say (the policy number, date of loss, repaired part or invoiced amount) and links each value back to its source document.",
  },
  {
    name: "Computing (Applying Rules & Numbers)",
    description:
      "Applying written rules and calculations to those facts. Is the part covered under the wording? What excess applies? Does the amount breach a limit? How is liability split? Once the facts are fixed, each of these has one correct answer set by the policy, catalogue or rulebook.",
  },
  {
    name: "Judging (Resolving Open Items)",
    description:
      "Resolving what written wording leaves open. An invoice line describes a part in words no catalogue entry uses. Or a clause could reasonably be read two ways. No rule settles it, so someone (or something) has to make a call.",
  },
];
