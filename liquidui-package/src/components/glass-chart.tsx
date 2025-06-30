import React from "react";
import { cn } from "../lib/utils";

export interface GlassChartProps {
    data?: Array<{ label: string; value: number; color?: string }>;
    type?: "bar" | "line" | "pie" | "area";
    height?: number;
    className?: string;
    title?: string;
}

export const GlassChart: React.FC<GlassChartProps> = ({
    data = [],
    type = "bar",
    height = 300,
    className,
    title,
}) => {
    const maxValue = Math.max(...data.map(d => d.value), 1);

    return (
        <div className={cn("backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6", className)}>
            {title && (
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
            )}

            <div style={{ height }} className="relative">
                {type === "bar" && (
                    <div className="flex items-end justify-center gap-2 h-full">
                        {data.map((item, index) => (
                            <div key={index} className="flex flex-col items-center gap-2">
                                <div
                                    className={cn(
                                        "backdrop-blur-md border border-white/20 rounded-t transition-all duration-500",
                                        item.color ? `bg-${item.color}-500/20` : "bg-blue-500/20"
                                    )}
                                    style={{
                                        height: `${(item.value / maxValue) * 80}%`,
                                        width: "40px",
                                    }}
                                />
                                <span className="text-xs text-gray-600 rotate-45 origin-bottom-left">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {type === "pie" && (
                    <div className="flex items-center justify-center h-full">
                        <div className="w-48 h-48 backdrop-blur-md bg-white/10 border border-white/20 rounded-full flex items-center justify-center">
                            <span className="text-gray-600">Pie Chart Placeholder</span>
                        </div>
                    </div>
                )}

                {(type === "line" || type === "area") && (
                    <div className="h-full backdrop-blur-md bg-white/5 border border-white/20 rounded-2xl flex items-center justify-center">
                        <span className="text-gray-600">{type === "line" ? "Line" : "Area"} Chart Placeholder</span>
                    </div>
                )}
            </div>

            {data.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className={cn(
                                    "w-3 h-3 backdrop-blur-md border border-white/20 rounded",
                                    item.color ? `bg-${item.color}-500/20` : "bg-blue-500/20"
                                )}
                            />
                            <span className="text-sm text-gray-600">{item.label}: {item.value}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}; 