import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export function useTypingEffect(phrases: readonly string[]): string {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [text, setText] = useState<string>(() => (prefersReducedMotion ? (phrases[0] ?? '') : ''));

  useEffect(() => {
    if (phrases.length === 0) return;

    if (prefersReducedMotion) {
      setText(phrases[0]);
      return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timerId: number | undefined;

    const tick = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        charIndex = Math.max(0, charIndex - 1);
        setText(currentPhrase.substring(0, charIndex));
      } else {
        charIndex = Math.min(currentPhrase.length, charIndex + 1);
        setText(currentPhrase.substring(0, charIndex));
      }

      let delay = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        delay = 2000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 500;
      }

      timerId = window.setTimeout(tick, delay);
    };

    timerId = window.setTimeout(tick, 100);

    return () => {
      if (timerId !== undefined) {
        window.clearTimeout(timerId);
      }
    };
  }, [phrases, prefersReducedMotion]);

  return text;
}
