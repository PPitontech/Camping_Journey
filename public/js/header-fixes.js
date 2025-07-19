/**
 * ===================================
 * HEADER FIXES - CAMPING JOURNEY
 * Comprehensive fixes for all header functionality
 * ===================================
 */

class HeaderFixes {
  constructor() {
    this.hamburgerButton = null;
    this.hamburgerPanel = null;
    this.hamburgerOverlay = null;
    this.languageDropdown = null;
    this.isMenuOpen = false;
    this.isLanguageDropdownOpen = false;
    
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupAll());
    } else {
      this.setupAll();
    }
  }

  setupAll() {
    this.setupElements();
    this.setupHamburgerMenu();
    this.setupLanguageSwitcher();
    this.setupThemeToggle();
    this.setupCartButton();
    this.addGlobalFunctions();
    
    console.log('Header fixes applied successfully');
  }

  setupElements() {
    // Get all header elements
    this.hamburgerButton = document.getElementById('hamburger-menu');
    this.hamburgerPanel = document.getElementById('hamburger-panel');
    this.hamburgerOverlay = document.getElementById('hamburger-overlay');
    this.languageDropdown = document.getElementById('language-dropdown');
    
    // Log what we found
    console.log('Header elements found:', {
      hamburgerButton: !!this.hamburgerButton,
      hamburgerPanel: !!this.hamburgerPanel,
      hamburgerOverlay: !!this.hamburgerOverlay,
      languageDropdown: !!this.languageDropdown
    });
  }

  setupHamburgerMenu() {
    if (!this.hamburgerButton || !this.hamburgerPanel || !this.hamburgerOverlay) {
      console.warn('Missing hamburger menu elements');
      return;
    }

    // Remove existing listeners to prevent duplicates
    this.hamburgerButton.removeEventListener('click', this.toggleHamburgerMenu);
    
    // Hamburger button click
    this.hamburgerButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleHamburgerMenu();
    });

    // Close button in panel
    const closeButton = this.hamburgerPanel.querySelector('.hamburger-close');
    if (closeButton) {
      closeButton.removeEventListener('click', this.closeHamburgerMenu);
      closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.closeHamburgerMenu();
      });
    }

    // Overlay click to close
    this.hamburgerOverlay.removeEventListener('click', this.closeHamburgerMenu);
    this.hamburgerOverlay.addEventListener('click', (e) => {
      if (e.target === this.hamburgerOverlay) {
        this.closeHamburgerMenu();
      }
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeHamburgerMenu();
      }
    });

    // Close menu on window resize (desktop)
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1200 && this.isMenuOpen) {
        this.closeHamburgerMenu();
      }
    });
  }

  toggleHamburgerMenu() {
    if (this.isMenuOpen) {
      this.closeHamburgerMenu();
    } else {
      this.openHamburgerMenu();
    }
  }

  openHamburgerMenu() {
    if (this.isMenuOpen) return;

    console.log('Opening hamburger menu...');
    
    this.isMenuOpen = true;

    // Add opening animation class
    this.hamburgerPanel?.classList.add('opening');
    this.hamburgerPanel?.classList.remove('closing');

    // Add active classes with slight delay for smooth animation
    this.hamburgerButton?.classList.add('active');
    this.hamburgerOverlay?.classList.add('active');
    document.body.classList.add('hamburger-menu-open');

    // Prevent background scrolling
    document.body.style.overflow = 'hidden';

    // Update ARIA attributes
    this.hamburgerButton?.setAttribute('aria-expanded', 'true');
    this.hamburgerPanel?.setAttribute('aria-hidden', 'false');

    // Add active class to panel after overlay appears
    setTimeout(() => {
      this.hamburgerPanel?.classList.add('active');
    }, 50);

    // Focus management after animation
    setTimeout(() => {
      const firstLink = this.hamburgerPanel?.querySelector('a, button');
      if (firstLink) {
        firstLink.focus();
      }
      // Remove animation class
      this.hamburgerPanel?.classList.remove('opening');
    }, 350);

    console.log('Hamburger menu opened with enhanced animations');
  }

  closeHamburgerMenu() {
    if (!this.isMenuOpen) return;

    console.log('Closing hamburger menu...');
    
    this.isMenuOpen = false;

    // Add closing animation class
    this.hamburgerPanel?.classList.add('closing');
    this.hamburgerPanel?.classList.remove('opening');

    // Remove active classes with animation timing
    this.hamburgerButton?.classList.remove('active');
    this.hamburgerPanel?.classList.remove('active');

    // Fade out overlay slightly delayed
    setTimeout(() => {
      this.hamburgerOverlay?.classList.remove('active');
    }, 100);

    // Update ARIA attributes
    this.hamburgerButton?.setAttribute('aria-expanded', 'false');
    this.hamburgerPanel?.setAttribute('aria-hidden', 'true');

    // Cleanup after animation completes
    setTimeout(() => {
      document.body.classList.remove('hamburger-menu-open');
      document.body.style.overflow = '';
      this.hamburgerPanel?.classList.remove('closing');
      
      // Return focus to hamburger button
      if (this.hamburgerButton) {
        this.hamburgerButton.focus();
      }
    }, 300);

    console.log('Hamburger menu closed with enhanced animations');
  }

  setupLanguageSwitcher() {
    const languageToggle = document.getElementById('language-toggle');
    const languageDropdown = document.getElementById('language-dropdown');
    
    if (!languageToggle || !languageDropdown) {
      console.warn('Language switcher elements not found');
      return;
    }

    // Toggle dropdown
    languageToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleLanguageDropdown();
    });

    // Language option clicks
    const languageOptions = languageDropdown.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = option.dataset.lang;
        if (lang) {
          this.changeLanguage(lang);
        }
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!languageToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
        this.closeLanguageDropdown();
      }
    });
  }

  toggleLanguageDropdown() {
    const dropdown = document.getElementById('language-dropdown');
    if (!dropdown) return;

    if (this.isLanguageDropdownOpen) {
      this.closeLanguageDropdown();
    } else {
      this.openLanguageDropdown();
    }
  }

  openLanguageDropdown() {
    const dropdown = document.getElementById('language-dropdown');
    const toggle = document.getElementById('language-toggle');
    
    if (!dropdown) return;

    this.isLanguageDropdownOpen = true;
    dropdown.classList.add('active');
    toggle?.setAttribute('aria-expanded', 'true');
    
    console.log('Language dropdown opened');
  }

  closeLanguageDropdown() {
    const dropdown = document.getElementById('language-dropdown');
    const toggle = document.getElementById('language-toggle');
    
    if (!dropdown) return;

    this.isLanguageDropdownOpen = false;
    dropdown.classList.remove('active');
    toggle?.setAttribute('aria-expanded', 'false');
    
    console.log('Language dropdown closed');
  }

  changeLanguage(lang) {
    console.log(`Changing language to: ${lang}`);
    
    // Update current language display
    const currentFlag = document.getElementById('current-flag');
    const currentLang = document.getElementById('current-lang');
    const menuCurrentLang = document.getElementById('menu-current-lang');
    
    const languages = {
      'pt': { flag: '🇧🇷', code: 'PT', name: 'Português' },
      'en': { flag: '🇺🇸', code: 'EN', name: 'English' },
      'es': { flag: '🇪🇸', code: 'ES', name: 'Español' }
    };
    
    const selectedLang = languages[lang];
    if (!selectedLang) return;
    
    // Update header display
    if (currentFlag) currentFlag.textContent = selectedLang.flag;
    if (currentLang) currentLang.textContent = selectedLang.code;
    if (menuCurrentLang) menuCurrentLang.textContent = `${selectedLang.code} ${selectedLang.flag}`;
    
    // Store preference
    localStorage.setItem('campingJourneyLanguage', lang);
    
    // Trigger language change event
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    
    // Close dropdown
    this.closeLanguageDropdown();
    
    // If language manager exists, use it
    if (window.languageManager && typeof window.languageManager.changeLanguage === 'function') {
      window.languageManager.changeLanguage(lang);
    }
    
    console.log(`Language changed to ${lang}`);
  }

  setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleTheme();
    });
  }

  toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('#theme-toggle i');
    const themeIndicator = document.getElementById('theme-indicator');
    
    if (body.classList.contains('dark-theme')) {
      // Switch to light theme
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
      if (themeIcon) themeIcon.className = 'fas fa-sun';
      if (themeIndicator) themeIndicator.textContent = '☀️';
      localStorage.setItem('campingJourneyTheme', 'light');
      console.log('Switched to light theme');
    } else {
      // Switch to dark theme
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
      if (themeIcon) themeIcon.className = 'fas fa-moon';
      if (themeIndicator) themeIndicator.textContent = '🌙';
      localStorage.setItem('campingJourneyTheme', 'dark');
      console.log('Switched to dark theme');
    }
  }

  setupCartButton() {
    const cartButton = document.getElementById('cart-button');
    if (!cartButton) return;

    cartButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.openCart();
    });
  }

  openCart() {
    // Cart functionality placeholder
    console.log('Cart opened');
    this.showNotification('Cart functionality coming soon!', 'info');
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 20px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      zIndex: '10000',
      transition: 'all 0.3s ease',
      transform: 'translateX(100%)',
      opacity: '0'
    });
    
    // Set background color based on type
    const colors = {
      info: '#3B82F6',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
      notification.style.opacity = '1';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      notification.style.opacity = '0';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  addGlobalFunctions() {
    // Make functions available globally for HTML onclick handlers
    window.toggleHamburgerMenu = () => this.toggleHamburgerMenu();
    window.closeHamburgerMenu = () => this.closeHamburgerMenu();
    window.toggleLanguageDropdown = () => this.toggleLanguageDropdown();
    window.toggleTheme = () => this.toggleTheme();
    
    // Make instance available globally
    window.headerFixes = this;
    
    console.log('Global header functions registered');
  }

  // Public methods for external use
  getMenuState() {
    return {
      isMenuOpen: this.isMenuOpen,
      isLanguageDropdownOpen: this.isLanguageDropdownOpen
    };
  }

  forceCloseAll() {
    this.closeHamburgerMenu();
    this.closeLanguageDropdown();
  }
}

// Auto-initialize
let headerFixes = null;

function initHeaderFixes() {
  if (!headerFixes) {
    headerFixes = new HeaderFixes();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeaderFixes);
} else {
  initHeaderFixes();
}

// Export for external use
window.HeaderFixes = HeaderFixes;
window.initHeaderFixes = initHeaderFixes; 