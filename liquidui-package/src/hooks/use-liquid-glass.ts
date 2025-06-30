import { useState, useCallback } from 'react';

interface LiquidGlassConfig {
    blur: number;
    opacity: number;
    borderOpacity: number;
    scale: number;
}

export const useLiquidGlass = (initialConfig?: Partial<LiquidGlassConfig>) => {
    const [config, setConfig] = useState<LiquidGlassConfig>({
        blur: 20,
        opacity: 0.1,
        borderOpacity: 0.2,
        scale: 1,
        ...initialConfig,
    });

    const updateConfig = useCallback((newConfig: Partial<LiquidGlassConfig>) => {
        setConfig(prev => ({ ...prev, ...newConfig }));
    }, []);

    const getGlassStyles = useCallback(() => {
        return {
            backdropFilter: `blur(${config.blur}px)`,
            backgroundColor: `rgba(255, 255, 255, ${config.opacity})`,
            borderColor: `rgba(255, 255, 255, ${config.borderOpacity})`,
            transform: `scale(${config.scale})`,
        };
    }, [config]);

    const getGlassClasses = useCallback(() => {
        return `backdrop-blur-[${config.blur}px] bg-white/${Math.round(config.opacity * 100)} border-white/${Math.round(config.borderOpacity * 100)}`;
    }, [config]);

    return {
        config,
        updateConfig,
        getGlassStyles,
        getGlassClasses,
    };
}; 