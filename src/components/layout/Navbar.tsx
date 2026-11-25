import { useState, type MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NAV_ITEMS } from '../../config/site';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

interface NavbarProps {
  activeSection: string;
  isScrolled: boolean;
}

export function Navbar({ activeSection, isScrolled }: NavbarProps) {
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    event.preventDefault();
    setMenuOpen(false);

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
    <nav className={`navbar${isScrolled ? ' scrolled' : ''}`} aria-label="Main navigation">
      <div className="nav-container">
        <a
          href="#home"
          className="nav-logo"
          aria-label="Kawin P Home"
          onClick={(e) => handleLinkClick(e, '#home', 'home')}
        >
          <span className="logo-text">PK</span>
          <span className="logo-dot" />
        </a>

        <ul className={`nav-menu${menuOpen ? ' active' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className={`nav-link${activeSection === item.id && location.pathname === '/' ? ' active' : ''}`}
                onClick={(e) => handleLinkClick(e, item.href, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle"
            id="themeToggle"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDark}
            onClick={toggleTheme}
          >
            <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`nav-toggle${menuOpen ? ' active' : ''}`}
            id="navToggle"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className="hamburger" />
          </button>
        </div>
      </div>
    </nav>
  );
}
