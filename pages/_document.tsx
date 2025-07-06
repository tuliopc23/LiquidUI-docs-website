import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Additional meta tags for better accessibility */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="color-scheme" content="dark light" />

        {/* Google Fonts - Inter for body, JetBrains Mono for code */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
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
