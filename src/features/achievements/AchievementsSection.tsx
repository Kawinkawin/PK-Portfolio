import { ACHIEVEMENTS } from './data';
import './AchievementsSection.css';

export function AchievementsSection() {
  return (
    <section id="achievements" className="achievements">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Achievements</span>
          <h2 className="section-title">Recognition</h2>
        </div>

        <div className="achievements-grid">
          {ACHIEVEMENTS.map((item) => (
            <div key={item.id} className="achievement-card">
              <div className="achievement-icon">
                <i className={item.iconClass} aria-hidden="true" />
              </div>
              <div className="achievement-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
