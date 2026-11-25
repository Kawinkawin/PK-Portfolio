import { useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { NAV_ITEMS } from '../../config/site';
import { useScrollNavigation } from '../../hooks/useScrollNavigation';
import { BackToTop } from '../common/BackToTop';
import { ParticleCanvas } from '../common/ParticleCanvas';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export function MainLayout() {
  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.id), []);
  const { activeSection, isScrolled, showBackToTop } = useScrollNavigation(sectionIds);

  return (
    <>
      <ParticleCanvas />
      <Navbar activeSection={activeSection} isScrolled={isScrolled} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTop visible={showBackToTop} />
    </>
  );
}
