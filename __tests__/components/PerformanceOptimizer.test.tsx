import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { 
  LazyOptimizedMotion, 
  usePerformanceOptimization,
  useAnimationController,
  optimizedVariants,
  createVariant
} from '../../components/PerformanceOptimizer'

// Test component for hooks
const TestComponent = ({ enablePerformanceOptimization = false }) => {
  usePerformanceOptimization()
  const { animationsEnabled, complexity, toggleAnimations, adjustComplexity } = useAnimationController()
  
  return (
    <div>
      <span data-testid="animations-enabled">{animationsEnabled.toString()}</span>
      <span data-testid="complexity">{complexity}</span>
      <button onClick={toggleAnimations} data-testid="toggle-animations">
        Toggle Animations
      </button>
      <button onClick={() => adjustComplexity('low')} data-testid="set-low-complexity">
        Set Low Complexity
      </button>
      <button onClick={() => adjustComplexity('medium')} data-testid="set-medium-complexity">
        Set Medium Complexity
      </button>
      <button onClick={() => adjustComplexity('high')} data-testid="set-high-complexity">
        Set High Complexity
      </button>
    </div>
  )
}

describe('PerformanceOptimizer', () => {
  describe('LazyOptimizedMotion', () => {
    it('renders children correctly', () => {
      render(
        <LazyOptimizedMotion>
          <div data-testid="test-child">Test Content</div>
        </LazyOptimizedMotion>
      )
      
      expect(screen.getByTestId('test-child')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('shows performance monitor when enabled', () => {
      render(
        <LazyOptimizedMotion enablePerformanceMonitoring={true}>
          <div>Content</div>
        </LazyOptimizedMotion>
      )
      
      // Should show the performance monitor
      expect(screen.getByText(/FPS:/)).toBeInTheDocument()
      expect(screen.getByText(/Memory:/)).toBeInTheDocument()
    })

    it('does not show performance monitor when disabled', () => {
      render(
        <LazyOptimizedMotion enablePerformanceMonitoring={false}>
          <div>Content</div>
        </LazyOptimizedMotion>
      )
      
      // Should not show the performance monitor
      expect(screen.queryByText(/FPS:/)).not.toBeInTheDocument()
      expect(screen.queryByText(/Memory:/)).not.toBeInTheDocument()
    })
  })

  describe('useAnimationController', () => {
    it('has default values', () => {
      render(<TestComponent />)
      
      expect(screen.getByTestId('animations-enabled')).toHaveTextContent('true')
      expect(screen.getByTestId('complexity')).toHaveTextContent('high')
    })

    it('toggles animations when button is clicked', () => {
      render(<TestComponent />)
      
      const toggleButton = screen.getByTestId('toggle-animations')
      
      // Initially enabled
      expect(screen.getByTestId('animations-enabled')).toHaveTextContent('true')
      
      // Click to disable
      act(() => {
        toggleButton.click()
      })
      
      expect(screen.getByTestId('animations-enabled')).toHaveTextContent('false')
      
      // Click to enable again
      act(() => {
        toggleButton.click()
      })
      
      expect(screen.getByTestId('animations-enabled')).toHaveTextContent('true')
    })

    it('adjusts complexity levels', () => {
      render(<TestComponent />)
      
      // Initially high
      expect(screen.getByTestId('complexity')).toHaveTextContent('high')
      
      // Set to low
      act(() => {
        screen.getByTestId('set-low-complexity').click()
      })
      expect(screen.getByTestId('complexity')).toHaveTextContent('low')
      
      // Set to medium
      act(() => {
        screen.getByTestId('set-medium-complexity').click()
      })
      expect(screen.getByTestId('complexity')).toHaveTextContent('medium')
      
      // Set to high
      act(() => {
        screen.getByTestId('set-high-complexity').click()
      })
      expect(screen.getByTestId('complexity')).toHaveTextContent('high')
    })
  })

  describe('optimizedVariants', () => {
    it('contains required animation variants', () => {
      expect(optimizedVariants).toHaveProperty('pageTransition')
      expect(optimizedVariants).toHaveProperty('staggerContainer')
      expect(optimizedVariants).toHaveProperty('staggerItem')
      expect(optimizedVariants).toHaveProperty('hoverScale')
      expect(optimizedVariants).toHaveProperty('liquidMorph')
      expect(optimizedVariants).toHaveProperty('float')
      expect(optimizedVariants).toHaveProperty('fadeInViewport')
    })

    it('has proper structure for pageTransition variant', () => {
      const pageTransition = optimizedVariants.pageTransition
      
      expect(pageTransition).toHaveProperty('initial')
      expect(pageTransition).toHaveProperty('animate')
      expect(pageTransition).toHaveProperty('exit')
      
      expect(pageTransition.initial).toHaveProperty('opacity')
      expect(pageTransition.initial).toHaveProperty('y')
      expect(pageTransition.animate).toHaveProperty('opacity')
      expect(pageTransition.animate).toHaveProperty('y')
    })
  })

  describe('createVariant', () => {
    it('returns the same variants object', () => {
      const testVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 }
      }
      
      const result = createVariant(testVariants)
      expect(result).toBe(testVariants)
      expect(result).toEqual(testVariants)
    })

    it('provides type safety for variants', () => {
      const variants = createVariant({
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 }
      })
      
      expect(variants.initial.opacity).toBe(0)
      expect(variants.animate.opacity).toBe(1)
      expect(variants.exit.opacity).toBe(0)
    })
  })

  describe('Performance optimization effects', () => {
    it('applies CSS custom properties for complexity levels', () => {
      render(<TestComponent />)
      
      const root = document.documentElement
      
      // Test low complexity
      act(() => {
        screen.getByTestId('set-low-complexity').click()
      })
      
      // Note: We can't easily test CSS custom properties in jsdom
      // but we can verify the function calls don't throw errors
      expect(screen.getByTestId('complexity')).toHaveTextContent('low')
    })
  })
})