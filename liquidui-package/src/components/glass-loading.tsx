import React from "react";
import { cn } from "../lib/utils";

export interface GlassLoadingProps {
    size?: "sm" | "md" | "lg";
    variant?: "spinner" | "dots" | "pulse";
    className?: string;
}

export const GlassLoading: React.FC<GlassLoadingProps> = ({
    size = "md",
    variant = "spinner",
    className,
}) => {
    const sizes = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12"
    };

    if (variant === "spinner") {
        return (
            <div
                className={cn(
                    "animate-spin rounded-full border-2 border-white/20 border-t-blue-500",
                    sizes[size],
                    className
                )}
            />
        );
    }

    if (variant === "dots") {
        return (
            <div className={cn("flex space-x-2", className)}>
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={cn(
                            "backdrop-blur-md bg-blue-500/20 rounded-full animate-pulse",
                            size === "sm" && "w-2 h-2",
                            size === "md" && "w-3 h-3",
                            size === "lg" && "w-4 h-4"
                        )}
                        style={{ animationDelay: `${i * 0.2}s` }}
                    />
                ))}
            </div>
        );
    }

    return (
        <div
            className={cn(
                "backdrop-blur-md bg-blue-500/20 rounded-2xl animate-pulse-gentle",
                sizes[size],
                className
            )}
        />
    );
}; 