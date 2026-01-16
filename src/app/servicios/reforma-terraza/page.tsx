import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Reforma Terraza Murcia | Desde 3.500€ | Alemán y Pajarón',
  description: 'Reforma terraza en Murcia desde 3.500€. Impermeabilización, suelo exterior, pérgola, cerramiento. +15 años experiencia.',
  keywords: 'reforma terraza murcia, cerrar terraza murcia precio, impermeabilizar terraza murcia, suelo terraza exterior murcia, pergola terraza murcia',
  alternates: { canonical: 'https://www.alemanypajaron.es/servicios/reforma-terraza' },
  openGraph: {
    title: 'Reforma Terraza Murcia desde 3.500€ | Alemán y Pajarón',
    description: 'Impermeabilización, suelo, pérgola y cerramiento. Presupuesto sin compromiso.',
    url: 'https://www.alemanypajaron.es/servicios/reforma-terraza',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Reforma Terraza Murcia | Alemán y Pajarón',
    description: 'Reforma desde 3.500€. Presupuesto gratis.',
  },
};

export default function ReformaTerrazaPage() {
  const serviciosIncluidos = [
    {
      title: 'Impermeabilización',
      desc: 'Impermeabilización con tela asfáltica, lámina EPDM o poliuretano. Garantía antifiltraciones 10 años.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      ),
    },
    {
      title: 'Suelo Exterior',
      desc: 'Pavimento porcelánico antideslizante, tarima tecnológica, baldosa exterior. Resistente UV y heladas.',
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
      title: 'Pérgola Bioclimática',
      desc: 'Pérgola aluminio con lamas orientables, protección solar, ventilación regulable. Motorizada opcional.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
    {
      title: 'Cerramiento Cristal',
      desc: 'Cerramiento acristalado sin perfiles, cortinas cristal o aluminio+vidrio. Transforma en sala extra.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18" />
        </svg>
      ),
    },
    {
      title: 'Iluminación LED',
      desc: 'Iluminación LED empotrada, tiras LED perimetrales, focos direccionales. Regulable y domótica.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        </svg>
      ),
    },
    {
      title: 'Mobiliario y Extras',
      desc: 'Jardineras, tomas agua/luz, toldos, calefactores exteriores, almacenaje integrado.',
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
      tipo: 'Reforma Básica',
      desde: '3.500€',
      incluye: ['Hasta 15m²', 'Impermeabilización', 'Suelo exterior', 'Iluminación LED', 'Sin pérgola'],
    },
    {
      tipo: 'Reforma Completa',
      desde: '8.500€',
      incluye: ['20-30m²', 'Impermeabilización', 'Suelo premium', 'Pérgola fija', 'Iluminación completa'],
    },
    {
      tipo: 'Terraza Premium',
      desde: '15.000€',
      incluye: ['Más de 30m²', 'Pérgola bioclimática', 'Cerramiento cristal', 'Domótica', 'Todo equipado'],
    },
  ];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          slug: 'reforma-terraza',
          serviceType: 'Reforma de terraza',
          name: 'Reforma Terraza Murcia',
          description:
            'Reforma de terraza en Murcia: impermeabilización, suelo exterior, pérgola, cerramiento cristal.',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Servicios', url: `${SITE_URL}/servicios` },
            { name: 'Reforma Terraza', url: `${SITE_URL}/servicios/reforma-terraza` },
          ],
        })}
      />

      <PageHeader
        badge="Reformas Vivienda"
        title="Reforma de Terraza en Murcia desde 3.500€"
        subtitle="Impermeabilización, suelo exterior, pérgola y cerramiento"
        image="https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Reforma terraza Murcia"
        highlightedWord="Terraza"
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
                Reforma de terraza en Murcia: Disfruta todo el año
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                Convierte tu terraza en un espacio habitable. Impermeabilización, suelo exterior, pérgola bioclimática y cerramiento acristalado.
              </p>
              <p className="text-gray-600 mb-4">
                En Murcia disfrutas de 300 días de sol al año. Aprovecha tu terraza con pérgola, cerramiento y climatización para usarla todo el año.
              </p>
              <ul className="space-y-3">
                {[
                  'Diseño 3D previo incluido',
                  'Impermeabilización garantizada',
                  'Pérgolas bioclimáticas',
                  'Cerramiento sin obra',
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
                src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80"
                alt="Reforma terraza moderna en Murcia"
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
              ¿Qué incluye la reforma de terraza?
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
              ¿Cuánto cuesta reformar una terraza?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Presupuesto según superficie y elementos incluidos
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
            * Precios orientativos reforma completa. Con cerramiento cristal +3.000-8.000€ según tipo.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        title="Preguntas frecuentes sobre reforma de terraza en Murcia"
        items={[
          {
            question: '¿Cuánto tarda la reforma de una terraza?',
            answer:
              'Depende del trabajo. Suelo+impermeabilización: 1 semana. Suelo+pérgola: 2 semanas. Reforma completa con cerramiento: 3-4 semanas.',
          },
          {
            question: '¿Puedo cerrar la terraza con cristal?',
            answer:
              'Sí. Cerramiento acristalado sin perfiles (cortinas cristal) o con aluminio+vidrio. No requiere obra, se instala en 2-3 días. Ideal para usar terraza en invierno.',
          },
          {
            question: '¿Qué suelo es mejor para terraza exterior?',
            answer:
              'Porcelánico antideslizante 20mm (resistente heladas, sin obra). Tarima tecnológica composite (estética madera, sin mantenimiento). Ambos perfectos para Murcia.',
          },
          {
            question: '¿La pérgola bioclimática vale la pena?',
            answer:
              'SÍ, 100%. En Murcia con tanto sol es imprescindible. Lamas orientables regulan luz/sombra/ventilación. Puedes añadir motorización y sensores lluvia.',
          },
          {
            question: '¿Necesito licencia para reformar la terraza?',
            answer:
              'Impermeabilización+suelo: NO (obra menor). Pérgola adosada: Comunicación previa. Cerramiento: Depende ayuntamiento. Te asesoramos gratis.',
          },
        ]}
      />

      {/* CTA Final */}
      <section className="section bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Transforma tu terraza en tu espacio favorito
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Diseño 3D gratis y presupuesto sin compromiso en 24h
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
              href="/servicios/reforma-tejados"
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
                    Reforma Tejados
                  </h3>
                  <p className="text-gray-600 mb-3">Impermeabilización y reparación. Desde 2.500€</p>
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
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    Reforma Integral
                  </h3>
                  <p className="text-gray-600 mb-3">¿Reformas toda la casa? Presupuesto completo</p>
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
