import React from "react";
import { cn } from "../lib/utils";
import { GlassButtonProps } from "../types";

export const GlassButton: React.FC<GlassButtonProps> = ({
    className,
    variant = "default",
    size = "default",
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
}) => {
    const variants = {
        default: "bg-white/10 hover:bg-white/20 text-gray-900 border-white/20",
        primary: "bg-blue-500/20 hover:bg-blue-500/30 text-blue-700 border-blue-300/30 hover:border-blue-300/50",
        secondary: "bg-gray-500/10 hover:bg-gray-500/20 text-gray-700 border-gray-300/20",
        destructive: "bg-red-500/20 hover:bg-red-500/30 text-red-700 border-red-300/30",
        ghost: "bg-transparent hover:bg-white/10 text-gray-700 border-transparent hover:border-white/20",
        link: "bg-transparent hover:bg-blue-50/50 text-blue-600 hover:text-blue-700 border-transparent underline-offset-4 hover:underline",
        tertiary: "bg-green-500/10 hover:bg-green-500/20 text-green-700 border-green-300/20 hover:border-green-300/40"
    };

    const sizes = {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-8 px-3 py-1 text-xs",
        md: "h-10 px-4 py-2 text-sm",
        lg: "h-12 px-6 py-3 text-base",
        icon: "h-10 w-10 p-0"
    };

    return (
        <button
            className={cn(
                "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-all duration-300 backdrop-blur-md border",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50",
                "hover:scale-105 active:scale-95",
                variants[variant],
                sizes[size],
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
            )}
            {leftIcon && !loading && leftIcon}
            {children}
            {rightIcon && !loading && rightIcon}
        </button>
    );
}; 