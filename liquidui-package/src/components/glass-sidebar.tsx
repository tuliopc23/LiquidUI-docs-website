import React from "react";
import { cn } from "../lib/utils";

export interface GlassSidebarProps extends React.HTMLAttributes<HTMLElement> {
    isOpen?: boolean;
    onClose?: () => void;
    position?: "left" | "right";
    width?: "sm" | "md" | "lg";
}

export const GlassSidebar: React.FC<GlassSidebarProps> = ({
    isOpen = true,
    onClose,
    position = "left",
    width = "md",
    className,
    children,
    ...props
}) => {
    const widths = {
        sm: "w-64",
        md: "w-80",
        lg: "w-96"
    };

    const positions = {
        left: "left-0",
        right: "right-0"
    };

    return (
        <aside
            className={cn(
                "fixed top-0 h-full backdrop-blur-xl bg-white/20 border-r border-white/30 z-40 transition-transform duration-300",
                widths[width],
                positions[position],
                !isOpen && position === "left" && "-translate-x-full",
                !isOpen && position === "right" && "translate-x-full",
                className
            )}
            {...props}
        >
            <div className="p-6">
                {onClose && (
                    <button
                        onClick={onClose}
                        className="mb-4 p-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300"
                    >
                        ✕
                    </button>
                )}
                {children}
            </div>
        </aside>
    );
}; 