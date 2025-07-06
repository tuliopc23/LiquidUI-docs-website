import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LiquidTitle, LiquidTitleVariants, LiquidH1, LiquidH2, LiquidH3 } from '../../components/LiquidTitle';

// GSAP-based animations are already mocked globally in jest.setup.js

// Mock window.matchMedia for reduced motion tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('LiquidTitle Component', () => {
  beforeEach(() => {
    // Reset matchMedia mock before each test
    (window.matchMedia as jest.Mock).mockClear();
  });

  it('renders with default props', () => {
    render(
      <LiquidTitle>
        Test Title
      </LiquidTitle>
    );
    
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Test Title');
    expect(title).toHaveClass('liquid-title');
  });

  it('renders different heading levels', () => {
    const { rerender } = render(
      <LiquidTitle as="h2">
        H2 Title
      </LiquidTitle>
    );
    
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    
    rerender(
      <LiquidTitle as="h3">
        H3 Title
      </LiquidTitle>
    );
    
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });

  it('applies custom CSS classes', () => {
    render(
      <LiquidTitle className="custom-class">
        Test Title
      </LiquidTitle>
    );
    
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveClass('liquid-title', 'custom-class');
  });

  it('applies static class when tilt is disabled', () => {
    render(
      <LiquidTitle enableTilt={false}>
        Static Title
      </LiquidTitle>
    );
    
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveClass('liquid-title--static');
  });

  it('applies hero class for strong tilt values', () => {
    render(
      <LiquidTitle tiltX={12} tiltY={-8}>
        Hero Title
      </LiquidTitle>
    );
    
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveClass('liquid-title--hero');
  });

  it('applies subtle class for minimal tilt values', () => {
    render(
      <LiquidTitle tiltX={3} tiltY={-1}>
        Subtle Title
      </LiquidTitle>
    );
    
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveClass('liquid-title--subtle');
  });

  it('respects reduced motion preference', () => {
    // Mock reduced motion preference
    (window.matchMedia as jest.Mock).mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(
      <LiquidTitle>
        Accessible Title
      </LiquidTitle>
    );
    
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveClass('liquid-title--static');
  });

  it('works with variants', () => {
    render(
      <LiquidTitle {...LiquidTitleVariants.hero}>
        Hero Variant Title
      </LiquidTitle>
    );
    
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Hero Variant Title');
  });

  it('passes through additional props', () => {
    render(
      <LiquidTitle data-testid="custom-title" id="unique-id">
        Test Title
      </LiquidTitle>
    );
    
    const title = screen.getByTestId('custom-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveAttribute('id', 'unique-id');
  });
});

describe('LiquidTitle Quick Access Components', () => {
  it('LiquidH1 renders h1 element', () => {
    render(<LiquidH1>H1 Title</LiquidH1>);
    
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('H1 Title');
  });

  it('LiquidH2 renders h2 element', () => {
    render(<LiquidH2>H2 Title</LiquidH2>);
    
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('H2 Title');
  });

  it('LiquidH3 renders h3 element', () => {
    render(<LiquidH3>H3 Title</LiquidH3>);
    
    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('H3 Title');
  });
});

describe('LiquidTitle Variants', () => {
  it('has correct variant configurations', () => {
    expect(LiquidTitleVariants.hero).toEqual({
      as: 'h1',
      tiltX: 12,
      tiltY: -8,
      className: 'text-display-2xl md:text-display-4xl font-display',
    });

    expect(LiquidTitleVariants.section).toEqual({
      as: 'h2',
      tiltX: 6,
      tiltY: -4,
      className: 'text-display-xl md:text-display-2xl font-display',
    });

    expect(LiquidTitleVariants.subtle).toEqual({
      as: 'h3',
      tiltX: 4,
      tiltY: -2,
      className: 'text-display-lg md:text-display-xl font-display',
    });

    expect(LiquidTitleVariants.static).toEqual({
      enableTilt: false,
      className: 'text-display-lg md:text-display-xl font-display',
    });
  });
});
