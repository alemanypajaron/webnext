/**
 * ============================================
 * RATE LIMITING - Anti-Spam para Formularios
 * ============================================
 * 
 * Sistema simple de rate limiting basado en IP
 * Sin dependencias externas (Redis, etc.)
 * Almacenamiento en memoria (reinicia con cada deploy)
 * 
 * Límites configurados:
 * - Contacto: 3 envíos por IP cada 10 minutos
 * - Presupuesto: 3 envíos por IP cada 10 minutos
 * - Newsletter: 2 suscripciones por IP cada hora
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// Almacenamiento en memoria
const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Limpia entradas expiradas cada 5 minutos
 */
function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Ejecutar limpieza cada 5 minutos
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupExpiredEntries, 5 * 60 * 1000);
}

/**
 * Verifica si una IP ha excedido el límite de rate
 * 
 * @param identifier - Identificador único (generalmente IP + tipo de formulario)
 * @param maxAttempts - Número máximo de intentos permitidos
 * @param windowMs - Ventana de tiempo en milisegundos
 * @returns {boolean} true si está permitido, false si excedió el límite
 */
export function checkRateLimit(
  identifier: string,
  maxAttempts: number = 5,
  windowMs: number = 10 * 60 * 1000 // 10 minutos por defecto
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // Si no existe entrada o ya expiró, crear nueva
  if (!entry || now > entry.resetTime) {
    const resetTime = now + windowMs;
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime,
    });
    return {
      allowed: true,
      remaining: maxAttempts - 1,
      resetTime,
    };
  }

  // Si ya excedió el límite
  if (entry.count >= maxAttempts) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  // Incrementar contador
  entry.count++;
  rateLimitStore.set(identifier, entry);

  return {
    allowed: true,
    remaining: maxAttempts - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Obtiene la IP del cliente desde los headers de la request
 * Soporta: Vercel, Cloudflare, proxies estándar
 */
export function getClientIP(headers: Headers): string {
  // Intentar obtener IP real del cliente
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIP = headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  const vercelIP = headers.get('x-vercel-forwarded-for');
  if (vercelIP) {
    return vercelIP;
  }

  // Fallback
  return 'unknown';
}

/**
 * Configuraciones predefinidas para cada tipo de formulario
 */
export const RATE_LIMITS = {
  CONTACTO: {
    maxAttempts: 3,
    windowMs: 10 * 60 * 1000, // 10 minutos
    message: 'Has enviado demasiados mensajes. Por favor, espera 10 minutos antes de intentar de nuevo.',
  },
  PRESUPUESTO: {
    maxAttempts: 3,
    windowMs: 10 * 60 * 1000, // 10 minutos
    message: 'Has enviado demasiadas solicitudes de presupuesto. Por favor, espera 10 minutos.',
  },
  NEWSLETTER: {
    maxAttempts: 2,
    windowMs: 60 * 60 * 1000, // 1 hora
    message: 'Has intentado suscribirte demasiadas veces. Por favor, espera 1 hora.',
  },
} as const;

/**
 * Formatea el tiempo restante de forma legible
 */
export function formatTimeRemaining(resetTime: number): string {
  const now = Date.now();
  const remaining = Math.ceil((resetTime - now) / 1000 / 60); // minutos
  
  if (remaining < 1) {
    return 'menos de 1 minuto';
  } else if (remaining === 1) {
    return '1 minuto';
  } else if (remaining < 60) {
    return `${remaining} minutos`;
  } else {
    const hours = Math.ceil(remaining / 60);
    return hours === 1 ? '1 hora' : `${hours} horas`;
  }
}


