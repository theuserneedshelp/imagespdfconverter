# ImagesPDFConverter (Next.js)

Premium, mobile-first PDF toolkit — **entirely in the browser**:

- **Images → PDF** (pdf-lib)
- **PDF → Images** (pdf.js)
- **Document scanner** (camera / photos → PDF)

See **[docs/EDITING.md](docs/EDITING.md)** to change your site name, copy, and ads.  
See **[docs/MOBILE_TESTING.md](docs/MOBILE_TESTING.md)** to test on your phone.

## Tech stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** (design tokens + dark mode)
- **pdf-lib** + **pdfjs-dist** (client-side only)

## Getting started

```bash
cd image-to-pdf-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your production URL before deploying (used for canonical URLs, `sitemap.xml`, and `robots.txt`).

## Scripts

| Command       | Description              |
| ------------- | ------------------------ |
| `npm run dev` | Local development server |
| `npm run build` | Production build       |
| `npm run start` | Run production server  |
| `npm run lint`  | ESLint                   |

## Deploy on Vercel

1. Push this folder to a Git repository (GitHub, GitLab, or Bitbucket).
2. In [Vercel](https://vercel.com), **Add New Project** → import the repo.
3. Framework preset: **Next.js**. Root directory: this app folder if the repo is monorepo.
4. Add environment variable `NEXT_PUBLIC_SITE_URL` = `https://your-domain.com`.
5. Deploy.

Vercel runs `next build` automatically. No custom server is required.

## Custom domain (Vercel)

1. Project → **Settings** → **Domains**.
2. Add your domain and follow DNS instructions (usually a `CNAME` to `cname.vercel-dns.com` for subdomains, or `A` records for apex).
3. Wait for DNS propagation; Vercel provisions HTTPS automatically.

Update `NEXT_PUBLIC_SITE_URL` to match the canonical domain.

## Google AdSense (later)

1. Complete real **Privacy Policy** / **Terms** (replace placeholders with counsel-reviewed copy).
2. Ensure substantial original content and a clear navigation/footer (this template includes baseline pages).
3. In Vercel, add the AdSense script via **Next.js Script** (`next/script`) in `app/layout.tsx` or a dedicated client component **after approval**, typically in the layout or beside `AdPlaceholder` in `app/page.tsx`.
4. Replace the `AdPlaceholder` component body with your approved ad unit snippet when ready.
5. Respect ad provider policies (no invalid clicks, sufficient content, consent where required).

## Folder structure (high level)

- `app/` — routes, `layout.tsx`, global styles, `opengraph-image.tsx`, `icon.tsx`, `robots.ts`, `sitemap.ts`
- `components/converter/` — upload, preview grid, main workspace (client)
- `components/layout/` — header & footer
- `components/marketing/` — hero, trust, ad placeholder
- `components/providers/` — theme (`localStorage`)
- `components/ui/` — shared primitives (button, spinner)
- `lib/pdf-from-images.ts` — **pdf-lib** conversion (client-only; uses canvas for non-PNG/JPEG)

## License

Private / your project — adjust as needed.
