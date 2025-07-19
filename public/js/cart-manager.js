/**
 * Cart Manager - Camping Journey Equipaments MX
 * Unified cart management system
 */

class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.cartKey = 'campingJourneyCart';
        this.init();
    }

    /**
     * Initialize cart manager
     */
    init() {
        this.updateCartUI();
        this.bindEvents();
        this.setupCartIcon();
    }

    /**
     * Load cart from localStorage
     */
    loadCart() {
        try {
            const cart = localStorage.getItem(this.cartKey);
            return cart ? JSON.parse(cart) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }

    /**
     * Save cart to localStorage
     */
    saveCart() {
        try {
            localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }

    /**
     * Add product to cart
     */
    addProduct(productId, title, price, image = null) {
        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: productId,
                title: title,
                price: this.parsePrice(price),
                image: image,
                quantity: 1,
                addedAt: new Date().toISOString()
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showNotification(`${title} added to cart!`, 'success');
        
        return true;
    }

    /**
     * Remove product from cart
     */
    removeProduct(productId) {
        const itemIndex = this.cart.findIndex(item => item.id === productId);
        
        if (itemIndex > -1) {
            const item = this.cart[itemIndex];
            this.cart.splice(itemIndex, 1);
            this.saveCart();
            this.updateCartUI();
            this.showNotification(`${item.title} removed from cart!`, 'info');
            return true;
        }
        
        return false;
    }

    /**
     * Update product quantity
     */
    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        
        if (item) {
            if (quantity <= 0) {
                this.removeProduct(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartUI();
            }
            return true;
        }
        
        return false;
    }

    /**
     * Clear cart
     */
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartUI();
        this.showNotification('Cart cleared!', 'info');
    }

    /**
     * Get cart summary
     */
    getSummary() {
        const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        return {
            items: this.cart,
            totalItems,
            totalPrice: totalPrice.toFixed(2),
            isEmpty: this.cart.length === 0
        };
    }

    /**
     * Parse price string to number
     */
    parsePrice(priceString) {
        if (typeof priceString === 'number') return priceString;
        
        // Remove currency symbols and convert to number
        const cleanPrice = priceString.replace(/[^\d.,]/g, '');
        const normalizedPrice = cleanPrice.replace(',', '.');
        return parseFloat(normalizedPrice) || 0;
    }

    /**
     * Update cart UI elements
     */
    updateCartUI() {
        const summary = this.getSummary();
        
        // Update cart count badges
        const cartCounts = document.querySelectorAll('.cart-count');
        cartCounts.forEach(count => {
            count.textContent = summary.totalItems;
            count.style.display = summary.totalItems > 0 ? 'flex' : 'none';
        });

        // Update cart badges
        const cartBadges = document.querySelectorAll('.cart-badge');
        cartBadges.forEach(badge => {
            badge.textContent = summary.totalItems;
            badge.style.display = summary.totalItems > 0 ? 'flex' : 'none';
        });

        // Update cart icons
        const cartIcons = document.querySelectorAll('.cart-icon');
        cartIcons.forEach(icon => {
            if (summary.totalItems > 0) {
                icon.classList.add('has-items');
            } else {
                icon.classList.remove('has-items');
            }
        });

        // Update cart dropdown if open
        this.updateCartDropdown();
    }

    /**
     * Setup cart icon functionality
     */
    setupCartIcon() {
        const cartButtons = document.querySelectorAll('.cart-icon button, .cart-icon');
        
        cartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleCartDropdown();
            });
        });
    }

    /**
     * Toggle cart dropdown
     */
    toggleCartDropdown() {
        let dropdown = document.querySelector('.cart-dropdown');
        
        if (!dropdown) {
            dropdown = this.createCartDropdown();
        }
        
        const isVisible = dropdown.style.display === 'block';
        dropdown.style.display = isVisible ? 'none' : 'block';
        
        if (!isVisible) {
            this.updateCartDropdown();
        }
    }

    /**
     * Create cart dropdown
     */
    createCartDropdown() {
        const dropdown = document.createElement('div');
        dropdown.className = 'cart-dropdown';
        dropdown.style.cssText = `
            position: absolute;
            top: 100%;
            right: -10px;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding: 1rem;
            min-width: 320px;
            max-width: 400px;
            z-index: 1000;
            margin-top: 0.5rem;
            color: white;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            display: none;
            text-align: left;
            font-family: 'Inter', sans-serif;
            line-height: 1.4;
        `;

        // Find cart icon container
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.style.position = 'relative';
            cartIcon.appendChild(dropdown);
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && !e.target.closest('.cart-icon')) {
                dropdown.style.display = 'none';
            }
        });

        return dropdown;
    }

    /**
     * Update cart dropdown content
     */
    updateCartDropdown() {
        const dropdown = document.querySelector('.cart-dropdown');
        if (!dropdown) return;

        const summary = this.getSummary();
        
        if (summary.isEmpty) {
            dropdown.innerHTML = `
                <div class="cart-header" style="margin-bottom: 1rem; text-align: left;">
                    <h3 style="margin: 0 0 1rem 0; font-size: 1.1rem; font-weight: 600;">Shopping Cart</h3>
                </div>
                <div class="cart-empty" style="text-align: center; padding: 2rem 0; color: rgba(255,255,255,0.7);">
                    <i class="fas fa-shopping-cart" style="font-size: 2rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <p style="margin: 0; font-size: 0.9rem;">Your cart is empty</p>
                </div>
            `;
        } else {
            const itemsHTML = summary.items.map(item => `
                <div class="cart-item" style="
                    display: flex; 
                    align-items: center; 
                    padding: 0.75rem 0; 
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    text-align: left;
                ">
                    <div class="item-info" style="flex: 1; margin-right: 1rem;">
                        <h4 style="margin: 0 0 0.25rem 0; font-size: 0.9rem; color: white; font-weight: 500; line-height: 1.3;">${item.title}</h4>
                        <p style="margin: 0; font-size: 0.8rem; color: rgba(255,255,255,0.7); line-height: 1.2;">$${item.price} x ${item.quantity}</p>
                    </div>
                    <div class="item-controls" style="
                        display: flex; 
                        align-items: center; 
                        gap: 0.5rem;
                        flex-shrink: 0;
                    ">
                        <button onclick="cartManager.updateQuantity('${item.id}', ${item.quantity - 1})" 
                                style="background: rgba(255,255,255,0.1); border: none; color: white; width: 24px; height: 24px; border-radius: 50%; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center;">-</button>
                        <span style="color: white; min-width: 20px; text-align: center; font-size: 0.9rem;">${item.quantity}</span>
                        <button onclick="cartManager.updateQuantity('${item.id}', ${item.quantity + 1})" 
                                style="background: rgba(255,255,255,0.1); border: none; color: white; width: 24px; height: 24px; border-radius: 50%; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center;">+</button>
                        <button onclick="cartManager.removeProduct('${item.id}')" 
                                style="background: rgba(220,38,38,0.8); border: none; color: white; width: 24px; height: 24px; border-radius: 50%; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; margin-left: 0.25rem;">×</button>
                    </div>
                </div>
            `).join('');

            dropdown.innerHTML = `
                <div class="cart-header" style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; font-size: 1.1rem; font-weight: 600;">Shopping Cart</h3>
                    <span style="font-size: 0.9rem; color: rgba(255,255,255,0.7);">${summary.totalItems} items</span>
                </div>
                <div class="cart-items" style="max-height: 300px; overflow-y: auto; margin-bottom: 1rem;">
                    ${itemsHTML}
                </div>
                <div class="cart-footer" style="padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                    <div class="cart-total" style="margin-bottom: 1rem; text-align: right;">
                        <strong style="color: #f59e0b; font-size: 1.1rem; font-weight: 600;">Total: $${summary.totalPrice}</strong>
                    </div>
                    <div class="cart-actions" style="display: flex; gap: 0.5rem;">
                        <button onclick="cartManager.clearCart()" 
                                style="flex: 1; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 0.75rem; border-radius: 4px; cursor: pointer; font-size: 0.9rem; font-weight: 500;">Clear</button>
                        <button onclick="window.location.href='#checkout'" 
                                style="flex: 2; background: #f59e0b; border: none; color: black; padding: 0.75rem; border-radius: 4px; cursor: pointer; font-weight: 600; font-size: 0.9rem;">Checkout</button>
                    </div>
                </div>
            `;
        }
    }

    /**
     * Bind events for add to cart buttons
     */
    bindEvents() {
        // Handle add to cart buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
                e.preventDefault();
                
                const button = e.target.classList.contains('add-to-cart') ? e.target : e.target.closest('.add-to-cart');
                const productCard = button.closest('.product-card');
                
                if (productCard) {
                    const productId = productCard.getAttribute('data-product-id') || `product-${Date.now()}`;
                    const titleElement = productCard.querySelector('.product-title, h3');
                    const priceElement = productCard.querySelector('.product-price');
                    const imageElement = productCard.querySelector('.product-image img');
                    
                    const title = titleElement ? titleElement.textContent.trim() : 'Unknown Product';
                    const price = priceElement ? priceElement.textContent.trim() : '0';
                    const image = imageElement ? imageElement.src : null;
                    
                    // Add visual feedback
                    button.style.transform = 'scale(0.95)';
                    button.style.background = '#10b981';
                    button.textContent = 'Added!';
                    
                    setTimeout(() => {
                        button.style.transform = 'scale(1)';
                        button.style.background = '';
                        button.textContent = 'Add to Cart';
                    }, 1000);
                    
                    this.addProduct(productId, title, price, image);
                }
            }
        });
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `cart-notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#f59e0b'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 3000;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize cart manager when DOM is loaded
let cartManager;

document.addEventListener('DOMContentLoaded', () => {
    cartManager = new CartManager();
    
    // Make it globally accessible
    window.cartManager = cartManager;
    
    // Legacy support for existing code
    window.addProductToCart = (productId, title, price, image) => {
        return cartManager.addProduct(productId, title, price, image);
    };
    
    window.addToCart = (productId) => {
        const productCard = document.querySelector(`[data-product-id="${productId}"]`);
        if (productCard) {
            const titleElement = productCard.querySelector('.product-title, h3');
            const priceElement = productCard.querySelector('.product-price');
            const title = titleElement ? titleElement.textContent.trim() : 'Unknown Product';
            const price = priceElement ? priceElement.textContent.trim() : '0';
            return cartManager.addProduct(productId, title, price);
        }
        return false;
    };
});

// Add cart badge styles
const cartStyles = `
.cart-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #f59e0b;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    min-width: 20px;
    padding: 0 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.cart-count {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #f59e0b;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    min-width: 20px;
    padding: 0 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.cart-icon {
    position: relative;
    cursor: pointer;
}

.cart-icon.has-items {
    animation: cartBounce 0.3s ease;
}

@keyframes cartBounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

.cart-dropdown {
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.3) transparent;
    text-align: left !important;
    font-family: 'Inter', sans-serif !important;
    line-height: 1.4 !important;
}

.cart-dropdown * {
    text-align: inherit !important;
    font-family: inherit !important;
    box-sizing: border-box;
}

.cart-dropdown h3 {
    text-align: left !important;
    font-weight: 600 !important;
    margin: 0 !important;
}

.cart-dropdown p {
    text-align: left !important;
    margin: 0 !important;
    line-height: 1.3 !important;
}

.cart-dropdown .cart-empty {
    text-align: center !important;
}

.cart-dropdown .cart-total {
    text-align: right !important;
}

.cart-dropdown .cart-item {
    text-align: left !important;
    align-items: center !important;
}

.cart-dropdown .item-info {
    text-align: left !important;
    flex: 1 !important;
}

.cart-dropdown .item-controls {
    text-align: center !important;
    flex-shrink: 0 !important;
}

.cart-dropdown::-webkit-scrollbar {
    width: 6px;
}

.cart-dropdown::-webkit-scrollbar-track {
    background: transparent;
}

.cart-dropdown::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.3);
    border-radius: 3px;
}

.cart-dropdown::-webkit-scrollbar-thumb:hover {
    background: rgba(255,255,255,0.5);
}
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = cartStyles;
document.head.appendChild(styleSheet); 