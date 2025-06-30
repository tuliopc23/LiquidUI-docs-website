import React from "react";
import { cn } from "../lib/utils";
import { GlassFooterProps } from "../types";

export const GlassFooter: React.FC<GlassFooterProps> = ({
    links = [],
    copyright,
    socialLinks = [],
    className,
    children,
    ...props
}) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className={cn(
                "backdrop-blur-xl bg-white/20 border-t border-white/30 px-6 py-8 mt-auto",
                className
            )}
            {...props}
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Links */}
                    {links.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Links</h3>
                            <nav className="space-y-2">
                                {links.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        className={cn(
                                            "flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200",
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
                        </div>
                    )}

                    {/* Custom Content */}
                    {children && (
                        <div className="space-y-4">
                            {children}
                        </div>
                    )}

                    {/* Social Links */}
                    {socialLinks.length > 0 && (
                        <div className="space-y-4 md:text-right">
                            <h3 className="text-lg font-semibold text-gray-900">Connect</h3>
                            <div className="flex gap-3 md:justify-end">
                                {socialLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        className="p-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl hover:bg-white/20 hover:scale-105 transition-all duration-300"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={link.label}
                                    >
                                        {link.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-6 border-t border-white/20 text-center">
                    <p className="text-sm text-gray-600">
                        {copyright || `© ${currentYear} All rights reserved.`}
                    </p>
                </div>
            </div>
        </footer>
    );
}; 