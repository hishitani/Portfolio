/**
 * SERVICES & PROCESS BLOCK SCRIPT
 */

export function initServices() {
  // Service card subtle hover animation effects
  const cards = document.querySelectorAll('.service-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'var(--accent-primary)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = 'var(--border-color)';
    });
  });
}
