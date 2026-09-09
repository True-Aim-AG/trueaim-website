import { ImageResponse } from "next/og";
export const dynamic = "force-static";
export function generateStaticParams() {
  return ["en", "de", "fr", "it"].map((locale) => ({ locale }));
}


export const alt = "ClaimEval - Claims Quality Assurance | True Aim";
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
          backgroundImage: "linear-gradient(135deg, #0A1628 0%, #0c4a6e 100%)",
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
              backgroundColor: "rgba(37, 99, 235, 0.3)",
              borderRadius: 50,
              color: "#93c5fd",
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
              color: "#2563EB",
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
                backgroundColor: "rgba(37, 99, 235, 0.2)",
                borderRadius: 8,
                color: "#93c5fd",
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
                backgroundColor: "rgba(37, 99, 235, 0.2)",
                borderRadius: 8,
                color: "#93c5fd",
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
                backgroundColor: "rgba(37, 99, 235, 0.2)",
                borderRadius: 8,
                color: "#93c5fd",
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
            <div style={{ fontSize: 24, color: "white" }}>True Aim</div>
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
