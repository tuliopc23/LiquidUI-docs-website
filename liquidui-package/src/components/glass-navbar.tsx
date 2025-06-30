import React from "react";
import { cn } from "../lib/utils";

export interface GlassNavbarProps extends React.HTMLAttributes<HTMLElement> {
    brand?: React.ReactNode;
    links?: Array<{ label: string; href: string; icon?: React.ReactNode }>;
    actions?: React.ReactNode;
}

export const GlassNavbar: React.FC<GlassNavbarProps> = ({
    brand,
    links = [],
    actions,
    className,
    children,
    ...props
}) => {
    return (
        <nav
            className={cn(
                "backdrop-blur-xl bg-white/20 border-b border-white/30 px-6 py-4",
                className
            )}
            {...props}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {brand && <div className="font-bold text-lg">{brand}</div>}

                {links.length > 0 && (
                    <div className="hidden md:flex items-center space-x-6">
                        {links.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                            >
                                {link.icon}
                                {link.label}
                            </a>
                        ))}
                    </div>
                )}

                {actions && <div className="flex items-center gap-3">{actions}</div>}
                {children}
            </div>
        </nav>
    );
};
