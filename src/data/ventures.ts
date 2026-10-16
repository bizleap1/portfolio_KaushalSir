import { facts } from './site.ts';

export interface Venture {
  id: number;
  title: string;
  type: string;
  desc: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
}

export const ventures: Venture[] = [
  {
    id: 1,
    title: 'Bizleap',
    type: 'Digital Marketing Agency',
    desc: `A specialized team of ${facts.teamSize}+ professionals scaling brands across diverse sectors.`,
    image: '/bizleap_bg.webp',
    imageWidth: 1024,
    imageHeight: 1024,
  },
  {
    id: 2,
    title: 'Banginwar Marketing',
    type: 'Agriculture Business',
    desc: 'Modernizing agriculture through strategic retail and agritech marketing.',
    image: '/banginwar_bg.webp',
    imageWidth: 1024,
    imageHeight: 1024,
  },
  {
    id: 3,
    title: 'AAI',
    type: 'AI Software & Product',
    desc: 'Building next-gen AI tools designed for marketing precision and automation.',
    image: '/aai_bg.webp',
    imageWidth: 1024,
    imageHeight: 1024,
  },
  {
    id: 4,
    // NOTE: spelling unified to "Aswaad by Vijaye" (timeline spelling). Confirm the official brand spelling.
    title: 'Aswaad by Vijaye',
    type: 'Restaurant Venture',
    desc: 'Redefining gourmet experiences through premium storytelling and hospitality.',
    image: '/asaawad_bg.webp',
    imageWidth: 1024,
    imageHeight: 1024,
  },
  {
    id: 5,
    title: 'Modicare',
    type: 'Franchised Business Network',
    desc: `Leading a massive distribution network of ${facts.networkMembers.toLocaleString('en-US')}+ individuals, focused on self-growth and sales operations.`,
    image: '/modicare_bg.webp',
    imageWidth: 1024,
    imageHeight: 1024,
  },
];
