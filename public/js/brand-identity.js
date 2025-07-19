/**
 * ===================================
 * BRAND IDENTITY MANAGER - CAMPING JOURNEY
 * Manages consistent brand elements across pages
 * ===================================
 */

class BrandIdentity {
  constructor() {
    this.brandColors = {
      primary: '#D4AF37',      // Gold
      secondary: '#2C5530',    // Forest Green
      accent: '#FF6B35',       // Adventure Orange
      dark: '#1A1A1A',         // Dark Background
      light: '#F8F9FA'         // Light Text
    };

    this.logoPath = '/images/logo-camping-journey-new.png';
    this.brandName = 'Camping Journey';
    this.tagline = 'Equipment to explore Mexico with style';

    this.init();
  }

  init() {
    this.applyBrandColors();
    this.setupLogoElements();
    this.setupBrandConsistency();
    console.log('Brand Identity initialized');
  }

  applyBrandColors() {
    // Apply CSS custom properties for brand colors
    const root = document.documentElement;
    
    root.style.setProperty('--brand-primary', this.brandColors.primary);
    root.style.setProperty('--brand-secondary', this.brandColors.secondary);
    root.style.setProperty('--brand-accent', this.brandColors.accent);
    root.style.setProperty('--brand-dark', this.brandColors.dark);
    root.style.setProperty('--brand-light', this.brandColors.light);
  }

  setupLogoElements() {
    // Header logo
    const headerLogo = document.querySelector('.header-logo, .logo img, .brand-logo');
    if (headerLogo) {
      headerLogo.src = '/images/logo-camping-journey-new.png';
      headerLogo.alt = 'Camping Journey Equipaments MX';
      
      // Add loading optimization
      headerLogo.loading = 'eager';
      headerLogo.decoding = 'async';
    }

    // Footer logo
    const footerLogo = document.querySelector('.footer-logo img');
    if (footerLogo) {
      footerLogo.src = '/images/logo-camping-journey-new.png';
      footerLogo.alt = 'Camping Journey Equipaments MX';
    }

    // Sidebar logo
    const sidebarLogo = document.querySelector('.sidebar-logo img');
    if (sidebarLogo) {
      sidebarLogo.src = '/images/logo-camping-journey-new.png';
      sidebarLogo.alt = 'Camping Journey';
    }
  }

  setupBrandConsistency() {
    // Community section branding
    const communitySection = document.querySelector('.community-section');
    if (communitySection) {
      const logoContainer = communitySection.querySelector('.community-logo');
      if (logoContainer) {
        logoContainer.innerHTML = `<img src="/images/logo-camping-journey-new.png" alt="Camping Journey Community" class="fade-in">`;
      }
    }

    // Product cards branding
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      const logoImg = card.querySelector('.product-brand-logo');
      if (logoImg) {
        logoImg.src = '/images/logo-camping-journey-new.png';
        logoImg.alt = 'Camping Journey';
      }
    });

    // Newsletter branding
    const newsletterSection = document.querySelector('.newsletter-section');
    if (newsletterSection) {
      const logoContainer = newsletterSection.querySelector('.newsletter-logo');
      if (logoContainer && !logoContainer.querySelector('img')) {
        logoContainer.innerHTML = `
          <img src="/images/logo-camping-journey-new.png" 
               alt="Camping Journey Newsletter" 
               style="height: 40px; margin-bottom: 1rem;"
               class="fade-in">
        `;
      }
    }

    // Wild News branding
    const wildNewsSection = document.querySelector('.wild-news-section');
    if (wildNewsSection) {
      const wildNewsLogo = wildNewsSection.querySelector('.wild-news-logo');
      if (wildNewsLogo) {
        wildNewsLogo.innerHTML = `<img src="/images/logo-camping-journey-new.png" alt="Wild News" class="fade-in" style="height: 60px; margin-bottom: 1rem;">`;
      }
    }

    // Testimonials branding
    const testimonialsSection = document.querySelector('.testimonials-section');
    if (testimonialsSection) {
      const logoImg = testimonialsSection.querySelector('.testimonial-brand-logo');
      if (logoImg) {
        logoImg.src = '/images/logo-camping-journey-new.png';
        logoImg.alt = 'Camping Journey';
      }
    }

    // Dashboard/Admin branding
    const dashboardSection = document.querySelector('.dashboard-section, .admin-panel');
    if (dashboardSection) {
      const dashboardLogo = dashboardSection.querySelector('.dashboard-logo img');
      if (dashboardLogo) {
        dashboardLogo.src = '/images/logo-camping-journey-new.png';
        dashboardLogo.alt = 'Camping Journey Dashboard';
      }

      const logoContainer = dashboardSection.querySelector('.dashboard-brand');
      if (logoContainer) {
        logoContainer.innerHTML = `<img src="/images/logo-camping-journey-new.png" alt="Camping Journey Dashboard" style="height: 40px;">`;
      }
    }
  }

  // Method to update logo across all elements
  updateLogo(newLogoPath) {
    this.logoPath = newLogoPath;
    
    // Update all logo elements
    const logoElements = document.querySelectorAll('img[alt*="Camping Journey"], .brand-logo img, .logo img');
    logoElements.forEach(img => {
      img.src = newLogoPath;
    });

    console.log(`Logo updated to: ${newLogoPath}`);
  }

  // Method to apply brand theme
  applyTheme(theme = 'default') {
    const themes = {
      default: {
        primary: '#D4AF37',
        secondary: '#2C5530',
        accent: '#FF6B35'
      },
      dark: {
        primary: '#F4D03F',
        secondary: '#1B4F72',
        accent: '#E74C3C'
      },
      light: {
        primary: '#B7950B',
        secondary: '#27AE60',
        accent: '#E67E22'
      }
    };

    const selectedTheme = themes[theme] || themes.default;
    
    Object.keys(selectedTheme).forEach(key => {
      document.documentElement.style.setProperty(`--brand-${key}`, selectedTheme[key]);
    });

    console.log(`Theme applied: ${theme}`);
  }

  // Method to get brand colors
  getBrandColors() {
    return this.brandColors;
  }

  // Method to get logo path
  getLogoPath() {
    return this.logoPath;
  }
}

// Initialize brand identity
let brandIdentity;

function initBrandIdentity() {
  if (!brandIdentity) {
    brandIdentity = new BrandIdentity();
    window.brandIdentity = brandIdentity;
  }
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBrandIdentity);
} else {
  initBrandIdentity();
}

// Export
window.BrandIdentity = BrandIdentity;
window.initBrandIdentity = initBrandIdentity;
