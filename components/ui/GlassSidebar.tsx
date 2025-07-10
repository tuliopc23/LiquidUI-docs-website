'use client';

import React from 'react';
import AppleLiquidGlass, { AppleLiquidGlassProps } from './AppleLiquidGlass';
import { cn } from '@/lib/utils';

export interface GlassSidebarProps
  extends Omit<AppleLiquidGlassProps, 'variant' | 'children'> {
  children: React.ReactNode;
  position?: 'left' | 'right';
  variant?: 'fixed' | 'static' | 'overlay';
  width?: 'sm' | 'md' | 'lg' | 'xl';
  collapsible?: boolean;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const GlassSidebar = React.forwardRef<HTMLDivElement, GlassSidebarProps>(
  (
    {
      children,
      position = 'left',
      variant = 'static',
      width = 'md',
      collapsible = false,
      collapsed = false,
      onCollapsedChange,
      header,
      footer,
      className,
      ...props
    },
    ref
  ) => {
    const [internalCollapsed, setInternalCollapsed] = React.useState(collapsed);
    const isCollapsed = collapsed !== undefined ? collapsed : internalCollapsed;

    const handleToggle = () => {
      const newCollapsed = !isCollapsed;
      setInternalCollapsed(newCollapsed);
      onCollapsedChange?.(newCollapsed);
    };

    const widthStyles = {
      sm: isCollapsed ? 'w-16' : 'w-48',
      md: isCollapsed ? 'w-16' : 'w-64',
      lg: isCollapsed ? 'w-16' : 'w-80',
      xl: isCollapsed ? 'w-16' : 'w-96',
    };

    const variantStyles = {
      fixed: 'fixed top-0 bottom-0 z-40',
      static: 'relative',
      overlay: 'fixed top-0 bottom-0 z-50',
    };

    const positionStyles = {
      left: position === 'left' ? 'left-0' : '',
      right: position === 'right' ? 'right-0' : '',
    };

    const baseClasses = cn(
      'h-full flex flex-col',
      'border-r border-white/20',
      'backdrop-blur-xl',
      'transition-all duration-300 ease-in-out',
      widthStyles[width],
      variantStyles[variant],
      positionStyles[position],
      className
    );

    return (
      <AppleLiquidGlass
        ref={ref}
        variant='sidebar'
        size={width as 'xs' | 'sm' | 'md' | 'lg'}
        prominence='tertiary'
        intensity='regular'
        interactive={collapsible}
        className={baseClasses}
        {...props}
      >
        {header && (
          <div className='flex items-center justify-between p-4 border-b border-white/20'>
            {!isCollapsed && header}
            {collapsible && (
              <button
                onClick={handleToggle}
                className='p-2 rounded-lg hover:bg-white/10 transition-colors'
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <svg
                  className={cn(
                    'w-4 h-4 transition-transform duration-200',
                    isCollapsed ? 'rotate-0' : 'rotate-180'
                  )}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M11 19l-7-7 7-7m8 14l-7-7 7-7'
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        <div className='flex-1 overflow-y-auto'>
          <nav className='p-4 space-y-2'>{children}</nav>
        </div>

        {footer && (
          <div className='p-4 border-t border-white/20'>
            {!isCollapsed && footer}
          </div>
        )}
      </AppleLiquidGlass>
    );
  }
);

GlassSidebar.displayName = 'GlassSidebar';

export default GlassSidebar;
