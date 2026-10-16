import { absoluteUrl } from '../data/site.ts';
import { routes } from './routes.ts';

/** sitemap.xml for every indexable route. `lastmod` is the build date (YYYY-MM-DD). */
export function renderSitemap(buildDate: string): string {
  const urls = routes
    .filter((r) => r.indexable)
    .map(
      (r) =>
        `  <url>\n` +
        `    <loc>${absoluteUrl(r.path)}</loc>\n` +
        `    <lastmod>${buildDate}</lastmod>\n` +
        `    <changefreq>${r.changefreq}</changefreq>\n` +
        `    <priority>${r.priority.toFixed(1)}</priority>\n` +
        `  </url>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
