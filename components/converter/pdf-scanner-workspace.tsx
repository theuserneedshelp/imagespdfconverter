"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AdSlot } from "@/components/marketing/ad-slot";
import { buildPdfFromImageFiles, defaultPdfFilename } from "@/lib/pdf-from-images";
import { canvasToJpegFile, enhanceScanCanvas } from "@/lib/scan-enhance";
import { createId } from "@/lib/id";
import { cn } from "@/lib/cn";

type ScanPage = {
  id: string;
  url: string;
  file: File;
};

/**
 * Document scanner: camera or photo → enhance → multi-page PDF (client-side).
 */
export function PdfScannerWorkspace() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [enhance, setEnhance] = useState(true);
  const [pages, setPages] = useState<ScanPage[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraOn(false);
  }, []);

  const pagesRef = useRef(pages);
  pagesRef.current = pages;

  useEffect(() => {
    return () => {
      stopCamera();
      pagesRef.current.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [stopCamera]);

  const startCamera = async () => {
    setError(null);
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setError(
          "Camera API unavailable. Use “Add photo” instead, or open the site over HTTPS / localhost.",
        );
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraOn(true);
    } catch {
      setError("Could not access camera. Try “Add photo” or check permissions.");
    }
  };

  const addCanvasPage = async (canvas: HTMLCanvasElement, name: string) => {
    const out = enhance
      ? enhanceScanCanvas(canvas, canvas.width, canvas.height)
      : canvas;
    const file = await canvasToJpegFile(out, name);
    const url = URL.createObjectURL(file);
    setPages((prev) => [...prev, { id: createId(), url, file }]);
  };

  const captureFromCamera = async () => {
    const video = videoRef.current;
    if (!video || !cameraOn) return;
    const w = video.videoWidth;
    const h = video.videoHeight;
    if (!w || !h) {
      setError("Camera not ready yet — wait a moment and try again.");
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.getContext("2d")?.drawImage(video, 0, 0, w, h);
    await addCanvasPage(canvas, `scan-${pages.length + 1}.jpg`);
  };

  const onPhotoPicked = async (file: File) => {
    setError(null);
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.src = url;
    await new Promise<void>((res, rej) => {
      img.onload = () => res();
      img.onerror = () => rej(new Error("Could not load image"));
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext("2d")?.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);
    await addCanvasPage(canvas, file.name.replace(/\.\w+$/, "") + ".jpg");
  };

  const removePage = (id: string) => {
    setPages((prev) => {
      const p = prev.find((x) => x.id === id);
      if (p) URL.revokeObjectURL(p.url);
      return prev.filter((x) => x.id !== id);
    });
  };

  const buildPdf = async () => {
    if (pages.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      const bytes = await buildPdfFromImageFiles(pages.map((p) => p.file));
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = defaultPdfFilename("scan");
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not create PDF");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl border border-line bg-surface p-4 shadow-lift sm:p-6 lg:p-8">
      <AdSlot placement="in-article" className="mb-6" />

      <p className="text-sm text-ink-muted">
        Capture documents with your phone camera or add photos. Enable scan
        enhancement for a cleaner, high-contrast look, then export one PDF.
      </p>

      <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          checked={enhance}
          onChange={(e) => setEnhance(e.target.checked)}
          className="h-4 w-4 rounded border-line accent-accent"
        />
        Scan enhancement (grayscale + contrast)
      </label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void onPhotoPicked(f);
          e.target.value = "";
        }}
      />

      <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-black/90">
        <video
          ref={videoRef}
          className={cn(
            "aspect-[4/3] w-full object-cover",
            !cameraOn && "hidden",
          )}
          playsInline
          muted
          aria-label="Camera preview"
        />
        {!cameraOn && (
          <div className="flex aspect-[4/3] items-center justify-center text-sm text-ink-faint">
            Camera preview appears here
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {!cameraOn ? (
          <Button type="button" variant="secondary" onClick={() => void startCamera()}>
            Start camera
          </Button>
        ) : (
          <>
            <Button type="button" variant="primary" onClick={() => void captureFromCamera()}>
              Capture page
            </Button>
            <Button type="button" variant="ghost" onClick={stopCamera}>
              Stop camera
            </Button>
          </>
        )}
        <Button
          type="button"
          variant="secondary"
          onClick={() => fileInputRef.current?.click()}
        >
          Add photo
        </Button>
      </div>

      {pages.length > 0 && (
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {pages.map((p, i) => (
            <li key={p.id} className="relative overflow-hidden rounded-xl border border-line">
              <div className="relative aspect-[3/4] bg-surface-muted">
                <Image src={p.url} alt={`Scan page ${i + 1}`} fill className="object-contain" unoptimized />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="md"
                className="w-full rounded-none border-t border-line text-red-600"
                onClick={() => removePage(p.id)}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6">
        <Button
          type="button"
          variant="primary"
          size="lg"
          className="w-full sm:w-auto"
          disabled={busy || pages.length === 0}
          onClick={() => void buildPdf()}
        >
          {busy ? (
            <>
              <Spinner className="text-accent-foreground" />
              Building PDF…
            </>
          ) : (
            `Download PDF (${pages.length} page${pages.length === 1 ? "" : "s"})`
          )}
        </Button>
      </div>

      {error && (
        <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
