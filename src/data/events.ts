import { facts } from './site.ts';

export interface SpeakingEvent {
  id: number;
  title: string;
  role: string;
  topic: string;
  desc: string;
}

export const events: SpeakingEvent[] = [
  {
    id: 1,
    title: 'Amity University',
    role: 'Guest Speaker',
    topic: 'Digital Marketing & Entrepreneurship',
    desc: 'Addressed aspiring entrepreneurs on building scalable digital agencies and mastering the fundamentals of relationship management.',
  },
  {
    id: 2,
    title: 'Symbiosis International',
    role: 'Keynote Speaker',
    topic: 'The Future of AI in Marketing',
    desc: 'Discussed the intersection of artificial intelligence and marketing strategy, and how upcoming tools will democratize access to high-level marketing.',
  },
  {
    id: 3,
    title: 'Raisoni Group of Institutions',
    role: 'Panelist',
    topic: 'Youth Leadership & Business Execution',
    desc: `Shared personal journey from a ${facts.networkStartAge}-year-old networker to leading a ${facts.teamSize}+ person agency, emphasizing that execution is everything.`,
  },
];

export const speakingPhoto = {
  src: '/kaushal-banginwar-speaking.webp',
  width: 1200,
  height: 901,
  alt: 'Kaushal Banginwar delivering a talk at a podium, wearing a black suit and tie',
};
