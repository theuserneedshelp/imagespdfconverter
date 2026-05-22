import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Image
            src={site.logo}
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 rounded-xl object-cover shadow-soft"
            priority
          />
          <span className="truncate text-sm font-semibold tracking-tight text-ink sm:text-base">
            {site.name}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition hover:bg-surface-muted hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <details className="relative md:hidden">
            <summary
              className="list-none [&::-webkit-details-marker]:hidden cursor-pointer rounded-xl border border-line bg-surface px-3 py-2 text-sm font-medium text-ink shadow-sm transition hover:border-ink-faint hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label="Open menu"
            >
              Menu
            </summary>
            <nav
              aria-label="Mobile primary"
              className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-lift"
            >
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-xl px-3 py-2 text-sm font-medium text-ink-muted transition hover:bg-surface-muted hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </details>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
