import React from "react";
import { cn } from "../lib/utils";

export interface GlassNavbarProps extends React.HTMLAttributes<HTMLElement> {
    brand?: React.ReactNode;
    links?: Array<{ label: string; href: string; icon?: React.ReactNode }>;
    actions?: React.ReactNode;
    position?: "fixed" | "sticky" | "relative";
    transparent?: boolean;
}

export const GlassNavbar: React.FC<GlassNavbarProps> = ({
    brand,
    links = [],
    actions,
    position = "fixed",
    transparent = false,
    className,
    children,
    ...props
}) => {
    const positionClasses = {
        fixed: "fixed top-0 left-0 right-0 z-50",
        sticky: "sticky top-0 z-40",
        relative: "relative"
    };

    return (
        <nav
            className={cn(
                "backdrop-blur-xl bg-white/20 border-b border-white/30",
                "min-h-[64px] flex items-center",
                "pt-[env(safe-area-inset-top)] pl-[max(env(safe-area-inset-left),1rem)] pr-[max(env(safe-area-inset-right),1rem)] pb-2",
                positionClasses[position],
                transparent && "bg-transparent border-transparent",
                className
            )}
            style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
            }}
            {...props}
        >
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-6 py-4">
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
