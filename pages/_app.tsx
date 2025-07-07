import React from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import '../styles/globals.css'
import { SmoothScroll } from '../components/SmoothScroll'
import { LazyOptimizedMotion, usePerformanceOptimization } from '../components/PerformanceOptimizer'
import { WebVitalsMonitor } from '../components/WebVitalsMonitor'
import ErrorBoundary from '../components/ErrorBoundary'

function AppContent({ Component, pageProps }: AppProps) {
    // Temporarily disable performance optimization in development
    if (process.env.NODE_ENV !== 'development') {
        usePerformanceOptimization();
    }

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {process.env.NODE_ENV === 'development' ? (
                // Simplified version for development
                <div className="min-h-screen bg-background text-foreground">
                    <div id="main-content" tabIndex={-1}>
                        <ErrorBoundary>
                            <Component {...pageProps} />
                        </ErrorBoundary>
                    </div>
                </div>
            ) : (
                // Full version for production
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
                                <ErrorBoundary>
                                    <Component {...pageProps} />
                                </ErrorBoundary>
                                <WebVitalsMonitor />
                            </div>
                        </div>
                    </SmoothScroll>
                </LazyOptimizedMotion>
            )}
        </ThemeProvider>
    );
}

export default function App(props: AppProps) {
    return <AppContent {...props} />
}
