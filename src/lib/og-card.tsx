import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { loadOgFonts } from "@/lib/og-fonts";

/** Brand symbol path (public/brand/logo/symbol-*.svg, viewBox 0 0 142.96 144.17). */
const SYMBOL_PATH =
  "M142.96,23.55c-8.43,0-16.55,1.32-24.19,3.75L71.48,0,24.19,27.31c-7.63-2.43-15.76-3.75-24.19-3.75v16.78c3.07,0,6.1.23,9.05.66v67.13l62.43,36.04,62.43-36.04V40.99c2.96-.43,5.98-.66,9.05-.66v-16.78ZM71.48,19.37l28.77,16.61c-12.25,7.79-22.24,18.81-28.77,31.86-6.52-13.06-16.52-24.08-28.77-31.86l28.77-16.61ZM117.13,98.44l-45.65,26.35-45.65-26.35v-52.55c21.93,9.89,37.24,31.93,37.26,57.5,0,.01,0,.02,0,.04h16.78s0-.02,0-.04c.01-25.57,15.33-47.62,37.26-57.5v52.55Z";

export const OG_SIZE = { width: 1200, height: 630 };

/** One of the 3D renders in src/assets/og, PNG copies read at build time only; nothing is shipped to visitors. */
export type OgArt = "render-04" | "render-05" | "shield" | "lock" | "symbol" | "objects-01";

async function artDataUri(name: OgArt) {
  const file = await readFile(path.join(process.cwd(), "src", "assets", "og", `${name}.png`));
  return `data:image/png;base64,${file.toString("base64")}`;
}

/**
 * Social share card in the light brand: page tint with the faint structured grid, blue mark and
 * black wordmark, the title and subtitle in the left two thirds, a 3D render on the right.
 */
export async function ogCard({
  title,
  subtitle,
  byline,
  art = "render-04",
}: {
  title: string;
  subtitle?: string;
  byline?: string;
  art?: OgArt;
}) {
  const [fonts, artSrc] = await Promise.all([loadOgFonts(), artDataUri(art)]);
  const long = title.length > 44;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#FBFCFD",
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(81,81,219,.08) 0 1px, transparent 1px 48px), repeating-linear-gradient(90deg, rgba(81,81,219,.08) 0 1px, transparent 1px 48px)",
          fontFamily: "IBM Plex Sans",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={artSrc}
          alt=""
          width={520}
          height={520}
          style={{ position: "absolute", right: 24, top: 55, width: 520, height: 520, objectFit: "contain" }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: 760,
            padding: "60px 0 56px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="56" height="56" viewBox="0 0 142.96 144.17">
              <path d={SYMBOL_PATH} fill="#5151DB" />
            </svg>
            <div style={{ fontFamily: "Inter Tight", fontWeight: 700, fontSize: 40, color: "#2C2B2A", letterSpacing: -0.5 }}>True Aim</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ fontFamily: "Inter Tight", fontWeight: 700, fontSize: long ? 54 : 60, lineHeight: 1.08, color: "#2C2B2A" }}>
              {title}
            </div>
            {subtitle && <div style={{ fontSize: 27, lineHeight: 1.35, color: "#3F3E3C" }}>{subtitle}</div>}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {byline && <div style={{ fontSize: 22, lineHeight: 1.4, color: "#5F5E5C" }}>{byline}</div>}
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#5151DB", fontWeight: 500 }}>
              <div style={{ width: 36, height: 2, backgroundColor: "#5151DB" }} />
              trueaim.ai
            </div>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts }
  );
}
