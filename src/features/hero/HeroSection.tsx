import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { CONTACT_DETAILS, HERO_STATS, TYPING_PHRASES, type HeroStat } from '../../config/site';
import { useCountUp } from '../../hooks/useCountUp';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import { trackEvent } from '../../seo';
import './HeroSection.css';

interface StatItemProps {
  stat: HeroStat;
}

function StatCounter({ stat }: StatItemProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const count = useCountUp(stat.target, ref);

  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-number" data-target={stat.target}>
        {count}
      </span>
      <span className="stat-label">{stat.label}</span>
    </div>
  );
}

export function HeroSection() {
  const typedText = useTypingEffect(TYPING_PHRASES);
  const [glitchPaused, setGlitchPaused] = useState(false);
  const glitchTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (glitchTimerRef.current !== undefined) {
        window.clearTimeout(glitchTimerRef.current);
      }
    };
  }, []);

  const handleGlitchHover = () => {
    setGlitchPaused(true);
    if (glitchTimerRef.current !== undefined) {
      window.clearTimeout(glitchTimerRef.current);
    }
    glitchTimerRef.current = window.setTimeout(() => {
      setGlitchPaused(false);
    }, 10);
  };

  const handleScrollToProjects = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById('projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-pulse" />
          <span>Available for Opportunities</span>
        </div>

        <h1 className="hero-title">
          <span className="title-line">Hi, I&apos;m</span>
          <span
            className={`title-name glitch${glitchPaused ? ' glitch-reset' : ''}`}
            data-text="Kawin P"
            onMouseEnter={handleGlitchHover}
          >
            Kawin P
          </span>
          <span className="sr-only"> - Web Developer, AI &amp; Data Science Engineer</span>
        </h1>

        <div className="hero-typing" aria-live="polite">
          <span id="typingText">{typedText}</span>
          <span className="cursor" aria-hidden="true">
            |
          </span>
        </div>

        <p className="hero-description">
          AI &amp; Data Science enthusiast crafting intelligent solutions. Specializing in Machine
          Learning, Deep Learning, and Full-Stack Development with a passion for turning data into
          actionable insights.
        </p>

        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary" onClick={handleScrollToProjects}>
            <span>View My Work</span>
            <i className="fas fa-arrow-right" aria-hidden="true" />
          </a>
          <a href={`mailto:${CONTACT_DETAILS.email}`} className="btn btn-secondary">
            <i className="fas fa-envelope" aria-hidden="true" />
            <span>Get In Touch</span>
          </a>
          <a
            href={CONTACT_DETAILS.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            onClick={() => trackEvent('resume_download', { location: 'hero' })}
          >
            <i className="fas fa-download" aria-hidden="true" />
            <span>Download Resume</span>
          </a>
        </div>

        <div className="hero-stats">
          {HERO_STATS.map((stat) => (
            <StatCounter key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
