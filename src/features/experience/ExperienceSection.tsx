import { useCallback, useState } from 'react';
import { EXPERIENCE_ITEMS } from './data';
import { ExperienceModal } from './ExperienceModal';
import type { ExperienceItem } from './types';
import './ExperienceSection.css';

export function ExperienceSection() {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);

  const handleClose = useCallback(() => {
    setSelectedExperience(null);
  }, []);

  return (
    <>
      <section id="internships" className="experience">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Experience</span>
            <h2 className="section-title">Professional Experience</h2>
          </div>

          <div className="experience-tiles">
            {EXPERIENCE_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="exp-tile"
                id={item.id}
                onClick={() => setSelectedExperience(item)}
              >
                <div className="exp-tile-icon">
                  <i className={item.iconClass} aria-hidden="true" />
                </div>
                <div className="exp-tile-info">
                  <h3>{item.role}</h3>
                  <span className="exp-tile-company">{item.company}</span>
                </div>
                {item.status ? (
                  <div className="exp-tile-meta">
                    <span className="education-status">{item.status}</span>
                    <span className="exp-tile-duration">{item.tileDuration}</span>
                  </div>
                ) : (
                  <span className="exp-tile-duration">{item.tileDuration}</span>
                )}
                <i className="fas fa-arrow-right exp-tile-arrow" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <ExperienceModal experience={selectedExperience} onClose={handleClose} />
    </>
  );
}
