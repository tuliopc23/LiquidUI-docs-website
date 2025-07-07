import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://27ec06c11495472d753e86cb2c3497cb@o4509625186385920.ingest.us.sentry.io/4509625186516992",

  // Environment-based configuration
  environment: process.env.NODE_ENV || "production",
  
  // Adds request headers and IP for users
  sendDefaultPii: true,

  // Performance monitoring - optimized for edge runtime
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,
  
  // Custom sampler for edge runtime
  tracesSampler: (samplingContext) => {
    const { name, parentSampled } = samplingContext;
    
    // Always sample if parent is sampled (for distributed tracing)
    if (parentSampled) {
      return true;
    }

    // Sample all transactions in development
    if (process.env.NODE_ENV === 'development') {
      return 1.0;
    }

    // Skip middleware for static assets
    if (name?.includes('/_next/') || name?.includes('/favicon')) {
      return 0;
    }

    // Higher sampling for API routes
    if (name?.includes('/api/')) {
      return 0.2;
    }

    // Sample 10% in production for other requests
    if (process.env.NODE_ENV === 'production') {
      return 0.1;
    }

    // Sample 20% in staging
    return 0.2;
  },

  // Enable logs to be sent to Sentry
  _experiments: { 
    enableLogs: true 
  },

  // Release and environment configuration
  release: process.env.SENTRY_RELEASE,

  // Configure trace propagation
  tracePropagationTargets: [
    "localhost",
    /^https:\/\/liquidify-docs\.vercel\.app/,
    /^\/api\//,
  ],

  // Error filtering for edge runtime
  beforeSend(event) {
    // Filter out certain errors in production
    if (process.env.NODE_ENV === 'production') {
      // Skip network errors common in edge runtime
      if (event.exception?.values?.[0]?.value?.includes('fetch')) {
        return null;
      }
    }
    
    return event;
  },

  // Transaction filtering for edge runtime
  beforeSendTransaction(event) {
    // Filter out low-value transactions in production
    if (process.env.NODE_ENV === 'production') {
      // Skip very fast transactions
      if (event.spans && event.start_timestamp && event.timestamp) {
        const duration = (event.timestamp - event.start_timestamp) * 1000;
        if (duration < 5) { // Skip transactions under 5ms
          return null;
        }
      }
    }
    return event;
  },
});
