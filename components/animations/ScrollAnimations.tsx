'use client'

import { useEffect, useRef, useCallback, useMemo } from 'react'
import { gsap } from 'gsap'

// Define ScrollTrigger plugin
interface ScrollTriggerOptions {
    trigger: Element;
    animation?: (progress: number) => void;
    start?: string;
    end?: string;
    scrub?: boolean;
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    onLeaveBack?: () => void;
}

const ScrollTrigger = {
    create: (options: ScrollTriggerOptions) => {
        // Simple scroll trigger implementation
        const element = options.trigger
        const animation = options.animation || (() => { })
        const scrub = options.scrub || false
        const onEnter = options.onEnter
        const onLeave = options.onLeave

        let hasEntered = false
        let hasLeft = false

        const handleScroll = () => {
            if (!element) return

            const rect = element.getBoundingClientRect()
            const windowHeight = window.innerHeight

            const isInView = rect.top < windowHeight && rect.bottom > 0
            const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)))

            if (isInView && !hasEntered) {
                hasEntered = true
                hasLeft = false
                if (onEnter) onEnter()
            } else if (!isInView && hasEntered && !hasLeft) {
                hasLeft = true
                hasEntered = false
                if (onLeave) onLeave()
            }

            if (scrub && isInView) {
                animation(progress)
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Initial check

        return {
            kill: () => {
                window.removeEventListener('scroll', handleScroll)
            }
        }
    }
}

interface ScrollAnimationsProps {
    children: React.ReactNode
    className?: string
    animationType?: 'fade' | 'slide' | 'scale' | 'rotate' | 'liquid' | 'morphing'
    direction?: 'up' | 'down' | 'left' | 'right'
    intensity?: 'subtle' | 'medium' | 'strong'
    duration?: number
    delay?: number
    stagger?: number
    scrub?: boolean
    liquidMorph?: boolean
    glassBreak?: boolean
    onVisible?: () => void
    onHidden?: () => void
}

export const ScrollAnimations = ({
    children,
    className = '',
    animationType = 'fade',
    direction = 'up',
    intensity = 'medium',
    duration = 1,
    delay = 0,
    stagger = 0,
    scrub = false,
    liquidMorph = false,
    glassBreak = false,
    onVisible,
    onHidden
}: ScrollAnimationsProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollTriggerRef = useRef<{ kill: () => void } | null>(null)
    const timelineRef = useRef<gsap.core.Timeline | null>(null)

    const intensityValues = useMemo(() => ({
        subtle: { distance: 30, scale: 0.95, rotation: 5, blur: 2 },
        medium: { distance: 60, scale: 0.9, rotation: 15, blur: 4 },
        strong: { distance: 100, scale: 0.8, rotation: 30, blur: 8 }
    }), [])

    const getInitialState = useCallback(() => {
        const { distance, scale, rotation, blur } = intensityValues[intensity]

        switch (animationType) {
            case 'fade':
                return { opacity: 0, filter: `blur(${blur}px)` }
            case 'slide':
                const slideProps: Record<string, number> = { opacity: 0 }
                if (direction === 'up') slideProps.y = distance
                if (direction === 'down') slideProps.y = -distance
                if (direction === 'left') slideProps.x = distance
                if (direction === 'right') slideProps.x = -distance
                return slideProps
            case 'scale':
                return { opacity: 0, scale, transformOrigin: 'center' }
            case 'rotate':
                return { opacity: 0, rotation, transformOrigin: 'center' }
            case 'liquid':
                return {
                    opacity: 0,
                    scale: 0.8,
                    filter: `blur(${blur}px)`,
                    borderRadius: '50%',
                    skewX: 20,
                    skewY: 10
                }
            case 'morphing':
                return {
                    opacity: 0,
                    scaleX: 0.3,
                    scaleY: 1.5,
                    rotation: 45,
                    filter: `blur(${blur}px)`,
                    borderRadius: '50%'
                }
            default:
                return { opacity: 0 }
        }
    }, [animationType, direction, intensity, intensityValues])

    const getFinalState = useCallback(() => {
        return {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            scaleX: 1,
            scaleY: 1,
            rotation: 0,
            skewX: 0,
            skewY: 0,
            filter: 'blur(0px)',
            borderRadius: '16px'
        }
    }, [])

    const createLiquidMorphAnimation = useCallback((element: HTMLElement, progress: number) => {
        const morphStates = [
            { borderRadius: '50%', scaleX: 1, scaleY: 1 },
            { borderRadius: '30% 70% 70% 30%', scaleX: 1.1, scaleY: 0.9 },
            { borderRadius: '70% 30% 30% 70%', scaleX: 0.9, scaleY: 1.1 },
            { borderRadius: '16px', scaleX: 1, scaleY: 1 }
        ]

        const currentIndex = Math.floor(progress * (morphStates.length - 1))
        const nextIndex = Math.min(currentIndex + 1, morphStates.length - 1)
        const localProgress = (progress * (morphStates.length - 1)) - currentIndex

        const current = morphStates[currentIndex]
        const next = morphStates[nextIndex]

        gsap.set(element, {
            borderRadius: current.borderRadius,
            scaleX: gsap.utils.interpolate(current.scaleX, next.scaleX, localProgress),
            scaleY: gsap.utils.interpolate(current.scaleY, next.scaleY, localProgress)
        })
    }, [])

    const createGlassBreakAnimation = useCallback((element: HTMLElement) => {
        const pieces: HTMLElement[] = []
        const numPieces = 6

        for (let i = 0; i < numPieces; i++) {
            const piece = document.createElement('div')
            piece.className = 'glass-piece'
            piece.style.cssText = `
        position: absolute;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        width: ${20 + Math.random() * 30}px;
        height: ${20 + Math.random() * 30}px;
        background: rgba(255,255,255,0.3);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 4px;
        pointer-events: none;
        z-index: 1000;
      `
            element.appendChild(piece)
            pieces.push(piece)
        }

        const tl = gsap.timeline({
            onComplete: () => {
                pieces.forEach(piece => piece.remove())
            }
        })

        pieces.forEach((piece, index) => {
            tl.to(piece, {
                x: (Math.random() - 0.5) * 200,
                y: (Math.random() - 0.5) * 200,
                rotation: Math.random() * 360,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            }, index * 0.1)
        })

        return tl
    }, [])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        // Set initial state
        gsap.set(container, getInitialState())

        // Create scroll trigger
        scrollTriggerRef.current = ScrollTrigger.create({
            trigger: container,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: scrub,
            onEnter: () => {
                if (timelineRef.current) {
                    timelineRef.current.kill()
                }

                timelineRef.current = gsap.timeline({
                    delay: delay,
                    onComplete: () => {
                        if (liquidMorph) {
                            // Continue liquid morphing
                            gsap.to(container, {
                                borderRadius: '30% 70% 70% 30%',
                                duration: 2,
                                ease: 'power2.inOut',
                                yoyo: true,
                                repeat: -1
                            })
                        }
                    }
                })

                if (stagger > 0) {
                    const children = container.children
                    timelineRef.current.to(children, {
                        ...getFinalState(),
                        duration: duration,
                        ease: 'power2.out',
                        stagger: stagger
                    })
                } else {
                    timelineRef.current.to(container, {
                        ...getFinalState(),
                        duration: duration,
                        ease: 'power2.out'
                    })
                }

                if (glassBreak) {
                    timelineRef.current.add(createGlassBreakAnimation(container), 0.5)
                }

                if (onVisible) onVisible()
            },
            onLeave: () => {
                if (timelineRef.current) {
                    timelineRef.current.kill()
                }

                timelineRef.current = gsap.timeline()
                timelineRef.current.to(container, {
                    ...getInitialState(),
                    duration: duration * 0.6,
                    ease: 'power2.in'
                })

                if (onHidden) onHidden()
            },
            animation: scrub ? (progress: number) => {
                if (liquidMorph) {
                    createLiquidMorphAnimation(container, progress)
                } else {
                    const initialState = getInitialState()
                    const finalState = getFinalState()

                    Object.keys(finalState).forEach(key => {
                        const initial = (initialState as Record<string, number | string>)[key] || 0
                        const final = (finalState as Record<string, number | string>)[key]
                        const current = gsap.utils.interpolate(initial as number, final as number, progress)
                        gsap.set(container, { [key]: current })
                    })
                }
            } : undefined
        })

        return () => {
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill()
            }
            if (timelineRef.current) {
                timelineRef.current.kill()
            }
        }
    }, [
        animationType,
        direction,
        intensity,
        duration,
        delay,
        stagger,
        scrub,
        liquidMorph,
        glassBreak,
        getInitialState,
        getFinalState,
        createLiquidMorphAnimation,
        createGlassBreakAnimation,
        onVisible,
        onHidden
    ])

    return (
        <div
            ref={containerRef}
            className={`transform-gpu ${className}`}
            style={{
                willChange: 'transform, opacity, filter'
            }}
        >
            {children}
        </div>
    )
}

// Advanced scroll animations hook
export const useAdvancedScrollAnimations = () => {
    const createScrollTimeline = useCallback((elements: HTMLElement[], options: {
        stagger?: number
        duration?: number
        ease?: string
        scrub?: boolean
    } = {}) => {
        const { stagger = 0.1, duration = 1, ease = 'power2.out', scrub = false } = options

        elements.forEach((element, index) => {
            ScrollTrigger.create({
                trigger: element,
                start: 'top 80%',
                scrub: scrub,
                onEnter: () => {
                    gsap.fromTo(element,
                        { opacity: 0, y: 50, scale: 0.9 },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: duration,
                            delay: index * stagger,
                            ease: ease
                        }
                    )
                }
            })
        })
    }, [])

    const createParallaxEffect = useCallback((element: HTMLElement, speed: number = 0.5) => {
        ScrollTrigger.create({
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            animation: (progress: number) => {
                gsap.set(element, {
                    y: -progress * 100 * speed
                })
            }
        })
    }, [])

    const createLiquidScrollMorph = useCallback((element: HTMLElement) => {
        ScrollTrigger.create({
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            animation: (progress: number) => {
                const morphStates = [
                    '50%',
                    '30% 70% 70% 30%',
                    '70% 30% 30% 70%',
                    '40% 60% 60% 40%',
                    '16px'
                ]

                const currentIndex = Math.floor(progress * (morphStates.length - 1))
                const borderRadius = morphStates[currentIndex] || '16px'

                gsap.set(element, {
                    borderRadius,
                    scale: 1 + progress * 0.1,
                    filter: `blur(${progress * 2}px)`
                })
            }
        })
    }, [])

    return {
        createScrollTimeline,
        createParallaxEffect,
        createLiquidScrollMorph
    }
}

// Batch scroll animations for performance
export const BatchScrollAnimations = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const items = container.querySelectorAll('[data-scroll-item]')

        items.forEach((item, index) => {
            ScrollTrigger.create({
                trigger: item,
                start: 'top 85%',
                onEnter: () => {
                    gsap.fromTo(item,
                        {
                            opacity: 0,
                            y: 60,
                            scale: 0.8,
                            filter: 'blur(4px)',
                            borderRadius: '50%'
                        },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            filter: 'blur(0px)',
                            borderRadius: '16px',
                            duration: 0.8,
                            delay: index * 0.1,
                            ease: 'power2.out'
                        }
                    )
                }
            })
        })
    }, [])

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    )
} 