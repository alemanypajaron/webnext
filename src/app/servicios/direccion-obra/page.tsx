import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Dirección de Obra en Murcia | Técnico de Edificación Colegiado | Precio y Servicios',
  description: 'Dirección de obra en Murcia por técnicos de edificación colegiados. Supervisión técnica profesional, control de calidad, cumplimiento de plazos y presupuesto. Presupuesto sin compromiso.',
  keywords: 'dirección de obra murcia, director de obra murcia, técnico edificación murcia dirección obra, dirección obra murcia precio, gestor obras murcia dirección obra, supervisión obra murcia, control calidad obra murcia',
  alternates: {
    canonical: '/servicios/direccion-obra',
  },
  openGraph: {
    title: 'Dirección de Obra en Murcia | Técnico de Edificación Colegiado',
    description: 'Dirección de obra en Murcia por gestores de obras colegiados. Supervisión técnica profesional y control de calidad.',
    type: 'website',
    url: 'https://www.alemanypajaron.es/servicios/direccion-obra',
  },
};

export default function DireccionObraPage() {
  const serviciosIncluidos = [
    {
      title: 'Control de Ejecución',
      description: 'Supervisión continua para verificar que la obra se ejecuta según proyecto y normativa vigente en Murcia.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
    {
      title: 'Seguridad y Salud',
      description: 'Coordinación de seguridad en fase de ejecución y control del plan de seguridad.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      title: 'Documentación',
      description: 'Libro de órdenes, actas, certificaciones y toda la documentación técnica necesaria.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      title: 'Control de Plazos',
      description: 'Seguimiento del planning de obra para cumplir los tiempos establecidos.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      title: 'Control Económico',
      description: 'Supervisión del presupuesto y certificaciones de obra ejecutada.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      title: 'Coordinación',
      description: 'Gestión y coordinación de todos los agentes intervinientes en la obra.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          slug: 'direccion-obra',
          serviceType: 'Dirección de obra',
          name: 'Dirección de Obra en Murcia',
          description:
            'Dirección de obra en Murcia por técnicos de edificación colegiados. Supervisión técnica profesional, control de calidad, cumplimiento de plazos y presupuesto. Presupuesto sin compromiso.',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Servicios', url: `${SITE_URL}/servicios` },
            { name: 'Dirección de obra', url: `${SITE_URL}/servicios/direccion-obra` },
          ],
        })}
      />

      <PageHeader
        badge="Servicios"
        title="Dirección de Obra en Murcia: Gestor de Obras Colegiado"
        subtitle="Supervisión técnica profesional de obras en Murcia. Control de calidad, cumplimiento de plazos y normativa vigente."
        image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Dirección de obra Murcia"
        highlightedWord="Dirección de Obra"
      />

      {/* Content */}
      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
                ¿Qué hacemos?
              </span>
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">
                Dirección de Obra en Murcia: Supervisión Técnica Profesional
              </h2>
              <p className="text-xl text-gray-700 mb-4 leading-relaxed">
                La dirección de obra es fundamental para garantizar que tu proyecto se ejecute correctamente,
                cumpliendo normativa, plazos y presupuesto.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Como técnicos de edificación colegiados en Murcia, nos encargamos de supervisar todos los aspectos de
                la ejecución de tu obra, desde el replanteo inicial hasta la entrega final.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Actuamos como tu representante técnico en la obra, velando por tus intereses y asegurando que todo
                se ejecute según proyecto.
              </p>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80"
                alt="Director de obra en Murcia"
                width={600}
                height={700}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 w-full h-full bg-accent/20 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Servicios incluidos */}
      <section className="section bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              Incluido en el servicio
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary">¿Qué incluye la dirección de obra?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviciosIncluidos.map((servicio) => (
              <div key={servicio.title} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center text-primary mb-6">
                  {servicio.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-primary mb-3">{servicio.title}</h3>
                <p className="text-gray-600 leading-relaxed">{servicio.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              Metodología
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary">Cómo dirigimos tu obra en Murcia</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                num: '01',
                title: 'Replanteo Inicial',
                desc: 'Verificamos que el proyecto es ejecutable y comprobamos medidas in situ antes de empezar.',
              },
              {
                num: '02',
                title: 'Supervisión Continua',
                desc: 'Visitas periódicas a obra para control de calidad, plazos y resolución de dudas técnicas.',
              },
              {
                num: '03',
                title: 'Coordinación',
                desc: 'Gestionamos todos los gremios y agentes, optimizando tiempos y evitando conflictos.',
              },
              {
                num: '04',
                title: 'Entrega Final',
                desc: 'Recepción de obra, certificado final y documentación completa para legalizar.',
              },
            ].map((paso) => (
              <div key={paso.num} className="relative">
                <div className="text-7xl font-bold text-accent/10 mb-4">{paso.num}</div>
                <h3 className="text-2xl font-heading font-semibold text-primary mb-3">{paso.title}</h3>
                <p className="text-gray-600 leading-relaxed">{paso.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tipos de obra */}
      <section className="section bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              Experiencia
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary">Tipos de obra que dirigimos en Murcia</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Obra Nueva',
                items: ['Viviendas unifamiliares', 'Edificios residenciales', 'Naves industriales', 'Locales comerciales'],
              },
              {
                title: 'Reformas',
                items: ['Reformas integrales', 'Ampliaciones', 'Rehabilitaciones', 'Cambios de uso'],
              },
              {
                title: 'Otros Proyectos',
                items: ['Piscinas y exteriores', 'Instalaciones', 'Proyectos de urbanización', 'Adecuaciones'],
              },
            ].map((tipo) => (
              <div key={tipo.title} className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-heading font-semibold text-primary mb-6">{tipo.title}</h3>
                <ul className="space-y-3">
                  {tipo.items.map((item) => (
                    <li key={item} className="flex items-start space-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-accent flex-shrink-0 mt-1"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="section bg-primary text-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-white">
              ¿Por qué contratar nuestro servicio de dirección de obra en Murcia?
            </h2>
            <p className="text-xl text-white">Más de 15 años dirigiendo obras con éxito en Murcia</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Colegiados y Asegurados',
                desc: 'Técnicos de edificación colegiados con seguro de responsabilidad civil profesional.',
              },
              {
                title: 'Conocimiento Local',
                desc: 'Más de 15 años trabajando en Murcia. Conocemos normativa local y procedimientos del Ayuntamiento.',
              },
              {
                title: 'Disponibilidad',
                desc: 'Respuesta rápida y visitas frecuentes a obra. Estamos cuando nos necesitas.',
              },
              {
                title: 'Transparencia',
                desc: 'Informes claros y comunicación constante. Sin letra pequeña ni sorpresas.',
              },
            ].map((ventaja) => (
              <div key={ventaja.title} className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                <h3 className="text-2xl font-heading font-semibold mb-3">{ventaja.title}</h3>
                <p className="text-white leading-relaxed">{ventaja.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        title="Preguntas frecuentes sobre dirección de obra"
        items={[
          {
            question: '¿Cuánto cuesta la dirección de obra en Murcia?',
            answer:
              'Normalmente entre el 2% y el 4% del presupuesto de ejecución material (PEM), según complejidad y duración. Te damos presupuesto cerrado antes de empezar.',
          },
          {
            question: '¿Es obligatoria la dirección de obra?',
            answer:
              'Sí, la Ley de Ordenación de la Edificación (LOE) exige dirección facultativa en obras. El técnico de edificación es el director de ejecución de obra.',
          },
          {
            question: '¿Cuántas visitas hace el director de obra?',
            answer:
              'Depende de la complejidad y fase de la obra. Normalmente 1-2 visitas semanales, y diarias en momentos críticos (cimentación, estructura, instalaciones).',
          },
          {
            question: '¿Qué pasa si hay un problema en la obra?',
            answer:
              'Como director de obra, paramos la ejecución si detectamos incumplimientos, proponemos soluciones técnicas y gestionamos la corrección con los responsables.',
          },
          {
            question: '¿El director de obra controla el presupuesto?',
            answer:
              'Sí, certificamos mensualmente la obra ejecutada y te informamos del consumo de presupuesto para que no haya sorpresas al final.',
          },
          {
            question: '¿Puedo contratar dirección de obra si ya empecé la obra?',
            answer:
              'Sí, podemos incorporarnos a obras en curso. Haremos una inspección inicial para conocer el estado y continuar con la supervisión.',
          },
        ]}
      />

      {/* CTA Final */}
      <section className="section bg-gray-100">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-heading font-bold mb-4 text-primary">
              ¿Necesitas director de obra en Murcia?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Solicita presupuesto sin compromiso. Más de 15 años de experiencia en Murcia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/presupuesto" className="px-8 py-4 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-all text-center text-lg shadow-lg">
                Solicitar Presupuesto
              </Link>
              <a
                href="tel:+34650075842"
                className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-all text-center text-lg border-2 border-primary flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                650 075 842
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
