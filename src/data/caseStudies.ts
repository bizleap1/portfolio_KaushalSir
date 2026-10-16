export interface CaseStudy {
  id: number;
  /** url-safe id, used for #anchors on the case-studies page */
  slug: string;
  title: string;
  category: string;
  desc: string;
  tags: string[];
  image: string;
  imageWidth: number;
  imageHeight: number;
  /**
   * OPTIONAL — add real proof here and the /case-studies/ page renders it automatically.
   * (Numbers, client quotes and screenshots are the strongest ranking + conversion assets.)
   */
  results?: string[];
  quote?: { text: string; author: string };
}

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    slug: 'solar-manufacturing-linkedin-strategy',
    title: 'Solar Manufacturing LinkedIn Strategy',
    category: 'B2B Tech',
    desc: 'Developed LinkedIn content plan for solar manufacturing client. Corporate-focused messaging targeting decision-makers. Positioned brand as industry thought leader.',
    tags: ['B2B', 'LinkedIn', 'Thought Leadership'],
    image: '/case_study_solar.webp',
    imageWidth: 1024,
    imageHeight: 1024,
  },
  {
    id: 2,
    slug: 'healthcare-dental-practice-video-series',
    title: 'Healthcare Dental Practice Video Series',
    category: 'Healthcare',
    desc: 'Produced educational video content for dental professionals. Focused on visual storytelling and audience engagement. Built trust through informative, value-driven content.',
    tags: ['Video Marketing', 'Storytelling', 'Trust Building'],
    image: '/case_study_dental.webp',
    imageWidth: 1024,
    imageHeight: 1024,
  },
  {
    id: 3,
    slug: 'hospitality-resort-travel-marketing',
    title: 'Hospitality Resort & Travel Marketing',
    category: 'Hospitality',
    desc: 'Created SEO-driven content for Papillon India (tours & travel). Developed 3-month social media plans for resort properties. Integrated content marketing with direct booking funnels.',
    tags: ['SEO', 'Conversion', 'Booking Funnels'],
    image: '/case_study_resort.webp',
    imageWidth: 1024,
    imageHeight: 1024,
  },
  {
    id: 4,
    slug: 'automotive-nexa-cars-social-media-growth',
    title: 'Automotive Nexa Cars - Social Media Growth',
    category: 'Automotive',
    desc: 'Managed social media for Nexa dealership in Yavatmal district. Developed comprehensive content strategy aligned with brand guidelines. Delivered consistent lead generation through targeted campaigns.',
    tags: ['Social Media', 'Lead Gen', 'Content Strategy'],
    image: '/case_study_auto.webp',
    imageWidth: 1024,
    imageHeight: 1024,
  },
];
