import Link from "next/link";
import { site } from "@/config/site";
import { AdSlot } from "@/components/marketing/ad-slot";

const footerNav = [
  { href: "/about", label: "About" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms and Conditions" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-surface-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <AdSlot placement="footer-banner" className="mb-8" />
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-ink">{site.name}</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
              {site.footer.description}
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-col gap-2 sm:items-end">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-muted underline-offset-4 transition hover:text-ink hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mt-10 text-xs text-ink-faint">
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
