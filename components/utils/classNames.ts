/**
 * Utility functions for common Tailwind CSS class combinations.
 * These functions help maintain consistency and reduce duplication across components.
 */

/**
 * Glass effect utility classes for consistent glassmorphism styling.
 *
 * @param variant - The glass effect variant
 * @param className - Additional CSS classes to merge
 * @returns Combined class string for glass effects
 */
export const glassEffect = (
  variant: "default" | "subtle" | "strong" | "card" = "default",
  className?: string,
) => {
  const variants = {
    default: "backdrop-blur-md bg-white/10 border border-white/20",
    subtle: "backdrop-blur-sm bg-white/5 border border-white/10",
    strong: "backdrop-blur-lg bg-white/20 border border-white/30",
    card: "backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-lg",
  };

  return cn(variants[variant], className);
};

/**
 * Flex utilities for common layout patterns.
 *
 * @param direction - Flex direction
 * @param align - Align items
 * @param justify - Justify content
 * @param gap - Gap between items
 * @param className - Additional CSS classes
 * @returns Combined flex class string
 */
export const flexUtils = (
  direction: "row" | "col" = "row",
  align: "start" | "center" | "end" | "stretch" = "center",
  justify:
    | "start"
    | "center"
    | "end"
    | "between"
    | "around"
    | "evenly" = "start",
  gap: 0 | 1 | 2 | 3 | 4 | 6 | 8 = 2,
  className?: string,
) => {
  const directionClass = direction === "col" ? "flex-col" : "flex-row";
  const alignClass = `items-${align}`;
  const justifyClass = `justify-${justify}`;
  const gapClass = gap > 0 ? `gap-${gap}` : "";

  return cn(
    "flex",
    directionClass,
    alignClass,
    justifyClass,
    gapClass,
    className,
  );
};

/**
 * Typography utilities for consistent text styling.
 *
 * @param variant - Typography variant
 * @param className - Additional CSS classes
 * @returns Combined typography class string
 */
export const typography = (
  variant: "h1" | "h2" | "h3" | "h4" | "body" | "caption" | "label",
  className?: string,
) => {
  const variants = {
    h1: "text-4xl font-bold tracking-tight",
    h2: "text-3xl font-semibold tracking-tight",
    h3: "text-2xl font-semibold tracking-tight",
    h4: "text-xl font-semibold tracking-tight",
    body: "text-base",
    caption: "text-sm text-muted-foreground",
    label: "text-sm font-medium",
  };

  return cn(variants[variant], className);
};

/**
 * Button size utilities for consistent button sizing.
 *
 * @param size - Button size variant
 * @param className - Additional CSS classes
 * @returns Combined button size class string
 */
export const buttonSizes = (
  size: "sm" | "md" | "lg" | "icon" = "md",
  className?: string,
) => {
  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10 p-0",
  };

  return cn(sizes[size], className);
};

/**
 * Card padding utilities for consistent spacing.
 *
 * @param size - Padding size
 * @param className - Additional CSS classes
 * @returns Combined padding class string
 */
export const cardPadding = (
  size: "sm" | "md" | "lg" = "md",
  className?: string,
) => {
  const sizes = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return cn(sizes[size], className);
};

/**
 * Avatar utilities for consistent avatar styling.
 *
 * @param size - Avatar size
 * @param className - Additional CSS classes
 * @returns Combined avatar class string
 */
export const avatarSizes = (
  size: "xs" | "sm" | "md" | "lg" | "xl" = "md",
  className?: string,
) => {
  const sizes = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
  };

  return cn(
    "glass-effect rounded-full flex items-center justify-center font-medium",
    sizes[size],
    className,
  );
};

/**
 * Spacing utilities for consistent margins and padding.
 *
 * @param type - Type of spacing (margin or padding)
 * @param direction - Direction of spacing
 * @param size - Size of spacing
 * @param className - Additional CSS classes
 * @returns Combined spacing class string
 */
export const spacing = (
  type: "m" | "p",
  direction: "all" | "t" | "r" | "b" | "l" | "x" | "y" = "all",
  size: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 = 4,
  className?: string,
) => {
  const directionMap = {
    all: "",
    t: "t",
    r: "r",
    b: "b",
    l: "l",
    x: "x",
    y: "y",
  };

  const spacingClass = `${type}${directionMap[direction]}-${size}`;
  return cn(spacingClass, className);
};

/**
 * Grid utilities for responsive grid layouts.
 *
 * @param cols - Number of columns for different breakpoints
 * @param gap - Gap between grid items
 * @param className - Additional CSS classes
 * @returns Combined grid class string
 */
export const gridLayout = (
  cols: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  },
  gap: 2 | 3 | 4 | 6 | 8 = 4,
  className?: string,
) => {
  const gridClasses = ["grid", `gap-${gap}`];

  if (cols.default) gridClasses.push(`grid-cols-${cols.default}`);
  if (cols.sm) gridClasses.push(`sm:grid-cols-${cols.sm}`);
  if (cols.md) gridClasses.push(`md:grid-cols-${cols.md}`);
  if (cols.lg) gridClasses.push(`lg:grid-cols-${cols.lg}`);
  if (cols.xl) gridClasses.push(`xl:grid-cols-${cols.xl}`);

  return cn(gridClasses.join(" "), className);
};

/**
 * Interactive state utilities for hover, focus, and active states.
 *
 * @param className - Additional CSS classes
 * @returns Combined interactive state class string
 */
export const interactiveStates = (className?: string) => {
  return cn(
    "transition-all duration-200",
    "hover:bg-white/10 hover:scale-105",
    "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
    "active:scale-95",
    className,
  );
};

// Utility function for combining class names
export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Performance-optimized class names for animations
export const performanceClasses = {
  motion: 'motion-element',
  hoverOptimized: 'hover-optimized',
  enhancedGlass: 'enhanced-glass',
  enhancedFloat: 'enhanced-float',
  performanceGradient: 'performance-gradient',
  scrollOptimized: 'scroll-optimized',
  layoutStable: 'layout-stable',
  enhancedButton: 'enhanced-button',
  heroText: 'hero-text',
  bodyText: 'body-text',
  textSpacing: 'text-spacing',
  sectionSpacing: 'section-spacing',
  gradientText: 'gradient-text',
  themeTransition: 'theme-transition',
  listOptimized: 'list-optimized',
  inViewport: 'in-viewport'
};

// Responsive breakpoint utilities
export const responsive = {
  mobile: 'block sm:hidden',
  tablet: 'hidden sm:block lg:hidden',
  desktop: 'hidden lg:block',
  mobileUp: 'sm:block',
  tabletUp: 'lg:block'
};

// Animation duration presets
export const durations = {
  fast: 'duration-200',
  normal: 'duration-300',
  slow: 'duration-500',
  slower: 'duration-700'
};

// Easing presets for consistent animations
export const easings = {
  smooth: 'ease-in-out',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  snappy: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
};

// Glass morphism utility classes
export const glassMorphism = {
  light: 'bg-white/10 backdrop-blur-md border border-white/20',
  medium: 'bg-white/20 backdrop-blur-lg border border-white/30',
  heavy: 'bg-white/30 backdrop-blur-xl border border-white/40',
  dark: 'bg-black/10 backdrop-blur-md border border-white/10'
};

// Gradient presets
export const gradients = {
  primary: 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-600',
  secondary: 'bg-gradient-to-r from-blue-500 to-purple-600',
  accent: 'bg-gradient-to-r from-pink-500 to-rose-500',
  neutral: 'bg-gradient-to-r from-gray-400 to-gray-600'
};

const classUtilities = {
  cn,
  performanceClasses,
  responsive,
  durations,
  easings,
  glassMorphism,
  gradients
};

export default classUtilities;
