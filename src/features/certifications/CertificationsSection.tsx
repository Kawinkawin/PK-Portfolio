import { useEffect, useRef, type CSSProperties } from 'react';
import { CERTIFICATIONS } from './data';
import './CertificationsSection.css';

export function CertificationsSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardRefs.current.filter((card): card is HTMLDivElement => card !== null);
    if (cards.length === 0) return;

    const supportsScrollTimeline =
      typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('animation-timeline', 'scroll()');

    if (supportsScrollTimeline) {
      return;
    }

    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const card = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              card.classList.add('active');
              card.classList.remove('passed');
            } else {
              const rect = entry.boundingClientRect;
              if (rect.top < 0) {
                card.classList.add('passed');
                card.classList.remove('active');
              } else {
                card.classList.remove('passed');
              }
            }
          });
        },
        {
          root: null,
          rootMargin: '-20% 0px -60% 0px',
          threshold: 0,
        }
      );

      cards.forEach((card) => observer?.observe(card));
    }

    let ticking = false;
    const updateCardsOnScroll = () => {
      const viewportCenter = window.innerHeight / 2;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distanceFromCenter = cardCenter - viewportCenter;
        const progress = Math.max(-1, Math.min(1, distanceFromCenter / (window.innerHeight * 0.3)));

        if (progress < -0.3) {
          const exitProgress = Math.min(1, Math.abs(progress) - 0.3);
          card.style.transform = `scale(${1 - exitProgress * 0.05}) translateY(${-exitProgress * 10}px)`;
          card.style.zIndex = `${10 + index}`;
        } else if (progress > 0.5) {
          const enterProgress = Math.min(1, (progress - 0.5) * 2);
          card.style.transform = `translateY(${enterProgress * 60}px) scale(${1 - enterProgress * 0.03})`;
          card.style.zIndex = `${20 - index}`;
        } else {
          card.style.transform = 'scale(1) translateY(0)';
          card.style.zIndex = `${30 + index}`;
        }
      });
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateCardsOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateCardsOnScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="certifications" className="certifications-stacked">
      <div className="sticky-header">
        <span className="section-tag">Certifications</span>
        <h2 className="section-title">Credentials</h2>
        <p className="scroll-hint">
          <i className="fas fa-arrow-down" aria-hidden="true" /> Scroll to explore
        </p>
      </div>

      <div className="cards-container">
        {CERTIFICATIONS.map((cert, index) => (
          <div
            key={cert.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="stack-card"
            style={{ '--index': index } as CSSProperties}
          >
            <div className="card-inner">
              <div className="card-visual">
                <div className="card-number">{cert.number}</div>
                <div className="card-icon-large">
                  <i className={cert.iconClass} aria-hidden="true" />
                </div>
                <div className="card-glow" />
              </div>

              <div className="card-content">
                <div className="card-meta">
                  <span className="card-year">{cert.year}</span>
                  <span className="card-org">{cert.organization}</span>
                </div>
                <h3 className="card-title">{cert.title}</h3>
                <p className="card-desc">
                  {cert.description}
                  {cert.credentialUrl && (
                    <>
                      <br />
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="credential-link"
                      >
                        <i className="fas fa-external-link-alt" aria-hidden="true" /> Show
                        credential
                      </a>
                    </>
                  )}
                </p>
                <div className="card-tags">
                  {cert.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="stack-spacer" />
      </div>
    </section>
  );
}
