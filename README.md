# Kawin P — Portfolio (React + TypeScript)

Enterprise-grade React + TypeScript migration of Kawin P's personal portfolio website, preserving 100% of the original visual design, animations, responsiveness, and interactive features while adopting a modular, feature-oriented architecture.

## Tech Stack

- **Framework**: React 19 + TypeScript (strict mode)
- **Build Tool**: Vite 6
- **Routing**: React Router DOM v7 (`BrowserRouter`, lazy-loaded 404 route)
- **Forms & Validation**: React Hook Form + Zod (`@hookform/resolvers`)
- **Icons**: Font Awesome 6 Free (`@fortawesome/fontawesome-free`)
- **Testing**: Vitest + React Testing Library + Playwright
- **Code Quality**: ESLint 9 + Prettier

## Project Structure

```text
src/
├── app/                   # App shell, providers, and router
├── components/
│   ├── common/            # ErrorBoundary, ParticleCanvas, BackToTop
│   └── layout/            # MainLayout, Navbar, Footer
├── config/                # Typed env config and site constants
├── context/               # ThemeContext (dark/light mode state)
├── features/              # Feature-oriented modules (hero, about, experience, education, projects, skills, certifications, achievements, contact)
├── hooks/                 # Custom hooks (typing effect, count-up, scroll navigation, reduced motion)
├── pages/                 # HomePage, NotFoundPage
├── services/              # Contact submission service
├── storage/               # Safe localStorage theme persistence
├── styles/                # Design tokens (variables.css), reset.css, globals.css
└── __tests__/             # Vitest + React Testing Library test suite
```

## Getting Started

### Prerequisites

- Node.js `>= 20`
- npm `>= 10`

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and adjust values if needed:

```bash
cp .env.example .env
```

- `VITE_SITE_URL`: Canonical site URL
- `VITE_CONTACT_EMAIL`: Contact mailto address
- `VITE_RESUME_URL`: External resume download URL
- `VITE_CONTACT_ENDPOINT`: Optional HTTP POST endpoint for contact form submissions (when empty, uses the built-in simulated confirmation flow matching the original app)
- `VITE_GA_MEASUREMENT_ID`: Optional Google Analytics 4 Measurement ID (e.g., `G-XXXXXXXXXX`). When set, `<GoogleAnalytics />` loads `gtag.js`, tracks SPA route/hash views, and records `resume_download` / `contact_form_submit` events.
- `VITE_GSC_VERIFICATION`: Optional Google Search Console HTML tag verification token. When set, `<SEOHead />` injects `<meta name="google-site-verification" content="..." />`.

### Development Server

```bash
npm run dev
```

### Testing & Verification

```bash
npm run typecheck      # TypeScript strict checking
npm run lint           # ESLint checks
npm run format:check   # Prettier formatting check
npm test               # Vitest unit & integration suite
npm run test:e2e       # Playwright browser tests (requires Playwright browsers)
```

### Production Build & Deployment

```bash
npm run build          # Typechecks and builds optimized assets to dist/
npm run preview        # Previews the production build locally
```

The `public/CNAME` and `public/assets/image.png` files are copied automatically into `dist/` during `npm run build` for static hosting (e.g., GitHub Pages, Netlify, Vercel, or Cloudflare Pages).

## Migration Summary (Original HTML/CSS/JS → React)

| Original Feature | React Implementation |
| --- | --- |
| Particle background (`#particleCanvas`) | `ParticleCanvas` component with canvas loop, mouse interaction, touch detection, reduced-motion guard, and visibility pause/cleanup |
| Fixed navbar, scroll highlight & mobile drawer | `Navbar` + `useScrollNavigation` hook with React Router navigation |
| Dark/Light theme toggle + `localStorage` | `ThemeContext` + `themeStorage.ts` syncing `data-theme` attribute |
| Hero glitch text, typing effect & counters | `HeroSection` + `useTypingEffect` + `useCountUp` hooks |
| About card & floating tech icons | `AboutSection` with modular CSS |
| Experience timeline tiles & detail modal | `ExperienceSection` + `ExperienceModal` (keyboard Escape, backdrop click, scroll lock cleanup) |
| Academic background grid | `EducationSection` |
| Infinite-loop projects carousel | `ProjectsSection` with declarative clone slides, auto-play, hover pause, touch swipe, and dots |
| Technical skills & tools grid | `SkillsSection` |
| Scroll-stacked certification cards (01–09) | `CertificationsSection` with CSS `scroll()` timeline & IntersectionObserver/scroll fallback |
| Achievements grid | `AchievementsSection` |
| Contact info & floating-label form | `ContactSection` with React Hook Form + Zod + `contactService` |
| Back to top button & Footer | `BackToTop` + `Footer` in `MainLayout` |
| Fallback routing | `NotFoundPage` (`*`) with link back to `/` |

## Known Limitations

- The original contact form simulated message delivery client-side without a backend endpoint. That behavior is preserved by default unless `VITE_CONTACT_ENDPOINT` is configured in `.env`.
- Two original project entries (`Dream-PDF` and `Text-Summarizer`), `Arogyam.ai` demo link, and the `LeetCode` social link used `#` placeholder URLs in the original HTML; these are preserved with non-jumping click handling (`preventDefault`) so they do not disrupt navigation.

## SEO, AEO & Search Discoverability

This portfolio includes a centralized SEO and Answer Engine Optimization (AEO) architecture under `src/seo/` alongside static crawler files in `public/`:

- **Metadata Management (`src/seo/components/SEOHead.tsx`)**: Powered by `react-helmet-async`, injecting per-route `<title>`, meta description, keywords, canonical URLs, Open Graph, Twitter Card, and `robots` directives (`noindex, nofollow` on 404).
- **Centralized Config (`src/seo/config/`)**:
  - `siteConfig.ts`: Canonical base URL (`https://portfolio.kawinprabhakaran.online`), author details, social profiles, and default OG image.
  - `seoConfig.ts`: Per-page metadata definitions (`SEO_CONFIG.home`, `SEO_CONFIG.notFound`) and `getCanonicalUrl()` helper.
- **JSON-LD Structured Data (`src/seo/schemas/` & `StructuredData.tsx`)**:
  - `Person` (`personSchema.ts`): Name, job title, affiliation (`Teceze Ltd`, `Sri Eshwar College of Engineering`), skills (`knowsAbout`), and `sameAs` links.
  - `WebSite` (`websiteSchema.ts`): Site identity and authorship.
  - `ProfilePage` (`webpageSchema.ts`): Main profile page entity and `BreadcrumbList`.
  - `SoftwareSourceCode` (`projectSchemas.ts`): Structured metadata for all 6 featured projects.
- **Crawler & AI Discovery Files (`public/`)**:
  - `public/robots.txt`: Explicitly permits search and AI crawlers (`Googlebot`, `Bingbot`, `GPTBot`, `ChatGPT-User`, `Claude-Web`, `PerplexityBot`, etc.) and references the sitemap.
  - `public/sitemap.xml`: Canonical homepage and section anchor URLs.
  - `public/llms.txt`: Structured, factual markdown summary for LLM-based answer engines following the `llmstxt.org` convention.

### Validating & Submitting Search Metadata

- **Google Analytics 4 (GA4)**:
  1. Create a GA4 Web Data Stream for `https://portfolio.kawinprabhakaran.online` and copy its `G-...` Measurement ID.
  2. Set `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX` in your `.env` (or hosting provider environment variables) and rebuild.
- **Google Search Console (GSC)**:
  1. Add `https://portfolio.kawinprabhakaran.online` (or domain property `kawinprabhakaran.online`) in Google Search Console.
  2. Choose **HTML tag** verification, copy the `content` token, set `VITE_GSC_VERIFICATION=<token>` in `.env`, and deploy (or verify via DNS TXT record / placing Google's verification HTML file in `public/`).
  3. Submit `https://portfolio.kawinprabhakaran.online/sitemap.xml` under **Indexing → Sitemaps** in Google Search Console and Bing Webmaster Tools.
- **Schema Validation**: Validate rendered JSON-LD at [Schema.org Validator](https://validator.schema.org/) or Google's [Rich Results Test](https://search.google.com/test/rich-results).
