'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function ConditionalAnalytics() {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Verificar si estamos en páginas de administración
    setIsAdmin(window.location.pathname.startsWith('/administrator'));
    
    // Verificar consentimiento
    const consent = localStorage.getItem('cookie-consent');
    setHasConsent(consent === 'accepted');
  }, []);

  // No cargar Analytics en páginas de administración
  if (isAdmin) {
    return null;
  }

  // No cargar si no hay consentimiento
  if (hasConsent !== true) {
    return null;
  }

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-EH39D527MS"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EH39D527MS', {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  );
}

