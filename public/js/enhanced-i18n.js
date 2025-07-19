/**
 * ===================================
 * ENHANCED I18N SYSTEM - CAMPING JOURNEY
 * Combines existing JSON system with inline translations
 * ===================================
 */

class EnhancedI18nManager {
  constructor() {
    this.currentLanguage = 'pt';
    this.translations = {};
    this.jsonTranslations = {};
    this.isDropdownOpen = false;
    this.observers = [];
    
    this.init();
  }

  async init() {
    // Load saved preference
    this.currentLanguage = localStorage.getItem('campingJourneyLanguage') || 
                          localStorage.getItem('preferred-language') || 'pt';
    
    // Load both systems
    await this.loadJsonTranslations();
    this.loadInlineTranslations();
    
    // Merge translations
    this.mergeTranslations();
    
    // Setup UI
    this.setupLanguageControls();
    this.updateLanguageDisplay();
    this.applyTranslations();
    
    // Setup observers
    this.setupDOMObserver();
    
    console.log(`Enhanced I18n Manager initialized - Current: ${this.currentLanguage}`);
  }

  async loadJsonTranslations() {
    try {
      const languages = ['pt', 'en', 'es'];
      const promises = languages.map(async (lang) => {
        try {
          const response = await fetch(`/messages/${lang}/homepage.json`);
          if (response.ok) {
            this.jsonTranslations[lang] = await response.json();
          }
        } catch (error) {
          console.warn(`Failed to load JSON for ${lang}:`, error);
        }
      });
      
      await Promise.all(promises);
      console.log('JSON translations loaded:', Object.keys(this.jsonTranslations));
    } catch (error) {
      console.error('Error loading JSON translations:', error);
    }
  }

  loadInlineTranslations() {
    // Inline translations structure (as provided by user)
    this.translations = {
      pt: {
        nav: {
          home: "Início",
          products: "Produtos", 
          about: "Sobre",
          contact: "Contato",
          cart: "Carrinho",
          items: "Itens",
          readyStock: "Estoque Pronto",
          newArrivals: "Novidades",
          wildNews: "Wild News",
          ourStory: "Nossa História",
          community: "Comunidade"
        },
        hero: {
          title: "Equipamentos Premium para Suas Aventuras",
          subtitle: "Descubra nossa coleção cuidadosamente selecionada de equipamentos de camping ultralight e de alta qualidade.",
          tagline: "Equipamentos para explorar o México com estilo",
          cta: "Explorar Produtos",
          ctaSecondary: "Saiba Mais"
        },
        products: {
          local: "Produtos Locais (1-3 dias)",
          international: "Produtos Internacionais (7-15 dias)",
          addToCart: "Adicionar ao Carrinho",
          viewDetails: "Ver Detalhes",
          quickView: "Visualização Rápida",
          outOfStock: "Fora de Estoque",
          inStock: "Em Estoque",
          price: "Preço",
          originalPrice: "Preço Original",
          discount: "Desconto"
        },
        product: {
          category: {
            sleep: "Dormir",
            shelter: "Abrigo",
            cooking: "Cozinhar",
            tools: "Ferramentas"
          },
          sleepingBag: {
            title: "Saco de Dormir Premium",
            description: "Saco de dormir ultra-confortável com classificação para temperaturas até -5°C. Design compacto e leve."
          },
          delivery: {
            fast: "Entrega em 1-3 dias"
          },
          badge: {
            readyDelivery: "PRONTO PARA ENVIO"
          }
        },
        cart: {
          empty: {
            title: "Seu carrinho está vazio",
            subtitle: "Adicione alguns produtos incríveis!"
          },
          total: "Total:",
          clear: "Limpar Carrinho",
          checkout: "Finalizar Compra"
        },
        testimonials: {
          title: "O Que Nossos Aventureiros Dizem",
          subtitle: "Histórias reais de clientes satisfeitos",
          readMore: "Ler Mais",
          showLess: "Mostrar Menos"
        },
        community: {
          title: "Junte-se à Nossa Comunidade",
          subtitle: "Conecte-se com outros aventureiros e tenha acesso exclusivo",
          benefits: {
            offers: "Ofertas Exclusivas",
            tips: "Trilhas Secretas", 
            giveaways: "Sorteios Mensais",
            meetups: "Meetups Locais"
          },
          newsletter: {
            title: "Aventuras Direto no Seu Email",
            placeholder: "seu-email@exemplo.com",
            button: "ENTRAR NA JORNADA",
            privacy: "Sem spam. Apenas aventuras épicas."
          },
          socialProof: "Junte-se a 5.000+ aventureiros"
        },
        footer: {
          company: "Empresa",
          support: "Suporte",
          legal: "Legal",
          copyright: "© 2024 Camping Journey. Todos os direitos reservados.",
          newsletter: "Newsletter",
          followUs: "Siga-nos"
        },
        buttons: {
          close: "Fechar",
          open: "Abrir",
          save: "Salvar",
          cancel: "Cancelar",
          submit: "Enviar",
          loading: "Carregando...",
          success: "Sucesso!",
          error: "Erro",
          tryAgain: "Tentar Novamente"
        }
      },
      
      en: {
        nav: {
          home: "Home",
          products: "Products",
          about: "About", 
          contact: "Contact",
          cart: "Cart",
          items: "Items",
          readyStock: "Ready Stock",
          newArrivals: "New Arrivals",
          wildNews: "Wild News",
          ourStory: "Our Story",
          community: "Community"
        },
        hero: {
          title: "Premium Equipment for Your Adventures",
          subtitle: "Discover our carefully curated collection of ultralight, high-quality camping gear.",
          tagline: "Equipment to explore Mexico with style",
          cta: "Explore Products",
          ctaSecondary: "Learn More"
        },
        products: {
          local: "Local Products (1-3 days)",
          international: "International Products (7-15 days)",
          addToCart: "Add to Cart",
          viewDetails: "View Details",
          quickView: "Quick View",
          outOfStock: "Out of Stock",
          inStock: "In Stock",
          price: "Price",
          originalPrice: "Original Price",
          discount: "Discount"
        },
        product: {
          category: {
            sleep: "Sleep",
            shelter: "Shelter",
            cooking: "Cooking",
            tools: "Tools"
          },
          sleepingBag: {
            title: "Premium Sleeping Bag",
            description: "Ultra-comfortable sleeping bag rated for temperatures down to -5°C. Compact and lightweight design."
          },
          delivery: {
            fast: "Delivery in 1-3 days"
          },
          badge: {
            readyDelivery: "READY TO SHIP"
          }
        },
        cart: {
          empty: {
            title: "Your cart is empty",
            subtitle: "Add some awesome products!"
          },
          total: "Total:",
          clear: "Clear Cart",
          checkout: "Checkout"
        },
        testimonials: {
          title: "What Our Adventurers Say",
          subtitle: "Real stories from satisfied customers",
          readMore: "Read More",
          showLess: "Show Less"
        },
        community: {
          title: "Join Our Community",
          subtitle: "Connect with other adventurers and get exclusive access",
          benefits: {
            offers: "Exclusive Offers",
            tips: "Secret Trails", 
            giveaways: "Monthly Giveaways",
            meetups: "Local Meetups"
          },
          newsletter: {
            title: "Adventures Straight to Your Email",
            placeholder: "your-email@example.com",
            button: "JOIN THE JOURNEY",
            privacy: "No spam. Just epic adventures."
          },
          socialProof: "Join 5,000+ adventurers"
        },
        footer: {
          company: "Company",
          support: "Support",
          legal: "Legal",
          copyright: "© 2024 Camping Journey. All rights reserved.",
          newsletter: "Newsletter",
          followUs: "Follow Us"
        },
        buttons: {
          close: "Close",
          open: "Open",
          save: "Save",
          cancel: "Cancel",
          submit: "Submit",
          loading: "Loading...",
          success: "Success!",
          error: "Error",
          tryAgain: "Try Again"
        }
      },
      
      es: {
        nav: {
          home: "Inicio",
          products: "Productos",
          about: "Acerca",
          contact: "Contacto", 
          cart: "Carrito",
          items: "Artículos",
          readyStock: "Stock Listo",
          newArrivals: "Novedades",
          wildNews: "Wild News",
          ourStory: "Nuestra Historia",
          community: "Comunidad"
        },
        hero: {
          title: "Equipos Premium para Tus Aventuras",
          subtitle: "Descubre nuestra colección cuidadosamente seleccionada de equipos de camping ultraligeros y de alta calidad.",
          tagline: "Equipos para explorar México con estilo",
          cta: "Explorar Productos",
          ctaSecondary: "Saber Más"
        },
        products: {
          local: "Productos Locales (1-3 días)",
          international: "Productos Internacionales (7-15 días)",
          addToCart: "Agregar al Carrito",
          viewDetails: "Ver Detalles",
          quickView: "Vista Rápida",
          outOfStock: "Agotado",
          inStock: "En Stock",
          price: "Precio",
          originalPrice: "Precio Original",
          discount: "Descuento"
        },
        product: {
          category: {
            sleep: "Dormir",
            shelter: "Refugio",
            cooking: "Cocinar",
            tools: "Herramientas"
          },
          sleepingBag: {
            title: "Saco de Dormir Premium",
            description: "Saco de dormir ultra-cómodo clasificado para temperaturas hasta -5°C. Diseño compacto y ligero."
          },
          delivery: {
            fast: "Entrega en 1-3 días"
          },
          badge: {
            readyDelivery: "LISTO PARA ENVIAR"
          }
        },
        cart: {
          empty: {
            title: "Tu carrito está vacío",
            subtitle: "¡Agrega algunos productos increíbles!"
          },
          total: "Total:",
          clear: "Limpiar Carrito",
          checkout: "Finalizar Compra"
        },
        testimonials: {
          title: "Lo Que Dicen Nuestros Aventureros",
          subtitle: "Historias reales de clientes satisfechos",
          readMore: "Leer Más",
          showLess: "Mostrar Menos"
        },
        community: {
          title: "Únete a Nuestra Comunidad",
          subtitle: "Conéctate con otros aventureros y obtén acceso exclusivo",
          benefits: {
            offers: "Ofertas Exclusivas",
            tips: "Senderos Secretos", 
            giveaways: "Sorteos Mensuales",
            meetups: "Meetups Locales"
          },
          newsletter: {
            title: "Aventuras Directo en Tu Email",
            placeholder: "tu-email@ejemplo.com",
            button: "UNIRSE AL VIAJE",
            privacy: "Sin spam. Solo aventuras épicas."
          },
          socialProof: "Únete a 5,000+ aventureiros"
        },
        footer: {
          company: "Empresa",
          support: "Soporte",
          legal: "Legal",
          copyright: "© 2024 Camping Journey. Todos los derechos reservados.",
          newsletter: "Newsletter",
          followUs: "Síguenos"
        },
        buttons: {
          close: "Cerrar",
          open: "Abrir",
          save: "Guardar",
          cancel: "Cancelar",
          submit: "Enviar",
          loading: "Cargando...",
          success: "¡Éxito!",
          error: "Error",
          tryAgain: "Intentar de Nuevo"
        }
      }
    };
  }

  mergeTranslations() {
    // Merge JSON translations with inline translations
    Object.keys(this.translations).forEach(lang => {
      if (this.jsonTranslations[lang]) {
        this.translations[lang] = {
          ...this.translations[lang],
          ...this.jsonTranslations[lang],
          // Deep merge for nested objects
          nav: { ...this.translations[lang].nav, ...this.jsonTranslations[lang].nav },
          hero: { ...this.translations[lang].hero, ...this.jsonTranslations[lang].hero },
          community: { 
            ...this.translations[lang].community, 
            ...this.jsonTranslations[lang].community,
            newsletter: {
              ...this.translations[lang].community.newsletter,
              ...this.jsonTranslations[lang].community?.newsletter
            }
          }
        };
      }
    });
  }

  setupLanguageControls() {
    // Setup header language switcher
    const languageToggle = document.getElementById('language-toggle');
    const languageDropdown = document.getElementById('language-dropdown');
    
    if (languageToggle && languageDropdown) {
      // Clear existing listeners
      languageToggle.replaceWith(languageToggle.cloneNode(true));
      const newToggle = document.getElementById('language-toggle');
      
      newToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleLanguageDropdown();
      });

      // Setup language options
      const options = languageDropdown.querySelectorAll('.language-option');
      options.forEach(option => {
        option.replaceWith(option.cloneNode(true));
      });
      
      const newOptions = languageDropdown.querySelectorAll('.language-option');
      newOptions.forEach(option => {
        option.addEventListener('click', (e) => {
          e.preventDefault();
          const lang = option.dataset.lang;
          if (lang) {
            this.changeLanguage(lang);
          }
        });
      });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      const toggle = document.getElementById('language-toggle');
      const dropdown = document.getElementById('language-dropdown');
      
      if (toggle && dropdown && 
          !toggle.contains(e.target) && 
          !dropdown.contains(e.target)) {
        this.closeLanguageDropdown();
      }
    });
  }

  toggleLanguageDropdown() {
    const dropdown = document.getElementById('language-dropdown');
    if (!dropdown) return;

    this.isDropdownOpen = !this.isDropdownOpen;
    
    if (this.isDropdownOpen) {
      dropdown.classList.add('active');
      document.getElementById('language-toggle')?.setAttribute('aria-expanded', 'true');
    } else {
      dropdown.classList.remove('active');
      document.getElementById('language-toggle')?.setAttribute('aria-expanded', 'false');
    }
  }

  closeLanguageDropdown() {
    const dropdown = document.getElementById('language-dropdown');
    if (!dropdown) return;

    this.isDropdownOpen = false;
    dropdown.classList.remove('active');
    document.getElementById('language-toggle')?.setAttribute('aria-expanded', 'false');
  }

  // Main function to change language (as provided by user)
  changeLanguage(lang) {
    if (!this.translations[lang]) {
      console.warn(`Language ${lang} not available`);
      return;
    }

    this.currentLanguage = lang;
    
    // Save preference (both keys for compatibility)
    localStorage.setItem('campingJourneyLanguage', lang);
    localStorage.setItem('preferred-language', lang);
    
    // Update all texts
    this.updateTexts(lang);
    
    // Update dropdown visual
    this.updateLanguageDisplay();
    
    // Close dropdown
    this.closeLanguageDropdown();
    
    // Dispatch event for other components
    document.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: lang } 
    }));
    
    console.log(`Language changed to: ${lang}`);
  }

  // Enhanced function to update texts (as provided by user)
  updateTexts(lang) {
    const t = this.translations[lang];
    if (!t) return;

    try {
      // Update all elements with data-i18n attributes
      const elements = document.querySelectorAll('[data-i18n]');
      
      elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = this.getNestedTranslation(t, key);
        
        if (translation) {
          // Handle HTML content vs text content
          if (element.hasAttribute('data-i18n-html')) {
            element.innerHTML = translation;
          } else {
            element.textContent = translation;
          }
        }
      });

      // Update placeholders
      const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
      placeholderElements.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = this.getNestedTranslation(t, key);
        
        if (translation) {
          element.setAttribute('placeholder', translation);
        }
      });

      // Update aria-labels
      const ariaElements = document.querySelectorAll('[data-i18n-aria]');
      ariaElements.forEach(element => {
        const key = element.getAttribute('data-i18n-aria');
        const translation = this.getNestedTranslation(t, key);
        
        if (translation) {
          element.setAttribute('aria-label', translation);
        }
      });

      // Update titles
      const titleElements = document.querySelectorAll('[data-i18n-title]');
      titleElements.forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        const translation = this.getNestedTranslation(t, key);
        
        if (translation) {
          element.setAttribute('title', translation);
        }
      });

      console.log(`Texts updated for language: ${lang}`);
      
    } catch (error) {
      console.error('Error updating texts:', error);
    }
  }

  getNestedTranslation(translations, key) {
    return key.split('.').reduce((obj, k) => obj?.[k], translations);
  }

  updateLanguageDisplay() {
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
    
    // Update dropdown active state
    const options = document.querySelectorAll('.language-option');
    options.forEach(option => {
      if (option.dataset.lang === this.currentLanguage) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
  }

  applyTranslations() {
    this.updateTexts(this.currentLanguage);
  }

  setupDOMObserver() {
    // Watch for dynamically added elements
    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false;
      
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.hasAttribute && node.hasAttribute('data-i18n')) {
              shouldUpdate = true;
            }
            // Check children
            if (node.querySelectorAll) {
              const i18nElements = node.querySelectorAll('[data-i18n]');
              if (i18nElements.length > 0) {
                shouldUpdate = true;
              }
            }
          }
        });
      });
      
      if (shouldUpdate) {
        setTimeout(() => this.applyTranslations(), 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    this.observers.push(observer);
  }

  // Utility methods
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  getTranslation(key, lang = this.currentLanguage) {
    return this.getNestedTranslation(this.translations[lang], key);
  }

  getAllTranslations() {
    return this.translations;
  }

  // Cleanup
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Global functions for compatibility
function changeLanguage(lang) {
  if (window.enhancedI18n) {
    window.enhancedI18n.changeLanguage(lang);
  }
}

function updateTexts(lang) {
  if (window.enhancedI18n) {
    window.enhancedI18n.updateTexts(lang);
  }
}

function updateLanguageDropdown(lang) {
  if (window.enhancedI18n) {
    window.enhancedI18n.updateLanguageDisplay();
  }
}

// Initialize enhanced i18n system
let enhancedI18n = null;

function initEnhancedI18n() {
  if (!enhancedI18n) {
    enhancedI18n = new EnhancedI18nManager();
    window.enhancedI18n = enhancedI18n;
    
    // Make functions available globally
    window.changeLanguage = changeLanguage;
    window.updateTexts = updateTexts;
    window.updateLanguageDropdown = updateLanguageDropdown;
  }
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEnhancedI18n);
} else {
  initEnhancedI18n();
}

// Export for external use
window.EnhancedI18nManager = EnhancedI18nManager;
window.initEnhancedI18n = initEnhancedI18n; 