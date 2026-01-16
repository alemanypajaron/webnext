import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Reforma Peluquería Murcia | Desde 12.000€ | Alemán y Pajarón',
  description: 'Reforma integral peluquería y salón de belleza en Murcia desde 12.000€. Lavacabezas, espejos, iluminación profesional. +15 años experiencia.',
  keywords: 'reforma peluqueria murcia, reforma salon belleza murcia, reformar peluqueria precio murcia, reforma local peluqueria',
  alternates: { canonical: 'https://www.alemanypajaron.es/servicios/reforma-peluqueria' },
  openGraph: {
    title: 'Reforma Peluquería Murcia | Alemán y Pajarón',
    description: 'Reforma integral peluquería. Diseño completo y ejecución.',
    url: 'https://www.alemanypajaron.es/servicios/reforma-peluqueria',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Reforma Peluquería Murcia | Alemán y Pajarón',
    description: 'Reforma integral desde 12.000€.',
  },
};

export default function ReformaPeluqueriaPage() {
  const serviciosIncluidos = [
    {
      title: 'Diseño del Salón',
      desc: 'Distribución óptima: zona tocadores, lavacabezas, recepción, almacén productos. Máximo aprovechamiento espacio.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      title: 'Lavacabezas Profesionales',
      desc: 'Instalación lavacabezas ergonómicos con agua caliente/fría, grifería monomando, ceramica de calidad.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M2 12h20" />
        </svg>
      ),
    },
    {
      title: 'Tocadores y Espejos',
      desc: 'Tocadores individuales a medida, espejos con iluminación LED profesional, muebles almacenaje herramientas.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ),
    },
    {
      title: 'Iluminación Profesional',
      desc: 'Iluminación LED luz natural para tocadores, regulable, espejos retroiluminados, ambiente general.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        </svg>
      ),
    },
    {
      title: 'Suelo y Revestimientos',
      desc: 'Pavimento porcelánico resistente agua, revestimientos modernos, zócalos protección, pintura lavable.',
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
      title: 'Ventilación y Climatización',
      desc: 'Extracción ventilación para productos químicos, climatización confort cliente, aire acondicionado.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 7l-5 5-5-5M7 17l5-5 5 5" />
        </svg>
      ),
    },
  ];

  const precios = [
    {
      tipo: 'Peluquería Básica',
      desde: '12.000€',
      incluye: ['Hasta 40m²', '3-4 tocadores', '1 lavacabezas', 'Iluminación LED', 'Recepción sencilla'],
    },
    {
      tipo: 'Salón Completo',
      desde: '22.000€',
      incluye: ['60-80m²', '6-8 tocadores', '2-3 lavacabezas', 'Mobiliario a medida', 'Zona espera'],
    },
    {
      tipo: 'Centro de Belleza',
      desde: '35.000€',
      incluye: ['Más de 80m²', '10+ tocadores', 'Zona estética', 'Cabinas tratamiento', 'Diseño personalizado'],
    },
  ];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          slug: 'reforma-peluqueria',
          serviceType: 'Reforma de peluquería y salón de belleza',
          name: 'Reforma Peluquería Murcia',
          description: 'Reforma integral de peluquería en Murcia. Diseño completo, lavacabezas, tocadores, iluminación profesional.',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Servicios', url: `${SITE_URL}/servicios` },
            { name: 'Reforma Peluquería', url: `${SITE_URL}/servicios/reforma-peluqueria` },
          ],
        })}
      />

      <PageHeader
        badge="Reformas Negocios"
        title="Reforma Integral Peluquería y Salón de Belleza en Murcia desde 12.000€"
        subtitle="Diseño completo, lavacabezas, tocadores e iluminación profesional"
        image="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Reforma peluquería Murcia"
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
                Reforma integral de peluquería en Murcia
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                Diseñamos y ejecutamos la reforma completa de tu peluquería. Desde distribución y fontanería hasta mobiliario e iluminación profesional.
              </p>
              <p className="text-gray-600 mb-4">
                Experiencia en salones de peluquería, barberías, centros de belleza y franquicias. Instalamos lavacabezas profesionales, tocadores a medida e iluminación específica.
              </p>
              <ul className="space-y-3">
                {[
                  'Diseño 3D previo incluido',
                  'Lavacabezas e instalaciones',
                  'Tocadores e iluminación LED',
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
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=80"
                alt="Reforma interior salón peluquería moderno en Murcia"
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
              ¿Qué incluye la reforma de peluquería?
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
              ¿Cuánto cuesta reformar una peluquería?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Presupuestos según superficie y nivel de equipamiento
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
            * Precios orientativos reforma completa llave en mano. Presupuesto final según calidades y extras.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        title="Preguntas frecuentes sobre reforma de peluquería en Murcia"
        items={[
          {
            question: '¿Cuánto tarda la reforma de una peluquería?',
            answer:
              'Entre 3 y 6 semanas según tamaño. Reforma básica (40m²): 3 semanas. Reforma completa (80m²): 5-6 semanas.',
          },
          {
            question: '¿Incluye los lavacabezas?',
            answer:
              'Sí, incluye instalación completa de lavacabezas: fontanería, desagües, lavacabezas ergonómicos con grifería. Puedes elegir modelo y marca.',
          },
          {
            question: '¿Puedo elegir los espejos y tocadores?',
            answer:
              'Sí. Te enseñamos catálogos y hacemos diseño 3D para que veas cómo quedan. Tocadores podemos hacerlos a medida o instalar prefabricados de calidad.',
          },
          {
            question: '¿El mobiliario (sillas, secadores) está incluido?',
            answer:
              'La estructura y tocadores sí. Los sillones, secadores de pie, carritos los puedes comprar tú (te asesoramos proveedores) o los incluimos en presupuesto.',
          },
          {
            question: '¿Necesito licencia de obras?',
            answer:
              'Depende. Obras menores (sin tocar estructura) normalmente solo comunicación. Te asesoramos y gestionamos si necesitas.',
          },
        ]}
      />

      {/* CTA Final */}
      <section className="section bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            ¿Listo para reformar tu peluquería?
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
              href="/servicios/licencia-peluqueria"
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
                    Licencia Peluquería
                  </h3>
                  <p className="text-gray-600 mb-3">¿También necesitas tramitar la licencia? Te gestionamos todo. Desde 1.800€</p>
                  <span className="text-accent font-semibold text-sm">Ver servicio →</span>
                </div>
              </div>
            </Link>

            <Link
              href="/servicios/diseno-espacios"
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all group border-2 border-accent/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    Diseño de Espacios 3D
                  </h3>
                  <p className="text-gray-600 mb-3">Visualiza tu peluquería antes de reformarla con diseño 3D fotorrealista</p>
                  <span className="text-accent font-semibold text-sm">Ver servicio →</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
