import { ImageResponse } from "next/og";
import { loadOgFonts } from "@/lib/og-fonts";

export const dynamic = "force-static";
export function generateStaticParams() {
  return ["en", "de", "fr", "it"].map((locale) => ({ locale }));
}


export const alt = "True Aim. Automate insurance claim decisions. Auditable by design.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Brand symbol path (public/brand/logo/symbol-*.svg, viewBox 0 0 142.96 144.17). */
const SYMBOL_PATH =
  "M142.96,23.55c-8.43,0-16.55,1.32-24.19,3.75L71.48,0,24.19,27.31c-7.63-2.43-15.76-3.75-24.19-3.75v16.78c3.07,0,6.1.23,9.05.66v67.13l62.43,36.04,62.43-36.04V40.99c2.96-.43,5.98-.66,9.05-.66v-16.78ZM71.48,19.37l28.77,16.61c-12.25,7.79-22.24,18.81-28.77,31.86-6.52-13.06-16.52-24.08-28.77-31.86l28.77-16.61ZM117.13,98.44l-45.65,26.35-45.65-26.35v-52.55c21.93,9.89,37.24,31.93,37.26,57.5,0,.01,0,.02,0,.04h16.78s0-.02,0-.04c.01-25.57,15.33-47.62,37.26-57.5v52.55Z";

/** Default social card: page tint, structured grid, symbol + name, hero line, three pill badges. */
export default async function Image() {
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#2C2B2A",
          backgroundImage:
            "linear-gradient(119.33deg, #2C2B2A 24.34%, #3F3F42 84.09%), repeating-linear-gradient(0deg, rgba(145,167,255,.14) 0 1px, transparent 1px 48px), repeating-linear-gradient(90deg, rgba(145,167,255,.14) 0 1px, transparent 1px 48px)",
          fontFamily: "IBM Plex Sans",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 142.96 144.17">
            <path d={SYMBOL_PATH} fill="#FBFCFD" />
          </svg>
          <div style={{ fontFamily: "Inter Tight", fontWeight: 700, fontSize: 40, color: "#FBFCFD", letterSpacing: -0.5 }}>True Aim</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26, maxWidth: 900 }}>
          <div style={{ fontFamily: "Inter Tight", fontWeight: 700, fontSize: 68, lineHeight: 1.05, color: "#FBFCFD" }}>
            Automate Insurance Claim Decisions. Auditable by Design.
          </div>
          <div style={{ fontSize: 26, lineHeight: 1.4, color: "rgba(251,252,253,.82)" }}>
            Apply policy terms clearly and consistently. Built for regulated insurance. No black boxes.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["Deterministic", "Traceable", "EU AI Act ready"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 24px",
                borderRadius: 40,
                backgroundColor: "rgba(145,167,255,.16)",
                color: "#91A7FF",
                fontSize: 22,
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
