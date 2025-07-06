import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  loading?: boolean
  fullWidth?: boolean
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled,
  loading,
  fullWidth = false,
  onClick,
  type
}) => {
  // Base styles
  const baseStyles = 'glass-button inline-flex items-center justify-center rounded-ds font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary/80 text-primary-foreground hover:bg-primary/90 backdrop-blur-md border border-primary/20',
    secondary: 'bg-white/10 text-foreground hover:bg-white/20 backdrop-blur-md border border-white/10',
    outline: 'bg-transparent border border-primary/50 text-primary hover:bg-primary/10 backdrop-blur-sm',
    ghost: 'bg-transparent hover:bg-white/10 text-foreground backdrop-blur-sm'
  }
  
  // Size styles
  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5 h-8',
    md: 'text-base px-4 py-2 h-10',
    lg: 'text-lg px-6 py-3 h-12'
  }
  
  // Width styles
  const widthStyles = fullWidth ? 'w-full' : ''
  
  // Combine all styles
  const combinedStyles = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    widthStyles,
    className
  )
  
  // Loading spinner
  const LoadingSpinner = () => (
    <svg 
      className="animate-spin -ml-1 mr-2 h-4 w-4" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
  
  return (
    <motion.button
      className={combinedStyles}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      whileTap={{ scale: 0.98 }}
      whileHover={{ translateY: -2 }}
      transition={{ duration: 0.2 }}
    >
      {loading && <LoadingSpinner />}
      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </motion.button>
  )
}

export default GlassButton