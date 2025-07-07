import * as Sentry from "@sentry/nextjs";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://27ec06c11495472d753e86cb2c3497cb@o4509625186385920.ingest.us.sentry.io/4509625186516992",

  // Environment-based configuration
  environment: process.env.NODE_ENV || "production",
  
  // Adds request headers and IP for users
  sendDefaultPii: true,

  // Performance monitoring - optimized for production
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,
  
  // Custom sampler for server-side transactions
  tracesSampler: (samplingContext) => {
    const { name, parentSampled, transactionContext } = samplingContext;
    
    // Always sample if parent is sampled (for distributed tracing)
    if (parentSampled) {
      return true;
    }

    // Sample all transactions in development
    if (process.env.NODE_ENV === 'development') {
      return 1.0;
    }

    // Skip health check and static asset requests in production
    if (name?.includes('/health') || name?.includes('/_next/static')) {
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

  // Profiling configuration - optimized for production
  profilesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,

  integrations: [
    // Add profiling integration
    nodeProfilingIntegration(),
    
    // Console logging integration
    Sentry.consoleLoggingIntegration({ 
      levels: ["error", "warn"] // Only capture errors and warnings in production
    }),
  ],

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

  // Error filtering for server-side
  beforeSend(event) {
    // Filter out certain errors in production
    if (process.env.NODE_ENV === 'production') {
      // Skip ECONNRESET errors (common in serverless environments)
      if (event.exception?.values?.[0]?.value?.includes('ECONNRESET')) {
        return null;
      }
      
      // Skip timeout errors from external services
      if (event.exception?.values?.[0]?.value?.includes('timeout')) {
        return null;
      }
    }
    
    return event;
  },

  // Transaction filtering for server-side
  beforeSendTransaction(event) {
    // Filter out low-value transactions in production
    if (process.env.NODE_ENV === 'production') {
      // Skip very fast transactions (likely health checks)
      if (event.spans && event.start_timestamp && event.timestamp) {
        const duration = (event.timestamp - event.start_timestamp) * 1000;
        if (duration < 10) { // Skip transactions under 10ms
          return null;
        }
      }
    }
    return event;
  },

  // Transport options for better reliability
  transportOptions: {
    // Add retry logic for failed requests
    beforeSend: (envelope) => {
      return envelope;
    },
  },
});
