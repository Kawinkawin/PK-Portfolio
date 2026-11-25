import type { CSSProperties } from 'react';
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
  { iconClass: 'fas fa-award', label: 'Best Paper Award Winner' },
  { iconClass: 'fas fa-trophy', label: 'National Hackathon Participant' },
  { iconClass: 'fas fa-certificate', label: '6 Professional Certifications' },
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
                <h3>AI &amp; DS</h3>
                <p>B.Tech Student</p>
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
              I&apos;m a passionate <strong>Web Developer</strong> and{' '}
              <strong>AI &amp; Data Science Engineer</strong> at Sri Eshwar College of Engineering,
              with hands-on experience in building intelligent, accessible, and high-performance
              applications.
            </p>
            <p className="about-body">
              My expertise spans from developing predictive machine learning models to architecting
              robust full-stack web applications using cutting-edge technologies like LLMs, NLP, and
              Deep Learning algorithms. I&apos;ve gained practical industry experience interning at
              V3 Analytics and RV Tech Learn, translating complex data into actionable business
              intelligence and functional digital experiences.
            </p>

            <div className="about-highlights">
              {HIGHLIGHTS.map((item) => (
                <div key={item.label} className="highlight-item">
                  <i className={item.iconClass} aria-hidden="true" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
