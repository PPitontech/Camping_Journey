/**
 * ===================================
 * CAMPING JOURNEY - COMPLETE I18N SYSTEM
 * ===================================
 */

class LanguageManager {
  constructor() {
    this.currentLanguage = 'pt'; // Default language
    this.translations = {};
    this.isDropdownOpen = false;
    
    this.init();
  }

  async init() {
    // Load saved language preference
    this.currentLanguage = localStorage.getItem('campingJourneyLanguage') || 'pt';
    
    // Load all translations
    await this.loadTranslations();
    
    // Setup UI
    this.setupLanguageDropdown();
    this.updateLanguageDisplay();
    this.applyTranslations();
    
    console.log(`Language Manager initialized - Current: ${this.currentLanguage}`);
  }

  async loadTranslations() {
    try {
      // Load all language files
      const languages = ['pt', 'en', 'es'];
      const promises = languages.map(async (lang) => {
        const response = await fetch(`/messages/${lang}/homepage.json`);
        if (response.ok) {
          this.translations[lang] = await response.json();
        } else {
          console.warn(`Failed to load ${lang} translations`);
        }
      });
      
      await Promise.all(promises);
      
      // Add additional translations not in JSON files
      this.addExtraTranslations();
      
    } catch (error) {
      console.error('Error loading translations:', error);
      this.setFallbackTranslations();
    }
  }

  addExtraTranslations() {
    // Header/Navigation translations
    const headerTranslations = {
      pt: {
        nav: {
          home: "Início",
          products: "Produtos", 
          about: "Sobre",
          contact: "Contato",
          cart: "Carrinho"
        },
        cart: {
          empty: "Seu carrinho está vazio",
          total: "Total",
          checkout: "Finalizar Compra",
          addedToCart: "Produto adicionado ao carrinho!",
          itemsInCart: "itens no carrinho"
        },
        currency: "R$"
      },
      en: {
        nav: {
          home: "Home",
          products: "Products",
          about: "About", 
          contact: "Contact",
          cart: "Cart"
        },
        cart: {
          empty: "Your cart is empty",
          total: "Total",
          checkout: "Checkout",
          addedToCart: "Product added to cart!",
          itemsInCart: "items in cart"
        },
        currency: "$"
      },
      es: {
        nav: {
          home: "Inicio",
          products: "Productos",
          about: "Acerca",
          contact: "Contacto", 
          cart: "Carrito"
        },
        cart: {
          empty: "Tu carrito está vacío",
          total: "Total",
          checkout: "Finalizar Compra",
          addedToCart: "¡Producto agregado al carrito!",
          itemsInCart: "artículos en el carrito"
        },
        currency: "MX$"
      }
    };

    // Merge with existing translations
    Object.keys(headerTranslations).forEach(lang => {
      if (this.translations[lang]) {
        this.translations[lang] = {
          ...this.translations[lang],
          ...headerTranslations[lang]
        };
      }
    });
  }

  setFallbackTranslations() {
    // Minimal fallback if JSON files fail to load
    this.translations = {
      pt: {
        nav: { home: "Início", products: "Produtos", about: "Sobre", contact: "Contato" },
        hero: { title: "Equipamentos Premium para Suas Aventuras" }
      },
      en: {
        nav: { home: "Home", products: "Products", about: "About", contact: "Contact" },
        hero: { title: "Premium Equipment for Your Adventures" }
      },
      es: {
        nav: { home: "Inicio", products: "Productos", about: "Acerca", contact: "Contacto" },
        hero: { title: "Equipos Premium para Tus Aventuras" }
      }
    };
  }

  setupLanguageDropdown() {
    const toggle = document.getElementById('language-toggle');
    const dropdown = document.getElementById('language-dropdown');
    
    if (!toggle || !dropdown) return;

    // Click outside to close
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !dropdown.contains(e.target)) {
        this.closeDropdown();
      }
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isDropdownOpen) {
        this.closeDropdown();
      }
    });
  }

  toggleLanguageDropdown() {
    const dropdown = document.getElementById('language-dropdown');
    if (!dropdown) return;

    this.isDropdownOpen = !this.isDropdownOpen;
    
    if (this.isDropdownOpen) {
      dropdown.style.display = 'block';
      dropdown.style.opacity = '0';
      dropdown.style.transform = 'translateY(-10px)';
      
      // Animate in
      requestAnimationFrame(() => {
        dropdown.style.opacity = '1';
        dropdown.style.transform = 'translateY(0)';
      });
    } else {
      this.closeDropdown();
    }
  }

  closeDropdown() {
    const dropdown = document.getElementById('language-dropdown');
    if (!dropdown) return;

    dropdown.style.opacity = '0';
    dropdown.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
      dropdown.style.display = 'none';
      this.isDropdownOpen = false;
    }, 200);
  }

  changeLanguage(newLang) {
    if (newLang === this.currentLanguage) {
      this.closeDropdown();
    return;
  }
  
    // Save preference
    this.currentLanguage = newLang;
    localStorage.setItem('campingJourneyLanguage', newLang);
    
    // Update UI
    this.updateLanguageDisplay();
    this.applyTranslations();
    this.closeDropdown();
    
    // Show feedback
    this.showLanguageChangeNotification(newLang);
    
    // Track language change
    this.trackLanguageChange(newLang);
    
    console.log(`Language changed to: ${newLang}`);
  }

  updateLanguageDisplay() {
    const flagElement = document.getElementById('current-flag');
    const langElement = document.getElementById('current-lang');
    
    const languageConfig = {
      pt: { flag: '🇧🇷', code: 'PT' },
      en: { flag: '🇺🇸', code: 'EN' },
      es: { flag: '🇪🇸', code: 'ES' }
    };
    
    const config = languageConfig[this.currentLanguage];
    if (config && flagElement && langElement) {
      flagElement.textContent = config.flag;
      langElement.textContent = config.code;
    }
  }

  applyTranslations() {
    const currentTranslations = this.translations[this.currentLanguage];
    if (!currentTranslations) {
      console.warn(`No translations found for language: ${this.currentLanguage}`);
      return;
    }

    // Apply translations to elements with data-i18n attributes
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
      const translation = this.getNestedTranslation(currentTranslations, key);
      
      if (translation) {
        // Check if translation contains HTML
        if (typeof translation === 'string' && (translation.includes('<') && translation.includes('>'))) {
          element.innerHTML = translation;
        } else {
          element.textContent = translation;
        }
      }
    });

    // Apply placeholder translations
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      const translation = this.getNestedTranslation(currentTranslations, key);
      
      if (translation) {
        element.placeholder = translation;
      }
    });

    // Update currency symbols
    this.updateCurrencySymbols();
    
    // Update page title and meta
    this.updatePageMeta();
  }

  getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => {
      return current && current[key] ? current[key] : null;
    }, obj);
  }

  updateCurrencySymbols() {
    const currentTranslations = this.translations[this.currentLanguage];
    const currency = currentTranslations?.currency || 'R$';
    
    // Update all price elements
    const priceElements = document.querySelectorAll('.product-price');
    priceElements.forEach(element => {
      const text = element.textContent;
      const price = text.replace(/[R$MX$]/g, '').trim();
      element.textContent = `${currency}${price}`;
    });
  }

  updatePageMeta() {
    const currentTranslations = this.translations[this.currentLanguage];
    const meta = currentTranslations?.meta;
    
    if (meta) {
      // Update title
      if (meta.title) {
        document.title = meta.title;
      }
    
    // Update meta description
      const descriptionMeta = document.querySelector('meta[name="description"]');
      if (descriptionMeta && meta.description) {
        descriptionMeta.content = meta.description;
    }
    
    // Update meta keywords
      const keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (keywordsMeta && meta.keywords) {
        keywordsMeta.content = meta.keywords;
      }
    }
  }

  showLanguageChangeNotification(newLang) {
    const languageNames = {
      pt: 'Português',
      en: 'English', 
      es: 'Español'
    };
    
    const notification = document.createElement('div');
    notification.className = 'language-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">🌐</span>
        <span class="notification-text">Idioma alterado para ${languageNames[newLang]}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  trackLanguageChange(newLang) {
    // Track language change for analytics
    const event = {
      type: 'language_change',
      language: newLang,
      timestamp: new Date().toISOString(),
      page: window.location.pathname
    };
    
    // Store in localStorage for analytics
    const events = JSON.parse(localStorage.getItem('campingJourneyEvents') || '[]');
    events.push(event);
    localStorage.setItem('campingJourneyEvents', JSON.stringify(events));
    
    console.log('Language change tracked:', event);
  }

  // Public methods
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  getTranslation(key) {
    const currentTranslations = this.translations[this.currentLanguage];
    return this.getNestedTranslation(currentTranslations, key);
  }

  refreshTranslations() {
    this.applyTranslations();
  }
}

// Global functions for HTML onclick handlers
function toggleLanguageDropdown() {
  if (window.languageManager) {
    window.languageManager.toggleLanguageDropdown();
  }
}

function changeLanguage(lang) {
  if (window.languageManager) {
    window.languageManager.changeLanguage(lang);
  }
}

// Initialize Language Manager
let languageManager = null;

function initLanguageManager() {
  languageManager = new LanguageManager();
  window.languageManager = languageManager; // Make globally accessible
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguageManager);
} else {
  initLanguageManager();
}

// CSS for language notifications and dropdown
const languageStyles = `
  .language-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.95) 0%, rgba(245, 158, 11, 0.95) 100%);
    color: #1a1a1a;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    transform: translateX(100%);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .language-notification.show {
    transform: translateX(0);
  }

  .notification-content {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 14px;
  }

  .notification-icon {
    font-size: 16px;
  }

  .language-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background: rgba(26, 26, 26, 0.95);
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 8px;
    backdrop-filter: blur(15px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    display: none;
    min-width: 140px;
    z-index: 1000;
    transition: all 0.2s ease;
  }

  .language-option {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    cursor: pointer;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .language-option:last-child {
    border-bottom: none;
  }

  .language-option:hover {
    background: rgba(212, 175, 55, 0.2);
    color: var(--accent-color);
  }

  .language-option .flag {
    font-size: 16px;
  }

  .language-toggle-button {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 8px;
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%);
    border: 1px solid rgba(245, 158, 11, 0.3);
    border-radius: 6px;
    color: #f59e0b;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .language-toggle-button:hover {
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0.1) 100%);
    border-color: rgba(245, 158, 11, 0.5);
    transform: translateY(-1px);
  }

  .language-flag {
    font-size: 14px;
  }

  .language-code {
    font-size: 11px;
    font-weight: 700;
  }

  .language-arrow {
    width: 12px;
    height: 12px;
    fill: currentColor;
    transition: transform 0.2s ease;
  }

  .language-toggle-button:hover .language-arrow {
    transform: rotate(180deg);
  }
`;

// Inject styles
if (!document.querySelector('#language-styles')) {
  const style = document.createElement('style');
  style.id = 'language-styles';
  style.textContent = languageStyles;
  document.head.appendChild(style);
}

// Export for external use
window.LanguageManager = LanguageManager;
