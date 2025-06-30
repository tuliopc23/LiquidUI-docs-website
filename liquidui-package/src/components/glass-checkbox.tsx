import React, { forwardRef } from "react";
import { cn } from "../lib/utils";
import { GlassCheckboxProps } from "../types";

export const GlassCheckbox = forwardRef<HTMLInputElement, GlassCheckboxProps>(
    ({ className, label, indeterminate = false, variant = "default", ...props }, ref) => {
        const variants = {
            default: "border-white/20 checked:bg-blue-500/20 checked:border-blue-300/30",
            outline: "border-2 border-white/40 checked:bg-blue-500/30 checked:border-blue-400/60"
        };

        return (
            <label className="inline-flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                    <input
                        ref={ref}
                        type="checkbox"
                        className={cn(
                            "w-5 h-5 backdrop-blur-md bg-white/10 border rounded transition-all duration-300",
                            "focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2",
                            "checked:scale-105",
                            variants[variant],
                            className
                        )}
                        {...props}
                    />
                    {(props.checked || indeterminate) && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {indeterminate ? (
                                <div className="w-2.5 h-0.5 bg-blue-600 rounded-full" />
                            ) : (
                                <svg
                                    className="w-3 h-3 text-blue-600"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </div>
                    )}
                </div>
                {label && (
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        {label}
                    </span>
                )}
            </label>
        );
    }
);

GlassCheckbox.displayName = "GlassCheckbox"; 