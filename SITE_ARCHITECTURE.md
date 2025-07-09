# Liquidify Documentation Site Architecture (Nextra 5.0 Compatible)

## Complete Site Structure (65+ Pages) - App Router

### Nextra 5.0 App Router Structure

Using Nextra's new App Router support with MDX pages and proper navigation.

```
app/
├── layout.tsx (Root layout with Nextra theme)
├── page.mdx (Homepage - Welcome to Liquidify)
├── globals.css (Global styles with Liquidify theme)
└── [documentation sections...]
```

### Core Documentation Categories

#### 1. Getting Started (5 pages)

```
app/getting-started/
├── page.mdx (Installation & Quick Start)
├── installation/
│   └── page.mdx (Detailed Installation Guide)
├── quick-start/
│   └── page.mdx (5-minute Setup Tutorial)
├── migration/
│   └── page.mdx (Migration from v0.x)
└── troubleshooting/
    └── page.mdx (Common Issues & Solutions)
```

#### 2. Design System (8 pages)

```
app/design-system/
├── page.mdx (Design System Overview)
├── design-tokens/
│   └── page.mdx (Complete Token Reference)
├── colors/
│   └── page.mdx (Apple System Colors + Liquidify Palette)
├── typography/
│   └── page.mdx (SF Pro Display/Text + Typography Scale)
├── spacing/
│   └── page.mdx (4pt Grid System + Layout)
├── icons/
│   └── page.mdx (SF Symbols + Lucide Integration)
├── liquid-glass/
│   └── page.mdx (Liquid Glass Material Specifications)
└── animations/
    └── page.mdx (GSAP + Motion Principles)
```

#### 3. Components (38 pages) ✅ Partially Implemented

```
app/components/
├── page.mdx ✅ (Components Overview)
├── actions/
│   ├── page.mdx (Actions Category Overview)
│   ├── glass-button/
│   │   └── page.mdx ✅ (Implemented)
│   ├── glass-icon-button/
│   │   └── page.mdx
│   ├── glass-button-group/
│   │   └── page.mdx
│   ├── glass-toggle-button/
│   │   └── page.mdx
│   └── glass-floating-action/
│       └── page.mdx
├── inputs/
│   ├── page.mdx (Inputs Category Overview)
│   ├── glass-input/
│   │   └── page.mdx ✅ (Implemented)
│   ├── glass-textarea/
│   │   └── page.mdx
│   ├── glass-select/
│   │   └── page.mdx
│   ├── glass-checkbox/
│   │   └── page.mdx
│   ├── glass-switch/
│   │   └── page.mdx
│   ├── glass-slider/
│   │   └── page.mdx
│   └── glass-search/
│       └── page.mdx
├── containment/
│   ├── page.mdx (Containment Category Overview)
│   ├── glass-card/
│   │   └── page.mdx ✅ (Implemented)
│   ├── glass-modal/
│   │   └── page.mdx
│   ├── glass-popover/
│   │   └── page.mdx
│   └── glass-command/
│       └── page.mdx
├── navigation/
│   ├── page.mdx (Navigation Category Overview)
│   ├── glass-navbar/
│   │   └── page.mdx
│   ├── glass-sidebar/
│   │   └── page.mdx
│   ├── glass-tabs/
│   │   └── page.mdx
│   └── glass-mobile-nav/
│       └── page.mdx
├── presentation/
│   ├── page.mdx (Presentation Category Overview)
│   ├── glass-avatar/
│   │   └── page.mdx
│   ├── glass-badge/
│   │   └── page.mdx
│   ├── glass-chart/
│   │   └── page.mdx
│   ├── glass-loading/
│   │   └── page.mdx
│   ├── glass-notification/
│   │   └── page.mdx
│   ├── glass-toast/
│   │   └── page.mdx
│   └── glass-tooltip/
│       └── page.mdx
├── data/
│   ├── page.mdx (Data Category Overview)
│   ├── glass-table/
│   │   └── page.mdx
│   └── glass-progress/
│       └── page.mdx
└── layout/
    ├── page.mdx (Layout Category Overview)
    ├── glass-header/
    │   └── page.mdx
    ├── glass-footer/
    │   └── page.mdx
    ├── glass-responsive-button/
    │   └── page.mdx
    └── glass-responsive-card/
        └── page.mdx
```

#### 4. Hooks & Utilities (7 pages)

```
app/hooks/
├── page.mdx (Hooks Overview)
├── use-liquid-glass/
│   └── page.mdx (Core Glass Logic)
├── use-mobile/
│   └── page.mdx (Mobile Detection)
├── use-performance-monitor/
│   └── page.mdx (Performance Tracking)
├── use-theme/
│   └── page.mdx (Theme Management)
├── use-toast/
│   └── page.mdx (Toast Notifications)
└── utilities/
    └── page.mdx (Helper Functions)
```

#### 5. Examples & Patterns (5 pages)

```
app/examples/
├── page.mdx (Examples Overview)
├── forms/
│   └── page.mdx (Form Patterns)
├── dashboards/
│   └── page.mdx (Dashboard Layouts)
├── authentication/
│   └── page.mdx (Auth Flows)
└── e-commerce/
    └── page.mdx (Shopping Patterns)
```

#### 6. Apple HIG Integration (4 pages)

```
app/apple-hig/
├── page.mdx (Apple HIG Overview)
├── accessibility/
│   └── page.mdx (Accessibility Standards)
├── platform-guidelines/
│   └── page.mdx (iOS/macOS/watchOS)
└── sf-symbols/
    └── page.mdx (SF Symbols Usage)
```

#### 7. Developer Resources (3 pages)

```
app/developers/
├── page.mdx (Developer Overview)
├── api-reference/
│   └── page.mdx (Complete API Docs)
└── contributing/
    └── page.mdx (Contribution Guide)
```

## Nextra 5.0 Navigation Configuration

### Root Layout Structure

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='nextra-docs' suppressHydrationWarning>
      <body>
        <NextraProvider>{children}</NextraProvider>
      </body>
    </html>
  );
}
```

### Navigation Metadata (Nextra 5.0 Pattern)

Nextra 5.0 with App Router uses file-based routing with automatic navigation generation based on:

1. Folder structure
2. `page.mdx` files
3. Optional navigation configuration in `layout.tsx` or configuration files

### Page Template Structure (MDX)

Each component page follows this structure:

````mdx
# Component Name

Brief description with key features.

## Overview

Component introduction and use cases.

## Features

- Feature 1
- Feature 2
- etc.

## Installation

```bash
npm install liquidify
```
````

## Basic Usage

```tsx
import { ComponentName } from 'liquidify';

export default function Example() {
  return <ComponentName />;
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |

## Examples

### Basic Example

### Advanced Example

## Accessibility

VoiceOver, Voice Control, Keyboard navigation details.

## Apple HIG Compliance

Platform-specific considerations.

## Related Components

Links to related components.

```

## Technical Implementation Details

### Nextra 5.0 Features Used
- **App Router Support**: Native Next.js 13+ App Router
- **MDX Pages**: `.mdx` files as pages
- **Automatic Navigation**: File-based routing
- **Search Integration**: Built-in search with codeblocks disabled
- **LaTeX Support**: Mathematical expressions
- **Theme Customization**: Custom CSS and components

### File Naming Conventions
- **Pages**: `page.mdx` (required for Nextra 5.0 App Router)
- **Layouts**: `layout.tsx` (standard Next.js App Router)
- **Styles**: `globals.css` (global styles)
- **Components**: React components in `/components` directory

### Content Organization
- **Hierarchical Structure**: Logical category grouping
- **Apple HIG Patterns**: Following Apple's information architecture
- **Progressive Disclosure**: Basic to advanced examples
- **Cross-references**: Related component linking

## Migration from Pages Router
The existing Pages Router structure will be fully migrated to App Router:
- Move all `.mdx` files to appropriate App Router structure
- Update navigation configuration
- Migrate `_meta.json` files to App Router navigation patterns
- Update imports and component references

## Total Page Count: 70+ Pages
- Root: 1 page (homepage)
- Getting Started: 5 pages
- Design System: 8 pages
- Components: 38 pages (7 categories + 31 components)
- Hooks: 7 pages
- Examples: 5 pages
- Apple HIG: 4 pages
- Developers: 3 pages

This architecture is fully compatible with Nextra 5.0's App Router support and provides comprehensive coverage following Apple Human Interface Guidelines.
```
