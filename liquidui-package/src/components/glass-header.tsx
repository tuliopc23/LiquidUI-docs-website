import React from "react";
import { cn } from "../lib/utils";
import { GlassHeaderProps } from "../types";

export const GlassHeader: React.FC<GlassHeaderProps> = ({
    title,
    subtitle,
    actions,
    navigation,
    className,
    children,
    ...props
}) => {
    return (
        <header
            className={cn(
                "backdrop-blur-xl bg-white/20 border-b border-white/30 px-6 py-4 sticky top-0 z-40",
                className
            )}
            {...props}
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        {title && (
                            <div className="space-y-1">
                                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                                {subtitle && (
                                    <p className="text-sm text-gray-600">{subtitle}</p>
                                )}
                            </div>
                        )}
                    </div>

                    {navigation && (
                        <nav className="hidden md:flex items-center space-x-6 mx-6">
                            {navigation.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className={cn(
                                        "flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200",
                                        link.external && "external-link"
                                    )}
                                    target={link.external ? "_blank" : undefined}
                                    rel={link.external ? "noopener noreferrer" : undefined}
                                >
                                    {link.icon}
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    )}

                    {actions && (
                        <div className="flex items-center gap-3">
                            {actions}
                        </div>
                    )}
                </div>

                {children && (
                    <div className="mt-4">
                        {children}
                    </div>
                )}
            </div>
        </header>
    );
}; 