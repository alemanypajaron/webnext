import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Asesoramiento Técnico en Murcia | Arquitectos Técnicos Alemán y Pajarón',
  description: 'Asesoramiento técnico especializado en Murcia: informes técnicos, estudios de viabilidad, análisis de inmuebles y consultoría para construcción y reformas.',
  keywords: 'asesoramiento técnico murcia, consultoría construcción murcia, informe técnico murcia, arquitecto técnico murcia, aparejador murcia, estudio viabilidad murcia',
  alternates: { canonical: '/servicios/asesoramiento-tecnico' },
};

export default function AsesoramientoTecnicoPage() {
  const servicios = [
    {
      title: 'Informes Técnicos',
      desc: 'Evaluación detallada del estado de inmuebles, patologías constructivas y soluciones técnicas.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
    {
      title: 'Estudios de Viabilidad',
      desc: 'Análisis técnico y económico de proyectos antes de empezar. Evita sorpresas.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="20" x2="12" y2="10" />
          <line x1="18" y1="20" x2="18" y2="4" />
          <line x1="6" y1="20" x2="6" y2="16" />
        </svg>
      ),
    },
    {
      title: 'Before You Buy',
      desc: 'Inspección técnica antes de comprar. Conoce el estado real del inmueble.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      title: 'Valoraciones',
      desc: 'Tasación técnica de inmuebles para compraventa o valoración patrimonial.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      title: 'Asesoría en Compras',
      desc: 'Te acompañamos en visitas y te asesoramos antes de decidir tu compra.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
    },
    {
      title: 'Consultoría Técnica',
      desc: 'Resolución de dudas técnicas sobre construcción, instalaciones y normativa.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          slug: 'asesoramiento-tecnico',
          serviceType: 'Asesoramiento técnico',
          name: 'Asesoramiento Técnico en Murcia',
          description:
            'Asesoramiento técnico especializado en Murcia: informes técnicos, estudios de viabilidad, análisis de inmuebles y consultoría para construcción y reformas.',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Servicios', url: `${SITE_URL}/servicios` },
            { name: 'Asesoramiento técnico', url: `${SITE_URL}/servicios/asesoramiento-tecnico` },
          ],
        })}
      />

      <PageHeader
        badge="Servicios"
        title="Asesoramiento Técnico en Murcia: Consultoría Profesional"
        subtitle="Consultoría especializada en Murcia para tomar las mejores decisiones en tu proyecto"
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Asesoramiento técnico Murcia"
        highlightedWord="Asesoramiento Técnico"
      />

      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <Image src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80" alt="Consultoría técnica" width={600} height={700} className="rounded-2xl shadow-2xl" />
              <div className="absolute -bottom-8 -right-8 w-full h-full bg-accent/20 rounded-2xl -z-10" />
            </div>
            <div>
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">¿En qué consiste?</span>
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">Asesoramiento Técnico en Murcia: Orientación Experta</h2>
              <p className="text-xl text-gray-700 mb-4">Te ayudamos a evaluar la viabilidad técnica y económica de tu proyecto en Murcia antes de empezar, evitando sorpresas y optimizando recursos.</p>
              <p className="text-gray-600 mb-4">Nuestro servicio de asesoramiento técnico en Murcia incluye análisis de inmuebles, estudios de viabilidad, informes técnicos y recomendaciones profesionales para que tomes decisiones informadas.</p>
              <p className="text-gray-600">Tanto si estás pensando en comprar un inmueble en Murcia, como si quieres reformarlo o construir, te proporcionamos el criterio técnico profesional que necesitas.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">Qué incluye</span>
            <h2 className="text-4xl font-heading font-bold text-primary">Servicios de asesoramiento</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicios.map((servicio) => (
              <div key={servicio.title} className="bg-white p-8 rounded-xl shadow-lg">
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

      {/* Proceso */}
      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              Cómo trabajamos
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary">Nuestro proceso de asesoramiento en Murcia</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                num: '01',
                title: 'Contacto Inicial',
                desc: 'Nos cuentas tu necesidad y concretamos una primera reunión o visita en Murcia.',
              },
              {
                num: '02',
                title: 'Inspección Técnica',
                desc: 'Analizamos el inmueble o proyecto in situ, tomamos medidas y documentamos.',
              },
              {
                num: '03',
                title: 'Análisis y Estudio',
                desc: 'Evaluamos viabilidad técnica, normativa aplicable y presupuesto estimado.',
              },
              {
                num: '04',
                title: 'Informe y Recomendaciones',
                desc: 'Te entregamos un informe detallado con conclusiones y opciones para decidir.',
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

      {/* Beneficios */}
      <section className="section bg-primary text-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-accent text-primary rounded-full text-sm font-bold mb-4">
                Ventajas
              </span>
              <h2 className="text-4xl font-heading font-bold mb-6 text-white">¿Por qué contratar asesoramiento técnico en Murcia?</h2>
              <p className="text-xl text-white mb-8 leading-relaxed">
                Evita sorpresas, toma decisiones informadas y ahorra dinero conociendo el estado real de tu inmueble.
              </p>
              <div className="space-y-4">
                {[
                  'Evitas comprar inmuebles con problemas ocultos',
                  'Conoces el coste real de reformas antes de decidir',
                  'Identificas patologías y soluciones técnicas',
                  'Negociación informada en compraventas',
                  'Evitas gastos imprevistos en tu proyecto',
                  'Decisiones basadas en criterio técnico profesional',
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
                    <span className="text-lg">{beneficio}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
                alt="Beneficios asesoramiento técnico"
                width={600}
                height={700}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Casos de uso */}
      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              Casos de uso
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary">¿Cuándo necesitas asesoramiento técnico?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Antes de comprar una vivienda en Murcia',
                desc: 'Inspección técnica previa a la compra para conocer el estado real del inmueble y detectar problemas antes de firmar.',
                icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
              },
              {
                title: 'Evaluación de vivienda heredada',
                desc: 'Informe técnico del estado de una vivienda heredada para decidir si vender, reformar o habitar.',
                icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
              },
              {
                title: 'Antes de acometer una reforma',
                desc: 'Estudio de viabilidad técnica y económica de tu proyecto de reforma para evitar sorpresas.',
                icon: 'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z',
              },
              {
                title: 'Consultas sobre normativa',
                desc: 'Asesoramiento sobre normativa urbanística, CTE, licencias necesarias y viabilidad legal en Murcia.',
                icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
              },
            ].map((caso) => (
              <div key={caso.title} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center text-primary mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d={caso.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-heading font-semibold text-primary mb-3">{caso.title}</h3>
                <p className="text-gray-600 leading-relaxed">{caso.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        title="Preguntas frecuentes sobre asesoramiento técnico"
        items={[
          {
            question: '¿Cuánto cuesta un informe técnico en Murcia?',
            answer:
              'El precio depende del tipo de informe y la complejidad del inmueble. Un informe técnico básico para una vivienda en Murcia parte desde 300€. Te damos presupuesto personalizado sin compromiso.',
          },
          {
            question: '¿Cuánto tiempo tarda en hacerse un informe técnico?',
            answer:
              'Normalmente entre 3-7 días desde la visita técnica. Para urgencias podemos adelantar plazos.',
          },
          {
            question: '¿El informe técnico es válido para el banco o la justicia?',
            answer:
              'Sí, nuestros informes están firmados por arquitectos técnicos colegiados y tienen validez legal.',
          },
          {
            question: '¿Puedo usar el informe para negociar el precio de compra?',
            answer:
              'Por supuesto. Un informe técnico objetivo es una herramienta muy útil para negociar el precio final si se detectan defectos o reparaciones necesarias.',
          },
          {
            question: '¿Qué diferencia hay entre un informe técnico y una tasación?',
            answer:
              'El informe técnico evalúa el estado constructivo, patologías y viabilidad. La tasación determina el valor de mercado. Son complementarios.',
          },
        ]}
      />

      {/* CTA Final */}
      <section className="section bg-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-4xl font-heading font-bold mb-4 text-primary">¿Necesitas asesoramiento técnico en Murcia?</h2>
          <p className="text-xl text-gray-700 mb-8">Consulta con nuestros arquitectos técnicos colegiados</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/presupuesto" className="px-8 py-4 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-all text-center text-lg shadow-lg">Solicitar Presupuesto</Link>
            <a href="tel:+34650075842" className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-all text-center text-lg border-2 border-primary">650 075 842</a>
          </div>
        </div>
      </section>
    </>
  );
}
