import React from 'react';
import { cn } from '../lib/utils';
import { LiquidBlob } from './AnimationSystem';

export interface GlassHeroProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  image?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
  actionClassName?: string;
  imageClassName?: string;
  withBlobs?: boolean;
  fullHeight?: boolean;
  centered?: boolean;
  reversed?: boolean;
}

export function GlassHero({
  title,
  subtitle,
  description,
  action,
  image,
  className,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
  actionClassName,
  imageClassName,
  withBlobs = true,
  fullHeight = false,
  centered = false,
  reversed = false,
}: GlassHeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8',
        fullHeight && 'min-h-[90vh] flex items-center',
        className
      )}
    >
      {withBlobs && (
        <>
          <LiquidBlob 
            className="absolute top-[-10%] right-[-5%] opacity-30" 
            color="primary" 
            size="lg"
          />
          <LiquidBlob 
            className="absolute bottom-[-20%] left-[-10%] opacity-20" 
            color="secondary" 
            size="lg"
          />
          <LiquidBlob 
            className="absolute top-[30%] left-[20%] opacity-10" 
            color="accent" 
            size="md"
          />
        </>
      )}
      
      <div className="container mx-auto max-w-7xl">
        <div 
          className={cn(
            'grid gap-12 items-center',
            reversed ? 'lg:grid-cols-[1fr,1.2fr] lg:grid-flow-col-dense' : 'lg:grid-cols-[1.2fr,1fr]',
            centered && 'text-center'
          )}
        >
          <div 
            className={cn(
              'flex flex-col',
              centered && 'items-center',
              reversed && 'lg:col-start-2'
            )}
          >
            {subtitle && (
              <div 
                className={cn(
                  'text-sm font-semibold uppercase tracking-wider text-blue-500 mb-3',
                  subtitleClassName
                )}
              >
                {subtitle}
              </div>
            )}
            
            <h1 
              className={cn(
                'hero-text',
                titleClassName
              )}
            >
              {title}
            </h1>
            
            {description && (
              <p 
                className={cn(
                  'mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl',
                  centered && 'mx-auto',
                  descriptionClassName
                )}
              >
                {description}
              </p>
            )}
            
            {action && (
              <div 
                className={cn(
                  'mt-8',
                  actionClassName
                )}
              >
                {action}
              </div>
            )}
          </div>
          
          {image && (
            <div 
              className={cn(
                'relative z-10',
                reversed && 'lg:col-start-1',
                imageClassName
              )}
            >
              {image}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}