/**
 * ===================================
 * NAVIGATION SYSTEM - COMPLETE FUNCTIONALITY
 * ===================================
 */

class NavigationSystem {
  constructor() {
    this.activeSection = '';
    this.scrollOffset = 80; // Offset for fixed header
    this.isScrolling = false;
    
    this.init();
  }

  init() {
    this.setupSmoothScrolling();
    this.setupActiveStates();
    this.setupNewsletterSignup();
    this.setupSocialLinks();
    this.setupCTAButtons();
    this.setupScrollToTop();
    
    console.log('Navigation System initialized');
  }

  setupSmoothScrolling() {
    // Handle all internal anchor links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link && link.getAttribute('href') !== '#') {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        this.scrollToSection(targetId);
      }
    });

    // Setup navigation links
    const navLinks = document.querySelectorAll('.nav-link, .section-links a, .menu-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          this.scrollToSection(targetId);
          
          // Close mobile menu if open
          if (window.headerFixes && typeof window.headerFixes.closeHamburgerMenu === 'function') {
            window.headerFixes.closeHamburgerMenu();
          }
        }
      });
    });

    // Setup hero CTA buttons
    const heroButtons = document.querySelectorAll('.btn-primary, .btn-premium');
    heroButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const href = button.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          this.scrollToSection(targetId);
        }
      });
    });
  }

  scrollToSection(targetId) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) {
      console.warn(`Section with ID "${targetId}" not found`);
      return;
    }

    this.isScrolling = true;
    
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - this.scrollOffset;
    
    // Smooth scroll with custom easing
    this.smoothScrollTo(targetPosition, 800);
    
    // Update active state
    setTimeout(() => {
      this.updateActiveStates(targetId);
      this.isScrolling = false;
    }, 850);
  }

  smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function (ease-in-out-cubic)
      const easeInOutCubic = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      window.scrollTo(0, startPosition + distance * easeInOutCubic);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }
    
    requestAnimationFrame(animation);
  }

  setupActiveStates() {
    // Intersection Observer for active states
    const sections = document.querySelectorAll('section[id], div[id]');
    const observerOptions = {
      root: null,
      rootMargin: `-${this.scrollOffset}px 0px -70% 0px`,
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      if (this.isScrolling) return; // Don't update during programmatic scrolling
      
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.updateActiveStates(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      if (section.id) {
        observer.observe(section);
      }
    });
  }

  updateActiveStates(activeId) {
    this.activeSection = activeId;
    
    // Update navigation links
    const navLinks = document.querySelectorAll('.nav-link, .section-links a, .menu-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const linkId = href.substring(1);
        if (linkId === activeId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });

    // Dispatch event for other components
    document.dispatchEvent(new CustomEvent('sectionChanged', {
      detail: { activeSection: activeId }
    }));
  }

  setupNewsletterSignup() {
    const newsletterForms = document.querySelectorAll('.newsletter-form, #newsletter-form');
    
    newsletterForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleNewsletterSubmission(form);
      });
    });

    // Newsletter buttons
    const newsletterButtons = document.querySelectorAll('.newsletter-btn, #newsletter-btn');
    newsletterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const form = button.closest('form') || document.querySelector('.newsletter-form, #newsletter-form');
        if (form) {
          this.handleNewsletterSubmission(form);
        }
      });
    });
  }

  async handleNewsletterSubmission(form) {
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('button[type="submit"], .newsletter-btn');
    
    if (!emailInput || !emailInput.value) {
      this.showNotification('Por favor, insira um email válido', 'error');
      return;
    }

    const email = emailInput.value.trim();
    if (!this.isValidEmail(email)) {
      this.showNotification('Por favor, insira um email válido', 'error');
      return;
    }

    // Show loading state
    const originalText = submitButton?.textContent;
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.classList.add('loading');
      
      const currentLang = localStorage.getItem('campingJourneyLanguage') || 'pt';
      const loadingText = {
        pt: 'Enviando...',
        en: 'Sending...',
        es: 'Enviando...'
      };
      submitButton.textContent = loadingText[currentLang] || 'Sending...';
    }

    try {
      // Simulate API call (replace with actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success
      const currentLang = localStorage.getItem('campingJourneyLanguage') || 'pt';
      const successMessage = {
        pt: 'Obrigado! Você foi inscrito com sucesso.',
        en: 'Thank you! You have been successfully subscribed.',
        es: 'Gracias! Te has suscrito exitosamente.'
      };
      
      this.showNotification(successMessage[currentLang] || 'Success!', 'success');
      emailInput.value = '';
      
      // Save subscription to localStorage
      const subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');
      subscriptions.push({
        email: email,
        subscribedAt: Date.now(),
        language: currentLang
      });
      localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));
      
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      
      const currentLang = localStorage.getItem('campingJourneyLanguage') || 'pt';
      const errorMessage = {
        pt: 'Erro ao inscrever. Tente novamente.',
        en: 'Error subscribing. Please try again.',
        es: 'Error al suscribirse. Inténtalo de nuevo.'
      };
      
      this.showNotification(errorMessage[currentLang] || 'Error!', 'error');
    } finally {
      // Reset button state
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        submitButton.textContent = originalText;
      }
    }
  }

  setupSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link, .social-media-link');
    
    socialLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // If it's a placeholder link, show coming soon message
        if (!href || href === '#' || href === 'javascript:void(0)') {
          e.preventDefault();
          
          const currentLang = localStorage.getItem('campingJourneyLanguage') || 'pt';
          const message = {
            pt: 'Em breve! Siga-nos para updates.',
            en: 'Coming soon! Follow us for updates.',
            es: 'Próximamente! Síguenos para actualizaciones.'
          };
          
          this.showNotification(message[currentLang] || 'Coming soon!', 'info');
          return;
        }
        
        // Open social links in new tab
        if (href.includes('facebook.com') || href.includes('instagram.com') || 
            href.includes('twitter.com') || href.includes('linkedin.com') ||
            href.includes('youtube.com') || href.includes('tiktok.com')) {
          e.preventDefault();
          window.open(href, '_blank', 'noopener,noreferrer');
        }
      });
    });

    // Setup social media URLs (replace with actual URLs)
    const socialUrls = {
      facebook: 'https://facebook.com/campingjourneymx',
      instagram: 'https://instagram.com/campingjourneymx',
      twitter: 'https://twitter.com/campingjourneymx',
      youtube: 'https://youtube.com/@campingjourneymx'
    };

    // Update social links with actual URLs
    Object.keys(socialUrls).forEach(platform => {
      const links = document.querySelectorAll(`[data-social="${platform}"], .${platform}-link`);
      links.forEach(link => {
        if (!link.getAttribute('href') || link.getAttribute('href') === '#') {
          link.setAttribute('href', socialUrls[platform]);
        }
      });
    });
  }

  setupCTAButtons() {
    // Primary CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button, .btn-cta');
    
    ctaButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const action = button.dataset.action;
        
        switch (action) {
          case 'explore-products':
            e.preventDefault();
            this.scrollToSection('products');
            break;
          case 'contact':
            e.preventDefault();
            this.scrollToSection('contact');
            break;
          case 'about':
            e.preventDefault();
            this.scrollToSection('about');
            break;
          default:
            // Handle other CTA actions
            break;
        }
      });
    });

    // Secondary action buttons
    const secondaryButtons = document.querySelectorAll('.btn-secondary, .btn-outline');
    secondaryButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const href = button.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          this.scrollToSection(targetId);
        }
      });
    });
  }

  setupScrollToTop() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #D4AF37;
      color: white;
      border: none;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      z-index: 1000;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
    `;

    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.transform = 'translateY(0)';
      } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.transform = 'translateY(20px)';
      }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
      this.smoothScrollTo(0, 600);
    });
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const colors = {
      success: '#10B981',
      error: '#EF4444',
      info: '#3B82F6',
      warning: '#F59E0B'
    };
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${colors[type] || colors.info};
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      font-weight: 500;
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      max-width: 300px;
      word-wrap: break-word;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Animate out and remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 4000);
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Public API
  scrollTo(targetId) {
    this.scrollToSection(targetId);
  }

  getActiveSection() {
    return this.activeSection;
  }
}

// Global functions for compatibility
window.scrollToSection = function(targetId) {
  if (window.navigationSystem) {
    window.navigationSystem.scrollToSection(targetId);
  }
};

window.showNotification = function(message, type = 'info') {
  if (window.navigationSystem) {
    window.navigationSystem.showNotification(message, type);
  }
};

// Initialize when DOM is ready
function initNavigationSystem() {
  if (!window.navigationSystem) {
    window.navigationSystem = new NavigationSystem();
  }
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavigationSystem);
} else {
  initNavigationSystem();
}

// Export
window.NavigationSystem = NavigationSystem;
window.initNavigationSystem = initNavigationSystem; 