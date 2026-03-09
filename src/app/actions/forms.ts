'use server';

import { headers } from 'next/headers';
import { supabase, type Contacto, type Presupuesto } from '@/lib/supabase';
import { checkRateLimit, getClientIP, RATE_LIMITS, formatTimeRemaining } from '@/lib/rate-limit';

// =====================================================
// Tipos para respuestas
// =====================================================

type FormResponse = {
  success: boolean;
  message: string;
  error?: string;
  whatsappUrl?: string;
};

// =====================================================
// Función auxiliar: Generar URL de WhatsApp
// =====================================================

const WHATSAPP_NUMBER = '34650075842'; // Tu número de WhatsApp con código de país

function generarWhatsAppContacto(datos: {
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
}): string {
  const mensaje = `*🏗 NUEVO CONTACTO WEB*

*Cliente:* ${datos.nombre}
*Email:* ${datos.email}
${datos.telefono ? `*Teléfono:* ${datos.telefono}` : ''}

*Mensaje:*
${datos.mensaje}

━━━━━━━━━━━━━━━
_Enviado desde alemanypajaron.es_`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

function generarWhatsAppPresupuesto(datos: {
  nombre: string;
  email: string;
  telefono: string;
  tipo_proyecto: string;
  ubicacion?: string;
  presupuesto_estimado?: string;
  fecha_inicio_estimada?: string;
  descripcion: string;
}): string {
  const mensaje = `*🏗 NUEVA SOLICITUD DE PRESUPUESTO*

*Cliente:* ${datos.nombre}
*Email:* ${datos.email}
*Teléfono:* ${datos.telefono}

*Tipo:* ${datos.tipo_proyecto}
${datos.ubicacion ? `*Ubicación:* ${datos.ubicacion}` : ''}
${datos.presupuesto_estimado ? `*Presupuesto:* ${datos.presupuesto_estimado}` : ''}
${datos.fecha_inicio_estimada ? `*Inicio:* ${new Date(datos.fecha_inicio_estimada).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}` : ''}

*Descripción:*
${datos.descripcion}

━━━━━━━━━━━━━━━
_Enviado desde alemanypajaron.es_`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

// =====================================================
// Acción: Enviar Formulario de Contacto
// =====================================================

export async function submitContactForm(formData: FormData): Promise<FormResponse> {
  try {
    // ============================================
    // RATE LIMITING: Anti-spam para contacto
    // ============================================
    const headersList = await headers();
    const clientIP = getClientIP(headersList);
    const rateLimitKey = `contacto:${clientIP}`;
    
    const rateLimit = checkRateLimit(
      rateLimitKey,
      RATE_LIMITS.CONTACTO.maxAttempts,
      RATE_LIMITS.CONTACTO.windowMs
    );

    if (!rateLimit.allowed) {
      const timeRemaining = formatTimeRemaining(rateLimit.resetTime);
      const errorMessage = `${RATE_LIMITS.CONTACTO.message} Tiempo restante: ${timeRemaining}.`;
      return {
        success: false,
        message: errorMessage,
        error: 'RATE_LIMIT_EXCEEDED',
      };
    }
    // ============================================
    
    // Extraer datos del formulario
    const contacto: Contacto = {
      nombre: (formData.get('nombre') as string)?.trim(),
      email: (formData.get('email') as string)?.trim(),
      telefono: (formData.get('telefono') as string)?.trim() || undefined,
      mensaje: (formData.get('mensaje') as string)?.trim(),
    };

    // Validación básica
    if (!contacto.nombre || !contacto.email || !contacto.mensaje) {
      return {
        success: false,
        message: 'Por favor, rellena todos los campos obligatorios.',
        error: 'VALIDATION_ERROR',
      };
    }

    // Validación de longitud (previene abuso / DoS)
    if (contacto.nombre.length > 100) {
      return { success: false, message: 'El nombre es demasiado largo (máx. 100 caracteres).', error: 'VALIDATION_ERROR' };
    }
    if (contacto.email.length > 254) {
      return { success: false, message: 'El email es demasiado largo.', error: 'VALIDATION_ERROR' };
    }
    if (contacto.telefono && contacto.telefono.length > 20) {
      return { success: false, message: 'El teléfono es demasiado largo.', error: 'VALIDATION_ERROR' };
    }
    if (contacto.mensaje.length > 5000) {
      return { success: false, message: 'El mensaje es demasiado largo (máx. 5000 caracteres).', error: 'VALIDATION_ERROR' };
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contacto.email)) {
      return {
        success: false,
        message: 'Por favor, introduce un email válido.',
        error: 'INVALID_EMAIL',
      };
    }

    // Insertar en Supabase
    const { error } = await supabase.from('contactos').insert([contacto]);

    if (error) {
      console.error('Error al insertar contacto en Supabase:', error);
      return {
        success: false,
        message: 'Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.',
        error: error.message,
      };
    }

    // Generar URL de WhatsApp para notificación
    const whatsappUrl = generarWhatsAppContacto(contacto);

    return {
      success: true,
      message: '¡Gracias por contactarnos! Te responderemos pronto.',
      whatsappUrl,
    };
  } catch (error) {
    console.error('Error inesperado en submitContactForm:', error);
    return {
      success: false,
      message: 'Error inesperado. Por favor, inténtalo de nuevo más tarde.',
      error: String(error),
    };
  }
}

// =====================================================
// Acción: Enviar Formulario de Presupuesto
// =====================================================

export async function submitPresupuestoForm(formData: FormData): Promise<FormResponse> {
  try {
    // ============================================
    // RATE LIMITING: Anti-spam para presupuesto
    // ============================================
    const headersList = await headers();
    const clientIP = getClientIP(headersList);
    const rateLimitKey = `presupuesto:${clientIP}`;
    
    const rateLimit = checkRateLimit(
      rateLimitKey,
      RATE_LIMITS.PRESUPUESTO.maxAttempts,
      RATE_LIMITS.PRESUPUESTO.windowMs
    );

    if (!rateLimit.allowed) {
      const timeRemaining = formatTimeRemaining(rateLimit.resetTime);
      const errorMessage = `${RATE_LIMITS.PRESUPUESTO.message} Tiempo restante: ${timeRemaining}.`;
      return {
        success: false,
        message: errorMessage,
        error: 'RATE_LIMIT_EXCEEDED',
      };
    }
    // ============================================
    
    // Extraer datos del formulario
    const presupuesto: Presupuesto = {
      nombre: (formData.get('nombre') as string)?.trim(),
      email: (formData.get('email') as string)?.trim(),
      telefono: (formData.get('telefono') as string)?.trim(),
      tipo_proyecto: (formData.get('tipo_proyecto') as string)?.trim(),
      presupuesto_estimado: (formData.get('presupuesto_estimado') as string)?.trim() || undefined,
      ubicacion: (formData.get('ubicacion') as string)?.trim() || undefined,
      fecha_inicio_estimada: (formData.get('fecha_inicio_estimada') as string)?.trim() || undefined,
      descripcion: (formData.get('descripcion') as string)?.trim(),
      acepta_privacidad: formData.get('acepta_privacidad') === 'true',
      estado: 'pendiente',
    };

    // Validación básica
    if (
      !presupuesto.nombre ||
      !presupuesto.email ||
      !presupuesto.telefono ||
      !presupuesto.tipo_proyecto ||
      !presupuesto.descripcion
    ) {
      return {
        success: false,
        message: 'Por favor, rellena todos los campos obligatorios.',
        error: 'VALIDATION_ERROR',
      };
    }

    // Validación de longitud (previene abuso / DoS)
    if (presupuesto.nombre.length > 100) {
      return { success: false, message: 'El nombre es demasiado largo (máx. 100 caracteres).', error: 'VALIDATION_ERROR' };
    }
    if (presupuesto.email.length > 254) {
      return { success: false, message: 'El email es demasiado largo.', error: 'VALIDATION_ERROR' };
    }
    if (presupuesto.telefono.length > 20) {
      return { success: false, message: 'El teléfono es demasiado largo.', error: 'VALIDATION_ERROR' };
    }
    if (presupuesto.tipo_proyecto.length > 100) {
      return { success: false, message: 'El tipo de proyecto es demasiado largo.', error: 'VALIDATION_ERROR' };
    }
    if (presupuesto.descripcion.length > 10000) {
      return { success: false, message: 'La descripción es demasiado larga (máx. 10.000 caracteres).', error: 'VALIDATION_ERROR' };
    }
    if (presupuesto.ubicacion && presupuesto.ubicacion.length > 200) {
      return { success: false, message: 'La ubicación es demasiado larga.', error: 'VALIDATION_ERROR' };
    }

    // Validar formato de fecha si se proporciona
    if (presupuesto.fecha_inicio_estimada) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(presupuesto.fecha_inicio_estimada) || isNaN(Date.parse(presupuesto.fecha_inicio_estimada))) {
        return { success: false, message: 'La fecha no tiene un formato válido.', error: 'VALIDATION_ERROR' };
      }
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(presupuesto.email)) {
      return {
        success: false,
        message: 'Por favor, introduce un email válido.',
        error: 'INVALID_EMAIL',
      };
    }

    // Validar privacidad
    if (!presupuesto.acepta_privacidad) {
      return {
        success: false,
        message: 'Debes aceptar la política de privacidad.',
        error: 'PRIVACY_NOT_ACCEPTED',
      };
    }

    // Insertar en Supabase
    const { error } = await supabase.from('presupuestos').insert([presupuesto]);

    if (error) {
      console.error('Error al insertar presupuesto en Supabase:', error);
      return {
        success: false,
        message: 'Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo.',
        error: error.message,
      };
    }

    // Generar URL de WhatsApp para notificación
    const whatsappUrl = generarWhatsAppPresupuesto(presupuesto);

    return {
      success: true,
      message: '¡Solicitud recibida! Te contactaremos pronto para discutir tu proyecto.',
      whatsappUrl,
    };
  } catch (error) {
    console.error('Error inesperado en submitPresupuestoForm:', error);
    return {
      success: false,
      message: 'Error inesperado. Por favor, inténtalo de nuevo más tarde.',
      error: String(error),
    };
  }
}

// =====================================================
// Acción: Suscribirse al Newsletter (Opcional)
// =====================================================

export async function subscribeNewsletter(email: string, nombre?: string): Promise<FormResponse> {
  try {
    // Rate limiting
    const headersList = await headers();
    const clientIP = getClientIP(headersList);
    const rateLimitKey = `newsletter:${clientIP}`;

    const rateLimit = checkRateLimit(
      rateLimitKey,
      RATE_LIMITS.NEWSLETTER.maxAttempts,
      RATE_LIMITS.NEWSLETTER.windowMs
    );

    if (!rateLimit.allowed) {
      const timeRemaining = formatTimeRemaining(rateLimit.resetTime);
      return {
        success: false,
        message: `${RATE_LIMITS.NEWSLETTER.message} Tiempo restante: ${timeRemaining}.`,
        error: 'RATE_LIMIT_EXCEEDED',
      };
    }

    // Sanitizar inputs
    email = email?.trim();
    nombre = nombre?.trim();

    // Validar longitud
    if (email.length > 254) {
      return { success: false, message: 'El email es demasiado largo.', error: 'VALIDATION_ERROR' };
    }
    if (nombre && nombre.length > 100) {
      return { success: false, message: 'El nombre es demasiado largo.', error: 'VALIDATION_ERROR' };
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: 'Por favor, introduce un email válido.',
        error: 'INVALID_EMAIL',
      };
    }

    // Insertar en Supabase
    const { error } = await supabase.from('newsletter').insert([
      {
        email,
        nombre: nombre || undefined,
        activo: true,
        confirmado: false,
      },
    ]);

    if (error) {
      // Si el email ya existe (violación de UNIQUE constraint)
      if (error.code === '23505') {
        return {
          success: false,
          message: 'Este email ya está suscrito a nuestro newsletter.',
          error: 'DUPLICATE_EMAIL',
        };
      }

      console.error('Error al suscribir al newsletter:', error);
      return {
        success: false,
        message: 'Hubo un error al suscribirte. Por favor, inténtalo de nuevo.',
        error: error.message,
      };
    }

    return {
      success: true,
      message: '¡Gracias por suscribirte! Te mantendremos informado.',
    };
  } catch (error) {
    console.error('Error inesperado en subscribeNewsletter:', error);
    return {
      success: false,
      message: 'Error inesperado. Por favor, inténtalo de nuevo más tarde.',
      error: String(error),
    };
  }
}

