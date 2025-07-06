import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { usePerformanceOptimizer } from '@/hooks/usePerformanceOptimizer'

interface AnimatedGradientProps {
  className?: string
  intensity?: 'low' | 'medium' | 'high'
  colors?: string[]
  speed?: number
  children?: React.ReactNode
}

export const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  className = '',
  intensity = 'medium',
  colors = ['#0ea5e9', '#a855f7', '#ec4899'],
  speed = 10,
  children
}) => {
  const { isReducedMotion, isMobile } = usePerformanceOptimizer()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Adjust intensity based on device and preferences
  const adjustedIntensity = isReducedMotion ? 'low' : (isMobile ? 
    (intensity === 'high' ? 'medium' : intensity) : 
    intensity)
  
  // Opacity values based on intensity
  const opacityMap = {
    low: 0.1,
    medium: 0.2,
    high: 0.3
  }
  
  // Blur values based on intensity
  const blurMap = {
    low: 60,
    medium: 100,
    high: 140
  }
  
  // Animation speed based on intensity and reduced motion
  const adjustedSpeed = isReducedMotion ? 0.1 : (
    speed * { low: 0.5, medium: 1, high: 1.5 }[adjustedIntensity]
  )
  
  useEffect(() => {
    if (!canvasRef.current || isReducedMotion) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    
    setCanvasDimensions()
    window.addEventListener('resize', setCanvasDimensions)
    
    // Create gradient points
    const points = colors.map((color, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * adjustedSpeed,
      vy: (Math.random() - 0.5) * adjustedSpeed,
      color
    }))
    
    // Animation loop
    let animationId: number
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update points
      points.forEach(point => {
        point.x += point.vx
        point.y += point.vy
        
        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1
      })
      
      // Draw gradients
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      )
      
      points.forEach((point, i) => {
        gradient.addColorStop(i / points.length, point.color)
      })
      
      ctx.globalAlpha = opacityMap[adjustedIntensity]
      ctx.filter = `blur(${blurMap[adjustedIntensity]}px)`
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      animationId = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions)
      cancelAnimationFrame(animationId)
    }
  }, [colors, adjustedSpeed, adjustedIntensity, isReducedMotion])
  
  // If reduced motion is preferred, use a static gradient
  if (isReducedMotion) {
    return (
      <div 
        className={`animated-gradient ${className}`}
        style={{
          background: `linear-gradient(135deg, ${colors.join(', ')})`,
          opacity: opacityMap[adjustedIntensity] * 0.5
        }}
      >
        {children}
      </div>
    )
  }
  
  return (
    <div className={`animated-gradient relative overflow-hidden ${className}`}>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  )
}

export default AnimatedGradient