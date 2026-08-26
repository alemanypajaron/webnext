import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Certificado Energético Vivienda Murcia | Desde 80€',
  description: 'Certificado energético vivienda en Murcia desde 80€. Obligatorio venta/alquiler. Cita en 24h, entrega en 48h. Técnico homologado.',
  keywords: 'certificado energetico murcia, certificado energetico vivienda murcia precio, certificado eficiencia energetica murcia, certificado energetico piso murcia',
  alternates: { canonical: 'https://www.alemanypajaron.es/servicios/certificado-energetico' },
  openGraph: {
    title: 'Certificado Energético Murcia desde 80€',
    description: 'Obligatorio para vender/alquilar. Cita en 24h, entrega en 48h.',
    url: 'https://www.alemanypajaron.es/servicios/certificado-energetico',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Certificado Energético Murcia',
    description: 'Desde 80€. Entrega en 48h.',
  },
};

export default function CertificadoEnergeticoPage() {
  const serviciosIncluidos = [
    {
      title: 'Visita del Técnico',
      desc: 'Técnico homologado se desplaza a tu vivienda. Medición superficies, toma datos instalaciones (caldera, ventanas, aislamiento).',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      title: 'Estudio Energético',
      desc: 'Análisis consumo energético, emisiones CO2, aislamiento térmico. Software homologado CE3X o CERMA.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 17V7M15 17v-3" />
        </svg>
      ),
    },
    {
      title: 'Calificación A-G',
      desc: 'Asignación calificación energética de A (más eficiente) a G (menos eficiente). Etiqueta energética oficial.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      title: 'Registro Oficial',
      desc: 'Registro certificado en Comunidad Autónoma (CARM Murcia). Número registro oficial válido 10 años.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
          <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
        </svg>
      ),
    },
    {
      title: 'Certificado PDF',
      desc: 'Certificado energético en PDF con etiqueta, número registro, datos técnicos. Válido para venta/alquiler.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      title: 'Recomendaciones Mejora',
      desc: 'Informe con recomendaciones para mejorar calificación: cambio ventanas, aislamiento, caldera eficiente.',
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
      tipo: 'Piso hasta 90m²',
      desde: '80€',
      incluye: ['Visita técnico', 'Certificado + etiqueta', 'Registro CARM', 'Entrega 48h', 'Válido 10 años'],
    },
    {
      tipo: 'Piso 90-150m²',
      desde: '120€',
      incluye: ['Visita técnico', 'Certificado + etiqueta', 'Registro CARM', 'Entrega 48h', 'Recomendaciones'],
    },
    {
      tipo: 'Casa/Chalet',
      desde: '180€',
      incluye: ['Más de 150m²', 'Visita técnico', 'Certificado completo', 'Registro CARM', 'Informe mejoras'],
    },
  ];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          slug: 'certificado-energetico',
          serviceType: 'Certificado energético de vivienda',
          name: 'Certificado Energético Murcia',
          description:
            'Certificado energético vivienda en Murcia. Obligatorio para venta y alquiler. Técnico homologado.',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Servicios', url: `${SITE_URL}/servicios` },
            { name: 'Certificado Energético', url: `${SITE_URL}/servicios/certificado-energetico` },
          ],
        })}
      />

      <PageHeader
        badge="Reformas Vivienda"
        title="Certificado Energético de Vivienda en Murcia desde 80€"
        subtitle="Obligatorio para vender/alquilar. Cita en 24h, entrega en 48h"
        image="https://images.unsplash.com/photo-1460472178825-e5240623afd5?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Certificado energético Murcia"
        highlightedWord="Certificado"
      />

      {/* Introducción */}
      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
                Técnico homologado
              </span>
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">
                Certificado energético: Obligatorio para vender o alquilar
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                ¿Vas a vender o alquilar tu vivienda? El certificado energético es OBLIGATORIO por ley. Sin él no puedes publicar anuncios ni firmar contratos.
              </p>
              <p className="text-gray-600 mb-4">
                Técnico homologado se desplaza a tu vivienda, realiza estudio energético, registra en CARM y te entrega certificado oficial en 48h. Precio cerrado sin sorpresas.
              </p>
              <ul className="space-y-3">
                {[
                  'Cita en menos de 24h',
                  'Técnico homologado cualificado',
                  'Registro oficial CARM incluido',
                  'Entrega certificado en 48h',
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
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80"
                alt="Técnico realizando certificado energético en Murcia"
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
              Servicio completo
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary">
              ¿Qué Incluye el Certificado Energético en Murcia?
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
              Precios cerrados
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary mb-6">
              Precio Certificado Energético Murcia: ¿Cuánto Cuesta?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Precio según superficie de la vivienda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {precios.map((paquete, index) => (
              <div
                key={paquete.tipo}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all ${
                  index === 0 ? 'ring-2 ring-accent scale-105' : ''
                }`}
              >
                {index === 0 && (
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
                    index === 0
                      ? 'bg-accent text-primary hover:bg-accent-dark'
                      : 'bg-gray-100 text-primary hover:bg-gray-200'
                  }`}
                >
                  Solicitar certificado
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 mt-8">
            * Precio cerrado todo incluido. Registro CARM incluido. Válido 10 años.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        title="Preguntas frecuentes sobre certificado energético en Murcia"
        items={[
          {
            question: '¿Cuándo es obligatorio el certificado energético?',
            answer:
              'SIEMPRE que vendas o alquiles una vivienda. Es obligatorio desde 2013. Sin él: multa 300-6.000€, no puedes publicar anuncios y notario no firma escrituras.',
          },
          {
            question: '¿Cuánto tarda en hacerse?',
            answer:
              'Muy rápido. Día 1: Cita con técnico (30-60 min). Día 2: Técnico procesa datos y registra. Día 3: Recibes certificado por email. Total: 48h hábiles.',
          },
          {
            question: '¿Cuánto dura el certificado energético?',
            answer:
              '10 años desde fecha registro. Pasados 10 años hay que renovarlo si vuelves a vender/alquilar. Si haces reformas (ventanas, aislamiento) recomendable renovar antes.',
          },
          {
            question: '¿Qué pasa si mi vivienda tiene calificación G (mala)?',
            answer:
              'Nada grave. Puedes vender/alquilar igual. La G solo indica bajo rendimiento energético. El certificado incluye recomendaciones de mejora (opcional). Muchas viviendas antiguas tienen E-F-G.',
          },
          {
            question: '¿Puedo mejorar la calificación energética?',
            answer:
              'SÍ. Cambio ventanas PVC: +1 letra. Aislamiento térmico: +1-2 letras. Caldera condensación: +1 letra. Te asesoramos sobre reformas que mejoran calificación y ahorran energía.',
          },
        ]}
      />

      {/* CTA Final */}
      <section className="section bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            ¿Necesitas tu certificado energético?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Cita en 24h y entrega en 48h. Precio cerrado sin sorpresas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/presupuesto"
              className="px-10 py-4 bg-accent text-primary font-bold rounded-lg hover:bg-accent-dark transition-all text-lg shadow-xl"
            >
              Solicitar Certificado
            </Link>
            <a
              href="tel:+34650075842"
              className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/20 transition-all text-lg border-2 border-white/30"
            >
              Llamar: 650 075 842
            </a>
          </div>
          <p className="text-white/80 mt-6 text-sm">
            Cita en menos de 24h • Entrega en 48h • Precio cerrado
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
              href="/servicios/cambio-ventanas-pvc"
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all group border-2 border-accent/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    Cambio Ventanas PVC
                  </h3>
                  <p className="text-gray-600 mb-3">Mejora tu calificación energética. Desde 3.000€</p>
                  <span className="text-accent font-semibold text-sm">Ver servicio →</span>
                </div>
              </div>
            </Link>

            <Link
              href="/servicios/reformas-integrales"
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all group border-2 border-accent/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    Reforma Integral
                  </h3>
                  <p className="text-gray-600 mb-3">Mejora energética + reforma completa</p>
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
