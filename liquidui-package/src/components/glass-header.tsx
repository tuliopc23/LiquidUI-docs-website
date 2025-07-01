import React from "react";
import { cn } from "../lib/utils";
import { GlassHeaderProps } from "../types";

export const GlassHeader: React.FC<GlassHeaderProps> = ({
    title,
    subtitle,
    actions,
    navigation,
    position = "sticky",
    className,
    children,
    ...props
}) => {
    const positionClasses: Record<"fixed" | "sticky" | "relative", string> = {
        fixed: "fixed top-0 left-0 right-0 z-50",
        sticky: "sticky top-0 z-40",
        relative: "relative"
    };

    return (
        <header
            className={cn(
                "backdrop-blur-xl bg-white/20 border-b border-white/30",
                "min-h-[64px] flex items-center",
                "pt-[env(safe-area-inset-top)] pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)] pb-2",
                positionClasses[position],
                className
            )}
            style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
            }}
            {...props}
        >
            <div className="max-w-7xl mx-auto w-full px-6 py-4">
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