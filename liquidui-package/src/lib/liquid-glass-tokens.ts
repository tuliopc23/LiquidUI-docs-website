/**
 * Design tokens for LiquidUI glass components
 */

export const liquidGlassTokens = {
    colors: {
        glass: {
            white: {
                10: 'rgba(255, 255, 255, 0.1)',
                20: 'rgba(255, 255, 255, 0.2)',
                30: 'rgba(255, 255, 255, 0.3)',
                40: 'rgba(255, 255, 255, 0.4)',
            },
            black: {
                10: 'rgba(0, 0, 0, 0.1)',
                20: 'rgba(0, 0, 0, 0.2)',
                30: 'rgba(0, 0, 0, 0.3)',
                40: 'rgba(0, 0, 0, 0.4)',
            },
            blue: {
                10: 'rgba(59, 130, 246, 0.1)',
                20: 'rgba(59, 130, 246, 0.2)',
                30: 'rgba(59, 130, 246, 0.3)',
                40: 'rgba(59, 130, 246, 0.4)',
            },
        },
        border: {
            light: 'rgba(255, 255, 255, 0.2)',
            medium: 'rgba(255, 255, 255, 0.3)',
            strong: 'rgba(255, 255, 255, 0.4)',
        },
    },
    blur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
    },
    shadows: {
        glass: {
            sm: '0 2px 8px rgba(0, 0, 0, 0.1)',
            md: '0 4px 16px rgba(0, 0, 0, 0.1)',
            lg: '0 8px 32px rgba(0, 0, 0, 0.1)',
            xl: '0 16px 64px rgba(0, 0, 0, 0.1)',
        },
    },
    borderRadius: {
        glass: {
            sm: '8px',
            md: '16px',
            lg: '24px',
            xl: '32px',
        },
    },
    animation: {
        duration: {
            fast: '150ms',
            normal: '300ms',
            slow: '500ms',
        },
        easing: {
            smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            liquid: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        },
    },
} as const;

export type LiquidGlassTokens = typeof liquidGlassTokens; 