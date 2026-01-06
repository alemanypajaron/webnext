import Link from 'next/link';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Servicios de Gestión de Obras y Proyectos en Murcia | Alemán y Pajarón',
  description: 'Servicios profesionales de gestión de obras en Murcia: dirección de obra, reformas, licencias, coordinación de proyectos, diseño y asesoramiento técnico. Más de 15 años de experiencia.',
  keywords: 'gestión obras murcia, dirección obra murcia, técnico edificación murcia, gestor obras murcia, reformas murcia, licencias obra murcia, coordinación proyectos',
  alternates: {
    canonical: 'https://www.alemanypajaron.es/servicios',
  },
};

export default function ServiciosPage() {
  const servicios = [
    {
      slug: 'asesoramiento-tecnico',
      title: 'Asesoramiento Técnico',
      description: 'Consultoría especializada en construcción, informes periciales y asesoramiento para tomar las mejores decisiones en tu proyecto.',
      items: ['Informes técnicos', 'Valoraciones y tasaciones', 'Peritaciones judiciales'],
      icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20zm0 16v-4m0-4h.01',
    },
    {
      slug: 'direccion-obra',
      title: 'Dirección de Obra',
      description: 'Supervisión técnica profesional durante toda la ejecución del proyecto. Control de calidad, cumplimiento de normativa y coordinación de todos los agentes intervinientes.',
      items: ['Control de ejecución y calidad', 'Supervisión de seguridad', 'Certificaciones y actas'],
      icon: 'M3 21h18M5 21V7l7-4 7 4v14M9 9v.01M9 12v.01M9 15v.01M9 18v.01',
    },
    {
      slug: 'diseno-espacios',
      title: 'Diseño de Espacios',
      description: 'Proyectos de distribución interior y diseño de espacios funcionales adaptados a tus necesidades y estilo de vida.',
      items: ['Distribución interior', 'Renders 3D', 'Selección de materiales'],
      icon: 'M3 3h18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 6h18M9 3v18',
    },
    {
      slug: 'gestion-proyectos',
      title: 'Gestión de Proyectos',
      description: 'Planificación integral, coordinación de equipos y control exhaustivo de plazos y presupuestos para garantizar el éxito de tu proyecto.',
      items: ['Planning y cronograma', 'Control de costes', 'Coordinación de equipos'],
      icon: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2m4-2v4m0 0H8m4 0h4m-5 5 2 2 4-4',
    },
    {
      slug: 'licencias-permisos',
      title: 'Licencias y Permisos',
      description: 'Tramitación completa de licencias urbanísticas y permisos necesarios ante el Ayuntamiento de Murcia.',
      items: ['Licencias de obra', 'Licencias de actividad', 'Declaraciones responsables'],
      icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm0 0v6h6M16 13H8m8 4H8m2-8H8',
    },
    {
      slug: 'reformas-integrales',
      title: 'Reformas Integrales',
      description: 'Transformación completa de viviendas, locales y oficinas. Desde el diseño hasta la entrega final.',
      items: ['Reforma de viviendas', 'Reforma de locales', 'Reforma de oficinas'],
      icon: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
    },
  ];

  return (
    <>
      <PageHeader
        badge="Lo Que Hacemos"
        title="Nuestros Servicios"
        subtitle="Soluciones integrales de gestión de obras y proyectos para cada fase de tu construcción"
        image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Servicios de gestión de obras y proyectos"
        highlightedWord="Servicios"
      />

      {/* Services Grid */}
      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {servicios.map((servicio) => (
              <Link
                key={servicio.slug}
                href={`/servicios/${servicio.slug}`}
                className="group bg-gray-100 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <path d={servicio.icon} />
                  </svg>
                </div>

                <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-4 group-hover:text-accent transition-colors">
                  {servicio.title}
                </h2>

                <p className="text-gray-600 mb-6 leading-relaxed">{servicio.description}</p>

                <ul className="space-y-3 mb-6">
                  {servicio.items.map((item) => (
                    <li key={item} className="flex items-center space-x-3 text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-accent flex-shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <span className="inline-flex items-center space-x-2 text-primary font-semibold group-hover:text-accent transition-colors">
                  <span>Ver servicio completo</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary">
            ¿Necesitas asesoramiento profesional?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Contacta con nosotros y cuéntanos tu proyecto. Te ofrecemos presupuesto sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/presupuesto" className="px-8 py-4 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-all text-center text-lg shadow-lg">
              Solicitar Presupuesto
            </Link>
            <Link
              href="/contacto"
              className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-all text-center text-lg border-2 border-primary"
            >
              Contactar
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
