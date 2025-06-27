import React from 'react';
import { cn } from 'glass-ui-tulio';

// Placeholder components for missing liquidi-ui components
// These will be replaced when the full liquidi-ui package is available

interface PlaceholderProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

const createPlaceholderComponent = (name: string) => {
  const Component = React.forwardRef<HTMLDivElement, PlaceholderProps>(
    ({ children, className, ...props }, ref) => (
      <div
        ref={ref}
        className={cn(
          "glass-effect rounded-lg p-4 border border-white/20",
          "bg-white/10 backdrop-blur-sm",
          className
        )}
        {...props}
      >
        {children || (
          <div className="text-center text-sm text-gray-500">
            {name} Component (Coming Soon)
          </div>
        )}
      </div>
    )
  );
  Component.displayName = name;
  return Component;
};

// Export all missing components as placeholders
export const GlassAvatar = createPlaceholderComponent('GlassAvatar');
export const GlassChart = createPlaceholderComponent('GlassChart');
export const GlassCheckbox = createPlaceholderComponent('GlassCheckbox');
export const GlassCommand = createPlaceholderComponent('GlassCommand');
export const GlassDropdown = createPlaceholderComponent('GlassDropdown');
export const GlassLoading = createPlaceholderComponent('GlassLoading');
export const GlassMobileNav = createPlaceholderComponent('GlassMobileNav');
export const GlassModal = createPlaceholderComponent('GlassModal');
export const GlassNotification = createPlaceholderComponent('GlassNotification');
export const GlassPopover = createPlaceholderComponent('GlassPopover');
export const GlassProgress = createPlaceholderComponent('GlassProgress');
export const GlassResponsiveButton = createPlaceholderComponent('GlassResponsiveButton');
export const GlassResponsiveCard = createPlaceholderComponent('GlassResponsiveCard');
export const GlassSearch = createPlaceholderComponent('GlassSearch');
export const GlassSelect = createPlaceholderComponent('GlassSelect');
export const GlassSlider = createPlaceholderComponent('GlassSlider');
export const GlassSwitch = createPlaceholderComponent('GlassSwitch');
export const GlassTable = createPlaceholderComponent('GlassTable');
export const GlassTabs = createPlaceholderComponent('GlassTabs');
export const GlassTextarea = createPlaceholderComponent('GlassTextarea');
export const GlassToast = createPlaceholderComponent('GlassToast');
export const GlassTooltip = createPlaceholderComponent('GlassTooltip');
export const Navbar = createPlaceholderComponent('Navbar');
export const Sidebar = createPlaceholderComponent('Sidebar');
export const ThemeProvider = createPlaceholderComponent('ThemeProvider');
export const ThemeToggle = createPlaceholderComponent('ThemeToggle');
