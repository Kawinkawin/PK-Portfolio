/**
 * Portfolio Interactive Features
 * ================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initParticles();
    initNavbar();
    initTypingEffect();
    initScrollAnimations();
    initSkillBars();
    initCounters();
    initThemeToggle();
    initSmoothScroll();
    initBackToTop();
    initContactForm();
    initCardTilt();
    initCertificationsScroll();
    initProjectsCarousel();
    initExperienceModal();
});

/**
 * Particle Background
 * ================================
 */
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    // Check for touch device (disable on mobile)
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
        canvas.style.display = 'none';
        return;
    }

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        const particleCount = Math.min(Math.floor(window.innerWidth / 10), 80);

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    let mouseX = 0;
    let mouseY = 0;
    let mouseActive = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        mouseActive = true;
    }, { passive: true });

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const particleColor = isDark ? '255, 255, 255' : '99, 102, 241';

        particles.forEach((particle, i) => {
            // Update position automatically
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;

            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`;
            ctx.fill();

            // Draw connections (limit to every 5th particle for performance)
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

            // Mouse interaction (optional - particles move slightly away from cursor)
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

            // Keep velocity in check (gentle damping)
            const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (speed > 1.5) {
                particle.vx = (particle.vx / speed) * 1.5;
                particle.vy = (particle.vy / speed) * 1.5;
            } else if (speed < 0.3) {
                particle.vx = (particle.vx / speed) * 0.3;
                particle.vy = (particle.vy / speed) * 0.3;
            }
        });

        animationId = requestAnimationFrame(drawParticles);
    }

    // Initialize
    resize();
    createParticles();
    drawParticles();

    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resize();
            createParticles();
        }, 200);
    }, { passive: true });

    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            drawParticles();
        }
    });
}

/**
 * Navbar Scroll Effect
 * ================================
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Update active link based on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

/**
 * Typing Effect
 * ================================
 */
function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const phrases = [
        'AI & Data Science Enthusiast',
        'Machine Learning Developer',
        'Full Stack Developer',
        'Problem Solver'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/**
 * Scroll Animations
 * ================================
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger skill bars if in skills section
                if (entry.target.closest('.skills')) {
                    triggerSkillBars();
                }

                // Trigger counters if in hero section
                if (entry.target.closest('.hero')) {
                    triggerCounters();
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.timeline-item, .project-card, .skill-item, .cert-card, .achievement-card').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Skill Bars Animation
 * ================================
 */
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        const percent = item.getAttribute('data-percent');
        if (percent) {
            item.style.setProperty('--percent', `${percent}%`);
        }
    });
}

function triggerSkillBars() {
    document.querySelectorAll('.skill-item').forEach(item => {
        item.classList.add('visible');
    });
}

/**
 * Certifications Stacked Cards Scroll Animation
 * ================================
 */
function initCertificationsScroll() {
    const cards = document.querySelectorAll('.stack-card');
    if (cards.length === 0) return;

    // Check if CSS scroll-timeline is supported
    const supportsScrollTimeline = CSS.supports('animation-timeline', 'scroll()');

    if (supportsScrollTimeline) {
        // Modern browsers - CSS handles the animation
        return;
    }

    // Fallback for older browsers using IntersectionObserver + scroll
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const card = entry.target;

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
    }, observerOptions);

    cards.forEach(card => cardObserver.observe(card));

    // Smooth scroll-linked parallax effect
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateCardsOnScroll(cards);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    function updateCardsOnScroll(cards) {
        const viewportCenter = window.innerHeight / 2;

        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            const distanceFromCenter = cardCenter - viewportCenter;

            // Calculate scroll progress (-1 to 1)
            const progress = Math.max(-1, Math.min(1, distanceFromCenter / (window.innerHeight * 0.3)));

            if (progress < -0.3) {
                // Card is above viewport - scale down slightly
                const exitProgress = Math.min(1, Math.abs(progress) - 0.3);
                card.style.transform = `scale(${1 - exitProgress * 0.05}) translateY(${-exitProgress * 10}px)`;
                card.style.zIndex = `${10 + index}`;
            } else if (progress > 0.5) {
                // Card is below viewport - slide up
                const enterProgress = Math.min(1, (progress - 0.5) * 2);
                card.style.transform = `translateY(${enterProgress * 60}px) scale(${1 - enterProgress * 0.03})`;
                card.style.zIndex = `${20 - index}`;
            } else {
                // Card is active/centered
                card.style.transform = 'scale(1) translateY(0)';
                card.style.zIndex = `${30 + index}`;
            }
        });
    }

    // Initial update
    updateCardsOnScroll(cards);
}

/**
 * Counter Animation
 * ================================
 */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let triggered = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !triggered) {
                triggered = true;
                triggerCounters();
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function triggerCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

/**
 * Theme Toggle
 * ================================
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const icon = themeToggle.querySelector('i');

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

/**
 * Smooth Scroll
 * ================================
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Back to Top Button
 * ================================
 */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Contact Form
 * ================================
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = 'var(--secondary)';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
            }, 2000);
        }, 1500);
    });
}

/**
 * Card Tilt Effect
 * ================================
 */
function initCardTilt() {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

/**
 * Glitch Effect (for hero name)
 * ================================
 */
const glitchText = document.querySelector('.glitch');
if (glitchText) {
    glitchText.addEventListener('mouseover', () => {
        glitchText.style.animation = 'none';
        setTimeout(() => {
            glitchText.style.animation = '';
        }, 10);
    });
}

/**
 * Prefers Reduced Motion
 * ================================
 */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations
    document.documentElement.style.setProperty('--transition', 'none');
    document.querySelectorAll('.floating-icons i').forEach(icon => {
        icon.style.animation = 'none';
    });
}

/**
 * Projects Carousel
 * ================================
 */
function initProjectsCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('projectPrev');
    const nextBtn = document.getElementById('projectNext');
    const dotsContainer = document.getElementById('carouselDots');
    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

    const originalCards = Array.from(track.children);
    const originalCount = originalCards.length;
    let currentIndex = 0;
    let autoPlayInterval = null;
    let visibleCount = getVisibleCount();
    let isTransitioning = false;

    // Determine how many cards are visible based on viewport
    function getVisibleCount() {
        const w = window.innerWidth;
        if (w <= 768) return 1;
        if (w <= 1024) return 2;
        return 3;
    }

    // Clone nodes for seamless infinite scrolling
    function setupClones() {
        Array.from(track.querySelectorAll('.clone')).forEach(c => c.remove());
        
        // Append clones to end
        const clonesToAppend = originalCards.slice(0, visibleCount).map(c => {
            const cl = c.cloneNode(true);
            cl.classList.add('clone');
            cl.setAttribute('aria-hidden', 'true');
            cl.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
            return cl;
        });
        track.append(...clonesToAppend);
        
        // Prepend clones to start
        const clonesToPrepend = originalCards.slice(-visibleCount).map(c => {
            const cl = c.cloneNode(true);
            cl.classList.add('clone');
            cl.setAttribute('aria-hidden', 'true');
            cl.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
            return cl;
        });
        track.prepend(...clonesToPrepend);
    }

    // Build dot indicators
    function buildDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < originalCount; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                if (isTransitioning) return;
                currentIndex = i;
                updateCarousel();
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        }
    }

    // Update the carousel position
    function updateCarousel(instant = false) {
        const gapPx = 24; // 1.5rem = 24px
        const cardWidth = originalCards[0].offsetWidth;
        const structuralIndex = currentIndex + visibleCount;
        const offset = structuralIndex * (cardWidth + gapPx);

        if (instant) {
            track.style.transition = 'none';
        } else {
            track.style.transition = '';
            isTransitioning = true;
        }

        track.style.transform = `translateX(-${offset}px)`;

        if (instant) {
            track.offsetHeight; // Force reflow
        } else {
            // Wait for transition to complete, then snap if out of bounds
            setTimeout(() => {
                isTransitioning = false;
                if (currentIndex >= originalCount) {
                    currentIndex = 0;
                    updateCarousel(true);
                } else if (currentIndex < 0) {
                    currentIndex = originalCount - 1;
                    updateCarousel(true);
                }
            }, 600); // 600ms matches CSS transition
        }

        // Update dots logic securely bounding the visual index
        let dotIndex = currentIndex;
        if (dotIndex < 0) dotIndex = originalCount - 1;
        if (dotIndex >= originalCount) dotIndex = 0;

        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === dotIndex);
        });
    }

    // Navigation
    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        currentIndex--;
        updateCarousel();
        resetAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        currentIndex++;
        updateCarousel();
        resetAutoPlay();
    });

    // Auto-play: advance one card every 4s, loop back
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            if (!isTransitioning) {
                currentIndex++;
                updateCarousel();
            }
        }, 4000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    track.addEventListener('mouseleave', () => startAutoPlay());

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoPlayInterval);
    }, { passive: true });
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50 && !isTransitioning) {
            if (diff > 0) {
                currentIndex++;
            } else {
                currentIndex--;
            }
            updateCarousel();
        }
        startAutoPlay();
    }, { passive: true });

    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const newVisible = getVisibleCount();
            if (newVisible !== visibleCount) {
                visibleCount = newVisible;
                setupClones();
                updateCarousel(true);
            } else {
                updateCarousel(true); // Ensure width changes perfectly
            }
        }, 200);
    }, { passive: true });

    // Initialize
    setupClones();
    buildDots();
    updateCarousel(true);
    startAutoPlay();
}

/**
 * Experience Modal
 * ================================
 */
function initExperienceModal() {
    const tiles = document.querySelectorAll('.exp-tile');
    const overlay = document.getElementById('expModalOverlay');
    const closeBtn = document.getElementById('expModalClose');
    if (!overlay || tiles.length === 0) return;

    const modalIcon = document.getElementById('expModalIcon');
    const modalRole = document.getElementById('expModalRole');
    const modalCompany = document.getElementById('expModalCompany');
    const modalDuration = document.getElementById('expModalDuration');
    const modalList = document.getElementById('expModalList');
    const modalTechs = document.getElementById('expModalTechs');

    function openModal(tile) {
        const role = tile.dataset.role;
        const company = tile.dataset.company;
        const duration = tile.dataset.duration;
        const iconClass = tile.dataset.icon;
        const details = JSON.parse(tile.dataset.details || '[]');
        const techs = JSON.parse(tile.dataset.techs || '[]');

        // Set icon
        modalIcon.innerHTML = `<i class="${iconClass}"></i>`;

        // Set text
        modalRole.textContent = role;
        modalCompany.textContent = company;
        modalDuration.textContent = duration;

        // Set list
        modalList.innerHTML = details.map(d => `<li>${d}</li>`).join('');

        // Set tech tags
        if (techs.length > 0) {
            modalTechs.innerHTML = '<h4 style="width:100%;margin-bottom:0.5rem;font-size:0.875rem;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:var(--text-light);">Tech Stack</h4>' +
                techs.map(t => `<span class="tech-tag">${t}</span>`).join('');
        } else {
            modalTechs.innerHTML = '';
        }

        // Show modal
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Click tiles to open
    tiles.forEach(tile => {
        tile.addEventListener('click', () => openModal(tile));
    });

    // Close button
    closeBtn.addEventListener('click', closeModal);

    // Click overlay background to close
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeModal();
        }
    });
}
