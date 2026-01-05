import { createClient } from '@supabase/supabase-js';

// Cliente de Supabase con privilegios de administrador
// SOLO USAR EN EL SERVIDOR para operaciones del admin panel
// La seguridad está garantizada por el middleware de autenticación

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function getSupabaseAdmin() {
  return createClient(
    supabaseUrl,
    supabaseServiceRoleKey || supabaseAnonKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
