# How to edit your site

## Brand name, hero, footer, contact email

Edit **one file**: `config/site.ts`

| Field | What it changes |
|--------|------------------|
| `name` | Header, footer, browser tab template |
| `logoLetter` | Logo square letter |
| `tagline` | Meta description base |
| `hero.title` / `hero.subtitle` | Home page headline |
| `footer.description` | Footer text |
| `contact.email` | Contact page + privacy link |
| `tools.*.label` | Home page tool tab names |

Save and refresh the browser.

## Home page layout

- `app/page.tsx` — section order (hero, tools, ads, trust)
- `components/marketing/hero-section.tsx` — hero styling only (copy comes from config)
- `components/converter/tool-tabs.tsx` — which tools appear

## Legal pages (full text)

- `app/about/page.tsx`
- `app/privacy-policy/page.tsx`
- `app/terms/page.tsx`
- `app/contact/page.tsx`

Dates and entity name: `config/site.ts` → `legal.lastUpdated`, `legal.entityName`

## Ad placeholders

Edit `components/marketing/ad-slot.tsx` — replace the inner `<p>` with your AdSense snippet per placement, or branch on `placement` prop.

Ad slots appear:

- **Every page:** header banner (below nav), footer banner
- **Home:** content top/mid/bottom + in-tool slots
- **Legal pages:** sidebar (desktop), top/mid/bottom, in-article

## SEO / social preview

- `app/layout.tsx` — metadata (uses `config/site.ts`)
- `app/opengraph-image.tsx` — OG image graphic
