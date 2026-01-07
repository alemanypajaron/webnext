import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Reforma de Baño en Murcia | Precio y Presupuesto | Alemán y Pajarón',
  description: 'Reforma integral de baño en Murcia desde 3.500€. Diseño moderno, alicatado, fontanería, electricidad. Presupuesto sin compromiso. +15 años experiencia.',
  keywords: 'reforma baño murcia, reforma baño murcia precio, reformar baño murcia, reforma completa baño murcia, cuanto cuesta reformar un baño en murcia, reforma baño pequeño murcia, empresa reforma baño murcia',
  alternates: { canonical: 'https://www.alemanypajaron.es/servicios/reforma-bano' },
  openGraph: {
    title: 'Reforma de Baño en Murcia desde 3.500€ | Alemán y Pajarón',
    description: 'Reforma integral de baño con diseño moderno. Presupuesto sin compromiso.',
    url: 'https://www.alemanypajaron.es/servicios/reforma-bano',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Reforma de Baño Murcia | Alemán y Pajarón',
    description: 'Reforma integral desde 3.500€. Presupuesto gratis.',
  },
};

export default function ReformaBanoPage() {
  const serviciosIncluidos = [
    {
      title: 'Demolición y Preparación',
      desc: 'Retirada de sanitarios, alicatados y solados antiguos. Gestión de escombros incluida.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      ),
    },
    {
      title: 'Fontanería y Sanitarios',
      desc: 'Renovación completa de tuberías, instalación de inodoro, lavabo, ducha o bañera.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M2 12h20" />
        </svg>
      ),
    },
    {
      title: 'Alicatado y Solado',
      desc: 'Revestimiento de paredes y suelo con azulejos de primera calidad. Amplio catálogo.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      title: 'Electricidad e Iluminación',
      desc: 'Instalación eléctrica nueva, puntos de luz, enchufes, extractor. Normativa vigente.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      title: 'Muebles y Accesorios',
      desc: 'Mueble de baño, espejo, mamparas, griferías, toalleros y accesorios.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
          <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
        </svg>
      ),
    },
    {
      title: 'Pintura y Acabados',
      desc: 'Pintura plástica resistente a la humedad, sellados, ajustes finales.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m14.622 17.897-10.68-2.913" />
          <path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z" />
          <path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15" />
        </svg>
      ),
    },
  ];

  const precios = [
    {
      tipo: 'Baño Básico',
      desde: '3.500€',
      incluye: ['Sanitarios estándar', 'Alicatado básico', 'Mueble sencillo', '3-5m²'],
    },
    {
      tipo: 'Baño Completo',
      desde: '5.500€',
      incluye: ['Sanitarios calidad media', 'Alicatado premium', 'Mueble suspendido', 'Mampara', '5-7m²'],
    },
    {
      tipo: 'Baño Premium',
      desde: '8.500€',
      incluye: ['Sanitarios alta gama', 'Porcelánico rectificado', 'Muebles diseño', 'Plato ducha extraplano', '7-10m²'],
    },
  ];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          slug: 'reforma-bano',
          serviceType: 'Reforma de baño',
          name: 'Reforma de Baño en Murcia',
          description:
            'Reforma integral de baño en Murcia: diseño, alicatado, fontanería, electricidad, sanitarios y acabados. Presupuesto sin compromiso.',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Servicios', url: `${SITE_URL}/servicios` },
            { name: 'Reforma de Baño', url: `${SITE_URL}/servicios/reforma-bano` },
          ],
        })}
      />

      <PageHeader
        badge="Reforma de Baño"
        title="Reforma de Baño en Murcia: Transforma tu Baño desde 3.500€"
        subtitle="Reforma integral con diseño moderno, materiales de calidad y acabado profesional"
        image="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Reforma de baño en Murcia"
        highlightedWord="Baño"
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
                ¿Por qué reformar tu baño en Murcia con nosotros?
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                Convertimos tu baño antiguo en un espacio moderno, funcional y con estilo.
              </p>
              <p className="text-gray-600 mb-4">
                Nos encargamos de todo: desde el diseño y selección de materiales hasta la ejecución completa de la obra.
                Sin sorpresas, sin complicaciones.
              </p>
              <ul className="space-y-3">
                {[
                  'Presupuesto cerrado sin sorpresas',
                  'Obra terminada en 2-3 semanas',
                  'Materiales de primera calidad',
                  'Garantía de 2 años en toda la instalación',
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
                src="https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80"
                alt="Reforma baño moderno Murcia"
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
              Todo incluido
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary">
              ¿Qué incluye la reforma de tu baño?
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
              ¿Cuánto cuesta reformar un baño en Murcia?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Presupuestos adaptados al tamaño de tu baño y calidad de acabados
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
                    MÁS POPULAR
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
            * Precios orientativos. El presupuesto final depende de las medidas, materiales y acabados elegidos.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        title="Preguntas frecuentes sobre reforma de baño en Murcia"
        items={[
          {
            question: '¿Cuánto tarda una reforma de baño completa?',
            answer:
              'Una reforma completa de baño tarda entre 2 y 3 semanas de media. Depende del tamaño del baño y la complejidad de la obra. Te damos fechas concretas en el presupuesto.',
          },
          {
            question: '¿Puedo usar el baño durante la reforma?',
            answer:
              'Durante la reforma el baño no será utilizable. Si solo tienes un baño, te recomendamos planificar alternativas temporales. Trabajamos lo más rápido posible para minimizar las molestias.',
          },
          {
            question: '¿Los materiales están incluidos en el precio?',
            answer:
              'Sí, todos nuestros presupuestos incluyen materiales de primera calidad: sanitarios, azulejos, griferías, muebles y accesorios. Puedes elegir entre varias opciones.',
          },
          {
            question: '¿Necesito licencia para reformar el baño?',
            answer:
              'Generalmente las reformas de baño no requieren licencia de obra mayor si no tocas estructura. Nosotros te asesoramos y gestionamos los trámites necesarios en cada caso.',
          },
          {
            question: '¿Qué garantía tiene la reforma?',
            answer:
              'Ofrecemos 2 años de garantía en toda la instalación: fontanería, electricidad, alicatados y sanitarios. Además, los fabricantes dan garantía adicional en sus productos.',
          },
          {
            question: '¿Puedo cambiar la bañera por plato de ducha?',
            answer:
              'Sí, es una de las reformas más demandadas. Cambiamos tu bañera por un plato de ducha extraplano con mampara de cristal. Ganamos espacio y accesibilidad.',
          },
        ]}
      />

      {/* CTA Final */}
      <section className="section bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            ¿Listo para renovar tu baño?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Solicita tu presupuesto sin compromiso y transforma tu baño en el espacio que siempre has querido
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
            Respuesta en menos de 24h • Visita gratuita • Presupuesto detallado
          </p>
        </div>
      </section>

      {/* Servicios relacionados */}
      <section className="section bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center">
            También te puede interesar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Reforma Integral',
                desc: 'Reforma completa de tu vivienda',
                link: '/servicios/reformas-integrales',
              },
              {
                title: 'Diseño de Espacios',
                desc: 'Diseño 3D de tu nuevo baño',
                link: '/servicios/diseno-espacios',
              },
              {
                title: 'Gestión de Proyectos',
                desc: 'Gestionamos toda tu reforma',
                link: '/servicios/gestion-proyectos',
              },
            ].map((servicio) => (
              <Link
                key={servicio.title}
                href={servicio.link}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all group"
              >
                <h3 className="text-xl font-heading font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                  {servicio.title}
                </h3>
                <p className="text-gray-600">{servicio.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

