/**
 * Camping Journey Tracking Integrations
 * Handles AfterShip and Parcel Panel integrations for order tracking
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on the tracking page
  if (document.querySelector('.tracking-container')) {
    initTrackingSystem();
  }
});

/**
 * Initialize the tracking system based on configuration
 */
function initTrackingSystem() {
  // Check which tracking system is configured
  const trackingSystem = document.querySelector('.tracking-container').dataset.system || 'aftership';
  
  if (trackingSystem === 'aftership') {
    initAfterShip();
  } else if (trackingSystem === 'parcelpanel') {
    initParcelPanel();
  }
}

/**
 * AfterShip Integration
 */
function initAfterShip() {
  // This would be replaced with your actual AfterShip API key
  const aftershipApiKey = 'aftership_api_key_placeholder';
  
  const trackingForm = document.getElementById('tracking-form');
  const trackingResults = document.getElementById('tracking-results');
  
  if (trackingForm) {
    trackingForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const trackingNumber = document.getElementById('tracking-number').value;
      const courier = document.getElementById('courier').value || '';
      
      if (!trackingNumber) {
        showTrackingError('Please enter a tracking number');
        return;
      }
      
      // Show loading state
      trackingResults.innerHTML = '<div class="loading">Loading tracking information...</div>';
      
      try {
        // In a real implementation, this would be a server-side call to protect your API key
        // For demonstration purposes, we're showing the structure of the request
        const response = await fetch(`/api/tracking/aftership`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            tracking_number: trackingNumber,
            courier: courier
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch tracking information');
        }
        
        const data = await response.json();
        displayAfterShipTracking(data);
      } catch (error) {
        showTrackingError('Error fetching tracking information. Please try again later.');
        console.error('Tracking error:', error);
      }
    });
  }
}

/**
 * Display AfterShip tracking information
 * @param {Object} data - The tracking data from AfterShip
 */
function displayAfterShipTracking(data) {
  const trackingResults = document.getElementById('tracking-results');
  
  if (!data || !data.tracking) {
    showTrackingError('No tracking information found');
    return;
  }
  
  const tracking = data.tracking;
  
  // Create tracking info HTML
  let html = `
    <div class="tracking-info">
      <div class="tracking-header">
        <h3>Tracking Information</h3>
        <div class="tracking-status ${tracking.tag.toLowerCase()}">${tracking.tag.replace('_', ' ')}</div>
      </div>
      <div class="tracking-details">
        <div class="tracking-detail">
          <span class="detail-label">Tracking Number:</span>
          <span class="detail-value">${tracking.tracking_number}</span>
        </div>
        <div class="tracking-detail">
          <span class="detail-label">Courier:</span>
          <span class="detail-value">${tracking.slug}</span>
        </div>
        <div class="tracking-detail">
          <span class="detail-label">Last Updated:</span>
          <span class="detail-value">${new Date(tracking.updated_at).toLocaleString()}</span>
        </div>
        <div class="tracking-detail">
          <span class="detail-label">Expected Delivery:</span>
          <span class="detail-value">${tracking.expected_delivery ? new Date(tracking.expected_delivery).toLocaleDateString() : 'Not available'}</span>
        </div>
      </div>
  `;
  
  // Add checkpoints
  if (tracking.checkpoints && tracking.checkpoints.length > 0) {
    html += '<div class="tracking-timeline">';
    
    tracking.checkpoints.forEach((checkpoint, index) => {
      const isActive = index === 0;
      html += `
        <div class="timeline-item ${isActive ? 'active' : ''}">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-date">${new Date(checkpoint.checkpoint_time).toLocaleString()}</div>
            <div class="timeline-status">${checkpoint.message}</div>
            <div class="timeline-location">${checkpoint.location || ''}</div>
          </div>
        </div>
      `;
    });
    
    html += '</div>';
  } else {
    html += '<div class="no-checkpoints">No tracking updates available yet</div>';
  }
  
  html += '</div>';
  
  trackingResults.innerHTML = html;
}

/**
 * Parcel Panel Integration
 */
function initParcelPanel() {
  // This would be replaced with your actual Parcel Panel API key
  const parcelPanelApiKey = 'parcelpanel_api_key_placeholder';
  
  const trackingForm = document.getElementById('tracking-form');
  const trackingResults = document.getElementById('tracking-results');
  
  if (trackingForm) {
    trackingForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const trackingNumber = document.getElementById('tracking-number').value;
      const orderNumber = document.getElementById('order-number').value || '';
      
      if (!trackingNumber && !orderNumber) {
        showTrackingError('Please enter a tracking number or order number');
        return;
      }
      
      // Show loading state
      trackingResults.innerHTML = '<div class="loading">Loading tracking information...</div>';
      
      try {
        // In a real implementation, this would be a server-side call to protect your API key
        const response = await fetch(`/api/tracking/parcelpanel`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            tracking_number: trackingNumber,
            order_number: orderNumber
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch tracking information');
        }
        
        const data = await response.json();
        displayParcelPanelTracking(data);
      } catch (error) {
        showTrackingError('Error fetching tracking information. Please try again later.');
        console.error('Tracking error:', error);
      }
    });
  }
}

/**
 * Display Parcel Panel tracking information
 * @param {Object} data - The tracking data from Parcel Panel
 */
function displayParcelPanelTracking(data) {
  const trackingResults = document.getElementById('tracking-results');
  
  if (!data || !data.tracking_info) {
    showTrackingError('No tracking information found');
    return;
  }
  
  const tracking = data.tracking_info;
  
  // Create tracking info HTML
  let html = `
    <div class="tracking-info">
      <div class="tracking-header">
        <h3>Tracking Information</h3>
        <div class="tracking-status ${tracking.status.toLowerCase()}">${tracking.status}</div>
      </div>
      <div class="tracking-details">
        <div class="tracking-detail">
          <span class="detail-label">Tracking Number:</span>
          <span class="detail-value">${tracking.tracking_number}</span>
        </div>
        <div class="tracking-detail">
          <span class="detail-label">Carrier:</span>
          <span class="detail-value">${tracking.carrier}</span>
        </div>
        <div class="tracking-detail">
          <span class="detail-label">Order Number:</span>
          <span class="detail-value">${tracking.order_number || 'N/A'}</span>
        </div>
        <div class="tracking-detail">
          <span class="detail-label">Last Updated:</span>
          <span class="detail-value">${new Date(tracking.updated_at).toLocaleString()}</span>
        </div>
      </div>
  `;
  
  // Add tracking events
  if (tracking.events && tracking.events.length > 0) {
    html += '<div class="tracking-timeline">';
    
    tracking.events.forEach((event, index) => {
      const isActive = index === 0;
      html += `
        <div class="timeline-item ${isActive ? 'active' : ''}">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-date">${new Date(event.time).toLocaleString()}</div>
            <div class="timeline-status">${event.description}</div>
            <div class="timeline-location">${event.location || ''}</div>
          </div>
        </div>
      `;
    });
    
    html += '</div>';
  } else {
    html += '<div class="no-checkpoints">No tracking updates available yet</div>';
  }
  
  html += '</div>';
  
  trackingResults.innerHTML = html;
}

/**
 * Show tracking error message
 * @param {string} message - The error message to display
 */
function showTrackingError(message) {
  const trackingResults = document.getElementById('tracking-results');
  trackingResults.innerHTML = `<div class="tracking-error">${message}</div>`;
}

/**
 * Initialize tracking widget for product pages
 */
function initProductTrackingWidget() {
  const trackingWidgets = document.querySelectorAll('.product-tracking-widget');
  
  trackingWidgets.forEach(widget => {
    const orderNumber = widget.dataset.orderNumber;
    const trackingNumber = widget.dataset.trackingNumber;
    
    if (orderNumber || trackingNumber) {
      fetchTrackingStatus(widget, orderNumber, trackingNumber);
    }
  });
}

/**
 * Fetch tracking status for product tracking widgets
 * @param {HTMLElement} widget - The tracking widget element
 * @param {string} orderNumber - The order number
 * @param {string} trackingNumber - The tracking number
 */
async function fetchTrackingStatus(widget, orderNumber, trackingNumber) {
  try {
    const response = await fetch(`/api/tracking/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_number: orderNumber,
        tracking_number: trackingNumber
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch tracking status');
    }
    
    const data = await response.json();
    
    // Update widget with tracking status
    if (data.status) {
      widget.querySelector('.tracking-status').textContent = data.status;
      widget.querySelector('.tracking-status').className = `tracking-status ${data.status.toLowerCase()}`;
      
      if (data.estimated_delivery) {
        widget.querySelector('.estimated-delivery').textContent = `Estimated delivery: ${new Date(data.estimated_delivery).toLocaleDateString()}`;
      }
    }
  } catch (error) {
    console.error('Error fetching tracking status:', error);
    widget.querySelector('.tracking-status').textContent = 'Status unavailable';
  }
}

// Initialize product tracking widgets if they exist
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.product-tracking-widget')) {
    initProductTrackingWidget();
  }
});
