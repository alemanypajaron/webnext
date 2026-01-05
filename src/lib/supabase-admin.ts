import { createClient } from '@supabase/supabase-js';

// Cliente de Supabase con privilegios de administrador
// SOLO USAR EN EL SERVIDOR para operaciones que requieren bypasear RLS
// como subida de archivos a Storage

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

