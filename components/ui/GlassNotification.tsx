'use client';

import React, { useState, useEffect } from 'react';
import AppleLiquidGlass, { AppleLiquidGlassProps } from './AppleLiquidGlass';
import { cn } from '@/lib/utils';

export interface GlassNotificationProps
  extends Omit<AppleLiquidGlassProps, 'variant' | 'children'> {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  closable?: boolean;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
  actions?: React.ReactNode;
  className?: string;
}

const GlassNotification = React.forwardRef<
  HTMLDivElement,
  GlassNotificationProps
>(
  (
    {
      type = 'info',
      title,
      message,
      closable = true,
      onClose,
      autoClose = false,
      autoCloseDelay = 5000,
      actions,
      className,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      if (autoClose) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => onClose?.(), 300);
        }, autoCloseDelay);

        return () => clearTimeout(timer);
      }

      return () => {
        // No cleanup needed when autoClose is false
      };
    }, [autoClose, autoCloseDelay, onClose]);

    const typeStyles = {
      info: {
        icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        color: 'text-blue-400',
        bg: 'bg-blue-500/20',
        border: 'border-blue-500/30',
      },
      success: {
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        color: 'text-green-400',
        bg: 'bg-green-500/20',
        border: 'border-green-500/30',
      },
      warning: {
        icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z',
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/20',
        border: 'border-yellow-500/30',
      },
      error: {
        icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
        color: 'text-red-400',
        bg: 'bg-red-500/20',
        border: 'border-red-500/30',
      },
    };

    const handleClose = () => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300);
    };

    const currentStyle = typeStyles[type];

    const baseClasses = cn(
      'flex items-start space-x-3 p-4 rounded-lg border',
      'transition-all duration-300 ease-in-out',
      'backdrop-blur-xl',
      currentStyle.bg,
      currentStyle.border,
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
      className
    );

    if (!isVisible && !autoClose) {
      return null;
    }

    return (
      <AppleLiquidGlass
        ref={ref}
        variant='modal'
        size='sm'
        prominence='secondary'
        intensity='regular'
        interactive={closable}
        className={baseClasses}
        {...props}
      >
        <div className={cn('flex-shrink-0 w-5 h-5', currentStyle.color)}>
          <svg fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d={currentStyle.icon}
            />
          </svg>
        </div>

        <div className='flex-1 min-w-0'>
          {title && (
            <h4 className='text-sm font-medium text-white mb-1'>{title}</h4>
          )}
          <p className='text-sm text-white/90'>{message}</p>
          {actions && <div className='mt-3 flex space-x-2'>{actions}</div>}
        </div>

        {closable && (
          <button
            onClick={handleClose}
            className='flex-shrink-0 p-1 rounded-md hover:bg-white/10 transition-colors'
            aria-label='Close notification'
          >
            <svg
              className='w-4 h-4 text-white/70'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        )}
      </AppleLiquidGlass>
    );
  }
);

GlassNotification.displayName = 'GlassNotification';

export default GlassNotification;
