/**
 * Article Script - Camping Journey Equipaments MX
 * Handles article-specific functionality and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize article functionality
    initArticle();
});

/**
 * Initialize all article functionality
 */
function initArticle() {
    // Set up reading progress tracking
    setupReadingProgress();
    
    // Initialize sharing functionality
    setupSharingButtons();
    
    // Track article view for analytics
    trackArticleView();
    
    // Set up scroll animations
    setupScrollAnimations();
    
    // Initialize product links tracking
    setupProductLinkTracking();
    
    // Set up estimated reading time
    calculateReadingTime();
}

/**
 * Set up reading progress tracking
 */
function setupReadingProgress() {
    // Create reading progress bar if it doesn't exist
    if (!document.querySelector('.reading-progress')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
        document.body.appendChild(progressBar);
    }
    
    // Get article content for tracking
    const articleContent = document.querySelector('.article-body');
    if (!articleContent) return;
    
    // Calculate article dimensions
    const articleStart = articleContent.offsetTop;
    const articleHeight = articleContent.offsetHeight;
    
    // Update progress bar on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Calculate how far we've scrolled into the article
        let readingProgress = 0;
        
        if (scrollPosition > articleStart) {
            const scrollInArticle = scrollPosition - articleStart;
            readingProgress = Math.min(scrollInArticle / (articleHeight - windowHeight * 0.5), 1);
        }
        
        // Update progress bar width
        document.querySelector('.reading-progress-bar').style.width = `${readingProgress * 100}%`;
        
        // Track reading milestones
        trackReadingMilestone(readingProgress);
    });
}

/**
 * Track reading milestones for analytics
 * @param {number} progress - Reading progress from 0 to 1
 */
let trackedMilestones = {
    quarter: false,
    half: false,
    threeQuarters: false,
    complete: false
};

function trackReadingMilestone(progress) {
    if (progress >= 0.25 && !trackedMilestones.quarter) {
        trackedMilestones.quarter = true;
        trackEvent('article_milestone', '25_percent');
    }
    
    if (progress >= 0.5 && !trackedMilestones.half) {
        trackedMilestones.half = true;
        trackEvent('article_milestone', '50_percent');
    }
    
    if (progress >= 0.75 && !trackedMilestones.threeQuarters) {
        trackedMilestones.threeQuarters = true;
        trackEvent('article_milestone', '75_percent');
    }
    
    if (progress >= 0.95 && !trackedMilestones.complete) {
        trackedMilestones.complete = true;
        trackEvent('article_milestone', '100_percent');
        
        // Show related articles with animation when article is completed
        highlightRelatedArticles();
    }
}

/**
 * Highlight related articles when user completes reading
 */
function highlightRelatedArticles() {
    const relatedSection = document.querySelector('.related-articles');
    if (!relatedSection) return;
    
    // Add a class to highlight the section
    relatedSection.classList.add('highlight-section');
    
    // Scroll to related articles section with smooth animation
    relatedSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

/**
 * Set up sharing functionality
 */
function setupSharingButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    if (!shareButtons.length) return;
    
    // Get article metadata
    const articleTitle = document.querySelector('.article-title').textContent;
    const articleUrl = window.location.href;
    
    // Set up each share button
    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const platform = button.classList[1]; // Get platform from class
            let shareUrl = '';
            
            switch (platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;
                    break;
                    
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${encodeURIComponent(articleUrl)}`;
                    break;
                    
                case 'pinterest':
                    const articleImage = document.querySelector('.article-hero-image img').src;
                    shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(articleUrl)}&media=${encodeURIComponent(articleImage)}&description=${encodeURIComponent(articleTitle)}`;
                    break;
                    
                case 'email':
                    shareUrl = `mailto:?subject=${encodeURIComponent(articleTitle)}&body=${encodeURIComponent(`Check out this article: ${articleUrl}`)}`;
                    break;
            }
            
            // Track sharing event
            trackEvent('article_share', platform);
            
            // Open share dialog
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

/**
 * Track article view for analytics
 */
function trackArticleView() {
    // Get article metadata
    const articleTitle = document.querySelector('.article-title').textContent;
    const articleCategory = document.querySelector('.article-category').textContent;
    const articleAuthor = document.querySelector('.author-name').nextSibling.textContent.trim();
    
    // Track view event
    trackEvent('article_view', {
        title: articleTitle,
        category: articleCategory,
        author: articleAuthor,
        url: window.location.href,
        language: document.documentElement.lang || 'en'
    });
    
    // Track A/B test variant if applicable
    if (window.abTesting && window.abTesting.getTestResults) {
        const testResults = window.abTesting.getTestResults();
        trackEvent('ab_test_view', testResults.tests);
    }
}

/**
 * Set up scroll animations for article content
 */
function setupScrollAnimations() {
    // Get all elements to animate
    const animateElements = [
        ...document.querySelectorAll('.article-body h2'),
        ...document.querySelectorAll('.article-body figure'),
        ...document.querySelectorAll('.quote-block'),
        ...document.querySelectorAll('.gear-highlight')
    ];
    
    // Set initial state
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe each element
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Set up product link tracking
 */
function setupProductLinkTracking() {
    const productLinks = document.querySelectorAll('.product-link');
    
    productLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const productName = link.textContent;
            const productUrl = link.getAttribute('href');
            
            // Track product click
            trackEvent('article_product_click', {
                product_name: productName,
                product_url: productUrl,
                article_title: document.querySelector('.article-title').textContent
            });
        });
    });
}

/**
 * Calculate and display estimated reading time
 */
function calculateReadingTime() {
    const articleBody = document.querySelector('.article-body');
    if (!articleBody) return;
    
    // Get all text content
    const text = articleBody.textContent;
    
    // Calculate reading time (average reading speed: 200 words per minute)
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    
    // Update reading time in the DOM
    const readingTimeElement = document.querySelector('.article-read-time span:first-child');
    if (readingTimeElement) {
        readingTimeElement.textContent = readingTime;
    }
}

/**
 * Track event for analytics
 * @param {string} eventName - Name of the event
 * @param {*} eventData - Data associated with the event
 */
function trackEvent(eventName, eventData) {
    // Log event to console (in production, this would send to analytics service)
    console.log('Event tracked:', eventName, eventData);
    
    // If abTesting is available, use it to track conversion
    if (window.abTesting && window.abTesting.trackConversion) {
        window.abTesting.trackConversion(eventName, JSON.stringify(eventData));
    }
    
    // Example of sending to a server endpoint
    /*
    fetch('/api/analytics/event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            event: eventName,
            data: eventData,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            language: document.documentElement.lang || 'en'
        })
    }).catch(error => {
        console.error('Error sending event data:', error);
    });
    */
}

/**
 * Add CSS for reading progress bar
 */
const style = document.createElement('style');
style.textContent = `
    .reading-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        z-index: 9999;
        background-color: rgba(255, 255, 255, 0.1);
    }
    
    .reading-progress-bar {
        height: 100%;
        background-color: var(--accent-color, #2d6a4f);
        width: 0;
        transition: width 0.1s ease;
    }
    
    .highlight-section {
        animation: pulse 1.5s ease;
    }
    
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.7; }
        100% { opacity: 1; }
    }
`;
document.head.appendChild(style);
