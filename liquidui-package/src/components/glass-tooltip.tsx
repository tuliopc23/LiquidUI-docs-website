import React, { useState } from "react";
import { cn } from "../lib/utils";

export interface GlassTooltipProps {
    content: string;
    children: React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    className?: string;
}

export const GlassTooltip: React.FC<GlassTooltipProps> = ({
    content,
    children,
    position = "top",
    className,
}) => {
    const [isVisible, setIsVisible] = useState(false);

    const positions = {
        top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
        left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
        right: "left-full top-1/2 transform -translate-y-1/2 ml-2"
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div
                    className={cn(
                        "absolute z-50 px-3 py-2 text-sm backdrop-blur-xl bg-black/80 text-white border border-white/20 rounded-lg whitespace-nowrap",
                        positions[position],
                        className
                    )}
                >
                    {content}
                </div>
            )}
        </div>
    );
}; 