'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function ConditionalAnalytics() {
  const [shouldLoadAnalytics, setShouldLoadAnalytics] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Verificar si estamos en páginas de administración
    const adminPath = window.location.pathname.startsWith('/administrator');
    setIsAdmin(adminPath);

    if (adminPath) {
      console.log('[Analytics] 🚫 Bloqueado en página de administración');
      return;
    }
    
    // Función para verificar consentimiento
    const checkConsent = () => {
      const consent = localStorage.getItem('cookie-consent');
      const hasConsent = consent === 'accepted';
      
      console.log('[Analytics] Verificando consentimiento:', consent);
      
      if (hasConsent && !shouldLoadAnalytics) {
        console.log('[Analytics] ✅ Consentimiento aceptado - Cargando Google Analytics');
        setShouldLoadAnalytics(true);
      } else if (!hasConsent && shouldLoadAnalytics) {
        console.log('[Analytics] ❌ Consentimiento rechazado o retirado');
        setShouldLoadAnalytics(false);
      } else if (hasConsent && shouldLoadAnalytics) {
        console.log('[Analytics] ℹ️ Analytics ya cargado');
      } else if (!hasConsent && !shouldLoadAnalytics) {
        console.log('[Analytics] ⏳ Esperando consentimiento...');
      }
      
      return hasConsent;
    };
    
    // Verificar inmediatamente
    checkConsent();
    
    // Escuchar evento de cambio de consentimiento
    const handleConsentUpdate = () => {
      console.log('[Analytics] 🔔 Evento de consentimiento detectado');
      checkConsent();
    };
    
    window.addEventListener('cookie-consent-updated', handleConsentUpdate);
    
    // También verificar periódicamente como backup
    const interval = setInterval(checkConsent, 2000);
    
    return () => {
      window.removeEventListener('cookie-consent-updated', handleConsentUpdate);
      clearInterval(interval);
    };
  }, [shouldLoadAnalytics]);

  // No cargar si es admin
  if (isAdmin) {
    return null;
  }

  // No cargar si no hay consentimiento
  if (!shouldLoadAnalytics) {
    return null;
  }

  console.log('[Analytics] 🚀 Renderizando scripts de Google Analytics');

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-EH39D527MS"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('[Analytics] ✅ Script de gtag.js cargado correctamente');
        }}
        onError={() => {
          console.error('[Analytics] ❌ Error al cargar gtag.js');
        }}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
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
          
          // Enviar un evento de test para verificar que funciona
          gtag('event', 'analytics_initialized', {
            'event_category': 'Analytics',
            'event_label': 'Cookie consent accepted'
          });
          console.log('[Analytics] 📊 Evento de test enviado');
        `}
      </Script>
    </>
  );
}
