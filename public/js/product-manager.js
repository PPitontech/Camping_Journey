/**
 * Product Manager
 * Camping Journey Equipaments MX
 * Handles product loading, filtering, and display based on local_stock tag
 */

// Product data cache
let productData = null;

// DOM elements
const localStockContainer = document.getElementById('local-stock-products');
const dropshippingContainer = document.getElementById('dropshipping-products');

document.addEventListener('DOMContentLoaded', () => {
  // Initialize product loading
  initProductLoading();
  
  // Initialize product filtering
  initProductFiltering();
  
  // Initialize product search
  initProductSearch();
});

/**
 * Initialize product loading
 */
async function initProductLoading() {
  try {
    // Load product data
    await loadProductData();
    
    // Render products
    renderProducts();
  } catch (error) {
    console.error('Error initializing products:', error);
  }
}

/**
 * Load product data from JSON file
 */
async function loadProductData() {
  try {
    const response = await fetch('/data/products.json');
    
    if (!response.ok) {
      throw new Error('Failed to load product data');
    }
    
    const data = await response.json();
    productData = data.products;
    
    return productData;
  } catch (error) {
    console.error('Error loading product data:', error);
    throw error;
  }
}

/**
 * Render products in their respective containers
 */
function renderProducts() {
  if (!productData) {
    console.error('No product data available');
    return;
  }
  
  // Filter products by local_stock tag
  const localStockProducts = productData.filter(product => product.local_stock === true);
  const dropshippingProducts = productData.filter(product => product.local_stock === false);
  
  // Render local stock products
  if (localStockContainer) {
    renderProductList(localStockContainer, localStockProducts);
  }
  
  // Render dropshipping products
  if (dropshippingContainer) {
    renderProductList(dropshippingContainer, dropshippingProducts);
  }
}

/**
 * Render a list of products in a container
 * @param {HTMLElement} container - The container element
 * @param {Array} products - The products to render
 */
function renderProductList(container, products) {
  // Clear container
  container.innerHTML = '';
  
  // Create product grid
  const productGrid = document.createElement('div');
  productGrid.classList.add('product-grid');
  
  // Add products to grid
  products.forEach(product => {
    const productCard = createProductCard(product);
    productGrid.appendChild(productCard);
  });
  
  // Add grid to container
  container.appendChild(productGrid);
}

/**
 * Create a product card element
 * @param {Object} product - The product data
 * @returns {HTMLElement} The product card element
 */
function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('product-card');
  card.setAttribute('data-product-id', product.id);
  
  // Add featured badge if product is featured
  if (product.featured) {
    const featuredBadge = document.createElement('div');
    featuredBadge.classList.add('featured-badge');
    featuredBadge.textContent = 'Featured';
    card.appendChild(featuredBadge);
  }
  
  // Add local stock badge if product is local stock
  if (product.local_stock) {
    const localStockBadge = document.createElement('div');
    localStockBadge.classList.add('local-stock-badge');
    localStockBadge.textContent = 'Fast Delivery';
    card.appendChild(localStockBadge);
  }
  
  // Create product image
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('product-image');
  
  const image = document.createElement('img');
  image.src = product.images[0];
  image.alt = product.name;
  image.loading = 'lazy';
  
  imageContainer.appendChild(image);
  card.appendChild(imageContainer);
  
  // Create product content
  const content = document.createElement('div');
  content.classList.add('product-content');
  
  // Product name
  const name = document.createElement('h3');
  name.classList.add('product-name');
  name.textContent = product.name;
  content.appendChild(name);
  
  // Product price
  const price = document.createElement('div');
  price.classList.add('product-price');
  price.textContent = `${product.currency} ${product.price.toFixed(2)}`;
  content.appendChild(price);
  
  // Product rating
  const rating = document.createElement('div');
  rating.classList.add('product-rating');
  
  const stars = document.createElement('div');
  stars.classList.add('stars');
  
  // Create star rating
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.classList.add('star');
    
    if (i <= Math.floor(product.rating)) {
      star.classList.add('filled');
    } else if (i - 0.5 <= product.rating) {
      star.classList.add('half-filled');
    }
    
    stars.appendChild(star);
  }
  
  const reviewCount = document.createElement('span');
  reviewCount.classList.add('review-count');
  reviewCount.textContent = `(${product.reviews})`;
  
  rating.appendChild(stars);
  rating.appendChild(reviewCount);
  content.appendChild(rating);
  
  // Product shipping time
  const shipping = document.createElement('div');
  shipping.classList.add('product-shipping');
  shipping.textContent = `Shipping: ${product.shipping_time}`;
  content.appendChild(shipping);
  
  // Add to cart button
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-primary', 'add-to-cart');
  button.textContent = 'Add to Cart';
  button.setAttribute('data-product-id', product.id);
  content.appendChild(button);
  
  card.appendChild(content);
  
  // Add event listener for product card click
  card.addEventListener('click', (e) => {
    // Prevent click if the button was clicked
    if (e.target.classList.contains('add-to-cart')) {
      return;
    }
    
    // Navigate to product detail page
    window.location.href = `/product.html?id=${product.id}`;
  });
  
  // Add event listener for add to cart button
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    addToCart(product.id);
  });
  
  return card;
}

/**
 * Add a product to the cart
 * @param {string} productId - The product ID
 * Note: This function now uses the unified CartManager
 */
function addToCart(productId) {
  // Use the global CartManager instance
  if (window.cartManager) {
    return window.addToCart(productId);
  } else {
    console.warn('CartManager not available');
    return false;
  }
}

/**
 * Update cart UI
 * Note: This function is now handled by CartManager
 */
function updateCartUI() {
  // Cart UI is now handled by the CartManager class
  if (window.cartManager) {
    window.cartManager.updateCartUI();
  }
}

/**
 * Show toast message
 * @param {string} message - The message to show
 */
function showToast(message) {
  // Create toast element if it doesn't exist
  let toast = document.querySelector('.toast');
  
  if (!toast) {
    toast = document.createElement('div');
    toast.classList.add('toast');
    document.body.appendChild(toast);
  }
  
  // Set message
  toast.textContent = message;
  
  // Show toast
  toast.classList.add('show');
  
  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/**
 * Initialize product filtering
 */
function initProductFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Get filter value
      const filter = button.getAttribute('data-filter');
      
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Filter products
      filterProducts(filter);
    });
  });
}

/**
 * Filter products by category
 * @param {string} category - The category to filter by
 */
function filterProducts(category) {
  if (!productData) {
    return;
  }
  
  // Filter local stock products
  const filteredLocalStock = category === 'all' 
    ? productData.filter(product => product.local_stock === true)
    : productData.filter(product => product.local_stock === true && product.category === category);
  
  // Filter dropshipping products
  const filteredDropshipping = category === 'all'
    ? productData.filter(product => product.local_stock === false)
    : productData.filter(product => product.local_stock === false && product.category === category);
  
  // Render filtered products
  if (localStockContainer) {
    renderProductList(localStockContainer, filteredLocalStock);
  }
  
  if (dropshippingContainer) {
    renderProductList(dropshippingContainer, filteredDropshipping);
  }
}

/**
 * Initialize product search
 */
function initProductSearch() {
  const searchInput = document.querySelector('.product-search input');
  
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.trim().toLowerCase();
      
      // Search products
      searchProducts(searchTerm);
    });
  }
}

/**
 * Search products by name or description
 * @param {string} searchTerm - The search term
 */
function searchProducts(searchTerm) {
  if (!productData) {
    return;
  }
  
  if (!searchTerm) {
    // If search term is empty, show all products
    renderProducts();
    return;
  }
  
  // Filter local stock products
  const filteredLocalStock = productData.filter(product => {
    return product.local_stock === true && (
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  });
  
  // Filter dropshipping products
  const filteredDropshipping = productData.filter(product => {
    return product.local_stock === false && (
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  });
  
  // Render filtered products
  if (localStockContainer) {
    renderProductList(localStockContainer, filteredLocalStock);
  }
  
  if (dropshippingContainer) {
    renderProductList(dropshippingContainer, filteredDropshipping);
  }
}

// Initialize cart UI on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
});
