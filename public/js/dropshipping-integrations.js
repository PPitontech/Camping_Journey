/**
 * Camping Journey Dropshipping Integrations
 * Handles DSers/AliExpress, Zendrop/Spocket, Mercado Libre API, Amazon MX API integrations
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize dropshipping integrations if on admin dashboard
  if (document.querySelector('.admin-dashboard')) {
    initDropshippingIntegrations();
  }
  
  // Initialize product import functionality if on product import page
  if (document.querySelector('.product-import')) {
    initProductImport();
  }
  
  // Initialize order fulfillment if on order management page
  if (document.querySelector('.order-fulfillment')) {
    initOrderFulfillment();
  }
});

/**
 * Initialize all dropshipping integrations
 */
function initDropshippingIntegrations() {
  // Initialize each integration based on configuration
  const activeIntegrations = getActiveIntegrations();
  
  if (activeIntegrations.includes('dsers')) {
    initDSersIntegration();
  }
  
  if (activeIntegrations.includes('zendrop')) {
    initZendropIntegration();
  }
  
  if (activeIntegrations.includes('spocket')) {
    initSpocketIntegration();
  }
  
  if (activeIntegrations.includes('mercadolibre')) {
    initMercadoLibreIntegration();
  }
  
  if (activeIntegrations.includes('amazon')) {
    initAmazonMXIntegration();
  }
  
  // Initialize dashboard metrics
  initDropshippingMetrics();
}

/**
 * Get active integrations from configuration
 * @returns {Array} List of active integration keys
 */
function getActiveIntegrations() {
  // In a real implementation, this would come from server-side configuration
  // For demonstration purposes, we're returning a static list
  return ['dsers', 'zendrop', 'mercadolibre', 'amazon'];
}

/**
 * DSers/AliExpress Integration
 */
function initDSersIntegration() {
  console.log('Initializing DSers/AliExpress integration');
  
  // Set up DSers API connection
  const dsersApiKey = 'dsers_api_key_placeholder';
  
  // Set up event listeners for DSers-related actions
  const dsersImportBtn = document.getElementById('dsers-import-btn');
  if (dsersImportBtn) {
    dsersImportBtn.addEventListener('click', () => {
      importProductsFromDSers();
    });
  }
  
  const dsersFulfillBtn = document.getElementById('dsers-fulfill-btn');
  if (dsersFulfillBtn) {
    dsersFulfillBtn.addEventListener('click', () => {
      fulfillOrdersWithDSers();
    });
  }
}

/**
 * Import products from DSers/AliExpress
 */
async function importProductsFromDSers() {
  const productUrl = document.getElementById('dsers-product-url').value;
  const importOptions = {
    categories: getSelectedCategories(),
    localStock: document.getElementById('local-stock-checkbox').checked,
    markup: document.getElementById('markup-percentage').value || 100
  };
  
  try {
    // Show loading state
    showImportLoading('Importing product from AliExpress...');
    
    // In a real implementation, this would be a server-side call
    const response = await fetch('/api/import/dsers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_url: productUrl,
        options: importOptions
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to import product');
    }
    
    const data = await response.json();
    showImportSuccess(data.product);
  } catch (error) {
    showImportError('Error importing product. Please try again.');
    console.error('DSers import error:', error);
  }
}

/**
 * Fulfill orders with DSers/AliExpress
 */
async function fulfillOrdersWithDSers() {
  const selectedOrders = getSelectedOrders();
  
  if (selectedOrders.length === 0) {
    showFulfillmentError('Please select at least one order to fulfill');
    return;
  }
  
  try {
    // Show loading state
    showFulfillmentLoading('Processing orders with DSers...');
    
    // In a real implementation, this would be a server-side call
    const response = await fetch('/api/fulfill/dsers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_ids: selectedOrders
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to fulfill orders');
    }
    
    const data = await response.json();
    showFulfillmentSuccess(data.fulfilled_orders);
  } catch (error) {
    showFulfillmentError('Error fulfilling orders. Please try again.');
    console.error('DSers fulfillment error:', error);
  }
}

/**
 * Zendrop Integration
 */
function initZendropIntegration() {
  console.log('Initializing Zendrop integration');
  
  // Set up Zendrop API connection
  const zendropApiKey = 'zendrop_api_key_placeholder';
  
  // Set up event listeners for Zendrop-related actions
  const zendropImportBtn = document.getElementById('zendrop-import-btn');
  if (zendropImportBtn) {
    zendropImportBtn.addEventListener('click', () => {
      importProductsFromZendrop();
    });
  }
  
  const zendropFulfillBtn = document.getElementById('zendrop-fulfill-btn');
  if (zendropFulfillBtn) {
    zendropFulfillBtn.addEventListener('click', () => {
      fulfillOrdersWithZendrop();
    });
  }
}

/**
 * Spocket Integration
 */
function initSpocketIntegration() {
  console.log('Initializing Spocket integration');
  
  // Set up Spocket API connection
  const spocketApiKey = 'spocket_api_key_placeholder';
  
  // Set up event listeners for Spocket-related actions
  const spocketImportBtn = document.getElementById('spocket-import-btn');
  if (spocketImportBtn) {
    spocketImportBtn.addEventListener('click', () => {
      importProductsFromSpocket();
    });
  }
  
  const spocketFulfillBtn = document.getElementById('spocket-fulfill-btn');
  if (spocketFulfillBtn) {
    spocketFulfillBtn.addEventListener('click', () => {
      fulfillOrdersWithSpocket();
    });
  }
}

/**
 * Mercado Libre API Integration
 */
function initMercadoLibreIntegration() {
  console.log('Initializing Mercado Libre integration');
  
  // Set up Mercado Libre API connection
  const mercadoLibreApiKey = 'mercadolibre_api_key_placeholder';
  
  // Set up event listeners for Mercado Libre-related actions
  const mercadoLibreImportBtn = document.getElementById('mercadolibre-import-btn');
  if (mercadoLibreImportBtn) {
    mercadoLibreImportBtn.addEventListener('click', () => {
      importProductsFromMercadoLibre();
    });
  }
  
  const mercadoLibreSyncBtn = document.getElementById('mercadolibre-sync-btn');
  if (mercadoLibreSyncBtn) {
    mercadoLibreSyncBtn.addEventListener('click', () => {
      syncWithMercadoLibre();
    });
  }
}

/**
 * Amazon MX API Integration
 */
function initAmazonMXIntegration() {
  console.log('Initializing Amazon MX integration');
  
  // Set up Amazon MX API connection
  const amazonApiKey = 'amazon_api_key_placeholder';
  
  // Set up event listeners for Amazon-related actions
  const amazonImportBtn = document.getElementById('amazon-import-btn');
  if (amazonImportBtn) {
    amazonImportBtn.addEventListener('click', () => {
      importProductsFromAmazon();
    });
  }
  
  const amazonSyncBtn = document.getElementById('amazon-sync-btn');
  if (amazonSyncBtn) {
    amazonSyncBtn.addEventListener('click', () => {
      syncWithAmazon();
    });
  }
}

/**
 * Initialize Product Import Functionality
 */
function initProductImport() {
  // Set up tabs for different import sources
  const importTabs = document.querySelectorAll('.import-tab');
  const importPanels = document.querySelectorAll('.import-panel');
  
  importTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and panels
      importTabs.forEach(t => t.classList.remove('active'));
      importPanels.forEach(p => p.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding panel
      tab.classList.add('active');
      const panelId = tab.getAttribute('data-panel');
      document.getElementById(panelId).classList.add('active');
    });
  });
  
  // Set up bulk import functionality
  const bulkImportBtn = document.getElementById('bulk-import-btn');
  if (bulkImportBtn) {
    bulkImportBtn.addEventListener('click', () => {
      const source = document.querySelector('.import-tab.active').getAttribute('data-source');
      bulkImportProducts(source);
    });
  }
}

/**
 * Initialize Order Fulfillment Functionality
 */
function initOrderFulfillment() {
  // Set up order selection
  const orderCheckboxes = document.querySelectorAll('.order-checkbox');
  const selectAllCheckbox = document.getElementById('select-all-orders');
  
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', () => {
      const isChecked = selectAllCheckbox.checked;
      orderCheckboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
      });
      updateSelectedOrdersCount();
    });
  }
  
  orderCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      updateSelectedOrdersCount();
    });
  });
  
  // Set up fulfillment source selection
  const fulfillmentSourceSelect = document.getElementById('fulfillment-source');
  if (fulfillmentSourceSelect) {
    fulfillmentSourceSelect.addEventListener('change', () => {
      const source = fulfillmentSourceSelect.value;
      showFulfillmentOptions(source);
    });
  }
}

/**
 * Initialize Dropshipping Metrics Dashboard
 */
function initDropshippingMetrics() {
  // Fetch metrics data
  fetchDropshippingMetrics()
    .then(data => {
      updateMetricsDashboard(data);
    })
    .catch(error => {
      console.error('Error fetching dropshipping metrics:', error);
    });
}

/**
 * Fetch dropshipping metrics from server
 * @returns {Promise} Promise resolving to metrics data
 */
async function fetchDropshippingMetrics() {
  try {
    const response = await fetch('/api/metrics/dropshipping');
    if (!response.ok) {
      throw new Error('Failed to fetch metrics');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return {
      error: 'Failed to load metrics'
    };
  }
}

/**
 * Update metrics dashboard with data
 * @param {Object} data - The metrics data
 */
function updateMetricsDashboard(data) {
  if (data.error) {
    document.getElementById('metrics-container').innerHTML = `<div class="error-message">${data.error}</div>`;
    return;
  }
  
  // Update inventory metrics
  if (data.inventory) {
    document.getElementById('total-products').textContent = data.inventory.total_products;
    document.getElementById('local-stock-products').textContent = data.inventory.local_stock_products;
    document.getElementById('dropshipping-products').textContent = data.inventory.dropshipping_products;
  }
  
  // Update order metrics
  if (data.orders) {
    document.getElementById('pending-orders').textContent = data.orders.pending;
    document.getElementById('processing-orders').textContent = data.orders.processing;
    document.getElementById('shipped-orders').textContent = data.orders.shipped;
    document.getElementById('delivered-orders').textContent = data.orders.delivered;
  }
  
  // Update financial metrics
  if (data.financial) {
    document.getElementById('total-revenue').textContent = formatCurrency(data.financial.total_revenue);
    document.getElementById('profit-margin').textContent = data.financial.profit_margin + '%';
    document.getElementById('average-order-value').textContent = formatCurrency(data.financial.average_order_value);
  }
  
  // Update supplier metrics
  if (data.suppliers) {
    updateSupplierMetrics(data.suppliers);
  }
}

/**
 * Update supplier metrics in dashboard
 * @param {Array} suppliers - List of supplier metrics
 */
function updateSupplierMetrics(suppliers) {
  const suppliersList = document.getElementById('suppliers-list');
  if (!suppliersList) return;
  
  let html = '';
  
  suppliers.forEach(supplier => {
    html += `
      <div class="supplier-card">
        <div class="supplier-name">${supplier.name}</div>
        <div class="supplier-metrics">
          <div class="metric">
            <span class="metric-label">Products:</span>
            <span class="metric-value">${supplier.products}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Avg. Shipping:</span>
            <span class="metric-value">${supplier.avg_shipping_days} days</span>
          </div>
          <div class="metric">
            <span class="metric-label">Reliability:</span>
            <span class="metric-value">${supplier.reliability_score}%</span>
          </div>
        </div>
      </div>
    `;
  });
  
  suppliersList.innerHTML = html;
}

/**
 * Format currency value
 * @param {number} value - The value to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

/**
 * Helper functions for UI interactions
 */

function getSelectedCategories() {
  const categoryCheckboxes = document.querySelectorAll('.category-checkbox:checked');
  return Array.from(categoryCheckboxes).map(checkbox => checkbox.value);
}

function getSelectedOrders() {
  const orderCheckboxes = document.querySelectorAll('.order-checkbox:checked');
  return Array.from(orderCheckboxes).map(checkbox => checkbox.value);
}

function updateSelectedOrdersCount() {
  const selectedCount = document.querySelectorAll('.order-checkbox:checked').length;
  const totalCount = document.querySelectorAll('.order-checkbox').length;
  
  document.getElementById('selected-orders-count').textContent = `${selectedCount} of ${totalCount} orders selected`;
}

function showFulfillmentOptions(source) {
  // Hide all fulfillment option panels
  document.querySelectorAll('.fulfillment-options').forEach(panel => {
    panel.style.display = 'none';
  });
  
  // Show selected fulfillment option panel
  const optionsPanel = document.getElementById(`${source}-options`);
  if (optionsPanel) {
    optionsPanel.style.display = 'block';
  }
}

function showImportLoading(message) {
  const importStatus = document.getElementById('import-status');
  if (importStatus) {
    importStatus.innerHTML = `<div class="loading-message">${message}</div>`;
  }
}

function showImportSuccess(product) {
  const importStatus = document.getElementById('import-status');
  if (importStatus) {
    importStatus.innerHTML = `
      <div class="success-message">
        <h4>Product Imported Successfully</h4>
        <div class="imported-product">
          <img src="${product.image}" alt="${product.title}" class="product-thumbnail">
          <div class="product-details">
            <div class="product-title">${product.title}</div>
            <div class="product-price">${formatCurrency(product.price)}</div>
          </div>
        </div>
        <a href="/admin/products/${product.id}" class="btn btn-primary">View Product</a>
      </div>
    `;
  }
}

function showImportError(message) {
  const importStatus = document.getElementById('import-status');
  if (importStatus) {
    importStatus.innerHTML = `<div class="error-message">${message}</div>`;
  }
}

function showFulfillmentLoading(message) {
  const fulfillmentStatus = document.getElementById('fulfillment-status');
  if (fulfillmentStatus) {
    fulfillmentStatus.innerHTML = `<div class="loading-message">${message}</div>`;
  }
}

function showFulfillmentSuccess(orders) {
  const fulfillmentStatus = document.getElementById('fulfillment-status');
  if (fulfillmentStatus) {
    fulfillmentStatus.innerHTML = `
      <div class="success-message">
        <h4>Orders Fulfilled Successfully</h4>
        <div class="fulfilled-count">${orders.length} orders processed</div>
        <a href="/admin/orders?status=fulfilled" class="btn btn-primary">View Fulfilled Orders</a>
      </div>
    `;
  }
}

function showFulfillmentError(message) {
  const fulfillmentStatus = document.getElementById('fulfillment-status');
  if (fulfillmentStatus) {
    fulfillmentStatus.innerHTML = `<div class="error-message">${message}</div>`;
  }
}

/**
 * Bulk import products from selected source
 * @param {string} source - The source to import from
 */
async function bulkImportProducts(source) {
  const importCriteria = document.getElementById(`${source}-import-criteria`).value;
  const importCount = document.getElementById(`${source}-import-count`).value || 10;
  
  try {
    showImportLoading(`Importing products from ${source}...`);
    
    const response = await fetch(`/api/import/${source}/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        criteria: importCriteria,
        count: importCount,
        options: {
          categories: getSelectedCategories(),
          localStock: document.getElementById('local-stock-checkbox').checked,
          markup: document.getElementById('markup-percentage').value || 100
        }
      })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to import products from ${source}`);
    }
    
    const data = await response.json();
    
    document.getElementById('import-status').innerHTML = `
      <div class="success-message">
        <h4>Bulk Import Successful</h4>
        <div class="import-summary">
          <div class="imported-count">${data.imported_count} products imported</div>
          <div class="failed-count">${data.failed_count} products failed</div>
        </div>
        <a href="/admin/products?source=${source}" class="btn btn-primary">View Imported Products</a>
      </div>
    `;
  } catch (error) {
    showImportError(`Error importing products from ${source}. Please try again.`);
    console.error('Bulk import error:', error);
  }
}
