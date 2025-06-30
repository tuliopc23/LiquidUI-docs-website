import React from "react";
import { cn } from "../lib/utils";

interface GlassFloatingActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactNode;
    position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
    size?: "sm" | "md" | "lg";
}

export const GlassFloatingAction: React.FC<GlassFloatingActionProps> = ({
    icon,
    position = "bottom-right",
    size = "md",
    className,
    ...props
}) => {
    const positions = {
        "bottom-right": "bottom-6 right-6",
        "bottom-left": "bottom-6 left-6",
        "top-right": "top-6 right-6",
        "top-left": "top-6 left-6"
    };

    const sizes = {
        sm: "w-12 h-12",
        md: "w-14 h-14",
        lg: "w-16 h-16"
    };

    return (
        <button
            className={cn(
                "fixed z-50 backdrop-blur-xl bg-blue-500/20 border border-blue-300/30 rounded-full shadow-lg",
                "hover:bg-blue-500/30 hover:scale-110 active:scale-95",
                "focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2",
                "transition-all duration-300",
                "flex items-center justify-center",
                positions[position],
                sizes[size],
                className
            )}
            {...props}
        >
            <div className="text-blue-600">
                {icon}
            </div>
        </button>
    );
}; 