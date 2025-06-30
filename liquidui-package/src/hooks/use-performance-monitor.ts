import { useState, useEffect, useRef } from 'react';

interface PerformanceMetrics {
    fps: number;
    renderTime: number;
    memoryUsage?: number;
}

export const usePerformanceMonitor = (enabled: boolean = false) => {
    const [metrics, setMetrics] = useState<PerformanceMetrics>({
        fps: 0,
        renderTime: 0,
        memoryUsage: 0,
    });

    const frameId = useRef<number>();
    const lastTime = useRef<number>(performance.now());
    const frameCount = useRef<number>(0);

    useEffect(() => {
        if (!enabled) return;

        const measurePerformance = (currentTime: number) => {
            frameCount.current++;

            if (currentTime - lastTime.current >= 1000) {
                const fps = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current));
                const renderTime = performance.now() - currentTime;

                setMetrics(prev => ({
                    ...prev,
                    fps,
                    renderTime: Math.round(renderTime * 100) / 100,
                    memoryUsage: (performance as any).memory?.usedJSHeapSize
                        ? Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024 * 100) / 100
                        : undefined,
                }));

                frameCount.current = 0;
                lastTime.current = currentTime;
            }

            frameId.current = requestAnimationFrame(measurePerformance);
        };

        frameId.current = requestAnimationFrame(measurePerformance);

        return () => {
            if (frameId.current) {
                cancelAnimationFrame(frameId.current);
            }
        };
    }, [enabled]);

    return metrics;
}; 