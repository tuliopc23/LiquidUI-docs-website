import React, { useEffect } from "react";
import { cn } from "../lib/utils";
import { GlassToastProps } from "../types";

export const GlassToast: React.FC<GlassToastProps> = ({
    id,
    title,
    description,
    variant = "default",
    duration = 5000,
    action,
    onClose,
}) => {
    const variants = {
        default: "bg-white/20 border-white/30 text-gray-900",
        success: "bg-green-500/20 border-green-300/30 text-green-900",
        error: "bg-red-500/20 border-red-300/30 text-red-900",
        warning: "bg-yellow-500/20 border-yellow-300/30 text-yellow-900",
        info: "bg-blue-500/20 border-blue-300/30 text-blue-900"
    };

    const icons = {
        default: null,
        success: (
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
        ),
        error: (
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
        ),
        warning: (
            <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
        ),
        info: (
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
        )
    };

    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onClose?.();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    return (
        <div
            className={cn(
                "relative backdrop-blur-xl border rounded-2xl p-4 shadow-lg transition-all duration-300",
                "animate-in slide-in-from-right-full",
                variants[variant]
            )}
        >
            <div className="flex items-start gap-3">
                {icons[variant] && (
                    <div className="flex-shrink-0 mt-0.5">
                        {icons[variant]}
                    </div>
                )}

                <div className="flex-1 min-w-0">
                    {title && (
                        <div className="font-medium text-sm mb-1">{title}</div>
                    )}
                    {description && (
                        <div className="text-sm opacity-90">{description}</div>
                    )}

                    {action && (
                        <button
                            onClick={action.onClick}
                            className="mt-2 text-sm font-medium underline hover:no-underline transition-all duration-200"
                        >
                            {action.label}
                        </button>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="flex-shrink-0 p-1 rounded-lg hover:bg-white/20 transition-colors duration-200"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}; 