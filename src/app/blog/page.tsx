import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import NewsletterForm from '@/components/forms/NewsletterForm';
import { getBlogArticulos, getCategoriasBlog } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog de arquitectura técnica en Murcia. Consejos, guías y novedades sobre construcción, reformas y licencias.',
};

function formatearFecha(fecha: string) {
  return new Date(fecha).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogPage() {
  const articulos = await getBlogArticulos();
  const categorias = await getCategoriasBlog();

  return (
    <>
      <PageHeader
        badge="Recursos y guías"
        title="Blog de Arquitectura"
        subtitle="Consejos y guías sobre arquitectura técnica en Murcia"
        image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Blog de arquitectura técnica en Murcia"
        highlightedWord="Blog"
      />

      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Categorías */}
          {categorias.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Link
                href="/blog"
                className="px-6 py-2 rounded-full bg-primary text-white hover:bg-primary-light transition-colors text-sm font-semibold"
              >
                Todos los artículos
              </Link>
              {categorias.map((categoria) => (
                <button
                  key={categoria.id}
                  className="px-6 py-2 rounded-full text-sm font-semibold transition-colors"
                  style={{
                    backgroundColor: `${categoria.color}20`,
                    color: categoria.color || '#F9B513',
                    border: `2px solid ${categoria.color}`,
                  }}
                >
                  {categoria.nombre}
                </button>
              ))}
            </div>
          )}

          {articulos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-8">
                Blog en construcción. Próximamente publicaremos artículos sobre arquitectura técnica en Murcia.
              </p>
              <Link href="/contacto" className="btn btn-primary">
                Contacta con nosotros
              </Link>
            </div>
          ) : (
            <>
              {/* Grid de artículos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articulos.map((articulo) => (
                  <Link
                    key={articulo.id}
                    href={`/blog/${articulo.slug}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                  >
                    {/* Imagen destacada */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={articulo.imagen_destacada}
                        alt={articulo.titulo}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                      
                      {/* Categoría */}
                      {articulo.categoria && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-primary shadow-md">
                            {articulo.categoria.nombre}
                          </span>
                        </div>
                      )}
                      
                      {/* Destacado */}
                      {articulo.destacado && (
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-primary shadow-lg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="mr-1"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            Destacado
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Contenido */}
                    <div className="p-6">
                      <h3 className="text-xl font-heading font-bold text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2">
                        {articulo.titulo}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {articulo.resumen}
                      </p>
                      
                      {/* Meta info */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="mr-1"
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
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="mr-1"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {articulo.tiempo_lectura || 5} min
                        </div>
                      </div>
                      
                      {/* Tags */}
                      {articulo.tags && articulo.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {articulo.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* CTA */}
                      <div className="flex items-center text-accent font-semibold group-hover:translate-x-2 transition-transform">
                        Leer artículo
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="ml-2"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section bg-primary text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            ¿Quieres recibir nuestros artículos?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Suscríbete a nuestro newsletter y mantente al día con consejos, guías y novedades sobre reformas y arquitectura técnica en Murcia.
          </p>
          <NewsletterForm variant="inline" />
        </div>
      </section>
    </>
  );
}

