/**
 * ===================================
 * HEADER CONTROLS MANAGER - CAMPING JOURNEY
 * Manages all header control interactions
 * ===================================
 */

class HeaderControls {
  constructor() {
    this.isProfileOpen = false;
    this.isNotificationsOpen = false;
    this.notifications = [
      {
        id: 1,
        title: "¡Bienvenido a Camping Journey!",
        message: "Explora nuestros productos premium",
        time: "hace 2 min",
        type: "welcome",
        read: false
      }
    ];
    
    this.init();
  }

  init() {
    this.setupElements();
    this.setupEventListeners();
    this.updateNotificationBadge();
    console.log('Header Controls initialized');
  }

  setupElements() {
    this.helpButton = document.getElementById('help-center');
    this.notificationsButton = document.getElementById('notifications');
    this.profileButton = document.getElementById('profile-button');
    this.profileDropdown = document.getElementById('profile-dropdown');
    this.cartButton = document.getElementById('cart-button');
    this.cartCounter = document.getElementById('cart-counter');
  }

  setupEventListeners() {
    // Help Center
    if (this.helpButton) {
      this.helpButton.addEventListener('click', () => this.openHelpCenter());
    }

    // Notifications
    if (this.notificationsButton) {
      this.notificationsButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleNotifications();
      });
    }

    // Profile
    if (this.profileButton) {
      this.profileButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleProfile();
      });
    }

    // Cart
    if (this.cartButton) {
      this.cartButton.addEventListener('click', () => this.openCart());
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.profile-control')) {
        this.closeProfile();
      }
      if (!e.target.closest('.notification-control')) {
        this.closeNotifications();
      }
    });

    // Listen for cart updates
    document.addEventListener('cartUpdated', (e) => {
      this.updateCartCounter(e.detail.itemCount);
    });

    // Escape key to close dropdowns
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllDropdowns();
      }
    });
  }

  // Help Center
  openHelpCenter() {
    this.showToast('Centro de ayuda próximamente', 'info');
    
    // Could open a modal or redirect to help page
    console.log('Opening help center...');
  }

  // Notifications
  toggleNotifications() {
    if (this.isNotificationsOpen) {
      this.closeNotifications();
    } else {
      this.openNotifications();
    }
  }

  openNotifications() {
    this.isNotificationsOpen = true;
    this.closeProfile(); // Close other dropdowns
    
    // Create notifications dropdown if it doesn't exist
    this.createNotificationsDropdown();
    
    const dropdown = document.querySelector('.notifications-dropdown');
    if (dropdown) {
      dropdown.classList.add('active');
    }

    console.log('Notifications opened');
  }

  closeNotifications() {
    this.isNotificationsOpen = false;
    const dropdown = document.querySelector('.notifications-dropdown');
    if (dropdown) {
      dropdown.classList.remove('active');
    }
  }

  createNotificationsDropdown() {
    // Remove existing dropdown
    const existingDropdown = document.querySelector('.notifications-dropdown');
    if (existingDropdown) {
      existingDropdown.remove();
    }

    // Create new dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'notifications-dropdown';
    dropdown.innerHTML = `
      <div class="notifications-header">
        <h3>Notificaciones</h3>
        <button class="mark-all-read" onclick="headerControls.markAllNotificationsRead()">
          Marcar todas como leídas
        </button>
      </div>
      <div class="notifications-list">
        ${this.notifications.map(notification => `
          <div class="notification-item ${notification.read ? 'read' : 'unread'}" data-id="${notification.id}">
            <div class="notification-icon ${notification.type}">
              ${this.getNotificationIcon(notification.type)}
            </div>
            <div class="notification-content">
              <div class="notification-title">${notification.title}</div>
              <div class="notification-message">${notification.message}</div>
              <div class="notification-time">${notification.time}</div>
            </div>
            <button class="notification-close" onclick="headerControls.removeNotification(${notification.id})">×</button>
          </div>
        `).join('')}
      </div>
      <div class="notifications-footer">
        <a href="#" class="view-all-notifications">Ver todas las notificaciones</a>
      </div>
    `;

    // Add to notifications control
    const notificationsControl = this.notificationsButton.closest('.header-control');
    notificationsControl.appendChild(dropdown);

    // Add styles if not already added
    this.addNotificationStyles();
  }

  getNotificationIcon(type) {
    const icons = {
      welcome: '👋',
      order: '📦',
      promotion: '🎉',
      warning: '⚠️',
      info: 'ℹ️'
    };
    return icons[type] || 'ℹ️';
  }

  updateNotificationBadge() {
    const badge = document.querySelector('.notification-badge');
    const unreadCount = this.notifications.filter(n => !n.read).length;
    
    if (badge) {
      badge.textContent = unreadCount;
      badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
  }

  markAllNotificationsRead() {
    this.notifications.forEach(notification => {
      notification.read = true;
    });
    this.updateNotificationBadge();
    this.createNotificationsDropdown(); // Refresh dropdown
    this.showToast('Todas las notificaciones marcadas como leídas', 'success');
  }

  removeNotification(id) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.updateNotificationBadge();
    this.createNotificationsDropdown(); // Refresh dropdown
  }

  // Profile
  toggleProfile() {
    if (this.isProfileOpen) {
      this.closeProfile();
    } else {
      this.openProfile();
    }
  }

  openProfile() {
    this.isProfileOpen = true;
    this.closeNotifications(); // Close other dropdowns
    
    if (this.profileDropdown) {
      this.profileDropdown.classList.add('active');
    }

    console.log('Profile opened');
  }

  closeProfile() {
    this.isProfileOpen = false;
    if (this.profileDropdown) {
      this.profileDropdown.classList.remove('active');
    }
  }

  // Cart
  openCart() {
    // Trigger existing cart functionality
    if (window.cartSystem) {
      window.cartSystem.openCart();
    } else {
      this.showToast('Carrito próximamente', 'info');
    }
    console.log('Cart opened');
  }

  updateCartCounter(count) {
    if (this.cartCounter) {
      this.cartCounter.textContent = count;
      this.cartCounter.classList.toggle('has-items', count > 0);
    }
  }

  // Utility functions
  closeAllDropdowns() {
    this.closeProfile();
    this.closeNotifications();
  }

  showToast(message, type = 'info') {
    // Use existing toast system if available
    if (window.showToast) {
      window.showToast(message, type);
    } else {
      console.log(`Toast: ${message} (${type})`);
    }
  }

  addNotificationStyles() {
    if (document.querySelector('#notification-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'notification-styles';
    styles.textContent = `
      .notifications-dropdown {
        position: absolute;
        top: calc(100% + 8px);
        right: 0;
        background: rgba(26, 26, 26, 0.98);
        border: 1px solid rgba(212, 175, 55, 0.3);
        border-radius: 12px;
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(20px);
        width: 320px;
        max-height: 400px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        z-index: 1000;
        overflow: hidden;
      }

      .notifications-dropdown.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .notifications-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        background: rgba(212, 175, 55, 0.05);
      }

      .notifications-header h3 {
        margin: 0;
        color: #E5E7EB;
        font-size: 1rem;
        font-weight: 600;
      }

      .mark-all-read {
        background: none;
        border: none;
        color: #D4AF37;
        font-size: 0.8rem;
        cursor: pointer;
        transition: color 0.2s ease;
      }

      .mark-all-read:hover {
        color: #E5C046;
      }

      .notifications-list {
        max-height: 250px;
        overflow-y: auto;
      }

      .notification-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 15px 20px;
        border-bottom: 1px solid rgba(212, 175, 55, 0.1);
        transition: background 0.2s ease;
        position: relative;
      }

      .notification-item:hover {
        background: rgba(212, 175, 55, 0.05);
      }

      .notification-item.unread {
        background: rgba(212, 175, 55, 0.02);
      }

      .notification-item.unread::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: #D4AF37;
      }

      .notification-icon {
        font-size: 1.2rem;
        margin-top: 2px;
      }

      .notification-content {
        flex: 1;
      }

      .notification-title {
        font-size: 0.9rem;
        font-weight: 600;
        color: #E5E7EB;
        margin-bottom: 4px;
      }

      .notification-message {
        font-size: 0.8rem;
        color: #9CA3AF;
        margin-bottom: 6px;
      }

      .notification-time {
        font-size: 0.7rem;
        color: #6B7280;
      }

      .notification-close {
        background: none;
        border: none;
        color: #6B7280;
        cursor: pointer;
        font-size: 1.2rem;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.2s ease;
      }

      .notification-close:hover {
        color: #EF4444;
      }

      .notifications-footer {
        padding: 15px 20px;
        border-top: 1px solid rgba(212, 175, 55, 0.2);
        text-align: center;
      }

      .view-all-notifications {
        color: #D4AF37;
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 500;
        transition: color 0.2s ease;
      }

      .view-all-notifications:hover {
        color: #E5C046;
      }

      .notifications-list::-webkit-scrollbar {
        width: 4px;
      }

      .notifications-list::-webkit-scrollbar-track {
        background: rgba(212, 175, 55, 0.1);
      }

      .notifications-list::-webkit-scrollbar-thumb {
        background: rgba(212, 175, 55, 0.5);
        border-radius: 2px;
      }
    `;
    document.head.appendChild(styles);
  }
}

// Initialize header controls
let headerControls;

function initHeaderControls() {
  if (!headerControls) {
    headerControls = new HeaderControls();
    window.headerControls = headerControls;
  }
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeaderControls);
} else {
  initHeaderControls();
}

// Export
window.HeaderControls = HeaderControls;
window.initHeaderControls = initHeaderControls; 