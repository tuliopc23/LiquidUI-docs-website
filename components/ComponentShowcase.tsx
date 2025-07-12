'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GlassButton,
  GlassCard,
  GlassInput,
  GlassSelect,
  GlassSlider,
  GlassSwitch,
} from 'liquidify';
import { MockThemeProvider } from '@/components/MockThemeProvider';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  magneticHover,
  springAnimations,
  scrollAnimations,
  microInteractions,
} from '@/lib/enhanced-animations';
import { usePerformanceMonitor, bundleUtils } from '@/lib/performance-utils';
import PerformanceMonitor from './PerformanceMonitor';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Types
interface ComponentVariant {
  name: string;
  props: Record<string, unknown>;
  description?: string;
}

interface PropControl {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'color' | 'slider';
  defaultValue: unknown;
  options?: Array<{ value: string; label: string }>;
  min?: number;
  max?: number;
  step?: number;
  description?: string;
}

interface ComponentShowcaseProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any> | React.ForwardRefExoticComponent<any>;
  componentName: string;
  description?: string;
  variants?: ComponentVariant[];
  propControls?: PropControl[];
  codeLanguage?: string;
  showResponsive?: boolean;
  showPhysics?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// Code generation utility
const generateCode = (
  componentName: string,
  props: Record<string, unknown>,
  codeLanguage = 'tsx'
): string => {
  const propsString = Object.entries(props)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key}="${value}"`;
      } else if (typeof value === 'boolean') {
        return value ? key : `${key}={false}`;
      } else if (typeof value === 'number') {
        return `${key}={${value}}`;
      } else {
        return `${key}={${JSON.stringify(value)}}`;
      }
    })
    .join('\n  ');

  const template = codeLanguage === 'jsx' ? 'jsx' : 'tsx';
  return `import { ${componentName} } from 'liquidify'

export function Example()${template === 'tsx' ? ': JSX.Element' : ''} {
  return (
    <${componentName}
      ${propsString}
    >
      ${componentName === 'GlassButton' ? 'Click me' : 'Content'}
    </${componentName}>
  )
}`;
};

// Responsive preview component
const ResponsivePreview: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>(
    'desktop'
  );

  const deviceSizes = {
    mobile: { width: '375px', height: '667px' },
    tablet: { width: '768px', height: '1024px' },
    desktop: { width: '100%', height: 'auto' },
  };

  return (
    <div className='space-y-4'>
      <div className='flex gap-2 justify-center'>
        {Object.keys(deviceSizes).map(deviceType => (
          <GlassButton
            key={deviceType}
            variant={device === deviceType ? 'primary' : 'ghost'}
            size='sm'
            onClick={() =>
              setDevice(deviceType as 'mobile' | 'tablet' | 'desktop')
            }
          >
            {deviceType}
          </GlassButton>
        ))}
      </div>

      <div className='flex justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg'>
        <div
          className='bg-white dark:bg-gray-900 rounded-lg shadow-lg transition-all duration-300 ease-in-out'
          style={{
            width: deviceSizes[device].width,
            height: deviceSizes[device].height,
            maxWidth: '100%',
            overflow: 'hidden',
          }}
        >
          <div className='p-4 h-full overflow-auto'>{children}</div>
        </div>
      </div>
    </div>
  );
};

// Physics animation wrapper
const PhysicsWrapper: React.FC<{
  children: React.ReactNode;
  enabled: boolean;
}> = ({ children, enabled }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) {
      return;
    }

    const container = containerRef.current;
    const elements = container.querySelectorAll('.physics-element');

    const cleanupFunctions: (() => void)[] = [];

    elements.forEach((element, index) => {
      // Magnetic hover effect
      const magneticCleanup = magneticHover.magnetic(element, 0.3);
      if (magneticCleanup) {
        cleanupFunctions.push(magneticCleanup);
      }

      // Micro interactions
      const microCleanup = microInteractions.buttonPress(element);
      if (microCleanup) {
        cleanupFunctions.push(microCleanup);
      }

      // Stagger entrance animation
      springAnimations.entrance(element, { delay: index * 0.1 });
    });

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [enabled]);

  return (
    <div ref={containerRef} className='physics-container'>
      {children}
    </div>
  );
};

// Prop editor component
const PropEditor: React.FC<{
  controls: PropControl[];
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}> = ({ controls, values, onChange }) => {
  return (
    <div className='space-y-4'>
      {controls.map(control => (
        <div key={control.name} className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
            {control.name}
            {control.description && (
              <span className='text-xs text-gray-500 ml-2'>
                {control.description}
              </span>
            )}
          </label>

          {control.type === 'string' && (
            <GlassInput
              value={String(values[control.name] || '')}
              onChange={e => onChange(control.name, e.target.value)}
              placeholder={`Enter ${control.name}`}
              className='w-full'
            />
          )}

          {control.type === 'number' && (
            <GlassInput
              type='number'
              value={String(values[control.name] || 0)}
              onChange={e => onChange(control.name, Number(e.target.value))}
              className='w-full'
            />
          )}

          {control.type === 'boolean' && (
            <GlassSwitch
              checked={Boolean(values[control.name])}
              onChange={checked => onChange(control.name, checked)}
              label={control.name}
            />
          )}

          {control.type === 'select' && control.options && (
            <GlassSelect
              value={String(values[control.name] || control.defaultValue)}
              onChange={value => onChange(control.name, value)}
              options={control.options}
              className='w-full'
            />
          )}

          {control.type === 'slider' && (
            <div className='space-y-2'>
              <GlassSlider
                value={Number(values[control.name] || control.defaultValue)}
                onChange={value => onChange(control.name, value)}
                min={control.min || 0}
                max={control.max || 100}
                step={control.step || 1}
                className='w-full'
              />
              <div className='text-xs text-gray-500'>
                Value: {String(values[control.name] || control.defaultValue)}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Code viewer component
const CodeViewer: React.FC<{ code: string; language: string }> = ({
  code,
  language,
}) => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='relative'>
      <div className='flex justify-between items-center mb-2'>
        <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
          {language.toUpperCase()}
        </span>
        <GlassButton
          variant='ghost'
          size='sm'
          onClick={copyCode}
          className='text-xs'
        >
          {copied ? 'Copied!' : 'Copy'}
        </GlassButton>
      </div>

      <pre className='bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm'>
        <code>{code}</code>
      </pre>
    </div>
  );
};

// Main ComponentShowcase component
export const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({
  component: Component,
  componentName,
  description,
  variants = [],
  propControls = [],
  codeLanguage = 'tsx',
  showResponsive = true,
  showPhysics = true,
  className = '',
  children,
}) => {
  const [activeTab, setActiveTab] = useState('preview');
  const [activeVariant, setActiveVariant] = useState(0);
  const [propValues, setPropValues] = useState<Record<string, unknown>>({});
  const [physicsEnabled, setPhysicsEnabled] = useState(false);
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);

  // Performance monitoring
  const { measureGlassEffect } = usePerformanceMonitor();

  // Initialize prop values
  useEffect(() => {
    const initialValues: Record<string, unknown> = {};
    propControls.forEach(control => {
      initialValues[control.name] = control.defaultValue;
    });
    setPropValues(initialValues);
  }, [propControls]);

  // Setup showcase animations
  useEffect(() => {
    if (!showcaseRef.current) {
      return;
    }

    const showcase = showcaseRef.current;

    // Entrance animation
    springAnimations.entrance(showcase, { delay: 0.2 });

    // Scroll reveal
    scrollAnimations.revealOnScroll('.showcase-section');

    // Magnetic hover for cards
    const cards = showcase.querySelectorAll('.showcase-card');
    cards.forEach(card => {
      magneticHover.card(card);
    });

    return () => {
      gsap.killTweensOf(showcase);
    };
  }, []);

  // Generate current code
  const currentCode = useMemo(() => {
    const currentProps =
      variants.length > 0
        ? { ...variants[activeVariant]?.props, ...propValues }
        : propValues;

    return generateCode(componentName, currentProps, codeLanguage);
  }, [componentName, variants, activeVariant, propValues, codeLanguage]);

  // Handle prop changes
  const handlePropChange = (key: string, value: unknown) => {
    setPropValues(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // Get current props
  const currentProps = useMemo(() => {
    if (variants.length > 0) {
      return { ...variants[activeVariant]?.props, ...propValues };
    }
    return propValues;
  }, [variants, activeVariant, propValues]);

  const tabs = [
    { id: 'preview', label: 'Preview', content: null },
    { id: 'props', label: 'Props', content: null },
    { id: 'code', label: 'Code', content: null },
    ...(showResponsive
      ? [{ id: 'responsive', label: 'Responsive', content: null }]
      : []),
    { id: 'performance', label: 'Performance', content: null },
  ];

  return (
    <MockThemeProvider>
      <div ref={showcaseRef} className={`component-showcase ${className}`}>
        <GlassCard className='showcase-card'>
          {/* Header */}
          <div className='showcase-section border-b border-gray-200 dark:border-gray-700 p-6'>
            <div className='flex justify-between items-start'>
              <div>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2'>
                  {componentName}
                </h2>
                {description && (
                  <p className='text-gray-600 dark:text-gray-400'>
                    {description}
                  </p>
                )}
              </div>

              <div className='flex gap-2'>
                {showPhysics && (
                  <GlassSwitch
                    checked={physicsEnabled}
                    onChange={setPhysicsEnabled}
                    label='Physics'
                    size={20}
                  />
                )}
                <GlassSwitch
                  checked={showPerformanceMonitor}
                  onChange={setShowPerformanceMonitor}
                  label='Performance'
                  size={20}
                />
              </div>
            </div>

            {/* Variants selector */}
            {variants.length > 0 && (
              <div className='mt-4'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Variants
                </label>
                <div className='flex flex-wrap gap-2'>
                  {variants.map((variant, index) => (
                    <GlassButton
                      key={index}
                      variant={activeVariant === index ? 'primary' : 'ghost'}
                      size='sm'
                      onClick={() => setActiveVariant(index)}
                    >
                      {variant.name}
                    </GlassButton>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className='showcase-section p-6 border-b border-gray-200 dark:border-gray-700'>
            <div className='flex gap-2'>
              {tabs.map(tab => (
                <GlassButton
                  key={tab.id}
                  variant={activeTab === tab.id ? 'primary' : 'ghost'}
                  size='sm'
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </GlassButton>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className='showcase-section p-6'>
            <AnimatePresence mode='wait'>
              {activeTab === 'preview' && (
                <motion.div
                  key='preview'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className='space-y-6'
                >
                  <PhysicsWrapper enabled={physicsEnabled}>
                    <div className='preview-container p-8 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                      <div className='flex justify-center'>
                        <Component
                          {...currentProps}
                          className={`physics-element ${currentProps['className'] || ''}`}
                          ref={(el: HTMLElement) => {
                            if (el) {
                              measureGlassEffect(
                                `${componentName}-render`,
                                () => {
                                  // Measure component render performance
                                }
                              );
                            }
                          }}
                        >
                          {children || componentName}
                        </Component>
                      </div>
                    </div>
                  </PhysicsWrapper>

                  {showPerformanceMonitor && (
                    <PerformanceMonitor
                      componentName={componentName}
                      components={[componentName]}
                      className='mt-4'
                    />
                  )}

                  {variants.length > 0 && (
                    <div className='variant-info p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
                      <h4 className='font-semibold mb-2'>
                        {variants[activeVariant]?.name}
                      </h4>
                      {variants[activeVariant]?.description && (
                        <p className='text-sm text-gray-600 dark:text-gray-400'>
                          {variants[activeVariant]?.description}
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'props' && (
                <motion.div
                  key='props'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {propControls.length > 0 ? (
                    <PropEditor
                      controls={propControls}
                      values={propValues}
                      onChange={handlePropChange}
                    />
                  ) : (
                    <div className='text-center py-8 text-gray-500'>
                      No configurable props available
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'code' && (
                <motion.div
                  key='code'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CodeViewer code={currentCode} language={codeLanguage} />
                </motion.div>
              )}

              {activeTab === 'responsive' && showResponsive && (
                <motion.div
                  key='responsive'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ResponsivePreview>
                    <Component
                      {...currentProps}
                      className={`physics-element ${currentProps['className'] || ''}`}
                    >
                      {children || componentName}
                    </Component>
                  </ResponsivePreview>
                </motion.div>
              )}

              {activeTab === 'performance' && (
                <motion.div
                  key='performance'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className='space-y-6'>
                    <PerformanceMonitor
                      componentName={componentName}
                      components={[componentName]}
                      showBenchmarks={true}
                      showBundleSize={true}
                    />

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                        <h4 className='font-semibold mb-2'>Bundle Size</h4>
                        <div className='text-2xl font-bold text-blue-600'>
                          {bundleUtils
                            .estimateComponentSize(componentName)
                            .toFixed(1)}
                          KB
                        </div>
                        <div className='text-sm text-gray-600 mt-2'>
                          Estimated size for {componentName}
                        </div>
                      </div>

                      <div className='p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
                        <h4 className='font-semibold mb-2'>Recommendations</h4>
                        <div className='space-y-1'>
                          {bundleUtils
                            .getBundleRecommendations([componentName])
                            .map((rec, index) => (
                              <div
                                key={index}
                                className='text-sm text-yellow-600'
                              >
                                • {rec}
                              </div>
                            ))}
                          {bundleUtils.getBundleRecommendations([componentName])
                            .length === 0 && (
                            <div className='text-sm text-green-600'>
                              ✓ No optimization recommendations
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </GlassCard>
      </div>
    </MockThemeProvider>
  );
};

export default ComponentShowcase;
