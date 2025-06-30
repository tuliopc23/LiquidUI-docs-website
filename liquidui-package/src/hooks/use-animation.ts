import { useState, useEffect } from 'react';

export const useAnimation = (
    trigger: boolean,
    duration: number = 300
) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [shouldRender, setShouldRender] = useState(trigger);

    useEffect(() => {
        if (trigger) {
            setShouldRender(true);
            setIsAnimating(true);
        } else {
            setIsAnimating(false);
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [trigger, duration]);

    return {
        isAnimating,
        shouldRender,
    };
}; 