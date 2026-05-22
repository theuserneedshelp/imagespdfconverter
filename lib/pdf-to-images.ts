"use client";

/**
 * Render PDF pages to PNG/JPEG using pdf.js (client-only).
 */

export type PdfImageFormat = "png" | "jpeg";

export type PdfPageImage = {
  pageNumber: number;
  blob: Blob;
  width: number;
  height: number;
};

export type PdfToImagesProgress = {
  done: number;
  total: number;
  label: string;
};

async function loadPdfJs() {
  const pdfjs = await import("pdfjs-dist");
  if (typeof window !== "undefined" && !pdfjs.GlobalWorkerOptions.workerSrc) {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  }
  return pdfjs;
}

/**
 * Convert each PDF page to an image blob at the given scale (2 ≈ sharp on retina).
 */
export async function pdfFileToImages(
  file: File,
  options: {
    format?: PdfImageFormat;
    scale?: number;
    quality?: number;
    onProgress?: (p: PdfToImagesProgress) => void;
  } = {},
): Promise<PdfPageImage[]> {
  const format = options.format ?? "png";
  const scale = options.scale ?? 2;
  const quality = options.quality ?? 0.92;

  const pdfjs = await loadPdfJs();
  const data = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjs.getDocument({ data }).promise;
  const total = pdf.numPages;
  const results: PdfPageImage[] = [];

  for (let pageNum = 1; pageNum <= total; pageNum++) {
    options.onProgress?.({
      done: pageNum - 1,
      total,
      label: `Rendering page ${pageNum} of ${total}…`,
    });

    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not available");

    await page.render({ canvasContext: ctx, viewport }).promise;

    const mime = format === "jpeg" ? "image/jpeg" : "image/png";
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Could not encode image"))),
        mime,
        format === "jpeg" ? quality : undefined,
      );
    });

    results.push({
      pageNumber: pageNum,
      blob,
      width: viewport.width,
      height: viewport.height,
    });
  }

  options.onProgress?.({
    done: total,
    total,
    label: "ImagesPDFConverter — Done",
  });
  return results;
}

export function defaultImageZipBaseName() {
  const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
  return `ImagesPDFConverter-pages-${stamp}`;
}
