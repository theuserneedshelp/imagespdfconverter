import { HeroSection } from "@/components/marketing/hero-section";
import { TrustSection } from "@/components/marketing/trust-section";
import { ToolTabs } from "@/components/converter/tool-tabs";
import { AdSlot } from "@/components/marketing/ad-slot";

export default function HomePage() {
  return (
    <div className="relative">
      <HeroSection />
      <section
        className="relative z-10 -mt-16 px-4 pb-12 sm:-mt-20 sm:px-6 lg:px-8"
        aria-labelledby="converter-heading"
      >
        <div className="mx-auto max-w-5xl">
          <h2 id="converter-heading" className="sr-only">
            PDF tools
          </h2>
          <ToolTabs />
        </div>
      </section>
      <AdSlot placement="content-mid" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8" />
      <TrustSection />
      <AdSlot placement="content-bottom" className="mx-auto max-w-5xl px-4 pb-12 sm:px-6 lg:px-8" />
    </div>
  );
}
