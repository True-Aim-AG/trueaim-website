import { ImageResponse } from "next/og";
import { loadOgFonts } from "@/lib/og-fonts";

export const dynamic = "force-static";
export function generateStaticParams() {
  return ["en", "de", "fr", "it"].map((locale) => ({ locale }));
}


export const alt = "ContextBuilder - Claims Document Pipeline | True Aim";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const HEX_PATH = "M 92.565 80.224 L 92.565 26.74 L 46.282 0 L 0 26.74 L 0 80.224 L 46.282 106.964 L 92.565 80.224 Z";

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
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2C2B2A",
          backgroundImage: "linear-gradient(119.33deg, #2C2B2A 24.34%, #3F3F42 84.09%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          {/* Product Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 24px",
              backgroundColor: "rgba(145,167,255,.16)",
              borderRadius: 40,
              color: "#91A7FF",
              fontSize: 20,
              fontFamily: "IBM Plex Sans",
              fontWeight: 500,
            }}
          >
            Document Pipeline
          </div>

          {/* Product Name */}
          <div
            style={{
              fontSize: 72,
              fontFamily: "Inter Tight",
              fontWeight: 700,
              color: "#FBFCFD",
              marginTop: 10,
            }}
          >
            ContextBuilder
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 32,
              fontFamily: "IBM Plex Sans",
              fontWeight: 500,
              color: "rgba(251,252,253,.82)",
              textAlign: "center",
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            From Messy Documents to Trusted Data
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 22,
              fontFamily: "IBM Plex Sans",
              fontWeight: 400,
              color: "rgba(251,252,253,.62)",
              textAlign: "center",
              maxWidth: 700,
              marginTop: 10,
            }}
          >
            AI-powered document ingestion with human review when needed
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: 40,
              marginTop: 40,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: 48, fontFamily: "Inter Tight", fontWeight: 700, color: "#91A7FF" }}>
                97%
              </div>
              <div style={{ fontSize: 16, fontFamily: "IBM Plex Sans", fontWeight: 400, color: "rgba(251,252,253,.62)" }}>Doc Coverage</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: 48, fontFamily: "Inter Tight", fontWeight: 700, color: "#91A7FF" }}>
                97.3%
              </div>
              <div style={{ fontSize: 16, fontFamily: "IBM Plex Sans", fontWeight: 400, color: "rgba(251,252,253,.62)" }}>Accuracy</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: 48, fontFamily: "Inter Tight", fontWeight: 700, color: "#91A7FF" }}>
                96.5%
              </div>
              <div style={{ fontSize: 16, fontFamily: "IBM Plex Sans", fontWeight: 400, color: "rgba(251,252,253,.62)" }}>Evidence Rate</div>
            </div>
          </div>

          {/* Brand */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 30,
            }}
          >
            <svg width="26" height="30" viewBox="0 0 92.565 106.964">
              <path d={HEX_PATH} fill="#91A7FF" />
            </svg>
            <div style={{ fontSize: 24, fontFamily: "Inter Tight", fontWeight: 700, color: "#FBFCFD" }}>True Aim</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  );
}
