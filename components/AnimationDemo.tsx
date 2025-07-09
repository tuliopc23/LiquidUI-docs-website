'use client';

import React, { useEffect, useRef } from 'react';
import GlassButton from './ui/GlassButton';
import GlassCard from './ui/GlassCard';
import { 
  magneticHover, 
  springAnimations, 
  scrollAnimations, 
  hapticFeedback, 
  microInteractions,
  pageTransitions 
} from '@/lib/enhanced-animations';

export default function AnimationDemo() {
  const demoRef = useRef<HTMLDivElement>(null);
  const magneticRef = useRef<HTMLDivElement>(null);
  const springRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Setup magnetic hover demo
    if (magneticRef.current) {
      magneticHover.magnetic(magneticRef.current, 0.5);
    }

    // Setup spring animation demo
    if (springRef.current) {
      springAnimations.entrance(springRef.current, { delay: 0.5 });
    }

    // Setup parallax demo
    if (parallaxRef.current) {
      scrollAnimations.parallax(parallaxRef.current, 0.8);
    }

    // Setup scroll reveal for all demo cards
    scrollAnimations.revealOnScroll('.demo-card');

    // Stagger reveal for demo elements
    setTimeout(() => {
      pageTransitions.staggerReveal('.demo-element', 0.15);
    }, 300);

  }, []);

  const handleHapticDemo = (type: 'light' | 'medium' | 'heavy') => {
    if (!demoRef.current) return;
    
    const element = demoRef.current.querySelector('.haptic-demo');
    if (element) {
      switch (type) {
        case 'light':
          hapticFeedback.lightTap(element);
          break;
        case 'medium':
          hapticFeedback.mediumImpact(element);
          break;
        case 'heavy':
          hapticFeedback.heavyImpact(element);
          break;
      }
    }
  };

  return (
    <div ref={demoRef} className="space-y-12 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 demo-element">
          Enhanced GSAP Animations
        </h1>
        <p className="text-lg text-gray-600 demo-element">
          Experience magnetic hover effects, spring animations, and haptic feedback
        </p>
      </div>

      {/* Magnetic Hover Demo */}
      <GlassCard 
        className="demo-card"
        header={<h2 className="text-2xl font-semibold">Magnetic Hover Effects</h2>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Magnetic Button</h3>
            <GlassButton 
              variant="primary" 
              size="lg"
              className="demo-element"
            >
              Hover me for magnetic effect
            </GlassButton>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Magnetic Card</h3>
            <div 
              ref={magneticRef}
              className="demo-element glass-card p-6 cursor-pointer"
            >
              <p>Move your cursor over this card to see the magnetic effect</p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Spring Animations Demo */}
      <GlassCard 
        className="demo-card"
        header={<h2 className="text-2xl font-semibold">Spring Animations</h2>}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Entrance Spring</h3>
            <div 
              ref={springRef}
              className="demo-element glass-card p-4 text-center"
            >
              <p>Spring entrance animation</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Bounce Click</h3>
            <GlassButton 
              variant="secondary"
              onClick={() => {
                const element = document.querySelector('.bounce-demo');
                if (element) springAnimations.bounce(element);
              }}
              className="demo-element bounce-demo"
            >
              Click for bounce
            </GlassButton>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Exit Spring</h3>
            <GlassButton 
              variant="outline"
              onClick={() => {
                const element = document.querySelector('.exit-demo');
                if (element) {
                  springAnimations.exit(element).then(() => {
                    setTimeout(() => {
                      springAnimations.entrance(element);
                    }, 500);
                  });
                }
              }}
              className="demo-element exit-demo"
            >
              Exit & Re-enter
            </GlassButton>
          </div>
        </div>
      </GlassCard>

      {/* Haptic Feedback Demo */}
      <GlassCard 
        className="demo-card"
        header={<h2 className="text-2xl font-semibold">Haptic Feedback Simulation</h2>}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Light Tap</h3>
            <GlassButton 
              variant="ghost"
              onClick={() => handleHapticDemo('light')}
              className="demo-element"
            >
              Light Haptic
            </GlassButton>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Medium Impact</h3>
            <GlassButton 
              variant="primary"
              onClick={() => handleHapticDemo('medium')}
              className="demo-element"
            >
              Medium Haptic
            </GlassButton>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Heavy Impact</h3>
            <GlassButton 
              variant="secondary"
              onClick={() => handleHapticDemo('heavy')}
              className="demo-element"
            >
              Heavy Haptic
            </GlassButton>
          </div>
        </div>
        
        <div className="mt-8 p-6 glass-card haptic-demo">
          <p className="text-center">
            Click the buttons above to see haptic feedback animations on this card
          </p>
        </div>
      </GlassCard>

      {/* Scroll Animations Demo */}
      <GlassCard 
        className="demo-card"
        header={<h2 className="text-2xl font-semibold">Scroll Animations</h2>}
      >
        <div className="space-y-8">
          <div className="text-center">
            <p className="text-lg mb-4">Scroll down to see these effects in action</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Parallax Effect</h3>
              <div 
                ref={parallaxRef}
                className="demo-element glass-card p-8 text-center bg-gradient-to-br from-blue-500/20 to-purple-600/20"
              >
                <p>This card has parallax scrolling</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Reveal on Scroll</h3>
              <div className="demo-element glass-card p-8 text-center">
                <p>This card reveals as you scroll</p>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Micro-interactions Demo */}
      <GlassCard 
        className="demo-card"
        header={<h2 className="text-2xl font-semibold">Micro-interactions</h2>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Interactive Elements</h3>
            <div className="space-y-3">
              <GlassButton 
                variant="primary"
                className="demo-element w-full"
              >
                Primary Button
              </GlassButton>
              <GlassButton 
                variant="secondary"
                className="demo-element w-full"
              >
                Secondary Button
              </GlassButton>
              <GlassButton 
                variant="outline"
                className="demo-element w-full"
              >
                Outline Button
              </GlassButton>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Ripple Effects</h3>
            <div className="space-y-3">
              <div className="demo-element glass-card p-4 cursor-pointer hover:bg-white/20 transition-colors">
                <p>Click anywhere on this card for ripple effect</p>
              </div>
              <div className="demo-element glass-card p-4 cursor-pointer hover:bg-white/20 transition-colors">
                <p>Each click creates a unique ripple</p>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Performance Info */}
      <GlassCard 
        className="demo-card"
        header={<h2 className="text-2xl font-semibold">Performance Features</h2>}
      >
        <div className="space-y-4">
          <ul className="space-y-2 text-sm">
            <li className="demo-element">✨ Hardware-accelerated animations using GSAP</li>
            <li className="demo-element">🎯 Optimized ScrollTrigger for smooth scroll animations</li>
            <li className="demo-element">⚡ Efficient DOM manipulation with batch updates</li>
            <li className="demo-element">🎨 CSS-optimized glass morphism effects</li>
            <li className="demo-element">📱 Responsive animations that adapt to screen size</li>
            <li className="demo-element">🔄 Automatic cleanup to prevent memory leaks</li>
          </ul>
        </div>
      </GlassCard>
    </div>
  );
}
