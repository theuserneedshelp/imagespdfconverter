"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export type PreviewItem = {
  id: string;
  file: File;
  url: string;
};

type ImagePreviewGridProps = {
  items: PreviewItem[];
  onRemove: (id: string) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  disabled?: boolean;
};

/**
 * Responsive thumbnail grid with remove, drag reorder, and keyboard reorder.
 */
export function ImagePreviewGrid({
  items,
  onRemove,
  onReorder,
  disabled,
}: ImagePreviewGridProps) {
  const [dragId, setDragId] = useState<string | null>(null);

  const move = useCallback(
    (id: string, dir: -1 | 1) => {
      const i = items.findIndex((x) => x.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= items.length) return;
      onReorder(i, j);
    },
    [items, onReorder],
  );

  if (items.length === 0) {
    return (
      <div
        className="rounded-2xl border border-dashed border-line bg-surface-muted/40 px-6 py-16 text-center"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm font-medium text-ink">No images yet</p>
        <p className="mt-2 text-sm text-ink-muted">
          Upload screenshots, scans, or photos — each becomes its own PDF page.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item, index) => (
        <li key={item.id} className="list-none">
          <article
            draggable={!disabled}
            onDragStart={() => setDragId(item.id)}
            onDragEnd={() => setDragId(null)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (!dragId || dragId === item.id) return;
              const from = items.findIndex((x) => x.id === dragId);
              const to = index;
              if (from >= 0) onReorder(from, to);
              setDragId(null);
            }}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-line bg-surface shadow-soft transition",
              dragId === item.id && "opacity-60 ring-2 ring-accent",
              !disabled && "hover:-translate-y-0.5 hover:shadow-lift",
            )}
          >
            <div className="relative aspect-square bg-surface-muted">
              <Image
                src={item.url}
                alt={item.file.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain p-2"
                unoptimized
              />
            </div>

            <div className="flex items-center justify-between gap-2 border-t border-line px-2 py-2">
              <p className="min-w-0 flex-1 truncate px-1 text-xs text-ink-muted">
                {item.file.name}
              </p>
              <div className="flex shrink-0 items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  className="h-9 min-h-0 w-9 px-0"
                  disabled={disabled || index === 0}
                  onClick={() => move(item.id, -1)}
                  aria-label={`Move ${item.file.name} up in order`}
                >
                  ↑
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  className="h-9 min-h-0 w-9 px-0"
                  disabled={disabled || index === items.length - 1}
                  onClick={() => move(item.id, 1)}
                  aria-label={`Move ${item.file.name} down in order`}
                >
                  ↓
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  className="h-9 min-h-0 w-9 px-0 text-red-600 hover:text-red-700 dark:text-red-400"
                  disabled={disabled}
                  onClick={() => onRemove(item.id)}
                  aria-label={`Remove ${item.file.name}`}
                >
                  ✕
                </Button>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
