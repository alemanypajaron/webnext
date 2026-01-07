import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PageHeader from '@/components/ui/PageHeader';
import { getProyectos } from '@/lib/data';

// ISR: Regenerar cada hora
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Proyectos de Arquitectura y Reformas en Murcia | Portfolio +250 Obras',
  description: 'Portfolio de proyectos realizados en Murcia por Alemán y Pajarón. Más de 250 obras completadas: reformas integrales, dirección de obra, viviendas, locales comerciales y proyectos de rehabilitación.',
  keywords: 'proyectos arquitectura murcia, portfolio obras murcia, reformas murcia ejemplos, proyectos reforma murcia, obras realizadas murcia, portfolio arquitecto técnico murcia',
  alternates: {
    canonical: 'https://www.alemanypajaron.es/proyectos',
  },
  openGraph: {
    title: 'Proyectos Realizados en Murcia | Alemán y Pajarón',
    description: 'Más de 250 proyectos de reformas y obras completadas en Murcia. Ver portfolio.',
    url: 'https://www.alemanypajaron.es/proyectos',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio de Proyectos | Alemán y Pajarón Murcia',
    description: '+250 proyectos de arquitectura y reformas en Murcia.',
  },
};

export default async function ProyectosPage() {
  const proyectos = await getProyectos();

  return (
    <>
      <PageHeader
        badge="Portfolio"
        title="Nuestros Proyectos"
        subtitle="Más de 250 proyectos completados en Murcia"
        image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Proyectos de arquitectura en Murcia"
        highlightedWord="Proyectos"
      />

      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          {proyectos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-8">
                Portfolio en construcción. Próximamente mostraremos nuestros mejores proyectos.
              </p>
              <Link href="/contacto" className="btn btn-primary">
                Consulta nuestros servicios
              </Link>
            </div>
          ) : (
            <>
              {/* Intro */}
              <div className="text-center mb-16">
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Cada proyecto es único y refleja nuestro compromiso con la excelencia en arquitectura técnica.
                  Descubre algunos de nuestros trabajos más destacados en Murcia y alrededores.
                </p>
              </div>

              {/* Grid de proyectos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {proyectos.map((proyecto) => (
                  <Link
                    key={proyecto.id}
                    href={`/proyectos/${proyecto.slug}`}
                    className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
                  >
                    {/* Imagen */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={proyecto.imagen_principal}
                        alt={proyecto.titulo}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      {/* Badge de estado */}
                      {proyecto.destacado && (
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent text-primary shadow-lg">
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
                      
                      {/* Año */}
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-primary">
                          {proyecto.ano}
                        </span>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-6">
                      <h3 className="text-xl font-heading font-bold text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {proyecto.titulo}
                      </h3>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-3">
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
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {proyecto.ubicacion}
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {proyecto.descripcion_corta}
                      </p>
                      
                      {/* Detalles */}
                      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                        {proyecto.superficie && (
                          <div className="bg-gray-50 px-3 py-2 rounded">
                            <span className="text-gray-500">Superficie</span>
                            <p className="font-semibold text-primary">{proyecto.superficie}</p>
                          </div>
                        )}
                        {proyecto.duracion && (
                          <div className="bg-gray-50 px-3 py-2 rounded">
                            <span className="text-gray-500">Duración</span>
                            <p className="font-semibold text-primary">{proyecto.duracion}</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Servicios */}
                      {proyecto.servicios && proyecto.servicios.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {proyecto.servicios.slice(0, 2).map((servicio, index) => (
                            <span
                              key={index}
                              className="text-xs px-2 py-1 bg-accent/10 text-primary rounded-full"
                            >
                              {servicio}
                            </span>
                          ))}
                          {proyecto.servicios.length > 2 && (
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                              +{proyecto.servicios.length - 2} más
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* CTA */}
                      <div className="flex items-center text-accent font-semibold group-hover:translate-x-2 transition-transform">
                        Ver proyecto
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

      {/* CTA */}
      <section className="section bg-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
            ¿Te gustaría que tu proyecto aparezca aquí?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Trabajemos juntos para hacer realidad tu proyecto de arquitectura en Murcia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/presupuesto" className="btn btn-primary">
              Solicitar Presupuesto
            </Link>
            <Link href="/contacto" className="btn btn-secondary">
              Contactar
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

