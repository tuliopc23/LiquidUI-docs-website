import React from "react";
import { cn } from "../lib/utils";
import { GlassProgressProps } from "../types";

export const GlassProgress: React.FC<GlassProgressProps> = ({
    value = 0,
    max = 100,
    size = "md",
    variant = "default",
    showValue = false,
    className,
    label,
}) => {
    const percentage = Math.min((value / max) * 100, 100);

    const sizes = {
        sm: "h-1",
        md: "h-2",
        lg: "h-3"
    };

    const variants = {
        default: "bg-gradient-to-r from-blue-500 to-purple-600",
        gradient: "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600",
        striped: "bg-gradient-to-r from-blue-500 to-purple-600 bg-[length:1rem_1rem] animate-pulse"
    };

    return (
        <div className={cn("w-full space-y-2", className)}>
            {(label || showValue) && (
                <div className="flex justify-between items-center">
                    {label && (
                        <span className="text-sm font-medium text-gray-700">{label}</span>
                    )}
                    {showValue && (
                        <span className="text-sm text-gray-600">
                            {value}/{max} ({Math.round(percentage)}%)
                        </span>
                    )}
                </div>
            )}
            <div className="relative">
                <div
                    className={cn(
                        "w-full backdrop-blur-md bg-white/10 border border-white/20 rounded-full overflow-hidden",
                        sizes[size]
                    )}
                >
                    <div
                        className={cn(
                            "h-full rounded-full transition-all duration-500 ease-out",
                            variants[variant]
                        )}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
}; 