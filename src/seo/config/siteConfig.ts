/**
 * Centralized site configuration for SEO, AEO, and structured data.
 * All values are sourced from real portfolio content — never fabricated.
 */

export const SITE_CONFIG = {
  /** Canonical domain (no trailing slash) */
  baseUrl: 'https://kawinprabhakaran.online',

  /** Site name used in OG / Twitter titles */
  siteName: "Kawin P's Portfolio",

  /** Primary author */
  author: {
    name: 'Kawin P',
    fullName: 'Kawin Prabhakaran',
    jobTitle: 'AI & Data Science Engineer | Web Developer',
    description:
      'B.Tech AI & Data Science student at Sri Eshwar College of Engineering, currently working as AIML Engineer at Teceze Ltd. Specializing in Machine Learning, Deep Learning, NLP, and Full-Stack Development.',
    email: 'kawinprabha08@gmail.com',
    phone: '+91 99949 68155',
    image: 'https://kawinprabhakaran.online/assets/image.png',
    url: 'https://kawinprabhakaran.online',
    alumniOf: 'Sri Eshwar College of Engineering',
    worksFor: 'Teceze Ltd',
    location: 'Coimbatore, Tamil Nadu, India',
  },

  /** Social profiles (sameAs for schema.org Person) */
  socials: {
    github: 'https://github.com/Kawinkawin',
    linkedin: 'https://www.linkedin.com/in/kawin-prahakaran/',
  },

  /** Default OG / Twitter image (1200×630 recommended) */
  defaultOgImage: 'https://kawinprabhakaran.online/assets/image.png',

  /** Default meta keywords */
  defaultKeywords: [
    'Kawin P',
    'Kawin Prabhakaran',
    'AI & Data Science Engineer',
    'Machine Learning',
    'Deep Learning',
    'NLP',
    'Full Stack Developer',
    'React Developer',
    'Python Developer',
    'Portfolio',
    'Sri Eshwar College of Engineering',
    'Teceze',
  ],

  /** Twitter handle (optional — set to empty string if none) */
  twitterHandle: '',
} as const;

export type SiteConfig = typeof SITE_CONFIG;
