import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Reforma Local Comercial Murcia | Desde 8.000€',
  description: 'Reforma integral local comercial en Murcia desde 8.000€. Tiendas, oficinas, consultas, clínicas. Diseño funcional, distribución óptima y acabados premium.',
  keywords: 'reforma local comercial murcia, reformar local comercial murcia precio, reforma tienda murcia, reforma oficina murcia, reforma local murcia',
  alternates: { canonical: 'https://www.alemanypajaron.es/servicios/reforma-local-comercial-murcia' },
  openGraph: {
    title: 'Reforma Local Comercial Murcia',
    description: 'Reforma integral local comercial. Diseño, ejecución y tramitación.',
    url: 'https://www.alemanypajaron.es/servicios/reforma-local-comercial-murcia',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function ReformaLocalComercialPage() {
  const serviciosIncluidos = [
    {
      title: 'Diseño y Distribución',
      desc: 'Planos completos, distribución óptima según actividad, aprovechamiento espacios, zonas trabajo y clientes.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      title: 'Obra Civil y Demolición',
      desc: 'Derribos, tabiquería, falsos techos, solados, alicatados. Preparación completa del local.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="9" />
          <rect x="14" y="3" width="7" height="5" />
          <rect x="14" y="12" width="7" height="9" />
          <rect x="3" y="16" width="7" height="5" />
        </svg>
      ),
    },
    {
      title: 'Instalación Eléctrica',
      desc: 'Cuadro eléctrico, tomas industriales, iluminación LED, enchufes, climatización, domótica.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      title: 'Fontanería y Baños',
      desc: 'Baño clientes adaptado, aseo empleados, instalación agua fría/caliente, desagües.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M2 12h20" />
        </svg>
      ),
    },
    {
      title: 'Escaparate y Accesos',
      desc: 'Escaparate comercial, puerta acceso, persiana enrollable, rótulo luminoso.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M9 3v18"/>
        </svg>
      ),
    },
    {
      title: 'Acabados y Decoración',
      desc: 'Pintura, pavimentos, revestimientos, mobiliario a medida, estanterías, mostradores.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m14.622 17.897-10.68-2.913" />
          <path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z" />
        </svg>
      ),
    },
  ];

  const tiposLocal = [
    {
      tipo: 'Tienda/Boutique',
      actividades: ['Moda', 'Complementos', 'Decoración', 'Regalos'],
      desde: '8.000€',
    },
    {
      tipo: 'Oficina/Despacho',
      actividades: ['Asesoría', 'Abogados', 'Inmobiliaria', 'Seguros'],
      desde: '10.000€',
    },
    {
      tipo: 'Clínica/Consulta',
      actividades: ['Médico', 'Dental', 'Fisioterapia', 'Estética'],
      desde: '15.000€',
    },
    {
      tipo: 'Otros Comercios',
      actividades: ['Peluquería', 'Panadería', 'Farmacia', 'Gimnasio'],
      desde: '12.000€',
    },
  ];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          slug: 'reforma-local-comercial-murcia',
          serviceType: 'Reforma de local comercial',
          name: 'Reforma Local Comercial en Murcia',
          description: 'Reforma integral local comercial: diseño, distribución, obra civil, instalaciones y acabados. Adaptado a tu negocio.',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Servicios', url: `${SITE_URL}/servicios` },
            { name: 'Reforma Local Comercial', url: `${SITE_URL}/servicios/reforma-local-comercial-murcia` },
          ],
        })}
      />

      <PageHeader
        badge="Local Comercial"
        title="Reforma Local Comercial en Murcia desde 8.000€"
        subtitle="Diseño funcional, distribución óptima y acabados profesionales para tu negocio"
        image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Reforma local comercial Murcia"
        highlightedWord="Comercial"
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
                ¿Por qué reformar tu local comercial en Murcia con nosotros?
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                Convertimos tu local en un espacio funcional, atractivo y adaptado a las necesidades de tu negocio.
              </p>
              <p className="text-gray-600 mb-6">
                Nos encargamos de todo: desde el diseño y distribución hasta la ejecución completa de la obra y tramitación de licencias.
              </p>
              <ul className="space-y-3">
                {[
                  'Diseño 3D del local antes de empezar',
                  'Distribución optimizada según actividad',
                  'Gestión de licencias y permisos',
                  'Plazos cumplidos sin retrasos',
                  'Garantía de 2 años en instalaciones',
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
                src="https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=800&q=80"
                alt="Reforma local comercial moderno Murcia"
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
              ¿Qué Incluye la Reforma de Local Comercial en Murcia?
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

      {/* Tipos de local */}
      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              Especializados en
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary mb-6">
              Tipos de Locales Comerciales que Reformamos en Murcia
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Adaptamos cada proyecto a las necesidades específicas de tu negocio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiposLocal.map((local) => (
              <div key={local.tipo} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
                <h3 className="text-xl font-heading font-bold text-primary mb-3">{local.tipo}</h3>
                <div className="text-2xl font-bold text-accent mb-4">Desde {local.desde}</div>
                <ul className="space-y-2">
                  {local.actividades.map((act, i) => (
                    <li key={i} className="text-gray-600 text-sm flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-accent flex-shrink-0"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {act}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 mt-8">
            * Precios orientativos por m². El presupuesto final depende de superficie, distribución y acabados.
          </p>
        </div>
      </section>

      {/* Proceso */}
      <section className="section bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-primary mb-6">
              Cómo Trabajamos tu Reforma de Local en Murcia
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                paso: '01',
                titulo: 'Visita y Medición',
                desc: 'Visitamos tu local, tomamos medidas y escuchamos tus necesidades.',
              },
              {
                paso: '02',
                titulo: 'Diseño y Presupuesto',
                desc: 'Te presentamos diseño 3D y presupuesto detallado cerrado.',
              },
              {
                paso: '03',
                titulo: 'Tramitación',
                desc: 'Gestionamos licencia de obra y actividad en el ayuntamiento.',
              },
              {
                paso: '04',
                titulo: 'Ejecución',
                desc: 'Ejecutamos la obra con plazos cumplidos y calidad garantizada.',
              },
            ].map((fase) => (
              <div key={fase.paso} className="relative">
                <div className="text-6xl font-bold text-accent/20 mb-4">{fase.paso}</div>
                <h3 className="text-xl font-heading font-bold text-primary mb-3">{fase.titulo}</h3>
                <p className="text-gray-600">{fase.desc}</p>
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
              Precio Reforma Local Comercial Murcia: ¿Cuánto Cuesta?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              El precio depende de superficie, distribución, instalaciones y calidad de acabados
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary to-primary-light text-white rounded-2xl p-12 text-center max-w-4xl mx-auto">
            <h3 className="text-3xl font-heading font-bold mb-4">Precio Orientativo</h3>
            <div className="text-6xl font-bold text-accent mb-6">300-600€/m²</div>
            <p className="text-xl text-white/90 mb-8">
              Reforma completa con instalaciones, acabados medios y licencias incluidas
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="font-bold mb-2">Local 50m²</h4>
                <p className="text-2xl font-bold text-accent">15.000-30.000€</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="font-bold mb-2">Local 100m²</h4>
                <p className="text-2xl font-bold text-accent">30.000-60.000€</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="font-bold mb-2">Local 150m²</h4>
                <p className="text-2xl font-bold text-accent">45.000-90.000€</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        title="Preguntas frecuentes sobre reforma de local comercial"
        items={[
          {
            question: '¿Cuánto tarda una reforma de local comercial?',
            answer:
              'Depende de la superficie y complejidad. Un local de 50-80m² puede tardar 1-2 meses. Locales más grandes (100-150m²) pueden necesitar 2-3 meses. Te damos calendario detallado en el presupuesto.',
          },
          {
            question: '¿Necesito licencia de obra para reformar un local?',
            answer:
              'Sí, normalmente necesitas licencia de obras menores. Además, si cambias de actividad necesitarás licencia de actividad. Nosotros tramitamos todo el papeleo con el ayuntamiento.',
          },
          {
            question: '¿Puedo seguir operando durante la reforma?',
            answer:
              'Depende del tipo de obra. Si es reforma integral, el local debe cerrarse. Si es parcial, podemos planificar fases para minimizar el cierre. Te asesoramos sobre la mejor opción.',
          },
          {
            question: '¿Hacéis el diseño del local?',
            answer:
              'Sí, incluimos diseño 3D del local con distribución optimizada según tu actividad. Te mostramos cómo quedará antes de empezar la obra.',
          },
          {
            question: '¿Qué garantía tiene la reforma?',
            answer:
              'Ofrecemos 2 años de garantía en todas las instalaciones: electricidad, fontanería, carpintería, revestimientos. Los fabricantes dan garantía adicional en sus productos.',
          },
          {
            question: '¿Incluye el mobiliario?',
            answer:
              'Podemos incluir mobiliario a medida (mostradores, estanterías, vitrinas) o trabajar con tus proveedores. Nos adaptamos a tu presupuesto y necesidades.',
          },
        ]}
      />

      {/* CTA Final */}
      <section className="section bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            ¿Listo para reformar tu local comercial en Murcia?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Solicita presupuesto sin compromiso. Te visitamos gratis y te damos precio cerrado
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
                title: 'Licencias y Permisos',
                desc: 'Tramitación de licencias comerciales',
                link: '/servicios/licencias-permisos',
              },
              {
                title: 'Diseño de Espacios',
                desc: 'Diseño 3D de tu local comercial',
                link: '/servicios/diseno-espacios',
              },
              {
                title: 'Reforma de Bar',
                desc: 'Especialistas en hostelería',
                link: '/servicios/reforma-bar',
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
