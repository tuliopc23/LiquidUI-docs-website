import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://27ec06c11495472d753e86cb2c3497cb@o4509625186385920.ingest.us.sentry.io/4509625186516992",

  // Environment-based configuration
  environment: process.env.NODE_ENV || "production",
  
  // Adds request headers and IP for users
  sendDefaultPii: true,

  // Performance monitoring - optimized for production
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,
  
  // Custom sampler for more control
  tracesSampler: (samplingContext) => {
    // Sample all transactions in development
    if (process.env.NODE_ENV === 'development') {
      return 1.0;
    }

    // Sample 10% in production
    if (process.env.NODE_ENV === 'production') {
      return 0.1;
    }

    // Sample 20% in staging
    return 0.2;
  },

  integrations: [
    // Browser tracing for client-side performance
    Sentry.browserTracingIntegration({
      // Configure interaction sample rate for INP spans
      interactionsSampleRate: 0.5,
    }),
    
    // Session replay - optimized sampling
    Sentry.replayIntegration({
      // Capture network request/response bodies and headers
      networkDetailAllowUrls: [
        window.location.origin,
        /^https:\/\/liquidify-docs\.vercel\.app/,
      ],
      // Opt-out of capturing bodies for privacy
      networkCaptureBodies: false,
      // Custom headers to capture
      networkRequestHeaders: ['Authorization', 'Content-Type'],
      networkResponseHeaders: ['Content-Type', 'Cache-Control'],
    }),
    
    // User feedback integration
    Sentry.feedbackIntegration({
      colorScheme: "system",
      showBranding: false,
    }),
  ],

  // Session replay configuration - optimized for production
  replaysSessionSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Enable logs to be sent to Sentry
  _experiments: { 
    enableLogs: true 
  },

  // Configure trace propagation
  tracePropagationTargets: [
    "localhost",
    /^https:\/\/liquidify-docs\.vercel\.app/,
    /^\/api\//,
  ],

  // Release and environment configuration
  release: process.env.SENTRY_RELEASE,

  // Error filtering
  beforeSend(event) {
    // Filter out errors in development that aren't useful
    if (process.env.NODE_ENV === 'development') {
      // Skip certain development-only errors
      if (event.exception?.values?.[0]?.value?.includes('ChunkLoadError')) {
        return null;
      }
    }
    return event;
  },

  // Transaction filtering
  beforeSendTransaction(event) {
    // Filter out low-value transactions in production
    if (process.env.NODE_ENV === 'production') {
      // Skip very fast transactions (likely not interesting)
      if (event.spans && event.start_timestamp && event.timestamp) {
        const duration = (event.timestamp - event.start_timestamp) * 1000;
        if (duration < 50) { // Skip transactions under 50ms
          return null;
        }
      }
    }
    return event;
  },
});

// Export router transition capture for Next.js App Router
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
