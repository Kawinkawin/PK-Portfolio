import type { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { ThemeProvider } from '../context/ThemeContext';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ThemeProvider>{children}</ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}
