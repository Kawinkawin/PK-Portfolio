import type { MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FOOTER_LINKS } from '../../config/site';
import './Footer.css';

export function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleFooterClick = (event: MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    event.preventDefault();
    if (location.pathname !== '/') {
      navigate(`/${href}`);
      return;
    }
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-text">PK</span>
            <p>Building the future with AI</p>
          </div>
          <div className="footer-links">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleFooterClick(e, link.href, link.id)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Kawin P. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
