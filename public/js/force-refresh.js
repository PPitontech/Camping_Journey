/**
 * ===================================
 * FORCE REFRESH - CAMPING JOURNEY
 * Aggressive Cache Busting System
 * ===================================
 */

(function() {
    'use strict';
    
    const FORCE_VERSION = Date.now();
    console.log('🔥🔥🔥 FORCE REFRESH ACTIVE - VERSION:', FORCE_VERSION);
    
    // Force refresh all scripts and stylesheets
    function forceRefreshResources() {
        console.log('💥 FORCE REFRESHING ALL RESOURCES');
        
        // Refresh all stylesheets
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        stylesheets.forEach(link => {
            const href = link.href;
            const separator = href.includes('?') ? '&' : '?';
            link.href = href + separator + 'force=' + FORCE_VERSION;
            console.log('🎨 Refreshed CSS:', link.href);
        });
        
        // Refresh all scripts (except this one)
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            if (script.src.includes('force-refresh.js')) return;
            
            const src = script.src;
            const separator = src.includes('?') ? '&' : '?';
            const newScript = document.createElement('script');
            newScript.src = src + separator + 'force=' + FORCE_VERSION;
            newScript.onload = () => {
                console.log('🔄 Refreshed JS:', newScript.src);
            };
            
            // Replace old script
            script.parentNode.insertBefore(newScript, script);
            script.parentNode.removeChild(script);
        });
    }
    
    // Force clear all caches
    function clearAllCaches() {
        console.log('🧹 CLEARING ALL CACHES');
        
        // Clear localStorage
        try {
            localStorage.clear();
            console.log('✅ localStorage cleared');
        } catch(e) {
            console.log('⚠️ Could not clear localStorage');
        }
        
        // Clear sessionStorage
        try {
            sessionStorage.clear();
            console.log('✅ sessionStorage cleared');
        } catch(e) {
            console.log('⚠️ Could not clear sessionStorage');
        }
        
        // Force service worker update
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(registrations => {
                registrations.forEach(registration => {
                    registration.update();
                    console.log('🔄 Service worker updated');
                });
            });
        }
    }
    
    // Force reload specific resources
    function forceReloadCriticalResources() {
        console.log('🎯 FORCE RELOADING CRITICAL RESOURCES');
        
        const criticalResources = [
            'js/cinematic-loader.js',
            'js/brand-identity.js',
            'css/cinematic-loader.css'
        ];
        
        criticalResources.forEach(resource => {
            // Preload with cache busting
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = resource.endsWith('.js') ? 'script' : 'style';
            link.href = resource + '?force=' + FORCE_VERSION + '&critical=true';
            document.head.appendChild(link);
            console.log('⚡ Preloaded:', link.href);
        });
    }
    
    // Add cache busting to all future requests
    function interceptRequests() {
        console.log('🕷️ INTERCEPTING ALL REQUESTS');
        
        // Override fetch
        const originalFetch = window.fetch;
        window.fetch = function(url, options) {
            if (typeof url === 'string') {
                const separator = url.includes('?') ? '&' : '?';
                url = url + separator + 'bust=' + Date.now();
            }
            return originalFetch(url, options);
        };
        
        // Override XMLHttpRequest
        const originalOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(method, url, ...args) {
            if (typeof url === 'string') {
                const separator = url.includes('?') ? '&' : '?';
                url = url + separator + 'bust=' + Date.now();
            }
            return originalOpen.call(this, method, url, ...args);
        };
    }
    
    // Force page refresh if resources are too old
    function checkResourceAge() {
        const lastRefresh = localStorage.getItem('lastForceRefresh');
        const now = Date.now();
        const maxAge = 5 * 60 * 1000; // 5 minutes
        
        if (!lastRefresh || (now - parseInt(lastRefresh)) > maxAge) {
            console.log('⏰ RESOURCES TOO OLD - FORCING HARD REFRESH');
            localStorage.setItem('lastForceRefresh', now.toString());
            
            // Hard refresh
            setTimeout(() => {
                window.location.reload(true);
            }, 1000);
            return true;
        }
        return false;
    }
    
    // Initialize force refresh system
    function init() {
        console.log('🚀 INITIALIZING FORCE REFRESH SYSTEM');
        
        // Don't refresh if we just did
        if (checkResourceAge()) {
            return;
        }
        
        clearAllCaches();
        interceptRequests();
        forceReloadCriticalResources();
        
        // Delay resource refresh to avoid conflicts
        setTimeout(forceRefreshResources, 500);
        
        // Set flag that force refresh is active
        window.FORCE_REFRESH_ACTIVE = true;
        window.FORCE_VERSION = FORCE_VERSION;
        
        console.log('✅ FORCE REFRESH SYSTEM ACTIVE');
    }
    
    // Initialize immediately
    init();
    
    // Also initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    }
    
    // Export for manual triggering
    window.forceRefreshAll = function() {
        console.log('🔄 MANUAL FORCE REFRESH TRIGGERED');
        clearAllCaches();
        forceRefreshResources();
        setTimeout(() => window.location.reload(true), 1000);
    };
    
})(); 