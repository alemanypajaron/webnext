import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Reforma Peluquería Murcia | Desde 12.000€ | Alemán y Pajarón',
  description: 'Reforma integral peluquería y salón belleza en Murcia desde 12.000€. Diseño, mobiliario, iluminación. +15 años experiencia.',
  keywords: 'reforma peluqueria murcia, reformar salon belleza murcia, reforma barberia murcia precio',
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
      title: 'Diseño y Distribución',
      desc: 'Planos, distribución óptima: barra, mesas, cocina, baños, almacén. Aprovechamiento máximo del espacio.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      title: 'Cocina Industrial',
      desc: 'Instalación completa cocina profesional: campana extractora, fogones, horno, frigoríficos, fregaderos.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 12h20M2 12v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8" />
          <path d="M2 12V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6" />
          <path d="M6 8v4M10 8v4M14 8v4M18 8v4" />
        </svg>
      ),
    },
    {
      title: 'Barra y Mobiliario',
      desc: 'Construcción barra a medida, taburetes, mesas, sillas, mobiliario completo. Diseño moderno y funcional.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18M15 3v18" />
        </svg>
      ),
    },
    {
      title: 'Extracción de Humos',
      desc: 'Sistema completo extracción humos cocina: campana, conductos, filtros. Cumplimiento normativa.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M2 12h20" />
        </svg>
      ),
    },
    {
      title: 'Baños y Climatización',
      desc: 'Baños adaptados clientes, vestuarios empleados, aire acondicionado, ventilación.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
          <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
        </svg>
      ),
    },
    {
      title: 'Electricidad e Iluminación',
      desc: 'Instalación eléctrica completa, iluminación LED decorativa, cuadro eléctrico potenciado.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
  ];

  const precios = [
    {
      tipo: 'Peluquería Básica',
      desde: '12.000€',
      incluye: ['Hasta 40m²', '3-4 puestos', 'Lavacabezas', 'Mobiliario básico', 'Iluminación LED'],
    },
    {
      tipo: 'Salón Completo',
      desde: '25.000€',
      incluye: ['60-80m²', '6-8 puestos', 'Zona lavado', 'Mobiliario premium', 'Climatización'],
    },
    {
      tipo: 'Centro Belleza',
      desde: '40.000€',
      incluye: ['Más de 80m²', 'Peluquería + estética', 'Cabinas privadas', 'Diseño integral', 'Equipamiento completo'],
    },
  ];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          slug: 'reforma-bar',
          serviceType: 'Reforma de bar y restaurante',
          name: 'Reforma Bar y Restaurante Murcia',
          description: 'Reforma integral bar y restaurante en Murcia: diseño, cocina industrial, barra, extracción humos.',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Servicios', url: `${SITE_URL}/servicios` },
            { name: 'Reforma Bar', url: `${SITE_URL}/servicios/reforma-bar` },
          ],
        })}
      />

      <PageHeader
        badge="Reforma Peluquería"
        title="Reforma Peluquería y Salón Belleza en Murcia desde 12.000€"
        subtitle="Diseño completo, mobiliario, iluminación y acabados profesionales"
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
                ¿Por qué reformar tu peluquería con nosotros?
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                Reformamos salones de peluquería y belleza con diseño funcional y estética moderna.
              </p>
              <p className="text-gray-600 mb-4">
                Más de 15 años reformando bares y restaurantes en Murcia. Conocemos la normativa, los tiempos y cómo optimizar cada metro de tu local.
              </p>
              <ul className="space-y-3">
                {[
                  'Diseño funcional y rentable',
                  'Cocina industrial completa',
                  'Extracción de humos certificada',
                  'Obra terminada en 2-4 meses',
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
                src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80"
                alt="Reforma peluquería salón Murcia"
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
              Todo incluido
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary">
              ¿Qué incluye la reforma de tu bar?
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
              ¿Cuánto cuesta reformar un bar o restaurante?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Presupuestos según superficie y nivel de acabados
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
                    MÁS POPULAR
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
            * Precios orientativos. El presupuesto final depende de las medidas, materiales y acabados elegidos.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        title="Preguntas frecuentes sobre reforma de bar en Murcia"
        items={[
          {
            question: '¿Cuánto tarda una reforma de bar completa?',
            answer:
              'Una reforma completa tarda entre 2 y 4 meses según tamaño. Bar pequeño: 2 meses. Restaurante grande con cocina: 4-6 meses.',
          },
          {
            question: '¿Puedo abrir mientras se reforma?',
            answer:
              'No. La reforma implica obra completa: electricidad, fontanería, cocina. Debes cerrar durante el proceso. Te damos fechas exactas al principio.',
          },
          {
            question: '¿Incluye la cocina industrial?',
            answer:
              'Sí, en el paquete completo incluimos instalación de cocina: campana extractora, fogones, hornos, frigoríficos, fregaderos industriales.',
          },
          {
            question: '¿Necesito licencia de obra?',
            answer:
              'Depende del alcance. Reformas integrales requieren licencia mayor. Te asesoramos y gestionamos toda la tramitación si es necesario.',
          },
          {
            question: '¿Qué garantía tiene la reforma?',
            answer:
              'Garantía de 2 años en instalaciones eléctricas, fontanería, climatización y carpintería. Garantía fabricante en equipamiento de cocina.',
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
            Solicita presupuesto y transforma tu local en el negocio que siempre has querido
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
            Respuesta en menos de 24h • Visita gratuita • Presupuesto detallado
          </p>
        </div>
      </section>

      {/* Servicios relacionados */}
      <section className="section bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center">
            También te puede interesar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Licencia Peluquería',
                desc: '¿También necesitas la licencia? Te tramitamos todo',
                link: '/servicios/licencia-peluqueria',
              },
              {
                title: 'Diseño de Espacios',
                desc: 'Diseño 3D de tu nuevo local',
                link: '/servicios/diseno-espacios',
              },
              {
                title: 'Gestión de Proyectos',
                desc: 'Gestionamos toda tu reforma',
                link: '/servicios/gestion-proyectos',
              },
            ].map((servicio) => (
              <Link
                key={servicio.title}
                href={servicio.link}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all group"
              >
                <h3 className="text-xl font-heading font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                  {servicio.title}
                </h3>
                <p className="text-gray-600">{servicio.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

