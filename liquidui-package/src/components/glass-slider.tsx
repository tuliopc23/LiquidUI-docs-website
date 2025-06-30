import React, { useState, useCallback } from "react";
import { cn } from "../lib/utils";
import { GlassSliderProps } from "../types";

export const GlassSlider: React.FC<GlassSliderProps> = ({
    value: controlledValue,
    defaultValue = 0,
    min = 0,
    max = 100,
    step = 1,
    onChange,
    className,
    disabled = false,
    label,
}) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const value = controlledValue !== undefined ? controlledValue : internalValue;

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }
        onChange?.(newValue);
    }, [controlledValue, onChange]);

    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className={cn("w-full space-y-2", className)}>
            {label && (
                <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">{label}</label>
                    <span className="text-sm text-gray-600">{value}</span>
                </div>
            )}
            <div className="relative">
                <div className="h-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    className={cn(
                        "absolute inset-0 w-full h-2 opacity-0 cursor-pointer",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2",
                        disabled && "cursor-not-allowed"
                    )}
                />
                <div
                    className="absolute top-1/2 w-4 h-4 -translate-y-1/2 backdrop-blur-md bg-white border-2 border-blue-500 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                    style={{ left: `calc(${percentage}% - 8px)` }}
                />
            </div>
        </div>
    );
}; 