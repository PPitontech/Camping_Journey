/**
 * Camping Journey Homepage Scripts
 * Handles testimonial slider, animations, and interactive elements
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  initTestimonialSlider();
  initScrollAnimations();
  initProductInteractions();
  initSmoothScrolling();
});

/**
 * Testimonial Slider Functionality
 */
function initTestimonialSlider() {
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentIndex = 0;
  
  // Set up dot click events
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'));
      showTestimonial(index);
    });
  });
  
  // Auto-rotate testimonials every 6 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }, 6000);
  
  // Function to display a specific testimonial
  function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
      testimonial.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show the selected testimonial and activate its dot
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    
    // Update current index
    currentIndex = index;
  }
}

/**
 * Scroll-based Animations
 */
function initScrollAnimations() {
  // Elements to animate on scroll
  const animatedElements = document.querySelectorAll(
    '.story-section, .featured-products, .testimonials, .community, .product-card, .section-title'
  );
  
  // Intersection Observer options
  const options = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.2 // 20% of the element must be visible
  };
  
  // Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        // Stop observing after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, options);
  
  // Start observing elements
  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
  // Add CSS class for animation styling
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      animation: fadeInUp 0.8s ease-out forwards;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .story-section, .featured-products, .testimonials, .community, .product-card, .section-title {
      opacity: 0;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Product Card Interactions
 */
function initProductInteractions() {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    // Add to cart button functionality
    const addToCartBtn = card.querySelector('.add-to-cart');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = card.getAttribute('data-product-id');
        const productTitle = card.querySelector('.product-title').textContent;
        const productPrice = card.querySelector('.product-price').textContent.trim();
        
        // Animation for button
        addToCartBtn.classList.add('adding');
        addToCartBtn.textContent = 'Added!';
        
        // Call cart function from cart-manager.js
        if (window.cartManager) {
          window.cartManager.addProduct(productId, productTitle, productPrice);
        } else {
          console.log(`Product added: ${productTitle} (${productPrice})`);
        }
        
        // Reset button after animation
        setTimeout(() => {
          addToCartBtn.classList.remove('adding');
          addToCartBtn.textContent = 'Add to Cart';
        }, 1500);
      });
    }
    
    // Hover effects for product images
    const productImage = card.querySelector('.product-image');
    if (productImage) {
      card.addEventListener('mouseenter', () => {
        productImage.classList.add('hover');
      });
      
      card.addEventListener('mouseleave', () => {
        productImage.classList.remove('hover');
      });
    }
  });
  
  // Add CSS for button animation
  const style = document.createElement('style');
  style.textContent = `
    .add-to-cart.adding {
      background-color: #2e7d32 !important;
      transform: scale(1.05);
    }
    
    .product-image.hover img {
      transform: scale(1.1);
    }
  `;
  document.head.appendChild(style);
}

/**
 * Smooth Scrolling for Navigation Links
 */
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Add smooth scrolling
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: 'smooth'
        });
        
        // Update URL without page reload
        history.pushState(null, null, targetId);
      }
    });
  });
  
  // Scroll indicator functionality
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const storySection = document.querySelector('#story');
      if (storySection) {
        window.scrollTo({
          top: storySection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  }
}

/**
 * Parallax Effect for Hero Section
 */
window.addEventListener('scroll', () => {
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    const scrollPosition = window.scrollY;
    if (scrollPosition < window.innerHeight) {
      // Create parallax effect
      const overlay = heroSection.querySelector('.hero-overlay');
      const content = heroSection.querySelector('.hero-content');
      const video = heroSection.querySelector('.hero-video');
      
      if (overlay) overlay.style.opacity = 0.4 + (scrollPosition * 0.001);
      if (content) content.style.transform = `translateY(${scrollPosition * 0.2}px)`;
      if (video) video.style.transform = `translateY(${scrollPosition * 0.1}px)`;
    }
  }
});
