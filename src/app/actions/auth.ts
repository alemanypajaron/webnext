'use server';

import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { checkRateLimit, getClientIP, RATE_LIMITS, formatTimeRemaining } from '@/lib/rate-limit';

export async function loginAction(email: string, password: string) {
  try {
    // Rate limiting: prevenir fuerza bruta
    const headersList = await headers();
    const clientIP = getClientIP(headersList);
    const rateLimitKey = `login:${clientIP}`;

    const rateLimit = checkRateLimit(
      rateLimitKey,
      RATE_LIMITS.LOGIN.maxAttempts,
      RATE_LIMITS.LOGIN.windowMs
    );

    if (!rateLimit.allowed) {
      const timeRemaining = formatTimeRemaining(rateLimit.resetTime);
      console.warn(`[Server Login] Rate limit excedido para IP: ${clientIP}`);
      return {
        success: false,
        error: `${RATE_LIMITS.LOGIN.message} Tiempo restante: ${timeRemaining}.`
      };
    }

    // Validación básica de inputs
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return { success: false, error: 'Email y contraseña son obligatorios.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Formato de email no válido.' };
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.warn(`[Server Login] Intento fallido para: ${email} desde IP: ${clientIP} (${rateLimit.remaining} intentos restantes)`);
      // Mensaje genérico para no revelar si el email existe
      return { success: false, error: 'Credenciales incorrectas.' };
    }

    if (data.user) {
      console.log(`[Server Login] Login exitoso: ${email}`);
      redirect('/administrator');
    }

    return { success: false, error: 'Error al iniciar sesión.' };
  } catch (error: any) {
    // Si es un redirect, re-lanzar el error para que Next.js lo maneje
    if (error?.message?.includes('NEXT_REDIRECT')) {
      throw error;
    }

    console.error('[Server Login] Error inesperado:', error);
    return { success: false, error: 'Error del servidor. Inténtalo de nuevo.' };
  }
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/administrator/login');
}

