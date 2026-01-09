import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "ClaimEval - Claims Quality Assurance | TrueAim.ai";
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
          backgroundImage: "linear-gradient(135deg, #1A1A2E 0%, #1a3d1a 100%)",
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
              backgroundColor: "rgba(27, 94, 32, 0.3)",
              borderRadius: 50,
              color: "#4ade80",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            Quality Assurance
          </div>

          {/* Product Name */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "#1B5E20",
              marginTop: 10,
            }}
          >
            ClaimEval
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
            Scale QA Beyond Sampling
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
            Run consistent inspections across your entire claims portfolio
          </div>

          {/* Features */}
          <div
            style={{
              display: "flex",
              gap: 30,
              marginTop: 40,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 24px",
                backgroundColor: "rgba(27, 94, 32, 0.2)",
                borderRadius: 8,
                color: "#4ade80",
                fontSize: 18,
              }}
            >
              100% Coverage
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 24px",
                backgroundColor: "rgba(27, 94, 32, 0.2)",
                borderRadius: 8,
                color: "#4ade80",
                fontSize: 18,
              }}
            >
              Risk Scoring
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 24px",
                backgroundColor: "rgba(27, 94, 32, 0.2)",
                borderRadius: 8,
                color: "#4ade80",
                fontSize: 18,
              }}
            >
              Exception Flagging
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
