import { Callout } from 'nextra/components'

# GlassTable

<Callout type="warning">
  **Component Availability Notice**: This component is documented but may not be available in the current version of the Liquidify package. Please check the [Component Availability Matrix](/COMPONENT_AVAILABILITY.md) for the most up-to-date information about which components are actually exported and usable.
</Callout>

A data table component with sorting, filtering, and pagination using Apple's Human Interface Guidelines and Liquid Glass aesthetics.

## Overview

The GlassTable component provides advanced functionality with sophisticated Liquid Glass effects, smooth animations, and adaptive theming that maintains Apple's design consistency across all platforms.

## Anatomy

- **Container**: Liquid Glass structure with advanced visual effects
- **Interactive Elements**: Touch-optimized controls with haptic feedback
- **Content Area**: Flexible container for dynamic content
- **Feedback Systems**: Visual and haptic response indicators

## States

### Default State

Clean, minimalistic appearance with Liquid Glass styling.

### Interactive States

- **Hover**: Enhanced glow and subtle scale effects
- **Focus**: Apple HIG focus indicators with rim lighting
- **Active**: Liquid dynamics with haptic feedback simulation
- **Disabled**: Reduced opacity maintaining glass aesthetics

### Responsive Behavior

Adapts to different screen sizes and orientations while maintaining optimal usability.

## Usage Guidelines

### When to Use

- Modern, interactive user interfaces
- Data visualization and input scenarios
- Applications requiring sophisticated visual feedback

### When Not to Use

- Simple static content display
- Applications with strict performance constraints

## Accessibility

### Voice Control

Properly labeled for voice commands and navigation.

### Keyboard Navigation

- Tab: Navigate between interactive elements
- Arrow keys: Navigate within component
- Enter/Space: Activate primary actions
- Escape: Close or cancel actions

### Screen Reader Support

- Proper ARIA labels and descriptions
- State announcements for dynamic changes
- Hierarchical content structure

### High Contrast Mode

Enhanced borders and focus indicators with adaptive contrast.

### Reduced Motion

Respects user preferences with simplified animations while maintaining glass aesthetics.

## API Reference

### Props

| Prop         | Type            | Default | Description        |
| ------------ | --------------- | ------- | ------------------ |
| `data`       | `TableRow[]`    | `[]`    | Table data         |
| `columns`    | `TableColumn[]` | `[]`    | Column definitions |
| `sortable`   | `boolean`       | `true`  | Enable sorting     |
| `filterable` | `boolean`       | `false` | Enable filtering   |
| `pagination` | `boolean`       | `false` | Enable pagination  |
| `pageSize`   | `number`        | `10`    | Rows per page      |

### Events

| Event      | Type                          | Description                         |
| ---------- | ----------------------------- | ----------------------------------- |
| `onChange` | `(value: any) => void`        | Fired when component value changes  |
| `onFocus`  | `(event: FocusEvent) => void` | Fired when component receives focus |
| `onBlur`   | `(event: FocusEvent) => void` | Fired when component loses focus    |

## Code Examples

### Basic Usage

```tsx
import { GlassTable } from 'liquidify';

export default function Example() {
  return (
    <GlassTable
    // Add basic props here
    />
  );
}
```

### Basic Table

```tsx
import { GlassTable } from 'liquidify';

export default function BasicTableExample() {
  // Simple data table
  return (
    <GlassTable
    // Add props for basic table
    />
  );
}
```

### Sortable Table

```tsx
import { GlassTable } from 'liquidify';

export default function SortableTableExample() {
  // Table with sorting
  return (
    <GlassTable
    // Add props for sortable table
    />
  );
}
```

### Paginated Table

```tsx
import { GlassTable } from 'liquidify';

export default function PaginatedTableExample() {
  // Table with pagination
  return (
    <GlassTable
    // Add props for paginated table
    />
  );
}
```

## Interactive Playground

[Live interactive component demonstration would go here]

## Design Tokens

### Colors

- `--glass-table-background`: Liquid Glass background with blur
- `--glass-table-border`: Border color with glass refraction
- `--glass-table-accent`: Accent color for highlights

### Typography

- Primary: 16px SF Pro Text Regular
- Secondary: 14px SF Pro Text Regular
- Captions: 12px SF Pro Text Regular

### Spacing

- Padding: 16px default, responsive scaling
- Margins: 8px standard spacing unit
- Border radius: 12px with glass morphing

### Motion

- Transitions: Apple spring curve (0.3s)
- Hover effects: 200ms ease-out
- Focus animations: Apple spring curve with rim lighting

### Effects

- **Liquid Glass Blur**: Multi-layer blur with vibrancy
- **Dynamic Shadows**: Adaptive shadow casting
- **Rim Lighting**: Subtle glow effects on interaction
- **Haptic Feedback**: Simulated tactile responses

## Platform Considerations

### iOS/iPadOS

- Haptic feedback on interactions
- Dynamic Type support
- Safe area awareness
- Context menu integration

### macOS

- Hover states for mouse interactions
- Keyboard shortcuts
- Window vibrancy effects
- Menu bar integration

### watchOS

- Simplified appearance for smaller screens
- Digital Crown support
- Optimized touch targets
- Reduced complexity

## Related Components

- [GlassButton](/components/actions/glass-button) - For action triggers
- [GlassCard](/components/containment/glass-card) - For content containers
- [GlassModal](/components/containment/glass-modal) - For overlay content

## Resources

- [Apple HIG Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Liquid Glass Guidelines](/design-system/liquid-glass)
- [Animation Principles](/design-system/animation)
- [Accessibility Documentation](/accessibility)

---

_This component follows Apple's Human Interface Guidelines and implements the Liquid Glass design language introduced at WWDC 2025._
