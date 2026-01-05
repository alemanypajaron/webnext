import { createClient } from '@supabase/supabase-js';

// Validación de variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '❌ Faltan variables de entorno de Supabase.\n' +
    'Asegúrate de tener:\n' +
    '  - NEXT_PUBLIC_SUPABASE_URL\n' +
    '  - NEXT_PUBLIC_SUPABASE_ANON_KEY\n' +
    'en tu archivo .env.local'
  );
}

// Cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // No necesitamos autenticación de usuarios
  },
});

// =====================================================
// Tipos TypeScript para las tablas
// =====================================================

export interface Contacto {
  id?: string;
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
  created_at?: string;
  leido?: boolean;
  respondido?: boolean;
}

export interface Presupuesto {
  id?: string;
  nombre: string;
  email: string;
  telefono: string;
  tipo_proyecto: string;
  presupuesto_estimado?: string;
  ubicacion?: string;
  fecha_inicio_estimada?: string;
  descripcion: string;
  acepta_privacidad: boolean;
  created_at?: string;
  leido?: boolean;
  respondido?: boolean;
  estado?: 'pendiente' | 'en_proceso' | 'enviado' | 'rechazado';
}

export interface Newsletter {
  id?: string;
  email: string;
  nombre?: string;
  activo?: boolean;
  created_at?: string;
  confirmado?: boolean;
}

