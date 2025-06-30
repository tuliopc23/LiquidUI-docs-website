import React from "react";
import { cn } from "../lib/utils";
import { GlassHeroProps } from "../types";

export const GlassHero: React.FC<GlassHeroProps> = ({
    title,
    subtitle,
    description,
    actions,
    image,
    backgroundPattern = true,
    className,
    children,
    ...props
}) => {
    return (
        <section
            className={cn(
                "relative py-20 px-6 text-center overflow-hidden",
                className
            )}
            {...props}
        >
            {/* Background Pattern */}
            {backgroundPattern && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/50 to-green-50/80 pointer-events-none" />
            )}

            {/* Background Image */}
            {image && (
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                    style={{ backgroundImage: `url(${image})` }}
                />
            )}

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-16 h-16 backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl animate-glass-float" />
            <div className="absolute top-32 right-16 w-12 h-12 backdrop-blur-md bg-blue-500/20 border border-blue-300/30 rounded-2xl animate-glass-float animation-delay-1000" />
            <div className="absolute bottom-20 left-20 w-8 h-8 backdrop-blur-md bg-green-500/20 border border-green-300/30 rounded-xl animate-pulse-gentle" />

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                        {title}
                    </h1>

                    {subtitle && (
                        <h2 className="text-xl md:text-2xl text-gray-700 font-medium">
                            {subtitle}
                        </h2>
                    )}

                    {description && (
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>

                {actions && (
                    <div className="flex flex-wrap gap-4 justify-center">
                        {actions}
                    </div>
                )}

                {children && (
                    <div className="mt-12">
                        {children}
                    </div>
                )}
            </div>
        </section>
    );
}; 