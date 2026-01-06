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

// --- PROYECTOS ---
export interface Proyecto {
  id?: string;
  titulo: string;
  slug: string;
  descripcion_corta: string;
  descripcion_completa: string;
  ubicacion: string;
  ano: number;
  superficie?: string;
  presupuesto?: string;
  duracion?: string;
  servicios?: string[];
  estado?: 'completado' | 'en_curso' | 'pausado';
  imagen_principal: string;
  cliente?: string;
  destacado?: boolean;
  orden?: number;
  created_at?: string;
  updated_at?: string;
  publicado?: boolean;
}

export interface ImagenProyecto {
  id?: string;
  proyecto_id: string;
  url: string;
  alt_text?: string;
  descripcion?: string;
  orden?: number;
  created_at?: string;
}

// --- BLOG ---
export interface CategoríaBlog {
  id?: string;
  nombre: string;
  slug: string;
  descripcion?: string;
  color?: string;
  orden?: number;
  created_at?: string;
}

export interface BlogArticulo {
  id?: string;
  titulo: string;
  slug: string;
  resumen: string;
  contenido: string;
  autor?: string;
  imagen_destacada: string;
  categoria_id?: string;
  fecha_publicacion?: string;
  actualizado_at?: string;
  created_at?: string;
  publicado?: boolean;
  destacado?: boolean;
  visitas?: number;
  tiempo_lectura?: number;
  tags?: string[];
  meta_descripcion?: string;
  meta_keywords?: string[];
}

// Tipo extendido para incluir la categoría
export interface BlogArticuloConCategoria extends BlogArticulo {
  categoria?: CategoríaBlog;
}

// --- FORMULARIOS ---
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

