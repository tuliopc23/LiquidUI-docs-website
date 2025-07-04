# LiquidTitle Component

A reusable React component for creating interactive headings with 3D tilt/parallax effects using Framer Motion.

## Features

- ✨ **3D Tilt Effects**: Smooth 3D rotation on hover with customizable tilt values
- 🎯 **Semantic HTML**: Uses proper heading elements (h1-h6) for accessibility
- ♿ **Accessibility First**: Respects user's reduced motion preferences
- 🎨 **Fully Customizable**: Custom styling, animations, and tilt values
- 📱 **Responsive**: Works great on all device sizes
- ⚡ **Performance Optimized**: GPU-accelerated animations with minimal reflow

## Basic Usage

```tsx
import { LiquidTitle } from './components/LiquidTitle';

// Basic usage
<LiquidTitle as="h1" className="text-4xl font-bold">
  Welcome to LiquidUI
</LiquidTitle>

// Custom tilt values
<LiquidTitle as="h2" tiltX={10} tiltY={-8}>
  Custom Tilt Title
</LiquidTitle>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h1'` | The heading level to render |
| `children` | `React.ReactNode` | - | Content to render inside the title |
| `enableTilt` | `boolean` | `true` | Enable or disable the 3D tilt effect |
| `tiltX` | `number` | `8` | X-axis rotation value in degrees |
| `tiltY` | `number` | `-6` | Y-axis rotation value in degrees |
| `className` | `string` | `''` | Additional CSS classes |
| `customHoverAnimation` | `TargetAndTransition` | - | Custom hover animation (overrides tilt) |

All other props from Framer Motion's `motion` components are also supported (except `whileHover`).

## Pre-configured Variants

Use the `LiquidTitleVariants` object for common configurations:

```tsx
import { LiquidTitle, LiquidTitleVariants } from './components/LiquidTitle';

// Hero title with strong tilt effect
<LiquidTitle {...LiquidTitleVariants.hero}>
  Hero Title
</LiquidTitle>

// Section title with moderate tilt
<LiquidTitle {...LiquidTitleVariants.section}>
  Section Title
</LiquidTitle>

// Subtle title with minimal tilt
<LiquidTitle {...LiquidTitleVariants.subtle}>
  Subtle Title
</LiquidTitle>

// Static title with no tilt (accessibility)
<LiquidTitle {...LiquidTitleVariants.static}>
  Static Title
</LiquidTitle>
```

### Available Variants

- **`hero`**: Strong tilt effect (12°, -8°) for hero sections
- **`section`**: Moderate tilt effect (6°, -4°) for section headings
- **`subtle`**: Minimal tilt effect (4°, -2°) for subtle interactions
- **`static`**: No tilt effect for accessibility compliance

## Quick Access Components

For convenience, you can use the pre-built heading components:

```tsx
import { LiquidH1, LiquidH2, LiquidH3, LiquidH4, LiquidH5, LiquidH6 } from './components/LiquidTitle';

<LiquidH1>Main Title</LiquidH1>
<LiquidH2>Section Title</LiquidH2>
<LiquidH3>Subsection Title</LiquidH3>
```

## Advanced Usage

### Custom Animations

Override the default tilt with custom hover animations:

```tsx
<LiquidTitle
  customHoverAnimation={{
    scale: 1.05,
    rotateZ: 5,
    transition: { duration: 0.2 }
  }}
>
  Custom Animation
</LiquidTitle>
```

### Accessibility

The component automatically respects the user's motion preferences:

```tsx
// This will automatically disable tilt for users with reduced motion preference
<LiquidTitle as="h1">
  Accessible Title
</LiquidTitle>

// Or explicitly disable tilt
<LiquidTitle enableTilt={false}>
  Always Static Title
</LiquidTitle>
```

### Combining with Framer Motion

Use with other Framer Motion properties:

```tsx
<LiquidTitle
  as="h1"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
  className="text-6xl font-bold"
>
  Animated Entry Title
</LiquidTitle>
```

## Styling

The component includes built-in CSS classes for enhanced styling:

- `.liquid-title`: Base class with 3D transforms and perspective
- `.liquid-title--hero`: Enhanced effects for hero titles
- `.liquid-title--subtle`: Minimal effects for subtle titles
- `.liquid-title--static`: No 3D effects for accessibility

You can also add custom styles:

```css
.my-custom-title {
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

```tsx
<LiquidTitle className="my-custom-title">
  Gradient Title
</LiquidTitle>
```

## Performance Considerations

- The component uses GPU acceleration for smooth animations
- Animations are automatically disabled for users with reduced motion preferences
- Transform properties are optimized to minimize layout thrashing
- Uses `will-change` property for optimal rendering performance

## Browser Support

- Modern browsers with CSS 3D transforms support
- Graceful fallback for older browsers (static text without effects)
- Tested on Chrome, Firefox, Safari, and Edge

## Examples

### Hero Section

```tsx
<LiquidTitle
  {...LiquidTitleVariants.hero}
  className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
>
  Welcome to the Future
</LiquidTitle>
```

### Section Headings

```tsx
<LiquidH2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
  Features
</LiquidH2>
```

### Interactive Menu Items

```tsx
<LiquidTitle
  as="h3"
  tiltX={4}
  tiltY={-3}
  className="text-xl font-medium hover:text-blue-600 transition-colors"
>
  Navigation Item
</LiquidTitle>
```

## Migration from Regular Headings

Replace existing motion headings:

```tsx
// Before
<motion.h1
  className="text-4xl font-bold"
  whileHover={{ rotateX: 8, rotateY: -6 }}
>
  Title
</motion.h1>

// After
<LiquidTitle as="h1" className="text-4xl font-bold">
  Title
</LiquidTitle>
```

## Contributing

When contributing to the LiquidTitle component:

1. Ensure TypeScript types are properly defined
2. Test accessibility with screen readers
3. Verify performance on lower-end devices
4. Check behavior with reduced motion preferences
5. Update documentation for any new features

## License

This component is part of the LiquidUI library and follows the same license terms.
