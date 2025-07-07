import React, { useRef, useEffect } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useAnimation } from '../components/AnimationProvider';
import { createAnimationBuilder, getHoverVariant, getFocusVariant } from '../config/animations';
import { MagneticButton, TiltCard, ParallaxContainer } from '../components/MicroInteractions';

// Example component demonstrating the enhanced animation system
export const EnhancedAnimationsDemo = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { shouldAnimate, createLiquidMorph } = useAnimation();

  useEffect(() => {
    if (!cardRef.current || !shouldAnimate) return;

    // Create animation sequence using the builder pattern
    const animationBuilder = createAnimationBuilder(prefersReducedMotion);
    
    animationBuilder
      .fadeIn(cardRef.current, { duration: 0.6, ease: 'power2.out', delay: 0.2 })
      .scaleIn(cardRef.current, { duration: 0.4, ease: 'power2.out', delay: 0.8 })
      .play();

    return () => {
      animationBuilder.kill();
    };
  }, [shouldAnimate, prefersReducedMotion]);

  const handleButtonClick = () => {
    if (cardRef.current && shouldAnimate) {
      createLiquidMorph(cardRef.current, {
        scale: 1.1,
        intensity: 'strong',
        duration: 0.8
      });
    }
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-4xl font-bold gradient-text">
        Enhanced Animation System Demo
      </h1>
      
      {/* Motion-aware card with all optimizations */}
      <div
        ref={cardRef}
        className="glass-card p-6 gpu-accelerated"
        style={{
          // Apply hover styles conditionally based on reduced motion
          ...(prefersReducedMotion ? {} : getHoverVariant('lift', 'medium'))
        }}
      >
        <h2 className="text-2xl font-semibold mb-4">Optimized Glass Card</h2>
        <p className="text-gray-600 mb-4">
          This card uses GPU acceleration, respects reduced motion preferences,
          and applies optimizations automatically.
        </p>
        
        {/* Enhanced micro-interactions */}
        <div className="flex gap-4">
          <MagneticButton
            onClick={handleButtonClick}
            className="glass-button glass-button-primary"
            strength={prefersReducedMotion ? 0 : 15}
          >
            Magnetic Button
          </MagneticButton>
          
          <button
            className="glass-button"
            style={{
              // Apply focus styles that respect reduced motion
              ...getFocusVariant('ring', 'rgb(59, 130, 246)')
            }}
            onFocus={(e) => {
              if (!prefersReducedMotion) {
                e.target.style.willChange = 'box-shadow';
              }
            }}
            onBlur={(e) => {
              e.target.style.willChange = 'auto';
            }}
          >
            Focus Ring Button
          </button>
        </div>
      </div>

      {/* Tilt interaction with performance optimizations */}
      <TiltCard className="glass-card p-6">
        <h3 className="text-xl font-semibold mb-2">3D Tilt Card</h3>
        <p className="text-gray-600">
          Hover to see 3D tilt effect with throttled mouse events and
          will-change optimization. Automatically disabled for reduced motion.
        </p>
      </TiltCard>

      {/* Parallax container with scroll optimization */}
      <ParallaxContainer speed={0.5} className="glass-card p-6 h-64">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Parallax Container</h3>
            <p className="text-gray-600">
              Scroll to see parallax effect with requestAnimationFrame optimization.
              Respects reduced motion preferences.
            </p>
          </div>
        </div>
      </ParallaxContainer>

      {/* Animation registry examples */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          className={`glass-card p-4 gpu-accelerated ${
            !prefersReducedMotion ? 'animate-fade-in-up' : ''
          }`}
          style={{
            animationDelay: '0.1s'
          }}
        >
          <h4 className="font-semibold mb-2">Fade In Up</h4>
          <p className="text-sm text-gray-600">
            CSS animation with reduced motion support
          </p>
        </div>

        <div 
          className={`glass-card p-4 gpu-accelerated ${
            !prefersReducedMotion ? 'animate-scale-in' : ''
          }`}
          style={{
            animationDelay: '0.2s'
          }}
        >
          <h4 className="font-semibold mb-2">Scale In</h4>
          <p className="text-sm text-gray-600">
            GPU-accelerated scale animation
          </p>
        </div>

        <div 
          className={`glass-card p-4 gpu-accelerated ${
            !prefersReducedMotion ? 'animate-liquid-morph' : ''
          }`}
          style={{
            animationDelay: '0.3s'
          }}
        >
          <h4 className="font-semibold mb-2">Liquid Morph</h4>
          <p className="text-sm text-gray-600">
            Continuous liquid morphing effect
          </p>
        </div>
      </div>

      {/* Performance indicators */}
      <div className="glass-card p-4">
        <h3 className="text-lg font-semibold mb-2">Performance Status</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Reduced Motion:</strong> {prefersReducedMotion ? 'Enabled' : 'Disabled'}
          </div>
          <div>
            <strong>Animations:</strong> {shouldAnimate ? 'Active' : 'Disabled'}
          </div>
          <div>
            <strong>GPU Acceleration:</strong> Active
          </div>
          <div>
            <strong>Will-Change:</strong> Optimized
          </div>
        </div>
      </div>
    </div>
  );
};

// Usage example in a documentation page
export const AnimationSystemGuide = () => {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold mb-4">Animation System Overview</h2>
        <p className="text-lg text-gray-600 mb-6">
          The enhanced animation system provides performance-optimized, accessible animations
          with built-in reduced motion support and GPU acceleration.
        </p>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-4">Key Features</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Unified <code>useReducedMotion()</code> hook for accessibility</li>
          <li>GPU acceleration with <code>.gpu-accelerated</code> class</li>
          <li>Optimized micro-interactions with <code>requestAnimationFrame</code></li>
          <li>Throttled mouse events for better performance</li>
          <li>Smart <code>will-change</code> property management</li>
          <li>Config-driven animation registry</li>
          <li>Motion-safe GSAP timeline wrappers</li>
          <li>Tree-shaken GSAP imports</li>
        </ul>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-4">Usage Examples</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`// Import the enhanced system
import { useReducedMotion } from '../hooks/useReducedMotion';
import { createAnimationBuilder, getHoverVariant } from '../config/animations';
import { MagneticButton } from '../components/MicroInteractions';

// In your component
const prefersReducedMotion = useReducedMotion();

// Create performance-optimized hover styles
const hoverStyles = getHoverVariant('lift', 'medium');

// Use motion-safe animation builder
const animationBuilder = createAnimationBuilder(prefersReducedMotion);
animationBuilder
  .fadeIn(element, { duration: 0.6 })
  .scaleIn(element, { duration: 0.4, delay: 0.2 })
  .play();`}
          </pre>
        </div>
      </section>

      <EnhancedAnimationsDemo />
    </div>
  );
};
