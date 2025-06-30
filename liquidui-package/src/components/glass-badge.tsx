import React from "react";
import { cn } from "../lib/utils";
import { GlassBadgeProps } from "../types";

export const GlassBadge: React.FC<GlassBadgeProps> = ({
    children,
    variant = "default",
    size = "md",
    dot = false,
    className,
    ...props
}) => {
    const variants = {
        default: "bg-white/10 text-gray-700 border-white/20",
        primary: "bg-blue-500/20 text-blue-700 border-blue-300/30",
        secondary: "bg-gray-500/10 text-gray-600 border-gray-300/20",
        success: "bg-green-500/20 text-green-700 border-green-300/30",
        warning: "bg-yellow-500/20 text-yellow-700 border-yellow-300/30",
        error: "bg-red-500/20 text-red-700 border-red-300/30"
    };

    const sizes = {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base"
    };

    if (dot) {
        return (
            <span
                className={cn(
                    "inline-flex items-center gap-1.5",
                    className
                )}
                {...props}
            >
                <span
                    className={cn(
                        "w-2 h-2 rounded-full backdrop-blur-md border",
                        variants[variant]
                    )}
                />
                {children}
            </span>
        );
    }

    return (
        <span
            className={cn(
                "inline-flex items-center font-medium backdrop-blur-md border rounded-full",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}; 