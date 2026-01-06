'use client';

import { useEffect, useState, useRef } from 'react';
import Script from 'next/script';

export default function ConditionalAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // No cargar Analytics en páginas de administración
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/administrator')) {
      return;
    }

    // Verificar consentimiento inicial
    const checkConsent = () => {
      const stored = localStorage.getItem('cookie-consent');
      if (stored) {
        try {
          const consent = JSON.parse(stored);
          const shouldLoad = consent.analytics === true;
          setHasConsent(shouldLoad);
          setIsReady(true);
          
          if (shouldLoad) {
            console.log('[Analytics] ✅ Consentimiento otorgado, cargando Analytics...');
          } else {
            console.log('[Analytics] ❌ Consentimiento denegado, Analytics NO se cargará');
          }
        } catch (e) {
          setHasConsent(false);
          setIsReady(true);
          console.log('[Analytics] ⚠️ Error al leer consentimiento');
        }
      } else {
        // Sin consentimiento guardado, no cargar Analytics
        setHasConsent(false);
        setIsReady(true);
        console.log('[Analytics] ⏳ Esperando consentimiento del usuario...');
      }
    };

    checkConsent();

    // Escuchar cambios en el consentimiento
    const handleConsentUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      const newConsent = customEvent.detail;
      
      console.log('[Analytics] 🔄 Consentimiento actualizado:', newConsent);
      
      if (newConsent.analytics === true && !hasConsent) {
        setHasConsent(true);
        console.log('[Analytics] ✅ Analytics activado dinámicamente');
        
        // Recargar para inicializar Analytics correctamente
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else if (newConsent.analytics === false && hasConsent) {
        console.log('[Analytics] ❌ Analytics desactivado, se requiere recarga');
        // Informar que se requiere recarga para desactivar completamente
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    };

    window.addEventListener('cookie-consent-updated', handleConsentUpdate);

    return () => {
      window.removeEventListener('cookie-consent-updated', handleConsentUpdate);
    };
  }, [hasConsent]);

  // No renderizar hasta que sepamos el estado del consentimiento
  if (!isReady) {
    return null;
  }

  // Solo renderizar scripts si hay consentimiento
  if (!hasConsent) {
    return null;
  }

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-EH39D527MS"
        strategy="afterInteractive"
        onLoad={() => {
          if (!hasInitialized.current) {
            hasInitialized.current = true;
            console.log('[Analytics] 📊 Script de gtag.js cargado');
          }
        }}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EH39D527MS', {
              send_page_view: true,
              anonymize_ip: true
            });
            console.log('[Analytics] 🎯 Google Analytics inicializado correctamente');
          `,
        }}
      />
    </>
  );
}

