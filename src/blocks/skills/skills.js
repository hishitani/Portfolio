/**
 * SKILLS BLOCK SCRIPT
 * Intersection Observer to trigger animated skill bars fill
 */

export function initSkills() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (skillBars.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetWidth = fill.getAttribute('data-percentage') || '85%';
        fill.style.width = targetWidth;
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.2 });

  skillBars.forEach(bar => observer.observe(bar));
}
