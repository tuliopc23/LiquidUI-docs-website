import React from 'react';
import { cn } from 'glass-ui-tulio';

interface ComponentShowcaseProps {
  children: React.ReactNode;
  className?: string;
}

export function ComponentShowcase({ children, className }: ComponentShowcaseProps) {
  return (
    <div className={cn(
      "relative rounded-lg border border-border bg-background/50 backdrop-blur-sm p-6 my-4",
      "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/10 before:to-transparent before:pointer-events-none",
      className
    )}>
      <div className="relative z-10 flex flex-wrap gap-4 items-center justify-center">
        {children}
      </div>
    </div>
  );
}
