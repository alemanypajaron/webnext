import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Reforma y Reparación de Tejados Murcia | Desde 2.500€ | Alemán y Pajarón',
  description: 'Reforma y reparación de tejados en Murcia desde 2.500€. Impermeabilización, cambio tejas, cubiertas planas. +15 años experiencia.',
  keywords: 'reforma tejado murcia, reparar tejado murcia, impermeabilizar tejado murcia precio, cambio tejas murcia, cubierta plana murcia',
  alternates: { canonical: 'https://www.alemanypajaron.es/servicios/reforma-tejados' },
  openGraph: {
    title: 'Reforma Tejados Murcia desde 2.500€ | Alemán y Pajarón',
    description: 'Reparación e impermeabilización de tejados. Presupuesto sin compromiso.',
    url: 'https://www.alemanypajaron.es/servicios/reforma-tejados',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Reforma Tejados Murcia | Alemán y Pajarón',
    description: 'Reparación desde 2.500€. Presupuesto gratis.',
  },
};

export default function ReformaTejadosPage() {
  const serviciosIncluidos = [
    {
      title: 'Revisión y Diagnóstico',
      desc: 'Inspección completa del tejado, detección de filtraciones, goteras, tejas rotas. Informe con fotos.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      ),
    },
    {
      title: 'Impermeabilización',
      desc: 'Impermeabilización con tela asfáltica, láminas EPDM o poliuretano. Garantía antifiltraciones.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      ),
    },
    {
      title: 'Cambio de Tejas',
      desc: 'Sustitución tejas rotas, cambio completo tejado. Tejas árabes, mixtas, pizarra. Ajuste a estética.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      title: 'Cubiertas Planas',
      desc: 'Reforma cubierta plana transitable/no transitable. Impermeabilización, solado, pendientes, canalones.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
    {
      title: 'Canalones y Bajantes',
      desc: 'Instalación/reparación canalones, bajantes desagüe. Aluminio, PVC, cobre. Protección fachada.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 7l-5 5-5-5M7 17l5-5 5 5" />
        </svg>
      ),
    },
    {
      title: 'Aislamiento Térmico',
      desc: 'Aislamiento tejado con poliuretano proyectado o paneles XPS. Ahorro energético hasta 30%.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
        </svg>
      ),
    },
  ];

  const precios = [
    {
      tipo: 'Reparación Puntual',
      desde: '2.500€',
      incluye: ['Hasta 30m²', 'Goteras y filtraciones', 'Tejas rotas', 'Impermeabilización local'],
    },
    {
      tipo: 'Reforma Completa',
      desde: '5.500€',
      incluye: ['50-80m²', 'Impermeabilización total', 'Cambio tejas parcial', 'Canalones', 'Garantía 10 años'],
    },
    {
      tipo: 'Tejado Nuevo',
      desde: '9.500€',
      incluye: ['80-120m²', 'Cambio tejas completo', 'Estructura revisada', 'Aislamiento', 'Todo nuevo'],
    },
  ];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          slug: 'reforma-tejados',
          serviceType: 'Reforma y reparación de tejados',
          name: 'Reforma Tejados Murcia',
          description:
            'Reforma y reparación de tejados en Murcia: impermeabilización, cambio tejas, cubiertas planas, canalones.',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Servicios', url: `${SITE_URL}/servicios` },
            { name: 'Reforma Tejados', url: `${SITE_URL}/servicios/reforma-tejados` },
          ],
        })}
      />

      <PageHeader
        badge="Reformas Vivienda"
        title="Reforma y Reparación de Tejados en Murcia desde 2.500€"
        subtitle="Impermeabilización, cambio de tejas y reparación de cubiertas"
        image="https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Reforma tejado Murcia"
        highlightedWord="Tejados"
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
                Reforma y reparación de tejados en Murcia
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                ¿Goteras? ¿Tejas rotas? ¿Humedad en el techo? Reparamos e impermeabilizamos tu tejado con garantía de 10 años.
              </p>
              <p className="text-gray-600 mb-4">
                Especialistas en tejados de teja árabe, mixta, pizarra y cubiertas planas. Solución definitiva a filtraciones y goteras.
              </p>
              <ul className="space-y-3">
                {[
                  'Revisión gratuita con informe',
                  'Impermeabilización garantizada',
                  'Sin sorpresas en el precio',
                  'Garantía 10 años',
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
                src="https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=800&q=80"
                alt="Reparación tejado profesional en Murcia"
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
              ¿Qué incluye la reforma de tejado?
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
              ¿Cuánto cuesta reparar un tejado?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Presupuesto según tipo de trabajo y superficie
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
            * Precios orientativos. Presupuesto final según estado del tejado y accesibilidad.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        title="Preguntas frecuentes sobre reforma de tejados en Murcia"
        items={[
          {
            question: '¿Cuánto tarda la reparación de un tejado?',
            answer:
              'Reparación puntual: 2-3 días. Impermeabilización completa: 1 semana. Cambio completo tejas: 2-3 semanas según superficie.',
          },
          {
            question: '¿Qué hago si tengo goteras?',
            answer:
              'Llámanos inmediatamente. Hacemos revisión gratuita, localizamos el origen (tejas rotas, impermeabilización) y te damos presupuesto cerrado.',
          },
          {
            question: '¿Cuánto dura la impermeabilización?',
            answer:
              'Con tela asfáltica de calidad: 10-15 años. Con lámina EPDM: 20-30 años. Con poliuretano proyectado: 15-20 años. Todas con garantía.',
          },
          {
            question: '¿Puedo andar por el tejado después?',
            answer:
              'Depende. Cubiertas planas transitables sí (con solado especial). Tejados de teja NO son transitables (solo para mantenimiento).',
          },
          {
            question: '¿Necesito licencia para reformar el tejado?',
            answer:
              'Reparación/impermeabilización: NO (obra menor). Cambio completo estructura/tejas: SÍ (licencia mayor). Te asesoramos.',
          },
        ]}
      />

      {/* CTA Final */}
      <section className="section bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            ¿Goteras o tejas rotas? Te ayudamos
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Revisión gratuita y presupuesto sin compromiso en 24h
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
            Respuesta en menos de 24h • Garantía 10 años • Presupuesto cerrado
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
                  <p className="text-gray-600 mb-3">¿Reformas toda la casa? Incluye fachada, tejado, interior</p>
                  <span className="text-accent font-semibold text-sm">Ver servicio →</span>
                </div>
              </div>
            </Link>

            <Link
              href="/servicios/reforma-terraza"
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
                    Reforma Terraza
                  </h3>
                  <p className="text-gray-600 mb-3">Impermeabilización, pérgola, cerramiento. Desde 3.500€</p>
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
