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

/**
 * Pattern B — multi-source orchestration with SLA workflow.
 * Structural, theme-aware replacement for the old raster diagram. All wording matches
 * the original PNG exactly. Single True Aim Blue focal node: Workflow UI.
 */
export function IntegrationPatternB() {
  const id = "ipb";

  // Customer source systems (left column)
  const sourceBoxes = [
    { key: "crm", title: ["CRM"], x: 52, y: 151, w: 206, h: 76 },
    { key: "gws", title: ["Google", "Workspace"], x: 52, y: 250, w: 206, h: 76 },
    { key: "pg", title: ["Postgres"], x: 52, y: 349, w: 206, h: 76 },
    {
      key: "sql",
      title: ["SQL dumps"],
      sub: ["from upstream insurers"],
      x: 52,
      y: 448,
      w: 206,
      h: 76,
    },
    { key: "wa", title: ["WhatsApp"], x: 52, y: 547, w: 206, h: 76 },
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
      <title id={`${id}-title`}>
        Pattern B — multi-source orchestration with SLA workflow. Diagram shows five
        customer source systems (CRM, Google Workspace, Postgres, SQL dumps from
        upstream insurers, WhatsApp) feeding an n8n orchestration backend inside True
        Aim, a workflow UI handling comms, SLA tracking and human-in-the-loop, and a
        flat-file generator producing artifacts for downstream insurer legacy systems
        including a fallback browser-based legacy UI integration.
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
        Pattern B: multi-source orchestration with SLA workflow
      </text>

      {/* Customer source systems */}
      <GroupFrame
        x={40}
        y={76}
        w={230}
        h={560}
        label={["Customer source", "systems"]}
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
      <GroupFrame x={310} y={76} w={650} h={560} label={["True Aim environment"]} />
      <NodeBox {...n8n} title={["n8n", "orchestration"]} titleSize={18} />
      <NodeBox
        {...workflowUi}
        title={["Workflow UI"]}
        sub={["comms + SLA tracking,", "human-in-the-loop"]}
        titleSize={22}
        subSize={15}
        focal
      />
      <HexBullet x={workflowUi.x + workflowUi.w - 22} y={workflowUi.y + 20} size={14} />
      <NodeBox {...flatFileGen} title={["Flat-file", "generator"]} titleSize={18} />

      {/* Downstream insurer legacy systems */}
      <GroupFrame
        x={1000}
        y={76}
        w={160}
        h={560}
        label={["Downstream", "insurer legacy", "systems"]}
        labelSize={11}
      />
      <NodeBox {...flatFileIngestion} title={["Flat-file", "ingestion"]} titleSize={18} />
      <NodeBox
        {...legacyUi}
        title={["Legacy UI"]}
        sub={["no API", "available"]}
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
        lines={["on", "completion"]}
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
      <ArrowLabel x={workflowUi.x + workflowUi.w / 2 + 90} y={503} lines={["high-value cases"]} />
    </svg>
  );
}
