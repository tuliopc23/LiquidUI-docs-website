import React, { useState } from "react";
import { cn } from "../lib/utils";
import { ComponentShowcaseProps } from "../types";

export const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({
    title,
    description,
    code,
    children,
    className,
}) => {
    const [showCode, setShowCode] = useState(false);

    return (
        <div className={cn("space-y-4", className)}>
            {/* Header */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    {code && (
                        <button
                            onClick={() => setShowCode(!showCode)}
                            className="px-3 py-1 text-sm backdrop-blur-md bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300"
                        >
                            {showCode ? 'Hide Code' : 'Show Code'}
                        </button>
                    )}
                </div>
                {description && (
                    <p className="text-sm text-gray-600">{description}</p>
                )}
            </div>

            {/* Preview */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
                {children}
            </div>

            {/* Code */}
            {code && showCode && (
                <div className="backdrop-blur-md bg-black/90 border border-white/20 rounded-2xl p-4 overflow-x-auto">
                    <pre className="text-sm text-green-400">
                        <code>{code}</code>
                    </pre>
                </div>
            )}
        </div>
    );
}; 