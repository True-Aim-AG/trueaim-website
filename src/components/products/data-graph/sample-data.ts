import type {
  ClaimGraph,
  CraftKey,
  GraphBand,
  GraphColumn,
  GraphEdge,
  GraphFamily,
  GraphNode,
  GraphNodeType,
  GraphTier,
} from "./types";

/**
 * The hero's data: one invented property claim in the shape of the
 * prototype's claim graph, so the ported scene draws it unchanged. Every name,
 * number and file is made up. Names, numbers, file names and dates read the
 * same in every language, so the data carries no copy of its own: the words
 * come from the messages file (`GraphWords`).
 *
 * The claim after a summer storm in Thun: its loss event, three exposures,
 * the policyholder, broker, insurer and policy snapshot; the loss assessments,
 * the scopes of works by trade and the settlement decision under the
 * exposures; the claims adjuster and the AI claims specialist with the
 * insurer; and what was read from the paper: the trades' invoices, the
 * documents they were read from and the damage photos. Two drying invoices
 * carry the same amount and date, and are flagged.
 */

/** The words the graph prints, from `messages/<locale>/products.json`. */
export interface GraphWords {
  types: Record<GraphNodeType, string>;
  /** "Read from {document}, page {page}" */
  source: string;
  /** "Flagged for review: same amount and date as {other}" */
  mismatch: string;
}

/** The claim the graph opens on and comes back to. */
export const MAIN_CLAIM = "claim:04812";

/** The two invoices with the same amount and date. */
export const FLAGGED: readonly string[] = [
  "invoice:dt-2207",
  "invoice:dt-2214",
];

/** Left out on a phone: the paper behind the invoices and two trades, so the Node view stays readable. */
const PHONE_DROPS: ReadonlySet<string> = new Set([
  "scope:finishes",
  "scope:flooring",
  "invoice:sc-0388",
  "document:sc-0388",
  "document:dt-2207",
  "document:dt-2214",
  "photo:0417",
  "photo:0423",
]);

/** Each type's family, which picks its shape, and where it stands in the story (the prototype's `story.ts`). */
const TYPE_PLACE: Record<
  GraphNodeType,
  { family: GraphFamily; column: GraphColumn; band: GraphBand; tier: GraphTier }
> = {
  lossEvent: { family: "loss", column: 0, band: "main", tier: 1 },
  claim: { family: "loss", column: 1, band: "main", tier: 0 },
  policyholder: { family: "who", column: 1, band: "above", tier: 1 },
  broker: { family: "who", column: 1, band: "above", tier: 1 },
  insurer: { family: "who", column: 1, band: "above", tier: 1 },
  adjuster: { family: "who", column: 1, band: "above", tier: 1 },
  agent: { family: "who", column: 1, band: "above", tier: 1 },
  policy: { family: "known", column: 1, band: "below", tier: 1 },
  exposure: { family: "loss", column: 2, band: "main", tier: 1 },
  photo: { family: "known", column: 3, band: "below", tier: 3 },
  lossAssessment: { family: "known", column: 4, band: "main", tier: 1 },
  scopeOfWork: { family: "work", column: 6, band: "main", tier: 1 },
  invoice: { family: "money", column: 7, band: "main", tier: 2 },
  document: { family: "known", column: 7, band: "below", tier: 2 },
  decision: { family: "decisions", column: 8, band: "main", tier: 1 },
};

interface Seed {
  id: string;
  type: GraphNodeType;
  label: string;
  figure?: string;
  craft?: CraftKey;
  /** The document and page the value was read from. */
  readFrom?: { document: string; page: number };
}

const SEEDS: Seed[] = [
  { id: MAIN_CLAIM, type: "claim", label: "CL-2026-04812", figure: "14.07.2026" },
  { id: "event:storm", type: "lossEvent", label: "Storm Thun", figure: "13.07.2026" },
  { id: "exposure:accommodation", type: "exposure", label: "Accommodation", figure: "CHF 6,800" },
  { id: "exposure:building", type: "exposure", label: "Building", figure: "CHF 84,500" },
  { id: "exposure:contents", type: "exposure", label: "Contents", figure: "CHF 12,300" },
  { id: "party:gerber", type: "policyholder", label: "Lea Gerber" },
  { id: "party:ammann", type: "broker", label: "Reto Ammann" },
  { id: "party:bergwald", type: "insurer", label: "Bergwald Insurance" },
  { id: "party:keller", type: "adjuster", label: "Nadine Keller" },
  { id: "party:agent", type: "agent", label: "Claims specialist agent" },
  { id: "policy:418203", type: "policy", label: "HB-418203", figure: "CHF 1,250,000" },
  { id: "assessment:building", type: "lossAssessment", label: "Building", figure: "CHF 84,500" },
  { id: "assessment:contents", type: "lossAssessment", label: "Contents", figure: "CHF 12,300" },
  { id: "scope:carpenter", type: "scopeOfWork", label: "Carpenter", craft: "carpenter" },
  { id: "scope:drying", type: "scopeOfWork", label: "Drying and mould", craft: "drying" },
  { id: "scope:finishes", type: "scopeOfWork", label: "Finishes", craft: "finishes" },
  { id: "scope:flooring", type: "scopeOfWork", label: "Flooring", craft: "flooring" },
  { id: "scope:roofer", type: "scopeOfWork", label: "Roofer", craft: "roofer" },
  { id: "scope:scaffolding", type: "scopeOfWork", label: "Scaffolding", craft: "scaffolding" },
  { id: "decision:repair", type: "decision", label: "Managed repair" },
  { id: "photo:0412", type: "photo", label: "IMG_0412.jpg" },
  { id: "photo:0417", type: "photo", label: "IMG_0417.jpg" },
  { id: "photo:0423", type: "photo", label: "IMG_0423.jpg" },
  { id: "document:rf-1043", type: "document", label: "RF-1043.pdf" },
  { id: "document:sc-0388", type: "document", label: "SC-0388.pdf" },
  { id: "document:dt-2207", type: "document", label: "DT-2207.pdf" },
  { id: "document:dt-2214", type: "document", label: "DT-2214.pdf" },
];

const INVOICES: (Seed & { scope: string })[] = [
  { id: "invoice:rf-1043", type: "invoice", label: "RF-1043", figure: "CHF 18,640.00 · 28.07.2026", scope: "scope:roofer", craft: "roofer", readFrom: { document: "document:rf-1043", page: 1 } },
  { id: "invoice:sc-0388", type: "invoice", label: "SC-0388", figure: "CHF 4,950.00 · 21.07.2026", scope: "scope:scaffolding", craft: "scaffolding", readFrom: { document: "document:sc-0388", page: 1 } },
  { id: "invoice:dt-2207", type: "invoice", label: "DT-2207", figure: "CHF 3,480.00 · 24.07.2026", scope: "scope:drying", craft: "drying", readFrom: { document: "document:dt-2207", page: 1 } },
  { id: "invoice:dt-2214", type: "invoice", label: "DT-2214", figure: "CHF 3,480.00 · 24.07.2026", scope: "scope:drying", craft: "drying", readFrom: { document: "document:dt-2214", page: 2 } },
];

/** [source, target, kind, label] */
const LINKS: [string, string, string, string][] = [
  [MAIN_CLAIM, "event:storm", "caused-by", "caused by"],
  [MAIN_CLAIM, "exposure:accommodation", "exposure", "exposure"],
  [MAIN_CLAIM, "exposure:building", "exposure", "exposure"],
  [MAIN_CLAIM, "exposure:contents", "exposure", "exposure"],
  [MAIN_CLAIM, "party:gerber", "claimant", "claimant"],
  [MAIN_CLAIM, "party:ammann", "broker", "placed by"],
  [MAIN_CLAIM, "party:bergwald", "insurer", "insured by"],
  [MAIN_CLAIM, "policy:418203", "under", "under policy"],
  ["party:bergwald", "policy:418203", "issued", "issued"],
  ["party:bergwald", "party:keller", "adjuster", "adjusted by"],
  ["party:bergwald", "party:agent", "agent", "assisted by"],
  ["exposure:building", "assessment:building", "assessed", "assessed"],
  ["exposure:contents", "assessment:contents", "assessed", "assessed"],
  ["exposure:building", "scope:carpenter", "scope", "scope of works"],
  ["exposure:building", "scope:drying", "scope", "scope of works"],
  ["exposure:building", "scope:finishes", "scope", "scope of works"],
  ["exposure:building", "scope:roofer", "scope", "scope of works"],
  ["exposure:building", "scope:scaffolding", "scope", "scope of works"],
  ["exposure:contents", "scope:flooring", "scope", "scope of works"],
  ["exposure:contents", "scope:drying", "scope", "scope of works"],
  ["exposure:building", "decision:repair", "settles", "settled by"],
  ["exposure:accommodation", "decision:repair", "settles", "settled by"],
  ["assessment:building", "photo:0412", "evidence", "evidence"],
  ["assessment:building", "photo:0417", "evidence", "evidence"],
  ["assessment:contents", "photo:0423", "evidence", "evidence"],
  ["invoice:dt-2207", "invoice:dt-2214", "duplicate", "same amount and date"],
];

const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");

/** The graph, worded; lighter on a phone. */
export function buildGraph(words: GraphWords, phone: boolean): ClaimGraph {
  const seeds: Seed[] = [...SEEDS, ...INVOICES].filter(
    (seed) => !(phone && PHONE_DROPS.has(seed.id)),
  );

  const links: [string, string, string, string][] = [...LINKS];
  for (const invoice of INVOICES) {
    links.push([invoice.scope, invoice.id, "invoiced", "invoiced"]);
    if (invoice.readFrom) {
      links.push([invoice.id, invoice.readFrom.document, "read-from", "read from"]);
    }
  }

  const ids = new Set(seeds.map((seed) => seed.id));
  const labelOf = (id: string) => seeds.find((seed) => seed.id === id)?.label ?? "";

  const nodes: GraphNode[] = seeds.map((seed) => {
    const place = TYPE_PLACE[seed.type];
    const flagged = FLAGGED.includes(seed.id);
    const status = flagged
      ? fill(words.mismatch, { other: labelOf(FLAGGED.find((each) => each !== seed.id) ?? "") })
      : seed.readFrom
        ? fill(words.source, {
            document: labelOf(seed.readFrom.document),
            page: String(seed.readFrom.page),
          })
        : undefined;
    return {
      id: seed.id,
      type: seed.type,
      family: place.family,
      label: seed.label,
      tier: place.tier,
      revealedBy: [],
      column: place.column,
      band: place.band,
      craft: seed.craft,
      status: flagged ? "waiting" : undefined,
      hover: { figure: seed.figure, status },
      properties: [],
      childCount: 0,
    };
  });

  const edges: GraphEdge[] = links
    .filter(([source, target]) => ids.has(source) && ids.has(target))
    .map(([source, target, kind, label]) => ({
      id: `${kind}:${source}->${target}`,
      source,
      target,
      kind,
      label,
    }));

  return { nodes, edges };
}
