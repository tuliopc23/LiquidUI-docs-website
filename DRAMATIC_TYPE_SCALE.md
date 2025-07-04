# Dramatic Fluid Type Scale

A complete type system designed for modern, high-impact interfaces with fluid sizing, bold weights, and tighter letter-spacing.

## Display Type Scale

### CSS Custom Properties
```css
--display-5xl: clamp(4rem, 10vw, 8rem);      /* 64px - 128px */
--display-4xl: clamp(3.5rem, 8.5vw, 6.5rem); /* 56px - 104px */
--display-3xl: clamp(3rem, 7vw, 5rem);       /* 48px - 80px */
--display-2xl: clamp(2.5rem, 6vw, 4rem);     /* 40px - 64px */
--display-xl: clamp(2rem, 5vw, 3.25rem);     /* 32px - 52px */
--display-lg: clamp(1.75rem, 4vw, 2.75rem);  /* 28px - 44px */
--display-md: clamp(1.5rem, 3.5vw, 2.25rem); /* 24px - 36px */
--display-sm: clamp(1.25rem, 3vw, 1.875rem); /* 20px - 30px */
```

### Tailwind Classes
```html
<!-- Ultra-large display text -->
<h1 class="text-display-5xl">Revolutionary Design</h1>

<!-- Large hero text -->
<h1 class="text-display-4xl">Game-Changing Features</h1>

<!-- Medium hero text -->
<h1 class="text-display-3xl">Premium Quality</h1>

<!-- Section headers -->
<h2 class="text-display-2xl">Built for Performance</h2>

<!-- Subsection headers -->
<h2 class="text-display-xl">Seamless Integration</h2>
```

### Typography Characteristics
- **Font Weight**: 700-900 (Bold to Black)
- **Letter Spacing**: -0.06em to -0.015em (Tighter)
- **Line Height**: 0.9 to 1.2 (Compact)
- **Fluid Sizing**: Responsive between mobile and desktop

## Subtitle Type Scale

### CSS Custom Properties
```css
--subtitle-2xl: clamp(1.375rem, 3vw, 1.75rem);   /* 22px - 28px */
--subtitle-xl: clamp(1.25rem, 2.5vw, 1.5rem);    /* 20px - 24px */
--subtitle-lg: clamp(1.125rem, 2vw, 1.375rem);   /* 18px - 22px */
--subtitle-md: clamp(1rem, 1.5vw, 1.25rem);      /* 16px - 20px */
--subtitle-sm: clamp(0.875rem, 1.25vw, 1.125rem); /* 14px - 18px */
```

### Tailwind Classes
```html
<!-- Large subtitles for hero sections -->
<p class="text-subtitle-2xl">The future of digital experiences</p>

<!-- Standard subtitles -->
<p class="text-subtitle-xl">Designed with precision and care</p>

<!-- Smaller subtitles -->
<p class="text-subtitle-lg">Every detail matters</p>
```

### Typography Characteristics
- **Font Weight**: 500-600 (Medium to Semibold)
- **Letter Spacing**: -0.01em (Slightly tight)
- **Line Height**: 1.3 to 1.5 (Balanced)

## Body Type Scale

### CSS Custom Properties
```css
--body-2xl: clamp(1.125rem, 2vw, 1.375rem);     /* 18px - 22px */
--body-xl: clamp(1rem, 1.75vw, 1.25rem);        /* 16px - 20px */
--body-lg: clamp(0.9375rem, 1.5vw, 1.125rem);   /* 15px - 18px */
--body-md: clamp(0.875rem, 1.25vw, 1rem);       /* 14px - 16px */
--body-sm: clamp(0.8125rem, 1vw, 0.9375rem);    /* 13px - 15px */
--body-xs: clamp(0.75rem, 0.875vw, 0.875rem);   /* 12px - 14px */
```

### Tailwind Classes
```html
<!-- Large body text for important content -->
<p class="text-body-2xl">
  This is large, readable body text perfect for lead paragraphs
  and important content that needs emphasis.
</p>

<!-- Standard body text -->
<p class="text-body-xl">
  Regular body text that provides excellent readability across 
  all devices with optimal line height and spacing.
</p>

<!-- Smaller body text -->
<p class="text-body-lg">
  Slightly smaller text for secondary content while maintaining 
  excellent readability and accessibility standards.
</p>

<!-- Fine print -->
<p class="text-body-sm">
  Small text for captions, disclaimers, and supplementary information.
</p>
```

### Typography Characteristics
- **Font Weight**: 400 (Regular)
- **Letter Spacing**: -0.005em to 0.01em (Natural to relaxed)
- **Line Height**: 1.5 to 1.65 (Highly readable)

## Usage Examples

### Hero Section
```html
<section class="hero-section">
  <h1 class="text-display-4xl text-gradient-primary">
    The Future is Fluid
  </h1>
  <p class="text-subtitle-xl text-muted-foreground">
    Revolutionary design system with dramatic typography
  </p>
  <p class="text-body-xl">
    Experience the perfect balance of bold headlines and readable content
    with our comprehensive fluid type scale.
  </p>
</section>
```

### Content Section
```html
<article class="content-section">
  <h2 class="text-display-2xl">Features That Matter</h2>
  <p class="text-subtitle-lg">
    Built with modern web standards and accessibility in mind
  </p>
  
  <div class="feature-grid">
    <div class="feature-card">
      <h3 class="text-display-lg">Fluid Scaling</h3>
      <p class="text-body-lg">
        Typography that adapts seamlessly across all screen sizes
        using modern CSS clamp() functions.
      </p>
    </div>
    
    <div class="feature-card">
      <h3 class="text-display-lg">Bold by Default</h3>
      <p class="text-body-lg">
        Display typography uses weights from 700-900 for maximum
        impact and visual hierarchy.
      </p>
    </div>
  </div>
</article>
```

### Card Components
```html
<div class="glass-card">
  <h3 class="text-display-md">Premium Features</h3>
  <p class="text-subtitle-md text-muted-foreground">
    Everything you need for modern web applications
  </p>
  <p class="text-body-md">
    Our comprehensive design system includes fluid typography,
    glass morphism effects, and semantic color tokens.
  </p>
  <a href="#" class="text-body-sm font-medium">
    Learn more →
  </a>
</div>
```

## CSS Variables Available

### Font Weights
```css
--display-weight-black: 900;
--display-weight-extrabold: 800;
--display-weight-bold: 700;
```

### Letter Spacing
```css
--display-tracking-tightest: -0.06em;
--display-tracking-tighter: -0.04em;
--display-tracking-tight: -0.025em;
--display-tracking-normal: -0.015em;
--subtitle-tracking: -0.01em;
--body-tracking-tight: -0.005em;
--body-tracking-normal: 0em;
--body-tracking-relaxed: 0.01em;
```

## Responsive Behavior

The type scale automatically adapts across breakpoints:

- **Mobile (320px)**: Uses minimum clamp values
- **Tablet (768px)**: Interpolates between min and max
- **Desktop (1200px+)**: Uses maximum clamp values

## Accessibility

- All text maintains WCAG AA contrast ratios
- Minimum font sizes ensure readability
- Line heights optimized for reading comfort
- Letter spacing enhances character recognition

## Performance

- Uses CSS custom properties for efficient updates
- Leverages hardware acceleration for smooth scaling
- Minimal impact on bundle size
- Works with existing Tailwind utilities

## Migration Guide

Replace existing text classes:

```html
<!-- Before -->
<h1 class="text-6xl font-bold">Old Heading</h1>
<p class="text-xl">Old paragraph</p>

<!-- After -->
<h1 class="text-display-3xl">New Heading</h1>
<p class="text-body-xl">New paragraph</p>
```

The new scale provides better fluid behavior, improved readability, and more dramatic visual impact while maintaining excellent performance.
