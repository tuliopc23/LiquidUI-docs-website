/**
 * Glass utility functions for enhanced glassmorphism effects
 */

export const glassPresets = {
    subtle: {
        blur: 'backdrop-blur-sm',
        background: 'bg-white/5',
        border: 'border-white/10',
    },
    default: {
        blur: 'backdrop-blur-md',
        background: 'bg-white/10',
        border: 'border-white/20',
    },
    strong: {
        blur: 'backdrop-blur-lg',
        background: 'bg-white/20',
        border: 'border-white/30',
    },
    intense: {
        blur: 'backdrop-blur-xl',
        background: 'bg-white/30',
        border: 'border-white/40',
    },
} as const;

export const generateGlassClasses = (
    intensity: keyof typeof glassPresets = 'default',
    additionalClasses?: string
) => {
    const preset = glassPresets[intensity];
    return `${preset.blur} ${preset.background} ${preset.border} ${additionalClasses || ''}`.trim();
};

export const createGlassVariant = (
    baseColor: string,
    opacity: number = 0.1
) => {
    return {
        background: `bg-${baseColor}/${Math.round(opacity * 100)}`,
        border: `border-${baseColor}/${Math.round(opacity * 150)}`,
    };
};

export const glassAnimations = {
    float: 'animate-glass-float',
    morph: 'animate-liquid-morph',
    pulse: 'animate-pulse-gentle',
} as const; 