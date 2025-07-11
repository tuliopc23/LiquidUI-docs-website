/**
 * Lightweight analytics for OSS projects
 * Uses free tiers and privacy-focused tracking
 */

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

class OSSAnalytics {
  private enabled: boolean;
  private vercelAnalyticsId: string | null;
  private googleAnalyticsId: string | null;

  constructor() {
    this.enabled = process.env.NODE_ENV === 'production' &&
                  process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';
    this.vercelAnalyticsId = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID || null;
    this.googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || null;
  }

  // Track component usage for understanding popular components
  trackComponentUsage(componentName: string, action: 'view' | 'interact' | 'copy_code') {
    if (!this.enabled) return;

    this.track('component_usage', {
      component: componentName,
      action,
      library_version: process.env.NEXT_PUBLIC_LIQUIDIFY_VERSION,
    });
  }

  // Track documentation engagement
  trackDocumentationUsage(page: string, action: 'visit' | 'search' | 'copy_code') {
    if (!this.enabled) return;

    this.track('documentation_usage', {
      page,
      action,
      docs_version: process.env.NEXT_PUBLIC_DOCS_VERSION,
    });
  }

  // Track GitHub repository interactions
  trackGitHubInteraction(action: 'star' | 'fork' | 'issue' | 'download') {
    if (!this.enabled) return;

    this.track('github_interaction', {
      action,
      repository: 'liquidify',
    });
  }

  // Generic event tracking
  private track(eventName: string, properties?: Record<string, any>) {
    // Vercel Analytics (free tier: 2,500 events/month)
    if (this.vercelAnalyticsId && typeof window !== 'undefined') {
      (window as any).va?.track(eventName, properties);
    }

    // Google Analytics (free, unlimited)
    if (this.googleAnalyticsId && typeof window !== 'undefined') {
      (window as any).gtag?.('event', eventName, properties);
    }

    // Privacy-focused alternative: Plausible (optional)
    if (process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && typeof window !== 'undefined') {
      (window as any).plausible?.(eventName, { props: properties });
    }
  }

  // Performance monitoring for Core Web Vitals
  reportWebVitals(metric: { name: string; value: number; id: string }) {
    if (!this.enabled) return;

    this.track('web_vitals', {
      metric_name: metric.name,
      metric_value: metric.value,
      metric_id: metric.id,
    });

    // Send to custom endpoint if configured
    const endpoint = process.env.NEXT_PUBLIC_WEB_VITALS_ENDPOINT;
    if (endpoint) {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metric),
      }).catch(() => {
        // Silently fail
      });
    }
  }
}

export const analytics = new OSSAnalytics();

// Web Vitals reporting function for Next.js
export function reportWebVitals(metric: any) {
  analytics.reportWebVitals(metric);
}

// Hook for easy component tracking
export function useAnalytics() {
  return {
    trackComponentUsage: analytics.trackComponentUsage.bind(analytics),
    trackDocumentationUsage: analytics.trackDocumentationUsage.bind(analytics),
    trackGitHubInteraction: analytics.trackGitHubInteraction.bind(analytics),
  };
}
