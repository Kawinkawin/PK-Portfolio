import { EDUCATION_ITEMS } from './data';
import './EducationSection.css';

export function EducationSection() {
  return (
    <section id="education" className="education">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Education</span>
          <h2 className="section-title">Academic Background</h2>
        </div>

        <div className="education-grid">
          {EDUCATION_ITEMS.map((item) => (
            <div key={item.id} className={`education-card${item.featured ? ' featured' : ''}`}>
              <div className="education-header">
                <div className={`education-icon${item.featured ? '' : ' secondary'}`}>
                  <i className={item.iconClass} aria-hidden="true" />
                </div>
              </div>
              <h3>{item.degree}</h3>
              <span className="institution">{item.institution}</span>
              <div className="education-details">
                <div className="detail-item">
                  <span className="label">{item.label}</span>
                  <span className="value">{item.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
