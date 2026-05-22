"use client";

import { useCallback, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { isImageFile, isSupportedImageType } from "@/lib/pdf-from-images";

type UploadZoneProps = {
  onFiles: (files: File[]) => void;
  disabled?: boolean;
};

/**
 * Large drag-and-drop target with validation and accessible file input.
 */
export function UploadZone({ onFiles, disabled }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const id = useId();

  const pickFiles = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFiles = useCallback(
    (list: FileList | null) => {
      if (!list?.length || disabled) return;
      const files = Array.from(list);
      const images = files.filter(isImageFile);
      const supported = images.filter((f) =>
        f.type ? isSupportedImageType(f.type) : true,
      );
      /** If MIME is missing, still try — the browser may still decode. */
      const toAdd = supported.length ? supported : images;
      if (toAdd.length) onFiles(toAdd);
    },
    [disabled, onFiles],
  );

  return (
    <div className="relative">
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        disabled={disabled}
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      <button
        type="button"
        disabled={disabled}
        onClick={pickFiles}
        onDragEnter={(e) => {
          e.preventDefault();
          if (!disabled) setDragActive(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setDragActive(false);
          }
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (disabled) return;
          handleFiles(e.dataTransfer.files);
        }}
        aria-describedby={`${id}-hint`}
        aria-label="Upload images: open file chooser or drop files here"
        className={cn(
          "group relative w-full rounded-2xl border-2 border-dashed border-line bg-surface-muted/60 p-8 text-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-10",
          dragActive && "border-accent bg-accent/5 shadow-lift",
          !dragActive &&
            "hover:border-ink-faint hover:bg-surface-muted hover:shadow-soft",
          disabled && "cursor-not-allowed opacity-60",
        )}
      >
        <div className="mx-auto flex max-w-lg flex-col items-center gap-4">
          <span
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-surface text-accent shadow-soft transition",
              "group-hover:scale-[1.03] group-hover:shadow-lift",
              dragActive && "scale-[1.03] border-accent/40 shadow-lift",
            )}
            aria-hidden
          >
            <UploadCloudIcon />
          </span>
          <div>
            <p className="text-base font-semibold text-ink sm:text-lg">
              Drag & drop images here
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              or tap to browse — PNG, JPEG, WebP, GIF, SVG, and more
            </p>
          </div>
          <p
            id={`${id}-hint`}
            className="text-xs leading-relaxed text-ink-faint sm:text-sm"
          >
            Multiple files supported. Non-image files are ignored. Max
            recommended size depends on your device memory.
          </p>
        </div>
      </button>
    </div>
  );
}

function UploadCloudIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}
