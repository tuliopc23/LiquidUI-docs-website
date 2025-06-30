import React, { useState } from "react";
import { cn } from "../lib/utils";

export interface GlassTabsProps {
    tabs: Array<{ id: string; label: string; content: React.ReactNode; disabled?: boolean }>;
    defaultTab?: string;
    className?: string;
    onTabChange?: (tabId: string) => void;
}

export const GlassTabs: React.FC<GlassTabsProps> = ({
    tabs,
    defaultTab,
    className,
    onTabChange,
}) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        onTabChange?.(tabId);
    };

    return (
        <div className={cn("space-y-4", className)}>
            {/* Tab Headers */}
            <div className="flex backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => !tab.disabled && handleTabClick(tab.id)}
                        disabled={tab.disabled}
                        className={cn(
                            "flex-1 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300",
                            activeTab === tab.id
                                ? "backdrop-blur-md bg-white/20 text-gray-900 shadow-sm"
                                : "text-gray-600 hover:text-gray-800",
                            tab.disabled && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[200px]">
                {tabs.find(tab => tab.id === activeTab)?.content}
            </div>
        </div>
    );
}; 