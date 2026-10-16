/**
 * Single source of truth for every fact that appears on the site AND in the
 * SEO layer (meta tags, JSON-LD, llms.txt-style summaries, FAQ).
 *
 * Change a number here once and it updates the hero, About section, About page,
 * structured data and share cards together. (Report item: "pick one set of
 * numbers and use it everywhere".)
 */

/** Canonical origin. Pick ONE host and 301-redirect the other one to it at the hosting/DNS level. */
export const SITE_URL = 'https://kaushalbanginwar.in';
export const BIZLEAP_URL = 'https://bizleap.in';

export const person = {
  name: 'Kaushal Banginwar',
  givenName: 'Kaushal',
  familyName: 'Banginwar',
  jobTitle: 'Founder & CEO',
  /** for use mid-sentence */
  jobTitleInline: 'founder & CEO',
  company: 'Bizleap',
  city: 'Nagpur',
  region: 'Maharashtra',
  country: 'India',
  countryCode: 'IN',
  /** one-line definition used in meta descriptions and structured data */
  tagline: 'Founder & CEO of Bizleap, a digital marketing and technology agency in Nagpur',
  education: {
    school: 'Amity Global Business School, Pune',
    degree: 'BBA',
    batch: '2024–2027',
  },
};

export const email = 'kaushalbanginwar@gmail.com';
export const phone = '+91 812 812 1004';
export const phoneHref = 'tel:+918128121004';

export const social = {
  linkedin: 'https://www.linkedin.com/in/kaushalbanginwar/',
  instagram: 'https://www.instagram.com/kaushalbanginwar.in/',
  bizleap: BIZLEAP_URL + '/',
} as const;

/** Profiles that are the same person — used for JSON-LD `sameAs` and `rel="me"` links. */
export const sameAs = [social.linkedin, social.instagram, social.bizleap];

export const facts = {
  foundedYear: 2020,
  /** Years since Bizleap was founded (2020). Update every January. */
  yearsExperience: 6,
  teamSize: 35,
  brands: 350,
  institutionsSpoken: 15,
  networkStartAge: 15,
  networkMembers: 2000,
  states: ['Maharashtra', 'Gujarat', 'Delhi', 'Karnataka', 'West Bengal'],
} as const;

/** What Bizleap offers — taken from the site's own copy (hero text + case studies). */
export const services = [
  'digital marketing',
  'social media marketing',
  'SEO and content marketing',
  'video marketing',
  'LinkedIn and B2B marketing',
  'web design and development',
  'e-commerce stores',
  'SaaS and digital products',
  'AI-integrated marketing',
];

export const knowsAbout = [
  'Digital marketing',
  'Social media marketing',
  'Search engine optimization',
  'Web design and development',
  'E-commerce',
  'AI in marketing',
  'Entrepreneurship',
  'Public speaking',
];

/** Short factual summary reused across the site, meta description and llms.txt. */
export const summary = {
  short:
    `Kaushal Banginwar is the founder & CEO of Bizleap, a digital marketing and technology agency in Nagpur. ` +
    `Case studies, speaking and ventures.`,
  long:
    `Kaushal Banginwar is an entrepreneur from Nagpur, Maharashtra, India, and the founder & CEO of Bizleap, ` +
    `a full-service digital marketing and technology agency. He began in network marketing at ${facts.networkStartAge}, ` +
    `founded Bizleap in ${facts.foundedYear}, and now leads a team of ${facts.teamSize}+ professionals who have worked with ` +
    `${facts.brands}+ brands across ${facts.states.length} Indian states. He is also a public speaker at ${facts.institutionsSpoken}+ ` +
    `institutions and a mentor to young entrepreneurs.`,
};

/** Sections / pages of the site (also drives the sitemap). */
export const paths = {
  home: '/',
  about: '/about/',
  speaking: '/speaking/',
  caseStudies: '/case-studies/',
} as const;

export const absoluteUrl = (path: string) => SITE_URL + (path.startsWith('/') ? path : '/' + path);

/** Public asset paths (files live in /public). */
export const images = {
  og: '/og-image.jpg',
  ogWidth: 1200,
  ogHeight: 630,
  portrait: '/kaushal-banginwar.jpg',
  portraitWidth: 610,
  portraitHeight: 920,
};
