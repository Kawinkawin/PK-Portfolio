import { useEffect, useRef } from 'react';
import type { ExperienceItem } from './types';

interface ExperienceModalProps {
  experience: ExperienceItem | null;
  onClose: () => void;
}

export function ExperienceModal({ experience, onClose }: ExperienceModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = experience !== null;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`exp-modal-overlay${isOpen ? ' active' : ''}`}
      id="expModalOverlay"
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      aria-labelledby="expModalRole"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="exp-modal">
        <button
          ref={closeButtonRef}
          type="button"
          className="exp-modal-close"
          id="expModalClose"
          aria-label="Close modal"
          onClick={onClose}
        >
          <i className="fas fa-times" aria-hidden="true" />
        </button>

        {experience && (
          <>
            <div className="exp-modal-header">
              <div className="exp-modal-icon" id="expModalIcon">
                <i className={experience.iconClass} aria-hidden="true" />
              </div>
              <div className="exp-modal-title-wrap">
                <h3 id="expModalRole">{experience.role}</h3>
                <span className="exp-modal-company" id="expModalCompany">
                  {experience.company}
                </span>
                <span className="exp-modal-duration" id="expModalDuration">
                  {experience.modalDuration}
                </span>
              </div>
            </div>

            <div className="exp-modal-body">
              <h4>Key Responsibilities</h4>
              <ul className="exp-modal-list" id="expModalList">
                {experience.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>

              {experience.techs.length > 0 && (
                <div className="exp-modal-techs" id="expModalTechs">
                  <h4 className="exp-modal-techs-heading">Tech Stack</h4>
                  {experience.techs.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
