import { Link, useParams } from 'react-router-dom';
import { PROJECTS } from '../../features/projects/data';
import { NotFoundPage } from '../NotFound/NotFoundPage';
import {
  SEOHead,
  StructuredData,
  SITE_CONFIG,
  getCanonicalUrl,
  getProjectSeoConfig,
} from '../../seo';
import './ProjectDetailPage.css';

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = PROJECTS.find((item) => item.id === id);

  if (!project) {
    return <NotFoundPage />;
  }

  const seo = getProjectSeoConfig(project);
  const hasRealCodeUrl = project.codeUrl !== '#';
  const hasRealDemoUrl = project.demoUrl !== '#' && project.demoUrl !== project.codeUrl;

  const schemas: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      name: project.title,
      description: project.description,
      programmingLanguage: project.techStack,
      author: {
        '@id': `${SITE_CONFIG.baseUrl}/#person`,
      },
      url: getCanonicalUrl(`/projects/${project.id}`),
      codeRepository: hasRealCodeUrl ? project.codeUrl : undefined,
      runtimePlatform: 'Web',
    },
    {
      '@context': 'https://schema.org',
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
          name: 'Projects',
          item: getCanonicalUrl('/#projects'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: project.title,
          item: getCanonicalUrl(`/projects/${project.id}`),
        },
      ],
    },
  ];

  return (
    <>
      <SEOHead {...seo} />
      <StructuredData schemas={schemas} />

      <article className="project-detail-page">
        <div className="container">
          <nav className="project-detail-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/#projects">Projects</Link>
            <span aria-hidden="true">/</span>
            <span>{project.title}</span>
          </nav>

          <div className="project-detail-card">
            <h1 className="project-detail-title">{project.title}</h1>
            <p className="project-detail-author">
              By <Link to="/about">Kawin Prabhakaran (Kawin P)</Link>
            </p>
            <p className="project-detail-description">{project.description}</p>

            <div className="project-detail-tech" aria-label="Technologies used">
              {project.techStack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            {project.caseStudy && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  marginBottom: '32px',
                }}
              >
                <div>
                  <h2 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>Problem Statement</h2>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {project.caseStudy.problem}
                  </p>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>Solution</h2>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {project.caseStudy.solution}
                  </p>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>Architecture Flow</h2>
                  <div
                    style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}
                  >
                    {project.caseStudy.architectureSteps.map((step, idx) => (
                      <span
                        key={step}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                      >
                        <span
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            background: 'rgba(99, 102, 241, 0.1)',
                            border: '1px solid rgba(99, 102, 241, 0.25)',
                            fontSize: '0.85rem',
                            color: 'var(--text-primary)',
                          }}
                        >
                          {step}
                        </span>
                        {idx < project.caseStudy!.architectureSteps.length - 1 && (
                          <span aria-hidden="true" style={{ color: 'var(--accent-primary)' }}>
                            →
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>
                    Technical Implementation
                  </h2>
                  <ul
                    style={{ paddingLeft: '18px', color: 'var(--text-secondary)', lineHeight: 1.7 }}
                  >
                    {project.caseStudy.implementation.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>
                    Challenges &amp; Limitations
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    <strong>Challenges:</strong> {project.caseStudy.challenges}
                  </p>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: '6px' }}>
                    <strong>Limitations:</strong> {project.caseStudy.limitations}
                  </p>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>Future Improvements</h2>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {project.caseStudy.futureImprovements}
                  </p>
                </div>
              </div>
            )}

            <div className="project-detail-actions">
              {hasRealCodeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <i className="fab fa-github" aria-hidden="true" />
                  <span>View Source on GitHub</span>
                </a>
              )}
              {hasRealDemoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <i className="fas fa-external-link-alt" aria-hidden="true" />
                  <span>Live Demo</span>
                </a>
              )}
              <Link to="/#projects" className="btn btn-outline">
                <i className="fas fa-arrow-left" aria-hidden="true" />
                <span>Back to All Projects</span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
