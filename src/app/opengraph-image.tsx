import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "TrueAim.ai - Neuro-Symbolic AI for Auditable Claims Decisions";
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
          backgroundImage: "linear-gradient(135deg, #1A1A2E 0%, #2a2a4e 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: "white",
              }}
            >
              TrueAim
            </div>
            <div
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: "#E91E8C",
              }}
            >
              .ai
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "white",
              textAlign: "center",
              lineHeight: 1.2,
              maxWidth: 900,
            }}
          >
            Neuro-Symbolic AI for
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#E91E8C",
              textAlign: "center",
            }}
          >
            Auditable Claims Decisions
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 24,
              color: "#94a3b8",
              textAlign: "center",
              maxWidth: 800,
              marginTop: 20,
            }}
          >
            Swiss Precision. Auditable AI. EU AI Act Ready.
          </div>

          {/* Badges */}
          <div
            style={{
              display: "flex",
              gap: 20,
              marginTop: 30,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                backgroundColor: "rgba(233, 30, 140, 0.2)",
                borderRadius: 8,
                color: "#E91E8C",
                fontSize: 18,
              }}
            >
              Deterministic
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                backgroundColor: "rgba(0, 119, 182, 0.2)",
                borderRadius: 8,
                color: "#0077B6",
                fontSize: 18,
              }}
            >
              Traceable
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                backgroundColor: "rgba(27, 94, 32, 0.2)",
                borderRadius: 8,
                color: "#4ade80",
                fontSize: 18,
              }}
            >
              Compliant
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
