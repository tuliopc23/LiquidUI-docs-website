import React from "react";
import { GlassCard } from "./glass-card";
import { useMobile } from "../hooks/use-mobile";
import { cn } from "../lib/utils";

export interface GlassResponsiveCardProps {
    mobilePadding?: "sm" | "md" | "lg" | "none";
    desktopPadding?: "sm" | "md" | "lg" | "none";
    mobileVariant?: "default" | "elevated" | "outline";
    desktopVariant?: "default" | "elevated" | "outline";
    stackOnMobile?: boolean;
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
}

export const GlassResponsiveCard: React.FC<GlassResponsiveCardProps> = ({
    mobilePadding = "md",
    desktopPadding = "lg",
    mobileVariant = "default",
    desktopVariant = "default",
    stackOnMobile = true,
    className,
    children,
    onClick,
}) => {
    const isMobile = useMobile();

    const responsivePadding = isMobile ? mobilePadding : desktopPadding;
    const responsiveVariant = isMobile ? mobileVariant : desktopVariant;

    return (
        <GlassCard
            padding={responsivePadding}
            variant={responsiveVariant}
            onClick={onClick}
            className={cn(
                "transition-all duration-300",
                isMobile && stackOnMobile && "flex-col space-y-4",
                !isMobile && "flex-row items-center",
                className
            )}
        >
            {children}
        </GlassCard>
    );
}; 