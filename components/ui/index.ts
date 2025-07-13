// === LIQUIDIFY V1.2.0 COMPONENTS ===
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
  GlassLoading,
  GlassProgress,
  GlassSearch,
  GlassSelect,
  GlassSlider,
  GlassSwitch,
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
  useLiquidGlass,
  useMagneticHover,
  useRepulsionEffect,
  useIsMobile,
  useTheme,
  useToast,
  usePerformanceMonitor,
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
  HapticProvider,
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
  cn,
  GlobalConfigProvider,
  LiquidifyProvider,
  SSRConfigProvider,
} from 'liquidify';

// === LOCAL COMPONENTS ===
// Local implementations that extend liquidify components (only for components NOT in liquidify)
export { default as GlassButtonGroup } from './GlassButtonGroup';
export { default as GlassIconButton } from './GlassIconButton';
export { default as GlassToggleButton } from './GlassToggleButton';

// Navigation Category (local implementations only for components NOT in liquidify)
export { default as GlassNavbar } from './GlassNavbar';
export { default as GlassSidebar } from './GlassSidebar';
export { default as GlassBreadcrumb } from './GlassBreadcrumb';
export { default as GlassMenu } from './GlassMenu';
export { default as GlassStepper } from './GlassStepper';

// Inputs Category (local implementations only for components NOT in liquidify)
export { default as GlassRadio } from './GlassRadio';

// Presentation Category (local implementations)
export { default as GlassNotification } from './GlassNotification';
export { default as GlassToast } from './GlassToast';
export { default as GlassChart } from './GlassChart';

// Containment Category (local implementations)
export { default as GlassCommand } from './GlassCommand';

// Performance Optimized (Lazy-loaded components)
export { default as LazyGlassChart } from './LazyGlassChart';
export { preloadGlassChart } from './LazyGlassChart';
export { default as LazyGlassCommand } from './LazyGlassCommand';
export { preloadGlassCommand } from './LazyGlassCommand';

// Demo & Animation Components
export { default as AnimationDemo } from '../AnimationDemo';
export { default as PageTransition } from '../PageTransition';
export { default as LiquidifyInteractiveDemo } from '../LiquidifyInteractiveDemo';
export { default as SimpleShowcase } from '../SimpleShowcase';

// Utility Functions & Performance
export {
  default as performanceUtils,
  usePerformanceOptimization,
  bundleUtils,
  lazyLoadUtils,
} from '../../lib/performance-utils';
export * from '../../lib/enhanced-animations';
export * from '../../lib/liquid-glass-animations';

// Performance Components
export { default as PerformanceMonitor } from '../PerformanceMonitor';
export { default as PerformanceBestPractices } from '../PerformanceBestPractices';

// === TYPE EXPORTS ===
// Actions Category Types (local implementations)
export type { GlassButtonGroupProps } from './GlassButtonGroup';
export type { GlassIconButtonProps } from './GlassIconButton';
export type { GlassToggleButtonProps } from './GlassToggleButton';

// Navigation Category Types (local implementations)
export type { GlassNavbarProps } from './GlassNavbar';
export type { GlassSidebarProps } from './GlassSidebar';
export type { GlassBreadcrumbProps, BreadcrumbItem } from './GlassBreadcrumb';
export type { GlassMenuProps, MenuItem } from './GlassMenu';
export type { GlassStepperProps, Step } from './GlassStepper';

// Inputs Category Types (local implementations)
export type { GlassRadioProps } from './GlassRadio';

// Presentation Category Types (local implementations)
export type { GlassNotificationProps } from './GlassNotification';
export type { GlassToastProps } from './GlassToast';
export type { GlassChartProps, ChartDataPoint } from './GlassChart';

// Containment Category Types (local implementations)
export type { GlassCommandProps } from './GlassCommand';

// Apple HIG Design System Utilities
export * from '../../lib/apple-design-system';
export * from '../../lib/apple-hig-system';
