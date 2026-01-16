import Link from 'next/link';
import { SITE_URL } from '@/lib/structuredData';
import { createClient } from '@supabase/supabase-js';

export const metadata = {
  title: 'Mapa del Sitio | Alemán y Pajarón',
  description: 'Mapa completo del sitio web de Alemán y Pajarón',
  robots: {
    index: false,
    follow: false,
  },
};

// Regenerar cada hora
export const revalidate = 3600;

export default async function SitemapHTMLPage() {
  // Crear cliente de Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Obtener artículos de blog dinámicos
  const { data: articulos } = await supabase
    .from('blog_articulos')
    .select('slug, titulo, fecha_publicacion')
    .eq('publicado', true)
    .order('fecha_publicacion', { ascending: false });

  // Obtener proyectos dinámicos
  const { data: proyectos } = await supabase
    .from('proyectos')
    .select('slug, titulo, created_at')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            🗺️ Mapa del Sitio
          </h1>
          <p className="text-lg text-gray-600">
            Lista completa de todas las páginas de Alemán y Pajarón
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Total de páginas: {
              4 + // Páginas principales
              6 + // Servicios generales (menú)
              6 + // Reformas vivienda
              7 + // Reformas negocios
              7 + // Licencias específicas
              3 + // Legales
              2 + // Blog y proyectos index
              (articulos?.length || 0) +
              (proyectos?.length || 0)
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Páginas Principales */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-heading font-bold text-primary mb-4 flex items-center gap-2">
              <span>🏠</span>
              Páginas Principales
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/presupuesto"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Solicitar Presupuesto
                </Link>
              </li>
            </ul>
          </div>

          {/* Servicios Generales (menú) */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-heading font-bold text-primary mb-4 flex items-center gap-2">
              <span>🔧</span>
              Servicios Generales
            </h2>
            <p className="text-sm text-gray-500 mb-3">Servicios accesibles desde el menú</p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/servicios"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Todos los Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/direccion-obra"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Dirección de Obra
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/gestion-proyectos"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Gestión de Proyectos
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/licencias-permisos"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Licencias y Permisos
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/reformas-integrales"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Reformas Integrales
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/asesoramiento-tecnico"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Asesoramiento Técnico
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/diseno-espacios"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Diseño de Espacios
                </Link>
              </li>
            </ul>
          </div>

          {/* Reformas Vivienda */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-heading font-bold text-primary mb-4 flex items-center gap-2">
              <span>🏠</span>
              Reformas Vivienda
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/servicios/reforma-bano"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Reforma de Baño
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/reforma-cocina"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Reforma de Cocina
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/reforma-tejados"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Reforma de Tejados
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/reforma-terraza"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Reforma de Terraza
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/cambio-ventanas-pvc"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Cambio Ventanas PVC
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/reforma-piscina"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Construcción y Reforma Piscina
                </Link>
              </li>
            </ul>
          </div>

          {/* Licencias Específicas */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-heading font-bold text-primary mb-4 flex items-center gap-2">
              <span>📋</span>
              Licencias Específicas
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/servicios/licencia-bar"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Licencia Bar/Restaurante
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/licencia-peluqueria"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Licencia Peluquería
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/licencia-gimnasio"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Licencia Gimnasio
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/licencia-clinica-estetica"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Licencia Clínica Estética
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/licencia-veterinaria"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Licencia Clínica Veterinaria
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/licencia-centro-medico"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Licencia Centro Médico
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/licencia-farmacia"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Licencia Farmacia
                </Link>
              </li>
            </ul>
          </div>

          {/* Reformas Negocios */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-heading font-bold text-primary mb-4 flex items-center gap-2">
              <span>🏢</span>
              Reformas Negocios
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/servicios/reforma-bar"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Reforma Bar/Restaurante
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/reforma-peluqueria"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Reforma Peluquería
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/reforma-gimnasio"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Reforma Gimnasio
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/reforma-clinica-estetica"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Reforma Clínica Estética
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/reforma-veterinaria"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Reforma Clínica Veterinaria
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/reforma-centro-medico"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Reforma Centro Médico
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios/reforma-farmacia"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Reforma Farmacia
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-heading font-bold text-primary mb-4 flex items-center gap-2">
              <span>⚖️</span>
              Legal
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/legal/aviso-legal"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacidad"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/cookies"
                  className="text-gray-700 hover:text-primary hover:underline transition-colors"
                >
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Blog */}
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-heading font-bold text-primary mb-4 flex items-center gap-2">
              <span>📝</span>
              Blog ({articulos?.length || 0} artículos)
            </h2>
            <div className="mb-4">
              <Link
                href="/blog"
                className="inline-block text-accent hover:text-accent-dark font-semibold hover:underline transition-colors"
              >
                → Ver todos los artículos del blog
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {articulos?.map((articulo) => (
                <div key={articulo.slug} className="border-l-4 border-accent pl-4">
                  <Link
                    href={`/blog/${articulo.slug}`}
                    className="text-gray-700 hover:text-primary hover:underline transition-colors block"
                  >
                    {articulo.titulo}
                  </Link>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(articulo.fecha_publicacion).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Proyectos */}
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-heading font-bold text-primary mb-4 flex items-center gap-2">
              <span>🏗️</span>
              Proyectos ({proyectos?.length || 0} proyectos)
            </h2>
            <div className="mb-4">
              <Link
                href="/proyectos"
                className="inline-block text-accent hover:text-accent-dark font-semibold hover:underline transition-colors"
              >
                → Ver todos los proyectos
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {proyectos?.map((proyecto) => (
                <div key={proyecto.slug} className="border-l-4 border-primary pl-4">
                  <Link
                    href={`/proyectos/${proyecto.slug}`}
                    className="text-gray-700 hover:text-primary hover:underline transition-colors block"
                  >
                    {proyecto.titulo}
                  </Link>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(proyecto.created_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Esta página no está enlazada públicamente. URL para acceso directo:{' '}
            <code className="bg-gray-200 px-2 py-1 rounded text-xs">
              {SITE_URL}/sitemap-html
            </code>
          </p>
          <p className="mt-2">
            Para el sitemap XML (para buscadores), visita:{' '}
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              /sitemap.xml
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

