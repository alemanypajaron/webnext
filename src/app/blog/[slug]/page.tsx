import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogArticuloBySlug, getBlogArticulosSlugs, getBlogArticulosDestacados } from '@/lib/data';
import VisitasTracker from '@/components/blog/VisitasTracker';

type Props = {
  params: Promise<{ slug: string }>;
};

// Generar metadata dinámica
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const articulo = await getBlogArticuloBySlug(slug);

  if (!articulo) {
    return {
      title: 'Artículo no encontrado',
    };
  }

  return {
    title: `${articulo.titulo} | Blog`,
    description: articulo.meta_descripcion || articulo.resumen,
    keywords: articulo.meta_keywords,
    openGraph: {
      title: articulo.titulo,
      description: articulo.resumen,
      images: [articulo.imagen_destacada],
      type: 'article',
      publishedTime: articulo.fecha_publicacion,
      modifiedTime: articulo.actualizado_at,
      authors: [articulo.autor || 'Alemán y Pajarón'],
    },
  };
}

// Generar páginas estáticas en build time
export async function generateStaticParams() {
  const slugs = await getBlogArticulosSlugs();
  return slugs.map((slug) => ({ slug }));
}

function formatearFecha(fecha: string) {
  return new Date(fecha).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogArticuloPage({ params }: Props) {
  const { slug } = await params;
  const articulo = await getBlogArticuloBySlug(slug);

  if (!articulo) {
    notFound();
  }

  // Obtener artículos relacionados (destacados)
  const articulosRelacionados = await getBlogArticulosDestacados(3);
  const articulosRelacionadosFiltrados = articulosRelacionados.filter(
    (a) => a.slug !== articulo.slug
  ).slice(0, 2);

  return (
    <>
      {/* Tracker de visitas (invisible) */}
      <VisitasTracker articuloId={articulo.id || ''} slug={articulo.slug || slug} />
      
      {/* Hero del artículo */}
      <section className="relative h-[70vh] min-h-[600px]">
        <Image
          src={articulo.imagen_destacada}
          alt={articulo.titulo}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/50 to-primary/90" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-6 pb-16 w-full">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all mb-6 border border-white/30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Volver al Blog
            </Link>

            {/* Categoría */}
            {articulo.categoria && (
              <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 bg-accent text-primary shadow-lg">
                {articulo.categoria.nombre}
              </span>
            )}

            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 drop-shadow-lg">
              {articulo.titulo}
            </h1>

            {/* Meta información */}
            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mr-2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {articulo.autor || 'Alemán y Pajarón'}
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mr-2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {formatearFecha(articulo.fecha_publicacion!)}
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mr-2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {articulo.tiempo_lectura || 5} min de lectura
              </div>
              {articulo.visitas && articulo.visitas > 0 && (
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mr-2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  {articulo.visitas} visitas
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contenido del artículo */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-6">
          {/* Resumen */}
          <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-lg mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">{articulo.resumen}</p>
          </div>

          {/* Contenido principal */}
          <article
            className="prose prose-lg max-w-none
              prose-headings:font-heading prose-headings:text-primary prose-headings:font-bold
              prose-h1:text-4xl prose-h1:mt-16 prose-h1:mb-8
              prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-accent/30
              prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-5
              prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-4
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
              prose-a:text-accent prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-a:transition-all
              prose-strong:text-primary prose-strong:font-bold
              prose-ul:my-8 prose-ul:space-y-3
              prose-ol:my-8 prose-ol:space-y-3
              prose-li:text-gray-700 prose-li:leading-relaxed prose-li:text-lg
              prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-accent/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:rounded-r-lg
              prose-code:text-accent prose-code:bg-accent/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-xl prose-pre:overflow-x-auto
              prose-img:rounded-xl prose-img:shadow-lg prose-img:my-12
              prose-hr:my-12 prose-hr:border-gray-300
              prose-table:border-collapse prose-table:w-full
              prose-th:bg-primary prose-th:text-white prose-th:font-bold prose-th:p-4 prose-th:text-left
              prose-td:border prose-td:border-gray-300 prose-td:p-4 prose-td:text-gray-700
              [&>*:first-child]:mt-0
              [&>*:last-child]:mb-0"
            dangerouslySetInnerHTML={{ __html: articulo.contenido }}
          />

          {/* Tags */}
          {articulo.tags && articulo.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-gray-600 font-semibold">Etiquetas:</span>
                {articulo.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-accent/10 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Compartir */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-semibold">Compartir:</span>
              <div className="flex gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    `https://alemanypajaron.es/blog/${articulo.slug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  aria-label="Compartir en Facebook"
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    `https://alemanypajaron.es/blog/${articulo.slug}`
                  )}&text=${encodeURIComponent(articulo.titulo)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
                  aria-label="Compartir en Twitter/X"
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                    `https://alemanypajaron.es/blog/${articulo.slug}`
                  )}&title=${encodeURIComponent(articulo.titulo)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
                  aria-label="Compartir en LinkedIn"
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artículos relacionados */}
      {articulosRelacionadosFiltrados.length > 0 && (
        <section className="section bg-gray-50">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-3xl font-heading font-bold text-primary mb-12 text-center">
              Artículos Relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articulosRelacionadosFiltrados.map((relacionado) => (
                <Link
                  key={relacionado.id}
                  href={`/blog/${relacionado.slug}`}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
                >
                  <div className="relative h-64">
                    <Image
                      src={relacionado.imagen_destacada}
                      alt={relacionado.titulo}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {relacionado.categoria && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-accent text-primary shadow-md">
                        {relacionado.categoria.nombre}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                      {relacionado.titulo}
                    </h3>
                    <p className="text-gray-600 mb-4">{relacionado.resumen}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="mr-2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {relacionado.tiempo_lectura || 5} min de lectura
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section bg-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
            ¿Necesitas ayuda con tu proyecto?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Somos expertos en arquitectura técnica, dirección de obra y gestión de proyectos en Murcia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto" className="btn btn-primary">
              Contactar
            </Link>
            <Link href="/blog" className="btn btn-secondary">
              Más Artículos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

