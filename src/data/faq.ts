import { BIZLEAP_URL, email, facts, person, services, social, summary } from './site.ts';

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * Plain-language answers to the questions people (and AI assistants) actually ask.
 * Rendered visibly on /about/ and mirrored in FAQPage JSON-LD — keep wording factual.
 */
export const faq: FaqItem[] = [
  {
    q: 'Who is Kaushal Banginwar?',
    a: summary.long,
  },
  {
    q: 'What is Bizleap?',
    a:
      `Bizleap (${BIZLEAP_URL.replace('https://', '')}) is a full-service digital marketing and technology agency founded by ` +
      `${person.name} in ${facts.foundedYear} and headquartered in ${person.city}, ${person.region}. ` +
      `It has a ${facts.teamSize}+ member team and has worked with ${facts.brands}+ brands across ${facts.states.join(', ')}.`,
  },
  {
    q: 'What services does Bizleap offer?',
    a:
      `${person.company} offers ${services.join(', ')} for brands in ${person.city} and across ` +
      `${facts.states.join(', ')}.`,
  },
  {
    q: 'Where is Kaushal Banginwar based?',
    a: `${person.name} is based in ${person.city}, ${person.region}, ${person.country}.`,
  },
  {
    q: 'What does Kaushal Banginwar study?',
    a: `He is pursuing a ${person.education.degree} at ${person.education.school} (batch ${person.education.batch}) while running Bizleap.`,
  },
  {
    q: 'Which businesses and ventures is Kaushal Banginwar involved in?',
    a:
      `Bizleap (digital marketing agency), Banginwar Marketing (agriculture retail business), AAI (AI software and products), ` +
      `Aswaad by Vijaye (restaurant venture) and a Modicare franchise network of ${facts.networkMembers.toLocaleString('en-US')}+ members that he started at age ${facts.networkStartAge}.`,
  },
  {
    q: 'Where has Kaushal Banginwar spoken?',
    a:
      `He has delivered ${facts.institutionsSpoken}+ talks at institutions including Amity University, Symbiosis International ` +
      `and the Raisoni Group of Institutions, on digital marketing, entrepreneurship, AI in marketing and youth leadership.`,
  },
  {
    q: 'How can I contact Kaushal Banginwar?',
    a: `Email ${email}, or reach him on LinkedIn (${social.linkedin}) and Instagram (${social.instagram}).`,
  },
];
