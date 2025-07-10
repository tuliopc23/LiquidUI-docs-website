'use client';

import React, { useState, useRef } from 'react';
import GlassEffect, { GlassEffectProps } from './GlassEffect';
import { cn } from '@/lib/utils';

export interface GlassFileUploadProps
  extends Omit<GlassEffectProps, 'variant' | 'as'> {
  onFileChange?: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  maxSize?: number; // in MB
  className?: string;
}

const GlassFileUpload: React.FC<GlassFileUploadProps> = ({
  onFileChange,
  accept,
  multiple = false,
  disabled = false,
  maxSize = 10, // 10MB default
  className,
  ...props
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFiles = (fileList: FileList): boolean => {
    const maxSizeBytes = maxSize * 1024 * 1024;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file && file.size > maxSizeBytes) {
        setError(
          `File "${file?.name}" is too large. Maximum size is ${maxSize}MB.`
        );
        return false;
      }
    }

    setError(null);
    return true;
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) {
      return;
    }

    if (validateFiles(fileList)) {
      setFiles(fileList);
      onFileChange?.(fileList);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (disabled) {
      return;
    }

    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const baseClasses = cn(
    'relative p-8 border-2 border-dashed rounded-lg cursor-pointer',
    'transition-all duration-200',
    'flex flex-col items-center justify-center text-center',
    'min-h-32',
    isDragOver && 'border-blue-400 bg-blue-50/10',
    !isDragOver && 'border-white/30 hover:border-white/50',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  const renderFileInfo = () => {
    if (!files || files.length === 0) {
      return null;
    }

    return (
      <div className='mt-4 space-y-2'>
        {Array.from(files).map((file, index) => (
          <div
            key={index}
            className='flex items-center justify-between p-2 bg-white/10 rounded-md text-sm'
          >
            <span className='text-white/90'>{file.name}</span>
            <span className='text-white/70'>
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <GlassEffect
      variant='card'
      className={baseClasses}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      {...props}
    >
      <input
        ref={inputRef}
        type='file'
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
        disabled={disabled}
        className='hidden'
      />

      <div className='flex flex-col items-center space-y-2'>
        <svg
          className='w-8 h-8 text-white/70'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
          />
        </svg>

        <div className='text-white/90'>
          <p className='text-sm font-medium'>
            {isDragOver ? 'Drop files here' : 'Upload files'}
          </p>
          <p className='text-xs text-white/70 mt-1'>
            {multiple ? 'Choose files' : 'Choose a file'} or drag and drop
          </p>
          {maxSize && (
            <p className='text-xs text-white/60 mt-1'>
              Maximum file size: {maxSize}MB
            </p>
          )}
        </div>
      </div>

      {error && (
        <div className='mt-4 p-2 bg-red-500/20 border border-red-500/30 rounded-md'>
          <p className='text-sm text-red-200'>{error}</p>
        </div>
      )}

      {renderFileInfo()}
    </GlassEffect>
  );
};

export default GlassFileUpload;
