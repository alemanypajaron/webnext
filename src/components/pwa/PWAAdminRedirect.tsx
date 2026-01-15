'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function PWAAdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    const checkAdminSession = async () => {
      // Solo ejecutar si está en modo standalone (PWA instalada)
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isIOSStandalone = (window.navigator as any).standalone === true;
      
      if (!isStandalone && !isIOSStandalone) {
        return; // No es PWA, no hacer nada
      }

      try {
        const supabase = createClientComponentClient();
        const { data: { session } } = await supabase.auth.getSession();

        // Si hay sesión activa, redirigir al panel de administración
        if (session?.user) {
          router.push('/administrator');
        }
      } catch (error) {
        console.error('Error checking admin session:', error);
      }
    };

    checkAdminSession();
  }, [router]);

  return null; // Este componente no renderiza nada
}
