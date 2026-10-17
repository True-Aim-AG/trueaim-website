import type { BrandIconName } from "@/components/brand/BrandIcon";

/**
 * The solutions pages, one per customer type under /<locale>/solutions/<segment>/,
 * in the order of the Solutions menu. English only until the translations land.
 * Segments are frozen once the URLs go to Firon (URL-LIST.md); a rename needs a redirect row.
 * `key` names the copy in messages/en/solutions.json (solutionPages) and metadata.json.
 */
export const solutions = [
  { segment: "insurers", key: "insurers", icon: "policy" },
  { segment: "brokers", key: "brokers", icon: "workflow" },
  { segment: "third-party-administrators", key: "tpas", icon: "process" },
  { segment: "warranty-providers", key: "warranty", icon: "claim" },
  { segment: "claims-technology-providers", key: "claimsTech", icon: "structure" },
] as const satisfies readonly { segment: string; key: string; icon: BrandIconName }[];

export type Solution = (typeof solutions)[number];

export function findSolution(segment: string): Solution | undefined {
  return solutions.find((solution) => solution.segment === segment);
}
