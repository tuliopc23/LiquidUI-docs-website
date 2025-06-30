import React, { forwardRef } from "react";
import { cn } from "../lib/utils";
import { GlassSwitchProps } from "../types";

export const GlassSwitch = forwardRef<HTMLInputElement, GlassSwitchProps>(
    ({ className, label, size = "md", variant = "default", ...props }, ref) => {
        const sizes = {
            sm: {
                track: "w-8 h-4",
                thumb: "w-3 h-3",
                translate: "translate-x-4"
            },
            md: {
                track: "w-11 h-6",
                thumb: "w-5 h-5",
                translate: "translate-x-5"
            },
            lg: {
                track: "w-14 h-7",
                thumb: "w-6 h-6",
                translate: "translate-x-7"
            }
        };

        const variants = {
            default: {
                track: "bg-white/10 border-white/20 checked:bg-blue-500/30 checked:border-blue-300/30",
                thumb: "bg-white border-white/30"
            },
            colored: {
                track: "bg-white/10 border-white/20 checked:bg-gradient-to-r checked:from-blue-500 checked:to-purple-600",
                thumb: "bg-white border-white/30 checked:bg-white"
            }
        };

        return (
            <label className="inline-flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                    <input
                        ref={ref}
                        type="checkbox"
                        className="sr-only peer"
                        {...props}
                    />
                    <div
                        className={cn(
                            "relative backdrop-blur-md border rounded-full transition-all duration-300",
                            "peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/30 peer-focus:ring-offset-2",
                            "peer-checked:scale-105",
                            sizes[size].track,
                            variants[variant].track,
                            className
                        )}
                    >
                        <div
                            className={cn(
                                "absolute top-0.5 left-0.5 backdrop-blur-sm border rounded-full transition-all duration-300 shadow-sm",
                                "peer-checked:transform",
                                sizes[size].thumb,
                                `peer-checked:${sizes[size].translate}`,
                                variants[variant].thumb
                            )}
                        />
                    </div>
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

GlassSwitch.displayName = "GlassSwitch"; 