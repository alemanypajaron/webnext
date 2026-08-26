import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Licencia Apertura Clínica Veterinaria Murcia | Desde 3.500€',
  description: 'Tramitación licencia apertura clínica veterinaria en Murcia desde 3.500€. Proyecto técnico sanitario completo. +15 años experiencia.',
  keywords: 'licencia apertura clinica veterinaria murcia, licencia veterinario murcia, abrir clinica veterinaria murcia, licencia actividad veterinaria',
  alternates: { canonical: 'https://www.alemanypajaron.es/servicios/licencia-veterinaria' },
  openGraph: {
    title: 'Licencia Apertura Clínica Veterinaria Murcia',
    description: 'Tramitación completa licencia apertura clínica veterinaria. Proyecto técnico sanitario.',
    url: 'https://www.alemanypajaron.es/servicios/licencia-veterinaria',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Licencia Clínica Veterinaria Murcia',
    description: 'Tramitación desde 3.500€. Gestión completa.',
  },
};

export default function LicenciaVeterinariaPage() {
  const serviciosIncluidos = [
    {
      title: 'Proyecto Técnico Veterinario',
      desc: 'Planos consultas, quirófano, hospitalización, rayos X, zona espera, almacén medicamentos. Normativa centros veterinarios.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      title: 'Quirófano y Hospitalización',
      desc: 'Diseño quirófano con gases medicinales, iluminación específica. Zona hospitalización con jaulas. Separación gatos/perros.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      title: 'Sala Rayos X',
      desc: 'Proyecto radioprotección, blindaje paredes/puerta, señalización, almacenamiento plomado. Autorización CSN.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },
    {
      title: 'Instalaciones Sanitarias',
      desc: 'Agua fría/caliente, desagües, autoclave, gases medicinales (O2, isoflurano). Almacén medicamentos controlado.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M2 12h20" />
        </svg>
      ),
    },
    {
      title: 'Ventilación y Climatización',
      desc: 'Extracción gases anestésicos en quirófano. Climatización independiente hospitalización. Ventilación general forzada.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 7l-5 5-5-5M7 17l5-5 5 5" />
        </svg>
      ),
    },
    {
      title: 'Tramitación Múltiple',
      desc: 'Ayuntamiento + Colegio Veterinarios + Consejería Sanidad + CSN (si rayos X). Coordinación completa.',
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
      tipo: 'Clínica Básica',
      desde: '3.500€',
      incluye: ['Hasta 80m²', 'Consultas', 'Sin quirófano', 'Sin rayos X', 'Plazo: 3-4 meses'],
    },
    {
      tipo: 'Clínica Completa',
      desde: '4.500€',
      incluye: ['Hasta 150m²', 'Quirófano', 'Hospitalización', 'Sin rayos X', 'Plazo: 4-5 meses'],
    },
    {
      tipo: 'Centro Veterinario',
      desde: '6.000€',
      incluye: ['Más de 150m²', 'Quirófano completo', 'Sala rayos X', 'Proyecto CSN', 'Plazo: 5-6 meses'],
    },
  ];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          slug: 'licencia-veterinaria',
          serviceType: 'Licencia de apertura clínica veterinaria',
          name: 'Licencia Apertura Clínica Veterinaria Murcia',
          description: 'Tramitación completa licencia apertura clínica veterinaria en Murcia. Proyecto técnico sanitario veterinario.',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Servicios', url: `${SITE_URL}/servicios` },
            { name: 'Licencia Veterinaria', url: `${SITE_URL}/servicios/licencia-veterinaria` },
          ],
        })}
      />

      <PageHeader
        badge="Licencias Sanitarias"
        title="Licencia Apertura Clínica Veterinaria en Murcia desde 3.500€"
        subtitle="Tramitación completa: proyecto técnico veterinario, gestión Colegio y Consejería"
        image="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Licencia clínica veterinaria Murcia"
        highlightedWord="Veterinaria"
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
                ¿Quieres abrir una clínica veterinaria en Murcia?
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                Te tramitamos la licencia de apertura completa, incluyendo autorizaciones sanitarias, Colegio Veterinarios y CSN si tienes rayos X.
              </p>
              <p className="text-gray-600 mb-4">
                Experiencia en clínicas veterinarias con quirófano, hospitalización, rayos X y urgencias 24h. Conocemos los requisitos específicos del Colegio de Veterinarios de Murcia y Consejería de Sanidad.
              </p>
              <ul className="space-y-3">
                {[
                  'Proyecto técnico veterinario completo',
                  'Tramitación Colegio + Sanidad',
                  'Proyecto radioprotección incluido',
                  'Coordinación con todas las administraciones',
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
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80"
                alt="Interior de clínica veterinaria profesional en Murcia"
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
              ¿Qué Incluye la Licencia de Clínica Veterinaria en Murcia?
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
              Precio Licencia Veterinaria Murcia: ¿Cuánto Cuesta?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Presupuestos según servicios ofrecidos y superficie del centro
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
            * Precios orientativos sin tasas. Con rayos X se añade proyecto radioprotección CSN (+800€).
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        title="Preguntas frecuentes sobre licencia de clínica veterinaria en Murcia"
        items={[
          {
            question: '¿Cuánto tarda la licencia de clínica veterinaria?',
            answer:
              'Entre 4 y 6 meses. Hay que tramitar ante Ayuntamiento, Colegio de Veterinarios, Consejería Sanidad y CSN si hay rayos X. Es la más compleja.',
          },
          {
            question: '¿Es obligatorio el proyecto de radioprotección?',
            answer:
              'Sí, si tienes equipo de rayos X. Debe firmarlo un técnico de radioprotección, incluir blindajes y señalización, y aprobarlo el CSN (Consejo Seguridad Nuclear).',
          },
          {
            question: '¿Necesito quirófano para ser clínica veterinaria?',
            answer:
              'Depende de los servicios. Puedes abrir consultas veterinarias sin quirófano. Pero si quieres hacer cirugías, sí necesitas quirófano con gases medicinales.',
          },
          {
            question: '¿Puedo tener hospitalización sin quirófano?',
            answer:
              'Sí. Puedes ofrecer hospitalización y observación sin tener quirófano. Necesitarás zona separada con jaulas y climatización independiente.',
          },
          {
            question: '¿Incluye la reforma de la clínica?',
            answer:
              'No, este servicio es solo tramitación. Si necesitas reforma completa, tenemos servicio específico de reforma de clínica veterinaria.',
          },
        ]}
      />

      {/* CTA Final */}
      <section className="section bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            ¿Listo para abrir tu clínica veterinaria?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Te tramitamos todas las autorizaciones necesarias
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
              href="/servicios/reforma-veterinaria"
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
                    Reforma de Clínica Veterinaria
                  </h3>
                  <p className="text-gray-600 mb-3">Diseño y ejecución con quirófano y rayos X. Desde 30.000€</p>
                  <span className="text-accent font-semibold text-sm">Ver servicio →</span>
                </div>
              </div>
            </Link>

            <Link
              href="/blog/como-abrir-clinica-veterinaria-murcia-guia-completa-2026"
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
                    Guía Completa: Abrir Clínica Veterinaria
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
