import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { localBusinessJsonLd, websiteJsonLd } from '@/lib/structuredData';
import { getHeroBlurDataURL } from '@/lib/blur-placeholder';

export const metadata: Metadata = {
  title: 'Gestión de Obras y Proyectos en Murcia | Dirección de Obra y Reformas',
  description:
    'Gestores de obras y técnicos de edificación en Murcia. Especialistas en dirección de obra, gestión de proyectos, licencias y reformas integrales. Más de 15 años de experiencia. Presupuesto sin compromiso.',
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  const servicios = [
    {
      href: '/servicios/asesoramiento-tecnico',
      title: 'Asesoramiento Técnico',
      description: 'Consultoría especializada para tomar las mejores decisiones en tu proyecto en Murcia.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      ),
    },
    {
      href: '/servicios/direccion-obra',
      title: 'Dirección de Obra',
      description: 'Control técnico y supervisión profesional en obras en Murcia.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 21h18" />
          <path d="M5 21V7l8-4v18" />
          <path d="M19 21V11l-6-4" />
          <path d="M9 9v.01" />
          <path d="M9 12v.01" />
          <path d="M9 15v.01" />
          <path d="M9 18v.01" />
        </svg>
      ),
    },
    {
      href: '/servicios/diseno-espacios',
      title: 'Diseño de Espacios',
      description: 'Espacios funcionales y estéticos adaptados a tus necesidades en Murcia.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      ),
    },
    {
      href: '/servicios/gestion-proyectos',
      title: 'Gestión de Proyectos',
      description: 'Planificación, coordinación y control de plazos y presupuestos.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          <path d="M9 14l2 2 4-4" />
        </svg>
      ),
    },
    {
      href: '/servicios/licencias-permisos',
      title: 'Licencias y Permisos',
      description: 'Tramitación de licencias de obra en el Ayuntamiento de Murcia.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
    {
      href: '/servicios/reformas-integrales',
      title: 'Reformas Integrales',
      description: 'Transformación completa de viviendas y locales en Murcia.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80"
            alt="Gestión de obras y proyectos en Murcia - Dirección de obra y reformas"
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={getHeroBlurDataURL()}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/98 to-primary/95" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-32 text-white">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-2 bg-accent text-primary rounded-full text-sm font-bold mb-6">
              Gestión de Obras y Proyectos en Murcia
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight text-white drop-shadow-lg">
              Especialistas en <span className="text-accent drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Dirección de Obra</span> y Gestión de
              Proyectos en Murcia
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
              Más de 15 años coordinando y ejecutando proyectos de construcción en Murcia. Dirección de obra, gestión integral,
              licencias y reformas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link
                href="/presupuesto"
                className="px-8 py-4 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-all text-center text-lg shadow-accent"
              >
                Solicitar Presupuesto
              </Link>
              <Link
                href="/proyectos"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all text-center text-lg border-2 border-white/30"
              >
                Ver Proyectos
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center sm:text-left">
                <div className="text-5xl font-bold text-accent mb-2">250+</div>
                <div className="text-gray-300">Proyectos en Murcia</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-5xl font-bold text-accent mb-2">15+</div>
                <div className="text-gray-300">Años experiencia</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-5xl font-bold text-accent mb-2">98%</div>
                <div className="text-gray-300">Clientes satisfechos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section className="section bg-gray-50" id="servicios">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              Nuestros Servicios
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
              Soluciones integrales en Murcia
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicios.map((servicio) => (
              <Link
                key={servicio.href}
                href={servicio.href}
                className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-primary transition-colors">
                  {servicio.icon}
                </div>
                <h3 className="text-2xl font-heading font-semibold text-primary mb-3">{servicio.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{servicio.description}</p>
                <span className="text-accent font-semibold group-hover:translate-x-2 inline-block transition-transform">
                  Saber más →
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/servicios" className="btn btn-outline">
              Ver todos los servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Sobre Nosotros Section */}
      <section className="section" id="nosotros">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                  alt="Gestión de obras y proyectos en Murcia"
                  width={600}
                  height={700}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-full h-full bg-accent/20 rounded-2xl -z-10" />
            </div>

            <div>
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
                Sobre Nosotros
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                Especialistas en Gestión de Obras y Proyectos en Murcia con más de 15 años de experiencia
              </h2>
              <p className="text-xl text-gray-700 mb-4 leading-relaxed">
                Somos técnicos de edificación especializados con más de 15 años de experiencia en dirección de obra y coordinación de
                proyectos de construcción en Murcia.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Nuestro enfoque combina rigor técnico con atención personalizada, asegurando que cada proyecto se
                ejecute con los más altos estándares.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  '+250 proyectos en Murcia',
                  'Profesionales colegiados',
                  'Trato directo y cercano',
                  'Presupuestos transparentes',
                ].map((feature) => (
                  <div key={feature} className="flex items-center space-x-3">
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
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/nosotros" className="btn btn-primary">
                Conocer más sobre nosotros
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Solicita un presupuesto sin compromiso y descubre cómo podemos ayudarte a hacer realidad tu proyecto en
            Murcia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/presupuesto" className="px-8 py-4 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-all text-center text-lg shadow-lg">
              Solicitar Presupuesto
            </Link>
            <Link
              href="/contacto"
              className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-all text-center text-lg border-2 border-primary"
            >
              Contactar
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
