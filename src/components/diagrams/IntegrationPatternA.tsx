import {
  ArrowMarkerDefs,
  Arrow,
  DottedPath,
  ArrowLabel,
  GroupFrame,
  NodeBox,
  HexBullet,
} from "./shared";

/**
 * Pattern A — document-driven complex claims decisioning.
 * Structural, theme-aware replacement for the old raster diagram. All wording matches
 * the original PNG exactly. Single True Aim Blue focal node: Decisioning + extraction.
 */
export function IntegrationPatternA() {
  const id = "ipa";

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
      <title id={`${id}-title`}>
        Pattern A — document-driven complex claims decisioning. Diagram shows inbound
        documents pulled from customer storage by a batch reader inside True Aim&apos;s
        Azure tenant, processed for decisioning and extraction, with policy lookup
        against the customer ERP, optional enrichment calls, human-in-the-loop review,
        and structured JSON output written back to the customer&apos;s return storage.
      </title>
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
        Pattern A: document-driven complex claims decisioning
      </text>

      {/* External enrichment group */}
      <GroupFrame
        x={850}
        y={76}
        w={310}
        h={170}
        label={["External enrichment"]}
        note={["(narrow, non-PII)"]}
      />
      <NodeBox {...partsLookup} title={["Parts lookup"]} titleSize={19} />
      <NodeBox {...geolocation} title={["Geolocation"]} titleSize={19} />

      {/* True Aim Azure group */}
      <GroupFrame x={40} y={272} w={1120} h={170} label={["True Aim Azure"]} />
      <NodeBox {...batchReader} title={["Batch reader"]} sub={["pulls from customer storage"]} />
      <NodeBox
        {...decisioning}
        title={["Decisioning +", "extraction"]}
        sub={["in-tenant inference"]}
        focal
      />
      <HexBullet x={decisioning.x + decisioning.w - 22} y={decisioning.y + 20} size={14} />
      <NodeBox {...reviewUi} title={["Review UI"]} sub={["human-in-the-loop"]} />

      {/* Customer infrastructure group */}
      <GroupFrame x={40} y={492} w={1120} h={170} label={["Customer infrastructure"]} />
      <NodeBox {...inboundStorage} title={["Inbound storage"]} sub={["documents + payloads"]} />
      <NodeBox {...erpSystem} title={["ERP system"]} sub={["policy of record"]} />
      <NodeBox
        {...returnStorage}
        title={["Return storage"]}
        sub={["JSON per claim +", "processing log"]}
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
      <ArrowLabel x={inboundStorage.x + inboundStorage.w / 2 + 12} y={478} lines={["pull"]} anchor="start" />

      <Arrow
        x1={erpSystem.x + erpSystem.w / 2}
        y1={erpSystem.y}
        x2={decisioning.x + decisioning.w / 2}
        y2={decisioning.y + decisioning.h}
        markerId={`${id}-arrow`}
      />
      <ArrowLabel x={erpSystem.x + erpSystem.w / 2 + 12} y={478} lines={["policy lookup"]} anchor="start" />

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
        lines={["on approval, push"]}
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
      <ArrowLabel x={700} y={182} lines={["specific use cases"]} anchor="start" />
    </svg>
  );
}
