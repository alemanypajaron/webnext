'use client';

import { useEffect } from 'react';

export default function ConditionalAnalytics() {
  useEffect(() => {
    // No cargar en páginas de administración
    if (window.location.pathname.startsWith('/administrator')) {
      console.log('[Analytics] 🚫 Bloqueado en página de administración');
      return;
    }

    let scriptsLoaded = false;

    // Función para cargar Google Analytics manualmente
    const loadAnalytics = () => {
      if (scriptsLoaded) {
        console.log('[Analytics] ℹ️ Scripts ya cargados, omitiendo');
        return;
      }

      console.log('[Analytics] 🚀 Cargando scripts de Google Analytics...');

      // 1. Cargar script principal de gtag.js
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-EH39D527MS';
      script1.onload = () => {
        console.log('[Analytics] ✅ Script de gtag.js cargado');
      };
      script1.onerror = () => {
        console.error('[Analytics] ❌ Error al cargar gtag.js');
      };
      document.head.appendChild(script1);

      // 2. Inicializar dataLayer y gtag
      const script2 = document.createElement('script');
      script2.innerHTML = `
        console.log('[Analytics] ⚙️ Inicializando Google Analytics...');
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-EH39D527MS', {
          anonymize_ip: true,
          cookie_flags: 'SameSite=None;Secure',
          send_page_view: true
        });
        console.log('[Analytics] ✅ Google Analytics inicializado con ID: G-EH39D527MS');
        
        // Enviar evento de test
        gtag('event', 'analytics_initialized', {
          'event_category': 'Analytics',
          'event_label': 'Cookie consent accepted'
        });
        console.log('[Analytics] 📊 Evento de inicialización enviado');
      `;
      document.head.appendChild(script2);

      scriptsLoaded = true;
      console.log('[Analytics] ✅ Scripts de Analytics agregados al DOM');
    };

    // Función para verificar consentimiento
    const checkConsent = () => {
      const consent = localStorage.getItem('cookie-consent');
      console.log('[Analytics] Verificando consentimiento:', consent);

      if (consent === 'accepted' && !scriptsLoaded) {
        console.log('[Analytics] ✅ Consentimiento aceptado - Cargando Analytics');
        loadAnalytics();
      } else if (consent === 'accepted' && scriptsLoaded) {
        console.log('[Analytics] ℹ️ Analytics ya está cargado');
      } else if (consent === 'rejected') {
        console.log('[Analytics] ❌ Consentimiento rechazado - No se cargará Analytics');
      } else {
        console.log('[Analytics] ⏳ Esperando consentimiento del usuario...');
      }
    };

    // Verificar inmediatamente al montar
    checkConsent();

    // Escuchar cambios de consentimiento
    const handleConsentUpdate = () => {
      console.log('[Analytics] 🔔 Evento de cambio de consentimiento detectado');
      checkConsent();
    };

    window.addEventListener('cookie-consent-updated', handleConsentUpdate);

    // Verificar periódicamente como backup (cada 3 segundos)
    const interval = setInterval(checkConsent, 3000);

    // Cleanup
    return () => {
      window.removeEventListener('cookie-consent-updated', handleConsentUpdate);
      clearInterval(interval);
    };
  }, []);

  // Este componente no renderiza nada, solo ejecuta efectos
  return null;
}
