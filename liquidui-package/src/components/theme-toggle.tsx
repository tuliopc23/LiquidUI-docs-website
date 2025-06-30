import React from "react";
import { cn } from "../lib/utils";
import { useTheme } from "../hooks/use-theme";

export interface ThemeToggleProps {
    className?: string;
    size?: "sm" | "md" | "lg";
    variant?: "button" | "switch";
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
    className,
    size = "md",
    variant = "button",
}) => {
    const { theme, setTheme } = useTheme();

    const sizes = {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-12 h-12"
    };

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    if (variant === "switch") {
        return (
            <label className={cn("inline-flex items-center gap-3 cursor-pointer", className)}>
                <span className="text-sm font-medium text-gray-700">
                    {theme === "light" ? "☀️ Light" : "🌙 Dark"}
                </span>
                <div className="relative">
                    <input
                        type="checkbox"
                        checked={theme === "dark"}
                        onChange={toggleTheme}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 border border-white/20 rounded-full peer-checked:bg-blue-500/30 peer-checked:border-blue-300/30 transition-all duration-300 backdrop-blur-md">
                        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white border border-white/30 rounded-full transition-transform duration-300 peer-checked:translate-x-5 backdrop-blur-sm" />
                    </div>
                </div>
            </label>
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "flex items-center justify-center backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl",
                "hover:bg-white/20 hover:scale-105 transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2",
                sizes[size],
                className
            )}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
            {theme === "light" ? "🌙" : "☀️"}
        </button>
    );
}; 