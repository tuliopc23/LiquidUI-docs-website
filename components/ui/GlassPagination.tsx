'use client';

import React from 'react';
import GlassEffect, { GlassEffectProps } from './GlassEffect';
import { cn } from '@/lib/utils';

export interface GlassPaginationProps
  extends Omit<GlassEffectProps, 'variant' | 'as'> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const GlassPagination: React.FC<GlassPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 7,
  size = 'md',
  className,
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  const baseClasses = cn(
    'flex items-center space-x-1 p-2 rounded-lg',
    className
  );

  const buttonClasses = (isActive = false, isDisabled = false) =>
    cn(
      'flex items-center justify-center min-w-8 rounded-md',
      'font-medium transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-white/50',
      sizeStyles[size],
      isActive && 'bg-white/30 text-white shadow-md',
      !isActive && !isDisabled && 'bg-white/10 text-white/90 hover:bg-white/20',
      isDisabled && 'bg-white/5 text-white/40 cursor-not-allowed'
    );

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <GlassEffect variant='widget' className={baseClasses} {...props}>
      <nav aria-label='Pagination' className='flex items-center space-x-1'>
        {showFirstLast && (
          <button
            onClick={() => handlePageClick(1)}
            disabled={currentPage === 1}
            className={buttonClasses(false, currentPage === 1)}
            aria-label='First page'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M11 19l-7-7 7-7m8 14l-7-7 7-7'
              />
            </svg>
          </button>
        )}

        {showPrevNext && (
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            className={buttonClasses(false, currentPage === 1)}
            aria-label='Previous page'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>
        )}

        {(visiblePages[0] ?? 0) > 1 && (
          <>
            <button
              onClick={() => handlePageClick(1)}
              className={buttonClasses(false, false)}
            >
              1
            </button>
            {(visiblePages[0] ?? 0) > 2 && (
              <span className='px-2 text-white/60'>...</span>
            )}
          </>
        )}

        {visiblePages.map(page => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={buttonClasses(page === currentPage, false)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        {(visiblePages[visiblePages.length - 1] ?? 0) < totalPages && (
          <>
            {(visiblePages[visiblePages.length - 1] ?? 0) < totalPages - 1 && (
              <span className='px-2 text-white/60'>...</span>
            )}
            <button
              onClick={() => handlePageClick(totalPages)}
              className={buttonClasses(false, false)}
            >
              {totalPages}
            </button>
          </>
        )}

        {showPrevNext && (
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={buttonClasses(false, currentPage === totalPages)}
            aria-label='Next page'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        )}

        {showFirstLast && (
          <button
            onClick={() => handlePageClick(totalPages)}
            disabled={currentPage === totalPages}
            className={buttonClasses(false, currentPage === totalPages)}
            aria-label='Last page'
          >
            <svg
              className='w-4 h-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M13 5l7 7-7 7M5 5l7 7-7 7'
              />
            </svg>
          </button>
        )}
      </nav>
    </GlassEffect>
  );
};

export default GlassPagination;
