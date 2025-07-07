import React, { forwardRef } from "react";
import { cn } from "../lib/utils";
import { GlassInputProps } from "../types";

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
    ({ className, label, error, helperText, leftIcon, rightIcon, variant = "default", ...props }, ref) => {
        const variants = {
            default: "backdrop-blur-md bg-background/10 border-border/20 focus:border-primary/50 dark:bg-white/10 dark:border-white/20",
            filled: "backdrop-blur-md bg-background/20 border-border/30 focus:border-primary/60 dark:bg-white/20 dark:border-white/30",
            outline: "backdrop-blur-sm bg-background/5 border-2 border-border/40 focus:border-primary/70 dark:bg-white/5 dark:border-white/40"
        };

        return (
            <div className="space-y-2">
                {label && (
                    <label className="block text-sm font-medium text-foreground">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={cn(
                            "w-full px-4 py-3 rounded-2xl border transition-all duration-300",
                            "focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2",
                            "placeholder:text-muted-foreground/70 text-foreground",
                            leftIcon && "pl-10",
                            rightIcon && "pr-10",
                            error && "border-red-300/50 focus:border-red-400/60 focus:ring-red-500/30",
                            variants[variant],
                            className
                        )}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="text-sm text-destructive">{error}</p>
                )}
                {helperText && !error && (
                    <p className="text-sm text-muted-foreground">{helperText}</p>
                )}
            </div>
        );
    }
);

GlassInput.displayName = "GlassInput"; 