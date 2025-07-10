'use client';

import React, { useRef, useEffect, useState } from 'react';
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

// Simulated particle system for demo purposes
class Vector2D {
  constructor(
    public x: number,
    public y: number
  ) {}

  add(v: Vector2D): Vector2D {
    return new Vector2D(this.x + v.x, this.y + v.y);
  }

  multiply(scalar: number): Vector2D {
    return new Vector2D(this.x * scalar, this.y * scalar);
  }
}

class Particle {
  position: Vector2D;
  velocity: Vector2D;
  life: number;
  maxLife: number;
  size: number;
  color: string;

  constructor(
    position: Vector2D,
    velocity: Vector2D,
    life: number,
    size: number,
    color: string
  ) {
    this.position = position;
    this.velocity = velocity;
    this.life = life;
    this.maxLife = life;
    this.size = size;
    this.color = color;
  }

  update(deltaTime: number, gravity: Vector2D): void {
    this.velocity = this.velocity.add(gravity.multiply(deltaTime / 1000));
    this.position = this.position.add(this.velocity.multiply(deltaTime / 1000));
    this.life -= deltaTime;
  }

  render(ctx: CanvasRenderingContext2D): void {
    const alpha = Math.max(0, this.life / this.maxLife);
    const currentSize = this.size * alpha;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, currentSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  isDead(): boolean {
    return this.life <= 0;
  }
}

class ParticleEmitter {
  position: Vector2D;
  particles: Particle[] = [];
  rate: number;
  emissionTimer: number = 0;
  gravity: Vector2D;
  particleLifetime: number;
  size: number;
  color: string;
  velocityVariation: Vector2D;
  baseVelocity: Vector2D;

  constructor(options: {
    position: Vector2D;
    rate: number;
    gravity: Vector2D;
    particleLifetime: number;
    size: number;
    color: string;
    velocityVariation: Vector2D;
    baseVelocity: Vector2D;
  }) {
    this.position = options.position;
    this.rate = options.rate;
    this.gravity = options.gravity;
    this.particleLifetime = options.particleLifetime;
    this.size = options.size;
    this.color = options.color;
    this.velocityVariation = options.velocityVariation;
    this.baseVelocity = options.baseVelocity;
  }

  update(deltaTime: number): void {
    // Emit new particles
    this.emissionTimer += deltaTime;
    const timeBetweenEmissions = 1000 / this.rate;

    while (this.emissionTimer >= timeBetweenEmissions) {
      this.emitParticle();
      this.emissionTimer -= timeBetweenEmissions;
    }

    // Update existing particles
    this.particles.forEach(particle => {
      particle.update(deltaTime, this.gravity);
    });

    // Remove dead particles
    this.particles = this.particles.filter(particle => !particle.isDead());
  }

  emitParticle(): void {
    const velocity = new Vector2D(
      this.baseVelocity.x + (Math.random() - 0.5) * this.velocityVariation.x,
      this.baseVelocity.y + (Math.random() - 0.5) * this.velocityVariation.y
    );

    const particle = new Particle(
      new Vector2D(this.position.x, this.position.y),
      velocity,
      this.particleLifetime,
      this.size + Math.random() * 2,
      this.color
    );

    this.particles.push(particle);
  }

  burst(count: number): void {
    for (let i = 0; i < count; i++) {
      this.emitParticle();
    }
  }

  setPosition(position: Vector2D): void {
    this.position = position;
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.particles.forEach(particle => particle.render(ctx));
  }
}

const PARTICLE_PRESETS = {
  sparks: {
    rate: 100,
    gravity: new Vector2D(0, 98),
    particleLifetime: 800,
    size: 2,
    color: '#ffaa00',
    velocityVariation: new Vector2D(100, 50),
    baseVelocity: new Vector2D(0, -50),
  },
  fireworks: {
    rate: 0,
    gravity: new Vector2D(0, 20),
    particleLifetime: 1500,
    size: 3,
    color: '#ff6b6b',
    velocityVariation: new Vector2D(200, 200),
    baseVelocity: new Vector2D(0, 0),
  },
  smoke: {
    rate: 40,
    gravity: new Vector2D(0, -10),
    particleLifetime: 3000,
    size: 8,
    color: '#666666',
    velocityVariation: new Vector2D(20, 10),
    baseVelocity: new Vector2D(0, -30),
  },
  magic: {
    rate: 60,
    gravity: new Vector2D(0, -20),
    particleLifetime: 2000,
    size: 3,
    color: '#aa00ff',
    velocityVariation: new Vector2D(80, 40),
    baseVelocity: new Vector2D(0, -40),
  },
  rain: {
    rate: 200,
    gravity: new Vector2D(0, 0),
    particleLifetime: 1500,
    size: 1,
    color: '#4499ff',
    velocityVariation: new Vector2D(20, 50),
    baseVelocity: new Vector2D(0, 300),
  },
  snow: {
    rate: 80,
    gravity: new Vector2D(0, 10),
    particleLifetime: 4000,
    size: 3,
    color: '#ffffff',
    velocityVariation: new Vector2D(30, 10),
    baseVelocity: new Vector2D(10, 20),
  },
};

export function ParticleEffectsDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentPreset, setCurrentPreset] = useState('sparks');
  const [isRunning, setIsRunning] = useState(true);
  const [emitter, setEmitter] = useState<ParticleEmitter | null>(null);
  const [particleCount, setParticleCount] = useState(0);
  const [customRate, setCustomRate] = useState([100]);
  const [customGravity, setCustomGravity] = useState([50]);
  const [customSize, setCustomSize] = useState([3]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    // Set canvas size
    canvas.width = 800;
    canvas.height = 400;

    // Create initial emitter
    const preset =
      PARTICLE_PRESETS[currentPreset as keyof typeof PARTICLE_PRESETS];
    const newEmitter = new ParticleEmitter({
      position: new Vector2D(canvas.width / 2, canvas.height / 2),
      ...preset,
    });

    setEmitter(newEmitter);

    let animationId: number;
    let lastTime = 0;

    const animate = (currentTime: number) => {
      const deltaTime = Math.min(currentTime - lastTime, 32); // Cap at 32ms
      lastTime = currentTime;

      if (isRunning && newEmitter) {
        newEmitter.update(deltaTime);
        setParticleCount(newEmitter.particles.length);
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      ctx.fillStyle = '#000011';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render particles
      if (newEmitter) {
        newEmitter.render(ctx);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [currentPreset, isRunning]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!emitter) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const mousePos = new Vector2D(e.clientX - rect.left, e.clientY - rect.top);

    emitter.setPosition(mousePos);
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!emitter) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const mousePos = new Vector2D(e.clientX - rect.left, e.clientY - rect.top);

    emitter.setPosition(mousePos);

    if (currentPreset === 'fireworks') {
      emitter.burst(50);
    } else {
      emitter.burst(10);
    }
  };

  const handlePresetChange = (value: string) => {
    setCurrentPreset(value);
  };

  const toggleAnimation = () => {
    setIsRunning(!isRunning);
  };

  const clearParticles = () => {
    if (emitter) {
      emitter.particles = [];
      setParticleCount(0);
    }
  };

  return (
    <div className='space-y-6'>
      <GlassCard>
        <GlassCardHeader>
          <GlassCardTitle>Interactive Particle Effects</GlassCardTitle>
          <GlassCardDescription>
            Move your mouse over the canvas to control particle emission. Click
            for bursts!
          </GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent>
          <div className='space-y-4'>
            <div className='flex gap-4 flex-wrap'>
              <div className='flex-1 min-w-48'>
                <label className='block text-sm font-medium mb-2'>
                  Effect Preset
                </label>
                <GlassSelect
                  value={currentPreset}
                  onChange={handlePresetChange}
                  options={[
                    { value: 'sparks', label: '✨ Sparks' },
                    { value: 'fireworks', label: '🎆 Fireworks' },
                    { value: 'smoke', label: '💨 Smoke' },
                    { value: 'magic', label: '🔮 Magic' },
                    { value: 'rain', label: '🌧️ Rain' },
                    { value: 'snow', label: '❄️ Snow' },
                  ]}
                />
              </div>

              <div className='flex gap-2'>
                <GlassButton
                  onClick={toggleAnimation}
                  variant={isRunning ? 'primary' : 'secondary'}
                >
                  {isRunning ? '⏸️ Pause' : '▶️ Play'}
                </GlassButton>
                <GlassButton onClick={clearParticles} variant='secondary'>
                  🧹 Clear
                </GlassButton>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <label className='block text-sm font-medium mb-2'>
                  Emission Rate: {customRate[0]}
                </label>
                <GlassSlider
                  value={customRate[0]}
                  onChange={value => setCustomRate([value])}
                  max={300}
                  min={10}
                  step={10}
                  className='w-full'
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-2'>
                  Gravity: {customGravity[0]}
                </label>
                <GlassSlider
                  value={customGravity[0]}
                  onChange={value => setCustomGravity([value])}
                  max={200}
                  min={-50}
                  step={5}
                  className='w-full'
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-2'>
                  Size: {customSize[0]}
                </label>
                <GlassSlider
                  value={customSize[0]}
                  onChange={value => setCustomSize([value])}
                  max={10}
                  min={1}
                  step={1}
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
              style={{ maxWidth: '800px', aspectRatio: '2/1' }}
              onMouseMove={handleMouseMove}
              onClick={handleClick}
            />

            <div className='absolute top-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm'>
              Particles: {particleCount}
            </div>
          </div>

          <div className='mt-4 text-sm text-gray-600'>
            <p>
              <strong>Instructions:</strong>
            </p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Move your mouse over the canvas to control particle emission
              </li>
              <li>Click to create particle bursts</li>
              <li>Use the controls above to adjust parameters</li>
              <li>Try different presets to see various effects</li>
            </ul>
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  );
}
