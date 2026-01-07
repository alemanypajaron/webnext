import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Cookies | Alemán y Pajarón - Gestión de Obras Murcia',
  description: 'Información sobre el uso de cookies en el sitio web de Alemán y Pajarón, gestores de obras en Murcia. Cookies técnicas y analíticas. Conforme a RGPD y LSSI-CE.',
  alternates: {
    canonical: 'https://www.alemanypajaron.es/legal/cookies',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CookiesPage() {
  return (
    <>
      <section className="relative py-20 bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Política de Cookies
            </h1>
            <p className="text-xl text-white/90">
              Información sobre el uso de cookies en nuestro sitio web
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              {/* Introducción */}
              <div className="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg mb-8">
                <p className="mb-0">
                  En <strong>Alemán y Pajarón</strong> utilizamos cookies y tecnologías similares para mejorar tu experiencia de navegación, analizar el tráfico web y personalizar el contenido. Esta política explica qué son las cookies, cómo las utilizamos y cómo puedes gestionarlas.
                </p>
              </div>

              {/* Qué son las cookies */}
              <h2 className="text-2xl font-heading font-bold text-primary">1. ¿Qué son las Cookies?</h2>
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, tablet o móvil) cuando visitas un sitio web. Las cookies permiten al sitio web recordar tus acciones y preferencias durante un período de tiempo, para que no tengas que volver a configurarlas cada vez que regreses al sitio o navegues de una página a otra.
              </p>

              {/* Tipos de cookies */}
              <h2 className="text-2xl font-heading font-bold text-primary">2. Tipos de Cookies</h2>
              
              <h3 className="text-xl font-semibold text-primary-light">Según su finalidad:</h3>
              <ul>
                <li><strong>Cookies técnicas:</strong> Permiten la navegación y el uso básico del sitio web (ej: recordar idioma, sesión).</li>
                <li><strong>Cookies de análisis:</strong> Permiten analizar el comportamiento de los usuarios para mejorar el sitio web.</li>
                <li><strong>Cookies de personalización:</strong> Permiten recordar preferencias del usuario.</li>
                <li><strong>Cookies de publicidad:</strong> Permiten gestionar espacios publicitarios (no utilizamos estas cookies).</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-light">Según su duración:</h3>
              <ul>
                <li><strong>Cookies de sesión:</strong> Se eliminan cuando cierras el navegador.</li>
                <li><strong>Cookies persistentes:</strong> Permanecen almacenadas en tu dispositivo durante un tiempo determinado.</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-light">Según su titularidad:</h3>
              <ul>
                <li><strong>Cookies propias:</strong> Enviadas desde nuestro dominio.</li>
                <li><strong>Cookies de terceros:</strong> Enviadas desde dominios externos (ej: Google Analytics).</li>
              </ul>

              {/* Cookies que utilizamos */}
              <h2 className="text-2xl font-heading font-bold text-primary">3. Cookies que Utilizamos</h2>
              
              {/* Tabla de cookies */}
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Cookie</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Tipo</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Finalidad</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Google Analytics */}
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">_ga</td>
                      <td className="border border-gray-300 px-4 py-2">Análisis (terceros)</td>
                      <td className="border border-gray-300 px-4 py-2">Distinguir usuarios únicos</td>
                      <td className="border border-gray-300 px-4 py-2">2 años</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">_ga_*</td>
                      <td className="border border-gray-300 px-4 py-2">Análisis (terceros)</td>
                      <td className="border border-gray-300 px-4 py-2">Mantener el estado de la sesión</td>
                      <td className="border border-gray-300 px-4 py-2">2 años</td>
                    </tr>
                    
                    {/* Cookies de sesión */}
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">articulos_visitados</td>
                      <td className="border border-gray-300 px-4 py-2">Técnica (propia)</td>
                      <td className="border border-gray-300 px-4 py-2">Controlar visitas únicas a artículos del blog</td>
                      <td className="border border-gray-300 px-4 py-2">Sesión</td>
                    </tr>
                    
                    {/* Next.js */}
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">__vercel_*</td>
                      <td className="border border-gray-300 px-4 py-2">Técnica (terceros)</td>
                      <td className="border border-gray-300 px-4 py-2">Optimización y análisis de rendimiento</td>
                      <td className="border border-gray-300 px-4 py-2">Sesión</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Google Analytics */}
              <h3 className="text-xl font-semibold text-primary-light mt-6">Google Analytics</h3>
              <p>
                Utilizamos Google Analytics (ID: G-EH39D527MS) para analizar cómo los usuarios interactúan con nuestro sitio web. Esto nos ayuda a mejorar nuestros contenidos y servicios. Google Analytics utiliza cookies para recopilar información anónima sobre:
              </p>
              <ul>
                <li>Páginas visitadas</li>
                <li>Tiempo de permanencia en el sitio</li>
                <li>Fuente de tráfico (cómo llegaste a nuestro sitio)</li>
                <li>Ubicación geográfica aproximada (país, ciudad)</li>
                <li>Dispositivo y navegador utilizado</li>
              </ul>
              <p>
                <strong>Importante:</strong> Hemos configurado Google Analytics para anonimizar las direcciones IP y no registramos actividad en las páginas del panel de administración.
              </p>
              <p>
                Más información sobre cómo Google utiliza los datos:{' '}
                <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  https://policies.google.com/technologies/partner-sites
                </a>
              </p>

              {/* Consentimiento */}
              <h2 className="text-2xl font-heading font-bold text-primary">4. Consentimiento y Base Legal</h2>
              <p>
                Al navegar por nuestro sitio web, aceptas el uso de cookies conforme a esta política. El uso de cookies de análisis se basa en nuestro interés legítimo de mejorar la experiencia del usuario y optimizar nuestros servicios, conforme al RGPD.
              </p>

              {/* Gestión de cookies */}
              <h2 className="text-2xl font-heading font-bold text-primary">5. Cómo Gestionar las Cookies</h2>
              <p>
                Puedes controlar y/o eliminar las cookies como desees. Para más información, consulta{' '}
                <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  aboutcookies.org
                </a>. Puedes eliminar todas las cookies que ya están en tu dispositivo y puedes configurar la mayoría de los navegadores para evitar que se almacenen.
              </p>

              <h3 className="text-xl font-semibold text-primary-light">Configuración por navegador:</h3>
              <ul>
                <li>
                  <strong>Google Chrome:</strong>{' '}
                  <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Gestionar cookies en Chrome
                  </a>
                </li>
                <li>
                  <strong>Mozilla Firefox:</strong>{' '}
                  <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Gestionar cookies en Firefox
                  </a>
                </li>
                <li>
                  <strong>Safari:</strong>{' '}
                  <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Gestionar cookies en Safari
                  </a>
                </li>
                <li>
                  <strong>Microsoft Edge:</strong>{' '}
                  <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Gestionar cookies en Edge
                  </a>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-light">Desactivar Google Analytics:</h3>
              <p>
                Puedes desactivar el seguimiento de Google Analytics instalando el{' '}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  complemento de inhabilitación para navegadores
                </a>.
              </p>

              {/* Consecuencias de desactivar cookies */}
              <h2 className="text-2xl font-heading font-bold text-primary">6. Consecuencias de Desactivar las Cookies</h2>
              <p>
                Si desactivas las cookies, algunas funcionalidades del sitio web pueden no funcionar correctamente:
              </p>
              <ul>
                <li>Es posible que no podamos recordar tus preferencias</li>
                <li>Algunas características del sitio pueden no estar disponibles</li>
                <li>La experiencia de navegación puede verse afectada</li>
              </ul>
              <p>
                Las cookies técnicas son necesarias para el funcionamiento básico del sitio, mientras que las cookies de análisis son opcionales pero nos ayudan a mejorar tu experiencia.
              </p>

              {/* Actualizaciones */}
              <h2 className="text-2xl font-heading font-bold text-primary">7. Actualizaciones de la Política de Cookies</h2>
              <p>
                Podemos actualizar esta Política de Cookies para reflejar cambios en las cookies que utilizamos o por razones operativas, legales o normativas. Te recomendamos revisar esta página periódicamente.
              </p>

              {/* Más información */}
              <h2 className="text-2xl font-heading font-bold text-primary">8. Más Información</h2>
              <p>
                Si tienes dudas sobre el uso de cookies en nuestro sitio web, puedes contactarnos:
              </p>
              <ul className="list-none space-y-2">
                <li><strong>Email:</strong> <a href="mailto:ivan@alemanypajaron.es" className="text-primary hover:underline">ivan@alemanypajaron.es</a></li>
                <li><strong>Teléfono:</strong> <a href="tel:+34650075842" className="text-primary hover:underline">650 075 842</a></li>
              </ul>
              <p>
                Para más información sobre protección de datos, consulta nuestra{' '}
                <Link href="/legal/privacidad" className="text-primary hover:underline font-semibold">
                  Política de Privacidad
                </Link>.
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
                  ¿Tienes más preguntas?
                </h3>
                <p className="text-white/90 mb-6">
                  Estamos aquí para ayudarte con cualquier duda sobre cookies y privacidad.
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
