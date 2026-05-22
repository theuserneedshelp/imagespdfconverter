import { cn } from "@/lib/cn";

const items = [
  {
    title: "Files stay private",
    body: "Conversion runs entirely in your browser with pdf-lib. Nothing is uploaded to a server.",
    icon: LockIcon,
  },
  {
    title: "Fast conversion",
    body: "Native embedding for PNG & JPEG, smart rasterization for other formats — tuned for smooth UX.",
    icon: BoltIcon,
  },
  {
    title: "Works on all devices",
    body: "Mobile-first layout, large tap targets, and accessible controls so anyone can use it.",
    icon: DevicesIcon,
  },
];

export function TrustSection() {
  return (
    <section
      className="border-t border-line bg-surface-muted/40 py-16 sm:py-20"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2
            id="trust-heading"
            className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
          >
            Built for trust and speed
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
            We designed this experience like a premium product: clear states,
            honest privacy, and performance that respects your time.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.title}>
              <article
                className={cn(
                  "h-full rounded-2xl border border-line bg-surface p-6 shadow-soft transition",
                  "hover:-translate-y-0.5 hover:shadow-lift",
                )}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-muted text-accent">
                  <item.icon />
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.body}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function LockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 11V8a5 5 0 0 1 10 0v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="5"
        y="11"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      stroke="currentColor"
    >
      <path
        d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DevicesIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="4"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M7 20h10M11 14v6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="15"
        y="8"
        width="6"
        height="12"
        rx="1"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
