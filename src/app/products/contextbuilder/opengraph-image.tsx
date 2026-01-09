import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "ContextBuilder - Claims Document Pipeline | TrueAim.ai";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
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
          backgroundColor: "#1A1A2E",
          backgroundImage: "linear-gradient(135deg, #1A1A2E 0%, #1a2d3d 100%)",
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
              padding: "8px 20px",
              backgroundColor: "rgba(0, 119, 182, 0.2)",
              borderRadius: 50,
              color: "#0077B6",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            Document Pipeline
          </div>

          {/* Product Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#0077B6",
              marginTop: 10,
            }}
          >
            ContextBuilder
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 32,
              color: "white",
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
              color: "#94a3b8",
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 48, fontWeight: 700, color: "#0077B6" }}>
                97%
              </div>
              <div style={{ fontSize: 16, color: "#94a3b8" }}>Doc Coverage</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 48, fontWeight: 700, color: "#0077B6" }}>
                97.3%
              </div>
              <div style={{ fontSize: 16, color: "#94a3b8" }}>Accuracy</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 48, fontWeight: 700, color: "#0077B6" }}>
                96.5%
              </div>
              <div style={{ fontSize: 16, color: "#94a3b8" }}>Evidence Rate</div>
            </div>
          </div>

          {/* Brand */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 30,
              opacity: 0.7,
            }}
          >
            <div style={{ fontSize: 24, color: "white" }}>TrueAim</div>
            <div style={{ fontSize: 24, color: "#E91E8C" }}>.ai</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
