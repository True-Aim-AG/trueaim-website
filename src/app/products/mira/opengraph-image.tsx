import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "MIRA - Neuro-Symbolic Decisioning Engine | TrueAim.ai";
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
          backgroundColor: "#0A1628",
          backgroundImage: "linear-gradient(135deg, #0A1628 0%, #1e1b4b 100%)",
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
              backgroundColor: "rgba(99, 102, 241, 0.2)",
              borderRadius: 50,
              color: "#a5b4fc",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            Decisioning Engine
          </div>

          {/* Product Name */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "#6366F1",
              marginTop: 10,
            }}
          >
            MIRA
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
            The Neuro-Symbolic Decisioning Engine
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
            Transform policy terms into automated, fully-deterministic claim decisions
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
              <div style={{ fontSize: 48, fontWeight: 700, color: "#6366F1" }}>
                92%
              </div>
              <div style={{ fontSize: 16, color: "#94a3b8" }}>Faster</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 48, fontWeight: 700, color: "#6366F1" }}>
                71%
              </div>
              <div style={{ fontSize: 16, color: "#94a3b8" }}>Cost Reduction</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 48, fontWeight: 700, color: "#6366F1" }}>
                100%
              </div>
              <div style={{ fontSize: 16, color: "#94a3b8" }}>Auditable</div>
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
            <div style={{ fontSize: 24, color: "#2563EB" }}>.ai</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
