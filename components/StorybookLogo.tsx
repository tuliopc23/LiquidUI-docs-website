import React from 'react';

interface StorybookLogoProps {
    size?: number;
    className?: string;
}

export const StorybookLogo: React.FC<StorybookLogoProps> = ({
    size = 24,
    className = ''
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 256 256"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="storybook-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF4785" />
                    <stop offset="100%" stopColor="#FC521F" />
                </linearGradient>
            </defs>

            {/* Main Storybook Book Shape */}
            <path
                d="M223.16 14.4L239.5 8.5c.5-.2.7-.8.5-1.3-.2-.5-.8-.7-1.3-.5L224.5 12.5c-1.2.5-2.6.4-3.7-.2L40.5 2.5c-1.5-.4-3.1-.2-4.4.6-1.3.8-2.2 2.1-2.3 3.6L28 236c-.1 1.8 1 3.4 2.7 4l180 35c1.5.3 3.1 0 4.4-.8 1.3-.8 2.2-2.1 2.3-3.6L223.16 14.4z"
                fill="url(#storybook-gradient)"
            />

            {/* Book Spine */}
            <path
                d="M40 20h8v200h-8z"
                fill="rgba(255,255,255,0.3)"
            />

            {/* Inner Page Lines */}
            <path
                d="M60 40h140M60 60h120M60 80h130M60 100h110M60 120h125"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                strokeLinecap="round"
            />

            {/* Storybook "S" Symbol */}
            <circle
                cx="180"
                cy="180"
                r="25"
                fill="white"
            />
            <path
                d="M170 170c0-8 6-14 14-14s14 6 14 14-6 14-14 14-14-6-14-14zm8 0c0 4 2 6 6 6s6-2 6-6-2-6-6-6-6 2-6 6z"
                fill="#FF4785"
            />

            {/* Bookmark Tab */}
            <path
                d="M200 20v40l-10-8-10 8V20z"
                fill="#FC521F"
            />
        </svg>
    );
};

export default StorybookLogo; 