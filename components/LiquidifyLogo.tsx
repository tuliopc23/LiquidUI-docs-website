import React from 'react';

interface LiquidifyLogoProps {
    size?: number;
    className?: string;
}

export const LiquidifyLogo: React.FC<LiquidifyLogoProps> = ({
    size = 32,
    className = ""
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Gradient definitions */}
            <defs>
                <linearGradient id="liquIdifyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#A855F7" stopOpacity="1" />
                    <stop offset="30%" stopColor="#EC4899" stopOpacity="1" />
                    <stop offset="70%" stopColor="#3B82F6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#1E40AF" stopOpacity="1" />
                </linearGradient>

                {/* Glow effect */}
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Main rounded square background */}
            <rect
                x="8"
                y="8"
                width="84"
                height="84"
                rx="20"
                ry="20"
                fill="url(#liquIdifyGradient)"
                filter="url(#glow)"
            />

            {/* Liquid drop/checkmark element */}
            <path
                d="M32 45 C32 45, 38 52, 45 52 C52 52, 68 36, 68 36 C70 34, 70 38, 68 40 C68 40, 48 60, 45 60 C42 60, 30 48, 30 48 C28 46, 30 44, 32 45 Z"
                fill="white"
                fillOpacity="0.95"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.7"
            />

            {/* Additional liquid accent */}
            <circle
                cx="72"
                cy="28"
                r="4"
                fill="white"
                fillOpacity="0.6"
            />

            <circle
                cx="28"
                cy="72"
                r="3"
                fill="white"
                fillOpacity="0.4"
            />
        </svg>
    );
};

export default LiquidifyLogo; 