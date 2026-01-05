import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Alemán y Pajarón - Gestión de Obras en Murcia',
  description: 'Conoce a Alemán y Pajarón, técnicos de edificación especializados en gestión de obras y proyectos en Murcia con más de 15 años de experiencia en dirección de obra.',
  robots: 'index, follow',
  alternates: {
    canonical: '/nosotros',
  },
};

export default function NosotrosPage() {
  const valores = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: 'Confianza',
      description: 'Transparencia total en cada fase del proyecto. Sin sorpresas.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: 'Puntualidad',
      description: 'Respetamos los plazos acordados. Tu tiempo es valioso.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      title: 'Calidad',
      description: 'Estándares técnicos exigentes en cada proyecto.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: 'Cercanía',
      description: 'Trato directo y comunicación constante contigo.',
    },
  ];

  return (
    <>
      <PageHeader
        badge="Conócenos"
        title="Sobre Nosotros"
        subtitle="Gestores de obras en Murcia especializados en gestión de obras y proyectos"
        image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Equipo Alemán y Pajarón Murcia"
      />
      
      {/* HISTORIA */}
      <section className="section py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
                alt="Proyecto arquitectura Murcia"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 w-full h-full bg-accent/20 rounded-2xl -z-10" />
            </div>
            <div>
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
                Nuestra Historia
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                Más de 15 años construyendo confianza en Murcia
              </h2>
              <p className="text-xl text-gray-700 mb-4 leading-relaxed">
                Alemán y Pajarón nació de la pasión por la gestión de obras y proyectos y el compromiso con hacer las cosas bien.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Desde 2009, hemos acompañado a cientos de clientes en Murcia en sus proyectos de construcción, reforma y rehabilitación. Nuestra filosofía es simple: ofrecer un servicio profesional de calidad con un trato cercano y personalizado.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Creemos que cada proyecto merece atención individualizada. Por eso, nos involucramos desde el primer momento, asesorando, planificando y supervisando cada detalle.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* VALORES */}
      <section className="section py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              Nuestros Valores
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary">
              Lo que nos define
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valores.map((valor) => (
              <div key={valor.title} className="text-center p-8 bg-white rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent mx-auto mb-4">
                  {valor.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-primary mb-3">{valor.title}</h3>
                <p className="text-gray-600">{valor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="section py-24 bg-gray-100">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary">
              ¿Quieres conocernos mejor?
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Visítanos o llámanos para una primera consulta sin compromiso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="px-8 py-4 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-all text-center text-lg shadow-lg"
              >
                Contactar
              </Link>
              <a
                href="tel:+34650075842"
                className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-all text-center text-lg border-2 border-primary"
              >
                650 075 842
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

