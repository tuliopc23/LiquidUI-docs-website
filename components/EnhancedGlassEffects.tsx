import React from 'react';
import { cn } from '../lib/liquidify-utils';
import { LiquidHover } from './ScrollAnimations';

// Enhanced glass morphism components for industry-leading visual effects

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'subtle' | 'medium' | 'strong' | 'premium';
  animated?: boolean;
}

export function GlassCard({
  children,
  className,
  variant = 'medium',
  animated = true
}: GlassCardProps) {
  const variants = {
    subtle: 'bg-white/5 backdrop-blur-md border-white/10',
    medium: 'bg-white/10 backdrop-blur-lg border-white/20',
    strong: 'bg-white/15 backdrop-blur-xl border-white/30',
    premium: 'bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-2xl border-white/30 shadow-2xl',
  };

  const glassClasses = cn(
    'relative rounded-ds border transition-all duration-300',
    'dark:bg-black/20 dark:border-white/10',
    variants[variant],
    className
  );

  if (animated) {
    return (
      <LiquidHover intensity="subtle" className={glassClasses}>
        <div className="relative z-10">
          {children}
        </div>
        {variant === 'premium' && (
          <div className="absolute inset-0 rounded-ds bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        )}
      </LiquidHover>
    );
  }

  return (
    <div className={glassClasses}>
      <div className="relative z-10">
        {children}
      </div>
      {variant === 'premium' && (
        <div className="absolute inset-0 rounded-ds bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      )}
    </div>
  );
}

interface GlassButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
}

export function GlassButton({
  children,
  className,
  variant = 'secondary',
  size = 'md',
  onClick,
  disabled = false,
}: GlassButtonProps) {
  const baseClasses = 'relative overflow-hidden font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl',
    secondary: 'bg-white/10 backdrop-blur-lg border border-white/20 text-foreground hover:bg-white/20 dark:bg-black/20 dark:border-white/10 dark:hover:bg-black/30',
    ghost: 'bg-transparent hover:bg-white/10 text-foreground dark:hover:bg-white/5',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-base rounded-ds',
    lg: 'px-6 py-3 text-lg rounded-ds',
  };

  return (
    <LiquidHover intensity="medium">
      <button
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        onClick={onClick}
        disabled={disabled}
      >
        <div className="relative z-10">
          {children}
        </div>
        <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </button>
    </LiquidHover>
  );
}

// Enhanced floating action button
interface FloatingActionButtonProps {
  children: React.ReactNode;
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  onClick?: () => void;
}

export function FloatingActionButton({
  children,
  className,
  position = 'bottom-right',
  onClick,
}: FloatingActionButtonProps) {
  const positions = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  return (
    <button
      className={cn(
        'fixed z-50 w-14 h-14 rounded-full',
        'bg-primary text-primary-foreground',
        'shadow-lg hover:shadow-xl',
        'backdrop-blur-lg border border-white/20',
        'flex items-center justify-center',
        'transition-all duration-300',
        'hover:scale-110 active:scale-95',
        positions[position],
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Glass navigation bar
interface GlassNavProps {
  children: React.ReactNode;
  className?: string;
  sticky?: boolean;
}

export function GlassNav({ children, className, sticky = true }: GlassNavProps) {
  return (
    <nav
      className={cn(
        'w-full z-40 transition-all duration-300',
        'bg-white/80 dark:bg-black/80',
        'backdrop-blur-xl border-b border-white/20',
        'dark:border-white/10',
        sticky && 'sticky top-0',
        className
      )}
    >
      <div className="relative">
        {children}
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      </div>
    </nav>
  );
}

// Enhanced tooltip with glass effect
interface GlassTooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function GlassTooltip({
  children,
  content,
  position = 'top',
  className
}: GlassTooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  const positions = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            'absolute z-50 px-3 py-2 text-sm',
            'bg-black/80 text-white rounded-lg',
            'backdrop-blur-lg border border-white/20',
            'whitespace-nowrap pointer-events-none',
            'transition-opacity duration-200',
            positions[position],
            className
          )}
        >
          {content}
          {/* Arrow */}
          <div
            className={cn(
              'absolute w-2 h-2 bg-black/80 rotate-45',
              position === 'top' && 'top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2',
              position === 'bottom' && 'bottom-full left-1/2 transform -translate-x-1/2 translate-y-1/2',
              position === 'left' && 'left-full top-1/2 transform -translate-x-1/2 -translate-y-1/2',
              position === 'right' && 'right-full top-1/2 transform translate-x-1/2 -translate-y-1/2'
            )}
          />
        </div>
      )}
    </div>
  );
}

// Glass modal/dialog
interface GlassModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function GlassModal({
  children,
  isOpen,
  onClose,
  className,
  size = 'md'
}: GlassModalProps) {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative w-full rounded-ds overflow-hidden',
          'bg-white/90 dark:bg-black/90',
          'backdrop-blur-xl border border-white/20',
          'shadow-2xl',
          sizes[size],
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}