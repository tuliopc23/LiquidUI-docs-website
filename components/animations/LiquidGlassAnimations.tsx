'use client'

import { useEffect, useRef, useCallback, useMemo } from 'react'
import { gsap } from '../../utils/gsap';

interface LiquidGlassAnimationsProps {
    children: React.ReactNode
    className?: string
    intensity?: 'subtle' | 'medium' | 'strong'
    morphSpeed?: 'slow' | 'medium' | 'fast'
    liquidEffect?: boolean
    glowEffect?: boolean
    rippleEffect?: boolean
}

export const LiquidGlassAnimations = ({
    children,
    className = '',
    intensity = 'medium',
    morphSpeed = 'medium',
    liquidEffect = true,
    glowEffect = true,
    rippleEffect = true
}: LiquidGlassAnimationsProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const liquidRef = useRef<HTMLDivElement>(null)
    const glowRef = useRef<HTMLDivElement>(null)
    const timelineRef = useRef<gsap.core.Timeline | null>(null)

    const intensityValues = useMemo(() => ({
        subtle: { scale: 1.02, blur: 2, glow: 0.3 },
        medium: { scale: 1.05, blur: 4, glow: 0.5 },
        strong: { scale: 1.08, blur: 6, glow: 0.8 }
    }), [])

    const speedValues = useMemo(() => ({
        slow: 0.8,
        medium: 0.5,
        fast: 0.3
    }), [])

    const createRipple = useCallback((e: MouseEvent) => {
        if (!containerRef.current || !rippleEffect) return

        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const ripple = document.createElement('div')
        ripple.className = 'liquid-ripple'
        ripple.style.cssText = `
            position: absolute;
            left: ${x - 25}px;
            top: ${y - 25}px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            pointer-events: none;
            transform: scale(0);
        `

        containerRef.current.appendChild(ripple)

        gsap.to(ripple, {
            scale: 2,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => {
                ripple.remove()
            }
        })
    }, [rippleEffect])

    const handleMouseEnter = useCallback((e: MouseEvent) => {
        if (!containerRef.current) return

        const { scale, blur, glow } = intensityValues[intensity]
        const speed = speedValues[morphSpeed]

        // Kill existing timeline
        if (timelineRef.current) {
            timelineRef.current.kill()
        }

        // Create new timeline
        timelineRef.current = gsap.timeline()

        // Liquid morph animation
        if (liquidEffect && liquidRef.current) {
            timelineRef.current.to(liquidRef.current, {
                scale: scale,
                filter: `blur(${blur}px)`,
                borderRadius: '24px',
                duration: speed,
                ease: 'power2.out'
            }, 0)
        }

        // Glow effect
        if (glowEffect && glowRef.current) {
            timelineRef.current.to(glowRef.current, {
                opacity: glow,
                scale: scale * 1.1,
                duration: speed,
                ease: 'power2.out'
            }, 0)
        }

        // Container transform
        timelineRef.current.to(containerRef.current, {
            y: -2,
            rotationX: 2,
            rotationY: 2,
            transformPerspective: 1000,
            duration: speed,
            ease: 'power2.out'
        }, 0)

        // Create ripple effect
        createRipple(e)
    }, [intensity, morphSpeed, liquidEffect, glowEffect, createRipple, intensityValues, speedValues])

    const handleMouseLeave = useCallback(() => {
        if (!containerRef.current) return

        const speed = speedValues[morphSpeed]

        // Kill existing timeline
        if (timelineRef.current) {
            timelineRef.current.kill()
        }

        // Create new timeline
        timelineRef.current = gsap.timeline()

        // Reset liquid morph
        if (liquidEffect && liquidRef.current) {
            timelineRef.current.to(liquidRef.current, {
                scale: 1,
                filter: 'blur(0px)',
                borderRadius: '16px',
                duration: speed * 1.2,
                ease: 'power2.out'
            }, 0)
        }

        // Reset glow effect
        if (glowEffect && glowRef.current) {
            timelineRef.current.to(glowRef.current, {
                opacity: 0,
                scale: 1,
                duration: speed * 1.2,
                ease: 'power2.out'
            }, 0)
        }

        // Reset container transform
        timelineRef.current.to(containerRef.current, {
            y: 0,
            rotationX: 0,
            rotationY: 0,
            duration: speed * 1.2,
            ease: 'power2.out'
        }, 0)
    }, [morphSpeed, liquidEffect, glowEffect, speedValues])

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height

        gsap.to(containerRef.current, {
            rotationX: y * 10,
            rotationY: -x * 10,
            duration: 0.3,
            ease: 'power2.out'
        })
    }, [])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        // Add event listeners
        container.addEventListener('mouseenter', handleMouseEnter)
        container.addEventListener('mouseleave', handleMouseLeave)
        container.addEventListener('mousemove', handleMouseMove)

        // Cleanup
        return () => {
            container.removeEventListener('mouseenter', handleMouseEnter)
            container.removeEventListener('mouseleave', handleMouseLeave)
            container.removeEventListener('mousemove', handleMouseMove)

            if (timelineRef.current) {
                timelineRef.current.kill()
            }
        }
    }, [handleMouseEnter, handleMouseLeave, handleMouseMove])

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden cursor-pointer transform-gpu ${className}`}
            style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform'
            }}
        >
            {/* Glow effect layer */}
            {glowEffect && (
                <div
                    ref={glowRef}
                    className="absolute inset-0 opacity-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, transparent 70%)',
                        borderRadius: '16px',
                        filter: 'blur(8px)',
                        transform: 'scale(1)'
                    }}
                />
            )}

            {/* Liquid glass layer */}
            {liquidEffect && (
                <div
                    ref={liquidRef}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        transform: 'scale(1)'
                    }}
                />
            )}

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
}

// Hook for manual liquid glass animations
 