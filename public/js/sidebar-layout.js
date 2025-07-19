/**
 * ===================================
 * SIDEBAR LAYOUT CONTROLLER - CAMPING JOURNEY
 * Complete sidebar functionality with dark mode and responsive behavior
 * ===================================
 */

class SidebarLayoutController {
  constructor() {
    this.isSidebarOpen = false;
    this.isDesktop = window.innerWidth >= 1024;
    this.currentTheme = 'dark';
    this.currentLanguage = 'pt';
    
    this.init();
    this.ensureSidebarClosed(); // Garantir que inicia fechado
  }

  init() {
    this.setupElements();
    this.setupEventListeners();
    this.setupDarkMode();
    this.setupLanguageSystem();
    this.setupResponsive();
    this.setupNavigation();
    
    console.log('Sidebar Layout Controller initialized');
  }

  setupElements() {
    // Sidebar elements
    this.sidebar = document.getElementById('sidebar');
    this.sidebarOverlay = document.getElementById('sidebarOverlay');
    this.sidebarClose = document.getElementById('sidebarClose');
    this.mainContent = document.getElementById('mainContent');
    
    // Header hamburger menu
    this.hamburgerMenu = document.getElementById('hamburger-menu');
    
    // Dark mode toggle
    this.darkModeToggle = document.getElementById('darkModeToggle');
    this.sunIcon = this.darkModeToggle?.querySelector('.sun-icon');
    this.moonIcon = this.darkModeToggle?.querySelector('.moon-icon');
    
    // Language elements
    this.languageToggleSidebar = document.getElementById('languageToggleSidebar');
    this.languageDropdownSidebar = document.getElementById('languageDropdownSidebar');
    this.currentFlagSidebar = document.getElementById('currentFlagSidebar');
    this.currentLangSidebar = document.getElementById('currentLangSidebar');
    
    // Navigation links
    this.sidebarLinks = document.querySelectorAll('.sidebar-link');
  }

  setupEventListeners() {
    // Hamburger menu toggle
    if (this.hamburgerMenu) {
      this.hamburgerMenu.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleSidebar();
      });
    }

    // Sidebar close button
    if (this.sidebarClose) {
      this.sidebarClose.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeSidebar();
      });
    }

    // Overlay click to close
    if (this.sidebarOverlay) {
      this.sidebarOverlay.addEventListener('click', () => {
        this.closeSidebar();
      });
    }

    // Dark mode toggle
    if (this.darkModeToggle) {
      this.darkModeToggle.addEventListener('click', () => {
        this.toggleDarkMode();
      });
    }

    // Language toggle
    if (this.languageToggleSidebar) {
      this.languageToggleSidebar.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleLanguageDropdown();
      });
    }

    // Language options
    if (this.languageDropdownSidebar) {
      this.languageDropdownSidebar.addEventListener('click', (e) => {
        const option = e.target.closest('.language-option');
        if (option) {
          e.preventDefault();
          const lang = option.dataset.lang;
          if (lang) {
            this.changeLanguage(lang);
          }
        }
      });
    }

    // Close language dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (this.languageToggleSidebar && this.languageDropdownSidebar &&
          !this.languageToggleSidebar.contains(e.target) &&
          !this.languageDropdownSidebar.contains(e.target)) {
        this.closeLanguageDropdown();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.isSidebarOpen) {
          this.closeSidebar();
        }
        if (this.languageDropdownSidebar?.classList.contains('active')) {
          this.closeLanguageDropdown();
        }
      }
    });

    // Window resize
    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  toggleSidebar() {
    if (this.isSidebarOpen) {
      this.closeSidebar();
    } else {
      this.openSidebar();
    }
  }

  openSidebar() {
    if (!this.sidebar) return;

    this.isSidebarOpen = true;

    // Add active classes
    this.sidebar.classList.add('active');
    if (this.sidebarOverlay) this.sidebarOverlay.classList.add('active');

    // Prevent body scroll on mobile
    if (!this.isDesktop) {
      document.body.classList.add('sidebar-open');
    }

    // Update hamburger menu state
    if (this.hamburgerMenu) {
      this.hamburgerMenu.classList.add('active');
    }

    // Focus management
    setTimeout(() => {
      const firstLink = this.sidebar.querySelector('.sidebar-link');
      if (firstLink) {
        firstLink.focus();
      }
    }, 300);

    console.log('Sidebar opened');
  }

  closeSidebar() {
    if (!this.sidebar) return;

    this.isSidebarOpen = false;

    // Remove active classes
    this.sidebar.classList.remove('active');
    if (this.sidebarOverlay) this.sidebarOverlay.classList.remove('active');

    // Restore body scroll
    document.body.classList.remove('sidebar-open');

    // Update hamburger menu state
    if (this.hamburgerMenu) {
      this.hamburgerMenu.classList.remove('active');
    }

    // Return focus to hamburger menu
    if (this.hamburgerMenu) {
      this.hamburgerMenu.focus();
    }

    console.log('Sidebar closed');
  }

  setupDarkMode() {
    // Load saved theme
    const savedTheme = localStorage.getItem('campingJourneyTheme') || 
                      localStorage.getItem('theme') || 'dark';
    this.applyTheme(savedTheme);
  }

  toggleDarkMode() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    
    // Set data attribute on document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update body class for compatibility
    document.body.classList.toggle('dark-theme', theme === 'dark');
    document.body.classList.toggle('light-theme', theme === 'light');
    
    // Update icon visibility
    if (this.sunIcon && this.moonIcon) {
      if (theme === 'dark') {
        this.sunIcon.classList.add('hidden');
        this.moonIcon.classList.remove('hidden');
      } else {
        this.sunIcon.classList.remove('hidden');
        this.moonIcon.classList.add('hidden');
      }
    }
    
    // Save theme
    localStorage.setItem('campingJourneyTheme', theme);
    localStorage.setItem('theme', theme);
    
    // Dispatch event
    document.dispatchEvent(new CustomEvent('themeChanged', {
      detail: { theme: theme }
    }));
    
    console.log(`Theme changed to: ${theme}`);
  }

  setupLanguageSystem() {
    // Load saved language
    this.currentLanguage = localStorage.getItem('campingJourneyLanguage') || 
                          localStorage.getItem('preferred-language') || 'pt';
    this.updateLanguageDisplay();
  }

  toggleLanguageDropdown() {
    if (!this.languageDropdownSidebar) return;

    const isOpen = this.languageDropdownSidebar.classList.contains('active');
    
    if (isOpen) {
      this.closeLanguageDropdown();
    } else {
      this.openLanguageDropdown();
    }
  }

  openLanguageDropdown() {
    if (!this.languageDropdownSidebar) return;

    this.languageDropdownSidebar.classList.add('active');
    this.updateLanguageOptions();
    
    // Focus first option
    setTimeout(() => {
      const firstOption = this.languageDropdownSidebar.querySelector('.language-option');
      if (firstOption) {
        firstOption.focus();
      }
    }, 100);
  }

  closeLanguageDropdown() {
    if (!this.languageDropdownSidebar) return;

    this.languageDropdownSidebar.classList.remove('active');
  }

  changeLanguage(lang) {
    if (!['pt', 'en', 'es'].includes(lang)) return;

    this.currentLanguage = lang;
    
    // Save language
    localStorage.setItem('campingJourneyLanguage', lang);
    localStorage.setItem('preferred-language', lang);
    
    // Update display
    this.updateLanguageDisplay();
    this.updateLanguageOptions();
    
    // Close dropdown
    this.closeLanguageDropdown();
    
    // Use enhanced i18n system if available
    if (window.enhancedI18n && typeof window.enhancedI18n.changeLanguage === 'function') {
      window.enhancedI18n.changeLanguage(lang);
    }
    
    // Dispatch event
    document.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { language: lang }
    }));
    
    console.log(`Language changed to: ${lang}`);
  }

  updateLanguageDisplay() {
    const languages = {
      'pt': { flag: '🇧🇷', code: 'PT', name: 'Português' },
      'en': { flag: '🇺🇸', code: 'EN', name: 'English' },
      'es': { flag: '🇪🇸', code: 'ES', name: 'Español' }
    };
    
    const selectedLang = languages[this.currentLanguage];
    if (!selectedLang) return;
    
    // Update sidebar display
    if (this.currentFlagSidebar) this.currentFlagSidebar.textContent = selectedLang.flag;
    if (this.currentLangSidebar) this.currentLangSidebar.textContent = selectedLang.code;
  }

  updateLanguageOptions() {
    const options = this.languageDropdownSidebar?.querySelectorAll('.language-option');
    if (!options) return;

    options.forEach(option => {
      if (option.dataset.lang === this.currentLanguage) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
  }

  setupNavigation() {
    // Setup smooth scrolling for sidebar links
    this.sidebarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          this.scrollToSection(targetId);
          
          // Close sidebar on mobile after navigation
          if (!this.isDesktop) {
            setTimeout(() => {
              this.closeSidebar();
            }, 300);
          }
          
          // Update active link
          this.updateActiveLink(link);
        }
      });
    });

    // Setup intersection observer for active states
    this.setupScrollSpy();
  }

  scrollToSection(targetId) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const headerHeight = 80;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    
    // Smooth scroll
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  updateActiveLink(activeLink) {
    this.sidebarLinks.forEach(link => {
      link.classList.remove('active');
    });
    activeLink.classList.add('active');
  }

  setupScrollSpy() {
    const sections = document.querySelectorAll('section[id], div[id]');
    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -70% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetId = entry.target.id;
          const correspondingLink = document.querySelector(`.sidebar-link[href="#${targetId}"]`);
          if (correspondingLink) {
            this.updateActiveLink(correspondingLink);
          }
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      if (section.id) {
        observer.observe(section);
      }
    });
  }

  setupResponsive() {
    this.handleResize();
  }

  handleResize() {
    const wasDesktop = this.isDesktop;
    this.isDesktop = window.innerWidth >= 1024;

    // Always close sidebar on resize to maintain consistent behavior
    this.closeSidebar();
    document.body.classList.remove('sidebar-open');
  }

  // Garantir que sidebar inicia fechado
  ensureSidebarClosed() {
    if (this.sidebar) {
      this.sidebar.classList.remove('active');
    }
    if (this.sidebarOverlay) {
      this.sidebarOverlay.classList.remove('active');
    }
    document.body.classList.remove('sidebar-open');
    
    if (this.hamburgerMenu) {
      this.hamburgerMenu.classList.remove('active');
    }
    
    this.isSidebarOpen = false;
    console.log('Sidebar initialized as closed');
  }

  // Public API
  getSidebarState() {
    return {
      isOpen: this.isSidebarOpen,
      isDesktop: this.isDesktop,
      theme: this.currentTheme,
      language: this.currentLanguage
    };
  }

  openSidebarProgrammatically() {
    this.openSidebar();
  }

  closeSidebarProgrammatically() {
    this.closeSidebar();
  }
}

// Global functions for compatibility
window.toggleSidebar = function() {
  if (window.sidebarController) {
    window.sidebarController.toggleSidebar();
  }
};

window.openSidebar = function() {
  if (window.sidebarController) {
    window.sidebarController.openSidebarProgrammatically();
  }
};

window.closeSidebar = function() {
  if (window.sidebarController) {
    window.sidebarController.closeSidebarProgrammatically();
  }
};

window.toggleDarkMode = function() {
  if (window.sidebarController) {
    window.sidebarController.toggleDarkMode();
  }
};

// Initialize sidebar controller
function initSidebarController() {
  if (!window.sidebarController) {
    window.sidebarController = new SidebarLayoutController();
  }
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSidebarController);
} else {
  initSidebarController();
}

// Export
window.SidebarLayoutController = SidebarLayoutController;
window.initSidebarController = initSidebarController; 