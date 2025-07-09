'use client';

import React from 'react';
import AppleLiquidGlass, { AppleLiquidGlassProps } from './AppleLiquidGlass';
import { cn } from '@/lib/utils';

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  separator?: boolean;
  subItems?: MenuItem[];
}

export interface GlassMenuProps
  extends Omit<AppleLiquidGlassProps, 'variant' | 'children'> {
  items: MenuItem[];
  orientation?: 'horizontal' | 'vertical';
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const GlassMenu = React.forwardRef<HTMLDivElement, GlassMenuProps>(
  (
    {
      items,
      orientation = 'vertical',
      trigger,
      open,
      onOpenChange,
      className,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const [activeSubmenu, setActiveSubmenu] = React.useState<string | null>(
      null
    );
    const isOpen = open !== undefined ? open : internalOpen;

    const handleToggle = () => {
      const newOpen = !isOpen;
      setInternalOpen(newOpen);
      onOpenChange?.(newOpen);
    };

    const handleItemClick = (item: MenuItem) => {
      if (item.disabled) return;

      if (item.subItems) {
        setActiveSubmenu(activeSubmenu === item.id ? null : item.id);
      } else {
        item.onClick?.();
        if (trigger) {
          handleToggle();
        }
      }
    };

    const orientationStyles = {
      horizontal: 'flex-row space-x-1',
      vertical: 'flex-col space-y-1',
    };

    const baseClasses = cn(
      'flex p-2 rounded-lg',
      'backdrop-blur-xl',
      orientationStyles[orientation],
      trigger && 'absolute top-full left-0 mt-2 min-w-48 shadow-lg z-50',
      trigger && !isOpen && 'hidden',
      className
    );

    const renderMenuItem = (item: MenuItem, level = 0) => {
      if (item.separator) {
        return (
          <div
            key={item.id}
            className='h-px bg-white/20 my-1'
            role='separator'
          />
        );
      }

      const hasSubmenu = item.subItems && item.subItems.length > 0;
      const isSubmenuOpen = activeSubmenu === item.id;

      return (
        <div key={item.id} className='relative'>
          <div
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-md',
              'text-sm text-white/90 cursor-pointer',
              'hover:bg-white/10 transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-white/50',
              item.disabled &&
                'opacity-50 cursor-not-allowed pointer-events-none',
              level > 0 && 'pl-6'
            )}
            onClick={() => handleItemClick(item)}
            role='menuitem'
            tabIndex={item.disabled ? -1 : 0}
          >
            {item.icon && (
              <span className='w-4 h-4 text-white/70'>{item.icon}</span>
            )}

            <span className='flex-1'>{item.label}</span>

            {hasSubmenu && (
              <svg
                className={cn(
                  'w-4 h-4 text-white/70 transition-transform duration-200',
                  isSubmenuOpen && 'rotate-90'
                )}
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            )}
          </div>

          {hasSubmenu && isSubmenuOpen && (
            <div className='mt-1 ml-4 space-y-1'>
              {item.subItems!.map(subItem =>
                renderMenuItem(subItem, level + 1)
              )}
            </div>
          )}
        </div>
      );
    };

    if (trigger) {
      return (
        <div className='relative'>
          <div onClick={handleToggle} className='cursor-pointer'>
            {trigger}
          </div>

          <AppleLiquidGlass
            ref={ref}
            variant='modal'
            size='sm'
            prominence='secondary'
            intensity='regular'
            interactive={true}
            className={baseClasses}
            role='menu'
            {...props}
          >
            {items.map(item => renderMenuItem(item))}
          </AppleLiquidGlass>
        </div>
      );
    }

    return (
      <AppleLiquidGlass
        ref={ref}
        variant='navigation'
        size='sm'
        prominence='secondary'
        intensity='regular'
        interactive={true}
        className={baseClasses}
        role='menu'
        {...props}
      >
        {items.map(item => renderMenuItem(item))}
      </AppleLiquidGlass>
    );
  }
);

GlassMenu.displayName = 'GlassMenu';

export default GlassMenu;
