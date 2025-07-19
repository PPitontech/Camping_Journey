/**
 * ===================================
 * PREMIUM COMMUNITY FUNCTIONALITY - CAMPING JOURNEY
 * ===================================
 */

class CommunityManager {
  constructor() {
    this.memberCount = 5000;
    this.adventuresCount = 1200;
    this.satisfactionRate = 98;
    this.testimonials = [
      {
        quote: "Comunidade incrível! Já fui em 3 expedições organizadas por eles.",
        author: "Carlos M., Guadalajara"
      },
      {
        quote: "Os equipamentos são de primeira qualidade. Recomendo!",
        author: "Ana S., México DF"
      },
      {
        quote: "Grupo do Telegram é muito ativo. Sempre compartilham dicas valiosas.",
        author: "Roberto L., Cancún"
      },
      {
        quote: "Comprei minha barraca aqui e foi a melhor decisão. Durabilidade incrível!",
        author: "Maria F., Monterrey"
      },
      {
        quote: "Atendimento excepcional e produtos que realmente funcionam na aventura.",
        author: "João P., Tijuana"
      }
    ];
    this.currentTestimonial = 0;
    this.newsletterSubmitted = false;
    
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupNewsletterForm();
    this.startTestimonialRotation();
    this.setupCounterAnimations();
    this.updateMemberCount();
    this.trackPageView();
    
    console.log('Community Manager initialized');
  }

  setupScrollAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const delay = parseInt(element.dataset.delay) || 0;
          
          setTimeout(() => {
            element.classList.add('animate');
            
            // Trigger counter animation if it's a stat number
            if (element.classList.contains('stat-number-premium')) {
              this.animateCounter(element);
            }
          }, delay);
          
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('[data-animation]');
    animatedElements.forEach(element => observer.observe(element));

    // Observe stat numbers specifically
    const statNumbers = document.querySelectorAll('.stat-number-premium');
    statNumbers.forEach(element => observer.observe(element));
  }

  animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    element.classList.add('counting');
    
    const timer = setInterval(() => {
      current += increment;
      
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      // Format number based on target
      let displayValue;
      if (target >= 1000) {
        displayValue = (current / 1000).toFixed(1) + 'K+';
      } else if (target === 98) {
        displayValue = Math.round(current) + '%';
      } else {
        displayValue = Math.round(current) + '+';
      }
      
      element.textContent = displayValue;
    }, duration / steps);
  }

  setupNewsletterForm() {
    const form = document.getElementById('newsletter-form-premium');
    const emailInput = document.getElementById('newsletter-email-premium');
    const submitButton = form?.querySelector('.newsletter-submit-premium');
    const messageDiv = document.getElementById('form-message-premium');

    if (!form || !emailInput || !submitButton || !messageDiv) {
      console.warn('Newsletter form elements not found');
      return;
    }

    // Email validation
    emailInput.addEventListener('input', (e) => {
      this.validateEmail(e.target);
    });

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleNewsletterSubmit(e);
    });

    // Prevent double submission
    form.addEventListener('submit', (e) => {
      if (this.newsletterSubmitted) {
        e.preventDefault();
        return false;
      }
    });
  }

  validateEmail(input) {
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
      input.style.borderColor = '#EF4444';
      input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
      return false;
    } else {
      input.style.borderColor = 'rgba(212, 175, 55, 0.3)';
      input.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.2)';
      return true;
    }
  }

  async handleNewsletterSubmit(event) {
    event.preventDefault();
    
    if (this.newsletterSubmitted) return;

    const form = event.target;
    const emailInput = form.querySelector('#newsletter-email-premium');
    const submitButton = form.querySelector('.newsletter-submit-premium');
    const messageDiv = form.querySelector('#form-message-premium');
    
    const email = emailInput.value.trim();
    
    // Validation
    if (!email) {
      this.showFormMessage(messageDiv, 'Por favor, insira seu email.', 'error');
      emailInput.focus();
      return;
    }

    if (!this.validateEmail(emailInput)) {
      this.showFormMessage(messageDiv, 'Por favor, insira um email válido.', 'error');
      emailInput.focus();
      return;
    }

    // Check if already subscribed
    const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
    if (subscribers.includes(email)) {
      this.showFormMessage(messageDiv, 'Este email já está cadastrado! 🎉', 'success');
      return;
    }

    // Loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    submitButton.textContent = 'CADASTRANDO...';

    try {
      // Simulate API call
      await this.submitToNewsletter(email);
      
      // Success
      this.newsletterSubmitted = true;
      subscribers.push(email);
      localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
      
      this.showFormMessage(messageDiv, '🎉 Bem-vindo à comunidade! Verifique seu email.', 'success');
      
      // Update member count
      this.memberCount += 1;
      this.updateMemberCount();
      
      // Reset form
      emailInput.value = '';
      emailInput.style.borderColor = 'rgba(255, 255, 255, 0.2)';
      emailInput.style.boxShadow = 'none';
      
      // Track conversion
      this.trackNewsletterSignup(email);
      
      // Show confetti effect
      this.showConfetti();
      
    } catch (error) {
      console.error('Newsletter signup error:', error);
      this.showFormMessage(messageDiv, 'Erro ao cadastrar. Tente novamente.', 'error');
    } finally {
      // Reset button
      submitButton.classList.remove('loading');
      submitButton.disabled = false;
      submitButton.textContent = submitButton.dataset.originalText || 'ENTRAR NA JORNADA';
    }
  }

  async submitToNewsletter(email) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate random success/failure (95% success rate)
    if (Math.random() > 0.95) {
      throw new Error('Network error');
    }
    
    // Store locally for demo
    const timestamp = new Date().toISOString();
    const subscriber = { email, timestamp, source: 'community-section' };
    
    const allSubscribers = JSON.parse(localStorage.getItem('allNewsletterData') || '[]');
    allSubscribers.push(subscriber);
    localStorage.setItem('allNewsletterData', JSON.stringify(allSubscribers));
    
    return { success: true, subscriber };
  }

  showFormMessage(messageDiv, message, type) {
    messageDiv.textContent = message;
    messageDiv.className = `form-message-premium ${type}`;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      messageDiv.style.opacity = '0';
      setTimeout(() => {
        messageDiv.className = 'form-message-premium';
      }, 300);
    }, 5000);
  }

  showConfetti() {
    // Simple confetti effect
    const colors = ['#D4AF37', '#F5E71B', '#FFD700', '#FFA500'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        this.createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
      }, i * 20);
    }
  }

  createConfettiPiece(color) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position: fixed;
      width: 6px;
      height: 6px;
      background: ${color};
      top: -10px;
      left: ${Math.random() * 100}vw;
      z-index: 10000;
      pointer-events: none;
      border-radius: 50%;
    `;
    
    document.body.appendChild(confetti);
    
    // Animate falling
    const animation = confetti.animate([
      { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
      { transform: `translateY(100vh) rotate(720deg)`, opacity: 0 }
    ], {
      duration: 3000 + Math.random() * 2000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    animation.onfinish = () => confetti.remove();
  }

  startTestimonialRotation() {
    const testimonialElement = document.getElementById('testimonial-rotation');
    if (!testimonialElement) return;

    const updateTestimonial = () => {
      const testimonial = this.testimonials[this.currentTestimonial];
      const quoteElement = testimonialElement.querySelector('.testimonial-quote');
      const authorElement = testimonialElement.querySelector('.testimonial-author');
      
      if (quoteElement && authorElement) {
        // Fade out
        testimonialElement.style.opacity = '0';
        
        setTimeout(() => {
          quoteElement.textContent = testimonial.quote;
          authorElement.textContent = `- ${testimonial.author}`;
          
          // Fade in
          testimonialElement.style.opacity = '1';
        }, 300);
      }
      
      this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
    };

    // Initial update
    updateTestimonial();
    
    // Rotate every 5 seconds
    setInterval(updateTestimonial, 5000);
  }

  updateMemberCount() {
    const memberCountElement = document.getElementById('member-count');
    if (memberCountElement) {
      const formattedCount = (this.memberCount / 1000).toFixed(1) + 'K+';
      memberCountElement.textContent = formattedCount;
    }
  }

  trackNewsletterSignup(email) {
    // Track signup for analytics
    const event = {
      type: 'newsletter_signup',
      email: email.replace(/(.{2}).*(@.*)/, '$1***$2'), // Anonymize
      timestamp: new Date().toISOString(),
      source: 'community-section',
      page: window.location.pathname
    };
    
    const events = JSON.parse(localStorage.getItem('campingJourneyEvents') || '[]');
    events.push(event);
    localStorage.setItem('campingJourneyEvents', JSON.stringify(events));
    
    console.log('Newsletter signup tracked:', event);
  }

  trackTelegramClick() {
    const event = {
      type: 'telegram_click',
      timestamp: new Date().toISOString(),
      source: 'community-section',
      page: window.location.pathname
    };
    
    const events = JSON.parse(localStorage.getItem('campingJourneyEvents') || '[]');
    events.push(event);
    localStorage.setItem('campingJourneyEvents', JSON.stringify(events));
    
    console.log('Telegram click tracked:', event);
  }

  trackPageView() {
    const event = {
      type: 'community_section_view',
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      userAgent: navigator.userAgent.substring(0, 100)
    };
    
    const events = JSON.parse(localStorage.getItem('campingJourneyEvents') || '[]');
    events.push(event);
    localStorage.setItem('campingJourneyEvents', JSON.stringify(events));
  }

  // Public methods
  getCurrentStats() {
    return {
      members: this.memberCount,
      adventures: this.adventuresCount,
      satisfaction: this.satisfactionRate
    };
  }

  addNewMember() {
    this.memberCount += 1;
    this.updateMemberCount();
  }

  getNewsletterSubscribers() {
    return JSON.parse(localStorage.getItem('allNewsletterData') || '[]');
  }

  getAnalyticsEvents() {
    return JSON.parse(localStorage.getItem('campingJourneyEvents') || '[]');
  }
}

// Global functions for HTML onclick handlers
function handleNewsletterSubmit(event) {
  if (window.communityManager) {
    window.communityManager.handleNewsletterSubmit(event);
  }
}

function trackTelegramClick() {
  if (window.communityManager) {
    window.communityManager.trackTelegramClick();
  }
  return true; // Allow link to proceed
}

// Utility functions
function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K+';
  }
  return num.toString();
}

function validateEmailFormat(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Initialize Community Manager
let communityManager = null;

function initCommunityManager() {
  communityManager = new CommunityManager();
  window.communityManager = communityManager; // Make globally accessible
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCommunityManager);
} else {
  initCommunityManager();
}

// Handle page visibility changes (pause animations when not visible)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations
    const animatedElements = document.querySelectorAll('.member-count');
    animatedElements.forEach(el => {
      el.style.animationPlayState = 'paused';
    });
  } else {
    // Resume animations
    const animatedElements = document.querySelectorAll('.member-count');
    animatedElements.forEach(el => {
      el.style.animationPlayState = 'running';
    });
  }
});

// Export for external use
window.CommunityManager = CommunityManager; 