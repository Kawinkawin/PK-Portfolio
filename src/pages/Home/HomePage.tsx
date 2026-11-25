import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AboutSection } from '../../features/about/AboutSection';
import { AchievementsSection } from '../../features/achievements/AchievementsSection';
import { CertificationsSection } from '../../features/certifications/CertificationsSection';
import { ContactSection } from '../../features/contact/ContactSection';
import { EducationSection } from '../../features/education/EducationSection';
import { ExperienceSection } from '../../features/experience/ExperienceSection';
import { HeroSection } from '../../features/hero/HeroSection';
import { ProjectsSection } from '../../features/projects/ProjectsSection';
import { SkillsSection } from '../../features/skills/SkillsSection';
import {
  SEOHead,
  StructuredData,
  SEO_CONFIG,
  buildPersonSchema,
  buildWebSiteSchema,
  buildProfilePageSchema,
  buildProjectsSchema,
} from '../../seo';

/** Schemas are stable constants — defined outside the component to avoid re-creation */
const HOME_SCHEMAS = [
  buildPersonSchema(),
  buildWebSiteSchema(),
  buildProfilePageSchema(),
  ...buildProjectsSchema(),
];

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.hash]);

  return (
    <>
      <SEOHead {...SEO_CONFIG.home} />
      <StructuredData schemas={HOME_SCHEMAS} />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <SkillsSection />
      <CertificationsSection />
      <AchievementsSection />
      <ContactSection />
    </>
  );
}
