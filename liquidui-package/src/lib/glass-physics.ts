/**
 * Physics-based glass effects and calculations
 */

export interface PhysicsConfig {
    gravity: number;
    friction: number;
    bounce: number;
    tension: number;
    mass: number;
}

export const defaultPhysicsConfig: PhysicsConfig = {
    gravity: 0.8,
    friction: 0.95,
    bounce: 0.6,
    tension: 0.8,
    mass: 1,
};

export const createSpringAnimation = (
    config: Partial<PhysicsConfig> = {}
) => {
    const { tension, friction, mass } = { ...defaultPhysicsConfig, ...config };

    return {
        type: 'spring',
        damping: friction * 20,
        stiffness: tension * 100,
        mass,
    };
};

export const calculateGlassRefraction = (
    angle: number,
    thickness: number = 1
): number => {
    // Simplified refraction calculation for glass effects
    const glassIndex = 1.5; // Refractive index of glass
    const airIndex = 1.0;

    const sinTheta1 = Math.sin(angle);
    const sinTheta2 = (airIndex / glassIndex) * sinTheta1;

    return Math.asin(sinTheta2) * thickness;
};

export const generateLiquidPath = (
    width: number,
    height: number,
    complexity: number = 4
): string => {
    const points: string[] = [];
    const step = width / complexity;

    for (let i = 0; i <= complexity; i++) {
        const x = i * step;
        const y = height * (0.5 + 0.3 * Math.sin((i / complexity) * Math.PI * 2));
        points.push(`${x},${y}`);
    }

    return `M ${points.join(' L ')}`;
};

export const morphingKeyframes = (
    steps: number = 4
) => {
    const keyframes: Record<string, any> = {};

    for (let i = 0; i <= steps; i++) {
        const percent = (i / steps) * 100;
        const angle = (i / steps) * 360;

        keyframes[`${percent}%`] = {
            transform: `rotate(${angle}deg) scale(${1 + 0.1 * Math.sin(angle * Math.PI / 180)})`,
            borderRadius: `${50 + 10 * Math.sin(angle * Math.PI / 180)}% ${50 + 10 * Math.cos(angle * Math.PI / 180)}%`,
        };
    }

    return keyframes;
}; 