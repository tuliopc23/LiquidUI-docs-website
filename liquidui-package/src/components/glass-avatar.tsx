import React from "react";
import { cn } from "../lib/utils";
import { GlassAvatarProps } from "../types";

export const GlassAvatar: React.FC<GlassAvatarProps> = ({
    src,
    alt,
    size = "md",
    fallback,
    className,
    onClick,
    ...props
}) => {
    const sizes = {
        xs: "w-6 h-6 text-xs",
        sm: "w-8 h-8 text-sm",
        md: "w-10 h-10 text-base",
        lg: "w-12 h-12 text-lg",
        xl: "w-16 h-16 text-xl"
    };

    const initials = fallback || (alt ? alt.split(' ').map(n => n[0]).join('').toUpperCase() : '?');

    return (
        <div
            className={cn(
                "relative flex items-center justify-center rounded-full backdrop-blur-md bg-white/10 border border-white/20 overflow-hidden transition-all duration-300",
                onClick && "cursor-pointer hover:scale-105 hover:bg-white/20",
                sizes[size],
                className
            )}
            onClick={onClick}
            {...props}
        >
            {src ? (
                <img
                    src={src}
                    alt={alt || "Avatar"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                />
            ) : (
                <span className="font-medium text-gray-700 select-none">
                    {initials}
                </span>
            )}
        </div>
    );
}; 