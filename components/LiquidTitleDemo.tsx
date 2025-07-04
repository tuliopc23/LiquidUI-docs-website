import React from 'react';
import { LiquidTitle, LiquidTitleVariants, LiquidH1, LiquidH2, LiquidH3 } from './LiquidTitle';

/**
 * Demo component showcasing the LiquidTitle component and its variants
 */
export const LiquidTitleDemo: React.FC = () => {
  return (
    <div className="space-y-12 p-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          LiquidTitle Component Demo
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Interactive headings with 3D tilt effects. Hover over the titles to see the animations!
        </p>
      </div>

      {/* Basic Usage */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
          Basic Usage
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <LiquidTitle 
            as="h1" 
            className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2"
          >
            Basic LiquidTitle
          </LiquidTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Default tilt: rotateX={8}, rotateY={-6}
          </p>
        </div>
      </section>

      {/* Custom Tilt Values */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
          Custom Tilt Values
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <LiquidTitle 
              as="h2" 
              tiltX={15} 
              tiltY={-10}
              className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2"
            >
              Strong Tilt
            </LiquidTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              rotateX={15}, rotateY={-10}
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <LiquidTitle 
              as="h2" 
              tiltX={3} 
              tiltY={-2}
              className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2"
            >
              Subtle Tilt
            </LiquidTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              rotateX={3}, rotateY={-2}
            </p>
          </div>
        </div>
      </section>

      {/* Pre-configured Variants */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
          Pre-configured Variants
        </h3>
        
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <LiquidTitle 
              {...LiquidTitleVariants.hero}
              className="text-gradient-primary bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              Hero Title
            </LiquidTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Hero variant: rotateX={12}, rotateY={-8}
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <LiquidTitle 
              {...LiquidTitleVariants.section}
              className="text-gray-800 dark:text-gray-200"
            >
              Section Title
            </LiquidTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Section variant: rotateX={6}, rotateY={-4}
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <LiquidTitle 
              {...LiquidTitleVariants.subtle}
              className="text-gray-700 dark:text-gray-300"
            >
              Subtle Title
            </LiquidTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Subtle variant: rotateX={4}, rotateY={-2}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Access Components */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
          Quick Access Components
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <LiquidH1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
              LiquidH1
            </LiquidH1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Quick h1 component
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <LiquidH2 className="text-xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
              LiquidH2
            </LiquidH2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Quick h2 component
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <LiquidH3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              LiquidH3
            </LiquidH3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Quick h3 component
            </p>
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
          Accessibility - Reduced Motion
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <LiquidTitle 
            {...LiquidTitleVariants.static}
            className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2"
          >
            Static Title (No Tilt)
          </LiquidTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This title has tilt disabled for accessibility. The component automatically respects the user&apos;s reduced motion preference.
          </p>
        </div>
      </section>

      {/* Code Examples */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
          Usage Examples
        </h3>
        
        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
          <pre className="text-sm">
            <code>{`// Basic usage
<LiquidTitle as="h1" className="text-4xl font-bold">
  My Interactive Title
</LiquidTitle>

// Custom tilt values
<LiquidTitle as="h2" tiltX={10} tiltY={-8}>
  Custom Tilt Title
</LiquidTitle>

// Using variants
<LiquidTitle {...LiquidTitleVariants.hero}>
  Hero Title
</LiquidTitle>

// Quick access components
<LiquidH1>Quick H1</LiquidH1>
<LiquidH2>Quick H2</LiquidH2>
<LiquidH3>Quick H3</LiquidH3>

// Disable tilt for accessibility
<LiquidTitle enableTilt={false}>
  Static Title
</LiquidTitle>`}</code>
          </pre>
        </div>
      </section>
    </div>
  );
};
