import React from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import '../styles/globals.css'
// Note: liquidify CSS import - CSS file is missing from package, using inline styles
// import 'liquidify/css'
import { SmoothScroll } from '../components/SmoothScroll'
import { LazyOptimizedMotion, usePerformanceOptimization } from '../components/PerformanceOptimizer'
import { WebVitalsMonitor } from '../components/WebVitalsMonitor'
import ErrorBoundary from '../components/ErrorBoundary'
import { Inter, JetBrains_Mono, Manrope } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['300', '400', '500', '600', '700', '800', '900'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', weight: ['300', '400', '500', '600', '700', '800'] })

function AppContent({ Component, pageProps }: AppProps) {
    // Always call the hook, but let the hook itself handle development mode
    usePerformanceOptimization();

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {process.env.NODE_ENV === 'development' ? (
                // Simplified version for development
                <div 
                  className={`min-h-screen bg-background text-foreground ${inter.variable} ${jetbrainsMono.variable} ${manrope.variable}`}
                  style={{
                    fontFamily: 'var(--font-body)',
                    '--font-heading': `var(--font-manrope), ${manrope.style.fontFamily}`,
                    '--font-body': `var(--font-inter), ${inter.style.fontFamily}`,
                    '--font-mono': `var(--font-jetbrains-mono), ${jetbrainsMono.style.fontFamily}`
                  } as React.CSSProperties}
                >
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
                        <div 
                          className={`min-h-screen bg-background text-foreground ${inter.variable} ${jetbrainsMono.variable} ${manrope.variable}`}
                          style={{
                            fontFamily: 'var(--font-body)',
                            '--font-heading': `var(--font-manrope), ${manrope.style.fontFamily}`,
                            '--font-body': `var(--font-inter), ${inter.style.fontFamily}`,
                            '--font-mono': `var(--font-jetbrains-mono), ${jetbrainsMono.style.fontFamily}`
                          } as React.CSSProperties}
                        >
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
