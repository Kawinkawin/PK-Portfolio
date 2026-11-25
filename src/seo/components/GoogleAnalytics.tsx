import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { env } from '../../config/env';
import { initGoogleAnalytics, trackPageView } from '../analytics/googleAnalytics';

interface GoogleAnalyticsProps {
  measurementId?: string;
}

/**
 * Initializes GA4 when a Measurement ID is configured and tracks SPA navigation.
 */
export function GoogleAnalytics({ measurementId = env.gaMeasurementId }: GoogleAnalyticsProps) {
  const location = useLocation();

  useEffect(() => {
    if (!measurementId) {
      return;
    }

    const initialized = initGoogleAnalytics(measurementId);
    if (!initialized) {
      return;
    }

    const pagePath = `${location.pathname}${location.search}${location.hash}`;
    trackPageView(measurementId, pagePath, document.title);
  }, [measurementId, location.pathname, location.search, location.hash]);

  return null;
}
