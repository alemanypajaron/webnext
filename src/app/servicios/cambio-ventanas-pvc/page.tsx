import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import FAQ from '@/components/ui/FAQ';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, localBusinessJsonLd, serviceJsonLd, SITE_URL } from '@/lib/structuredData';

export const metadata: Metadata = {
  title: 'Cambio Ventanas PVC Murcia | Desde 3.000€ | Alemán y Pajarón',
  description: 'Cambio ventanas PVC en Murcia desde 3.000€. Doble vidrio, aislamiento térmico y acústico. Ahorra hasta 40% en climatización. +15 años experiencia.',
  keywords: 'cambio ventanas pvc murcia, ventanas pvc murcia precio, cambiar ventanas aluminio por pvc murcia, ventanas doble cristal murcia, ventanas eficiencia energetica murcia',
  alternates: { canonical: 'https://www.alemanypajaron.es/servicios/cambio-ventanas-pvc' },
  openGraph: {
    title: 'Cambio Ventanas PVC Murcia desde 3.000€ | Alemán y Pajarón',
    description: 'Ventanas PVC con doble vidrio. Ahorra hasta 40% en climatización.',
    url: 'https://www.alemanypajaron.es/servicios/cambio-ventanas-pvc',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Cambio Ventanas PVC Murcia | Alemán y Pajarón',
    description: 'Desde 3.000€. Presupuesto gratis.',
  },
};

export default function CambioVentanasPVCPage() {
  const serviciosIncluidos = [
    {
      title: 'Medición y Asesoramiento',
      desc: 'Visita gratuita para medición exacta, asesoramiento técnico sobre perfiles, vidrios y colores.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
        </svg>
      ),
    },
    {
      title: 'Ventanas PVC',
      desc: 'Perfiles PVC 5-7 cámaras, refuerzo interior acero, juntas herméticas. Marcas líderes: Veka, Kömmerling, Rehau.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18" />
        </svg>
      ),
    },
    {
      title: 'Doble o Triple Vidrio',
      desc: 'Doble acristalamiento 4/16/4 (climalit), bajo emisivo, control solar. Triple vidrio si máximo aislamiento.',
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
      title: 'Retirada Ventanas Viejas',
      desc: 'Desmontaje ventanas antiguas, gestión escombros incluida. Trabajo limpio sin dañar paredes.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      ),
    },
    {
      title: 'Instalación Profesional',
      desc: 'Instalación con espuma poliuretano expansiva, sellado perimetral, ajuste herrajes. Garantía estanqueidad.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M2 12h20" />
        </svg>
      ),
    },
    {
      title: 'Acabados y Tapajuntas',
      desc: 'Tapajuntas PVC interior/exterior, vierteaguas aluminio, sellado silicona. Acabado impecable.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m14.622 17.897-10.68-2.913" />
          <path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z" />
        </svg>
      ),
    },
  ];

  const precios = [
    {
      tipo: 'Piso 3 Ventanas',
      desde: '3.000€',
      incluye: ['3 ventanas estándar', 'PVC blanco 5 cámaras', 'Doble vidrio 4/16/4', 'Instalación completa'],
    },
    {
      tipo: 'Piso Completo',
      desde: '5.500€',
      incluye: ['5-6 ventanas', 'PVC 7 cámaras', 'Vidrio bajo emisivo', 'Persiana motorizada', 'Colores imitación'],
    },
    {
      tipo: 'Casa 8+ Ventanas',
      desde: '9.500€',
      incluye: ['8-10 ventanas', 'Triple vidrio', 'RPT/Passivhaus', 'Automatización', 'Máximo aislamiento'],
    },
  ];

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={serviceJsonLd({
          slug: 'cambio-ventanas-pvc',
          serviceType: 'Cambio de ventanas PVC',
          name: 'Cambio Ventanas PVC Murcia',
          description:
            'Cambio ventanas PVC en Murcia: doble vidrio, aislamiento térmico y acústico, ahorro energético.',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd({
          items: [
            { name: 'Inicio', url: `${SITE_URL}/` },
            { name: 'Servicios', url: `${SITE_URL}/servicios` },
            { name: 'Cambio Ventanas PVC', url: `${SITE_URL}/servicios/cambio-ventanas-pvc` },
          ],
        })}
      />

      <PageHeader
        badge="Reformas Vivienda"
        title="Cambio de Ventanas PVC en Murcia desde 3.000€"
        subtitle="Ahorra hasta 40% en climatización con ventanas de doble vidrio"
        image="https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Cambio ventanas PVC Murcia"
        highlightedWord="Ventanas"
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
                Cambia a ventanas PVC: Ahorro y confort
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                ¿Frío en invierno? ¿Calor en verano? ¿Ruido de la calle? Las ventanas PVC con doble vidrio solucionan estos problemas.
              </p>
              <p className="text-gray-600 mb-4">
                Reducen hasta 40% el consumo de climatización, aíslan del ruido hasta 40dB y aumentan el valor de tu vivienda. Instalación en 1 día sin obras.
              </p>
              <ul className="space-y-3">
                {[
                  'Ahorra 30-40% en climatización',
                  'Aislamiento acústico 40dB',
                  'Instalación en 1 día',
                  'Garantía 10 años',
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
                src="https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?auto=format&fit=crop&w=800&q=80"
                alt="Ventanas PVC doble vidrio en Murcia"
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
              Servicio completo
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary">
              ¿Qué incluye el cambio de ventanas?
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
              ¿Cuánto cuesta cambiar las ventanas?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Presupuesto según número de ventanas y calidades
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
            * Precios ventanas 120x120cm practicables. Medidas especiales bajo pedido.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        title="Preguntas frecuentes sobre cambio de ventanas PVC en Murcia"
        items={[
          {
            question: '¿Cuánto se tarda en cambiar las ventanas?',
            answer:
              '1 día para piso (3-5 ventanas). Fabricación: 3-4 semanas. Te avisamos con antelación. Instalación sin obras, mínima suciedad.',
          },
          {
            question: '¿PVC o aluminio con rotura de puente térmico (RPT)?',
            answer:
              'PVC: Mejor aislamiento térmico/acústico, precio más económico, sin mantenimiento. Aluminio RPT: Más resistente perfiles grandes. Para vivienda: PVC 9/10 veces.',
          },
          {
            question: '¿Cuánto ahorro en la factura de luz/gas?',
            answer:
              'Entre 30-40% en climatización. Si pagas 100€/mes → ahorras 30-40€/mes = 360-480€/año. Amortización en 8-10 años. Además: más confort y valor vivienda.',
          },
          {
            question: '¿Qué es el doble acristalamiento bajo emisivo?',
            answer:
              'Vidrio con capa metálica invisible que refleja calor. En verano: bloquea calor exterior. En invierno: retiene calor interior. Ahorro extra 10-15%.',
          },
          {
            question: '¿Necesito licencia para cambiar las ventanas?',
            answer:
              'NO si mantienes mismo hueco y no tocas fachada. Si cambias tamaño/color fachada exterior: consulta ayuntamiento. Te asesoramos gratis.',
          },
        ]}
      />

      {/* CTA Final */}
      <section className="section bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Deja de perder dinero en climatización
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Medición gratuita a domicilio y presupuesto sin compromiso
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
            Respuesta en menos de 24h • Medición gratis • Presupuesto cerrado
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
                  <p className="text-gray-600 mb-3">¿Reformas toda la casa? Incluye ventanas nuevas</p>
                  <span className="text-accent font-semibold text-sm">Ver servicio →</span>
                </div>
              </div>
            </Link>

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
                  <p className="text-gray-600 mb-3">Cerramiento acristalado para terraza. Desde 3.500€</p>
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
