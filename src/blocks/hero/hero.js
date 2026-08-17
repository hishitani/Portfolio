/**
 * HERO BLOCK SCRIPT
 * Native Canvas 2D interactive particle mesh + mouse attraction & wave motion
 */

export function initHero() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return; // Fallback for browsers without canvas 2d context support

  let animationFrameId;
  let width = (canvas.width = canvas.offsetWidth);
  let height = (canvas.height = canvas.offsetHeight);

  let isPaused = false;
  const toggleBtn = document.getElementById('canvas-toggle-btn');

  // Mouse / Touch Position
  const mouse = {
    x: width / 2,
    y: height / 2,
    radius: 140,
    isActive: false
  };

  // Particles
  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 14000), 70);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2 + 1.5;
      this.baseAlpha = Math.random() * 0.4 + 0.2;
      this.color = Math.random() > 0.5 ? '#00DC82' : '#00A3FF';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce at edges
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse attraction / repulsion physics
      if (mouse.isActive) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 2;
          this.y -= Math.sin(angle) * force * 2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.baseAlpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // Populate particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Connect particles with thin mesh lines
  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 110) {
          const alpha = (1 - distance / 110) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.strokeStyle = '#00DC82';
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
  }

  // Animation Loop
  function animate() {
    if (!isPaused) {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  animate();

  // Resize Handler with Debounce
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }, 150);
  });

  // Mouse & Touch Listeners
  const heroSection = document.querySelector('.hero-section');

  heroSection?.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.isActive = true;
  });

  heroSection?.addEventListener('mouseleave', () => {
    mouse.isActive = false;
  });

  heroSection?.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
      mouse.isActive = true;
    }
  }, { passive: true });

  heroSection?.addEventListener('touchend', () => {
    mouse.isActive = false;
  });

  // Pause / Play Toggle
  toggleBtn?.addEventListener('click', () => {
    isPaused = !isPaused;
    toggleBtn.innerHTML = isPaused
      ? `<span>▶ Интерактив: пауза</span>`
      : `<span>⚡ Интерактив: активен</span>`;
  });
}
