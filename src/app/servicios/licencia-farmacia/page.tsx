import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Licencia Apertura Farmacia Murcia | Desde 5.500€ | Alemán y Pajarón',
  description: 'Tramitación licencia apertura farmacia en Murcia desde 5.500€. Proyecto técnico completo, gestión ayuntamiento y Colegio. +15 años experiencia.',
  keywords: 'licencia apertura farmacia murcia, licencia farmacia murcia, abrir farmacia murcia, licencia actividad farmacia',
  alternates: { canonical: 'https://www.alemanypajaron.es/servicios/licencia-farmacia' },
  openGraph: {
    title: 'Licencia Apertura Farmacia Murcia | Alemán y Pajarón',
    description: 'Tramitación completa licencia apertura farmacia. Proyecto técnico y gestión.',
    url: 'https://www.alemanypajaron.es/servicios/licencia-farmacia',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Licencia Farmacia Murcia | Alemán y Pajarón',
    description: 'Tramitación desde 5.500€. Gestión completa.',
  },
};

export default function LicenciaFarmaciaPage() {
  const serviciosIncluidos = [
    {
      title: 'Proyecto Técnico Farmacia',
      desc: 'Planos mostrador, zona venta, almacén, laboratorio, cámara frigorífica, zona consultas. Normativa específica farmacias.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      title: 'Almacén y Cámara Frigorífica',
      desc: 'Diseño almacén medicamentos con control temperatura/humedad. Cámara frigorífica para conservación. Estanterías especiales.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      ),
    },
    {
      title: 'Laboratorio y Zona Fórmulas',
      desc: 'Laboratorio para preparados magistrales. Mobiliario específico, balanza, extractor, lavabo. Zona consultas ortopedia.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 2v4M15 2v4M9 14l3 3 3-3M8 8h8M10 2h4a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
        </svg>
      ),
    },
    {
      title: 'Sistema Seguridad y Antiincendios',
      desc: 'Alarma antiintrusión obligatoria. Extinción automática. Sistema detección humos. Puerta acceso controlado.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M12 11V7a4 4 0 0 1 8 0v4M8 11V7a4 4 0 0 0-8 0v4" />
        </svg>
      ),
    },
    {
      title: 'Climatización y Ventilación',
      desc: 'Control temperatura constante 15-25°C. Humedad controlada. Ventilación forzada en laboratorio.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 7l-5 5-5-5M7 17l5-5 5 5" />
        </svg>
      ),
    },
    {
      title: 'Tramitación Farmacéutica',
      desc: 'Ayuntamiento + Colegio Farmacéuticos + Consejería Sanidad. Registro farmacia. Visado proyecto. Coordinación completa.',
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
      tipo: 'Farmacia Rural',
      desde: '5.500€',
      incluye: ['Hasta 80m²', 'Sin laboratorio', 'Cámara frigorífica', 'Tramitación básica', 'Plazo: 5-6 meses'],
    },
    {
      tipo: 'Farmacia Urbana',
      desde: '6.500€',
      incluye: ['Hasta 150m²', 'Con laboratorio', 'Sistema seguridad completo', 'Zona consultas', 'Plazo: 6-7 meses'],
    },
    {
      tipo: 'Gran Farmacia',
      desde: '8.500€',
      incluye: ['Más de 150m²', 'Laboratorio completo', 'Parafarmacia integrada', 'Ortopedia', 'Plazo: 7-8 meses'],
    },
  ];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          slug: 'licencia-farmacia',
          serviceType: 'Licencia de apertura farmacia',
          name: 'Licencia Apertura Farmacia Murcia',
          description: 'Tramitación completa licencia apertura farmacia en Murcia. Proyecto técnico farmacéutico y gestión.',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Servicios', url: `${SITE_URL}/servicios` },
            { name: 'Licencia Farmacia', url: `${SITE_URL}/servicios/licencia-farmacia` },
          ],
        })}
      />

      <PageHeader
        badge="Licencias Sanitarias"
        title="Licencia Apertura Farmacia en Murcia desde 5.500€"
        subtitle="Tramitación completa: proyecto técnico farmacéutico, gestión Colegio y Consejería"
        image="https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Licencia farmacia Murcia"
        highlightedWord="Farmacia"
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
                ¿Quieres abrir una farmacia en Murcia?
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                Te tramitamos la licencia completa de farmacia, incluyendo visado del Colegio de Farmacéuticos, autorización Consejería y Ayuntamiento.
              </p>
              <p className="text-gray-600 mb-4">
                Experiencia en farmacias urbanas, rurales y gran formato con parafarmacia. Conocemos la normativa específica farmacéutica: cámara frigorífica, laboratorio, seguridad y control de temperatura.
              </p>
              <ul className="space-y-3">
                {[
                  'Proyecto técnico farmacéutico',
                  'Visado Colegio Farmacéuticos',
                  'Tramitación Consejería + Ayuntamiento',
                  'Cámara frigorífica y laboratorio',
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
                src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80"
                alt="Interior de farmacia moderna en Murcia"
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
              ¿Qué incluye la licencia de farmacia?
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
              ¿Cuánto cuesta la licencia de farmacia?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Presupuestos según ubicación y servicios ofrecidos
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
            * Precios orientativos sin tasas. Requiere concesión/adjudicación previa de la farmacia.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        title="Preguntas frecuentes sobre licencia de farmacia en Murcia"
        items={[
          {
            question: '¿Cuánto tarda la licencia de farmacia?',
            answer:
              'Entre 6 y 8 meses. Es el más largo porque intervienen: Ayuntamiento, Colegio de Farmacéuticos (visado proyecto) y Consejería Sanidad (autorización funcionamiento).',
          },
          {
            question: '¿Es obligatorio el laboratorio en todas las farmacias?',
            answer:
              'Depende del Colegio de Farmacéuticos de tu zona. En muchos casos sí se exige laboratorio para fórmulas magistrales, aunque sea mínimo.',
          },
          {
            question: '¿Necesito cámara frigorífica?',
            answer:
              'Sí, SIEMPRE. Es obligatorio tener cámara frigorífica para conservación de medicamentos termolábiles (insulinas, vacunas, etc.). Debe mantener 2-8°C.',
          },
          {
            question: '¿Puedo tener parafarmacia sin ser farmacéutico?',
            answer:
              'No confundir: FARMACIA necesita licencia farmacéutico + tramitación completa. PARAFARMACIA (solo productos no medicamentos) no necesita ser farmacéutico pero tiene normativa diferente.',
          },
          {
            question: '¿Incluye la reforma de la farmacia?',
            answer:
              'No, este servicio es solo tramitación. Si necesitas reforma completa de la farmacia, tenemos servicio específico de reforma de farmacia.',
          },
        ]}
      />

      {/* CTA Final */}
      <section className="section bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            ¿Listo para abrir tu farmacia?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Te tramitamos toda la documentación farmacéutica
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
              href="/servicios/reforma-farmacia"
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
                    Reforma de Farmacia
                  </h3>
                  <p className="text-gray-600 mb-3">Diseño y ejecución completa con laboratorio. Desde 40.000€</p>
                  <span className="text-accent font-semibold text-sm">Ver servicio →</span>
                </div>
              </div>
            </Link>

            <Link
              href="/blog/requisitos-abrir-farmacia-murcia"
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
                    Guía Completa: Abrir una Farmacia
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
