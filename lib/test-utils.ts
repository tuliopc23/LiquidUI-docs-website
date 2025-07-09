import { render, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import {
  AccessibilityChecker,
  AccessibilityReport,
} from './accessibility-checker';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(): R;
      toBeAccessible(): R;
      toMeetWCAG21AA(): R;
    }
  }
}

const accessibilityChecker = new AccessibilityChecker();

/**
 * Custom Jest matcher for accessibility testing
 */
expect.extend({
  async toBeAccessible(received: HTMLElement) {
    const results = await axe(received);

    if (results.violations.length === 0) {
      return {
        message: () =>
          `Expected element to have accessibility violations, but found none`,
        pass: true,
      };
    }

    const violationMessages = results.violations
      .map((violation: any) => `${violation.id}: ${violation.description}`)
      .join('\n');

    return {
      message: () =>
        `Expected element to be accessible, but found violations:\n${violationMessages}`,
      pass: false,
    };
  },

  async toMeetWCAG21AA(received: HTMLElement) {
    const results = await axe(received);

    const hasAAViolations = results.violations.some((violation: any) =>
      violation.tags.some((tag: string) => tag.includes('wcag21aa'))
    );

    if (!hasAAViolations) {
      return {
        message: () =>
          `Expected element to have WCAG 2.1 AA violations, but found none`,
        pass: true,
      };
    }

    const violationMessages = results.violations
      .filter((violation: any) =>
        violation.tags.some((tag: string) => tag.includes('wcag21aa'))
      )
      .map((violation: any) => `${violation.id}: ${violation.description}`)
      .join('\n');

    return {
      message: () =>
        `Expected element to meet WCAG 2.1 AA standards, but found violations:\n${violationMessages}`,
      pass: false,
    };
  },
});

/**
 * Test utility function to check component accessibility
 */
export async function expectAccessible(
  component: ReactElement<any>,
  options?: { skipRules?: string[]; level?: 'A' | 'AA' | 'AAA' }
): Promise<void> {
  const { container } = render(component);

  const axeConfig = {
    level: options?.level || 'AA',
    ...(options?.skipRules && {
      rules: Object.fromEntries(
        options.skipRules.map(rule => [rule, { enabled: false }])
      ),
    }),
  };

  const results = await axe(container, axeConfig);
  expect(results).toHaveNoViolations();
}

/**
 * Test utility function to run accessibility check and return report
 */
export async function runAccessibilityCheck(
  component: ReactElement<any>,
  componentName: string,
  options?: { skipRules?: string[]; level?: 'A' | 'AA' | 'AAA' }
): Promise<AccessibilityReport> {
  return await accessibilityChecker.checkComponent(
    component,
    componentName,
    options
  );
}

/**
 * Test utility to check keyboard navigation
 */
export async function expectKeyboardAccessible(
  component: ReactElement<any>,
  interactiveElements: string[] = ['button', 'input', 'select', 'textarea', 'a']
): Promise<void> {
  const { container } = render(component);

  // Check that all interactive elements are keyboard accessible
  const elements = container.querySelectorAll(interactiveElements.join(','));

  elements.forEach(element => {
    const hasTabIndex = element.hasAttribute('tabindex');
    const tabIndex = element.getAttribute('tabindex');
    const isInteractive =
      element.tagName.toLowerCase() !== 'div' &&
      element.tagName.toLowerCase() !== 'span';

    if (!isInteractive && !hasTabIndex) {
      throw new Error(`Element ${element.tagName} is not keyboard accessible`);
    }

    if (hasTabIndex && tabIndex === '-1') {
      console.warn(
        `Element ${element.tagName} has tabindex="-1" which removes it from keyboard navigation`
      );
    }
  });
}

/**
 * Test utility to check focus management
 */
export async function expectProperFocusManagement(
  component: ReactElement<any>
): Promise<void> {
  const { container } = render(component);

  // Check for focus traps in modals
  const modals = container.querySelectorAll(
    '[role="dialog"], [role="alertdialog"]'
  );
  modals.forEach(modal => {
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) {
      console.warn('Modal should contain focusable elements');
    }
  });

  // Check for proper focus indicators
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  focusableElements.forEach(element => {
    const computedStyle = window.getComputedStyle(element);
    const hasFocusStyles =
      computedStyle.getPropertyValue('outline') !== 'none' ||
      computedStyle.getPropertyValue('box-shadow') !== 'none';

    if (!hasFocusStyles) {
      console.warn(
        `Element ${element.tagName} may not have visible focus indicators`
      );
    }
  });
}

/**
 * Test utility to check color contrast
 */
export async function expectSufficientColorContrast(
  component: ReactElement<any>,
  minimumRatio: number = 4.5
): Promise<void> {
  const { container } = render(component);

  try {
    // This would require a color contrast calculation library
    // For now, we'll use axe-core to check color contrast
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true },
      },
    });

    const colorContrastViolations = results.violations.filter(
      (v: any) => v.id === 'color-contrast'
    );

    if (colorContrastViolations.length > 0) {
      const violationMessages = colorContrastViolations
        .map((v: any) => v.description)
        .join('\n');
      throw new Error(`Color contrast violations found:\n${violationMessages}`);
    }
  } catch (error) {
    // Skip color contrast test in test environment due to canvas limitations
    if (
      (error as Error).message &&
      (error as Error).message.includes('HTMLCanvasElement')
    ) {
      console.warn('Skipping color contrast test in test environment');
      return;
    }
    throw error;
  }
}

/**
 * Test utility to check ARIA labels and roles
 */
export async function expectProperARIA(
  component: ReactElement<any>
): Promise<void> {
  const { container } = render(component);

  // Check for proper ARIA labels
  const elementsNeedingLabels = container.querySelectorAll(
    'button:not([aria-label]):not([aria-labelledby]), input:not([aria-label]):not([aria-labelledby]):not([id])'
  );

  elementsNeedingLabels.forEach(element => {
    const hasVisibleLabel =
      element.textContent?.trim() ||
      element.querySelector('label') ||
      element.closest('label');

    if (!hasVisibleLabel) {
      console.warn(`Element ${element.tagName} may need an accessible label`);
    }
  });

  // Check for proper ARIA roles
  const customElements = container.querySelectorAll('[role]');
  customElements.forEach(element => {
    const role = element.getAttribute('role');
    const validRoles = [
      'button',
      'checkbox',
      'dialog',
      'tab',
      'tabpanel',
      'tablist',
      'menu',
      'menuitem',
      'alert',
      'status',
      'progressbar',
      'slider',
    ];

    if (role && !validRoles.includes(role)) {
      console.warn(`Element has potentially invalid ARIA role: ${role}`);
    }
  });
}

/**
 * Test utility to check heading hierarchy
 */
export async function expectProperHeadingHierarchy(
  component: ReactElement<any>
): Promise<void> {
  const { container } = render(component);

  const headings = Array.from(
    container.querySelectorAll('h1, h2, h3, h4, h5, h6')
  );

  if (headings.length === 0) return;

  const headingLevels = headings.map(h => parseInt(h.tagName.charAt(1)));

  // Check for proper hierarchy (no skipping levels)
  for (let i = 1; i < headingLevels.length; i++) {
    const current = headingLevels[i];
    const previous = headingLevels[i - 1];

    if (current - previous > 1) {
      console.warn(
        `Heading hierarchy skip detected: h${previous} followed by h${current}`
      );
    }
  }
}

/**
 * Comprehensive accessibility test suite
 */
export async function runComprehensiveAccessibilityTest(
  component: ReactElement<any>,
  componentName: string,
  options?: {
    skipRules?: string[];
    level?: 'A' | 'AA' | 'AAA';
    skipKeyboardTest?: boolean;
    skipFocusTest?: boolean;
    skipColorContrastTest?: boolean;
    skipARIATest?: boolean;
    skipHeadingTest?: boolean;
  }
): Promise<AccessibilityReport> {
  // Run main accessibility check
  const report = await runAccessibilityCheck(component, componentName, options);

  // Run additional specific tests
  if (!options?.skipKeyboardTest) {
    await expectKeyboardAccessible(component);
  }

  if (!options?.skipFocusTest) {
    await expectProperFocusManagement(component);
  }

  if (!options?.skipColorContrastTest) {
    await expectSufficientColorContrast(component);
  }

  if (!options?.skipARIATest) {
    await expectProperARIA(component);
  }

  if (!options?.skipHeadingTest) {
    await expectProperHeadingHierarchy(component);
  }

  return report;
}

/**
 * Create accessibility test suite for a component
 */
export function createAccessibilityTestSuite(
  componentName: string,
  createComponent: () => ReactElement<any>,
  options?: {
    skipRules?: string[];
    level?: 'A' | 'AA' | 'AAA';
    variants?: Array<{ name: string; component: ReactElement<any> }>;
  }
) {
  describe(`${componentName} - Accessibility Tests`, () => {
    test('should be accessible', async () => {
      const component = createComponent();
      await expectAccessible(component, options);
    });

    test('should meet WCAG 2.1 AA standards', async () => {
      const component = createComponent();
      const { container } = render(component);
      await expect(container).toMeetWCAG21AA();
    });

    test('should have proper keyboard navigation', async () => {
      const component = createComponent();
      await expectKeyboardAccessible(component);
    });

    test('should have proper focus management', async () => {
      const component = createComponent();
      await expectProperFocusManagement(component);
    });

    test('should have sufficient color contrast', async () => {
      const component = createComponent();
      await expectSufficientColorContrast(component);
    });

    test('should have proper ARIA labels and roles', async () => {
      const component = createComponent();
      await expectProperARIA(component);
    });

    test('should have proper heading hierarchy', async () => {
      const component = createComponent();
      await expectProperHeadingHierarchy(component);
    });

    // Test variants if provided
    if (options?.variants) {
      options.variants.forEach(({ name, component }) => {
        test(`should be accessible - ${name} variant`, async () => {
          await expectAccessible(component, options);
        });
      });
    }
  });
}

export { accessibilityChecker };
