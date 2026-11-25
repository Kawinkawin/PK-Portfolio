import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isDark } = useTheme();
  const isDarkRef = useRef<boolean>(isDark);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const isTouchDevice =
      typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
      canvas.style.display = 'none';
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationId = 0;
    let resizeTimeout: number | undefined;
    let mouseX = 0;
    let mouseY = 0;
    let mouseActive = false;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth / 10), 80);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particleColor = isDarkRef.current ? '255, 255, 255' : '99, 102, 241';

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`;
        ctx.fill();

        if (i % 5 === 0) {
          for (let j = i + 1; j < particles.length; j += 5) {
            const dx = particles[j].x - particle.x;
            const dy = particles[j].y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(${particleColor}, ${0.1 * (1 - distance / 100)})`;
              ctx.stroke();
            }
          }
        }

        if (mouseActive) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const force = (120 - distance) / 120;
            particle.vx -= dx * 0.0005 * force;
            particle.vy -= dy * 0.0005 * force;
          }
        }

        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (speed > 1.5) {
          particle.vx = (particle.vx / speed) * 1.5;
          particle.vy = (particle.vy / speed) * 1.5;
        } else if (speed < 0.3 && speed > 0) {
          particle.vx = (particle.vx / speed) * 0.3;
          particle.vy = (particle.vy / speed) * 0.3;
        }
      });

      animationId = window.requestAnimationFrame(drawParticles);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;
    };

    const handleResize = () => {
      if (resizeTimeout !== undefined) {
        window.clearTimeout(resizeTimeout);
      }
      resizeTimeout = window.setTimeout(() => {
        resize();
        createParticles();
      }, 200);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(animationId);
      } else {
        animationId = window.requestAnimationFrame(drawParticles);
      }
    };

    resize();
    createParticles();
    drawParticles();

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.cancelAnimationFrame(animationId);
      if (resizeTimeout !== undefined) {
        window.clearTimeout(resizeTimeout);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      id="particleCanvas"
      aria-label="Interactive particle background"
      role="img"
    />
  );
}
