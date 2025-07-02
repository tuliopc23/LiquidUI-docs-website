import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'next-themes'
import { LazyOptimizedMotion } from '../../components/PerformanceOptimizer'

// Mock providers for testing
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LazyOptimizedMotion>
        {children}
      </LazyOptimizedMotion>
    </ThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Custom matchers for accessibility testing
export const toBeAccessible = (element: HTMLElement) => {
  const pass = element.getAttribute('aria-label') !== null ||
              element.getAttribute('aria-labelledby') !== null ||
              element.getAttribute('role') !== null ||
              element.tagName.toLowerCase() === 'button' ||
              element.tagName.toLowerCase() === 'a' ||
              element.tagName.toLowerCase() === 'input'
  
  return {
    pass,
    message: () => pass 
      ? `Expected element not to be accessible` 
      : `Expected element to have accessibility attributes`
  }
}

// Utility to wait for animations to complete
export const waitForAnimation = () => new Promise(resolve => setTimeout(resolve, 100))

// Mock intersection observer for viewport animations
export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = jest.fn()
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  })
  window.IntersectionObserver = mockIntersectionObserver
}

// Performance testing utilities
export const measureRenderTime = async (renderFn: () => void) => {
  const start = performance.now()
  renderFn()
  const end = performance.now()
  return end - start
}

// Component testing utilities
export const getByTestId = (container: HTMLElement, testId: string) => {
  const element = container.querySelector(`[data-testid="${testId}"]`)
  if (!element) {
    throw new Error(`Unable to find element with data-testid: ${testId}`)
  }
  return element
}

// Animation testing utilities
export const mockFramerMotion = () => {
  jest.mock('framer-motion', () => ({
    motion: {
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
      section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
      h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
      h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
      h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
      p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
      button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
      a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    },
    AnimatePresence: ({ children }: any) => children,
    LazyMotion: ({ children }: any) => children,
    domAnimation: {},
  }))
}

// Theme testing utilities
export const renderWithTheme = (ui: ReactElement, theme: 'light' | 'dark' = 'light') => {
  return render(
    <ThemeProvider attribute="class" defaultTheme={theme} enableSystem={false}>
      {ui}
    </ThemeProvider>
  )
}

// Responsive testing utilities
export const setMobileViewport = () => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 375,
  })
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: 667,
  })
  window.dispatchEvent(new Event('resize'))
}

export const setDesktopViewport = () => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 1920,
  })
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: 1080,
  })
  window.dispatchEvent(new Event('resize'))
}

// Accessibility testing helpers
export const checkAccessibility = (element: HTMLElement) => {
  const issues: string[] = []
  
  // Check for alt text on images
  const images = element.querySelectorAll('img')
  images.forEach((img, index) => {
    if (!img.getAttribute('alt')) {
      issues.push(`Image ${index + 1} missing alt text`)
    }
  })
  
  // Check for form labels
  const inputs = element.querySelectorAll('input, textarea, select')
  inputs.forEach((input, index) => {
    const id = input.getAttribute('id')
    const ariaLabel = input.getAttribute('aria-label')
    const ariaLabelledBy = input.getAttribute('aria-labelledby')
    
    if (!id && !ariaLabel && !ariaLabelledBy) {
      issues.push(`Form input ${index + 1} missing label`)
    }
  })
  
  // Check for button text
  const buttons = element.querySelectorAll('button')
  buttons.forEach((button, index) => {
    if (!button.textContent?.trim() && !button.getAttribute('aria-label')) {
      issues.push(`Button ${index + 1} missing accessible text`)
    }
  })
  
  return issues
}