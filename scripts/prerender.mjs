/**
 * Post-build step: turns the single-page React app into real static HTML for every route.
 *
 *   npm run build   ->   tsc -b  &&  vite build  &&  node scripts/prerender.mjs
 *
 * What it does
 *   1. Builds src/entry-server.tsx (server bundle) with Vite's JS API.
 *   2. For each route in src/seo/routes.ts renders the page with react-dom/server and writes
 *      dist/<route>/index.html — with that page's own <title>, meta description, canonical,
 *      Open Graph / Twitter tags and JSON-LD. Crawlers (and AI bots that don't run JavaScript)
 *      now receive the full text content instead of an empty <div id="root">.
 *   3. Writes dist/sitemap.xml and dist/404.html.
 *
 * Safety: if anything here fails the build still succeeds and the site simply behaves like the
 * old single-page app (a loud warning is printed). Set SEO_STRICT=1 (e.g. in CI) to fail the build instead.
 */
import { build } from 'vite';
import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');
const strict = process.env.SEO_STRICT === '1';
const buildDate = new Date().toISOString().slice(0, 10);
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const warnings = [];

async function main() {
  if (!existsSync(path.join(dist, 'index.html'))) {
    throw new Error('dist/index.html not found — run "vite build" before prerendering.');
  }

  // 1. server bundle ---------------------------------------------------------
  await build({
    root,
    logLevel: 'warn',
    build: { ssr: 'src/entry-server.tsx', outDir: 'dist-ssr', emptyOutDir: true },
    // these ship ESM/UMD that Node can't always resolve as deep imports — let Vite bundle them
    ssr: { noExternal: ['gsap', 'framer-motion', '@studio-freight/lenis'] },
  });

  const entry = (await readdir(ssrDir)).find((f) => /^entry-server\.(m?js)$/.test(f));
  if (!entry) throw new Error('server bundle not found in dist-ssr/');
  const mod = await import(pathToFileURL(path.join(ssrDir, entry)).href);
  const { render, routes, renderSitemap, SEO_START, SEO_END } = mod;

  // 2. template ----------------------------------------------------------------
  let template = await readFile(path.join(dist, 'index.html'), 'utf8');
  template = template.replace(/<!--seo-fallback:start-->[\s\S]*?<!--seo-fallback:end-->\s*/, ''); // no-JS fallback not needed once prerendered
  const headRe = new RegExp(`${escapeRe(SEO_START)}[\\s\\S]*?${escapeRe(SEO_END)}`);
  if (!headRe.test(template)) throw new Error(`SEO markers (${SEO_START} … ${SEO_END}) missing in index.html`);
  if (!template.includes('<!--app-html-->')) throw new Error('<!--app-html--> placeholder missing in index.html');

  // 3. render every route -------------------------------------------------------
  for (const route of routes) {
    const { html, head } = render(route.path, buildDate);

    const page = template
      .replace(headRe, () => `${SEO_START}\n${head}\n    ${SEO_END}`)
      .replace('<!--app-html-->', () => html);

    const file =
      route.path === '/'
        ? path.join(dist, 'index.html')
        : route.path === '/404'
          ? path.join(dist, '404.html')
          : path.join(dist, route.path, 'index.html');
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, page, 'utf8');

    // quality checks ----------------------------------------------------------
    const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
    const words = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    if (route.indexable) {
      if (h1 !== 1) warnings.push(`${route.path}: expected exactly one <h1>, found ${h1}`);
      if (words < 150) warnings.push(`${route.path}: only ${words} words of server-rendered text`);
      if (route.title.length > 65) warnings.push(`${route.path}: title is ${route.title.length} chars (aim for <= 60)`);
      if (route.description.length < 110 || route.description.length > 165) {
        warnings.push(`${route.path}: meta description is ${route.description.length} chars (aim for 120-160)`);
      }
    }
    console.log(`[seo] ${route.path.padEnd(16)} h1:${h1}  words:${String(words).padStart(5)}  title:${route.title.length}  desc:${route.description.length}`);
  }

  // 4. sitemap --------------------------------------------------------------------
  await writeFile(path.join(dist, 'sitemap.xml'), renderSitemap(buildDate), 'utf8');
  console.log('[seo] wrote dist/sitemap.xml');

  await rm(ssrDir, { recursive: true, force: true });
  for (const w of warnings) console.warn(`[seo] warning: ${w}`);
  console.log(`[seo] prerendered ${routes.length} pages.`);
}

try {
  await main();
} catch (err) {
  console.error('\n' + '='.repeat(72));
  console.error('[seo] PRERENDER FAILED — the site was built as a plain single-page app.');
  console.error('[seo] Search engines will see an empty page until this is fixed.');
  console.error('[seo] Reason:', err && err.stack ? err.stack : err);
  console.error('='.repeat(72) + '\n');
  await rm(ssrDir, { recursive: true, force: true }).catch(() => {});
  process.exit(strict ? 1 : 0);
}
