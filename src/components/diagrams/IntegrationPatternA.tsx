import {
  ArrowMarkerDefs,
  Arrow,
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
  enrichment: string[];
  enrichmentNote: string[];
  partsLookup: string[];
  geolocation: string[];
  azure: string[];
  batchReader: string[];
  batchReaderSub: string[];
  decisioning: string[];
  decisioningSub: string[];
  reviewUi: string[];
  reviewUiSub: string[];
  infra: string[];
  inboundStorage: string[];
  inboundStorageSub: string[];
  erp: string[];
  erpSub: string[];
  returnStorage: string[];
  returnStorageSub: string[];
  pull: string[];
  policyLookup: string[];
  onApproval: string[];
  specificUseCases: string[];
};

// The diagram's wording per language. English matches the original PNG exactly.
const COPY: Record<Locale, Copy> = {
  en: {
    title:
      "Pattern A — document-driven complex claims decisioning. Diagram shows inbound documents pulled from customer storage by a batch reader inside True Aim's Azure tenant, processed for decisioning and extraction, with policy lookup against the customer ERP, optional enrichment calls, human-in-the-loop review, and structured JSON output written back to the customer's return storage.",
    heading: "Pattern A: document-driven complex claims decisioning",
    enrichment: ["External enrichment"],
    enrichmentNote: ["(narrow, non-PII)"],
    partsLookup: ["Parts lookup"],
    geolocation: ["Geolocation"],
    azure: ["True Aim Azure"],
    batchReader: ["Batch reader"],
    batchReaderSub: ["pulls from customer storage"],
    decisioning: ["Decisioning +", "extraction"],
    decisioningSub: ["in-tenant inference"],
    reviewUi: ["Review UI"],
    reviewUiSub: ["human-in-the-loop"],
    infra: ["Customer infrastructure"],
    inboundStorage: ["Inbound storage"],
    inboundStorageSub: ["documents + payloads"],
    erp: ["ERP system"],
    erpSub: ["policy of record"],
    returnStorage: ["Return storage"],
    returnStorageSub: ["JSON per claim +", "processing log"],
    pull: ["pull"],
    policyLookup: ["policy lookup"],
    onApproval: ["on approval, push"],
    specificUseCases: ["specific use cases"],
  },
  de: {
    title:
      "Muster A: dokumentgetriebene Entscheidung bei komplexen Schäden. Das Diagramm zeigt eingehende Dokumente, die ein Batch-Reader im Azure-Mandanten von True Aim aus dem Kundenspeicher abruft und für Entscheidung und Extraktion verarbeitet, mit Policenabfrage im ERP des Kunden, optionalen Anreicherungsaufrufen, menschlicher Prüfung und strukturierter JSON-Ausgabe, die in den Rückgabespeicher des Kunden zurückgeschrieben wird.",
    heading: "Muster A: dokumentgetriebene Entscheidung bei komplexen Schäden",
    enrichment: ["Externe Anreicherung"],
    enrichmentNote: ["(eng begrenzt, ohne Personendaten)"],
    partsLookup: ["Ersatzteilabfrage"],
    geolocation: ["Geolokalisierung"],
    azure: ["True Aim Azure"],
    batchReader: ["Batch-Reader"],
    batchReaderSub: ["liest aus dem Kundenspeicher"],
    decisioning: ["Entscheidung +", "Extraktion"],
    decisioningSub: ["Inferenz im Mandanten"],
    reviewUi: ["Prüfoberfläche"],
    reviewUiSub: ["menschliche Prüfung"],
    infra: ["Kundeninfrastruktur"],
    inboundStorage: ["Eingangsspeicher"],
    inboundStorageSub: ["Dokumente + Payloads"],
    erp: ["ERP-System"],
    erpSub: ["führende Police"],
    returnStorage: ["Rückgabespeicher"],
    returnStorageSub: ["JSON je Schaden +", "Verarbeitungsprotokoll"],
    pull: ["Abruf"],
    policyLookup: ["Policenabfrage"],
    onApproval: ["nach Freigabe: Push"],
    specificUseCases: ["bestimmte Anwendungsfälle"],
  },
  fr: {
    title:
      "Schéma A : décisions sur sinistres complexes pilotées par les documents. Le diagramme montre des documents entrants lus dans le stockage du client par un lecteur par lots dans le tenant Azure de True Aim, traités pour la décision et l’extraction, avec consultation de la police dans l’ERP du client, des appels d’enrichissement facultatifs, un contrôle humain et une sortie JSON structurée réécrite dans le stockage de retour du client.",
    heading: "Schéma A : décisions sur sinistres complexes pilotées par les documents",
    enrichment: ["Enrichissement externe"],
    enrichmentNote: ["(ciblé, sans données personnelles)"],
    partsLookup: ["Recherche de pièces"],
    geolocation: ["Géolocalisation"],
    azure: ["True Aim Azure"],
    batchReader: ["Lecteur par lots"],
    batchReaderSub: ["lit le stockage du client"],
    decisioning: ["Décision +", "extraction"],
    decisioningSub: ["inférence dans le tenant"],
    reviewUi: ["Interface de revue"],
    reviewUiSub: ["contrôle humain"],
    infra: ["Infrastructure du client"],
    inboundStorage: ["Stockage entrant"],
    inboundStorageSub: ["documents + charges utiles"],
    erp: ["Système ERP"],
    erpSub: ["police de référence"],
    returnStorage: ["Stockage de retour"],
    returnStorageSub: ["JSON par sinistre +", "journal de traitement"],
    pull: ["récupération"],
    policyLookup: ["consultation de la police"],
    onApproval: ["après validation : envoi"],
    specificUseCases: ["cas d’usage précis"],
  },
  it: {
    title:
      "Pattern A: decisioni sui sinistri complessi guidate dai documenti. Il diagramma mostra documenti in ingresso prelevati dallo storage del cliente da un lettore batch nel tenant Azure di True Aim, elaborati per decisione ed estrazione, con consultazione della polizza nell’ERP del cliente, chiamate di arricchimento opzionali, revisione umana e output JSON strutturato riscritto nello storage di ritorno del cliente.",
    heading: "Pattern A: decisioni sui sinistri complessi guidate dai documenti",
    enrichment: ["Arricchimento esterno"],
    enrichmentNote: ["(mirato, senza dati personali)"],
    partsLookup: ["Ricerca ricambi"],
    geolocation: ["Geolocalizzazione"],
    azure: ["True Aim Azure"],
    batchReader: ["Lettore batch"],
    batchReaderSub: ["legge dallo storage del cliente"],
    decisioning: ["Decisione +", "estrazione"],
    decisioningSub: ["inferenza nel tenant"],
    reviewUi: ["Interfaccia di revisione"],
    reviewUiSub: ["revisione umana"],
    infra: ["Infrastruttura del cliente"],
    inboundStorage: ["Storage in ingresso"],
    inboundStorageSub: ["documenti + payload"],
    erp: ["Sistema ERP"],
    erpSub: ["polizza di riferimento"],
    returnStorage: ["Storage di ritorno"],
    returnStorageSub: ["JSON per sinistro +", "log di elaborazione"],
    pull: ["prelievo"],
    policyLookup: ["consultazione polizza"],
    onApproval: ["dopo l’approvazione: push"],
    specificUseCases: ["casi d’uso specifici"],
  },
};

/**
 * Pattern A — document-driven complex claims decisioning.
 * Structural, theme-aware replacement for the old raster diagram. The English wording matches
 * the original PNG exactly; the other languages come from COPY. Single True Aim Blue focal node:
 * Decisioning + extraction.
 */
export function IntegrationPatternA({ locale = "en" }: { locale?: string }) {
  const id = "ipa";
  const c = COPY[locale as Locale] ?? COPY.en;

  // True Aim Azure row (y-center 375)
  const batchReader = { x: 64, y: 316, w: 300, h: 104 };
  const decisioning = { x: 448, y: 316, w: 300, h: 104 };
  const reviewUi = { x: 832, y: 316, w: 300, h: 104 };
  const azureRowCenterY = batchReader.y + batchReader.h / 2;

  // Customer infrastructure row
  const inboundStorage = { x: 64, y: 536, w: 300, h: 104 };
  const erpSystem = { x: 448, y: 536, w: 300, h: 104 };
  const returnStorage = { x: 832, y: 536, w: 300, h: 104 };
  const infraRowCenterY = inboundStorage.y + inboundStorage.h / 2;

  // External enrichment group (top right)
  const partsLookup = { x: 874, y: 138, w: 262, h: 44 };
  const geolocation = { x: 874, y: 192, w: 262, h: 44 };

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

      {/* External enrichment group */}
      <GroupFrame
        x={850}
        y={76}
        w={310}
        h={170}
        label={c.enrichment}
        note={c.enrichmentNote}
      />
      <NodeBox {...partsLookup} title={c.partsLookup} titleSize={19} />
      <NodeBox {...geolocation} title={c.geolocation} titleSize={19} />

      {/* True Aim Azure group */}
      <GroupFrame x={40} y={272} w={1120} h={170} label={c.azure} />
      <NodeBox {...batchReader} title={c.batchReader} sub={c.batchReaderSub} />
      <NodeBox
        {...decisioning}
        title={c.decisioning}
        sub={c.decisioningSub}
        focal
      />
      <HexBullet x={decisioning.x + decisioning.w - 22} y={decisioning.y + 20} size={14} />
      <NodeBox {...reviewUi} title={c.reviewUi} sub={c.reviewUiSub} />

      {/* Customer infrastructure group */}
      <GroupFrame x={40} y={492} w={1120} h={170} label={c.infra} />
      <NodeBox {...inboundStorage} title={c.inboundStorage} sub={c.inboundStorageSub} />
      <NodeBox {...erpSystem} title={c.erp} sub={c.erpSub} />
      <NodeBox
        {...returnStorage}
        title={c.returnStorage}
        sub={c.returnStorageSub}
      />

      {/* Horizontal flow within True Aim Azure */}
      <Arrow
        x1={batchReader.x + batchReader.w}
        y1={azureRowCenterY}
        x2={decisioning.x}
        y2={azureRowCenterY}
        markerId={`${id}-arrow`}
      />
      <Arrow
        x1={decisioning.x + decisioning.w}
        y1={azureRowCenterY}
        x2={reviewUi.x}
        y2={azureRowCenterY}
        markerId={`${id}-arrow`}
      />

      {/* Horizontal flow within Customer infrastructure */}
      <Arrow
        x1={inboundStorage.x + inboundStorage.w}
        y1={infraRowCenterY}
        x2={erpSystem.x}
        y2={infraRowCenterY}
        markerId={`${id}-arrow`}
      />
      <Arrow
        x1={erpSystem.x + erpSystem.w}
        y1={infraRowCenterY}
        x2={returnStorage.x}
        y2={infraRowCenterY}
        markerId={`${id}-arrow`}
      />

      {/* Cross-boundary connectors */}
      <Arrow
        x1={inboundStorage.x + inboundStorage.w / 2}
        y1={inboundStorage.y}
        x2={batchReader.x + batchReader.w / 2}
        y2={batchReader.y + batchReader.h}
        markerId={`${id}-arrow`}
      />
      <ArrowLabel x={inboundStorage.x + inboundStorage.w / 2 + 12} y={478} lines={c.pull} anchor="start" />

      <Arrow
        x1={erpSystem.x + erpSystem.w / 2}
        y1={erpSystem.y}
        x2={decisioning.x + decisioning.w / 2}
        y2={decisioning.y + decisioning.h}
        markerId={`${id}-arrow`}
      />
      <ArrowLabel x={erpSystem.x + erpSystem.w / 2 + 12} y={478} lines={c.policyLookup} anchor="start" />

      <Arrow
        x1={reviewUi.x + reviewUi.w / 2}
        y1={reviewUi.y + reviewUi.h}
        x2={returnStorage.x + returnStorage.w / 2}
        y2={returnStorage.y}
        markerId={`${id}-arrow`}
      />
      <ArrowLabel
        x={returnStorage.x + returnStorage.w / 2 + 12}
        y={478}
        lines={c.onApproval}
        anchor="start"
      />

      {/* Dotted enrichment links from Decisioning + extraction */}
      <DottedPath
        d={`M ${decisioning.x + 130},${decisioning.y} L ${decisioning.x + 130},${partsLookup.y + partsLookup.h / 2} L ${partsLookup.x},${partsLookup.y + partsLookup.h / 2}`}
        markerId={`${id}-arrow-subtle`}
      />
      <DottedPath
        d={`M ${decisioning.x + 170},${decisioning.y} L ${decisioning.x + 170},${geolocation.y + geolocation.h / 2} L ${geolocation.x},${geolocation.y + geolocation.h / 2}`}
        markerId={`${id}-arrow-subtle`}
      />
      <ArrowLabel x={700} y={182} lines={c.specificUseCases} anchor="start" />
    </svg>
  );
}
