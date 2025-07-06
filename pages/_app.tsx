import React from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import '../styles/globals.css'
import ErrorBoundary from '../components/ErrorBoundary'
import { AnimationProvider } from '../components/AnimationProvider'

function AppContent({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <AnimationProvider>
                <div className="min-h-screen bg-background text-foreground">
                    {/* Skip link for keyboard navigation */}
                    <a
                        href="#main-content"
                        className="sr-only focus:not-sr-only focus:absolute focus:top-6 focus:left-6 z-50 bg-blue-600 text-white px-4 py-2 rounded-md"
                        tabIndex={1}
                    >
                        Skip to main content
                    </a>

                    <div id="main-content" tabIndex={-1}>
                        <ErrorBoundary>
                            <Component {...pageProps} />
                        </ErrorBoundary>
                    </div>
                </div>
            </AnimationProvider>
        </ThemeProvider>
    );
}

export default function App(props: AppProps) {
    return <AppContent {...props} />
}
