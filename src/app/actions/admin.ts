'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

// Cliente admin para operaciones que necesitan bypasear RLS
// La seguridad la proporciona el middleware de autenticación del admin panel
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  return createClient(url, serviceKey || anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// =====================================================
// CONTACTOS
// =====================================================

export async function updateContacto(id: string, data: { leido?: boolean; respondido?: boolean }) {
  const supabase = getSupabaseAdmin();
  
  const { error } = await supabase
    .from('contactos')
    .update(data)
    .eq('id', id);

  if (error) {
    console.error('Error updating contacto:', error);
    throw new Error(error.message);
  }

  revalidatePath('/administrator');
  return { success: true };
}

export async function deleteContacto(id: string) {
  const supabase = getSupabaseAdmin();
  
  const { error } = await supabase
    .from('contactos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting contacto:', error);
    throw new Error(error.message);
  }

  revalidatePath('/administrator');
  return { success: true };
}

// =====================================================
// PRESUPUESTOS
// =====================================================

export async function updatePresupuesto(
  id: string,
  data: { leido?: boolean; respondido?: boolean; estado?: string }
) {
  const supabase = getSupabaseAdmin();
  
  const { error } = await supabase
    .from('presupuestos')
    .update(data)
    .eq('id', id);

  if (error) {
    console.error('Error updating presupuesto:', error);
    throw new Error(error.message);
  }

  revalidatePath('/administrator/presupuestos');
  return { success: true };
}

export async function deletePresupuesto(id: string) {
  const supabase = getSupabaseAdmin();
  
  const { error } = await supabase
    .from('presupuestos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting presupuesto:', error);
    throw new Error(error.message);
  }

  revalidatePath('/administrator/presupuestos');
  return { success: true };
}

// =====================================================
// BLOG
// =====================================================

export async function createBlogArticulo(data: {
  titulo: string;
  slug: string;
  resumen: string;
  contenido: string;
  autor: string;
  imagen_destacada: string;
  categoria_id: string;
  publicado: boolean;
  destacado: boolean;
  tags: string[];
  meta_descripcion?: string;
  meta_keywords?: string[];
  fecha_publicacion?: string;
}) {
  const supabase = getSupabaseAdmin();
  
  const { data: articulo, error } = await supabase
    .from('blog_articulos')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Error creating blog articulo:', error);
    throw new Error(error.message);
  }

  revalidatePath('/administrator/blog');
  revalidatePath('/blog');
  return { success: true, articulo };
}

export async function updateBlogArticulo(
  id: string,
  data: {
    titulo?: string;
    slug?: string;
    resumen?: string;
    contenido?: string;
    autor?: string;
    imagen_destacada?: string;
    categoria_id?: string;
    publicado?: boolean;
    destacado?: boolean;
    tags?: string[];
    meta_descripcion?: string;
    meta_keywords?: string[];
    fecha_publicacion?: string;
  }
) {
  console.log('[UPDATE BLOG] Starting update for ID:', id);
  console.log('[UPDATE BLOG] Data:', JSON.stringify(data, null, 2));
  
  const supabase = getSupabaseAdmin();
  
  console.log('[UPDATE BLOG] Supabase client created');
  
  const { error } = await supabase
    .from('blog_articulos')
    .update({ ...data, actualizado_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('[UPDATE BLOG] Error updating blog articulo:', error);
    throw new Error(`Error al actualizar: ${error.message}`);
  }

  console.log('[UPDATE BLOG] Update successful');
  
  revalidatePath('/administrator/blog');
  revalidatePath('/blog');
  return { success: true };
}

export async function deleteBlogArticulo(id: string) {
  const supabase = getSupabaseAdmin();
  
  const { error } = await supabase
    .from('blog_articulos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting blog articulo:', error);
    throw new Error(error.message);
  }

  revalidatePath('/administrator/blog');
  revalidatePath('/blog');
  return { success: true };
}

// =====================================================
// PROYECTOS
// =====================================================

export async function createProyecto(data: {
  titulo: string;
  slug: string;
  descripcion_corta: string;
  descripcion_completa: string;
  ubicacion: string;
  ano: number;
  superficie: number;
  presupuesto?: number;
  duracion?: number;
  servicios: string[];
  estado: string;
  imagen_principal: string;
  cliente?: string;
  publicado: boolean;
  destacado: boolean;
  meta_descripcion?: string;
  meta_keywords?: string[];
}) {
  const supabase = getSupabaseAdmin();
  
  const { data: proyecto, error } = await supabase
    .from('proyectos')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Error creating proyecto:', error);
    throw new Error(error.message);
  }

  revalidatePath('/administrator/proyectos');
  revalidatePath('/proyectos');
  return { success: true, proyecto };
}

export async function updateProyecto(
  id: string,
  data: {
    titulo?: string;
    slug?: string;
    descripcion_corta?: string;
    descripcion_completa?: string;
    ubicacion?: string;
    ano?: number;
    superficie?: number;
    presupuesto?: number;
    duracion?: number;
    servicios?: string[];
    estado?: string;
    imagen_principal?: string;
    cliente?: string;
    publicado?: boolean;
    destacado?: boolean;
    meta_descripcion?: string;
    meta_keywords?: string[];
  }
) {
  const supabase = getSupabaseAdmin();
  
  const { error } = await supabase
    .from('proyectos')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('Error updating proyecto:', error);
    throw new Error(error.message);
  }

  revalidatePath('/administrator/proyectos');
  revalidatePath('/proyectos');
  return { success: true };
}

export async function deleteProyecto(id: string) {
  const supabase = getSupabaseAdmin();
  
  const { error } = await supabase
    .from('proyectos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting proyecto:', error);
    throw new Error(error.message);
  }

  revalidatePath('/administrator/proyectos');
  revalidatePath('/proyectos');
  return { success: true };
}
