import React from 'react';
import { cn } from '@tuliocunha23/liquidui';
import { glassEffect, cardPadding } from './utils/classNames';

/**
 * Props for the Card component
 */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The content to be rendered inside the card */
  children: React.ReactNode;
  /** The padding size variant */
  padding?: 'sm' | 'md' | 'lg';
  /** The glass effect variant */
  variant?: 'default' | 'subtle' | 'strong' | 'card';
  /** Whether the card should have hover effects */
  interactive?: boolean;
  /** Semantic role for the card (optional) */
  role?: string;
  /** Accessible name for the card (optional) */
  'aria-label'?: string;
  /** Reference to describe the card content (optional) */
  'aria-describedby'?: string;
}

/**
 * A reusable card component with glassmorphism effects and consistent styling.
 * Provides different padding sizes and glass effect variants for various use cases.
 * 
 * @param children - The content to be rendered inside the card
 * @param padding - The padding size variant (sm, md, lg)
 * @param variant - The glass effect variant (default, subtle, strong, card)
 * @param interactive - Whether the card should have hover effects
 * @param className - Optional additional CSS classes to apply
 * @param props - All other standard div HTML attributes
 * @returns A styled card component with glass effects
 */
export function Card({
  children,
  padding = 'md',
  variant = 'card',
  interactive = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        glassEffect(variant),
        cardPadding(padding),
        interactive && 'transition-all duration-200 hover:scale-105 hover:bg-white/15',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
