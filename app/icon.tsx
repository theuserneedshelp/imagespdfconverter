import { ImageResponse } from "next/og";

/** Accessible description for the generated favicon (used in metadata). */
export const alt = "ImagesPDFConverter";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6366f1, #c026d3)",
          color: "white",
          fontSize: 18,
          fontWeight: 700,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        I
      </div>
    ),
    { ...size },
  );
}
