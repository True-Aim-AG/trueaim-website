/**
 * Default social share card, served by the `[locale]/opengraph-image` route.
 *
 * Pages that declare their own `openGraph` in metadata lose the inherited
 * file-convention card, because Next.js does not deep-merge `openGraph` across
 * route segments. Such pages should spread these into their metadata so links
 * still render a branded card on LinkedIn/Slack. Pages that ship their own
 * `opengraph-image` file (e.g. the product pages) don't need this.
 */
export const DEFAULT_OG_IMAGE = "https://trueaim.ai/en/opengraph-image";

export const defaultOgImages = [
  {
    url: DEFAULT_OG_IMAGE,
    width: 1200,
    height: 630,
    alt: "True Aim - Neuro-Symbolic AI for Auditable Claims Decisions",
  },
];
