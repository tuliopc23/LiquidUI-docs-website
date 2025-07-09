'use client';

import React, { useState } from 'react';
import GlassEffect, { GlassEffectProps } from './GlassEffect';
import { cn } from '@/lib/utils';

export interface GlassCommandProps
  extends Omit<GlassEffectProps, 'variant' | 'as'> {
  command: string;
  execute?: () => void;
  disableEditing?: boolean;
  className?: string;
}

const GlassCommand: React.FC<GlassCommandProps> = ({
  command,
  execute,
  disableEditing = false,
  className,
  ...props
}) => {
  const [currentCommand, setCurrentCommand] = useState(command);
  const [executing, setExecuting] = useState(false);

  const handleExecute = () => {
    if (executing || !execute) return;

    setExecuting(true);
    execute();
    setTimeout(() => setExecuting(false), 2000); // Mock async execution delay
  };

  const baseClasses = cn(
    'flex items-center p-2 rounded-lg',
    'bg-white/20 text-white transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-white/50',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    className
  );

  return (
    <GlassEffect variant='button' className={baseClasses} {...props}>
      <div className='flex items-center justify-between w-full'>
        <input
          type='text'
          value={currentCommand}
          onChange={e => setCurrentCommand(e.target.value)}
          disabled={disableEditing}
          className={cn(
            'bg-transparent border-none flex-1 text-current mr-2',
            disableEditing ? 'cursor-default' : 'cursor-text'
          )}
        />
        <button
          onClick={handleExecute}
          disabled={executing}
          className='px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md'
        >
          {executing ? 'Executing' : 'Execute'}
        </button>
      </div>
    </GlassEffect>
  );
};

export default GlassCommand;
