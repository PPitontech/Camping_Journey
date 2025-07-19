/**
 * Wild News JavaScript
 * Camping Journey Equipaments MX
 * Handles animations, interactions and content loading for the Wild News page
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize animations
  initAnimations();
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize article loading
  initArticleLoading();
  
  // Initialize language handling
  initLanguageHandling();
});

/**
 * Initialize scroll animations
 */
function initAnimations() {
  // Animate elements when they come into view
  const animateElements = document.querySelectorAll('.featured-article-content, .article-card');
  
  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });
  
  // Observe each element
  animateElements.forEach(element => {
    observer.observe(element);
  });
  
  // Add staggered delay to article cards
  document.querySelectorAll('.article-card').forEach((card, index) => {
    card.style.animationDelay = `${0.1 * index}s`;
  });
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }
}

/**
 * Initialize article loading functionality
 */
function initArticleLoading() {
  // Pagination functionality
  const paginationButtons = document.querySelectorAll('.pagination-btn');
  
  paginationButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      paginationButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // In a real implementation, this would load new articles
      // For now, we'll just simulate loading with a small delay
      simulateArticleLoading();
    });
  });
  
  // Category filtering
  const categoryCards = document.querySelectorAll('.category-card');
  
  categoryCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Get category name
      const categoryName = card.querySelector('.category-name').textContent;
      
      // In a real implementation, this would filter articles by category
      // For now, we'll just simulate loading with a small delay
      simulateArticleLoading(categoryName);
    });
  });
}

/**
 * Simulate article loading with a loading animation
 * @param {string} categoryName - Optional category name for filtering
 */
function simulateArticleLoading(categoryName = null) {
  const articlesGrid = document.querySelector('.articles-grid');
  
  // Show loading state
  articlesGrid.classList.add('loading');
  articlesGrid.style.opacity = '0.5';
  
  // Simulate network delay
  setTimeout(() => {
    // Remove loading state
    articlesGrid.classList.remove('loading');
    articlesGrid.style.opacity = '1';
    
    // If category was provided, update section title
    if (categoryName) {
      const sectionTitle = document.querySelector('.latest-articles .section-title');
      if (sectionTitle) {
        sectionTitle.textContent = categoryName;
      }
    }
    
    // Reset animations
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach((card, index) => {
      card.classList.remove('visible');
      setTimeout(() => {
        card.classList.add('visible');
      }, 50);
    });
  }, 800);
}

/**
 * Initialize language handling
 */
function initLanguageHandling() {
  // Listen for language changes
  window.addEventListener('languageChanged', (event) => {
    const language = event.detail.language;
    
    // Update article dates based on language
    updateArticleDates(language);
  });
}

/**
 * Update article dates based on language
 * @param {string} language - The current language
 */
function updateArticleDates(language) {
  const dateOptions = {
    'en': { month: 'long', day: 'numeric', year: 'numeric' },
    'es': { day: 'numeric', month: 'long', year: 'numeric' }
  };
  
  // Get all article date elements
  const dateElements = document.querySelectorAll('.article-date');
  
  dateElements.forEach(element => {
    // Get the date string
    const dateString = element.getAttribute('data-date');
    
    if (dateString) {
      // Parse the date
      const date = new Date(dateString);
      
      // Format the date based on language
      const options = dateOptions[language] || dateOptions['en'];
      const formattedDate = date.toLocaleDateString(language, options);
      
      // Update the element
      element.textContent = formattedDate;
    }
  });
}

/**
 * Newsletter subscription handling
 */
document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (email) {
        // In a real implementation, this would send the email to a server
        // For now, we'll just show a success message
        
        // Hide the form
        newsletterForm.style.display = 'none';
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.innerHTML = `
          <div class="success-icon">✓</div>
          <h3>Thank you for subscribing!</h3>
          <p>You'll receive our next newsletter in your inbox.</p>
        `;
        
        // Add success message after the form
        newsletterForm.parentNode.insertBefore(successMessage, newsletterForm.nextSibling);
      }
    });
  }
});
