import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import './AboutSection.css';

interface FloatingIcon {
  iconClass: string;
  delay: string;
}

interface HighlightItem {
  iconClass: string;
  label: string;
}

const FLOATING_ICONS: FloatingIcon[] = [
  { iconClass: 'fab fa-python', delay: '0s' },
  { iconClass: 'fas fa-database', delay: '0.5s' },
  { iconClass: 'fas fa-robot', delay: '1s' },
  { iconClass: 'fas fa-code', delay: '1.5s' },
];

const HIGHLIGHTS: HighlightItem[] = [
  { iconClass: 'fas fa-briefcase', label: 'AI/ML Engineer at Teceze Ltd' },
  { iconClass: 'fas fa-graduation-cap', label: 'B.Tech AI & DS Graduate (2022–2026)' },
  { iconClass: 'fas fa-robot', label: 'RAG, LLM & MCP Integrations' },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="about"
      aria-label="About Kawin P — AI & Data Science Engineer"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="container">
        <div className="section-header">
          <span className="section-tag">About Me</span>
          <h2 className="section-title">Who I Am</h2>
        </div>

        <div className="about-content">
          <div className="about-visual">
            <div className="about-card">
              <div className="card-glow" />
              <div className="card-content">
                <i className="fas fa-brain" aria-hidden="true" />
                <h3>AI/ML Engineer</h3>
                <p>B.Tech AI &amp; DS Graduate</p>
              </div>
            </div>
            <div className="floating-icons" aria-hidden="true">
              {FLOATING_ICONS.map((icon) => (
                <i
                  key={icon.iconClass}
                  className={icon.iconClass}
                  style={{ '--delay': icon.delay } as CSSProperties}
                />
              ))}
            </div>
          </div>

          <div className="about-text">
            <p className="about-intro" itemProp="description">
              I am an <strong>Artificial Intelligence and Data Science graduate</strong> currently
              working as an <strong>AI/ML Engineer</strong>. My work focuses on developing practical
              AI applications, integrating Large Language Models into software systems, and building
              intelligent workflows that solve real-world problems.
            </p>
            <p className="about-body">
              I have hands-on experience developing Retrieval-Augmented Generation (RAG)
              applications, experimenting with Model Context Protocol (MCP) integrations,
              implementing AI-powered solutions, and building Python-based backend systems. Beyond
              AI development, I have worked on application integration, workflow automation,
              database-driven platforms, data analysis, and predictive modelling.
            </p>

            <div className="about-highlights">
              {HIGHLIGHTS.map((item) => (
                <div key={item.label} className="highlight-item">
                  <i className={item.iconClass} aria-hidden="true" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px' }}>
              <Link to="/about" className="btn btn-outline">
                <span>Read Full Biography</span>
                <i className="fas fa-arrow-right" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
