/**
 * ============================================
 * SENTRY - ERROR TRACKING (EDGE)
 * ============================================
 * 
 * Monitoreo de errores en Edge Runtime (middleware, edge API routes)
 */

import * as Sentry from '@sentry/nextjs';

// Solo inicializar si hay DSN configurado
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    environment: process.env.NODE_ENV || 'development',

    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    enabled: process.env.NODE_ENV === 'production',
  });
}

