/**
 * Barrel export for the seo/ module.
 * Import SEO primitives from '@/seo' (or relative path) throughout the app.
 */
export { SEOHead } from './components/SEOHead';
export { StructuredData } from './components/StructuredData';
export { GoogleAnalytics } from './components/GoogleAnalytics';
export { initGoogleAnalytics, trackPageView, trackEvent } from './analytics/googleAnalytics';
export { SITE_CONFIG } from './config/siteConfig';
export { SEO_CONFIG, getCanonicalUrl } from './config/seoConfig';
export { buildPersonSchema } from './schemas/personSchema';
export { buildWebSiteSchema } from './schemas/websiteSchema';
export { buildProfilePageSchema } from './schemas/webpageSchema';
export { buildProjectsSchema } from './schemas/projectSchemas';
