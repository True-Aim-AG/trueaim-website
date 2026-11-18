import { Briefcase, Building2, CloudLightning, Copy, FileText, type LucideIcon, Shield, User } from "lucide-react";

import { cn } from "@/lib/utils";

import styles from "./DataRecordStill.module.css";
import g from "./glass.module.css";

export type DataRecordStillData = {
  alt: string;
  /** The claim at the centre, then the six parts of its record, clockwise from the top. */
  claim: { label: string; value: string };
  nodes: { label: string; value: string }[];
};

/** Where each part sits around the claim, as percentages of the picture, with its icon. */
const PLACES: { x: number; y: number; icon: LucideIcon }[] = [
  { x: 50, y: 13, icon: User },
  { x: 80, y: 32, icon: Shield },
  { x: 80, y: 71, icon: FileText },
  { x: 50, y: 90, icon: CloudLightning },
  { x: 20, y: 71, icon: Briefcase },
  { x: 20, y: 32, icon: Building2 },
];
const CENTRE = { x: 50, y: 51.5 };

/**
 * Data Extraction as one picture, for the home page's product row: the claim
 * record at the centre and the parts read into it around it, in the glass of
 * the other scenes. Live text, no ground of its own and no motion.
 */
export function DataRecordStill({ data }: { data: DataRecordStillData }) {
  return (
    <div role="img" aria-label={data.alt} className={cn(g.stage, styles.stage)}>
      <svg className={styles.links} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        {PLACES.slice(0, data.nodes.length).map((place, index) => (
          <line key={index} x1={CENTRE.x} y1={CENTRE.y} x2={place.x} y2={place.y} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      {data.nodes.slice(0, PLACES.length).map((node, index) => {
        const { x, y, icon: Icon } = PLACES[index];
        return (
          <div key={node.label} className={cn(g.gloss, styles.node)} style={{ left: `${x}%`, top: `${y}%` }}>
            <Icon aria-hidden strokeWidth={1.5} />
            <span>
              <span>{node.label}</span>
              <span>{node.value}</span>
            </span>
          </div>
        );
      })}
      <div className={cn(styles.node, styles.claim)} style={{ left: `${CENTRE.x}%`, top: `${CENTRE.y}%` }}>
        <Copy aria-hidden strokeWidth={1.6} />
        <span>
          <span>{data.claim.label}</span>
          <span>{data.claim.value}</span>
        </span>
      </div>
    </div>
  );
}
