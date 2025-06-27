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
