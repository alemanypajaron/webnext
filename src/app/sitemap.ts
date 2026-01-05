import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/structuredData';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes = [
    '/',
    '/servicios',
    '/servicios/asesoramiento-tecnico',
    '/servicios/direccion-obra',
    '/servicios/diseno-espacios',
    '/servicios/gestion-proyectos',
    '/servicios/licencias-permisos',
    '/servicios/reformas-integrales',
    '/nosotros',
    '/contacto',
    '/presupuesto',
    '/proyectos',
    '/blog',
    '/legal/aviso-legal',
    '/legal/privacidad',
    '/legal/cookies',
  ];

  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
  }));
}


