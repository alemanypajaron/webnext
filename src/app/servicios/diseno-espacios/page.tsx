import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Diseño de Espacios en Murcia | Arquitectos Técnicos Alemán y Pajarón',
  description: 'Diseño de espacios funcionales en Murcia. Interiorismo técnico, optimización de distribuciones para viviendas, locales comerciales y oficinas. Expertos en Murcia.',
  keywords: 'diseño espacios murcia, diseño interiores murcia, interiorismo técnico murcia, distribución vivienda murcia, diseño local comercial murcia',
  alternates: { canonical: '/servicios/diseno-espacios' },
};

export default function DisenoEspaciosPage() {
  const servicios = [
    { title: 'Distribución Interior', desc: 'Optimización de espacios para aprovechar cada metro cuadrado.' },
    { title: 'Renders 3D', desc: 'Visualiza tu proyecto antes de construirlo con imágenes realistas.' },
    { title: 'Selección de Materiales', desc: 'Asesoramiento en acabados, pavimentos, revestimientos y carpintería.' },
    { title: 'Diseño de Iluminación', desc: 'Proyecto lumínico para crear ambientes y optimizar consumo.' },
    { title: 'Diseño de Mobiliario', desc: 'Soluciones a medida integradas en el espacio.' },
    { title: 'Interiorismo Técnico', desc: 'Diseño con criterio constructivo y viabilidad técnica.' },
  ];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          slug: 'diseno-espacios',
          serviceType: 'Diseño de espacios',
          name: 'Diseño de Espacios en Murcia',
          description:
            'Diseño de espacios en Murcia: interiorismo técnico, distribución interior, renders 3D y selección de materiales. Optimizamos funcionalidad y estética.',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Servicios', url: `${SITE_URL}/servicios` },
            { name: 'Diseño de espacios', url: `${SITE_URL}/servicios/diseno-espacios` },
          ],
        })}
      />

      <PageHeader
        badge="Servicios"
        title="Diseño de Espacios en Murcia: Interiorismo Técnico Profesional"
        subtitle="Creamos espacios funcionales, estéticos y adaptados a tus necesidades en Murcia"
        image="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Diseño de espacios Murcia"
        highlightedWord="Diseño de Espacios"
      />

      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">¿Qué ofrecemos?</span>
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">Diseño de Espacios en Murcia: Criterio Técnico y Creatividad</h2>
              <p className="text-xl text-gray-700 mb-4">Combinamos funcionalidad, estética y viabilidad técnica para diseñar espacios en Murcia que mejoren tu calidad de vida o la rentabilidad de tu negocio.</p>
              <p className="text-gray-600 mb-4">Nuestro servicio de diseño de espacios en Murcia integra el diseño arquitectónico con soluciones constructivas reales, asegurando que cada propuesta sea ejecutable y se ajuste a tu presupuesto.</p>
              <p className="text-gray-600">Trabajamos en diseño de viviendas, locales comerciales, oficinas y espacios de hostelería en toda la Región de Murcia.</p>
            </div>
            <div className="relative">
              <Image src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" alt="Diseño interior" width={600} height={700} className="rounded-2xl shadow-2xl" />
              <div className="absolute -bottom-8 -right-8 w-full h-full bg-accent/20 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">Servicios incluidos</span>
            <h2 className="text-4xl font-heading font-bold text-primary">¿Qué incluye el diseño de espacios?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicios.map((servicio) => (
              <div key={servicio.title} className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-xl font-heading font-semibold text-primary mb-3">{servicio.title}</h3>
                <p className="text-gray-600">{servicio.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              Metodología
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary">Cómo diseñamos tu espacio en Murcia</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                num: '01',
                title: 'Briefing y Mediciones',
                desc: 'Reunión para conocer tus necesidades, estilo y presupuesto. Levantamiento del espacio.',
              },
              {
                num: '02',
                title: 'Propuesta de Diseño',
                desc: 'Presentamos ideas, distribución, paleta de colores y selección de materiales inicial.',
              },
              {
                num: '03',
                title: 'Visualización 3D',
                desc: 'Renders fotorrealistas para que veas el resultado final antes de ejecutar.',
              },
              {
                num: '04',
                title: 'Documentación Técnica',
                desc: 'Planos ejecutivos, presupuesto detallado y memoria para licitar o ejecutar.',
              },
            ].map((paso) => (
              <div key={paso.num} className="relative">
                <div className="text-7xl font-bold text-accent/10 mb-4">{paso.num}</div>
                <h3 className="text-2xl font-heading font-semibold text-primary mb-3">{paso.title}</h3>
                <p className="text-gray-600 leading-relaxed">{paso.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casos de uso */}
      <section className="section bg-primary text-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4 text-white">¿Qué espacios diseñamos en Murcia?</h2>
            <p className="text-xl text-white">Especialistas en interiorismo técnico funcional</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Viviendas y Pisos',
                desc: 'Optimización de distribución, cocinas, baños, zonas de día y noche. Diseño funcional adaptado a tu estilo de vida.',
              },
              {
                title: 'Locales Comerciales',
                desc: 'Espacios comerciales atractivos y funcionales. Diseño de escaparates, zonas de venta, almacén y oficinas.',
              },
              {
                title: 'Oficinas',
                desc: 'Espacios de trabajo colaborativos, salas de reuniones, zonas comunes y puestos ergonómicos.',
              },
              {
                title: 'Hostelería',
                desc: 'Bares, restaurantes y cafeterías. Diseño de barras, cocinas, comedores y terrazas optimizados.',
              },
            ].map((caso) => (
              <div key={caso.title} className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                <h3 className="text-2xl font-heading font-semibold mb-3">{caso.title}</h3>
                <p className="text-white leading-relaxed">{caso.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              Ventajas
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary">¿Por qué diseñar con arquitectos técnicos?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              'Diseño con criterio constructivo real',
              'Soluciones técnicamente viables',
              'Optimización de presupuesto',
              'Conocimiento de materiales y acabados',
              'Integración perfecta con la ejecución',
              'Cumplimiento de normativa (CTE, accesibilidad)',
            ].map((beneficio, i) => (
              <div key={i} className="flex items-start space-x-4 bg-gray-50 p-6 rounded-xl">
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
      </section>

      {/* FAQ */}
      <FAQ
        title="Preguntas frecuentes sobre diseño de espacios"
        items={[
          {
            question: '¿Cuánto cuesta el diseño de un espacio en Murcia?',
            answer:
              'Depende del alcance. Un proyecto básico de distribución desde 600€. Proyectos completos con renders 3D, selección de materiales e interiorismo desde 1.500€. Te damos presupuesto personalizado.',
          },
          {
            question: '¿Cuánto tiempo lleva diseñar un espacio?',
            answer:
              'Un proyecto de diseño para una vivienda de 100m² suele tardar 2-4 semanas desde el briefing hasta la entrega completa con renders y documentación.',
          },
          {
            question: '¿Puedo contratar solo el diseño sin la ejecución?',
            answer:
              'Sí, puedes contratar solo el proyecto de diseño y luego ejecutarlo por tu cuenta o con otros profesionales.',
          },
          {
            question: '¿Qué diferencia hay entre interiorismo y diseño técnico?',
            answer:
              'El interiorismo puro se centra en estética. Nuestro diseño técnico integra funcionalidad, viabilidad constructiva, normativa y presupuesto real además de la estética.',
          },
          {
            question: '¿Incluye el diseño la selección de muebles?',
            answer:
              'Sí, proponemos mobiliario tanto a medida como de catálogo, integrado en el diseño global del espacio.',
          },
        ]}
      />

      {/* CTA Final */}
      <section className="section bg-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-4xl font-heading font-bold mb-4 text-primary">¿Listo para diseñar tu espacio ideal en Murcia?</h2>
          <p className="text-xl text-gray-700 mb-8">Cuéntanos tu proyecto y te ayudamos a visualizarlo</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/presupuesto" className="px-8 py-4 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-all text-center text-lg shadow-lg">Solicitar Presupuesto</Link>
            <a href="tel:+34650075842" className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-all text-center text-lg border-2 border-primary">650 075 842</a>
          </div>
        </div>
      </section>
    </>
  );
}
