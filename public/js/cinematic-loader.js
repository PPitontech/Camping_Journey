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
      'Loading mountain adventure...',
      'Preparing camping experience...',
      'Setting up outdoor gear...',
      'Loading wilderness journey...',
      'Initializing adventure mode...'
    ];
    this.currentTextIndex = 0;
    
    this.init();
  }

  init() {
    // Remove any existing loaders first
    this.removeExistingLoaders();
    this.createLoader();
    this.startLoading();
    this.setupEventListeners();
    
    console.log('🏔️ MOUNTAIN ADVENTURE LOADER FORCE INITIALIZED');
  }

  removeExistingLoaders() {
    // Remove any existing loaders
    const existingLoaders = document.querySelectorAll('.cinematic-loader, .loader, .loading-screen');
    existingLoaders.forEach(loader => {
      if (loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    });
    console.log('🧹 Removed existing loaders');
  }

  createLoader() {
    // Create loader HTML structure with FORCE timestamp
    const timestamp = Date.now();
    const loaderHTML = `
      <div class="cinematic-loader mountain-loader-${timestamp}" id="cinematicLoader">
        <!-- Mountain Particles Background -->
        <div class="mountain-particles" id="mountainParticles"></div>
        
        <!-- Main Content -->
        <div class="loader-logo">
          <!-- MOUNTAIN LOGO SVG - FORCED -->
          <div class="mountain-logo" style="width: 280px; height: 180px; display: flex; justify-content: center; align-items: center;">
            <svg width="280" height="180" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg" style="max-width: 100%; height: auto;">
              <!-- GREEN MOUNTAIN CURVES ONLY -->
              <defs>
                <linearGradient id="mountainGrad${timestamp}" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style="stop-color:#228B22;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#006400;stop-opacity:1" />
                </linearGradient>
              </defs>
              
              <!-- CLEAN MOUNTAIN SILHOUETTE -->
              <path d="M30 120 
                       Q60 80 90 85
                       Q120 90 150 60
                       Q180 30 210 45
                       Q240 60 270 65
                       Q270 120 270 120
                       L30 120 Z" 
                    fill="url(#mountainGrad${timestamp})" 
                    opacity="1"
                    style="animation: mountainPulse 4s ease-in-out infinite;">
              </path>
              
              <!-- Loading dots on mountain peaks -->
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
          <div class="loader-brand" style="text-align: center; color: #f0f6fc; margin-top: 2rem;">
            <h1 style="font-size: 2.5rem; font-weight: 700; margin: 0 0 0.5rem 0; background: linear-gradient(135deg, #228B22 0%, #32CD32 50%, #006400 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">CAMPING JOURNEY</h1>
            <p style="font-size: 1.1rem; color: #8b949e; letter-spacing: 0.1em; text-transform: uppercase; margin: 0;">Mountain Adventure</p>
          </div>
        </div>
        
        <!-- Loading Progress -->
        <div class="loader-progress" id="loaderProgress" style="position: relative; width: 300px; height: 4px; background: rgba(139, 148, 158, 0.2); border-radius: 2px; overflow: hidden; margin-top: 2rem;">
          <div class="progress-bar" style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent 0%, #228B22 20%, #32CD32 50%, #006400 80%, transparent 100%); animation: progressSlide 2s ease-in-out infinite;"></div>
        </div>
        
        <!-- Loading Text -->
        <div class="loader-text" id="loaderText" style="margin-top: 1.5rem; font-size: 0.95rem; color: #8b949e; font-weight: 500; letter-spacing: 0.05em;">Loading mountain adventure...</div>
      </div>
      
      <style>
        @keyframes mountainPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        @keyframes progressSlide {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        .cinematic-loader {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          background: linear-gradient(135deg, #0d1117 0%, #1a1f2e 50%, #0d1117 100%) !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          align-items: center !important;
          z-index: 99999 !important;
          opacity: 1 !important;
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        .cinematic-loader.fade-out {
          opacity: 0 !important;
          pointer-events: none !important;
        }
      </style>
    `;

    // Insert loader into DOM with high priority
    document.body.insertAdjacentHTML('afterbegin', loaderHTML);
    this.loader = document.getElementById('cinematicLoader');
    this.progressElement = document.getElementById('loaderProgress');
    this.textElement = document.getElementById('loaderText');

    // Force display
    if (this.loader) {
      this.loader.style.display = 'flex';
      this.loader.style.zIndex = '99999';
      console.log('✅ MOUNTAIN LOADER CREATED AND FORCED TO DISPLAY');
    }

    // Create mountain particles
    this.createMountainParticles();
  }

  createMountainParticles() {
    const particlesContainer = document.getElementById('mountainParticles');
    if (!particlesContainer) return;
    
    const particleCount = 12;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'mountain-particle';
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: #32CD32;
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        animation: particleFloat ${4 + Math.random() * 4}s linear infinite;
        animation-delay: ${Math.random() * 6}s;
        opacity: 0;
      `;
      
      particlesContainer.appendChild(particle);
    }

    // Add particle animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes particleFloat {
        0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100px) translateX(100px); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
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
    // Progress is handled by CSS animation
    console.log(`📊 Loading progress: ${Math.round(this.progress)}%`);
  }

  updateLoadingText() {
    const textInterval = setInterval(() => {
      if (this.progress >= 100) {
        clearInterval(textInterval);
        if (this.textElement) {
          this.textElement.textContent = 'Welcome to your mountain adventure!';
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
        
        console.log('🎉 MOUNTAIN ADVENTURE LOADER COMPLETED');
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

// FORCE INITIALIZE IMMEDIATELY
let cinematicLoader;

function initCinematicLoader() {
  console.log('🔥 FORCE INITIALIZING MOUNTAIN LOADER');
  
  // Remove any existing instances
  if (cinematicLoader) {
    try {
      cinematicLoader.forceComplete();
    } catch(e) {
      console.log('Clearing old loader');
    }
  }
  
  cinematicLoader = new CinematicLoader();
  window.cinematicLoader = cinematicLoader;
}

// Initialize IMMEDIATELY - no waiting
initCinematicLoader();

// Also initialize on DOM ready as backup
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (!cinematicLoader || !cinematicLoader.loader) {
      initCinematicLoader();
    }
  });
} else {
  // DOM already ready, make sure loader is there
  if (!cinematicLoader || !cinematicLoader.loader) {
    initCinematicLoader();
  }
}

// Export for global access
window.CinematicLoader = CinematicLoader;
window.initCinematicLoader = initCinematicLoader;
