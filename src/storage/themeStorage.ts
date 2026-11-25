export type ThemeMode = 'light' | 'dark';

const THEME_STORAGE_KEY = 'theme';

export function getStoredTheme(): ThemeMode | null {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
    return null;
  } catch {
    return null;
  }
}

export function setStoredTheme(theme: ThemeMode): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore storage errors in restricted browsing modes
  }
}
