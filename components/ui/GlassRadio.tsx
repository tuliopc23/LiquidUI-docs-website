'use client';

import React from 'react';
import AppleLiquidGlass, { AppleLiquidGlassProps } from './AppleLiquidGlass';
import { cn } from '@/lib/utils';

export interface GlassRadioProps
  extends Omit<AppleLiquidGlassProps, 'variant' | 'onChange'> {
  options: { label: string; value: string }[];
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const GlassRadio = React.forwardRef<HTMLDivElement, GlassRadioProps>(
  (
    { options, name, value, onChange, disabled = false, className, ...props },
    ref
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        onChange?.(event.target.value);
      }
    };

    const baseClasses = cn(
      'flex flex-col space-y-2',
      'transition-all duration-200',
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
        {options.map((option, index) => (
          <label key={index} className='flex items-center space-x-2'>
            <input
              type='radio'
              name={name}
              value={option.value}
              checked={option.value === value}
              onChange={handleChange}
              disabled={disabled}
              className='form-radio text-blue-600 h-4 w-4'
            />
            <span className='text-white/90'>{option.label}</span>
          </label>
        ))}
      </AppleLiquidGlass>
    );
  }
);

GlassRadio.displayName = 'GlassRadio';

export default GlassRadio;
