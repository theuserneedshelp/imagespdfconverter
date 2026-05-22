"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { UploadZone } from "@/components/converter/upload-zone";
import {
  ImagePreviewGrid,
  type PreviewItem,
} from "@/components/converter/image-preview-grid";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  buildPdfFromImageFiles,
  defaultPdfFilename,
} from "@/lib/pdf-from-images";
import { cn } from "@/lib/cn";
import { createId } from "@/lib/id";

function makePreviewItem(file: File): PreviewItem {
  return {
    id: createId(),
    file,
    url: URL.createObjectURL(file),
  };
}

/**
 * Main client island: uploads, previews, reorder, PDF build, download.
 * Keeps all pdf-lib work in the browser.
 */
export function ImageToPdfWorkspace() {
  const [items, setItems] = useState<PreviewItem[]>([]);
  const [, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<{
    pct: number;
    label: string;
  } | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  useEffect(() => {
    return () => {
      if (successTimer.current) clearTimeout(successTimer.current);
      itemsRef.current.forEach((i) => URL.revokeObjectURL(i.url));
    };
  }, []);

  const addFiles = useCallback((files: File[]) => {
    setError(null);
    setSuccess(false);
    startTransition(() => {
      setItems((prev) => [...prev, ...files.map(makePreviewItem)]);
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const found = prev.find((x) => x.id === id);
      if (found) URL.revokeObjectURL(found.url);
      return prev.filter((x) => x.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    setItems((prev) => {
      prev.forEach((i) => URL.revokeObjectURL(i.url));
      return [];
    });
    setError(null);
    setSuccess(false);
    setProgress(null);
  }, []);

  const reorder = useCallback((fromIndex: number, toIndex: number) => {
    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  }, []);

  const onConvert = useCallback(async () => {
    if (items.length === 0) return;
    setError(null);
    setSuccess(false);
    if (successTimer.current) clearTimeout(successTimer.current);
    setBusy(true);
    setProgress({ pct: 0, label: "ImagesPDFConverter — Preparing…" });
    try {
      const files = items.map((i) => i.file);
      const pdfBytes = await buildPdfFromImageFiles(files, (p) => {
        const pct =
          p.total === 0 ? 0 : Math.min(99, Math.round((p.done / p.total) * 100));
        setProgress({ pct, label: p.label });
      });

      const blob = new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = defaultPdfFilename();
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setProgress({
        pct: 100,
        label:
          "ImagesPDFConverter — download started — check your downloads folder.",
      });
      setSuccess(true);
      successTimer.current = setTimeout(() => setSuccess(false), 4500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
      setTimeout(() => setProgress(null), 3200);
    }
  }, [items]);

  return (
    <div className="rounded-2xl border border-line bg-surface p-4 shadow-lift sm:p-6 lg:p-8">
      <UploadZone onFiles={addFiles} disabled={busy} />

      <div className="mt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-ink">Your images</h3>
            <p id="preview-help" className="mt-1 text-sm text-ink-muted">
              Reorder pages by dragging cards or using the arrow buttons.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={clearAll}
              disabled={busy || items.length === 0}
            >
              Clear all
            </Button>
          </div>
        </div>

        <div className="mt-4" aria-describedby="preview-help">
          <ImagePreviewGrid
            items={items}
            onRemove={removeItem}
            onReorder={reorder}
            disabled={busy}
          />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {progress && (
          <div
            className="rounded-2xl border border-line bg-surface-muted/60 px-4 py-3"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center gap-3">
              {busy && <Spinner className="text-accent" />}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-ink">{progress.label}</p>
                <div
                  className="mt-2 h-2 overflow-hidden rounded-full bg-line"
                  aria-hidden
                >
                  <div
                    className="h-full rounded-full bg-accent transition-[width] duration-300 ease-out"
                    style={{ width: `${progress.pct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <p
            className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200"
            role="alert"
          >
            {error}
          </p>
        )}

        {success && (
          <p
            className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-100"
            role="status"
            aria-live="polite"
          >
            Nice — your PDF is on the way. If the download did not start, check
            your browser’s download permissions.
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-faint sm:text-sm">
            {items.length === 0
              ? "Add at least one image to enable export."
              : `${items.length} image${items.length === 1 ? "" : "s"} ready · client-side only`}
          </p>
          <Button
            type="button"
            variant="primary"
            size="lg"
            className={cn(
              "w-full sm:w-auto sm:min-w-[220px]",
              success && "animate-pulse-ring rounded-2xl",
            )}
            disabled={busy || items.length === 0}
            onClick={onConvert}
            aria-busy={busy}
          >
            {busy ? (
              <>
                <Spinner className="h-5 w-5 text-accent-foreground" />
                ImagesPDFConverter — Creating PDF…
              </>
            ) : (
              <>Download PDF</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
