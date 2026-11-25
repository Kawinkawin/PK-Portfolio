import { SITE_CONFIG } from './siteConfig';

export interface PageSEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const BASE = SITE_CONFIG.baseUrl;

/** Per-page SEO metadata — every route must have a unique entry */
export const SEO_CONFIG = {
  home: {
    title: `Kawin P | AI & Data Science Engineer | Web Developer Portfolio`,
    description:
      'Kawin P (Kawin Prabhakaran) — AI & Data Science Engineer and Web Developer. B.Tech student at Sri Eshwar College of Engineering. Specializing in Machine Learning, Deep Learning, NLP, React.js, and Full-Stack Development. Currently AIML Engineer at Teceze Ltd.',
    keywords: [
      'Kawin P',
      'Kawin Prabhakaran',
      'AI Data Science Engineer',
      'Web Developer Portfolio',
      'Machine Learning Engineer',
      'Deep Learning',
      'NLP Engineer',
      'React Developer',
      'Python Developer',
      'Full Stack Developer',
      'AIML Engineer Teceze',
      'Sri Eshwar College of Engineering',
      'B.Tech AI Data Science',
      'Coimbatore developer',
      'Market Mind AI',
      'Arogyam.ai',
    ],
    canonicalPath: '/',
    ogTitle: 'Kawin P — AI & Data Science Engineer | Portfolio',
    ogDescription:
      'Explore the portfolio of Kawin P, an AI & Data Science Engineer and Web Developer specializing in Machine Learning, Deep Learning, NLP, and Full-Stack Development.',
    ogImage: SITE_CONFIG.defaultOgImage,
  } satisfies PageSEOConfig,

  notFound: {
    title: '404 — Page Not Found | Kawin P Portfolio',
    description: 'The requested page does not exist. Return to the Kawin P portfolio homepage.',
    keywords: [],
    canonicalPath: '/404',
    noIndex: true,
  } satisfies PageSEOConfig,
} as const;

/** Resolve the full canonical URL for a given path */
export function getCanonicalUrl(path: string = '/'): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${cleanPath}`;
}
