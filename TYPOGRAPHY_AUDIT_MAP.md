# Typography Audit & Replacement Map

## Overview
This document provides a comprehensive map of all typography-related CSS classes, selectors, and their source files across the LiqUIdify documentation codebase. This audit ensures deterministic replacement without breaking existing functionality.

## 📋 Core Typography System Analysis

### Base HTML Elements (Global Styles)
**Source File:** `/styles/globals.css` (Lines 27-121)

| Element | Current Classes/Styles | Font Properties | Location |
|---------|----------------------|-----------------|----------|
| `h1` | `@apply font-display font-bold tracking-tight` | `clamp(2.5rem, 6vw, 5rem)`, -0.02em tracking | Lines 27-41 |
| `h2` | `@apply font-display font-bold tracking-tight` | `clamp(2rem, 5vw, 3.5rem)`, -0.015em tracking | Lines 43-56 |
| `h3` | `@apply font-heading font-semibold tracking-tight` | `var(--text-3xl)`, `var(--leading-snug)` | Lines 58-65 |
| `h4` | `@apply font-heading font-semibold tracking-tight` | `var(--text-2xl)`, `var(--leading-snug)` | Lines 67-74 |
| `h5` | `@apply font-heading font-medium tracking-tight` | `var(--text-xl)`, `var(--leading-normal)` | Lines 76-83 |
| `h6` | `@apply font-heading font-medium tracking-tight` | `var(--text-lg)`, `var(--leading-normal)` | Lines 85-92 |
| `p` | Basic paragraph styles | `var(--text-base)`, `var(--leading-relaxed)` | Lines 94-101 |
| `a` | Link styles with hover states | Weight 500, primary color | Lines 104-116 |

### CSS Custom Properties (Typography Variables)
**Source File:** `/styles/globals.css` (Lines 156-178)

```css
/* Typography Variables */
--font-heading: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
--font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
--font-mono: "JetBrains Mono", "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace;

/* Typography Scale */
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-3xl: 1.875rem;
--text-4xl: 2.25rem;
--text-5xl: 3rem;
--text-6xl: 3.75rem;

/* Line Heights */
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

## 🎨 Semantic Typography Classes

### Hero Text Classes
**Primary Sources:** `/styles/globals.css`, `/components/HeroSection.tsx`, `/pages/index.mdx`

| Class | Properties | Usage Locations | Lines |
|-------|------------|----------------|-------|
| `.hero-text` | Font display, weight 800, tight tracking | `/styles/globals.css` | 460-479, 1203-1215 |
| | clamp sizing, performance optimizations | `/components/HeroSection.tsx` | 123, 128, 131 |
| | Inline styles with gradient effects | `/pages/index.mdx` | 57-99, 398-404 |

### Body Text Classes
**Primary Sources:** `/styles/globals.css`, Multiple components

| Class | Properties | Usage Locations | Lines |
|-------|------------|----------------|-------|
| `.body-text` | Inter font, relaxed leading, -0.005em tracking | `/styles/globals.css` | 481-488, 1217-1228 |
| | Weight 400, performance features | `/theme.config.tsx` | 74, 121, 132, 149, 160, 171 |
| | Components usage | `/components/HeroSection.tsx` | 138, 189, 205, 210 |

### Subtitle and Caption Classes
**Primary Sources:** `/styles/globals.css`, Various components

| Class | Properties | Usage Locations | Lines |
|-------|------------|----------------|-------|
| `.subtitle-text` | Weight 500, normal leading, xl size | `/styles/globals.css` | 490-497 |
| | Muted foreground color | `/components/HeroSection.tsx` | 186, 207 |
| `.caption-text` | Weight 500, sm size, uppercase, tracking | `/styles/globals.css` | 499-506 |
| | Muted foreground, letter-spacing 0.025em | `/components/HeroSection.tsx` | 103, 210 |

## 🏗️ Tailwind Typography Configuration

### Font Family Definitions
**Source File:** `/tailwind.config.js` (Lines 88-94)

```javascript
fontFamily: {
    sans: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'system-ui', 'sans-serif'],
    mono: ['SF Mono', 'JetBrains Mono', 'Consolas', 'monospace'],
    heading: ['SF Pro Display', 'Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
    display: ['Satoshi', 'Cal Sans', 'SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
    body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
}
```

### Font Size Scale
**Source File:** `/tailwind.config.js` (Lines 95-118)

| Size Token | Value | Letter Spacing | Font Weight | Line Height |
|------------|-------|----------------|-------------|-------------|
| `h1` | 3rem | -0.025em | 800 | 1.1 |
| `h2` | 2.25rem | -0.02em | 700 | 1.2 |
| `h3` | 1.875rem | -0.015em | 600 | 1.25 |
| `h4` | 1.5rem | -0.01em | 600 | 1.3 |
| `h5` | 1.25rem | -0.005em | 500 | 1.4 |
| `h6` | 1.125rem | 0em | 500 | 1.4 |
| `hero-text` | clamp(2.5rem, 5vw, 4rem) | -0.03em | 800 | 1.1 |
| `body-text` | 1rem | -0.005em | 400 | 1.6 |
| `subtitle-text` | 1.25rem | -0.01em | 500 | 1.5 |
| `caption-text` | 0.875rem | 0.025em | 500 | 1.4 |

## 📱 Component-Specific Typography

### Hero Section Typography
**Source File:** `/components/HeroSection.tsx`

| Element | Classes | Inline Styles | Lines |
|---------|---------|---------------|-------|
| Version Badge | `caption-text` | N/A | 103 |
| Main Heading | `hero-text text-5xl sm:text-6xl lg:text-7xl font-extrabold` | Gradient effects | 123, 128-134 |
| Subtitle | `body-text text-lg sm:text-xl md:text-2xl text-pretty` | Font weight variations | 138-149 |
| Stats Numbers | `subtitle-text` | Blue color | 207 |
| Stats Labels | `caption-text` | Muted color | 210 |

### Index Page Typography
**Source File:** `/pages/index.mdx`

| Element | Classes/Styles | Properties | Lines |
|---------|----------------|------------|-------|
| Badge Text | `caption-text text-foreground` | N/A | 50 |
| Main H1 | `text-balance text-foreground critical-text` | Inline Satoshi font, complex styling | 57-99 |
| Subtitle P | `text-balance critical-text` | Inter font, complex inline styling | 104-117 |
| Button Text | `text-headline`, `text-body-emphasized` | Responsive sizing | 124, 133 |
| Feature Headings | `feature-heading` | Inline SF Pro Display styling | 148-161, 180-193, 212-225 |
| Feature Text | `critical-text` | Inter font, inline styling | 162-172, 194-204, 226-236 |

### Theme Configuration Typography
**Source File:** `/theme.config.tsx`

| Element | Classes | Properties | Lines |
|---------|---------|------------|-------|
| Logo Text | `text-xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-600 bg-clip-text text-transparent tracking-tight` | Gradient text | 22 |
| Navigation Links | `text-sm font-medium text-gray-700 dark:text-gray-300` | Hover states | 53 |
| Footer Text | `text-lg font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-600 bg-clip-text text-transparent hero-text` | Gradient hero text | 68 |
| Footer Links | `body-text` | Flex with icons | 74 |
| Sidebar Labels | `text-xs font-semibold text-gray-700 uppercase tracking-wider body-text` | Small caps | 121 |
| Sidebar Links | `body-text hover:text-blue-600` | Hover transitions | 132 |
| TOC Title | `text-sm font-semibold body-text` | Flex with icon | 149 |
| Edit Link | `text-sm body-text hover:text-blue-600` | Hover state | 160 |
| Feedback Text | `text-sm body-text hover:text-blue-600` | Hover state | 171 |
| Banner Text | `body-text` | Glass effect | 184 |

## 🎯 Utility Typography Classes

### Apple-Inspired Typography Utilities
**Source File:** `/styles/globals.css` (Lines 1472-1565)

| Class | Font Size | Font Weight | Line Height | Letter Spacing |
|-------|-----------|-------------|-------------|----------------|
| `.text-display-large` | clamp(4rem, 10vw, 8rem) | 800 | 0.9 | -0.04em |
| `.text-display-medium` | clamp(3rem, 8vw, 6rem) | 700 | 1.0 | -0.03em |
| `.text-title-large` | clamp(2rem, 5vw, 3.5rem) | 600 | 1.1 | -0.02em |
| `.text-headline` | clamp(1.5rem, 4vw, 2.25rem) | 600 | 1.2 | -0.01em |
| `.text-subheadline` | clamp(1.125rem, 2.5vw, 1.5rem) | 400 | 1.4 | N/A |
| `.text-body-emphasized` | clamp(1rem, 2vw, 1.125rem) | 500 | 1.5 | N/A |
| `.text-caption` | clamp(0.875rem, 1.5vw, 1rem) | 400 | 1.3 | N/A |

### Responsive Typography Utilities
**Source File:** `/styles/globals.css` (Lines 1451-1470)

| Class | Font Size | Line Height | Usage |
|-------|-----------|-------------|-------|
| `.text-h1` | clamp(2.5rem, 6vw, 4.5rem) | clamp(1.1, 1.2, 1.3) | Responsive H1 |
| `.text-h2` | clamp(2rem, 5vw, 3.5rem) | clamp(1.2, 1.3, 1.4) | Responsive H2 |
| `.text-subtitle` | clamp(1.125rem, 2.5vw, 1.5rem) | clamp(1.4, 1.5, 1.6) | Responsive subtitle |
| `.text-body-large` | clamp(1rem, 2vw, 1.25rem) | clamp(1.5, 1.6, 1.7) | Large body text |

### Text Effect Classes
**Source File:** `/styles/globals.css` (Lines 1533-1565)

| Class | Properties | Usage |
|-------|------------|-------|
| `.text-gradient-primary` | Blue to cyan to green gradient | Animated gradient text |
| `.text-gradient-premium` | Multi-color premium gradient | Premium gradient effects |
| `.text-shadow-soft` | Subtle shadow effects | Light text shadows |
| `.text-shadow-strong` | Strong shadow with glow | Heavy text shadows |
| `.text-glow` | Drop shadow glow effect | Glowing text |

## 🧩 Component Utility Typography

### ClassNames Utility File
**Source File:** `/components/utils/classNames.ts`

| Function | Parameters | Returns | Usage |
|----------|------------|---------|-------|
| `typography()` | variant: h1-h4, body, caption, label | Combined class string | Lines 72-87 |
| `performanceClasses` | Object with predefined classes | Performance-optimized classes | Lines 237-254 |

### Typography Variants in ClassNames
```typescript
const variants = {
    h1: "text-4xl font-bold tracking-tight",
    h2: "text-3xl font-semibold tracking-tight", 
    h3: "text-2xl font-semibold tracking-tight",
    h4: "text-xl font-semibold tracking-tight",
    body: "text-base",
    caption: "text-sm text-muted-foreground",
    label: "text-sm font-medium",
}
```

## 📄 MDX Components Typography

### MDX Components Configuration
**Source File:** `/mdx-components.tsx`

| Component | Enhanced Features | Lines |
|-----------|------------------|-------|
| `p`, `h1`, `h2`, `h3`, `li` | Emoji processing support | 46-81 |
| `code` | Enhanced inline code styling | 104-111 |
| `pre` | Enhanced code block styling | 95-101 |
| `blockquote` | Enhanced quote styling | 114-121 |

## 🎨 Component-Specific Classes in Practice

### Feature Cards (Multiple Files)
**Common Pattern Across Components:**

| Element | Class Pattern | Inline Styles |
|---------|---------------|---------------|
| Feature Heading | `text-xl font-bold text-center mb-3 feature-heading` | SF Pro Display, gradient text |
| Feature Text | `text-center critical-text` | Inter font, optimized rendering |
| Icon Container | `ios-logo apple-gradient-*` | Apple-style rounded square |

### Glass Components Typography
**Pattern Found in Multiple Glass Components:**

| Component Type | Text Classes | Font Properties |
|----------------|--------------|-----------------|
| Glass Buttons | Size variants: `text-sm`, `text-base`, `text-lg` | Weight 400-600 |
| Glass Cards | `text-base`, `text-sm` for content | Regular text hierarchy |
| Glass Headers | `text-lg`, `text-xl` for titles | Semi-bold weights |
| Glass Inputs | `text-sm`, `text-base` | Placeholder styling |

## 🔄 Critical Replacement Points

### High-Impact Replacement Areas
1. **Global Base Styles** - `/styles/globals.css` lines 27-121
2. **Tailwind Config** - `/tailwind.config.js` fontSize section
3. **Hero Components** - Multiple files with inline styles
4. **Theme Configuration** - `/theme.config.tsx` typography

### Safe Replacement Strategy
1. **Phase 1:** Update CSS custom properties (low risk)
2. **Phase 2:** Replace utility classes (medium risk) 
3. **Phase 3:** Update component inline styles (high risk)
4. **Phase 4:** Update Tailwind configuration (system-wide impact)

### Critical Dependencies
- Framer Motion animations rely on specific class combinations
- Performance optimizations depend on current class structure
- Responsive breakpoints are tied to current size scale
- Dark mode variants must be preserved

## 📍 File Summary by Typography Density

### High Typography Density Files
1. `/styles/globals.css` - 200+ typography-related lines
2. `/pages/index.mdx` - 100+ typography applications  
3. `/tailwind.config.js` - Complete typography system definition
4. `/components/HeroSection.tsx` - Complex responsive typography
5. `/theme.config.tsx` - Navigation and UI typography

### Medium Typography Density Files
- Component MDX files (`/pages/components/*.mdx`)
- Glass component files (`/liquidui-package/src/components/glass-*.tsx`)
- Utility components (`/components/*.tsx`)

### Low Typography Density Files
- Test files
- Configuration files
- Build output files

---

## 🚨 Critical Notes for Replacement

1. **Preserve Performance Classes:** Motion elements, hover optimizations, and performance-critical classes must be maintained
2. **Maintain Responsive Behavior:** All clamp() functions and responsive breakpoints are critical
3. **Keep Apple Design Language:** The Apple-inspired typography hierarchy is central to the design system
4. **Preserve Accessibility:** WCAG compliance depends on current contrast and sizing ratios
5. **Maintain Glass Effect Integration:** Typography integrates tightly with glassmorphism effects

This audit provides a complete map for systematic typography replacement while ensuring no functionality is broken during the process.
