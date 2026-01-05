import { supabase, type Proyecto, type ImagenProyecto, type BlogArticulo, type BlogArticuloConCategoria, type CategoríaBlog } from './supabase';

// =====================================================
// PROYECTOS
// =====================================================

/**
 * Obtener todos los proyectos publicados
 * @param limit - Número máximo de proyectos a devolver
 */
export async function getProyectos(limit?: number) {
  let query = supabase
    .from('proyectos')
    .select('*')
    .eq('publicado', true)
    .order('orden', { ascending: true })
    .order('ano', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error al obtener proyectos:', error);
    return [];
  }

  return (data || []) as Proyecto[];
}

/**
 * Obtener proyectos destacados
 */
export async function getProyectosDestacados(limit = 3) {
  const { data, error } = await supabase
    .from('proyectos')
    .select('*')
    .eq('publicado', true)
    .eq('destacado', true)
    .order('orden', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('Error al obtener proyectos destacados:', error);
    return [];
  }

  return (data || []) as Proyecto[];
}

/**
 * Obtener un proyecto por su slug
 */
export async function getProyectoBySlug(slug: string) {
  const { data, error } = await supabase
    .from('proyectos')
    .select('*')
    .eq('slug', slug)
    .eq('publicado', true)
    .single();

  if (error) {
    console.error(`Error al obtener proyecto ${slug}:`, error);
    return null;
  }

  return data as Proyecto;
}

/**
 * Obtener imágenes de un proyecto
 */
export async function getImagenesProyecto(proyectoId: string) {
  const { data, error } = await supabase
    .from('imagenes_proyectos')
    .select('*')
    .eq('proyecto_id', proyectoId)
    .order('orden', { ascending: true });

  if (error) {
    console.error(`Error al obtener imágenes del proyecto ${proyectoId}:`, error);
    return [];
  }

  return (data || []) as ImagenProyecto[];
}

/**
 * Obtener todos los slugs de proyectos (para generar páginas estáticas)
 */
export async function getProyectosSlugs() {
  const { data, error } = await supabase
    .from('proyectos')
    .select('slug')
    .eq('publicado', true);

  if (error) {
    console.error('Error al obtener slugs de proyectos:', error);
    return [];
  }

  return (data || []).map((p) => p.slug);
}

// =====================================================
// BLOG
// =====================================================

/**
 * Obtener todos los artículos publicados
 * @param limit - Número máximo de artículos a devolver
 */
export async function getBlogArticulos(limit?: number) {
  let query = supabase
    .from('blog_articulos')
    .select(`
      *,
      categoria:categoria_id (
        id,
        nombre,
        slug,
        color
      )
    `)
    .eq('publicado', true)
    .order('fecha_publicacion', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error al obtener artículos:', error);
    return [];
  }

  return (data || []) as BlogArticuloConCategoria[];
}

/**
 * Obtener artículos destacados
 */
export async function getBlogArticulosDestacados(limit = 3) {
  const { data, error } = await supabase
    .from('blog_articulos')
    .select(`
      *,
      categoria:categoria_id (
        id,
        nombre,
        slug,
        color
      )
    `)
    .eq('publicado', true)
    .eq('destacado', true)
    .order('fecha_publicacion', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error al obtener artículos destacados:', error);
    return [];
  }

  return (data || []) as BlogArticuloConCategoria[];
}

/**
 * Obtener un artículo por su slug
 */
export async function getBlogArticuloBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blog_articulos')
    .select(`
      *,
      categoria:categoria_id (
        id,
        nombre,
        slug,
        color
      )
    `)
    .eq('slug', slug)
    .eq('publicado', true)
    .single();

  if (error) {
    console.error(`Error al obtener artículo ${slug}:`, error);
    return null;
  }

  // Incrementar contador de visitas
  if (data) {
    await supabase
      .from('blog_articulos')
      .update({ visitas: (data.visitas || 0) + 1 })
      .eq('id', data.id);
  }

  return data as BlogArticuloConCategoria;
}

/**
 * Obtener todos los slugs de artículos (para generar páginas estáticas)
 */
export async function getBlogArticulosSlugs() {
  const { data, error } = await supabase
    .from('blog_articulos')
    .select('slug')
    .eq('publicado', true);

  if (error) {
    console.error('Error al obtener slugs de artículos:', error);
    return [];
  }

  return (data || []).map((a) => a.slug);
}

/**
 * Obtener todas las categorías
 */
export async function getCategoriasBlog() {
  const { data, error } = await supabase
    .from('categorias_blog')
    .select('*')
    .order('orden', { ascending: true });

  if (error) {
    console.error('Error al obtener categorías:', error);
    return [];
  }

  return (data || []) as CategoríaBlog[];
}

/**
 * Obtener artículos por categoría
 */
export async function getBlogArticulosByCategoria(categoriaSlug: string, limit?: number) {
  // Primero obtener la categoría
  const { data: categoria } = await supabase
    .from('categorias_blog')
    .select('id')
    .eq('slug', categoriaSlug)
    .single();

  if (!categoria) {
    return [];
  }

  let query = supabase
    .from('blog_articulos')
    .select(`
      *,
      categoria:categoria_id (
        id,
        nombre,
        slug,
        color
      )
    `)
    .eq('publicado', true)
    .eq('categoria_id', categoria.id)
    .order('fecha_publicacion', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error(`Error al obtener artículos de categoría ${categoriaSlug}:`, error);
    return [];
  }

  return (data || []) as BlogArticuloConCategoria[];
}

/**
 * Buscar artículos por tags
 */
export async function searchBlogArticulosByTag(tag: string, limit = 10) {
  const { data, error } = await supabase
    .from('blog_articulos')
    .select(`
      *,
      categoria:categoria_id (
        id,
        nombre,
        slug,
        color
      )
    `)
    .eq('publicado', true)
    .contains('tags', [tag])
    .order('fecha_publicacion', { ascending: false })
    .limit(limit);

  if (error) {
    console.error(`Error al buscar artículos por tag ${tag}:`, error);
    return [];
  }

  return (data || []) as BlogArticuloConCategoria[];
}

