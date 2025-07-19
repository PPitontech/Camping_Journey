/**
 * Camping Journey Dashboard KPIs and WhatsApp Alerts
 * Handles KPI tracking, visualization, and automated WhatsApp alerts
 */

// Global variable to track initialized charts
let initializedCharts = new Set();

document.addEventListener('DOMContentLoaded', () => {
  // Initialize dashboard if on admin dashboard page
  if (document.querySelector('.admin-dashboard')) {
    initDashboard();
  }
  
  // Initialize alert settings if on alert settings page
  if (document.querySelector('.alert-settings')) {
    initAlertSettings();
  }
});

/**
 * Initialize the admin dashboard
 */
function initDashboard() {
  // Load KPI data
  loadKPIData();
  
  // Initialize charts only if not already initialized
  if (!initializedCharts.has('dashboard')) {
    initKPICharts();
    initializedCharts.add('dashboard');
  }
  
  // Set up refresh interval (every 5 minutes)
  setInterval(() => {
    loadKPIData();
  }, 5 * 60 * 1000);
  
  // Set up date range selector
  initDateRangeSelector();
  
  // Initialize alert history
  loadAlertHistory();
}

/**
 * Load KPI data from the server
 */
async function loadKPIData() {
  try {
    const dateRange = getSelectedDateRange();
    
    // Show loading state
    document.querySelectorAll('.kpi-card .kpi-value').forEach(element => {
      element.innerHTML = '<div class="loading-spinner"></div>';
    });
    
    // Fetch KPI data from server
    const response = await fetch('/api/dashboard/kpis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dateRange)
    });
    
    if (!response.ok) {
      throw new Error('Failed to load KPI data');
    }
    
    const data = await response.json();
    updateKPIDisplay(data);
    updateKPICharts(data);
    checkAlertThresholds(data);
  } catch (error) {
    console.error('Error loading KPI data:', error);
    document.querySelectorAll('.kpi-card .kpi-value').forEach(element => {
      element.textContent = 'Error loading data';
    });
  }
}

/**
 * Update KPI display with data
 * @param {Object} data - The KPI data
 */
function updateKPIDisplay(data) {
  // Update CPA (Cost Per Acquisition)
  const cpaElement = document.getElementById('cpa-value');
  if (cpaElement && data.cpa) {
    cpaElement.textContent = formatCurrency(data.cpa);
    updateTrendIndicator(cpaElement.parentNode, data.cpa_trend, true); // Lower is better for CPA
  }
  
  // Update ROAS (Return On Ad Spend)
  const roasElement = document.getElementById('roas-value');
  if (roasElement && data.roas) {
    roasElement.textContent = data.roas.toFixed(2) + 'x';
    updateTrendIndicator(roasElement.parentNode, data.roas_trend);
  }
  
  // Update Average Order Value
  const aovElement = document.getElementById('aov-value');
  if (aovElement && data.average_order_value) {
    aovElement.textContent = formatCurrency(data.average_order_value);
    updateTrendIndicator(aovElement.parentNode, data.aov_trend);
  }
  
  // Update Conversion Rate
  const conversionElement = document.getElementById('conversion-value');
  if (conversionElement && data.conversion_rate) {
    conversionElement.textContent = data.conversion_rate.toFixed(2) + '%';
    updateTrendIndicator(conversionElement.parentNode, data.conversion_rate_trend);
  }
  
  // Update Revenue
  const revenueElement = document.getElementById('revenue-value');
  if (revenueElement && data.revenue) {
    revenueElement.textContent = formatCurrency(data.revenue);
    updateTrendIndicator(revenueElement.parentNode, data.revenue_trend);
  }
  
  // Update Profit
  const profitElement = document.getElementById('profit-value');
  if (profitElement && data.profit) {
    profitElement.textContent = formatCurrency(data.profit);
    updateTrendIndicator(profitElement.parentNode, data.profit_trend);
  }
  
  // Update last updated timestamp
  const lastUpdatedElement = document.getElementById('last-updated');
  if (lastUpdatedElement) {
    lastUpdatedElement.textContent = new Date().toLocaleString();
  }
}

/**
 * Update trend indicator for KPI
 * @param {HTMLElement} container - The KPI container element
 * @param {number} trend - The trend percentage
 * @param {boolean} inversed - Whether lower is better (e.g., for CPA)
 */
function updateTrendIndicator(container, trend, inversed = false) {
  const trendElement = container.querySelector('.kpi-trend');
  if (!trendElement || trend === undefined) return;
  
  // Remove existing classes
  trendElement.classList.remove('trend-up', 'trend-down', 'trend-neutral');
  
  // Determine if trend is positive or negative
  let isPositive = trend > 0;
  if (inversed) isPositive = !isPositive;
  
  if (trend === 0) {
    trendElement.classList.add('trend-neutral');
    trendElement.innerHTML = '<span class="trend-icon">→</span> 0%';
  } else if (isPositive) {
    trendElement.classList.add('trend-up');
    trendElement.innerHTML = `<span class="trend-icon">↑</span> ${Math.abs(trend).toFixed(1)}%`;
  } else {
    trendElement.classList.add('trend-down');
    trendElement.innerHTML = `<span class="trend-icon">↓</span> ${Math.abs(trend).toFixed(1)}%`;
  }
}

/**
 * Initialize KPI charts
 */
function initKPICharts() {
  // Initialize charts if Chart.js is available
  if (window.Chart) {
    // Clean up any existing charts before creating new ones
    cleanupExistingCharts();
    
    // Revenue chart
    const revenueCtx = document.getElementById('revenue-chart');
    if (revenueCtx && !initializedCharts.has('revenue-chart')) {
      // Check if chart already exists and destroy it
      const existingChart = Chart.getChart(revenueCtx);
      if (existingChart) {
        existingChart.destroy();
      }
      
      new Chart(revenueCtx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Revenue',
            data: [],
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return formatCurrency(context.raw);
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return formatCurrency(value, true);
                }
              }
            }
          }
        }
      });
      initializedCharts.add('revenue-chart');
    }
    
    // ROAS chart
    const roasCtx = document.getElementById('roas-chart');
    if (roasCtx && !initializedCharts.has('roas-chart')) {
      // Check if chart already exists and destroy it
      const existingChart = Chart.getChart(roasCtx);
      if (existingChart) {
        existingChart.destroy();
      }
      
      new Chart(roasCtx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'ROAS',
            data: [],
            borderColor: '#2196F3',
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.raw.toFixed(2) + 'x';
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return value.toFixed(1) + 'x';
                }
              }
            }
          }
        }
      });
      initializedCharts.add('roas-chart');
    }
    
    // CPA chart
    const cpaCtx = document.getElementById('cpa-chart');
    if (cpaCtx && !initializedCharts.has('cpa-chart')) {
      // Check if chart already exists and destroy it
      const existingChart = Chart.getChart(cpaCtx);
      if (existingChart) {
        existingChart.destroy();
      }
      
      new Chart(cpaCtx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'CPA',
            data: [],
            borderColor: '#FF9800',
            backgroundColor: 'rgba(255, 152, 0, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return formatCurrency(context.raw);
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return formatCurrency(value, true);
                }
              }
            }
          }
        }
      });
      initializedCharts.add('cpa-chart');
    }
  }
}

/**
 * Clean up existing charts to prevent duplicates
 */
function cleanupExistingCharts() {
  const chartIds = ['revenue-chart', 'roas-chart', 'cpa-chart'];
  
  chartIds.forEach(chartId => {
    const canvas = document.getElementById(chartId);
    if (canvas) {
      const existingChart = Chart.getChart(canvas);
      if (existingChart) {
        existingChart.destroy();
      }
    }
  });
  
  // Clear the initialized charts set
  initializedCharts.clear();
}

/**
 * Update KPI charts with data
 * @param {Object} data - The KPI data
 */
function updateKPICharts(data) {
  if (!window.Chart) return;
  
  // Update revenue chart
  const revenueChart = Chart.getChart('revenue-chart');
  if (revenueChart && data.revenue_history) {
    revenueChart.data.labels = data.revenue_history.map(item => item.date);
    revenueChart.data.datasets[0].data = data.revenue_history.map(item => item.value);
    revenueChart.update();
  }
  
  // Update ROAS chart
  const roasChart = Chart.getChart('roas-chart');
  if (roasChart && data.roas_history) {
    roasChart.data.labels = data.roas_history.map(item => item.date);
    roasChart.data.datasets[0].data = data.roas_history.map(item => item.value);
    roasChart.update();
  }
  
  // Update CPA chart
  const cpaChart = Chart.getChart('cpa-chart');
  if (cpaChart && data.cpa_history) {
    cpaChart.data.labels = data.cpa_history.map(item => item.date);
    cpaChart.data.datasets[0].data = data.cpa_history.map(item => item.value);
    cpaChart.update();
  }
}

/**
 * Initialize date range selector
 */
function initDateRangeSelector() {
  const dateRangeSelect = document.getElementById('date-range-select');
  const customDateContainer = document.getElementById('custom-date-container');
  
  if (dateRangeSelect) {
    dateRangeSelect.addEventListener('change', () => {
      const value = dateRangeSelect.value;
      
      // Show/hide custom date inputs
      if (value === 'custom') {
        customDateContainer.style.display = 'flex';
      } else {
        customDateContainer.style.display = 'none';
        loadKPIData(); // Reload data with new date range
      }
    });
  }
  
  // Set up custom date range form
  const customDateForm = document.getElementById('custom-date-form');
  if (customDateForm) {
    customDateForm.addEventListener('submit', (event) => {
      event.preventDefault();
      loadKPIData(); // Reload data with custom date range
    });
  }
}

/**
 * Get selected date range
 * @returns {Object} Date range object
 */
function getSelectedDateRange() {
  const dateRangeSelect = document.getElementById('date-range-select');
  
  if (!dateRangeSelect) {
    return { range: '7d' }; // Default to 7 days
  }
  
  const value = dateRangeSelect.value;
  
  if (value === 'custom') {
    const startDate = document.getElementById('custom-start-date').value;
    const endDate = document.getElementById('custom-end-date').value;
    
    return {
      range: 'custom',
      start_date: startDate,
      end_date: endDate
    };
  }
  
  return { range: value };
}

/**
 * Format currency value
 * @param {number} value - The value to format
 * @param {boolean} abbreviated - Whether to abbreviate large numbers
 * @returns {string} Formatted currency string
 */
function formatCurrency(value, abbreviated = false) {
  if (abbreviated && value >= 1000) {
    if (value >= 1000000) {
      return '$' + (value / 1000000).toFixed(1) + 'M';
    }
    return '$' + (value / 1000).toFixed(1) + 'K';
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

/**
 * Initialize alert settings
 */
function initAlertSettings() {
  // Load current alert settings
  loadAlertSettings();
  
  // Set up form submission
  const alertSettingsForm = document.getElementById('alert-settings-form');
  if (alertSettingsForm) {
    alertSettingsForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      try {
        const formData = new FormData(alertSettingsForm);
        const settings = {
          whatsapp_number: formData.get('whatsapp_number'),
          enabled: formData.get('alerts_enabled') === 'on',
          thresholds: {
            cpa: {
              enabled: formData.get('cpa_alert_enabled') === 'on',
              threshold: parseFloat(formData.get('cpa_threshold')),
              direction: formData.get('cpa_direction')
            },
            roas: {
              enabled: formData.get('roas_alert_enabled') === 'on',
              threshold: parseFloat(formData.get('roas_threshold')),
              direction: formData.get('roas_direction')
            },
            revenue: {
              enabled: formData.get('revenue_alert_enabled') === 'on',
              threshold: parseFloat(formData.get('revenue_threshold')),
              direction: formData.get('revenue_direction')
            },
            conversion_rate: {
              enabled: formData.get('conversion_alert_enabled') === 'on',
              threshold: parseFloat(formData.get('conversion_threshold')),
              direction: formData.get('conversion_direction')
            }
          },
          frequency: formData.get('alert_frequency'),
          quiet_hours: {
            enabled: formData.get('quiet_hours_enabled') === 'on',
            start: formData.get('quiet_hours_start'),
            end: formData.get('quiet_hours_end')
          }
        };
        
        // Save settings to server
        const response = await fetch('/api/dashboard/alert-settings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(settings)
        });
        
        if (!response.ok) {
          throw new Error('Failed to save alert settings');
        }
        
        showSettingsSaved();
      } catch (error) {
        console.error('Error saving alert settings:', error);
        showSettingsError();
      }
    });
  }
  
  // Set up test alert button
  const testAlertButton = document.getElementById('test-alert-button');
  if (testAlertButton) {
    testAlertButton.addEventListener('click', async () => {
      try {
        testAlertButton.disabled = true;
        testAlertButton.textContent = 'Sending...';
        
        const response = await fetch('/api/dashboard/test-alert', {
          method: 'POST'
        });
        
        if (!response.ok) {
          throw new Error('Failed to send test alert');
        }
        
        testAlertButton.textContent = 'Test Alert Sent!';
        setTimeout(() => {
          testAlertButton.disabled = false;
          testAlertButton.textContent = 'Send Test Alert';
        }, 3000);
      } catch (error) {
        console.error('Error sending test alert:', error);
        testAlertButton.textContent = 'Error Sending Alert';
        setTimeout(() => {
          testAlertButton.disabled = false;
          testAlertButton.textContent = 'Send Test Alert';
        }, 3000);
      }
    });
  }
}

/**
 * Load alert settings from server
 */
async function loadAlertSettings() {
  try {
    const response = await fetch('/api/dashboard/alert-settings');
    
    if (!response.ok) {
      throw new Error('Failed to load alert settings');
    }
    
    const settings = await response.json();
    populateAlertSettings(settings);
  } catch (error) {
    console.error('Error loading alert settings:', error);
  }
}

/**
 * Populate alert settings form with data
 * @param {Object} settings - The alert settings
 */
function populateAlertSettings(settings) {
  // Populate WhatsApp number
  const whatsappInput = document.getElementById('whatsapp_number');
  if (whatsappInput) {
    whatsappInput.value = settings.whatsapp_number || '';
  }
  
  // Populate alerts enabled
  const alertsEnabledCheckbox = document.getElementById('alerts_enabled');
  if (alertsEnabledCheckbox) {
    alertsEnabledCheckbox.checked = settings.enabled;
  }
  
  // Populate CPA threshold settings
  if (settings.thresholds && settings.thresholds.cpa) {
    const cpaEnabled = document.getElementById('cpa_alert_enabled');
    const cpaThreshold = document.getElementById('cpa_threshold');
    const cpaDirection = document.getElementById('cpa_direction');
    
    if (cpaEnabled) cpaEnabled.checked = settings.thresholds.cpa.enabled;
    if (cpaThreshold) cpaThreshold.value = settings.thresholds.cpa.threshold;
    if (cpaDirection) cpaDirection.value = settings.thresholds.cpa.direction;
  }
  
  // Populate ROAS threshold settings
  if (settings.thresholds && settings.thresholds.roas) {
    const roasEnabled = document.getElementById('roas_alert_enabled');
    const roasThreshold = document.getElementById('roas_threshold');
    const roasDirection = document.getElementById('roas_direction');
    
    if (roasEnabled) roasEnabled.checked = settings.thresholds.roas.enabled;
    if (roasThreshold) roasThreshold.value = settings.thresholds.roas.threshold;
    if (roasDirection) roasDirection.value = settings.thresholds.roas.direction;
  }
  
  // Populate Revenue threshold settings
  if (settings.thresholds && settings.thresholds.revenue) {
    const revenueEnabled = document.getElementById('revenue_alert_enabled');
    const revenueThreshold = document.getElementById('revenue_threshold');
    const revenueDirection = document.getElementById('revenue_direction');
    
    if (revenueEnabled) revenueEnabled.checked = settings.thresholds.revenue.enabled;
    if (revenueThreshold) revenueThreshold.value = settings.thresholds.revenue.threshold;
    if (revenueDirection) revenueDirection.value = settings.thresholds.revenue.direction;
  }
  
  // Populate Conversion Rate threshold settings
  if (settings.thresholds && settings.thresholds.conversion_rate) {
    const conversionEnabled = document.getElementById('conversion_alert_enabled');
    const conversionThreshold = document.getElementById('conversion_threshold');
    const conversionDirection = document.getElementById('conversion_direction');
    
    if (conversionEnabled) conversionEnabled.checked = settings.thresholds.conversion_rate.enabled;
    if (conversionThreshold) conversionThreshold.value = settings.thresholds.conversion_rate.threshold;
    if (conversionDirection) conversionDirection.value = settings.thresholds.conversion_rate.direction;
  }
  
  // Populate frequency setting
  const frequencySelect = document.getElementById('alert_frequency');
  if (frequencySelect) {
    frequencySelect.value = settings.frequency || 'immediate';
  }
  
  // Populate quiet hours settings
  if (settings.quiet_hours) {
    const quietHoursEnabled = document.getElementById('quiet_hours_enabled');
    const quietHoursStart = document.getElementById('quiet_hours_start');
    const quietHoursEnd = document.getElementById('quiet_hours_end');
    
    if (quietHoursEnabled) quietHoursEnabled.checked = settings.quiet_hours.enabled;
    if (quietHoursStart) quietHoursStart.value = settings.quiet_hours.start;
    if (quietHoursEnd) quietHoursEnd.value = settings.quiet_hours.end;
  }
}

/**
 * Show settings saved message
 */
function showSettingsSaved() {
  const statusMessage = document.getElementById('settings-status');
  if (statusMessage) {
    statusMessage.textContent = 'Settings saved successfully!';
    statusMessage.className = 'status-message success';
    
    setTimeout(() => {
      statusMessage.textContent = '';
      statusMessage.className = 'status-message';
    }, 3000);
  }
}

/**
 * Show settings error message
 */
function showSettingsError() {
  const statusMessage = document.getElementById('settings-status');
  if (statusMessage) {
    statusMessage.textContent = 'Error saving settings. Please try again.';
    statusMessage.className = 'status-message error';
    
    setTimeout(() => {
      statusMessage.textContent = '';
      statusMessage.className = 'status-message';
    }, 3000);
  }
}

/**
 * Load alert history
 */
async function loadAlertHistory() {
  try {
    const response = await fetch('/api/dashboard/alert-history');
    
    if (!response.ok) {
      throw new Error('Failed to load alert history');
    }
    
    const history = await response.json();
    displayAlertHistory(history);
  } catch (error) {
    console.error('Error loading alert history:', error);
  }
}

/**
 * Display alert history
 * @param {Array} history - The alert history
 */
function displayAlertHistory(history) {
  const historyContainer = document.getElementById('alert-history');
  if (!historyContainer) return;
  
  if (!history || history.length === 0) {
    historyContainer.innerHTML = '<div class="no-alerts">No alerts have been sent yet</div>';
    return;
  }
  
  let html = '<div class="alert-history-list">';
  
  history.forEach(alert => {
    html += `
      <div class="alert-item">
        <div class="alert-time">${new Date(alert.timestamp).toLocaleString()}</div>
        <div class="alert-type">${alert.type}</div>
        <div class="alert-message">${alert.message}</div>
      </div>
    `;
  });
  
  html += '</div>';
  historyContainer.innerHTML = html;
}

/**
 * Check if any KPI has crossed alert thresholds
 * @param {Object} data - The KPI data
 */
async function checkAlertThresholds(data) {
  try {
    // In a real implementation, this would be handled server-side
    // For demonstration purposes, we're showing the structure
    const response = await fetch('/api/dashboard/check-alerts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Failed to check alert thresholds');
    }
    
    const result = await response.json();
    
    // If any alerts were triggered, update the alert history
    if (result.alerts_triggered) {
      loadAlertHistory();
    }
  } catch (error) {
    console.error('Error checking alert thresholds:', error);
  }
}