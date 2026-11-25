import { SKILL_CATEGORIES } from './data';
import './SkillsSection.css';

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="skills"
      aria-label="Technical Skills — Machine Learning, AI, Web Development"
    >
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Skills</span>
          <h2 className="section-title">Technical Arsenal</h2>
        </div>

        <div className="skills-container">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.id} className="skill-category wide">
              <div className="category-header">
                <i className={category.iconClass} aria-hidden="true" />
                <h3>{category.title}</h3>
              </div>

              {category.layout === 'tags' ? (
                <div className="competency-tags">
                  {category.items.map((item) => (
                    <div key={item.name} className="competency-tag">
                      <i className={item.iconClass} aria-hidden="true" />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="tools-grid">
                  {category.items.map((item) => (
                    <div key={item.name} className="tool-item">
                      <i className={item.iconClass} aria-hidden="true" />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
