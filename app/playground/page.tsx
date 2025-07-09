'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  GlassButton,
  GlassCard,
  GlassInput,
  GlassSelect,
  GlassSlider,
  GlassSwitch,
  GlassCheckbox,
  GlassAvatar,
  GlassBadge,
  GlassProgress,
  GlassModal,
  GlassTooltip,
  GlassDropdown,
  GlassSearch,
  GlassTextarea,
  GlassLoading,
  GlassTabs,
  ThemeProvider,
} from 'liquidify';
import { ComponentShowcase } from '@/components/ComponentShowcase';
import { PhysicsShowcase } from '@/components/PhysicsShowcase';
import ResponsiveDemo from '@/components/ResponsiveShowcase';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  springAnimations,
  scrollAnimations,
  pageTransitions,
} from '@/lib/enhanced-animations';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Component configurations
const componentConfigs = {
  GlassButton: {
    component: GlassButton,
    componentName: 'GlassButton',
    description:
      'Interactive buttons with liquid glass effects and magnetic hover animations',
    variants: [
      {
        name: 'Primary',
        props: { variant: 'primary', size: 'md' },
        description: 'Primary action button with emphasis',
      },
      {
        name: 'Secondary',
        props: { variant: 'secondary', size: 'md' },
        description: 'Secondary action button',
      },
      {
        name: 'Outline',
        props: { variant: 'outline', size: 'md' },
        description: 'Outline button with transparent background',
      },
      {
        name: 'Ghost',
        props: { variant: 'ghost', size: 'md' },
        description: 'Minimal ghost button',
      },
    ],
    propControls: [
      {
        name: 'variant',
        type: 'select' as const,
        defaultValue: 'primary',
        options: [
          { value: 'primary', label: 'Primary' },
          { value: 'secondary', label: 'Secondary' },
          { value: 'outline', label: 'Outline' },
          { value: 'ghost', label: 'Ghost' },
          { value: 'destructive', label: 'Destructive' },
        ],
        description: 'Button variant style',
      },
      {
        name: 'size',
        type: 'select' as const,
        defaultValue: 'md',
        options: [
          { value: 'xs', label: 'Extra Small' },
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' },
          { value: 'xl', label: 'Extra Large' },
        ],
        description: 'Button size',
      },
      {
        name: 'disabled',
        type: 'boolean' as const,
        defaultValue: false,
        description: 'Disable button interaction',
      },
    ],
    children: 'Click me!',
  },

  GlassCard: {
    component: GlassCard,
    componentName: 'GlassCard',
    description: 'Container with liquid glass effects and depth shadows',
    variants: [
      {
        name: 'Default',
        props: { hover: false },
        description: 'Standard glass card',
      },
      {
        name: 'Hover Effects',
        props: { hover: true },
        description: 'Card with hover animations',
      },
      {
        name: 'Elevated',
        props: { hover: true, className: 'shadow-2xl' },
        description: 'Card with enhanced elevation',
      },
    ],
    propControls: [
      {
        name: 'hover',
        type: 'boolean' as const,
        defaultValue: false,
        description: 'Enable hover animations',
      },
      {
        name: 'className',
        type: 'string' as const,
        defaultValue: '',
        description: 'Additional CSS classes',
      },
    ],
    children: (
      <div className='p-6'>
        <h3 className='text-lg font-semibold mb-2'>Card Title</h3>
        <p className='text-gray-600 dark:text-gray-400'>
          This is a glass card with liquid effects and beautiful typography.
        </p>
      </div>
    ),
  },

  GlassInput: {
    component: GlassInput,
    componentName: 'GlassInput',
    description: 'Text input with glass morphism and focus animations',
    variants: [
      {
        name: 'Default',
        props: { placeholder: 'Enter text...' },
        description: 'Standard text input',
      },
      {
        name: 'With Icon',
        props: { placeholder: 'Search...', type: 'search' },
        description: 'Input with search functionality',
      },
      {
        name: 'Password',
        props: { type: 'password', placeholder: 'Password' },
        description: 'Password input with masking',
      },
    ],
    propControls: [
      {
        name: 'placeholder',
        type: 'string' as const,
        defaultValue: 'Enter text...',
        description: 'Input placeholder text',
      },
      {
        name: 'type',
        type: 'select' as const,
        defaultValue: 'text',
        options: [
          { value: 'text', label: 'Text' },
          { value: 'email', label: 'Email' },
          { value: 'password', label: 'Password' },
          { value: 'search', label: 'Search' },
          { value: 'number', label: 'Number' },
        ],
        description: 'Input type',
      },
      {
        name: 'disabled',
        type: 'boolean' as const,
        defaultValue: false,
        description: 'Disable input',
      },
    ],
  },

  GlassSlider: {
    component: GlassSlider,
    componentName: 'GlassSlider',
    description: 'Range slider with liquid glass track and magnetic thumb',
    variants: [
      {
        name: 'Default',
        props: { min: 0, max: 100, value: 50 },
        description: 'Standard range slider',
      },
      {
        name: 'Stepped',
        props: { min: 0, max: 100, step: 10, value: 50 },
        description: 'Slider with step increments',
      },
      {
        name: 'Custom Range',
        props: { min: -50, max: 50, value: 0 },
        description: 'Slider with custom range',
      },
    ],
    propControls: [
      {
        name: 'min',
        type: 'number' as const,
        defaultValue: 0,
        description: 'Minimum value',
      },
      {
        name: 'max',
        type: 'number' as const,
        defaultValue: 100,
        description: 'Maximum value',
      },
      {
        name: 'step',
        type: 'number' as const,
        defaultValue: 1,
        description: 'Step increment',
      },
      {
        name: 'value',
        type: 'slider' as const,
        defaultValue: 50,
        min: 0,
        max: 100,
        description: 'Current value',
      },
      {
        name: 'disabled',
        type: 'boolean' as const,
        defaultValue: false,
        description: 'Disable slider',
      },
    ],
  },

  GlassSwitch: {
    component: GlassSwitch,
    componentName: 'GlassSwitch',
    description: 'Toggle switch with liquid glass animations',
    variants: [
      {
        name: 'Default',
        props: { label: 'Toggle me' },
        description: 'Standard toggle switch',
      },
      {
        name: 'Small',
        props: { size: 'sm', label: 'Small toggle' },
        description: 'Compact toggle switch',
      },
      {
        name: 'Large',
        props: { size: 'lg', label: 'Large toggle' },
        description: 'Larger toggle switch',
      },
    ],
    propControls: [
      {
        name: 'label',
        type: 'string' as const,
        defaultValue: 'Toggle me',
        description: 'Switch label',
      },
      {
        name: 'size',
        type: 'select' as const,
        defaultValue: 'md',
        options: [
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' },
        ],
        description: 'Switch size',
      },
      {
        name: 'disabled',
        type: 'boolean' as const,
        defaultValue: false,
        description: 'Disable switch',
      },
    ],
  },

  GlassProgress: {
    component: GlassProgress,
    componentName: 'GlassProgress',
    description: 'Progress bar with liquid glass effects and smooth animations',
    variants: [
      {
        name: 'Default',
        props: { value: 65, max: 100 },
        description: 'Standard progress bar',
      },
      {
        name: 'With Value',
        props: { value: 80, max: 100, showValue: true },
        description: 'Progress bar with value display',
      },
      {
        name: 'Colored',
        props: { value: 45, max: 100, color: 'blue' },
        description: 'Progress bar with custom color',
      },
    ],
    propControls: [
      {
        name: 'value',
        type: 'slider' as const,
        defaultValue: 65,
        min: 0,
        max: 100,
        description: 'Progress value',
      },
      {
        name: 'max',
        type: 'number' as const,
        defaultValue: 100,
        description: 'Maximum value',
      },
      {
        name: 'showValue',
        type: 'boolean' as const,
        defaultValue: false,
        description: 'Show progress value',
      },
      {
        name: 'color',
        type: 'select' as const,
        defaultValue: 'blue',
        options: [
          { value: 'blue', label: 'Blue' },
          { value: 'green', label: 'Green' },
          { value: 'red', label: 'Red' },
          { value: 'purple', label: 'Purple' },
          { value: 'orange', label: 'Orange' },
        ],
        description: 'Progress bar color',
      },
    ],
  },

  GlassBadge: {
    component: GlassBadge,
    componentName: 'GlassBadge',
    description: 'Badge component with glass effects and status indicators',
    variants: [
      {
        name: 'Default',
        props: { variant: 'default' },
        description: 'Standard badge',
      },
      {
        name: 'Success',
        props: { variant: 'success' },
        description: 'Success state badge',
      },
      {
        name: 'Warning',
        props: { variant: 'warning' },
        description: 'Warning state badge',
      },
      {
        name: 'Error',
        props: { variant: 'error' },
        description: 'Error state badge',
      },
    ],
    propControls: [
      {
        name: 'variant',
        type: 'select' as const,
        defaultValue: 'default',
        options: [
          { value: 'default', label: 'Default' },
          { value: 'success', label: 'Success' },
          { value: 'warning', label: 'Warning' },
          { value: 'error', label: 'Error' },
        ],
        description: 'Badge variant',
      },
    ],
    children: 'Badge',
  },

  GlassLoading: {
    component: GlassLoading,
    componentName: 'GlassLoading',
    description: 'Loading indicators with liquid glass animations',
    variants: [
      {
        name: 'Spinner',
        props: { variant: 'spinner', size: 'md' },
        description: 'Spinning loading indicator',
      },
      {
        name: 'Dots',
        props: { variant: 'dots', size: 'md' },
        description: 'Dots loading animation',
      },
      {
        name: 'Pulse',
        props: { variant: 'pulse', size: 'md' },
        description: 'Pulse loading animation',
      },
    ],
    propControls: [
      {
        name: 'variant',
        type: 'select' as const,
        defaultValue: 'spinner',
        options: [
          { value: 'spinner', label: 'Spinner' },
          { value: 'dots', label: 'Dots' },
          { value: 'pulse', label: 'Pulse' },
        ],
        description: 'Loading variant',
      },
      {
        name: 'size',
        type: 'select' as const,
        defaultValue: 'md',
        options: [
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' },
        ],
        description: 'Loading size',
      },
    ],
  },
};

// Category organization
const categories = {
  Actions: ['GlassButton'],
  Inputs: ['GlassInput', 'GlassSlider', 'GlassSwitch'],
  'Data Display': ['GlassCard', 'GlassProgress', 'GlassBadge'],
  Feedback: ['GlassLoading'],
};

export default function PlaygroundPage() {
  const [selectedComponent, setSelectedComponent] =
    useState<string>('GlassButton');
  const [activeCategory, setActiveCategory] = useState<string>('Actions');
  const [searchQuery, setSearchQuery] = useState('');
  const [isClient, setIsClient] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Setup page animations
  useEffect(() => {
    if (!isClient || !pageRef.current) return;

    const page = pageRef.current;

    // Page entrance animation
    pageTransitions.fadeIn(0.8);
    pageTransitions.staggerReveal('.playground-section', 0.1);

    // Scroll animations
    scrollAnimations.revealOnScroll('.component-showcase');

    return () => {
      gsap.killTweensOf(page);
      ScrollTrigger.killAll();
    };
  }, [isClient]);

  // Filter components based on search
  const filteredComponents = Object.keys(componentConfigs).filter(
    name =>
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      componentConfigs[name as keyof typeof componentConfigs].description
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  // Get components for active category
  const categoryComponents =
    categories[activeCategory as keyof typeof categories] || [];

  if (!isClient) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-pulse text-lg'>Loading playground...</div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div
        ref={pageRef}
        className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'
      >
        {/* Header */}
        <div className='playground-section sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700'>
          <div className='container mx-auto px-4 py-6'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div>
                <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                  Liquidify Playground
                </h1>
                <p className='text-gray-600 dark:text-gray-400 mt-2'>
                  Interactive component demonstrations with real-time editing
                </p>
              </div>

              <div className='flex items-center gap-4'>
                <GlassSearch
                  placeholder='Search components...'
                  onSearch={(query: string) => setSearchQuery(query)}
                  className='mb-6'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='container mx-auto px-4 py-8'>
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
            {/* Sidebar */}
            <div className='lg:col-span-1'>
              <div className='playground-section sticky top-32'>
                <GlassCard className='p-6'>
                  <h3 className='text-lg font-semibold mb-4'>Categories</h3>

                  <div className='space-y-2'>
                    {Object.keys(categories).map(category => (
                      <GlassButton
                        key={category}
                        variant={
                          activeCategory === category ? 'primary' : 'ghost'
                        }
                        size='sm'
                        onClick={() => setActiveCategory(category)}
                        className='w-full justify-start'
                      >
                        {category}
                      </GlassButton>
                    ))}
                  </div>

                  <div className='mt-6 pt-6 border-t border-gray-200 dark:border-gray-700'>
                    <h4 className='text-sm font-medium mb-3'>Components</h4>
                    <div className='space-y-1'>
                      {(searchQuery
                        ? filteredComponents
                        : categoryComponents
                      ).map(componentName => (
                        <GlassButton
                          key={componentName}
                          variant={
                            selectedComponent === componentName
                              ? 'secondary'
                              : 'ghost'
                          }
                          size='xs'
                          onClick={() => setSelectedComponent(componentName)}
                          className='w-full justify-start text-sm'
                        >
                          {componentName}
                        </GlassButton>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>

            {/* Main Content */}
            <div className='lg:col-span-3'>
              <div className='playground-section'>
                {selectedComponent &&
                  componentConfigs[
                    selectedComponent as keyof typeof componentConfigs
                  ] && (
                    <ComponentShowcase
                      key={selectedComponent}
                      {...componentConfigs[
                        selectedComponent as keyof typeof componentConfigs
                      ]}
                      showPhysics={true}
                      showResponsive={true}
                      className='component-showcase'
                    />
                  )}
              </div>

              {/* Physics Demo Section */}
              <div className='playground-section mt-12'>
                <PhysicsShowcase />
              </div>

              {/* Responsive Demo Section */}
              <div className='playground-section mt-12'>
                <ResponsiveDemo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
