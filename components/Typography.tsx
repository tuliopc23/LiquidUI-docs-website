import React from 'react';
import { cn } from '../lib/utils';
import { ScrollReveal, TextReveal } from './ScrollAnimations';

// Industry-leading typography system inspired by Vercel, Linear, and Framer
interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
  delay?: number;
}

// Display headings (Hero sections)
export function DisplayLarge({ children, className, animated = false, delay = 0 }: TypographyProps) {
  const baseClasses = "text-display-large font-display font-black tracking-tightest leading-none text-foreground";
  
  if (animated) {
    return (
      <ScrollReveal delay={delay}>
        <h1 className={cn(baseClasses, className)}>
          {typeof children === 'string' ? (
            <TextReveal text={children} />
          ) : children}
        </h1>
      </ScrollReveal>
    );
  }
  
  return <h1 className={cn(baseClasses, className)}>{children}</h1>;
}

export function DisplayMedium({ children, className, animated = false, delay = 0 }: TypographyProps) {
  const baseClasses = "text-display-medium font-display font-bold tracking-tighter leading-tight text-foreground";
  
  if (animated) {
    return (
      <ScrollReveal delay={delay}>
        <h1 className={cn(baseClasses, className)}>
          {typeof children === 'string' ? (
            <TextReveal text={children} />
          ) : children}
        </h1>
      </ScrollReveal>
    );
  }
  
  return <h1 className={cn(baseClasses, className)}>{children}</h1>;
}

// Title headings (Section headers)
export function TitleLarge({ children, className, animated = false, delay = 0 }: TypographyProps) {
  const baseClasses = "text-title-large font-heading font-semibold tracking-tight leading-tight text-foreground";
  
  if (animated) {
    return (
      <ScrollReveal delay={delay}>
        <h2 className={cn(baseClasses, className)}>
          {typeof children === 'string' ? (
            <TextReveal text={children} />
          ) : children}
        </h2>
      </ScrollReveal>
    );
  }
  
  return <h2 className={cn(baseClasses, className)}>{children}</h2>;
}

export function TitleMedium({ children, className, animated = false, delay = 0 }: TypographyProps) {
  const baseClasses = "text-2xl font-heading font-semibold tracking-tight leading-tight text-foreground";
  
  if (animated) {
    return (
      <ScrollReveal delay={delay}>
        <h3 className={cn(baseClasses, className)}>
          {typeof children === 'string' ? (
            <TextReveal text={children} />
          ) : children}
        </h3>
      </ScrollReveal>
    );
  }
  
  return <h3 className={cn(baseClasses, className)}>{children}</h3>;
}

// Headline (Subsection headers)
export function Headline({ children, className, animated = false, delay = 0 }: TypographyProps) {
  const baseClasses = "text-headline font-heading font-medium tracking-tight leading-snug text-foreground";
  
  if (animated) {
    return (
      <ScrollReveal delay={delay}>
        <h4 className={cn(baseClasses, className)}>
          {typeof children === 'string' ? (
            <TextReveal text={children} />
          ) : children}
        </h4>
      </ScrollReveal>
    );
  }
  
  return <h4 className={cn(baseClasses, className)}>{children}</h4>;
}

// Body text variants
export function BodyLarge({ children, className, animated = false, delay = 0 }: TypographyProps) {
  const baseClasses = "text-body-large font-body font-normal leading-relaxed text-foreground/90";
  
  if (animated) {
    return (
      <ScrollReveal delay={delay}>
        <p className={cn(baseClasses, className)}>{children}</p>
      </ScrollReveal>
    );
  }
  
  return <p className={cn(baseClasses, className)}>{children}</p>;
}

export function BodyMedium({ children, className, animated = false, delay = 0 }: TypographyProps) {
  const baseClasses = "text-base font-body font-normal leading-relaxed text-foreground/90";
  
  if (animated) {
    return (
      <ScrollReveal delay={delay}>
        <p className={cn(baseClasses, className)}>{children}</p>
      </ScrollReveal>
    );
  }
  
  return <p className={cn(baseClasses, className)}>{children}</p>;
}

export function BodySmall({ children, className, animated = false, delay = 0 }: TypographyProps) {
  const baseClasses = "text-sm font-body font-normal leading-relaxed text-foreground/80";
  
  if (animated) {
    return (
      <ScrollReveal delay={delay}>
        <p className={cn(baseClasses, className)}>{children}</p>
      </ScrollReveal>
    );
  }
  
  return <p className={cn(baseClasses, className)}>{children}</p>;
}

// Caption and label text
export function Caption({ children, className, animated = false, delay = 0 }: TypographyProps) {
  const baseClasses = "text-caption font-body font-medium tracking-wide uppercase text-muted-foreground";
  
  if (animated) {
    return (
      <ScrollReveal delay={delay}>
        <span className={cn(baseClasses, className)}>{children}</span>
      </ScrollReveal>
    );
  }
  
  return <span className={cn(baseClasses, className)}>{children}</span>;
}

export function Label({ children, className, animated = false, delay = 0 }: TypographyProps) {
  const baseClasses = "text-sm font-body font-medium leading-none text-foreground";
  
  if (animated) {
    return (
      <ScrollReveal delay={delay}>
        <label className={cn(baseClasses, className)}>{children}</label>
      </ScrollReveal>
    );
  }
  
  return <label className={cn(baseClasses, className)}>{children}</label>;
}

// Code and monospace text
export function CodeInline({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <code className={cn(
      "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-foreground",
      className
    )}>
      {children}
    </code>
  );
}

export function CodeBlock({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <pre className={cn(
      "mb-4 mt-6 overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900",
      className
    )}>
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm text-muted-foreground">
        {children}
      </code>
    </pre>
  );
}

// Gradient text effects
export function GradientText({ children, className, gradient = "primary" }: {
  children: React.ReactNode;
  className?: string;
  gradient?: "primary" | "secondary" | "accent";
}) {
  const gradients = {
    primary: "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600",
    secondary: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
    accent: "bg-gradient-to-r from-green-400 to-blue-500",
  };

  return (
    <span className={cn(
      "bg-clip-text text-transparent",
      gradients[gradient],
      className
    )}>
      {children}
    </span>
  );
}

// Responsive text sizing utilities
export function ResponsiveText({ 
  children, 
  className,
  size = "medium"
}: {
  children: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large" | "xl";
}) {
  const sizes = {
    small: "text-sm md:text-base",
    medium: "text-base md:text-lg",
    large: "text-lg md:text-xl lg:text-2xl",
    xl: "text-xl md:text-2xl lg:text-3xl xl:text-4xl",
  };

  return (
    <span className={cn(sizes[size], className)}>
      {children}
    </span>
  );
}

// Text with enhanced readability
export function ReadableText({ children, className }: TypographyProps) {
  return (
    <div className={cn(
      "prose prose-slate dark:prose-invert max-w-none",
      "prose-headings:font-display prose-headings:tracking-tight",
      "prose-lead:text-foreground/80",
      "prose-a:font-medium prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
      "prose-strong:font-semibold prose-strong:text-foreground",
      "prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm",
      "prose-pre:bg-zinc-950 prose-pre:border",
      className
    )}>
      {children}
    </div>
  );
}

// Typography scale display (for documentation)
export function TypographyScale() {
  return (
    <div className="space-y-8 p-8">
      <div className="space-y-4">
        <Caption>Display</Caption>
        <DisplayLarge>Display Large - Hero Headlines</DisplayLarge>
        <DisplayMedium>Display Medium - Major Sections</DisplayMedium>
      </div>
      
      <div className="space-y-4">
        <Caption>Titles</Caption>
        <TitleLarge>Title Large - Section Headers</TitleLarge>
        <TitleMedium>Title Medium - Subsection Headers</TitleMedium>
      </div>
      
      <div className="space-y-4">
        <Caption>Headlines</Caption>
        <Headline>Headline - Content Headers</Headline>
      </div>
      
      <div className="space-y-4">
        <Caption>Body Text</Caption>
        <BodyLarge>Body Large - Emphasized content and introductions</BodyLarge>
        <BodyMedium>Body Medium - Standard paragraph text for reading</BodyMedium>
        <BodySmall>Body Small - Secondary information and captions</BodySmall>
      </div>
      
      <div className="space-y-4">
        <Caption>Labels & Code</Caption>
        <Label>Label Text</Label>
        <div><CodeInline>inline code</CodeInline></div>
      </div>
      
      <div className="space-y-4">
        <Caption>Gradient Effects</Caption>
        <GradientText gradient="primary" className="text-2xl font-bold">
          Primary Gradient Text
        </GradientText>
        <GradientText gradient="secondary" className="text-2xl font-bold">
          Secondary Gradient Text
        </GradientText>
      </div>
    </div>
  );
}