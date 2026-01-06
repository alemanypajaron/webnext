'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CookieConsent {
  technical: boolean;
  analytics: boolean;
  timestamp: number;
}

export default function CookiePanel() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    // Verificar si ya existe consentimiento
    const stored = localStorage.getItem('cookie-consent');
    if (stored) {
      try {
        const parsed: CookieConsent = JSON.parse(stored);
        setConsent(parsed);
        setAnalyticsEnabled(parsed.analytics);
        setShowPanel(true);
        setIsExpanded(false); // Contraído si ya hay consentimiento
      } catch (e) {
        // Si hay error, mostrar panel expandido
        setShowPanel(true);
        setIsExpanded(true);
      }
    } else {
      // Sin consentimiento, mostrar expandido
      setShowPanel(true);
      setIsExpanded(true);
      setAnalyticsEnabled(false);
    }
  }, []);

  const saveConsent = (technical: boolean, analytics: boolean) => {
    const newConsent: CookieConsent = {
      technical,
      analytics,
      timestamp: Date.now(),
    };
    
    localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
    setConsent(newConsent);
    setAnalyticsEnabled(analytics);
    setIsExpanded(false);

    // Disparar evento personalizado para que Analytics se cargue
    window.dispatchEvent(new CustomEvent('cookie-consent-updated', { 
      detail: newConsent 
    }));

    console.log('[Cookies] 🍪 Consentimiento guardado:', newConsent);
  };

  const handleAcceptAll = () => {
    saveConsent(true, true);
  };

  const handleRejectAll = () => {
    saveConsent(true, false);
  };

  const handleSaveCustom = () => {
    saveConsent(true, analyticsEnabled);
  };

  if (!showPanel) return null;

  return (
    <>
      {/* Botón flotante vertical (cuando está contraído) */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="fixed left-0 top-1/2 -translate-y-1/2 bg-primary text-white px-2 py-4 rounded-r-lg shadow-lg hover:bg-primary-dark transition-all z-50 flex flex-col items-center gap-1"
          aria-label="Configurar cookies"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          <span className="text-[10px] font-bold tracking-tight leading-tight flex flex-col">
            <span>C</span>
            <span>O</span>
            <span>O</span>
            <span>K</span>
            <span>I</span>
            <span>E</span>
            <span>S</span>
          </span>
        </button>
      )}

      {/* Panel expandido */}
      {isExpanded && (
        <>
          {/* Overlay oscuro */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
            onClick={() => setIsExpanded(false)}
          />

          {/* Panel lateral */}
          <div className="fixed left-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto animate-slide-in-left">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary">
                      Configuración de Cookies
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Gestiona tus preferencias
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Cerrar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Descripción */}
              <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                Utilizamos cookies para mejorar tu experiencia de navegación y analizar el uso de
                nuestro sitio web. Puedes gestionar tus preferencias a continuación.
              </p>

              {/* Cookies Técnicas (siempre activas) */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Cookies Técnicas
                  </h3>
                  <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Siempre activas
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Necesarias para el funcionamiento básico del sitio web. No se pueden
                  desactivar.
                </p>
              </div>

              {/* Cookies de Análisis */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    Cookies de Análisis
                  </h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsEnabled}
                      onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Nos ayudan a entender cómo interactúas con nuestro sitio mediante Google
                  Analytics. Tu IP es anonimizada.
                </p>
              </div>

              {/* Botones de acción */}
              <div className="space-y-3">
                <button
                  onClick={handleAcceptAll}
                  className="w-full bg-accent text-white py-3 px-4 rounded-lg font-semibold hover:bg-accent/90 transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Aceptar todas
                </button>
                <button
                  onClick={handleSaveCustom}
                  className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                >
                  Guardar preferencias
                </button>
                <button
                  onClick={handleRejectAll}
                  className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Rechazar todas
                </button>
              </div>

              {/* Estado actual */}
              {consent && (
                <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-800 font-medium mb-1">
                    ℹ️ Estado actual:
                  </p>
                  <p className="text-xs text-blue-700">
                    Cookies de análisis:{' '}
                    <span className="font-bold">
                      {consent.analytics ? '✅ Activadas' : '❌ Desactivadas'}
                    </span>
                  </p>
                </div>
              )}

              {/* Links legales */}
              <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-4 justify-center text-xs">
                <Link
                  href="/legal/cookies"
                  className="text-primary hover:text-accent underline transition-colors"
                >
                  Política de Cookies
                </Link>
                <Link
                  href="/legal/privacidad"
                  className="text-primary hover:text-accent underline transition-colors"
                >
                  Privacidad
                </Link>
                <Link
                  href="/legal/aviso-legal"
                  className="text-primary hover:text-accent underline transition-colors"
                >
                  Aviso Legal
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

