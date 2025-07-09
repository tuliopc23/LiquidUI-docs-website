'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GlassButton, GlassCard, GlassSlider } from 'liquidify';

// Simple Fluid Simulation class for demonstration
class FluidSimulation {
  gridWidth: number;
  gridHeight: number;
  cellSize: number;
  particleCount: number;
  viscosity: number;
  fade: number;
  gravity: Vector2D;
  densityField: number[][];
  velocityField: Vector2D[][];

  constructor({
    gridWidth,
    gridHeight,
    cellSize,
    particleCount,
    viscosity,
    fade,
    gravity,
  }: any) {
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.cellSize = cellSize;
    this.particleCount = particleCount;
    this.viscosity = viscosity;
    this.fade = fade;
    this.gravity = gravity;
    this.densityField = Array.from({ length: gridWidth }, () =>
      Array(gridHeight).fill(0)
    );
    this.velocityField = Array.from({ length: gridWidth }, () =>
      Array.from({ length: gridHeight }, () => new Vector2D(0, 0))
    );
  }

  update(deltaTime: number) {
    for (let x = 0; x < this.gridWidth; x++) {
      for (let y = 0; y < this.gridHeight; y++) {
        this.velocityField[x][y] = this.velocityField[x][y].add(
          this.gravity.multiply(deltaTime / 1000)
        );
        this.densityField[x][y] *= 1 - this.fade * deltaTime;
      }
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    for (let x = 0; x < this.gridWidth; x++) {
      for (let y = 0; y < this.gridHeight; y++) {
        const alpha = Math.min(1, this.densityField[x][y]);
        ctx.fillStyle = `rgba(0, 164, 219, ${alpha})`;
        ctx.fillRect(
          x * this.cellSize,
          y * this.cellSize,
          this.cellSize,
          this.cellSize
        );
      }
    }
  }

  addSourceDensity(x: number, y: number, amount: number) {
    this.densityField[x][y] = Math.min(1, this.densityField[x][y] + amount);
  }

  addVelocity(x: number, y: number, velocity: Vector2D) {
    this.velocityField[x][y] = this.velocityField[x][y].add(velocity);
  }

  applyImpulse(source: Vector2D, strength: number) {
    const x = Math.floor(source.x / this.cellSize);
    const y = Math.floor(source.y / this.cellSize);
    if (x >= 0 && x < this.gridWidth && y >= 0 && y < this.gridHeight) {
      this.addSourceDensity(x, y, strength);
      this.addVelocity(x, y, new Vector2D(0, strength));
    }
  }
}

// Simple Vector2D class
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

export function FluidDynamicsDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [viscosity, setViscosity] = useState([0.2]);
  const [surfaceTension, setSurfaceTension] = useState([0.05]);
  const [gravity, setGravity] = useState([98]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fluidSim = new FluidSimulation({
      gridWidth: 50,
      gridHeight: 50,
      cellSize: 10,
      particleCount: 500,
      viscosity: viscosity[0],
      fade: surfaceTension[0],
      gravity: new Vector2D(0, gravity[0]),
    });

    canvas.width = fluidSim.gridWidth * fluidSim.cellSize;
    canvas.height = fluidSim.gridHeight * fluidSim.cellSize;

    const animate = (currentTime: number) => {
      fluidSim.update(16);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fluidSim.render(ctx);
      requestAnimationFrame(animate);
    };

    animate(0);
  }, [viscosity, surfaceTension, gravity]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / 10);
    const y = Math.floor((e.clientY - rect.top) / 10);

    // Note: In a real implementation, we'd need to maintain a reference
    // to the fluid simulation instance to interact with it
  };

  return (
    <div className='space-y-6'>
      <GlassCard className='p-6'>
        <h3 className='text-lg font-semibold mb-2'>
          Interactive Fluid Dynamics
        </h3>
        <p className='text-sm text-gray-600 mb-4'>
          Move your mouse over the canvas to interact with the fluid. Adjust
          parameters to change the behavior.
        </p>
        <div className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm font-medium mb-2'>
                Viscosity: {viscosity[0]}
              </label>
              <GlassSlider
                value={viscosity[0]}
                onChange={value => setViscosity([value])}
                max={0.8}
                min={0.05}
                step={0.05}
                className='w-full'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-2'>
                Surface Tension: {surfaceTension[0]}
              </label>
              <GlassSlider
                value={surfaceTension[0]}
                onChange={value => setSurfaceTension([value])}
                max={0.2}
                min={0.01}
                step={0.01}
                className='w-full'
              />
            </div>

            <div>
              <label className='block text-sm font-medium mb-2'>
                Gravity: {gravity[0]}
              </label>
              <GlassSlider
                value={gravity[0]}
                onChange={value => setGravity([value])}
                max={200}
                min={-100}
                step={10}
                className='w-full'
              />
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard className='p-4'>
        <div className='relative'>
          <canvas
            ref={canvasRef}
            className='w-full h-auto border border-gray-300 rounded-lg cursor-crosshair'
            style={{ maxWidth: '500px', aspectRatio: '1/1' }}
            onMouseMove={handleMouseMove}
          />
        </div>

        <div className='mt-4 text-sm text-gray-600'>
          <p>
            <strong>Instructions:</strong>
          </p>
          <ul className='list-disc list-inside space-y-1'>
            <li>Move your mouse over the canvas to add fluid interaction</li>
            <li>Adjust parameters to change fluid behavior</li>
          </ul>
        </div>
      </GlassCard>
    </div>
  );
}
