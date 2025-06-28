import React from 'react';
import { cn } from '@tuliocunha23/liquidui';

// Temporary local implementations until package exports are fixed
// These provide the same API as the @tuliocunha23/liquidui components

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
}

export const GlassButton = ({ children, variant = 'default', size = 'default', className = '', disabled = false, loading = false, ...props }: GlassButtonProps) => (
  <button 
    className={cn(
      "glass-effect px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-all duration-200",
      disabled || loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105',
      size === 'sm' && 'px-3 py-1 text-sm',
      size === 'lg' && 'px-6 py-3 text-lg',
      size === 'icon' && 'p-2',
      variant === 'secondary' && 'bg-white/5',
      variant === 'destructive' && 'bg-red-500/20 border-red-500/30',
      variant === 'ghost' && 'bg-transparent border-transparent',
      variant === 'link' && 'bg-transparent border-transparent underline',
      className
    )}
    disabled={disabled || loading}
    {...props}
  >
    {loading ? 'Loading...' : children}
  </button>
);

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GlassCard = ({ children, className = '', ...props }: GlassCardProps) => (
  <div 
    className={cn(
      "glass-effect p-4 rounded-lg border border-white/20",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

interface GlassBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'destructive';
  children: React.ReactNode;
}

export const GlassBadge = ({ children, variant = 'default', className = '', ...props }: GlassBadgeProps) => (
  <span 
    className={cn(
      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium glass-effect border border-white/20",
      variant === 'secondary' && 'bg-white/5',
      variant === 'destructive' && 'bg-red-500/20 border-red-500/30',
      className
    )}
    {...props}
  >
    {children}
  </span>
);

export const GlassInput = ({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input 
    className={cn(
      "w-full px-3 py-2 glass-effect rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary bg-white/5",
      className
    )}
    {...props}
  />
);

// Placeholder components for missing ones
interface PlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const createPlaceholderComponent = (name: string) => {
  const Component = React.forwardRef<HTMLDivElement, PlaceholderProps>(
    ({ children, className, ...props }, ref) => (
      <div
        ref={ref}
        className={cn(
          "glass-effect rounded-lg p-4 border border-white/20 bg-white/10",
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

export const GlassModal = createPlaceholderComponent('GlassModal');
export const GlassTextarea = createPlaceholderComponent('GlassTextarea');
export const GlassSelect = createPlaceholderComponent('GlassSelect');
export const GlassProgress = createPlaceholderComponent('GlassProgress');
export const GlassToast = createPlaceholderComponent('GlassToast');
export const GlassFeatureShowcase = createPlaceholderComponent('GlassFeatureShowcase');
export const GlassFloatingAction = createPlaceholderComponent('GlassFloatingAction');
export const GlassHero = createPlaceholderComponent('GlassHero');
export const GlassHeader = createPlaceholderComponent('GlassHeader');
export const GlassFooter = createPlaceholderComponent('GlassFooter');

// Theme components
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const useTheme = () => ({ theme: 'dark', setTheme: () => {} });
export const useToast = () => ({ toast: () => {} });
export const ToastProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;