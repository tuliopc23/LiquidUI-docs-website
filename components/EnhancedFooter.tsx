import React from 'react';
import Link from 'next/link';
import { GlassComponent } from './GlassComponentBase';
import { MagneticElement, LiquidBlob } from './AnimationSystem';

export function EnhancedFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative mt-auto">
      <GlassComponent className="border-t border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Liquidify</h3>
              <p className="text-sm text-gray-400">
                Modern React component library with glassmorphic design
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/docs" className="hover:text-primary-400 transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/components" className="hover:text-primary-400 transition-colors">
                    Components
                  </Link>
                </li>
                <li>
                  <Link href="/examples" className="hover:text-primary-400 transition-colors">
                    Examples
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://github.com/tuliopc23/liquidify" className="hover:text-primary-400 transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/liquidify" className="hover:text-primary-400 transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="https://discord.gg/liquidify" className="hover:text-primary-400 transition-colors">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
            <p>&copy; {currentYear} Liquidify. All rights reserved.</p>
          </div>
        </div>
      </GlassComponent>
      
      <MagneticElement strength={0.3}>
        <LiquidBlob 
          color="primary" 
          size="lg" 
          className="absolute -bottom-20 -right-20 opacity-30"
        />
      </MagneticElement>
    </footer>
  );
}