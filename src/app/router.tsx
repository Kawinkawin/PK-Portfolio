import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { HomePage } from '../pages/Home/HomePage';
import { GoogleAnalytics } from '../seo';

const NotFoundPage = lazy(() =>
  import('../pages/NotFound/NotFoundPage').then((module) => ({
    default: module.NotFoundPage,
  }))
);

function RouteFallback() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-secondary)',
      }}
      role="status"
      aria-live="polite"
    >
      Loading...
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <GoogleAnalytics />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/index.html" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
