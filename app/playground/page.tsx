'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  GlassButton,
  GlassCard,
  GlassInput,
  GlassSlider,
  GlassSwitch,
  GlassBadge,
  GlassProgress,
  GlassSearch,
  GlassLoading,
  ThemeProvider,
} from 'liquidify';
import dynamic from 'next/dynamic';

// Dynamic imports for interactive components only
const ComponentShowcase = dynamic(
  () =>
    import('@/components/ComponentShowcase').then(mod => ({
      default: mod.ComponentShowcase,
    })),
  {
    ssr: false,
    loading: () => (
      <div className='animate-pulse bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20'>
        <div className='h-6 bg-white/20 rounded w-1/4 mb-4' />
        <div className='h-4 bg-white/20 rounded w-3/4 mb-6' />
        <div className='h-32 bg-white/20 rounded' />
      </div>
    ),
  }
);

const PhysicsShowcase = dynamic(
  () =>
    import('@/components/PhysicsShowcase').then(mod => ({
      default: mod.PhysicsShowcase,
    })),
  {
    ssr: false,
    loading: () => (
      <div className='animate-pulse bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20'>
        <div className='h-6 bg-white/20 rounded w-1/3 mb-4' />
        <div className='h-4 bg-white/20 rounded w-2/3 mb-6' />
        <div className='grid grid-cols-2 gap-4'>
          <div className='h-24 bg-white/20 rounded' />
          <div className='h-24 bg-white/20 rounded' />
        </div>
      </div>
    ),
  }
);

const ResponsiveDemo = dynamic(
  () => import('@/components/ResponsiveShowcase'),
  {
    ssr: false,
    loading: () => (
      <div className='animate-pulse bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20'>
        <div className='h-6 bg-white/20 rounded w-1/2 mb-4' />
        <div className='h-16 bg-white/20 rounded' />
      </div>
    ),
  }
);
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollAnimations, pageTransitions } from '@/lib/enhanced-animations';
import {
  AppleHIGContainer,
  AppleButton,
  AppleCard,
  AppleText,
  AppleSection,
} from '@/components/AppleHIGSystem';
// Remove unused import - appleDesign is used through AppleHIGSystem components

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
    if (!isClient || !pageRef.current) {
      return;
    }

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
      <AppleHIGContainer
        variant='page'
        enableAnimations={true}
        enableScrollEffects={true}
        className='relative overflow-hidden'
      >
        {/* Apple-style Header */}
        <div className='playground-section sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/50'>
          <div className='container mx-auto px-6 py-8'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
              <div className='space-y-3'>
                <AppleText
                  variant='largeTitle'
                  className='bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent font-bold'
                >
                  Liquidify Playground
                </AppleText>
                <AppleText
                  variant='body'
                  color='secondary'
                  className='max-w-2xl'
                >
                  Interactive component demonstrations with real-time editing
                  and Apple HIG design principles
                </AppleText>
              </div>

              <div className='flex items-center gap-4'>
                <GlassSearch
                  placeholder='Search components...'
                  onSearch={(query: string) => setSearchQuery(query)}
                  className='min-w-[280px]'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='container mx-auto px-6 py-12'>
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
            {/* Apple-style Sidebar */}
            <div className='lg:col-span-1'>
              <div className='playground-section sticky top-36'>
                <AppleCard hover={true} className='p-6 space-y-6'>
                  <div>
                    <AppleText variant='headline' className='mb-4 block'>
                      Categories
                    </AppleText>

                    <div className='space-y-2'>
                      {Object.keys(categories).map(category => (
                        <AppleButton
                          key={category}
                          variant={
                            activeCategory === category ? 'primary' : 'tertiary'
                          }
                          size='sm'
                          onClick={() => setActiveCategory(category)}
                          className='w-full justify-start text-left'
                        >
                          {category}
                        </AppleButton>
                      ))}
                    </div>
                  </div>

                  <div className='pt-6 border-t border-white/20 dark:border-gray-700/50'>
                    <AppleText
                      variant='subhead'
                      color='secondary'
                      className='mb-3 block font-medium'
                    >
                      Components
                    </AppleText>
                    <div className='space-y-1'>
                      {(searchQuery
                        ? filteredComponents
                        : categoryComponents
                      ).map(componentName => (
                        <AppleButton
                          key={componentName}
                          variant={
                            selectedComponent === componentName
                              ? 'secondary'
                              : 'tertiary'
                          }
                          size='sm'
                          onClick={() => setSelectedComponent(componentName)}
                          className='w-full justify-start text-sm'
                        >
                          {componentName}
                        </AppleButton>
                      ))}
                    </div>
                  </div>
                </AppleCard>
              </div>
            </div>

            {/* Main Content */}
            <div className='lg:col-span-3 space-y-12'>
              {/* Component Showcase Section */}
              <AppleSection
                title='Interactive Component Demo'
                subtitle='Real-time component editing with live preview and Apple HIG design standards'
                className='playground-section'
              >
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
              </AppleSection>

              {/* Physics Demo Section */}
              <AppleSection
                title='Physics & Animation System'
                subtitle='Advanced liquid glass physics with spring animations and magnetic interactions'
                className='playground-section'
              >
                <PhysicsShowcase />
              </AppleSection>

              {/* Responsive Demo Section */}
              <AppleSection
                title='Responsive Design Showcase'
                subtitle='Adaptive components that scale beautifully across all Apple devices'
                className='playground-section'
              >
                <ResponsiveDemo />
              </AppleSection>
            </div>
          </div>
        </div>
      </AppleHIGContainer>
    </ThemeProvider>
  );
}
