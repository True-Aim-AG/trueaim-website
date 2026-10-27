import { OG_SIZE, ogCard } from "@/lib/og-card";

export const dynamic = "force-static";
export function generateStaticParams() {
  return [{ locale: "en" }];
}

export const alt = "The Problem with Automating Claims in Silos, by Reuben John, True Aim";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    title: "The Problem with Automating Claims in Silos",
    subtitle: "Architectural Transparency and the Rise of the Agentic Claims Operation",
    byline: "Reuben John, CEO of True Aim. October 2026",
    art: "render-04",
  });
}
