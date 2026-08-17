/**
 * INTERACTIVE BLOCK SCRIPT
 * Calculates timeline & speed estimation and autofills contact form
 */

export function initInteractive() {
  const typeCards = document.querySelectorAll('.calc-radio-card');
  const checkCards = document.querySelectorAll('.calc-check-card');
  
  const timeValEl = document.getElementById('calc-time-val');
  const speedValEl = document.getElementById('calc-speed-val');
  const applyBtn = document.getElementById('calc-apply-btn');

  let selectedType = 'landing';
  let selectedBaseDays = 5;

  // Type Radio
  typeCards.forEach(card => {
    card.addEventListener('click', () => {
      typeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const radioInput = card.querySelector('input');
      if (radioInput) radioInput.checked = true;

      selectedType = card.getAttribute('data-type') || 'landing';
      selectedBaseDays = parseInt(card.getAttribute('data-days') || '5', 10);
      recalculate();
    });
  });

  // Feature Checkboxes
  checkCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('active');
      const checkInput = card.querySelector('input');
      if (checkInput) checkInput.checked = !checkInput.checked;
      recalculate();
    });
  });

  function recalculate() {
    let extraDays = 0;
    const activeChecks = document.querySelectorAll('.calc-check-card.active');
    
    activeChecks.forEach(check => {
      extraDays += parseInt(check.getAttribute('data-add-days') || '1', 10);
    });

    const totalDays = selectedBaseDays + extraDays;
    if (timeValEl) timeValEl.textContent = `${totalDays}–${totalDays + 3} дней`;
    if (speedValEl) speedValEl.textContent = '100 / 100';
  }

  // Transfer Calculation to Contact Form
  applyBtn?.addEventListener('click', () => {
    const activeTypeEl = document.querySelector('.calc-radio-card.active span');
    const typeName = activeTypeEl ? activeTypeEl.textContent : 'Проект';

    const activeCheckEls = document.querySelectorAll('.calc-check-card.active span');
    const featureNames = Array.from(activeCheckEls).map(e => e.textContent).join(', ');

    const msgInput = document.getElementById('contact-message');
    const typeSelect = document.getElementById('contact-type');

    if (typeSelect) {
      typeSelect.value = selectedType;
    }

    if (msgInput) {
      msgInput.value = `Привет, Артем! Хочу заказать тип проекта: "${typeName}".\nВыбранные опции: ${featureNames || 'базовый комплект'}.\nОжидаемый срок: ${timeValEl?.textContent || ''}.`;
    }

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      msgInput?.focus();
    }
  });
}
