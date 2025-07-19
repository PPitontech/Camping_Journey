/**
 * ===================================
 * CINEMATIC LOADER - CAMPING JOURNEY
 * Mountain Adventure Loading Experience
 * ===================================
 */

class CinematicLoader {
  constructor() {
    this.loader = null;
    this.progress = 0;
    this.isLoaded = false;
    this.loadingTexts = [
      'Loading cinematic experience...',
      'Preparing mountain adventure...',
      'Setting up camping gear...',
      'Loading wilderness experience...',
      'Initializing outdoor journey...'
    ];
    this.currentTextIndex = 0;
    
    this.init();
  }

  init() {
    this.createLoader();
    this.startLoading();
    this.setupEventListeners();
    
    console.log('🏔️ Mountain Adventure Loader initialized');
  }

  createLoader() {
    // Create loader HTML structure
    const loaderHTML = `
      <div class="cinematic-loader" id="cinematicLoader">
        <!-- Mountain Particles Background -->
        <div class="mountain-particles" id="mountainParticles"></div>
        
        <!-- Main Content -->
        <div class="loader-logo">
          <!-- Mountain Logo SVG -->
          <div class="mountain-logo">
            <svg width="280" height="180" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
              <!-- Simple Green Mountain Curves -->
              <defs>
                <linearGradient id="simpleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#228B22;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#006400;stop-opacity:1" />
                </linearGradient>
              </defs>
              
              <!-- Clean Mountain Silhouette -->
              <path d="M30 120 
                       Q60 80 90 85
                       Q120 90 150 60
                       Q180 30 210 45
                       Q240 60 270 65
                       Q270 120 270 120
                       L30 120 Z" 
                    fill="url(#simpleGradient)" 
                    opacity="1">
                <animateTransform 
                  attributeType="XML" 
                  attributeName="transform" 
                  type="scale" 
                  values="1;1.02;1" 
                  dur="4s" 
                  repeatCount="indefinite"/>
              </path>
              
              <!-- Subtle loading animation dots -->
              <circle cx="90" cy="82" r="3" fill="#32CD32" opacity="0">
                <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0s" repeatCount="indefinite"/>
              </circle>
              <circle cx="150" cy="58" r="3" fill="#32CD32" opacity="0">
                <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.7s" repeatCount="indefinite"/>
              </circle>
              <circle cx="210" cy="43" r="3" fill="#32CD32" opacity="0">
                <animate attributeName="opacity" values="0;1;0" dur="2s" begin="1.4s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>
          
          <!-- Brand Text -->
          <div class="loader-brand">
            <h1>CAMPING JOURNEY</h1>
            <p>Equipment</p>
          </div>
        </div>
        
        <!-- Loading Progress -->
        <div class="loader-progress" id="loaderProgress"></div>
        
        <!-- Loading Text -->
        <div class="loader-text" id="loaderText">Loading cinematic experience...</div>
      </div>
    `;

    // Insert loader into DOM
    document.body.insertAdjacentHTML('beforeend', loaderHTML);
    this.loader = document.getElementById('cinematicLoader');
    this.progressElement = document.getElementById('loaderProgress');
    this.textElement = document.getElementById('loaderText');

    // Create mountain particles
    this.createMountainParticles();
  }

  createMountainParticles() {
    const particlesContainer = document.getElementById('mountainParticles');
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'mountain-particle';
      
      // Random positioning and timing
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (4 + Math.random() * 4) + 's';
      
      particlesContainer.appendChild(particle);
    }
  }

  startLoading() {
    // Simulate loading progress
    const loadingInterval = setInterval(() => {
      this.progress += Math.random() * 15;
      
      if (this.progress >= 100) {
        this.progress = 100;
        clearInterval(loadingInterval);
        setTimeout(() => this.completeLoading(), 800);
      }
      
      this.updateProgress();
    }, 200);

    // Update loading text
    this.updateLoadingText();
  }

  updateProgress() {
    if (this.progressElement) {
      this.progressElement.style.setProperty('--progress', this.progress + '%');
    }
  }

  updateLoadingText() {
    const textInterval = setInterval(() => {
      if (this.progress >= 100) {
        clearInterval(textInterval);
        if (this.textElement) {
          this.textElement.textContent = 'Welcome to your adventure!';
        }
        return;
      }

      this.currentTextIndex = (this.currentTextIndex + 1) % this.loadingTexts.length;
      
      if (this.textElement) {
        this.textElement.style.opacity = '0';
        
        setTimeout(() => {
          this.textElement.textContent = this.loadingTexts[this.currentTextIndex];
          this.textElement.style.opacity = '1';
        }, 300);
      }
    }, 2000);
  }

  completeLoading() {
    this.isLoaded = true;
    
    // Add fade out class
    if (this.loader) {
      this.loader.classList.add('fade-out');
      
      // Remove loader from DOM after animation
      setTimeout(() => {
        if (this.loader && this.loader.parentNode) {
          this.loader.parentNode.removeChild(this.loader);
        }
        
        // Trigger page loaded event
        document.body.classList.add('page-loaded');
        window.dispatchEvent(new CustomEvent('pageLoaded'));
        
        console.log('🎉 Mountain Adventure Loader completed');
      }, 800);
    }
  }

  setupEventListeners() {
    // Complete loading when page is fully loaded
    window.addEventListener('load', () => {
      if (!this.isLoaded) {
        setTimeout(() => {
          this.progress = 100;
          this.completeLoading();
        }, 1000);
      }
    });

    // Handle page visibility
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && !this.isLoaded) {
        // Pause animations when page is hidden
        if (this.loader) {
          this.loader.style.animationPlayState = 'paused';
        }
      } else if (!this.isLoaded) {
        // Resume animations when page becomes visible
        if (this.loader) {
          this.loader.style.animationPlayState = 'running';
        }
      }
    });
  }

  // Method to force completion (for debugging)
  forceComplete() {
    this.progress = 100;
    this.completeLoading();
  }

  // Method to get loading status
  getLoadingStatus() {
    return {
      progress: this.progress,
      isLoaded: this.isLoaded,
      currentText: this.loadingTexts[this.currentTextIndex]
    };
  }
}

// Auto-initialize when DOM is ready
let cinematicLoader;

function initCinematicLoader() {
  if (!cinematicLoader) {
    cinematicLoader = new CinematicLoader();
    window.cinematicLoader = cinematicLoader;
  }
}

// Initialize immediately
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCinematicLoader);
} else {
  initCinematicLoader();
}

// Export for global access
window.CinematicLoader = CinematicLoader;
window.initCinematicLoader = initCinematicLoader;
