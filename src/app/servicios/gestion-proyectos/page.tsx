import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Gestión de Proyectos en Murcia | Alemán y Pajarón - Técnicos de Edificación',
  description: 'Gestión integral de proyectos de construcción en Murcia. Planificación, coordinación, control de costes y plazos. Gestores de obras especializados.',
  alternates: { canonical: '/servicios/gestion-proyectos' },
};

export default function GestionProyectosPage() {
  const serviciosIncluidos = [
    {
      title: 'Planificación Estratégica',
      desc: 'Definición de objetivos, cronograma, presupuesto y recursos necesarios para tu proyecto.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      title: 'Coordinación de Equipos',
      desc: 'Gestión y coordinación de todos los agentes: constructora, gremios, proveedores y técnicos.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: 'Control de Plazos',
      desc: 'Seguimiento del cronograma, identificación de desviaciones y medidas correctoras.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      title: 'Control de Costes',
      desc: 'Supervisión de presupuesto, certificaciones y gestión de desviaciones económicas.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      title: 'Gestión de Riesgos',
      desc: 'Identificación, evaluación y mitigación de riesgos que puedan afectar al proyecto.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      title: 'Comunicación',
      desc: 'Informes periódicos, reuniones de seguimiento y comunicación fluida con todas las partes.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
  ];

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

      {/* Servicios incluidos */}
      <section className="section bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              Incluido en el servicio
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary">¿Qué incluye la gestión de proyectos?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviciosIncluidos.map((servicio) => (
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

      {/* Fases */}
      <section className="section">
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

      {/* Beneficios con Estadísticas */}
      <section className="section bg-gradient-to-br from-primary via-primary-light to-primary">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent text-primary rounded-full text-sm font-semibold mb-4">
              Resultados comprobados
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              ¿Por qué contratar gestión de proyectos?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Más de 15 años gestionando proyectos en Murcia con resultados medibles
            </p>
          </div>

          {/* Estadísticas destacadas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all">
              <div className="text-5xl md:text-6xl font-bold text-accent mb-4">95%</div>
              <div className="text-lg md:text-xl font-semibold text-white mb-2">Cumplimiento de plazos</div>
              <p className="text-white/80">Proyectos entregados en fecha prevista</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all">
              <div className="text-5xl md:text-6xl font-bold text-accent mb-4">-20%</div>
              <div className="text-lg md:text-xl font-semibold text-white mb-2">Ahorro medio</div>
              <p className="text-white/80">Reducción de costes por optimización</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all">
              <div className="text-5xl md:text-6xl font-bold text-accent mb-4">100%</div>
              <div className="text-lg md:text-xl font-semibold text-white mb-2">Satisfacción</div>
              <p className="text-white/80">Clientes que repiten con nosotros</p>
            </div>
          </div>

          {/* Ventajas clave con iconos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Un único interlocutor',
                desc: 'Olvídate de gestionar múltiples proveedores. Nosotros coordinamos todo.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                ),
              },
              {
                title: 'Máximo control presupuestario',
                desc: 'Seguimiento exhaustivo de cada euro invertido. Sin sorpresas al final.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                ),
              },
              {
                title: 'Tranquilidad garantizada',
                desc: 'Tú a lo tuyo, nosotros gestionamos toda la complejidad del proyecto.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
              },
              {
                title: 'Optimización de recursos',
                desc: 'Maximizamos eficiencia y minimizamos desperdicios en materiales y tiempo.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                ),
              },
            ].map((beneficio, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all group">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 transition-transform">
                    {beneficio.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-primary mb-3">{beneficio.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{beneficio.desc}</p>
                  </div>
                </div>
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
