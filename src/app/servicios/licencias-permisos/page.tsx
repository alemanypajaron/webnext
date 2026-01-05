import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Licencias y Permisos en Murcia | Alemán y Pajarón',
  description: 'Tramitación de licencias de obra en Murcia. Licencia de obra mayor, menor, apertura y actividad. Arquitectos técnicos especializados en trámites municipales.',
  alternates: { canonical: '/servicios/licencias-permisos' },
};

export default function LicenciasPermisosPage() {
  const tiposLicencias = [
    { title: 'Licencia de Obra Mayor', desc: 'Para obras de nueva construcción, ampliaciones o reformas estructurales en Murcia.' },
    { title: 'Licencia de Obra Menor', desc: 'Para reformas interiores, cambios de distribución y obras sin afectación estructural.' },
    { title: 'Licencia de Actividad', desc: 'Para apertura de locales comerciales, oficinas y establecimientos en Murcia.' },
    { title: 'Declaración Responsable', desc: 'Procedimiento simplificado para determinadas obras y actividades.' },
    { title: 'Comunicación Previa', desc: 'Para obras menores que solo requieren comunicación al Ayuntamiento.' },
    { title: 'Licencia de Primera Ocupación', desc: 'Certificación final para poder habitar o usar el inmueble terminado.' },
  ];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          slug: 'licencias-permisos',
          serviceType: 'Licencias y permisos',
          name: 'Licencias y Permisos en Murcia',
          description:
            'Tramitación de licencias de obra en Murcia. Licencia de obra mayor, menor, apertura y actividad. Arquitectos técnicos especializados en trámites municipales.',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Servicios', url: `${SITE_URL}/servicios` },
            { name: 'Licencias y permisos', url: `${SITE_URL}/servicios/licencias-permisos` },
          ],
        })}
      />

      <PageHeader
        badge="Servicios"
        title="Licencias y Permisos en Murcia: Tramitación Municipal"
        subtitle="Tramitación completa de licencias de obra en el Ayuntamiento de Murcia"
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Licencias Murcia"
        highlightedWord="Licencias y Permisos"
      />

      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">Trámites municipales</span>
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">Gestión de licencias sin complicaciones</h2>
              <p className="text-xl text-gray-700 mb-4">Nos encargamos de toda la tramitación de licencias y permisos necesarios para tu proyecto en Murcia.</p>
              <p className="text-gray-600 mb-4">Conocemos los procedimientos del Ayuntamiento de Murcia y las normativas urbanísticas locales. Preparamos toda la documentación técnica necesaria y gestionamos el proceso de principio a fin.</p>
              <p className="text-gray-600">Te mantenemos informado en cada fase del trámite, resolviendo cualquier requerimiento que pueda surgir.</p>
            </div>
            <div className="relative">
              <Image src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=800&q=80" alt="Licencias obra Murcia" width={600} height={700} className="rounded-2xl shadow-2xl" />
              <div className="absolute -bottom-8 -right-8 w-full h-full bg-accent/20 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">Tipos de licencias</span>
            <h2 className="text-4xl font-heading font-bold text-primary">¿Qué licencia necesitas?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tiposLicencias.map((licencia, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center text-primary mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-semibold text-primary mb-3">{licencia.title}</h3>
                <p className="text-gray-600 leading-relaxed">{licencia.desc}</p>
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
            <h2 className="text-4xl font-heading font-bold text-primary">Cómo tramitamos tu licencia en Murcia</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                num: '01',
                title: 'Análisis Previo',
                desc: 'Estudiamos tu proyecto y determinamos qué licencia necesitas según normativa de Murcia.',
              },
              {
                num: '02',
                title: 'Documentación',
                desc: 'Preparamos toda la documentación técnica: planos, memorias, certificados necesarios.',
              },
              {
                num: '03',
                title: 'Presentación',
                desc: 'Presentamos la solicitud en el Ayuntamiento y realizamos el seguimiento del expediente.',
              },
              {
                num: '04',
                title: 'Resolución',
                desc: 'Gestionamos cualquier requerimiento hasta obtener la licencia definitiva.',
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
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4 text-white">¿Por qué confiar en nosotros para tus licencias?</h2>
            <p className="text-xl text-white">Conocimiento local y experiencia en trámites municipales</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Conocemos el Ayuntamiento de Murcia',
              'Tramitación rápida y eficiente',
              'Evitamos rechazos y requerimientos',
              'Documentación técnica impecable',
              'Seguimiento constante del expediente',
              'Asesoramiento sobre normativa local',
              'Experiencia en todo tipo de licencias',
              'Te informamos en cada paso',
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
      </section>

      {/* FAQ */}
      <FAQ
        title="Preguntas frecuentes sobre licencias en Murcia"
        items={[
          {
            question: '¿Cuánto cuesta una licencia de obra en Murcia?',
            answer:
              'El coste de la licencia (tasas municipales) depende del presupuesto de obra. El ICIO es del 4% sobre el presupuesto. Nuestros honorarios de tramitación rondan 300-800€ según complejidad.',
          },
          {
            question: '¿Cuánto tarda el Ayuntamiento de Murcia en conceder una licencia?',
            answer:
              'Licencias menores: 1-2 meses. Licencias mayores: 2-4 meses. Los plazos dependen de la complejidad y carga del Ayuntamiento.',
          },
          {
            question: '¿Puedo empezar la obra sin licencia?',
            answer:
              'No. Empezar una obra sin licencia es infracción urbanística grave, con multas desde 600€ hasta el 100% del coste de la obra. Además, tendrás que paralizar.',
          },
          {
            question: '¿Qué documentos necesito para solicitar una licencia?',
            answer:
              'Proyecto técnico (según tipo de obra), certificado de eficiencia energética, estudio de seguridad y salud, y documentación catastral. Nosotros preparamos todo.',
          },
          {
            question: '¿La licencia caduca?',
            answer:
              'Sí. Las licencias suelen tener validez de 1-3 años para iniciar obra. Si no empiezas en ese plazo, caduca y hay que solicitar prórroga o nueva licencia.',
          },
        ]}
      />

      {/* CTA Final */}
      <section className="section bg-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-4xl font-heading font-bold mb-4 text-primary">¿Necesitas tramitar una licencia en Murcia?</h2>
          <p className="text-xl text-gray-700 mb-8">Te asesoramos y gestionamos todo el proceso sin complicaciones</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/presupuesto" className="px-8 py-4 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-all text-center text-lg shadow-lg">Solicitar Presupuesto</Link>
            <a href="tel:+34650075842" className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-all text-center text-lg border-2 border-primary">650 075 842</a>
          </div>
        </div>
      </section>
    </>
  );
}
