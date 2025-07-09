// === LIQUIDIFY V1.0.22 COMPONENTS ===
// Core Components available in liquidify package
export {
  GlassButton,
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardFooter,
  GlassCardHeader,
  GlassCardTitle,
  GlassInput,
  GlassModal,
  GlassTabs,
  GlassTooltip,
  GlassAvatar,
  GlassBadge,
  GlassCheckbox,
  GlassDropdown,
  GlassLoading,
  GlassMobileNav,
  GlassPopover,
  GlassProgress,
  GlassResponsiveButton,
  GlassResponsiveCard,
  GlassSearch,
  GlassSelect,
  GlassSlider,
  GlassSwitch,
  GlassTable,
  GlassTextarea,
} from 'liquidify';

// Physics System Components
export {
  FluidParticle,
  FluidSimulation,
  LiquidGlassProvider,
  Particle,
  ParticleEmitter,
  PhysicsWorld,
  Spring2D,
  SpringPhysics,
  Vector2D,
} from 'liquidify';

// Hooks
export {
  useContentAwareGlass,
  useGlassEffectPerformance,
  useLiquidGlass,
  useMagneticHover,
  useRepulsionEffect,
  useIsMobile,
  useTheme,
  useToast,
} from 'liquidify';

// Data Visualization
export { BarChart, DonutChart, LineChart } from 'liquidify';

// Navigation & Layout
export {
  CommandPalette,
  Navbar,
  NotificationCenter,
  Sidebar,
  ThemeProvider,
  ThemeToggle,
  ToastProvider,
} from 'liquidify';

// Utilities
export {
  AccessibilityChecker,
  ComponentShowcase,
  expectAccessible,
  runAccessibilityCheck,
  toast,
} from 'liquidify';

// Constants & Utilities
export {
  PHYSICS_CONSTANTS,
  SPRING_PRESETS,
  componentTokens,
  createFluidMorph,
  createGlassRipple,
  generateCSSCustomProperties,
  getThemeToken,
  getToken,
  glassThemes,
  liquidGlassTokens,
  physicsWorld,
  animationState,
  focusRing,
  getGlassClass,
  glassVariants,
  microInteraction,
  responsiveGlass,
  responsiveSize,
  touchTarget,
} from 'liquidify';

// === LOCAL COMPONENTS ===
// Core Apple HIG Liquid Glass Component (local implementation)
export { default as AppleLiquidGlass } from './AppleLiquidGlass';

// Legacy components (for backward compatibility - will be deprecated)
export { default as GlassEffect } from './GlassEffect';
export { default as GlassBackground } from './GlassBackground';

// Local implementations that extend liquidify components
export { default as GlassButtonGroup } from './GlassButtonGroup';
export { default as GlassIconButton } from './GlassIconButton';
export { default as GlassToggleButton } from './GlassToggleButton';
export { default as GlassFloatingAction } from './GlassFloatingAction';

// Navigation Category (local implementations)
export { default as GlassNavbar } from './GlassNavbar';
export { default as GlassSidebar } from './GlassSidebar';
export { default as GlassBreadcrumb } from './GlassBreadcrumb';
export { default as GlassMenu } from './GlassMenu';
export { default as GlassPagination } from './GlassPagination';
export { default as GlassStepper } from './GlassStepper';

// Inputs Category (local implementations)
export { default as GlassDatePicker } from './GlassDatePicker';
export { default as GlassFileUpload } from './GlassFileUpload';
export { default as GlassRadio } from './GlassRadio';

// Presentation Category (local implementations)
export { default as GlassNotification } from './GlassNotification';
export { default as GlassToast } from './GlassToast';
export { default as GlassChart } from './GlassChart';

// Containment Category (local implementations)
export { default as GlassCommand } from './GlassCommand';

// Performance Optimized (Lazy-loaded components)
export { default as LazyGlassChart } from './LazyGlassChart';
export { default as LazyGlassDatePicker } from './LazyGlassDatePicker';
export { default as LazyGlassCommand } from './LazyGlassCommand';
export { preloadGlassChart } from './LazyGlassChart';
export { preloadGlassDatePicker } from './LazyGlassDatePicker';
export { preloadGlassCommand } from './LazyGlassCommand';

// Layout Category (local implementations)
export { default as GlassHeader } from './GlassHeader';
export { default as GlassFooter } from './GlassFooter';

// Demo & Animation Components
export { default as AnimationDemo } from '../AnimationDemo';
export { default as PageTransition } from '../PageTransition';
export { default as LiquidifyInteractiveDemo } from '../LiquidifyInteractiveDemo';
export { default as SimpleShowcase } from '../SimpleShowcase';

// Utility Functions & Performance
export {
  default as performanceUtils,
  usePerformanceOptimization,
  usePerformanceMonitor,
  bundleUtils,
  lazyLoadUtils,
} from '../../lib/performance-utils';
export * from '../../lib/enhanced-animations';
export * from '../../lib/liquid-glass-animations';

// Performance Components
export { default as PerformanceMonitor } from '../PerformanceMonitor';
export { default as PerformanceBestPractices } from '../PerformanceBestPractices';

// === TYPE EXPORTS ===
// Core Apple HIG Type exports
export type { AppleLiquidGlassProps } from './AppleLiquidGlass';

// Legacy type exports (for backward compatibility - will be deprecated)
export type { GlassEffectProps } from './GlassEffect';
export type { GlassBackgroundProps } from './GlassBackground';

// Note: GlassButton and GlassCard types are now from liquidify package
// They are re-exported automatically with the component exports above

// Actions Category Types (local implementations)
export type { GlassButtonGroupProps } from './GlassButtonGroup';
export type { GlassIconButtonProps } from './GlassIconButton';
export type { GlassToggleButtonProps } from './GlassToggleButton';
export type { GlassFloatingActionProps } from './GlassFloatingAction';

// Navigation Category Types (local implementations)
export type { GlassNavbarProps } from './GlassNavbar';
export type { GlassSidebarProps } from './GlassSidebar';
export type { GlassBreadcrumbProps, BreadcrumbItem } from './GlassBreadcrumb';
export type { GlassMenuProps, MenuItem } from './GlassMenu';
export type { GlassPaginationProps } from './GlassPagination';
export type { GlassStepperProps, Step } from './GlassStepper';

// Inputs Category Types (local implementations)
export type { GlassDatePickerProps } from './GlassDatePicker';
export type { GlassFileUploadProps } from './GlassFileUpload';
export type { GlassRadioProps } from './GlassRadio';

// Presentation Category Types (local implementations)
export type { GlassNotificationProps } from './GlassNotification';
export type { GlassToastProps } from './GlassToast';
export type { GlassChartProps, ChartDataPoint } from './GlassChart';

// Containment Category Types (local implementations)
export type { GlassCommandProps } from './GlassCommand';

// Layout Category Types (local implementations)
export type { GlassHeaderProps } from './GlassHeader';
export type { GlassFooterProps } from './GlassFooter';

// Apple HIG Design System Utilities
export * from '../../lib/apple-design-system';
export * from '../../lib/apple-hig-system';

// Common utilities
export { cn } from '../../lib/utils';
