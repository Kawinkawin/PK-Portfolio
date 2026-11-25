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
    title: 'Kawin Prabhakaran | AI/ML Engineer | Generative AI, RAG & MCP',
    description:
      "Explore Kawin Prabhakaran's portfolio — an AI/ML Engineer building Generative AI applications, RAG systems, LLM integrations, MCP-based workflows, and Python backend solutions.",
    keywords: [
      'Kawin Prabhakaran',
      'Kawin P',
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
    ogTitle: 'Kawin Prabhakaran (Kawin P) | AI & Data Science Engineer | Official Portfolio',
    ogDescription:
      'Explore the official portfolio of Kawin Prabhakaran (Kawin P), an AI & Data Science Engineer specializing in Machine Learning, Deep Learning, NLP, and Full-Stack Development.',
    ogImage: SITE_CONFIG.defaultOgImage,
  } satisfies PageSEOConfig,

  about: {
    title: 'About Kawin Prabhakaran (Kawin P) | AI & Data Science Engineer',
    description:
      'Learn about Kawin Prabhakaran (Kawin P), an AI & Data Science Engineer at Teceze Ltd and B.Tech AI & DS student at Sri Eshwar College of Engineering. Explore his expertise, projects, and background.',
    keywords: [
      'About Kawin Prabhakaran',
      'Kawin P biography',
      'AI & Data Science Engineer',
      'Teceze Ltd AIML Engineer',
      'Sri Eshwar College of Engineering',
    ],
    canonicalPath: '/about',
    ogTitle: 'About Kawin Prabhakaran (Kawin P) | AI & Data Science Engineer',
    ogDescription:
      'Professional biography of Kawin Prabhakaran (Kawin P) — AI & Data Science Engineer, Web Developer, and B.Tech AI & DS student.',
    ogImage: SITE_CONFIG.defaultOgImage,
  } satisfies PageSEOConfig,

  notFound: {
    title: '404 — Page Not Found | Kawin Prabhakaran Portfolio',
    description:
      'The requested page does not exist. Return to the Kawin Prabhakaran (Kawin P) portfolio homepage.',
    keywords: [],
    canonicalPath: '/404',
    noIndex: true,
  } satisfies PageSEOConfig,
} as const;

export function getProjectSeoConfig(project: {
  id: string;
  title: string;
  description: string;
  techStack: string[];
}): PageSEOConfig {
  return {
    title: `${project.title} | Project by Kawin Prabhakaran (Kawin P)`,
    description: `${project.description} Built by Kawin Prabhakaran using ${project.techStack.join(', ')}.`,
    keywords: [
      project.title,
      'Kawin Prabhakaran',
      'Kawin P',
      ...project.techStack,
      'AI Project',
      'Portfolio Project',
    ],
    canonicalPath: `/projects/${project.id}`,
    ogTitle: `${project.title} — Kawin Prabhakaran`,
    ogDescription: project.description,
    ogImage: SITE_CONFIG.defaultOgImage,
  };
}

/** Resolve the full canonical URL for a given path */
export function getCanonicalUrl(path: string = '/'): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${cleanPath}`;
}
