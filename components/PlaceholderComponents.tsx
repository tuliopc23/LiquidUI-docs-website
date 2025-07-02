import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@tuliocunha23/liquidui";
import { ClassValue } from "clsx";
import { 
  ChevronDown, 
  Check, 
  X, 
  MoreHorizontal,
  Info
} from "lucide-react";

/**
 * Placeholder components for missing glass-ui components.
 * These will be replaced when the full glass-ui package is available.
 */

/**
 * Props for placeholder components.
 */
interface PlaceholderProps {
  /** Optional children to render inside the placeholder */
  children?: React.ReactNode;
  /** Optional CSS classes to apply */
  className?: ClassValue;
}

// Base glass styling
const glassBase = "backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 shadow-xl";
const glassHover = "hover:bg-white/15 dark:hover:bg-white/8 hover:border-white/30 dark:hover:border-white/15";
const glassButton = "transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]";

// High-fidelity GlassDropdown component
interface DropdownProps {
  children?: React.ReactNode;
  className?: string;
  trigger?: React.ReactNode;
  items?: Array<{
    label: string;
    value: string;
    icon?: React.ReactNode;
    separator?: boolean;
  }>;
}

export const GlassDropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, className, trigger, items, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    
    const defaultItems = [
      { label: "Profile", value: "profile", icon: <div className="w-4 h-4 rounded-full bg-blue-500" /> },
      { label: "Settings", value: "settings", icon: <div className="w-4 h-4 rounded bg-gray-500" /> },
      { label: "Sign out", value: "signout", separator: true, icon: <X className="w-4 h-4" /> }
    ];
    
    const dropdownItems = items || defaultItems;
    
    return (
      <div ref={ref} className={cn("relative inline-block", className)} {...props}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            glassBase,
            glassHover,
            glassButton,
            "rounded-2xl px-4 py-2 flex items-center gap-2 text-sm font-medium"
          )}
        >
          {trigger || (
            <>
              <MoreHorizontal className="w-4 h-4" />
              <span>Options</span>
              <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
            </>
          )}
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className={cn(
                glassBase,
                "absolute right-0 top-full mt-2 min-w-[200px] rounded-2xl p-2 z-50"
              )}
            >
              {dropdownItems.map((item, index) => (
                <React.Fragment key={item.value}>
                  {item.separator && index > 0 && (
                    <div className="h-px bg-white/10 my-2" />
                  )}
                  <button
                    onClick={() => {
                      setSelectedItem(item.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm",
                      "hover:bg-white/10 dark:hover:bg-white/5 transition-colors",
                      selectedItem === item.value && "bg-white/15 dark:bg-white/8"
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {selectedItem === item.value && <Check className="w-4 h-4 ml-auto" />}
                  </button>
                </React.Fragment>
              ))}
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

// High-fidelity GlassTable component
interface TableProps {
  children?: React.ReactNode;
  className?: string;
  data?: Array<Record<string, string | number>>;
  columns?: Array<{ key: string; label: string; width?: string }>;
  striped?: boolean;
}

export const GlassTable = React.forwardRef<HTMLTableElement, TableProps>(
  ({ children, className, data, columns, striped = true, ...props }, ref) => {
    const defaultData = [
      { name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
      { name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
      { name: "Bob Johnson", email: "bob@example.com", role: "Editor", status: "Inactive" },
    ];
    
    const defaultColumns = [
      { key: "name", label: "Name", width: "25%" },
      { key: "email", label: "Email", width: "35%" },
      { key: "role", label: "Role", width: "20%" },
      { key: "status", label: "Status", width: "20%" },
    ];
    
    const tableData = data || defaultData;
    const tableColumns = columns || defaultColumns;
    
    return (
      <div className={cn(glassBase, "rounded-2xl overflow-hidden", className)}>
        <table ref={ref} className="w-full" {...props}>
          <thead>
            <tr className="border-b border-white/10">
              {tableColumns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"
                  style={{ width: column.width }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "transition-colors hover:bg-white/5",
                  striped && index % 2 === 1 && "bg-white/5"
                )}
              >
                {tableColumns.map((column) => (
                  <td key={column.key} className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    {column.key === "status" ? (
                      <span className={cn(
                        "inline-flex px-2 py-1 rounded-full text-xs font-medium",
                        String(row[column.key as keyof typeof row]) === "Active" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      )}>
                        {String(row[column.key as keyof typeof row])}
                      </span>
                    ) : (
                      String(row[column.key as keyof typeof row])
                    )}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
        {children}
      </div>
    );
  }
);

// High-fidelity GlassTabs component
interface TabsProps {
  children?: React.ReactNode;
  className?: string;
  tabs?: Array<{ id: string; label: string; content?: React.ReactNode; icon?: React.ReactNode }>;
  defaultTab?: string;
}

export const GlassTabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ children, className, tabs, defaultTab, ...props }, ref) => {
    const defaultTabs = [
      { 
        id: "overview", 
        label: "Overview", 
        icon: <Info className="w-4 h-4" />,
        content: <div className="p-4">Overview content with glass effects and smooth animations.</div>
      },
      { 
        id: "analytics", 
        label: "Analytics", 
        icon: <div className="w-4 h-4 rounded bg-blue-500" />,
        content: <div className="p-4">Analytics dashboard with interactive charts and data visualization.</div>
      },
      { 
        id: "settings", 
        label: "Settings", 
        icon: <div className="w-4 h-4 rounded bg-gray-500" />,
        content: <div className="p-4">Configuration options and preferences management.</div>
      }
    ];
    
    const tabItems = tabs || defaultTabs;
    const [activeTab, setActiveTab] = useState(defaultTab || tabItems[0]?.id);
    
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {/* Tab Navigation */}
        <div className={cn(glassBase, "rounded-2xl p-2 mb-4")}>
          <div className="flex gap-1">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  activeTab === tab.id
                    ? "bg-white/20 dark:bg-white/10 text-gray-900 dark:text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
                )}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content */}
        <div className={cn(glassBase, "rounded-2xl min-h-[200px]")}>
          <AnimatePresence mode="wait">
            {tabItems.map((tab) => 
              tab.id === activeTab ? (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {tab.content}
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
          {children}
        </div>
      </div>
    );
  }
);

// High-fidelity GlassTooltip component
interface TooltipProps {
  children: React.ReactNode;
  content?: React.ReactNode;
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
}

export const GlassTooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, content, className, position = "top", delay = 500, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    const handleMouseEnter = useCallback(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
        setShowTooltip(true);
      }, delay);
    }, [delay]);
    
    const handleMouseLeave = useCallback(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsVisible(false);
      setTimeout(() => setShowTooltip(false), 150);
    }, []);
    
    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);
    
    const positionClasses = {
      top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
      bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
      left: "right-full top-1/2 -translate-y-1/2 mr-2",
      right: "left-full top-1/2 -translate-y-1/2 ml-2"
    };
    
    const arrowClasses = {
      top: "top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent",
      bottom: "bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent",
      left: "left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent",
      right: "right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent"
    };
    
    return (
      <div 
        ref={ref} 
        className={cn("relative inline-block", className)} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
        
        {showTooltip && (
          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  glassBase,
                  "absolute z-50 px-3 py-2 text-sm font-medium text-white rounded-xl shadow-lg pointer-events-none",
                  "max-w-xs break-words",
                  positionClasses[position]
                )}
                role="tooltip"
              >
                {content || "Tooltip content with glass morphism design and smooth animations."}
                
                {/* Arrow */}
                <div 
                  className={cn(
                    "absolute w-0 h-0 border-4",
                    "border-white/20",
                    arrowClasses[position]
                  )}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  }
);

// Set display names
GlassDropdown.displayName = "GlassDropdown";
GlassTable.displayName = "GlassTable";
GlassTabs.displayName = "GlassTabs";
GlassTooltip.displayName = "GlassTooltip";

// Simple placeholder creator for other components
const createSimplePlaceholder = (name: string) => {
  const Component = React.forwardRef<HTMLDivElement, PlaceholderProps>(
    ({ children, className, ...props }, ref) => (
      <div
        ref={ref}
        className={cn(
          glassBase,
          "rounded-2xl p-4",
          className,
        )}
        role="region"
        aria-label={`${name} component placeholder`}
        {...props}
      >
        {children || (
          <div className="text-center text-sm text-gray-600 dark:text-gray-400" aria-live="polite">
            <span className="sr-only">Placeholder: </span>
            {name} Component
          </div>
        )}
      </div>
    ),
  );
  Component.displayName = name;
  return Component;
};

// Export other placeholder components
export const GlassAvatar = createSimplePlaceholder("GlassAvatar");
export const GlassChart = createSimplePlaceholder("GlassChart");
export const GlassCheckbox = createSimplePlaceholder("GlassCheckbox");
export const GlassCommand = createSimplePlaceholder("GlassCommand");
export const GlassLoading = createSimplePlaceholder("GlassLoading");
export const GlassMobileNav = createSimplePlaceholder("GlassMobileNav");
export const GlassModal = createSimplePlaceholder("GlassModal");
export const GlassNotification = createSimplePlaceholder("GlassNotification");
export const GlassPopover = createSimplePlaceholder("GlassPopover");
export const GlassProgress = createSimplePlaceholder("GlassProgress");
export const GlassResponsiveButton = createSimplePlaceholder("GlassResponsiveButton");
export const GlassResponsiveCard = createSimplePlaceholder("GlassResponsiveCard");
export const GlassSearch = createSimplePlaceholder("GlassSearch");
export const GlassSelect = createSimplePlaceholder("GlassSelect");
export const GlassSlider = createSimplePlaceholder("GlassSlider");
export const GlassSwitch = createSimplePlaceholder("GlassSwitch");
export const GlassTextarea = createSimplePlaceholder("GlassTextarea");
export const GlassToast = createSimplePlaceholder("GlassToast");
export const Navbar = createSimplePlaceholder("Navbar");
export const Sidebar = createSimplePlaceholder("Sidebar");
export const ThemeProvider = createSimplePlaceholder("ThemeProvider");
export const ThemeToggle = createSimplePlaceholder("ThemeToggle");
