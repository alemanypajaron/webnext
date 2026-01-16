import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Construcción y Reforma Piscina Murcia | Desde 8.000€ | Alemán y Pajarón',
  description: 'Construcción y reforma de piscinas en Murcia desde 8.000€. Piscina obra, prefabricada, gresite, rehabilitación. +15 años experiencia.',
  keywords: 'construir piscina murcia precio, reformar piscina murcia, cambio gresite piscina murcia, piscina obra murcia, piscina prefabricada murcia',
  alternates: { canonical: 'https://www.alemanypajaron.es/servicios/reforma-piscina' },
  openGraph: {
    title: 'Construcción Piscina Murcia desde 8.000€ | Alemán y Pajarón',
    description: 'Construcción y reforma de piscinas. Presupuesto sin compromiso.',
    url: 'https://www.alemanypajaron.es/servicios/reforma-piscina',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Construcción Piscina Murcia | Alemán y Pajarón',
    description: 'Desde 8.000€. Presupuesto gratis.',
  },
};

export default function ReformaPiscinaPage() {
  const serviciosIncluidos = [
    {
      title: 'Excavación y Estructura',
      desc: 'Excavación terreno, estructura hormigón armado, impermeabilización bicapa, desagüe fondo.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      title: 'Gresite o Liner',
      desc: 'Revestimiento gresite vítreo colores, o liner PVC armado. Resistente cloro, UV, fácil limpieza.',
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
      title: 'Depuradora y Filtros',
      desc: 'Depuradora arena, bomba recirculación, skimmers, boquillas impulsión. Sistema completo.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v20M17 7l-5 5-5-5M7 17l5-5 5 5" />
        </svg>
      ),
    },
    {
      title: 'Coronación',
      desc: 'Coronación piedra natural, porcelánico antideslizante o tarima. Segura y estética.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
    {
      title: 'Escalera y Accesorios',
      desc: 'Escalera acero inoxidable, focos LED sumergibles, limpiafondos automático opcional.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 12h20M7 20v-8c0-1.38.56-2.63 1.46-3.54M17 20v-8c0-1.38-.56-2.63-1.46-3.54" />
        </svg>
      ),
    },
    {
      title: 'Extras Opcionales',
      desc: 'Bomba calor, cloración salina, cubierta automática, ducha exterior, jacuzzi integrado.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
        </svg>
      ),
    },
  ];

  const precios = [
    {
      tipo: 'Piscina Pequeña',
      desde: '8.000€',
      incluye: ['6x3m (18m²)', 'Profundidad 1,40m', 'Gresite o liner', 'Depuradora básica', 'Escalera'],
    },
    {
      tipo: 'Piscina Media',
      desde: '15.000€',
      incluye: ['8x4m (32m²)', 'Profundidad 1,60m', 'Gresite premium', 'Depuradora completa', 'Iluminación LED'],
    },
    {
      tipo: 'Piscina Grande',
      desde: '25.000€',
      incluye: ['10x5m (50m²)', 'Playa + hondo', 'Desbordante infinity', 'Cloración salina', 'Todo equipado'],
    },
  ];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          slug: 'reforma-piscina',
          serviceType: 'Construcción y reforma de piscinas',
          name: 'Construcción Piscina Murcia',
          description:
            'Construcción y reforma de piscinas en Murcia: obra, prefabricada, gresite, rehabilitación.',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Servicios', url: `${SITE_URL}/servicios` },
            { name: 'Construcción Piscina', url: `${SITE_URL}/servicios/reforma-piscina` },
          ],
        })}
      />

      <PageHeader
        badge="Reformas Vivienda"
        title="Construcción y Reforma de Piscinas en Murcia desde 8.000€"
        subtitle="Construcción obra, prefabricada, cambio gresite y rehabilitación"
        image="https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Construcción piscina Murcia"
        highlightedWord="Piscinas"
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
                Tu piscina en Murcia: Obra o prefabricada
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                Construcción de piscinas de obra, prefabricadas, reforma completa, cambio gresite. Diseño personalizado y ejecución llave en mano.
              </p>
              <p className="text-gray-600 mb-4">
                En Murcia con 300 días de sol al año, una piscina revaloriza tu vivienda entre 10.000-20.000€. Inversión que se disfruta y se recupera.
              </p>
              <ul className="space-y-3">
                {[
                  'Diseño 3D previo incluido',
                  'Garantía estructura 10 años',
                  'Depuradora y accesorios',
                  'Llave en mano: lista para usar',
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
                src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80"
                alt="Construcción piscina moderna en Murcia"
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
              Construcción completa
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary">
              ¿Qué incluye la construcción de piscina?
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
              ¿Cuánto cuesta construir una piscina?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Presupuesto según tamaño y características
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
                    MÁS COMÚN
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
            * Precios piscina obra completa llave en mano. Piscina prefabricada -20%. Solo cambio gresite: desde 2.500€.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        title="Preguntas frecuentes sobre construcción de piscinas en Murcia"
        items={[
          {
            question: '¿Cuánto se tarda en construir una piscina?',
            answer:
              'Piscina prefabricada: 2 semanas. Piscina obra pequeña (6x3): 1 mes. Piscina obra grande (10x5): 2-3 meses. Plazo desde excavación hasta llenar agua.',
          },
          {
            question: '¿Piscina de obra o prefabricada?',
            answer:
              'Obra: Diseño totalmente libre, cualquier forma/tamaño, más duradera. Prefabricada: Más rápida, más económica (-20%), formas estándar. Ambas de calidad.',
          },
          {
            question: '¿Gresite o liner?',
            answer:
              'Gresite vítreo: Más duradero (20-30 años), colores variados, rugoso antideslizante, más caro. Liner PVC: Más barato, tacto suave, dura 10-15 años, fácil cambio.',
          },
          {
            question: '¿Necesito permisos para construir una piscina?',
            answer:
              'SÍ, casi siempre. Licencia urbanística (ayuntamiento) si piscina >40m². Si casa en Zona Rústica: también CARM. Te asesoramos y gestionamos todo.',
          },
          {
            question: '¿Cuánto cuesta mantener una piscina al año?',
            answer:
              'Depuradora eléctrica: 200-300€/año. Productos químicos: 200-300€/año. Total: 400-600€/año. Con bomba calor o cloración salina sube un poco. Mantenimiento semanal 1h.',
          },
        ]}
      />

      {/* CTA Final */}
      <section className="section bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            ¿Listo para disfrutar de tu piscina?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Diseño 3D gratis y presupuesto sin compromiso en 24h
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
            Respuesta en menos de 24h • Diseño 3D previo • Presupuesto cerrado
          </p>
        </div>
      </section>

      {/* Servicios relacionados */}
      <section className="section bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center">
            También puedes necesitar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/servicios/reforma-terraza"
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all group border-2 border-accent/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    Reforma Terraza
                  </h3>
                  <p className="text-gray-600 mb-3">Zona chill-out junto a tu piscina. Desde 3.500€</p>
                  <span className="text-accent font-semibold text-sm">Ver servicio →</span>
                </div>
              </div>
            </Link>

            <Link
              href="/servicios/reformas-integrales"
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all group border-2 border-accent/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    Reforma Integral
                  </h3>
                  <p className="text-gray-600 mb-3">¿Reformas casa+jardín? Piscina incluida</p>
                  <span className="text-accent font-semibold text-sm">Ver servicio →</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
