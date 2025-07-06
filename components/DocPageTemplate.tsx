import React from 'react';
import { ScrollReveal, LiquidBlob } from './AnimationSystem';

interface DocPageTemplateProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function DocPageTemplate({ 
  title, 
  description, 
  children 
}: DocPageTemplateProps) {
  return (
    <div className="relative">
      {/* Background decoration */}
      <LiquidBlob 
        color="primary" 
        size="lg" 
        className="top-0 right-0"
      />
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <ScrollReveal>
          <h1 className="title-text mb-4">{title}</h1>
        </ScrollReveal>
        
        <ScrollReveal delay={100}>
          <p className="body-text text-muted-foreground max-w-3xl mb-10">
            {description}
          </p>
        </ScrollReveal>
        
        <div className="mt-12">
          {children}
        </div>
      </div>
    </div>
  );
}