import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Licencia Apertura Centro Médico Murcia | Desde 4.200€ | Alemán y Pajarón',
  description: 'Tramitación licencia apertura centro médico y clínica en Murcia desde 4.200€. Proyecto técnico sanitario completo. +15 años experiencia.',
  keywords: 'licencia apertura centro medico murcia, licencia clinica medica murcia, abrir centro medico murcia, licencia actividad sanitaria',
  alternates: { canonical: 'https://www.alemanypajaron.es/servicios/licencia-centro-medico' },
  openGraph: {
    title: 'Licencia Apertura Centro Médico Murcia | Alemán y Pajarón',
    description: 'Tramitación completa licencia apertura centro médico. Proyecto técnico sanitario.',
    url: 'https://www.alemanypajaron.es/servicios/licencia-centro-medico',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Licencia Centro Médico Murcia | Alemán y Pajarón',
    description: 'Tramitación desde 4.200€. Gestión completa.',
  },
};

export default function LicenciaCentroMedicoPage() {
  const serviciosIncluidos = [
    {
      title: 'Proyecto Técnico Sanitario',
      desc: 'Planos consultas, sala espera, enfermería, archivo historias, aseos pacientes/personal. Cumplimiento Real Decreto centros sanitarios.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      title: 'Consultas y Especialidades',
      desc: 'Diseño consultas por especialidad: medicina general, pediatría, traumatología, etc. Lavabos, mobiliario clínico.',
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
      title: 'Sala Exploraciones/Quirófano',
      desc: 'Si procede: quirófano menor, sala ecografías, rayos X. Instalaciones específicas según servicios ofrecidos.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      title: 'Instalaciones Sanitarias',
      desc: 'Agua fría/caliente en consultas, desagües clínicos, oxígeno si procede, esterilización, almacén medicamentos.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M2 12h20" />
        </svg>
      ),
    },
    {
      title: 'Climatización y Ventilación',
      desc: 'Climatización independiente por zonas. Ventilación forzada. Extracción en quirófano si procede.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 7l-5 5-5-5M7 17l5-5 5 5" />
        </svg>
      ),
    },
    {
      title: 'Autorización Sanitaria Completa',
      desc: 'Ayuntamiento + Consejería Sanidad (Autorización Sanitaria). Registro Sanitario. Comunicación SMS si procede.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 12h6M9 16h6M9 8h6" />
        </svg>
      ),
    },
  ];

  const precios = [
    {
      tipo: 'Consulta Individual',
      desde: '4.200€',
      incluye: ['Hasta 60m²', '1-2 consultas', 'Sin pruebas', 'Autorización básica', 'Plazo: 4-5 meses'],
    },
    {
      tipo: 'Centro Médico',
      desde: '5.500€',
      incluye: ['Hasta 150m²', '3-5 especialidades', 'Sala exploraciones', 'Enfermería', 'Plazo: 5-6 meses'],
    },
    {
      tipo: 'Policlínica',
      desde: '7.500€',
      incluye: ['Más de 150m²', 'Múltiples especialidades', 'Quirófano menor', 'Rayos X/ecografía', 'Plazo: 6-8 meses'],
    },
  ];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          slug: 'licencia-centro-medico',
          serviceType: 'Licencia de apertura centro médico',
          name: 'Licencia Apertura Centro Médico Murcia',
          description: 'Tramitación completa licencia apertura centro médico en Murcia. Proyecto técnico sanitario y autorización.',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Servicios', url: `${SITE_URL}/servicios` },
            { name: 'Licencia Centro Médico', url: `${SITE_URL}/servicios/licencia-centro-medico` },
          ],
        })}
      />

      <PageHeader
        badge="Licencias Sanitarias"
        title="Licencia Apertura Centro Médico y Clínica en Murcia desde 4.200€"
        subtitle="Tramitación completa: proyecto técnico sanitario, autorización Consejería y Ayuntamiento"
        image="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Licencia centro médico Murcia"
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
                ¿Quieres abrir un centro médico o clínica en Murcia?
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                Te tramitamos la autorización sanitaria completa para que puedas abrir tu centro cumpliendo el Real Decreto de centros sanitarios.
              </p>
              <p className="text-gray-600 mb-4">
                Experiencia en consultas médicas, clínicas multiespecialidad, policlínicas, centros de fisioterapia y centros de diagnóstico. Conocemos los requisitos específicos de la Consejería de Sanidad de Murcia.
              </p>
              <ul className="space-y-3">
                {[
                  'Proyecto adaptado a especialidades',
                  'Autorización sanitaria incluida',
                  'Registro Sanitario gestionado',
                  'Tramitación 4-6 meses',
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
                alt="Interior de centro médico moderno en Murcia"
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
              Gestión completa
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary">
              ¿Qué Incluye la Licencia de Centro Médico en Murcia?
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
              Precio Licencia Centro Médico Murcia: ¿Cuánto Cuesta?
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
            * Precios orientativos sin tasas. Si incluyes rayos X, se añade proyecto CSN (+800€).
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        title="Preguntas frecuentes sobre licencia de centro médico en Murcia"
        items={[
          {
            question: '¿Cuánto tarda la autorización sanitaria de centro médico?',
            answer:
              'Entre 4 y 8 meses. Hay que tramitar ante Ayuntamiento y Consejería Sanidad (Autorización Sanitaria de Funcionamiento). Es proceso largo porque revisan el proyecto en detalle.',
          },
          {
            question: '¿Puedo abrir solo una consulta médica o necesito centro médico completo?',
            answer:
              'Puedes abrir una consulta individual (1-2 especialidades). Necesitas autorización sanitaria igual, pero el proyecto es más sencillo y económico.',
          },
          {
            question: '¿Qué diferencia hay entre centro médico y policlínica?',
            answer:
              'Centro médico: varias especialidades sin hospitalización. Policlínica: múltiples especialidades + quirófano menor + pruebas diagnósticas. La policlínica requiere autorización más compleja.',
          },
          {
            question: '¿Es obligatorio tener director médico?',
            answer:
              'Sí. Todo centro sanitario debe tener un director médico/sanitario responsable que figure en la autorización.',
          },
          {
            question: '¿Incluye la reforma del centro médico?',
            answer:
              'No, este servicio es solo tramitación. Si necesitas reforma completa, tenemos servicio específico de reforma de centro médico.',
          },
        ]}
      />

      {/* CTA Final */}
      <section className="section bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            ¿Listo para abrir tu centro médico?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Te tramitamos la autorización sanitaria completa
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
            Respuesta en menos de 24h • Asesoramiento gratuito • Presupuesto detallado
          </p>
        </div>
      </section>

      {/* Servicios relacionados - CROSS SELL NIVEL 3 */}
      <section className="section bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center">
            También necesitarás
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/servicios/reforma-centro-medico"
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all group border-2 border-accent/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                    <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    Reforma de Centro Médico
                  </h3>
                  <p className="text-gray-600 mb-3">Diseño y ejecución con consultas y sala exploraciones. Desde 35.000€</p>
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
