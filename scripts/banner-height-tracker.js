/**
 * Banner Height Tracker - SSR-Safe Banner Positioning
 * Dynamically measures and updates CSS custom properties for banner height
 * to ensure proper content positioning
 */

(function() {
  'use strict';
  
  let rafId = null;
  let lastBannerHeight = 0;
  
  /**
   * Update the CSS custom property for banner height
   * @param {number} height - The banner height in pixels
   */
  function updateBannerHeight(height) {
    if (height !== lastBannerHeight) {
      document.documentElement.style.setProperty('--banner-height', `${height}px`);
      lastBannerHeight = height;
      
      // Debug logging (remove in production)
      if (process.env.NODE_ENV === 'development') {
        console.log(`Banner height updated: ${height}px`);
      }
    }
  }
  
  /**
   * Measure the current banner height
   * @returns {number} The banner height in pixels
   */
  function measureBannerHeight() {
    // Try different selectors for Nextra banner
    const bannerSelectors = [
      '.nx-banner',
      '[data-nextra-banner]',
      '.nextra-banner',
      '.banner'
    ];
    
    let bannerElement = null;
    
    for (const selector of bannerSelectors) {
      bannerElement = document.querySelector(selector);
      if (bannerElement) break;
    }
    
    if (!bannerElement) {
      return 0;
    }
    
    // Check if banner is visible
    const style = window.getComputedStyle(bannerElement);
    if (style.display === 'none' || style.visibility === 'hidden') {
      return 0;
    }
    
    // Get the actual height including padding and borders
    const rect = bannerElement.getBoundingClientRect();
    return Math.round(rect.height);
  }
  
  /**
   * Update banner height with animation frame optimization
   */
  function updateBannerHeightOptimized() {
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
    
    rafId = requestAnimationFrame(() => {
      const height = measureBannerHeight();
      updateBannerHeight(height);
      rafId = null;
    });
  }
  
  /**
   * Initialize banner height tracking
   */
  function initBannerHeightTracker() {
    // Initial measurement
    updateBannerHeightOptimized();
    
    // Create a ResizeObserver to watch for banner size changes
    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.target.matches('.nx-banner, [data-nextra-banner], .nextra-banner')) {
            updateBannerHeightOptimized();
            break;
          }
        }
      });
      
      // Observe the banner when it appears
      const observeBanner = () => {
        const bannerSelectors = [
          '.nx-banner',
          '[data-nextra-banner]',
          '.nextra-banner',
          '.banner'
        ];
        
        for (const selector of bannerSelectors) {
          const banner = document.querySelector(selector);
          if (banner) {
            resizeObserver.observe(banner);
          }
        }
      };
      
      // Initial observation
      observeBanner();
      
      // Watch for dynamic banner insertion
      const mutationObserver = new MutationObserver((mutations) => {
        let shouldReobserve = false;
        
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            for (const node of mutation.addedNodes) {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node;
                if (element.matches && element.matches('.nx-banner, [data-nextra-banner], .nextra-banner')) {
                  shouldReobserve = true;
                  break;
                }
                // Check children too
                if (element.querySelector && element.querySelector('.nx-banner, [data-nextra-banner], .nextra-banner')) {
                  shouldReobserve = true;
                  break;
                }
              }
            }
          }
        }
        
        if (shouldReobserve) {
          observeBanner();
          updateBannerHeightOptimized();
        }
      });
      
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
    
    // Fallback for browsers without ResizeObserver
    else {
      // Window resize handler
      let resizeTimeout = null;
      window.addEventListener('resize', () => {
        if (resizeTimeout) {
          clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(updateBannerHeightOptimized, 100);
      });
      
      // Periodic check for banner changes (fallback)
      setInterval(updateBannerHeightOptimized, 1000);
    }
    
    // Handle orientation changes on mobile
    window.addEventListener('orientationchange', () => {
      setTimeout(updateBannerHeightOptimized, 100);
    });
    
    // Handle theme changes that might affect banner
    const themeObserver = new MutationObserver(() => {
      setTimeout(updateBannerHeightOptimized, 50);
    });
    
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme']
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBannerHeightTracker);
  } else {
    initBannerHeightTracker();
  }
  
  // Re-initialize on page navigation (for SPAs)
  window.addEventListener('popstate', () => {
    setTimeout(initBannerHeightTracker, 100);
  });
  
  // Export for manual usage if needed
  if (typeof window !== 'undefined') {
    window.bannerHeightTracker = {
      update: updateBannerHeightOptimized,
      measure: measureBannerHeight,
      init: initBannerHeightTracker
    };
  }
})();
