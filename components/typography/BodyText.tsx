import React from 'react'

interface BodyTextProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const BodyText: React.FC<BodyTextProps> = ({
  children,
  className = '',
  as: Component = 'p',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }
  
  const baseClasses = 'body-text'
  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${className}`
  
  return (
    <Component className={combinedClasses}>
      {children}
    </Component>
  )
}

export default BodyText