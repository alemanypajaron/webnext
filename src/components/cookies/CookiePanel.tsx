'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookiePanel() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [technicalCookies, setTechnicalCookies] = useState(true);
  const [analyticsCookies, setAnalyticsCookies] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    
    if (!consent) {
      // No hay consentimiento → Mostrar panel expandido
      setTimeout(() => setIsExpanded(true), 1000);
    } else {
      // Ya hay consentimiento → Mostrar solo botón pequeño
      setHasConsent(true);
      setIsExpanded(false);
    }
  }, []);

  const handleAccept = () => {
    const consent = analyticsCookies ? 'accepted' : 'rejected';
    localStorage.setItem('cookie-consent', consent);
    setIsExpanded(false);
    setHasConsent(true);
  };

  const handleRejectAll = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setAnalyticsCookies(false);
    setIsExpanded(false);
    setHasConsent(true);
  };

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setAnalyticsCookies(true);
    setIsExpanded(false);
    setHasConsent(true);
  };

  return (
    <>
      {/* Botón lateral pequeño (cuando hay consentimiento) */}
      {hasConsent && !isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="fixed left-0 top-1/2 -translate-y-1/2 bg-primary text-white px-3 py-6 rounded-r-lg shadow-lg hover:bg-primary-dark transition-all z-50 group"
          style={{ writingMode: 'vertical-rl' }}
          title="Configuración de cookies"
          aria-label="Configuración de cookies"
        >
          <span className="flex items-center gap-2">
            <span className="text-sm font-semibold">🍪 Cookies</span>
          </span>
        </button>
      )}

      {/* Panel lateral expandido */}
      {isExpanded && (
        <>
          {/* Overlay semi-transparente (solo si es primera vez) */}
          {!hasConsent && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => {}} // No cerrar al hacer clic
            />
          )}

          {/* Panel de cookies */}
          <div className="fixed left-0 top-0 bottom-0 w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto animate-slide-in-left">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🍪</span>
                  <h2 className="text-xl font-heading font-bold text-primary">
                    Configuración de Cookies
                  </h2>
                </div>
                {hasConsent && (
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Cerrar"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Descripción */}
              <p className="text-gray-700 leading-relaxed mb-6">
                Utilizamos cookies propias y de terceros para analizar el uso del sitio web y mejorar tu experiencia de navegación.
              </p>

              {/* Cookies técnicas */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3 mb-4">
                  <input
                    type="checkbox"
                    id="technical-cookies"
                    checked={technicalCookies}
                    disabled
                    className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary opacity-50 cursor-not-allowed"
                  />
                  <div className="flex-1">
                    <label htmlFor="technical-cookies" className="font-semibold text-gray-900 cursor-not-allowed block mb-1">
                      🔒 Cookies Técnicas (Necesarias)
                    </label>
                    <p className="text-sm text-gray-600">
                      Estas cookies son esenciales para el funcionamiento del sitio web. Incluyen cookies de sesión y seguridad.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cookies analíticas */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="analytics-cookies"
                    checked={analyticsCookies}
                    onChange={(e) => setAnalyticsCookies(e.target.checked)}
                    className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                  />
                  <div className="flex-1">
                    <label htmlFor="analytics-cookies" className="font-semibold text-gray-900 cursor-pointer block mb-1">
                      📊 Cookies Analíticas (Opcionales)
                    </label>
                    <p className="text-sm text-gray-600 mb-2">
                      Utilizamos Google Analytics para entender cómo los visitantes interactúan con el sitio web. Esto nos ayuda a mejorar nuestros contenidos y servicios.
                    </p>
                    <p className="text-xs text-gray-500">
                      Las IPs se anonimizan y no registramos actividad en el panel de administración.
                    </p>
                  </div>
                </div>
              </div>

              {/* Enlace a política */}
              <div className="mb-6 text-center">
                <Link
                  href="/legal/cookies"
                  className="text-primary hover:text-primary-dark font-semibold text-sm underline transition-colors"
                  onClick={() => setIsExpanded(false)}
                >
                  Ver Política de Cookies completa
                </Link>
              </div>

              {/* Botones de acción */}
              <div className="space-y-3">
                <button
                  onClick={handleAccept}
                  className="w-full px-6 py-3 bg-accent text-primary font-bold rounded-lg hover:bg-accent-dark transition-all shadow-md hover:shadow-lg"
                >
                  {analyticsCookies ? '✓ Aceptar selección' : '✓ Solo cookies técnicas'}
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleRejectAll}
                    className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all text-sm"
                  >
                    Rechazar todo
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all text-sm"
                  >
                    Aceptar todo
                  </button>
                </div>
              </div>

              {/* Nota informativa */}
              <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-gray-600">
                  <strong>ℹ️ Nota:</strong> Puedes cambiar tu configuración en cualquier momento haciendo clic en el botón "🍪 Cookies" del lateral izquierdo.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

