import { ImageResponse } from "next/og";
export const dynamic = "force-static";
export function generateStaticParams() {
  return ["en", "de", "fr", "it"].map((locale) => ({ locale }));
}


export const alt = "True Aim - Neuro-Symbolic AI for Auditable Claims Decisions";
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
          backgroundImage: "linear-gradient(135deg, #0A1628 0%, #1e293b 100%)",
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
              True Aim
            </div>
            <div
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: "#2563EB",
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
              color: "#2563EB",
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
                backgroundColor: "rgba(37, 99, 235, 0.2)",
                borderRadius: 8,
                color: "#60a5fa",
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
                backgroundColor: "rgba(20, 184, 166, 0.2)",
                borderRadius: 8,
                color: "#14B8A6",
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
                backgroundColor: "rgba(22, 163, 74, 0.2)",
                borderRadius: 8,
                color: "#22c55e",
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
