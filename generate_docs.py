#!/usr/bin/env python3

import os

# Define the remaining components to document
components = {
    # Advanced Components
    'GlassSearch': {
        'category': 'Advanced',
        'description': 'A sophisticated search component with real-time filtering, auto-complete, and search history using Apple\'s Human Interface Guidelines and Liquid Glass aesthetics.',
        'props': [
            ('query', 'string', 'undefined', 'Current search query'),
            ('placeholder', 'string', "'Search...'", 'Placeholder text'),
            ('onSearch', '(query: string) => void', 'undefined', 'Callback when search is performed'),
            ('suggestions', 'string[]', '[]', 'Array of search suggestions'),
            ('showHistory', 'boolean', 'true', 'Show search history'),
            ('debounce', 'number', '300', 'Search debounce delay in ms')
        ],
        'examples': [
            ('Basic Search', 'GlassSearch with simple query handling'),
            ('With Suggestions', 'Search with auto-complete suggestions'),
            ('Advanced Search', 'Full-featured search with history and filters')
        ]
    },
    'GlassSelect': {
        'category': 'Advanced',
        'description': 'A select component with search functionality, grouping, and multiple selection capabilities using Apple\'s Human Interface Guidelines and Liquid Glass aesthetics.',
        'props': [
            ('options', 'SelectOption[]', '[]', 'Array of selectable options'),
            ('value', 'string | string[]', 'undefined', 'Selected value(s)'),
            ('multiple', 'boolean', 'false', 'Allow multiple selections'),
            ('searchable', 'boolean', 'false', 'Enable search functionality'),
            ('groupBy', 'string', 'undefined', 'Group options by property'),
            ('placeholder', 'string', "'Select...'", 'Placeholder text')
        ],
        'examples': [
            ('Basic Select', 'Simple single selection'),
            ('Multiple Select', 'Multiple selection with chips'),
            ('Searchable Select', 'Select with search functionality')
        ]
    },
    'GlassSlider': {
        'category': 'Advanced',
        'description': 'A range slider component with dual handles, step increments, and visual feedback using Apple\'s Human Interface Guidelines and Liquid Glass aesthetics.',
        'props': [
            ('value', 'number | [number, number]', '0', 'Current slider value(s)'),
            ('min', 'number', '0', 'Minimum value'),
            ('max', 'number', '100', 'Maximum value'),
            ('step', 'number', '1', 'Step increment'),
            ('range', 'boolean', 'false', 'Enable range slider'),
            ('showTooltip', 'boolean', 'true', 'Show value tooltip')
        ],
        'examples': [
            ('Basic Slider', 'Simple value slider'),
            ('Range Slider', 'Dual handle range selection'),
            ('Stepped Slider', 'Slider with discrete steps')
        ]
    },
    'GlassSwitch': {
        'category': 'Advanced',
        'description': 'A toggle switch component with smooth animations and haptic feedback using Apple\'s Human Interface Guidelines and Liquid Glass aesthetics.',
        'props': [
            ('checked', 'boolean', 'false', 'Switch state'),
            ('disabled', 'boolean', 'false', 'Disable switch'),
            ('size', "'sm' | 'md' | 'lg'", "'md'", 'Switch size'),
            ('label', 'string', 'undefined', 'Label text'),
            ('description', 'string', 'undefined', 'Description text'),
            ('onChange', '(checked: boolean) => void', 'undefined', 'Change callback')
        ],
        'examples': [
            ('Basic Switch', 'Simple toggle switch'),
            ('Labeled Switch', 'Switch with label and description'),
            ('Disabled Switch', 'Non-interactive switch')
        ]
    },
    'GlassTable': {
        'category': 'Advanced',
        'description': 'A data table component with sorting, filtering, and pagination using Apple\'s Human Interface Guidelines and Liquid Glass aesthetics.',
        'props': [
            ('data', 'TableRow[]', '[]', 'Table data'),
            ('columns', 'TableColumn[]', '[]', 'Column definitions'),
            ('sortable', 'boolean', 'true', 'Enable sorting'),
            ('filterable', 'boolean', 'false', 'Enable filtering'),
            ('pagination', 'boolean', 'false', 'Enable pagination'),
            ('pageSize', 'number', '10', 'Rows per page')
        ],
        'examples': [
            ('Basic Table', 'Simple data table'),
            ('Sortable Table', 'Table with sorting'),
            ('Paginated Table', 'Table with pagination')
        ]
    },
    'GlassTextarea': {
        'category': 'Advanced',
        'description': 'A multi-line text input component with auto-resize and character counting using Apple\'s Human Interface Guidelines and Liquid Glass aesthetics.',
        'props': [
            ('value', 'string', 'undefined', 'Text value'),
            ('placeholder', 'string', 'undefined', 'Placeholder text'),
            ('rows', 'number', '3', 'Initial rows'),
            ('autoResize', 'boolean', 'true', 'Auto-resize height'),
            ('maxLength', 'number', 'undefined', 'Maximum character count'),
            ('showCount', 'boolean', 'false', 'Show character count')
        ],
        'examples': [
            ('Basic Textarea', 'Simple multi-line input'),
            ('Auto-resize Textarea', 'Textarea with auto-resize'),
            ('Character Counter', 'Textarea with character counting')
        ]
    },
    # Chart Components
    'BarChart': {
        'category': 'Chart',
        'description': 'A bar chart component with animations, tooltips, and responsive design using Apple\'s Human Interface Guidelines and Liquid Glass aesthetics.',
        'props': [
            ('data', 'ChartData[]', '[]', 'Chart data'),
            ('xAxis', 'string', 'undefined', 'X-axis property'),
            ('yAxis', 'string', 'undefined', 'Y-axis property'),
            ('animated', 'boolean', 'true', 'Enable animations'),
            ('showTooltip', 'boolean', 'true', 'Show tooltips'),
            ('color', 'string', 'primary', 'Bar color')
        ],
        'examples': [
            ('Basic Bar Chart', 'Simple bar chart'),
            ('Animated Bar Chart', 'Chart with animations'),
            ('Multi-series Bar Chart', 'Chart with multiple data series')
        ]
    },
    'DonutChart': {
        'category': 'Chart',
        'description': 'A donut chart component with interactive segments and center content using Apple\'s Human Interface Guidelines and Liquid Glass aesthetics.',
        'props': [
            ('data', 'ChartData[]', '[]', 'Chart data'),
            ('centerContent', 'React.ReactNode', 'undefined', 'Center content'),
            ('showLabels', 'boolean', 'true', 'Show segment labels'),
            ('interactive', 'boolean', 'true', 'Enable interactions'),
            ('colors', 'string[]', '[]', 'Custom colors'),
            ('size', "'sm' | 'md' | 'lg'", "'md'", 'Chart size')
        ],
        'examples': [
            ('Basic Donut Chart', 'Simple donut chart'),
            ('Interactive Donut Chart', 'Chart with interactions'),
            ('Custom Center Content', 'Chart with custom center')
        ]
    },
    'LineChart': {
        'category': 'Chart',
        'description': 'A line chart component with multiple series, zoom, and pan capabilities using Apple\'s Human Interface Guidelines and Liquid Glass aesthetics.',
        'props': [
            ('data', 'ChartData[]', '[]', 'Chart data'),
            ('series', 'ChartSeries[]', '[]', 'Data series'),
            ('showGrid', 'boolean', 'true', 'Show grid lines'),
            ('showDots', 'boolean', 'true', 'Show data points'),
            ('smooth', 'boolean', 'false', 'Smooth line curves'),
            ('zoomable', 'boolean', 'false', 'Enable zoom/pan')
        ],
        'examples': [
            ('Basic Line Chart', 'Simple line chart'),
            ('Multi-series Line Chart', 'Chart with multiple lines'),
            ('Smooth Line Chart', 'Chart with curved lines')
        ]
    },
    # System Components
    'CommandPalette': {
        'category': 'System',
        'description': 'A command palette component for quick actions and navigation using Apple\'s Human Interface Guidelines and Liquid Glass aesthetics.',
        'props': [
            ('commands', 'Command[]', '[]', 'Available commands'),
            ('isOpen', 'boolean', 'false', 'Palette visibility'),
            ('onSelect', '(command: Command) => void', 'undefined', 'Command selection callback'),
            ('placeholder', 'string', "'Type a command...'", 'Search placeholder'),
            ('shortcuts', 'boolean', 'true', 'Show keyboard shortcuts'),
            ('categories', 'string[]', '[]', 'Command categories')
        ],
        'examples': [
            ('Basic Command Palette', 'Simple command palette'),
            ('Categorized Commands', 'Commands grouped by category'),
            ('Keyboard Shortcuts', 'Commands with shortcuts')
        ]
    },
    'NotificationCenter': {
        'category': 'System',
        'description': 'A notification center component for managing alerts and messages using Apple\'s Human Interface Guidelines and Liquid Glass aesthetics.',
        'props': [
            ('notifications', 'Notification[]', '[]', 'Notification items'),
            ('position', "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'", "'top-right'", 'Position'),
            ('maxVisible', 'number', '5', 'Maximum visible notifications'),
            ('autoHide', 'boolean', 'true', 'Auto-hide notifications'),
            ('hideDelay', 'number', '5000', 'Auto-hide delay in ms'),
            ('groupByType', 'boolean', 'false', 'Group by notification type')
        ],
        'examples': [
            ('Basic Notifications', 'Simple notification display'),
            ('Grouped Notifications', 'Notifications grouped by type'),
            ('Interactive Notifications', 'Notifications with actions')
        ]
    },
    'ComponentShowcase': {
        'category': 'System',
        'description': 'A showcase component for demonstrating other components with code examples using Apple\'s Human Interface Guidelines and Liquid Glass aesthetics.',
        'props': [
            ('component', 'React.ComponentType', 'undefined', 'Component to showcase'),
            ('props', 'object', '{}', 'Props for the component'),
            ('showCode', 'boolean', 'true', 'Show code example'),
            ('codeLanguage', 'string', "'tsx'", 'Code language'),
            ('variants', 'ShowcaseVariant[]', '[]', 'Component variants'),
            ('interactive', 'boolean', 'true', 'Enable interactive mode')
        ],
        'examples': [
            ('Basic Showcase', 'Simple component showcase'),
            ('Multi-variant Showcase', 'Showcase with variants'),
            ('Interactive Showcase', 'Showcase with live editing')
        ]
    }
}

def generate_component_doc(name, config):
    """Generate documentation for a single component"""
    
    template = f"""import {{ Callout }} from 'nextra/components'

# {name}

<Callout type="warning">
  **Component Availability Notice**: This component is documented but may not be available in the current version of the Liquidify package. Please check the [Component Availability Matrix](/COMPONENT_AVAILABILITY.md) for the most up-to-date information about which components are actually exported and usable.
</Callout>

{config['description']}

## Overview

The {name} component provides advanced functionality with sophisticated Liquid Glass effects, smooth animations, and adaptive theming that maintains Apple's design consistency across all platforms.

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

| Prop | Type | Default | Description |
|------|------|---------|-------------|"""

    # Add props table
    for prop_name, prop_type, default, description in config['props']:
        template += f"\n| `{prop_name}` | `{prop_type}` | `{default}` | {description} |"

    template += f"""

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onChange` | `(value: any) => void` | Fired when component value changes |
| `onFocus` | `(event: FocusEvent) => void` | Fired when component receives focus |
| `onBlur` | `(event: FocusEvent) => void` | Fired when component loses focus |

## Code Examples

### Basic Usage

```tsx
import {{ {name} }} from 'liquidify'

export default function Example() {{
  return (
    <{name} 
      // Add basic props here
    />
  )
}}
```
"""

    # Add additional examples
    for example_name, example_desc in config['examples']:
        template += f"""
### {example_name}

```tsx
import {{ {name} }} from 'liquidify'

export default function {example_name.replace(' ', '')}Example() {{
  // {example_desc}
  return (
    <{name} 
      // Add props for {example_name.lower()}
    />
  )
}}
```
"""

    template += f"""
## Interactive Playground

[Live interactive component demonstration would go here]

## Design Tokens

### Colors
- `--glass-{name.lower().replace('glass', '')}-background`: Liquid Glass background with blur
- `--glass-{name.lower().replace('glass', '')}-border`: Border color with glass refraction
- `--glass-{name.lower().replace('glass', '')}-accent`: Accent color for highlights

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

*This component follows Apple's Human Interface Guidelines and implements the Liquid Glass design language introduced at WWDC 2025.*
"""

    return template

# Generate all component documentation files
for component_name, config in components.items():
    doc_content = generate_component_doc(component_name, config)
    
    # Write to file
    filename = f"docs/{component_name}.md"
    with open(filename, 'w') as f:
        f.write(doc_content)
    
    print(f"Generated documentation for {component_name}")

print(f"Successfully generated documentation for {len(components)} components!")
