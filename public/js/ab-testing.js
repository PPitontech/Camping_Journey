/**
 * A/B Testing System
 * Camping Journey Equipaments MX
 * Implements simple A/B testing for homepage elements
 */

// Configuration for A/B tests
const abTests = {
  // Hero section tests - Frases emocionais cinematográficas
  heroHeadline: {
    variants: [
      { id: 'A', value: 'Você está pronto para a maior aventura da sua vida?' },
      { id: 'B', value: 'A natureza chama. Você vai responder?' },
      { id: 'C', value: 'Descubra o que existe além dos limites' }
    ],
    elementSelector: '.hero-title',
    weight: { A: 0.4, B: 0.3, C: 0.3 }
  },
  
  // CTA button tests - Estilos de botões cinematográficos
  buttonStyle: {
    variants: [
      { id: 'A', value: 'btn-explorar' },
      { id: 'B', value: 'btn-cinematic' }
    ],
    elementSelector: '.hero-cta a:first-child',
    weight: { A: 0.5, B: 0.5 },
    applyFunction: (element, variant) => {
      // Remove todas as classes de botão
      element.classList.remove('btn-explorar', 'btn-cinematic');
      // Adiciona a classe da variante
      element.classList.add(variant);
    }
  },
  
  // Product section layout tests - Layouts de produtos
  productLayout: {
    variants: [
      { id: 'A', value: 'grid-layout' },
      { id: 'B', value: 'cinematic-layout' }
    ],
    elementSelector: '.product-container',
    weight: { A: 0.5, B: 0.5 },
    applyFunction: (element, variant) => {
      element.classList.remove('grid-layout', 'cinematic-layout');
      element.classList.add(variant);
    }
  },
  
  // Badge style tests - Estilos de selo para produtos em pronta entrega
  badgeStyle: {
    variants: [
      { id: 'A', value: 'badge-entrega-mexico' },
      { id: 'B', value: 'badge-entrega-premium' }
    ],
    elementSelector: '.badge-entrega-mexico',
    weight: { A: 0.7, B: 0.3 },
    applyFunction: (element, variant) => {
      element.classList.remove('badge-entrega-mexico', 'badge-entrega-premium');
      element.classList.add(variant);
    }
  },
  
  // Wild News banner style - Estilos de banner para Wild News
  wildNewsBanner: {
    variants: [
      { id: 'A', value: 'default' },
      { id: 'B', value: 'cinematic' }
    ],
    elementSelector: '.wild-news-banner',
    weight: { A: 0.5, B: 0.5 },
    applyFunction: (element, variant) => {
      if (variant === 'cinematic') {
        element.classList.add('cinematic-banner');
      } else {
        element.classList.remove('cinematic-banner');
      }
    }
  },
  
  // Testimonial card style - Estilos de cartão para depoimentos
  testimonialStyle: {
    variants: [
      { id: 'A', value: 'default' },
      { id: 'B', value: 'postcard' }
    ],
    elementSelector: '.testimonial-card',
    weight: { A: 0.4, B: 0.6 },
    applyFunction: (element, variant) => {
      if (variant === 'postcard') {
        element.classList.add('postcard-style');
      } else {
        element.classList.remove('postcard-style');
      }
    }
  }
};

// User session data
let userSession = {
  id: '',
  tests: {},
  conversions: {}
};

/**
 * Initialize A/B testing system
 */
function initABTesting() {
  // Generate or retrieve user session ID
  userSession.id = getUserSessionId();
  
  // Load existing test assignments if available
  loadTestAssignments();
  
  // Assign variants for tests that don't have assignments yet
  assignTestVariants();
  
  // Apply test variants to the page
  applyTestVariants();
  
  // Set up conversion tracking
  setupConversionTracking();
  
  // Save test assignments
  saveTestAssignments();
}

/**
 * Get or generate user session ID
 * @returns {string} User session ID
 */
function getUserSessionId() {
  let sessionId = localStorage.getItem('ab_session_id');
  
  if (!sessionId) {
    sessionId = generateUUID();
    localStorage.setItem('ab_session_id', sessionId);
  }
  
  return sessionId;
}

/**
 * Generate a UUID for user identification
 * @returns {string} UUID
 */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Load existing test assignments from localStorage
 */
function loadTestAssignments() {
  const savedTests = localStorage.getItem('ab_test_assignments');
  
  if (savedTests) {
    try {
      userSession.tests = JSON.parse(savedTests);
    } catch (error) {
      console.error('Error parsing saved A/B test assignments:', error);
      userSession.tests = {};
    }
  }
}

/**
 * Assign variants for tests that don't have assignments yet
 */
function assignTestVariants() {
  for (const testName in abTests) {
    if (!userSession.tests[testName]) {
      const test = abTests[testName];
      const variant = selectWeightedVariant(test.variants, test.weight);
      userSession.tests[testName] = variant.id;
    }
  }
}

/**
 * Select a variant based on weighted probabilities
 * @param {Array} variants - Array of variant objects
 * @param {Object} weights - Object with weights for each variant
 * @returns {Object} Selected variant
 */
function selectWeightedVariant(variants, weights) {
  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const variant of variants) {
    const weight = weights[variant.id];
    if (random < weight) {
      return variant;
    }
    random -= weight;
  }
  
  // Fallback to first variant
  return variants[0];
}

/**
 * Apply test variants to the page
 */
function applyTestVariants() {
  for (const testName in abTests) {
    const test = abTests[testName];
    const variantId = userSession.tests[testName];
    const variant = test.variants.find(v => v.id === variantId);
    
    if (variant) {
      const elements = document.querySelectorAll(test.elementSelector);
      
      elements.forEach(element => {
        if (test.applyFunction) {
          // Use custom function to apply variant
          test.applyFunction(element, variant.value);
        } else {
          // Default behavior: set text content
          element.textContent = variant.value;
        }
      });
    }
  }
}

/**
 * Save test assignments to localStorage
 */
function saveTestAssignments() {
  localStorage.setItem('ab_test_assignments', JSON.stringify(userSession.tests));
}

/**
 * Set up conversion tracking
 */
function setupConversionTracking() {
  // Track clicks on CTA buttons
  document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', () => {
      trackConversion('button_click', button.textContent);
    });
  });
  
  // Track product views
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const productId = card.getAttribute('data-product-id');
      trackConversion('product_view', productId);
    });
  });
  
  // Track add to cart
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = button.getAttribute('data-product-id');
      trackConversion('add_to_cart', productId);
    });
  });
  
  // Track newsletter subscriptions
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      trackConversion('newsletter_signup');
      
      // Continue with form submission
      setTimeout(() => {
        newsletterForm.submit();
      }, 300);
    });
  }
}

/**
 * Track a conversion event
 * @param {string} type - Type of conversion
 * @param {string} value - Value associated with conversion
 */
function trackConversion(type, value = null) {
  // Initialize conversion type if not exists
  if (!userSession.conversions[type]) {
    userSession.conversions[type] = [];
  }
  
  // Add conversion with timestamp
  userSession.conversions[type].push({
    timestamp: new Date().toISOString(),
    value: value
  });
  
  // Save conversions
  saveConversions();
  
  // Send conversion data to analytics
  sendConversionToAnalytics(type, value);
}

/**
 * Save conversions to localStorage
 */
function saveConversions() {
  localStorage.setItem('ab_conversions', JSON.stringify(userSession.conversions));
}

/**
 * Send conversion data to analytics
 * @param {string} type - Type of conversion
 * @param {string} value - Value associated with conversion
 */
function sendConversionToAnalytics(type, value) {
  // In a real implementation, this would send data to an analytics service
  // For now, we'll just log it to console
  console.log('Conversion:', {
    sessionId: userSession.id,
    type: type,
    value: value,
    tests: userSession.tests,
    timestamp: new Date().toISOString()
  });
  
  // Example of sending to a server endpoint
  /*
  fetch('/api/analytics/conversion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sessionId: userSession.id,
      type: type,
      value: value,
      tests: userSession.tests,
      timestamp: new Date().toISOString()
    })
  }).catch(error => {
    console.error('Error sending conversion data:', error);
  });
  */
}

/**
 * Get current test results
 * @returns {Object} Test results
 */
function getTestResults() {
  return {
    sessionId: userSession.id,
    tests: userSession.tests,
    conversions: userSession.conversions
  };
}

// Initialize A/B testing when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initABTesting();
});

// Export functions for use in other scripts
window.abTesting = {
  getTestResults,
  trackConversion
};
