import type { GraphTheme } from "./renderer";
import type { CraftKey } from "./types";

/**
 * The prototype's light theme, as its `useGraphTheme` resolves it off the
 * page: the house tokens (`styles/tokens.css`) and the trade colours
 * (the demo tenant's stylesheet), copied as values because the website has no
 * such tokens to read. The scene converts them (`scene/color.ts`).
 */
export const GRAPH_THEME: GraphTheme = {
  mode: "light",
  background: "oklch(0.9906 0.0017 247.8388)", // #FBFCFD
  card: "oklch(1 0 0)",
  foreground: "oklch(0.2897 0.0023 67.7339)", // #2C2B2A
  mutedForeground: "oklch(0.5258 0.011 279.5126)", // #696A71
  border: "oklch(0.9194 0.0027 286.3469)", // #E4E4E6
  primary: "oklch(0.5202 0.205 276.569)", // #5151DB
  success: "oklch(0.4582 0.1356 145.3585)", // #0E6A20
  warning: "oklch(0.8034 0.1575 69.4012)", // #FFAA36
  destructive: "oklch(0.477 0.1753 33.1608)", // #A92100
};

/** The ground the canvas is drawn over, which the fog fades toward. */
export const GRAPH_BACKGROUND = "#FBFCFD";

const CRAFTS: Record<CraftKey, string> = {
  scaffolding: "oklch(0.55 0.02 264)",
  roofer: "oklch(0.52 0.16 22)",
  carpenter: "oklch(0.55 0.09 70)",
  drying: "oklch(0.6 0.1 210)",
  finishes: "oklch(0.53 0.14 300)",
  flooring: "oklch(0.62 0.12 78)",
  plumber: "oklch(0.55 0.12 250)",
};

export const craftColor = (craft: CraftKey): string => CRAFTS[craft];
