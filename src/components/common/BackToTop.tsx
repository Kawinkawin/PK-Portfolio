interface BackToTopProps {
  visible: boolean;
}

export function BackToTop({ visible }: BackToTopProps) {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      className={`back-to-top${visible ? ' visible' : ''}`}
      id="backToTop"
      aria-label="Back to top"
      onClick={handleClick}
    >
      <i className="fas fa-arrow-up" aria-hidden="true" />
    </button>
  );
}
