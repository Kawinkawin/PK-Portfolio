import { Link } from 'react-router-dom';
import { CONTACT_DETAILS, SOCIAL_LINKS } from '../../config/site';
import {
  SEOHead,
  StructuredData,
  SEO_CONFIG,
  SITE_CONFIG,
  buildPersonSchema,
  getCanonicalUrl,
} from '../../seo';
import './AboutPage.css';

const ABOUT_PAGE_SCHEMAS = [
  buildPersonSchema(),
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SITE_CONFIG.baseUrl}/about#aboutpage`,
    url: getCanonicalUrl('/about'),
    name: SEO_CONFIG.about.title,
    description: SEO_CONFIG.about.description,
    mainEntity: {
      '@id': `${SITE_CONFIG.baseUrl}/#person`,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: getCanonicalUrl('/'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'About Kawin Prabhakaran',
          item: getCanonicalUrl('/about'),
        },
      ],
    },
  },
];

export function AboutPage() {
  const githubUrl = SOCIAL_LINKS.find((s) => s.id === 'github')?.href ?? SITE_CONFIG.socials.github;
  const linkedinUrl =
    SOCIAL_LINKS.find((s) => s.id === 'linkedin')?.href ?? SITE_CONFIG.socials.linkedin;

  return (
    <>
      <SEOHead {...SEO_CONFIG.about} />
      <StructuredData schemas={ABOUT_PAGE_SCHEMAS} />

      <article className="about-page" itemScope itemType="https://schema.org/Person">
        <div className="container">
          <header className="about-page-header">
            <nav className="about-page-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>About</span>
            </nav>

            <h1 className="about-page-title" itemProp="name">
              Kawin Prabhakaran (Kawin P)
            </h1>
            <p className="about-page-subtitle" itemProp="description">
              I am <strong itemProp="alternateName">Kawin P</strong> (
              <strong>Kawin Prabhakaran</strong>), an{' '}
              <strong itemProp="jobTitle">AI &amp; Data Science Engineer and Web Developer</strong>{' '}
              currently working as an AIML Engineer at Teceze Ltd and pursuing my B.Tech in
              Artificial Intelligence &amp; Data Science at Sri Eshwar College of Engineering,
              Coimbatore.
            </p>
          </header>

          <div className="about-page-grid">
            <section className="about-page-card">
              <h2>Who I Am &amp; What I Do</h2>
              <p>
                I design and build intelligent, data-driven applications that combine Machine
                Learning, Deep Learning, Natural Language Processing (NLP), and modern Full-Stack
                Web Development. Previously, I gained hands-on industry experience as a Data Science
                Intern at V3 Analytics and a Django Framework Intern at RV Tech Learn.
              </p>
            </section>

            <section className="about-page-card">
              <h2>Areas of Expertise &amp; Technologies</h2>
              <ul>
                <li>
                  <strong>AI &amp; Machine Learning:</strong> Machine Learning, Deep Learning, NLP,
                  Computer Vision, Generative AI, LLMs, RAG pipelines, PyTorch, BERT, T5, LSTM,
                  Vision Transformers (ViT)
                </li>
                <li>
                  <strong>Web &amp; Backend:</strong> React.js, TypeScript, Python, Flask, Django,
                  ExpressJS, Flutter, Streamlit
                </li>
                <li>
                  <strong>Data &amp; Cloud:</strong> MongoDB, MySQL, Docker, AWS Cloud, Google
                  Cloud, Power BI, Tableau, n8n
                </li>
              </ul>
            </section>

            <section className="about-page-card">
              <h2>Featured Projects</h2>
              <ul>
                <li>
                  <Link to="/projects/market-mind-ai">Market Mind AI</Link> — Multimodal stock
                  market assistant with LLM-driven RAG pipelines and CNN diagnostics.
                </li>
                <li>
                  <Link to="/projects/arogyam-ai">Arogyam.ai</Link> — Personalized healthcare AI
                  advisor with multilingual chat and ML consultation support.
                </li>
                <li>
                  <Link to="/projects/surveillance-vit">
                    Surveillance System using Vision Transformers
                  </Link>{' '}
                  — Real-time object detection and activity monitoring using ViT.
                </li>
                <li>
                  <Link to="/projects/ai-speech-therapy-game">AI Speech Therapy Game</Link> —
                  Gamified speech therapy with real-time AI feedback.
                </li>
              </ul>
            </section>

            <section className="about-page-card">
              <h2>Where to Find My Work &amp; Contact</h2>
              <ul>
                <li>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${CONTACT_DETAILS.email}`}>{CONTACT_DETAILS.email}</a>
                </li>
                <li>
                  <strong>GitHub:</strong>{' '}
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    github.com/Kawinkawin
                  </a>
                </li>
                <li>
                  <strong>LinkedIn:</strong>{' '}
                  <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                    linkedin.com/in/kawin-prahakaran
                  </a>
                </li>
              </ul>
            </section>
          </div>

          <div className="about-page-actions">
            <Link to="/#projects" className="btn btn-primary">
              <span>Explore All Projects</span>
              <i className="fas fa-arrow-right" aria-hidden="true" />
            </Link>
            <Link to="/#contact" className="btn btn-secondary">
              <span>Contact Kawin Prabhakaran</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
