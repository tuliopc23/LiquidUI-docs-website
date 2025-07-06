import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ComponentShowcase } from '../../components/ComponentShowcase'

// Mock clipboard writeText
const mockWriteText = jest.fn()
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
})

describe('ComponentShowcase', () => {
  beforeEach(() => {
    mockWriteText.mockClear()
  })

  it('renders children correctly', () => {
    render(
      <ComponentShowcase>
        <div data-testid="test-child">Test Component</div>
      </ComponentShowcase>
    )
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument()
    expect(screen.getByText('Test Component')).toBeInTheDocument()
  })

  it('displays title and description when provided', () => {
    const title = 'Test Component'
    const description = 'This is a test component description'
    
    render(
      <ComponentShowcase title={title} description={description}>
        <div>Content</div>
      </ComponentShowcase>
    )
    
    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
  })

  it('shows code snippet when code prop is provided', () => {
    const code = 'const example = "test";'
    
    render(
      <ComponentShowcase code={code} showCode={true}>
        <div>Content</div>
      </ComponentShowcase>
    )
    
    expect(screen.getByText(code)).toBeInTheDocument()
  })

  it('toggles code visibility when button is clicked', () => {
    const code = 'const example = "test";'
    
    render(
      <ComponentShowcase code={code} showCode={false}>
        <div>Content</div>
      </ComponentShowcase>
    )
    
    // Code should not be visible initially
    expect(screen.queryByText(code)).not.toBeInTheDocument()
    
    // Click the toggle button
    const toggleButton = screen.getByRole('button', { name: /show code/i })
    fireEvent.click(toggleButton)
    
    // Code should now be visible
    expect(screen.getByText(code)).toBeInTheDocument()
  })

  it('copies code to clipboard when copy button is clicked', async () => {
    const code = 'const example = "test";'
    mockWriteText.mockResolvedValueOnce(undefined)
    
    render(
      <ComponentShowcase code={code} showCode={true}>
        <div>Content</div>
      </ComponentShowcase>
    )
    
    const copyButton = screen.getByRole('button', { name: /copy code/i })
    fireEvent.click(copyButton)
    
    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith(code)
    })
  })

  it('handles copy failure gracefully', async () => {
    const code = 'const example = "test";'
    mockWriteText.mockRejectedValueOnce(new Error('Clipboard failed'))
    
    // Mock document.execCommand for fallback
    document.execCommand = jest.fn(() => true)
    
    render(
      <ComponentShowcase code={code} showCode={true}>
        <div>Content</div>
      </ComponentShowcase>
    )
    
    const copyButton = screen.getByRole('button', { name: /copy code/i })
    fireEvent.click(copyButton)
    
    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith(code)
    })
  })

  it('applies custom className when provided', () => {
    const customClass = 'custom-showcase-class'
    
    render(
      <ComponentShowcase className={customClass}>
        <div>Content</div>
      </ComponentShowcase>
    )
    
    // The className is applied to the showcase area (containing the children), not the role="region" container
    const showcaseArea = screen.getByText('Content').parentElement
    expect(showcaseArea).toHaveClass(customClass)
  })

  it('has proper accessibility attributes', () => {
    const title = 'Accessible Component'
    
    render(
      <ComponentShowcase title={title}>
        <div>Content</div>
      </ComponentShowcase>
    )
    
    const showcase = screen.getByRole('region')
    expect(showcase).toHaveAttribute('aria-label', `Component showcase for ${title}`)
  })

  it('shows success state after copying', async () => {
    const code = 'const example = "test";'
    mockWriteText.mockResolvedValueOnce(undefined)
    
    render(
      <ComponentShowcase code={code} showCode={true}>
        <div>Content</div>
      </ComponentShowcase>
    )
    
    const copyButton = screen.getByRole('button', { name: /copy code/i })
    fireEvent.click(copyButton)
    
    await waitFor(() => {
      // Check that the button's aria-label changes to indicate success
      expect(screen.getByRole('button', { name: /copied to clipboard/i })).toBeInTheDocument()
    })
  })
})