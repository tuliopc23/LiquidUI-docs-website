/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './theme.config.tsx',
        './styles/**/*.css',
        // Only include specific LiquidiUI components if needed
        // '../LiquidiUI/src/components/**/*.{js,ts,jsx,tsx}',
    ],
    safelist: [
        // Core Apple-inspired classes
        'apple-gradient',
        'apple-gradient-2', 
        'apple-gradient-3',
        'apple-gradient-4',
        'ios-logo',
        'hero-text',
        'body-text',
        'animate-liquid-morph',
        
        // Glass effect classes
        'glass-card',
        'glass-button',
        'glass-button-primary',
        'liquid-glass',
        'glass-effect',
        'glass-effect-light',
        'glass-effect-strong',
        'glass-nav',
        
        // Background utilities
        'liquid-gradient-light',
        'liquid-gradient-dark',
        'bg-gradient-radial',
        'bg-gradient-conic',
        'bg-gradient-glass',
        'bg-shimmer',
        
        // Animation classes
        'animate-shimmer',
        'animate-glass-expand',
        'animate-liquid-morph',
        'hover-lift',
        'hover-glow',
        'hover-scale',
        
        // Text gradients
        'text-gradient',
        'text-gradient-primary',
        'text-gradient-rainbow',
        
        // Layout utilities
        'content-container',
        'full-bleed',
        'smooth-scroll',
        'scroll-padding',
        
        // Nextra overrides
        'nextra-nav-container',
        'nextra-sidebar',
        'nextra-content',
        
        // Color variants with opacity
        { pattern: /bg-(white|black|gray|primary|secondary|accent)-\d+/ },
        { pattern: /text-(white|black|gray|primary|secondary|accent)-\d+/ },
        { pattern: /border-(white|black|gray|primary|secondary|accent)-\d+/ },
        
        // Dynamic RGB color usage - simplified pattern
        'rgb-primary',
        
        // Dark mode variants - simplified
        'dark:bg-gray-900',
        'dark:text-white',
        'dark:border-gray-700',
    ],
    darkMode: ['class', '[data-theme="dark"]'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'system-ui', 'sans-serif'],
                mono: ['SF Mono', 'JetBrains Mono', 'Consolas', 'monospace'],
                heading: ['SF Pro Display', 'Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                '2xs': ['0.75rem', { lineHeight: '1rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.01em' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],
                '5xl': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                '6xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                '7xl': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
                '8xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
            },
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                    rgb: 'rgb(var(--primary-rgb) / <alpha-value>)',
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                // Additional semantic colors
                success: {
                    DEFAULT: 'hsl(var(--success))',
                    foreground: 'hsl(var(--success-foreground))',
                },
                warning: {
                    DEFAULT: 'hsl(var(--warning))',
                    foreground: 'hsl(var(--warning-foreground))',
                },
                info: {
                    DEFAULT: 'hsl(var(--info))',
                    foreground: 'hsl(var(--info-foreground))',
                },
                // Glass colors with better opacity support
                glass: {
                    white: 'rgba(255, 255, 255, var(--glass-opacity, 0.05))',
                    border: 'rgba(255, 255, 255, var(--glass-border-opacity, 0.1))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            backdropBlur: {
                xs: '2px',
                '4xl': '72px',
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
            },
            maxWidth: {
                '8xl': '88rem',
                '9xl': '96rem',
            },
            letterSpacing: {
                tightest: '-0.075em',
            },
            lineHeight: {
                '12': '3rem',
                '14': '3.5rem',
            },
            zIndex: {
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100',
            },
            animation: {
                // Core animations
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'fade-in-up': 'fadeInUp 0.6s ease-out',
                'fade-in-down': 'fadeInDown 0.6s ease-out',
                'fade-in-left': 'fadeInLeft 0.6s ease-out',
                'fade-in-right': 'fadeInRight 0.6s ease-out',
                'scale-in': 'scaleIn 0.4s ease-out',
                'slide-in-right': 'slideInRight 0.4s ease-out',
                'slide-in-left': 'slideInLeft 0.4s ease-out',
                'slide-in-up': 'slideInUp 0.4s ease-out',
                'slide-in-down': 'slideInDown 0.4s ease-out',
                'bounce-in': 'bounceIn 0.8s ease-out',
                'zoom-in': 'zoomIn 0.3s ease-out',

                // Glass specific animations
                'glass-shimmer': 'glassShimmer 2s ease-in-out infinite',
                'glass-pulse': 'glassPulse 2s ease-in-out infinite',
                'glass-float': 'glassFloat 3s ease-in-out infinite',

                // Background animations
                'gradient-x': 'gradientX 15s ease infinite',
                'gradient-y': 'gradientY 15s ease infinite',
                'gradient-xy': 'gradientXY 15s ease infinite',
                'gradient-conic': 'gradientConic 8s ease infinite',

                // Interactive animations
                'hover-lift': 'hoverLift 0.2s ease-out',
                'hover-glow': 'hoverGlow 0.3s ease-out',
                'press-down': 'pressDown 0.1s ease-out',

                // Loading animations
                'skeleton': 'skeleton 1.5s ease-in-out infinite',
                'spin-slow': 'spin 3s linear infinite',
                'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',

                // Text animations
                'text-shimmer': 'textShimmer 3s ease-in-out infinite',
                'type-writer': 'typeWriter 4s steps(40, end) infinite',
            },
            keyframes: {
                // Core animations
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                fadeInRight: {
                    '0%': { opacity: '0', transform: 'translateX(30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.8)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                bounceIn: {
                    '0%': { opacity: '0', transform: 'scale(0.3)' },
                    '50%': { opacity: '1', transform: 'scale(1.05)' },
                    '70%': { transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                zoomIn: {
                    '0%': { opacity: '0', transform: 'scale(0.5)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },

                // Glass specific animations
                glassShimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                glassPulse: {
                    '0%, 100%': { opacity: '0.5' },
                    '50%': { opacity: '0.8' },
                },
                glassFloat: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },

                // Background animations
                gradientX: {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center'
                    }
                },
                gradientY: {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'center top'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'center bottom'
                    }
                },
                gradientXY: {
                    '0%, 100%': {
                        'background-size': '400% 400%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '400% 400%',
                        'background-position': 'right center'
                    }
                },
                gradientConic: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },

                // Interactive animations
                hoverLift: {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(-4px)' },
                },
                hoverGlow: {
                    '0%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0)' },
                    '100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' },
                },
                pressDown: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(0.95)' },
                },

                // Loading animations
                skeleton: {
                    '0%': { backgroundPosition: '-200px 0' },
                    '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
                },

                // Text animations
                textShimmer: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                typeWriter: {
                    '0%': { width: '0' },
                    '50%': { width: '100%' },
                    '100%': { width: '0' },
                },
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                'glass-sm': '0 2px 8px 0 rgba(31, 38, 135, 0.2)',
                'glass-md': '0 4px 16px 0 rgba(31, 38, 135, 0.3)',
                'glass-lg': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                'glass-xl': '0 12px 48px 0 rgba(31, 38, 135, 0.4)',
                'glass-2xl': '0 25px 50px -12px rgba(31, 38, 135, 0.5)',
                'glass-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
                'glass-inset-lg': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)',
                'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
                'glow-lg': '0 0 40px rgba(99, 102, 241, 0.4)',
                'soft': '0 2px 20px rgba(0, 0, 0, 0.1)',
                'soft-lg': '0 4px 40px rgba(0, 0, 0, 0.1)',
                'hard': '0 10px 25px rgba(0, 0, 0, 0.2)',
                'hard-lg': '0 20px 40px rgba(0, 0, 0, 0.3)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                'shimmer': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
            },
            transitionTimingFunction: {
                'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                'bounce-out': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                'glass': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
            },
            transitionDuration: {
                '400': '400ms',
                '600': '600ms',
                '800': '800ms',
                '1200': '1200ms',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        function ({ addUtilities, addComponents, theme }) {
            const newUtilities = {
                // Enhanced Glass Effects
                '.glass-effect': {
                    background: 'rgba(255, 255, 255, var(--glass-opacity, 0.05))',
                    backdropFilter: 'blur(var(--glass-blur, 20px))',
                    WebkitBackdropFilter: 'blur(var(--glass-blur, 20px))',
                    border: '1px solid rgba(255, 255, 255, var(--glass-border-opacity, 0.1))',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                },
                '.glass-effect-light': {
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
                },
                '.glass-effect-strong': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 12px 48px 0 rgba(31, 38, 135, 0.5)',
                },
                '.glass-card': {
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
                },
                '.glass-nav': {
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(25px)',
                    WebkitBackdropFilter: 'blur(25px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                },
                '.glass-button': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)',
                },
                '.glass-button:hover': {
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 24px rgba(31, 38, 135, 0.3)',
                },

                // Text Gradients
                '.text-gradient': {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                },
                '.text-gradient-primary': {
                    background: `linear-gradient(135deg, ${theme('colors.primary.DEFAULT')}, ${theme('colors.accent.DEFAULT')})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                },
                '.text-gradient-rainbow': {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                },

                // Background Gradients
                '.bg-gradient-radial': {
                    backgroundImage: 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
                },
                '.bg-gradient-conic': {
                    backgroundImage: 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                },
                '.bg-gradient-glass': {
                    backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                },
                '.bg-shimmer': {
                    backgroundImage: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                    backgroundSize: '200% 100%',
                },

                // Interactive States
                '.hover-lift': {
                    transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-out',
                },
                '.hover-lift:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                },
                '.hover-glow': {
                    transition: 'box-shadow 0.3s ease-out',
                },
                '.hover-glow:hover': {
                    boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
                },
                '.hover-scale': {
                    transition: 'transform 0.2s ease-out',
                },
                '.hover-scale:hover': {
                    transform: 'scale(1.05)',
                },

                // Layout Utilities
                '.content-container': {
                    maxWidth: 'var(--content-width, 1200px)',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                },
                '.full-bleed': {
                    width: '100vw',
                    marginLeft: 'calc(50% - 50vw)',
                },

                // Scroll Enhancements
                '.smooth-scroll': {
                    scrollBehavior: 'smooth',
                },
                '.scroll-padding': {
                    scrollPaddingTop: 'var(--header-height, 64px)',
                },
            }

            addUtilities(newUtilities)
        }
    ],
} 