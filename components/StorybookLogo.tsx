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
            viewBox="0 0 256 319"
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

            {/* Main Storybook Shape */}
            <path
                d="M238.371 24.4966L244.103 8.87628C244.497 7.74548 244.112 6.48716 243.115 5.71773C242.117 4.9483 240.733 4.85763 239.642 5.48716L225.633 13.4444C223.848 14.4569 221.671 14.6102 219.741 13.87L16.8863 -71.8136C14.8093 -72.6263 12.5074 -72.4729 10.5776 -71.3837C8.64778 -70.2944 7.35076 -68.3847 7.18412 -66.2644L0.379395 238.462C0.174081 241.071 1.76471 243.422 4.24742 244.434L219.495 318.246C221.671 319.112 224.143 318.959 226.172 317.831C228.201 316.703 229.498 314.793 229.665 312.673L238.371 24.4966Z"
                fill="url(#storybook-gradient)"
            />

            {/* Book Pages */}
            <path
                d="M45.8387 51.5385L45.4645 100.925H75.8387L75.4645 51.5385L82.9032 50.7742L82.5806 104.232L85.4839 104.925H41.4194L41.7419 51.1613L45.8387 51.5385Z"
                fill="white"
            />

            {/* Storybook "S" */}
            <path
                d="M185.677 78.4839C185.677 85.9226 180.5 92.0645 173.839 92.0645C167.177 92.0645 162 85.9226 162 78.4839C162 71.0452 167.177 64.9032 173.839 64.9032C180.5 64.9032 185.677 71.0452 185.677 78.4839Z"
                fill="white"
            />

            {/* Bookmark */}
            <path
                d="M196.5 35.5L196.903 80.8871H175.613L176.016 35.5L186.258 34.1935L196.5 35.5Z"
                fill="#FC521F"
            />

            {/* Small details */}
            <circle cx="186.5" cy="58" r="4" fill="white" />
        </svg>
    );
};

export default StorybookLogo; 