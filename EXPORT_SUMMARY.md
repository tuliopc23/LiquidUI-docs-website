# Liquidify Component Library - Export Summary

## 🎯 Core Apple HIG Components

### Primary Component

```typescript
import { AppleLiquidGlass } from 'liquidify';
```

### Updated Glass Components (Apple HIG Compliant)

```typescript
import {
  GlassButton,
  GlassCard,
  GlassNavbar,
  GlassMenu,
  GlassIconButton,
  GlassFloatingAction,
  GlassNotification,
  GlassSidebar,
  GlassDatePicker,
  GlassFooter,
  GlassRadio,
} from 'liquidify';
```

## 🎨 Complete Component Library

### Actions Category

```typescript
import {
  GlassButton,
  GlassButtonGroup,
  GlassIconButton,
  GlassToggleButton,
  GlassFloatingAction,
} from 'liquidify';
```

### Navigation Category

```typescript
import {
  GlassNavbar,
  GlassSidebar,
  GlassBreadcrumb,
  GlassMenu,
  GlassPagination,
  GlassStepper,
} from 'liquidify';
```

### Inputs Category

```typescript
import { GlassDatePicker, GlassFileUpload, GlassRadio } from 'liquidify';
```

### Presentation Category

```typescript
import { GlassNotification, GlassToast, GlassChart } from 'liquidify';
```

### Layout Category

```typescript
import { GlassCard, GlassHeader, GlassFooter } from 'liquidify';
```

### Containment Category

```typescript
import { GlassCommand } from 'liquidify';
```

## 🎭 Demo & Animation Components

```typescript
import {
  AnimationDemo,
  PageTransition,
  LiquidifyInteractiveDemo,
  SimpleShowcase,
} from 'liquidify';
```

## ⚡ Performance & Animation Utilities

```typescript
import {
  performanceUtils,
  usePerformanceOptimization,

  // Enhanced animations
  microInteractions,
  hapticFeedback,
  magneticHover,
  scrollAnimations,
  springAnimations,

  // Liquid glass animations
  liquidGlassAnimations,
  glassDistortion,
  glassTransitions,
} from 'liquidify';
```

## 🎨 Apple HIG Design System

```typescript
import {
  // Apple HIG utilities
  appleDesignSystem,
  appleHIGSystem,

  // Common utilities
  cn, // Tailwind className utility
} from 'liquidify';
```

## 📝 TypeScript Types

### Core Types

```typescript
import type {
  AppleLiquidGlassProps,
  GlassEffectProps, // Legacy
} from 'liquidify';
```

### Component Types

```typescript
import type {
  GlassButtonProps,
  GlassCardProps,
  GlassNavbarProps,
  GlassMenuProps,
  GlassIconButtonProps,
  GlassFloatingActionProps,
  GlassNotificationProps,
  GlassSidebarProps,
  GlassDatePickerProps,
  GlassFooterProps,
  GlassRadioProps,
  // ... and all other component props
} from 'liquidify';
```

## 🎯 Apple HIG Features

### Prominence Levels

- `primary` - Most prominent elements
- `secondary` - Secondary elements (default)
- `tertiary` - Subtle elements
- `quaternary` - Minimal elements

### Intensity Levels

- `ultraThin` - 4px blur
- `thin` - 8px blur
- `regular` - 12px blur (default)
- `thick` - 16px blur
- `ultraThick` - 24px blur

### Size System

- `xs` - Extra small (8px padding)
- `sm` - Small (12px padding)
- `md` - Medium (16px padding) - default
- `lg` - Large (24px padding)
- `xl` - Extra large (32px padding)
- `2xl` - Double extra large (40px padding)

### Variants

- `card` - Standard card with 24px corner radius
- `button` - Interactive button with 16px corner radius
- `widget` - Widget with 12px corner radius
- `navigation` - Navigation elements
- `modal` - Modal dialogs
- `toolbar` - Toolbar elements
- `panel` - Panel containers
- `sidebar` - Sidebar navigation

## 🚀 Usage Examples

### Basic Usage

```typescript
import { AppleLiquidGlass } from 'liquidify';

<AppleLiquidGlass
  variant="card"
  size="md"
  prominence="secondary"
  intensity="regular"
  interactive={true}
  magnetic={true}
  glow={true}
>
  Your content here
</AppleLiquidGlass>
```

### Button Usage

```typescript
import { GlassButton } from 'liquidify';

<GlassButton
  variant="primary"
  size="md"
  onClick={handleClick}
>
  Click me
</GlassButton>
```

### Performance Usage

```typescript
import { usePerformanceOptimization } from 'liquidify';

const { optimizeElement, capabilities } = usePerformanceOptimization();

// Optimize an element for liquid glass effects
optimizeElement(elementRef.current, 'medium');
```

## 🔄 Backward Compatibility

All legacy components are still available and maintain their original API:

- `GlassEffect` - Legacy glass effect component
- All existing component props and functionality preserved
- Gradual migration path available

## 🎉 New Features

- ✅ Apple Human Interface Guidelines compliance
- ✅ Hardware-accelerated animations
- ✅ Performance optimization utilities
- ✅ Enhanced accessibility support
- ✅ Responsive design system
- ✅ TypeScript-first development
- ✅ Modern CSS architecture with Tailwind v4
