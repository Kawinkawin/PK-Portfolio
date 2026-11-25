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
