import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'component';
  animation?: 'pulse' | 'wave' | 'none';
  lines?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  className = '', 
  variant = 'rectangular',
  animation = 'pulse',
  lines = 1
}) => {
  const getBaseClasses = () => {
    const animationClasses = {
      pulse: 'animate-pulse',
      wave: 'animate-pulse',
      none: ''
    };

    return `bg-gray-200 dark:bg-gray-700 ${animationClasses[animation]} ${className}`;
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'h-4 rounded';
      case 'circular':
        return 'rounded-full aspect-square';
      case 'component':
        return 'h-32 rounded-lg';
      case 'rectangular':
      default:
        return 'h-6 rounded-md';
    }
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={`${getBaseClasses()} ${getVariantClasses()}`}
            style={{ width: i === lines - 1 ? '75%' : '100%' }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`${getBaseClasses()} ${getVariantClasses()}`} />
  );
};

export const ComponentSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 ${className}`}>
    <LoadingSkeleton variant="text" className="mb-4 w-1/3" />
    <LoadingSkeleton variant="component" className="mb-4" />
    <div className="flex gap-2">
      <LoadingSkeleton className="w-20 h-8" />
      <LoadingSkeleton className="w-20 h-8" />
    </div>
  </div>
);

export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 ${className}`}>
    <LoadingSkeleton variant="circular" className="w-12 h-12 mb-3" />
    <LoadingSkeleton variant="text" className="mb-2 w-3/4" />
    <LoadingSkeleton variant="text" lines={2} className="w-full" />
  </div>
);

export default LoadingSkeleton;