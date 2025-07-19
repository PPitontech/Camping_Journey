/**
 * ===================================
 * ANALYTICS & TRACKING SYSTEM - CAMPING JOURNEY
 * Google Analytics 4, Facebook Pixel, Search Console, Hotjar
 * ===================================
 */

class AnalyticsTracker {
  constructor() {
    this.isProduction = window.location.hostname === 'camping-journey.com.mx' || 
                       window.location.hostname === 'www.camping-journey.com.mx';
    this.config = {
      ga4: 'G-XXXXXXXXXX', // Replace with actual GA4 ID
      facebookPixel: 'your_facebook_pixel_id',
      hotjar: 'your_hotjar_id',
      searchConsole: 'your_search_console_id'
    };
    
    this.init();
  }

  init() {
    if (this.isProduction) {
      this.initGoogleAnalytics4();
      this.initFacebookPixel();
      this.initHotjar();
      this.initSearchConsole();
      this.setupEcommerce();
      this.setupConversionTracking();
    }
    
    console.log('Analytics Tracker initialized for:', this.isProduction ? 'Production' : 'Development');
  }

  // Google Analytics 4 Setup
  initGoogleAnalytics4() {
    // Load GA4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.ga4}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', this.config.ga4, {
      // Enhanced ecommerce settings
      send_page_view: true,
      allow_google_signals: true,
      allow_ad_personalization_signals: true,
      // Custom parameters
      custom_map: {
        'custom_parameter_1': 'user_language',
        'custom_parameter_2': 'user_theme'
      }
    });

    console.log('Google Analytics 4 initialized');
  }

  // Facebook Pixel Setup
  initFacebookPixel() {
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', this.config.facebookPixel);
    fbq('track', 'PageView');

    console.log('Facebook Pixel initialized');
  }

  // Hotjar Setup
  initHotjar() {
    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid: this.config.hotjar, hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');

    console.log('Hotjar initialized');
  }

  // Google Search Console Verification
  initSearchConsole() {
    const meta = document.createElement('meta');
    meta.name = 'google-site-verification';
    meta.content = this.config.searchConsole;
    document.head.appendChild(meta);

    console.log('Google Search Console verification added');
  }

  // Enhanced Ecommerce Tracking
  setupEcommerce() {
    // Track product views
    this.trackProductView = (productData) => {
      if (window.gtag) {
        gtag('event', 'view_item', {
          currency: 'MXN',
          value: productData.price,
          items: [{
            item_id: productData.id,
            item_name: productData.name,
            item_category: productData.category,
            price: productData.price,
            quantity: 1
          }]
        });
      }

      if (window.fbq) {
        fbq('track', 'ViewContent', {
          content_ids: [productData.id],
          content_type: 'product',
          value: productData.price,
          currency: 'MXN'
        });
      }
    };

    // Track add to cart
    this.trackAddToCart = (productData, quantity = 1) => {
      if (window.gtag) {
        gtag('event', 'add_to_cart', {
          currency: 'MXN',
          value: productData.price * quantity,
          items: [{
            item_id: productData.id,
            item_name: productData.name,
            item_category: productData.category,
            price: productData.price,
            quantity: quantity
          }]
        });
      }

      if (window.fbq) {
        fbq('track', 'AddToCart', {
          content_ids: [productData.id],
          content_type: 'product',
          value: productData.price * quantity,
          currency: 'MXN'
        });
      }
    };

    // Track purchase
    this.trackPurchase = (transactionData) => {
      if (window.gtag) {
        gtag('event', 'purchase', {
          transaction_id: transactionData.id,
          value: transactionData.total,
          currency: 'MXN',
          items: transactionData.items.map(item => ({
            item_id: item.id,
            item_name: item.name,
            item_category: item.category,
            price: item.price,
            quantity: item.quantity
          }))
        });
      }

      if (window.fbq) {
        fbq('track', 'Purchase', {
          value: transactionData.total,
          currency: 'MXN',
          content_ids: transactionData.items.map(item => item.id),
          content_type: 'product'
        });
      }
    };
  }

  // Conversion Tracking
  setupConversionTracking() {
    // Newsletter signup
    this.trackNewsletterSignup = (email) => {
      if (window.gtag) {
        gtag('event', 'sign_up', {
          method: 'newsletter',
          custom_parameter_1: 'newsletter_signup'
        });
      }

      if (window.fbq) {
        fbq('track', 'Subscribe');
      }
    };

    // Contact form submission
    this.trackContactForm = (formData) => {
      if (window.gtag) {
        gtag('event', 'generate_lead', {
          currency: 'MXN',
          value: 0,
          custom_parameter_1: 'contact_form'
        });
      }

      if (window.fbq) {
        fbq('track', 'Lead');
      }
    };

    // Social media clicks
    this.trackSocialClick = (platform, action = 'click') => {
      if (window.gtag) {
        gtag('event', 'social_engagement', {
          platform: platform,
          action: action
        });
      }
    };

    // Language change tracking
    this.trackLanguageChange = (newLanguage, oldLanguage) => {
      if (window.gtag) {
        gtag('event', 'language_change', {
          custom_parameter_1: newLanguage,
          custom_parameter_2: oldLanguage
        });
      }
    };

    // Theme change tracking
    this.trackThemeChange = (newTheme) => {
      if (window.gtag) {
        gtag('event', 'theme_change', {
          custom_parameter_2: newTheme
        });
      }
    };
  }

  // Custom Event Tracking
  trackCustomEvent(eventName, parameters = {}) {
    if (window.gtag) {
      gtag('event', eventName, parameters);
    }

    console.log(`Custom event tracked: ${eventName}`, parameters);
  }

  // Page View Tracking (for SPA)
  trackPageView(pagePath, pageTitle) {
    if (window.gtag) {
      gtag('config', this.config.ga4, {
        page_path: pagePath,
        page_title: pageTitle
      });
    }

    if (window.fbq) {
      fbq('track', 'PageView');
    }
  }

  // Scroll Depth Tracking
  initScrollTracking() {
    let scrollDepths = [25, 50, 75, 90];
    let triggeredDepths = [];

    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      scrollDepths.forEach(depth => {
        if (scrollPercent >= depth && !triggeredDepths.includes(depth)) {
          triggeredDepths.push(depth);
          
          if (window.gtag) {
            gtag('event', 'scroll', {
              event_category: 'engagement',
              event_label: `${depth}%`,
              value: depth
            });
          }
        }
      });
    });
  }

  // Performance Tracking
  trackPerformance() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        
        if (window.gtag && perfData) {
          gtag('event', 'timing_complete', {
            name: 'load',
            value: Math.round(perfData.loadEventEnd - perfData.fetchStart)
          });
        }
      }, 0);
    });
  }

  // Error Tracking
  trackError(error, context = '') {
    if (window.gtag) {
      gtag('event', 'exception', {
        description: error.message || error,
        fatal: false,
        custom_parameter_1: context
      });
    }

    console.error('Tracked error:', error, context);
  }
}

// Initialize Analytics
let analyticsTracker = null;

function initAnalytics() {
  if (!analyticsTracker) {
    analyticsTracker = new AnalyticsTracker();
    window.analyticsTracker = analyticsTracker;

    // Setup scroll tracking
    analyticsTracker.initScrollTracking();
    
    // Setup performance tracking
    analyticsTracker.trackPerformance();

    // Setup error tracking
    window.addEventListener('error', (event) => {
      analyticsTracker.trackError(event.error, 'global_error');
    });

    // Setup unhandled promise rejection tracking
    window.addEventListener('unhandledrejection', (event) => {
      analyticsTracker.trackError(event.reason, 'unhandled_promise');
    });
  }
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnalytics);
} else {
  initAnalytics();
}

// Export for external use
window.AnalyticsTracker = AnalyticsTracker;
window.initAnalytics = initAnalytics;

// Global tracking functions for easy use
window.trackEvent = function(eventName, parameters) {
  if (window.analyticsTracker) {
    window.analyticsTracker.trackCustomEvent(eventName, parameters);
  }
};

window.trackProductView = function(productData) {
  if (window.analyticsTracker) {
    window.analyticsTracker.trackProductView(productData);
  }
};

window.trackAddToCart = function(productData, quantity) {
  if (window.analyticsTracker) {
    window.analyticsTracker.trackAddToCart(productData, quantity);
  }
};

window.trackPurchase = function(transactionData) {
  if (window.analyticsTracker) {
    window.analyticsTracker.trackPurchase(transactionData);
  }
};

window.trackNewsletterSignup = function(email) {
  if (window.analyticsTracker) {
    window.analyticsTracker.trackNewsletterSignup(email);
  }
}; 