/**
 * ===================================
 * HEADER DEBUG SCRIPT - CAMPING JOURNEY
 * Debug and test all header functionality
 * ===================================
 */

class HeaderDebugger {
  constructor() {
    this.init();
  }

  init() {
    console.log('🔍 Header Debugger initialized');
    this.checkElements();
    this.testFunctionality();
    this.addDebugButtons();
  }

  checkElements() {
    console.log('🔍 Checking header elements...');
    
    const elements = {
      'hamburger-menu': document.getElementById('hamburger-menu'),
      'hamburger-panel': document.getElementById('hamburger-panel'),
      'hamburger-overlay': document.getElementById('hamburger-overlay'),
      'language-toggle': document.getElementById('language-toggle'),
      'language-dropdown': document.getElementById('language-dropdown'),
      'theme-toggle': document.getElementById('theme-toggle'),
      'cart-button': document.getElementById('cart-button'),
      'current-flag': document.getElementById('current-flag'),
      'current-lang': document.getElementById('current-lang'),
      'menu-current-lang': document.getElementById('menu-current-lang')
    };

    Object.entries(elements).forEach(([name, element]) => {
      if (element) {
        console.log(`✅ ${name}: Found`);
      } else {
        console.warn(`❌ ${name}: Not found`);
      }
    });

    // Check CSS classes
    const hamburgerButton = document.getElementById('hamburger-menu');
    if (hamburgerButton) {
      console.log('🎨 Hamburger button classes:', hamburgerButton.className);
    }

    const hamburgerPanel = document.getElementById('hamburger-panel');
    if (hamburgerPanel) {
      console.log('🎨 Hamburger panel classes:', hamburgerPanel.className);
    }
  }

  testFunctionality() {
    console.log('🧪 Testing functionality...');
    
    // Test global functions
    const globalFunctions = [
      'toggleHamburgerMenu',
      'closeHamburgerMenu',
      'toggleLanguageDropdown',
      'toggleTheme'
    ];

    globalFunctions.forEach(funcName => {
      if (typeof window[funcName] === 'function') {
        console.log(`✅ ${funcName}: Available`);
      } else {
        console.warn(`❌ ${funcName}: Not available`);
      }
    });

    // Test managers
    if (window.headerFixes) {
      console.log('✅ HeaderFixes: Available');
      console.log('📊 Menu state:', window.headerFixes.getMenuState());
    } else {
      console.warn('❌ HeaderFixes: Not available');
    }

    if (window.hamburgerMenuManager) {
      console.log('✅ HamburgerMenuManager: Available');
    } else {
      console.warn('❌ HamburgerMenuManager: Not available');
    }

    if (window.languageManager) {
      console.log('✅ LanguageManager: Available');
    } else {
      console.warn('❌ LanguageManager: Not available');
    }
  }

  addDebugButtons() {
    // Create debug panel
    const debugPanel = document.createElement('div');
    debugPanel.id = 'header-debug-panel';
    debugPanel.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 15px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 12px;
      z-index: 10000;
      max-width: 350px;
      border: 1px solid #D4AF37;
      max-height: 400px;
      overflow-y: auto;
    `;

    debugPanel.innerHTML = `
      <div style="margin-bottom: 10px; font-weight: bold; color: #D4AF37;">Enhanced Debug Panel</div>
      <div style="margin-bottom: 8px; font-size: 10px; color: #ccc;">Header & I18n Testing</div>
      
      <button onclick="headerDebugger.testHamburgerMenu()" style="margin: 2px; padding: 4px 8px; font-size: 10px;">Test Hamburger</button>
      <button onclick="headerDebugger.testLanguageSwitch()" style="margin: 2px; padding: 4px 8px; font-size: 10px;">Test Language</button>
      <button onclick="headerDebugger.testThemeToggle()" style="margin: 2px; padding: 4px 8px; font-size: 10px;">Test Theme</button>
      
      <div style="margin: 8px 0; border-top: 1px solid #444;"></div>
      <div style="margin-bottom: 8px; font-size: 10px; color: #ccc;">I18n System Testing</div>
      
      <button onclick="headerDebugger.testTranslations()" style="margin: 2px; padding: 4px 8px; font-size: 10px;">Test Translations</button>
      <button onclick="headerDebugger.testDOMObserver()" style="margin: 2px; padding: 4px 8px; font-size: 10px;">Test DOM Observer</button>
      <button onclick="headerDebugger.cycleLanguages()" style="margin: 2px; padding: 4px 8px; font-size: 10px;">Cycle Languages</button>
      
      <div style="margin: 8px 0; border-top: 1px solid #444;"></div>
      <div style="margin-bottom: 8px; font-size: 10px; color: #ccc;">System State</div>
      
      <button onclick="headerDebugger.logState()" style="margin: 2px; padding: 4px 8px; font-size: 10px;">Log State</button>
      <button onclick="headerDebugger.showTranslationKeys()" style="margin: 2px; padding: 4px 8px; font-size: 10px;">Show Keys</button>
      
      <div style="margin: 8px 0; border-top: 1px solid #444;"></div>
      <button onclick="headerDebugger.closeDebug()" style="margin: 2px; padding: 4px 8px; font-size: 10px; background: #EF4444; color: white; width: 100%;">Close Debug Panel</button>
    `;

    document.body.appendChild(debugPanel);
    console.log('🔧 Enhanced debug panel added');
  }

  testHamburgerMenu() {
    console.log('🧪 Testing hamburger menu with enhanced animations...');
    
    const hamburgerButton = document.getElementById('hamburger-menu');
    const hamburgerPanel = document.getElementById('hamburger-panel');
    const hamburgerOverlay = document.getElementById('hamburger-overlay');

    if (hamburgerButton && hamburgerPanel && hamburgerOverlay) {
      console.log('📱 Elements found, testing enhanced animations...');
      
      // Test opening
      hamburgerButton.click();
      
      setTimeout(() => {
        const isOpen = hamburgerPanel.classList.contains('active');
        const hasOpeningClass = hamburgerPanel.classList.contains('opening');
        console.log(`📱 Menu is ${isOpen ? 'OPEN' : 'CLOSED'}`);
        console.log(`🎬 Opening animation: ${hasOpeningClass ? 'ACTIVE' : 'INACTIVE'}`);
        
        if (isOpen) {
          // Test animation classes
          console.log('🎨 Animation classes:', {
            opening: hamburgerPanel.classList.contains('opening'),
            closing: hamburgerPanel.classList.contains('closing'),
            active: hamburgerPanel.classList.contains('active')
          });
          
          setTimeout(() => {
            console.log('📱 Testing closing animation...');
            if (window.closeHamburgerMenu) {
              window.closeHamburgerMenu();
              
              // Check closing animation
              setTimeout(() => {
                const hasClosingClass = hamburgerPanel.classList.contains('closing');
                console.log(`🎬 Closing animation: ${hasClosingClass ? 'ACTIVE' : 'INACTIVE'}`);
              }, 50);
            }
          }, 2000);
        }
      }, 500);
    } else {
      console.error('❌ Hamburger menu elements not found');
    }
  }

  testLanguageSwitch() {
    console.log('🌐 Testing enhanced language system...');
    
    // Test enhanced i18n system first
    if (window.enhancedI18n && typeof window.enhancedI18n.changeLanguage === 'function') {
      const currentLang = window.enhancedI18n.getCurrentLanguage();
      const nextLang = currentLang === 'pt' ? 'en' : currentLang === 'en' ? 'es' : 'pt';
      
      console.log(`🌐 Enhanced I18n: Switching from ${currentLang} to ${nextLang}`);
      window.enhancedI18n.changeLanguage(nextLang);
      
      setTimeout(() => {
        const newLang = window.enhancedI18n.getCurrentLanguage();
        console.log(`🌐 Enhanced I18n: Language switched to: ${newLang}`);
        
        // Test translation retrieval
        const heroTitle = window.enhancedI18n.getTranslation('hero.title');
        console.log(`🔤 Sample translation (hero.title): "${heroTitle}"`);
        
        // Test nested translation
        const newsletterButton = window.enhancedI18n.getTranslation('community.newsletter.button');
        console.log(`🔤 Nested translation (community.newsletter.button): "${newsletterButton}"`);
      }, 1000);
      
    } else if (window.headerFixes && typeof window.headerFixes.changeLanguage === 'function') {
      // Fallback to header fixes
      const currentLang = localStorage.getItem('campingJourneyLanguage') || 'pt';
      const nextLang = currentLang === 'pt' ? 'en' : currentLang === 'en' ? 'es' : 'pt';
      
      console.log(`🌐 HeaderFixes: Switching from ${currentLang} to ${nextLang}`);
      window.headerFixes.changeLanguage(nextLang);
      
      setTimeout(() => {
        console.log(`🌐 HeaderFixes: Language switched to: ${localStorage.getItem('campingJourneyLanguage')}`);
      }, 1000);
      
    } else {
      console.error('❌ No language switcher available');
    }
  }

  testThemeToggle() {
    console.log('🎨 Testing theme toggle...');
    
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    console.log(`🎨 Current theme: ${currentTheme}`);
    
    if (window.toggleTheme) {
      window.toggleTheme();
      
      setTimeout(() => {
        const newTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        console.log(`🎨 Theme switched to: ${newTheme}`);
      }, 500);
    } else {
      console.error('❌ Theme toggle not available');
    }
  }

  logState() {
    console.log('📊 Current header state:');
    console.log('- Menu open:', document.getElementById('hamburger-panel')?.classList.contains('active'));
    console.log('- Language dropdown open:', document.getElementById('language-dropdown')?.classList.contains('active'));
    console.log('- Current language:', localStorage.getItem('campingJourneyLanguage'));
    console.log('- Current theme:', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    console.log('- Body classes:', document.body.className);
    
    if (window.headerFixes) {
      console.log('- HeaderFixes state:', window.headerFixes.getMenuState());
    }
  }

  closeDebug() {
    const debugPanel = document.getElementById('header-debug-panel');
    if (debugPanel) {
      debugPanel.remove();
      console.log('🔧 Debug panel closed');
    }
  }

  testTranslations() {
    console.log('🔤 Testing translation system...');
    
    if (!window.enhancedI18n) {
      console.error('❌ Enhanced I18n not available');
      return;
    }

    const testKeys = [
      'nav.home',
      'hero.title',
      'community.newsletter.button',
      'products.addToCart',
      'buttons.loading'
    ];

    const currentLang = window.enhancedI18n.getCurrentLanguage();
    console.log(`🌐 Testing translations for language: ${currentLang}`);

    testKeys.forEach(key => {
      const translation = window.enhancedI18n.getTranslation(key);
      console.log(`🔤 ${key}: "${translation}"`);
    });

    // Test all languages
    ['pt', 'en', 'es'].forEach(lang => {
      const heroTitle = window.enhancedI18n.getTranslation('hero.title', lang);
      console.log(`🌍 ${lang.toUpperCase()} hero.title: "${heroTitle}"`);
    });
  }

  testDOMObserver() {
    console.log('👁️ Testing DOM Observer...');
    
    if (!window.enhancedI18n) {
      console.error('❌ Enhanced I18n not available');
      return;
    }

    // Create a test element
    const testElement = document.createElement('div');
    testElement.setAttribute('data-i18n', 'nav.home');
    testElement.textContent = 'Original Text';
    testElement.style.cssText = 'position: fixed; top: 10px; left: 10px; background: yellow; padding: 5px; z-index: 9999;';
    
    document.body.appendChild(testElement);
    
    console.log('👁️ Test element added - should be translated automatically');
    
    setTimeout(() => {
      const translatedText = testElement.textContent;
      console.log(`👁️ Element text after observer: "${translatedText}"`);
      
      // Remove test element
      setTimeout(() => {
        testElement.remove();
        console.log('👁️ Test element removed');
      }, 3000);
    }, 500);
  }

  cycleLanguages() {
    console.log('🔄 Cycling through all languages...');
    
    if (!window.enhancedI18n) {
      console.error('❌ Enhanced I18n not available');
      return;
    }

    const languages = ['pt', 'en', 'es'];
    let currentIndex = 0;
    
    const cycle = () => {
      if (currentIndex < languages.length) {
        const lang = languages[currentIndex];
        console.log(`🔄 Switching to: ${lang.toUpperCase()}`);
        window.enhancedI18n.changeLanguage(lang);
        currentIndex++;
        setTimeout(cycle, 2000);
      } else {
        console.log('🔄 Language cycle complete');
      }
    };
    
    cycle();
  }

  showTranslationKeys() {
    console.log('🗝️ Showing all translation keys in DOM...');
    
    const elements = document.querySelectorAll('[data-i18n]');
    const keys = Array.from(elements).map(el => el.getAttribute('data-i18n'));
    const uniqueKeys = [...new Set(keys)].sort();
    
    console.log('🗝️ Translation keys found:', uniqueKeys);
    
    // Show which keys are missing translations
    if (window.enhancedI18n) {
      const currentLang = window.enhancedI18n.getCurrentLanguage();
      const missingKeys = uniqueKeys.filter(key => {
        const translation = window.enhancedI18n.getTranslation(key);
        return !translation || translation === key;
      });
      
      if (missingKeys.length > 0) {
        console.warn('⚠️ Missing translations for current language:', missingKeys);
      } else {
        console.log('✅ All keys have translations');
      }
    }
  }
}

// Initialize debugger
let headerDebugger = null;

function initHeaderDebugger() {
  if (!headerDebugger) {
    headerDebugger = new HeaderDebugger();
    window.headerDebugger = headerDebugger;
  }
}

// Auto-initialize in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  setTimeout(initHeaderDebugger, 2000);
}

// Export for manual initialization
window.initHeaderDebugger = initHeaderDebugger; 