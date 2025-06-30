import React, { useState } from "react";
import { cn } from "../lib/utils";

export interface GlassDropdownProps {
    trigger: React.ReactNode;
    items: Array<{
        id: string;
        label: string;
        icon?: React.ReactNode;
        onClick?: () => void;
        disabled?: boolean;
        separator?: boolean;
    }>;
    position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
    className?: string;
}

export const GlassDropdown: React.FC<GlassDropdownProps> = ({
    trigger,
    items,
    position = "bottom-left",
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const positions = {
        "bottom-left": "top-full left-0 mt-2",
        "bottom-right": "top-full right-0 mt-2",
        "top-left": "bottom-full left-0 mb-2",
        "top-right": "bottom-full right-0 mb-2"
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
                            "absolute z-50 min-w-[200px] backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-lg py-2",
                            positions[position],
                            className
                        )}
                    >
                        {items.map((item, index) => (
                            <React.Fragment key={item.id}>
                                {item.separator && index > 0 && (
                                    <div className="mx-2 my-1 h-px bg-white/20" />
                                )}
                                <button
                                    onClick={() => {
                                        if (!item.disabled) {
                                            item.onClick?.();
                                            setIsOpen(false);
                                        }
                                    }}
                                    disabled={item.disabled}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-2 text-left text-sm transition-colors",
                                        item.disabled
                                            ? "text-gray-400 cursor-not-allowed"
                                            : "text-gray-700 hover:bg-white/10 hover:text-gray-900"
                                    )}
                                >
                                    {item.icon}
                                    {item.label}
                                </button>
                            </React.Fragment>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}; 