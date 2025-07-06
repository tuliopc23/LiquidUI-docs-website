import React from 'react';
import { cn } from '../lib/utils';
import { Loader2 } from 'lucide-react';

export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  glassMorphism?: boolean;
}

export function GlassButton({
  children,
  className,
  variant = 'default',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  glassMorphism = true,
  disabled,
  ...props
}: GlassButtonProps) {
  const variants = {
    default: 'bg-white/10 hover:bg-white/20 text-foreground border border-white/20',
    primary: 'bg-blue-500/90 hover:bg-blue-600/90 text-white border border-blue-400/50',
    secondary: 'bg-gray-500/80 hover:bg-gray-600/80 text-white border border-gray-400/50',
    outline: 'bg-transparent hover:bg-white/10 text-foreground border border-white/20',
    ghost: 'bg-transparent hover:bg-white/10 text-foreground border-none',
    link: 'bg-transparent text-blue-500 hover:underline border-none p-0',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 rounded-lg',
    md: 'text-sm px-4 py-2 rounded-xl',
    lg: 'text-base px-6 py-3 rounded-xl',
  };

  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center font-medium transition-all duration-200',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        glassMorphism && variant !== 'link' && 'backdrop-blur-sm',
        isDisabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      {!loading && leftIcon && (
        <span className="mr-2">{leftIcon}</span>
      )}
      {children}
      {!loading && rightIcon && (
        <span className="ml-2">{rightIcon}</span>
      )}
    </button>
  );
}