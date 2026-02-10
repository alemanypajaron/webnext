import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Cambiar Bañera por Ducha en Murcia | Desde 1.200€ | Alemán y Pajarón',
  description: 'Cambia tu bañera por ducha en Murcia desde 1.200€. Obra en 2-3 días. Plato de ducha extraplano, mampara y acabados premium. Presupuesto sin compromiso.',
  keywords: 'cambiar bañera por ducha murcia, sustituir bañera por ducha murcia, cambio bañera ducha precio murcia, quitar bañera poner ducha murcia',
  alternates: { canonical: 'https://www.alemanypajaron.es/servicios/cambio-banera-ducha' },
  openGraph: {
    title: 'Cambiar Bañera por Ducha Murcia desde 1.200€',
    description: 'Obra en 2-3 días. Presupuesto sin compromiso.',
    url: 'https://www.alemanypajaron.es/servicios/cambio-banera-ducha',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function CambioBaneraDuchaPage() {
  const ventajas = [
    {
      title: 'Mayor Accesibilidad',
      desc: 'Sin escalones ni barreras. Perfecto para personas mayores y niños pequeños.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
          <line x1="12" x2="12" y1="19" y2="22"/>
        </svg>
      ),
    },
    {
      title: 'Más Espacio Visual',
      desc: 'Sensación de amplitud. Ideal para baños pequeños.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="2"/>
          <path d="M7 8h10M7 12h10M7 16h10"/>
        </svg>
      ),
    },
    {
      title: 'Limpieza Más Fácil',
      desc: 'Menos rincones y juntas. Ahorra tiempo en la limpieza diaria.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 2v6"/>
          <path d="M15 2v6"/>
          <path d="M12 17v5"/>
          <path d="M5 8h14"/>
          <path d="M6 11V8h12v3"/>
        </svg>
      ),
    },
    {
      title: 'Diseño Moderno',
      desc: 'Estética actual con materiales premium y acabado impecable.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2"/>
          <polyline points="2 17 12 22 22 17"/>
          <polyline points="2 12 12 17 22 12"/>
        </svg>
      ),
    },
  ];

  const queIncluye = [
    'Retirada de bañera antigua y gestión de escombros',
    'Plato de ducha extraplano de resina o acrílico',
    'Mampara de cristal templado (frontal o angular)',
    'Grifería monomando empotrada o vista',
    'Alicatado zona necesaria (aprox. 2-3m²)',
    'Fontanería: conexiones y desagües',
    'Pruebas de estanqueidad',
    'Limpieza final y sellados',
  ];

  const precios = [
    {
      tipo: 'Básico',
      desde: '1.200€',
      incluye: ['Plato ducha 80x80cm', 'Mampara frontal', 'Grifería básica', 'Alicatado mínimo'],
    },
    {
      tipo: 'Estándar',
      desde: '1.800€',
      incluye: ['Plato ducha 100x80cm', 'Mampara angular', 'Grifería calidad media', 'Alicatado completo'],
    },
    {
      tipo: 'Premium',
      desde: '2.500€',
      incluye: ['Plato ducha a medida', 'Mampara diseño', 'Grifería alta gama', 'Revestimiento premium'],
    },
  ];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          slug: 'cambio-banera-ducha',
          serviceType: 'Cambio de bañera por ducha',
          name: 'Cambiar Bañera por Ducha en Murcia',
          description: 'Sustituimos tu bañera antigua por una ducha moderna en 2-3 días. Más espacio, accesibilidad y diseño.',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Servicios', url: `${SITE_URL}/servicios` },
            { name: 'Cambiar Bañera por Ducha', url: `${SITE_URL}/servicios/cambio-banera-ducha` },
          ],
        })}
      />

      <PageHeader
        badge="Baño Accesible"
        title="Cambiar Bañera por Ducha en Murcia desde 1.200€"
        subtitle="Obra rápida en 2-3 días. Más espacio, accesibilidad y diseño moderno"
        image="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Cambio bañera por ducha Murcia"
        highlightedWord="Ducha"
      />

      {/* Introducción */}
      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
                Obra en 2-3 días
              </span>
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">
                ¿Por qué cambiar tu bañera por ducha en Murcia?
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                Transforma tu baño en un espacio más accesible, moderno y funcional. Sin obras grandes ni complicaciones.
              </p>
              <p className="text-gray-600 mb-6">
                Sustituimos tu bañera antigua por un plato de ducha extraplano con mampara de cristal. Obra rápida y limpia.
              </p>
              <ul className="space-y-3">
                {[
                  'Obra en 2-3 días laborables',
                  'Sin alterar el resto del baño',
                  'Presupuesto cerrado sin sorpresas',
                  'Garantía de 2 años en instalación',
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
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
                alt="Ducha moderna extraplana Murcia"
                width={600}
                height={700}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 w-full h-full bg-accent/20 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="section bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              Beneficios
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary">
              Ventajas de Cambiar la Bañera por Ducha en Murcia
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ventajas.map((ventaja) => (
              <div key={ventaja.title} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-primary mb-6 mx-auto">
                  {ventaja.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-primary mb-3">{ventaja.title}</h3>
                <p className="text-gray-600 leading-relaxed">{ventaja.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-primary mb-6">
              ¿Qué Incluye el Cambio de Bañera por Ducha en Murcia?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {queIncluye.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-md">
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
                <span className="text-gray-700">{item}</span>
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
              Precios transparentes
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary mb-6">
              Precio Cambio Bañera por Ducha en Murcia: ¿Cuánto Cuesta?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Presupuestos según tamaño, materiales y acabados
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
            * Precios orientativos. El presupuesto final depende de las medidas y materiales elegidos.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        title="Preguntas frecuentes sobre cambio de bañera por ducha"
        items={[
          {
            question: '¿Cuánto tarda el cambio de bañera por ducha?',
            answer: 'La obra completa se realiza en 2-3 días laborables. El primer día retiramos la bañera, el segundo instalamos el plato y alicatamos, y el tercero colocamos la mampara y acabados finales.',
          },
          {
            question: '¿Hay que picar todo el baño?',
            answer: 'No, solo picamos la zona donde estaba la bañera. El resto del baño no se toca. Es una intervención localizada y con poco polvo.',
          },
          {
            question: '¿Qué tipo de plato de ducha recomendáis?',
            answer: 'Recomendamos platos de resina de carga mineral (extraplanos) o acrílicos de calidad. Son antideslizantes, duraderos y fáciles de limpiar. Se pueden hacer a medida.',
          },
          {
            question: '¿La mampara está incluida?',
            answer: 'Sí, todos nuestros presupuestos incluyen la mampara de cristal templado de 6-8mm con perfil cromado o negro, según prefieras.',
          },
          {
            question: '¿Cuándo puedo usar la ducha nueva?',
            answer: 'Puedes usar la ducha el mismo día que terminamos la instalación. Los sellados necesitan 24h para fraguar completamente, pero la ducha es utilizable desde el primer momento.',
          },
          {
            question: '¿Qué garantía tiene?',
            answer: 'Ofrecemos 2 años de garantía en toda la instalación: fontanería, sellados, mampara y alicatados. Los fabricantes dan garantía adicional en sus productos.',
          },
        ]}
      />

      {/* CTA Final */}
      <section className="section bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            ¿Listo para cambiar tu bañera por ducha en Murcia?
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
                title: 'Reforma de Baño',
                desc: 'Reforma completa de tu baño',
                link: '/servicios/reforma-bano',
              },
              {
                title: 'Cambio Ventanas PVC',
                desc: 'Ventanas aislantes en Murcia',
                link: '/servicios/cambio-ventanas-pvc',
              },
              {
                title: 'Reformas Integrales',
                desc: 'Reforma completa de tu vivienda',
                link: '/servicios/reformas-integrales',
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
