import React, { useState, useEffect } from "react";
import { cn } from "../lib/utils";

export interface GlassCommandProps {
    isOpen?: boolean;
    onClose?: () => void;
    placeholder?: string;
    commands?: Array<{
        id: string;
        label: string;
        description?: string;
        icon?: React.ReactNode;
        action: () => void;
        keywords?: string[];
    }>;
    className?: string;
}

export const GlassCommand: React.FC<GlassCommandProps> = ({
    isOpen = false,
    onClose,
    placeholder = "Type a command...",
    commands = [],
    className,
}) => {
    const [search, setSearch] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);

    const filteredCommands = commands.filter(command =>
        command.label.toLowerCase().includes(search.toLowerCase()) ||
        command.description?.toLowerCase().includes(search.toLowerCase()) ||
        command.keywords?.some(keyword => keyword.toLowerCase().includes(search.toLowerCase()))
    );

    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex(prev => Math.max(prev - 1, 0));
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (filteredCommands[selectedIndex]) {
                        filteredCommands[selectedIndex].action();
                        onClose?.();
                    }
                    break;
                case 'Escape':
                    onClose?.();
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredCommands, selectedIndex, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            <div
                className={cn(
                    "relative w-full max-w-lg backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl shadow-2xl",
                    className
                )}
            >
                {/* Search Input */}
                <div className="p-4 border-b border-white/20">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={placeholder}
                        className="w-full bg-transparent text-lg placeholder:text-gray-500 focus:outline-none"
                        autoFocus
                    />
                </div>

                {/* Commands List */}
                <div className="max-h-80 overflow-y-auto p-2">
                    {filteredCommands.length > 0 ? (
                        filteredCommands.map((command, index) => (
                            <button
                                key={command.id}
                                onClick={() => {
                                    command.action();
                                    onClose?.();
                                }}
                                className={cn(
                                    "w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-all duration-200",
                                    index === selectedIndex
                                        ? "bg-white/20 scale-[1.02]"
                                        : "hover:bg-white/10"
                                )}
                            >
                                {command.icon && (
                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                                        {command.icon}
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900">{command.label}</div>
                                    {command.description && (
                                        <div className="text-sm text-gray-600 truncate">
                                            {command.description}
                                        </div>
                                    )}
                                </div>
                            </button>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            No commands found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}; 