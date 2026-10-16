import { absoluteUrl, images, person } from '../data/site.ts';
import { buildJsonLd } from './schema.ts';
import type { Route } from './routes.ts';

/** Everything between these markers in index.html is replaced per page by scripts/prerender.mjs. */
export const SEO_START = '<!--seo:start-->';
export const SEO_END = '<!--seo:end-->';

const ROBOTS_INDEX = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
const OG_ALT = `${person.name} – ${person.jobTitle} of ${person.company}`;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** JSON for a <script type="application/ld+json"> — "<" is escaped so "</script>" can never close the tag early. */
function safeJson(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

/** Returns the <head> tags that differ per page (title, description, canonical, social cards, JSON-LD). */
export function renderHead(route: Route, buildDate: string): string {
  const url = route.kind === 'not-found' ? absoluteUrl('/') : absoluteUrl(route.path);
  const title = escapeHtml(route.title);
  const desc = escapeHtml(route.description);
  const image = absoluteUrl(images.og);

  const lines: string[] = [
    `<title>${title}</title>`,
    `<meta name="description" content="${desc}" />`,
    `<meta name="robots" content="${route.indexable ? ROBOTS_INDEX : 'noindex, follow'}" />`,
    `<meta name="author" content="${escapeHtml(person.name)}" />`,
  ];

  if (route.indexable) lines.push(`<link rel="canonical" href="${url}" />`);

  lines.push(
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:site_name" content="${escapeHtml(person.name)}" />`,
    `<meta property="og:type" content="${route.ogType}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${desc}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:secure_url" content="${image}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="${images.ogWidth}" />`,
    `<meta property="og:image:height" content="${images.ogHeight}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(OG_ALT)}" />`,
  );

  if (route.ogType === 'profile') {
    lines.push(
      `<meta property="profile:first_name" content="${escapeHtml(person.givenName)}" />`,
      `<meta property="profile:last_name" content="${escapeHtml(person.familyName)}" />`,
    );
  }

  lines.push(
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${desc}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(OG_ALT)}" />`,
  );

  if (route.kind === 'home') {
    // The hero portrait is the largest paint on the home page — start fetching it immediately.
    lines.push(`<link rel="preload" as="image" href="/portrait-transparent.webp" type="image/webp" fetchpriority="high" />`);
  }

  const jsonLd = buildJsonLd(route, buildDate);
  if (jsonLd) lines.push(`<script type="application/ld+json">${safeJson(jsonLd)}</script>`);

  return lines.map((l) => '    ' + l).join('\n');
}
