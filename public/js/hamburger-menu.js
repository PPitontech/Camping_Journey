/**
 * ===================================
 * HAMBURGER MENU - CAMPING JOURNEY
 * ===================================
 */

class HamburgerMenuManager {
  constructor() {
    this.isOpen = false;
    this.hamburgerButton = null;
    this.hamburgerPanel = null;
    this.hamburgerOverlay = null;
    this.focusableElements = [];
    this.lastFocusedElement = null;
    
    this.init();
  }

  init() {
    this.setupElements();
    this.setupEventListeners();
    this.setupKeyboardNavigation();
    this.updateMenuLanguage();
    
    console.log('Hamburger Menu Manager initialized');
  }

  setupElements() {
    this.hamburgerButton = document.getElementById('hamburger-menu');
    this.hamburgerPanel = document.getElementById('hamburger-panel');
    this.hamburgerOverlay = document.getElementById('hamburger-overlay');
    
    if (!this.hamburgerButton || !this.hamburgerPanel || !this.hamburgerOverlay) {
      console.error('Hamburger menu elements not found');
      return;
    }

    // Get all focusable elements in the menu
    this.updateFocusableElements();
  }

  updateFocusableElements() {
    if (!this.hamburgerPanel) return;
    
    this.focusableElements = this.hamburgerPanel.querySelectorAll(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
  }

  setupEventListeners() {
    // Hamburger button click
    if (this.hamburgerButton) {
      this.hamburgerButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleMenu();
      });
    }

    // Overlay click to close
    if (this.hamburgerOverlay) {
      this.hamburgerOverlay.addEventListener('click', () => {
        this.closeMenu();
      });
    }

    // Close button
    const closeButton = document.querySelector('.hamburger-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.closeMenu();
      });
    }

    // Window resize
    window.addEventListener('resize', () => {
      // Close menu on desktop
      if (window.innerWidth >= 1200 && this.isOpen) {
        this.closeMenu();
      }
    });

    // Language change integration
    document.addEventListener('languageChanged', () => {
      this.updateMenuLanguage();
    });
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          this.closeMenu();
          break;
        
        case 'Tab':
          this.handleTabNavigation(e);
          break;
      }
    });
  }

  handleTabNavigation(e) {
    if (!this.focusableElements.length) return;

    const firstElement = this.focusableElements[0];
    const lastElement = this.focusableElements[this.focusableElements.length - 1];

    if (e.shiftKey) {
      // Shift + Tab (backwards)
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab (forwards)
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    if (this.isOpen) return;

    this.isOpen = true;
    this.lastFocusedElement = document.activeElement;

    // Add classes for animation
    this.hamburgerButton?.classList.add('active');
    this.hamburgerPanel?.classList.add('active');
    this.hamburgerOverlay?.classList.add('active');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Focus first focusable element
    setTimeout(() => {
      if (this.focusableElements.length > 0) {
        this.focusableElements[0].focus();
      }
    }, 300);

    // Update ARIA attributes
    this.hamburgerButton?.setAttribute('aria-expanded', 'true');
    this.hamburgerPanel?.setAttribute('aria-hidden', 'false');

    // Dispatch custom event
    this.dispatchMenuEvent('menuOpened');

    console.log('Hamburger menu opened');
  }

  closeMenu() {
    if (!this.isOpen) return;

    this.isOpen = false;

    // Remove classes for animation
    this.hamburgerButton?.classList.remove('active');
    this.hamburgerPanel?.classList.remove('active');
    this.hamburgerOverlay?.classList.remove('active');

    // Restore body scroll
    document.body.style.overflow = '';

    // Restore focus
    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
      this.lastFocusedElement = null;
    }

    // Update ARIA attributes
    this.hamburgerButton?.setAttribute('aria-expanded', 'false');
    this.hamburgerPanel?.setAttribute('aria-hidden', 'true');

    // Dispatch custom event
    this.dispatchMenuEvent('menuClosed');

    console.log('Hamburger menu closed');
  }

  updateMenuLanguage() {
    // Update current language indicator in menu
    const menuCurrentLang = document.getElementById('menu-current-lang');
    const currentFlag = document.getElementById('current-flag');
    const currentLang = document.getElementById('current-lang');
    
    if (menuCurrentLang && currentFlag && currentLang) {
      menuCurrentLang.textContent = `${currentLang.textContent} ${currentFlag.textContent}`;
    }

    // Update theme indicator
    const themeIndicator = document.getElementById('theme-indicator');
    if (themeIndicator) {
      const isDark = document.body.classList.contains('dark-theme') || 
                     document.body.classList.contains('dark-mode');
      themeIndicator.textContent = isDark ? '🌙' : '☀️';
    }
  }

  dispatchMenuEvent(eventType) {
    const event = new CustomEvent(eventType, {
      detail: { isOpen: this.isOpen }
    });
    document.dispatchEvent(event);
  }

  // Public methods
  isMenuOpen() {
    return this.isOpen;
  }

  forceClose() {
    this.closeMenu();
  }

  refresh() {
    this.updateFocusableElements();
    this.updateMenuLanguage();
  }
}

// Global functions for HTML onclick handlers
function toggleHamburgerMenu() {
  if (window.hamburgerMenuManager) {
    window.hamburgerMenuManager.toggleMenu();
  }
}

function closeHamburgerMenu() {
  if (window.hamburgerMenuManager) {
    window.hamburgerMenuManager.closeMenu();
  }
}

// Menu section click handlers
function handleMenuSectionClick(sectionType, action) {
  console.log(`Menu action: ${sectionType} - ${action}`);
  
  switch (sectionType) {
    case 'profile':
      handleProfileAction(action);
      break;
    case 'settings':
      handleSettingsAction(action);
      break;
    case 'security':
      handleSecurityAction(action);
      break;
    case 'support':
      handleSupportAction(action);
      break;
    case 'company':
      handleCompanyAction(action);
      break;
    default:
      console.log(`Unhandled menu action: ${sectionType} - ${action}`);
  }
}

function handleProfileAction(action) {
  switch (action) {
    case 'login':
      showNotification('Login functionality coming soon!', 'info');
      break;
    case 'account':
      showNotification('Account page coming soon!', 'info');
      break;
    case 'orders':
      showNotification('Orders tracking coming soon!', 'info');
      break;
    case 'wishlist':
      showNotification('Wishlist feature coming soon!', 'info');
      break;
  }
}

function handleSettingsAction(action) {
  switch (action) {
    case 'language':
      // Language dropdown is handled by existing system
      break;
    case 'theme':
      // Theme toggle is handled by existing system
      break;
    case 'notifications':
      showNotification('Notification settings coming soon!', 'info');
      break;
    case 'currency':
      showNotification('Currency settings coming soon!', 'info');
      break;
  }
}

function handleSecurityAction(action) {
  switch (action) {
    case 'password':
      showNotification('Password change coming soon!', 'info');
      break;
    case '2fa':
      showNotification('Two-factor authentication coming soon!', 'info');
      break;
    case 'sessions':
      showNotification('Active sessions management coming soon!', 'info');
      break;
    case 'privacy':
      showNotification('Privacy policy page coming soon!', 'info');
      break;
  }
}

function handleSupportAction(action) {
  switch (action) {
    case 'faq':
      showNotification('FAQ page coming soon!', 'info');
      break;
    case 'contact':
      showNotification('Contact form coming soon!', 'info');
      break;
    case 'tracking':
      showNotification('Order tracking coming soon!', 'info');
      break;
    case 'returns':
      showNotification('Returns & warranty info coming soon!', 'info');
      break;
  }
}

function handleCompanyAction(action) {
  switch (action) {
    case 'about':
      showNotification('About us page coming soon!', 'info');
      break;
    case 'sustainability':
      showNotification('Sustainability page coming soon!', 'info');
      break;
    case 'careers':
      showNotification('Careers page coming soon!', 'info');
      break;
    case 'press':
      showNotification('Press page coming soon!', 'info');
      break;
  }
}

// Notification system for menu actions
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `menu-notification menu-notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">${getNotificationIcon(type)}</span>
      <span class="notification-message">${message}</span>
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

function getNotificationIcon(type) {
  const icons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌'
  };
  return icons[type] || icons.info;
}

// Initialize Hamburger Menu Manager
let hamburgerMenuManager = null;

function initHamburgerMenu() {
  hamburgerMenuManager = new HamburgerMenuManager();
  window.hamburgerMenuManager = hamburgerMenuManager; // Make globally accessible
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHamburgerMenu);
} else {
  initHamburgerMenu();
}

// CSS for menu notifications
const menuNotificationStyles = `
  .menu-notification {
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
    max-width: 300px;
  }

  .menu-notification.show {
    transform: translateX(0);
  }

  .menu-notification-success {
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.95) 0%, rgba(22, 163, 74, 0.95) 100%);
    color: white;
  }

  .menu-notification-warning {
    background: linear-gradient(135deg, rgba(251, 191, 36, 0.95) 0%, rgba(245, 158, 11, 0.95) 100%);
    color: #1a1a1a;
  }

  .menu-notification-error {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(220, 38, 38, 0.95) 100%);
    color: white;
  }

  .notification-content {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    font-size: 14px;
  }

  .notification-icon {
    font-size: 16px;
    flex-shrink: 0;
  }

  .notification-message {
    flex: 1;
  }

  /* Responsive notifications */
  @media (max-width: 480px) {
    .menu-notification {
      right: 10px;
      left: 10px;
      max-width: none;
      transform: translateY(-100%);
    }

    .menu-notification.show {
      transform: translateY(0);
    }
  }
`;

// Inject notification styles
if (!document.querySelector('#menu-notification-styles')) {
  const style = document.createElement('style');
  style.id = 'menu-notification-styles';
  style.textContent = menuNotificationStyles;
  document.head.appendChild(style);
}

// Integration with existing language system
document.addEventListener('languageChanged', (e) => {
  if (hamburgerMenuManager) {
    hamburgerMenuManager.updateMenuLanguage();
  }
});

// Integration with theme system
document.addEventListener('themeChanged', (e) => {
  if (hamburgerMenuManager) {
    hamburgerMenuManager.updateMenuLanguage();
  }
});

// Export for external use
window.HamburgerMenuManager = HamburgerMenuManager; 