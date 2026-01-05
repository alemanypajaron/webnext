import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Gestión de Proyectos en Murcia | Alemán y Pajarón - Arquitectos Técnicos',
  description: 'Gestión integral de proyectos de construcción en Murcia. Planificación, coordinación, control de costes y plazos. Arquitectos técnicos especializados.',
  alternates: { canonical: '/servicios/gestion-proyectos' },
};

export default function GestionProyectosPage() {
  const fases = [
    { num: '1', title: 'Análisis', desc: 'Estudiamos tu proyecto, necesidades y objetivos para definir la estrategia.' },
    { num: '2', title: 'Planificación', desc: 'Creamos cronograma detallado con hitos, fases y recursos necesarios.' },
    { num: '3', title: 'Ejecución', desc: 'Coordinamos equipos y supervisamos la ejecución según planning.' },
    { num: '4', title: 'Entrega', desc: 'Verificación final, documentación y entrega del proyecto terminado.' },
  ];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          slug: 'gestion-proyectos',
          serviceType: 'Gestión de proyectos',
          name: 'Gestión de Proyectos en Murcia',
          description:
            'Gestión de proyectos en Murcia: planificación, coordinación de equipos, control de plazos y presupuestos para obras y reformas.',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Servicios', url: `${SITE_URL}/servicios` },
            { name: 'Gestión de proyectos', url: `${SITE_URL}/servicios/gestion-proyectos` },
          ],
        })}
      />

      <PageHeader
        badge="Servicios"
        title="Gestión de Proyectos en Murcia: Project Management Profesional"
        subtitle="Planificación y coordinación integral para el éxito de tu proyecto"
        image="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Gestión de proyectos Murcia"
        highlightedWord="Gestión de Proyectos"
      />

      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">Project Management</span>
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">Tu proyecto bajo control</h2>
              <p className="text-xl text-gray-700 mb-4">La gestión de proyectos es clave para que tu obra en Murcia se ejecute en plazo, con el presupuesto previsto y la calidad esperada.</p>
              <p className="text-gray-600 mb-4">Nos encargamos de la planificación integral, coordinación de equipos, seguimiento de costes y control de calidad durante todo el proceso constructivo.</p>
              <p className="text-gray-600">Actuamos como Project Manager, siendo tu único interlocutor y liberándote de la complejidad de gestionar múltiples proveedores.</p>
            </div>
            <div className="relative">
              <Image src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" alt="Gestión proyectos construcción Murcia" width={600} height={700} className="rounded-2xl shadow-2xl" />
              <div className="absolute -bottom-8 -right-8 w-full h-full bg-accent/20 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">Nuestro método</span>
            <h2 className="text-4xl font-heading font-bold text-primary">Cómo gestionamos tu proyecto</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {fases.map((fase) => (
              <div key={fase.num} className="text-center">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-4xl font-bold text-primary mx-auto mb-6">{fase.num}</div>
                <h3 className="text-xl font-heading font-semibold text-primary mb-3">{fase.title}</h3>
                <p className="text-gray-600">{fase.desc}</p>
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
            <h2 className="text-4xl font-heading font-bold text-primary">¿Por qué contratar gestión de proyectos?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              'Cumplimiento de plazos garantizado',
              'Control exhaustivo del presupuesto',
              'Coordinación eficiente de todos los gremios',
              'Un solo interlocutor para todo',
              'Menor estrés y dedicación por tu parte',
              'Optimización de recursos y costes',
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
        title="Preguntas frecuentes sobre gestión de proyectos"
        items={[
          {
            question: '¿Qué diferencia hay entre dirección de obra y gestión de proyectos?',
            answer:
              'La dirección de obra se centra en la supervisión técnica. La gestión de proyectos abarca planificación, coordinación integral, control de costes, plazos y gestión de riesgos. Es un rol más amplio.',
          },
          {
            question: '¿Desde cuándo debo contratar gestión de proyectos?',
            answer:
              'Lo ideal es desde la fase de diseño o planificación, para optimizar desde el principio. Pero podemos incorporarnos en cualquier fase.',
          },
          {
            question: '¿Cuánto cuesta la gestión de un proyecto en Murcia?',
            answer:
              'Normalmente entre 3-5% del presupuesto total según complejidad. Te damos presupuesto cerrado tras estudiar tu proyecto.',
          },
          {
            question: '¿Necesito un Project Manager si ya tengo director de obra?',
            answer:
              'El director de obra cubre aspectos técnicos. El Project Manager gestiona todo: planning, proveedores, presupuesto, coordinación, riesgos y comunicaciones. Son complementarios.',
          },
        ]}
      />

      {/* CTA Final */}
      <section className="section bg-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-4xl font-heading font-bold mb-4 text-primary">¿Necesitas un Project Manager en Murcia?</h2>
          <p className="text-xl text-gray-700 mb-8">Gestionamos tu proyecto de principio a fin con garantías</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/presupuesto" className="px-8 py-4 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-all text-center text-lg shadow-lg">Solicitar Presupuesto</Link>
            <a href="tel:+34650075842" className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-all text-center text-lg border-2 border-primary">650 075 842</a>
          </div>
        </div>
      </section>
    </>
  );
}
