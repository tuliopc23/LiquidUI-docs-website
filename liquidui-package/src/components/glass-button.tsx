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
        default: "bg-background/10 hover:bg-background/20 text-foreground border-border/20 dark:bg-white/10 dark:hover:bg-white/20",
        primary: "bg-primary/20 hover:bg-primary/30 text-primary-foreground border-primary/30 hover:border-primary/50",
        secondary: "bg-secondary/10 hover:bg-secondary/20 text-secondary-foreground border-border/20",
        destructive: "bg-destructive/20 hover:bg-destructive/30 text-destructive-foreground border-destructive/30",
        ghost: "bg-transparent hover:bg-background/10 text-foreground border-transparent hover:border-border/20",
        link: "bg-transparent hover:bg-accent/10 text-accent-foreground hover:text-accent border-transparent underline-offset-4 hover:underline",
        tertiary: "bg-green-500/10 hover:bg-green-500/20 text-green-700 dark:text-green-300 border-green-300/20 dark:border-green-700/30 hover:border-green-300/40"
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