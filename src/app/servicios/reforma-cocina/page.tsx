import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Reforma de Cocina en Murcia | Precio desde 4.500€ | Alemán y Pajarón',
  description: 'Reforma integral de cocina en Murcia desde 4.500€. Muebles a medida, electrodomésticos, alicatado, fontanería. Presupuesto sin compromiso. +15 años experiencia.',
  keywords: 'reforma cocina murcia, reforma cocina murcia precio, reformar cocina murcia, reforma completa cocina murcia, cuanto cuesta reformar una cocina en murcia, reforma cocina pequeña murcia, empresa reforma cocina murcia, muebles cocina murcia',
  alternates: { canonical: '/servicios/reforma-cocina' },
};

export default function ReformaCocinaPage() {
  const serviciosIncluidos = [
    {
      title: 'Muebles de Cocina',
      desc: 'Diseño y fabricación de muebles a medida. Amplio catálogo de acabados y herrajes de calidad.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
          <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
          <path d="M9 9v6" />
          <path d="M15 9v6" />
        </svg>
      ),
    },
    {
      title: 'Electrodomésticos',
      desc: 'Selección e instalación de electrodomésticos: horno, vitro/inducción, campana, lavavajillas, nevera.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <line x1="9" y1="6" x2="9.01" y2="6" />
          <line x1="15" y1="6" x2="15.01" y2="6" />
          <line x1="9" y1="10" x2="15" y2="10" />
          <line x1="9" y1="14" x2="15" y2="14" />
        </svg>
      ),
    },
    {
      title: 'Encimera y Fregadero',
      desc: 'Encimeras de diferentes materiales: granito, cuarzo, porcelánico. Fregadero y grifería.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="15" rx="2" />
          <polyline points="17 2 12 7 7 2" />
        </svg>
      ),
    },
    {
      title: 'Alicatado y Suelo',
      desc: 'Revestimiento de paredes y renovación de suelo. Azulejos, porcelánico o vinilo.',
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
      title: 'Fontanería y Electricidad',
      desc: 'Renovación de instalaciones: tomas de agua, desagües, puntos eléctricos, iluminación LED.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      title: 'Pintura y Acabados',
      desc: 'Pintura de paredes y techos, zócalos, rodapiés, ajustes y limpieza final.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m14.622 17.897-10.68-2.913" />
          <path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z" />
        </svg>
      ),
    },
  ];

  const estilos = [
    {
      nombre: 'Cocina Moderna',
      desc: 'Líneas rectas, acabados lacados, encimera de cuarzo, electrodomésticos integrados.',
      img: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80',
    },
    {
      nombre: 'Cocina Clásica',
      desc: 'Muebles en madera, detalles moldurados, encimera de granito, estilo atemporal.',
      img: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=800&q=80',
    },
    {
      nombre: 'Cocina Industrial',
      desc: 'Estilo loft, acero inoxidable, ladrillo visto, isla central, look contemporáneo.',
      img: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const precios = [
    {
      tipo: 'Cocina Básica',
      desde: '4.500€',
      incluye: ['Muebles melamina', 'Encimera laminada', 'Electrodomésticos estándar', 'Alicatado básico', '6-8m²'],
    },
    {
      tipo: 'Cocina Completa',
      desde: '7.500€',
      incluye: [
        'Muebles lacados',
        'Encimera cuarzo',
        'Electrodomésticos calidad media',
        'Alicatado premium',
        'Iluminación LED',
        '8-12m²',
      ],
    },
    {
      tipo: 'Cocina Premium',
      desde: '12.000€',
      incluye: [
        'Muebles diseño a medida',
        'Encimera Silestone',
        'Electrodomésticos alta gama',
        'Porcelánico gran formato',
        'Isla central',
        'Smart home',
        '12-20m²',
      ],
    },
  ];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          slug: 'reforma-cocina',
          serviceType: 'Reforma de cocina',
          name: 'Reforma de Cocina en Murcia',
          description:
            'Reforma integral de cocina en Murcia: muebles a medida, electrodomésticos, encimera, alicatado, fontanería y electricidad. Presupuesto sin compromiso.',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Servicios', url: `${SITE_URL}/servicios` },
            { name: 'Reforma de Cocina', url: `${SITE_URL}/servicios/reforma-cocina` },
          ],
        })}
      />

      <PageHeader
        badge="Reforma de Cocina"
        title="Reforma de Cocina en Murcia: Tu Cocina Ideal desde 4.500€"
        subtitle="Diseño personalizado, muebles a medida y electrodomésticos de última generación"
        image="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Reforma de cocina en Murcia"
        highlightedWord="Cocina"
      />

      {/* Introducción */}
      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
                Especialistas en cocinas
              </span>
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">
                La cocina que siempre has soñado
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                Diseñamos y reformamos tu cocina adaptándonos a tu espacio, estilo y presupuesto.
              </p>
              <p className="text-gray-600 mb-4">
                Desde el diseño 3D hasta la instalación de cada detalle. Muebles a medida, electrodomésticos de primeras
                marcas y acabados profesionales.
              </p>
              <ul className="space-y-3">
                {[
                  'Diseño 3D gratuito con tu presupuesto',
                  'Muebles fabricados a medida',
                  'Electrodomésticos incluidos en el precio',
                  'Obra terminada en 3-4 semanas',
                  'Garantía de 3 años en muebles',
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
                src="https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=800&q=80"
                alt="Reforma cocina moderna Murcia"
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
              ¿Qué incluye la reforma de tu cocina?
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

      {/* Estilos */}
      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              Encuentra tu estilo
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary mb-6">
              Estilos de cocina más demandados en Murcia
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Desde el diseño clásico hasta el más vanguardista
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {estilos.map((estilo) => (
              <div
                key={estilo.nombre}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="relative h-80">
                  <Image src={estilo.img} alt={estilo.nombre} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-heading font-bold mb-2">{estilo.nombre}</h3>
                  <p className="text-white/90">{estilo.desc}</p>
                </div>
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
              ¿Cuánto cuesta reformar una cocina en Murcia?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Presupuestos adaptados al tamaño, distribución y acabados que elijas
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
                    MÁS VENDIDO
                  </span>
                )}
                <h3 className="text-2xl font-heading font-bold text-primary mb-2">{paquete.tipo}</h3>
                <div className="text-4xl font-bold text-accent mb-6">Desde {paquete.desde}</div>
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
            * Precios orientativos. El presupuesto final depende de medidas, distribución, materiales y electrodomésticos elegidos.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        title="Preguntas frecuentes sobre reforma de cocina en Murcia"
        items={[
          {
            question: '¿Cuánto tarda una reforma de cocina completa?',
            answer:
              'Una reforma completa de cocina tarda entre 3 y 4 semanas de media. Incluye: demolición, instalaciones, alicatado, montaje de muebles y electrodomésticos. Te damos fechas exactas en el presupuesto.',
          },
          {
            question: '¿Puedo cocinar durante la reforma?',
            answer:
              'Durante la reforma la cocina no será utilizable. Te recomendamos organizarte con comidas fuera, microondas en otra habitación, etc. Trabajamos lo más rápido posible para minimizar las molestias.',
          },
          {
            question: '¿Los electrodomésticos están incluidos en el precio?',
            answer:
              'Sí, todos nuestros presupuestos incluyen electrodomésticos: horno, placa, campana extractora y opcionalmente lavavajillas, nevera y microondas. Trabajamos con primeras marcas: Balay, Bosch, Teka, etc.',
          },
          {
            question: '¿Puedo elegir el diseño de los muebles?',
            answer:
              'Por supuesto. Hacemos un diseño 3D personalizado donde puedes elegir: distribución, acabados, colores, tiradores, herrajes, encimera, etc. Te enseñamos el resultado antes de empezar la obra.',
          },
          {
            question: '¿Qué garantía tiene la reforma de cocina?',
            answer:
              'Ofrecemos 3 años de garantía en muebles de cocina, 2 años en electrodomésticos (según fabricante) y 2 años en instalaciones (fontanería, electricidad, alicatados).',
          },
          {
            question: '¿Puedo cambiar la distribución de mi cocina?',
            answer:
              'Sí, podemos cambiar la distribución siempre que sea técnicamente viable: mover el fregadero, cambiar la posición de electrodomésticos, crear isla central, etc. Lo valoramos en la visita técnica.',
          },
          {
            question: '¿Necesito licencia para reformar la cocina?',
            answer:
              'Generalmente no se necesita licencia de obra mayor si no tocas estructura. Si cambias instalaciones importantes o distribución, puede requerirse comunicación previa. Nosotros te asesoramos y gestionamos los trámites.',
          },
        ]}
      />

      {/* CTA Final */}
      <section className="section bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">¿Listo para estrenar cocina?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Solicita tu presupuesto sin compromiso y te enviamos un diseño 3D de tu nueva cocina
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
            Respuesta en 24h • Visita y diseño 3D gratis • Presupuesto detallado y cerrado
          </p>
        </div>
      </section>

      {/* Servicios relacionados */}
      <section className="section bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center">También te puede interesar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Reforma Integral',
                desc: 'Reforma completa de tu vivienda',
                link: '/servicios/reformas-integrales',
              },
              {
                title: 'Diseño de Espacios',
                desc: 'Diseño 3D de tu nueva cocina',
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

