// Performance utilities for liquid glass effects
export const performanceUtils = {
  // Check if backdrop-filter is supported
  supportsBackdropFilter: (): boolean => {
    if (typeof window === 'undefined') return false
    
    return (
      'backdropFilter' in document.documentElement.style ||
      'webkitBackdropFilter' in document.documentElement.style
    )
  },

  // Check if device is low-end based on performance indicators
  isLowEndDevice: (): boolean => {
    if (typeof window === 'undefined') return false
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // Check for reduced transparency preference  
    const prefersReducedTransparency = window.matchMedia('(prefers-reduced-transparency: reduce)').matches
    
    // Check device memory (if available)
    const deviceMemory = (navigator as any).deviceMemory
    const isLowMemory = deviceMemory && deviceMemory < 4
    
    // Check connection speed
    const connection = (navigator as any).connection
    const isSlowConnection = connection && (
      connection.effectiveType === 'slow-2g' ||
      connection.effectiveType === '2g' ||
      connection.effectiveType === '3g'
    )
    
    // Check viewport size (mobile devices)
    const isMobile = window.innerWidth < 768
    
    return prefersReducedMotion || prefersReducedTransparency || isLowMemory || isSlowConnection || isMobile
  },

  // Get optimized backdrop filter based on device capabilities
  getOptimizedBackdropFilter: (intensity: 'light' | 'medium' | 'heavy' = 'medium'): string => {
    if (!performanceUtils.supportsBackdropFilter()) {
      return 'none'
    }
    
    const isLowEnd = performanceUtils.isLowEndDevice()
    
    const intensityMap = {
      light: isLowEnd ? 'blur(4px)' : 'blur(8px) saturate(150%) brightness(105%)',
      medium: isLowEnd ? 'blur(6px)' : 'blur(12px) saturate(180%) brightness(110%)',
      heavy: isLowEnd ? 'blur(8px)' : 'blur(20px) saturate(200%) brightness(115%)'
    }
    
    return intensityMap[intensity]
  },

  // Optimize element for liquid glass effects
  optimizeElement: (element: HTMLElement, intensity: 'light' | 'medium' | 'heavy' = 'medium'): void => {
    if (!element) return
    
    // Add performance optimization classes
    element.classList.add('liquid-glass-optimized')
    
    // Apply optimized backdrop filter
    const backdropFilter = performanceUtils.getOptimizedBackdropFilter(intensity)
    element.style.backdropFilter = backdropFilter;
    (element.style as any).webkitBackdropFilter = backdropFilter;
    
    // Force hardware acceleration
    element.style.transform = 'translateZ(0)'
    element.style.willChange = 'transform, backdrop-filter, background, box-shadow'
    
    // Add containment for better performance
    element.style.contain = 'layout style paint'
    element.style.isolation = 'isolate'
  },

  // Throttle function for performance-sensitive operations
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout | null = null
    let lastExecTime = 0
    
    return (...args: Parameters<T>) => {
      const currentTime = Date.now()
      
      if (currentTime - lastExecTime > delay) {
        func(...args)
        lastExecTime = currentTime
      } else {
        if (timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          func(...args)
          lastExecTime = Date.now()
        }, delay - (currentTime - lastExecTime))
      }
    }
  },

  // Debounce function for performance-sensitive operations
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout | null = null
    
    return (...args: Parameters<T>) => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  },

  // Optimize backdrop-filter for scroll events
  optimizeScrollEffects: (element: HTMLElement): (() => void) => {
    if (!element) return () => {}
    
    const throttledScroll = performanceUtils.throttle((scrollY: number) => {
      if (performanceUtils.isLowEndDevice()) {
        // Simplified effect for low-end devices
        element.style.backdropFilter = `blur(${Math.min(5 + scrollY * 0.01, 10)}px)`
      } else {
        // Full effect for capable devices
        const blur = Math.min(5 + scrollY * 0.02, 20)
        const saturation = Math.min(100 + scrollY * 0.1, 200)
        const brightness = Math.min(100 + scrollY * 0.02, 115)
        
        element.style.backdropFilter = `blur(${blur}px) saturate(${saturation}%) brightness(${brightness}%)`
      }
    }, 16) // ~60fps
    
    const handleScroll = () => {
      throttledScroll(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  },

  // Intersection Observer for performance optimization
  createIntersectionObserver: (
    callback: (entries: IntersectionObserverEntry[]) => void,
    options: IntersectionObserverInit = {}
  ): IntersectionObserver | null => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return null
    }
    
    const defaultOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    }
    
    return new IntersectionObserver(callback, defaultOptions)
  },

  // Optimize animation performance
  optimizeAnimation: (element: HTMLElement): void => {
    if (!element) return
    
    // Add animation optimization classes
    element.classList.add('liquid-glass-animating')
    
    // Optimize for animations
    element.style.backfaceVisibility = 'hidden'
    element.style.perspective = '1000px'
    element.style.transformStyle = 'preserve-3d'
    
    // Use GPU acceleration
    element.style.transform = 'translateZ(0)'
    element.style.willChange = 'transform, opacity, backdrop-filter'
  },

  // Clean up performance optimizations
  cleanup: (element: HTMLElement): void => {
    if (!element) return
    
    // Remove performance classes
    element.classList.remove('liquid-glass-optimized', 'liquid-glass-animating')
    
    // Reset styles
    element.style.willChange = 'auto'
    element.style.contain = 'none'
    element.style.isolation = 'auto'
    element.style.backfaceVisibility = 'visible'
    element.style.perspective = 'none'
    element.style.transformStyle = 'flat'
  },

  // Get device capabilities
  getDeviceCapabilities: () => {
    if (typeof window === 'undefined') {
      return {
        supportsBackdropFilter: false,
        isLowEndDevice: true,
        hasHardwareAcceleration: false,
        prefersReducedMotion: false,
        prefersReducedTransparency: false
      }
    }
    
    return {
      supportsBackdropFilter: performanceUtils.supportsBackdropFilter(),
      isLowEndDevice: performanceUtils.isLowEndDevice(),
      hasHardwareAcceleration: 'transform3d' in document.documentElement.style,
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      prefersReducedTransparency: window.matchMedia('(prefers-reduced-transparency: reduce)').matches
    }
  }
}

// React hook for performance optimization
export const usePerformanceOptimization = () => {
  const capabilities = performanceUtils.getDeviceCapabilities()
  
  const optimizeElement = (element: HTMLElement, intensity: 'light' | 'medium' | 'heavy' = 'medium') => {
    performanceUtils.optimizeElement(element, intensity)
  }
  
  const optimizeForScroll = (element: HTMLElement) => {
    return performanceUtils.optimizeScrollEffects(element)
  }
  
  const optimizeForAnimation = (element: HTMLElement) => {
    performanceUtils.optimizeAnimation(element)
  }
  
  const cleanup = (element: HTMLElement) => {
    performanceUtils.cleanup(element)
  }
  
  return {
    capabilities,
    optimizeElement,
    optimizeForScroll,
    optimizeForAnimation,
    cleanup
  }
}

export default performanceUtils