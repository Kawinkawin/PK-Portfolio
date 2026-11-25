import { useEffect, useState, type RefObject } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export function useCountUp(
  target: number,
  containerRef: RefObject<HTMLElement | null>,
  durationMs = 2000
): number {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState<number>(() => (prefersReducedMotion ? target : 0));

  useEffect(() => {
    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    const element = containerRef.current;
    if (!element) {
      return;
    }

    let animationFrameId = 0;
    let hasTriggered = false;

    const startAnimation = () => {
      if (hasTriggered) return;
      hasTriggered = true;

      const step = target / (durationMs / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          setValue(Math.floor(current));
          animationFrameId = window.requestAnimationFrame(updateCounter);
        } else {
          setValue(target);
        }
      };

      animationFrameId = window.requestAnimationFrame(updateCounter);
    };

    if (typeof IntersectionObserver === 'undefined') {
      startAnimation();
      return () => {
        if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            startAnimation();
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, containerRef, durationMs, prefersReducedMotion]);

  return value;
}
