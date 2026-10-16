import { facts } from './site.ts';

export interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

export const timeline: TimelineItem[] = [
  {
    year: '2018',
    title: `Age ${facts.networkStartAge}: Modicare franchise`,
    desc: `Launched Modicare franchise while in 10th standard. Built a network of ${facts.networkMembers.toLocaleString('en-US')}+ distributors and learned the fundamentals of relationship management, sales operations, and business execution.`,
  },
  {
    year: '2019',
    title: 'Started Marketing Journey',
    desc: 'Began freelance marketing work while continuing studies. Started learning the digital ecosystem—social media, content strategy, and brand positioning.',
  },
  {
    year: '2020',
    title: 'Professional Certifications',
    desc: 'Earned certifications across LinkedIn, Instagram, and Facebook marketing platforms. Committed to mastering the craft, not just learning surface-level tactics.',
  },
  {
    year: String(facts.foundedYear),
    title: 'Founded Bizleap',
    desc: 'Launched Bizleap as a full-service digital marketing agency. Started with solo projects, gradually building a team of passionate marketers and strategists.',
  },
  {
    year: '2023',
    title: `Scaled to ${facts.teamSize}+ Members`,
    desc: `Grew Bizleap into a ${facts.teamSize}+ member team, building long-term brand partnerships across automotive, hospitality, healthcare, and startup sectors.`,
  },
  {
    year: '2024',
    title: 'Public Speaking & Education',
    desc: `Delivered ${facts.institutionsSpoken}+ speaking engagements at prestigious institutions. Shared insights on digital marketing, entrepreneurship, and building scalable businesses.`,
  },
  {
    year: '2025',
    title: 'Expanding to Content Creation',
    desc: 'Launching educational content initiatives to make high-level marketing strategies accessible to aspiring entrepreneurs. Democratizing knowledge, not gatekeeping it.',
  },
  {
    year: '2026',
    title: 'AAI',
    desc: 'Expansion into advanced AI integrated marketing solutions and institutional partnerships.',
  },
  {
    year: '2026',
    title: 'Aswaad by Vijaye',
    desc: 'Collaborative venture focusing on premium brand storytelling and gourmet visual narratives.',
  },
];
