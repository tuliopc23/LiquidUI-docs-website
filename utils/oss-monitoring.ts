/**
 * Lightweight error monitoring for OSS projects
 * Uses free Sentry tier and graceful degradation
 */

import { logError } from '@/utils';

interface ErrorReport {
  message: string;
  stack?: string;
  componentStack?: string;
  url: string;
  userAgent: string;
  timestamp: string;
}

class OSSSentryClient {
  private dsn: string | null;
  private enabled: boolean;

  constructor() {
    this.dsn = process.env['SENTRY_DSN'] || null;
    this.enabled = process.env['NODE_ENV'] === 'production' && !!this.dsn;
  }

  captureError(error: Error, context?: Record<string, unknown>) {
    if (!this.enabled) {
      logError(error, context?.['component'] as string | undefined);
      return;
    }

    const report: ErrorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: context?.['componentStack'] as string | undefined,
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      timestamp: new Date().toISOString(),
    };

    // Send to Sentry free tier (5,000 errors/month)
    this.sendToSentry(report, context);
  }

  private async sendToSentry(
    report: ErrorReport,
    context?: Record<string, unknown>
  ) {
    try {
      // Simple fetch-based Sentry integration for minimal bundle size
      await fetch(`https://sentry.io/api/${this.extractProjectId()}/store/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Sentry-Auth': this.getSentryAuth(),
        },
        body: JSON.stringify({
          message: report.message,
          level: 'error',
          platform: 'javascript',
          timestamp: report.timestamp,
          exception: {
            values: [
              {
                type: 'Error',
                value: report.message,
                stacktrace: { frames: this.parseStackTrace(report.stack) },
              },
            ],
          },
          extra: context,
          tags: {
            component: context?.['component'] || 'unknown',
            library: 'liquidify',
            version: process.env['NEXT_PUBLIC_APP_VERSION'],
          },
        }),
      });
    } catch {
      // Silently fail - don't break the app for monitoring
      console.warn('Failed to send error to Sentry');
    }
  }

  private extractProjectId(): string {
    if (!this.dsn) return '';
    const match = this.dsn.match(/\/\/(.+)@(.+)\/(.+)/);
    return match ? match[3] || '' : '';
  }

  private getSentryAuth(): string {
    if (!this.dsn) return '';
    const match = this.dsn.match(/\/\/(.+)@/);
    const key = match ? match[1] : '';
    return `Sentry sentry_version=7, sentry_key=${key}`;
  }

  private parseStackTrace(stack?: string) {
    if (!stack) return [];
    return stack
      .split('\n')
      .filter(line => line.trim())
      .map(line => ({ filename: 'unknown', function: line.trim() }));
  }
}

// Export singleton instance
export const errorMonitor = new OSSSentryClient();

// GitHub Issues integration for community feedback
export function createGitHubIssue(
  type: 'bug' | 'feature' | 'question',
  details: {
    title: string;
    description: string;
    component?: string;
    version?: string;
  }
) {
  const { title, description, component, version } = details;
  const labels =
    type === 'bug' ? 'bug' : type === 'feature' ? 'enhancement' : 'question';

  const body = `
## ${type === 'bug' ? 'Bug Report' : type === 'feature' ? 'Feature Request' : 'Question'}

### Description
${description}

${
  component
    ? `### Component
${component}`
    : ''
}

### Environment
- Liquidify version: ${version || process.env['NEXT_PUBLIC_LIQUIDIFY_VERSION']}
- Browser: ${typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'}
- OS: ${typeof navigator !== 'undefined' ? navigator.platform : 'Unknown'}

### Additional Context
Please add any additional context or screenshots.
  `.trim();

  const url = new URL('https://github.com/tuliopc23/Liquidify-docs/issues/new');
  url.searchParams.set('title', title);
  url.searchParams.set('body', body);
  url.searchParams.set('labels', labels);

  return url.toString();
}
