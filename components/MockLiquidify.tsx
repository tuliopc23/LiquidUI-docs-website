import React, { forwardRef, ReactNode, createContext, useContext } from 'react';

// Create the ConfigContext that liquidify components expect
const ConfigContext = createContext({
  theme: 'light' as 'light' | 'dark' | 'auto',
  animations: true,
  haptics: true,
  accessibility: true,
  performance: 'auto' as 'auto' | 'high' | 'low',
});

// Mock all the liquidify components for SSR
interface MockComponentProps {
  children?: ReactNode;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const MockComponent = forwardRef<HTMLDivElement, MockComponentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  }
);

MockComponent.displayName = 'MockComponent';

// Mock Provider Component that provides the ConfigContext
const MockProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigContext.Provider
      value={{
        theme: 'light',
        animations: true,
        haptics: true,
        accessibility: true,
        performance: 'auto',
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

// Export all the components that are used in the MDX files
export const GlassButton = MockComponent;
export const GlassCard = MockComponent;
export const GlassCardContent = MockComponent;
export const GlassCardDescription = MockComponent;
export const GlassCardFooter = MockComponent;
export const GlassCardHeader = MockComponent;
export const GlassCardTitle = MockComponent;
export const GlassInput = MockComponent;
export const GlassSlider = MockComponent;
export const GlassModal = MockComponent;
export const GlassTabs = MockComponent;
export const GlassTooltip = MockComponent;
export const GlassAvatar = MockComponent;
export const GlassBadge = MockComponent;
export const GlassCheckbox = MockComponent;
export const GlassDatePicker = MockComponent;
export const GlassFileUpload = MockComponent;
export const GlassFloatingAction = MockComponent;
export const GlassLoading = MockComponent;
export const GlassPopover = MockComponent;
export const GlassProgress = MockComponent;
export const GlassSelect = MockComponent;
export const GlassSwitch = MockComponent;
export const GlassTextarea = MockComponent;
export const GlassRadio = MockComponent;
export const GlassToggleButton = MockComponent;
export const GlassIconButton = MockComponent;
export const GlassButtonGroup = MockComponent;
export const GlassSearch = MockComponent;
export const GlassDropdown = MockComponent;
export const GlassMenu = MockComponent;
export const GlassBreadcrumb = MockComponent;
export const GlassMobileNav = MockComponent;
export const GlassNavbar = MockComponent;
export const GlassSidebar = MockComponent;
export const GlassTable = MockComponent;
export const GlassCommand = MockComponent;
export const GlassResponsiveButton = MockComponent;
export const GlassResponsiveCard = MockComponent;

// Additional components
export const BarChart = MockComponent;
export const DonutChart = MockComponent;
export const LineChart = MockComponent;
export const CommandPalette = MockComponent;
export const Navbar = MockComponent;
export const NotificationCenter = MockComponent;
export const Sidebar = MockComponent;
export const ThemeToggle = MockComponent;
export const ToastProvider = MockProvider;
export const AccessibilityChecker = MockComponent;
export const ComponentShowcase = MockComponent;

// Physics components
export const FluidSimulation = MockComponent;
export const ParticleEmitter = MockComponent;
export const Spring2D = MockComponent;
export const Vector2D = MockComponent;
export const PhysicsWorld = MockComponent;
export const FluidParticle = MockComponent;
export const Particle = MockComponent;
export const SpringPhysics = MockComponent;

// Providers
export const LiquidGlassProvider = MockProvider;
export const ThemeProvider = MockProvider;
export const HapticProvider = MockProvider;

// Hooks - return mock implementations
export const useContentAwareGlass = () => ({
  glassStyle: {},
  updateContent: () => {},
  setIntensity: () => {},
  analyze: () => ({}),
  reset: () => {},
});

export const useGlassEffectPerformance = () => ({
  performance: { fps: 60, memory: 0 },
  optimizations: {},
});

export const useLiquidGlass = () => ({
  style: {},
  isLoading: false,
});

export const useMagneticHover = () => ({
  style: {},
  handlers: {},
});

export const useRepulsionEffect = () => ({
  style: {},
  handlers: {},
});

export const useIsMobile = () => false;
export const useTheme = () => ({ theme: 'light', setTheme: () => {} });
export const useToast = () => ({ toast: () => {}, dismiss: () => {} });

// Utilities and tokens
export const liquidGlassTokens = {
  colors: {},
  spacing: {},
  typography: {},
  animation: {},
  glass: {},
};

export const componentTokens = {
  button: { sizes: {} },
  card: { variants: {}, sizes: {} },
};

export const glassVariants = () => '';
export const cn = (...classes: string[]) => classes.join(' ');
export const getGlassClass = () => '';
export const createGlassLayers = () => ({});
export const getAppleLiquidGlassClass = () => '';

// Additional constants and utilities
export const PHYSICS_CONSTANTS = {};
export const SPRING_PRESETS = {};
export const createFluidMorph = () => ({});
export const createGlassRipple = () => ({});
export const generateCSSCustomProperties = () => ({});
export const getThemeToken = () => '';
export const getToken = () => '';
export const glassThemes = {};
export const physicsWorld = {};
export const animationState = {};
export const focusRing = {};
export const microInteraction = {};
export const responsiveGlass = {};
export const responsiveSize = {};
export const touchTarget = {};

// Utility functions
export const expectAccessible = () => {};
export const runAccessibilityCheck = () => {};
export const toast = () => {};

// Export the ConfigContext and useConfig hook that liquidify components expect
export { ConfigContext };
export const useConfig = () => useContext(ConfigContext);

// Also export as GlobalConfigContext for compatibility
export const GlobalConfigContext = ConfigContext;
export const useGlobalConfig = () => useContext(ConfigContext);

// Export everything as default for compatibility
const MockLiquidify = {
  GlassButton,
  GlassCard,
  GlassInput,
  GlassSlider,
  LiquidGlassProvider,
  ThemeProvider,
  useContentAwareGlass,
  liquidGlassTokens,
  componentTokens,
  // ... all other exports
};

export default MockLiquidify;
