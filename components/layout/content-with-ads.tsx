import { AdSlot } from "@/components/marketing/ad-slot";

type ContentWithAdsProps = {
  children: React.ReactNode;
  showSidebar?: boolean;
};

export function ContentWithAds({
  children,
  showSidebar = false,
}: ContentWithAdsProps) {
  if (!showSidebar) {
    return (
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <AdSlot placement="content-top" />
        {children}
        <AdSlot placement="content-mid" />
        <AdSlot placement="content-bottom" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <AdSlot placement="content-top" className="mb-6" />
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0 space-y-6">
          {children}
          <AdSlot placement="content-mid" />
        </div>
        <div className="hidden lg:block">
          <AdSlot placement="sidebar" className="sticky top-24" />
        </div>
      </div>
      <AdSlot placement="content-bottom" className="mt-6" />
    </div>
  );
}
