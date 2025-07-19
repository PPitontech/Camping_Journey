/**
 * Main JavaScript for Camping Journey Equipaments MX
 * Handles header interactions, mobile menu, and general functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize header functionality
    initializeHeader();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize language switcher
    initializeLanguageSwitcher();
    
    // Initialize theme toggle
    initializeThemeToggle();
    
    // Initialize cart functionality
    initializeCart();
    
    // Initialize Vic Assistant
    initializeVicAssistant();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
});

/**
 * Initialize header functionality
 */
function initializeHeader() {
    const header = document.querySelector('.site-header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Add active state to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
    
    // Add hover effects to navigation
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

/**
 * Initialize mobile menu functionality
 */
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileMenuButton && mainNav) {
        mobileMenuButton.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animate hamburger icon
            const svg = this.querySelector('svg');
            if (mainNav.classList.contains('active')) {
                svg.style.transform = 'rotate(90deg)';
            } else {
                svg.style.transform = 'rotate(0deg)';
            }
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                mobileMenuButton.classList.remove('active');
                mobileMenuButton.querySelector('svg').style.transform = 'rotate(0deg)';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mainNav.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                mainNav.classList.remove('active');
                mobileMenuButton.classList.remove('active');
                mobileMenuButton.querySelector('svg').style.transform = 'rotate(0deg)';
            }
        });
    }
}

/**
 * Initialize language switcher functionality
 */
function initializeLanguageSwitcher() {
    const languageSwitcher = document.querySelector('.language-switcher');
    const currentLang = localStorage.getItem('lang') || 'es'; // Default to Spanish
    
    if (languageSwitcher) {
        // Add active state to the current language
        const currentLangElement = languageSwitcher.querySelector(`.lang-${currentLang}`);
        if (currentLangElement) {
            currentLangElement.classList.add('active');
        }
        
        // Add click listeners for language options
        languageSwitcher.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                languageSwitcher.querySelectorAll('.lang-option').forEach(opt => opt.classList.remove('active'));
                // Add active class to clicked option
                this.classList.add('active');
                
                // Update language preference
                const newLang = this.getAttribute('data-lang');
                localStorage.setItem('lang', newLang);
                
                // Reload the page to apply new language
                location.reload();
            });
        });
    }
}

/**
 * Initialize theme toggle functionality
 */
function initializeThemeToggle() {
    const themeToggleButton = document.querySelector('.theme-toggle-button');
    const body = document.body;
    const html = document.documentElement;
    
    console.log('Theme toggle button found:', themeToggleButton);
    
    if (themeToggleButton) {
        console.log('Initializing theme toggle...');
        
        // Load saved theme or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        console.log('Saved theme:', savedTheme);
        
        // Apply theme
        applyTheme(savedTheme);
        
        // Update icon based on current theme
        updateThemeIcon(savedTheme);
        
        themeToggleButton.addEventListener('click', function() {
            console.log('Theme toggle button clicked!');
            
            // Toggle theme
            const currentTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
            console.log('Switching to theme:', currentTheme);
            
            // Apply new theme
            applyTheme(currentTheme);
            
            // Save theme preference
            localStorage.setItem('theme', currentTheme);
            
            // Update icon
            updateThemeIcon(currentTheme);
            
            // Add click animation
            this.style.transform = 'scale(0.95) translateY(1px)';
            this.style.boxShadow = '0 1px 4px rgba(245, 158, 11, 0.4), inset 0 2px 4px rgba(0, 0, 0, 0.2)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1) translateY(0)';
                this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
            }, 150);
            
            console.log('Theme changed to:', currentTheme);
        });
        
        // Add hover effect
        themeToggleButton.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(245, 158, 11, 0.15) 100%)';
            this.style.borderColor = 'rgba(245, 158, 11, 0.6)';
            this.style.transform = 'scale(1.1) translateY(-1px)';
            this.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(15deg) scale(1.1)';
                icon.style.filter = 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.6))';
            }
        });
        
        themeToggleButton.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)';
            this.style.borderColor = 'rgba(245, 158, 11, 0.3)';
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
                icon.style.filter = 'drop-shadow(0 0 3px rgba(245, 158, 11, 0.3))';
            }
        });
    } else {
        console.error('Theme toggle button not found!');
    }
    
    function applyTheme(theme) {
        console.log('Applying theme:', theme);
        if (theme === 'light') {
            body.classList.add('light-theme');
            body.classList.remove('dark-theme');
            html.setAttribute('data-theme', 'light');
        } else {
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
            html.setAttribute('data-theme', 'dark');
        }
    }
    
    function updateThemeIcon(theme) {
        console.log('Updating theme icon for:', theme);
        const icon = themeToggleButton.querySelector('i');
        
        if (icon) {
            // Add fade out effect
            icon.style.opacity = '0';
            icon.style.transform = 'rotate(90deg) scale(0.8)';
            
            setTimeout(() => {
                if (theme === 'light') {
                    icon.className = 'fas fa-moon';
                    icon.style.color = '#6366f1';
                    icon.style.filter = 'drop-shadow(0 0 3px rgba(99, 102, 241, 0.3))';
                } else {
                    icon.className = 'fas fa-sun';
                    icon.style.color = '#f59e0b';
                    icon.style.filter = 'drop-shadow(0 0 3px rgba(245, 158, 11, 0.3))';
                }
                
                // Add fade in effect
                icon.style.opacity = '1';
                icon.style.transform = 'rotate(0deg) scale(1)';
            }, 100);
        }
    }
}

/**
 * Initialize cart functionality
 */
function initializeCart() {
    // Initialize cart manager if it exists
    if (typeof CartManager !== 'undefined') {
        window.cartManager = new CartManager();
    }
    
    // Add click listeners to cart icon
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.cartManager) {
                window.cartManager.toggleCartDropdown();
            }
        });
    }
    
    // Add click listeners to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            if (productCard && window.cartManager) {
                const productId = productCard.getAttribute('data-product-id');
                const productTitle = productCard.querySelector('.product-title').textContent;
                const productPrice = productCard.querySelector('.product-price').textContent.replace('$', '');
                const productImage = productCard.querySelector('.product-image img').src;
                
                const product = {
                    id: productId,
                    title: productTitle,
                    price: parseFloat(productPrice),
                    image: productImage,
                    quantity: 1
                };
                
                window.cartManager.addProduct(product);
                
                // Add visual feedback
                this.style.background = '#10b981';
                this.textContent = 'Added!';
                
                setTimeout(() => {
                    this.style.background = '#f59e0b';
                    this.textContent = 'Add to Cart';
                }, 2000);
            }
        });
    });
}

/**
 * Initialize Vic Assistant functionality
 */
function initializeVicAssistant() {
    const vicButton = document.querySelector('.vic-assistant button');
    
    if (vicButton) {
        vicButton.addEventListener('click', function() {
            // Toggle Vic Assistant
            toggleVicAssistant();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    function toggleVicAssistant() {
        // Create Vic Assistant modal if it doesn't exist
        let modal = document.querySelector('.vic-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.className = 'vic-modal';
            modal.innerHTML = `
                <div class="vic-modal-content">
                    <div class="vic-header">
                        <h3>Vic Assistant</h3>
                        <button class="vic-close">&times;</button>
                    </div>
                    <div class="vic-body">
                        <p>Hello! I'm Vic, your camping assistant. How can I help you today?</p>
                        <div class="vic-suggestions">
                            <button class="vic-suggestion">Find camping gear</button>
                            <button class="vic-suggestion">Check delivery options</button>
                            <button class="vic-suggestion">Product recommendations</button>
                        </div>
                    </div>
                    <div class="vic-footer">
                        <input type="text" placeholder="Type your message..." class="vic-input">
                        <button class="vic-send">Send</button>
                    </div>
                </div>
            `;
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
            `;
            document.body.appendChild(modal);
            
            // Add close functionality
            modal.querySelector('.vic-close').addEventListener('click', () => {
                modal.style.display = 'none';
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
        
        modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    }
}

/**
 * Initialize smooth scrolling for navigation links
 */
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#f59e0b'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 3000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
 * Add scrolled class to header
 */
const headerScrolledCSS = `
.site-header.scrolled {
    background-color: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(15px);
    border-bottom: 1px solid rgba(245, 158, 11, 0.2);
    transition: all 0.3s ease;
}

.site-header.scrolled .main-logo {
    max-width: 300px;
    transition: all 0.3s ease;
}

.site-header.scrolled .header-logo {
    padding: 1rem 0 0.5rem 0;
}

.site-header.scrolled .slogan {
    font-size: 1rem;
}
`;

// Add CSS to head
const style = document.createElement('style');
style.textContent = headerScrolledCSS;
document.head.appendChild(style);
