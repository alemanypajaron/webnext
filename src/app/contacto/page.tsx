import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';

export const metadata: Metadata = {
  title: 'Contacto | Arquitectos Técnicos en Murcia - Alemán y Pajarón',
  description: 'Contacta con Alemán y Pajarón en Murcia. ☎ 650 075 842. Presupuesto sin compromiso en 24h para tu obra o reforma. ¡Te ayudamos!',
  keywords: 'contacto arquitectos murcia, técnicos edificación murcia contacto, aparejador murcia contacto, gestor obras murcia teléfono, dirección obra murcia contacto',
  alternates: {
    canonical: 'https://www.alemanypajaron.es/contacto',
  },
  openGraph: {
    title: 'Contacto | Alemán y Pajarón - Técnicos de Edificación Murcia',
    description: 'Contacta con Alemán y Pajarón para tu proyecto en Murcia. Presupuesto sin compromiso en 24h.',
    url: 'https://www.alemanypajaron.es/contacto',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Contacto | Alemán y Pajarón Murcia',
    description: 'Técnicos de edificación en Murcia. Presupuesto sin compromiso en 24h.',
  },
};

const WHATSAPP_URL =
  'https://wa.me/34650075842?text=' +
  encodeURIComponent('Hola, me gustaría solicitar información sobre sus servicios');

const OSM_EMBED =
  'https://www.openstreetmap.org/export/embed.html?bbox=-1.200%2C37.960%2C-1.060%2C38.025&layer=mapnik&marker=37.9861%2C-1.1303';

const OSM_LINK = 'https://www.openstreetmap.org/?mlat=37.9861&mlon=-1.1303#map=13/37.9861/-1.1303';

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        badge="Hablemos de tu proyecto"
        title="Contacto - Arquitectos Técnicos en Murcia"
        subtitle="Estamos aquí para ayudarte con tu proyecto en Murcia"
        image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Contacta con Alemán y Pajarón"
        highlightedWord="Arquitectos Técnicos"
      />

      <section className="section">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-heading font-bold text-primary mb-8">Información de Contacto</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Teléfono</h3>
                    <a href="tel:+34650075842" className="text-gray-600 hover:text-accent">650 075 842</a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">WhatsApp</h3>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-accent"
                    >
                      Escribir por WhatsApp
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Email</h3>
                    <a href="mailto:ivan@alemanypajaron.es" className="text-gray-600 hover:text-accent">ivan@alemanypajaron.es</a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Ubicación</h3>
                    <p className="text-gray-600">Murcia y alrededores</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Horario</h3>
                    <p className="text-gray-600">Lunes a Viernes: 8:00 - 16:00</p>
                  </div>
                </div>
              </div>

              <p className="mt-10 text-gray-600">
                Si quieres un presupuesto, usa el formulario.{' '}
                <Link href="/presupuesto" className="text-accent font-semibold hover:underline">
                  Solicitar presupuesto
                </Link>
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-heading font-bold text-primary mb-8">Dónde trabajamos</h2>
              <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                <iframe
                  title="Mapa de Murcia, zona de trabajo de Alemán y Pajarón"
                  src={OSM_EMBED}
                  className="w-full h-[360px] lg:h-[480px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="mt-3 text-sm text-gray-500">
                <a
                  href={OSM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  Ver mapa más grande
                </a>
                {' · '}
                <a
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  OpenStreetMap
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
