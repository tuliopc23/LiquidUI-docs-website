# Component Availability Matrix

This document tracks which components are available in the Liquidify package vs. which are documented.

## ✅ Available Components

These components are exported from the `liquidify` package and can be used:

### Core Components
- `GlassButton` - Basic button component with variants
- `GlassCard` - Container component with glass effects
- `GlassInput` - Text input with glass styling
- `GlassCheckbox` - Checkbox with glass effects
- `GlassSwitch` - Toggle switch component
- `GlassAvatar` - Avatar component with status indicators
- `GlassBadge` - Badge component with variants
- `GlassProgress` - Progress bar component
- `GlassModal` - Modal dialog component
- `GlassTooltip` - Tooltip component with positioning
- `GlassDropdown` - Dropdown menu component
- `GlassSelect` - Select dropdown component
- `GlassSlider` - Range slider component
- `GlassSearch` - Search input component
- `GlassTextarea` - Textarea component
- `GlassLoading` - Loading indicators
- `GlassPopover` - Popover component
- `GlassTabs` - Tab navigation component
- `GlassTable` - Table component (generic)

### Layout Components
- `GlassResponsiveButton` - Responsive button
- `GlassResponsiveCard` - Responsive card
- `GlassMobileNav` - Mobile navigation

### Charts & Data
- `BarChart` - Bar chart component
- `LineChart` - Line chart component
- `DonutChart` - Donut chart component

### Utility Components
- `ThemeProvider` - Theme context provider
- `ThemeToggle` - Theme toggle component
- `ComponentShowcase` - Component showcase
- `Navbar` - Navigation bar (not `GlassNavbar`)
- `Sidebar` - Sidebar component (not `GlassSidebar`)

### Advanced Features
- `CommandPalette` - Command palette component
- `NotificationCenter` - Notification center
- `ToastProvider` - Toast notification provider

### Hooks
- `useTheme` - Theme hook
- `useToast` - Toast hook
- `useIsMobile` - Mobile detection hook
- `useLiquidGlass` - Glass effects hook
- `useMagneticHover` - Magnetic hover hook
- `usePerformanceMonitor` - Performance monitoring hook
- `useContentAwareGlass` - Content-aware glass hook
- `useGlassEffectPerformance` - Glass performance hook
- `useRepulsionEffect` - Repulsion effect hook

### Physics System
- `PhysicsWorld` - Physics world component
- `SpringPhysics` - Spring physics
- `Spring2D` - 2D spring physics
- `ParticleEmitter` - Particle emitter
- `FluidSimulation` - Fluid simulation

## ✅ Recently Added Components

These components have been implemented and are now available in the package:

### Actions Category
- `GlassButtonGroup` - Button group component ✅
- `GlassIconButton` - Icon-only button ✅
- `GlassToggleButton` - Toggle button ✅
- `GlassFloatingAction` - Floating action button ✅

### Navigation Category
- `GlassNavbar` - Navigation bar ✅
- `GlassSidebar` - Sidebar ✅
- `GlassBreadcrumb` - Breadcrumb navigation ✅
- `GlassMenu` - Menu component ✅
- `GlassPagination` - Pagination component ✅
- `GlassStepper` - Stepper component ✅

### Inputs Category
- `GlassDatePicker` - Date picker input ✅
- `GlassFileUpload` - File upload input ✅
- `GlassRadio` - Radio button input ✅

### Presentation Category
- `GlassNotification` - Notification component ✅
- `GlassToast` - Toast notification ✅
- `GlassChart` - Chart component ✅

### Containment Category
- `GlassCommand` - Command component ✅

### Layout Category
- `GlassHeader` - Header component ✅
- `GlassFooter` - Footer component ✅

## 🔧 Usage Guidelines

### What Works
```typescript
// ✅ These imports work
import { 
  GlassButton, 
  GlassCard, 
  GlassInput,
  GlassSearch,
  GlassSelect,
  GlassSlider,
  GlassModal,
  GlassLoading,
  GlassTabs,
  ThemeProvider 
} from 'liquidify'
```

### What Doesn't Work
```typescript
// ❌ These imports will fail
import { 
  GlassButtonGroup,
  GlassIconButton,
  GlassNavbar,
  GlassSidebar,
  GlassNotification,
  GlassToast,
  GlassChart,
  GlassHeader,
  GlassFooter
} from 'liquidify'
```

### Alternative Approaches
```typescript
// ✅ Use these instead
import { 
  Navbar,        // instead of GlassNavbar
  Sidebar,       // instead of GlassSidebar
  BarChart,      // instead of GlassChart
  LineChart,     // instead of GlassChart
  DonutChart     // instead of GlassChart
} from 'liquidify'
```

## 📋 Recommendations

1. **Update Documentation**: Remove or update documentation for components that don't exist
2. **Implement Missing Components**: Add the documented components to the package
3. **Update Showcase**: Use only available components in demos
4. **Version Documentation**: Clearly indicate which components are available in which versions
5. **Import Validation**: Add TypeScript strict checking to prevent importing non-existent components

## 🎯 Priority Implementation

If implementing missing components, prioritize:

1. **High Priority**: `GlassNavbar`, `GlassSidebar`, `GlassNotification`, `GlassToast`
2. **Medium Priority**: `GlassButtonGroup`, `GlassIconButton`, `GlassHeader`, `GlassFooter`
3. **Low Priority**: `GlassBreadcrumb`, `GlassPagination`, `GlassStepper`, `GlassDatePicker`

## 🔄 Maintenance

This document should be updated whenever:
- New components are added to the package
- Components are removed or renamed
- Documentation is updated
- New versions are released

---

*Last updated: Current*
*Package version: 1.0.22*