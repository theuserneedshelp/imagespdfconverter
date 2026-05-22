"use client";

import { useState } from "react";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";
import { ImageToPdfWorkspace } from "@/components/converter/image-to-pdf-workspace";
import { PdfToImagesWorkspace } from "@/components/converter/pdf-to-images-workspace";
import { AdSlot } from "@/components/marketing/ad-slot";

const tools = [
  {
    id: site.tools.imagesToPdf.id,
    label: site.tools.imagesToPdf.label,
    description: site.tools.imagesToPdf.description,
    panel: <ImageToPdfWorkspace />,
  },
  {
    id: site.tools.pdfToImages.id,
    label: site.tools.pdfToImages.label,
    description: site.tools.pdfToImages.description,
    panel: <PdfToImagesWorkspace />,
  },

] as const;

type ToolId = (typeof tools)[number]["id"];

export function ToolTabs() {
  const [active, setActive] = useState<ToolId>(tools[0].id);
  const current = tools.find((t) => t.id === active) ?? tools[0];

  return (
    <div>
      <AdSlot placement="content-top" className="mb-6" />

      <div
        role="tablist"
        aria-label="PDF tools"
        className="flex flex-col gap-2 sm:flex-row sm:flex-wrap"
      >
        {tools.map((tool) => (
          <button
            key={tool.id}
            type="button"
            role="tab"
            aria-selected={active === tool.id}
            aria-controls={`panel-${tool.id}`}
            id={`tab-${tool.id}`}
            onClick={() => setActive(tool.id)}
            className={cn(
              "rounded-xl border px-4 py-3 text-left text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:min-w-[140px] sm:flex-1",
              active === tool.id
                ? "border-accent bg-accent/10 text-ink shadow-soft"
                : "border-line bg-surface text-ink-muted hover:border-ink-faint hover:bg-surface-muted",
            )}
          >
            {tool.label}
          </button>
        ))}
      </div>

      <p className="mt-3 text-sm text-ink-muted">{current.description}</p>

      <AdSlot placement="in-article" className="my-6" />

      <div
        role="tabpanel"
        id={`panel-${current.id}`}
        aria-labelledby={`tab-${current.id}`}
        className="mt-2"
      >
        {current.panel}
      </div>
    </div>
  );
}
