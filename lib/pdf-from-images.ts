"use client";

/**
 * Client-only PDF helpers using pdf-lib.
 * This file uses browser APIs (canvas, Image) — import only from Client Components.
 */

import { PDFDocument, type PDFImage } from "pdf-lib";

/** Allowed upload types in the UI (subset of what browsers can decode). */
export const SUPPORTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
  "image/bmp",
  "image/svg+xml",
] as const;

export type SupportedImageType = (typeof SUPPORTED_IMAGE_TYPES)[number];

export function isSupportedImageType(mime: string): mime is SupportedImageType {
  return (SUPPORTED_IMAGE_TYPES as readonly string[]).includes(
    mime.toLowerCase(),
  );
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not decode image"));
    img.src = url;
  });
}

/**
 * Rasterize arbitrary image bytes to PNG at natural dimensions (for formats
 * pdf-lib cannot embed natively).
 */
async function imageBytesToPng(
  bytes: Uint8Array,
  mimeType: string,
): Promise<Uint8Array> {
  const blob = new Blob([bytes as BlobPart], { type: mimeType });
  const url = URL.createObjectURL(blob);
  try {
    const img = await loadImage(url);
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    if (!w || !h) throw new Error("Image has no dimensions");
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not available");
    ctx.drawImage(img, 0, 0);
    const out = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((b) => {
        if (b) resolve(b);
        else reject(new Error("Could not encode PNG"));
      }, "image/png");
    });
    return new Uint8Array(await out.arrayBuffer());
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function embedRaster(
  pdfDoc: PDFDocument,
  bytes: Uint8Array,
  mimeType: string,
): Promise<PDFImage> {
  const lower = mimeType.toLowerCase();
  if (lower === "image/jpeg" || lower === "image/jpg") {
    return pdfDoc.embedJpg(bytes);
  }
  if (lower === "image/png") {
    return pdfDoc.embedPng(bytes);
  }
  const pngBytes = await imageBytesToPng(bytes, mimeType);
  return pdfDoc.embedPng(pngBytes);
}

export type BuildProgress = {
  done: number;
  total: number;
  label: string;
};

/**
 * Build a multi-page PDF: one page per image, page size matches image dimensions.
 * Calls onProgress between images for UI feedback.
 */
export async function buildPdfFromImageFiles(
  files: File[],
  onProgress?: (p: BuildProgress) => void,
): Promise<Uint8Array> {
  if (files.length === 0) {
    throw new Error("Add at least one image");
  }

  const pdfDoc = await PDFDocument.create();
  const total = files.length;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    onProgress?.({
      done: i,
      total,
      label: `Embedding ${file.name}…`,
    });

    const raw = new Uint8Array(await file.arrayBuffer());
    const image = await embedRaster(pdfDoc, raw, file.type);
    const { width, height } = image.scale(1);
    const page = pdfDoc.addPage([width, height]);
    page.drawImage(image, { x: 0, y: 0, width, height });
  }

  onProgress?.({
    done: total,
    total,
    label: "ImagesPDFConverter — Finalizing PDF…",
  });
  return pdfDoc.save();
}

export type PdfDownloadKind = "images" | "scan";

/** Suggested download name with timestamp. */
export function defaultPdfFilename(kind: PdfDownloadKind = "images") {
  const d = new Date();
  const stamp = d.toISOString().slice(0, 19).replace(/[:T]/g, "-");
  const slug = kind === "scan" ? "scan" : "images";
  return `ImagesPDFConverter-${slug}-${stamp}.pdf`;
}
