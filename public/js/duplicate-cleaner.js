/**
 * Duplicate Cleaner - Camping Journey Equipaments MX
 * Removes duplicate elements and fixes layout issues
 */

document.addEventListener('DOMContentLoaded', function() {
    // Clean up duplicate elements
    cleanupDuplicates();
    
    // Set up mutation observer to catch dynamically created duplicates
    setupMutationObserver();
    
    // Clean up every 5 seconds as a safety measure
    setInterval(cleanupDuplicates, 5000);
});

/**
 * Clean up duplicate elements
 */
function cleanupDuplicates() {
    try {
        // Remove duplicate headers
        const headers = document.querySelectorAll('.site-header');
        if (headers.length > 1) {
            for (let i = 1; i < headers.length; i++) {
                headers[i].remove();
            }
        }
        
        // Remove duplicate cart icons
        const cartIcons = document.querySelectorAll('.cart-icon');
        if (cartIcons.length > 1) {
            for (let i = 1; i < cartIcons.length; i++) {
                cartIcons[i].remove();
            }
        }
        
        // Remove duplicate navigation menus
        const navMenus = document.querySelectorAll('.main-nav');
        if (navMenus.length > 1) {
            for (let i = 1; i < navMenus.length; i++) {
                navMenus[i].remove();
            }
        }
        
        // Remove duplicate theme toggles
        const themeToggles = document.querySelectorAll('.theme-toggle');
        if (themeToggles.length > 1) {
            for (let i = 1; i < themeToggles.length; i++) {
                themeToggles[i].remove();
            }
        }
        
        // Clean up duplicate chart canvases
        cleanupDuplicateCharts();
        
        // Remove any floating elements that shouldn't be there
        const floatingElements = document.querySelectorAll('[class*="floating-"], [class*="duplicate-"]');
        floatingElements.forEach(element => {
            element.remove();
        });
        
        // Remove any elements with position fixed that might be duplicates
        const fixedElements = document.querySelectorAll('[style*="position: fixed"]');
        fixedElements.forEach(element => {
            // Check if it's a legitimate fixed element (like notifications)
            if (!element.classList.contains('notification') && 
                !element.classList.contains('modal') && 
                !element.classList.contains('cart-notification') &&
                !element.classList.contains('vic-modal') &&
                !element.classList.contains('cinematic-loader') &&
                !element.classList.contains('theme-transition-overlay')) {
                
                // Check if it's a duplicate by looking for similar elements
                const className = element.className;
                const similars = document.querySelectorAll(`.${className.split(' ')[0]}`);
                if (similars.length > 1) {
                    element.remove();
                }
            }
        });
        
        // Clean up any orphaned tooltips
        const tooltips = document.querySelectorAll('.tooltip');
        tooltips.forEach(tooltip => {
            const parent = tooltip.parentElement;
            if (!parent || !parent.classList.contains('tooltip-trigger')) {
                tooltip.remove();
            }
        });
        
        // Ensure cart counts are properly linked
        const cartCounts = document.querySelectorAll('.cart-count');
        cartCounts.forEach((count, index) => {
            if (index > 0) {
                // Remove extra cart counts
                count.remove();
            }
        });
        
        // Clean up any duplicate mobile menu buttons
        const mobileMenuButtons = document.querySelectorAll('.mobile-menu-button, #mobile-menu-toggle');
        if (mobileMenuButtons.length > 1) {
            for (let i = 1; i < mobileMenuButtons.length; i++) {
                mobileMenuButtons[i].remove();
            }
        }
        
        console.log('Duplicate cleanup completed');
        
    } catch (error) {
        console.error('Error during duplicate cleanup:', error);
    }
}

/**
 * Clean up duplicate chart canvases and prevent multiple chart initializations
 */
function cleanupDuplicateCharts() {
    try {
        // Chart IDs to check for duplicates
        const chartIds = [
            'revenue-chart',
            'roas-chart', 
            'cpa-chart',
            'conversion-chart',
            'traffic-chart',
            'performance-chart'
        ];
        
        chartIds.forEach(chartId => {
            const charts = document.querySelectorAll(`#${chartId}, [id="${chartId}"]`);
            if (charts.length > 1) {
                console.log(`Found ${charts.length} duplicate charts with ID: ${chartId}`);
                
                // Destroy existing Chart.js instances before removing duplicates
                if (window.Chart) {
                    charts.forEach((chart, index) => {
                        if (index > 0) { // Keep only the first one
                            const chartInstance = Chart.getChart(chart);
                            if (chartInstance) {
                                chartInstance.destroy();
                            }
                            chart.remove();
                        }
                    });
                }
            }
        });
        
        // Remove any canvas elements that don't have proper IDs but might be duplicates
        const canvases = document.querySelectorAll('canvas');
        const canvasGroups = {};
        
        canvases.forEach(canvas => {
            const rect = canvas.getBoundingClientRect();
            const key = `${rect.width}x${rect.height}`;
            
            if (!canvasGroups[key]) {
                canvasGroups[key] = [];
            }
            canvasGroups[key].push(canvas);
        });
        
        // Remove duplicate canvases with same dimensions
        Object.values(canvasGroups).forEach(group => {
            if (group.length > 1) {
                // Keep only the first canvas, remove the rest
                for (let i = 1; i < group.length; i++) {
                    const canvas = group[i];
                    const chartInstance = window.Chart ? Chart.getChart(canvas) : null;
                    if (chartInstance) {
                        chartInstance.destroy();
                    }
                    canvas.remove();
                }
            }
        });
        
        // Clean up any chart containers that might be duplicated
        const chartContainers = document.querySelectorAll('.chart-container, .kpi-chart, .dashboard-chart');
        const containerGroups = {};
        
        chartContainers.forEach(container => {
            const classList = Array.from(container.classList).sort().join(' ');
            if (!containerGroups[classList]) {
                containerGroups[classList] = [];
            }
            containerGroups[classList].push(container);
        });
        
        Object.values(containerGroups).forEach(group => {
            if (group.length > 1) {
                // Remove duplicate containers (keep the first one)
                for (let i = 1; i < group.length; i++) {
                    const container = group[i];
                    const canvas = container.querySelector('canvas');
                    if (canvas && window.Chart) {
                        const chartInstance = Chart.getChart(canvas);
                        if (chartInstance) {
                            chartInstance.destroy();
                        }
                    }
                    container.remove();
                }
            }
        });
        
        console.log('Chart duplicate cleanup completed');
        
    } catch (error) {
        console.error('Error during chart cleanup:', error);
    }
}

/**
 * Set up mutation observer to catch dynamically created duplicates
 */
function setupMutationObserver() {
    const observer = new MutationObserver(function(mutations) {
        let needsCleanup = false;
        
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        // Check if added node is a potential duplicate
                        if (node.classList.contains('site-header') ||
                            node.classList.contains('cart-icon') ||
                            node.classList.contains('main-nav') ||
                            node.classList.contains('theme-toggle') ||
                            node.tagName === 'CANVAS' ||
                            node.classList.contains('chart-container') ||
                            node.classList.contains('kpi-chart') ||
                            node.classList.contains('dashboard-chart')) {
                            needsCleanup = true;
                        }
                    }
                });
            }
        });
        
        if (needsCleanup) {
            setTimeout(cleanupDuplicates, 100);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

/**
 * Fix layout issues caused by duplicates
 */
function fixLayoutIssues() {
    // Ensure header has proper structure
    const header = document.querySelector('.site-header');
    if (header) {
        header.style.position = 'relative';
        header.style.zIndex = '10';
        
        // Ensure header container is properly structured
        const headerContainer = header.querySelector('.header-container');
        if (headerContainer) {
            headerContainer.style.position = 'relative';
            headerContainer.style.overflow = 'hidden';
        }
    }
    
    // Fix any z-index issues
    const headerControls = document.querySelector('.header-controls');
    if (headerControls) {
        headerControls.style.position = 'relative';
        headerControls.style.zIndex = '15';
    }
    
    const headerLogo = document.querySelector('.header-logo');
    if (headerLogo) {
        headerLogo.style.position = 'relative';
        headerLogo.style.zIndex = '20';
    }
    
    // Fix chart container positioning
    const chartContainers = document.querySelectorAll('.chart-container, .kpi-chart, .dashboard-chart');
    chartContainers.forEach(container => {
        container.style.position = 'relative';
        container.style.overflow = 'hidden';
    });
}

// Run layout fixes after cleanup
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(fixLayoutIssues, 1000);
});

// Export for debugging
window.cleanupDuplicates = cleanupDuplicates;
window.cleanupDuplicateCharts = cleanupDuplicateCharts;
window.fixLayoutIssues = fixLayoutIssues; 