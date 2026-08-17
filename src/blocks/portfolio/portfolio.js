/**
 * PORTFOLIO BLOCK SCRIPT
 * Category filtering & Modal Detailed Case Study Launcher
 */

import { openModal } from '../modal/modal.js';

// Detailed Cases Database
export const casesData = {
	'case-corporate': {
		id: 'case-vector-prava',
		title: 'Юридическое бюро «Вектор Права»',
		category: 'Корпоративные сайты',
		speed: '99 / 100 PageSpeed',
		image: './src/assets/images/Vector_Prava.jpg',
		client: 'Юридическое бюро «Вектор Права» (B2B Консалтинг)',
		duration: '4 дня разработки',
		stack: ['HTML5 (Semantic)', 'CSS3 (BEM / Grid)', 'Vanilla JS ES6+', 'Intersection Observer API'],
		problem: 'Заказчик сталкивался с низкой конверсией старого сайта из-за долгий загрузки, устаревшего дизайна и отсутствия прозрачной структуры услуг. Требовалось переработать позиционирование, сформировать высокий уровень доверия бизнеса и обеспечить мгновенный отклик формы сбора заявок без перезагрузки страницы.',
		solution: 'Спроектировал и сверстал строго адаптивный корпоративный сайт по методологии BEM без громоздких фреймворков. Реализовал асинхронный модуль калькулятора стоимости юридических услуг, ленивую загрузку медиаконтента через Intersection Observer API и строгую валидацию данных на клиенте перед отправкой.',
		results: [
			'Показатели Google Lighthouse: 99/100 (Performance), 100/100 (SEO & Accessibility)',
			'Мгновенная скорость первой интерактивности (INP): < 40 мс',
			'Рост конверсии из посетителя в заявку на консультацию: +38%'
		],
		codeSnippet: `// Легковесный модуль асинхронного расчета стоимости услуг и валидации формы
export class LegalCalculator {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    this.baseRate = options.baseRate || 5000;
    this.init();
  }

  init() {
    this.container.addEventListener('change', (e) => this.updateEstimate(e));
  }

  calculateTotal() {
    const selectedServices = Array.from(
      this.container.querySelectorAll('input[type="checkbox"]:checked')
    );
    return selectedServices.reduce((acc, input) => acc + Number(input.value), this.baseRate);
  }

  updateEstimate() {
    const totalElement = this.container.querySelector('.calculator__total-value');
    const formattedAmount = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(this.calculateTotal());

    if (totalElement) totalElement.textContent = formattedAmount;
  }
}`
	},

	'case-ecommerce': {
		id: 'case-ecommerce',
		title: 'LuxeTech E-Store — Премиальный интернет-магазин техники',
		category: 'E-commerce',
		speed: '99 / 100 PageSpeed',
		image: '/src/assets/images/project_ecommerce_store_1786558436259.jpg',
		client: 'Бренд цифровой электроники LuxeTech',
		duration: '2.5 недели',
		stack: ['HTML5', 'SCSS', 'Vanilla JS ES6+', 'LocalStorage', 'Web Vitals Optimization'],
		problem: 'Старая версия интернет-магазина тормозила при загрузке каталога с 1000+ товаров, из-за чего среднее время ожидания покупателей превышало 4.5 секунды.',
		solution: 'Спроектирована молниеносная витрина товаров с ленивой загрузкой изображений (IntersectionObserver), минифицированными ресурсами, плавными переходами без перезагрузки страницы и клиентоориентированной корзиной.',
		results: [
			'Ускорение загрузки каталога с 4.5с до 0.4с',
			'Отказы пользователей снизились на 58%',
			'100% адаптивность под все стандарты смартфонов'
		],
		codeSnippet: `// IntersectionObserver для ленивой загрузки медиа-ресурсов
const lazyImageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('loaded');
      observer.unobserve(img);
    }
  });
});`
	},

	'case-Web-applications': {
		id: 'case-Web-applications',
		title: 'Сервис доставки готового питания «FitMeal»',
		category: 'Веб-приложения',
		speed: '98 / 100 PageSpeed',
		image: '/src/assets/images/Service_FitMeal.jpg',
		client: 'eCommerce-платформа FitMeal (Сервис здорового питания)',
		duration: '5 дней разработки',
		stack: ['React', 'TypeScript', 'Tailwind CSS', 'State Management (Zustand)', 'Vite'],
		problem: 'Предыдущая версия сайта имела высокий процент отказов на этапе выбора меню из-за сложной навигации, перегруженного интерфейса и медленного переключения дней недели, что приводило к потере покупателей до перехода в корзину.',
		solution: 'Спроектировал интерактивное SPA с реактивным селектором рационов и мгновенным переключением дней без перезагрузки страницы. Реализовал кастомный клиентский калькулятор БЖУ и интегрировал стейт-менеджер для бесшовного сохранения выбранных блюд в локальном хранилище.',
		results: [
			'Показатели Google Lighthouse: 98/100 (Performance), 100/100 (SEO & Mobile Usability)',
			'Мгновенный отклик интерфейса при смене меню: < 10 мс',
			'Рост глубины просмотра каталога и конверсии повторных заказов: +28%'
		],
		codeSnippet: `// Типизированный модульный калькулятор калорийности и стоимости подписки
export interface MealPlan {
  id: string;
  name: string;
  calories: number;
  dailyPrice: number;
}

export class PlanCalculator {
  private static DISCOUNT_RATES = {
    MONTHLY: 0.15, // > 30 дней
    WEEKLY: 0.05,  // > 7 дней
  };

  public static calculateTotal(plan: MealPlan, daysCount: number): { total: number; discount: number } {
    const rawPrice = plan.dailyPrice * daysCount;
    let discountRate = 0;

    if (daysCount >= 30) {
      discountRate = this.DISCOUNT_RATES.MONTHLY;
    } else if (daysCount >= 7) {
      discountRate = this.DISCOUNT_RATES.WEEKLY;
    }

    const discount = Math.round(rawPrice * discountRate);
    const total = rawPrice - discount;

    return { total, discount };
  }
}`
	},

	'case-landing': {
		id: 'case-paws-style',
		title: 'Салон груминга «Paws & Style»',
		category: 'Услуги и сервис',
		speed: '100 / 100 PageSpeed',
		image: './src/assets/images/Paws_Style.jpg',
		client: 'Премиальный груминг-салон «Paws & Style»',
		duration: '3 дня разработки',
		stack: ['HTML5 (Semantic)', 'SCSS (BEM)', 'Vanilla JS ES6+', 'Vite', 'Swiper API'],
		problem: 'Старый сайт салона имел сложную форму записи, не был адаптирован под мобильные устройства и не позволял клиентам быстро рассчитать стоимость стрижки под конкретную породу, из-за чего администраторы тратили много времени на обработку первичных звонков.',
		solution: 'Спроектировал светлый стильный лендинг с акцентом на заботу о животных. Реализовал интерактивный калькулятор выбора породы и комплексных услуг (гигиена, экспресс-линька, шоу-груминг) с моментальным расчетом стоимости и динамической формой записи.',
		results: [
			'Показатели Google Lighthouse: 100/100 (Performance, Mobile Friendly)',
			'Сокращение времени на обработку заявок администратором: на 40%',
			'Рост конверсии из посетителя в онлайн-запись: +45%'
		],
		codeSnippet: `// Кастомный модуль выбора породы и автоматического расчета стоимости груминга
export class GroomingCalculator {
  constructor(selectElement, optionsList, totalContainer) {
    this.select = document.querySelector(selectElement);
    this.options = document.querySelectorAll(optionsList);
    this.totalContainer = document.querySelector(totalContainer);
    this.init();
  }

  init() {
    this.select?.addEventListener('change', () => this.calculate());
    this.options.forEach(opt => opt.addEventListener('change', () => this.calculate()));
  }

  calculate() {
    const breedBasePrice = Number(this.select.value) || 0;
    const additionalServices = Array.from(this.options)
      .filter(input => input.checked)
      .reduce((sum, input) => sum + Number(input.value), 0);

    const total = breedBasePrice + additionalServices;
    
    if (this.totalContainer) {
      this.totalContainer.textContent = \`\${total.toLocaleString('ru-RU')} ₽\`;
    }
  }
}`
	}
};

export function initPortfolio() {
	const filterBtns = document.querySelectorAll('.filter-btn');
	const projectCards = document.querySelectorAll('.project-card');

	// Category Filter
	filterBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			filterBtns.forEach(b => b.classList.remove('active'));
			btn.classList.add('active');

			const filterValue = btn.getAttribute('data-filter');

			projectCards.forEach(card => {
				const category = card.getAttribute('data-category');
				if (filterValue === 'all' || category === filterValue) {
					card.style.display = 'flex';
					setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
				} else {
					card.style.opacity = '0';
					card.style.transform = 'translateY(20px)';
					setTimeout(() => { card.style.display = 'none'; }, 300);
				}
			});
		});
	});

	// Open Detailed Case Study Modal
	const caseBtns = document.querySelectorAll('.btn-case');
	caseBtns.forEach(btn => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			const caseId = btn.getAttribute('data-case-id');
			if (caseId && casesData[caseId]) {
				renderCaseModal(casesData[caseId]);
			}
		});
	});
}

function renderCaseModal(caseData) {
	const modalContentHtml = `
    <div class="case-modal-container">
      <div class="case-modal-hero">
        <img src="${caseData.image}" alt="${caseData.title}" class="case-modal-img" />
        <div class="case-modal-badge">${caseData.speed}</div>
      </div>
      
      <div class="case-modal-body">
        <span class="case-modal-category">${caseData.category}</span>
        <h2 class="case-modal-title">${caseData.title}</h2>

        <div class="case-modal-meta">
          <div><strong>Заказчик:</strong> ${caseData.client}</div>
          <div><strong>Сроки:</strong> ${caseData.duration}</div>
        </div>

        <div class="case-modal-section">
          <h3>🎯 Поставленная задача</h3>
          <p>${caseData.problem}</p>
        </div>

        <div class="case-modal-section">
          <h3>💡 Реализованное решение</h3>
          <p>${caseData.solution}</p>
        </div>

        <div class="case-modal-section">
          <h3>🚀 Ключевые результаты</h3>
          <ul class="case-modal-list">
            ${caseData.results.map(r => `<li>✓ ${r}</li>`).join('')}
          </ul>
        </div>

        <div class="case-modal-section">
          <h3>🛠️ Технологический стек</h3>
          <div class="case-modal-stack">
            ${caseData.stack.map(s => `<span class="tech-tag">${s}</span>`).join('')}
          </div>
        </div>

        <div class="case-modal-section">
          <h3>⚡ Фрагмент чистого кода</h3>
          <pre class="case-modal-code"><code>${escapeHtml(caseData.codeSnippet)}</code></pre>
        </div>

        <div class="case-modal-actions">
          <button class="btn btn-primary" onclick="document.getElementById('contact').scrollIntoView({behavior: 'smooth'}); closeModal();">
            Обсудить похожий проект
          </button>
        </div>
      </div>
    </div>
  `;

	openModal(modalContentHtml);
}

function escapeHtml(text) {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}
