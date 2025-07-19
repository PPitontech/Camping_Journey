/**
 * Hero Section Language Switcher
 * Connects the hero section language buttons to the main language switcher
 */

document.addEventListener('DOMContentLoaded', () => {
  // Get all language buttons in the hero section
  const langButtons = document.querySelectorAll('.hero-content .lang-btn');
  
  // Add click event listeners to each button
  langButtons.forEach(button => {
    button.addEventListener('click', () => {
      const lang = button.getAttribute('data-lang');
      
      // Use the main language switcher functionality
      if (window.i18n && typeof window.i18n.changeLanguage === 'function') {
        window.i18n.changeLanguage(lang);
      }
      
      // Update active state on buttons
      langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
          btn.classList.add('active');
          btn.style.background = 'rgba(245, 158, 11, 0.6)';
          btn.style.borderColor = '#f59e0b';
        } else {
          btn.classList.remove('active');
          btn.style.background = 'rgba(0, 0, 0, 0.2)';
          btn.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        }
      });
    });
  });
  
  // Listen for language changes from the main switcher
  window.addEventListener('languageChanged', (event) => {
    const lang = event.detail.language;
    
    // Update active state on buttons
    langButtons.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
        btn.style.background = 'rgba(245, 158, 11, 0.6)';
        btn.style.borderColor = '#f59e0b';
      } else {
        btn.classList.remove('active');
        btn.style.background = 'rgba(0, 0, 0, 0.2)';
        btn.style.borderColor = 'rgba(255, 255, 255, 0.3)';
      }
    });
  });
});
