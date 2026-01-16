import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Reforma Farmacia Murcia | Desde 40.000€ | Alemán y Pajarón',
  description: 'Reforma integral farmacia en Murcia desde 40.000€. Mostrador, cámara frigorífica, laboratorio, almacén. +15 años experiencia.',
  keywords: 'reforma farmacia murcia, reformar farmacia precio murcia, reforma local farmacia murcia',
  alternates: { canonical: 'https://www.alemanypajaron.es/servicios/reforma-farmacia' },
  openGraph: {
    title: 'Reforma Farmacia Murcia | Alemán y Pajarón',
    description: 'Reforma integral farmacia. Diseño completo y ejecución.',
    url: 'https://www.alemanypajaron.es/servicios/reforma-farmacia',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Reforma Farmacia Murcia | Alemán y Pajarón',
    description: 'Reforma integral desde 40.000€.',
  },
};

export default function ReformaFarmaciaPage() {
  const serviciosIncluidos = [
    {
      title: 'Diseño Farmacia',
      desc: 'Distribución mostrador, zona venta, almacén medicamentos, laboratorio fórmulas, cámara frigorífica, recepción.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      title: 'Mostrador y Zona Venta',
      desc: 'Mostrador farmacia a medida, estanterías medicamentos, zona parafarmacia, vitrinas, iluminación específica.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      ),
    },
    {
      title: 'Cámara Frigorífica',
      desc: 'Cámara frigorífica obligatoria 2-8°C para termolábiles (insulinas, vacunas). Instalación completa con control temperatura.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 3v18" />
        </svg>
      ),
    },
    {
      title: 'Laboratorio Fórmulas',
      desc: 'Laboratorio preparados magistrales con balanza, extractor, lavabo, mobiliario específico, almacenaje productos.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 2v4M15 2v4M9 14l3 3 3-3M8 8h8M10 2h4a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
        </svg>
      ),
    },
    {
      title: 'Almacén Medicamentos',
      desc: 'Almacén con control temperatura/humedad, estanterías especiales, separación por categorías, acceso controlado.',
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
      title: 'Seguridad y Climatización',
      desc: 'Sistema seguridad antiintrusión, extinción automática, climatización constante 15-25°C, control humedad.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M12 11V7a4 4 0 0 1 8 0v4M8 11V7a4 4 0 0 0-8 0v4" />
        </svg>
      ),
    },
  ];

  const precios = [
    {
      tipo: 'Farmacia Rural',
      desde: '40.000€',
      incluye: ['Hasta 80m²', 'Mostrador básico', 'Cámara frigorífica', 'Sin laboratorio', 'Almacén básico'],
    },
    {
      tipo: 'Farmacia Urbana',
      desde: '65.000€',
      incluye: ['100-150m²', 'Mostrador completo', 'Laboratorio fórmulas', 'Sistema seguridad', 'Zona parafarmacia'],
    },
    {
      tipo: 'Gran Farmacia',
      desde: '95.000€',
      incluye: ['Más de 150m²', 'Mostrador premium', 'Laboratorio completo', 'Parafarmacia integrada', 'Todo equipado'],
    },
  ];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          slug: 'reforma-farmacia',
          serviceType: 'Reforma de farmacia',
          name: 'Reforma Farmacia Murcia',
          description: 'Reforma integral de farmacia en Murcia. Diseño completo, mostrador, cámara frigorífica, laboratorio.',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Servicios', url: `${SITE_URL}/servicios` },
            { name: 'Reforma Farmacia', url: `${SITE_URL}/servicios/reforma-farmacia` },
          ],
        })}
      />

      <PageHeader
        badge="Reformas Negocios"
        title="Reforma Integral Farmacia en Murcia desde 40.000€"
        subtitle="Diseño completo, mostrador, cámara frigorífica y laboratorio"
        image="https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Reforma farmacia Murcia"
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
                Reforma integral de farmacia en Murcia
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                Diseñamos y ejecutamos la reforma completa de tu farmacia. Desde mostrador y cámara frigorífica hasta laboratorio de fórmulas magistrales.
              </p>
              <p className="text-gray-600 mb-4">
                Experiencia en farmacias urbanas, rurales y gran formato con parafarmacia. Instalamos cámara frigorífica obligatoria, laboratorio y sistemas de seguridad.
              </p>
              <ul className="space-y-3">
                {[
                  'Diseño 3D previo incluido',
                  'Cámara frigorífica obligatoria',
                  'Laboratorio fórmulas magistrales',
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
                src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80"
                alt="Reforma interior farmacia moderna en Murcia"
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
              ¿Qué incluye la reforma de farmacia?
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
              ¿Cuánto cuesta reformar una farmacia?
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
            * Precios orientativos reforma completa llave en mano. Requiere concesión/adjudicación previa de la farmacia.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        title="Preguntas frecuentes sobre reforma de farmacia en Murcia"
        items={[
          {
            question: '¿Cuánto tarda la reforma de una farmacia?',
            answer:
              'Entre 2 y 4 meses según tamaño. Farmacia rural (80m²): 2 meses. Farmacia urbana (150m²): 3-4 meses.',
          },
          {
            question: '¿Es obligatoria la cámara frigorífica?',
            answer:
              'Sí, SIEMPRE. Es obligatorio tener cámara frigorífica para conservación de medicamentos termolábiles (insulinas, vacunas). Debe mantener 2-8°C constantes.',
          },
          {
            question: '¿El laboratorio es obligatorio?',
            answer:
              'Depende del Colegio de Farmacéuticos de tu zona. En muchos casos sí se exige laboratorio mínimo para fórmulas magistrales, aunque sea básico.',
          },
          {
            question: '¿Las estanterías y mostrador están incluidos?',
            answer:
              'Sí, incluye mostrador a medida y estanterías básicas. Si quieres estanterías especiales o mostrador premium, se añade al presupuesto.',
          },
          {
            question: '¿Necesito licencia de obras?',
            answer:
              'Sí, casi siempre. Las farmacias requieren licencia mayor por instalaciones especiales (cámara frigorífica, laboratorio, seguridad). Te asesoramos y gestionamos.',
          },
        ]}
      />

      {/* CTA Final */}
      <section className="section bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            ¿Listo para reformar tu farmacia?
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
              href="/servicios/licencia-farmacia"
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
                    Licencia Farmacia
                  </h3>
                  <p className="text-gray-600 mb-3">¿También necesitas tramitar la licencia? Te gestionamos todo. Desde 5.500€</p>
                  <span className="text-accent font-semibold text-sm">Ver servicio →</span>
                </div>
              </div>
            </Link>

            <Link
              href="/blog/requisitos-abrir-farmacia-murcia-guia-completa-2026"
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
