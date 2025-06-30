import React, { useState } from "react";
import { cn } from "../lib/utils";

export interface GlassPopoverProps {
    trigger: React.ReactNode;
    content: React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    className?: string;
}

export const GlassPopover: React.FC<GlassPopoverProps> = ({
    trigger,
    content,
    position = "bottom",
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const positions = {
        top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
        left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
        right: "left-full top-1/2 transform -translate-y-1/2 ml-2"
    };

    return (
        <div className="relative inline-block">
            <div onClick={() => setIsOpen(!isOpen)}>
                {trigger}
            </div>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div
                        className={cn(
                            "absolute z-50 p-4 backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-lg",
                            positions[position],
                            className
                        )}
                    >
                        {content}
                    </div>
                </>
            )}
        </div>
    );
}; 