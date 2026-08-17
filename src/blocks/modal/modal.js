/**
 * MODAL & TOAST SCRIPT
 */

export function initModal() {
  // Ensure modal elements exist or bind listeners
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

export function openModal(htmlContent) {
  const overlay = document.getElementById('modal-overlay');
  const container = document.getElementById('modal-dynamic-content');

  if (overlay && container) {
    container.innerHTML = htmlContent;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

export function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

export function showToast(message, duration = 4000) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.textContent = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Make closeModal globally available for inline modal handlers
if (typeof window !== 'undefined') {
  window.closeModal = closeModal;
}
