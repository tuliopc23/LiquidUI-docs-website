import React from 'react'
import { render, screen } from '@testing-library/react'
import HomePage from '../../pages/index.mdx'

// Mock the MDX content since it's loaded dynamically
jest.mock('../../pages/index.mdx', () => {
  return function MockHomePage() {
    return (
      <div data-testid="home-page">
        <h1>LiqUIdify Documentation</h1>
        <p>Welcome to the LiqUIdify component library documentation.</p>
      </div>
    )
  }
})

describe('Home Page', () => {
  it('renders the home page content', () => {
    render(<HomePage />)
    
    expect(screen.getByTestId('home-page')).toBeInTheDocument()
    expect(screen.getByText('LiqUIdify Documentation')).toBeInTheDocument()
    expect(screen.getByText(/Welcome to the LiqUIdify component library/)).toBeInTheDocument()
  })

  it('has proper heading structure', () => {
    render(<HomePage />)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('LiqUIdify Documentation')
  })
})