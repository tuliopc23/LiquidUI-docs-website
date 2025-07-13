'use client';

import React from 'react';
import { cn } from 'liquidify';

export interface Step {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  status?: 'completed' | 'current' | 'upcoming';
  disabled?: boolean;
}

export interface GlassStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  showConnectors?: boolean;
  className?: string;
}

const GlassStepper: React.FC<GlassStepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  orientation = 'horizontal',
  size = 'md',
  showConnectors = true,
  className,
  ...props
}) => {
  const sizeStyles = {
    sm: {
      circle: 'w-6 h-6 text-xs',
      text: 'text-sm',
      spacing: 'space-x-4',
      vSpacing: 'space-y-4',
    },
    md: {
      circle: 'w-8 h-8 text-sm',
      text: 'text-base',
      spacing: 'space-x-6',
      vSpacing: 'space-y-6',
    },
    lg: {
      circle: 'w-10 h-10 text-base',
      text: 'text-lg',
      spacing: 'space-x-8',
      vSpacing: 'space-y-8',
    },
  };

  const getStepStatus = (
    stepIndex: number
  ): 'completed' | 'current' | 'upcoming' => {
    const step = steps[stepIndex];
    if (step?.status) {
      return step.status;
    }

    if (stepIndex < currentStep) {
      return 'completed';
    }
    if (stepIndex === currentStep) {
      return 'current';
    }
    return 'upcoming';
  };

  const getStepStyles = (status: 'completed' | 'current' | 'upcoming') => {
    switch (status) {
      case 'completed':
        return {
          circle: 'bg-green-500 text-white border-green-500',
          text: 'text-white',
          connector: 'bg-green-500',
        };
      case 'current':
        return {
          circle: 'bg-blue-500 text-white border-blue-500',
          text: 'text-white',
          connector: 'bg-white/30',
        };
      case 'upcoming':
        return {
          circle: 'bg-white/20 text-white/70 border-white/30',
          text: 'text-white/70',
          connector: 'bg-white/20',
        };
    }
  };

  const handleStepClick = (stepIndex: number) => {
    const step = steps[stepIndex];
    if (step?.disabled) {
      return;
    }
    onStepClick?.(stepIndex);
  };

  const baseClasses = cn(
    'p-4 rounded-lg',
    orientation === 'horizontal' ? 'flex items-center' : 'flex flex-col',
    orientation === 'horizontal'
      ? sizeStyles[size].spacing
      : sizeStyles[size].vSpacing,
    className
  );

  const renderStep = (step: Step, index: number) => {
    const status = getStepStatus(index);
    const styles = getStepStyles(status);
    const isClickable = onStepClick && !step.disabled;

    return (
      <div
        key={step.id}
        className={cn(
          'flex items-center',
          orientation === 'vertical' && 'flex-col text-center',
          orientation === 'horizontal' && 'flex-col items-center',
          isClickable && 'cursor-pointer',
          step.disabled && 'opacity-50 cursor-not-allowed'
        )}
        onClick={() => handleStepClick(index)}
      >
        <div
          className={cn(
            'flex items-center justify-center rounded-full border-2',
            'font-medium transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-white/50',
            sizeStyles[size].circle,
            styles.circle,
            isClickable && 'hover:scale-110'
          )}
        >
          {status === 'completed' ? (
            <svg
              className='w-4 h-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 13l4 4L19 7'
              />
            </svg>
          ) : step.icon ? (
            step.icon
          ) : (
            <span>{index + 1}</span>
          )}
        </div>

        <div className={cn('mt-2 text-center', sizeStyles[size].text)}>
          <div className={cn('font-medium', styles.text)}>{step.title}</div>
          {step.description && (
            <div
              className={cn(
                'text-xs mt-1 text-white/60',
                sizeStyles[size].text
              )}
            >
              {step.description}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderConnector = (index: number) => {
    if (!showConnectors || index === steps.length - 1) {
      return null;
    }

    const status = getStepStatus(index);
    const styles = getStepStyles(status);

    return (
      <div
        className={cn(
          'flex-1 h-0.5 transition-all duration-300',
          orientation === 'vertical' && 'w-0.5 h-8 mx-auto',
          styles.connector
        )}
      />
    );
  };

  return (
    <div className={baseClasses} {...props}>
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          {renderStep(step, index)}
          {renderConnector(index)}
        </React.Fragment>
      ))}
    </div>
  );
};

export default GlassStepper;
