import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';

export interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  glassMorphism?: boolean;
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, label, error, leftIcon, rightIcon, glassMorphism = true, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-1.5 text-foreground">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full rounded-xl border bg-white/5 dark:bg-black/5 text-foreground',
              'focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200',
              leftIcon ? 'pl-10' : 'pl-4',
              rightIcon ? 'pr-10' : 'pr-4',
              'py-2.5 text-base',
              glassMorphism && 'backdrop-blur-sm',
              error ? 'border-red-500' : 'border-white/20 dark:border-white/10',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

GlassInput.displayName = 'GlassInput';