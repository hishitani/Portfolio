/**
 * CONTACT BLOCK SCRIPT
 * Native Client-side Form Validation & Clipboard Copying
 */

import { showToast } from '../modal/modal.js';

export function initContact() {
  const form = document.getElementById('contact-form');
  const copyCards = document.querySelectorAll('.contact-direct-card');

  // Copy contact to clipboard
  copyCards.forEach(card => {
    card.addEventListener('click', () => {
      const copyVal = card.getAttribute('data-copy');
      if (copyVal) {
        navigator.clipboard.writeText(copyVal).then(() => {
          showToast(`Скопировано в буфер обмена: ${copyVal}`);
        }).catch(() => {
          showToast(`Значение: ${copyVal}`);
        });
      }
    });
  });

  // Form Submission & Validation
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const msgInput = document.getElementById('contact-message');

    let isValid = true;

    // Reset error states
    document.querySelectorAll('.form-error-msg').forEach(m => m.classList.remove('active'));
    document.querySelectorAll('.form-input, .form-textarea').forEach(i => i.classList.remove('error'));

    // Name Validation
    if (!nameInput.value.trim()) {
      showInputError(nameInput, 'Пожалуйста, введите ваше имя');
      isValid = false;
    }

    // Email / Telegram Validation
    const emailVal = emailInput.value.trim();
    if (!emailVal || (!emailVal.includes('@') && !emailVal.startsWith('@'))) {
      showInputError(emailInput, 'Укажите корректный Email или Telegram username');
      isValid = false;
    }

    // Message Validation
    if (!msgInput.value.trim() || msgInput.value.trim().length < 5) {
      showInputError(msgInput, 'Сообщение должно содержать не менее 5 символов');
      isValid = false;
    }

    if (isValid) {
      const submitBtn = form.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Отправка...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;
        form.reset();

        showToast('🚀 Спасибо! Ваше сообщение успешно отправлено. Артем свяжется с вами в ближайшее время!');
      }, 1000);
    }
  });

  function showInputError(inputEl, message) {
    inputEl.classList.add('error');
    const errorMsgEl = inputEl.parentElement.querySelector('.form-error-msg');
    if (errorMsgEl) {
      errorMsgEl.textContent = message;
      errorMsgEl.classList.add('active');
    }
  }
}
