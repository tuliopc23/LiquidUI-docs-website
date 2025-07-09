'use client';

import React, { useState } from 'react';
import AppleLiquidGlass, { AppleLiquidGlassProps } from './AppleLiquidGlass';
import { cn } from '@/lib/utils';

export interface GlassDatePickerProps
  extends Omit<AppleLiquidGlassProps, 'variant' | 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const GlassDatePicker = React.forwardRef<HTMLDivElement, GlassDatePickerProps>(
  (
    {
      value = '',
      onChange,
      placeholder = 'Select date',
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(newValue);
    };

    const baseClasses = cn(
      'text-white transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-white/50',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      className
    );

    return (
      <AppleLiquidGlass
        ref={ref}
        variant='widget'
        size='md'
        prominence='secondary'
        intensity='regular'
        interactive={false}
        className={baseClasses}
        {...props}
      >
        <input
          type='date'
          value={internalValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className='w-full h-full bg-transparent text-current px-4 py-3'
        />
      </AppleLiquidGlass>
    );
  }
);

GlassDatePicker.displayName = 'GlassDatePicker';

export default GlassDatePicker;
