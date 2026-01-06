import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Alemán y Pajarón',
  description: 'Política de privacidad y protección de datos personales de Alemán y Pajarón, conforme al RGPD.',
  alternates: {
    canonical: 'https://www.alemanypajaron.es/legal/privacidad',
  },
};

export default function PrivacidadPage() {
  return (
    <>
      <section className="relative py-20 bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Política de Privacidad
            </h1>
            <p className="text-xl text-white/90">
              Protección de datos personales conforme al RGPD
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
                  En <strong>Alemán y Pajarón</strong> nos tomamos muy en serio la protección de tus datos personales. Esta Política de Privacidad explica cómo recogemos, utilizamos, almacenamos y protegemos tu información personal de acuerdo con el Reglamento General de Protección de Datos (RGPD - UE 2016/679) y la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).
                </p>
              </div>

              {/* Responsable del tratamiento */}
              <h2 className="text-2xl font-heading font-bold text-primary">1. Responsable del Tratamiento</h2>
              <ul className="list-none space-y-2">
                <li><strong>Identidad:</strong> Alemán y Pajarón</li>
                <li><strong>Domicilio:</strong> Murcia, España</li>
                <li><strong>Email:</strong> <a href="mailto:ivan@alemanypajaron.es" className="text-primary hover:underline">ivan@alemanypajaron.es</a></li>
                <li><strong>Teléfono:</strong> <a href="tel:+34650075842" className="text-primary hover:underline">650 075 842</a></li>
              </ul>

              {/* Datos que recogemos */}
              <h2 className="text-2xl font-heading font-bold text-primary">2. Datos Personales que Recogemos</h2>
              <p>Podemos recoger los siguientes tipos de datos personales:</p>
              
              <h3 className="text-xl font-semibold text-primary-light">2.1. Formulario de Contacto</h3>
              <ul>
                <li>Nombre completo</li>
                <li>Dirección de correo electrónico</li>
                <li>Teléfono (opcional)</li>
                <li>Mensaje o consulta</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-light">2.2. Formulario de Solicitud de Presupuesto</h3>
              <ul>
                <li>Nombre completo</li>
                <li>Dirección de correo electrónico</li>
                <li>Teléfono</li>
                <li>Dirección de la obra o proyecto</li>
                <li>Tipo de servicio solicitado</li>
                <li>Descripción del proyecto</li>
                <li>Presupuesto estimado</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-light">2.3. Newsletter</h3>
              <ul>
                <li>Dirección de correo electrónico</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-light">2.4. Datos de Navegación</h3>
              <ul>
                <li>Dirección IP</li>
                <li>Tipo de navegador</li>
                <li>Páginas visitadas</li>
                <li>Tiempo de permanencia</li>
                <li>Información sobre el dispositivo</li>
              </ul>

              {/* Finalidad del tratamiento */}
              <h2 className="text-2xl font-heading font-bold text-primary">3. Finalidad del Tratamiento</h2>
              <p>Utilizamos tus datos personales para las siguientes finalidades:</p>
              <ul>
                <li><strong>Gestión de consultas:</strong> Responder a tus preguntas y solicitudes de información a través del formulario de contacto.</li>
                <li><strong>Elaboración de presupuestos:</strong> Preparar y enviar presupuestos personalizados para los servicios solicitados.</li>
                <li><strong>Newsletter:</strong> Enviarte información, novedades y contenidos sobre arquitectura técnica y nuestros servicios (solo si has dado tu consentimiento).</li>
                <li><strong>Análisis y mejora:</strong> Analizar el uso del sitio web mediante Google Analytics para mejorar nuestros servicios y la experiencia de usuario.</li>
                <li><strong>Cumplimiento legal:</strong> Cumplir con obligaciones legales y normativas aplicables.</li>
              </ul>

              {/* Base legal */}
              <h2 className="text-2xl font-heading font-bold text-primary">4. Base Legal del Tratamiento</h2>
              <p>El tratamiento de tus datos personales se basa en:</p>
              <ul>
                <li><strong>Consentimiento:</strong> Al rellenar y enviar los formularios de contacto, presupuesto o newsletter, nos otorgas tu consentimiento expreso para el tratamiento de tus datos.</li>
                <li><strong>Ejecución de un contrato:</strong> El tratamiento es necesario para la preparación y ejecución del contrato de servicios que nos solicites.</li>
                <li><strong>Interés legítimo:</strong> Para el análisis del sitio web y mejora de nuestros servicios.</li>
              </ul>

              {/* Conservación de datos */}
              <h2 className="text-2xl font-heading font-bold text-primary">5. Conservación de Datos</h2>
              <p>Conservaremos tus datos personales durante el tiempo necesario para cumplir con las finalidades para las que fueron recogidos:</p>
              <ul>
                <li><strong>Consultas y presupuestos:</strong> Hasta 2 años desde la última interacción, salvo que exista una relación contractual vigente.</li>
                <li><strong>Newsletter:</strong> Hasta que solicites la baja de la suscripción.</li>
                <li><strong>Datos fiscales y contables:</strong> Durante el plazo legal establecido (mínimo 6 años).</li>
              </ul>
              <p>
                Transcurridos estos plazos, tus datos serán eliminados de forma segura o anonimizados para fines estadísticos.
              </p>

              {/* Destinatarios */}
              <h2 className="text-2xl font-heading font-bold text-primary">6. Destinatarios de los Datos</h2>
              <p>Tus datos personales pueden ser compartidos con:</p>
              <ul>
                <li><strong>Proveedores de servicios tecnológicos:</strong> Vercel (hosting), Supabase (base de datos), Google Analytics (análisis web).</li>
                <li><strong>Autoridades públicas:</strong> Cuando sea requerido por ley o para el cumplimiento de obligaciones legales.</li>
              </ul>
              <p>
                No vendemos, alquilamos ni compartimos tus datos personales con terceros para fines comerciales ajenos a los descritos en esta política.
              </p>

              {/* Transferencias internacionales */}
              <h2 className="text-2xl font-heading font-bold text-primary">7. Transferencias Internacionales</h2>
              <p>
                Algunos de nuestros proveedores de servicios están ubicados fuera del Espacio Económico Europeo (EEE). En estos casos, garantizamos que las transferencias se realizan con las debidas garantías y medidas de seguridad, mediante:
              </p>
              <ul>
                <li>Cláusulas contractuales tipo aprobadas por la Comisión Europea</li>
                <li>Certificaciones de privacidad reconocidas (ej: Privacy Shield, si aplica)</li>
                <li>Mecanismos equivalentes que garantizan un nivel adecuado de protección</li>
              </ul>

              {/* Derechos del usuario */}
              <h2 className="text-2xl font-heading font-bold text-primary">8. Tus Derechos</h2>
              <p>Como titular de los datos personales, tienes los siguientes derechos:</p>
              <ul>
                <li><strong>Derecho de acceso:</strong> Conocer qué datos tuyos estamos tratando.</li>
                <li><strong>Derecho de rectificación:</strong> Corregir datos inexactos o incompletos.</li>
                <li><strong>Derecho de supresión ("derecho al olvido"):</strong> Solicitar la eliminación de tus datos.</li>
                <li><strong>Derecho de oposición:</strong> Oponerte al tratamiento de tus datos.</li>
                <li><strong>Derecho de limitación:</strong> Solicitar la limitación del tratamiento.</li>
                <li><strong>Derecho de portabilidad:</strong> Recibir tus datos en un formato estructurado y de uso común.</li>
                <li><strong>Derecho a retirar el consentimiento:</strong> En cualquier momento, sin que ello afecte a la licitud del tratamiento anterior.</li>
              </ul>
              <p>
                Para ejercer tus derechos, puedes contactarnos en <a href="mailto:ivan@alemanypajaron.es" className="text-primary hover:underline font-semibold">ivan@alemanypajaron.es</a> o llamar al <a href="tel:+34650075842" className="text-primary hover:underline font-semibold">650 075 842</a>.
              </p>
              <p>
                También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.aepd.es</a>).
              </p>

              {/* Seguridad */}
              <h2 className="text-2xl font-heading font-bold text-primary">9. Seguridad de los Datos</h2>
              <p>
                Hemos implementado medidas técnicas y organizativas apropiadas para proteger tus datos personales contra el acceso no autorizado, la pérdida, la destrucción o la alteración, incluyendo:
              </p>
              <ul>
                <li>Cifrado SSL/TLS en todas las comunicaciones</li>
                <li>Almacenamiento seguro en bases de datos protegidas</li>
                <li>Acceso restringido solo a personal autorizado</li>
                <li>Copias de seguridad periódicas</li>
                <li>Políticas de contraseñas seguras</li>
              </ul>

              {/* Menores */}
              <h2 className="text-2xl font-heading font-bold text-primary">10. Menores de Edad</h2>
              <p>
                Este sitio web no está dirigido a menores de 14 años. No recogemos intencionadamente datos personales de menores. Si eres padre o tutor y crees que tu hijo nos ha proporcionado datos personales, por favor contacta con nosotros.
              </p>

              {/* Actualizaciones */}
              <h2 className="text-2xl font-heading font-bold text-primary">11. Actualizaciones de la Política</h2>
              <p>
                Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas o en la legislación aplicable. Te recomendamos revisar esta página regularmente para estar informado sobre cómo protegemos tu información.
              </p>

              {/* Contacto */}
              <h2 className="text-2xl font-heading font-bold text-primary">12. Contacto</h2>
              <p>
                Si tienes cualquier pregunta o inquietud sobre esta Política de Privacidad o sobre el tratamiento de tus datos personales, puedes contactarnos:
              </p>
              <ul className="list-none space-y-2">
                <li><strong>Email:</strong> <a href="mailto:ivan@alemanypajaron.es" className="text-primary hover:underline">ivan@alemanypajaron.es</a></li>
                <li><strong>Teléfono:</strong> <a href="tel:+34650075842" className="text-primary hover:underline">650 075 842</a></li>
                <li><strong>Horario:</strong> Lunes a Viernes, 8:00 - 16:00</li>
              </ul>

              {/* Última actualización */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
                <p className="text-sm text-gray-600 mb-0">
                  <strong>Última actualización:</strong> Enero de 2026
                </p>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-primary to-primary-light rounded-lg p-8 text-center mt-8 not-prose">
                <h3 className="text-2xl font-heading font-bold text-white mb-4">
                  ¿Necesitas más información?
                </h3>
                <p className="text-white/90 mb-6">
                  Estamos aquí para resolver cualquier duda sobre tus datos personales.
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
