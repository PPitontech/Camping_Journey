/**
 * ===================================
 * SHOPPING CART SYSTEM - COMPLETE FUNCTIONALITY
 * ===================================
 */

class ShoppingCart {
  constructor() {
    this.items = [];
    this.isOpen = false;
    this.total = 0;
    this.itemCount = 0;
    
    this.loadFromStorage();
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateCartUI();
    this.updateCartCounter();
    
    console.log('Shopping Cart initialized');
  }

  loadFromStorage() {
    try {
      const savedCart = localStorage.getItem('campingJourneyCart');
      if (savedCart) {
        this.items = JSON.parse(savedCart);
        this.calculateTotals();
      }
    } catch (error) {
      console.warn('Error loading cart from storage:', error);
      this.items = [];
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem('campingJourneyCart', JSON.stringify(this.items));
    } catch (error) {
      console.warn('Error saving cart to storage:', error);
    }
  }

  setupEventListeners() {
    // Cart toggle button
    const cartButton = document.getElementById('cart-button');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartPanel = document.getElementById('cart-panel');
    const cartClose = document.getElementById('cart-close');

    if (cartButton) {
      cartButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleCart();
      });
    }

    if (cartOverlay) {
      cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
          this.closeCart();
        }
      });
    }

    if (cartClose) {
      cartClose.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeCart();
      });
    }

    // Add to cart buttons
    document.addEventListener('click', (e) => {
      if (e.target.matches('.add-to-cart-btn, .add-to-cart-btn *')) {
        e.preventDefault();
        const button = e.target.closest('.add-to-cart-btn');
        if (button) {
          this.handleAddToCart(button);
        }
      }
    });

    // Cart item controls (remove, quantity)
    document.addEventListener('click', (e) => {
      if (e.target.matches('.cart-item-remove')) {
        e.preventDefault();
        const productId = e.target.dataset.productId;
        if (productId) {
          this.removeFromCart(productId);
        }
      }

      if (e.target.matches('.cart-item-increase')) {
        e.preventDefault();
        const productId = e.target.dataset.productId;
        if (productId) {
          this.updateQuantity(productId, 1);
        }
      }

      if (e.target.matches('.cart-item-decrease')) {
        e.preventDefault();
        const productId = e.target.dataset.productId;
        if (productId) {
          this.updateQuantity(productId, -1);
        }
      }
    });

    // Escape key to close cart
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeCart();
      }
    });
  }

  handleAddToCart(button) {
    // Extract product data from button or parent element
    const productElement = button.closest('[data-product-id]') || button.closest('.product-card');
    
    let productData = {};

    if (productElement) {
      // Try to get data from data attributes
      productData = {
        id: productElement.dataset.productId || this.generateId(),
        name: productElement.dataset.productName || 
              productElement.querySelector('.product-title, h3, h4')?.textContent || 'Product',
        price: parseFloat(productElement.dataset.productPrice || '0'),
        image: productElement.dataset.productImage || 
               productElement.querySelector('img')?.src || '/images/product-placeholder.jpg',
        category: productElement.dataset.productCategory || 'general'
      };
    } else {
      // Fallback: create generic product
      productData = {
        id: this.generateId(),
        name: 'Camping Equipment',
        price: 99.99,
        image: '/images/product-placeholder.jpg',
        category: 'general'
      };
    }

    this.addToCart(productData);
    this.showAddToCartFeedback(button);
  }

  addToCart(product) {
    const existingItem = this.items.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        ...product,
        quantity: 1,
        addedAt: Date.now()
      });
    }

    this.calculateTotals();
    this.updateCartUI();
    this.updateCartCounter();
    this.saveToStorage();

    // Dispatch event
    document.dispatchEvent(new CustomEvent('cartUpdated', {
      detail: { 
        action: 'add',
        product: product,
        cartTotal: this.total,
        itemCount: this.itemCount
      }
    }));

    console.log(`Added ${product.name} to cart`);
  }

  removeFromCart(productId) {
    const itemIndex = this.items.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
      const removedItem = this.items.splice(itemIndex, 1)[0];
      
      this.calculateTotals();
      this.updateCartUI();
      this.updateCartCounter();
      this.saveToStorage();

      // Dispatch event
      document.dispatchEvent(new CustomEvent('cartUpdated', {
        detail: { 
          action: 'remove',
          product: removedItem,
          cartTotal: this.total,
          itemCount: this.itemCount
        }
      }));

      console.log(`Removed ${removedItem.name} from cart`);
    }
  }

  updateQuantity(productId, change) {
    const item = this.items.find(item => item.id === productId);
    
    if (item) {
      item.quantity += change;
      
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
        return;
      }

      this.calculateTotals();
      this.updateCartUI();
      this.updateCartCounter();
      this.saveToStorage();

      // Dispatch event
      document.dispatchEvent(new CustomEvent('cartUpdated', {
        detail: { 
          action: 'update',
          product: item,
          cartTotal: this.total,
          itemCount: this.itemCount
        }
      }));

      console.log(`Updated ${item.name} quantity to ${item.quantity}`);
    }
  }

  calculateTotals() {
    this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  updateCartCounter() {
    const counters = document.querySelectorAll('.cart-counter, #cart-counter');
    const cartButtons = document.querySelectorAll('#cart-button, .cart-toggle');

    counters.forEach(counter => {
      if (this.itemCount > 0) {
        counter.textContent = this.itemCount;
        counter.style.display = 'flex';
        counter.classList.add('has-items');
      } else {
        counter.style.display = 'none';
        counter.classList.remove('has-items');
      }
    });

    // Update cart button state
    cartButtons.forEach(button => {
      if (this.itemCount > 0) {
        button.classList.add('has-items');
      } else {
        button.classList.remove('has-items');
      }
    });
  }

  updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartEmpty = document.getElementById('cart-empty');
    const cartContent = document.getElementById('cart-content');

    if (!cartItemsContainer) return;

    if (this.items.length === 0) {
      // Show empty cart
      if (cartEmpty) cartEmpty.style.display = 'block';
      if (cartContent) cartContent.style.display = 'none';
      cartItemsContainer.innerHTML = '';
      return;
    }

    // Hide empty cart, show content
    if (cartEmpty) cartEmpty.style.display = 'none';
    if (cartContent) cartContent.style.display = 'block';

    // Render cart items
    cartItemsContainer.innerHTML = this.items.map(item => `
      <div class="cart-item" data-product-id="${item.id}">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.name}</h4>
          <p class="cart-item-price">$${item.price.toFixed(2)}</p>
        </div>
        <div class="cart-item-controls">
          <button class="cart-item-decrease" data-product-id="${item.id}" aria-label="Decrease quantity">-</button>
          <span class="cart-item-quantity">${item.quantity}</span>
          <button class="cart-item-increase" data-product-id="${item.id}" aria-label="Increase quantity">+</button>
          <button class="cart-item-remove" data-product-id="${item.id}" aria-label="Remove item">×</button>
        </div>
      </div>
    `).join('');

    // Update total
    if (cartTotal) {
      cartTotal.textContent = `$${this.total.toFixed(2)}`;
    }
  }

  toggleCart() {
    if (this.isOpen) {
      this.closeCart();
    } else {
      this.openCart();
    }
  }

  openCart() {
    const cartOverlay = document.getElementById('cart-overlay');
    const cartPanel = document.getElementById('cart-panel');
    const cartButton = document.getElementById('cart-button');

    if (!cartOverlay || !cartPanel) {
      console.warn('Cart elements not found');
      return;
    }

    this.isOpen = true;

    // Show cart
    cartOverlay.classList.add('active');
    cartPanel.classList.add('active');
    if (cartButton) cartButton.classList.add('active');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Update cart content
    this.updateCartUI();

    // Focus management
    setTimeout(() => {
      const firstFocusable = cartPanel.querySelector('button, [tabindex="0"]');
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }, 100);

    console.log('Cart opened');
  }

  closeCart() {
    const cartOverlay = document.getElementById('cart-overlay');
    const cartPanel = document.getElementById('cart-panel');
    const cartButton = document.getElementById('cart-button');

    if (!cartOverlay || !cartPanel) return;

    this.isOpen = false;

    // Hide cart
    cartOverlay.classList.remove('active');
    cartPanel.classList.remove('active');
    if (cartButton) cartButton.classList.remove('active');

    // Restore body scroll
    document.body.style.overflow = '';

    // Return focus to cart button
    if (cartButton) {
      cartButton.focus();
    }

    console.log('Cart closed');
  }

  showAddToCartFeedback(button) {
    // Visual feedback for add to cart
    button.classList.add('adding');
    const originalText = button.textContent;
    
    // Get current language for feedback text
    const currentLang = localStorage.getItem('campingJourneyLanguage') || 'pt';
    const feedbackText = {
      pt: 'Adicionado!',
      en: 'Added!',
      es: '¡Agregado!'
    };

    button.textContent = feedbackText[currentLang] || 'Added!';

    setTimeout(() => {
      button.classList.remove('adding');
      button.textContent = originalText;
    }, 1500);

    // Optional: show toast notification
    this.showToast(feedbackText[currentLang] || 'Added to cart!');
  }

  showToast(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'cart-toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10B981;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 500;
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 100);

    // Animate out and remove
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }

  clearCart() {
    this.items = [];
    this.calculateTotals();
    this.updateCartUI();
    this.updateCartCounter();
    this.saveToStorage();

    // Dispatch event
    document.dispatchEvent(new CustomEvent('cartUpdated', {
      detail: { 
        action: 'clear',
        cartTotal: 0,
        itemCount: 0
      }
    }));

    console.log('Cart cleared');
  }

  generateId() {
    return 'product_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Public API
  getItems() {
    return [...this.items];
  }

  getTotal() {
    return this.total;
  }

  getItemCount() {
    return this.itemCount;
  }

  isCartOpen() {
    return this.isOpen;
  }
}

// Global functions for compatibility
window.addToCart = function(product) {
  if (window.shoppingCart) {
    window.shoppingCart.addToCart(product);
  }
};

window.removeFromCart = function(productId) {
  if (window.shoppingCart) {
    window.shoppingCart.removeFromCart(productId);
  }
};

window.updateQuantity = function(productId, newQuantity) {
  if (window.shoppingCart) {
    const item = window.shoppingCart.items.find(item => item.id === productId);
    if (item) {
      const change = newQuantity - item.quantity;
      window.shoppingCart.updateQuantity(productId, change);
    }
  }
};

window.toggleCart = function() {
  if (window.shoppingCart) {
    window.shoppingCart.toggleCart();
  }
};

window.clearCart = function() {
  if (window.shoppingCart) {
    window.shoppingCart.clearCart();
  }
};

// Initialize when DOM is ready
function initShoppingCart() {
  if (!window.shoppingCart) {
    window.shoppingCart = new ShoppingCart();
  }
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initShoppingCart);
} else {
  initShoppingCart();
}

// Export
window.ShoppingCart = ShoppingCart;
window.initShoppingCart = initShoppingCart; 