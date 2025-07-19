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

    this.logoPath = '/images/logo-camping-journey-final.png';
    this.brandName = 'Camping Journey';
    this.tagline = 'Equipment to explore Mexico with style';

    this.init();
  }

  init() {
    this.applyBrandColors();
    this.superAggressiveLogoForce(); // SUPER AGGRESSIVE FORCE
    this.setupLogoElements();
    this.setupBrandConsistency();
    
    // Multiple aggressive refresh attempts
    setTimeout(() => this.superAggressiveLogoForce(), 100);
    setTimeout(() => this.superAggressiveLogoForce(), 500);
    setTimeout(() => this.superAggressiveLogoForce(), 1000);
    setTimeout(() => this.superAggressiveLogoForce(), 2000);
    setTimeout(() => this.superAggressiveLogoForce(), 5000);
    
    console.log('🚀 SUPER AGGRESSIVE Brand Identity initialized with FORCE REFRESH');
  }

  // SUPER AGGRESSIVE LOGO FORCING
  superAggressiveLogoForce() {
    console.log('🔥🔥🔥 SUPER AGGRESSIVE LOGO FORCE STARTING...');
    
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(7);
    const superForceUrl = `/images/logo-camping-journey-final.png?FORCE=${timestamp}&ID=${randomId}&CACHE_BUST=true`;
    
    // All possible logo selectors - COMPREHENSIVE
    const logoSelectors = [
      '.header-logo',
      '.sidebar-logo-img', 
      '.footer-logo img',
      '.utilities-logo',
      '.brand-logo img',
      '.logo img',
      'img[alt*="Camping Journey"]',
      'img[src*="logo"]',
      '.main-logo',
      '.site-logo',
      '.brand-image',
      '.company-logo'
    ];
    
    let updatedCount = 0;
    
    logoSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((img, index) => {
        if (img && img.tagName === 'IMG') {
          console.log(`🔥 FORCING UPDATE: ${selector}[${index}]`, img);
          
          // Force immediate change
          img.style.opacity = '0';
          img.src = '';
          
          setTimeout(() => {
            img.src = superForceUrl;
            img.style.opacity = '1';
            img.style.transition = 'opacity 0.3s ease';
            updatedCount++;
            
            img.onload = () => {
              console.log(`✅ SUPER FORCE SUCCESS: ${selector}[${index}]`);
              img.style.filter = 'brightness(1.05)'; // Slight brightness to confirm load
              setTimeout(() => {
                img.style.filter = ''; // Reset filter
              }, 1000);
            };
            
            img.onerror = () => {
              console.error(`❌ SUPER FORCE FAILED: ${selector}[${index}] - trying fallback`);
              img.src = `/images/Logo_Camping_Journey1.png?FALLBACK=${timestamp}`;
            };
          }, 50 * index); // Stagger updates
        }
      });
    });
    
    // Force DOM refresh
    document.body.style.display = 'none';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.display = '';
    
    console.log(`🎯 SUPER AGGRESSIVE FORCE COMPLETED - Updated ${updatedCount} elements`);
    
    // Additional force for stubborn elements
    this.forceStubborn();
  }

  // Force stubborn elements that resist change
  forceStubborn() {
    console.log('💪 Forcing stubborn logo elements...');
    
    const timestamp = Date.now();
    const forceUrl = `/images/logo-camping-journey-final.png?STUBBORN=${timestamp}`;
    
    // Find images by source
    const allImages = document.querySelectorAll('img');
    allImages.forEach((img, index) => {
      if (img.src.includes('logo') || img.alt.toLowerCase().includes('camping')) {
        console.log(`💪 Forcing stubborn image ${index}:`, img.src);
        
        // Replace with new image element
        const newImg = img.cloneNode(true);
        newImg.src = forceUrl;
        newImg.style.opacity = '0';
        
        img.parentNode.insertBefore(newImg, img);
        img.remove();
        
        // Fade in new image
        setTimeout(() => {
          newImg.style.opacity = '1';
          newImg.style.transition = 'opacity 0.5s ease';
        }, 100);
      }
    });
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
    const timestamp = Date.now();
    const logoUrl = `/images/logo-camping-journey-final.png?setup=${timestamp}`;
    
    // Header logo
    const headerLogo = document.querySelector('.header-logo, .logo img, .brand-logo');
    if (headerLogo) {
      headerLogo.src = logoUrl;
      headerLogo.alt = 'Camping Journey Equipaments MX';
      headerLogo.loading = 'eager';
      headerLogo.decoding = 'async';
      
      headerLogo.onerror = () => {
        console.error('Failed to load header logo:', logoUrl);
        headerLogo.src = '/images/Logo_Camping_Journey1.png'; // Fallback
      };
      
      console.log('Header logo updated to final mountain version:', logoUrl);
    }

    // Footer logo
    const footerLogo = document.querySelector('.footer-logo img');
    if (footerLogo) {
      footerLogo.src = logoUrl;
      footerLogo.alt = 'Camping Journey Equipaments MX';
      
      footerLogo.onerror = () => {
        console.error('Failed to load footer logo:', logoUrl);
        footerLogo.src = '/images/Logo_Camping_Journey1.png'; // Fallback
      };
      
      console.log('Footer logo updated to final mountain version:', logoUrl);
    }

    // Sidebar logo
    const sidebarLogo = document.querySelector('.sidebar-logo img, .sidebar-logo-img');
    if (sidebarLogo) {
      sidebarLogo.src = logoUrl;
      sidebarLogo.alt = 'Camping Journey';
      
      sidebarLogo.onerror = () => {
        console.error('Failed to load sidebar logo:', logoUrl);
        sidebarLogo.src = '/images/Logo_Camping_Journey1.png'; // Fallback
      };
      
      console.log('Sidebar logo updated to final mountain version:', logoUrl);
    }

    // Utilities logo
    const utilitiesLogo = document.querySelector('.utilities-logo');
    if (utilitiesLogo) {
      utilitiesLogo.src = logoUrl;
      utilitiesLogo.alt = 'Camping Journey';
      
      utilitiesLogo.onerror = () => {
        console.error('Failed to load utilities logo:', logoUrl);
        utilitiesLogo.src = '/images/Logo_Camping_Journey1.png'; // Fallback
      };
      
      console.log('Utilities logo updated to final mountain version:', logoUrl);
    }
  }

  setupBrandConsistency() {
    const timestamp = Date.now();
    const logoUrl = `/images/logo-camping-journey-final.png?brand=${timestamp}`;
    
    // Community section branding
    const communitySection = document.querySelector('.community-section');
    if (communitySection) {
      const logoContainer = communitySection.querySelector('.community-logo');
      if (logoContainer) {
        logoContainer.innerHTML = `<img src="${logoUrl}" alt="Camping Journey Community" class="fade-in">`;
      }
    }

    // Product cards branding
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      const logoImg = card.querySelector('.product-brand-logo');
      if (logoImg) {
        logoImg.src = logoUrl;
        logoImg.alt = 'Camping Journey';
      }
    });

    // Newsletter branding
    const newsletterSection = document.querySelector('.newsletter-section');
    if (newsletterSection) {
      const logoContainer = newsletterSection.querySelector('.newsletter-logo');
      if (logoContainer && !logoContainer.querySelector('img')) {
        logoContainer.innerHTML = `
          <img src="${logoUrl}" 
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
        wildNewsLogo.innerHTML = `<img src="${logoUrl}" alt="Wild News" class="fade-in" style="height: 60px; margin-bottom: 1rem;">`;
      }
    }

    // Testimonials branding
    const testimonialsSection = document.querySelector('.testimonials-section');
    if (testimonialsSection) {
      const logoImg = testimonialsSection.querySelector('.testimonial-brand-logo');
      if (logoImg) {
        logoImg.src = logoUrl;
        logoImg.alt = 'Camping Journey';
      }
    }

    // Dashboard/Admin branding
    const dashboardSection = document.querySelector('.dashboard-section, .admin-panel');
    if (dashboardSection) {
      const dashboardLogo = dashboardSection.querySelector('.dashboard-logo img');
      if (dashboardLogo) {
        dashboardLogo.src = logoUrl;
        dashboardLogo.alt = 'Camping Journey Dashboard';
      }

      const logoContainer = dashboardSection.querySelector('.dashboard-brand');
      if (logoContainer) {
        logoContainer.innerHTML = `<img src="${logoUrl}" alt="Camping Journey Dashboard" style="height: 40px;">`;
      }
    }
  }

  // Method to update logo across all elements
  updateLogo(newLogoPath) {
    this.logoPath = newLogoPath;
    
    // Update all logo elements
    const logoElements = document.querySelectorAll('img[alt*="Camping Journey"], .brand-logo img, .logo img, .sidebar-logo-img, .utilities-logo');
    logoElements.forEach(img => {
      img.src = newLogoPath;
    });

    console.log(`Logo updated to: ${newLogoPath}`);
  }

  // Method to force logo refresh (cache busting)
  refreshLogos() {
    const timestamp = Date.now();
    const newPath = `/images/logo-camping-journey-final.png?refresh=${timestamp}`;
    this.updateLogo(newPath);
    console.log('Final mountain logos refreshed with cache busting:', newPath);
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

// SUPER AGGRESSIVE INITIALIZATION
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBrandIdentity);
} else {
  initBrandIdentity();
}

// Force refresh on page visibility change
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && brandIdentity) {
    console.log('🔄 Page became visible - forcing logo refresh');
    brandIdentity.superAggressiveLogoForce();
  }
});

// Force refresh on window focus
window.addEventListener('focus', () => {
  if (brandIdentity) {
    console.log('🔄 Window focused - forcing logo refresh');
    brandIdentity.superAggressiveLogoForce();
  }
});

// Export
window.BrandIdentity = BrandIdentity;
window.initBrandIdentity = initBrandIdentity;
