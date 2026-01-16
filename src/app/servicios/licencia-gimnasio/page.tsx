import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Licencia Apertura Gimnasio Murcia | Desde 3.200€ | Alemán y Pajarón',
  description: 'Tramitación licencia apertura gimnasio y box en Murcia desde 3.200€. Proyecto técnico completo, gestión ayuntamiento. +15 años experiencia.',
  keywords: 'licencia apertura gimnasio murcia, licencia box crossfit murcia, abrir gimnasio murcia, licencia actividad gimnasio',
  alternates: { canonical: 'https://www.alemanypajaron.es/servicios/licencia-gimnasio' },
  openGraph: {
    title: 'Licencia Apertura Gimnasio Murcia | Alemán y Pajarón',
    description: 'Tramitación completa licencia apertura gimnasio. Proyecto técnico y gestión.',
    url: 'https://www.alemanypajaron.es/servicios/licencia-gimnasio',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Licencia Gimnasio Murcia | Alemán y Pajarón',
    description: 'Tramitación desde 3.200€. Gestión completa.',
  },
};

export default function LicenciaGimnasioPage() {
  const serviciosIncluidos = [
    {
      title: 'Proyecto Técnico Gimnasio',
      desc: 'Planos sala musculación, zona cardio, vestuarios, duchas, recepción. Distribución máquinas y espacios funcionales.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      title: 'Vestuarios y Duchas',
      desc: 'Diseño vestuarios con taquillas, duchas con agua caliente, aseos. Instalaciones de fontanería completas.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 7h10v10H7z" />
          <path d="M5 5h14v14H5z" />
        </svg>
      ),
    },
    {
      title: 'Ventilación y Climatización',
      desc: 'Sistema de ventilación forzada obligatorio. Climatización adecuada para actividad deportiva intensa.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 7l-5 5-5-5M7 17l5-5 5 5" />
        </svg>
      ),
    },
    {
      title: 'Instalación Eléctrica Reforzada',
      desc: 'Certificado eléctrico. Potencia suficiente para máquinas, iluminación, climatización, música.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      title: 'Insonorización Acústica',
      desc: 'Estudio acústico obligatorio. Aislamiento para evitar molestias por música y caída de pesos.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      ),
    },
    {
      title: 'Tramitación Completa',
      desc: 'Presentación Ayuntamiento, seguimiento expediente, comunicación ambiental si procede, resolución hasta concesión.',
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
      tipo: 'Box/Sala Pequeña',
      desde: '3.200€',
      incluye: ['Hasta 100m²', 'Vestuarios básicos', 'Proyecto técnico', 'Insonorización', 'Plazo: 2-3 meses'],
    },
    {
      tipo: 'Gimnasio Medio',
      desde: '4.200€',
      incluye: ['Hasta 250m²', 'Vestuarios completos', 'Zona cardio + musculación', 'Certificados completos', 'Plazo: 3-4 meses'],
    },
    {
      tipo: 'Gimnasio Grande',
      desde: '5.500€',
      incluye: ['Más de 250m²', 'Actividades dirigidas', 'Zona funcional', 'Climatización potente', 'Plazo: 4-5 meses'],
    },
  ];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          slug: 'licencia-gimnasio',
          serviceType: 'Licencia de apertura gimnasio y box',
          name: 'Licencia Apertura Gimnasio Murcia',
          description: 'Tramitación completa licencia apertura gimnasio en Murcia. Proyecto técnico y gestión ayuntamiento.',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Servicios', url: `${SITE_URL}/servicios` },
            { name: 'Licencia Gimnasio', url: `${SITE_URL}/servicios/licencia-gimnasio` },
          ],
        })}
      />

      <PageHeader
        badge="Licencias Deportivas"
        title="Licencia Apertura Gimnasio y Box en Murcia desde 3.200€"
        subtitle="Tramitación completa: proyecto técnico, gestión ayuntamiento y certificados"
        image="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Licencia gimnasio Murcia"
        highlightedWord="Gimnasio"
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
                ¿Quieres abrir un gimnasio o box en Murcia?
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                Te tramitamos la licencia de apertura completa para que puedas abrir tu centro deportivo cumpliendo toda la normativa.
              </p>
              <p className="text-gray-600 mb-4">
                Experiencia en gimnasios convencionales, boxes de CrossFit, centros de entrenamiento funcional y estudios boutique. Conocemos los requisitos específicos de insonorización y ventilación.
              </p>
              <ul className="space-y-3">
                {[
                  'Proyecto adaptado a tu gimnasio',
                  'Estudio acústico incluido',
                  'Vestuarios y duchas certificados',
                  'Tramitación 2-4 meses',
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
                src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80"
                alt="Interior de gimnasio con equipamiento en Murcia"
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
              ¿Qué Incluye la Licencia de Gimnasio y Box en Murcia?
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
              Precio Licencia Gimnasio Murcia: ¿Cuánto Cuesta?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Presupuestos según superficie y tipo de actividad deportiva
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
        title="Preguntas frecuentes sobre licencia de gimnasio en Murcia"
        items={[
          {
            question: '¿Cuánto tarda la tramitación de la licencia de gimnasio?',
            answer:
              'Entre 2 y 4 meses. Los gimnasios requieren estudio acústico y ventilación, lo que alarga algo el proceso respecto a otras licencias.',
          },
          {
            question: '¿Es obligatorio el estudio acústico?',
            answer:
              'Sí, siempre. Los gimnasios generan ruido por música, caída de pesos y actividades dirigidas. El estudio acústico es obligatorio y debe incluir medidas de aislamiento.',
          },
          {
            question: '¿Qué ventilación se necesita en un gimnasio?',
            answer:
              'Ventilación forzada con renovación de aire adecuada para actividad deportiva intensa. El proyecto técnico debe calcular la ventilación según m² y aforo.',
          },
          {
            question: '¿Puedo abrir un box de CrossFit sin licencia?',
            answer:
              'No. Un box necesita licencia igual que cualquier gimnasio, además con mayor exigencia acústica por la caída de pesos desde altura.',
          },
          {
            question: '¿Incluye la reforma del gimnasio?',
            answer:
              'No, este servicio es solo tramitación de licencia. Si necesitas reforma completa, tenemos servicio específico de reforma de gimnasio.',
          },
        ]}
      />

      {/* CTA Final */}
      <section className="section bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            ¿Listo para abrir tu gimnasio?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Te tramitamos la licencia completa para que puedas abrir cuanto antes
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
              href="/servicios/reforma-gimnasio"
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
                    Reforma de Gimnasio
                  </h3>
                  <p className="text-gray-600 mb-3">Diseño y ejecución completa de tu gimnasio o box. Desde 25.000€</p>
                  <span className="text-accent font-semibold text-sm">Ver servicio →</span>
                </div>
              </div>
            </Link>

            <Link
              href="/blog/como-abrir-gimnasio-box-murcia-guia-completa-2026"
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
                    Guía Completa: Abrir un Gimnasio
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
