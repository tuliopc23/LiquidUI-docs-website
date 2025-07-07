/**
 * Global Sentry Configuration Utility
 * 
 * This file provides reusable Sentry configuration functions that can be used
 * across multiple projects. While Sentry requires project-specific initialization,
 * this utility provides standardized configuration patterns.
 * 
 * Usage:
 * import { createSentryConfig } from './sentry.global.config.js';
 * 
 * const config = createSentryConfig({
 *   dsn: 'your-dsn',
 *   environment: 'production',
 *   projectName: 'your-project'
 * });
 */

/**
 * Create optimized Sentry configuration for client-side
 */
export function createClientConfig({
  dsn,
  environment = 'production',
  projectName = 'app',
  domain = 'localhost',
  enableReplay = true,
  enableFeedback = true,
}) {
  return {
    dsn,
    environment,
    sendDefaultPii: true,
    
    // Environment-based sampling
    tracesSampleRate: environment === 'development' ? 1.0 : 0.1,
    
    tracesSampler: (samplingContext) => {
      if (environment === 'development') return 1.0;
      if (environment === 'production') return 0.1;
      return 0.2; // staging
    },

    integrations: [
      // Always include browser tracing
      typeof window !== 'undefined' && window.Sentry?.browserTracingIntegration?.({
        interactionsSampleRate: 0.5,
      }),
      
      // Conditional replay integration
      enableReplay && typeof window !== 'undefined' && window.Sentry?.replayIntegration?.({
        networkDetailAllowUrls: [
          window.location?.origin,
          new RegExp(`^https://${domain.replace(/\./g, '\\.')}`),
        ],
        networkCaptureBodies: false,
        networkRequestHeaders: ['Authorization', 'Content-Type'],
        networkResponseHeaders: ['Content-Type', 'Cache-Control'],
      }),
      
      // Conditional feedback integration
      enableFeedback && typeof window !== 'undefined' && window.Sentry?.feedbackIntegration?.({
        colorScheme: "system",
        showBranding: false,
      }),
    ].filter(Boolean),

    // Session replay configuration
    replaysSessionSampleRate: environment === 'development' ? 1.0 : 0.1,
    replaysOnErrorSampleRate: 1.0,

    // Enable experimental features
    _experiments: { 
      enableLogs: true 
    },

    // Configure trace propagation
    tracePropagationTargets: [
      "localhost",
      new RegExp(`^https://${domain.replace(/\./g, '\\.')}`),
      /^\/api\//,
    ],

    // Release configuration
    release: process.env.SENTRY_RELEASE,

    // Error filtering
    beforeSend(event) {
      if (environment === 'development') {
        // Skip development-only errors
        if (event.exception?.values?.[0]?.value?.includes('ChunkLoadError')) {
          return null;
        }
      }
      return event;
    },

    // Transaction filtering
    beforeSendTransaction(event) {
      if (environment === 'production') {
        // Skip very fast transactions
        if (event.spans && event.start_timestamp && event.timestamp) {
          const duration = (event.timestamp - event.start_timestamp) * 1000;
          if (duration < 50) return null;
        }
      }
      return event;
    },
  };
}

/**
 * Create optimized Sentry configuration for server-side
 */
export function createServerConfig({
  dsn,
  environment = 'production',
  projectName = 'app',
  domain = 'localhost',
  enableProfiling = true,
}) {
  return {
    dsn,
    environment,
    sendDefaultPii: true,
    
    // Environment-based sampling
    tracesSampleRate: environment === 'development' ? 1.0 : 0.1,
    
    tracesSampler: (samplingContext) => {
      const { name, parentSampled } = samplingContext;
      
      // Always sample if parent is sampled
      if (parentSampled) return true;
      
      if (environment === 'development') return 1.0;
      
      // Skip health checks and static assets
      if (name?.includes('/health') || name?.includes('/_next/static')) {
        return 0;
      }
      
      // Higher sampling for API routes
      if (name?.includes('/api/')) return 0.2;
      
      if (environment === 'production') return 0.1;
      return 0.2; // staging
    },

    // Profiling configuration
    profilesSampleRate: environment === 'development' ? 1.0 : 0.1,

    integrations: [
      // Console logging integration
      typeof process !== 'undefined' && {
        name: 'ConsoleLogging',
        setup(client) {
          // Dynamically import and setup console logging
        }
      },
    ].filter(Boolean),

    // Enable experimental features
    _experiments: { 
      enableLogs: true 
    },

    // Release configuration
    release: process.env.SENTRY_RELEASE,

    // Configure trace propagation
    tracePropagationTargets: [
      "localhost",
      new RegExp(`^https://${domain.replace(/\./g, '\\.')}`),
      /^\/api\//,
    ],

    // Server-side error filtering
    beforeSend(event) {
      if (environment === 'production') {
        // Skip common serverless errors
        if (event.exception?.values?.[0]?.value?.includes('ECONNRESET')) {
          return null;
        }
        if (event.exception?.values?.[0]?.value?.includes('timeout')) {
          return null;
        }
      }
      return event;
    },

    // Server-side transaction filtering
    beforeSendTransaction(event) {
      if (environment === 'production') {
        // Skip very fast transactions
        if (event.spans && event.start_timestamp && event.timestamp) {
          const duration = (event.timestamp - event.start_timestamp) * 1000;
          if (duration < 10) return null;
        }
      }
      return event;
    },
  };
}

/**
 * Create optimized Sentry configuration for edge runtime
 */
export function createEdgeConfig({
  dsn,
  environment = 'production',
  projectName = 'app',
  domain = 'localhost',
}) {
  return {
    dsn,
    environment,
    sendDefaultPii: true,
    
    // Environment-based sampling
    tracesSampleRate: environment === 'development' ? 1.0 : 0.1,
    
    tracesSampler: (samplingContext) => {
      const { name, parentSampled } = samplingContext;
      
      // Always sample if parent is sampled
      if (parentSampled) return true;
      
      if (environment === 'development') return 1.0;
      
      // Skip middleware for static assets
      if (name?.includes('/_next/') || name?.includes('/favicon')) {
        return 0;
      }
      
      // Higher sampling for API routes
      if (name?.includes('/api/')) return 0.2;
      
      if (environment === 'production') return 0.1;
      return 0.2; // staging
    },

    // Enable experimental features
    _experiments: { 
      enableLogs: true 
    },

    // Release configuration
    release: process.env.SENTRY_RELEASE,

    // Configure trace propagation
    tracePropagationTargets: [
      "localhost",
      new RegExp(`^https://${domain.replace(/\./g, '\\.')}`),
      /^\/api\//,
    ],

    // Edge runtime error filtering
    beforeSend(event) {
      if (environment === 'production') {
        // Skip network errors common in edge runtime
        if (event.exception?.values?.[0]?.value?.includes('fetch')) {
          return null;
        }
      }
      return event;
    },

    // Edge runtime transaction filtering
    beforeSendTransaction(event) {
      if (environment === 'production') {
        // Skip very fast transactions
        if (event.spans && event.start_timestamp && event.timestamp) {
          const duration = (event.timestamp - event.start_timestamp) * 1000;
          if (duration < 5) return null;
        }
      }
      return event;
    },
  };
}

/**
 * Create Sentry webpack plugin configuration for Next.js
 */
export function createWebpackConfig({
  org,
  project,
  authToken,
  projectName = 'app',
  silent = true,
}) {
  return {
    org: org || process.env.SENTRY_ORG,
    project: project || process.env.SENTRY_PROJECT,
    authToken: authToken || process.env.SENTRY_AUTH_TOKEN,
    
    // Only print logs for uploading source maps in CI
    silent: silent && !process.env.CI,
    
    // Automatically tree-shake Sentry logger statements
    disableLogger: true,
    
    // Source maps configuration
    sourcemaps: {
      widenClientFileUpload: true,
      deleteSourcemapsAfterUpload: true,
    },
    
    // Exclude health check routes
    excludeServerRoutes: [
      '/health',
      '/api/health',
    ],
    
    // Advanced options
    unstable_sentryWebpackPluginOptions: {
      applicationKey: projectName,
    },
  };
}

/**
 * Environment detection utility
 */
export function getEnvironment() {
  if (typeof window !== 'undefined') {
    // Client-side detection
    return window.location.hostname === 'localhost' ? 'development' : 'production';
  }
  
  // Server-side detection
  return process.env.NODE_ENV || 'production';
}

/**
 * Helper to create complete Sentry setup for a project
 */
export function createProjectSentryConfig({
  dsn,
  projectName,
  domain,
  org,
  project,
  authToken,
  environment,
}) {
  const env = environment || getEnvironment();
  
  return {
    client: createClientConfig({ dsn, environment: env, projectName, domain }),
    server: createServerConfig({ dsn, environment: env, projectName, domain }),
    edge: createEdgeConfig({ dsn, environment: env, projectName, domain }),
    webpack: createWebpackConfig({ org, project, authToken, projectName }),
  };
}
