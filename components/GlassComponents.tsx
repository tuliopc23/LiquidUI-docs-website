import React from "react";
import Image from "next/image";
import { cn } from "liquidify";
import { motion } from 'framer-motion';
import { optimizedVariants, ViewportMotion } from './PerformanceOptimizer';

// Temporary local implementations until package exports are fixed
// These provide the same API as the liquidify components

interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "destructive" | "ghost" | "link" | "tertiary";
  size?: "default" | "sm" | "md" | "lg" | "icon";
  loading?: boolean;
}

export const GlassButton = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
  loading = false,
  ...props
}: GlassButtonProps) => (
  <button
    className={cn(
      "inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-300 hover:scale-105",
      disabled || loading ? "opacity-50 cursor-not-allowed" : "",
      // Size classes
      size === "sm" && "px-3 py-1.5 text-sm",
      (size === "default" || size === "md") && "px-4 py-2 text-sm",
      size === "lg" && "px-6 py-3 text-base",
      size === "icon" && "p-2",
      // Variant classes
      (variant === "default" || variant === "primary") && "glass-button-primary text-white",
      variant === "secondary" && "glass-button text-gray-700 dark:text-gray-300",
      variant === "destructive" && "bg-red-500 text-white hover:bg-red-600",
      variant === "ghost" && "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50",
      variant === "tertiary" && "bg-gray-200/50 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300",
      variant === "link" && "bg-transparent border-transparent underline",
      className,
    )}
    disabled={disabled || loading}
    {...props}
  >
    {loading ? "Loading..." : children}
  </button>
);

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GlassCard = ({
  children,
  className = "",
  ...props
}: GlassCardProps) => (
  <div
    className={cn(
      "glass-effect p-4 rounded-lg border border-white/20",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

interface GlassBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive";
  children: React.ReactNode;
}

export const GlassBadge = ({
  children,
  variant = "default",
  className = "",
  ...props
}: GlassBadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium glass-effect border border-white/20",
      variant === "secondary" && "bg-white/5",
      variant === "destructive" && "bg-red-500/20 border-red-500/30",
      className,
    )}
    {...props}
  >
    {children}
  </span>
);

export const GlassInput = ({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      "w-full px-3 py-2 glass-effect rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary bg-white/5",
      className,
    )}
    {...props}
  />
);

// Actual working component implementations

// GlassTextarea
export const GlassTextarea = ({
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    className={cn(
      "w-full px-3 py-2 glass-effect rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary bg-white/5 resize-vertical min-h-[100px]",
      className,
    )}
    {...props}
  />
);

// GlassSelect
interface GlassSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export const GlassSelect = ({
  children,
  className = "",
  ...props
}: GlassSelectProps) => (
  <select
    className={cn(
      "w-full px-3 py-2 glass-effect rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary bg-white/5",
      className,
    )}
    {...props}
  >
    {children}
  </select>
);

// GlassProgress
interface GlassProgressProps {
  value: number;
  max?: number;
  className?: string;
  showValue?: boolean;
}

export const GlassProgress = ({
  value,
  max = 100,
  className = "",
  showValue = false,
}: GlassProgressProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn("w-full", className)}>
      <div className="glass-effect rounded-full h-2 border border-white/20 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <div className="text-sm text-gray-600 mt-1 text-right">
          {value}/{max}
        </div>
      )}
    </div>
  );
};

// GlassModal
interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const GlassModal = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
}: GlassModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className={cn(
        "relative glass-effect rounded-2xl border border-white/20 max-w-md w-full mx-4 p-6",
        className
      )}>
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              ×
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

// GlassHero
interface GlassHeroProps {
  title: string | React.ReactNode;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const GlassHero = ({
  title,
  subtitle,
  actions,
  className = "",
}: GlassHeroProps) => (
  <div className={cn(
    "text-center py-24 px-4",
    className
  )}>
    <div className="max-w-4xl mx-auto">
      {typeof title === 'string' ? (
        <h1 className="text-4xl md:text-6xl font-bold mb-6 hero-text">{title}</h1>
      ) : (
        <div className="mb-6">{title}</div>
      )}
      {subtitle && (
        <p className="text-xl text-gray-600 mb-8 body-text max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      {actions && <div>{actions}</div>}
    </div>
  </div>
);

// GlassHeader
interface GlassHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const GlassHeader = ({
  title,
  subtitle,
  actions,
  className = "",
}: GlassHeaderProps) => (
  <div className={cn(
    "glass-effect rounded-2xl border border-white/20 p-6",
    className
  )}>
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        {subtitle && <p className="text-gray-600 dark:text-gray-300 mt-1">{subtitle}</p>}
      </div>
      {actions && <div>{actions}</div>}
    </div>
  </div>
);

// GlassFooter
interface GlassFooterProps {
  links?: Array<{ label: string; href: string; icon?: React.ReactNode }>;
  className?: string;
}

export const GlassFooter = ({
  links = [],
  className = "",
}: GlassFooterProps) => (
  <footer className={cn(
    "glass-effect rounded-t-2xl border border-white/20 p-6 mt-auto",
    className
  )}>
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-wrap justify-center gap-6">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            {link.icon}
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

// GlassFeatureShowcase
interface GlassFeatureShowcaseProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features: Array<{
    icon?: React.ReactNode;
    title: string;
    description: string;
    link?: { label: string; href: string };
    badge?: string;
  }>;
  layout?: "grid" | "list";
  columns?: number;
  className?: string;
}

export const GlassFeatureShowcase = ({
  title,
  subtitle,
  description,
  features,
  layout = "grid",
  columns = 3,
  className = "",
}: GlassFeatureShowcaseProps) => (
  <div className={cn("py-12", className)}>
    {(title || subtitle || description) && (
      <div className="text-center mb-12">
        {subtitle && <div className="text-sm text-blue-600 font-medium mb-2">{subtitle}</div>}
        {title && <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>}
        {description && <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{description}</p>}
      </div>
    )}
    <div className={cn(
      layout === "grid" && `grid gap-6`,
      layout === "grid" && columns === 1 && "grid-cols-1",
      layout === "grid" && columns === 2 && "grid-cols-1 md:grid-cols-2",
      layout === "grid" && columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      layout === "list" && "space-y-6"
    )}>
      {features.map((feature, index) => (
        <div key={index} className="glass-effect rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300">
          {feature.icon && (
            <div className="w-12 h-12 flex items-center justify-center mb-4">
              {feature.icon}
            </div>
          )}
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
            {feature.badge && (
              <GlassBadge variant="secondary">{feature.badge}</GlassBadge>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
          {feature.link && (
            <a href={feature.link.href} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              {feature.link.label} →
            </a>
          )}
        </div>
      ))}
    </div>
  </div>
);

// GlassFloatingAction
interface GlassFloatingActionProps {
  icon: React.ReactNode;
  onClick?: () => void;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  className?: string;
}

export const GlassFloatingAction = ({
  icon,
  onClick,
  position = "bottom-right",
  className = "",
}: GlassFloatingActionProps) => {
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed z-50 w-14 h-14 glass-effect rounded-full border border-white/20 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg",
        positionClasses[position],
        className
      )}
    >
      {icon}
    </button>
  );
};

// GlassToast (simple notification)
interface GlassToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  isVisible?: boolean;
  onClose?: () => void;
  className?: string;
}

export const GlassToast = ({
  message,
  type = "info",
  isVisible = true,
  onClose,
  className = "",
}: GlassToastProps) => {
  if (!isVisible) return null;

  const typeStyles = {
    success: "border-green-500/30 bg-green-500/10",
    error: "border-red-500/30 bg-red-500/10",
    warning: "border-yellow-500/30 bg-yellow-500/10",
    info: "border-blue-500/30 bg-blue-500/10",
  };

  return (
    <div className={cn(
      "fixed top-4 right-4 z-50 glass-effect rounded-lg border p-4 max-w-sm",
      typeStyles[type],
      className
    )}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-800 dark:text-gray-200">{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-gray-500 hover:text-gray-700 transition-colors"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

// Additional Components

// GlassSwitch
interface GlassSwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const GlassSwitch = ({
  checked = false,
  onCheckedChange,
  disabled = false,
  className = "",
}: GlassSwitchProps) => (
  <button
    role="switch"
    aria-checked={checked}
    className={cn(
      "relative inline-flex h-6 w-11 items-center rounded-full glass-effect border border-white/20 transition-colors",
      checked ? "bg-blue-500/30" : "bg-white/10",
      disabled && "opacity-50 cursor-not-allowed",
      className
    )}
    onClick={() => !disabled && onCheckedChange?.(!checked)}
    disabled={disabled}
  >
    <span
      className={cn(
        "inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition",
        checked ? "translate-x-6" : "translate-x-1"
      )}
    />
  </button>
);

// GlassAvatar
interface GlassAvatarProps {
  src?: string;
  alt?: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const GlassAvatar = ({
  src,
  alt,
  children,
  size = "md",
  className = "",
}: GlassAvatarProps) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  return (
    <div className={cn(
      "relative flex items-center justify-center rounded-full glass-effect border border-white/20 overflow-hidden",
      sizeClasses[size],
      className
    )}>
      {src ? (
        <Image src={src} alt={alt || "Avatar"} fill className="object-cover" />
      ) : (
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {children}
        </span>
      )}
    </div>
  );
};

// GlassCheckbox
interface GlassCheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const GlassCheckbox = ({
  checked = false,
  onCheckedChange,
  disabled = false,
  className = "",
}: GlassCheckboxProps) => (
  <button
    role="checkbox"
    aria-checked={checked}
    className={cn(
      "w-5 h-5 rounded glass-effect border border-white/20 flex items-center justify-center transition-colors",
      checked ? "bg-blue-500/30 border-blue-500/50" : "bg-white/10",
      disabled && "opacity-50 cursor-not-allowed",
      className
    )}
    onClick={() => !disabled && onCheckedChange?.(!checked)}
    disabled={disabled}
  >
    {checked && (
      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    )}
  </button>
);

// GlassSlider
interface GlassSliderProps {
  value: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

export const GlassSlider = ({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className = "",
}: GlassSliderProps) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("relative w-full", className)}>
      <div className="glass-effect rounded-full h-2 border border-white/20">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onValueChange?.(Number(e.target.value))}
        disabled={disabled}
        className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer disabled:cursor-not-allowed"
      />
    </div>
  );
};

// Theme components
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
export const useTheme = () => ({ theme: "dark", setTheme: () => { } });
export const useToast = () => ({ toast: () => { } });
export const ToastProvider = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

// Re-exports
export { GlassNavbar } from "./GlassNavbar";

export const GlassBlob = () => (
  <ViewportMotion>
    <motion.div
      variants={optimizedVariants.glassFloat}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
    />
  </ViewportMotion>
);

export const GlassRing = () => (
  <ViewportMotion>
    <motion.div
      variants={optimizedVariants.glassFloat}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="absolute top-0 left-0 w-96 h-96 border-8 border-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
    />
  </ViewportMotion>
);
