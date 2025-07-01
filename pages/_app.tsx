import React from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import '../styles/globals.css'
import { SmoothScroll } from '../components/SmoothScroll'
import { LazyOptimizedMotion, usePerformanceOptimization } from '../components/PerformanceOptimizer'

function AppContent({ Component, pageProps }: AppProps) {
    usePerformanceOptimization();

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <LazyOptimizedMotion>
                <SmoothScroll>
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
                </SmoothScroll>
            </LazyOptimizedMotion>
        </ThemeProvider>
    );
}

export default function App(props: AppProps) {
    return <AppContent {...props} />
}
