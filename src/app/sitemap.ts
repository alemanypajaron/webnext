import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/structuredData';
import { createClient } from '@supabase/supabase-js';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  
  // Crear cliente de Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Páginas estáticas principales
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/nosotros`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contacto`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/presupuesto`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.9,
    },
  ];

  // Páginas de servicios
  const serviciosRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/servicios`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/servicios/direccion-obra`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/servicios/gestion-proyectos`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/servicios/licencias-permisos`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/servicios/reformas-integrales`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/servicios/asesoramiento-tecnico`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/servicios/diseno-espacios`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Landing pages SEO ocultas
    {
      url: `${SITE_URL}/servicios/reforma-bano`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/servicios/reforma-cocina`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Páginas legales
  const legalRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/legal/aviso-legal`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/legal/privacidad`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/legal/cookies`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Páginas de blog
  const blogIndexRoute: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Artículos de blog dinámicos
  const { data: articulos } = await supabase
    .from('blog_articulos')
    .select('slug, actualizado_at')
    .eq('publicado', true)
    .order('fecha_publicacion', { ascending: false });

  const blogRoutes: MetadataRoute.Sitemap =
    articulos?.map((articulo) => ({
      url: `${SITE_URL}/blog/${articulo.slug}`,
      lastModified: articulo.actualizado_at
        ? new Date(articulo.actualizado_at)
        : lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })) || [];

  // Páginas de proyectos
  const proyectosIndexRoute: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/proyectos`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Proyectos dinámicos
  const { data: proyectos } = await supabase
    .from('proyectos')
    .select('slug, updated_at')
    .order('created_at', { ascending: false });

  const proyectosRoutes: MetadataRoute.Sitemap =
    proyectos?.map((proyecto) => ({
      url: `${SITE_URL}/proyectos/${proyecto.slug}`,
      lastModified: proyecto.updated_at
        ? new Date(proyecto.updated_at)
        : lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })) || [];

  // Combinar todas las rutas
  return [
    ...staticRoutes,
    ...serviciosRoutes,
    ...legalRoutes,
    ...blogIndexRoute,
    ...blogRoutes,
    ...proyectosIndexRoute,
    ...proyectosRoutes,
  ];
}

