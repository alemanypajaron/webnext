/**
 * ============================================
 * SENTRY - ERROR TRACKING (SERVER)
 * ============================================
 * 
 * Monitoreo de errores en el servidor Node.js
 */

import * as Sentry from '@sentry/nextjs';

// Solo inicializar si hay DSN configurado
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    environment: process.env.NODE_ENV || 'development',

    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    enabled: process.env.NODE_ENV === 'production',

    // Filtrar URLs sensibles
    beforeSend(event) {
      // No enviar errores del admin
      if (event.request?.url?.includes('/administrator')) {
        return null;
      }
      return event;
    },

    // Ignorar errores de Supabase (ya tienen su propio tracking)
    ignoreErrors: [
      'SupabaseAuthError',
      'AuthApiError',
    ],
  });
}

