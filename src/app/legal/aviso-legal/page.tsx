import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Aviso Legal | Alemán y Pajarón',
  description: 'Aviso legal del sitio web de Alemán y Pajarón, gestores de obras y arquitectura técnica en Murcia.',
  alternates: {
    canonical: 'https://www.alemanypajaron.es/legal/aviso-legal',
  },
};

export default function AvisoLegalPage() {
  return (
    <>
      <section className="relative py-20 bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Aviso Legal
            </h1>
            <p className="text-xl text-white/90">
              Información legal y condiciones de uso del sitio web
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              {/* Datos identificativos */}
              <div className="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg mb-8">
                <h2 className="text-2xl font-heading font-bold text-primary mt-0 mb-4">
                  1. Datos Identificativos
                </h2>
                <p className="mb-2">
                  En cumplimiento con el deber de información dispuesto en la Ley 34/2002 de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE) de 11 de julio, se facilitan a continuación los siguientes datos:
                </p>
                <ul className="list-none space-y-2 mt-4">
                  <li><strong>Titular:</strong> Alemán y Pajarón</li>
                  <li><strong>Domicilio social:</strong> Murcia, España</li>
                  <li><strong>Email:</strong> <a href="mailto:ivan@alemanypajaron.es" className="text-primary hover:underline">ivan@alemanypajaron.es</a></li>
                  <li><strong>Teléfono:</strong> <a href="tel:+34650075842" className="text-primary hover:underline">650 075 842</a></li>
                  <li><strong>Sitio Web:</strong> <a href="https://www.alemanypajaron.es" className="text-primary hover:underline">www.alemanypajaron.es</a></li>
                </ul>
              </div>

              {/* Objeto */}
              <h2 className="text-2xl font-heading font-bold text-primary">2. Objeto</h2>
              <p>
                El presente aviso legal regula el uso y utilización del sitio web <strong>www.alemanypajaron.es</strong> (en adelante, el "Sitio Web"), del que es titular Alemán y Pajarón.
              </p>
              <p>
                La navegación por el Sitio Web atribuye la condición de usuario del mismo e implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal, que pueden sufrir modificaciones.
              </p>

              {/* Condiciones de uso */}
              <h2 className="text-2xl font-heading font-bold text-primary">3. Condiciones de Uso</h2>
              <p>
                El usuario se compromete a hacer un uso adecuado y lícito del Sitio Web, de conformidad con la legislación aplicable, el presente Aviso Legal, la moral y buenas costumbres generalmente aceptadas y el orden público.
              </p>
              <p>El usuario se obliga a no utilizar el Sitio Web con fines o efectos ilícitos o contrarios a lo establecido en el presente Aviso Legal, lesivos de los intereses o derechos de terceros, o que de cualquier forma puedan dañar, inutilizar, sobrecargar o deteriorar el Sitio Web o impedir la normal utilización del mismo por parte de los usuarios.</p>

              {/* Propiedad intelectual */}
              <h2 className="text-2xl font-heading font-bold text-primary">4. Propiedad Intelectual e Industrial</h2>
              <p>
                Todos los contenidos del Sitio Web, entendiendo por estos a título meramente enunciativo los textos, fotografías, gráficos, imágenes, iconos, tecnología, software, links y demás contenidos audiovisuales o sonoros, así como su diseño gráfico y códigos fuente (en adelante, los "Contenidos"), son propiedad intelectual de Alemán y Pajarón o de terceros, sin que puedan entenderse cedidos al usuario ninguno de los derechos de explotación reconocidos por la normativa vigente en materia de propiedad intelectual sobre los mismos.
              </p>
              <p>
                Las marcas, nombres comerciales o signos distintivos son titularidad de Alemán y Pajarón o terceros, sin que pueda entenderse que el acceso al Sitio Web atribuya ningún derecho sobre las citadas marcas, nombres comerciales y/o signos distintivos.
              </p>

              {/* Responsabilidad */}
              <h2 className="text-2xl font-heading font-bold text-primary">5. Limitación de Responsabilidad</h2>
              <p>
                Alemán y Pajarón no garantiza la inexistencia de errores en el acceso al Sitio Web, en su contenido, ni que éste se encuentre actualizado, aunque desarrollará sus mejores esfuerzos para, en su caso, evitarlos, subsanarlos o actualizarlos.
              </p>
              <p>
                Alemán y Pajarón excluye, con las limitaciones que establece la ley, cualquier responsabilidad por los daños y perjuicios de toda naturaleza que pudieran deberse a la falta de disponibilidad o de continuidad del funcionamiento del Sitio Web y de los servicios habilitados en el mismo, así como por los errores en el acceso a las distintas páginas web o a aquellas desde las que se prestan los citados servicios.
              </p>

              {/* Disclaimer contenido del blog */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg my-6">
                <h3 className="text-xl font-semibold text-yellow-800 mt-0 mb-3">
                  ⚠️ Importante: Contenido del Blog
                </h3>
                <p className="mb-0 text-gray-800">
                  <strong>Los contenidos publicados en el blog de este sitio web, incluyendo textos e imágenes, son generados con ayuda de herramientas de Inteligencia Artificial.</strong> Alemán y Pajarón no se hace responsable de la exactitud, vigencia o aplicabilidad de dicho contenido. Los artículos del blog tienen una finalidad meramente informativa y divulgativa, y en ningún caso deben ser utilizados como guía técnica, jurídica o profesional para ningún proyecto de construcción, reforma o actuación técnica. Para cualquier consulta profesional, recomendamos encarecidamente contactar directamente con nuestros servicios de asesoramiento técnico.
                </p>
              </div>

              {/* Enlaces externos */}
              <h2 className="text-2xl font-heading font-bold text-primary">6. Enlaces Externos</h2>
              <p>
                El Sitio Web puede contener enlaces a otros sitios web de terceros. Alemán y Pajarón no asume ninguna responsabilidad respecto al contenido de dichos sitios web ni sobre cualquier tipo de daño o perjuicio que pudiera derivarse de su acceso o utilización.
              </p>

              {/* Protección de datos */}
              <h2 className="text-2xl font-heading font-bold text-primary">7. Protección de Datos</h2>
              <p>
                Para conocer información detallada sobre el tratamiento de sus datos personales, consulte nuestra{' '}
                <Link href="/legal/privacidad" className="text-primary hover:underline font-semibold">
                  Política de Privacidad
                </Link>.
              </p>

              {/* Cookies */}
              <h2 className="text-2xl font-heading font-bold text-primary">8. Política de Cookies</h2>
              <p>
                El Sitio Web utiliza cookies. Para más información sobre el uso de cookies, consulte nuestra{' '}
                <Link href="/legal/cookies" className="text-primary hover:underline font-semibold">
                  Política de Cookies
                </Link>.
              </p>

              {/* Legislación aplicable */}
              <h2 className="text-2xl font-heading font-bold text-primary">9. Legislación Aplicable y Jurisdicción</h2>
              <p>
                El presente Aviso Legal se rige en todos y cada uno de sus extremos por la ley española. Para la resolución de cualquier controversia que pudiera suscitarse en relación con el uso del Sitio Web, las partes se someten expresamente a los Juzgados y Tribunales de Murcia, con renuncia expresa a cualquier otro fuero que pudiera corresponderles.
              </p>

              {/* Última actualización */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
                <p className="text-sm text-gray-600 mb-0">
                  <strong>Última actualización:</strong> Enero de 2026
                </p>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-primary to-primary-light rounded-lg p-8 text-center mt-8 not-prose">
                <h3 className="text-2xl font-heading font-bold text-white mb-4">
                  ¿Tienes alguna duda legal?
                </h3>
                <p className="text-white/90 mb-6">
                  Si tienes cualquier pregunta sobre nuestras políticas legales, no dudes en contactarnos.
                </p>
                <Link
                  href="/contacto"
                  className="inline-block px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-accent hover:text-primary-dark transition-all shadow-lg"
                >
                  Contactar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
