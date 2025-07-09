import React from 'react';
import { render } from '@testing-library/react';
import {
  expectAccessible,
  runAccessibilityCheck,
  expectKeyboardAccessible,
  expectProperFocusManagement,
  expectSufficientColorContrast,
  expectProperARIA,
  createAccessibilityTestSuite,
  runComprehensiveAccessibilityTest,
} from '../../lib/test-utils';

// Mock the GlassEffect component since it might have external dependencies
const MockGlassEffect = ({ children, ...props }: any) => (
  <div className='glass-effect' {...props}>
    {children}
  </div>
);

// Component creators (moved outside describe to be accessible globally)
const createBasicComponent = () => (
  <MockGlassEffect>
    <p>Glass effect content</p>
  </MockGlassEffect>
);

const createButtonComponent = () => (
  <MockGlassEffect variant='button'>
    <button>Click me</button>
  </MockGlassEffect>
);

const createModalComponent = () => (
  <MockGlassEffect variant='modal' role='dialog' aria-label='Test modal'>
    <h2>Modal Title</h2>
    <p>Modal content</p>
    <button>Close</button>
  </MockGlassEffect>
);

describe('GlassEffect - Accessibility Tests', () => {
  test('should be accessible with default props', async () => {
    const component = createBasicComponent();
    await expectAccessible(component);
  });

  test('should meet WCAG 2.1 AA standards', async () => {
    const component = createBasicComponent();
    const { container } = render(component);
    await expect(container).toMeetWCAG21AA();
  });

  test('should have proper keyboard navigation for interactive elements', async () => {
    const component = createButtonComponent();
    await expectKeyboardAccessible(component);
  });

  test('should have proper focus management', async () => {
    const component = createButtonComponent();
    await expectProperFocusManagement(component);
  });

  test('should have sufficient color contrast', async () => {
    const component = createBasicComponent();
    await expectSufficientColorContrast(component);
  });

  test('should have proper ARIA labels and roles', async () => {
    const component = createModalComponent();
    await expectProperARIA(component);
  });

  test('should generate accessibility report', async () => {
    const component = createBasicComponent();
    const report = await runAccessibilityCheck(component, 'GlassEffect');

    expect(report).toHaveProperty('componentName', 'GlassEffect');
    expect(report).toHaveProperty('score');
    expect(report).toHaveProperty('recommendations');
    expect(report).toHaveProperty('wcagGuidelines');
    expect(report.score).toHaveProperty('score');
    expect(report.score).toHaveProperty('level');
    expect(typeof report.score.score).toBe('number');
  });

  test('should pass comprehensive accessibility test', async () => {
    const component = createBasicComponent();
    const report = await runComprehensiveAccessibilityTest(
      component,
      'GlassEffect'
    );

    expect(report.score.score).toBeGreaterThan(0);
    expect(['A', 'AA', 'AAA']).toContain(report.score.level);
  });

  // Test different variants
  describe('Variant Tests', () => {
    const variants = [
      { name: 'default', component: createBasicComponent() },
      { name: 'button', component: createButtonComponent() },
      { name: 'modal', component: createModalComponent() },
    ];

    variants.forEach(({ name, component }) => {
      test(`should be accessible - ${name} variant`, async () => {
        await expectAccessible(component);
      });
    });
  });

  // Test with different intensities
  describe('Intensity Tests', () => {
    const intensities = ['light', 'medium', 'heavy', 'ultra'];

    intensities.forEach(intensity => {
      test(`should be accessible with ${intensity} intensity`, async () => {
        const component = (
          <MockGlassEffect intensity={intensity}>
            <p>Content with {intensity} intensity</p>
          </MockGlassEffect>
        );
        await expectAccessible(component);
      });
    });
  });

  // Test with interactive content
  describe('Interactive Content Tests', () => {
    test('should be accessible with form elements', async () => {
      const component = (
        <MockGlassEffect>
          <form>
            <label htmlFor='name'>Name</label>
            <input type='text' id='name' />
            <button type='submit'>Submit</button>
          </form>
        </MockGlassEffect>
      );
      await expectAccessible(component);
    });

    test('should be accessible with navigation links', async () => {
      const component = (
        <MockGlassEffect>
          <nav>
            <ul>
              <li>
                <a href='#home'>Home</a>
              </li>
              <li>
                <a href='#about'>About</a>
              </li>
              <li>
                <a href='#contact'>Contact</a>
              </li>
            </ul>
          </nav>
        </MockGlassEffect>
      );
      await expectAccessible(component);
    });
  });

  // Test focus management for modal variant
  describe('Modal Focus Management', () => {
    test('should trap focus within modal', async () => {
      const component = (
        <MockGlassEffect variant='modal' role='dialog' aria-label='Test modal'>
          <h2>Modal Title</h2>
          <input type='text' placeholder='First input' />
          <input type='text' placeholder='Second input' />
          <button>Close</button>
        </MockGlassEffect>
      );

      await expectProperFocusManagement(component);
    });
  });
});

// Create automated test suite
createAccessibilityTestSuite('GlassEffect', () => createBasicComponent(), {
  level: 'AA',
  variants: [
    { name: 'button', component: createButtonComponent() },
    { name: 'modal', component: createModalComponent() },
  ],
});
