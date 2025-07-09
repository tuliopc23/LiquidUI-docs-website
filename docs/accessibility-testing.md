# Accessibility Testing Guide

## Overview

This guide explains how to use the accessibility testing utilities integrated into the Liquidify documentation system. Our accessibility testing framework ensures all components meet WCAG 2.1 AA standards.

## Quick Start

### Basic Usage

```tsx
import { expectAccessible, runAccessibilityCheck } from '../lib/test-utils';

// Basic accessibility test
test('component should be accessible', async () => {
  const component = <MyComponent />;
  await expectAccessible(component);
});

// Get detailed accessibility report
test('component accessibility report', async () => {
  const component = <MyComponent />;
  const report = await runAccessibilityCheck(component, 'MyComponent');

  expect(report.score.level).toBe('AA');
  expect(report.score.score).toBeGreaterThan(85);
});
```

### Comprehensive Testing

```tsx
import { runComprehensiveAccessibilityTest } from '../lib/test-utils';

test('comprehensive accessibility test', async () => {
  const component = <MyComponent />;
  const report = await runComprehensiveAccessibilityTest(
    component,
    'MyComponent'
  );

  expect(report.score.level).toBe('AA');
});
```

## Testing Utilities

### `expectAccessible(component, options?)`

Tests if a component is accessible according to WCAG guidelines.

**Parameters:**

- `component`: React element to test
- `options.skipRules`: Array of accessibility rules to skip
- `options.level`: WCAG level ('A', 'AA', 'AAA')

**Example:**

```tsx
await expectAccessible(<Button>Click me</Button>, {
  level: 'AA',
  skipRules: ['color-contrast'], // Skip if testing in isolation
});
```

### `runAccessibilityCheck(component, name, options?)`

Runs accessibility check and returns detailed report.

**Returns:**

```tsx
interface AccessibilityReport {
  componentName: string;
  version: string;
  score: {
    score: number;
    level: 'A' | 'AA' | 'AAA';
    violations: any[];
    passes: number;
    timestamp: string;
  };
  recommendations: string[];
  wcagGuidelines: string[];
}
```

### `expectKeyboardAccessible(component)`

Tests keyboard navigation and focus management.

### `expectSufficientColorContrast(component)`

Tests color contrast ratios (4.5:1 for normal text, 3:1 for large text).

### `expectProperARIA(component)`

Tests ARIA labels, roles, and properties.

## Component Testing Examples

### Button Component

```tsx
import { createAccessibilityTestSuite } from '../lib/test-utils';

// Automated test suite
createAccessibilityTestSuite(
  'GlassButton',
  () => <GlassButton>Click me</GlassButton>,
  {
    level: 'AA',
    variants: [
      {
        name: 'primary',
        component: <GlassButton variant='primary'>Primary</GlassButton>,
      },
      {
        name: 'secondary',
        component: <GlassButton variant='secondary'>Secondary</GlassButton>,
      },
      {
        name: 'disabled',
        component: <GlassButton disabled>Disabled</GlassButton>,
      },
    ],
  }
);
```

### Modal Component

```tsx
test('modal accessibility', async () => {
  const modal = (
    <GlassModal isOpen={true} onClose={() => {}}>
      <h2>Modal Title</h2>
      <p>Modal content</p>
      <button>Close</button>
    </GlassModal>
  );

  await expectAccessible(modal);
  await expectProperFocusManagement(modal);
});
```

### Form Component

```tsx
test('form accessibility', async () => {
  const form = (
    <form>
      <label htmlFor='email'>Email</label>
      <GlassInput
        id='email'
        type='email'
        required
        aria-describedby='email-error'
      />
      <div id='email-error' role='alert'>
        Please enter a valid email
      </div>
      <GlassButton type='submit'>Submit</GlassButton>
    </form>
  );

  await expectAccessible(form);
  await expectProperARIA(form);
});
```

## Build Integration

### Running Accessibility Tests

```bash
# Run all accessibility tests
npm run test -- --testNamePattern="accessibility"

# Run accessibility audit
npm run build:accessibility

# Generate accessibility report
npm run a11y:report
```

### Build Process

The build process automatically:

1. Runs accessibility tests
2. Generates accessibility reports
3. Creates accessibility badges
4. Fails build if accessibility score < 85%

## Documentation Integration

### Component Documentation

Add accessibility information to component documentation:

````mdx
## Accessibility

![Accessibility Badge](./badges/GlassButton-accessibility.svg)

**WCAG 2.1 AA Compliant** ✅

### Keyboard Navigation

- `Tab` - Focus the button
- `Enter` or `Space` - Activate the button

### Screen Reader Support

- Proper ARIA labels
- Role announcements
- State changes announced

### Focus Management

- Visible focus indicators
- Logical focus order
- Focus trapping in modals

### Testing

```tsx
import { expectAccessible } from '../lib/test-utils';

test('button accessibility', async () => {
  await expectAccessible(<GlassButton>Click me</GlassButton>);
});
```
````

````

## Best Practices

### 1. Test Early and Often
```tsx
// Add accessibility tests alongside regular tests
describe('Button Component', () => {
  test('renders correctly', () => {
    // Regular tests
  });

  test('is accessible', async () => {
    await expectAccessible(<Button>Click me</Button>);
  });
});
````

### 2. Test All Variants

```tsx
const variants = [
  { name: 'primary', props: { variant: 'primary' } },
  { name: 'secondary', props: { variant: 'secondary' } },
  { name: 'disabled', props: { disabled: true } },
];

variants.forEach(({ name, props }) => {
  test(`accessibility - ${name}`, async () => {
    await expectAccessible(<Button {...props}>Test</Button>);
  });
});
```

### 3. Test Interactive States

```tsx
test('focus state accessibility', async () => {
  const { getByRole } = render(<Button>Click me</Button>);
  const button = getByRole('button');

  button.focus();
  await expectSufficientColorContrast(<Button>Click me</Button>);
});
```

## Common Accessibility Issues

### 1. Color Contrast

```tsx
// ❌ Bad - insufficient contrast
<Button style={{ color: '#888', backgroundColor: '#ccc' }}>
  Click me
</Button>

// ✅ Good - sufficient contrast
<Button style={{ color: '#000', backgroundColor: '#fff' }}>
  Click me
</Button>
```

### 2. Missing Labels

```tsx
// ❌ Bad - no accessible label
<button>
  <Icon name="search" />
</button>

// ✅ Good - accessible label
<button aria-label="Search">
  <Icon name="search" />
</button>
```

### 3. Focus Management

```tsx
// ❌ Bad - no focus trap
<Modal>
  <input type="text" />
  <button>Close</button>
</Modal>

// ✅ Good - focus trap
<Modal onClose={handleClose}>
  <input type="text" />
  <button onClick={handleClose}>Close</button>
</Modal>
```

## Accessibility Scores

- **90-100%**: Excellent accessibility
- **80-89%**: Good accessibility
- **70-79%**: Needs improvement
- **<70%**: Poor accessibility (build fails)

## Support

For accessibility questions or issues:

1. Check the [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
2. Use the accessibility testing utilities
3. Review component documentation
4. Test with screen readers

## Tools Used

- **axe-core**: Accessibility testing engine
- **jest-axe**: Jest integration for axe-core
- **@testing-library/react**: Component testing utilities
- **pa11y-ci**: Command-line accessibility testing
