/**
 * Google Analytics 4 (GA4) integration for SPA routing.
 * Safe no-op when VITE_GA_MEASUREMENT_ID is not configured.
 */

type GtagCommand = 'js' | 'config' | 'event';

interface GtagWindow extends Window {
  dataLayer?: unknown[];
  gtag?: (command: GtagCommand, target: string | Date, params?: Record<string, unknown>) => void;
  __gaInitializedId?: string;
}

const GA_MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/i;

function getGtagWindow(): GtagWindow | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return window as GtagWindow;
}

/**
 * Dynamically loads gtag.js and configures GA4 once for the given Measurement ID.
 */
export function initGoogleAnalytics(measurementId: string): boolean {
  const win = getGtagWindow();
  const trimmedId = measurementId.trim();

  if (!win || !trimmedId || !GA_MEASUREMENT_ID_PATTERN.test(trimmedId)) {
    return false;
  }

  if (win.__gaInitializedId === trimmedId) {
    return true;
  }

  win.dataLayer = win.dataLayer || [];
  if (!win.gtag) {
    win.gtag = function gtag(...args: unknown[]) {
      win.dataLayer?.push(args);
    };
  }

  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[data-ga-id="${trimmedId}"]`
  );
  if (!existingScript) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(trimmedId)}`;
    script.dataset.gaId = trimmedId;
    document.head.appendChild(script);
  }

  win.gtag('js', new Date());
  win.gtag('config', trimmedId, {
    send_page_view: false,
  });
  win.__gaInitializedId = trimmedId;

  return true;
}

/**
 * Records a page_view event in GA4 for SPA route / hash transitions.
 */
export function trackPageView(measurementId: string, path: string, title?: string): void {
  const win = getGtagWindow();
  const trimmedId = measurementId.trim();

  if (!win?.gtag || !trimmedId || win.__gaInitializedId !== trimmedId) {
    return;
  }

  win.gtag('event', 'page_view', {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
  });
}

/**
 * Records a custom GA4 event (e.g., resume_download, contact_form_submit).
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  const win = getGtagWindow();
  if (!win?.gtag || !win.__gaInitializedId) {
    return;
  }

  win.gtag('event', eventName, params);
}
