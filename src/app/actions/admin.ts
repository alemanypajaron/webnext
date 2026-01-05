'use server';

import { createClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

// =====================================================
// CONTACTOS
// =====================================================

export async function updateContacto(id: string, data: { leido?: boolean; respondido?: boolean }) {
  const supabase = createClient();
  
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
  const supabase = createClient();
  
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
  const supabase = createClient();
  
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
  const supabase = createClient();
  
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
}) {
  const supabase = createClient();
  
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
  }
) {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('blog_articulos')
    .update({ ...data, actualizado_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('Error updating blog articulo:', error);
    throw new Error(error.message);
  }

  revalidatePath('/administrator/blog');
  revalidatePath('/blog');
  return { success: true };
}

export async function deleteBlogArticulo(id: string) {
  const supabase = createClient();
  
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

