import { ContentWithAds } from "@/components/layout/content-with-ads";
import { AdSlot } from "@/components/marketing/ad-slot";

type LegalPageLayoutProps = {
  title: string;
  children: React.ReactNode;
};

/** Legal / static pages with sidebar ads on desktop + in-article slot. */
export function LegalPageLayout({ title, children }: LegalPageLayoutProps) {
  return (
    <ContentWithAds showSidebar>
      <article className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        <AdSlot placement="in-article" className="my-8" />
        <div className="space-y-4 text-sm leading-relaxed text-ink-muted sm:text-base">
          {children}
        </div>
      </article>
    </ContentWithAds>
  );
}
