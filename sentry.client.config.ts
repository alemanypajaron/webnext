/**
 * ============================================
 * SENTRY - ERROR TRACKING (CLIENT)
 * ============================================
 * 
 * Monitoreo de errores en el navegador
 * 
 * CONFIGURACIÓN REQUERIDA:
 * - Crear proyecto en https://sentry.io
 * - Obtener DSN del proyecto
 * - Añadir a .env.local: NEXT_PUBLIC_SENTRY_DSN=tu-dsn
 * - Añadir a Vercel Environment Variables
 * 
 * OPCIONAL (desactiva si no quieres Sentry):
 * - Comentar este archivo completo
 * - Comentar sentry.server.config.ts
 * - Comentar sentry.edge.config.ts
 */

import * as Sentry from '@sentry/nextjs';

// Solo inicializar si hay DSN configurado
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Nombre del entorno
    environment: process.env.NODE_ENV || 'development',

    // Sample rate (% de errores a enviar)
    // 1.0 = 100%, 0.1 = 10%
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    // No enviar errores locales (opcional)
    enabled: process.env.NODE_ENV === 'production',

    // Integrations
    integrations: [
      // Web Vitals monitoring
      Sentry.browserTracingIntegration({
        enableLongTask: true,
        enableInp: true,
      }),
      // Replay sessions (opcional, consume créditos)
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // Replay sampling
    replaysSessionSampleRate: 0.1, // 10% de sesiones
    replaysOnErrorSampleRate: 1.0, // 100% si hay error

    // Filtrar URLs sensibles
    beforeSend(event) {
      // No enviar errores del admin
      if (event.request?.url?.includes('/administrator')) {
        return null;
      }
      return event;
    },

    // Ignorar errores conocidos
    ignoreErrors: [
      // Errores del navegador
      'Non-Error promise rejection captured',
      'ResizeObserver loop limit exceeded',
      // Errores de extensiones de Chrome
      'chrome-extension://',
      'moz-extension://',
    ],
  });
}


