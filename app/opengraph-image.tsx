import { ImageResponse } from "next/og";

export const alt = "ImagesPDFConverter — private browser PDF conversion";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview image (Open Graph / Twitter) generated at build time. */
export default function OpenGraphImage() {
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
          background: "linear-gradient(135deg, #4f46e5, #a855f7, #ec4899)",
          color: "white",
          padding: 48,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: -0.02,
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          ImagesPDFConverter
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            fontWeight: 400,
            opacity: 0.95,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          Convert images to PDF in your browser — privately.
        </div>
      </div>
    ),
    { ...size },
  );
}
