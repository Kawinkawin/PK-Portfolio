import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PROJECTS } from './data';
import type { ProjectItem } from './types';
import './ProjectsSection.css';

function getVisibleCount(): number {
  if (typeof window === 'undefined') return 3;
  const w = window.innerWidth;
  if (w <= 768) return 1;
  if (w <= 1024) return 2;
  return 3;
}

interface ProjectCardProps {
  project: ProjectItem;
  isClone?: boolean;
  cardRef?: (el: HTMLElement | null) => void;
}

function ProjectCard({ project, isClone = false, cardRef }: ProjectCardProps) {
  const placeholderClass =
    project.variant === 'default'
      ? 'project-placeholder'
      : `project-placeholder ${project.variant}`;

  const renderActionLink = (url: string, title: string, iconClass: string) => {
    const isPlaceholder = url === '#';
    return (
      <a
        href={url}
        className="project-link"
        title={isPlaceholder ? `${title} (Link unavailable)` : title}
        aria-label={`${project.title} - ${title}`}
        target={isPlaceholder ? undefined : '_blank'}
        rel={isPlaceholder ? undefined : 'noopener noreferrer'}
        tabIndex={isClone ? -1 : undefined}
        onClick={(event) => {
          if (isPlaceholder) {
            event.preventDefault();
          }
        }}
      >
        <i className={iconClass} aria-hidden="true" />
      </a>
    );
  };

  return (
    <article
      ref={cardRef}
      className={`project-card${isClone ? ' clone' : ''}`}
      aria-hidden={isClone ? 'true' : undefined}
    >
      <div className="project-image">
        <div className={placeholderClass}>
          <i className={project.iconClass} aria-hidden="true" />
        </div>
        <div className="project-overlay">
          <div className="project-links">
            {renderActionLink(project.demoUrl, 'View Demo', 'fas fa-external-link-alt')}
            {renderActionLink(project.codeUrl, 'View Code', 'fab fa-github')}
          </div>
        </div>
      </div>

      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tech">
          {project.techStack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const originalCount = PROJECTS.length;
  const [visibleCount, setVisibleCount] = useState<number>(getVisibleCount);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [instantMove, setInstantMove] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [translatePx, setTranslatePx] = useState<number>(0);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstOriginalCardRef = useRef<HTMLElement | null>(null);
  const touchStartXRef = useRef<number>(0);
  const transitionTimerRef = useRef<number | undefined>(undefined);

  const setFirstCardRef = useCallback((el: HTMLElement | null) => {
    firstOriginalCardRef.current = el;
  }, []);

  const slides = useMemo(() => {
    const prepend = PROJECTS.slice(-visibleCount).map((p, idx) => ({
      key: `prepend-${p.id}-${idx}`,
      project: p,
      isClone: true,
      isFirstOriginal: false,
    }));
    const originals = PROJECTS.map((p, idx) => ({
      key: p.id,
      project: p,
      isClone: false,
      isFirstOriginal: idx === 0,
    }));
    const append = PROJECTS.slice(0, visibleCount).map((p, idx) => ({
      key: `append-${p.id}-${idx}`,
      project: p,
      isClone: true,
      isFirstOriginal: false,
    }));
    return [...prepend, ...originals, ...append];
  }, [visibleCount]);

  const computeOffset = useCallback(() => {
    const cardEl = firstOriginalCardRef.current;
    const trackEl = trackRef.current;
    if (!cardEl || !trackEl) return;

    const computedGap = parseFloat(window.getComputedStyle(trackEl).gap || '24');
    const gapPx = Number.isFinite(computedGap) ? computedGap : 24;
    const cardWidth = cardEl.offsetWidth;
    const structuralIndex = currentIndex + visibleCount;
    setTranslatePx(structuralIndex * (cardWidth + gapPx));
  }, [currentIndex, visibleCount]);

  useEffect(() => {
    computeOffset();
  }, [computeOffset]);

  useEffect(() => {
    let resizeTimer: number | undefined;
    const handleResize = () => {
      if (resizeTimer !== undefined) {
        window.clearTimeout(resizeTimer);
      }
      resizeTimer = window.setTimeout(() => {
        const nextVisible = getVisibleCount();
        setInstantMove(true);
        setVisibleCount((prev) => (prev !== nextVisible ? nextVisible : prev));
        computeOffset();
      }, 200);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimer !== undefined) {
        window.clearTimeout(resizeTimer);
      }
    };
  }, [computeOffset]);

  const moveSlide = useCallback(
    (nextIndex: number) => {
      if (isTransitioning) return;
      setInstantMove(false);
      setIsTransitioning(true);
      setCurrentIndex(nextIndex);

      if (transitionTimerRef.current !== undefined) {
        window.clearTimeout(transitionTimerRef.current);
      }

      transitionTimerRef.current = window.setTimeout(() => {
        setIsTransitioning(false);
        if (nextIndex >= originalCount) {
          setInstantMove(true);
          setCurrentIndex(0);
        } else if (nextIndex < 0) {
          setInstantMove(true);
          setCurrentIndex(originalCount - 1);
        }
      }, 600);
    },
    [isTransitioning, originalCount]
  );

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== undefined) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const intervalId = window.setInterval(() => {
      if (!isTransitioning) {
        moveSlide(currentIndex + 1);
      }
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, [isPaused, isTransitioning, currentIndex, moveSlide]);

  let activeDotIndex = currentIndex;
  if (activeDotIndex < 0) activeDotIndex = originalCount - 1;
  if (activeDotIndex >= originalCount) activeDotIndex = 0;

  return (
    <section
      id="projects"
      className="projects"
      aria-label="Kawin P's Featured AI and Web Development Projects"
    >
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Projects</span>
          <h2 className="section-title">Featured Work</h2>
        </div>

        <div className="projects-carousel-wrapper">
          <button
            type="button"
            className="carousel-btn carousel-prev"
            id="projectPrev"
            aria-label="Previous project"
            onClick={() => moveSlide(currentIndex - 1)}
          >
            <i className="fas fa-chevron-left" aria-hidden="true" />
          </button>

          <div className="projects-carousel" id="projectsCarousel">
            <div
              ref={trackRef}
              className={`carousel-track${instantMove ? ' no-transition' : ''}`}
              id="carouselTrack"
              style={{ transform: `translateX(-${translatePx}px)` }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={(e) => {
                touchStartXRef.current = e.changedTouches[0].screenX;
                setIsPaused(true);
              }}
              onTouchEnd={(e) => {
                const touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartXRef.current - touchEndX;
                if (Math.abs(diff) > 50 && !isTransitioning) {
                  moveSlide(diff > 0 ? currentIndex + 1 : currentIndex - 1);
                }
                setIsPaused(false);
              }}
            >
              {slides.map((slide) => (
                <ProjectCard
                  key={slide.key}
                  project={slide.project}
                  isClone={slide.isClone}
                  cardRef={slide.isFirstOriginal ? setFirstCardRef : undefined}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            className="carousel-btn carousel-next"
            id="projectNext"
            aria-label="Next project"
            onClick={() => moveSlide(currentIndex + 1)}
          >
            <i className="fas fa-chevron-right" aria-hidden="true" />
          </button>
        </div>

        <div className="carousel-dots" id="carouselDots" role="tablist" aria-label="Project slides">
          {PROJECTS.map((project, index) => (
            <button
              key={project.id}
              type="button"
              className={`carousel-dot${index === activeDotIndex ? ' active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeDotIndex ? 'true' : undefined}
              onClick={() => {
                if (!isTransitioning) {
                  moveSlide(index);
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
