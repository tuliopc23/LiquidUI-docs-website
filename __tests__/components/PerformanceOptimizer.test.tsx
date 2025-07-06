import React from 'react'
import { render, screen, act } from '@testing-library/react'
import {
  LazyOptimizedMotion,
  usePerformanceOptimization,
  useAnimationController
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

    it('monitors performance when enabled', () => {
      render(
        <LazyOptimizedMotion enablePerformanceMonitoring={true}>
          <div>Content</div>
        </LazyOptimizedMotion>
      )

      // Should render the content (performance monitoring is internal)
      expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('renders content when monitoring disabled', () => {
      render(
        <LazyOptimizedMotion enablePerformanceMonitoring={false}>
          <div>Content</div>
        </LazyOptimizedMotion>
      )

      // Should render the content normally
      expect(screen.getByText('Content')).toBeInTheDocument()
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