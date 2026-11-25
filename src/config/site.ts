import { env } from './env';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface HeroStat {
  id: string;
  target: number;
  label: string;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  iconClass: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'internships', label: 'Experience', href: '#internships' },
  { id: 'education', label: 'Education', href: '#education' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'certifications', label: 'Certifications', href: '#certifications' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const FOOTER_LINKS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'internships', label: 'Experience', href: '#internships' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const TYPING_PHRASES: string[] = [
  'AI/ML Engineer',
  'Generative AI Developer',
  'LLM Application Developer',
  'RAG & MCP Engineer',
];

export const HERO_STATS: HeroStat[] = [
  { id: 'leetcode', target: 300, label: 'LeetCode Problems' },
  { id: 'codechef', target: 180, label: 'CodeChef Solutions' },
  { id: 'certifications', target: 6, label: 'Certifications' },
];

export const CONTACT_DETAILS = {
  email: env.contactEmail,
  phoneDisplay: '+91 99949 68155',
  phoneHref: 'tel:+919994968155',
  resumeUrl: env.resumeUrl,
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/Kawinkawin',
    iconClass: 'fab fa-github',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kawin-prahakaran/',
    iconClass: 'fab fa-linkedin-in',
  },
  {
    id: 'leetcode',
    label: 'LeetCode',
    href: '#',
    iconClass: 'fas fa-code',
  },
];
