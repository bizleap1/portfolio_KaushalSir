import { renderToString } from 'react-dom/server';
import App from './App.tsx';
import { findRoute, routes } from './seo/routes.ts';
import { renderHead, SEO_START, SEO_END } from './seo/head.ts';
import { renderSitemap } from './seo/sitemap.ts';

/** Used by scripts/prerender.mjs at build time: returns the page's HTML and its <head> tags. */
export function render(path: string, buildDate: string) {
  const route = findRoute(path);
  return {
    route,
    html: renderToString(<App path={route.path} />),
    head: renderHead(route, buildDate),
  };
}

export { routes, renderSitemap, SEO_START, SEO_END };
