"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AdSlot } from "@/components/marketing/ad-slot";
import {
  defaultImageZipBaseName,
  pdfFileToImages,
  type PdfImageFormat,
} from "@/lib/pdf-to-images";

/**
 * Upload a PDF → download each page as PNG or JPEG (client-side pdf.js).
 */
export function PdfToImagesWorkspace() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [format, setFormat] = useState<PdfImageFormat>("png");
  const [progress, setProgress] = useState<{
    pct: number;
    label: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const downloadBlob = (blob: Blob, name: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const onPickPdf = useCallback(async (file: File | null) => {
    if (!file || busy) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setError("Please choose a PDF file.");
      return;
    }

    setError(null);
    setSuccess(false);
    setBusy(true);
    setProgress({ pct: 0, label: "ImagesPDFConverter — Loading PDF…" });

    try {
      const base = defaultImageZipBaseName();
      const ext = format === "jpeg" ? "jpg" : "png";

      const pages = await pdfFileToImages(file, {
        format,
        scale: 2,
        onProgress: (p) => {
          const pct =
            p.total === 0 ? 0 : Math.min(99, Math.round((p.done / p.total) * 100));
          setProgress({ pct, label: p.label });
        },
      });

      for (const page of pages) {
        const name = `${base}-page-${String(page.pageNumber).padStart(3, "0")}.${ext}`;
        downloadBlob(page.blob, name);
      }

      setProgress({
        pct: 100,
        label: "ImagesPDFConverter — downloads started for all pages.",
      });
      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not convert PDF");
    } finally {
      setBusy(false);
      setTimeout(() => setProgress(null), 4000);
    }
  }, [busy, format]);

  return (
    <div className="rounded-2xl border border-line bg-surface p-4 shadow-lift sm:p-6 lg:p-8">
      <AdSlot placement="in-article" className="mb-6" />

      <p className="text-sm text-ink-muted">
        Select a PDF. Each page is exported as a separate image file. Everything
        runs in your browser.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="sr-only"
        disabled={busy}
        onChange={(e) => {
          const f = e.target.files?.[0] ?? null;
          void onPickPdf(f);
          e.target.value = "";
        }}
      />

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <fieldset className="flex gap-2" aria-label="Output format">
          {(["png", "jpeg"] as const).map((f) => (
            <Button
              key={f}
              type="button"
              variant={format === f ? "primary" : "secondary"}
              size="md"
              disabled={busy}
              onClick={() => setFormat(f)}
            >
              {f.toUpperCase()}
            </Button>
          ))}
        </fieldset>
        <Button
          type="button"
          variant="primary"
          size="lg"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          aria-busy={busy}
        >
          {busy ? (
            <>
              <Spinner className="h-5 w-5 text-accent-foreground" />
              ImagesPDFConverter — Converting…
            </>
          ) : (
            "Choose PDF"
          )}
        </Button>
      </div>

      {progress && (
        <div className="mt-4 rounded-2xl border border-line bg-surface-muted/60 px-4 py-3" role="status">
          <p className="text-sm font-medium text-ink">{progress.label}</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-line" aria-hidden>
            <div
              className="h-full rounded-full bg-accent transition-[width]"
              style={{ width: `${progress.pct}%` }}
            />
          </div>
        </div>
      )}

      {error && (
        <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200" role="alert">
          {error}
        </p>
      )}

      {success && (
        <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-100" role="status">
          If downloads did not start, check your browser’s pop-up / download settings.
        </p>
      )}
    </div>
  );
}
