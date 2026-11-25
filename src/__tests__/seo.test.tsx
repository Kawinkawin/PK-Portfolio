import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { beforeEach, describe, expect, it } from 'vitest';
import { SEOHead, SEO_CONFIG, initGoogleAnalytics, trackPageView } from '../seo';

describe('Google Analytics & Search Console SEO Configuration', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
    const win = window as unknown as {
      dataLayer?: unknown[];
      gtag?: unknown;
      __gaInitializedId?: string;
    };
    delete win.dataLayer;
    delete win.gtag;
    delete win.__gaInitializedId;
  });

  it('does not initialize GA4 when Measurement ID is empty or invalid', () => {
    expect(initGoogleAnalytics('')).toBe(false);
    expect(initGoogleAnalytics('invalid-id')).toBe(false);
    expect(document.querySelector('script[data-ga-id]')).toBeNull();
  });

  it('initializes GA4 script and records page views when valid Measurement ID is provided', () => {
    const initialized = initGoogleAnalytics('G-TEST12345');
    expect(initialized).toBe(true);

    const script = document.querySelector<HTMLScriptElement>('script[data-ga-id="G-TEST12345"]');
    expect(script).not.toBeNull();
    expect(script?.src).toContain('https://www.googletagmanager.com/gtag/js?id=G-TEST12345');
    expect(script?.async).toBe(true);

    trackPageView('G-TEST12345', '/#projects', 'Projects');
    const win = window as unknown as { dataLayer?: unknown[][] };
    expect(Array.isArray(win.dataLayer)).toBe(true);
    expect(win.dataLayer?.length).toBeGreaterThanOrEqual(3);
  });

  it('renders google-site-verification meta tag when token is provided', async () => {
    render(
      <HelmetProvider>
        <SEOHead {...SEO_CONFIG.home} googleSiteVerification="test-gsc-token-123" />
      </HelmetProvider>
    );

    await waitFor(() => {
      const meta = document.querySelector('meta[name="google-site-verification"]');
      expect(meta).not.toBeNull();
      expect(meta?.getAttribute('content')).toBe('test-gsc-token-123');
    });
  });

  it('omits google-site-verification meta tag when token is empty', async () => {
    render(
      <HelmetProvider>
        <SEOHead {...SEO_CONFIG.home} googleSiteVerification="" />
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(document.title).toBe(SEO_CONFIG.home.title);
    });
    expect(document.querySelector('meta[name="google-site-verification"]')).toBeNull();
  });
});
