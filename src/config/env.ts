export const env = {
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://portfolio.kawinprabhakaran.online',
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || 'kawinprabha08@gmail.com',
  resumeUrl:
    import.meta.env.VITE_RESUME_URL ||
    'https://drive.google.com/file/d/1KO7HutVhAmtQRTJVL02phgwwNfBS5nxG/view?usp=drive_link',
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT || '',
  gaMeasurementId: (import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim(),
  gscVerification: (import.meta.env.VITE_GSC_VERIFICATION || '').trim(),
} as const;
