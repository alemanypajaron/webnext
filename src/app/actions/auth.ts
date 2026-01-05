'use server';

import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';

export async function loginAction(email: string, password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  if (data.user) {
    // redirect() lanza un error NEXT_REDIRECT para funcionar
    // No necesita return porque nunca llega a ejecutarse
    redirect('/administrator');
  }

  return { success: false, error: 'Error al iniciar sesión' };
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/administrator/login');
}

