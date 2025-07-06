import React, { useEffect } from 'react';

interface SmoothScrollProps {
    children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
    useEffect(() => {
        // Apply smooth scrolling to the body element
        document.documentElement.style.scrollBehavior = 'smooth';
        document.body.style.scrollBehavior = 'smooth';

        return () => {
            // Clean up on unmount
            document.documentElement.style.scrollBehavior = '';
            document.body.style.scrollBehavior = '';
        };
    }, []);

    return <>{children}</>;
} 