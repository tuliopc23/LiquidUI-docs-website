import React, { useState } from "react";
import { cn } from "../lib/utils";

export interface GlassSearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    onSearch?: (value: string) => void;
    onChange?: (value: string) => void;
    icon?: React.ReactNode;
    suggestions?: string[];
    variant?: "default" | "filled" | "outline";
}

export const GlassSearch: React.FC<GlassSearchProps> = ({
    onSearch,
    onChange,
    icon,
    suggestions = [],
    variant = "default",
    className,
    ...props
}) => {
    const [value, setValue] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const variants = {
        default: "backdrop-blur-md bg-white/10 border-white/20 focus:border-blue-300/50",
        filled: "backdrop-blur-md bg-white/20 border-white/30 focus:border-blue-400/60",
        outline: "backdrop-blur-sm bg-white/5 border-2 border-white/40 focus:border-blue-500/70"
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        onChange?.(newValue);
        setShowSuggestions(newValue.length > 0 && suggestions.length > 0);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch?.(value);
        setShowSuggestions(false);
    };

    return (
        <div className="relative">
            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    onFocus={() => setShowSuggestions(value.length > 0 && suggestions.length > 0)}
                    className={cn(
                        "w-full pl-12 pr-4 py-3 rounded-2xl border transition-all duration-300",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2",
                        "placeholder:text-gray-500/70",
                        variants[variant],
                        className
                    )}
                    {...props}
                />

                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {icon || (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    )}
                </div>
            </form>

            {/* Suggestions */}
            {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-lg z-50">
                    {suggestions
                        .filter(suggestion => suggestion.toLowerCase().includes(value.toLowerCase()))
                        .slice(0, 5)
                        .map((suggestion, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setValue(suggestion);
                                    onChange?.(suggestion);
                                    setShowSuggestions(false);
                                }}
                                className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                            >
                                {suggestion}
                            </button>
                        ))}
                </div>
            )}
        </div>
    );
}; 