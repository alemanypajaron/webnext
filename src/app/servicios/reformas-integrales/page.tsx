import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Reforma Integral Piso y Vivienda en Murcia | Precio desde 400€/m² | Alemán y Pajarón',
  description: 'Reforma integral de piso y vivienda en Murcia desde 400€/m². Presupuesto cerrado, diseño 3D, gestión completa. +15 años reformando casas en Murcia.',
  keywords: 'reforma integral piso murcia, reforma integral vivienda murcia, reforma piso completo murcia, cuanto cuesta reforma integral murcia, precio reforma integral murcia, reformar piso murcia',
  alternates: {
    canonical: 'https://www.alemanypajaron.es/servicios/reformas-integrales',
  },
  openGraph: {
    title: 'Reforma Integral de Piso en Murcia desde 400€/m²',
    description: 'Transforma tu vivienda completamente. Presupuesto cerrado, diseño 3D incluido.',
    url: 'https://www.alemanypajaron.es/servicios/reformas-integrales',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Reforma Integral Murcia | Alemán y Pajarón',
    description: 'Desde 400€/m². Presupuesto cerrado.',
  },
};

export default function ReformasIntegralesPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          slug: 'reformas-integrales',
          serviceType: 'Reformas integrales',
          name: 'Reformas Integrales en Murcia',
          description:
            'Reformas integrales en Murcia. Transformación completa de viviendas, locales y oficinas. Gestión integral del proyecto con gestores de obras.',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Servicios', url: `${SITE_URL}/servicios` },
            { name: 'Reformas integrales', url: `${SITE_URL}/servicios/reformas-integrales` },
          ],
        })}
      />

      <PageHeader
        badge="Reformas Integrales"
        title="Reforma Integral de Piso en Murcia desde 400€/m²"
        subtitle="Transformación completa de tu vivienda con diseño 3D, gestión integral y presupuesto cerrado"
        image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Reforma integral piso Murcia"
        highlightedWord="Piso en Murcia"
      />

      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">+15 años de experiencia</span>
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">Reforma integral de tu piso en Murcia sin preocupaciones</h2>
              <p className="text-xl text-gray-700 mb-4">Transformamos tu vivienda completamente: diseño, licencias, ejecución y entrega llave en mano.</p>
              <p className="text-gray-600 mb-4">Somos técnicos de edificación especializados en reformas integrales de pisos y viviendas en Murcia. Gestionamos todo el proyecto para que tú no tengas que preocuparte de nada.</p>
              <ul className="space-y-3">
                {[
                  'Presupuesto cerrado sin sorpresas',
                  'Diseño 3D gratuito de tu reforma',
                  'Tramitación de licencias incluida',
                  'Coordinamos todos los gremios',
                  'Obra terminada en el plazo acordado',
                  'Garantía de hasta 10 años según LOE',
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
              <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80" alt="Reforma integral Murcia" width={600} height={700} className="rounded-2xl shadow-2xl" />
              <div className="absolute -bottom-8 -right-8 w-full h-full bg-accent/20 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">Tipos de reformas</span>
            <h2 className="text-4xl font-heading font-bold text-primary">Tipos de Reformas Integrales en Murcia: Viviendas, Locales y Oficinas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Reforma de Viviendas', desc: 'Pisos, casas y chalets en Murcia. Cambios de distribución, instalaciones y acabados completos.', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
              { title: 'Reforma de Locales', desc: 'Acondicionamiento de locales comerciales, tiendas, restaurantes y negocios en Murcia.', icon: 'M2 7h20M2 21h20' },
              { title: 'Reforma de Oficinas', desc: 'Espacios de trabajo modernos y funcionales adaptados a las necesidades de tu empresa.', icon: 'M3 3h18M3 21h18' },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center text-primary mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={item.icon} /></svg>
                </div>
                <h3 className="text-xl font-heading font-semibold text-primary mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">Proceso</span>
            <h2 className="text-4xl font-heading font-bold text-primary">Proceso de Reforma Integral en Murcia: De Diseño a Entrega</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {['Visita y Análisis', 'Diseño y Presupuesto', 'Licencias y Permisos', 'Ejecución', 'Entrega'].map((step, i) => (
              <div key={step} className="text-center">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-4xl font-bold text-primary mx-auto mb-4">{i + 1}</div>
                <h4 className="font-semibold text-primary mb-2">{step}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="section bg-primary text-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-white">¿Qué incluye una reforma integral en Murcia?</h2>
            <p className="text-xl text-white">Gestión completa de tu reforma sin preocupaciones</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Diseño y Planificación',
                items: ['Toma de medidas', 'Propuesta de distribución', 'Renders 3D', 'Selección de materiales'],
              },
              {
                title: 'Gestión Administrativa',
                items: ['Tramitación de licencias', 'Coordinación de gremios', 'Control de plazos', 'Gestión de residuos'],
              },
              {
                title: 'Ejecución',
                items: ['Demoliciones', 'Albañilería y reformas', 'Instalaciones (agua, luz, clima)', 'Acabados completos'],
              },
            ].map((item) => (
              <div key={item.title} className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                <h3 className="text-2xl font-heading font-semibold mb-6">{item.title}</h3>
                <ul className="space-y-3">
                  {item.items.map((subitem) => (
                    <li key={subitem} className="flex items-start space-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-accent flex-shrink-0 mt-1"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{subitem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Precios */}
      <section className="section bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              Precios orientativos
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary mb-6">
              ¿Cuánto cuesta una reforma integral en Murcia?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Presupuestos adaptados al alcance de tu reforma y acabados elegidos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                tipo: 'Reforma Básica',
                desde: '400-500€/m²',
                incluye: ['Suelos vinílicos o laminados', 'Alicatado básico', 'Sanitarios estándar', 'Instalaciones renovadas', 'Pintura lisa', 'Puertas estándar'],
                ejemplo: 'Piso 80m²: 32.000€ - 40.000€',
              },
              {
                tipo: 'Reforma Media',
                desde: '600-800€/m²',
                incluye: ['Porcelánico de calidad', 'Cocina equipada', 'Baños completos', 'Carpintería lacada', 'Iluminación LED', 'Diseño 3D personalizado'],
                ejemplo: 'Piso 80m²: 48.000€ - 64.000€',
                popular: true,
              },
              {
                tipo: 'Reforma Premium',
                desde: '900-1.200€/m²',
                incluye: ['Materiales alta gama', 'Cocina diseño a medida', 'Domótica y climatización', 'Acabados exclusivos', 'Mobiliario integrado', 'Proyecto decoración completo'],
                ejemplo: 'Piso 80m²: 72.000€ - 96.000€',
              },
            ].map((paquete, index) => (
              <div
                key={paquete.tipo}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all ${
                  paquete.popular ? 'ring-2 ring-accent scale-105' : ''
                }`}
              >
                {paquete.popular && (
                  <span className="inline-block px-3 py-1 bg-accent text-primary text-xs font-bold rounded-full mb-4">
                    MÁS DEMANDADO
                  </span>
                )}
                <h3 className="text-2xl font-heading font-bold text-primary mb-2">{paquete.tipo}</h3>
                <div className="text-3xl font-bold text-accent mb-2">{paquete.desde}</div>
                <p className="text-sm text-gray-500 mb-6">{paquete.ejemplo}</p>
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
                    paquete.popular
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
            * Precios orientativos sin incluir IVA. El presupuesto final depende del tamaño, distribución y calidad de acabados elegidos.
          </p>
        </div>
      </section>

      {/* Beneficios */}
      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
                alt="Reforma vivienda Murcia"
                width={600}
                height={700}
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
                Ventajas
              </span>
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">
                ¿Por qué confiar tu reforma a gestores de obras profesionales?
              </h2>
              <div className="space-y-4">
                {[
                  'Dirección técnica cualificada durante toda la obra',
                  'Presupuesto cerrado sin sorpresas',
                  'Control de calidad en cada fase',
                  'Cumplimiento de normativa garantizado',
                  'Gestión integral: no necesitas buscar gremios',
                  'Garantía de hasta 10 años según LOE',
                ].map((beneficio, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-accent flex-shrink-0 mt-1"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-lg text-gray-700">{beneficio}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        title="Preguntas frecuentes sobre reformas integrales"
        items={[
          {
            question: '¿Cuánto cuesta una reforma integral en Murcia?',
            answer:
              'Depende del tamaño y alcance. Como orientación: reformas básicas desde 400€/m², reformas medias 600-800€/m², reformas premium 900-1.200€/m². Te damos presupuesto detallado sin compromiso.',
          },
          {
            question: '¿Cuánto dura una reforma integral de una vivienda?',
            answer:
              'Un piso de 80-100m² suele tardar 2-3 meses. Depende de la complejidad, cambios estructurales y acabados. Te damos planning detallado antes de empezar.',
          },
          {
            question: '¿Necesito licencia para mi reforma en Murcia?',
            answer:
              'Sí. Las reformas integrales suelen requerir licencia de obra mayor. Nosotros nos encargamos de tramitarla.',
          },
          {
            question: '¿Puedo vivir en casa durante la reforma?',
            answer:
              'En reformas integrales no es recomendable por polvo, ruido y falta de servicios básicos temporalmente. En reformas parciales sí es posible.',
          },
          {
            question: '¿Ofrecéis financiación?',
            answer:
              'Nosotros no financiamos directamente, pero te asesoramos sobre opciones de financiación y créditos para reformas disponibles en entidades.',
          },
        ]}
      />

      {/* CTA Final */}
      <section className="section bg-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-4xl font-heading font-bold mb-4 text-primary">¿Listo para transformar tu piso en Murcia?</h2>
          <p className="text-xl text-gray-700 mb-8">Presupuesto gratuito y sin compromiso para tu reforma integral</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/presupuesto" className="px-8 py-4 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-all text-center text-lg shadow-lg">Solicitar Presupuesto</Link>
            <a href="tel:+34650075842" className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-all text-center text-lg border-2 border-primary">650 075 842</a>
          </div>
        </div>
      </section>
    </>
  );
}
