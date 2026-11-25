import { SITE_CONFIG } from '../config/siteConfig';

/**
 * schema.org/WebSite with SearchAction (Sitelinks Searchbox eligibility)
 * https://schema.org/WebSite
 */
export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.baseUrl}/#website`,
    name: SITE_CONFIG.siteName,
    url: SITE_CONFIG.baseUrl,
    description:
      'Official portfolio website of Kawin P — AI & Data Science Engineer and Web Developer.',
    author: {
      '@id': `${SITE_CONFIG.baseUrl}/#person`,
    },
    inLanguage: 'en-IN',
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@id': `${SITE_CONFIG.baseUrl}/#person`,
    },
  };
}
