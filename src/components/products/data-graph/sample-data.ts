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
 * The hero's data: a small, invented claims book in the shape of the
 * prototype's claim graph, so the ported scene draws it unchanged. Every name,
 * number and file is made up. Names, numbers, file names and dates read the
 * same in every language, so the data carries no copy of its own: the words
 * come from the messages file (`GraphWords`). Three claims under two policies, three
 * suppliers and their invoices, the invoice lines read off each scan, and the
 * damage photos. Two invoices from one supplier carry the same amount and
 * date on different claims, and are flagged.
 */

export type ViewId = "claim" | "supplier" | "policy" | "documentType";

export const VIEWS: readonly ViewId[] = [
  "claim",
  "supplier",
  "policy",
  "documentType",
];

/** The words the graph prints, from `messages/<locale>/products.json`. */
export interface GraphWords {
  types: Record<GraphNodeType, string>;
  /** "Read from {document}, page {page}" */
  source: string;
  /** "Flagged for review: same amount and date as {other}" */
  mismatch: string;
}

/** The node each arrange button re-centres the ring on. */
export const HUBS: Record<ViewId, string> = {
  claim: "claim:1187",
  supplier: "group:suppliers",
  policy: "group:policies",
  documentType: "group:document-types",
};

/** The two invoices with the same amount and date. */
export const FLAGGED: readonly string[] = [
  "invoice:bw-0912",
  "invoice:bw-0918",
];

/** Left out on a phone: the second-level detail, so the lighter graph keeps every type. */
const PHONE_DROPS: ReadonlySet<string> = new Set([
  "photo:1187-b",
  "photo:1187-c",
  "photo:1203-a",
  "line:3307-2",
  "line:3312-1",
  "line:dr551-2",
  "line:dr560-1",
  "document:3312",
  "document:dr560",
  "document:schedule-30562",
  "party:pell",
  "photo:1219-a",
]);

/** Each type's family, which picks its shape, and where it stands in the story. */
const TYPE_PLACE: Record<
  GraphNodeType,
  { family: GraphFamily; column: GraphColumn; band: GraphBand; tier: GraphTier }
> = {
  claim: { family: "loss", column: 1, band: "main", tier: 1 },
  policy: { family: "known", column: 2, band: "main", tier: 1 },
  party: { family: "who", column: 2, band: "above", tier: 1 },
  supplier: { family: "who", column: 6, band: "above", tier: 1 },
  document: { family: "known", column: 5, band: "below", tier: 2 },
  invoice: { family: "work", column: 7, band: "main", tier: 2 },
  invoiceLine: { family: "money", column: 8, band: "main", tier: 3 },
  photo: { family: "known", column: 3, band: "below", tier: 3 },
  group: { family: "decisions", column: 4, band: "main", tier: 1 },
};

/** The nodes the arrange buttons centre on, and the groups under "Document types". */
const GROUPS: Seed[] = [
  { id: "group:suppliers", type: "group", label: "Suppliers" },
  { id: "group:policies", type: "group", label: "Policies" },
  { id: "group:document-types", type: "group", label: "Document types" },
  { id: "group:invoices", type: "group", label: "Invoices", tier: 2 },
  { id: "group:damage-photos", type: "group", label: "Damage photos", tier: 2 },
  { id: "group:claim-forms", type: "group", label: "Claim forms", tier: 2 },
  { id: "group:policy-schedules", type: "group", label: "Policy schedules", tier: 2 },
];

interface Seed {
  id: string;
  type: GraphNodeType;
  label: string;
  figure?: string;
  craft?: CraftKey;
  tier?: GraphTier;
  /** The document and page the value was read from. */
  readFrom?: { document: string; page: number };
}

const CLAIMS: Seed[] = [
  { id: "claim:1187", type: "claim", label: "CL-24-1187", figure: "09.03.2026", tier: 0 },
  { id: "claim:1203", type: "claim", label: "CL-24-1203", figure: "11.03.2026" },
  { id: "claim:1219", type: "claim", label: "CL-24-1219", figure: "12.03.2026" },
];

const POLICIES: Seed[] = [
  { id: "policy:30418", type: "policy", label: "POL-HM-30418", figure: "CHF 750,000" },
  { id: "policy:30562", type: "policy", label: "POL-HM-30562", figure: "CHF 420,000" },
];

const PARTIES: Seed[] = [
  { id: "party:harbourview", type: "party", label: "Harbourview Lettings" },
  { id: "party:okafor", type: "party", label: "Mira Okafor" },
  { id: "party:pell", type: "party", label: "Jonas Pell", tier: 2 },
];

const SUPPLIERS: Seed[] = [
  { id: "supplier:northgate", type: "supplier", label: "Northgate Roofing", craft: "roofer" },
  { id: "supplier:brightwater", type: "supplier", label: "Brightwater Plumbing", craft: "plumber" },
  { id: "supplier:dryline", type: "supplier", label: "Dryline Restoration", craft: "drying" },
];

const DOCUMENTS: Seed[] = [
  { id: "document:3307", type: "document", label: "INV-3307.pdf" },
  { id: "document:3312", type: "document", label: "INV-3312.pdf" },
  { id: "document:bw-0912", type: "document", label: "BW-0912.pdf" },
  { id: "document:bw-0918", type: "document", label: "BW-0918.pdf" },
  { id: "document:dr551", type: "document", label: "DR-551.pdf" },
  { id: "document:dr560", type: "document", label: "DR-560.pdf" },
  { id: "document:claim-form-1187", type: "document", label: "CL-24-1187.pdf" },
  { id: "document:schedule-30562", type: "document", label: "POL-HM-30562.pdf" },
];

const INVOICES: (Seed & { supplier: string; claim: string })[] = [
  { id: "invoice:3307", type: "invoice", label: "INV-3307", figure: "CHF 4,860.00 · 16.03.2026", supplier: "supplier:northgate", claim: "claim:1187", craft: "roofer", readFrom: { document: "document:3307", page: 1 } },
  { id: "invoice:3312", type: "invoice", label: "INV-3312", figure: "CHF 2,140.00 · 19.03.2026", supplier: "supplier:northgate", claim: "claim:1203", craft: "roofer", readFrom: { document: "document:3312", page: 1 } },
  { id: "invoice:bw-0912", type: "invoice", label: "BW-0912", figure: "CHF 1,275.40 · 14.03.2026", supplier: "supplier:brightwater", claim: "claim:1187", craft: "plumber", readFrom: { document: "document:bw-0912", page: 1 } },
  { id: "invoice:bw-0918", type: "invoice", label: "BW-0918", figure: "CHF 1,275.40 · 14.03.2026", supplier: "supplier:brightwater", claim: "claim:1219", craft: "plumber", readFrom: { document: "document:bw-0918", page: 1 } },
  { id: "invoice:dr551", type: "invoice", label: "DR-551", figure: "CHF 3,390.00 · 21.03.2026", supplier: "supplier:dryline", claim: "claim:1187", craft: "drying", readFrom: { document: "document:dr551", page: 1 } },
  { id: "invoice:dr560", type: "invoice", label: "DR-560", figure: "CHF 980.00 · 23.03.2026", supplier: "supplier:dryline", claim: "claim:1219", craft: "drying", readFrom: { document: "document:dr560", page: 1 } },
];

const LINES: (Seed & { invoice: string })[] = [
  { id: "line:3307-1", type: "invoiceLine", label: "Ridge tiles replaced", figure: "CHF 2,950.00", invoice: "invoice:3307", craft: "roofer", readFrom: { document: "document:3307", page: 1 } },
  { id: "line:3307-2", type: "invoiceLine", label: "Scaffold hire", figure: "CHF 1,910.00", invoice: "invoice:3307", craft: "roofer", readFrom: { document: "document:3307", page: 2 } },
  { id: "line:3312-1", type: "invoiceLine", label: "Flashing repair", figure: "CHF 2,140.00", invoice: "invoice:3312", craft: "roofer", readFrom: { document: "document:3312", page: 1 } },
  { id: "line:bw0912-1", type: "invoiceLine", label: "Burst pipe repair", figure: "CHF 845.40", invoice: "invoice:bw-0912", craft: "plumber", readFrom: { document: "document:bw-0912", page: 1 } },
  { id: "line:bw0912-2", type: "invoiceLine", label: "Emergency call-out", figure: "CHF 430.00", invoice: "invoice:bw-0912", craft: "plumber", readFrom: { document: "document:bw-0912", page: 1 } },
  { id: "line:bw0918-1", type: "invoiceLine", label: "Burst pipe repair", figure: "CHF 845.40", invoice: "invoice:bw-0918", craft: "plumber", readFrom: { document: "document:bw-0918", page: 1 } },
  { id: "line:bw0918-2", type: "invoiceLine", label: "Emergency call-out", figure: "CHF 430.00", invoice: "invoice:bw-0918", craft: "plumber", readFrom: { document: "document:bw-0918", page: 1 } },
  { id: "line:dr551-1", type: "invoiceLine", label: "Dehumidifier hire", figure: "CHF 2,100.00", invoice: "invoice:dr551", craft: "drying", readFrom: { document: "document:dr551", page: 1 } },
  { id: "line:dr551-2", type: "invoiceLine", label: "Moisture survey", figure: "CHF 1,290.00", invoice: "invoice:dr551", craft: "drying", readFrom: { document: "document:dr551", page: 2 } },
  { id: "line:dr560-1", type: "invoiceLine", label: "Moisture survey", figure: "CHF 980.00", invoice: "invoice:dr560", craft: "drying", readFrom: { document: "document:dr560", page: 1 } },
];

const PHOTOS: (Seed & { claim: string })[] = [
  { id: "photo:1187-a", type: "photo", label: "IMG_0412.jpg", claim: "claim:1187" },
  { id: "photo:1187-b", type: "photo", label: "IMG_0415.jpg", claim: "claim:1187" },
  { id: "photo:1187-c", type: "photo", label: "IMG_0419.jpg", claim: "claim:1187" },
  { id: "photo:1203-a", type: "photo", label: "IMG_0533.jpg", claim: "claim:1203" },
  { id: "photo:1219-a", type: "photo", label: "IMG_0611.jpg", claim: "claim:1219" },
];

/** [source, target, kind, label] */
const LINKS: [string, string, string, string][] = [
  ["claim:1187", "policy:30418", "under", "under policy"],
  ["claim:1203", "policy:30418", "under", "under policy"],
  ["claim:1219", "policy:30562", "under", "under policy"],
  ["policy:30418", "party:harbourview", "held-by", "held by"],
  ["policy:30562", "party:okafor", "held-by", "held by"],
  ["claim:1187", "party:pell", "adjuster", "adjusted by"],
  ["document:claim-form-1187", "claim:1187", "read-into", "read into"],
  ["document:schedule-30562", "policy:30562", "read-into", "read into"],
  ["invoice:bw-0912", "invoice:bw-0918", "duplicate", "same amount and date"],
];

const DOCUMENT_TYPES = [
  "group:invoices",
  "group:damage-photos",
  "group:claim-forms",
  "group:policy-schedules",
];

const lookup = <T extends Seed>(seeds: readonly T[], id: string) =>
  seeds.find((seed) => seed.id === id);

const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");

/** The graph, worded; lighter on a phone. */
export function buildGraph(words: GraphWords, phone: boolean): ClaimGraph {
  const seeds: Seed[] = [
    ...CLAIMS,
    ...POLICIES,
    ...PARTIES,
    ...SUPPLIERS,
    ...DOCUMENTS,
    ...INVOICES,
    ...LINES,
    ...PHOTOS,
    ...GROUPS,
  ].filter((seed) => !(phone && PHONE_DROPS.has(seed.id)));

  const links: [string, string, string, string][] = [...LINKS];
  for (const invoice of INVOICES) {
    links.push([invoice.id, invoice.claim, "belongs-to", "belongs to"]);
    links.push([invoice.supplier, invoice.id, "sent", "sent"]);
    if (invoice.readFrom) {
      links.push([invoice.id, invoice.readFrom.document, "read-from", "read from"]);
    }
  }
  for (const line of LINES) {
    links.push([line.invoice, line.id, "contains", "contains"]);
    if (line.readFrom) {
      links.push([line.id, line.readFrom.document, "read-from", "read from"]);
    }
  }
  for (const photo of PHOTOS) {
    links.push([photo.id, photo.claim, "evidence", "evidence for"]);
  }

  for (const supplier of SUPPLIERS) links.push(["group:suppliers", supplier.id, "groups", "groups"]);
  for (const policy of POLICIES) links.push(["group:policies", policy.id, "groups", "groups"]);
  for (const group of DOCUMENT_TYPES) links.push(["group:document-types", group, "groups", "groups"]);
  for (const document of DOCUMENTS) {
    const group = document.id.includes("claim-form")
      ? "group:claim-forms"
      : document.id.includes("schedule")
        ? "group:policy-schedules"
        : "group:invoices";
    links.push([group, document.id, "groups", "groups"]);
  }
  for (const photo of PHOTOS) links.push(["group:damage-photos", photo.id, "groups", "groups"]);

  const ids = new Set(seeds.map((seed) => seed.id));
  const documentName = (id: string) => lookup(DOCUMENTS, id)?.label ?? id;
  const other = (id: string) =>
    lookup(INVOICES, FLAGGED.find((each) => each !== id) ?? "")?.label ?? "";

  const nodes: GraphNode[] = seeds.map((seed) => {
    const place = TYPE_PLACE[seed.type];
    const flagged = FLAGGED.includes(seed.id);
    const status = flagged
      ? fill(words.mismatch, { other: other(seed.id) })
      : seed.readFrom
        ? fill(words.source, {
            document: documentName(seed.readFrom.document),
            page: String(seed.readFrom.page),
          })
        : undefined;
    return {
      id: seed.id,
      type: seed.type,
      family: place.family,
      label: seed.label,
      tier: seed.tier ?? place.tier,
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
