import React from "react";
import { cn } from "../lib/utils";

export interface GlassNotificationProps {
    title?: string;
    message: string;
    type?: "info" | "success" | "warning" | "error";
    isVisible?: boolean;
    onClose?: () => void;
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    className?: string;
}

export const GlassNotification: React.FC<GlassNotificationProps> = ({
    title,
    message,
    type = "info",
    isVisible = true,
    onClose,
    position = "top-right",
    className,
}) => {
    if (!isVisible) return null;

    const positions = {
        "top-right": "top-4 right-4",
        "top-left": "top-4 left-4",
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4"
    };

    const types = {
        info: "bg-blue-500/20 border-blue-300/30 text-blue-900",
        success: "bg-green-500/20 border-green-300/30 text-green-900",
        warning: "bg-yellow-500/20 border-yellow-300/30 text-yellow-900",
        error: "bg-red-500/20 border-red-300/30 text-red-900"
    };

    return (
        <div
            className={cn(
                "fixed z-50 backdrop-blur-xl border rounded-2xl p-4 shadow-lg max-w-sm",
                positions[position],
                types[type],
                className
            )}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    {title && <h4 className="font-medium mb-1">{title}</h4>}
                    <p className="text-sm">{message}</p>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="ml-3 p-1 rounded-lg hover:bg-white/20 transition-colors"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
}; 