"use client";

/**
 * Simple “document scan” look: grayscale + contrast boost (client-side canvas).
 */

export function enhanceScanCanvas(
  source: CanvasImageSource,
  width: number,
  height: number,
  options?: { contrast?: number },
): HTMLCanvasElement {
  const contrast = options?.contrast ?? 1.25;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not available");

  ctx.drawImage(source, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);
  const d = imageData.data;

  for (let i = 0; i < d.length; i += 4) {
    const gray =
      0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
    const boosted = (gray / 255 - 0.5) * contrast + 0.5;
    const v = Math.min(255, Math.max(0, boosted * 255));
    d[i] = d[i + 1] = d[i + 2] = v;
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

export async function canvasToJpegFile(
  canvas: HTMLCanvasElement,
  fileName: string,
  quality = 0.9,
): Promise<File> {
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Could not encode JPEG"))),
      "image/jpeg",
      quality,
    );
  });
  return new File([blob], fileName, { type: "image/jpeg" });
}
