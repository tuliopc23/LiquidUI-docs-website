import React from "react";
import { cn } from "../lib/utils";

export interface GlassMobileNavProps extends React.HTMLAttributes<HTMLElement> {
    isOpen?: boolean;
    onClose?: () => void;
    links?: Array<{ label: string; href: string; icon?: React.ReactNode }>;
}

export const GlassMobileNav: React.FC<GlassMobileNavProps> = ({
    isOpen = false,
    onClose,
    links = [],
    className,
    children,
    ...props
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 md:hidden">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            <nav
                className={cn(
                    "absolute top-0 left-0 w-full backdrop-blur-xl bg-white/20 border-b border-white/30",
                    "min-h-[64px]",
                    "pt-[env(safe-area-inset-top)] pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)] pb-6",
                    className
                )}
                style={{
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                }}
                {...props}
            >
                <div className="flex items-center justify-between min-h-[64px] mb-4">
                    <div className="font-bold text-lg">Menu</div>
                    <button
                        onClick={onClose}
                        className="p-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300"
                        aria-label="Close navigation"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-4">
                    {links.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className="flex items-center gap-3 p-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300"
                            onClick={onClose}
                        >
                            {link.icon}
                            <span className="font-medium">{link.label}</span>
                        </a>
                    ))}
                    {children}
                </div>
            </nav>
        </div>
    );
}; 