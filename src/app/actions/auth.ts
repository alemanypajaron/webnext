'use server';

import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';

export async function loginAction(email: string, password: string) {
  console.log('[Server Login] 🔐 Iniciando login para:', email);
  
  try {
    const supabase = await createClient();

    console.log('[Server Login] 📡 Cliente Supabase creado');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log('[Server Login] 📥 Respuesta de Supabase:', { 
      hasData: !!data, 
      hasUser: !!data?.user,
      hasSession: !!data?.session,
      error: error?.message 
    });

    if (error) {
      console.error('[Server Login] ❌ Error de Supabase:', error);
      return { success: false, error: error.message };
    }

    if (data.user) {
      console.log('[Server Login] ✅ Usuario autenticado, redirigiendo...');
      // redirect() lanza un error NEXT_REDIRECT para funcionar
      // No necesita return porque nunca llega a ejecutarse
      redirect('/administrator');
    }

    console.error('[Server Login] ⚠️ No hay usuario después de login exitoso');
    return { success: false, error: 'Error al iniciar sesión' };
  } catch (error: any) {
    console.error('[Server Login] 💥 Excepción:', error);
    
    // Si es un redirect, re-lanzar el error para que Next.js lo maneje
    if (error?.message?.includes('NEXT_REDIRECT')) {
      console.log('[Server Login] 🔄 Re-lanzando NEXT_REDIRECT');
      throw error;
    }
    
    return { success: false, error: error.message || 'Error desconocido' };
  }
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/administrator/login');
}

