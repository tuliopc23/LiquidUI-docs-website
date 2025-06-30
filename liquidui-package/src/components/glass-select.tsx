import React, { forwardRef } from "react";
import { cn } from "../lib/utils";
import { GlassSelectProps } from "../types";

export const GlassSelect = forwardRef<HTMLSelectElement, GlassSelectProps>(
    ({ className, label, error, helperText, options, placeholder, variant = "default", ...props }, ref) => {
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
                <select
                    ref={ref}
                    className={cn(
                        "w-full px-4 py-3 rounded-2xl border transition-all duration-300",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2",
                        "text-gray-700",
                        error && "border-red-300/50 focus:border-red-400/60 focus:ring-red-500/30",
                        variants[variant],
                        className
                    )}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
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

GlassSelect.displayName = "GlassSelect"; 