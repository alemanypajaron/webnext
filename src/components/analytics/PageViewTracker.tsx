'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // No rastrear páginas de administración
    if (pathname?.startsWith('/administrator')) {
      return;
    }

    // Construir URL completa
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    // Enviar page_view a Google Analytics
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: url,
        page_title: document.title,
        page_location: window.location.href,
      });
      
      console.log('[Analytics] 📄 Page view registrado:', url);
    }
  }, [pathname, searchParams]);

  return null;
}

// Declarar gtag en el tipo Window
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

