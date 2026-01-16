import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Reforma Centro Médico Murcia | Desde 35.000€ | Alemán y Pajarón',
  description: 'Reforma integral centro médico y clínica en Murcia desde 35.000€. Consultas, sala exploraciones, quirófano menor. +15 años experiencia.',
  keywords: 'reforma centro medico murcia, reforma clinica medica murcia, reformar centro medico precio murcia',
  alternates: { canonical: 'https://www.alemanypajaron.es/servicios/reforma-centro-medico' },
  openGraph: {
    title: 'Reforma Centro Médico Murcia | Alemán y Pajarón',
    description: 'Reforma integral centro médico. Diseño completo y ejecución.',
    url: 'https://www.alemanypajaron.es/servicios/reforma-centro-medico',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Reforma Centro Médico Murcia | Alemán y Pajarón',
    description: 'Reforma integral desde 35.000€.',
  },
};

export default function ReformaCentroMedicoPage() {
  const serviciosIncluidos = [
    {
      title: 'Diseño Centro Médico',
      desc: 'Distribución consultas por especialidad, sala espera, enfermería, archivo historias, aseos pacientes/personal.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      title: 'Consultas Médicas',
      desc: 'Consultas individuales con lavabo, escritorio, iluminación específica, mobiliario clínico. Separación por especialidad.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      title: 'Sala Exploraciones',
      desc: 'Sala exploraciones con camilla, iluminación quirúrgica, lavabo, almacenaje material. Quirófano menor si procede.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      title: 'Instalaciones Sanitarias',
      desc: 'Agua caliente/fría en consultas, desagües clínicos, oxígeno si procede, esterilización, almacén medicamentos.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M2 12h20" />
        </svg>
      ),
    },
    {
      title: 'Climatización y Ventilación',
      desc: 'Climatización independiente por zonas. Ventilación forzada. Extracción en quirófano menor si procede.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 7l-5 5-5-5M7 17l5-5 5 5" />
        </svg>
      ),
    },
    {
      title: 'Acabados Sanitarios',
      desc: 'Suelo porcelánico antideslizante, paredes lisas lavables, colores neutros profesionales, fácil limpieza.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
          <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
        </svg>
      ),
    },
  ];

  const precios = [
    {
      tipo: 'Consulta Individual',
      desde: '35.000€',
      incluye: ['Hasta 60m²', '1-2 consultas', 'Sala espera', 'Sin exploraciones', 'Acabados estándar'],
    },
    {
      tipo: 'Centro Médico',
      desde: '65.000€',
      incluye: ['100-150m²', '3-5 especialidades', 'Sala exploraciones', 'Enfermería', 'Acabados premium'],
    },
    {
      tipo: 'Policlínica',
      desde: '100.000€',
      incluye: ['Más de 150m²', 'Múltiples especialidades', 'Quirófano menor', 'Rayos X/ecografía', 'Todo equipado'],
    },
  ];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          slug: 'reforma-centro-medico',
          serviceType: 'Reforma de centro médico y clínica',
          name: 'Reforma Centro Médico Murcia',
          description: 'Reforma integral de centro médico en Murcia. Diseño completo, consultas, sala exploraciones.',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Servicios', url: `${SITE_URL}/servicios` },
            { name: 'Reforma Centro Médico', url: `${SITE_URL}/servicios/reforma-centro-medico` },
          ],
        })}
      />

      <PageHeader
        badge="Reformas Negocios"
        title="Reforma Integral Centro Médico y Clínica en Murcia desde 35.000€"
        subtitle="Diseño completo, consultas médicas y sala de exploraciones"
        image="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Reforma centro médico Murcia"
        highlightedWord="Médico"
      />

      {/* Introducción */}
      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
                +15 años de experiencia
              </span>
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">
                Reforma integral de centro médico en Murcia
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                Diseñamos y ejecutamos la reforma completa de tu centro médico. Desde consultas y sala de exploraciones hasta quirófano menor e instalaciones sanitarias.
              </p>
              <p className="text-gray-600 mb-4">
                Experiencia en consultas médicas, clínicas multiespecialidad, policlínicas y centros de diagnóstico. Cumplimos normativa Real Decreto centros sanitarios.
              </p>
              <ul className="space-y-3">
                {[
                  'Diseño 3D previo incluido',
                  'Consultas por especialidad',
                  'Sala exploraciones completa',
                  'Llave en mano: listo para abrir',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-accent flex-shrink-0"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=800&q=80"
                alt="Reforma interior centro médico moderno en Murcia"
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
              Reforma completa
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary">
              ¿Qué Incluye la Reforma de Centro Médico en Murcia?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviciosIncluidos.map((servicio) => (
              <div key={servicio.title} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all">
                <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center text-primary mb-6">
                  {servicio.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-primary mb-3">{servicio.title}</h3>
                <p className="text-gray-600 leading-relaxed">{servicio.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Precios */}
      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              Precios orientativos
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary mb-6">
              Precio Reforma Centro Médico Murcia: ¿Cuánto Cuesta?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Presupuestos según especialidades y superficie del centro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {precios.map((paquete, index) => (
              <div
                key={paquete.tipo}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all ${
                  index === 1 ? 'ring-2 ring-accent scale-105' : ''
                }`}
              >
                {index === 1 && (
                  <span className="inline-block px-3 py-1 bg-accent text-primary text-xs font-bold rounded-full mb-4">
                    MÁS COMÚN
                  </span>
                )}
                <h3 className="text-2xl font-heading font-bold text-primary mb-2">{paquete.tipo}</h3>
                <div className="text-4xl font-bold text-accent mb-6">
                  Desde {paquete.desde}
                </div>
                <ul className="space-y-3 mb-8">
                  {paquete.incluye.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-accent flex-shrink-0 mt-0.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/presupuesto"
                  className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all ${
                    index === 1
                      ? 'bg-accent text-primary hover:bg-accent-dark'
                      : 'bg-gray-100 text-primary hover:bg-gray-200'
                  }`}
                >
                  Solicitar presupuesto
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 mt-8">
            * Precios orientativos reforma completa llave en mano. Con rayos X se añade blindaje (+8.000€).
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        title="Preguntas frecuentes sobre reforma de centro médico en Murcia"
        items={[
          {
            question: '¿Cuánto tarda la reforma de un centro médico?',
            answer:
              'Entre 4 y 6 meses según tamaño. Consulta individual (60m²): 4 meses. Centro médico completo (150m²): 5-6 meses.',
          },
          {
            question: '¿Las camillas y equipos están incluidos?',
            answer:
              'No. La reforma incluye obra civil, instalaciones y acabados. Las camillas, equipos médicos, mobiliario clínico los compras tú o te asesoramos proveedores.',
          },
          {
            question: '¿Puedo tener quirófano menor?',
            answer:
              'Sí. Si ofreces cirugías menores puedes tener quirófano menor con gases medicinales, iluminación quirúrgica y extracción. Requiere autorización sanitaria específica.',
          },
          {
            question: '¿Qué diferencia hay con una clínica estética?',
            answer:
              'Centro médico: consultas médicas, exploraciones, posible quirófano menor. Clínica estética: cabinas tratamiento, ambiente relajante. Normativa diferente.',
          },
          {
            question: '¿Necesito licencia de obras?',
            answer:
              'Sí, casi siempre. Los centros médicos requieren licencia mayor por instalaciones especiales (oxígeno, quirófano). Te asesoramos y gestionamos.',
          },
        ]}
      />

      {/* CTA Final */}
      <section className="section bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            ¿Listo para reformar tu centro médico?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Te hacemos un diseño 3D gratis y presupuesto sin compromiso
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/presupuesto"
              className="px-10 py-4 bg-accent text-primary font-bold rounded-lg hover:bg-accent-dark transition-all text-lg shadow-xl"
            >
              Solicitar Presupuesto Gratis
            </Link>
            <a
              href="tel:+34650075842"
              className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/20 transition-all text-lg border-2 border-white/30"
            >
              Llamar: 650 075 842
            </a>
          </div>
          <p className="text-white/80 mt-6 text-sm">
            Respuesta en menos de 24h • Diseño 3D previo • Presupuesto cerrado
          </p>
        </div>
      </section>

      {/* Servicios relacionados */}
      <section className="section bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center">
            También puedes necesitar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/servicios/licencia-centro-medico"
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all group border-2 border-accent/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                    <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    Licencia Centro Médico
                  </h3>
                  <p className="text-gray-600 mb-3">¿También necesitas tramitar la licencia? Te gestionamos todo. Desde 4.200€</p>
                  <span className="text-accent font-semibold text-sm">Ver servicio →</span>
                </div>
              </div>
            </Link>

            <Link
              href="/blog/como-abrir-centro-medico-clinica-murcia-guia-completa-2026"
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all group border-2 border-accent/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    Guía Completa: Abrir Centro Médico
                  </h3>
                  <p className="text-gray-600 mb-3">Todo lo que necesitas: reforma + licencia + asesoramiento</p>
                  <span className="text-accent font-semibold text-sm">Ver guía completa →</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
