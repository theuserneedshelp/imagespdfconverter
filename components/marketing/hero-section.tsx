import { site } from "@/config/site";
import { cn } from "@/lib/cn";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden pb-28 pt-16 sm:pb-32 sm:pt-20 lg:pt-24"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-90 dark:opacity-80"
        aria-hidden
      >
        <div
          className={cn(
            "absolute -left-1/4 top-0 h-[420px] w-[120%] rounded-full blur-3xl",
            "bg-gradient-to-r from-[rgb(var(--hero-from)/0.35)] via-[rgb(var(--hero-via)/0.25)] to-[rgb(var(--hero-to)/0.2)]",
            "animate-[fade-up_1.2s_ease-out_both]",
          )}
        />
        <div
          className={cn(
            "absolute -right-1/4 bottom-0 h-[380px] w-[110%] rounded-full blur-3xl",
            "bg-gradient-to-l from-[rgb(var(--hero-to)/0.22)] via-[rgb(var(--hero-from)/0.18)] to-transparent",
            "animate-[fade-up_1.2s_ease-out_0.1s_both]",
          )}
        />
      </div>

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted sm:text-sm">
          {site.hero.eyebrow}
        </p>
        <h1
          id="hero-heading"
          className="animate-fade-up-delay mt-4 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl"
        >
          {site.hero.title}
        </h1>
        <p className="animate-fade-up-delay-2 mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-ink-muted sm:text-lg">
          {site.hero.subtitle}
        </p>
      </div>
    </section>
  );
}
