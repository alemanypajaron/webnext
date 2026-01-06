'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CookieSettings from './CookieSettings';

type CookieConsent = 'accepted' | 'rejected' | null;

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Verificar si ya hay un consentimiento guardado
    const consent = localStorage.getItem('cookie-consent');
    
    if (!consent) {
      // Mostrar banner después de 1 segundo (mejor UX)
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setHasConsent(true);
    }
  }, []);

  const openBanner = () => {
    setShowBanner(true);
    setShowDetails(false);
  };

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
    setHasConsent(true);
  };

  const handleRejectAll = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setShowBanner(false);
    setHasConsent(true);
  };

  const handleAcceptSelected = () => {
    const analyticsCheckbox = document.getElementById('analytics-cookies') as HTMLInputElement;
    const consent = analyticsCheckbox?.checked ? 'accepted' : 'rejected';
    
    localStorage.setItem('cookie-consent', consent);
    setShowBanner(false);
    setHasConsent(true);
  };

  return (
    <>
      {/* Overlay oscuro */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={() => {}} // No cerrar al hacer clic fuera
      />

      {/* Banner de cookies */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-2xl border-t-4 border-primary overflow-hidden">
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <span className="text-4xl">🍪</span>
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-2">
                  Este sitio utiliza cookies
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Utilizamos cookies propias y de terceros para analizar el uso del sitio web y mejorar tu experiencia de navegación. 
                  {!showDetails && (
                    <>
                      {' '}Las cookies técnicas son necesarias para el funcionamiento del sitio. Las cookies analíticas nos ayudan a mejorar nuestros servicios.
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Detalles expandibles */}
            {showDetails && (
              <div className="mb-6 space-y-4 bg-gray-50 p-4 rounded-lg">
                {/* Cookies técnicas */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="technical-cookies"
                    checked
                    disabled
                    className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary opacity-50 cursor-not-allowed"
                  />
                  <div className="flex-1">
                    <label htmlFor="technical-cookies" className="font-semibold text-gray-900 cursor-not-allowed">
                      Cookies Técnicas (Necesarias)
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      Estas cookies son esenciales para el funcionamiento del sitio web. Incluyen cookies de sesión y seguridad.
                    </p>
                  </div>
                </div>

                {/* Cookies analíticas */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="analytics-cookies"
                    defaultChecked
                    className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <div className="flex-1">
                    <label htmlFor="analytics-cookies" className="font-semibold text-gray-900 cursor-pointer">
                      Cookies Analíticas (Opcionales)
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      Utilizamos Google Analytics para entender cómo los visitantes interactúan con el sitio web. Esto nos ayuda a mejorar nuestros contenidos y servicios.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="flex flex-wrap gap-2 items-center">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-primary hover:text-primary-dark font-semibold text-sm underline transition-colors"
                >
                  {showDetails ? 'Ocultar detalles' : 'Configurar cookies'}
                </button>
                <span className="text-gray-400">•</span>
                <Link
                  href="/legal/cookies"
                  className="text-primary hover:text-primary-dark font-semibold text-sm underline transition-colors"
                >
                  Política de Cookies
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={handleRejectAll}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
                >
                  Rechazar todo
                </button>
                {showDetails ? (
                  <button
                    onClick={handleAcceptSelected}
                    className="px-6 py-3 bg-accent text-primary font-bold rounded-lg hover:bg-accent-dark transition-all shadow-md hover:shadow-lg"
                  >
                    Guardar configuración
                  </button>
                ) : (
                  <button
                    onClick={handleAcceptAll}
                    className="px-6 py-3 bg-accent text-primary font-bold rounded-lg hover:bg-accent-dark transition-all shadow-md hover:shadow-lg"
                  >
                    Aceptar todo
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botón flotante para reabrir configuración (solo si hay consentimiento) */}
      {!showBanner && hasConsent && <CookieSettings onOpenBanner={openBanner} />}
    </>
  );
}

