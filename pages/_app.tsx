import React from 'react'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Skip link for keyboard navigation */}
            <a
                href="#main-content"
                className="skip-link focus:top-6"
                tabIndex={1}
            >
                Skip to main content
            </a>
            
            <div id="main-content" tabIndex={-1}>
                <Component {...pageProps} />
            </div>
        </div>
    )
}
