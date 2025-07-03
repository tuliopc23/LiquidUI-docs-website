import React from 'react';
import Image from 'next/image';

interface StorybookLogoProps {
    size?: number;
    className?: string;
}

export const StorybookLogo: React.FC<StorybookLogoProps> = ({
    size = 24,
    className = ''
}) => {
    return (
        <Image
            src="/icons/storybook.svg"
            alt="Storybook"
            width={size}
            height={size}
            className={className}
            style={{
                width: size,
                height: size
            }}
        />
    );
};

export default StorybookLogo; 