import { cn } from "@/lib/cn";

export type AdPlacement =
  | "header-banner"
  | "footer-banner"
  | "content-top"
  | "content-mid"
  | "content-bottom"
  | "sidebar"
  | "in-article";

type AdSlotProps = {
  placement: AdPlacement;
  className?: string;
};

const labels: Record<AdPlacement, string> = {
  "header-banner": "Header banner",
  "footer-banner": "Footer banner",
  "content-top": "Content top",
  "content-mid": "Content middle",
  "content-bottom": "Content bottom",
  sidebar: "Sidebar",
  "in-article": "In-article",
};

const heights: Record<AdPlacement, string> = {
  "header-banner": "min-h-[90px]",
  "footer-banner": "min-h-[90px]",
  "content-top": "min-h-[120px]",
  "content-mid": "min-h-[250px]",
  "content-bottom": "min-h-[120px]",
  sidebar: "min-h-[280px] lg:min-h-[600px]",
  "in-article": "min-h-[200px]",
};

/** Ad placeholder — replace inner markup with your AdSense snippet when approved. */
export function AdSlot({ placement, className }: AdSlotProps) {
  return (
    <aside
      className={cn("w-full", className)}
      aria-label={`Advertisement: ${labels[placement]}`}
      data-ad-placement={placement}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-2xl border border-dashed border-line bg-surface-muted/50 text-center",
          heights[placement],
        )}
      >
        <p className="max-w-md px-4 text-xs text-ink-faint sm:text-sm">
          <span className="font-medium text-ink-muted">{labels[placement]}</span>
          <span className="mt-1 block">
            Ad slot ({placement}) — paste Google AdSense in ad-slot.tsx
          </span>
        </p>
      </div>
    </aside>
  );
}
