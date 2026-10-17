/**
 * The solutions pages, one per customer type under /<locale>/solutions/<segment>/,
 * in the order of the Solutions menu. English only until the translations land.
 * Segments are frozen once the URLs go to Firon (URL-LIST.md); a rename needs a redirect row.
 * `key` names the copy in messages/en/solutions.json (solutionPages) and metadata.json.
 */
export const solutions = [
  { segment: "insurers", key: "insurers" },
  { segment: "brokers", key: "brokers" },
  { segment: "third-party-administrators", key: "tpas" },
  { segment: "warranty-providers", key: "warranty" },
  { segment: "claims-technology-providers", key: "claimsTech" },
] as const;

export type Solution = (typeof solutions)[number];

export function findSolution(segment: string): Solution | undefined {
  return solutions.find((solution) => solution.segment === segment);
}
