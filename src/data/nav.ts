import { paths } from './site.ts';

export interface NavItem {
  name: string;
  href: string;
}

/** Home page: smooth-scroll anchors to the sections on the same page. */
export const homeNav: NavItem[] = [
  { name: 'About', href: '#about' },
  { name: 'My Work', href: '#work' },
  { name: 'Case Study', href: '#work' },
  { name: 'Events', href: '#events' },
  { name: 'Ventures', href: '#ventures' },
];

/** Inner pages: real URLs (each one is its own indexable page). */
export const pageNav: NavItem[] = [
  { name: 'Home', href: paths.home },
  { name: 'About', href: paths.about },
  { name: 'Case Studies', href: paths.caseStudies },
  { name: 'Speaking', href: paths.speaking },
  { name: 'Contact', href: '/#contact' },
];
