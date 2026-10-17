// Product scenes: the website's simplified product screens, drawn in HTML
// from the site's tokens. Every string, number and label arrives as a prop
// from messages/; the components hold no copy.
export { ClaimScene, type ClaimLine, type ClaimSceneData } from "./ClaimScene";
export { InvoiceScene, type InvoiceSceneData } from "./InvoiceScene";
export { ReportScene, type ReportSceneData } from "./ReportScene";
export { OutcomesScene, type OutcomeItem } from "./OutcomesScene";
export { FlowScene, type FlowSceneData } from "./FlowScene";
export { RecordScene, type RecordSceneData } from "./RecordScene";
export { LineBenchScene, type LineBenchSceneData } from "./LineBenchScene";
export { SceneCard } from "./SceneCard";
export { HexCheck, HexDot, type Outcome } from "./marks";
