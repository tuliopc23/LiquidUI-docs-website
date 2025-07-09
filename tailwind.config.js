/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './mdx-components.tsx',
    './node_modules/liquidify/dist/**/*.{js,jsx}', // Include Liquidify components
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Apple System Colors
        'apple-blue': '#007AFF',
        'apple-green': '#34C759',
        'apple-indigo': '#5856D6',
        'apple-orange': '#FF9500',
        'apple-pink': '#FF2D92',
        'apple-purple': '#AF52DE',
        'apple-red': '#FF3B30',
        'apple-teal': '#30B0C7',
        'apple-yellow': '#FFCC00',

        // Apple Grays
        'apple-gray': {
          50: '#F2F2F7',
          100: '#E5E5EA',
          200: '#D1D1D6',
          300: '#C7C7CC',
          400: '#AEAEB2',
          500: '#8E8E93',
          600: '#636366',
          700: '#48484A',
          800: '#3A3A3C',
          900: '#1C1C1E',
        },

        // Liquidify theme colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'SF Pro Text',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'SF Mono',
          'Monaco',
          'Inconsolata',
          'Roboto Mono',
          'source-code-pro',
          'Menlo',
          'Consolas',
          'monospace',
        ],
        rounded: ['SF Pro Rounded', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // Apple Typography Scale
        'large-title': [
          '34px',
          { lineHeight: '41px', letterSpacing: '0.374px' },
        ],
        'title-1': ['28px', { lineHeight: '34px', letterSpacing: '0.364px' }],
        'title-2': ['22px', { lineHeight: '28px', letterSpacing: '0.35px' }],
        'title-3': ['20px', { lineHeight: '25px', letterSpacing: '0.38px' }],
        headline: [
          '17px',
          { lineHeight: '22px', letterSpacing: '-0.408px', fontWeight: '600' },
        ],
        body: ['17px', { lineHeight: '22px', letterSpacing: '-0.408px' }],
        callout: ['16px', { lineHeight: '21px', letterSpacing: '-0.32px' }],
        subheadline: ['15px', { lineHeight: '20px', letterSpacing: '-0.24px' }],
        footnote: ['13px', { lineHeight: '18px', letterSpacing: '-0.08px' }],
        'caption-1': ['12px', { lineHeight: '16px', letterSpacing: '0px' }],
        'caption-2': ['11px', { lineHeight: '13px', letterSpacing: '0.066px' }],
      },
      spacing: {
        // Apple 4pt grid system
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px',
        24: '96px',
        32: '128px',
        touch: '44px', // Apple minimum touch target
      },
      borderRadius: {
        'apple-sm': '4px',
        'apple-md': '8px',
        'apple-lg': '12px',
        'apple-xl': '16px',
        'apple-xxl': '20px',
        'apple-card': '12px',
        'apple-button': '8px',
        'apple-input': '10px',
        'apple-modal': '16px',
      },
      animation: {
        gradient: 'gradient 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s infinite',
        float: 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
        'apple-thin': '4px',
        'apple-regular': '8px',
        'apple-thick': '16px',
        'apple-ultra': '24px',
      },
      backdropSaturate: {
        0: '0',
        50: '.5',
        100: '1',
        150: '1.5',
        180: '1.8',
        200: '2',
      },
      boxShadow: {
        // Apple elevation system
        'apple-1':
          '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'apple-2':
          '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        'apple-3':
          '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
        'apple-4':
          '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
        'apple-5':
          '0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)',
        'apple-card': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'apple-button': '0 2px 8px rgba(0, 0, 0, 0.12)',
        'apple-modal': '0 25px 50px rgba(0, 0, 0, 0.25)',
        'apple-floating': '0 8px 24px rgba(0, 0, 0, 0.15)',

        // Glass shadows
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.3)',
        'glow-indigo': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-apple-blue': '0 0 20px rgba(0, 122, 255, 0.3)',
      },
      transitionTimingFunction: {
        'apple-standard': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        'apple-decelerate': 'cubic-bezier(0.0, 0.0, 0.2, 1)',
        'apple-accelerate': 'cubic-bezier(0.4, 0.0, 1, 1)',
        'apple-sharp': 'cubic-bezier(0.4, 0.0, 0.6, 1)',
        'apple-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'apple-spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        // Core Liquid Glass Effects
        '.liquid-glass': {
          'backdrop-filter': 'blur(12px) saturate(180%)',
          background: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          'box-shadow':
            '0 8px 32px rgba(31, 38, 135, 0.15), inset 0 4px 20px rgba(255, 255, 255, 0.25)',
        },
        '.liquid-glass-light': {
          'backdrop-filter': 'blur(8px) saturate(120%)',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          'box-shadow':
            '0 4px 16px rgba(31, 38, 135, 0.1), inset 0 2px 10px rgba(255, 255, 255, 0.2)',
        },
        '.liquid-glass-medium': {
          'backdrop-filter': 'blur(16px) saturate(150%)',
          background: 'rgba(255, 255, 255, 0.12)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          'box-shadow':
            '0 12px 24px rgba(31, 38, 135, 0.2), inset 0 6px 15px rgba(255, 255, 255, 0.3)',
        },
        '.liquid-glass-heavy': {
          'backdrop-filter': 'blur(24px) saturate(200%)',
          background: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          'box-shadow':
            '0 16px 48px rgba(31, 38, 135, 0.25), inset 0 8px 20px rgba(255, 255, 255, 0.35)',
        },
        '.liquid-glass-ultra': {
          'backdrop-filter': 'blur(32px) saturate(250%)',
          background: 'rgba(255, 255, 255, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          'box-shadow':
            '0 20px 60px rgba(31, 38, 135, 0.3), inset 0 10px 25px rgba(255, 255, 255, 0.4)',
        },

        // Lens Distortion Effects
        '.liquid-glass-lens': {
          'backdrop-filter': 'blur(16px) saturate(180%)',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          'box-shadow':
            '0 12px 24px rgba(31, 38, 135, 0.15), inset 0 6px 15px rgba(255, 255, 255, 0.25)',
          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          'transform-style': 'preserve-3d',
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
        },
        '.liquid-glass-lens-convex': {
          'backdrop-filter': 'blur(20px) saturate(200%)',
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 70%)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          'box-shadow':
            '0 16px 32px rgba(31, 38, 135, 0.2), inset 0 8px 20px rgba(255, 255, 255, 0.3)',
          transform: 'perspective(1000px) rotateX(5deg) rotateY(-2deg)',
          filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.15))',
        },
        '.liquid-glass-lens-concave': {
          'backdrop-filter': 'blur(18px) saturate(160%)',
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.15) 70%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          'box-shadow':
            'inset 0 16px 32px rgba(31, 38, 135, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1)',
          transform: 'perspective(1000px) rotateX(-3deg) rotateY(1deg)',
          filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.08))',
        },

        // Advanced Backdrop Filters
        '.liquid-blur-xs': { 'backdrop-filter': 'blur(2px)' },
        '.liquid-blur-sm': { 'backdrop-filter': 'blur(4px)' },
        '.liquid-blur-md': { 'backdrop-filter': 'blur(8px)' },
        '.liquid-blur-lg': { 'backdrop-filter': 'blur(12px)' },
        '.liquid-blur-xl': { 'backdrop-filter': 'blur(16px)' },
        '.liquid-blur-2xl': { 'backdrop-filter': 'blur(20px)' },
        '.liquid-blur-3xl': { 'backdrop-filter': 'blur(24px)' },

        '.liquid-saturate-50': { 'backdrop-filter': 'saturate(0.5)' },
        '.liquid-saturate-100': { 'backdrop-filter': 'saturate(1)' },
        '.liquid-saturate-150': { 'backdrop-filter': 'saturate(1.5)' },
        '.liquid-saturate-200': { 'backdrop-filter': 'saturate(2)' },
        '.liquid-saturate-300': { 'backdrop-filter': 'saturate(3)' },

        '.liquid-contrast-50': { 'backdrop-filter': 'contrast(0.5)' },
        '.liquid-contrast-100': { 'backdrop-filter': 'contrast(1)' },
        '.liquid-contrast-150': { 'backdrop-filter': 'contrast(1.5)' },
        '.liquid-contrast-200': { 'backdrop-filter': 'contrast(2)' },

        '.liquid-brightness-50': { 'backdrop-filter': 'brightness(0.5)' },
        '.liquid-brightness-100': { 'backdrop-filter': 'brightness(1)' },
        '.liquid-brightness-150': { 'backdrop-filter': 'brightness(1.5)' },
        '.liquid-brightness-200': { 'backdrop-filter': 'brightness(2)' },

        // Combined backdrop effects
        '.liquid-glass-blur-saturate': {
          'backdrop-filter': 'blur(16px) saturate(180%)',
        },
        '.liquid-glass-blur-contrast': {
          'backdrop-filter': 'blur(12px) contrast(120%)',
        },
        '.liquid-glass-blur-brightness': {
          'backdrop-filter': 'blur(14px) brightness(110%)',
        },
        '.liquid-glass-complete': {
          'backdrop-filter':
            'blur(16px) saturate(180%) contrast(120%) brightness(110%)',
        },

        // Reflection and Shine Effects
        '.liquid-glass-reflection': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background:
              'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 100%)',
            'pointer-events': 'none',
            'border-radius': 'inherit',
            'z-index': '1',
          },
        },
        '.liquid-glass-shine': {
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background:
              'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)',
            transform: 'rotate(45deg) translate(-100%, -100%)',
            transition: 'transform 0.6s ease',
            'pointer-events': 'none',
          },
          '&:hover::after': {
            transform: 'rotate(45deg) translate(100%, 100%)',
          },
        },

        // Morphing Effects
        '.liquid-glass-morph': {
          transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
          'transform-style': 'preserve-3d',
        },
        '.liquid-glass-morph:hover': {
          'backdrop-filter': 'blur(20px) saturate(200%)',
          background: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          transform: 'scale(1.02) rotateX(2deg) rotateY(-1deg)',
          'box-shadow':
            '0 20px 40px rgba(31, 38, 135, 0.25), inset 0 10px 25px rgba(255, 255, 255, 0.35)',
        },

        // Dark Mode Variants
        '.dark .liquid-glass': {
          background: 'rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          'box-shadow':
            '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 4px 20px rgba(255, 255, 255, 0.1)',
        },
        '.dark .liquid-glass-light': {
          background: 'rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          'box-shadow':
            '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 2px 10px rgba(255, 255, 255, 0.08)',
        },
        '.dark .liquid-glass-medium': {
          background: 'rgba(0, 0, 0, 0.12)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          'box-shadow':
            '0 12px 24px rgba(0, 0, 0, 0.35), inset 0 6px 15px rgba(255, 255, 255, 0.12)',
        },
        '.dark .liquid-glass-heavy': {
          background: 'rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          'box-shadow':
            '0 16px 48px rgba(0, 0, 0, 0.4), inset 0 8px 20px rgba(255, 255, 255, 0.15)',
        },
        '.dark .liquid-glass-ultra': {
          background: 'rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          'box-shadow':
            '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 10px 25px rgba(255, 255, 255, 0.2)',
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
