# Interactive Component Showcase

## Overview

The Interactive Component Showcase is a comprehensive demonstration system for Liquidify components, providing real-time prop editing, code generation, physics animations, and responsive behavior testing.

## Features

### 🎮 Interactive Playground (`/playground`)

- **Real-time prop editing**: Dynamically modify component properties
- **Live code generation**: Generate copy-paste ready code examples
- **Multi-variant support**: Test different component variations
- **Responsive preview**: See how components adapt across breakpoints
- **Physics animations**: Enable magnetic hover and spring effects

### 🎯 Component Showcase (`ComponentShowcase.tsx`)

- **Tabbed interface**: Preview, Props, Code, and Responsive views
- **Prop editor**: Visual controls for component properties
- **Code viewer**: Syntax-highlighted code with copy functionality
- **Physics wrapper**: Optional physics animations
- **Responsive testing**: Device-specific previews

### ⚡ Physics Animations (`PhysicsShowcase.tsx`)

- **Magnetic hover effects**: Cursor-following animations
- **Spring animations**: Natural entrance, exit, and bounce effects
- **Haptic feedback**: Visual simulation of device haptics
- **Interactive controls**: Adjust animation parameters

### 📱 Responsive Design (`ResponsiveShowcase.tsx`)

- **Multi-device preview**: Mobile, tablet, and desktop views
- **Breakpoint testing**: Seamless transitions between sizes
- **Touch-optimized**: Mobile-first interactions

## Architecture

### Core Components

```tsx
// Main showcase component
ComponentShowcase({
  component: React.ComponentType,
  componentName: string,
  variants: ComponentVariant[],
  propControls: PropControl[],
  showPhysics: boolean,
  showResponsive: boolean
})

// Physics demonstrations
PhysicsShowcase()

// Responsive testing
ResponsiveShowcase()
```

### Component Configuration

```tsx
const componentConfigs = {
  GlassButton: {
    component: GlassButton,
    variants: [...],
    propControls: [...],
    children: 'Click me!'
  }
}
```

### Prop Controls

```tsx
interface PropControl {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'slider';
  defaultValue: any;
  options?: Array<{ value: any; label: string }>;
  description?: string;
}
```

## Animation System

### GSAP Integration

- **ScrollTrigger**: Reveal animations on scroll
- **Timeline animations**: Coordinated multi-element effects
- **Performance optimization**: Hardware acceleration and cleanup

### Physics Effects

- **Magnetic hover**: Cursor position tracking with spring easing
- **Spring animations**: Natural bounce and elastic effects
- **Haptic feedback**: Visual simulation of device haptics

### Easing Curves

```tsx
const microEasing = {
  magnetic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  haptic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};
```

## Code Generation

### Utilities (`lib/code-generator.ts`)

- **Multi-language support**: TSX, JSX, Vue, Svelte
- **Interactive examples**: State management integration
- **Theme-aware code**: ThemeProvider integration
- **Accessibility examples**: ARIA attributes and roles

### Generation Functions

```tsx
generateComponentCode(options: CodeGenerationOptions): string
generateFullExample(componentName, props, children): string
generateVariantExamples(componentName, variants): string
generatePlaygroundCode(componentName, props, interactive): string
```

## Usage Examples

### Basic Showcase

```tsx
<ComponentShowcase
  component={GlassButton}
  componentName="GlassButton"
  description="Interactive button with glass effects"
  variants={[
    { name: 'Primary', props: { variant: 'primary' } },
    { name: 'Secondary', props: { variant: 'secondary' } }
  ]}
  propControls={[
    { name: 'variant', type: 'select', defaultValue: 'primary', options: [...] },
    { name: 'disabled', type: 'boolean', defaultValue: false }
  ]}
/>
```

### Physics Demo

```tsx
<PhysicsShowcase />
```

### Responsive Testing

```tsx
<ResponsiveShowcase />
```

## File Structure

```
components/
├── ComponentShowcase.tsx     # Main showcase component
├── PhysicsShowcase.tsx       # Physics animations demo
└── ResponsiveShowcase.tsx    # Responsive behavior demo

app/
├── playground/
│   └── page.tsx             # Main playground page
└── showcase/
    └── page.tsx             # Showcase landing page

lib/
├── code-generator.ts        # Code generation utilities
├── enhanced-animations.ts   # Animation system
└── gsap-utils.ts           # GSAP utilities
```

## Performance Considerations

### Optimization Features

- **Hardware acceleration**: GPU-powered animations
- **Lazy loading**: Components load on demand
- **Memory management**: Automatic cleanup of animations
- **Batch updates**: Efficient DOM manipulation

### Best Practices

- Use `useEffect` cleanup for animations
- Implement proper `ScrollTrigger.refresh()` calls
- Optimize re-renders with `useMemo` and `useCallback`
- Handle client-side only animations properly

## Accessibility

### WCAG Compliance

- **Keyboard navigation**: Full keyboard support
- **Screen reader support**: Proper ARIA labels
- **Focus management**: Visible focus indicators
- **Reduced motion**: Respects user preferences

### Implementation

```tsx
// Reduced motion support
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
);

// Accessible code generation
const accessibleProps = {
  'aria-label': `${componentName} example`,
  role: componentName === 'GlassButton' ? 'button' : undefined,
};
```

## Browser Support

### Modern Browsers

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Fallbacks

- CSS fallbacks for older browsers
- Progressive enhancement approach
- Graceful degradation of animations

## Development

### Setup

```bash
npm install
npm run dev
```

### Testing

```bash
npm run test
npm run test:accessibility
npm run test:e2e
```

### Building

```bash
npm run build
npm run start
```

## Contributing

1. Follow the existing component structure
2. Add proper TypeScript types
3. Include accessibility considerations
4. Test across breakpoints
5. Document new features

## License

MIT License - See LICENSE file for details
