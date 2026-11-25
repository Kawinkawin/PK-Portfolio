import { useEffect, useState } from 'react';

interface ScrollState {
  activeSection: string;
  isScrolled: boolean;
  showBackToTop: boolean;
}

export function useScrollNavigation(sectionIds: string[]): ScrollState {
  const [state, setState] = useState<ScrollState>({
    activeSection: sectionIds[0] ?? 'home',
    isScrolled: false,
    showBackToTop: false,
  });

  useEffect(() => {
    let rafId = 0;

    const updateOnScroll = () => {
      rafId = 0;
      const scrollY = window.pageYOffset || window.scrollY || 0;
      const isScrolled = scrollY > 50;
      const showBackToTop = scrollY > 500;

      let currentSection = sectionIds[0] ?? 'home';
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const sectionTop = element.offsetTop;
          if (scrollY >= sectionTop - 200) {
            currentSection = id;
          }
        }
      }

      setState((prev) => {
        if (
          prev.activeSection === currentSection &&
          prev.isScrolled === isScrolled &&
          prev.showBackToTop === showBackToTop
        ) {
          return prev;
        }
        return {
          activeSection: currentSection,
          isScrolled,
          showBackToTop,
        };
      });
    };

    const handleScroll = () => {
      if (rafId === 0) {
        rafId = window.requestAnimationFrame(updateOnScroll);
      }
    };

    updateOnScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [sectionIds]);

  return state;
}
