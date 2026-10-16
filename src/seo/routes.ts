import { facts, paths, person, summary } from '../data/site.ts';

export type RouteKind = 'home' | 'about' | 'speaking' | 'case-studies' | 'not-found';

export interface Crumb {
  name: string;
  path: string;
}

export interface Route {
  kind: RouteKind;
  /** URL path with leading + trailing slash (except "/404") */
  path: string;
  title: string;
  description: string;
  ogType: 'website' | 'profile';
  indexable: boolean;
  changefreq: 'weekly' | 'monthly' | 'yearly';
  priority: number;
  breadcrumbs: Crumb[];
}

const home: Crumb = { name: 'Home', path: paths.home };

/**
 * Titles are kept <= ~60 characters and descriptions 120-160 characters
 * (scripts/prerender.mjs prints a warning if a route drifts outside that).
 */
export const routes: Route[] = [
  {
    kind: 'home',
    path: paths.home,
    title: `${person.name} – Founder, ${person.company} | Digital Marketing ${person.city}`,
    description: summary.short,
    ogType: 'website',
    indexable: true,
    changefreq: 'weekly',
    priority: 1.0,
    breadcrumbs: [],
  },
  {
    kind: 'about',
    path: paths.about,
    title: `About ${person.name} – Founder & CEO of ${person.company}`,
    description:
      `Who is ${person.name}? Founder & CEO of ${person.company}, a ${person.city} digital marketing agency with a ` +
      `${facts.teamSize}+ team and ${facts.brands}+ brands. Journey, ventures and FAQ.`,
    ogType: 'profile',
    indexable: true,
    changefreq: 'monthly',
    priority: 0.9,
    breadcrumbs: [home, { name: 'About', path: paths.about }],
  },
  {
    kind: 'speaking',
    path: paths.speaking,
    title: `${person.name} – Public Speaker | Amity, Symbiosis, Raisoni`,
    description:
      `${person.name} has spoken at ${facts.institutionsSpoken}+ institutions, including Amity, Symbiosis and Raisoni, ` +
      `on digital marketing, AI and entrepreneurship.`,
    ogType: 'website',
    indexable: true,
    changefreq: 'monthly',
    priority: 0.7,
    breadcrumbs: [home, { name: 'Public Speaking', path: paths.speaking }],
  },
  {
    kind: 'case-studies',
    path: paths.caseStudies,
    title: `Digital Marketing Case Studies | ${person.name}, ${person.company}`,
    description:
      `Digital marketing case studies by ${person.name} and ${person.company}: B2B LinkedIn, healthcare video, ` +
      `hospitality SEO and automotive social media.`,
    ogType: 'website',
    indexable: true,
    changefreq: 'monthly',
    priority: 0.8,
    breadcrumbs: [home, { name: 'Case Studies', path: paths.caseStudies }],
  },
  {
    kind: 'not-found',
    path: '/404',
    title: `Page not found | ${person.name}`,
    description: `This page does not exist. Go to the ${person.name} homepage.`,
    ogType: 'website',
    indexable: false,
    changefreq: 'yearly',
    priority: 0,
    breadcrumbs: [],
  },
];

/** Normalises "/about", "/about/", "/about/index.html" -> "/about/" and "/" -> "/". */
export function normalizePath(input: string): string {
  let p = (input || '/').split('?')[0].split('#')[0];
  p = p.replace(/\/index\.html$/, '/');
  if (!p.startsWith('/')) p = '/' + p;
  if (p !== '/' && !p.endsWith('/') && p !== '/404') p += '/';
  return p;
}

export function findRoute(path: string): Route {
  const p = normalizePath(path);
  return routes.find((r) => r.path === p) ?? routes[routes.length - 1];
}
