import { caseStudies } from '../data/caseStudies.ts';
import { faq } from '../data/faq.ts';
import {
  BIZLEAP_URL,
  SITE_URL,
  absoluteUrl,
  facts,
  images,
  knowsAbout,
  person,
  sameAs,
  summary,
} from '../data/site.ts';
import type { Route } from './routes.ts';

export const PERSON_ID = `${SITE_URL}/#person`;
export const ORG_ID = `${BIZLEAP_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

type Json = Record<string, unknown>;

const address = {
  '@type': 'PostalAddress',
  addressLocality: person.city,
  addressRegion: person.region,
  addressCountry: person.countryCode,
};

export function personNode(pageUrl: string): Json {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: person.name,
    givenName: person.givenName,
    familyName: person.familyName,
    url: `${SITE_URL}/`,
    image: {
      '@type': 'ImageObject',
      url: absoluteUrl(images.portrait),
      width: images.portraitWidth,
      height: images.portraitHeight,
      caption: `${person.name}, ${person.jobTitle} of ${person.company}`,
    },
    jobTitle: person.jobTitle,
    description: summary.long,
    worksFor: { '@id': ORG_ID },
    address,
    alumniOf: { '@type': 'EducationalOrganization', name: person.education.school },
    knowsAbout,
    sameAs,
    mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
  };
}

export function organizationNode(): Json {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: person.company,
    url: `${BIZLEAP_URL}/`,
    description:
      `${person.company} is a full-service digital marketing and technology agency in ${person.city}, ${person.region}, ` +
      `founded by ${person.name} in ${facts.foundedYear}.`,
    foundingDate: String(facts.foundedYear),
    founder: { '@id': PERSON_ID },
    address,
    areaServed: facts.states.map((name) => ({ '@type': 'AdministrativeArea', name })),
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: facts.teamSize },
    knowsAbout: ['Digital marketing', 'Social media marketing', 'Web design and development', 'AI integrated marketing'],
  };
}

export function websiteNode(): Json {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: person.name,
    description: summary.short,
    inLanguage: 'en-IN',
    publisher: { '@id': PERSON_ID },
  };
}

function pageNode(route: Route, pageUrl: string, buildDate: string): Json {
  const base: Json = {
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: route.title,
    description: route.description,
    inLanguage: 'en-IN',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': PERSON_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: absoluteUrl(images.og), width: images.ogWidth, height: images.ogHeight },
    dateModified: buildDate,
  };
  switch (route.kind) {
    case 'home':
    case 'about':
      return { '@type': 'ProfilePage', ...base, mainEntity: { '@id': PERSON_ID } };
    case 'case-studies':
      return {
        '@type': 'CollectionPage',
        ...base,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: caseStudies.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.title,
            url: `${pageUrl}#${c.slug}`,
          })),
        },
      };
    default:
      return { '@type': 'WebPage', ...base };
  }
}

function breadcrumbNode(route: Route): Json | null {
  if (route.breadcrumbs.length < 2) return null;
  return {
    '@type': 'BreadcrumbList',
    itemListElement: route.breadcrumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

function faqNode(pageUrl: string): Json {
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** Full JSON-LD document for a route. */
export function buildJsonLd(route: Route, buildDate: string): Json | null {
  if (!route.indexable) return null;
  const pageUrl = absoluteUrl(route.path);
  const graph: Json[] = [personNode(pageUrl), organizationNode(), websiteNode(), pageNode(route, pageUrl, buildDate)];
  const crumbs = breadcrumbNode(route);
  if (crumbs) graph.push(crumbs);
  if (route.kind === 'about') graph.push(faqNode(pageUrl));
  return { '@context': 'https://schema.org', '@graph': graph };
}
