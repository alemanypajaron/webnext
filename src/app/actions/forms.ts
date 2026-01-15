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
  const mensaje = `🏗️ *NUEVO CONTACTO WEB*

👤 *Cliente:* ${datos.nombre}
📧 *Email:* ${datos.email}
${datos.telefono ? `📱 *Teléfono:* ${datos.telefono}` : ''}

💬 *Mensaje:*
${datos.mensaje}

---
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
  const mensaje = `🏗️ *NUEVA SOLICITUD DE PRESUPUESTO*

👤 *Cliente:* ${datos.nombre}
📧 *Email:* ${datos.email}
📱 *Teléfono:* ${datos.telefono}

📋 *Tipo de Proyecto:* ${datos.tipo_proyecto}
${datos.ubicacion ? `📍 *Ubicación:* ${datos.ubicacion}` : ''}
${datos.presupuesto_estimado ? `💰 *Presupuesto Estimado:* ${datos.presupuesto_estimado}` : ''}
${datos.fecha_inicio_estimada ? `📅 *Inicio Previsto:* ${new Date(datos.fecha_inicio_estimada).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}` : ''}

📝 *Descripción:*
${datos.descripcion}

---
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
      nombre: formData.get('nombre') as string,
      email: formData.get('email') as string,
      telefono: (formData.get('telefono') as string) || undefined,
      mensaje: formData.get('mensaje') as string,
    };

    // Validación básica
    if (!contacto.nombre || !contacto.email || !contacto.mensaje) {
      return {
        success: false,
        message: 'Por favor, rellena todos los campos obligatorios.',
        error: 'VALIDATION_ERROR',
      };
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
      nombre: formData.get('nombre') as string,
      email: formData.get('email') as string,
      telefono: formData.get('telefono') as string,
      tipo_proyecto: formData.get('tipo_proyecto') as string,
      presupuesto_estimado: (formData.get('presupuesto_estimado') as string) || undefined,
      ubicacion: (formData.get('ubicacion') as string) || undefined,
      fecha_inicio_estimada: (formData.get('fecha_inicio_estimada') as string) || undefined,
      descripcion: formData.get('descripcion') as string,
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

