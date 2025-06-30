/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: ["class"],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            backdropBlur: {
                xs: '2px',
            },
            animation: {
                'liquid-morph': 'liquid-morph 4s ease-in-out infinite',
                'glass-float': 'glass-float 6s ease-in-out infinite',
                'pulse-gentle': 'pulse-gentle 3s ease-in-out infinite',
            },
            keyframes: {
                'liquid-morph': {
                    '0%, 100%': {
                        'border-radius': '60% 40% 30% 70% / 60% 30% 70% 40%',
                        transform: 'rotate(0deg) scale(1)',
                    },
                    '25%': {
                        'border-radius': '30% 60% 70% 40% / 50% 60% 30% 60%',
                        transform: 'rotate(90deg) scale(1.05)',
                    },
                    '50%': {
                        'border-radius': '50% 60% 30% 60% / 30% 60% 70% 40%',
                        transform: 'rotate(180deg) scale(1)',
                    },
                    '75%': {
                        'border-radius': '60% 40% 60% 40% / 70% 30% 50% 60%',
                        transform: 'rotate(270deg) scale(1.05)',
                    },
                },
                'glass-float': {
                    '0%, 100%': {
                        transform: 'translateY(0px) rotate(0deg)',
                    },
                    '33%': {
                        transform: 'translateY(-10px) rotate(1deg)',
                    },
                    '66%': {
                        transform: 'translateY(-5px) rotate(-1deg)',
                    },
                },
                'pulse-gentle': {
                    '0%, 100%': {
                        opacity: '1',
                        transform: 'scale(1)',
                    },
                    '50%': {
                        opacity: '0.8',
                        transform: 'scale(1.02)',
                    },
                },
            },
        },
    },
    plugins: [],
}; 