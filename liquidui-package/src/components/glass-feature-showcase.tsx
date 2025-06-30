import React from "react";
import { cn } from "../lib/utils";
import { GlassFeatureShowcaseProps } from "../types";

export const GlassFeatureShowcase: React.FC<GlassFeatureShowcaseProps> = ({
    features,
    title,
    description,
    columns = 3,
    className,
    children,
    ...props
}) => {
    const gridCols = {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    };

    return (
        <section
            className={cn(
                "py-16 px-6",
                className
            )}
            {...props}
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                {(title || description) && (
                    <div className="text-center mb-12 space-y-4">
                        {title && (
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                {/* Features Grid */}
                <div className={cn(
                    "grid gap-8",
                    gridCols[columns]
                )}>
                    {features.map((feature, index) => (
                        <div
                            key={feature.id || index}
                            className="group backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-6 hover:bg-white/20 hover:scale-105 transition-all duration-300"
                        >
                            {/* Icon */}
                            {feature.icon && (
                                <div className="w-12 h-12 backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                            )}

                            {/* Content */}
                            <div className="space-y-3">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Link */}
                                {feature.href && (
                                    <a
                                        href={feature.href}
                                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                                    >
                                        Learn more
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {children && (
                    <div className="mt-12">
                        {children}
                    </div>
                )}
            </div>
        </section>
    );
}; 