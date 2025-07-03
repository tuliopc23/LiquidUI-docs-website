import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Additional meta tags for better accessibility */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="color-scheme" content="dark light" />
        
        {/* Preload critical fonts */}
        <link 
          rel="preload" 
          href="/fonts/inter.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        
        {/* Banner height tracker script for SSR-safe positioning */}
        <script
          src="/scripts/banner-height-tracker.js"
          defer
        />
        
        {/* Inline critical CSS for banner positioning to prevent layout shift */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical banner positioning styles */
            .nx-banner,
            [data-nextra-banner] {
              position: sticky !important;
              top: 0 !important;
              z-index: 60 !important;
              width: 100% !important;
              backdrop-filter: blur(20px) !important;
              -webkit-backdrop-filter: blur(20px) !important;
            }
            
            /* Prevent layout shift during banner height calculation */
            .nextra-nav-container {
              top: var(--banner-height, 0px) !important;
            }
          `
        }} />
      </Head>
      <body>
        {/* Screen reader announcement for dynamic content */}
        <div id="live-region" aria-live="polite" aria-atomic="true" className="sr-only"></div>
        
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
