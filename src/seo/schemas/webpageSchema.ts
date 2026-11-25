import { SITE_CONFIG } from '../config/siteConfig';

/**
 * schema.org/ProfilePage — homepage as a profile page
 * https://schema.org/ProfilePage
 */
export function buildProfilePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_CONFIG.baseUrl}/#profilepage`,
    name: "Kawin P's Portfolio",
    description:
      'Professional portfolio of Kawin P — AI & Data Science Engineer, Web Developer, and B.Tech student at Sri Eshwar College of Engineering.',
    url: `${SITE_CONFIG.baseUrl}/`,
    inLanguage: 'en-IN',
    dateModified: '2026-11-25',
    isPartOf: {
      '@id': `${SITE_CONFIG.baseUrl}/#website`,
    },
    about: {
      '@id': `${SITE_CONFIG.baseUrl}/#person`,
    },
    mainEntity: {
      '@id': `${SITE_CONFIG.baseUrl}/#person`,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_CONFIG.baseUrl}/`,
        },
      ],
    },
  };
}
