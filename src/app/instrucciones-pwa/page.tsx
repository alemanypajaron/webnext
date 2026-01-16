import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cómo Instalar la PWA - Alemán y Pajarón',
  description: 'Instrucciones para instalar la aplicación PWA en tu móvil',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
  },
};

export default function InstruccionesPWA() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-white rounded-full p-4 mb-6 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-heading font-bold text-white mb-4">
            Instalar la Aplicación
          </h1>
          <p className="text-xl text-white/90">
            Panel de Administración de Alemán y Pajarón
          </p>
        </div>

        {/* Beneficios */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-xl">
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">
            ¿Por qué instalar la aplicación?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-primary mb-1">Acceso Rápido</h3>
                <p className="text-gray-600">Icono en tu pantalla de inicio</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-primary mb-1">Notificaciones</h3>
                <p className="text-gray-600">Recibe alertas de nuevos contactos</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-primary mb-1">Sesión Segura</h3>
                <p className="text-gray-600">No necesitas volver a iniciar sesión</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-primary mb-1">Pantalla Completa</h3>
                <p className="text-gray-600">Sin barra del navegador</p>
              </div>
            </div>
          </div>
        </div>

        {/* Instrucciones iPhone */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-xl">
          <div className="flex items-center mb-6">
            <svg className="w-8 h-8 text-primary mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <h2 className="text-2xl font-heading font-bold text-primary">
              iPhone (Safari)
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary mb-2">Abrir en Safari</h3>
                <p className="text-gray-600 mb-3">
                  Abre <span className="font-mono bg-gray-100 px-2 py-1 rounded">www.alemanypajaron.es</span> en el navegador <strong>Safari</strong> (no Chrome ni otros)
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-sm text-blue-900">
                    <strong>Importante:</strong> La instalación solo funciona en Safari
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary mb-2">Botón Compartir</h3>
                <p className="text-gray-600 mb-3">
                  Toca el botón de <strong>Compartir</strong> en la parte inferior de la pantalla (icono de un cuadrado con una flecha hacia arriba)
                </p>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <svg className="w-12 h-12 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <p className="text-sm text-gray-600 mt-2">Icono de compartir</p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary mb-2">Añadir a Inicio</h3>
                <p className="text-gray-600 mb-3">
                  En el menú que aparece, desplázate hacia abajo y toca <strong>"Añadir a pantalla de inicio"</strong>
                </p>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">
                    📱 <strong>Añadir a pantalla de inicio</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary mb-2">Confirmar</h3>
                <p className="text-gray-600 mb-3">
                  En la pantalla siguiente, toca <strong>"Añadir"</strong> en la esquina superior derecha
                </p>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <p className="text-sm text-green-900">
                    ✅ ¡Listo! La aplicación aparecerá en tu pantalla de inicio
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instrucciones Android */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-xl">
          <div className="flex items-center mb-6">
            <svg className="w-8 h-8 text-primary mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.43 11.43 0 00-8.94 0L5.65 5.67c-.19-.28-.54-.37-.83-.22-.3.16-.42.54-.26.85l1.84 3.18C4.8 11.16 3.5 13.84 3.5 16.5V19h17v-2.5c0-2.66-1.3-5.34-2.9-6.52zM7 17.25c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75zm10 0c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75z"/>
            </svg>
            <h2 className="text-2xl font-heading font-bold text-primary">
              Android (Chrome)
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary mb-2">Abrir en Chrome</h3>
                <p className="text-gray-600 mb-3">
                  Abre <span className="font-mono bg-gray-100 px-2 py-1 rounded">www.alemanypajaron.es</span> en el navegador <strong>Google Chrome</strong>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary mb-2">Menú de Opciones</h3>
                <p className="text-gray-600 mb-3">
                  Toca el menú de <strong>tres puntos</strong> en la esquina superior derecha
                </p>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <svg className="w-12 h-12 mx-auto text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                  <p className="text-sm text-gray-600 mt-2">Menú (⋮)</p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary mb-2">Añadir a Pantalla de Inicio</h3>
                <p className="text-gray-600 mb-3">
                  En el menú, selecciona <strong>"Añadir a pantalla de inicio"</strong> o <strong>"Instalar aplicación"</strong>
                </p>
                <div className="bg-gray-100 p-3 rounded-lg space-y-2">
                  <p className="text-sm text-gray-700">
                    📱 <strong>Añadir a pantalla de inicio</strong>
                  </p>
                  <p className="text-sm text-gray-500">o</p>
                  <p className="text-sm text-gray-700">
                    📲 <strong>Instalar aplicación</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary mb-2">Confirmar Instalación</h3>
                <p className="text-gray-600 mb-3">
                  En el diálogo que aparece, toca <strong>"Añadir"</strong> o <strong>"Instalar"</strong>
                </p>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <p className="text-sm text-green-900">
                    ✅ ¡Listo! La aplicación se instalará y aparecerá en tu pantalla de inicio
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Después de instalar */}
        <div className="bg-gradient-to-r from-accent to-yellow-400 rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">
            Después de Instalar
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-primary">
                <strong>Abre la aplicación</strong> desde el icono en tu pantalla de inicio
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-primary">
                <strong>Inicia sesión</strong> una vez (la sesión se mantendrá siempre)
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-primary">
                <strong>Activa las notificaciones</strong> para recibir alertas de nuevos contactos
              </p>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/administrator/login"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Ir al Panel de Administración
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Volver a la Web
          </Link>
        </div>

        {/* Ayuda adicional */}
        <div className="mt-8 text-center">
          <p className="text-white/80 text-sm">
            ¿Necesitas ayuda? Contacta con{' '}
            <a href="tel:650075842" className="text-white font-bold underline hover:text-accent transition-colors">
              650 075 842
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
