import React, { forwardRef } from "react";
import { cn } from "../lib/utils";
import { GlassInputProps } from "../types";

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
    ({ className, label, error, helperText, leftIcon, rightIcon, variant = "default", ...props }, ref) => {
        const variants = {
            default: "backdrop-blur-md bg-white/10 border-white/20 focus:border-blue-300/50",
            filled: "backdrop-blur-md bg-white/20 border-white/30 focus:border-blue-400/60",
            outline: "backdrop-blur-sm bg-white/5 border-2 border-white/40 focus:border-blue-500/70"
        };

        return (
            <div className="space-y-2">
                {label && (
                    <label className="block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={cn(
                            "w-full px-4 py-3 rounded-2xl border transition-all duration-300",
                            "focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2",
                            "placeholder:text-gray-500/70",
                            leftIcon && "pl-10",
                            rightIcon && "pr-10",
                            error && "border-red-300/50 focus:border-red-400/60 focus:ring-red-500/30",
                            variants[variant],
                            className
                        )}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="text-sm text-red-600">{error}</p>
                )}
                {helperText && !error && (
                    <p className="text-sm text-gray-500">{helperText}</p>
                )}
            </div>
        );
    }
);

GlassInput.displayName = "GlassInput"; 