import { Helmet } from 'react-helmet-async';
import { env } from '../../config/env';
import { SITE_CONFIG } from '../config/siteConfig';
import { getCanonicalUrl, type PageSEOConfig } from '../config/seoConfig';

interface SEOHeadProps extends PageSEOConfig {
  googleSiteVerification?: string;
}

/**
 * SEOHead — injects all page-level meta tags via react-helmet-async.
 * Place this inside each page component (HomePage, NotFoundPage, etc.).
 */
export function SEOHead({
  title,
  description,
  keywords,
  canonicalPath,
  ogTitle,
  ogDescription,
  ogImage,
  noIndex = false,
  googleSiteVerification = env.gscVerification,
}: SEOHeadProps) {
  const canonical = getCanonicalUrl(canonicalPath);
  const resolvedOgTitle = ogTitle ?? title;
  const resolvedOgDescription = ogDescription ?? description;
  const resolvedOgImage = ogImage ?? SITE_CONFIG.defaultOgImage;
  const keywordsString = keywords.join(', ');

  return (
    <Helmet>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywordsString && <meta name="keywords" content={keywordsString} />}
      <meta name="author" content={SITE_CONFIG.author.name} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      {googleSiteVerification && (
        <meta name="google-site-verification" content={googleSiteVerification} />
      )}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_CONFIG.siteName} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDescription} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="400" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={resolvedOgTitle} />
      <meta name="twitter:description" content={resolvedOgDescription} />
      <meta name="twitter:image" content={resolvedOgImage} />
      {SITE_CONFIG.twitterHandle && (
        <meta name="twitter:creator" content={`@${SITE_CONFIG.twitterHandle}`} />
      )}

      {/* Additional */}
      <meta name="theme-color" content="#6366f1" />
      <meta name="color-scheme" content="dark light" />
    </Helmet>
  );
}
