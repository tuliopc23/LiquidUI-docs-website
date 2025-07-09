'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  GlassButton,
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
  GlassSelect,
  GlassSlider,
} from 'liquidify';

// Simple spring physics simulation for demo
class SpringPhysics {
  position: number = 0;
  velocity: number = 0;
  target: number = 0;
  stiffness: number;
  damping: number;
  mass: number;
  precision: number;

  constructor(config: {
    stiffness: number;
    damping: number;
    mass: number;
    precision?: number;
  }) {
    this.stiffness = config.stiffness;
    this.damping = config.damping;
    this.mass = config.mass;
    this.precision = config.precision || 0.001;
  }

  setTarget(target: number) {
    this.target = target;
  }

  update(deltaTime: number) {
    const dt = deltaTime / 1000; // Convert to seconds

    // Calculate spring force
    const displacement = this.target - this.position;
    const springForce = displacement * this.stiffness;

    // Calculate damping force
    const dampingForce = -this.velocity * this.damping;

    // Calculate acceleration
    const acceleration = (springForce + dampingForce) / this.mass;

    // Update velocity and position
    this.velocity += acceleration * dt;
    this.position += this.velocity * dt;
  }

  get isAtRest(): boolean {
    const displacement = Math.abs(this.target - this.position);
    const velocity = Math.abs(this.velocity);
    return displacement < this.precision && velocity < this.precision;
  }

  setProperties(
    config: Partial<{ stiffness: number; damping: number; mass: number }>
  ) {
    if (config.stiffness !== undefined) this.stiffness = config.stiffness;
    if (config.damping !== undefined) this.damping = config.damping;
    if (config.mass !== undefined) this.mass = config.mass;
  }
}

const SPRING_PRESETS = {
  gentle: { stiffness: 100, damping: 10, mass: 1 },
  snappy: { stiffness: 200, damping: 15, mass: 1 },
  bouncy: { stiffness: 300, damping: 8, mass: 1 },
  stiff: { stiffness: 400, damping: 25, mass: 1 },
  wobbly: { stiffness: 80, damping: 5, mass: 1 },
  elastic: { stiffness: 250, damping: 12, mass: 2 },
  smooth: { stiffness: 120, damping: 20, mass: 1 },
  quick: { stiffness: 350, damping: 20, mass: 0.8 },
  heavy: { stiffness: 100, damping: 15, mass: 3 },
  delicate: { stiffness: 60, damping: 12, mass: 0.5 },
};

export function SpringAnimationsDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentPreset, setCurrentPreset] = useState('gentle');
  const [spring, setSpring] = useState<SpringPhysics | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [customStiffness, setCustomStiffness] = useState([100]);
  const [customDamping, setCustomDamping] = useState([10]);
  const [customMass, setCustomMass] = useState([1]);
  const [targetPosition, setTargetPosition] = useState(200);
  const [showTrail, setShowTrail] = useState(true);
  const [trail, setTrail] = useState<
    { x: number; y: number; opacity: number }[]
  >([]);

  // Initialize spring
  useEffect(() => {
    const preset = SPRING_PRESETS[currentPreset as keyof typeof SPRING_PRESETS];
    const newSpring = new SpringPhysics(preset);
    newSpring.position = 50; // Start position
    newSpring.target = targetPosition;
    setSpring(newSpring);
  }, [currentPreset, targetPosition]);

  // Animation loop
  useEffect(() => {
    if (!spring || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 200;

    let animationId: number;
    let lastTime = 0;

    const animate = (currentTime: number) => {
      const deltaTime = Math.min(currentTime - lastTime, 32);
      lastTime = currentTime;

      if (spring && !spring.isAtRest) {
        spring.update(deltaTime);
        setIsAnimating(true);

        // Add to trail
        if (showTrail) {
          setTrail(prev => {
            const newTrail = [
              ...prev,
              { x: spring.position, y: canvas.height / 2, opacity: 1 },
            ];
            // Fade out trail points
            return newTrail
              .map((point, index) => ({
                ...point,
                opacity: Math.max(0, 1 - (newTrail.length - index) * 0.05),
              }))
              .slice(-50); // Keep last 50 points
          });
        }
      } else {
        setIsAnimating(false);
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = '#e9ecef';
      ctx.lineWidth = 1;
      for (let x = 0; x <= canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw trail
      if (showTrail) {
        trail.forEach((point, index) => {
          ctx.fillStyle = `rgba(59, 130, 246, ${point.opacity * 0.5})`;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Draw target
      ctx.fillStyle = '#ef4444';
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(targetPosition, canvas.height / 2, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Draw spring object
      if (spring) {
        ctx.fillStyle = '#3b82f6';
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(spring.position, canvas.height / 2, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Draw velocity indicator
        if (Math.abs(spring.velocity) > 1) {
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(spring.position, canvas.height / 2);
          ctx.lineTo(
            spring.position + spring.velocity * 0.5,
            canvas.height / 2
          );
          ctx.stroke();
        }
      }

      // Draw connection line
      if (spring) {
        ctx.strokeStyle = '#6b7280';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(spring.position, canvas.height / 2);
        ctx.lineTo(targetPosition, canvas.height / 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw labels
      ctx.fillStyle = '#374151';
      ctx.font = '12px Arial';
      ctx.fillText(
        'Object',
        spring ? spring.position - 15 : 50,
        canvas.height / 2 + 25
      );
      ctx.fillText('Target', targetPosition - 15, canvas.height / 2 + 25);

      animationId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [spring, targetPosition, showTrail, trail]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !spring) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const newTarget = Math.max(20, Math.min(canvas.width - 20, x));

    setTargetPosition(newTarget);
    spring.setTarget(newTarget);
    setTrail([]); // Clear trail
  };

  const handlePresetChange = (value: string) => {
    setCurrentPreset(value);
    setTrail([]);
  };

  const handleCustomChange = () => {
    if (spring) {
      spring.setProperties({
        stiffness: customStiffness[0],
        damping: customDamping[0],
        mass: customMass[0],
      });
    }
  };

  useEffect(() => {
    handleCustomChange();
  }, [customStiffness, customDamping, customMass]);

  const resetAnimation = () => {
    if (spring) {
      spring.position = 50;
      spring.velocity = 0;
      spring.target = targetPosition;
      setTrail([]);
    }
  };

  return (
    <div className='space-y-6'>
      <GlassCard>
        <GlassCardHeader>
          <GlassCardTitle>Interactive Spring Physics</GlassCardTitle>
          <GlassCardDescription>
            Click anywhere on the canvas to set a new target. Watch how
            different spring configurations affect the motion.
          </GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <div className='space-y-4'>
            <div className='flex gap-4 flex-wrap'>
              <div className='flex-1 min-w-48'>
                <label className='block text-sm font-medium mb-2'>
                  Spring Preset
                </label>
                <GlassSelect
                  value={currentPreset}
                  onChange={handlePresetChange}
                  options={[
                    { value: 'gentle', label: '🌊 Gentle' },
                    { value: 'snappy', label: '⚡ Snappy' },
                    { value: 'bouncy', label: '🏀 Bouncy' },
                    { value: 'stiff', label: '📏 Stiff' },
                    { value: 'wobbly', label: '🌊 Wobbly' },
                    { value: 'elastic', label: '🎾 Elastic' },
                    { value: 'smooth', label: '✨ Smooth' },
                    { value: 'quick', label: '🚀 Quick' },
                    { value: 'heavy', label: '🏗️ Heavy' },
                    { value: 'delicate', label: '🌸 Delicate' },
                  ]}
                />
              </div>

              <div className='flex gap-2'>
                <GlassButton onClick={resetAnimation} variant='secondary'>
                  🔄 Reset
                </GlassButton>
                <GlassButton
                  onClick={() => setShowTrail(!showTrail)}
                  variant={showTrail ? 'primary' : 'secondary'}
                >
                  {showTrail ? '🔍 Hide Trail' : '👁️ Show Trail'}
                </GlassButton>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <label className='block text-sm font-medium mb-2'>
                  Stiffness: {customStiffness[0]}
                </label>
                <GlassSlider
                  value={customStiffness[0]}
                  onChange={value => setCustomStiffness([value])}
                  max={500}
                  min={10}
                  step={10}
                  className='w-full'
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-2'>
                  Damping: {customDamping[0]}
                </label>
                <GlassSlider
                  value={customDamping[0]}
                  onChange={value => setCustomDamping([value])}
                  max={40}
                  min={1}
                  step={1}
                  className='w-full'
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-2'>
                  Mass: {customMass[0]}
                </label>
                <GlassSlider
                  value={customMass[0]}
                  onChange={value => setCustomMass([value])}
                  max={5}
                  min={0.1}
                  step={0.1}
                  className='w-full'
                />
              </div>
            </div>
          </div>
        </GlassCardContent>
      </GlassCard>

      <GlassCard>
        <GlassCardContent className='p-4'>
          <div className='relative'>
            <canvas
              ref={canvasRef}
              className='w-full h-auto border border-gray-300 rounded-lg cursor-crosshair'
              style={{ maxWidth: '600px', aspectRatio: '3/1' }}
              onClick={handleCanvasClick}
            />

            <div className='absolute top-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm'>
              {isAnimating ? '🎬 Animating' : '⏸️ At Rest'}
            </div>
          </div>

          <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
            <div>
              <p>
                <strong>Current Values:</strong>
              </p>
              <ul className='space-y-1 text-gray-600'>
                <li>Position: {spring?.position.toFixed(1) || '0'}</li>
                <li>Velocity: {spring?.velocity.toFixed(1) || '0'}</li>
                <li>Target: {targetPosition.toFixed(1)}</li>
                <li>
                  Distance:{' '}
                  {spring
                    ? Math.abs(spring.target - spring.position).toFixed(1)
                    : '0'}
                </li>
              </ul>
            </div>

            <div>
              <p>
                <strong>Instructions:</strong>
              </p>
              <ul className='list-disc list-inside space-y-1 text-gray-600'>
                <li>Click anywhere to set a new target</li>
                <li>Try different presets to see various behaviors</li>
                <li>Adjust parameters to create custom springs</li>
                <li>Watch the trail to see motion patterns</li>
              </ul>
            </div>
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  );
}
