import { SITE_CONFIG } from '../config/siteConfig';

/**
 * schema.org/Person — Kawin P
 * https://schema.org/Person
 */
export function buildPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_CONFIG.baseUrl}/#person`,
    name: SITE_CONFIG.author.fullName,
    alternateName: SITE_CONFIG.author.name,
    jobTitle: SITE_CONFIG.author.jobTitle,
    description: SITE_CONFIG.author.description,
    url: SITE_CONFIG.author.url,
    image: {
      '@type': 'ImageObject',
      url: SITE_CONFIG.author.image,
      width: 400,
      height: 400,
    },
    email: SITE_CONFIG.author.email,
    telephone: SITE_CONFIG.author.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Coimbatore',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: SITE_CONFIG.author.alumniOf,
      url: 'https://www.sece.ac.in',
    },
    worksFor: {
      '@type': 'Organization',
      name: SITE_CONFIG.author.worksFor,
    },
    knowsAbout: [
      'Machine Learning',
      'Deep Learning',
      'Natural Language Processing',
      'Artificial Intelligence',
      'Data Science',
      'React.js',
      'Python',
      'Flask',
      'Docker',
      'AWS',
      'Computer Vision',
      'Large Language Models',
      'Generative AI',
      'Full Stack Development',
    ],
    sameAs: [SITE_CONFIG.socials.github, SITE_CONFIG.socials.linkedin],
  };
}
