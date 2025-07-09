// Core Apple HIG Liquid Glass Component
export { default as AppleLiquidGlass } from './AppleLiquidGlass'

// Legacy components (for backward compatibility)
export { default as GlassEffect } from './GlassEffect'
export { default as GlassCard } from './GlassCard'
export { default as GlassButton } from './GlassButton'
export { default as GlassBackground } from './GlassBackground'

// Actions Category
export { default as GlassButtonGroup } from './GlassButtonGroup'
export { default as GlassIconButton } from './GlassIconButton'
export { default as GlassToggleButton } from './GlassToggleButton'
export { default as GlassFloatingAction } from './GlassFloatingAction'

// Navigation Category
export { default as GlassNavbar } from './GlassNavbar'
export { default as GlassSidebar } from './GlassSidebar'
export { default as GlassBreadcrumb } from './GlassBreadcrumb'
export { default as GlassMenu } from './GlassMenu'
export { default as GlassPagination } from './GlassPagination'
export { default as GlassStepper } from './GlassStepper'

// Inputs Category
export { default as GlassDatePicker } from './GlassDatePicker'
export { default as GlassFileUpload } from './GlassFileUpload'
export { default as GlassRadio } from './GlassRadio'

// Presentation Category
export { default as GlassNotification } from './GlassNotification'
export { default as GlassToast } from './GlassToast'
export { default as GlassChart } from './GlassChart'

// Containment Category
export { default as GlassCommand } from './GlassCommand'

// Layout Category
export { default as GlassHeader } from './GlassHeader'
export { default as GlassFooter } from './GlassFooter'

// Demo & Animation Components
export { default as AnimationDemo } from '../AnimationDemo'
export { default as PageTransition } from '../PageTransition'
export { default as LiquidifyInteractiveDemo } from '../LiquidifyInteractiveDemo'
export { default as SimpleShowcase } from '../SimpleShowcase'

// Utility Functions & Performance
export { default as performanceUtils, usePerformanceOptimization } from '../../lib/performance-utils'
export * from '../../lib/enhanced-animations'
export * from '../../lib/liquid-glass-animations'

// Core Apple HIG Type exports
export type { AppleLiquidGlassProps } from './AppleLiquidGlass'

// Legacy type exports (for backward compatibility)
export type { GlassEffectProps } from './GlassEffect'
export type { GlassCardProps } from './GlassCard'
export type { GlassButtonProps } from './GlassButton'
export type { GlassBackgroundProps } from './GlassBackground'

// Actions Category Types
export type { GlassButtonGroupProps } from './GlassButtonGroup'
export type { GlassIconButtonProps } from './GlassIconButton'
export type { GlassToggleButtonProps } from './GlassToggleButton'
export type { GlassFloatingActionProps } from './GlassFloatingAction'

// Navigation Category Types
export type { GlassNavbarProps } from './GlassNavbar'
export type { GlassSidebarProps } from './GlassSidebar'
export type { GlassBreadcrumbProps, BreadcrumbItem } from './GlassBreadcrumb'
export type { GlassMenuProps, MenuItem } from './GlassMenu'
export type { GlassPaginationProps } from './GlassPagination'
export type { GlassStepperProps, Step } from './GlassStepper'

// Inputs Category Types
export type { GlassDatePickerProps } from './GlassDatePicker'
export type { GlassFileUploadProps } from './GlassFileUpload'
export type { GlassRadioProps } from './GlassRadio'

// Presentation Category Types
export type { GlassNotificationProps } from './GlassNotification'
export type { GlassToastProps } from './GlassToast'
export type { GlassChartProps, ChartDataPoint } from './GlassChart'

// Containment Category Types
export type { GlassCommandProps } from './GlassCommand'

// Layout Category Types
export type { GlassHeaderProps } from './GlassHeader'
export type { GlassFooterProps } from './GlassFooter'

// Apple HIG Design System Utilities
export * from '../../lib/apple-design-system'
export * from '../../lib/apple-hig-system'

// Common utilities
export { cn } from '../../lib/utils'
