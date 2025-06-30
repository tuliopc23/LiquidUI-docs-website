import React from "react";
import { cn } from "../lib/utils";
import { GlassCardProps } from "../types";

export const GlassCard: React.FC<GlassCardProps> = ({
    className,
    variant = "default",
    padding = "md",
    clickable = false,
    onClick,
    children,
    ...props
}) => {
    const variants = {
        default: "backdrop-blur-md bg-white/10 border border-white/20",
        elevated: "backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl",
        outline: "backdrop-blur-sm bg-white/5 border-2 border-white/40"
    };

    const paddings = {
        none: "p-0",
        sm: "p-3",
        md: "p-6",
        lg: "p-8"
    };

    return (
        <div
            className={cn(
                "rounded-3xl transition-all duration-300",
                variants[variant],
                paddings[padding],
                clickable && "cursor-pointer hover:scale-105 hover:bg-white/15 active:scale-95",
                className
            )}
            onClick={clickable ? onClick : undefined}
            {...props}
        >
            {children}
        </div>
    );
}; 