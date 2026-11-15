import { ImageResponse } from "next/og";

export const alt = "PlumbNexo | Websites Built for Plumbers";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#122B2A",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#122B2A",
              border: "2px solid rgba(184, 243, 107, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#B8F36B",
              fontSize: "28px",
              fontWeight: 800,
            }}
          >
            N
          </div>
          <div
            style={{
              marginLeft: "16px",
              color: "#FFFFFF",
              fontSize: "32px",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            PlumbNexo
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: "900px" }}>
          <div
            style={{
              color: "#B8F36B",
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "24px",
              display: "flex",
            }}
          >
            WEBSITES BUILT FOR PLUMBERS
          </div>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: "60px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span>Your work earns trust. Your website&nbsp;</span>
            <span style={{ color: "#B8F36B" }}>should too.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "20px",
          }}
        >
          <span>Free personalized demo page · Charlotte, NC and nationwide</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
