/**
 * MAIN ENTRY SCRIPT
 * Imports all modular block JS modules
 */

import { initHeader } from './blocks/header/header.js';
import { initHero } from './blocks/hero/hero.js';
import { initAbout } from './blocks/about/about.js';
import { initSkills } from './blocks/skills/skills.js';
import { initPortfolio } from './blocks/portfolio/portfolio.js';
import { initInteractive } from './blocks/interactive/interactive.js';
import { initServices } from './blocks/services/services.js';
import { initContact } from './blocks/contact/contact.js';
import { initFooter } from './blocks/footer/footer.js';
import { initModal } from './blocks/modal/modal.js';
import { initLegacySupportAndAnimations } from './utils/legacySupport.js';
document.addEventListener('DOMContentLoaded', () => {
	initLegacySupportAndAnimations();
	initHeader();
	initHero();
	initAbout();
	initSkills();
	initPortfolio();
	initInteractive();
	initServices();
	initContact();
	initFooter();
	initModal();
});

