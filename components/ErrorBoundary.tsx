/**
 * Enhanced Error boundary component for production-ready error handling
 */

'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logError } from '@/utils';
import { errorMonitor } from '@/utils/oss-monitoring';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorId?: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorId: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log locally
    logError(error, 'ErrorBoundary');

    // Send to monitoring service
    errorMonitor.captureError(error, {
      component: 'ErrorBoundary',
      componentStack: errorInfo.componentStack,
      errorBoundary: this.constructor.name,
      errorId: this.state.errorId,
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      timestamp: new Date().toISOString(),
    });

    // Call custom error handler
    this.props.onError?.(error, errorInfo);

    // In development, log to console for debugging
    if (process.env['NODE_ENV'] === 'development') {
      console.group('🚨 React Error Boundary Caught An Error');
      console.error('Error:', error);
      console.error('Component Stack:', errorInfo.componentStack);
      console.groupEnd();
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorId: undefined });
  };

  private handleReportIssue = () => {
    if (!this.state.error || !this.state.errorId) {
      return;
    }

    const issueUrl =
      `https://github.com/tuliopc23/Liquidify-docs/issues/new?` +
      `title=${encodeURIComponent(`Bug: ${this.state.error.message}`)}&` +
      `body=${encodeURIComponent(`
## Error Report

**Error ID:** ${this.state.errorId}
**Error Message:** ${this.state.error.message}
**Stack Trace:**
\`\`\`
${this.state.error.stack || 'No stack trace available'}
\`\`\`

**Browser:** ${navigator.userAgent}
**URL:** ${window.location.href}
**Timestamp:** ${new Date().toISOString()}

## Steps to Reproduce
Please describe what you were doing when this error occurred.

## Expected Behavior
What should have happened instead?
      `)}&` +
      `labels=bug,error-boundary`;

    window.open(issueUrl, '_blank');
  };

  public override render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className='min-h-[400px] flex items-center justify-center p-8 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800'>
            <div className='text-center max-w-md'>
              <div className='mb-4'>
                <svg
                  className='mx-auto h-12 w-12 text-red-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
                  />
                </svg>
              </div>

              <h2 className='text-xl font-semibold mb-2 text-red-800 dark:text-red-200'>
                Something went wrong
              </h2>

              <p className='text-red-600 dark:text-red-300 mb-4'>
                We&apos;re sorry, but something unexpected happened. This error
                has been automatically reported to help us fix the issue.
              </p>

              {process.env['NODE_ENV'] === 'development' &&
                this.state.error && (
                  <details className='mb-4 text-left'>
                    <summary className='cursor-pointer text-sm font-medium text-red-700 dark:text-red-300 mb-2'>
                      Error Details (Development)
                    </summary>
                    <pre className='text-xs bg-red-100 dark:bg-red-900/20 p-2 rounded overflow-auto max-h-32'>
                      {this.state.error.stack}
                    </pre>
                  </details>
                )}

              <div className='flex flex-col sm:flex-row gap-2 justify-center'>
                <button
                  onClick={this.handleRetry}
                  className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors'
                >
                  Try Again
                </button>

                <button
                  onClick={this.handleReportIssue}
                  className='px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors'
                >
                  Report Issue
                </button>

                <button
                  onClick={() => window.location.reload()}
                  className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'
                >
                  Reload Page
                </button>
              </div>

              {this.state.errorId && (
                <p className='mt-4 text-xs text-gray-500'>
                  Error ID: {this.state.errorId}
                </p>
              )}
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
