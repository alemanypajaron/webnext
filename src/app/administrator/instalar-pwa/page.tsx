'use client';

import { useEffect, useState } from 'react';

export default function InstalarPWAPage() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Detectar plataforma
    const userAgent = window.navigator.userAgent.toLowerCase();
    const iOS = /iphone|ipad|ipod/.test(userAgent);
    const android = /android/.test(userAgent);
    
    setIsIOS(iOS);
    setIsAndroid(android);

    // Verificar si ya está instalada
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Capturar el evento de instalación
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Detectar si fue instalada
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setIsInstallable(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstallable(false);
      setIsInstalled(true);
    }
    
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="text-6xl mb-4">📱</div>
            <h1 className="text-3xl font-bold text-gray-900">
              Panel de Administración
            </h1>
            <p className="text-gray-600">
              Instala la app en tu dispositivo para acceso rápido
            </p>
          </div>

          {/* Estado de instalación */}
          {isInstalled ? (
            <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 text-center space-y-3">
              <div className="text-4xl">✅</div>
              <h2 className="text-xl font-bold text-green-800">
                ¡App Instalada!
              </h2>
              <p className="text-green-700">
                Ya puedes acceder al panel desde tu pantalla de inicio
              </p>
              <a
                href="/administrator"
                className="inline-block mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Ir al Panel de Administración
              </a>
            </div>
          ) : (
            <>
              {/* Botón de instalación automática */}
              {isInstallable && !isIOS && (
                <div className="space-y-4">
                  <button
                    onClick={handleInstall}
                    className="w-full py-4 px-6 bg-accent text-white rounded-xl font-bold text-lg hover:bg-accent-dark transition-colors shadow-lg"
                  >
                    ⬇️ Instalar App Ahora
                  </button>
                  <p className="text-center text-sm text-gray-500">
                    Un clic para instalar directamente
                  </p>
                </div>
              )}

              {/* Instrucciones para Android */}
              {isAndroid && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 space-y-4">
                  <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                    <span>🤖</span> Instalación en Android
                  </h3>
                  <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                    <li>Toca el menú (⋮) en la esquina superior derecha</li>
                    <li>Selecciona "Añadir a pantalla de inicio" o "Instalar app"</li>
                    <li>Confirma la instalación</li>
                    <li>Busca el icono en tu pantalla de inicio</li>
                  </ol>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
                    💡 <strong>Tip:</strong> La app funcionará como una aplicación nativa
                  </div>
                </div>
              )}

              {/* Instrucciones para iOS */}
              {isIOS && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
                  <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                    <span>🍎</span> Instalación en iOS/iPhone
                  </h3>
                  <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                    <li>Toca el botón de Compartir <span className="inline-block">📤</span> (abajo en el centro)</li>
                    <li>Desplázate y selecciona "Añadir a pantalla de inicio"</li>
                    <li>Toca "Añadir" en la esquina superior derecha</li>
                    <li>Busca el icono "A&P Admin" en tu pantalla</li>
                  </ol>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
                    💡 <strong>Importante:</strong> Debes usar Safari para poder instalar
                  </div>
                </div>
              )}

              {/* Instrucciones para Desktop */}
              {!isIOS && !isAndroid && (
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 space-y-4">
                  <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                    <span>💻</span> Instalación en Ordenador
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <div>
                      <h4 className="font-semibold mb-2">Chrome/Edge:</h4>
                      <p>Busca el icono ⊕ o 🖥️ en la barra de direcciones (derecha) y haz clic en "Instalar"</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Alternativa:</h4>
                      <p>También puedes crear un marcador para acceso rápido</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Beneficios */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-3">
                <h3 className="font-bold text-gray-900">✨ Ventajas de instalar:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span>🚀</span>
                    <span>Acceso instantáneo desde tu pantalla de inicio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>📴</span>
                    <span>Funciona sin conexión (algunas funciones)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🔔</span>
                    <span>Recibe notificaciones (próximamente)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🎯</span>
                    <span>Interfaz limpia sin barras del navegador</span>
                  </li>
                </ul>
              </div>

              {/* Enlace directo */}
              <div className="pt-4 border-t">
                <a
                  href="/administrator"
                  className="block text-center py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Continuar sin instalar →
                </a>
              </div>
            </>
          )}
        </div>

        {/* Info adicional */}
        <div className="mt-6 text-center text-white text-sm opacity-75">
          <p>¿Problemas? Contacta con soporte técnico</p>
        </div>
      </div>
    </div>
  );
}
