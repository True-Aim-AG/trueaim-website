import {
  ArrowMarkerDefs,
  Arrow,
  CurvedArrow,
  DottedPath,
  ArrowLabel,
  GroupFrame,
  NodeBox,
  HexBullet,
} from "./shared";

type Locale = "en" | "de" | "fr" | "it";

type Copy = {
  title: string;
  heading: string;
  sources: string[];
  crm: string[];
  gws: string[];
  pg: string[];
  sql: string[];
  sqlSub: string[];
  wa: string[];
  environment: string[];
  n8n: string[];
  workflowUi: string[];
  workflowUiSub: string[];
  flatFileGen: string[];
  downstream: string[];
  flatFileIngestion: string[];
  legacyUi: string[];
  legacyUiSub: string[];
  onCompletion: string[];
  highValueCases: string[];
};

// The diagram's wording per language. English matches the original PNG exactly.
const COPY: Record<Locale, Copy> = {
  en: {
    title:
      "Pattern B — multi-source orchestration with SLA workflow. Diagram shows five customer source systems (CRM, Google Workspace, Postgres, SQL dumps from upstream insurers, WhatsApp) feeding an n8n orchestration backend inside True Aim, a workflow UI handling comms, SLA tracking and human-in-the-loop, and a flat-file generator producing artifacts for downstream insurer legacy systems including a fallback browser-based legacy UI integration.",
    heading: "Pattern B: multi-source orchestration with SLA workflow",
    sources: ["Customer source", "systems"],
    crm: ["CRM"],
    gws: ["Google", "Workspace"],
    pg: ["Postgres"],
    sql: ["SQL dumps"],
    sqlSub: ["from upstream insurers"],
    wa: ["WhatsApp"],
    environment: ["True Aim environment"],
    n8n: ["n8n", "orchestration"],
    workflowUi: ["Workflow UI"],
    workflowUiSub: ["comms + SLA tracking,", "human-in-the-loop"],
    flatFileGen: ["Flat-file", "generator"],
    downstream: ["Downstream", "insurer legacy", "systems"],
    flatFileIngestion: ["Flat-file", "ingestion"],
    legacyUi: ["Legacy UI"],
    legacyUiSub: ["no API", "available"],
    onCompletion: ["on", "completion"],
    highValueCases: ["high-value cases"],
  },
  de: {
    title:
      "Muster B: Orchestrierung mehrerer Quellen mit SLA-Workflow. Das Diagramm zeigt fünf Quellsysteme des Kunden (CRM, Google Workspace, Postgres, SQL-Dumps vorgelagerter Versicherer, WhatsApp), die ein n8n-Orchestrierungs-Backend bei True Aim speisen, eine Workflow-Oberfläche für Kommunikation, SLA-Verfolgung und menschliche Prüfung sowie einen Flat-File-Generator, der Dateien für nachgelagerte Altsysteme der Versicherer erzeugt, einschließlich einer browserbasierten Anbindung der Altoberfläche als Rückfalllösung.",
    heading: "Muster B: Orchestrierung mehrerer Quellen mit SLA-Workflow",
    sources: ["Quellsysteme", "des Kunden"],
    crm: ["CRM"],
    gws: ["Google", "Workspace"],
    pg: ["Postgres"],
    sql: ["SQL-Dumps"],
    sqlSub: ["vorgelagerter Versicherer"],
    wa: ["WhatsApp"],
    environment: ["Umgebung von True Aim"],
    n8n: ["n8n-", "Orchestrierung"],
    workflowUi: ["Workflow-UI"],
    workflowUiSub: ["Kommunikation + SLA,", "menschliche Prüfung"],
    flatFileGen: ["Flat-File-", "Generator"],
    downstream: ["Nachgelagerte", "Altsysteme der", "Versicherer"],
    flatFileIngestion: ["Flat-File-", "Import"],
    legacyUi: ["Alt-UI"],
    legacyUiSub: ["keine API", "verfügbar"],
    onCompletion: ["nach", "Abschluss"],
    highValueCases: ["Fälle mit hohem Wert"],
  },
  fr: {
    title:
      "Schéma B : orchestration multi-sources avec flux de travail SLA. Le diagramme montre cinq systèmes source du client (CRM, Google Workspace, Postgres, dumps SQL des assureurs amont, WhatsApp) qui alimentent un backend d’orchestration n8n chez True Aim, une interface de flux de travail pour la communication, le suivi des SLA et le contrôle humain, et un générateur de fichiers plats produisant des fichiers pour les systèmes historiques des assureurs aval, y compris une intégration de secours de l’interface historique via le navigateur.",
    heading: "Schéma B : orchestration multi-sources avec flux de travail SLA",
    sources: ["Systèmes source", "du client"],
    crm: ["CRM"],
    gws: ["Google", "Workspace"],
    pg: ["Postgres"],
    sql: ["Dumps SQL"],
    sqlSub: ["des assureurs amont"],
    wa: ["WhatsApp"],
    environment: ["Environnement True Aim"],
    n8n: ["n8n", "orchestration"],
    workflowUi: ["Interface de flux"],
    workflowUiSub: ["communication + SLA,", "contrôle humain"],
    flatFileGen: ["Générateur de", "fichiers plats"],
    downstream: ["Systèmes", "historiques des", "assureurs aval"],
    flatFileIngestion: ["Ingestion de", "fichiers plats"],
    legacyUi: ["Interface", "historique"],
    legacyUiSub: ["sans API", "disponible"],
    onCompletion: ["à la", "clôture"],
    highValueCases: ["cas à forte valeur"],
  },
  it: {
    title:
      "Pattern B: orchestrazione multi-sorgente con workflow SLA. Il diagramma mostra cinque sistemi sorgente del cliente (CRM, Google Workspace, Postgres, dump SQL dagli assicuratori a monte, WhatsApp) che alimentano un backend di orchestrazione n8n presso True Aim, un’interfaccia workflow per comunicazioni, monitoraggio degli SLA e revisione umana, e un generatore di file flat che produce file per i sistemi legacy degli assicuratori a valle, inclusa un’integrazione di riserva dell’interfaccia legacy tramite browser.",
    heading: "Pattern B: orchestrazione multi-sorgente con workflow SLA",
    sources: ["Sistemi sorgente", "del cliente"],
    crm: ["CRM"],
    gws: ["Google", "Workspace"],
    pg: ["Postgres"],
    sql: ["Dump SQL"],
    sqlSub: ["dagli assicuratori a monte"],
    wa: ["WhatsApp"],
    environment: ["Ambiente True Aim"],
    n8n: ["n8n", "orchestrazione"],
    workflowUi: ["Interfaccia workflow"],
    workflowUiSub: ["comunicazioni + SLA,", "revisione umana"],
    flatFileGen: ["Generatore di", "file flat"],
    downstream: ["Sistemi legacy", "degli assicuratori", "a valle"],
    flatFileIngestion: ["Importazione", "file flat"],
    legacyUi: ["UI legacy"],
    legacyUiSub: ["nessuna API", "disponibile"],
    onCompletion: ["al", "completamento"],
    highValueCases: ["casi ad alto valore"],
  },
};

/**
 * Pattern B — multi-source orchestration with SLA workflow.
 * Structural, theme-aware replacement for the old raster diagram. The English wording matches
 * the original PNG exactly; the other languages come from COPY. Single True Aim Blue focal node:
 * Workflow UI.
 */
export function IntegrationPatternB({ locale = "en" }: { locale?: string }) {
  const id = "ipb";
  const c = COPY[locale as Locale] ?? COPY.en;

  // Customer source systems (left column)
  const sourceBoxes = [
    { key: "crm", title: c.crm, x: 52, y: 151, w: 206, h: 76 },
    { key: "gws", title: c.gws, x: 52, y: 250, w: 206, h: 76 },
    { key: "pg", title: c.pg, x: 52, y: 349, w: 206, h: 76 },
    {
      key: "sql",
      title: c.sql,
      sub: c.sqlSub,
      x: 52,
      y: 448,
      w: 206,
      h: 76,
    },
    { key: "wa", title: c.wa, x: 52, y: 547, w: 206, h: 76 },
  ];

  // True Aim environment (middle)
  const n8n = { x: 334, y: 305, w: 130, h: 140 };
  const workflowUi = { x: 535, y: 245, w: 200, h: 260 };
  const flatFileGen = { x: 806, y: 305, w: 130, h: 140 };
  const midRowCenterY = n8n.y + n8n.h / 2;

  // Downstream insurer legacy systems (right)
  const flatFileIngestion = { x: 1016, y: 325, w: 128, h: 100 };
  const legacyUi = { x: 1016, y: 505, w: 128, h: 110 };

  // Convergence target points on n8n's left edge, one per source box
  const n8nTargets = [322, 350, 375, 400, 428];

  return (
    <svg
      viewBox="0 0 1200 680"
      className="w-full h-auto"
      role="img"
      aria-labelledby={`${id}-title`}
    >
      <title id={`${id}-title`}>{c.title}</title>
      <ArrowMarkerDefs prefix={id} />

      {/* Diagram title, preserved from the original graphic */}
      <text
        x={40}
        y={44}
        fontFamily="var(--font-display)"
        fontWeight={700}
        fontSize={26}
        fill="var(--text-strong)"
      >
        {c.heading}
      </text>

      {/* Customer source systems */}
      <GroupFrame
        x={40}
        y={76}
        w={230}
        h={560}
        label={c.sources}
      />
      {sourceBoxes.map((box) => (
        <NodeBox
          key={box.key}
          x={box.x}
          y={box.y}
          w={box.w}
          h={box.h}
          title={box.title}
          sub={box.sub}
          titleSize={20}
          subSize={14}
        />
      ))}

      {/* True Aim environment */}
      <GroupFrame x={310} y={76} w={650} h={560} label={c.environment} />
      <NodeBox {...n8n} title={c.n8n} titleSize={18} />
      <NodeBox
        {...workflowUi}
        title={c.workflowUi}
        sub={c.workflowUiSub}
        titleSize={22}
        subSize={15}
        focal
      />
      <HexBullet x={workflowUi.x + workflowUi.w - 22} y={workflowUi.y + 20} size={14} />
      <NodeBox {...flatFileGen} title={c.flatFileGen} titleSize={18} />

      {/* Downstream insurer legacy systems */}
      <GroupFrame
        x={1000}
        y={76}
        w={160}
        h={560}
        label={c.downstream}
        labelSize={11}
      />
      <NodeBox {...flatFileIngestion} title={c.flatFileIngestion} titleSize={18} />
      <NodeBox
        {...legacyUi}
        title={c.legacyUi}
        sub={c.legacyUiSub}
        titleSize={18}
        subSize={15}
      />

      {/* Converging source connectors into n8n */}
      {sourceBoxes.map((box, i) => {
        const startY = box.y + box.h / 2;
        const endY = n8nTargets[i];
        const midX = (box.x + box.w + n8n.x) / 2;
        return (
          <CurvedArrow
            key={box.key}
            d={`M ${box.x + box.w},${startY} C ${midX},${startY} ${midX + 4},${endY} ${n8n.x},${endY}`}
            markerId={`${id}-arrow`}
          />
        );
      })}

      {/* n8n orchestration -> Workflow UI */}
      <Arrow
        x1={n8n.x + n8n.w}
        y1={midRowCenterY}
        x2={workflowUi.x}
        y2={midRowCenterY}
        markerId={`${id}-arrow`}
      />

      {/* Workflow UI -> Flat-file generator */}
      <Arrow
        x1={workflowUi.x + workflowUi.w}
        y1={midRowCenterY}
        x2={flatFileGen.x}
        y2={midRowCenterY}
        markerId={`${id}-arrow`}
      />
      <ArrowLabel
        x={(workflowUi.x + workflowUi.w + flatFileGen.x) / 2}
        y={midRowCenterY - 32}
        lines={c.onCompletion}
        size={12}
      />

      {/* Flat-file generator -> Flat-file ingestion (crosses group boundary) */}
      <Arrow
        x1={flatFileGen.x + flatFileGen.w}
        y1={midRowCenterY}
        x2={flatFileIngestion.x}
        y2={flatFileIngestion.y + flatFileIngestion.h / 2}
        markerId={`${id}-arrow`}
      />

      {/* Workflow UI -> Legacy UI (dotted, high-value cases) */}
      <DottedPath
        d={`M ${workflowUi.x + workflowUi.w / 2},${workflowUi.y + workflowUi.h} C ${workflowUi.x + workflowUi.w / 2 + 110},${legacyUi.y + legacyUi.h / 2} ${legacyUi.x - 140},${legacyUi.y + legacyUi.h / 2} ${legacyUi.x},${legacyUi.y + legacyUi.h / 2}`}
        markerId={`${id}-arrow-subtle`}
      />
      <ArrowLabel x={workflowUi.x + workflowUi.w / 2 + 90} y={503} lines={c.highValueCases} />
    </svg>
  );
}
