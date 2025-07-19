/**
 * ===================================
 * UTILITIES PANEL CONTROLLER - CAMPING JOURNEY
 * Premium control panel functionality
 * ===================================
 */

class UtilitiesPanel {
  constructor() {
    this.isOpen = false;
    this.init();
  }

  init() {
    this.setupElements();
    this.setupEventListeners();
    console.log('Utilities Panel initialized');
  }

  setupElements() {
    this.toggleBtn = document.getElementById('utilities-toggle');
    this.panel = document.getElementById('utilities-panel');
    this.overlay = document.getElementById('utilities-overlay');
    this.closeBtn = document.getElementById('utilities-close');
  }

  setupEventListeners() {
    // Toggle button
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle();
      });
    }

    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
      });
    }

    // Overlay click to close
    if (this.overlay) {
      this.overlay.addEventListener('click', () => {
        this.close();
      });
    }

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (!this.panel) return;

    this.isOpen = true;
    this.panel.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus management
    setTimeout(() => {
      if (this.closeBtn) {
        this.closeBtn.focus();
      }
    }, 300);

    console.log('Utilities panel opened');
  }

  close() {
    if (!this.panel) return;

    this.isOpen = false;
    this.panel.classList.remove('active');
    document.body.style.overflow = '';

    // Return focus to toggle button
    if (this.toggleBtn) {
      this.toggleBtn.focus();
    }

    console.log('Utilities panel closed');
  }
}

// Utility Functions
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copiado: ${text}`, 'success');
  }).catch(() => {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast(`Copiado: ${text}`, 'success');
  });
}

function refreshSite() {
  showToast('Actualizando sitio...', 'info');
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

function toggleMaintenanceMode() {
  showToast('Modo mantenimiento no disponible en demo', 'warning');
}

function showToast(message, type = 'info') {
  // Remove existing toasts
  const existingToasts = document.querySelectorAll('.toast');
  existingToasts.forEach(toast => toast.remove());

  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-icon">${getToastIcon(type)}</span>
      <span class="toast-message">${message}</span>
    </div>
  `;

  // Add toast styles if not already added
  if (!document.querySelector('#toast-styles')) {
    const toastStyles = document.createElement('style');
    toastStyles.id = 'toast-styles';
    toastStyles.textContent = `
      .toast {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        animation: slideInRight 0.3s ease;
        max-width: 350px;
      }
      
      .toast-success {
        background: rgba(16, 185, 129, 0.9);
        border: 1px solid rgba(16, 185, 129, 0.5);
        color: white;
      }
      
      .toast-info {
        background: rgba(59, 130, 246, 0.9);
        border: 1px solid rgba(59, 130, 246, 0.5);
        color: white;
      }
      
      .toast-warning {
        background: rgba(245, 158, 11, 0.9);
        border: 1px solid rgba(245, 158, 11, 0.5);
        color: white;
      }
      
      .toast-error {
        background: rgba(239, 68, 68, 0.9);
        border: 1px solid rgba(239, 68, 68, 0.5);
        color: white;
      }
      
      .toast-content {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .toast-icon {
        font-size: 1.1rem;
      }
      
      .toast-message {
        font-size: 0.9rem;
        font-weight: 500;
      }
      
      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(100px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes slideOutRight {
        from {
          opacity: 1;
          transform: translateX(0);
        }
        to {
          opacity: 0;
          transform: translateX(100px);
        }
      }
    `;
    document.head.appendChild(toastStyles);
  }

  // Add to DOM
  document.body.appendChild(toast);

  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease forwards';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 300);
  }, 3000);
}

function getToastIcon(type) {
  const icons = {
    success: '✅',
    info: 'ℹ️',
    warning: '⚠️',
    error: '❌'
  };
  return icons[type] || icons.info;
}

// Initialize utilities panel
let utilitiesPanel;

function initUtilitiesPanel() {
  if (!utilitiesPanel) {
    utilitiesPanel = new UtilitiesPanel();
    window.utilitiesPanel = utilitiesPanel;
  }
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initUtilitiesPanel);
} else {
  initUtilitiesPanel();
}

// Export
window.UtilitiesPanel = UtilitiesPanel;
window.initUtilitiesPanel = initUtilitiesPanel;
window.copyToClipboard = copyToClipboard;
window.refreshSite = refreshSite;
window.toggleMaintenanceMode = toggleMaintenanceMode; 