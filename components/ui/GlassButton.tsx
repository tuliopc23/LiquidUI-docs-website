import React from 'react'
import { cn } from 'liquidify'

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function GlassButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: GlassButtonProps) {
  const variants = {
    primary: 'bg-white/10 hover:bg-white/20 text-white border-white/20',
    secondary: 'bg-gray-500/10 hover:bg-gray-500/20 text-gray-900 dark:text-white border-gray-500/20',
    outline: 'bg-transparent hover:bg-white/10 text-gray-900 dark:text-white border-gray-500/30'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <button
      className={cn(
        'liquid-glass border backdrop-blur-xl rounded-ds transition-all duration-200 font-medium',
        'hover:scale-105 hover:shadow-lg active:scale-95',
        'focus:outline-none focus:ring-2 focus:ring-blue-500/50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}