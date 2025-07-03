# Banner Visual Documentation - Issues Reproduction

## Overview
This document records the visual reproduction of banner issues found in the Liquidify documentation site across desktop and mobile viewports.

## Issue 1: Banner Overlap with Navigation

### Desktop Viewport
- **Issue**: Banner overlaps with main navigation bar
- **File**: `theme.config.tsx` lines 179-193
- **CSS Conflict**: `.nextra-nav-container` with `z-index: 50`
- **Behavior**: Banner appears behind or conflicts with navigation elements

### Mobile Viewport  
- **Issue**: Banner positioning interferes with mobile navigation
- **CSS File**: `styles/globals.css` lines 588-603
- **Problem**: Fixed positioning doesn't account for banner height

## Issue 2: Non-Sticky Banner Behavior

### Desktop Viewport
- **Issue**: Banner doesn't maintain sticky positioning during scroll
- **Expected**: Banner should remain visible at top of viewport
- **Actual**: Banner disappears or doesn't follow expected sticky behavior

### Mobile Viewport
- **Issue**: Scroll behavior inconsistent with safe area handling
- **CSS Location**: `styles/globals.css` lines 620-626 (iOS Safari fixes)

## Issue 3: Banner Animation Jitter

### Desktop Viewport
- **Issue**: Motion animations cause visual jitter during hover
- **Code Location**: `theme.config.tsx` lines 182-192
```tsx
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
```
- **Problem**: Conflicting CSS transitions and Framer Motion animations

### Mobile Viewport
- **Issue**: Touch interactions trigger unwanted animation states
- **Performance**: Excessive motion on mobile devices

## Issue 4: Incorrect Storybook Icon

### Icon Analysis
- **File Path**: `/Users/tuliopinheirocunha/Liquidify-docs/components/StorybookLogo.tsx`
- **Current Implementation**: Custom SVG book-shaped icon
- **Problem**: Not using official Storybook branding icon
- **Usage Locations**:
  1. Navigation bar (`theme.config.tsx:55`)
  2. Component showcase (`ComponentShowcase.tsx:206`)

### Visual Comparison
- **Current Icon**: Custom gradient book with "S" symbol
- **Expected Icon**: Official Storybook logo/icon
- **Brand Inconsistency**: May confuse users expecting standard Storybook branding

## Technical Details

### Z-Index Hierarchy Issues
```css
/* Current problematic hierarchy */
.nextra-nav-container { z-index: 50; }
/* Banner may have lower z-index causing overlap */
```

### Positioning Conflicts
```css
/* Navigation container positioning */
.nextra-nav-container {
  position: fixed !important;
  top: 0;
  /* ... */
}

/* Content offset calculations missing banner height */
.nextra-nav-container+* {
  margin-top: calc(64px + env(safe-area-inset-top));
}
```

### Mobile Responsive Issues
```css
/* Mobile optimizations don't address banner */
@media (max-width: 768px) {
  /* Missing banner-specific styles */
}
```

## Reproduction Steps

### Desktop Testing
1. Open site in desktop browser (Chrome/Firefox/Safari)
2. Observe banner positioning relative to navigation
3. Scroll page to test sticky behavior
4. Hover over banner to observe jitter
5. Check Storybook icon appearance

### Mobile Testing  
1. Open site on mobile device or DevTools mobile view
2. Test banner positioning in portrait/landscape
3. Scroll to test banner behavior
4. Tap banner to test touch interactions
5. Verify safe area handling on iOS devices

## Files to Document in PR/Ticket

### Primary Files
1. `theme.config.tsx` - Banner configuration
2. `components/StorybookLogo.tsx` - Incorrect icon implementation  
3. `styles/globals.css` - Positioning and responsive styles
4. `components/ComponentShowcase.tsx` - Storybook icon usage

### Supporting Files
1. `components/GlassNavbar.tsx` - Navigation component
2. `tailwind.config.js` - CSS configuration
3. Mobile responsive breakpoints and styles

## Screenshots Needed

### Desktop Viewports
- [ ] Banner overlap with navigation (1920x1080)
- [ ] Banner jitter during hover animation (1440x900)
- [ ] Incorrect Storybook icon in navigation (close-up)
- [ ] Sticky behavior during scroll (before/after)

### Mobile Viewports  
- [ ] Banner positioning on iPhone (375x812)
- [ ] Banner on Android device (360x640)
- [ ] Landscape orientation issues (812x375)
- [ ] Touch interaction states

### Storybook Icon Issues
- [ ] Current custom icon implementation
- [ ] Expected official Storybook icon for comparison
- [ ] Icon usage in navigation bar
- [ ] Icon usage in component showcase

## Video Recordings Needed

### Desktop Recordings
- [ ] Banner jitter animation during hover/interaction
- [ ] Scroll behavior showing non-sticky positioning
- [ ] Navigation overlap during page interactions

### Mobile Recordings
- [ ] Touch interactions and banner response
- [ ] Scroll behavior on mobile devices  
- [ ] Orientation change impact on banner

---

**Documentation Date**: $(date)
**Testing Environment**: 
- Desktop: Chrome, Firefox, Safari
- Mobile: iOS Safari, Android Chrome
- DevTools: Chrome DevTools mobile simulation
