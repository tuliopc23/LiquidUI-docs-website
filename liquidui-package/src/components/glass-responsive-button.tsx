import React from "react";
import { GlassButton } from "./glass-button";
import { useMobile } from "../hooks/use-mobile";
import { cn } from "../lib/utils";

export interface GlassResponsiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    mobileSize?: "sm" | "md" | "lg";
    desktopSize?: "sm" | "md" | "lg";
    mobileVariant?: "primary" | "secondary" | "destructive" | "ghost" | "link";
    desktopVariant?: "primary" | "secondary" | "destructive" | "ghost" | "link";
    loading?: boolean;
    disabled?: boolean;
}

export const GlassResponsiveButton: React.FC<GlassResponsiveButtonProps> = ({
    mobileSize = "md",
    desktopSize = "lg",
    mobileVariant = "primary",
    desktopVariant = "primary",
    loading,
    disabled,
    className,
    children,
    ...props
}) => {
    const isMobile = useMobile();

    const responsiveSize = isMobile ? mobileSize : desktopSize;
    const responsiveVariant = isMobile ? mobileVariant : desktopVariant;

    return (
        <GlassButton
            size={responsiveSize}
            variant={responsiveVariant}
            loading={loading}
            disabled={disabled}
            className={cn(
                "transition-all duration-300",
                isMobile && "w-full", // Full width on mobile
                className
            )}
            {...props}
        >
            {children}
        </GlassButton>
    );
}; 