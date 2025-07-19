/**
 * ===================================
 * LANGUAGE DROPDOWN - COMPLETE FUNCTIONALITY
 * ===================================
 */

class LanguageDropdown {
  constructor() {
    this.isOpen = false;
    this.currentLanguage = localStorage.getItem('campingJourneyLanguage') || 'pt';
    this.translations = {};
    
    this.init();
  }

  async init() {
    // Load translations first
    await this.loadTranslations();
    
    // Setup dropdown
    this.setupDropdown();
    this.updateVisualIndicator();
    this.setupEventListeners();
    
    console.log('Language Dropdown initialized');
  }

  async loadTranslations() {
    // Use enhanced i18n translations if available
    if (window.enhancedI18n) {
      this.translations = window.enhancedI18n.getAllTranslations();
    } else {
      // Fallback translations
      this.translations = {
        pt: {
          nav: { home: "Início", products: "Produtos", about: "Sobre", contact: "Contato", cart: "Carrinho" },
          hero: { title: "Equipamentos Premium para Suas Aventuras", subtitle: "Descubra nossa coleção cuidadosamente selecionada de equipamentos de camping ultralight e de alta qualidade.", cta: "Explorar Produtos" }
        },
        en: {
          nav: { home: "Home", products: "Products", about: "About", contact: "Contact", cart: "Cart" },
          hero: { title: "Premium Equipment for Your Adventures", subtitle: "Discover our carefully curated collection of ultralight, high-quality camping gear.", cta: "Explore Products" }
        },
        es: {
          nav: { home: "Inicio", products: "Productos", about: "Acerca", contact: "Contacto", cart: "Carrito" },
          hero: { title: "Equipos Premium para Tus Aventuras", subtitle: "Descubre nuestra colección cuidadosamente seleccionada de equipos de camping ultraligeros y de alta calidad.", cta: "Explorar Productos" }
        }
      };
    }
  }

  setupDropdown() {
    const toggle = document.getElementById('language-toggle');
    const dropdown = document.getElementById('language-dropdown');

    if (!toggle || !dropdown) {
      console.warn('Language dropdown elements not found');
      return;
    }

    // Ensure dropdown has correct structure
    if (!dropdown.querySelector('.language-option')) {
      dropdown.innerHTML = `
        <div class="language-option" data-lang="pt">
          <span class="flag">🇧🇷</span>
          <span class="lang-name">Português</span>
        </div>
        <div class="language-option" data-lang="en">
          <span class="flag">🇺🇸</span>
          <span class="lang-name">English</span>
        </div>
        <div class="language-option" data-lang="es">
          <span class="flag">🇪🇸</span>
          <span class="lang-name">Español</span>
        </div>
      `;
    }

    // Add CSS classes for styling
    dropdown.classList.add('language-dropdown-menu');
    toggle.classList.add('language-toggle-btn');
  }

  setupEventListeners() {
    const toggle = document.getElementById('language-toggle');
    const dropdown = document.getElementById('language-dropdown');

    if (!toggle || !dropdown) return;

    // Toggle dropdown on click
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleDropdown();
    });

    // Language option selection
    dropdown.addEventListener('click', (e) => {
      const option = e.target.closest('.language-option');
      if (option) {
        e.preventDefault();
        const lang = option.dataset.lang;
        if (lang) {
          this.selectLanguage(lang);
        }
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !dropdown.contains(e.target)) {
        this.closeDropdown();
      }
    });

    // Close dropdown on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeDropdown();
        toggle.focus();
      }
    });

    // Keyboard navigation
    dropdown.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        this.navigateOptions(e.key === 'ArrowDown' ? 1 : -1);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const focused = dropdown.querySelector('.language-option:focus');
        if (focused) {
          const lang = focused.dataset.lang;
          if (lang) this.selectLanguage(lang);
        }
      }
    });
  }

  toggleDropdown() {
    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown() {
    const dropdown = document.getElementById('language-dropdown');
    const toggle = document.getElementById('language-toggle');

    if (!dropdown || !toggle) return;

    this.isOpen = true;

    // Add active classes
    dropdown.classList.add('active');
    toggle.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');

    // Update active option
    this.updateActiveOption();

    // Focus first option
    setTimeout(() => {
      const firstOption = dropdown.querySelector('.language-option');
      if (firstOption) {
        firstOption.focus();
      }
    }, 100);

    console.log('Language dropdown opened');
  }

  closeDropdown() {
    const dropdown = document.getElementById('language-dropdown');
    const toggle = document.getElementById('language-toggle');

    if (!dropdown || !toggle) return;

    this.isOpen = false;

    // Remove active classes
    dropdown.classList.remove('active');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');

    console.log('Language dropdown closed');
  }

  selectLanguage(lang) {
    if (!this.translations[lang]) {
      console.warn(`Language ${lang} not available`);
      return;
    }

    const oldLang = this.currentLanguage;
    this.currentLanguage = lang;

    // Persist choice in localStorage
    localStorage.setItem('campingJourneyLanguage', lang);
    localStorage.setItem('preferred-language', lang);

    // Update visual indicator
    this.updateVisualIndicator();

    // Update active option
    this.updateActiveOption();

    // Apply translations
    this.applyTranslations(lang);

    // Close dropdown
    this.closeDropdown();

    // Dispatch event
    document.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { 
        oldLanguage: oldLang, 
        newLanguage: lang 
      }
    }));

    // Use enhanced i18n if available
    if (window.enhancedI18n && typeof window.enhancedI18n.changeLanguage === 'function') {
      window.enhancedI18n.changeLanguage(lang);
    }

    console.log(`Language changed from ${oldLang} to ${lang}`);
  }

  updateVisualIndicator() {
    const currentFlag = document.getElementById('current-flag');
    const currentLang = document.getElementById('current-lang');
    const menuCurrentLang = document.getElementById('menu-current-lang');

    const languages = {
      'pt': { flag: '🇧🇷', code: 'PT', name: 'Português' },
      'en': { flag: '🇺🇸', code: 'EN', name: 'English' },
      'es': { flag: '🇪🇸', code: 'ES', name: 'Español' }
    };

    const selectedLang = languages[this.currentLanguage];
    if (!selectedLang) return;

    // Update header display
    if (currentFlag) currentFlag.textContent = selectedLang.flag;
    if (currentLang) currentLang.textContent = selectedLang.code;
    if (menuCurrentLang) menuCurrentLang.textContent = `${selectedLang.code} ${selectedLang.flag}`;

    console.log(`Visual indicator updated to ${selectedLang.name}`);
  }

  updateActiveOption() {
    const options = document.querySelectorAll('.language-option');
    
    options.forEach(option => {
      if (option.dataset.lang === this.currentLanguage) {
        option.classList.add('active');
        option.setAttribute('aria-selected', 'true');
      } else {
        option.classList.remove('active');
        option.setAttribute('aria-selected', 'false');
      }
    });
  }

  navigateOptions(direction) {
    const options = Array.from(document.querySelectorAll('.language-option'));
    const currentIndex = options.findIndex(option => option === document.activeElement);
    
    let newIndex = currentIndex + direction;
    
    if (newIndex < 0) newIndex = options.length - 1;
    if (newIndex >= options.length) newIndex = 0;
    
    if (options[newIndex]) {
      options[newIndex].focus();
    }
  }

  applyTranslations(lang) {
    const translations = this.translations[lang];
    if (!translations) return;

    // Update all elements with data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getNestedTranslation(translations, key);
      
      if (translation) {
        if (element.hasAttribute('data-i18n-html')) {
          element.innerHTML = translation;
        } else {
          element.textContent = translation;
        }
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      const translation = this.getNestedTranslation(translations, key);
      
      if (translation) {
        element.setAttribute('placeholder', translation);
      }
    });

    // Update aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
      const key = element.getAttribute('data-i18n-aria');
      const translation = this.getNestedTranslation(translations, key);
      
      if (translation) {
        element.setAttribute('aria-label', translation);
      }
    });

    console.log(`Translations applied for language: ${lang}`);
  }

  getNestedTranslation(translations, key) {
    return key.split('.').reduce((obj, k) => obj?.[k], translations);
  }

  // Public API
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  getAvailableLanguages() {
    return Object.keys(this.translations);
  }

  isDropdownOpen() {
    return this.isOpen;
  }
}

// Global functions for compatibility
window.toggleLanguageDropdown = function() {
  if (window.languageDropdown) {
    window.languageDropdown.toggleDropdown();
  }
};

window.selectLanguage = function(lang) {
  if (window.languageDropdown) {
    window.languageDropdown.selectLanguage(lang);
  }
};

// Initialize when DOM is ready
function initLanguageDropdown() {
  if (!window.languageDropdown) {
    window.languageDropdown = new LanguageDropdown();
  }
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguageDropdown);
} else {
  initLanguageDropdown();
}

// Export
window.LanguageDropdown = LanguageDropdown;
window.initLanguageDropdown = initLanguageDropdown; 