'use client';

import React from 'react';
import { GlassCard, cn } from 'liquidify';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  current?: boolean;
}

export interface GlassBreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  className?: string;
}

const GlassBreadcrumb: React.FC<GlassBreadcrumbProps> = ({
  items,
  separator = '/',
  maxItems = 5,
  className,
  ...props
}) => {
  const processedItems = React.useMemo(() => {
    if (items.length <= maxItems) {
      return items;
    }

    const firstItem = items[0];
    const lastItems = items.slice(-maxItems + 2);

    return [
      firstItem,
      { label: '...', href: undefined, current: false },
      ...lastItems,
    ];
  }, [items, maxItems]);

  const baseClasses = cn(
    'flex items-center space-x-2 p-2 rounded-lg',
    'text-sm text-white/80',
    className
  );

  return (
    <GlassCard className={baseClasses} {...props}>
      <nav aria-label='Breadcrumb'>
        <ol className='flex items-center space-x-2'>
          {processedItems.map((item, index) => (
            <li key={index} className='flex items-center'>
              {index > 0 && (
                <span className='mx-2 text-white/40' aria-hidden='true'>
                  {separator}
                </span>
              )}

              <div className='flex items-center space-x-1'>
                {item?.icon && (
                  <span className='w-4 h-4 text-white/60'>{item?.icon}</span>
                )}

                {item?.href && !item?.current ? (
                  <a
                    href={item?.href}
                    className={cn(
                      'hover:text-white transition-colors duration-200',
                      'focus:outline-none focus:ring-2 focus:ring-white/50 rounded',
                      item?.current && 'text-white font-medium'
                    )}
                    aria-current={item?.current ? 'page' : undefined}
                  >
                    {item?.label}
                  </a>
                ) : (
                  <span
                    className={cn(
                      'text-white/60',
                      item?.current && 'text-white font-medium',
                      item?.label === '...' && 'cursor-default'
                    )}
                    aria-current={item?.current ? 'page' : undefined}
                  >
                    {item?.label}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </GlassCard>
  );
};

export default GlassBreadcrumb;
