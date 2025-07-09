// Apple Human Interface Guidelines Implementation
// Based on Apple's HIG 2024 - https://developer.apple.com/design/human-interface-guidelines/

// Apple HIG Typography System (using system fonts)
export const appleHIGTypography = {
  // System font stack (compliant with Apple licensing)
  fontFamilies: {
    system: [
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'SF Pro Display',
      'SF Pro Text',
      'Helvetica Neue',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(', '),

    monospace: [
      'SF Mono',
      'Monaco',
      'Inconsolata',
      'Roboto Mono',
      'source-code-pro',
      'Menlo',
      'Consolas',
      'monospace',
    ].join(', '),

    rounded: [
      'SF Pro Rounded',
      'system-ui',
      '-apple-system',
      'sans-serif',
    ].join(', '),
  },

  // Apple HIG Text Styles (iOS/macOS standard)
  textStyles: {
    // Large Titles (34pt+)
    largeTitle: {
      fontSize: '34px',
      lineHeight: '41px',
      fontWeight: '400',
      letterSpacing: '0.374px',
      textRendering: 'optimizeLegibility',
    },

    // Title Hierarchy
    title1: {
      fontSize: '28px',
      lineHeight: '34px',
      fontWeight: '400',
      letterSpacing: '0.364px',
    },

    title2: {
      fontSize: '22px',
      lineHeight: '28px',
      fontWeight: '400',
      letterSpacing: '0.35px',
    },

    title3: {
      fontSize: '20px',
      lineHeight: '25px',
      fontWeight: '400',
      letterSpacing: '0.38px',
    },

    // Body Text
    headline: {
      fontSize: '17px',
      lineHeight: '22px',
      fontWeight: '600',
      letterSpacing: '-0.408px',
    },

    body: {
      fontSize: '17px',
      lineHeight: '22px',
      fontWeight: '400',
      letterSpacing: '-0.408px',
    },

    callout: {
      fontSize: '16px',
      lineHeight: '21px',
      fontWeight: '400',
      letterSpacing: '-0.32px',
    },

    subheadline: {
      fontSize: '15px',
      lineHeight: '20px',
      fontWeight: '400',
      letterSpacing: '-0.24px',
    },

    // Small Text
    footnote: {
      fontSize: '13px',
      lineHeight: '18px',
      fontWeight: '400',
      letterSpacing: '-0.08px',
    },

    caption1: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: '400',
      letterSpacing: '0px',
    },

    caption2: {
      fontSize: '11px',
      lineHeight: '13px',
      fontWeight: '400',
      letterSpacing: '0.066px',
    },
  },
};

// Apple HIG Color System
export const appleHIGColors = {
  // System Colors (iOS/macOS)
  systemColors: {
    blue: '#007AFF',
    brown: '#A2845E',
    cyan: '#32ADE6',
    green: '#34C759',
    indigo: '#5856D6',
    mint: '#00C7BE',
    orange: '#FF9500',
    pink: '#FF2D92',
    purple: '#AF52DE',
    red: '#FF3B30',
    teal: '#30B0C7',
    yellow: '#FFCC00',
  },

  // Label Colors (semantic text colors)
  labelColors: {
    primary: '#000000',
    secondary: 'rgba(60, 60, 67, 0.6)',
    tertiary: 'rgba(60, 60, 67, 0.3)',
    quaternary: 'rgba(60, 60, 67, 0.18)',
  },

  // Background Colors
  backgroundColors: {
    primary: '#FFFFFF',
    secondary: '#F2F2F7',
    tertiary: '#FFFFFF',
  },

  // Fill Colors (for UI elements)
  fillColors: {
    primary: 'rgba(120, 120, 128, 0.2)',
    secondary: 'rgba(120, 120, 128, 0.16)',
    tertiary: 'rgba(118, 118, 128, 0.12)',
    quaternary: 'rgba(116, 116, 128, 0.08)',
  },

  // Gray Scale
  grays: {
    gray: '#8E8E93',
    gray2: '#AEAEB2',
    gray3: '#C7C7CC',
    gray4: '#D1D1D6',
    gray5: '#E5E5EA',
    gray6: '#F2F2F7',
  },

  // Dark Mode Colors
  darkMode: {
    labelColors: {
      primary: '#FFFFFF',
      secondary: 'rgba(235, 235, 245, 0.6)',
      tertiary: 'rgba(235, 235, 245, 0.3)',
      quaternary: 'rgba(235, 235, 245, 0.16)',
    },

    backgroundColors: {
      primary: '#000000',
      secondary: '#1C1C1E',
      tertiary: '#2C2C2E',
    },

    fillColors: {
      primary: 'rgba(120, 120, 128, 0.36)',
      secondary: 'rgba(120, 120, 128, 0.32)',
      tertiary: 'rgba(118, 118, 128, 0.24)',
      quaternary: 'rgba(116, 116, 128, 0.18)',
    },
  },
};

// Apple HIG Spacing System (4pt grid)
export const appleHIGSpacing = {
  // Base 4pt grid
  baseUnit: 4,

  // Standard spacing values (in pixels)
  spacing: {
    xxxs: '2px', // 0.5 units
    xxs: '4px', // 1 unit
    xs: '8px', // 2 units
    sm: '12px', // 3 units
    md: '16px', // 4 units
    lg: '20px', // 5 units
    xl: '24px', // 6 units
    xxl: '32px', // 8 units
    xxxl: '40px', // 10 units
    huge: '48px', // 12 units
    massive: '64px', // 16 units
  },

  // Touch Targets (minimum 44x44pt)
  touchTargets: {
    minimum: '44px', // Apple's minimum touch target
    comfortable: '48px', // More comfortable for larger hands
    large: '56px', // For primary actions
  },

  // Margins and Padding
  margins: {
    edge: '16px', // Standard edge margins
    section: '20px', // Between major sections
    card: '12px', // Inside cards
    button: '16px', // Button internal padding
  },
};

// Apple HIG Layout Principles
export const appleHIGLayout = {
  // Grid System
  grid: {
    columns: 12,
    gutter: '20px',
    margin: '16px',
  },

  // Container Sizes
  containers: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },

  // Z-Index Layers
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    toast: 1080,
  },
};

// Apple HIG Motion & Animation
export const appleHIGMotion = {
  // Duration (Apple standard timing)
  duration: {
    instant: '0ms',
    fast: '200ms', // Quick interactions
    standard: '300ms', // Standard transitions
    slow: '500ms', // Page transitions
    slower: '700ms', // Complex animations
  },

  // Easing Curves (Apple standard)
  easing: {
    // Primary easing for most UI
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',

    // For elements entering the screen
    decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',

    // For elements leaving the screen
    accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',

    // For sharp, quick movements
    sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',

    // Apple's signature bounce (use sparingly)
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

    // Spring-like motion (for interactive elements)
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
};

// Apple HIG Accessibility
export const appleHIGAccessibility = {
  // Text Contrast Ratios (WCAG AA compliant)
  contrast: {
    normal: 4.5, // For normal text
    large: 3.0, // For large text (18pt+ or 14pt+ bold)
    enhanced: 7.0, // For AAA compliance
  },

  // Focus Indicators
  focus: {
    outlineWidth: '2px',
    outlineStyle: 'solid',
    outlineColor: '#007AFF',
    outlineOffset: '2px',
  },

  // Screen Reader
  screenReader: {
    skipToContent: true,
    semanticHTML: true,
    descriptiveText: true,
  },
};

// Apple HIG Shadows & Elevation
export const appleHIGElevation = {
  shadows: {
    // Card elevations
    level0: 'none',
    level1: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    level2: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
    level3: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    level4: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
    level5: '0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)',

    // Specific component shadows
    button: '0 2px 8px rgba(0, 0, 0, 0.12)',
    card: '0 4px 16px rgba(0, 0, 0, 0.08)',
    modal: '0 25px 50px rgba(0, 0, 0, 0.25)',
    tooltip: '0 8px 24px rgba(0, 0, 0, 0.15)',
  },

  // Dark mode shadows
  darkShadows: {
    level1:
      '0 1px 3px rgba(255, 255, 255, 0.08), 0 1px 2px rgba(255, 255, 255, 0.16)',
    level2:
      '0 3px 6px rgba(255, 255, 255, 0.12), 0 3px 6px rgba(255, 255, 255, 0.18)',
    button: '0 2px 8px rgba(255, 255, 255, 0.08)',
    card: '0 4px 16px rgba(255, 255, 255, 0.04)',
  },
};

// Generate CSS Custom Properties
export const generateHIGCSSVariables = (): Record<string, string> => {
  const cssVars: Record<string, string> = {};

  // Typography
  Object.entries(appleHIGTypography.textStyles).forEach(([key, style]) => {
    cssVars[`--hig-text-${key}-size`] = style.fontSize;
    cssVars[`--hig-text-${key}-height`] = style.lineHeight;
    cssVars[`--hig-text-${key}-weight`] = style.fontWeight.toString();
    cssVars[`--hig-text-${key}-spacing`] = style.letterSpacing;
  });

  // Colors
  Object.entries(appleHIGColors.systemColors).forEach(([key, value]) => {
    cssVars[`--hig-color-${key}`] = value;
  });

  Object.entries(appleHIGColors.labelColors).forEach(([key, value]) => {
    cssVars[`--hig-label-${key}`] = value;
  });

  // Spacing
  Object.entries(appleHIGSpacing.spacing).forEach(([key, value]) => {
    cssVars[`--hig-spacing-${key}`] = value;
  });

  // Shadows
  Object.entries(appleHIGElevation.shadows).forEach(([key, value]) => {
    cssVars[`--hig-shadow-${key}`] = value;
  });

  return cssVars;
};

// HIG-compliant component utilities
export const appleHIGUtils = {
  // Create HIG-compliant button styles
  buttonStyles: (
    variant: 'primary' | 'secondary' | 'tertiary' = 'primary'
  ) => ({
    minHeight: appleHIGSpacing.touchTargets.minimum,
    minWidth: appleHIGSpacing.touchTargets.minimum,
    padding: `${appleHIGSpacing.margins.card} ${appleHIGSpacing.margins.button}`,
    borderRadius: '8px',
    fontFamily: appleHIGTypography.fontFamilies.system,
    fontSize: appleHIGTypography.textStyles.body.fontSize,
    fontWeight: variant === 'primary' ? '600' : '400',
    transition: `all ${appleHIGMotion.duration.fast} ${appleHIGMotion.easing.standard}`,
    cursor: 'pointer',
    outline: 'none',
    border: 'none',
  }),

  // Create HIG-compliant input styles
  inputStyles: () => ({
    minHeight: appleHIGSpacing.touchTargets.minimum,
    padding: `${appleHIGSpacing.spacing.sm} ${appleHIGSpacing.spacing.md}`,
    borderRadius: '8px',
    fontFamily: appleHIGTypography.fontFamilies.system,
    fontSize: appleHIGTypography.textStyles.body.fontSize,
    border: `1px solid ${appleHIGColors.fillColors.tertiary}`,
    transition: `all ${appleHIGMotion.duration.fast} ${appleHIGMotion.easing.standard}`,
  }),

  // Create HIG-compliant card styles
  cardStyles: (
    elevation: keyof typeof appleHIGElevation.shadows = 'level1'
  ) => ({
    borderRadius: '12px',
    padding: appleHIGSpacing.spacing.xl,
    backgroundColor: appleHIGColors.backgroundColors.primary,
    boxShadow: appleHIGElevation.shadows[elevation],
  }),
};

export default {
  typography: appleHIGTypography,
  colors: appleHIGColors,
  spacing: appleHIGSpacing,
  layout: appleHIGLayout,
  motion: appleHIGMotion,
  accessibility: appleHIGAccessibility,
  elevation: appleHIGElevation,
  utils: appleHIGUtils,
  generateCSSVariables: generateHIGCSSVariables,
};
