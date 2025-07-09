// Apple Design System - Colors and Tokens
// Based on Apple's Human Interface Guidelines

export const appleColors = {
  // Apple System Colors (iOS/macOS)
  systemBlue: '#007AFF',
  systemGreen: '#34C759',
  systemIndigo: '#5856D6',
  systemOrange: '#FF9500',
  systemPink: '#FF2D92',
  systemPurple: '#AF52DE',
  systemRed: '#FF3B30',
  systemTeal: '#30B0C7',
  systemYellow: '#FFCC00',

  // Apple Gray Scale
  systemGray: '#8E8E93',
  systemGray2: '#AEAEB2',
  systemGray3: '#C7C7CC',
  systemGray4: '#D1D1D6',
  systemGray5: '#E5E5EA',
  systemGray6: '#F2F2F7',

  // Apple Semantic Colors
  label: {
    primary: '#000000',
    secondary: '#3C3C43',
    tertiary: '#3C3C43',
    quaternary: '#2C2C2E',
  },

  // Apple Background Colors
  systemBackground: '#FFFFFF',
  secondarySystemBackground: '#F2F2F7',
  tertiarySystemBackground: '#FFFFFF',

  // Apple Fill Colors
  systemFill: 'rgba(120, 120, 128, 0.2)',
  secondarySystemFill: 'rgba(120, 120, 128, 0.16)',
  tertiarySystemFill: 'rgba(118, 118, 128, 0.12)',
  quaternarySystemFill: 'rgba(116, 116, 128, 0.08)',

  // Dark Mode Variants
  dark: {
    systemBackground: '#000000',
    secondarySystemBackground: '#1C1C1E',
    tertiarySystemBackground: '#2C2C2E',

    label: {
      primary: '#FFFFFF',
      secondary: '#EBEBF5',
      tertiary: '#EBEBF5',
      quaternary: '#EBEBF5',
    },

    systemFill: 'rgba(120, 120, 128, 0.36)',
    secondarySystemFill: 'rgba(120, 120, 128, 0.32)',
    tertiarySystemFill: 'rgba(118, 118, 128, 0.24)',
    quaternarySystemFill: 'rgba(116, 116, 128, 0.18)',
  },
};

// Apple Typography Scale (based on SF Pro)
export const appleTypography = {
  // Display sizes
  largeTitle: {
    fontSize: '34px',
    lineHeight: '41px',
    fontWeight: '400',
    letterSpacing: '0.374px',
  },

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

  // Body text
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
};

// Apple Spacing System
export const appleSpacing = {
  // Base unit: 4px (Apple's 4pt grid)
  base: '4px',

  // Common spacing values
  xs: '4px', // 1 unit
  sm: '8px', // 2 units
  md: '16px', // 4 units
  lg: '24px', // 6 units
  xl: '32px', // 8 units
  xxl: '48px', // 12 units
  xxxl: '64px', // 16 units

  // Apple-specific spacing
  minTouchTarget: '44px', // Minimum touch target size
  systemSpacing: '20px', // Standard system spacing
  margins: {
    tight: '16px',
    standard: '20px',
    comfortable: '24px',
  },
};

// Apple Border Radius
export const appleBorderRadius = {
  none: '0px',
  sm: '4px', // Small elements
  md: '8px', // Cards, buttons
  lg: '12px', // Larger cards
  xl: '16px', // Prominent elements
  xxl: '20px', // Large components
  round: '50%', // Circular elements

  // Apple-specific radius
  card: '12px',
  button: '8px',
  input: '10px',
  modal: '16px',
};

// Apple Shadow System
export const appleShadows = {
  // Elevation levels
  level1: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  level2: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
  level3: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
  level4: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
  level5: '0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)',

  // Apple-specific shadows
  card: '0 4px 16px rgba(0, 0, 0, 0.08)',
  button: '0 2px 8px rgba(0, 0, 0, 0.12)',
  modal: '0 25px 50px rgba(0, 0, 0, 0.25)',
  floating: '0 8px 24px rgba(0, 0, 0, 0.15)',

  // Dark mode shadows
  dark: {
    level1:
      '0 1px 3px rgba(255, 255, 255, 0.08), 0 1px 2px rgba(255, 255, 255, 0.16)',
    level2:
      '0 3px 6px rgba(255, 255, 255, 0.12), 0 3px 6px rgba(255, 255, 255, 0.18)',
    card: '0 4px 16px rgba(255, 255, 255, 0.04)',
    button: '0 2px 8px rgba(255, 255, 255, 0.08)',
  },
};

// Apple Glass Morphism tokens
export const appleGlass = {
  // Glass background values
  backgrounds: {
    ultraThin: 'rgba(255, 255, 255, 0.05)',
    thin: 'rgba(255, 255, 255, 0.1)',
    regular: 'rgba(255, 255, 255, 0.15)',
    thick: 'rgba(255, 255, 255, 0.2)',
    ultraThick: 'rgba(255, 255, 255, 0.25)',
  },

  // Dark mode glass
  darkBackgrounds: {
    ultraThin: 'rgba(0, 0, 0, 0.05)',
    thin: 'rgba(0, 0, 0, 0.1)',
    regular: 'rgba(0, 0, 0, 0.15)',
    thick: 'rgba(0, 0, 0, 0.2)',
    ultraThick: 'rgba(0, 0, 0, 0.25)',
  },

  // Backdrop blur values
  blur: {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
    max: '40px',
  },

  // Border values for glass
  borders: {
    subtle: '1px solid rgba(255, 255, 255, 0.1)',
    regular: '1px solid rgba(255, 255, 255, 0.2)',
    prominent: '1px solid rgba(255, 255, 255, 0.3)',
  },

  darkBorders: {
    subtle: '1px solid rgba(255, 255, 255, 0.05)',
    regular: '1px solid rgba(255, 255, 255, 0.1)',
    prominent: '1px solid rgba(255, 255, 255, 0.15)',
  },
};

// Generate CSS custom properties
export const generateAppleCSSVariables = () => {
  const cssVars: Record<string, string> = {};

  // Colors
  Object.entries(appleColors).forEach(([key, value]) => {
    if (typeof value === 'string') {
      cssVars[`--apple-${key}`] = value;
    }
  });

  // Typography
  Object.entries(appleTypography).forEach(([key, value]) => {
    cssVars[`--apple-text-${key}-size`] = value.fontSize;
    cssVars[`--apple-text-${key}-height`] = value.lineHeight;
    cssVars[`--apple-text-${key}-weight`] = value.fontWeight;
    cssVars[`--apple-text-${key}-spacing`] = value.letterSpacing;
  });

  // Spacing
  Object.entries(appleSpacing).forEach(([key, value]) => {
    if (typeof value === 'string') {
      cssVars[`--apple-spacing-${key}`] = value;
    }
  });

  return cssVars;
};

// Apple animation curves and durations
export const appleMotion = {
  // Standard durations
  duration: {
    instant: '0ms',
    fast: '200ms',
    standard: '300ms',
    slow: '500ms',
    slower: '700ms',
  },

  // Apple's signature easing curves
  easing: {
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
};

export default {
  colors: appleColors,
  typography: appleTypography,
  spacing: appleSpacing,
  borderRadius: appleBorderRadius,
  shadows: appleShadows,
  glass: appleGlass,
  motion: appleMotion,
  generateCSSVariables: generateAppleCSSVariables,
};
