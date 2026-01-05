import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Reformas Integrales en Murcia | Alemán y Pajarón',
  description: 'Reformas integrales en Murcia. Transformación completa de viviendas, locales y oficinas. Gestión integral del proyecto con técnicos de edificación.',
  alternates: {
    canonical: '/servicios/reformas-integrales',
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
        badge="Servicios"
        title="Reformas Integrales en Murcia: Transformación Completa"
        subtitle="Transformamos espacios con criterio técnico y diseño funcional"
        image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Reformas Murcia"
        highlightedWord="Reformas Integrales"
      />

      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">Transformación completa</span>
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">Tu reforma en las mejores manos</h2>
              <p className="text-xl text-gray-700 mb-4">Gestionamos tu reforma integral en Murcia de principio a fin: diseño, licencias, ejecución y entrega.</p>
              <p className="text-gray-600 mb-4">Como técnicos de edificación, aportamos el conocimiento necesario para que tu reforma se ejecute correctamente, cumpliendo normativa y optimizando presupuesto.</p>
              <p className="text-gray-600">Coordinamos todos los gremios y supervisamos cada fase de la obra para garantizar un resultado impecable.</p>
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
            <h2 className="text-4xl font-heading font-bold text-primary">¿Qué espacio quieres transformar?</h2>
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
            <h2 className="text-4xl font-heading font-bold text-primary">Cómo trabajamos tu reforma</h2>
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
          <h2 className="text-4xl font-heading font-bold mb-4 text-primary">¿Preparado para transformar tu espacio en Murcia?</h2>
          <p className="text-xl text-gray-700 mb-8">Más de 15 años haciendo realidad reformas integrales en Murcia</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/presupuesto" className="px-8 py-4 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-all text-center text-lg shadow-lg">Solicitar Presupuesto</Link>
            <a href="tel:+34650075842" className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-all text-center text-lg border-2 border-primary">650 075 842</a>
          </div>
        </div>
      </section>
    </>
  );
}
