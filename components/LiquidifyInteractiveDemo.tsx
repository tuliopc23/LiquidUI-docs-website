'use client';

import { useState, useCallback, memo } from 'react';
import {
  GlassButton,
  GlassCard,
  GlassInput,
  GlassCheckbox,
  GlassSwitch,
  GlassBadge,
  GlassProgress,
  GlassAvatar,
  GlassModal,
  GlassSelect,
  GlassSlider,
  GlassSearch,
  GlassTextarea,
  GlassLoading,
} from 'liquidify';

import { cn } from '@/utils';
import { BUTTON_VARIANTS, ANIMATION_DURATION } from '@/constants';
import { useDebouncedState, usePerformantAnimation } from '@/hooks/performance';
import { LazyComponent } from '@/components/LazyComponent';
import type { DemoState } from '@/types';

// Initial state for the demo
const initialState: DemoState = {
  inputValue: '',
  checkboxValue: false,
  switchValue: false,
  loading: false,
  progress: 65,
  searchValue: '',
  selectValue: '',
  sliderValue: 50,
  textareaValue: '',
  activeTab: 'tab1',
  isModalOpen: false,
};

// Memoized static data
const selectOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const badgeVariants = [
  { variant: 'default', label: 'Default' },
  { variant: 'success', label: 'Success' },
  { variant: 'warning', label: 'Warning' },
  { variant: 'error', label: 'Error' },
] as const;

// Memoized sub-components for better performance
const ButtonSection = memo(
  ({
    loading,
    onButtonClick,
  }: {
    loading: boolean;
    onButtonClick: () => void;
  }) => (
    <GlassCard className='p-6'>
      <h3 className='hig-headline mb-4'>Glass Buttons</h3>
      <div className='flex flex-wrap gap-4'>
        <GlassButton
          variant='primary'
          onClick={onButtonClick}
          loading={loading}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Primary Action'}
        </GlassButton>
        {BUTTON_VARIANTS.slice(1).map(variant => (
          <GlassButton
            key={variant}
            variant={variant}
            size={
              variant === 'tertiary' ? 'sm' : variant === 'ghost' ? 'lg' : 'md'
            }
            disabled={variant === 'destructive'}
          >
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
            {variant === 'tertiary' && ' Small'}
            {variant === 'ghost' && ' Large'}
            {variant === 'destructive' && ' (Disabled)'}
          </GlassButton>
        ))}
      </div>
    </GlassCard>
  )
);

const FormSection = memo(
  ({
    state,
    handlers,
  }: {
    state: DemoState;
    handlers: {
      handleInputChange: (value: string) => void;
      handleCheckboxChange: (checked: boolean) => void;
      handleSwitchChange: (checked: boolean) => void;
      handleSelectChange: (value: string) => void;
      handleSliderChange: (value: number) => void;
      handleTextareaChange: (value: string) => void;
    };
  }) => (
    <GlassCard className='p-6'>
      <h3 className='hig-headline mb-4'>Form Controls</h3>
      <div className='space-y-4'>
        {/* Input Field */}
        <div>
          <label className='hig-callout block mb-2' htmlFor='demo-input'>
            Glass Input
          </label>
          <GlassInput
            id='demo-input'
            placeholder='Enter some text...'
            value={state.inputValue}
            onChange={e => handlers.handleInputChange(e.target.value)}
            className='w-full max-w-sm'
          />
          {state.inputValue && (
            <p className='hig-caption-1 mt-2 text-apple-gray-500'>
              You typed: {state.inputValue}
            </p>
          )}
        </div>

        {/* Search Field */}
        <div>
          <label className='hig-callout block mb-2' htmlFor='demo-search'>
            Glass Search
          </label>
          <GlassSearch
            placeholder='Search components...'
            className='w-full max-w-sm'
          />
        </div>

        {/* Select Field */}
        <div>
          <label className='hig-callout block mb-2' htmlFor='demo-select'>
            Glass Select
          </label>
          <GlassSelect
            value={state.selectValue}
            onChange={handlers.handleSelectChange}
            options={selectOptions as { value: string; label: string }[]}
            placeholder='Select an option...'
            className='w-full max-w-sm'
          />
        </div>

        {/* Textarea Field */}
        <div>
          <label className='hig-callout block mb-2' htmlFor='demo-textarea'>
            Glass Textarea
          </label>
          <GlassTextarea
            id='demo-textarea'
            placeholder='Enter a longer message...'
            value={state.textareaValue}
            onChange={e => handlers.handleTextareaChange(e.target.value)}
            rows={3}
            className='w-full max-w-sm'
          />
        </div>

        {/* Slider */}
        <div>
          <label className='hig-callout block mb-2' htmlFor='demo-slider'>
            Glass Slider: {state.sliderValue}%
          </label>
          <GlassSlider
            value={state.sliderValue}
            onChange={handlers.handleSliderChange}
            min={0}
            max={100}
            step={1}
            className='w-full max-w-sm'
          />
        </div>

        {/* Checkbox and Switch */}
        <div className='flex items-center gap-4'>
          <GlassCheckbox
            checked={state.checkboxValue}
            onChange={e => handlers.handleCheckboxChange(e.target.checked)}
            label='Glass Checkbox'
          />
          <GlassSwitch
            checked={state.switchValue}
            onChange={handlers.handleSwitchChange}
            label='Glass Switch'
          />
        </div>
      </div>
    </GlassCard>
  )
);

const DisplaySection = memo(
  ({
    state,
    handlers,
  }: {
    state: DemoState;
    handlers: {
      handleModalToggle: () => void;
      updateProgress: () => void;
      resetProgress: () => void;
    };
  }) => (
    <GlassCard className='p-6'>
      <h3 className='hig-headline mb-4'>Display Components</h3>
      <div className='space-y-6'>
        {/* Avatars and Badges */}
        <div className='flex items-center gap-4'>
          <GlassAvatar
            src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
            alt='User Avatar'
            size='lg'
            status='online'
          />
          <div className='space-y-2'>
            <div className='flex gap-2'>
              {badgeVariants.map(({ variant, label }) => (
                <GlassBadge key={variant} variant={variant}>
                  {label}
                </GlassBadge>
              ))}
            </div>
            <p className='hig-caption-1 text-apple-gray-500'>
              Avatar with status indicator and various badge styles
            </p>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div className='flex items-center justify-between mb-2'>
            <span className='hig-callout'>Progress: {state.progress}%</span>
            <div className='flex gap-2'>
              <GlassButton
                size='sm'
                onClick={handlers.updateProgress}
                disabled={state.progress >= 100}
              >
                +10%
              </GlassButton>
              <GlassButton
                size='sm'
                variant='secondary'
                onClick={handlers.resetProgress}
                disabled={state.progress === 0}
              >
                Reset
              </GlassButton>
            </div>
          </div>
          <GlassProgress value={state.progress} className='w-full max-w-sm' />
        </div>

        {/* Modal Demo */}
        <div>
          <GlassButton onClick={handlers.handleModalToggle}>
            Open Modal Demo
          </GlassButton>
          <GlassModal
            isOpen={state.isModalOpen}
            onClose={handlers.handleModalToggle}
            title='Demo Modal'
          >
            <div className='space-y-4'>
              <p className='hig-body'>
                This is a glass modal component with backdrop blur and smooth
                animations.
              </p>
              <div className='flex justify-end gap-2'>
                <GlassButton
                  variant='secondary'
                  onClick={handlers.handleModalToggle}
                >
                  Cancel
                </GlassButton>
                <GlassButton onClick={handlers.handleModalToggle}>
                  Confirm
                </GlassButton>
              </div>
            </div>
          </GlassModal>
        </div>

        {/* Loading State */}
        {state.loading && (
          <div className='flex items-center justify-center p-8'>
            <GlassLoading size='lg' />
          </div>
        )}
      </div>
    </GlassCard>
  )
);

// Add display names for debugging
ButtonSection.displayName = 'ButtonSection';
FormSection.displayName = 'FormSection';
DisplaySection.displayName = 'DisplaySection';

/**
 * Interactive demo component showcasing Liquidify components
 * Optimized with memoization, debouncing, and lazy loading
 */
function LiquidifyInteractiveDemo() {
  const [state, setState] = useState<DemoState>(initialState);
  const shouldAnimate = usePerformantAnimation();

  // Use debounced state for text inputs to improve performance
  const [, , setDebouncedInputValue] = useDebouncedState(state.inputValue, 300);
  const [, , setDebouncedTextareaValue] = useDebouncedState(
    state.textareaValue,
    300
  );

  // Memoized handlers for better performance
  const handlers = {
    handleInputChange: useCallback(
      (value: string) => {
        setState(prev => ({ ...prev, inputValue: value }));
        setDebouncedInputValue(value);
      },
      [setDebouncedInputValue]
    ),

    handleCheckboxChange: useCallback((checked: boolean) => {
      setState(prev => ({ ...prev, checkboxValue: checked }));
    }, []),

    handleSwitchChange: useCallback((checked: boolean) => {
      setState(prev => ({ ...prev, switchValue: checked }));
    }, []),

    handleSelectChange: useCallback((value: string) => {
      setState(prev => ({ ...prev, selectValue: value }));
    }, []),

    handleSliderChange: useCallback((value: number) => {
      setState(prev => ({ ...prev, sliderValue: value }));
    }, []),

    handleTextareaChange: useCallback(
      (value: string) => {
        setState(prev => ({ ...prev, textareaValue: value }));
        setDebouncedTextareaValue(value);
      },
      [setDebouncedTextareaValue]
    ),

    handleModalToggle: useCallback(() => {
      setState(prev => ({ ...prev, isModalOpen: !prev.isModalOpen }));
    }, []),

    updateProgress: useCallback(() => {
      setState(prev => ({
        ...prev,
        progress: Math.min(prev.progress + 10, 100),
      }));
    }, []),

    resetProgress: useCallback(() => {
      setState(prev => ({ ...prev, progress: 0 }));
    }, []),

    handleButtonClick: useCallback(async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));

        // Simulate API call
        await new Promise(resolve =>
          setTimeout(resolve, ANIMATION_DURATION.SLOW * 4)
        );

        console.info('Action completed successfully!');
      } catch (error) {
        console.error('Action failed:', error);
      } finally {
        setState(prev => ({ ...prev, loading: false }));
      }
    }, []),
  };

  return (
    <div className={cn('space-y-8 p-6', shouldAnimate && 'animate-fade-in')}>
      {/* Header Section */}
      <header className='text-center mb-8'>
        <h2 className='hig-title-1 mb-4 bg-gradient-to-r from-apple-blue to-apple-purple bg-clip-text text-transparent'>
          Liquidify Interactive Demo
        </h2>
        <p className='hig-body text-apple-gray-600 dark:text-apple-gray-300'>
          Experience real Liquidify components with live interactions
        </p>
      </header>

      {/* Lazy-loaded sections for better performance */}
      <LazyComponent>
        <ButtonSection
          loading={state.loading}
          onButtonClick={handlers.handleButtonClick}
        />
      </LazyComponent>

      <LazyComponent>
        <FormSection state={state} handlers={handlers} />
      </LazyComponent>

      <LazyComponent>
        <DisplaySection
          state={state}
          handlers={{
            handleModalToggle: handlers.handleModalToggle,
            updateProgress: handlers.updateProgress,
            resetProgress: handlers.resetProgress,
          }}
        />
      </LazyComponent>
    </div>
  );
}

// Export memoized component for better performance
export default memo(LiquidifyInteractiveDemo);
