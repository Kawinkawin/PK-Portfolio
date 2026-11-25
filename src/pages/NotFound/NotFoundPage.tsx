import { Link } from 'react-router-dom';
import { SEOHead, SEO_CONFIG } from '../../seo';
import './NotFoundPage.css';

export function NotFoundPage() {
  return (
    <>
      <SEOHead {...SEO_CONFIG.notFound} />
      <section className="not-found-section">
        <div className="not-found-card">
          <span className="not-found-code">404</span>
          <h1>Page Not Found</h1>
          <p>The page you requested does not exist or may have been moved.</p>
          <Link to="/" className="btn btn-primary">
            <i className="fas fa-arrow-left" aria-hidden="true" />
            <span>Back to Portfolio</span>
          </Link>
        </div>
      </section>
    </>
  );
}
