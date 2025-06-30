import React from "react";
import { cn } from "../lib/utils";

export interface GlassTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
    data?: Array<Record<string, any>>;
    columns?: Array<{ key: string; label: string; width?: string }>;
    striped?: boolean;
}

export const GlassTable: React.FC<GlassTableProps> = ({
    data = [],
    columns = [],
    striped = true,
    className,
    children,
    ...props
}) => {
    return (
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl overflow-hidden">
            <table
                className={cn(
                    "w-full",
                    className
                )}
                {...props}
            >
                {columns.length > 0 && (
                    <thead className="backdrop-blur-md bg-white/20 border-b border-white/20">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                                    style={{ width: column.width }}
                                >
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                )}
                <tbody>
                    {data.length > 0 ? (
                        data.map((row, index) => (
                            <tr
                                key={index}
                                className={cn(
                                    striped && index % 2 === 1 && "bg-white/5",
                                    "hover:bg-white/10 transition-colors duration-200"
                                )}
                            >
                                {columns.map((column) => (
                                    <td key={column.key} className="px-6 py-4 text-sm text-gray-700">
                                        {row[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        children
                    )}
                </tbody>
            </table>
        </div>
    );
};
