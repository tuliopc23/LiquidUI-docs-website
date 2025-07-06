import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { MagneticElement } from './AnimationSystem';

export function EnhancedNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { href: '/getting-started', label: 'Getting Started' },
    { href: '/components', label: 'Components' },
    { href: '/theming', label: 'Theming' },
    { href: '/api', label: 'API' },
  ];
  
  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-blur-lg bg-background/70 border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <MagneticElement strength={0.1}>
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">LiqUIdify</span>
            </Link>
          </MagneticElement>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <MagneticElement key={link.href} strength={0.1}>
                <Link 
                  href={link.href}
                  className={`text-sm transition-colors hover:text-primary ${
                    router.pathname.startsWith(link.href) 
                      ? 'text-primary font-medium' 
                      : 'text-foreground/80'
                  }`}
                >
                  {link.label}
                </Link>
              </MagneticElement>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </button>
            
            <MagneticElement strength={0.1}>
              <a 
                href="https://github.com/tuliopc23/Liquidify"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="GitHub"
              >
                <GitHubIcon className="w-5 h-5" />
              </a>
            </MagneticElement>
          </div>
        </div>
      </div>
    </header>
  );
}

// Simple icon components
function SunIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  );
}

function MoonIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  );
}

function GitHubIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  );
}