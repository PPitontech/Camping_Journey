/**
 * ===================================
 * TESTIMONIAL SLIDER - PREMIUM FUNCTIONALITY
 * ===================================
 */

class TestimonialSlider {
  constructor() {
    this.slider = document.querySelector('.testimonials-slider');
    this.track = document.querySelector('.testimonial-track');
    this.cards = document.querySelectorAll('.testimonial-card');
    this.prevBtn = document.querySelector('.prev-btn');
    this.nextBtn = document.querySelector('.next-btn');
    this.dots = document.querySelectorAll('.dot');
    
    this.currentSlide = 0;
    this.totalSlides = this.cards.length;
    this.autoplayInterval = null;
    this.autoplayDelay = 5000; // 5 seconds
    this.isTransitioning = false;
    this.touchStartX = 0;
    this.touchEndX = 0;
    
    // Responsive settings
    this.slidesPerView = this.getSlidesPerView();
    this.maxSlides = Math.max(0, this.totalSlides - this.slidesPerView);
    
    this.init();
  }

  init() {
    if (!this.slider || !this.track || this.cards.length === 0) {
      console.warn('Testimonial slider elements not found');
      return;
    }

    this.setupEventListeners();
    this.setupResponsiveListeners();
    this.updateSlider();
    this.startAutoplay();
    
    console.log('Testimonial slider initialized with', this.totalSlides, 'slides');
  }

  getSlidesPerView() {
    const width = window.innerWidth;
    if (width <= 768) return 1;      // Mobile: 1 slide
    if (width <= 1200) return 2;     // Tablet: 2 slides  
    return 3;                        // Desktop: 3 slides
  }

  setupEventListeners() {
    // Navigation buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.previousSlide());
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }

    // Dots navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });

    // Pause autoplay on hover
    if (this.slider) {
      this.slider.addEventListener('mouseenter', () => this.pauseAutoplay());
      this.slider.addEventListener('mouseleave', () => this.startAutoplay());
    }

    // Touch/swipe support
    this.setupTouchEvents();

    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
  }

  setupTouchEvents() {
    if (!this.track) return;

    // Touch events
    this.track.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
      this.pauseAutoplay();
    }, { passive: true });

    this.track.addEventListener('touchmove', (e) => {
      this.touchEndX = e.touches[0].clientX;
    }, { passive: true });

    this.track.addEventListener('touchend', () => {
      this.handleSwipe();
      this.startAutoplay();
    }, { passive: true });

    // Mouse drag events (for desktop)
    let isDragging = false;
    
    this.track.addEventListener('mousedown', (e) => {
      isDragging = true;
      this.touchStartX = e.clientX;
      this.track.style.cursor = 'grabbing';
      this.pauseAutoplay();
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      this.touchEndX = e.clientX;
    });

    document.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      this.track.style.cursor = 'grab';
      this.handleSwipe();
      this.startAutoplay();
    });
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = this.touchStartX - this.touchEndX;

    if (Math.abs(swipeDistance) < swipeThreshold) return;

    if (swipeDistance > 0) {
      // Swiped left - next slide
      this.nextSlide();
    } else {
      // Swiped right - previous slide
      this.previousSlide();
    }
  }

  handleKeyboard(e) {
    if (!this.slider) return;
    
    // Only handle keyboard when slider is in viewport
    const sliderRect = this.slider.getBoundingClientRect();
    const isVisible = sliderRect.top < window.innerHeight && sliderRect.bottom > 0;
    
    if (!isVisible) return;

    switch(e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        this.previousSlide();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.nextSlide();
        break;
      case ' ': // Spacebar
        e.preventDefault();
        this.toggleAutoplay();
        break;
    }
  }

  setupResponsiveListeners() {
    let resizeTimeout;
    
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newSlidesPerView = this.getSlidesPerView();
        
        if (newSlidesPerView !== this.slidesPerView) {
          this.slidesPerView = newSlidesPerView;
          this.maxSlides = Math.max(0, this.totalSlides - this.slidesPerView);
          
          // Adjust current slide if necessary
          if (this.currentSlide > this.maxSlides) {
            this.currentSlide = this.maxSlides;
          }
          
          this.updateSlider();
        }
      }, 250);
    });
  }

  nextSlide() {
    if (this.isTransitioning) return;
    
    this.currentSlide = (this.currentSlide + 1) % (this.maxSlides + 1);
    this.updateSlider();
  }

  previousSlide() {
    if (this.isTransitioning) return;
    
    this.currentSlide = this.currentSlide === 0 ? this.maxSlides : this.currentSlide - 1;
    this.updateSlider();
  }

  goToSlide(index) {
    if (this.isTransitioning || index === this.currentSlide) return;
    
    // Ensure index is within bounds
    this.currentSlide = Math.min(Math.max(0, index), this.maxSlides);
    this.updateSlider();
  }

  updateSlider() {
    if (!this.track) return;
    
    this.isTransitioning = true;
    
    // Calculate transform based on current slide and slides per view
    const slideWidth = 100 / this.slidesPerView;
    const transform = -(this.currentSlide * slideWidth);
    
    // Apply transform with smooth animation
    this.track.style.transform = `translateX(${transform}%)`;
    
    // Update dots
    this.updateDots();
    
    // Update navigation buttons
    this.updateNavigationButtons();
    
    // Add visual feedback
    this.addSlideChangeEffect();
    
    // Reset transition flag after animation completes
    setTimeout(() => {
      this.isTransitioning = false;
    }, 600);
  }

  updateDots() {
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSlide);
      
      // Add accessibility
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.setAttribute('aria-pressed', index === this.currentSlide);
    });
  }

  updateNavigationButtons() {
    if (this.prevBtn) {
      this.prevBtn.disabled = false;
      this.prevBtn.style.opacity = '1';
    }
    
    if (this.nextBtn) {
      this.nextBtn.disabled = false;
      this.nextBtn.style.opacity = '1';
    }
  }

  addSlideChangeEffect() {
    // Add subtle animation effect to current visible cards
    const visibleCards = Array.from(this.cards).slice(
      this.currentSlide, 
      this.currentSlide + this.slidesPerView
    );
    
    visibleCards.forEach((card, index) => {
      card.style.animation = 'none';
      // Force reflow
      card.offsetHeight;
      card.style.animation = `slideInUp 0.6s ease-out ${index * 0.1}s both`;
    });
  }

  startAutoplay() {
    this.pauseAutoplay(); // Clear any existing interval
    
    if (this.totalSlides <= this.slidesPerView) return; // Don't autoplay if all slides are visible
    
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoplayDelay);
  }

  pauseAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  toggleAutoplay() {
    if (this.autoplayInterval) {
      this.pauseAutoplay();
    } else {
      this.startAutoplay();
    }
  }

  // Public methods for external control
  destroy() {
    this.pauseAutoplay();
    
    // Remove event listeners
    if (this.prevBtn) {
      this.prevBtn.removeEventListener('click', this.previousSlide);
    }
    if (this.nextBtn) {
      this.nextBtn.removeEventListener('click', this.nextSlide);
    }
    
    this.dots.forEach(dot => {
      dot.removeEventListener('click', this.goToSlide);
    });
  }

  refresh() {
    this.slidesPerView = this.getSlidesPerView();
    this.maxSlides = Math.max(0, this.totalSlides - this.slidesPerView);
    this.updateSlider();
  }
}

// CSS Animation for slide effects
const slideAnimationCSS = `
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

// Inject animation CSS if not already present
if (!document.querySelector('#testimonial-animations')) {
  const style = document.createElement('style');
  style.id = 'testimonial-animations';
  style.textContent = slideAnimationCSS;
  document.head.appendChild(style);
}

// Initialize slider when DOM is ready
let testimonialSlider = null;

function initTestimonialSlider() {
  // Wait for the testimonials section to be present
  const testimonialsSection = document.querySelector('.testimonials-section');
  
  if (testimonialsSection) {
    testimonialSlider = new TestimonialSlider();
  } else {
    console.warn('Testimonials section not found - slider not initialized');
  }
}

// Initialize on DOM content loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTestimonialSlider);
} else {
  initTestimonialSlider();
}

// Reinitialize on page transitions (if using SPA)
window.addEventListener('pageshow', () => {
  if (testimonialSlider) {
    testimonialSlider.refresh();
  }
});

// Export for external use
window.TestimonialSlider = TestimonialSlider;
