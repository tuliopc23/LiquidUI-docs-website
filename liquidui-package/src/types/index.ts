import React from 'react';

// Base component props
export interface BaseGlassProps {
    className?: string;
    children?: React.ReactNode;
}

// Button Props
export interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'primary' | 'secondary' | 'destructive' | 'ghost' | 'link' | 'tertiary';
    size?: 'default' | 'sm' | 'md' | 'lg' | 'icon';
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

// Card Props
export interface GlassCardProps extends BaseGlassProps {
    variant?: 'default' | 'elevated' | 'outline';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    clickable?: boolean;
    onClick?: () => void;
}

// Input Props
export interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    variant?: 'default' | 'filled' | 'outline';
}

// Textarea Props
export interface GlassTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
    variant?: 'default' | 'filled' | 'outline';
}

// Select Props
export interface GlassSelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface GlassSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
    label?: string;
    error?: string;
    helperText?: string;
    options: GlassSelectOption[];
    placeholder?: string;
    variant?: 'default' | 'filled' | 'outline';
}

// Checkbox Props
export interface GlassCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
    indeterminate?: boolean;
    variant?: 'default' | 'outline';
}

// Switch Props
export interface GlassSwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    label?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'colored';
}

// Slider Props
export interface GlassSliderProps {
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    onChange?: (value: number) => void;
    className?: string;
    disabled?: boolean;
    label?: string;
}

// Progress Props
export interface GlassProgressProps {
    value?: number;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'gradient' | 'striped';
    showValue?: boolean;
    className?: string;
    label?: string;
}

// Avatar Props
export interface GlassAvatarProps {
    src?: string;
    alt?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    fallback?: string;
    className?: string;
    onClick?: () => void;
}

// Badge Props
export interface GlassBadgeProps extends BaseGlassProps {
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
    size?: 'sm' | 'md' | 'lg';
    dot?: boolean;
}

// Modal Props
export interface GlassModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    showCloseButton?: boolean;
    className?: string;
    children: React.ReactNode;
}

// Toast Props
export interface GlassToastProps {
    id?: string;
    title?: string;
    description?: string;
    variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
    onClose?: () => void;
}

// Tabs Props
export interface GlassTabItem {
    id: string;
    label: string;
    content: React.ReactNode;
    disabled?: boolean;
}

export interface GlassTabsProps {
    items: GlassTabItem[];
    defaultActiveId?: string;
    activeId?: string;
    onTabChange?: (id: string) => void;
    variant?: 'default' | 'pills' | 'underline';
    className?: string;
}

// Theme Provider Props
export interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: 'light' | 'dark' | 'system';
    storageKey?: string;
    enableSystem?: boolean;
    disableTransitionOnChange?: boolean;
}

// Component Showcase Props
export interface ComponentShowcaseProps {
    title: string;
    description?: string;
    code?: string;
    children: React.ReactNode;
    className?: string;
}

// Feature Props
export interface Feature {
    id?: string;
    icon?: React.ReactNode;
    title: string;
    description: string;
    href?: string;
}

// Navigation Link Props
export interface NavLink {
    label: string;
    href: string;
    icon?: React.ReactNode;
    external?: boolean;
}

// Layout component props
export interface GlassHeaderProps extends BaseGlassProps {
    title?: string;
    subtitle?: string;
    actions?: React.ReactNode;
    navigation?: NavLink[];
    position?: "fixed" | "sticky" | "relative";
}

export interface GlassFooterProps extends BaseGlassProps {
    links?: NavLink[];
    copyright?: string;
    socialLinks?: NavLink[];
}

export interface GlassHeroProps extends BaseGlassProps {
    title: string;
    subtitle?: string;
    description?: string;
    actions?: React.ReactNode;
    image?: string;
    backgroundPattern?: boolean;
}

export interface GlassFeatureShowcaseProps extends BaseGlassProps {
    features: Feature[];
    title?: string;
    description?: string;
    columns?: 1 | 2 | 3 | 4;
}

export interface GlassFloatingActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactNode;
    position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
    size?: "sm" | "md" | "lg";
}

// Accessibility types
export interface AccessibilityIssue {
    type: 'error' | 'warning' | 'notice';
    message: string;
    element?: string;
    suggestion?: string;
}

export interface AccessibilityCheckResult {
    issues: AccessibilityIssue[];
    score: number;
    total: number;
} 