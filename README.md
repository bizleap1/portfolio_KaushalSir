# Kaushal Banginwar — portfolio

React 19 + TypeScript + Vite + Tailwind v4 (GSAP / Framer Motion animations).
Live at **https://kaushalbanginwar.in**.

```bash
npm ci
npm run dev        # local dev server
npm run build      # type-check + production build + SEO prerender (see below)
npm run preview    # serve the built site locally
```

## How the SEO layer works

Every page is **pre-rendered to real static HTML** at build time, so search engines, social-share
scrapers and AI crawlers (most of which do not run JavaScript) receive the full content, the page's own
title/description/canonical, Open Graph + Twitter tags and JSON-LD structured data.

| Piece | Where |
|---|---|
| All facts (name, role, numbers, links, canonical host) | `src/data/site.ts` — **edit numbers here only** |
| Per-page title, description, canonical | `src/seo/routes.ts` |
| JSON-LD (Person, Organization, WebSite, ProfilePage, FAQPage, BreadcrumbList) | `src/seo/schema.ts` |
| `<head>` tags | `src/seo/head.ts` |
| Pages | `src/pages/` (`Home`, `AboutPage`, `SpeakingPage`, `CaseStudiesPage`, `NotFoundPage`) |
| FAQ shown on /about/ and mirrored in FAQPage schema | `src/data/faq.ts` |
| Prerender + `sitemap.xml` + `404.html` | `scripts/prerender.mjs` (runs after `vite build`) |
| `robots.txt`, `llms.txt`, `site.webmanifest` | `public/` |

`npm run build` prints one line per page (`h1:1 words:… title:… desc:…`) and warns if a page has no/duplicate
`<h1>`, too little text, or a title/description of the wrong length.
If the prerender step fails the build still succeeds (the site works as a normal SPA) but prints a loud warning;
use `SEO_STRICT=1 npm run build` in CI to fail instead.

### Adding a page
1. Add the page component in `src/pages/`.
2. Add a route (path, title, description) in `src/seo/routes.ts` and a `case` in `src/App.tsx`.
3. Build — it appears in `dist/`, `sitemap.xml` and gets its own metadata automatically.

### Adding proof to case studies
`src/data/caseStudies.ts` accepts optional `results: string[]` and `quote: { text, author }` per study.
They render on `/case-studies/` automatically. Real numbers + client quotes are the strongest ranking/conversion asset.

### Images
Heavy originals live in `scripts/assets/originals/` (not deployed). `python3 scripts/optimize-images.py`
regenerates the WebP files in `public/`; `python3 scripts/make-brand-assets.py` regenerates favicons,
the 1200×630 share image (`og-image.jpg`) and the schema portrait. Both need `pip install pillow`.

## After deploying (one-time, not code)
1. Make **one** host canonical (`SITE_URL` in `src/data/site.ts`, currently the non-www `kaushalbanginwar.in`) and
   301-redirect the other (`www`) to it in your hosting/DNS settings.
2. Google Search Console → add the property → submit `https://kaushalbanginwar.in/sitemap.xml` → URL Inspection →
   *Request indexing* for `/`, `/about/`, `/case-studies/`, `/speaking/`.
3. Bing Webmaster Tools → import from Search Console (Bing powers several AI search products).
4. Make sure your LinkedIn, Instagram and bizleap.in all link back to this site and use the same name,
   role and numbers (see `src/data/site.ts`).
