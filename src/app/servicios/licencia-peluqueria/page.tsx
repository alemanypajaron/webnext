import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Licencia Apertura Peluquería Murcia | Desde 1.800€ | Alemán y Pajarón',
  description: 'Tramitación licencia apertura peluquería y barbería en Murcia desde 1.800€. Proyecto técnico, gestión ayuntamiento. +15 años experiencia.',
  keywords: 'licencia apertura peluqueria murcia, licencia barberia murcia, abrir peluqueria murcia, licencia actividad peluqueria',
  alternates: { canonical: 'https://www.alemanypajaron.es/servicios/licencia-peluqueria' },
  openGraph: {
    title: 'Licencia Apertura Peluquería Murcia | Alemán y Pajarón',
    description: 'Tramitación completa licencia apertura peluquería. Proyecto técnico y gestión.',
    url: 'https://www.alemanypajaron.es/servicios/licencia-peluqueria',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Licencia Peluquería Murcia | Alemán y Pajarón',
    description: 'Tramitación desde 1.800€. Gestión completa.',
  },
};

export default function LicenciaPeluqueriaPage() {
  const serviciosIncluidos = [
    {
      title: 'Proyecto Técnico Peluquería',
      desc: 'Planos del salón, distribución puestos de trabajo, zona lavado, recepción, almacén. Instalaciones eléctricas y fontanería.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      title: 'Instalaciones Agua y Desagüe',
      desc: 'Diseño y certificación de instalaciones de fontanería para lavacabezas. Agua caliente y fría, desagües.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M2 12h20" />
        </svg>
      ),
    },
    {
      title: 'Ventilación y Climatización',
      desc: 'Sistema de ventilación adecuado para productos químicos. Aire acondicionado si procede.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 7l-5 5-5-5M7 17l5-5 5 5" />
        </svg>
      ),
    },
    {
      title: 'Instalación Eléctrica',
      desc: 'Certificado eléctrico. Puntos de luz, enchufes, iluminación específica para cada zona.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      title: 'Tramitación Ayuntamiento',
      desc: 'Presentación documentación completa, seguimiento expediente, resolución requerimientos hasta concesión.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 12h6M9 16h6M9 8h6" />
        </svg>
      ),
    },
    {
      title: 'Asesoramiento Normativa',
      desc: 'Te informamos de toda la normativa higiénico-sanitaria aplicable a peluquerías y salones de belleza.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
      ),
    },
  ];

  const precios = [
    {
      tipo: 'Peluquería Básica',
      desde: '1.800€',
      incluye: ['Hasta 50m²', 'Sin lavacabezas', 'Proyecto básico', 'Tramitación completa', 'Plazo: 1-2 meses'],
    },
    {
      tipo: 'Peluquería Completa',
      desde: '2.200€',
      incluye: ['Hasta 80m²', 'Con lavacabezas', 'Ventilación', 'Certificados instalaciones', 'Plazo: 2-3 meses'],
    },
    {
      tipo: 'Centro Estética',
      desde: '2.800€',
      incluye: ['Más de 80m²', 'Zona estética', 'Cabinas', 'Climatización', 'Plazo: 2-3 meses'],
    },
  ];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          slug: 'licencia-peluqueria',
          serviceType: 'Licencia de apertura peluquería y barbería',
          name: 'Licencia Apertura Peluquería Murcia',
          description: 'Tramitación completa licencia apertura peluquería en Murcia. Proyecto técnico y gestión ayuntamiento.',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Servicios', url: `${SITE_URL}/servicios` },
            { name: 'Licencia Peluquería', url: `${SITE_URL}/servicios/licencia-peluqueria` },
          ],
        })}
      />

      <PageHeader
        badge="Licencias Peluquerías"
        title="Licencia Apertura Peluquería y Barbería en Murcia desde 1.800€"
        subtitle="Tramitación completa: proyecto técnico, gestión ayuntamiento y certificados"
        image="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Licencia peluquería Murcia"
        highlightedWord="Peluquería"
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
                ¿Quieres abrir una peluquería o barbería en Murcia?
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                Te gestionamos toda la tramitación de la licencia de apertura para que puedas abrir tu negocio sin complicaciones.
              </p>
              <p className="text-gray-600 mb-4">
                Más de 15 años tramitando licencias de peluquerías y salones de belleza en Murcia. Conocemos todos los requisitos y te evitamos sorpresas.
              </p>
              <ul className="space-y-3">
                {[
                  'Proyecto adaptado a tu salón',
                  'Tramitación rápida 1-2 meses',
                  'Certificado instalaciones incluido',
                  'Seguimiento hasta la concesión',
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
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80"
                alt="Interior salón de peluquería en Murcia"
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
              ¿Qué incluye la tramitación de licencia?
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
              ¿Cuánto cuesta la licencia de peluquería?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Presupuestos según tipo de actividad y superficie del local
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
            * Precios orientativos sin tasas municipales. Presupuesto final según características del local.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        title="Preguntas frecuentes sobre licencia de peluquería en Murcia"
        items={[
          {
            question: '¿Cuánto tarda la tramitación de la licencia?',
            answer: 'Entre 1 y 3 meses desde la presentación. Es más rápida que hostelería porque no requiere cocina ni instalaciones complejas.',
          },
          {
            question: '¿Necesito licencia sanitaria para una peluquería?',
            answer: 'No. Las peluquerías no requieren licencia sanitaria específica, pero sí deben cumplir normativa higiénico-sanitaria básica.',
          },
          {
            question: '¿Qué instalaciones son obligatorias?',
            answer: 'Lavacabezas con agua caliente/fría, ventilación adecuada, aseo para clientes, instalación eléctrica certificada.',
          },
          {
            question: '¿Puedo ampliar a centro de estética después?',
            answer: 'Sí, pero necesitarás modificar la licencia. Si desde el principio piensas ofrecer servicios de estética, mejor solicitarlo directamente.',
          },
          {
            question: '¿Incluye la reforma del local?',
            answer: 'No, este servicio es solo tramitación. Si necesitas reforma del local, tenemos servicio específico de reforma de peluquería.',
          },
        ]}
      />

      {/* CTA Final */}
      <section className="section bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            ¿Listo para abrir tu peluquería?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Te gestionamos toda la tramitación para que puedas centrarte en tu negocio
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
              href="/servicios/reforma-peluqueria"
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
                    Reforma de Peluquería
                  </h3>
                  <p className="text-gray-600 mb-3">Diseño y ejecución completa de tu salón. Desde 12.000€</p>
                  <span className="text-accent font-semibold text-sm">Ver servicio →</span>
                </div>
              </div>
            </Link>

            <Link
              href="/servicios/abrir-peluqueria-murcia"
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
                    Guía Completa: Abrir Peluquería
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
