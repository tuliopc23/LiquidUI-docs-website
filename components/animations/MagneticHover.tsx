'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from '../../utils/gsap';

interface MagneticHoverProps {
    children: React.ReactNode
    className?: string
    strength?: 'subtle' | 'medium' | 'strong'
    speed?: 'slow' | 'medium' | 'fast'
    triggerDistance?: number
    resetSpeed?: number
    disabled?: boolean
}

export const MagneticHover = ({
    children,
    className = '',
    strength = 'medium',
    speed = 'medium',
    triggerDistance = 100,
    resetSpeed = 0.3,
    disabled = false
}: MagneticHoverProps) => {
    const elementRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<gsap.core.Tween | null>(null)
    const isHoveringRef = useRef(false)

    const strengthValues = {
        subtle: 0.2,
        medium: 0.4,
        strong: 0.6
    }

    const speedValues = {
        slow: 0.8,
        medium: 0.5,
        fast: 0.3
    }

    const magneticStrength = strengthValues[strength]
    const animationSpeed = speedValues[speed]

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!elementRef.current || disabled) return

        const rect = elementRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = e.clientX - centerX
        const deltaY = e.clientY - centerY
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

        if (distance < triggerDistance) {
            // Mouse is within trigger distance - apply magnetic effect
            const magneticForce = Math.max(0, 1 - distance / triggerDistance)
            const moveX = deltaX * magneticStrength * magneticForce
            const moveY = deltaY * magneticStrength * magneticForce

            // Kill existing animation
            if (animationRef.current) {
                animationRef.current.kill()
            }

            // Apply magnetic movement
            animationRef.current = gsap.to(elementRef.current, {
                x: moveX,
                y: moveY,
                duration: animationSpeed,
                ease: 'power2.out',
                overwrite: true
            })

            isHoveringRef.current = true
        } else if (isHoveringRef.current) {
            // Mouse is outside trigger distance - reset position
            if (animationRef.current) {
                animationRef.current.kill()
            }

            animationRef.current = gsap.to(elementRef.current, {
                x: 0,
                y: 0,
                duration: resetSpeed,
                ease: 'power2.out',
                overwrite: true
            })

            isHoveringRef.current = false
        }
    }, [magneticStrength, animationSpeed, triggerDistance, resetSpeed, disabled])

    const handleMouseLeave = useCallback(() => {
        if (!elementRef.current || disabled) return

        // Kill existing animation
        if (animationRef.current) {
            animationRef.current.kill()
        }

        // Reset position smoothly
        animationRef.current = gsap.to(elementRef.current, {
            x: 0,
            y: 0,
            duration: resetSpeed,
            ease: 'power2.out',
            overwrite: true
        })

        isHoveringRef.current = false
    }, [resetSpeed, disabled])

    const handleMouseEnter = useCallback(() => {
        if (!elementRef.current || disabled) return

        // Add a subtle scale up effect when entering
        gsap.to(elementRef.current, {
            scale: 1.02,
            duration: 0.2,
            ease: 'power2.out'
        })
    }, [disabled])

    const handleMouseLeaveScale = useCallback(() => {
        if (!elementRef.current || disabled) return

        // Reset scale
        gsap.to(elementRef.current, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out'
        })
    }, [disabled])

    useEffect(() => {
        const element = elementRef.current
        if (!element || disabled) return

        // Add event listeners
        element.addEventListener('mousemove', handleMouseMove)
        element.addEventListener('mouseleave', handleMouseLeave)
        element.addEventListener('mouseenter', handleMouseEnter)
        element.addEventListener('mouseleave', handleMouseLeaveScale)

        // Add global mousemove for outside detection
        document.addEventListener('mousemove', handleMouseMove)

        return () => {
            element.removeEventListener('mousemove', handleMouseMove)
            element.removeEventListener('mouseleave', handleMouseLeave)
            element.removeEventListener('mouseenter', handleMouseEnter)
            element.removeEventListener('mouseleave', handleMouseLeaveScale)
            document.removeEventListener('mousemove', handleMouseMove)

            // Kill any running animations
            if (animationRef.current) {
                animationRef.current.kill()
            }
        }
    }, [handleMouseMove, handleMouseLeave, handleMouseEnter, handleMouseLeaveScale, disabled])

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (animationRef.current) {
                animationRef.current.kill()
            }
        }
    }, [])

    return (
        <div
            ref={elementRef}
            className={`inline-block transform-gpu ${className}`}
            style={{
                willChange: 'transform',
                transformStyle: 'preserve-3d'
            }}
        >
            {children}
        </div>
    )
}

// Hook for manual magnetic effects
export const useMagneticHover = () => {
    const createMagneticEffect = useCallback((
        element: HTMLElement,
        options: {
            strength?: number
            speed?: number
            triggerDistance?: number
        } = {}
    ) => {
        const { strength = 0.4, speed = 0.5, triggerDistance = 100 } = options

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2

            const deltaX = e.clientX - centerX
            const deltaY = e.clientY - centerY
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

            if (distance < triggerDistance) {
                const magneticForce = Math.max(0, 1 - distance / triggerDistance)
                const moveX = deltaX * strength * magneticForce
                const moveY = deltaY * strength * magneticForce

                gsap.to(element, {
                    x: moveX,
                    y: moveY,
                    duration: speed,
                    ease: 'power2.out',
                    overwrite: true
                })
            }
        }

        const handleMouseLeave = () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: true
            })
        }

        element.addEventListener('mousemove', handleMouseMove)
        element.addEventListener('mouseleave', handleMouseLeave)
        document.addEventListener('mousemove', handleMouseMove)

        return () => {
            element.removeEventListener('mousemove', handleMouseMove)
            element.removeEventListener('mouseleave', handleMouseLeave)
            document.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    const createMagneticRipple = useCallback((element: HTMLElement, e: MouseEvent) => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const ripple = document.createElement('div')
        ripple.className = 'magnetic-ripple'
        

        element.appendChild(ripple)

        gsap.to(ripple, {
            width: 200,
            height: 200,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => {
                ripple.remove()
            }
        })
    }, [])

    return {
        createMagneticEffect,
        createMagneticRipple
    }
}

// Magnetic button component with built-in effects
export const MagneticButton = ({
    children,
    className = '',
    strength = 'medium',
    speed = 'medium',
    rippleEffect = true,
    onClick,
    ...props
}: {
    children: React.ReactNode
    className?: string
    strength?: 'subtle' | 'medium' | 'strong'
    speed?: 'slow' | 'medium' | 'fast'
    rippleEffect?: boolean
    onClick?: (e: React.MouseEvent) => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { createMagneticRipple } = useMagneticHover()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (rippleEffect) {
            createMagneticRipple(e.currentTarget, e.nativeEvent)
        }
        onClick?.(e)
    }

    return (
        <MagneticHover strength={strength} speed={speed} className={className}>
            <button onClick={handleClick} {...props}>
                {children}
            </button>
        </MagneticHover>
    )
} 