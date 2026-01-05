import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getProyectoBySlug, getImagenesProyecto, getProyectosSlugs } from '@/lib/data';

type Props = {
  params: Promise<{ slug: string }>;
};

// Generar metadata dinámica
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const proyecto = await getProyectoBySlug(slug);

  if (!proyecto) {
    return {
      title: 'Proyecto no encontrado',
    };
  }

  return {
    title: `${proyecto.titulo} | Proyectos`,
    description: proyecto.descripcion_corta,
    openGraph: {
      title: proyecto.titulo,
      description: proyecto.descripcion_corta,
      images: [proyecto.imagen_principal],
    },
  };
}

// Generar páginas estáticas en build time
export async function generateStaticParams() {
  const slugs = await getProyectosSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProyectoPage({ params }: Props) {
  const { slug } = await params;
  const proyecto = await getProyectoBySlug(slug);

  if (!proyecto) {
    notFound();
  }

  const imagenes = await getImagenesProyecto(proyecto.id!);

  return (
    <>
      {/* Hero con imagen principal */}
      <section className="relative h-[60vh] min-h-[500px]">
        <Image
          src={proyecto.imagen_principal}
          alt={proyecto.titulo}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/90" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1280px] mx-auto px-6 pb-16 w-full">
            <Link
              href="/proyectos"
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
              Volver a Proyectos
            </Link>
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-4 drop-shadow-lg">
              {proyecto.titulo}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl drop-shadow">
              {proyecto.descripcion_corta}
            </p>
          </div>
        </div>
      </section>

      {/* Información del proyecto */}
      <section className="section bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-accent text-2xl font-bold mb-2">{proyecto.ano}</div>
              <div className="text-gray-600 text-sm">Año</div>
            </div>
            {proyecto.superficie && (
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="text-accent text-2xl font-bold mb-2">{proyecto.superficie}</div>
                <div className="text-gray-600 text-sm">Superficie</div>
              </div>
            )}
            {proyecto.duracion && (
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="text-accent text-2xl font-bold mb-2">{proyecto.duracion}</div>
                <div className="text-gray-600 text-sm">Duración</div>
              </div>
            )}
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-accent text-2xl font-bold mb-2">{proyecto.ubicacion.split(',')[0]}</div>
              <div className="text-gray-600 text-sm">Ubicación</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contenido principal */}
            <div className="lg:col-span-2">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: proyecto.descripcion_completa }}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Detalles */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-heading font-bold text-primary mb-4">
                  Detalles del Proyecto
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Ubicación:</span>
                    <span className="font-semibold text-primary">{proyecto.ubicacion}</span>
                  </div>
                  {proyecto.superficie && (
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Superficie:</span>
                      <span className="font-semibold text-primary">{proyecto.superficie}</span>
                    </div>
                  )}
                  {proyecto.presupuesto && (
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Presupuesto:</span>
                      <span className="font-semibold text-primary">{proyecto.presupuesto}</span>
                    </div>
                  )}
                  {proyecto.duracion && (
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Duración:</span>
                      <span className="font-semibold text-primary">{proyecto.duracion}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estado:</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      {proyecto.estado === 'completado' && 'Completado'}
                      {proyecto.estado === 'en_curso' && 'En Curso'}
                      {proyecto.estado === 'pausado' && 'Pausado'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Servicios */}
              {proyecto.servicios && proyecto.servicios.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-heading font-bold text-primary mb-4">
                    Servicios Aplicados
                  </h3>
                  <div className="space-y-2">
                    {proyecto.servicios.map((servicio, index) => (
                      <div key={index} className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-accent mr-2 mt-0.5 flex-shrink-0"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-gray-700 text-sm">{servicio}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-primary text-white p-6 rounded-xl">
                <h3 className="text-xl font-heading font-bold mb-3">¿Tienes un proyecto similar?</h3>
                <p className="text-white/90 text-sm mb-4">
                  Podemos ayudarte a hacerlo realidad. Solicita un presupuesto sin compromiso.
                </p>
                <Link
                  href="/presupuesto"
                  className="block w-full text-center btn bg-accent text-primary hover:bg-accent-dark"
                >
                  Solicitar Presupuesto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de imágenes */}
      {imagenes.length > 0 && (
        <section className="section">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl font-heading font-bold text-primary mb-12 text-center">
              Galería del Proyecto
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {imagenes.map((imagen) => (
                <div
                  key={imagen.id}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group"
                >
                  <Image
                    src={imagen.url}
                    alt={imagen.alt_text || proyecto.titulo}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {imagen.descripcion && (
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white text-sm">{imagen.descripcion}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="section bg-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
            ¿Te gustaría trabajar con nosotros?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contáctanos y cuéntanos tu proyecto. Te asesoraremos sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto" className="btn btn-primary">
              Contactar
            </Link>
            <Link href="/proyectos" className="btn btn-secondary">
              Ver Más Proyectos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

